import React, { Component } from "react";
const ddData = ["FrontEnd", "BackEnd", "FullStack", "DevOps", "Testing"];
export default class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDropDown: false,
      focusOption: -1,
      selectOption: "Select Department"
    };
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("keydown", this.keyDown);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("keydown", this.keyDown);
  }
  toggleDropDown = () => {
    this.setState({
      openDropDown: !this.state.openDropDown
    });
  };
//   handleClickOutside=()=>{
//     this.setState({
//       openDropDown: !this.state.openDropDown,
//       focusOption: -1,
//     });
//     this.clearFocus()
//   }

  setNodeRef = node => {
    this.node = node;
  };

  clearFocus = () => {
    this.node.childNodes[1].childNodes.forEach(focusOption => {
      focusOption.setAttribute("data-isfocused", false);
    });
  };
  setFocus = () => {
    const domNode = this.node.childNodes[1].childNodes.length;
    if (this.state.focusOption < domNode && this.state.focusOption >= 0) {
      this.node.childNodes[1].childNodes[this.state.focusOption].setAttribute(
        "data-isfocused",
        true
      );
    } else if (this.state.focusOption >= domNode) {
      this.setState({
        focusOption: 0
      });
      this.node.childNodes[1].childNodes[0].setAttribute(
        "data-isfocused",
        true
      );
    } else {
      this.setState({
        focusOption: domNode - 1
      });
      this.node.childNodes[1].childNodes[domNode - 1].setAttribute(
        "data-isfocused",
        true
      );
    }
  };
  handleEnter = () => {
    this.selectListItem(
      this.node.childNodes[1].childNodes[this.state.focusOption].textContent
    );
  };
  handleListItem = e => {
    this.selectListItem(e.target.textContent);
  };
  selectListItem = value => {
    this.setState({
      selectOption: value,
      focusOption: -1,
      openDropDown: false
    });
    this.clearFocus();
  };
  keyDown = event => {
    if (this.state.openDropDown) {
      switch (event.key) {
        case "ArrowDown":
          this.clearFocus();
          this.setState({
            focusOption: this.state.focusOption + 1
          });
          this.setFocus();
          break;
        case "ArrowUp":
          this.clearFocus();
          this.setState({
            focusOption: this.state.focusOption - 1
          });
          this.setFocus();
          break;
        case "Enter":
          this.handleEnter();
          break;
        default:
          break;
      }
    }
  };

  render() {
    const { openDropDown, selectOption } = this.state;
    return (
      <div ref={this.setNodeRef} className="dd-container">
        <div className="dropdown--header" onClick={this.toggleDropDown}>
          {selectOption}
          <ul id="ddid" className="dd-data-wrapper" onKeyDown={this.keyDown}>
          {openDropDown &&
            ddData.map((el, index) => {
              return (
                <li
                  data-isfocused={false}
                  className="dd-data"
                  key={index}
                  onClick={this.handleListItem}
                >
                  {el}
                </li>
              );
            })}
        </ul>
        </div>

        
      </div>
    );
  }
}