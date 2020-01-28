import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import themeGet from '@styled-system/theme-get';
import { Info as InfoIcon } from '@styled-icons/material/Info';
import { Warning as WarnIcon } from '@styled-icons/material/Warning';
import { Error as ErrorIcon } from '@styled-icons/material/Error';
import {
  removeMessage,
  selectors as messageSelectors,
  Message,
  MessageType,
} from '../ducks/message';
import { RootState, RootAction } from '../reducers';
import Box from '../components/Box';
import Container from '../components/Container';

const mapStateToProps = (state: RootState) => ({
  messages: messageSelectors.getMessages(state),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators<any, any>({
  removeMessage,
}, dispatch);

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const MessageList = styled(Container).attrs({
  as: 'ul',
  py: 2,
})`
  position: fixed;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MessageContainer = styled.p``;
const MessageIcon = styled(Box).attrs({ as: 'span', mr: 1 })``;
const MessageTitle = styled(Box).attrs({ as: 'span', mr: 1 })``;
const MessageContent = styled(Box).attrs({ as: 'span' })``;
const DismissButton = styled.a``;

const MessageItem = styled(Box).attrs({ as: 'li', my: 2, p: 2 })`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  background-color: ${themeGet('colors.highlight')};
  box-shadow: 0px 0px 3px 1px #aaa;
  line-height: 100%;

  ${MessageContainer} {
    display: flex;
    align-self: start;
    align-items: center;
    flex-wrap: wrap;
    text-align: justify;

    ${MessageIcon} {
      display: inline-flex;
      align-items: center;
      min-width: 20px;
    }
    ${MessageTitle} {
      font-weight: bold;
    }
  }
  ${DismissButton} {
    cursor: pointer;
    color: rgb(0, 0, 238);
  }
`;

const IconMap = {
  [MessageType.VERBOSE]: InfoIcon,
  [MessageType.DEBUG]: InfoIcon,
  [MessageType.INFO]: InfoIcon,
  [MessageType.WARN]: WarnIcon,
  [MessageType.ERROR]: ErrorIcon,
};

const Messages: React.FunctionComponent<Props> = ({
  messages, removeMessage,
}) => {
  if (messages.length === 0) {
    return null;
  }

  return (
    <MessageList>
      {messages.map((message: Message) => {
        const Icon = IconMap[message.type];
        return (
          <MessageItem key={message.id}>
            <MessageContainer>
              <MessageIcon>
                <Icon size={20} />
              </MessageIcon>
              {message.title && (
                <MessageTitle>{message.title}</MessageTitle>
              )}
              <MessageContent>{message.message}</MessageContent>
            </MessageContainer>
            <DismissButton onClick={() => removeMessage(message.id)}>
              Close
            </DismissButton>
          </MessageItem>
        );
      })}
    </MessageList>
  );
};

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeMessage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  Messages,
);
