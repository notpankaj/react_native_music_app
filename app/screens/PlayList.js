import { StyleSheet, Text, View } from "react-native";

export default function PlayList() {
  return (
    <View style={styles.container}>
      <Text>Playlist</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
