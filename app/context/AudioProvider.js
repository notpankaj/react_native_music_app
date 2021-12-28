import React from "react";
import * as MediaLibrary from "expo-media-library";
import { Alert, Text, View } from "react-native";
import { DataProvider } from "recyclerlistview";

// "canAskAgain": true,
// "expires": "never",
// "granted": false,
// "status": "undetermined",

export const AudioContext = React.createContext();

class AudioProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioFiles: [],
      permissionError: false,
      dataProvider: new DataProvider((r1, r2) => r1 !== r2),
      playbackObj: null,
      soundObj: null,
      currentAudio: {},
      isPlaying: false,
      currentAudioIndex: null,
    };
  }

  permissionAlert = () => {
    Alert.alert(
      "Permission Required!!",
      "This app need to read audio files from device!!",
      [
        {
          text: "i am ready.",
          onPress: () => this.getPermission(),
        },
        {
          text: "cancel",
          onPress: () => this.permissionAlert(),
        },
      ]
    );
  };

  getAudioFiles = async () => {
    //   by default it only read 20 files : we have to loop thru to get all files

    const { dataProvider, audioFiles } = this.state;

    let media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: media.totalCount,
    });
    // console.log(media.assets.length); total file count
    // console.log(media); all files

    // this.setState({ ...this.state, audioFiles: media.assets });
    this.setState({
      ...this.state,
      dataProvider: dataProvider.cloneWithRows([
        ...audioFiles,
        ...media.assets,
      ]),
      audioFiles: [...audioFiles, ...media.assets],
    });
  };

  getPermission = async () => {
    const permissions = await MediaLibrary.getPermissionsAsync();
    if (permissions.granted === true) {
      // get all audio files
      this.getAudioFiles();
    }
    if (permissions.canAskAgain === false && permissions.granted === false) {
      // throw error : display an error
      this.setState({ ...this.state, permissionError: true });
    }

    if (permissions.granted === false && permissions.canAskAgain === true) {
      // ask for permission
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();

      if (status === "denied" && canAskAgain === true) {
        // alert : that user must allow permissions to run this app
        this.permissionAlert();
      }
      if (status === "denied" && canAskAgain === false) {
        // throw error : display an error
        this.setState({ ...this.state, permissionError: true });
      }
      if (status === "granted") {
        // get all audio files
        this.getAudioFiles();
      }
    }
  };

  componentDidMount() {
    this.getPermission();
  }

  updateState = (prevState, newState = {}) => {
    this.setState({
      ...prevState,
      ...newState,
    });
  };

  render() {
    const {
      audioFiles,
      dataProvider,
      permissionError,
      playbackObj,
      soundObj,
      currentAudio,
      isPlaying,
      currentAudioIndex,
    } = this.state;
    if (permissionError === true) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              color: "red",
            }}
          >
            It's Look like you haven't accept the permission.
          </Text>
        </View>
      );
    }

    return (
      <AudioContext.Provider
        value={{
          audioFiles,
          dataProvider,
          playbackObj,
          soundObj,
          currentAudio,
          isPlaying,
          currentAudioIndex,
          updateState: this.updateState,
        }}
      >
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}

export default AudioProvider;
