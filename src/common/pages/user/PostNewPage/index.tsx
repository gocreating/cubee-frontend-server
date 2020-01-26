import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withLayout } from '../../../layouts/AppLayout';
import Container from '../../../components/Container';
import Heading from '../../../components/Heading';
import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {
  createPostRequest,
} from '../../../ducks/post';
import { RootAction } from '../../../reducers';

const mapStateToProps = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators<any, any>({
  createPostRequest,
}, dispatch);

type Props = ReturnType<typeof mapDispatchToProps>;

const PostNewPage: React.FunctionComponent<Props> = ({
  createPostRequest,
}) => {
  const refTitle = useRef<HTMLInputElement>(null);
  const refBody = useRef<HTMLInputElement>(null);
  const handleBtnCreateClick = () => {
    createPostRequest(refTitle.current!.value, { test: refBody.current!.value });
  };

  return (
    <Container>
      <Helmet>
        <title>Create New Post</title>
      </Helmet>
      <Heading level={2}>Create New Post</Heading>
      <Form>
        <Form.Field>
          <label htmlFor="post-title">Title</label>
          <Input
            ref={refTitle}
            id="post-title"
            type="text"
            placeholder="Title"
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="post-body">Body</label>
          <Input
            ref={refBody}
            id="post-body"
            type="text"
          />
        </Form.Field>
        <Button
          type="button"
          variant="primary"
          onClick={handleBtnCreateClick}
        >
          Create
        </Button>
      </Form>
    </Container>
  );
};

PostNewPage.propTypes = {
  createPostRequest: PropTypes.func.isRequired,
};

export default withLayout<Props>({ nav: true })(
  connect(mapStateToProps, mapDispatchToProps)(
    PostNewPage,
  ),
);
