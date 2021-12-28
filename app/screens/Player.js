import { Dimensions, StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen";
import color from "../misc/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

const width = Dimensions.get("window").width;
export default function Player() {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.audioCount}>1/99</Text>
      </View>
      <View style={styles.midBannerContainer}>
        <MaterialCommunityIcons
          name="music-circle"
          color={"black"}
          size={300}
        />
      </View>
      <View style={styles.audioPlayerContainer}>
        <Text style={styles.audioTitle} numberOfLines={1}>
          Audio File Name
        </Text>

        <Slider
          style={{ width: width, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={color.FONT_MEDIUM}
          maximumTrackTintColor={color.ACTIVE_BG}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "green",
  },
  audioCount: {
    textAlign: "right",
    padding: 15,
    color: color.FONT_LIGHT,
    fontSize: 14,
    // backgroundColor: "orange",
  },
  midBannerContainer: {
    // backgroundColor: "red",
    flex: 5,
    alignItems: "center",
  },
  audioPlayerContainer: {
    // backgroundColor: "pink",
  },
  audioTitle: {
    color: color.FONT,
    padding: 15,
    fontSize: 16,
  },
});
