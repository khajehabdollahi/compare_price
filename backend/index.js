const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.get("/", (req, res) => {
  res.send('Yes we start noe')
})



const port = process.env.PORT ||4000;
app.listen(port, () => {
  console.log("Compare Price SERVER RUNNING!", port);
});