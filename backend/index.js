const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/Product")
const bodyParser = require("body-parser");
const CityGrossData = require("./CityGross/fetchData");


//Configuration MongoDB
const db = "comparepricedb";
mongoose.connect('mongodb://localhost:27017/' + db, { 
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let citygross = new CityGrossData();
citygross.getAllData();


app.get("/api/products", async (req, res) => {
  await Product.find({}, (err, prod) => {
    if (err) {
      res.json(err);
    } else {
      res.json(prod);
    }
  })
});



const port = process.env.PORT ||4000;
app.listen(port, () => {
  console.log("Compare Price SERVER RUNNING!", port);
});