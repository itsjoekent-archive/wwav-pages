import React from 'react';
import { BUILD_PAGE_TYPE, REGISTER_PAGE_TYPE } from './pageTypes';

export default function Application(props) {
  function ApplicationComponent() {
    switch (props.pageType) {
      case BUILD_PAGE_TYPE:
        return <React.Fragment><h1>Build</h1></React.Fragment>;
      case REGISTER_PAGE_TYPE:
        return <React.Fragment><h1>Register</h1></React.Fragment>;
      default:
        return <React.Fragment><h1>404</h1></React.Fragment>;
    }
  }

  return <ApplicationComponent />;
}
