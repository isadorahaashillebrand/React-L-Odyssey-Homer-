import React, { Component } from "react";
import { Button, List, ListItem, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        email: "homer.simpson@wildcodeschool.fr",
        name: "Homer",
        lastname: "Simpson",
      },
    };
  }
  componentDidMount() {
    if (this.props.token) {
      fetch("/profile", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.props.token,
        },
      })
        .then((res) => res.json())
        .then((res) => this.setState(res));
    }
  }
  render() {
    return (
      <List className="classes.root">
        <ListItem>
          <ListItemText primary="Email" secondary={this.state.email} />
          <ListItemText primary="Name" secondary={this.state.name} />
          <ListItemText primary="LastName" secondary={this.state.lastname} />
        </ListItem>
        <Button variant="contained" color="primary" type="submit" name="submit">
          <Link className="" to="/signin">
            Sign Out
          </Link>
        </Button>
      </List>
    );
  }
}
const mapStateToProps = (state) => {
  return { token: state.auth.token };
};
export default connect(mapStateToProps)(Profile);
