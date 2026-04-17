# 🎮 3D Game Accounts Marketplace Website

## Overview

This project aims to create a modern, simple, and visually stunning 3D website for buying and selling game accounts. The platform will focus on a clean, minimal, and mobile-friendly design with smooth 3D animations and professional UI.

## ✨ Core Requirements

-   **Clean, minimal, mobile-friendly design**: Ensuring a seamless experience across all devices.
-   **Smooth 3D animations**: Lightweight and fast-loading 3D elements to enhance user interaction without compromising performance.
-   **Professional UI**: Utilizing cards and soft shadows for a polished and intuitive user interface.
-   **Fast performance**: Optimized images and animations for quick loading times.

## 🚀 Pages & Features

### 1. Home Page

-   **Eye-catching 3D background**: Subtle animations to create an immersive first impression.
-   **Three main game cards**: Efootball, PUBG, and Ludo.
-   **Interactive cards**: Each card will be clickable and animated on hover.

### 2. Game Page

-   **List of available accounts**: Displaying accounts specific to the selected game.
-   **Filters**: High, Medium, Low (for account levels).
-   **Account card details**: Each card will include 3 images, price, level (High/Medium/Low), a short description, and a "Buy Now" button.

### 3. Product Detail Page

-   **Full account details**: Comprehensive information about the selected account.
-   **Image gallery**: 3 images showcasing the account.
-   **Description**: Detailed information about the account.
-   **Price**: Clear pricing.
-   **Buy button**: For purchasing the account.

### 4. Authentication

-   **Login and Registration system**: Secure user authentication.
-   **User role selection**: During registration, users can choose between "Customer" or "Seller".

### 5. Customer Flow

-   **Browse games**: Easy navigation through available games.
-   **View accounts**: Access to detailed account listings.
-   **Purchase account**: Streamlined buying process.
-   **Dashboard access**: After successful payment, account details are securely displayed in the customer dashboard.

### 6. Seller System

-   **Seller application**: Sellers must apply and require admin approval.
-   **Seller dashboard**: Features for adding products, uploading 3 images, setting price, selecting level (High/Medium/Low), and adding descriptions.

### 7. Payment Integration

-   **Payment API integration**: Secure processing of transactions.
-   **Secure webhook system**: Verifies payment before delivering account details.
-   **Account unlock**: Account details are unlocked for the buyer only after successful payment.

### 8. Admin Panel

-   **Management features**: Approve/reject sellers, manage users, and manage products.

## 🛠️ Technical Stack

-   **Frontend**: React
-   **Styling**: Tailwind CSS
-   **3D Graphics**: Three.js
-   **Backend**: Node.js (Express)
-   **Database**: Firebase or MongoDB

## 🎨 Design Style

-   **Modern, clean, futuristic**: A contemporary aesthetic.
-   **Smooth transitions and hover effects**: Enhancing user experience.
-   **Light 3D effects**: Visually appealing without causing lag.
-   **Dark mode preferred**: For a sleek and comfortable viewing experience.

## 🔒 Security Notes

-   **Account credentials protection**: Do NOT expose account credentials before payment confirmation.
-   **Secure APIs**: Use secure APIs and validate all requests.
-   **Webhook endpoint protection**: Protect webhook endpoints with verification.

## 🌟 Bonus Features

-   **Search and filter**: Advanced search capabilities for accounts.
-   **Ratings and reviews**: User feedback system.
-   **Chat between buyer and seller**: Direct communication feature.

## 🏗️ Marketplace Structure Improvements

### Game-Based Seller Separation

-   When a user enters a game page (Efootball, PUBG, or Ludo), they first select an account level (High, Medium, Low).
-   After selecting the level, the system displays seller shops (stores) instead of mixed products.
-   Each seller has their own dedicated shop to avoid confusion, ensuring the page does not mix all sellers together randomly.

### Seller Game Restriction

-   Each seller can ONLY sell accounts for one specific game. For example, if a seller chooses Efootball, they cannot sell PUBG or Ludo accounts.
-   This restriction keeps the marketplace organized and clean.

### Seller Onboarding

-   When a user selects "I am a Seller", they are presented with 3 game options (Efootball, PUBG, Ludo).
-   The seller must choose ONLY ONE game, and this choice is permanent (or changeable only by an admin).

### Seller Store (Shop)

-   Each seller has a personal shop with a shop name, shop profile image/logo, and game category (Efootball / PUBG / Ludo).
-   Inside the shop, sellers can upload multiple products (accounts), each including 3 images, price, level (High/Medium/Low), and a description.

### UI Behavior - Game Page Flow

1.  User selects game.
2.  User selects level (High/Medium/Low).
3.  System shows seller shops that match the selected game and level.
4.  User enters a seller shop.
5.  User browses products inside that shop.

### Seller Flexibility

-   Sellers can add, edit, and delete products.
-   Sellers can customize their shop image and name.

### Design Notes for Shops

-   Each shop should resemble a mini-profile page with a clean layout, including a banner or profile image, shop name, and product grid.
-   The design should remain simple yet modern with light 3D effects.

## 📊 Seller Analytics & Tracking

### Seller Dashboard - Sales Overview

-   A simple analytics section for each seller to track performance:
    -   **Weekly Sales Summary**: Total items sold and total earnings this week.
    -   **Monthly Sales Summary**: Total items sold and total earnings this month.

### Real-Time Sales Counter

-   A small counter system that updates ONLY when a verified successful payment occurs, preventing confusion or fake counts.
-   Displays the total sales count (lifetime) for successful orders only (ignoring failed/pending).

### UI Design (Simple & Clean)

-   Small dashboard cards for "Weekly Sales", "Monthly Sales", and "Total Sold".
-   Clean numbers with small icons, keeping it lightweight and fast.

This structure ensures the platform is clean, scalable, and easy to use while maintaining a premium 3D experience.
