const fetch = require("node-fetch");
const Product = require("../models/Product");

let CategoryNumbers = [
  3467, 1501, 11178, 1502, 1504, 1510, 1505, 1448, 1511, 1508, 1515, 1512, 1513,
  1506, 1493, 11197, 1503, 1507, 1514, 1509, 3970, 2680, 3473,
];

module.exports = class CityGrossData {
  getCategories = (categories) => {
    if (categories === "skönhet & hygien" || categories === "hem & städ") {
      return "Halsa-och-Skonhet";
    } else if (categories === "barn") {
      return "Barn";
    } else if (categories === "blommor & tillbehör") {
      return categories;
    } else if (categories === "bröd & bageri") {
      return "Brod-och-Kakor";
    } else if (categories === "chark" || categories === "kött & fågel") {
      return "Kott-chark-och-fagel";
    } else if (categories === "dryck") {
      return "Dryck";
    } else if (categories === "fisk & skaldjur") {
      return "Fisk-och-Skaldjur";
    } else if (categories === "frukt & grönt") {
      return "Frukt-och-Gront";
    } else if (categories === "fryst" || categories === "kyld färdigmat") {
      return "Fardigmat";
    } else if (categories === "godis" || categories === "snacks") {
      return "Glass-godis-och-snacks";
    } else if (categories === "husdjur") {
      return "Husdjur";
    } else if (categories === "hälsa") {
      return "Apotek";
    } else if (categories === "manuell delikatess" || categories === "skafferiet"
    ) {
      return "Skafferi";
    } else if (categories === "mejeri, ost & ägg") {
      return "Mejeri-ost-och-agg";
    } else if (categories === "tobak") {
      return "tobak";
    } else {
      return categories;
    }
  };

  async fetchData(categoryID) {
    let data = [];
    const pageSize = 125;
    let currentPage = 0;
    while (true) {
      const url = `https://www.citygross.se/api/v1/esales/products?categoryId=${categoryID}&size=${pageSize}&page=${currentPage}`;
      let res = await fetch(url);;
      const result = await res.json();
      data = data.concat(result.data);
      if (currentPage >= result.meta.pageCount) {
        break;
      }
      currentPage += 1;
    }

    return data;
  }

  async saveCategoryProducts(categoryProducts) {
    return Promise.all(
      categoryProducts.map((product) => {
        const dbProduct = {
          productName: product.name,
          description: product.name,
          volume: this.calculateVolume(product),
          image:
            "https://www.citygross.se/images/products/" +
            product.images[0].url +
            "?w=300",
          price: product.defaultPrice.currentPrice.price,
          unit: product.defaultPrice.currentPrice.unit,
          comparePrice: product.defaultPrice.currentPrice.comparisonPrice,
          category: product.category,
          shopName: "citygross"
        };
        return Product.replaceOne(
          { productName: dbProduct.productName },
          dbProduct,
          {
            upsert: true,
          }
        ).exec();
      })
    );
  }

  async getAllProducts() {
    const result = await Promise.all(
      CategoryNumbers.map((category) => this.fetchData(category))
    );

    return result;
  }
  async saveCategories(categories) {
    return Promise.all(
      categories.map((category) => this.saveCategoryProducts(category))
    );
  }

  async getAllData() {
    const categories = await this.getAllProducts();
    await this.saveCategories(categories);
  }

  unitLookupTable(type) {
    return {0: "g", 1: "hg", 2: "kg" }[type];
  }

  calculateVolume(product) {
    if (product.grossWeight)
      return `${product.grossWeight.value}${this.unitLookupTable(
        product.grossWeight.unitOfMeasure
      )}`;
    return undefined;
  }
};
