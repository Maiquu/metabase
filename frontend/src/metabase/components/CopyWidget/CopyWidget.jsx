/* eslint-disable react/prop-types */
import cx from "classnames";
import { Component } from "react";

import { CopyWidgetButton } from "./CopyWidget.styled";

export default class CopyWidget extends Component {
  render() {
    const { value, onChange, style, ...props } = this.props;
    return (
      <div className="flex relative" style={style}>
        <input
          className={cx("Form-input flex-full", { "no-focus": !onChange })}
          style={{
            paddingRight: 40,
          }}
          onClick={
            !onChange
              ? e => e.target.setSelectionRange(0, e.target.value.length)
              : null
          }
          value={value}
          onChange={onChange}
          readOnly={value && !onChange}
          {...props}
        />
        <CopyWidgetButton value={value} />
      </div>
    );
  }
}
