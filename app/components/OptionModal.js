import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Modal,
  StatusBar,
} from "react-native";
import color from "../misc/color";

const OptionModal = ({
  visible,
  onClose,
  currentItem,
  onPlaylistPress,
  onPlayPress,
}) => {
  return (
    <>
      <StatusBar hidden={true} />
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.modal}>
          <Text style={styles.title} numberOfLines={2}>
            {currentItem?.filename}
          </Text>
          <View style={styles.optionContainer}>
            <TouchableWithoutFeedback onPress={onPlayPress}>
              <Text style={styles.option}>Play</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onPlaylistPress}>
              <Text style={styles.option}>Add to Playlist</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBg}></View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: color.APP_BG,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 20,
    paddingBottom: 0,
    color: color.FONT_MEDIUM,
  },
  optionContainer: {
    padding: 20,
  },
  option: {
    fontSize: 16,
    fontWeight: "bold",
    color: color.FONT,
    paddingVertical: 10,
    letterSpacing: 1,
  },
  modalBg: {
    position: "absolute",
    backgroundColor: color.MODAL_BG,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default OptionModal;
