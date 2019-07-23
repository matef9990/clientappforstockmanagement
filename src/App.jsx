import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./Components/navbar";
import logo from "./logo.svg";
import "./App.css";
import Market from "./Components/market";
import Orders from "./Components/orders";
import NotFound from "./Components/notFound";

function App() {
  return (
    <React.Fragment>
      <Navbar />

      <main className="container mt-5">
        <Switch>
          <Route path="/market" component={Market} />
          <Route path="/orders" component={Orders} />
          <Route path="/notFound" component={NotFound} />
          <Redirect path="/" exact to="/market" />
          <Redirect to="/notFound" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
