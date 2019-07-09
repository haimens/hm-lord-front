import React, { Component } from "react";

/**
 * NoRecord
 * @howManyCol how many fieldName you got?
 */

class NoRecord extends Component {
  render() {
    return (
      <tr>
        <td colSpan={this.props.howManyCol} className="text-center text-muted">
          <section className="text-center align-middle hm-text-14 text-modal-color">No Record Found</section>
        </td>
      </tr>
    );
  }
}

export default NoRecord;
