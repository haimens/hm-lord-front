import React, { Component } from "react";

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
      arrowClassName: "d-block fas fa-angle-down text-white"
    };
  }

  componentWillReceiveProps() {
    const { path, history } = this.props;
    const parsedLocation = history.location.pathname.split("/");
    if (parsedLocation[1] === path) {
      this.setState({
        collapse: true,
        arrowClassName: "d-block fas fa-angle-up text-white"
      });
    } else {
      this.setState({
        collapse: false,
        arrowClassName: "d-block fas fa-angle-down text-white"
      });
    }
  }

  componentDidMount() {
    const { path, history } = this.props;
    const parsedLocation = history.location.pathname.split("/");
    if (parsedLocation[1] === path) {
      this.setState({
        collapse: true,
        arrowClassName: "d-block fas fa-angle-up text-white"
      });
    } else {
      this.setState({
        collapse: false,
        arrowClassName: "d-block fas fa-angle-down text-white"
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
          disabled={parsedLocation[1] === path}
          className="btn btn-block d-flex align-items-center justify-content-between px-4 py-3"
          type="button"
          data-toggle="collapse"
          data-target={`#${path}`}
          aria-expanded="false"
          aria-controls={`${path}`}
        >
          <div className="d-flex align-items-center">
            <img
              className="avatar-icon-xs mr-2"
              src={this.props.image || `${process.env.PUBLIC_URL}/img/icon_xiafa.svg`}
              alt={"xiafa"}
            />
            <span className="d-block text-white">{name}</span>
          </div>
          {showArrow && <i className={this.state.arrowClassName} />}
        </button>
        <div>{this.state.collapse && this.props.children}</div>
      </main>
    );
  }
}
