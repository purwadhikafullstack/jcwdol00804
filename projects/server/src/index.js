require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const { db } = require("./config/db");
const {
  userRoute,
  addressRoute,
  citiesDataRoute,
  productRoute,
  cartRoute,
  orderRoute,
} = require("./routers");
const PORT = process.env.PORT || 8000;
const app = express();
const bearerToken = require("express-bearer-token");

app.use(cors());
app.use(bearerToken());
// app.use(
//   cors({
//     origin: [
//       process.env.WHITELISTED_DOMAIN &&
//         process.env.WHITELISTED_DOMAIN.split(","),
//     ],
//   })
// );
app.use(bearerToken());
app.use(express.static("public"));
app.use(express.json());

//#region API ROUTES

// ===========================
// NOTE : Add your routes here

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// ===========================

// not found
// app.use((req, res, next) => {
//   if (req.path.includes("/api/")) {
//     res.status(404).send("Not found !");
//   } else {
//     next();
//   }
// });

// error
// app.use((err, req, res, next) => {
//   if (req.path.includes("/api/")) {
//     console.error("Error : ", err.stack);
//     res.status(500).send("Error !");
//   } else {
//     next();
//   }
// });

// Route
app.use("/api/user", userRoute);
app.use("/api/address", addressRoute);
app.use("/api/cities-data", citiesDataRoute);
app.use("/api/product", productRoute);

// cart route
app.use("/api/cart", cartRoute);

// order route
app.use("/api/order", orderRoute);

// address route
app.use("/api/address", addressRoute);

// cities data route
app.use("/api/cities-data", citiesDataRoute);

// product route
app.use("/api/product", productRoute);

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

// Db connection
db.getConnection((err, connection) => {
  if (err) {
    console.log("MySQL Connection Error", err.sqlMessage);
  }
  console.log("MySQL Connection Success ✅", connection.threadId);
});

//#endregion
app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
