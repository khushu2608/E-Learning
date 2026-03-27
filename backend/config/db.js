const { default: mongoose } = require("mongoose");

const connectDB =()=>{
    mongoose.connect('mongodb://0.0.0.0:27017/e-learning')
        .then(()=>console.log("Database Connected Successfully"))
        .catch(()=>console.log("Not Connected"))
}

module.exports = connectDB;


