import React, { Component } from "react";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import axios from "axios";

class Market extends Component {
  state = {
    loading: false,
    stocks: [],
    hubConnection: null
  };
  async componentDidMount() {
    // Get All Stocks From Database by Web Api

    await axios.get("http://localhost:60713/api/stocks").then(response => {
      this.setState({
        loading: true,
        stocks: response.data
      });
    });

    //Call api Interval every 10 sec

    setInterval(async () => {
      axios.patch("http://localhost:60713/api/stocks");
    }, 10000);

    // connect to Hub to refresh DataBase

    const hubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:60713/hubs/stocks")
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

  render() {
    let i = 0;
    if (!this.state.loading) {
      return <div>Loading Data </div>;
    } else {
      return (
        <React.Fragment>
          <h1>Market</h1>
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

  async refreshMarket() {
    await axios.get("http://localhost:60713/api/stocks").then(response => {
      this.setState({
        stocks: response.data
      });
    });

    console.log("data refreshed");
  }
}

export default Market;
