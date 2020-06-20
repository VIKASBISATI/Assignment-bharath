import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import SelectDropdown from "./SelectDropdown";
import MultiSelectDropdown from "./MultiSelectDropdown";
import Button from "@material-ui/core/Button";
import { connect, useDispatch } from "react-redux";
import { setPersonalData } from "../redux/dataAction";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#9ACD32",
    margin: "0.5rem",
  },
});
function EditView(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let ind = window.location.href.split("/").pop();

  const [personalDetails, setPersonalDetails] = useState(
    props.personalData.length > 0 ? props.personalData : []
  );
  const [name, setName] = useState(
    props.personalData.length > 0 ? props.personalData[ind].name : ""
  );
  const [gender, setGender] = useState(
    props.personalData.length > 0 ? props.personalData[ind].gender : ""
  );
  const [interests, setInterests] = useState(
    props.personalData.length > 0 ? props.personalData[ind].interests : []
  );

  useEffect(() => {
    setName(props.personalData.length > 0 ? props.personalData[ind].name : "");
    setGender(
      props.personalData.length > 0 ? props.personalData[ind].gender : ""
    );
    setInterests(
      props.personalData.length > 0 ? props.personalData[ind].interests : []
    );
  }, [props.personalData]);
  const setGenderInForm = (gender) => {
    setGender(gender);
  };
  const saveForm = () => {
    let data = {
      name: name,
      interests: interests,
      gender: gender,
    };
    let personalData = personalDetails;
    let ind = window.location.href.split("/").pop();
    personalData[ind] = data;

    setPersonalDetails(personalData);
    setName("");
    setGender("");
    setInterests([]);
    dispatch(setPersonalData(personalData));
    props.history.push("/");
  };
  const setInterestsInForm = (interests) => {
    setInterests(interests);
  };
  const handleInputChange = ({ target: { value } }) => {
    setName(value);
  };

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
        onChange={handleInputChange}
      />
      <SelectDropdown
        setGenderInForm={setGenderInForm}
        isEditView={true}
        genderProp={gender}
      />
      <MultiSelectDropdown
        setInterestsInForm={setInterestsInForm}
        isEditView={true}
        interestsProp={interests}
      />
      <div className="form--actions">
        <Button variant="contained" className={classes.root} onClick={saveForm}>
          Save
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            props.history.push("/");
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  personalData: state.data.personalDetails,
});
export default connect(mapStateToProps, { setPersonalData })(EditView);
