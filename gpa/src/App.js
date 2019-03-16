import React, { Component } from "react";

// import { Button } from "react-bootstrap";
import AppHeader from "./component/app.header";
import StudentForm from "./component/student.form";

import Grid from "@material-ui/core/Grid";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <AppHeader />
          </Grid>
          <Grid item xs={4} className="formFields">
            <StudentForm name="Student Name" type="text" fw />
          </Grid>
          <Grid item xs={4} className="formFields">
            <StudentForm name="Parents/Guardian Name" type="text" fw />
          </Grid>
          <Grid item xs={4} className="formFields">
            <StudentForm name="Email id" type="email" fw />
          </Grid>
          <Grid item xs={4} className="formFields">
            <StudentForm name="Phone Number" type="number" fw />
          </Grid>
          <Grid item xs={4} className="formFields">
            <StudentForm name="NEET Score:" type="number" fw />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
