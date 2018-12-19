import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import axios from "axios";

const URL =
  "https://oma-gtsts-001.paypalcorp.com/AvayaMonitorScreensSvc/api/index.php?METHOD=getOmahaL1AvayaStats&_=";

class TableComponent2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agents: [],
      errors: {},
      none: {}
    };
    this.getAgents = this.getAgents.bind(this);
  }

  componentDidMount(e) {
    this.getAgents();
    setInterval(this.getAgents, 60000);
    //this.getAgents();
  }

  getAgents() {
    let currentTime = new Date().getTime();
    axios
      .get(URL + currentTime)

      .then(response => {
        if (response.data.AGENT.has_results === 0) {
          this.setState({ none: response.data.AGENT });
          console.log("empty");
          console.log(response.data);
        } else {
          this.setState({ agents: response.data.AGENT.agents });
          console.log(response.data);
        }
      })
      .catch(err => this.setState({ errors: err }));
  }
  render() {
    let agents = this.state.agents;

    return (
      <div className="container">
        <BootstrapTable data={agents} version="4" striped>
          <TableHeaderColumn isKey dataField="display_name">
            Display Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="state">State</TableHeaderColumn>
          <TableHeaderColumn dataField="time_in_state">Time</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default TableComponent2;
