const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

console.log("SERVER FILE LOADED");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/merabazar")
.then(() => console.log("MongoDB Connected Successfully ✅"))
.catch((err) => console.log("MongoDB Connection Failed ❌", err));

// Test Route
app.get('/', (req, res) => {
    res.send("Backend Running on 8000");
});

// Auth Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.listen(8000, () => {
    console.log("Server running on port 8000");
});
