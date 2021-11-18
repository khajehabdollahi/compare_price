import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText
} from "reactstrap";
import { ProductContext } from "../contexts/ProductContextProvider";

const Display = () => {
  const { mathemProducts, citygrossProducts } = useContext(ProductContext);

  const mapMathemProducts = () => {
    return mathemProducts.map((product, i) => {
      return (
          <Card
            className="product border-success"
            key={"sub" + product._id + i}
            style={{ marginTop: "20px" }}
          >
            <CardImg
              alt="Card image cap"
              src={product.image}
              style={{
                maxWidth: "90px",
                maxHeight: "150px",
                paddingTop: "20px",
                paddingLeft: "20px",
              }}
              top
              width="100%"
            />
            <CardBody>
              <CardTitle tag="h5">{product.productName}</CardTitle>
              <CardSubtitle className="mb-2 text-capitalize text-info" tag="h6">
                Price: {product.price} {product.unit}
              </CardSubtitle>
              <CardText className="text-uppercase">{product.shopName}</CardText>

              <button className="btn btn-sm btn-outline-success d-block">
                BUY
              </button>
            </CardBody>
          </Card>
      );
    });
  };

  const mapCitygrossProducts = () => {
    return citygrossProducts.map((product, i) => {
      return (
        <Card
          className="product border-success"
          key={"sub" + product._id + i}
          style={{ marginTop: "20px" }}
        >
          <div style={{ height: "90px" }}>
            <CardImg
              alt="Card image cap"
              src={product.image}
              style={{
                maxWidth: "70px",
                maxHeight: "100px",
                paddingTop: "20px",
                paddingLeft: "20px",
              }}
              top
              width="100%"
            />
          </div>
          <CardBody>
            <CardTitle tag="h5">{product.productName}</CardTitle>
            <CardSubtitle className="mb-2 text-capitalize text-info" tag="h6">
              Price: {product.price} {product.unit}
            </CardSubtitle>
            <CardText className="text-uppercase">{product.shopName}</CardText>

            <button className="btn btn-sm btn-outline-success d-block">
              BUY
            </button>
          </CardBody>
        </Card>
      );
    });
  };

  return (
      <Row className="d-flex justify-content-center">
        <Col lg="5">{mathemProducts && mapMathemProducts()}</Col>
        <Col lg="5"> {citygrossProducts && mapCitygrossProducts()}</Col>
      </Row>
  );
};

export default Display;
