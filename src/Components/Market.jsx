import React, { Component } from "react";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import http from "../Services/httpServices";
import config from "../config.json";

class Market extends Component {
  _isMounted = false;
  state = {
    loading: false,
    stocks: [],
    hubConnection: null
  };
  async componentDidMount() {
    this._isMounted = true;

    // Get All Stocks From Database by Web Api
    if (this._isMounted) {
      await http.get(config.endPointUrl).then(response => {
        this.setState({
          loading: true,
          stocks: response.data
        });
      });
    }

    // connect to Hub to refresh DataBase

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

  //comoponent will not mount

  componentWillUnmount() {
    this._isMounted = false;
  }

  //do when database refreshed
  async refreshMarket() {
    if (this._isMounted) {
      await http.get(config.endPointUrl).then(response => {
        this.setState({
          stocks: response.data
        });
      });

      console.log("data refreshed");
    }
  }

  render() {
    let i = 0;
    if (!this.state.loading) {
      return <div>Loading Data ... </div>;
    } else {
      return (
        <React.Fragment>
          <h1>
            <span className="badge badge-light">Market</span>
          </h1>
          <table className="table  table-bordered table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Stock Name</th>
                <th scope="col">Price $</th>
              </tr>
            </thead>
            <tbody>
              {this.state.stocks.map(stock => (
                <tr key={stock.stockId}>
                  <th scope="row">{(i = i + 1)}</th>
                  <td>{stock.name}</td>
                  <td>{stock.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      );
    }
  }
}

export default Market;
