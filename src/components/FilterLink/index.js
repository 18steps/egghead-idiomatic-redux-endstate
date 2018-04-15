import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

const FilterLink = ({ filter, children }) => (
  <NavLink
    className={'navLink'}
    exact
    to={'/' + (filter === 'all'
      ? ''
      : filter)}
  >{children}</NavLink>
);

export default FilterLink;