import CreatePostModal from "@/components/CreatePostModal";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function PostListScreen() {
  const [isCreatePostModal, setIsCreatePostModal] = useState<boolean>(false);

  const onCreatePostModalClose = () => {
    setIsCreatePostModal(!isCreatePostModal);
  };
  console.log(isCreatePostModal)
  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* create post view */}
      <TouchableOpacity onPress={()=>setIsCreatePostModal(true)}>
        <View style={styles.createPostContainer}>
          <FontAwesome5 name="user-circle" size={24} color="black" />
          <View style={styles.createPostAreaContainer}>
            <View style={styles.createPostAreaText}>
              <Text style={{ color: "white", fontWeight: 700, fontSize: 18 }}>
                Create a post...
              </Text>
            </View>
            <View style={styles.createPostBtn}>
              <TouchableOpacity>
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontWeight: 800,
                  }}
                >
                  Post
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <CreatePostModal isVisible={isCreatePostModal} onClose={onCreatePostModalClose} modalTitle="Create a delivery post"/>
      {/* collected all post list user own */}
      <Text>Post List Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#FFECAA",
  },
  createPostContainer: {
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 5,
    gap: 20,
    alignItems: "center",
    borderWidth: 4,
    marginTop: 40,
    borderRadius: 20,

    // justifyContent:"cente"
  },
  createPostAreaContainer: {
    flexDirection: "row",
    width: "90%",
    // backgroundColor:"blue",
    height: 50,
    gap: 2,
  },
  createPostAreaText: {
    backgroundColor: "gray",
    // paddingHorizontal: "25%"
    width: "80%",
    // alignItems:"center"
    justifyContent: "center",
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  createPostBtn: {
    justifyContent: "center",
    backgroundColor: "black",

    width: "20%",

    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    // alignItems:'center'
  },
});
