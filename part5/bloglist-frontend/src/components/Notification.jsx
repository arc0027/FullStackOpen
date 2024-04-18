import React from 'react';
import PropTypes from 'prop-types';

const notificationStyle = {
  color: 'white',
  fontSize: 20,
  background: 'lightgrey',
  border: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
};

const successStyle = {
  ...notificationStyle,
  color: 'green'
};

const errorStyle = {
  ...notificationStyle,
  color: 'red'
};

const Notification = ({ errorMessage, successMessage }) => {
  if (!successMessage && !errorMessage) {
    return null;
  }

  return (
    <div style={successMessage ? successStyle : errorStyle}>
      {successMessage || errorMessage}
    </div>
  );
};

Notification.propTypes = {
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string
};

export default Notification;
