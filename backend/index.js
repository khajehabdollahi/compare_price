const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/Product")
const bodyParser = require("body-parser");
const CityGrossData = require("./CityGross/fetchData");
const MatHemData = require("./MatHem/fetchData");


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

let mathem = new MatHemData();
mathem.getAllData();


app.get("/api/search", async (req, res) => {
  var regex = new RegExp(req.query.productname, "i");
  const query = {
    $text: { $search: regex }
  };
  await Product.find(
    query,
    (err, prod) => {
      if (err) {
        console.log(err);
      } else {
        res.json(prod);
      }
    }
  );
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("SERVER RUNNING!", port);
});