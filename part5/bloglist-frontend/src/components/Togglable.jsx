import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility
  }));

  return (
    <div>
      {!visible && (
        <div>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
      )}
      {visible && (
        <div>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      )}
    </div>
  );
});

Togglable.displayName = 'Togglable';
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

export default Togglable;
