import { useState } from "react";
import { ytVideoSearchRes } from "../../server/apis/youTubeApi";
import { extractParamsFromUrl } from "../../utils/extractParamsFromUrl";
import { insertToDb } from "../../utils/dbActions";
import "./SearchBar.scss";

function SearchBar({ setVideoList, setVideoToPlay }) {
  const [query, setQuery] = useState("");

  function handleEnterKeyPress(e) {
    //if the key pressed isn't ENTER, do nothing.
    if (e.keyCode !== 13) return;
    setQuery("");
    sendSearchRequest();
  }

  async function sendSearchRequest() {
    try {
      //extract the video id from the url.
      const videoId = extractParamsFromUrl(query);
      setQuery("");
      //send query request to you-tube api.
      const { data, status } = await ytVideoSearchRes(videoId);
      //parse the response.
      if (status === 200 && data.items.length > 0) {
        const [videoData] = data.items;
        const videoDetails = {
          id: videoData.id,
          Thumbnails: videoData.snippet.thumbnails.default.url,
          duration: videoData.contentDetails.duration,
          title: videoData.snippet.title
        };
        //insert the list to db.
        insertToDb({ [videoData.id]: videoDetails });
        //update the state with the response.
        setVideoList(prevState => {
          prevState.set(videoDetails.id, videoDetails);
          if (prevState.size === 1) {
            setVideoToPlay(videoDetails.id);
          }
          return new Map(prevState);
        });
      } else {
        setQuery("");
        // video not found.
      }
    } catch (error) {
      setQuery("");
      //write log with the relevant data.
    }
  }
  return (
    <div className="Search-bar-container">
      <input
        data-testid="input-searchbar"
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyUp={handleEnterKeyPress}
        className="Search-bar"
      ></input>
      <button data-testid="button-searchbar" className="Search-bar-btn" onClick={sendSearchRequest}>
        ADD
      </button>
    </div>
  );
}

export default SearchBar;
