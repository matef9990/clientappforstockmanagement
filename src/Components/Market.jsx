import React, { Component } from "react";
class Market extends Component {
  state = {
    loading: false,
    stocks: []
  };
  async componentDidMount() {
    await fetch("http://localhost:60713/api/stocks")
      .then(response => response.json())
      .then(json => {
        this.setState({
          loading: true,
          stocks: json
        });
      });
    // const url = "http://localhost:60713/api/stocks";
    // const response = await fetch(url);
    // const data = response.json();
    // this.setState({ stocks: data });
    // console.log(this.state.stocks);
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
