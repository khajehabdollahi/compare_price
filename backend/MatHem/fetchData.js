const fetch = require("node-fetch");
const Product = require("../models/Product");

let CategoryNames= [
  "frukt-o-gront", "mejeri-o-ost", "brod-o-bageri", "kott-o-chark", "dryck", "skafferi",
  "fisk-o-skaldjur", "hem-o-hygien", "fardigmat-o-halvfabrikat", "glass-godis-o-snacks",
  "barnmat-o-tillbehor", "apotek-o-halsa", "smaksattare", "djurmat-o-tillbehor", "kiosk",
];

module.exports = class MatHemData {
  getCategories = (category) => {
    if (category === "frukt-o-gront") {
      return "Frukt-och-Gront";
    } else if (category === "mejeri-o-ost") {
      return "Mejeri-ost-och-agg";
    } else if (category === "brod-o-bageri") {
      return "Brod-och-Kakor";
    } else if (category === "kott-o-chark") {
      return "Kott-chark-och-fagel";
    } else if (category === "dryck") {
      return "Dryck";
    } else if (category === "skafferi") {
      return "Skafferi";
    } else if (category === "fisk-o-skaldjur") {
      return "Fisk-och-Skaldjur";
    } else if (category === "hem-o-hygien") {
      return "Halsa-och-Skonhet";
    } else if (category === "fardigmat-o-halvfabrikat") {
      return "Fardigmat";
    } else if (category === "glass-godis-o-snacks") {
      return "Glass-godis-och-snacks";
    } else if (category === "barnmat-o-tillbehor") {
      return "Barn";
    } else if (category === "apotek-o-halsa") {
      return "Apotek";
    } else if (category === "smaksattre") {
      return "Skafferi";
    } else if (category === "djurmat-o-tillbehor") {
      return "Husdjur";
    } else if (category === "kiosk") {
      return "Kiosk";
    } else {
      return category;
    }
  };

  async fetchData(category) {
    let data = [];
    const url = `https://api.mathem.io/product-search/noauth/search/products/10/categorytag/${category}?size=1000&storeId=10&searchType=category&sortTerm=popular&sortOrder=desc`;
    let res = await fetch(url);
    const result = await res.json();
    data.push(result.products);

    (result.products).map((product) => {
      const dbProduct = {
        productName: product.name,
        description: product.fullName,
        image: product.images.MEDIUM,
        volume: product.quantity,
        price: product.price,
        unit: product.unit,
        comparePrice: product.comparisonPrice,
        category: product.category.name,
        shopName: product.shops[0].name
      };
      return Product.replaceOne(
        { productName: dbProduct.productName },
        dbProduct,
        {
          upsert: true,
        }
      ).exec();
    });

    return data;
  }

  async getAllProducts() {
    const result = await Promise.all(
      CategoryNames.map((category) => {
        this.fetchData(category)
      })
    );
    return result;
  }

  async getAllData() {
    await this.getAllProducts();
  }

  unitLookupTable(type) {
    return { 0: "g", 1: "hg", 2: "kg" }[type];
  }

  calculateVolume(product) {
    if (product.grossWeight)
      return `${product.grossWeight.value}${this.unitLookupTable(
        product.grossWeight.unitOfMeasure
      )}`;
    return undefined;
  }
};
