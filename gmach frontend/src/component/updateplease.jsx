import React from "react";
import PageHeader from "./common/header";
import Form from "./form";
import Joi from "joi-browser";
import pleaserservice from "../services/pleaserservice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class Editplease extends Form {
  state = {
    data: {
      _id: "",
      email: "",
      status: "",
      notes: "",
      text: "",
    },
    errors: {},
  };

  async componentDidMount() {
    console.log(this.props.match.params.id);
    const { data } = await pleaserservice.getPlease(this.props.match.params.id);
    this.setState({ data: this.mapDataToState(data) });
  }

  mapDataToState({ _id, email, status, notes, text }) {
    return {
      _id,
      email,
      text,
      status,
      notes,
    };
  }

  async doSubmit() {
    const { data } = this.state;
    const please = data;
    await pleaserservice.updatePlease(please);

    toast("Please is updated");
    this.props.history.replace("/status");
  }

  schema = {
    _id: Joi.string(),
    email: Joi.string().min(2).max(255).required().label("Email"),
    status: Joi.string().min(2).max(255).required().label("Status"),
    notes: Joi.string().min(2).max(255).required().label("Notes"),
    text: Joi.string().min(2).max(255).required().label("Text"),
  };

  render() {
    return (
      <div className="container">
        <PageHeader titleText="עריכת בקשה" />

        <div className="row drtr">
          <div className="col-lg-6">
            <form noValidate onSubmit={this.handleSubmit} method="POST">
              {this.renderInput("email", "אימייל")}
              {this.renderInput("status", "מצב הבקשה")}
              {this.renderInput("text", "תוכן הבקשה")}
              {this.renderInput("notes", "הערות")}

              {/* <div style={{
                marginBottom: 15
              }} > */}
              {this.renderButton("שלח הטופס")}

              <Link className="ml-4 mr-4 text-danger" to="..">
                ביטול
              </Link>

              {/* </div>           */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Editplease;
