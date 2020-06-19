import React from "react";
import "./App.css";
import Form from "./components/Form";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditView from "./components/EditView";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Form} />
            <Route exact path="/edit/:index" component={EditView} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
