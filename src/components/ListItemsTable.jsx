import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width: "50%",
  },
  root: {
    backgroundColor: "#7CFC00",
  },
});

function SimpleTable(props) {
  const classes = useStyles();
  const [listItems, setListItems] = useState(
    props.listItems ? props.listItems : []
  );
  const [searchText,setSearchText]=useState("");
  useEffect(() => {
    setListItems(props.listItems);
  }, [props.listItems]);
  const deleteListItem = (index) => {
    props.deleteListItem(index);
  };
  const editListItem = (index) => {
    props.history.push(`/edit/${index}`);
  };
  const handleInputChange = ({ target: { value } }) => {
    setSearchText(value);
  };
  let filteredItems = listItems.filter((el) => {
    return (
      el.interests.join("").toLowerCase().includes(searchText.toLowerCase()) ||
      el.name.toLowerCase().includes(searchText.toLowerCase())
    );
  });
  return (
    listItems.length > 0 && (
      <div>
        {listItems.length > 0 && (
          <TextField
            id="search"
            label="SearchText"
            name="searchText"
            value={searchText}
            onChange={handleInputChange}
          />
        )}
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right">Area of interest</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems &&filteredItems.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.gender}</TableCell>
                  <TableCell align="right">
                    {row.interests.join(" ,")}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      className={classes.root}
                      onClick={() => editListItem(index)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteListItem(index)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  );
}
export default withRouter(SimpleTable);
