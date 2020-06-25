import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import "./SignUp.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "mon@email.com",
      password: "monPassw0rd",
      name: "James",
      lastname: "Bond",
      flash: "",
      open: false,
    };
  }

  updateField = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    this.setState({ open: true });
  };
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  getData = () => {
    const { flash, open, ...user } = this.state;
    fetch("/auth/signup", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then(
        (res) => this.setState({ flash: res.flash }),
        (err) => this.setState({ flash: err.flash })
      );
      this.props.history.push('/');
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.handleClick();
    this.getData();
  };

  render() {
    const storedata = JSON.stringify(this.state);
    return (
      <div className="SignUp">
        <h3>{storedata}</h3>
        <form onSubmit={this.handleSubmit}>
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
          <div className="input">
            <p>Name:</p>
            <TextField type="text" name="name" onChange={this.updateField} />
          </div>
          <div className="input">
            <p>Last Name:</p>
            <TextField
              type="text"
              name="lastname"
              onChange={this.updateField}
            />
          </div>
          <div className="button">
            <Button
              className="button"
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open={this.state.open}
              autoHideDuration={6000}
              onClose={this.handleClose}
              message={this.state.flash}
              action={
                <React.Fragment>
                  <Button
                    color="secondary"
                    size="small"
                    onClick={this.handleClose}
                  >
                    UNDO
                  </Button>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={this.handleClose}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
          </div>
          <Link to="/signin">I already have an account</Link>
        </form>
      </div>
    );
  }
}

export default SignUp;
