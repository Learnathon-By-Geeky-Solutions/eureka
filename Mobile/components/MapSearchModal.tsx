import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons"; // Assuming you use AntDesign for the close button

type Location = {
  address: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (location: Location) => void;
  title: string;
};

export default function MapSearch({ visible, onClose, onSelect, title }: Props) {
  const [query, setQuery] = useState<string>("");

  const handleSelectLocation = () => {
    const location = {
      address: query, // Only passing the address as text
    };

    onSelect(location); // Pass the location with just the address

    // Clear the input field after selection
    setQuery("");
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modal}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 20 }}>{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <AntDesign name="closesquareo" size={24} color="blue" />
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Enter an address"
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />

        <TouchableOpacity onPress={handleSelectLocation} style={styles.item}>
          <Text style={{textAlign:"center"}}>Submit Address</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    marginTop: 100,
    marginHorizontal: 20,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1,
    padding: 8,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    backgroundColor: "orange",
    color:"black",
    borderRadius: 5,
    marginVertical: 5,
  },
});
