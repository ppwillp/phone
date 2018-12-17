import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import axios from "axios";
let currentTime = new Date().getTime();

const URL =
  "https://oma-gtsts-001.paypalcorp.com/AvayaMonitorScreensSvc/api/index.php?METHOD=getOmahaL1AvayaStats&_=" +
  currentTime;

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
    //this.getAgents();
    let activeAgents = setInterval(this.getAgents, 3000);
  }

  getAgents() {
    axios
      .get(URL)
      .then(response => {
        if (response.data.AGENT.has_results === 0) {
          this.setState({ none: "No agents online" });
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
          <TableHeaderColumn isKey dataField="id">
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="display_name">
            Display Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="state">State</TableHeaderColumn>
          <TableHeaderColumn dataField="time_in_state">Time</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

/*class TableRow2 extends React.Component {
    constructor(props) {
        super(props);
        this.setState = {
            agents: [],
            errors: {},
            none: {}
        }
        this.getAgents = this.getAgents.bind(this);
    }

    componentDidMount(e) {
        //this.getAgents();
        let activeAgents = setInterval(this.getAgents, 3000);
      }
    
      getAgents() {
        axios
          .get(URL)
          .then(response => {
            if (response.data.AGENT.has_results === 0) {
              this.setState({ none: "No agents online" });
            } else {
              this.setState({ agents: response.data.AGENT.agents });
              console.log(response.data);
            }
          })
          .catch(err => this.setState({ errors: err }));
      }
  render() {
    return <div />;
  }
}*/

export default TableComponent2;
