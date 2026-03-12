from __future__ import annotations

import os
from pathlib import Path

import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

DATASET_PATH = Path(os.getenv("CROP_DATASET_PATH", "backend/data/Crop_recommendation.csv"))

app = Flask(__name__)
CORS(app)

model: RandomForestClassifier | None = None
feature_columns: list[str] = []
metrics: dict[str, float] = {}


def train_model() -> None:
    """Train the random forest model once at service startup."""
    global model, feature_columns, metrics

    if not DATASET_PATH.exists():
        raise FileNotFoundError(
            f"Dataset not found at '{DATASET_PATH}'. Set CROP_DATASET_PATH or add the CSV file."
        )

    df = pd.read_csv(DATASET_PATH)
    if "label" not in df.columns:
        raise ValueError("Dataset must include a 'label' column.")

    X = df.drop("label", axis=1)
    y = df["label"]

    if "season" in X.columns:
        X = pd.get_dummies(X, columns=["season"], drop_first=True)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    rf = RandomForestClassifier(n_estimators=100, random_state=42)
    rf.fit(X_train, y_train)

    model = rf
    feature_columns = X_train.columns.tolist()
    metrics = {
        "accuracy": float(rf.score(X_test, y_test)),
        "training_rows": int(len(X_train)),
        "test_rows": int(len(X_test)),
    }


def _build_input_row(payload: dict) -> pd.DataFrame:
    """Map request JSON to the model feature vector."""
    if model is None:
        raise RuntimeError("Model is not initialized.")

    required_fields = ["temperature", "humidity", "ph", "water_availability", "season"]
    missing = [field for field in required_fields if field not in payload]
    if missing:
        raise ValueError(f"Missing required fields: {', '.join(missing)}")

    sample = {
        "temperature": float(payload["temperature"]),
        "humidity": float(payload["humidity"]),
        "ph": float(payload["ph"]),
        "water availability": float(payload["water_availability"]),
    }

    for col in feature_columns:
        if col.startswith("season_"):
            sample[col] = 0

    season_col = f"season_{str(payload['season']).strip().lower()}"
    if season_col in feature_columns:
        sample[season_col] = 1

    row = pd.DataFrame([sample])
    return row.reindex(columns=feature_columns, fill_value=0)


@app.get("/api/health")
def health() -> tuple:
    if model is None:
        return jsonify({"status": "error", "message": "Model is not loaded."}), 500

    return jsonify(
        {
            "status": "ok",
            "dataset_path": str(DATASET_PATH),
            "feature_count": len(feature_columns),
            "model_metrics": metrics,
        }
    )


@app.post("/api/predict-crop")
def predict_crop() -> tuple:
    if model is None:
        return jsonify({"error": "Model is not loaded."}), 500

    payload = request.get_json(silent=True) or {}
    try:
        sample_df = _build_input_row(payload)
        prediction = model.predict(sample_df)[0]
        return jsonify({"predicted_crop": prediction})
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except Exception as exc:
        return jsonify({"error": f"Prediction failed: {exc}"}), 500


try:
    train_model()
except Exception as exc:
    app.logger.error("Model initialization failed: %s", exc)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
