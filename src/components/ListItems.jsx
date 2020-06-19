import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  root: {
    backgroundColor: "#7CFC00",
    margin:"0.5rem"
  },
});
class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: props.listItems ? props.listItems : [],
      searchText: "",
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      listItems: nextProps.listItems,
    });
  }
  deleteListItem = (index) => {
    this.props.deleteListItem(index);
  };
  editListItem = (index) => {
    this.props.history.push(`/edit/${index}`);
  };
  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
    let filteredItems = this.state.listItems.filter((el) => {
      return (
        el.name.toLowerCase().includes(value.toLowerCase()) ||
        el.interests.join("").includes(value.toLowerCase())
      );
    });
  };
  render() {
    const { listItems, searchText } = this.state;
    const { classes } = this.props;
    let filteredItems = this.state.listItems.filter((el) => {
      return (
        el.interests.join("").toLowerCase().includes(searchText.toLowerCase()) ||
        el.name.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    return (
      <div className="listitems">
        {listItems.length > 0 && (
          <TextField
            id="search"
            label="SearchText"
            name="searchText"
            value={searchText}
            onChange={this.handleInputChange}
          />
        )}
        {filteredItems &&
          filteredItems.map((el, index) => {
            return (
              <div className={`listitem`} key={index}>
                <ul className="list-details">
                  <li>Name: {el.name}</li>
                  <li>Gender: {el.gender}</li>
                  <li>Area of interest: {el.interests.join(" ,")}</li>
                </ul>
                <div className="list--actions">
                  <Button
                    variant="contained"
                    className={classes.root}
                    onClick={() => this.editListItem(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.deleteListItem(index)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}
export default withRouter(withStyles(styles)(ListItems));
