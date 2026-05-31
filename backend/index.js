const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const dns = require("dns");
dns.setServers(['8.8.8.8']);
const authRoutes = require("./routes/auth.js");
const eventRoutes = require("./routes/events.js");
const bookingRoutes = require("./routes/booking.js");


dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json());    

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
//DB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected Sucessfully..."); 
})
.catch((error) => {
    console.error("Error connecting to MongoDB:",error);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => {
    console.log(`Server is running on PORT: ${PORT}`);
});