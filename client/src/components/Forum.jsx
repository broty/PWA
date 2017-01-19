import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import TopicsList from './TopicsList';
import CreateTopicForm from './CreateTopicForm';
import LoginStore from '../stores/LoginStore.js';
import {API_URL} from '../constants/API';

export default AuthenticatedComponent(class Forum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {

    var URL = API_URL + 'api/protected/topics';

    fetch(URL, {
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


    render() {
      return (
        <div>
          <h1>Forum</h1>

          <h2>{'Seznam diskuzních témat'}</h2>
          <CreateTopicForm/>
          <TopicsList data={this.state.data}/>
        </div>
      );
    }
  });
