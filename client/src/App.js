import React, { Component } from "react";

import TableComponent from "./components/TableComponent";
import TableComponent2 from "./components/TableComponent2";

import "./App.css";

let currentTime = new Date().getTime();

const URL =
  "https://oma-gtsts-001.paypalcorp.com/AvayaMonitorScreensSvc/api/index.php?METHOD=getOmahaL1AvayaStats&_=" +
  currentTime;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agents: []
    };
  }

  render() {
    return (
      <div className="App">
        <h1>MTS Phone Queue</h1>
        <TableComponent />
        <TableComponent2 />
      </div>
    );
  }
}

export default App;
