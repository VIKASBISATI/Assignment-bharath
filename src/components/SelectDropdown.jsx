import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 190,
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
}));

function SelectDropDown(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [age, setAge] = useState(props.genderProp ? props.genderProp : "");
  const [isEdit, setIsEdit] = useState(
    props.isEditView ? props.isEditView : false
  );
  useEffect(() => {
    if (props.clearSelectedItems) {
      setAge("");
    }
    if (props.isEditView) {
      setAge(props.genderProp);
    }
  }, [props.clearSelectedItems, props.isEditView, props.genderProp]);

  const handleChange = (event) => {
    setAge(event.target.value);
    // if(!this.state.isEdit){
    props.setGenderInForm(event.target.value);
    // }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Gender</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="transgender">Transgender</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectDropDown;
