import React, { Component } from "react";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "./Sidebar.component.css";
export default class Sidebar extends Component {
  handleSideBarBeenOpened = boolean => {
    this.props.handleSideBarBeenOpened(boolean);
  };

  render() {
    const { history, location } = this.props.parentProps;
    return (
      <main className="mr-bg-darkblue">
        <SideNav
          onToggle={boolean => {
            this.handleSideBarBeenOpened(boolean);
          }}
          onSelect={selected => {
            const to = "/" + selected;
            if (location.pathname !== to) {
              history.push(to);
            }
          }}
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
