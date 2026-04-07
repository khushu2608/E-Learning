const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes")
const connectDB = require("./config/db");
const authMiddleware = require("./middlewares/authMiddleware");
require("dotenv").config()
const express=require("express")
const cors=require("cors")
const PORT = process.env.PORT || 5000;
const app=express();

app.use(cors())
app.use(express.json())
app.use("/uploads",express.static("uploads"))
app.get("/", (req, res) => {
    res.send("API is running");
})
app.use("/api/auth", authRoutes);
app.use("/api/course",courseRoutes);


const startServer = async () => {
    try {
        await connectDB(); 

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log(error);
    }
};


app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({
        message: "Protected route accessed",
        user: req.user
    });
});

startServer();
