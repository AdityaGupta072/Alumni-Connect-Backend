require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const cors =require("cors");
const authRoute=require("./routes/authRoutes");
const userRoute=require("./routes/userRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const app=express();


app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));
    
// Use Routes

app.use("/api/auth", authRoute); //authentication
app.use("/api/users",userRoute); //Users
app.use("/api/announcements", announcementRoutes);//announcements

app.get("/", (req, res) => {
    res.send(" Alumni Connect API is Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));