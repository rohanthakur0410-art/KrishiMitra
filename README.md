# KrishiMitra

**A smart agriculture platform that connects farmers with essential farming information and services through WhatsApp and a web platform.**

KrishiMitra simplifies access to agricultural services such as weather updates, government schemes, finance, insurance, mandi prices, crop disease detection, and crop listings through a simple WhatsApp-based interface.

## Features

* **WhatsApp Integration** — Farmers interact with KrishiMitra through WhatsApp using Twilio.
* **Weather Information** — Provides weather information to help farmers plan farming activities.
* **Government Schemes** — Access information about agricultural schemes and benefits.
* **Finance & Insurance** — Provides agricultural finance, insurance, and claims information.
* **Mandi Prices** — Helps farmers access market prices for different crops.
* **Crop Disease Detection** — Farmers can send crop images through WhatsApp for ML-based disease prediction.
* **Crop Listings** — Farmers can submit crop details and quantities, which are displayed on the web platform.
* **Multilingual Support** — Supports multiple languages for easier accessibility.
* **Voice Responses** — Provides voice-based responses where applicable.

## Architecture

```text
Farmer
   ↓
WhatsApp
   ↓
Twilio
   ↓
Django Backend
   ↓
┌─────────────────────────────┐
│ Weather                     │
│ Government Schemes          │
│ Finance & Insurance         │
│ Mandi Prices                │
│ Crop Disease Detection      │
│ Crop Listings               │
└─────────────────────────────┘
   ↓
API / Database / ML Model
   ↓
Farmer Response / Web Platform
```

## Crop Disease Detection

```text
Farmer sends crop image
        ↓
Django Backend
        ↓
TensorFlow / Keras Model
        ↓
Disease Prediction
        ↓
Information & Guidance
```

## Crop Listing

```text
Farmer enters:

100 kg tomatoes

        ↓
Django Backend
        ↓
Crop information processed
        ↓
Web Platform

Tomatoes — 100 kg
```

## Technology Stack

| Layer            | Technology               |
| ---------------- | ------------------------ |
| Backend          | Python, Django           |
| Messaging        | Twilio WhatsApp          |
| Machine Learning | TensorFlow, Keras        |
| Frontend         | HTML, CSS, JavaScript    |
| APIs             | REST APIs                |
| Translation      | Translation Services     |
| Voice            | Text-to-Speech           |
| Database         | Database-backed services |

## How It Works

1. A farmer starts a conversation with KrishiMitra on WhatsApp.
2. The system provides a menu of available agricultural services.
3. The farmer selects a service and provides the required information.
4. The Django backend processes the request.
5. External APIs, databases, or the ML model are used where required.
6. The result is returned to the farmer through WhatsApp or displayed on the web platform.

## Future Scope

* Direct farmer-to-buyer communication
* Personalized farming recommendations
* Location-based market information
* Additional regional languages
* More crop disease categories
* Agricultural expert assistance
* Real-time agricultural alerts

## About

KrishiMitra is a smart agriculture platform designed to make agricultural information and digital services more accessible to farmers using **Django, WhatsApp, APIs, and AI/ML**.
