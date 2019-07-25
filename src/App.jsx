import React, { Component } from "react";
import { HubConnectionBuilder } from "@aspnet/signalr";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import Navbar from "./Components/navbar";
import "./App.css";
import Market from "./Components/market";
import Orders from "./Components/orders";
import NotFound from "./Components/notFound";
import http from "./Services/httpServices";
import config from "./config.json";

class App extends Component {
  state = {
    marketLoading: false,
    ordersLoading: false,
    stocks: [],
    hubConnection: null,
    Orders: []
  };
  componentDidMount() {
    // Get All Stocks From Database by Web Api
    this.getStocks();
    //get all orders

    setInterval(async () => {
      http.patch(config.stocksEndPointUrl);
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
        this.refreshStockPrice();
      });
    });
  }

  //get all Orders
  async getOrders() {
    await http
      .get(config.ordersEndPointUrl)
      .then(response => {
        this.setState({
          ordersLoading: true,
          orders: response.data
        });
      })
      .catch(err => {
        console.log("errors :", err);
      });
  }

  //get All Stocks
  async getStocks() {
    await http.get(config.stocksEndPointUrl).then(response => {
      this.setState({
        marketLoading: true,
        stocks: response.data
      });
      this.getOrders();
    });
  }
  refreshStockPrice() {
    this.getOrders();
  }

  async refreshMarket() {
    this.getStocks();
    toast("Prices Updated", { transition: Flip, autoClose: 2000 });
  }
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar />

        <main className="container mt-5">
          <Switch>
            <Route
              path="/market"
              render={props => (
                <Market
                  {...props}
                  loading={this.state.marketLoading}
                  stocks={this.state.stocks}
                />
              )}
            />
            <Route
              path="/orders"
              render={props => (
                <Orders
                  {...props}
                  loading={this.state.ordersLoading}
                  orders={this.state.orders}
                />
              )}
            />
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
