import React, { Component } from "react";
import { SearchBar } from ".";

export default class Header extends Component {
  state = {
    selected: 0
  };
  handleChange = async e => {
    const keywords = e.target.value;
    await this.setState({ keywords });
  };

  handleSubmit = async e => {
    if (e) e.preventDefault();
    const { keywords } = this.state;
    this.props.onSubmit(keywords);
  };

  handleOrderButtonClicked = status => {
    this.setState({ selected: status });
    this.props.handleOrderButtonClicked(status);
  };

  handleSubmitSearch = keywords => {
    this.props.handleSubmitSearch(keywords);
  };

  render() {
    const { selected } = this.state;
    const { showOrderButton } = this.props;
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
          {showOrderButton && (
            <div>
              <button
                className={`mr-3 btn ${
                  selected === 0 ? "button-main-background text-white" : "text-purple bg-white"
                } border-0 rounded`}
                onClick={() => this.handleOrderButtonClicked(0)}
                style={{ width: "90px" }}
              >
                All
              </button>
              <button
                className={`mr-3 btn ${
                  selected === 1 ? "button-main-background text-white" : "text-purple bg-white"
                } border-0 rounded`}
                onClick={() => this.handleOrderButtonClicked(1)}
                style={{ width: "90px" }}
              >
                Pending
              </button>
              <button
                className={`mr-3 btn ${
                  selected === 2 ? "button-main-background text-white" : "text-purple bg-white"
                } border-0 rounded`}
                onClick={() => this.handleOrderButtonClicked(2)}
                style={{ width: "90px" }}
              >
                Finalize
              </button>
              <button
                className={`mr-3 btn ${
                  selected === 3 ? "button-main-background text-white" : "text-purple bg-white"
                } border-0 rounded`}
                onClick={() => this.handleOrderButtonClicked(3)}
                style={{ width: "90px" }}
              >
                Confirm
              </button>
              <button
                className={`mr-3 btn ${
                  selected === 4 ? "button-main-background text-white" : "text-purple bg-white"
                } border-0 rounded`}
                onClick={() => this.handleOrderButtonClicked(4)}
                style={{ width: "90px" }}
              >
                Completed
              </button>
            </div>
          )}
          <div className="d-flex">
            {this.props.search && (
              <div className="mr-3">
                <SearchBar name="search" onSubmit={this.handleSubmitSearch} />
              </div>
            )}
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
