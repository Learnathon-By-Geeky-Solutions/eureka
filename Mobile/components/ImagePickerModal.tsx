import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import SHA256 from "crypto-js/sha256";
import { useEffect, useState } from "react";

type ImageType = {
  uri: string;
  hashedURI: string;
};
type Props = {
  visible: boolean;
  onClose: () => void;
  selectedImages: ImageType[] | null;
  onSelectedImages: (images: ImageType[]) => void;
};
export default function ImagePickerModal({
  visible,
  onClose,
  selectedImages,
  onSelectedImages,
}: Props) {
  const [storeImage, setStoreImage] = useState<ImageType[]>(
    selectedImages || []
  );
  const [isDoneImages, setIsDoneImages] = useState<boolean>(false);

  useEffect(() => {
    if (selectedImages) {
      setStoreImage(selectedImages);
    }
  }, [selectedImages]);
  const triggerDoneCloseAnimation = (onFinished: () => void) => {
    setIsDoneImages(true);
    setTimeout(() => {
      setIsDoneImages(false);
      onFinished();
    }, 500);
  };
  // const isDuplicate = (base^4)
  const HandleImagePicker = async (pickerType: string) => {
    try {
      let permission;

      if (pickerType === "gallery") {
        permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      } else if (pickerType === "camera") {
        permission = await ImagePicker.requestCameraPermissionsAsync();
      }

      if (permission?.status !== "granted") {
        Alert.alert(
          "permission denied",
          "We need access to your " +
            (pickerType === "camera" ? "camera" : "photos") +
            " to proceed."
        );

        return;
      }

      if (pickerType === "gallery") {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: "images",
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          allowsMultipleSelection: true,
        });

        // result.assets[]
        if (!result.canceled) {
          const newImages: ImageType[] = [];

          for (const asset of result.assets) {
            const uri = asset.uri;

            try {
              const base64 = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
              });

              const hashURI = SHA256(base64).toString();
              const alreadyExists = storeImage.some(
                (image) => image.hashedURI === hashURI
              );

              if (!alreadyExists) {
                newImages.push({ uri, hashedURI: hashURI });
                // handleDone();
              } else {
                Alert.alert("Some images already selected");
                return;
              }
            } catch (error) {
              console.log("error on image hashed", error);
            }
          }

          if (newImages.length > 0) {
            setStoreImage((prev) => {
              const update = [...prev, ...newImages];
              triggerDoneCloseAnimation(() => {
                handleDone(update);
              });

              return update;
            });
          }
        }
      } else if (pickerType === "camera") {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: "images",
          cameraType: ImagePicker.CameraType.back,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          const uri = result.assets[0].uri;

          try {
            const base64 = await FileSystem.readAsStringAsync(uri, {
              encoding: FileSystem.EncodingType.Base64,
            });

            const hash = SHA256(base64).toString();

            const newImage: ImageType[] = [];
            newImage.push({ uri, hashedURI: hash });

            setStoreImage((prev) => [...prev, ...newImage]);
            // handleDone();
          } catch (error) {
            console.log("error camera hasd", error);
          }

          // if (!storeImage.includes(result.assets[0].uri)) {
          //   setStoreImage([...storeImage, result.assets[0].uri]);
          //   console.log(storeImage);
          // }
        }
      }
      console.log(storeImage);
    } catch (error) {
      console.log("Image picker failed", error);
      Alert.alert("Error", " image picker");
    }
  };

  const handleDone = (finalImages = storeImage) => {
    onSelectedImages(finalImages);
    onClose();
  };
  return (
    // <View style={styles.container}>
    <Modal visible={visible} transparent={true}>
      <TouchableWithoutFeedback onPress={() => handleDone(storeImage)}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {/* <Text>Image Picks</Text> */}
              {/* <TouchableOpacity onPress={onClose}> */}
              <View style={styles.modalBtnContainer}>
                <TouchableOpacity onPress={() => HandleImagePicker("gallery")}>
                  <View style={styles.modalBtn}>
                    <MaterialIcons
                      name="drive-folder-upload"
                      size={50}
                      color="black"
                      style={{
                        borderWidth: 3,
                        borderRadius: 20,
                        borderColor: "gray",
                        padding: 3,
                        textAlign: "center",
                        //   width:"100%"
                      }}
                    />
                    <Text>Upload images</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => HandleImagePicker("camera")}>
                  <View style={styles.modalBtn}>
                    <Feather
                      name="camera"
                      size={50}
                      color="black"
                      style={{
                        borderWidth: 3,
                        borderRadius: 20,
                        borderColor: "gray",
                        padding: 3,

                        textAlign: "center",
                      }}
                    />
                    <Text>Capture images</Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.modalBtn}>
                  <MaterialIcons
                    name="delete-outline"
                    size={50}
                    color="black"
                    style={{
                      borderWidth: 3,
                      borderRadius: 20,
                      borderColor: "gray",
                      padding: 3,
                      textAlign: "center",
                    }}
                  />

                  <Text>Remove images</Text>
                </View>
              </View>
              {/* </TouchableOpacity> */}
            </View>
          </TouchableWithoutFeedback>
          {isDoneImages && (
            <View style={styles.overlay}>
              <ActivityIndicator animating={true} size="large" color="#0000ff" />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    height: "20%",
    backgroundColor: "white",
    width: "100%",
    // fle
  },
  modalBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
  },
  modalBtn: {
    // flexDirection:"column"
    // width:"30%"
    // justifyContent:'center'
  },
  overlay:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(58, 49, 49, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
