import React from 'react';

class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = { password: 0 };
  }

  getPasswordInput() {
    var password = "";
    seedquest.getPassword()

    chrome.storage.sync.get('password', function(data) {
        console.log(data.password); 

       this.setState(state => ({
          password: data.password
        }));
    });
  }

  showPasswordInput() {
    this.setState(state => ({
      password: this.getPasswordInput()
    }));
  }

  componentDidMount() {
    //this.interval = setInterval(() => this.getPasswordInput(), 1000);
  }

  render() {
    return (
      <div>
        Password: <span id="password_id"> -- </span>
      </div>
    );
  }
}

export default Password; 