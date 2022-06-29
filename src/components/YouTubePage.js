import { getFromDb } from "../utils/dbActions";
import PlayList from "./PlayList/PlayList";
import SearchBar from "./SearchBar/SearchBar";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import { useState, useEffect } from "react";

function YouTubePage() {
  const [videoList, setVideoList] = useState(new Map());
  const [videoToPlay, setVideoToPlay] = useState(null);
  useEffect(() => {
    const getPlatlist = async () => {
      const videosFromDb = await getFromDb();
      setVideoList(new Map(Object.entries(videosFromDb.data)));
      setVideoToPlay(Object.keys(videosFromDb.data)[0]);
    };
    getPlatlist();
  }, []);
  return (
    <div className="App">
      <SearchBar
        setVideoList={setVideoList}
        setVideoToPlay={setVideoToPlay}
      ></SearchBar>
      <PlayList
        listOfVideoes={videoList}
        setVideoList={setVideoList}
        setVideoToPlay={setVideoToPlay}
      ></PlayList>
      <VideoPlayer
        listOfVideos={videoList}
        setVideoList={setVideoList}
        selectedVideoIndex={videoToPlay}
      ></VideoPlayer>
    </div>
  );
}

export default YouTubePage;
