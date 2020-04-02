import React from 'react';
import PropTypes from 'prop-types';

class ContentEditable extends React.Component {
  constructor() {
    super();
    this.divRef = React.createRef();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== this.divRef.current.innerHTML;
  }

  emitChange = () => {
    const { onChange } = this.props;
    const html = this.divRef.current.innerHTML;
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
    const { html, onChange, ...rest } = this.props;

    return (
      <div
        ref={this.divRef}
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
  html: PropTypes.string,
  onChange: PropTypes.func,
};

export default ContentEditable;
