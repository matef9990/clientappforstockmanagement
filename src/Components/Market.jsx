import React, { Component } from "react";
class Market extends Component {
  state = {
    loading: true,
    Stocks: []
  };
  async componentDidMount() {
    const url = "http://localhost:60713/api/stocks";
    const response = await fetch(url);
    const data = response.json();
    console.log(data);
  }
  render() {
    return <h1>Market</h1>;
  }
}

export default Market;
