import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { deleteFromDb } from "../../utils/dbActions";
import "./VideoPlayer.scss";

function VideoPlayer({ listOfVideos, selectedVideoIndex, setVideoList }) {
  const [currentPlayIndex, setCurrentPlayIndex] = useState(selectedVideoIndex);

  useEffect(() => {
    setCurrentPlayIndex(selectedVideoIndex);
  }, [selectedVideoIndex]);

  if (listOfVideos?.length < 1) return null;
  //player options and configurations
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };

  function handleOnEndVideo() {
    // map the list
    const currentVideo = listOfVideos.keys();
    let { value, done } = currentVideo.next();

    //get the next video
    while (value !== currentPlayIndex && !done) {
      const result = currentVideo.next();
      value = result.value;
      done = result.done;
    }
    //check if the playlist is empty or we on last video in the list(start over)
    const result = currentVideo.next();
    if (result.done && listOfVideos.size > 1) {
      setCurrentPlayIndex(listOfVideos.keys().next().value);
    } else {
      setCurrentPlayIndex(result.value);
    }
    //remove the song from, the list.
    setVideoList(prevState => {
      prevState.delete(currentPlayIndex);
      return new Map(prevState);
    });
    //remove video from db.
    deleteFromDb(currentPlayIndex);
  }

  if (listOfVideos.length === 0 || !currentPlayIndex) return null;

  return (
    <div>
      {
        <div className="Video-player">
          <YouTube
            videoId={currentPlayIndex}
            opts={opts}
            onEnd={() => {
              handleOnEndVideo();
            }}
          />
        </div>
      }
    </div>
  );
}

export default VideoPlayer;
