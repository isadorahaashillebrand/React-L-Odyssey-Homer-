import React, { Component } from "react";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "mon@email.com",
      password: "monPassw0rd",
      name: "James",
      lastname: "Bond",
    };
  }

  updateField = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    let data = this.state;
    e.preventDefault();
    console.log(data);
  };

  render() {
    const storedata = JSON.stringify(this.state);

    return (
      <div className="SignUp">
        <h3>{storedata}</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="input">
            <p>E-mail:</p>
            <input type="email" name="email" onChange={this.updateField} />
          </div>
          <div className="input">
            <p>Password:</p>
            <input
              type="password"
              name="password"
              onChange={this.updateField}
            />
          </div>
          <div className="input">
            <p>Password Verification:</p>
            <input
              type="password"
              name="passwordconf"
              onChange={this.updateField}
            />
          </div>
          <div className="input">
            <p>Name:</p>
            <input type="text" name="name" onChange={this.updateField} />
          </div>
          <div className="input">
            <p>Last Name:</p>
            <input type="text" name="lastname" onChange={this.updateField} />
          </div>
          <div className="sumit" style = {{marginTop:'20px'}}>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
