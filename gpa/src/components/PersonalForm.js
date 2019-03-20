import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import getGPA from "../util/check";
import AlertDialog from "../components/Dialog";
import axios from "axios";
import Button from "@material-ui/core/Button";
import {
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    minWidth: 500
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 60
  },
  label: {
    marginRight: theme.spacing.unit
  }
});

class PersonalForm extends Component {
  constructor(props) {
    super(props);
    const range = [];

    for (let i = 2010; i <= 2030; i++) {
      range.push(i);
    }
    this.state = {
      open: true,
      submit: "Get Details",
      showD: false,
      showResult: false,
      truOTP: "",
      modalState: "false",
      data: {
        yearOfpassingTenth: "",
        yearOfpassingTwelth: ""
      },
      yearRngeX: range
    };
  }
  getRound = value => {
    if (value >= 35 && value <= 39) return 2;

    if (value >= 40 && value <= 49) return 2.5;
    if (value >= 50 && value <= 59) return 3;
    if (value >= 60 && value <= 69) return 3.5;
    if (value >= 70 && value <= 79) return 4;
    if (value >= 80 && value <= 100) return 5;
  };

  handleData = (key, value) => {
    console.log(key, this.state.data);
    this.setState(
      {
        data: {
          ...this.state.data,
          [key]: this.getRound(parseInt(value)) || value
        }
      },
      () => console.log("")
    );
  };
  handleOtp = (key, value) => {
    let otp = parseInt(value);
    console.log(this.state.data);
    let stateData = this.state.data;
    try {
      if (value.length == 4) {
        this.setState({
          showD: true
        });

        if (value == this.state.truOTP) {
          this.setState({
            showResult: true
          });
        }
      }
    } catch (e) {}
    this.setState(
      {
        data: {
          ...this.state.data,
          [key]: parseInt(value)
        }
      },
      () => console.log("")
    );
  };

  handleChange = event => {
    console.log(event.target.value);
    this.setState(
      {
        data: {
          ...this.state.data,
          [event.target.name]: event.target.value
        }
      },
      () => console.log(this.state)
    );
  };

  handleClick = value => {
    this.setState({
      submit: "Enter 4 Digit to see GPA"
    });
    axios
      .get(`http://localhost:8080/lists?mobile=${this.state.data.number}`)
      .then(res => {
        // {number: "918707484110", otp: 2561}
        console.log(res.data);
        this.setState({ truOTP: res.data.otp });
      });
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };

  renderTenthSubFields = () => {
    const { classes } = this.props;
    const sub = [1, 2, 3, 4, 5];
    return sub.map(value => (
      <Grid item xs={12} key={value}>
        <InputLabel className={classes.label}>{`Subject ${value}`}</InputLabel>
        <TextField
          className={classes.textField}
          onChange={evt => {
            this.handleData(`Subject${value}Marks`, evt.target.value);
          }}
        />
        <InputLabel className={classes.label}>Out of:</InputLabel>
        <TextField
          onChange={evt => {
            this.handleData(`SubjectTotal${value}Marks`, evt.target.value);
          }}
          className={classes.textField}
        />
      </Grid>
    ));
  };
  renderTwelveSubFields = () => {
    const { classes } = this.props;
    const sub = [1, 2, 3];
    return sub.map(value => (
      <Grid item xs={12} key={value}>
        <InputLabel className={classes.label}>{` ${
          value === 1 ? "Biology" : value === 2 ? "Physics" : "Chemistry"
        }`}</InputLabel>
        <TextField
          className={classes.textField}
          onChange={evt => {
            this.handleData(
              value === 1 ? "Biology" : value === 2 ? "Physics" : "Chemistry",
              evt.target.value
            );
          }}
        />
        <InputLabel className={classes.label}>Out of:</InputLabel>
        <TextField
          onChange={evt => {
            this.handleData(
              value === 1
                ? "BiologyTotal"
                : value === 2
                ? "PhysicsTotal"
                : "ChemistryTotal",
              evt.target.value
            );
          }}
          className={classes.textField}
        />
      </Grid>
    ));
  };
  render() {
    const { classes } = this.props;
    const { data } = this.state;

    this.state.modalState = getGPA(data);

    return (
      <React.Fragment>
        <Typography variant="h6" color="inherit" noWrap>
          Calculate your GPA
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="studentName"
              name="studentName"
              label="Student name"
              fullWidth
              onChange={evt => {
                this.handleData(`Student Name`, evt.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="parentName"
              name="parentName"
              label="Parents/Guardian name"
              onChange={evt => {
                this.handleData(`parentName`, evt.target.value);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email id"
              onChange={evt => {
                this.handleData(`email`, evt.target.value);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="number"
              name="number"
              label="Phone Number"
              onChange={evt => {
                this.handleData(`number`, evt.target.value);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="score"
              name="score"
              onChange={evt => {
                this.handleData(`neetnumber`, evt.target.value);
              }}
              label="NEET Score"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="yearOfpassingTenth-simple">
                Year of Passing Class 10/SSC/X/O Level:
              </InputLabel>
              <Select
                value={data.yearOfpassingTenth}
                onChange={this.handleChange}
                inputProps={{
                  name: "yearOfpassingTenth",
                  id: "yearOfpassingTenth-simple"
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {this.state.yearRngeX.map(year => (
                  <MenuItem value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {this.renderTenthSubFields()}
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="yearOfpassingTwelth-simple">
                Year of Passing Class 12/HSC/XII/A Level:
              </InputLabel>
              <Select
                value={data.yearOfpassingTwelth}
                onChange={this.handleChange}
                inputProps={{
                  name: "yearOfpassingTwelth",
                  id: "yearOfpassingTwelth-simple"
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {this.state.yearRngeX.map(year => (
                  <MenuItem value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {this.renderTwelveSubFields()}
        </Grid>
        {/* {this.state.modalState && (
          <AlertDialog open={this.state.open} handleClose={this.handleClose} />
        )} */}
        <Button onClick={this.handleClick} color="primary">
          {this.state.submit}
        </Button>
        {this.state.submit == "Enter 4 Digit to see GPA" ? (
          <TextField
            type="number"
            onChange={evt => {
              console.log(evt.target.value);
              this.handleOtp("otp", evt.target.value);
            }}
            placeholder="Enter 4 Digit OTP"
          />
        ) : (
          ""
        )}
        <br />
        <br />

        {this.state.showD ? (
          <h2>
            {this.state.showResult === false
              ? "Sorry!! Not Eligible "
              : `Congratulation your Eligible to Apply!! with GPA ${
                  this.state.modalState
                } `}
          </h2>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

PersonalForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PersonalForm);
