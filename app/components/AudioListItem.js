import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import color from "../misc/color";

const getThumbnailText = (text) => text[0];

const convertTime = (minutes) => {
  if (minutes) {
    const hrs = minutes / 60;
    const minute = hrs.toString().split(".")[0];
    const percent = parseInt(hrs.toString().split(".")[1].slice(0, 2));
    const sec = Math.ceil((60 * percent) / 100);

    if (parseInt(minute) < 10 && sec < 10) {
      return `0${minute}:${sec}`;
    }
    if (sec < 10) {
      return `${minute}: 0${sec}`;
    }
    return `${minute}: ${sec}`;
  }
};

const renderPlayPauseIcon = (isPlaying) => {
  if (isPlaying)
    return (
      <Entypo name="controller-paus" size={24} color={color.ACTIVE_FONT} />
    );
  return <Entypo name="controller-play" size={24} color={color.ACTIVE_FONT} />;
};

const AudioListItem = ({
  title,
  duration,
  onOptionPress,
  onAudioPress,
  isPlaying,
  activeListItem,
}) => {
  console.log({ isPlaying });
  return (
    <>
      <View style={styles.conatiner}>
        <TouchableWithoutFeedback onPress={onAudioPress}>
          <View style={styles.leftConatiner}>
            <View
              style={[
                styles.thumbnail,
                {
                  backgroundColor: activeListItem
                    ? color.ACTIVE_BG
                    : color.FONT_LIGHT,
                },
              ]}
            >
              <Text style={styles.thumbnailText}>
                {/* {getThumbnailText(title)} */}
                {activeListItem
                  ? renderPlayPauseIcon(isPlaying)
                  : getThumbnailText(title)}
              </Text>
            </View>
            <View style={styles.titleConatiner}>
              <Text numberOfLines={1} style={styles.title}>
                {title}
              </Text>
              <Text numberOfLines={1} style={styles.timeText}>
                {convertTime(duration)}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.rightConatiner}>
          <Entypo
            onPress={() => onOptionPress(title)}
            name="dots-three-vertical"
            size={20}
            color={color.FONT_MEDIUM}
            style={{ padding: 10 }}
          />
        </View>
      </View>
      <View style={styles.separator}></View>
    </>
  );
};

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  conatiner: {
    flexDirection: "row",
    alignSelf: "center",
    width: width - 80,
  },
  leftConatiner: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rightConatiner: {
    flexBasis: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnail: {
    height: 50,
    backgroundColor: color.FONT_LIGHT,
    flexBasis: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  thumbnailText: {
    fontSize: 22,
    fontWeight: "bold",
    color: color.FONT,
  },
  titleConatiner: {
    width: width - 180,
    paddingLeft: 10,
  },
  title: {
    fontSize: 16,
    color: color.FONT,
  },
  timeText: {
    fontSize: 14,
    color: color.FONT_LIGHT,
  },
  separator: {
    width: width - 80,
    backgroundColor: "#333",
    opacity: 0.3,
    height: 0.5,
    alignSelf: "center",
    marginTop: 10,
  },
});

export default AudioListItem;
