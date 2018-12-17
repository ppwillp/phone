import React, { Component } from "react";
import axios from "axios";

let currentTime = new Date().getTime();

const URL =
  "https://oma-gtsts-001.paypalcorp.com/AvayaMonitorScreensSvc/api/index.php?METHOD=getOmahaL1AvayaStats&_=" +
  currentTime;

class TableComponent extends Component {
  render() {
    return (
      <div className="container">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            <TableRow />
          </tbody>
        </table>
      </div>
    );
  }
}

class TableRow extends React.Component {
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
    if (Object.keys(this.state.errors).length > 0) {
      return <div>No available agents</div>;
    }
    if (Object.keys(this.state.none).length > 0) {
      return <div>No available agents</div>;
    }
    let getAgentDetails = agents.map(function(agent) {
      return (
        <div>
          <th scope="row" key={agents.indexOf}>
            {agents.indexOf}
          </th>
          <td key={agent.display_name}>{agent.display_name}</td>
          <td key={agent.state}>{agent.state}</td>
          <td key={agent.time_in_state}>{agent.time_in_state}</td>
        </div>
      );
    });
    return <tr>{getAgentDetails}</tr>;
  }
}

export default TableComponent;
