import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { MuiThemeProvider, Grid, Paper } from "@material-ui/core";
import "./App.css";
import SignUp from "./conteiners/SignUp";
import SignIn from "./conteiners/SignIn";
import Profile from "./conteiners/Profile";
import requireAuth from "./hoc/requireAuth";
import requireNotAuth from "./hoc/requireNotAuth";

function App() {
  return (
    <div className="App">
      <MuiThemeProvider>
        <Grid container alignItems="center" style={{ height: "100%" }}>
          <Grid item xs={12}>
            <Paper elevation={4} style={{ margin: 32 }}>
              <Grid container alignItems="center" justify="center">
                <Grid item xs={12} sm={6} style={{ "text-align": "center" }}>
                  <img
                    src="http://images.innoveduc.fr/react_odyssey_homer/wildhomer.png"
                    alt="Homer"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <BrowserRouter>
                    <Switch>
                      <Redirect exact from="/" to="/profile" />
                      <Route
                        exact
                        path="/signin"
                        component={requireNotAuth(SignIn)}
                      />
                      <Route
                        exact
                        path="/signup"
                        component={requireNotAuth(SignUp)}
                      />
                      <Route
                        exact
                        path="/profile"
                        component={requireAuth(Profile)}
                      />
                    </Switch>
                  </BrowserRouter>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
