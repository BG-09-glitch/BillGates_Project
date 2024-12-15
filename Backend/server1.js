const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//mongodb+srv://canteen_10-12:Billgates12345@cluster0.cy5qx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// MongoDB connection URL
mongoose.connect('mongodb+srv://canteen_10-12:Billgates12345@cluster0.cy5qx.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define cart schema and model
const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [
        {
            itemName: { type: String, required: true },
            itemPrice: { type: Number, required: true },
            extraToppings: { type: String, required: true }
        }
    ],
    totalAmount: { type: Number, required: true }
});

const Cart = mongoose.model('Cart', cartSchema);

// API endpoint to save cart data
app.post('/api/saveCart', async (req, res) => {
    const { userId, items, totalAmount } = req.body;

    try {
        const existingCart = await Cart.findOne({ userId });

        if (existingCart) {
            // Update existing cart
            existingCart.items = items;
            existingCart.totalAmount = totalAmount;
            await existingCart.save();
            return res.status(200).json({ message: 'Cart updated successfully!' });
        } else {
            // Create a new cart
            const newCart = new Cart({ userId, items, totalAmount });
            await newCart.save();
            return res.status(201).json({ message: 'Cart saved successfully!' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// API endpoint to retrieve cart data
app.get('/api/getCart/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Set port and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
