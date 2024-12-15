# Billgates_Yahaya_10012200025_project
Web technologies final Exam project

Canteen Ordering System documentation 

Overview
This project is a responsive Canteen Ordering System designed to enable students and staff to browse a canteen menu, customize orders, and track them in real time. It also includes user registration, profile management, and a loyalty program. This documentation explains the key features, functionality, and structure of the system.


# Link to main repo - https://github.com/BG-09-glitch/BillGates_Project

# Deployment links - https://mellow-lolly-0fcdc1.netlify.app/ 

# Backend deployment link - https://billgates-project.onrender.com

Features and Requirements
1. User Registration & Profile Management 
- Purpose: Allow users to securely register, log in, and manage their profiles.
- Key Components:
  - Registration: Collects user details (e.g., name, email, password, dietary restrictions, and allergies).
  - Login:Authenticates users using email and password.
  - Profile Management: Stores user preferences such as dietary restrictions and allergies in the database.



2. Menu Display & Customization 
- Purpose: Display a dynamic menu with customizable options.
- Key Features:
  - Displays menu items with:
    - Name
    - Price
    - Category (e.g., vegetarian, non-vegetarian, beverages)
    - Nutritional information
  - Customization Options:
    - Users can add extra toppings or customize orders before placing them.



3. Ordering System with Cart 
- Purpose: Implement a cart to manage orders.
- Key Features:
  - Users can:
    - Add menu items to the cart.
    - View a summary of their order (items, quantities, and prices).
    - Remove items or adjust quantities.
    - See the total cost before placing an order.
  - The system processes and stores confirmed orders in the database.



4. Order Tracking & Loyalty Program 
-Purpose: Enhance the user experience with tracking and loyalty rewards.
- Key Features:
  - Order Tracking:
    - Users can view the status of their order (e.g., *Preparing*, *Ready for Pickup*).
  - Loyalty Program:
    - Users earn points for every order.
    - Points can be redeemed for discounts on future orders.


Technologies Used:
- Frontend:  
  HTML, CSS, JavaScript (for a responsive and interactive UI)
  
- Backend:  
  Node.js, Express (handles API endpoints and server-side logic)

- Database:  
  MongoDB (stores user profiles, menu items, orders, and loyalty points)



Project Structure
```plaintext
.
├── public/               # Contains static frontend files (HTML, CSS, JS)
│   ├── index.html        # Home page
│   ├── login.html        # Login page
│   ├── registration.html # Registration page
│   ├── menu.html         # Menu display and ordering
│   ├── style.css         # Styling for the application
│   ├── script.js         # Handles client-side interactions
├── routes/               # Backend API routes
│   ├── authRoutes.js     # Handles registration, login, and profile management
│   ├── menuRoutes.js     # Handles menu CRUD operations
│   ├── orderRoutes.js    # Handles order placement and tracking
├── models/               # MongoDB schema definitions
│   ├── User.js           # User schema (e.g., name, email, password, preferences)
│   ├── Menu.js           # Menu schema (e.g., name, price, category, customizations)
│   ├── Order.js          # Order schema (e.g., items, status, userID, loyalty points)
├── server.js             # Main server file
├── package.json          # Manages Node.js dependencies
```


Database Schema
User Schema (MongoDB)
```javascript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  dietaryRestrictions: [String],  // e.g., ["Vegetarian", "No Nuts"]
  allergies: [String],           // e.g., ["Peanuts"]
  loyaltyPoints: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', UserSchema);
```

Menu Schema
```javascript
const MenuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,  // e.g., "Main Course", "Beverage"
  nutritionalInfo: String,
  customizations: [String], // e.g., ["Cheese", "Extra Sauce"]
});

module.exports = mongoose.model('Menu', MenuSchema);
```

Order Schema
```javascript
const OrderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  items: [
    {
      itemId: mongoose.Schema.Types.ObjectId,
      name: String,
      price: Number,
      quantity: Number,
      customizations: [String],
    },
  ],
  status: { type: String, default: "Preparing" }, // e.g., Preparing, Ready for Pickup
  loyaltyPointsEarned: Number,
  totalCost: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
```
API Endpoint
Authentication Routes
| Method | Endpoint        | Description            |
|------------|----------------------|----------------------------|
| POST       | `/api/auth/register` | Registers a new user       |
| POST       | `/api/auth/login`    | Logs in a user             |

Menu Routes
| Method | Endpoint       | Description             |
|------------|--------------------|-----------------------------|
| GET        | `/api/menu`        | Fetches all menu items      |
| POST       | `/api/menu`        | Adds a new menu item (admin)|
| PUT        | `/api/menu/:id`    | Updates a menu item (admin) |
| DELETE     | `/api/menu/:id`    | Deletes a menu item (admin) |

Order Routes
| **Method** | **Endpoint**          | Description**               |
|------------|-----------------------|-------------------------------|
| POST       | `/api/orders`         | Places a new order            |
| GET        | `/api/orders/:userId` | Fetches user-specific orders  |
| PUT        | `/api/orders/:id`     | Updates order status (admin)  |


Frontend-Backend Interaction
Registration Example
1. Frontend: User submits the form on `registration.html`.
2. Backend:
   - Endpoint: `/api/auth/register`
   - Validates the input and stores the user in the MongoDB database.

Menu Display Example
1. rontend: Fetches menu items using AJAX or Fetch API.
2. Backend:
   - Endpoint: `/api/menu`
   - Sends a JSON response containing all menu items.

Placing an Order
1. Frontend: User selects items, adds them to the cart, and confirms the order.
2. Backend:
   - Endpoint: `/api/orders`
   - Processes the order and returns an order confirmation.



How to Run the Application
1. Backend Setup:
   - Install dependencies: `npm install`
   - Start the server: `node server.js`

2. Frontend Setup:
   - Open the `index.html` file in a browser.

3. Database:
   - Ensure MongoDB is running on a cloud database.



Future Improvements
- Add real-time order tracking using WebSockets.
- Enhance security with JWT-based authentication.
- Implement an admin dashboard for better management.

log in credentials
email:test@gmail.com
password:bill123


This documentation provides a complete guide to understanding and working with the Canteen Ordering System.
