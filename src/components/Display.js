import React, { useState, useContext } from "react";
import { Container, Form, FormGroup, Input, Button } from "reactstrap";
import { ProductContext } from "../contexts/ProductContextProvider";

const Display = () => {
  const { products } = useContext(ProductContext);

  const mapProducts = () => {
    return products.map((product, i) => {
      return (
        <ul key={"sub" + product._id + i}>
          <li>
            {i + 1}.<span> {product.productName}</span>
          </li>
        </ul>
      );
    });
  };

  return (
    <div>
      {products && mapProducts()}
    </div>
  )
};

export default Display;
