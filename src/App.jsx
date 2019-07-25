import React, { Component } from "react";
import { HubConnectionBuilder } from "@aspnet/signalr";
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
  state = {
    loading: false,
    stocks: [],
    hubConnection: null
  };
  async componentDidMount() {
    //Call api Interval every 10 sec

    // Get All Stocks From Database by Web Api
    await http.get(config.endPointUrl).then(response => {
      this.setState({
        loading: true,
        stocks: response.data
      });
    });

    setInterval(async () => {
      http.patch(config.endPointUrl);
    }, 10000);

    const hubConnection = new HubConnectionBuilder()
      .withUrl(config.signalrHubUrl)
      .build();

    this.setState({ hubConnection }, () => {
      this.state.hubConnection
        .start()
        .then(() => console.log("SignalR Connected"))
        .catch(err => console.log("Error in Connecting SignalR" + err));

      hubConnection.on("StocksList_Refreshed", () => {
        this.refreshMarket();
      });
    });
  }

  async refreshMarket() {
    await http.get(config.endPointUrl).then(response => {
      this.setState({
        stocks: response.data
      });
    });

    console.log("data refreshed");
  }
  render() {
    return (
      <React.Fragment>
        <Navbar />

        <main className="container mt-5">
          <Switch>
            <Route
              path="/market"
              render={props => (
                <Market
                  {...props}
                  loading={this.state.loading}
                  stocks={this.state.stocks}
                />
              )}
            />
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
