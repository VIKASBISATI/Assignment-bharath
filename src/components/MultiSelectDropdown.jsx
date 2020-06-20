import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    maxWidth: 400,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const areaOfInterest = ["IT", "Business", "Banking", "Railways"];

function MultipleSelect(props) {
  const classes = useStyles();
  const [interests, setInterests] = useState(
    props.interestsProp ? props.interestsProp : []
  );
  const [isEdit, setIsEdit] = useState(
    props.isEditView ? props.isEditView : false
  );
  const handleChange = ({ target: { value } }) => {
    setInterests(value);
    // if (!this.state.isEdit) {
    props.setInterestsInForm(value);
    // }
  };
  useEffect(() => {
    if (props.clearSelectedItems) {
      setInterests([]);
    }
    if (props.isEditView) {
      setInterests(props.interestsProp);
    }
  }, [props.clearSelectedItems, props.isEditView, props.interestsProp]);

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">
          Area of interest
        </InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={interests}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {areaOfInterest.map((interest) => {
            return (
              <MenuItem key={interest} value={interest}>
                <Checkbox checked={interests.indexOf(interest) > -1} />
                <ListItemText primary={interest} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
export default MultipleSelect;
