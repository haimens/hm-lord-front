import React from "react";

export default function Header(props) {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4 text-white">
        <div className="d-flex align-items-center ">
          {props.icon ? (
            <i className={`fas fa-${props.icon} hm-header-size mr-3`} />
          ) : (
            <img
              src={`${process.env.PUBLIC_URL}/img/${props.tabicon}`}
              style={{ width: "17px", height: "18px" }}
              alt="company"
              className="hm-header-size mr-3"
            />
          )}
          {props.toLocation ? (
            <h4
              className="hm-header-size text-white mr-3 hm-pointer-cursor"
              onClick={() => props.history.push(props.toLocation)}
            >
              {props.title}
            </h4>
          ) : (
            <h4 className="hm-header-size text-white mr-3">{props.title}</h4>
          )}
          {props.subTitle &&
            (props.thirdTitle ? (
              <div className=" d-flex align-items-center ">
                <i className="fas fa-circle text-right mr-3" style={{ fontSize: "6px" }} />
                <h4
                  className="hm-header-size hm-pointer-cursor mr-3"
                  onClick={() => props.history.push(props.toSubLocation)}
                >
                  {props.subTitle}
                </h4>
                <i className="fas fa-circle text-light-grey text-right mr-3" style={{ fontSize: "6px" }} />
                <h4 className="hm-header-size text-light-grey ">{props.thirdTitle}</h4>
              </div>
            ) : (
              <div className=" d-flex align-items-center ">
                <i className="fas fa-circle text-light-grey text-right mr-3" style={{ fontSize: "6px" }} />
                <h4 className="hm-header-size text-light-grey ">{props.subTitle}</h4>
              </div>
            ))}
        </div>
        {props.showButton && (
          <button
            className="text-purple border-0 rounded shadow px-1 py-0 mr-lg-3 mr-0 d-flex align-items-center justify-content-center"
            onClick={props.clickFunction}
            style={{
              height: "28px",
              width: props.buttonWidth
            }}
          >
            <i className="fas fa-plus mr-2" />
            <div className="font-weight-bold hm-text-12 "> {props.clickTitle}</div>
          </button>
        )}
      </div>
    </div>
  );
}
