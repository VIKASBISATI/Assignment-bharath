import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import SelectDropdown from "./SelectDropdown";
import MultiSelectDropdown from "./MultiSelectDropdown";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { setPersonalData } from "../redux/dataAction";
import ListItems from "./ListItems";
import { withStyles } from "@material-ui/core/styles";


const styles = (theme) => ({
  root: {
    backgroundColor: "#9ACD32",
    margin: "0.5rem"
  },
});

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      clearItems: false,
      gender: "",
      interests: [],
      personalDetails: props.personalData,
    };
  }
  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  clearFields = () => {
    this.setState({
      name: "",
      clearItems: true,
      gender: "",
      interests: [],
      personalDetails: [],
    });
  };
  componentDidUpdate() {
    if (this.state.clearItems) {
      this.setState({
        clearItems: false,
      });
    }
  }
  setGenderInForm = (gender) => {
    this.setState({
      gender: gender,
    });
  };
  submitForm = () => {
    const { name, interests, gender, personalDetails } = this.state;
    let data = {
      name: name,
      interests: interests,
      gender: gender,
    };
    let personalData = personalDetails;
    personalData.push(data);
    this.setState({
      personalDetails: personalData,
      name: "",
      gender: "",
      interests: [],
      clearItems: true,
    });
    this.props.setPersonalData(personalData);
    console.table("data", personalDetails[0]);
  };
  setInterestsInForm = (interests) => {
    this.setState({
      interests: interests,
    });
  };
  deleteListItem = (index) => {
    let personalData = this.state.personalDetails;
    personalData.splice(index, 1);
    this.setState({
      personalDetails: personalData,
    });
    this.props.setPersonalData(personalData);
  };
  render() {
    const { name, clearItems, personalDetails } = this.state;
    const { personalData } = this.props;
    const { classes } = this.props;
    return (
      <div className="form--container">
        <div>
        <TextField
          id="name"
          label="Name"
          name="name"
          value={name}
          onChange={this.handleInputChange}
        />
        <SelectDropdown
          setGenderInForm={this.setGenderInForm}
          clearSelectedItems={clearItems}
        />
        <MultiSelectDropdown
          setInterestsInForm={this.setInterestsInForm}
          clearSelectedItems={clearItems}
        />
        <div className="form--actions">
        <Button variant="contained" className={classes.root} onClick={this.submitForm}>
          Submit
        </Button>
        <Button variant="outlined" color="primary" onClick={this.clearFields}>
          Cancel
        </Button>
        </div>
        </div>
        <ListItems
          editListItem={this.editListItem}
          deleteListItem={this.deleteListItem}
          listItems={personalDetails}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  personalData: state.data.personalDetails,
});
export default connect(
  mapStateToProps,
  {setPersonalData}
)(withStyles(styles)(Form))