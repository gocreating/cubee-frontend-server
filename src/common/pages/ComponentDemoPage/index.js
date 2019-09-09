import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { User as UserIcon } from 'styled-icons/boxicons-regular/User';
import { Helmet } from 'react-helmet';
import { withLayout } from '../../layouts/AppLayout';
import Container from '../../components/Container';
import Heading, { H1, H2, H3, H4, H5, H6 } from '../../components/Heading';
import Button, { ButtonGroup } from '../../components/Button';
import Divider from '../../components/Divider';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Block from './Block';

const BoxGroup = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  margin: 0px;
  padding: 0px;
`;

const Box = styled.li`
  color: ${props => props.fgColor};
  background-color: ${props => props.bgColor};
  font-size: ${props => props.theme.type.fontSize};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100px;
  height: 90px;
  box-shadow: 0px 0px 5px 1px #eee;
  padding: ${props => props.theme.spacing.unit2};
  :not(:last-child) {
    margin-right: ${props => props.theme.spacing.unit2};
  }
`;

class ComponentDemoPage extends Component {
  render() {
    const { theme } = this.props;

    return (
      <Container>
        <Helmet>
          <title>Component Demo</title>
        </Helmet>

        <Block title="Headers／標題">
          <H1>This is header level one</H1>
          <H2>This is header level two</H2>
          <H3>This is header level three</H3>
          <H4>This is header level four</H4>
          <H5>This is header level five</H5>
          <H6>This is header level six</H6>
          <Divider hidden />
          <Heading level={1}>這是標題一</Heading>
          <Heading level={2}>這是標題二</Heading>
          <Heading level={3}>這是標題三</Heading>
          <Heading level={4}>這是標題四</Heading>
          <Heading level={5}>這是標題五</Heading>
          <Heading level={6}>這是標題六</Heading>
        </Block>

        <Block title="Colors／色彩">
          <BoxGroup>
            <Box
              fgColor={theme.colors.white}
              bgColor={theme.colors.primary}
            >
              Primary<br />{theme.colors.primary}
            </Box>
            <Box
              fgColor={theme.colors.white}
              bgColor={theme.colors.secondary}
            >
              Secondary<br />{theme.colors.secondary}
            </Box>
            <Box
              fgColor={theme.colors.black}
              bgColor={theme.colors.white}
            >
              White<br />{theme.colors.white}
            </Box>
            <Box
              fgColor={theme.colors.black}
              bgColor={theme.colors.grey}
            >
              Grey<br />{theme.colors.grey}
            </Box>
            <Box
              fgColor={theme.colors.white}
              bgColor={theme.colors.black}
            >
              Black<br />{theme.colors.black}
            </Box>
          </BoxGroup>
        </Block>

        <Block title="Buttons／按鈕">
          <ButtonGroup>
            <Button>Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button bg="red" color="white">Custom</Button>
          </ButtonGroup>
          <Divider hidden />
          <ButtonGroup>
            <Button>預設</Button>
            <Button variant="primary">主要</Button>
            <Button variant="secondary">次要</Button>
            <Button bg="red" color="white">客製</Button>
          </ButtonGroup>
        </Block>

        <Block title="Form／表單">
          <h4>Block Form</h4>
          <Form>
            <Form.Field>
              <label htmlFor="block-username">Username</label>
              <Input
                id="block-username"
                type="text"
                autoComplete="new-password"
                placeholder="Some Text"
              />
            </Form.Field>
            <Form.Field required>
              <label htmlFor="block-password">Password</label>
              <Input
                id="block-password"
                type="password"
                autoComplete="new-password"
                placeholder="Input your password"
              />
            </Form.Field>
          </Form>

          <h4>Inline Form</h4>
          <Form>
            <Form.Field inline labelMinSize={12}>
              <label htmlFor="inline-username">Username</label>
              <Input
                id="inline-username"
                type="text"
                autoComplete="new-password"
                placeholder="Some Text"
              />
            </Form.Field>
            <Form.Field inline required labelMinSize={12}>
              <label htmlFor="inline-password">Password</label>
              <Input
                id="inline-password"
                type="password"
                autoComplete="new-password"
                placeholder="Input your password"
              />
            </Form.Field>
          </Form>
        </Block>

        <Block title="Icon／圖示">
          <UserIcon size={24} />
        </Block>
      </Container>
    );
  }
}

ComponentDemoPage.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme(withLayout({ nav: true })(ComponentDemoPage));
