import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./Components/navbar";
import logo from "./logo.svg";
import "./App.css";
import Market from "./Components/market";
import Orders from "./Components/orders";
import NotFound from "./Components/notFound";
import http from "./Services/httpServices";
import config from "./config.json";

class App extends Component {
  state = {};
  async componentDidMount() {
    //Call api Interval every 10 sec

    setInterval(async () => {
      http.patch(config.endPointUrl);
    }, 10000);
  }

  render() {
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
}

export default App;
