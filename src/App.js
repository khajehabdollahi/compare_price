import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./views/Home";

function App() {
  return (
    <div className="App">
      <Router>
          <Header />
         <Switch>  
        
          <Route exact path="/" component={Home} /> 
      </Switch>                   
        </Router>
    </div>
  );
}

export default App;
