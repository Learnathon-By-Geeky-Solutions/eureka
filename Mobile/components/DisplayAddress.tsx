import {
    AntDesign,
  Entypo,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useEffect } from "react";
import { Text, View } from "react-native";

type Location = {
  address: string;
  
};
type DisplayAddressProps = {
  location: Location;
};

export default function DisplayAddress({ location }: DisplayAddressProps) {
  // split base on comma

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          paddingHorizontal: 20,
          width: "90%",
          // borderBottomColor:"black",
          // borderBottomWidth: 1,
          // justifyContent:"center"
        }}
      >
        <Entypo name="address" size={18} color="blue" />
        <Text style={{ fontSize: 18 }}>{location.address}</Text>
        {/* <hr /> */}
      </View>
     
    </View>
  );
}
