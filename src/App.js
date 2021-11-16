import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ItemList from "./container/items/item-list.component";

class App extends Component {
  render() {
    return (<ItemList />);
  }
}

export default App;