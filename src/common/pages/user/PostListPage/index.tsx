import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { withLayout } from '../../../layouts/AppLayout';
import Container from '../../../components/Container';
import Heading from '../../../components/Heading';
import {
  selectors as hostSelectors,
} from '../../../ducks/host';
import {
  listUserPostRequest,
  selectors as postSelectors,
  Post,
} from '../../../ducks/post';
import { RootState, RootAction } from '../../../reducers';

const mapStateToProps = (state: RootState) => ({
  location: state.router.location,
  username: hostSelectors.getUsername(state),
  posts: postSelectors.getUserPostsOfPage(state),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators<any, any>({
  listUserPostRequest,
}, dispatch);

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const PostListPage: React.FunctionComponent<Props> = ({
  location, username, posts, listUserPostRequest,
}) => {
  const query = qs.parse(location.search);
  const page = Number(query.page) || 1;
  const prevPage = Math.max(page - 1, 1);
  const nextPage = page + 1;

  useEffect(() => {
    listUserPostRequest(username, page);
  }, [page]);

  return (
    <Container>
      <Helmet>
        <title>User Posts</title>
      </Helmet>
      <Heading level={2}>User Posts</Heading>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.id}>
            {post.id}, {post.title}
          </li>
        ))}
      </ul>
      <Link to={{ search: qs.stringify({ ...query, page: prevPage }) }}>Prev Page</Link>
      <Link to={{ search: qs.stringify({ ...query, page: nextPage }) }}>Next Page</Link>
    </Container>
  );
};

PostListPage.propTypes = {
  location: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  listUserPostRequest: PropTypes.func.isRequired,
};

export default withLayout<Props>({ nav: true })(
  connect(mapStateToProps, mapDispatchToProps)(
    PostListPage,
  ),
);
