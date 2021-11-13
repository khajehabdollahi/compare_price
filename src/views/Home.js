import React from 'react'
import { Container, Row, Col } from "reactstrap";
import Search from '../components/Search';
import Display from '../components/Display';

const Home = () => {
  return (
    <Container>
      <Search />
      <Display/>
    </Container>
  )
}

export default Home
