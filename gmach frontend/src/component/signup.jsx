import React from "react";
import PageHeader from "./common/header";
import Joi from "joi-browser";
import Form from "./form";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import userService from "../services/userService";

class Signup extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    name: Joi.string().required().min(2).label("Name"),
  };

  doSubmit = async () => {
    const { data } = this.state;
    try {
      let response = await http.post(`${apiUrl}/users`, data);
      toast("new user in ...");
      this.props.history.replace("/signin");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: ex.response.data.errors } });
      }
    }
  };

  render() {
    if (userService.getCurrentUser()) return <Redirect to="/" />;
    return (
      <>
      <PageHeader titleText="רישום פרטי משתמש חדש " />
      <div className="container  text-right" style={{ display: "grid", direction:"rtl" }}>
        
        
          <p>תוכל לרשום כאן את פרטיך ולהירשם כאחד מאנשי הגמ"ח</p>
                
          <div className="col-lg-6 text-right">
            <form  className="col-6 text-right" onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("email", "אימייל", "email")}
              {this.renderInput("password", "סיסמה", "password")}
              {this.renderInput("name", "שם", "name")}
              
              {this.renderButton("Sign up")}
            </form>
            </div>  
        </div>
     
     </>
    );
  }
}

export default Signup;
