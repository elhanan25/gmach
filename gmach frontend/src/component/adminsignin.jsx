import React from "react";
import PageHeader from "./common/header";
import Joi from "joi-browser";
import Form from "./form";
import userService from "../services/userService";
import { Redirect } from "react-router-dom";

class Adminsignin extends Form {
  state = {
    user: {},
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  doSubmit = async () => {
    console.log("fffffffffff");
    const { email, password } = this.state.data;
    try {
      await userService.login(email, password);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: ex.response.data } });
      }
    }
    const user = await userService.getUserInfo();
    if (user.isAdmin) {
      this.setState({ user });
    }
  };

  render() {
    // if (userService.getCurrentUser()) return <Redirect to="/" />;

    return (
      // <div className="container">
      <>
        <PageHeader titleText="כניסת מנהל" />

        <div
          className="container text-right"
          style={{ display: "grid", direction: "rtl" }}
        >
          <h4>נא כתוב פרטיך כדי שתוכל להיכנס כמנהל</h4>

          {/* <div className="d-flex" style={{ display: "flex", alignItems:"right" }}> */}
          {/* <div className="col-lg-6"> */}
          <div className="col-lg-6 mt-4">
            <form onSubmit={this.handleSubmit} autoComplete="on" method="POST">
              {this.renderInput("email", "אימייל", "email")}
              {this.renderInput("password", "סיסמה", "password")}
              {this.renderButton("Signin")}
            </form>
          </div>
        </div>
        {/* </div> */}
      </>
    );
  }
}

export default Adminsignin;
