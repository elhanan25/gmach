import React from "react";
import PageHeader from "./common/header";
import Form from "./form";
import Joi from "joi-browser";
import userService from "../services/userService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


class Edituser extends Form {
  state = {
    data: {
      _id: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      payments: "",
      takemoney: "",
      password:""
    },
    errors: {},
  };

  async componentDidMount() {
    const { data } = await userService.getUser(this.props.match.params.id);
    this.setState({ data : this.mapDataToState(data) });
      }

  mapDataToState({ _id, name, phone, address, email, takemoney, payments, password }) {
    return {
      _id,
      password, 
      name,
      phone,
      address,
      email,
      takemoney,
      payments,
    };
  }

  async doSubmit() {
    const { data } = this.state;
    const user = data;
    await userService.updateUser(user);

    toast("הפרטים עודכנו בהצלחה!");
    this.props.history.replace("/list");
  }

  schema = {
    _id: Joi.string(),
    name: Joi.string().min(2).max(255).required().label("Name"),
    address: Joi.string().min(2).max(400).required().label("User Address"),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label("User Phone"),
    email: Joi.string().label("email"),
    payments: Joi.string().min(2).max(255).label("payments"),
    takemoney: Joi.string().min(2).max(255).label("takemoney"),
  password:Joi.string().min(6).max(255)
  };

  render() {
    return (
      <div className="container text-right" style={{display: "grid", direction: "rtl"}}>
        <PageHeader titleText="עדכון פרטי משתמש" />
        
          <div className="col-lg-6">
            <form noValidate onSubmit={this.handleSubmit} method="POST">
              {this.renderInput("name", "שם")}
              {this.renderInput("email", "אימייל")}
              {this.renderInput("address", "כתובת")}
              {this.renderInput("phone", "טלפון")}
              {this.renderInput("takemoney", "סכום ההלוואה")}
              {this.renderInput("payments", "הפקדות")}

              {this.renderButton("שלח טופס")}

              <Link className="ml-4 text-danger" to="..">
                ביטול
              </Link>
            </form>
          </div>
        </div>
      
    );
  }
}

export default Edituser;
