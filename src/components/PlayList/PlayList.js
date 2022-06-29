import socketClient from "socket.io-client";
import { useEffect } from "react";
import "./PlayList.scss";
import { convertISO8601ToDuration } from "../../utils/convertISO8601ToDuration";

const PlayList = ({ listOfVideoes, setVideoList, setVideoToPlay }) => {
  //useeffect for listen to incoming message from socket.
  useEffect(() => {
    const socket = socketClient("http://localhost:3030/");
    socket.on("video-list", data => {
      switch (data.action) {
        case "add-new-video":
          setVideoList(prevState => {
            const key = Object.keys(data.video)[0];
            prevState.set(key, data.video[key]);
            return new Map(prevState);
          });
          break;
        default:
          break;
      }
    });
  }, []);

  if (!listOfVideoes?.size) return null;

  const sidebar = Array.from(listOfVideoes.values()).map(video => (
    <div key={video.id}>
      <div>
        <p>{video.title}</p>
      </div>
      <div>
        <li className="Playlist-button" data-testid="input-searchbar" id={video.id} onClick={() => setVideoToPlay(video.id)}>
          <img src={video.Thumbnails}></img>
          <p className="Play-list-duratrion-p"> {convertISO8601ToDuration(video.duration)}</p>
        </li>
      </div>
    </div>
  ));
  return (
    <div className="Playlist-sidebar">
      <ul className="Playlist-item">{sidebar}</ul>
    </div>
  );
};

export default PlayList;
