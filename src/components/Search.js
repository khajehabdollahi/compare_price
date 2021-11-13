import React, {useState, useContext} from 'react'
import { Container, Form, FormGroup, Input, Button } from 'reactstrap';
import { ProductContext } from "../contexts/ProductContextProvider";

const Search = () => {
  const { setProducts } = useContext(ProductContext);
  const [searchItem, setSearchItem] = useState('');

  const searchProducts = async (e) => {
    e.preventDefault();
    let getProducts = await fetch(`/api/search?productname=${searchItem}`);
    getProducts = await getProducts.json();
    setProducts(getProducts);
  };

  return (
    <Container>
      <div className="mt-5">
        <Form onSubmit={searchProducts}>
          <FormGroup>
            <Input
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
            <Button>Search!</Button>
          </FormGroup>
        </Form>
      </div>
    </Container>
  );
}

export default Search
