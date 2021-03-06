import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import styled, { css } from 'styled-components';
import { typography } from 'styled-system';
import themeGet from '@styled-system/theme-get';
import { Link } from 'react-router-dom';
import { Component as ComponentIcon } from '@styled-icons/boxicons-solid/Component';
import { User as UserIcon } from '@styled-icons/boxicons-regular/User';
import { Add as AddIcon } from '@styled-icons/material/Add';
import { Article as ArticleIcon } from '@styled-icons/remix-line/Article';
import {
  logoutRequest,
  selectors as authSelectors,
} from '../ducks/auth';
import {
  selectors as hostSelectors,
} from '../ducks/host';
import { RootState, RootAction } from '../reducers';
import Divider from '../components/Divider';
import logo from '../../../public/logo.svg';

interface MenuProps {
  pullRight?: boolean;
}

const mapStateToProps = (state: RootState) => ({
  isAuth: authSelectors.getIsAuth(state),
  isLoggingOut: authSelectors.getIsLoggingOut(state),
  isRootDomain: hostSelectors.getIsRootDomain(state),
  isUserSubdomain: hostSelectors.getIsUserSubdomain(state),
  username: authSelectors.getUsername(state),
  host: hostSelectors.getHost(state),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators<any, any>({
  logoutRequest,
  push,
}, dispatch);

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const StyledNav = styled.nav`
  display: flex;
  padding: ${themeGet('space.5')}px ${themeGet('space.6')}px;
  background-color: ${themeGet('colors.primary')};
`;

const Menu = styled.ul<MenuProps>`
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

const Nav: React.FunctionComponent<Props> = ({
  isAuth, isLoggingOut, isRootDomain, username, logoutRequest,
}) => {
  const handleBtnLogoutClick = () => {
    logoutRequest();
  };

  return (
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
        <MenuItem>
          <Link to="/test">Test</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/components">
            <ComponentIcon size={24} />
            Components
          </Link>
        </MenuItem>
      </Menu>
      <Menu pullRight>
        {isAuth && isRootDomain && (
          <MenuItem>
            <Link to="/posts/new">
              <AddIcon size={24} />
              New Post
            </Link>
          </MenuItem>
        )}
        {isAuth && isRootDomain && (
          <MenuItem>
            <Link to={`/${username}/posts`}>
              <ArticleIcon size={22} />
              Posts
            </Link>
          </MenuItem>
        )}
        {!isAuth && isRootDomain && (
          <MenuItem>
            <Link to="/login">
              <UserIcon size={20} />
              Login
            </Link>
          </MenuItem>
        )}
        {isAuth && isRootDomain && (
          <MenuItem>
            <Link to="#" onClick={handleBtnLogoutClick}>
              <UserIcon size={20} />
              Logout
              {isLoggingOut && '...'}
            </Link>
          </MenuItem>
        )}
      </Menu>
    </StyledNav>
  );
};

Nav.propTypes = {
  isLoggingOut: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  isRootDomain: PropTypes.bool.isRequired,
  isUserSubdomain: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  logoutRequest: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  Nav,
);
