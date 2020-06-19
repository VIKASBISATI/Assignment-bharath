import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

const styles = (theme) => ({
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
});

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

class MultipleSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: props.interestsProp ? props.interestsProp : [],
      isEdit: props.isEditView ? props.isEditView : false,
    };
  }
  handleChange = ({ target: { value } }) => {
    this.setState({
      interests: value,
    });
    // if (!this.state.isEdit) {
      this.props.setInterestsInForm(value);
    // }
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.clearSelectedItems) {
      this.setState({
        interests: [],
      });
    }
    if (nextProps.isEditView) {
      this.setState({
        interestsProp: nextProps.interestsProp,
      });
    }
  }
  render() {
    const { interests } = this.state;
    const { classes } = this.props;
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
            onChange={this.handleChange}
            input={<Input />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {areaOfInterest.map((interest) => {
              return (
                <MenuItem key={interest} value={interest}>
                  <Checkbox
                    checked={interests.indexOf(interest) > -1}
                  />
                  <ListItemText primary={interest} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    );
  }
}
export default withStyles(styles)(MultipleSelect);
