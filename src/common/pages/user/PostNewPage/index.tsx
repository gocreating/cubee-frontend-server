import shortid from 'shortid';
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withLayout } from '../../../layouts/AppLayout';
import Container from '../../../components/Container';
import Heading from '../../../components/Heading';
import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { Editor } from '../../../../cubee-wysiwyg';
import { Content } from '../../../../cubee-wysiwyg/types';
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

const initialContent = {
  id: shortid.generate(),
  type: 'cubee/LINEAR_LAYOUT',
  props: {
    orientation: 'vertical',
  },
  children: [
    {
      id: shortid.generate(),
      type: 'cubee/MARKDOWN_VIEW',
      props: {
        value: 'Lorem Ipsum is.\ndf g dfg sdfg sdf g',
      },
    },
    {
      id: shortid.generate(),
      type: 'cubee/MARKDOWN_VIEW',
      props: {
        value: 'text 2',
      },
    },
    {
      id: shortid.generate(),
      type: 'cubee/MARKDOWN_VIEW',
      props: {
        value: '## title 1\n\ntext paragraph',
      },
    },
  ],
};

const StyledEditor = styled(Editor)`
  border: 1px solid #000;
`;

const PostNewPage: React.FunctionComponent<Props> = ({
  createPostRequest,
}) => {
  const refTitle = useRef<HTMLInputElement>(null);
  const [editorContent, setEditorContent] = useState<Content>(initialContent);
  const handleEditorContentChange = (content: Content) => {
    setEditorContent(content);
  };
  const handleBtnCreateClick = () => {
    console.log(editorContent);
    // createPostRequest(refTitle.current!.value, editorContent);
  };

  return (
    <Container>
      <Helmet>
        <title>Create New Post</title>
      </Helmet>
      <Form>
        <Form.Field>
          <Input
            ref={refTitle}
            id="post-title"
            type="text"
            placeholder="Title"
          />
        </Form.Field>
        <Form.Field>
          <StyledEditor
            content={editorContent}
            onContentChange={handleEditorContentChange}
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
