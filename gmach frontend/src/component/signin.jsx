import React from "react";
import PageHeader from "./common/header";
import Joi from "joi-browser";
import Form from "./form";
import userService from "../services/userService";
import { Redirect } from "react-router-dom";

class Signin extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;
    try {
      await userService.login(email, password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: ex.response.data } });
      }
    }
  };

  render() {
    if (userService.getCurrentUser()) return <Redirect to="/" />;

    return (
      <>
        <PageHeader titleText="כניסת משתמש רשום" />

        <div
          className="container text-right"
          style={{ display: "grid", direction: "rtl" }}
        >
          <h4>נא כתוב פרטיך כדי שתוכל לבקש הלוואה</h4>

          <div className="col-lg-6 mt-4">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("email", "אימייל", "email")}
              {this.renderInput("password", "סיסמה", "password")}
              {this.renderButton("Signin")}
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Signin;
