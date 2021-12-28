import { View, Text, StyleSheet, StatusBar } from "react-native";
import color from "../misc/color";

const Screen = ({ children }) => {
  return <View style={styles.conatiner}>{children}</View>;
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: color.APP_BG,
    paddingTop: StatusBar.currentHeight,
  },
});
export default Screen;
