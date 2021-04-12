import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import pleaserservice from "../services/pleaserservice";
import Please from "./please";

class Status extends Component {
  state = { pleasers: [], errors: {} };

  componentDidMount() {
    this.setDataFromDB();
  }
  async setDataFromDB() {
    const { data } = await pleaserservice.getpleaseAll();
    this.setState({ pleasers: data });
  }

  ondelete = async (id) => {
    alert("האם אתה בטוח שברצונך למחוק?");
    await pleaserservice.deletepleaser(id);
    toast("one please deleted!");
    this.setDataFromDB();
  };

  render() {
    const { pleasers } = this.state;

    return (
      <div className="container text-center">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>מספר בקשה</th>
              <th>שם המבקש</th>
              <th>מצב הבקשה</th>
              <th>הערות</th>
            </tr>
          </thead>
          <tbody>
            {pleasers.length ? (
              pleasers.map((pleaser) => (
                <Please
                  pleaser={pleaser}
                  ondelete={() => this.ondelete(pleaser._id)}
                />
              ))
            ) : (
              <tr>
                <td>no pleasers.. </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Status;
