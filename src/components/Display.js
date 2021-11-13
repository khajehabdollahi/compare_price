import React, { useState, useContext } from "react";
import {
  CardColumns,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import { ProductContext } from "../contexts/ProductContextProvider";

const Display = () => {
  const { products } = useContext(ProductContext);

  const mapProducts = () => {
    return products.map((product, i) => {
      return (
        <div className="product" key={"sub" + product._id + i}>
          <CardColumns>
            <Card>
              <CardImg
                alt="Card image cap"
                src={product.image}
                style={{ width: "100px" }}
                top
                width="100%"
              />
              <CardBody>
                <CardTitle tag="h5">{product.productName}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Card subtitle
                </CardSubtitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
          </CardColumns>
        </div>
      );
    });
  };

  return <div>{products && mapProducts()}</div>;
};

export default Display;
