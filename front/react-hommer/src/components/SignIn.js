import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import "./SignUp.css";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "mon@email.com",
      password: "monPassw0rd",
    };
  }

  updateField = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({ [name]: value });
  };

  //   handleSubmit = (e) => {
  //     e.preventDefault();
  //   };

  render() {
    // const storedata = JSON.stringify(this.state);
    return (
      <div className="SignIn">
        <form>
          <div className="input">
            <p>E-mail:</p>
            <TextField type="email" name="email" onChange={this.updateField} />
          </div>
          <div className="input">
            <p>Password:</p>
            <TextField
              type="password"
              name="password"
              onChange={this.updateField}
            />
          </div>
          <Button className="ButtonSubmit" variant="primary">
            <Link to="/profile">Submit</Link>
          </Button>
          <Link to="/signup">Sign Up</Link>
        </form>
      </div>
    );
  }
}

export default SignIn;
