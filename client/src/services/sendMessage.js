import request from 'reqwest';
import when from 'when';
import LoginStore from '../stores/LoginStore.js';

class sendMessage {

  sendMsg(message, API_URL) {
    return when(request ({
      url: API_URL,
      method: 'POST',
      crossOrigin: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + LoginStore.jwt
      },
      body: JSON.stringify({
        "message": this.state.message,
        "autor": this.props.user.username
      })
    }));
  }


/*
  signup(username, password, extra) {
    return this.handleAuth(when(request({
      url: SIGNUP_URL,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        username, password, extra
      }
    })));
  }

  handleAuth(loginPromise) {
    return loginPromise
      .then(function(response) {
        var jwt = response.id_token;
        LoginActions.loginUser(jwt);
        return true;
      });
  }
  */
}
export default new sendMessage()
