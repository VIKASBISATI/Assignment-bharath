import React, { useState,useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import SelectDropdown from "./SelectDropdown";
import MultiSelectDropdown from "./MultiSelectDropdown";
import Button from "@material-ui/core/Button";
import { connect, useDispatch } from "react-redux";
import { setPersonalData } from "../redux/dataAction";
import ListItems from "./ListItems";
import ListItemsTable from "./ListItemsTable";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#9ACD32",
    margin: "0.5rem",
  },
}));

function Form(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [clearItems, setClearItems] = useState(false);
  const [gender, setGender] = useState("");
  const [interests, setInterests] = useState([]);
  const [personalDetails, setPersonalDetails] = useState(props.personalData);

  const handleInputChange = ({ target: { value } }) => {
    setName(value);
  };
  const clearFields = () => {
    setName("");
    setClearItems(true);
    setGender("");
    setInterests([]);
  };
  useEffect(() => {
    if (clearItems) {
      setClearItems(false);
    }
  });
  const setGenderInForm = (gender) => {
    setGender(gender);
  };
  const submitForm = () => {
    let data = {
      name: name,
      interests: interests,
      gender: gender,
    };
    let personalData = personalDetails;
    personalData.push(data);
    setPersonalDetails(personalData);
    setName("");
    setClearItems(true);
    setGender("");
    setInterests([]);
    dispatch(setPersonalData(personalData));
  };
  const setInterestsInForm = (interests) => {
    setInterests(interests);
  };
  const deleteListItem = (index) => {
    let personalData = personalDetails;
    personalData.splice(index, 1);
    setPersonalDetails(personalData);
    dispatch(setPersonalData(personalData));
  };

  const { personalData } = props;
  return (
    <div className="form--container">
      <div>
        <TextField
          id="name"
          label="Name"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
        <SelectDropdown
          setGenderInForm={setGenderInForm}
          clearSelectedItems={clearItems}
        />
        <MultiSelectDropdown
          setInterestsInForm={setInterestsInForm}
          clearSelectedItems={clearItems}
        />
        <div className="form--actions">
          <Button
            variant="contained"
            className={classes.root}
            onClick={submitForm}
          >
            Submit
          </Button>
          <Button variant="outlined" color="primary" onClick={clearFields}>
            Cancel
          </Button>
        </div>
      </div>
      {/* <ListItems
        // editListItem={editListItem}
        deleteListItem={deleteListItem}
        listItems={personalDetails}
      /> */}
      <ListItemsTable
        // editListItem={editListItem}
        deleteListItem={deleteListItem}
        listItems={personalDetails}
      />
    </div>
  );
}
const mapStateToProps = (state) => ({
  personalData: state.data.personalDetails,
});
export default connect(mapStateToProps, { setPersonalData })(Form);
