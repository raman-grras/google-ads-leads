const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB, sequelize } = require("./db/db");
const PORT = 5050;
const dotenv = require("dotenv");

dotenv.config();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());


// const seedAdmin = require("./seeder/index")

// require("./models/user");
// require("./models/webhook");

// (async () => {
//   await connectDB();
//   await sequelize.sync();
//   await seedAdmin();
//   console.log("DB sync done");
// })();


const adminRoute = require("./routes/auth.route")
app.use("/api/auth", adminRoute)


const userRoute = require("./routes/user.route");

app.get("/",(req,res)=>{
  res.send("server running")
})
app.use("/api/users", userRoute);

const webhookRoute = require("./routes/webhook.route")
app.use("/api/web", webhookRoute)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
