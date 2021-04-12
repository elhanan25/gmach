import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import userService from "../services/userService";
import User from "./user";

class List extends Component {
  state = { users: [] };

  componentDidMount() {
    this.setDataFromDB();
  }
  async setDataFromDB() {
    
    const { data } = await userService.getAll();
    const data2 = data.filter((user) => user.isAdmin !== true); 
    this.setState({ users: data2 });
  }

  ondelete = async (id) => {
    alert('האם אתה בטוח שברצונך למחוק?')
    await userService.deleteuser(id);
    toast("one user deleted");
    this.setDataFromDB();
  };

  render() {
    const { users } = this.state;
    
    return (
      <div className="container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>מספר הלווה</th>
              <th>שם</th>
              <th>טלפון</th>
              <th>אימייל</th>
              <th>כתובת</th>
              <th>סכום ההלוואה הראשוני</th>
              <th>הפקדות</th>
              <th>הערות נוספות</th>
            </tr>
          </thead>
          <tbody>
            { users.length ? (
              users.map((user) => (
                <User
                  key={user._id}
                  user={user}
                  ondelete={() => this.ondelete(user._id)}
                   />
              ))
            ) : (
              <tr>
                <td>no users.. </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}
export default List;
