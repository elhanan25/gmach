import { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import "bootstrap/dist/css/bootstrap.min.css";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
   const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!error) {
      return null;
    }

    const errors = {};
    for (const detailsItem of error.details) {
      errors[detailsItem.path[0]] = detailsItem.message;
    }

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const propertyObj = { [name]: value };
    const propertySchema = { [name]: this.schema[name] };

    const { error } = Joi.validate(propertyObj, propertySchema);
    return error && error.details[0].message;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
   if (errors) {
      return;
    }
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const updatedData = { ...this.state.data };
    updatedData[input.name] = input.value;

    this.setState({ data: updatedData, errors });
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        label={label}
        name={name}
        onChange={this.handleChange}
        error={errors[name]}
        value={data[name]}
      />
    );
  }

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
}

export default Form;
