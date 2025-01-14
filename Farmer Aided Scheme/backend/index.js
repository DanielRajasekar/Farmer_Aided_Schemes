const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const userRoute  = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 7000;

const corsOptions = {
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRoute);
app.use('/api/admin',adminRoute);
app.use('/api/user',userRoute);

const connectDB = async () =>{
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.r8psb.mongodb.net/FarmerScheme?retryWrites=true&w=majority');
        console.log('MongoDB Connected...');
}
catch (err) {
    console.error("Error connecting to the database: " + err);
    process.exit(1);
    }
    };

app.listen(PORT, async () =>{
    await connectDB();
    console.log("Server is running on port " + PORT);
})    
