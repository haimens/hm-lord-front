import React, { Component } from "react";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "./Sidebar.component.css";
export default class Sidebar extends Component {
  handleClick = new_path => {
    const { history } = this.props.parentProps;
    history.push(new_path);
  };
  handleClickLogo = e => {
    e.preventDefault();
    const { history } = this.props.parentProps;
    history.push("/dashboard");
  };
  handleClose = type => {
    if (type === "sidebar") {
      this.props.parentProps.toggleSideBar();
    }
  };
  handleSideBarBeenOpened = boolean => {
    this.props.handleSideBarBeenOpened(boolean);
  };

  render() {
    return (
      <main className="mr-bg-darkblue">
        <SideNav
          onToggle={boolean => {
            this.handleSideBarBeenOpened(boolean);
          }}
          onSelect={selected => {}}
          className="mr-bg-darkblue"
        >
          <Toggle />
          <Nav defaultSelected="home">
            <NavItem eventKey="home">
              <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>Home</NavText>
            </NavItem>
            <NavItem eventKey="charts">
              <NavIcon>
                <i className="fa fa-fw fa-line-chart" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>Charts</NavText>
            </NavItem>
          </Nav>
        </SideNav>
      </main>
    );
  }
}
