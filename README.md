# AgroSense: An IoT & AI-Powered Smart Farming Showcase

![AgroSense Deployed Website](preview.png)

[cite_start]This repository contains the source code for **AgroSense**, a web-based showcase for the research project, "A Brief Review on Smart Farming Technologies for Precision Agriculture"[cite: 179]. The project integrates a physical IoT hardware prototype with a modern, interactive web application to demonstrate the core principles of smart farming.

**Live Demo:** [**https://agrosense-c9cfa.web.app**](https://agrosense-c9cfa.web.app)

---

## 📋 Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Hardware & Circuit Diagram](#-hardware--circuit-diagram)
- [Software & Technology Stack](#-software--technology-stack)
- [Project Setup](#-project-setup)
- [The Research Team](#-the-research-team)
- [Acknowledgments](#-acknowledgments)

---

## 🔎 Overview

AgroSense is a comprehensive project that reviews and demonstrates how modern technologies can revolutionize farming. [cite_start]It explores the use of the Internet of Things (IoT) for real-time data collection and Artificial Intelligence (AI) for interactive user engagement[cite: 184]. [cite_start]The goal is to create a practical, low-cost smart farming system that empowers users with live data for better farm management, addressing the food demands of a growing global population by improving agricultural efficiency and sustainability[cite: 181, 182, 184, 185].

The web platform serves as an interactive front-end to present this research, making the concepts accessible and understandable through practical demonstrations like a real-time data dashboard and an intelligent chatbot.

---

## ✨ Key Features

* **Responsive Web Interface:** A single-page application built with HTML, CSS, and JavaScript that is fully responsive on all devices.
* **Live IoT Dashboard:** Features a link to a live dashboard designed to display real-time sensor data from a connected hardware prototype. [cite_start]The dashboard monitors crucial environmental data, including humidity, water levels, rainfall detection, and day/night cycles[cite: 108, 110, 111, 132, 133].
* **AI-Powered Chatbot:** Integrated with the **Google Gemini API**, the chatbot provides interactive information and answers user queries specifically about the research project and its findings.
* [cite_start]**Automatic Irrigation Control:** The system includes logic to automatically control a water pump based on real-time soil moisture readings[cite: 128, 129].
* **Light/Dark Theme:** A modern UI with a theme toggle for a better user experience.
* **Globally Deployed:** The showcase website is deployed using **Firebase Hosting** for high availability and performance.

---

## 🔧 Hardware & Circuit Diagram

The core of the project is an IoT device built with a central microcontroller connected to a suite of sensors.

### Components Used
* [cite_start]**Microcontroller:** NodeMCU ESP8266 (Wi-Fi enabled)[cite: 1, 14, 16].
* **Sensors:**
    * [cite_start]DHT11 Sensor (Temperature & Humidity)[cite: 167, 170].
    * [cite_start]Soil Moisture Sensor (FC-28)[cite: 636, 637].
    * [cite_start]Rain Sensor Module[cite: 92, 93].
    * [cite_start]LDR Sensor (Photoresistor for light detection)[cite: 428, 429].
* **Actuators & Display:**
    * [cite_start]5V Relay Module (for controlling the water pump)[cite: 383, 384].
    * [cite_start]16x2 I2C LCD Display (for status updates)[cite: 618, 623].
    * [cite_start]Buzzer (for alerts)[cite: 108].

### Circuit Diagram
*(To make this image appear, please upload the circuit diagram image to your GitHub repository and update the link below)*
![Circuit Diagram](WhatsApp%20Image%202025-08-16%20at%2016.41.48.jpeg)

---

## 💻 Software & Technology Stack

* [cite_start]**Firmware:** Written in **C++** on the **Arduino IDE** for the NodeMCU ESP8266[cite: 74].
* **Frontend:** HTML5, CSS3, JavaScript (ES6)
* **AI / APIs:** Google Gemini API
* **Deployment:** Firebase Hosting

---

## 🚀 Project Setup

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/r8rishav/smartfarming.git](https://github.com/r8rishav/smartfarming.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd smartfarming
    ```
3.  **Set up the API Key:**
    * Open the `public/script.js` file.
    * Find the line `const API_KEY = "YOUR_GEMINI_API_KEY";` and replace the placeholder with your actual Google Gemini API key.

4.  **Run the project:**
    * The easiest way is to use the **Live Server** extension in VS Code. Right-click on `public/index.html` and select "Open with Live Server".

---

## 👥 The Research Team

[cite_start]This project was developed by the following students from the **Institute of Engineering & Management, Kolkata**[cite: 180]:

* Rishav Raj
* Amar Pal
* Arijit Ghosh

---

## 🙏 Acknowledgments

[cite_start]This project was completed under the valuable guidance of our mentors and project supervisors[cite: 633, 634]:

* Mr. Soumik Kumar Kundu
* Mr. Samit Karmakar
