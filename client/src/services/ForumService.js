import request from 'reqwest';
import when from 'when';
import {TOPICS_URL} from '../constants/ForumConstants';
import ForumActions from '../actions/ForumActions';
import LoginStore from '../stores/LoginStore.js';

class QuoteService {

  topicsList() {
    request({
      url: TOPICS_URL,
      method: 'GET',
      crossOrigin: true,
      headers: {
        'Authorization': 'Bearer ' + LoginStore.jwt
      }
    })
    .then(function(response) {
      QuoteActions.gotQuote(response);
    });
  }

}

export default new QuoteService()
