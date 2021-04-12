import React from "react";
import PageHeader from "./common/header";
import Joi from "joi-browser";
import Form from "./form";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import userService from "../services/userService";

class Please extends Form {
  state = {
    data: { text: "", notes: "", email: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("email"),
    text: Joi.string().required().min(6).label("text"),
    notes: Joi.string().required().min(2).label("notes"),
  };

  doSubmit = async () => {
    const { data } = this.state;
    try {
      await http.post(`${apiUrl}/pleasers`, data);
      toast("new pleaser in ...");
      this.props.history.replace("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { please: ex.response.data.errors } });
      }
    }
  };

  render() {
    return (
      <>
        <div className="container text-right" style={{ direction: "rtl" }}>
          <PageHeader titleText="הגשת בקשה חדשה להלוואה" />
          <div className="container" style={{ direction: "rtl" }}>
            <p>נא כתוב את פרטי בקשתך ויטופל בהקדם:</p>

            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("email", "אימייל", "email")}
              {this.renderInput("text", "תוכן הבקשה", "text")}
              {this.renderInput("notes", "הערות", "notes")}

              <h3>צרף המלצות ואישורים של ערבים</h3>

              <button className="btn btn-success">send please</button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Please;
