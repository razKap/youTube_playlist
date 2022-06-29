export const convertISO8601ToDuration = iso8601Format => {
  try {
    if (iso8601Format === "P0D") {
      return "LIVE !";
    }

    var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;

    let hours = 0,
      minutes = 0,
      seconds = 0,
      totalDuration = 0;

    if (reptms.test(iso8601Format)) {
      //check with regex for iso8601 pattern
      var matches = reptms.exec(iso8601Format);
      if (matches[1]) hours = Number(matches[1]);
      if (matches[2]) minutes = Number(matches[2]);
      if (matches[3]) seconds = Number(matches[3]);

      //check if there is a value in each part and pad with lead zero.
      const h = !hours ? "" : hours.toString().padStart(2, "0");
      const m = !minutes ? "" : minutes.toString().padStart(2, "0");
      const s = !seconds ? "" : seconds.toString().padStart(2, "0");

      totalDuration = `${h}:${m}:${s}`;
      //remove unnecessary colon
      totalDuration = totalDuration.replace(/^:+/, "");
    }
    return totalDuration;
  } catch (error) {
    return "";
  }
};
