import CreatePostModal from "@/components/CreatePostModal";
import { useAuth } from "@/context/AuthContext";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
// import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View , Image, FlatList} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface Post {
  postID: string;
  title: string;
  description: string;
  pickupLocation: { address: string };
  dropLocation: { address: string };
  images: { id: string; url: string; thumbnail: string }[];
  category: string;
  status: string;
  createAt: string;
}

const baseURL =
    process.env.EXPO_PUBLIC_API_URL || "https://default-api-url.com";
// const token_key = process.env.EXPO_PUBLIC_API_KEY;


export default function PostListScreen() {
  const [isCreatePostModal, setIsCreatePostModal] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]> ([]);

  const {authState, onLogout} = useAuth();

  const onCreatePostModalClose = () => {
    setIsCreatePostModal(!isCreatePostModal);
    fetchPost();
  };

  const fetchPost = async()=>{
    // get posts;
    try {
      const token = authState?.token;

      const response = await axios.get(`${baseURL}/api/v1/posts`,{
        headers:{
          "Authorization" : `Bearer ${token}`
        }
      })

      if(response.status === 200){
        setPosts(response.data);
      }
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchPost();
  },[]);

  // ---------------------- render posts: --------------------------- // 
  const renderPostAll = ({ item }: { item: Post }) => (
    <View
      style={{
        marginVertical: 10,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 10,
      }}
    >
      {/* Image */}
      {item.images.length > 0 && (
        <Image
          source={{ uri: item.images[0].url }}
          style={{ width: "100%", height: 200, borderRadius: 10 }}
          resizeMode="cover"
        />
      )}
      
      {/* Title */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
        {item.title}
      </Text>

      {/* Description */}
      <Text style={{ marginVertical: 5 }}>{item.description}</Text>

      {/* Pickup - Drop */}
      <Text style={{ fontStyle: "italic", color: "gray" , fontSize: 20}}>
        From: <Entypo name="address" size={18} color="blue" />
        {item.pickupLocation.address}
      </Text>
      <Text style={{ fontStyle: "italic", color: "gray", fontSize: 20 }}>
        To: <Entypo name="address" size={18} color="blue" />
        {item.dropLocation.address}
      </Text>

      {/* Status */}
      <Text style={{ marginTop: 5, color: "green" }}>
        Status: {item.status}
      </Text>
    </View>
  );

  console.log(isCreatePostModal);
  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* create post view */}
      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: "white",
          width: "30%"
        }}

        onPress={onLogout}
      >
        <Text style={{textAlign:'center', fontSize: 24}}>log out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsCreatePostModal(true)}>
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
      <CreatePostModal
        isVisible={isCreatePostModal}
        onClose={onCreatePostModalClose}
        modalTitle="Create a delivery post"
      />
      {/* collected all post list user own */}
      
      <FlatList data={posts} renderItem={renderPostAll} keyExtractor={(item)=>item.postID} contentContainerStyle={{padding: 10}}
        ListEmptyComponent={<Text>Post List Screen</Text>}
        
        />
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
