import { MaterialIcons } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  modalTitle: string
};
export default function CreatePostModal({ isVisible, onClose, modalTitle }: Props) {
  return (
    <View>
      <Modal animationType="slide" visible={isVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <Text>{modalTitle}</Text>
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>
      {/* <Text></Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // justifyContent:"center",
    alignItems:"center",
    backgroundColor:"gray"


  },
});
