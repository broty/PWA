import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent'

export default AuthenticatedComponent(class Forum extends React.Component {
  render() {
    return (<h1>Forum</h1>);
  }
});
