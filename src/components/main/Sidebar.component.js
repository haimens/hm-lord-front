import React, { Component } from "react";
import NavItem from "./nav.component/NavItem.item";
import SubNavItem from "./nav.component/SubNavItem.item";
import { ImageButton } from "../shared";
/*eslint-disable */
class Sidebar extends Component {
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
      this.props.onClick();
    }
  };

  render() {
    const { pathname } = this.props.parentProps.history.location;
    const parsedLocation = pathname.split("/");

    return (
      <main className="mr-bg-darkblue" style={styles.container}>
        {/* LOGO Section */}
        <section className="mb-5 p-4 d-flex flex-row justify-content-between">
          <a href="#" onClick={e => this.handleClickLogo(e)}>
            <img
              src={`${process.env.PUBLIC_URL}/img/logo_white.svg`}
              alt="logo"
            />
          </a>
          {/* Handle Close */}
          {/* Handle Close */}
          <ImageButton
            icon={<i className="fas fa-times text-white" />}
            type="submit"
            size={24}
            outerClassName={
              "d-flex-block d-sm-flex-block d-md-flex-block d-lg-none d-flex align-items-center"
            }
            onClick={() => this.handleClose("sidebar")}
          />
        </section>
        {/* NAV ITEMS */}
        <section>
          <NavItem
            onToggle={() => this.props.parentProps.history.push("/dashboard")}
            image={`${process.env.PUBLIC_URL}/img/navicon_home.svg`}
            name="账户首页"
            path="dashboard"
            history={this.props.parentProps.history}
            showArrow={false}
          />

          <NavItem
            onToggle={() =>
              this.props.parentProps.history.push("/payments/accounts")
            }
            image={`${process.env.PUBLIC_URL}/img/navicon_zhifu.svg`}
            name="支付账户"
            path="payments"
            history={this.props.parentProps.history}
          >
            <SubNavItem
              onClick={() => this.handleClick("/payments/accounts")}
              name="支付账户列表"
              is_target={parsedLocation[2] === "accounts"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/payments/prices")}
              name="价格列表"
              is_target={parsedLocation[2] === "prices"}
            />
          </NavItem>

          <NavItem
            onToggle={() =>
              this.props.parentProps.history.push("/caskets/accounts")
            }
            image={`${process.env.PUBLIC_URL}/img/navicon_zizhi.svg`}
            name="资质账户"
            path="caskets"
            history={this.props.parentProps.history}
          >
            <SubNavItem
              onClick={() => this.handleClick("/caskets/accounts")}
              name="资质账户列表"
              is_target={parsedLocation[2] === "accounts"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/caskets/create")}
              name="创建资质账户"
              is_target={parsedLocation[2] === "create"}
            />
          </NavItem>

          <NavItem
            onToggle={() =>
              this.props.parentProps.history.push("/fees/accounts")
            }
            image={`${process.env.PUBLIC_URL}/img/navicon_shouxu.svg`}
            name="手续费账户"
            path="fees"
            history={this.props.parentProps.history}
          >
            <SubNavItem
              onClick={() => this.handleClick("/fees/accounts")}
              name="手续费账户列表"
              is_target={parsedLocation[2] === "accounts"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/fees/create")}
              name="创建手续费账户"
              is_target={parsedLocation[2] === "create"}
            />
          </NavItem>

          <NavItem
            onToggle={() =>
              this.props.parentProps.history.push("/captains/accounts")
            }
            image={`${process.env.PUBLIC_URL}/img/navicon_pankou.svg`}
            name="盘口管理"
            path="captains"
            history={this.props.parentProps.history}
          >
            <SubNavItem
              onClick={() => this.handleClick("/captains/accounts")}
              name="盘口列表"
              is_target={parsedLocation[2] === "accounts"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/captains/create")}
              name="创建盘口"
              is_target={parsedLocation[2] === "create"}
            />
          </NavItem>

          <NavItem
            onToggle={() =>
              this.props.parentProps.history.push("/dispatches/managers")
            }
            image={`${process.env.PUBLIC_URL}/img/navicon_xiafa.svg`}
            name="下发管理"
            path="dispatches"
            history={this.props.parentProps.history}
          >
            {/* <SubNavItem
              onClick={() => this.handleClick('/dispatches/mails')}
              name="下发列表" is_target={parsedLocation[2] === 'mails'} /> */}
            <SubNavItem
              onClick={() => this.handleClick("/dispatches/managers")}
              name="下发管理员"
              is_target={parsedLocation[2] === "managers"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/dispatches/tears/2")}
              name="客户下发请求"
              is_target={parsedLocation[2] === "tears"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/dispatches/fees/2")}
              name="手续费下发请求"
              is_target={parsedLocation[2] === "fees"}
            />
          </NavItem>

          <NavItem
            onToggle={() =>
              this.props.parentProps.history.push("/reports/deposits")
            }
            image={`${process.env.PUBLIC_URL}/img/navicon_jiaoyi.svg`}
            name="交易报表"
            path="reports"
            history={this.props.parentProps.history}
          >
            <SubNavItem
              onClick={() => this.handleClick("/reports/deposits")}
              name="存款记录"
              is_target={parsedLocation[2] === "deposits"}
            />
            <SubNavItem
              onClick={() => this.handleClick("/reports/withdraws")}
              name="下发记录"
              is_target={parsedLocation[2] === "withdraws"}
            />
          </NavItem>

          <NavItem
            onToggle={() =>
              this.props.parentProps.history.push("/setting/rates")
            }
            image={`${process.env.PUBLIC_URL}/img/navicon_user.svg`}
            name="设置"
            path="setting"
            history={this.props.parentProps.history}
          >
            <SubNavItem
              onClick={() => this.handleClick("/setting/rates")}
              name="费率"
              is_target={parsedLocation[2] === "rates"}
            />
          </NavItem>
        </section>
      </main>
    );
  }
}

export default Sidebar;

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    width: "230px",
    zIndex: "1031"
  }
};
