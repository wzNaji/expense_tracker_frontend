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
![Screenshot 2024-12-17 121830](https://github.com/user-attachments/assets/3e943324-e116-4fd8-a3a7-6a4dace55423)



### Explanation

- **/css/**: Contains CSS files that style the HTML content.
  - `login.css`: Styles specific to the login page.
  - `styles.css`: General styles used throughout the application.
- **/js/**: JavaScript files split into API interaction and UI rendering.
  - **/api/**: Handles communication with backend services.
    - `bot.js`: Manages interactions with the AI chatbot.
    - `category.js`: Functions related to category management.
    - `expense.js`: Scripts for handling expense data.
    - `month.js`: Deals with operations related to months.
  - **/ui/**: Scripts that manage the user interface.
    - `render.js`: Renders data into HTML views.
    - `events.js`: Attaches event handlers for UI interactions.
  - `auth.js`: Manages user authentication processes.
  - `main.js`: Main JavaScript file that initializes the application.
- **index.html**: The main entry point of the application.
- **login.html**: The user login interface.


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

## Application
![Screenshot 2024-12-17 122451](https://github.com/user-attachments/assets/8b6aa8be-31ea-4d43-a7d6-9911035e489a)
![Screenshot 2024-12-17 122720](https://github.com/user-attachments/assets/39b05e5c-c43d-4809-89ec-f77c03fc2d29)
![Screenshot 2024-12-17 122808](https://github.com/user-attachments/assets/bfe9652e-f227-4963-bb81-519cfa511d22)
![Screenshot 2024-12-17 122825](https://github.com/user-attachments/assets/6b60ede8-ae2d-466e-b6f1-cc8377b67c20)






