import React, { Component } from "react";

class Orders extends Component {
  handleBrokerOrPerson(order) {
    if (order.person == null) {
      return order.broker.name + "(broker)";
    } else {
      return order.person.name;
    }
  }

  render() {
    if (!this.props.loading) {
      return <h1>loading Orders ... </h1>;
    } else {
      return (
        <React.Fragment>
          <h1>
            <span className="badge badge-light">Orders Page</span>
          </h1>
          <table className="table  table-striped">
            <thead>
              <tr>
                <th scope="col">Person Name</th>
                <th scope="col">Stock Name</th>
                <th scope="col">Price $</th>
                <th scope="col">Quantity</th>
                <th scope="col">Commission</th>
              </tr>
            </thead>
            <tbody>
              {this.props.orders.map(order => (
                <tr key={order.orderId}>
                  <td>{this.handleBrokerOrPerson(order)}</td>
                  <td>{order.stock.name}</td>
                  <td>{order.stock.price}</td>
                  <td>{order.quantity}</td>
                  <td>{order.commission} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      );
    }
  }
}

export default Orders;
