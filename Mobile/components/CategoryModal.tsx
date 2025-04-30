import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type OptionSelectionModalTypes = {
  visible: boolean;
  onClosed: () => void;
  options: string[];
  onSelected: (value: string) => void;
  // onCancel?:()=>void;
  title: string;
  currentSelectedOption?: string;
};

export default function OptionModal({
  visible,
  onClosed,
  options,
  onSelected,
  title = "Select an option",
  currentSelectedOption,
}: OptionSelectionModalTypes) {
  useEffect(() => {
    console.log(title);
  }, [title]);

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClosed}>
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            {/* Modal title, close icon */}
            <View
              style={{
                backgroundColor: "#FFECAA",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                paddingVertical: 10,
                alignItems:"center"
              }}
            >
              <Text style={{ color: "black", fontSize: 20 }}>{title}</Text>
              <Ionicons
                name="close"
                size={24}
                color="black"
                onPress={onClosed}
              />
            </View>
            {/* list */}
            <View
              style={{
                // paddingHorizontal: 10,
                // gap: 20
              }}
            >
              <FlatList
                // style={{gap: 20}}
                data={options}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={()=>onSelected(item)}>
                    <View
                      style={[
                        item === currentSelectedOption
                          ? styles.selectedOption
                          : styles.otherOption,

                          styles.optionRow
                      ]}
                    >
                      <Text style={styles.item}>{item}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: "100%",
    // height: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    width: "100%",
    // paddingHorizontal: 5
  },
  optionRow:{
    borderBottomColor: '#ccc',
    borderBottomWidth: .5,
    paddingVertical: 14
  },
  selectedOption: {
    backgroundColor: "#f0f8ff",
    color: "black",
    // padding: 10,
  },
  otherOption: {
    backgroundColor: "white",
    color: "black",
    // padding: 10,
    // borderColor: "black",
  },
  item: {
    fontSize: 20,
    marginLeft: 20
  },
});
