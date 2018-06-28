import React from 'react';
import ReactTooltip from 'react-tooltip';

const RoomList = props => {

  const orderRooms = [...props.rooms].sort((a,b) => {a.id - b.id});
  let userAvatar = (name) => {
    return `https://ui-avatars.com/api//${name}/24/b0c7d6`
  }
  return (
      <div className="rooms-list">
          <ul>
          <h3>Your rooms:</h3>
              {orderRooms.map(room => {
                const active = props.roomId === room.id ? "active" : "";
                return (
                  <li key={room.id} className={"room " + active}>
                    <a href='#'
                       onClick={() => {props.subscribeToRoom(room.id)}}># {room.name} {room.id}</a>
                    <div>
                      {room.userIds.map(userId => {
                        console.log(userId);
                        return <div className='avatar' key={userId+ ' avatar'}>
                          <img key={userId}
                                className={userId}
                                src={userAvatar(userId)}
                                data-tip data-for={userId}/>
                          <ReactTooltip key={userId+'_tooltip'}
                            id={userId}
                            place="bottom" type="light" effect="solid">
                            <span>{userId}</span>
                          </ReactTooltip>
                        </div>
                      })}
                    </div>
                  </li>
                )
              })}
          </ul>
      </div>
  )
}


export default RoomList
