import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

class StudentForm extends Component {
  render() {
    return (
      <form noValidate autoComplete="off">
        <TextField
          id={this.props.name}
          label={this.props.name}
          margin="normal"
          type={this.props.type}
          fullWidth={this.props.fw}
        />
      </form>
    );
  }
}

export default StudentForm;
