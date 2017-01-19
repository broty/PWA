import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import LoginStore from '../stores/LoginStore.js';
import Send from '../services/sendMessage';
import when from 'when';
import request from 'reqwest';
import {API_URL} from '../constants/API';

export default AuthenticatedComponent( class TopicMessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };

    this.handleChangeMess = this.handleChangeMess.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log("Pridavam zpravu... topic_id: " + this.props.topic_id);

    var URL = API_URL + 'api/protected/topic/' + this.props.topic_id;

    when(fetch(URL, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + LoginStore.jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "message": this.state.message,
            "autor": this.props.user.username
          })
        }));
  }

  handleChangeMess(event) {
    this.setState({message: event.target.value});
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label for="inputMessage">Příspěvek:</label>
          <textarea name="message" id="inputMessage" className="form-control" placeholder="Text..." value={this.state.message} onChange={this.handleChangeMess} />
        </div>
        <button type="submit" class="btn btn-primary" value="Ok">Odeslat</button>
      </form>
    );
  }
});
