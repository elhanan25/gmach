import Table from "react-bootstrap/Table";
import React, { Component } from 'react';
import userService from '../services/userService';
import pleaserservice from '../services/pleaserservice';

class Mystatus extends Component {

state = {user:{}, pleasers:[]};

 async componentDidMount() {
    const user = await userService.getUserInfo();
    this.setState({ user} );
    console.log('aaaaaaa');
    this.getpleasers();
    
  }

 getpleasers = async () => {
   const {data} = await pleaserservice.getPleasers(this.state.user.email);
   this.setState({ pleasers: data });
}
render() {
  const {pleasers} = this.state;
  return (
      <div>
      <button className="success ml-4 mt-4 btn btn-success" onClick={()=> {this.getpleasers()}}>טען מחדש את הפרטים</button>
      <Table striped bordered hover>
          <thead>
            <tr>
              <th>מספר הבקשה</th>
              <th>שם המבקש</th>
              <th>מצב הבקשה</th>
              <th>הערות</th>
              
              </tr>
          </thead>
          <tbody>
            { pleasers.length ? (
              pleasers.map((please) => (
                <tr>
                 <td>{please._id}</td>
                 <td>{please.text}</td>
                 <td>{please.status}</td>
                 <td>{please.notes}</td>
                 </tr>
                 
              ))
            ) : (
              <tr>
                <td>no pleasers.. </td>
              </tr>
            )}
          </tbody>
        </Table>
        </div>
)}}

 
export default Mystatus;