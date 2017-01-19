import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import LoginStore from '../stores/LoginStore.js';

export default AuthenticatedComponent( class TopicMessages extends React.Component {
  render() {
      var messages = this.props.data.map( (obj, idx) => {
        return(
          <li key={idx} className="media">
            <div className="media-body">
              <span className="text-muted pull-right"><small className="text-muted">{obj.datum}</small></span>
              <strong className="text-success">{obj.autor}</strong>
              <p>{obj.zprava}</p>
            </div>
          </li>
        );
      });

    return(
      <div className="panel panel-success marg_top">
        <div className="panel-body">
          <ul className="media-list">
            {messages}
          </ul>
        </div>
      </div>
    );
  }
});
