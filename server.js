const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Connect to MongoDBcanteen
mongoose.connect("mongodb+srv://canteen_10-12:Billgates12345@cluster0.cy5qx.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema and Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: {
    dietary_restrictions: [String],
    allergies: [String],
  },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// Menu Item Schema and Model
const menuItemSchema = new mongoose.Schema({
  item_name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  nutritional_info: {
    calories: Number,
    protein: String,
    carbs: String,
    fats: String,
  },
  customization_options: [
    {
      name: String,
      price: Number,
    },
  ],
  available: { type: Boolean, default: true },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

// User Registration Endpoint
app.post("/register", async (req, res) => {
  const { name, email, password, preferences } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      preferences,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// Display Menu Items Endpoint
app.get("/menu", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Error fetching menu items" });
  }
});

// Add Menu Item Endpoint
app.post("/menu", async (req, res) => {
  const { item_name, price, category, nutritional_info, customization_options } = req.body;

  try {
    const newMenuItem = new MenuItem({
      item_name,
      price,
      category,
      nutritional_info,
      customization_options,
    });
    await newMenuItem.save();

    res.status(201).json({ message: "Menu item added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding menu item" });
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

