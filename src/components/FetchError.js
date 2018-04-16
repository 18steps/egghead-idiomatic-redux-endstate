import React, { Fragment } from 'react';

const FetchError = ({ message, onRetry }) => (
  <Fragment>
    <p>Could not fetch todos. {message}</p>
    <button onClick={onRetry}>Retry</button>
  </Fragment>
);

export default FetchError;
