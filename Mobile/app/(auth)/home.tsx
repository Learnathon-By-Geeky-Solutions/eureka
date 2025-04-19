import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
// assets\images\courier logo.png
const logo = require("../../assets/images/courier logo.png");

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function AuthHome() {
  return (
    <View style={styles.container}>
      {/* logo */}
      <View>
        <Image
          source={logo}
          placeholder={{ blurhash }}
          contentFit="cover"
          style={styles.logoImage}
        />
      </View>
      {/* slogan */}
      <View style={styles.logoTextContainer}>
        <Text style={{ textAlign: "center", fontSize: 18 }}>
          Fast, Reliable, and Hassle-Free Deliveries{"\n"}Just a Click Away!
        </Text>
        {/* <Text style={{}}>Sign in to book your deliveries with ease!</Text>
        <Text style={{}}>Track your parcels in real-time, enjoy secure and affordable shipping, and experience seamless door-to-door service.</Text>
        <Text style={{}}>Whether it's a small package or big shipment, we've got you covered.</Text> */}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(auth)/login")}
      >
        
        <View style={styles.buttonContainer}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            Log In
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(auth)/register")}
      >
        <View style={[styles.buttonContainer, { backgroundColor: "black" }]}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            Create Account
          </Text>
        </View>
      </TouchableOpacity>

      {/* <Image source={logo} style={styles.logoImage}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFECAA",
  },
  logoImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  logoTextContainer: {
    width: "80%",
    marginTop: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 5,
    // marginBottom:5,
    backgroundColor: "orange",
    width: "80%",
    paddingHorizontal: 93,
    alignSelf: "center",
    paddingVertical: 15,
    borderRadius: 50,
    // rowGap: 5
  },
  button: {
    width: "100%",
  },
});
