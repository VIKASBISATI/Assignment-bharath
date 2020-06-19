import React from "react";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = (theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 190,
  },
});

class SelectDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      age: props.genderProp? props.genderProp:"",
      isEdit:props.isEditView? props.isEditView: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.clearSelectedItems) {
      this.setState({
        age:""
    });
    }
    if(nextProps.isEditView){
      this.setState({
        age:nextProps.genderProp
      })
    }
  }
  handleChange = (event) => {
    this.setState({ age: event.target.value });
    // if(!this.state.isEdit){
      this.props.setGenderInForm(event.target.value);
    // }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  render() {
    const { classes } = this.props;
    const {open, age}=this.state;
    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">Gender</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={age}
            onChange={this.handleChange}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="transgender">Transgender</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}
export default withStyles(styles)(SelectDropDown);
