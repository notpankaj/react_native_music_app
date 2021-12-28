// play audio
export const play = async (playbackObj, uri) => {
  try {
    const status = await playbackObj.loadAsync(
      { uri: uri },
      { shouldPlay: true }
    );
    return status;
  } catch (err) {
    console.log("ERROR: inside play helper method ", err.message);
  }
};

// pause audio
export const pause = async (playbackObj) => {
  try {
    const status = await playbackObj.setStatusAsync({
      shouldPlay: false,
    });
    return status;
  } catch (err) {
    console.log("ERROR: inside pause helper method ", err.message);
  }
};
// resume audio
export const resume = async (playbackObj) => {
  try {
    const status = await playbackObj.playAsync();
    return status;
  } catch (err) {
    console.log("ERROR: inside resume helper method ", err.message);
  }
};
// select audio / paly another
export const playNext = async (playbackObj, uri) => {
  try {
    await playbackObj.stopAsync();
    await playbackObj.unloadAsync();
    const status = await play(playbackObj, uri);
    return status;
  } catch (err) {
    console.log("ERROR: inside playNext helper method ", err.message);
  }
};
