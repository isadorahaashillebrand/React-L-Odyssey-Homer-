import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, TextField, Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import "./SignUp.css";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "mon@email.com",
      password: "monPassw0rd",
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
    this.props.history.replace("/")
  };

  getData = (e) => {
    const { flash, open, ...user } = this.state;
    fetch("/auth/signin", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      // .then((res) => {
      //   console.log(res.json());
      //   if (res.ok){ return res.json()}
      //   else {throw new Error(res.statusText)};
      // })

      .then((res) => {
        this.props.dispatch({
          type: "CREATE_SESSION",
          user: res.user,
          token: res.token,
          message: res.message,
        });
        this.setState({ flash: this.props.flash });
      })
      .catch((err) => this.setState({ flash: err.message }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.getData();
    this.handleClick();
  };

  render() {
    // const storedata = JSON.stringify(this.state);
    return (
      <div className="SignIn">
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
          <div className="button">
            <Button
              className="button"
              variant="contained"
              color="primary"
              type="submit"
            >
              Sign In
            </Button>
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
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
          <Link to="/signup">Sign Up</Link>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    flash: state.auth.token,
  };
}

export default connect(mapStateToProps)(SignIn);
