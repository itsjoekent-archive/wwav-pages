import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import BuildPage from './BuildPage';
import RegistrationPage from './RegistrationPage';
import NotFoundPage from './NotFoundPage';
import Footer from './Footer';
import theme from './theme';
import { BUILD_PAGE_TYPE, REGISTER_PAGE_TYPE } from './pageTypes';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  background-color: ${({ theme }) => theme.colors.white};
  background-image: url(/confetti.png);
  background-size: 300px;
  background-repeat: repeat;
`;

const ApplicationComponentWrapper = styled.div`
  flex-grow: 1;
`;

export default function Application(props) {
  function ApplicationComponent() {
    switch (props.pageType) {
      case BUILD_PAGE_TYPE:
        return <BuildPage {...props} />;
      case REGISTER_PAGE_TYPE:
        return <RegistrationPage {...props} />;
      default:
        return <NotFoundPage />;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Page>
        <ApplicationComponentWrapper>
          <ApplicationComponent />
        </ApplicationComponentWrapper>
        <Footer />
      </Page>
    </ThemeProvider>
  );
}
