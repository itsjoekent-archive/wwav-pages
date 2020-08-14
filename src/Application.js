import React from 'react';
import { ThemeProvider } from 'styled-components';
import BuildPage from './BuildPage';
import RegistrationPage from './RegistrationPage';
import theme from './theme';
import { BUILD_PAGE_TYPE, REGISTER_PAGE_TYPE } from './pageTypes';

export default function Application(props) {
  function ApplicationComponent() {
    switch (props.pageType) {
      case BUILD_PAGE_TYPE:
        return <BuildPage {...props} />;
      case REGISTER_PAGE_TYPE:
        return <RegistrationPage {...props} />;
      default:
        return <React.Fragment><h1>404</h1></React.Fragment>;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <ApplicationComponent />
    </ThemeProvider>
  );
}
