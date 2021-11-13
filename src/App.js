import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./views/Home";
import ProductContextProvider from "./contexts/ProductContextProvider";

function App() {
  return (
    <div className="App">
      <ProductContextProvider>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </ProductContextProvider>
    </div>
  );
}

export default App;
