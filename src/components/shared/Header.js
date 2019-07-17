import React, { Component } from "react";
import { SearchBar } from ".";

export default class Header extends Component {
  handleChange = async e => {
    const keywords = e.target.value;
    await this.setState({ keywords });
  };

  handleSubmit = async e => {
    if (e) e.preventDefault();
    const { keywords } = this.state;
    this.props.onSubmit(keywords);
  };

  handleSubmitSearch = keywords => {
    this.props.handleSubmitSearch(keywords);
  };

  render() {
    return (
      <div>
        <div
          className="d-flex align-items-center justify-content-between mb-4 text-white"
          style={{ minHeight: "28px" }}
        >
          <div className="d-flex align-items-center ">
            {this.props.icon ? (
              <i className={`fas fa-${this.props.icon} hm-header-size mr-3`} />
            ) : (
              <img
                src={`${process.env.PUBLIC_URL}/img/${this.props.tabicon}`}
                style={{ width: "22px", height: "22px" }}
                alt="company"
                className="hm-header-size mr-3"
              />
            )}
            {this.props.toLocation ? (
              <h4
                className="hm-header-size text-white mr-3 hm-pointer-cursor"
                onClick={() => this.props.history.push(this.props.toLocation)}
              >
                {this.props.title}
              </h4>
            ) : (
              <h4 className="hm-header-size text-white mr-3">{this.props.title}</h4>
            )}
            {this.props.subTitle &&
              (this.props.thirdTitle ? (
                <div className=" d-flex align-items-center ">
                  <i className="fas fa-circle text-right mr-3" style={{ fontSize: "6px" }} />
                  <h4
                    className="hm-header-size text-white hm-pointer-cursor mr-3"
                    onClick={() => this.props.history.push(this.props.toSubLocation)}
                  >
                    {this.props.subTitle}
                  </h4>
                  <i className="fas fa-circle text-light-grey text-right mr-3" style={{ fontSize: "6px" }} />
                  <h4 className="hm-header-size text-light-grey ">{this.props.thirdTitle}</h4>
                </div>
              ) : (
                <div className=" d-flex align-items-center ">
                  <i className="fas fa-circle text-light-grey text-right mr-3" style={{ fontSize: "6px" }} />
                  <h4 className="hm-header-size text-light-grey ">{this.props.subTitle}</h4>
                </div>
              ))}
          </div>
          <div className="d-flex">
            {this.props.search && <SearchBar name="search" onSubmit={this.handleSubmitSearch} />}
            <div>
              {this.props.showButton && (
                <button
                  className="text-purple bg-white border-0 rounded shadow px-1 py-0 mr-lg-3 mr-0 d-flex align-items-center justify-content-center"
                  onClick={this.props.clickFunction}
                  style={{
                    height: "28px",
                    width: this.props.buttonWidth
                  }}
                >
                  <i className="fas fa-plus mr-2" />
                  <div className="font-weight-bold hm-text-12 "> {this.props.clickTitle}</div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
