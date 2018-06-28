import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import NewRoomForm from './components/NewRoomForm';
import SendMessageForm from './components/SendMessageForm';
import { ChatManager, TokenProvider } from '@pusher/chatkit';
import {tokenUrl, instanceLocator} from './config.js';


class App extends Component {

  constructor(){
    super()
    this.state = {
        messages: [],
        joinableRooms: [],
        joinedRooms: [],
        roomId: 0,
        inputEditable: 'disabled'
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.createRoom = this.createRoom.bind(this);

  }
  componentDidMount(){
      const chatManager = new ChatManager({
        instanceLocator,
        userId: 'Gavin',
        tokenProvider: new TokenProvider({
          url: tokenUrl
        })
      })

      chatManager.connect()
        .then(currentUser => {
          this.currentUser = currentUser;
          this.getRooms();
        })
        .catch(err => console.log('error on connecting: ' + err));
  }

  getRooms(){
    this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
      this.setState({
        joinableRooms,
        joinedRooms: this.currentUser.rooms
      })
    })
  }

  subscribeToRoom(roomId) {
    this.setState({
      messages: [],
      roomId: roomId,
      inputEditable: ''
    })
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      messageLimit: 10,
      hooks: {
        onNewMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      }
    })
    .then(room => {
      this.getRooms();
    })
    .catch(err => console.log('error on subscribing to room: ' + err));
  }
  sendMessage(text,roomId){
    this.currentUser.sendMessage({
      text: text,
      roomId: roomId
    }).then(messageId => {
      console.log(`Added message to room: ${roomId}`);
    }).catch(err => {
      console.log(`Error adding message ${err}`);
    })
  }

  createRoom(name){
    this.currentUser.createRoom({
      name,
      private: false,
    }).then(room => {
      this.subscribeToRoom(room.id)
    }).catch(err => {
      console.log(`Error creating room ${err}`)
    })
  }

  render() {
    return (
      <div className="app">
        <RoomList
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms,...this.state.joinedRooms]}/>
        <MessageList messages={this.state.messages}/>
        <NewRoomForm createRoom={this.createRoom}/>
        <SendMessageForm
          roomId={this.state.roomId}
          sendMessage={this.sendMessage}
          inputEditable={this.state.inputEditable}/>
      </div>
    );
  }
}

export default App;
