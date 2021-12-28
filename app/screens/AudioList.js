import React from "react";
import { Dimensions, Text, View } from "react-native";
import { AudioContext } from "../context/AudioProvider";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";
import AudioListItem from "../components/AudioListItem";
import Screen from "../components/Screen";
import OptionModal from "../components/OptionModal";
import { Audio } from "expo-av";
import { play, pause, resume, playNext } from "../misc/audioController";

class AudioList extends React.Component {
  static contextType = AudioContext;

  constructor(props) {
    super(props);
    this.state = {
      optionModalVisible: false,
    };
    this.currentItem = {};
  }
  layoutProvider = new LayoutProvider(
    (i) => "audio",
    (type, dim) => {
      switch (type) {
        case "audio":
          dim.width = Dimensions.get("window").width;
          dim.height = 70;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );

  handleAudioPress = async (audio) => {
    const { soundObj, playbackObj, currentAudio, updateState, audioFiles } =
      this.context;

    // playing audio for first time
    if (soundObj === null) {
      const playbackObj = new Audio.Sound();
      // const status = await playbackObj.loadAsync(
      //   { uri: audio.uri },
      //   { shouldPlay: true }
      // );

      // this.setState({
      //   ...this.state,
      //   currentAudio: audio,
      //   playbackObj: playbackObj,
      //   soundObj: status,
      // });
      const status = await play(playbackObj, audio.uri);
      const index = audioFiles.indexOf(audio);
      updateState(this.context, {
        currentAudio: audio,
        playbackObj: playbackObj,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
      });
      console.log(status);
      return;
    }
    // pause audio
    if (
      soundObj?.isLoaded &&
      soundObj?.isPlaying &&
      currentAudio.id === audio.id
    ) {
      // console.log("audio is alray palying");
      const status = await pause(playbackObj);
      updateState(this.context, {
        soundObj: status,
        isPlaying: false,
      });
      console.log(status);
      return;
    }
    // resume audio
    if (
      soundObj?.isLoaded &&
      soundObj?.isPlaying === false &&
      currentAudio.id === audio.id
    ) {
      const status = await resume(playbackObj);
      updateState(this.context, { soundObj: status, isPlaying: true });
      console.log(status);
      return;
    }
    // select another  audio - next audio
    if (soundObj.isLoaded && currentAudio.audio !== audio.id) {
      const status = await playNext(playbackObj, audio.uri);
      const index = audioFiles.indexOf(audio);
      updateState(this.context, {
        playbackObj: playbackObj,
        currentAudio: audio,
        status: status,
        isPlaying: true,
        currentAudioIndex: index,
      });
      console.log(status);
      return;
    }
  };

  rowRenderer = (type, item, index, extendedState) => {
    return (
      <AudioListItem
        title={item.filename}
        duration={item.duration}
        onOptionPress={() => {
          this.setState({ ...this.state, optionModalVisible: true });
          this.currentItem = item;
        }}
        activeListItem={!!(this.context.currentAudioIndex === index)}
        isPlaying={extendedState.isPlaying}
        onAudioPress={() => this.handleAudioPress(item)}
      />
    );
  };

  render() {
    // -> without recycler view
    // console.log(this.context); //get context data
    // return (
    //   <ScrollView style={styles.container}>
    //     {this.context?.audioFiles.map((item, idx) => (
    //       <Text key={idx}>{item.filename}</Text>
    //     ))}
    //   </ScrollView>
    // );
    // -> with recycler view

    return (
      <AudioContext.Consumer>
        {({ dataProvider, isPlaying }) => {
          return (
            <Screen>
              <View style={{ flex: 1 }}>
                <RecyclerListView
                  dataProvider={dataProvider}
                  layoutProvider={this.layoutProvider}
                  rowRenderer={this.rowRenderer}
                  extendedState={{ isPlaying }}
                />
                <OptionModal
                  onClose={() => {
                    this.setState({ ...this.state, optionModalVisible: false });
                    this.currentItem = {};
                  }}
                  onPlaylistPress={() =>
                    console.log(this.currentItem?.filename + "add to playlist")
                  }
                  onPlayPress={() =>
                    console.log(this.currentItem?.filename + "play this")
                  }
                  currentItem={this.currentItem}
                  visible={this.state.optionModalVisible}
                />
              </View>
            </Screen>
          );
        }}
      </AudioContext.Consumer>
    );
  }
}

export default AudioList;
