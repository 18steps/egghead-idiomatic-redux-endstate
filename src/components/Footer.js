import React, { Fragment } from 'react';
import FilterLink from './FilterLink/';


const Footer = () => (
  <p>
    Show:
    {[
      'All',
      'Active',
      'Completed',
    ].map((filter, index) => (
      <Fragment key={index}>
        {index === 0
          ? ' '
          : ', '}
        <FilterLink
          filter={filter.toLocaleLowerCase()}
        >{filter}</FilterLink>
      </Fragment>
    ))}
  </p>
);

export default Footer;