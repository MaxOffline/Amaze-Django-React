import { Switch, Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Index from "./components/index";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/home" component={props => <Index {...props} />} />
        <Redirect from="/" to="/home" />
      </Switch>
    );
  }
}

export default App;
