import React, { Component } from 'react';

class SendMessageForm extends Component{

  constructor(){
    super();
    this.state = {
      message : ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.sendMessage(this.state.message, this.props.roomId);
    this.setState({
      message: ''
    })
  }
  render(){
    return (
      <form
        onSubmit={this.handleSubmit}
        className="send-message-form">
          <input
            onChange={this.handleChange}
            value={this.state.message}
            type="text"
            placeholder={this.props.inputEditable==='disabled'?"Please check in any room":"Type your message and hit Enter"}
            disabled = {this.props.inputEditable}
          />
      </form>
    );
  }
}

export default SendMessageForm;
