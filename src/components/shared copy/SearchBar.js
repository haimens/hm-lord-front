import React from "react";
import ImageButton from "./ImageButton";
import "./SearchBar.css";

/**
 * @data field [name] [placeholder]
 * @callback props [onSubmit] [onClearClick]
 *
 */
class IconInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: ""
    };
  }

  handleChange = async e => {
    const keywords = e.target.value;
    await this.setState({ keywords });
  };

  handleSubmit = async e => {
    if (e) e.preventDefault();
    const { keywords } = this.state;
    this.props.onSubmit(keywords);
  };

  // newHandleEnterSumbit = () => {
  //   this.props.handleEnterSumbit(this.state.keyword);
  // }

  handleClear = async e => {
    e.preventDefault();
    await this.setState({ keywords: "" });
    this.props.onSubmit("");
  };

  render() {
    const { keywords } = this.state;
    const { placeholder } = this.props;
    //=====================================================================================================

    return (
      <form className="filter-item-container " onSubmit={this.handleSubmit}>
        <div id="filter-item-icon" className="d-flex align-items-center ">
          <ImageButton
            image={`${process.env.PUBLIC_URL}/img/search.png`}
            type="submit"
            size={24}
            onClick={this.handleSubmit}
          />
        </div>
        <input
          id={this.props.name}
          name={this.props.name}
          onChange={this.handleChange}
          value={keywords}
          style={{
            height: "28px",
            borderRadius: "20px",
            width: "200px"
          }}
          placeholder={placeholder || "search"}
          type="text"
          className="form-control shadow-sm"
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
        />

        <div id="filter-item-icon-reverse" className="d-flex align-items-center">
          <ImageButton icon={<i className="fas fa-times text-muted" />} size={20} onClick={this.handleClear} />
        </div>
      </form>
    );
  }
}

export default IconInput;
