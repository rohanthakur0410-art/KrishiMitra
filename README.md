# KrishiMitra

A digital agricultural platform designed to make essential farming information and services easier to access for farmers.
KrishiMitra connects farmers with services such as weather information, government schemes, finance, insurance, insurance claims, mandi prices, crop disease assistance, and crop listings through a simple WhatsApp-based interface and web platform.

## Overview

Farmers often depend on different sources to find information related to farming, markets, government support, insurance, and crop health. KrishiMitra brings these services together in one platform.

Farmers can interact with KrishiMitra through WhatsApp using Twilio. A main menu guides them to the service they need, and the Django backend processes their requests and provides the required information.

## Features

Weather
Provides weather information to help farmers plan farming activities.

Government Schemes
Provides information about agricultural government schemes and related benefits.

Finance
Provides financial information and guidance related to agriculture.

Insurance
Provides information related to crop insurance.

Insurance Claims
Helps farmers understand and access information related to insurance claims.

Mandi Prices
Provides mandi and market price information for different crops, helping farmers understand current market rates.

Crop Disease Detection
Farmers can send a crop image through WhatsApp. The machine learning model analyzes the image and predicts the possible disease.

Crop Listings
Farmers can provide crop details and quantities through WhatsApp. For example, a farmer can enter "100 kg tomatoes", and the information is processed by the backend and displayed on the web platform as a crop listing.

Multilingual Support
Supports multiple languages to make the platform easier to use for farmers.

Voice Responses
Provides voice-based responses where applicable, allowing farmers to listen to the information instead of only reading it.

## How It Works

Farmer
↓
WhatsApp
↓
Twilio
↓
Django Backend
↓
Selected Service
↓
API / Database / ML Model
↓
Response to Farmer or Website

The farmer starts a conversation with KrishiMitra and receives the main menu. After selecting a service, the required information is collected and processed by the Django backend. The result is then returned to the farmer or reflected on the web platform.

## Crop Listing Flow

Farmer enters:

100 kg tomatoes

↓

Django Backend

↓

Crop information is processed

↓

Web Platform

↓

Tomatoes - 100 kg

## Crop Disease Detection Flow

Farmer sends crop image

↓

Django Backend

↓

Machine Learning Model

↓

Disease Prediction

↓

Information and guidance returned to farmer



## Technology Stack

Python
Django
Twilio
WhatsApp
TensorFlow
Keras
REST APIs
HTML / CSS / JavaScript
Translation Services
Text-to-Speech



## System Architecture

Farmer
↓
WhatsApp
↓
Twilio
↓
Django Backend
↓
├── Weather
├── Government Schemes
├── Finance
├── Insurance
├── Insurance Claims
├── Mandi Prices
├── Crop Disease Detection
└── Crop Listings
↓
Web Platform / Farmer Response



## Future Scope

Direct farmer-to-buyer communication

More crop disease categories

Personalized farming recommendations

Location-based market information

Support for additional regional languages

Agricultural expert assistance

Real-time agricultural alerts


KrishiMitra aims to make agricultural information and digital services simple, accessible, and useful for farmers through a platform they can easily interact with.
