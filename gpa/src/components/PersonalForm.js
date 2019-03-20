import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: 500,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 60,
  },
  label: {
    marginRight: theme.spacing.unit,
  }
});

class PersonalForm extends Component {

  constructor (props) {
    super(props);
    const range = [];

    for(let i=2010;i<=2030;i++){
      range.push(i);
    }
    this.state = {
      data: {
        yearOfpassingTenth: '',
      },
      yearRngeX : range
    };
  }

  handleData = (key, value) => {
    this.setState({ data: {
      ...this.state.data,
      [key]: value
    }}, () => console.log(this.state));
  }

  handleChange = event => {
    console.log('====================================');
    console.log(event.target);
    console.log('====================================');
    this.setState({ data: {
      ...this.state.data,
      [event.target.name]: event.target.value
    }}, () => console.log(this.state));
  };

  renderTenthSubFields = () => {
    const { classes } = this.props;
    const sub = [1, 2, 3, 4, 5];
    return sub.map((value) => (
      <Grid item xs={12} key={value}>
        <InputLabel
          className={classes.label}
        >
          {`Subject ${value}:`}
        </InputLabel>
        <TextField
          className={classes.textField}
          onChange={(evt) => {
            this.handleData(`Subject-${value}-Marks:`, evt.target.value);
          }}
        />
        <InputLabel
          className={classes.label}
        >
          Out of:
        </InputLabel>
        <TextField
          className={classes.textField}
        />
      </Grid>
    ));
  }
  render() {
    const { classes } = this.props;
    const { data } = this.state;
    console.log('====================================');
    console.log(data);
    console.log('====================================');
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="parentName"
              name="parentName"
              label="Parents/Guardian name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email id"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="number"
              name="number"
              label="Phone Number"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="score"
              name="score"
              label="NEET Score"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="yearOfpassingTenth-simple">Year of Passing Class 10/SSC/X/O Level:</InputLabel>
              <Select
                value={data.yearOfpassingTenth}
                onChange={this.handleChange}
                inputProps={{
                  name: 'yearOfpassingTenth',
                  id: 'yearOfpassingTenth-simple',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
                  this.state.yearRngeX.map(year => <MenuItem value={year}>{year}</MenuItem>)
                }
              </Select>
            </FormControl>
          </Grid>
          {this.renderTenthSubFields()}
        </Grid>
      </React.Fragment>
    );
  }
}

PersonalForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersonalForm);
