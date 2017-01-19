import React from 'react';
import TopicMessages from './TopicMessages';
import TopicMessageForm from './TopicMessageForm';
import AuthenticatedComponent from './AuthenticatedComponent';
import LoginStore from '../stores/LoginStore.js';
import {API_URL} from '../constants/API';

export default AuthenticatedComponent( class Topic extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    var URL = API_URL + 'api/protected/topic/';

    const getMessages = () => {
      fetch(URL + this.props.params.id, {
        headers: {
          'Authorization': 'Bearer ' + LoginStore.jwt
        }
      })
      .then( (response) => {
        return response.json() })
        .then( (json) => {
          this.setState({data: json});
          //console.log(json);
        });
      }

      getMessages();

      this._interval = window.setInterval(getMessages, 1000);

    }

    render() {
      return(
        <div className="jumbotron">
          <h2>{this.state.data}</h2>
          <TopicMessageForm topic_id={this.props.params.id} />
          <TopicMessages data={this.state.data.splice(1)} />
        </div>
      );
    }
  });
