import React, { Component } from "react";

class Market extends Component {
  render() {
    let i = 0;
    if (!this.props.loading) {
      return <div>Loading Data ... </div>;
    } else {
      return (
        <React.Fragment>
          <h1>
            <span className="badge badge-light">Market</span>
          </h1>
          <table className="table table-sm  table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Stock Name</th>
                <th scope="col">Price $</th>
              </tr>
            </thead>
            <tbody>
              {this.props.stocks.map(stock => (
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
