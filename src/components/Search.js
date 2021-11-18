import React, {useState, useContext} from 'react'
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import { ProductContext } from "../contexts/ProductContextProvider";

const Search = () => {
  const { setMathemProducts, setCitygrossProducts } = useContext(ProductContext);
  const [searchItem, setSearchItem] = useState('');

  const sortMathemProducts = (prod) => {
    return prod.shopName === "mathem";
  }

  const sortCitygrossProducts = (prod) => {
    return prod.shopName === "citygross";
  };

  const searchProducts = async (e) => {
    e.preventDefault();
    let getProducts = await fetch(`/api/search?productname=${searchItem}`);
    getProducts = await getProducts.json();
  
    const mathem = getProducts.filter(sortMathemProducts)
    const citygross = getProducts.filter(sortCitygrossProducts)
    mathem.sort((a, b) => { return a.price - b.price })
    citygross.sort((a, b) => { return a.price - b.price });
    setMathemProducts(mathem);
    setCitygrossProducts(citygross);
  };

  return (

      <Row className="mt-5 d-flex justify-content-center" >
        <Col lg="10" className="">
          <Form onSubmit={searchProducts}>
            <FormGroup className="d-flex">
              <Input
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
              />
              <button className="btn btn-sm btn-outline-primary">
                Search!
              </button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
  );
}

export default Search
