import React from 'react';
import LoginStore from '../stores/LoginStore.js';
import AuthenticatedComponent from './AuthenticatedComponent';
import when from 'when';
import {API_URL} from '../constants/API';

// mock: http://private-cc553-pwa5.apiary-mock.com

export default AuthenticatedComponent(class CreateTopicForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topic_name: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    //var URL = 'https://pwaaa.herokuapp.com/api/protected/topics';
    //var URL = 'http://localhost:3001/api/protected/topics';
    var URL = API_URL + 'api/protected/topics';

    when(fetch(URL, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + LoginStore.jwt,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "topic_name": this.state.topic_name
      })
    }).success( (response) => {
      console.log("response");
    }));
  }

  handleChange(event) {
    this.setState({topic_name: event.target.value});
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Založit nové téma:
          <input type="text" name="topic_name" value={this.state.topic_name} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Ok" />
      </form>
    );
  }
});
