# Expense Tracker Frontend

This repository contains the frontend code for the Expense Tracker application, which integrates with a backend to provide dynamic expense tracking capabilities along with an AI-powered chatbot for financial advice.

## Features

- **User Authentication:** Handles user login with JWT for session management and provides a logout mechanism.
- **Dynamic Content Loading:** Dynamically loads and displays months and expenses from the backend.
- **Expense Management:** Supports CRUD operations for expenses and months directly from the UI.
- **Category Management:** Allows users to manage categories associated with expenses.
- **AI Chatbot Interaction:** Users can interact with an AI chatbot for insights and advice on managing expenses.

## Prerequisites

To run this frontend application, ensure you have the following:
- A running instance of the backend server configured at `http://localhost:8080`.
- Modern web browser that supports ES6+ JavaScript.

## Setup

1. **Clone the Repository:**
   git clone <repository_url>
   cd ExpenseTracker-frontend

2. **Open as live server**
   Open with live server using vscode live server extension
   Alternatively, if you have Node.js installed, you can use http-server:
   npm install -g http-server
   http-server .

## Project Structure

|-- /css
|   |-- login.css
|   |-- styles.css
|-- /js
|   |-- /api
|   |   |-- bot.js
|   |   |-- category.js
|   |   |-- expense.js
|   |   |-- month.js
|   |-- /ui
|   |   |-- render.js
|   |   |-- events.js
|   |-- auth.js
|   |-- main.js
|-- index.html
|-- login.html


## How to Use
**Login:** Start by logging in through the login.html page.

**Navigating the Application:** Once logged in, you can view months and expenses, interact with the chatbot, and perform CRUD operations.
**Interacting with the AI Chatbot:** Use the chatbot for advice on expenses by entering queries as specified.

**API Integration**
The frontend interacts with the backend via API endpoints defined in the JavaScript modules under /js/api. These modules handle the fetching and sending of data for expenses, months, categories, and chat interactions.

**Security Features**
JWT Authentication: Manages sessions using JWT stored in localStorage.
Protected Routes: Ensures that unauthenticated users cannot access the main application pages.

**Responsive degin**
Desgined to be used on desktops, tablets, and mobile devices

