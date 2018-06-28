import React, { Component } from 'react';

class NewRoomForm extends Component{

  constructor(){
    super();
    this.state = {
      name: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({
      name: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.createRoom(this.state.name);
    this.setState({
      name: ''
    })
  }
  render(){
    return (
        <form className="new-room-form">
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="Type new room name"
              required />
            <button id="create-room-btn" type="submit"
              onClick={this.handleSubmit}>+</button>
        </form>
    );
  }
}

export default NewRoomForm;
