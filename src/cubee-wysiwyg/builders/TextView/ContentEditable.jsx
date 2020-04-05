import React from 'react';
import PropTypes from 'prop-types';

class ContentEditable extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { innerRef } = this.props;
    return nextProps.html !== innerRef.current.innerHTML;
  }

  emitChange = () => {
    const { innerRef, onChange } = this.props;
    const html = innerRef.current.innerHTML;
    if (onChange && html !== this.lastHtml) {
      onChange({
        target: {
          value: html,
        },
      });
    }
    this.lastHtml = html;
  }

  render() {
    const { innerRef, html, onChange, ...rest } = this.props;

    return (
      <div
        ref={innerRef}
        onInput={this.emitChange}
        onBlur={this.emitChange}
        contentEditable
        dangerouslySetInnerHTML={{__html: html}}
        {...rest}
      />
    );
  }
}

ContentEditable.propTypes = {
  innerRef: PropTypes.object,
  html: PropTypes.string,
  onChange: PropTypes.func,
};

export default ContentEditable;
