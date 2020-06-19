import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import SelectDropdown from "./SelectDropdown";
import MultiSelectDropdown from "./MultiSelectDropdown";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { setPersonalData } from "../redux/dataAction";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    backgroundColor: "#9ACD32",
    margin: "0.5rem"
  },
});
class EditView extends Component {
  constructor(props) {
    super(props);
    let ind = window.location.href.split("/").pop();
    this.state = {
      personalDetails:props.personalData.length > 0 ?props.personalData:[],
      name: props.personalData.length > 0 ? props.personalData[ind].name : "",
      gender:
        props.personalData.length > 0 ? props.personalData[ind].gender : "",
      interests:
        props.personalData.length > 0 ? props.personalData[ind].interests : [],
    };
  }
  componentWillReceiveProps(nextProps) {
    let ind = this.location.href.split("/").pop();
    this.setState({
      name: nextProps.personalData[ind].name,
      gender: nextProps.personalData[ind].gender,
      interests: nextProps.personalData[ind].interests,
    });
  }
  setGenderInForm = (gender) => {
    this.setState({
      gender: gender,
    });
  };
  saveForm=()=>{
    const { name, interests, gender, personalDetails } = this.state;
    let data = {
      name: name,
      interests: interests,
      gender: gender,
    };
    let personalData = personalDetails;
    let ind = window.location.href.split("/").pop();
    personalData[ind]=data;
    
    this.setState({
      personalDetails: personalData,
      name: "",
      gender: "",
      interests: [],
    });
    this.props.setPersonalData(personalData);
    this.props.history.push("/")
  }
  setInterestsInForm = (interests) => {
    this.setState({
      interests: interests,
    });
  };
  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { classes } = this.props;
    const { name, gender, interests } = this.state;
    return (
      <div className="edit--container">
        <div>
          <h1>Edit View</h1>
        </div>
        <TextField
          id="name"
          label="Name"
          name="name"
          value={name}
          onChange={this.handleInputChange}
        />
        <SelectDropdown
          setGenderInForm={this.setGenderInForm}
          isEditView={true}
          genderProp={gender}

        />
        <MultiSelectDropdown
          setInterestsInForm={this.setInterestsInForm}
          isEditView={true}
          interestsProp={interests}
        />
        <div className="form--actions">
        <Button
          variant="contained"
          className={classes.root}
          onClick={this.saveForm}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            this.props.history.push("/");
          }}
        >
          Cancel
        </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  personalData: state.data.personalDetails,
});
export default connect(mapStateToProps, { setPersonalData })(
  withStyles(styles)(EditView)
);
