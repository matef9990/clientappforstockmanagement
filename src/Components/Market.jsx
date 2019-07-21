import React, { Component } from "react";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";

class Market extends Component {
  state = {
    loading: false,
    stocks: [],
    hubConnection: null
  };
  async componentDidMount() {
    // Get All Stocks From Database by Web Api
    await fetch("http://localhost:60713/api/stocks")
      .then(response => response.json())
      .then(json => {
        this.setState({
          loading: true,
          stocks: json
        });
      });

    // connect to Hub to refresh DataBase

    const hubConnection = new HubConnectionBuilder()
      .withUrl(
        "http://localhost:60713/hubs/stocks",
        { skipNegotiation: true },
        { transport: Signalr.HttpTransportType.WebSockets }
      )
      .build();

    this.setState({ hubConnection }, () => {
      this.state.hubConnection
        .start()
        .then(() => console.log("SignalR Connected"))
        .catch(err => console.log("Error in Connecting SignalR"));
    });
  }
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
}

export default Market;
