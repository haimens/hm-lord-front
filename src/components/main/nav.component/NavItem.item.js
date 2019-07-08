import React, { Component } from "react";
import "./NavItem.item.css";
/**
 * NavItem
 * @name required
 * @path required
 * @history required
 * @showArrow optional
 *
 */
export default class NavItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      collapeClassName: "collapse",
      arrowClassName: "d-block fas fa-angle-down"
    };
  }

  componentWillReceiveProps() {
    const { path, history } = this.props;
    const parsedLocation = history.location.pathname.split("/");
    if (parsedLocation[1] === path) {
      this.setState({
        collapse: true,
        arrowClassName: "d-block fas fa-angle-down hm-text-14 text-purple"
      });
    } else {
      this.setState({
        collapse: false,
        arrowClassName: "d-block fas fa-angle-right hm-text-14 text-grey"
      });
    }
  }

  componentDidMount() {
    const { path, history } = this.props;
    const parsedLocation = history.location.pathname.split("/");
    if (parsedLocation[1] === path) {
      this.setState({
        collapse: true,
        arrowClassName: "d-block fas fa-angle-down hm-text-14 text-purple"
      });
    } else {
      this.setState({
        collapse: false,
        arrowClassName: "d-block fas fa-angle-right hm-text-14 text-grey"
      });
    }
  }

  handleToggle = () => {
    if (this.props.onToggle) this.props.onToggle();
  };

  render() {
    const { name, path, history, showArrow = true } = this.props;
    const parsedLocation = history.location.pathname.split("/");
    return (
      <main>
        <button
          onClick={() => this.handleToggle()}
          className={`btn rounded-0 d-flex align-items-center justify-content-between px-4 py-3 w-100 ${parsedLocation[1] ===
            path && "nav-selected"}`}
          type="button"
        >
          <div className="d-flex align-items-center">
            <img className="ml-3 mr-4" src={this.props.image} alt={"icon"} style={{ width: "18px", height: "15px" }} />
            <div className={`d-block hm-text-14 ${parsedLocation[1] === path ? "text-black" : "text-grey"}`}>
              {name}
            </div>
          </div>
          <div>{showArrow && <i className={this.state.arrowClassName} />} </div>
        </button>
        <div>{this.state.collapse && this.props.children}</div>
      </main>
    );
  }
}
