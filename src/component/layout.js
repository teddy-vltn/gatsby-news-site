// src/components/layout.js
import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import './layout.css'; // Assume you have a CSS file for basic styling

const Layout = ({ children }) => (
  <div style={{ margin: '0 auto', maxWidth: 960, padding: '0 1rem' }}>
    <header>
      <h1 style={{ margin: 0 }}>
        <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
          My Gatsby Site
        </Link>
      </h1>
    </header>
    <main>{children}</main>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
