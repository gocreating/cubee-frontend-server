import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Component as ComponentIcon } from 'styled-icons/boxicons-solid/Component';
import Divider from '../components/Divider';
import logo from '../../../public/logo.svg';

const StyledNav = styled.nav`
  display: flex;
  padding: ${props => props.theme.spacing.unit * 4}px ${props => props.theme.spacing.unit2};
  background-color: ${props => props.theme.colors.primary};
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
    color: ${props => props.theme.colors.white};
    padding: ${props => props.theme.spacing.unit2} ${props => props.theme.spacing.unit2};
    height: 100%;
    line-height: 100%;
    font-size: ${props => props.theme.type.fontSize};

    svg {
      min-width: ${props => props.theme.type.fontSize};
      margin-right: ${props => props.theme.spacing.unit1};
  }
  }
  :hover a {
    color: ${props => props.theme.colors.highlight};
  }
`;

const Logo = styled.img`
  height: 1.5rem;
  margin-right: 0.5rem;
`;

const StyledDivider = styled(Divider)`
  margin-top: ${props => props.theme.spacing.unit2};
  margin-bottom: ${props => props.theme.spacing.unit2};
`;

const Nav = () => (
  <StyledNav>
    <Menu>
      <MenuItem>
        <Link to="/">
          <Logo src={logo} />
          Cubee
        </Link>
      </MenuItem>
      <StyledDivider vertical />
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
    </Menu>
  </StyledNav>
);

export default Nav;
