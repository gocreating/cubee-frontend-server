import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { typography } from 'styled-system';
import themeGet from '@styled-system/theme-get';
import { Link } from 'react-router-dom';
import { Component as ComponentIcon } from 'styled-icons/boxicons-solid/Component';
import { User as UserIcon } from 'styled-icons/fa-solid/User';
import { selectors as authSelectors } from '../ducks/auth';
import Divider from '../components/Divider';
import logo from '../../../public/logo.svg';

const StyledNav = styled.nav`
  display: flex;
  padding: ${themeGet('space.5')}px ${themeGet('space.6')}px;
  background-color: ${themeGet('colors.primary')};
`;

const Menu = styled.ul`
  display: flex;
  flex-wrap: wrap;

  ${props => props.pullRight && css`
    margin-left: auto;
  `}
`;

Menu.propTypes = {
  pullRight: PropTypes.bool,
};

Menu.defaultProps = {
  pullRight: false,
};

const MenuItem = styled.li`
  float: right;
  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    color: ${themeGet('colors.white')};
    padding: ${themeGet('space.3')}px ${themeGet('space.3')}px;
    height: 100%;
    line-height: 100%;

    ${typography}

    svg {
      min-width: ${themeGet('fontSizes.body')};
      margin-right: ${themeGet('space.2')}px;
    }
  }
  :hover a {
    color: ${themeGet('colors.highlight')};
  }
`;

const Logo = styled.img`
  height: 1.5rem;
  margin-right: 0.5rem;
`;

const Nav = ({ isAuth }) => (
  <StyledNav>
    <Menu>
      <MenuItem>
        <Link to="/">
          <Logo src={logo} />
          Cubee
        </Link>
      </MenuItem>
      <Divider variant="vertical" my={3} />
      <MenuItem>
        <Link to="/about">About</Link>
      </MenuItem>
    </Menu>
    <Menu pullRight>
      <MenuItem>
        <Link to="/styled">Styled</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/components">
          <ComponentIcon />
          Components
        </Link>
      </MenuItem>
      {!isAuth && (
        <MenuItem>
          <Link to="/login">
            <UserIcon />
            Login
          </Link>
        </MenuItem>
      )}
      {isAuth && (
        <MenuItem>
          <Link to="#">
            <UserIcon />
            Logout
          </Link>
        </MenuItem>
      )}
    </Menu>
  </StyledNav>
);

Nav.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: authSelectors.getIsAuth(state),
});

export default connect(mapStateToProps)(
  Nav,
);
