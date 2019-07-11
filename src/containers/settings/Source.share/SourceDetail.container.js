import React, { Component } from "react";
class CompanySourceDetail extends Component {
  render() {
    const { imgLink, title, subTitles, subTitlesInfos } = this.props;
    return (
      <div className="bg-white rounded-custom shadow-sm border">
        <div className="row" style={{ padding: "40px" }}>
          <div className="col-lg-2 col-12 mb-4 d-flex justify-content-center">
            <img className="rounded-circle" style={{ height: "90px", width: "90px" }} src={imgLink} alt="avatar" />
          </div>
          <div className="col-lg-10 col-12 pl-3">
            <div className="row text-modal-color">
              <div className="col-lg-6 col-12">
                <div className="d-flex justify-content-between align-items-center mb-4 ">
                  <div className="hm-text-16 font-weight-bold">{title}</div>
                </div>
                {subTitles &&
                  subTitles.map((subTitle, index) => {
                    return (
                      <div className="mb-4" key={index}>
                        <div className="text-secondary-color font-weight-500 hm-text-14">{subTitle}</div>
                        <div className="hm-text-14 font-weight-bold">{subTitlesInfos[index] || "N/A"}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompanySourceDetail;
