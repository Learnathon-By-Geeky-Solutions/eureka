import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import "react-native-url-polyfill/auto"; // handle url after react 16 and up
import { Menu, PaperProvider } from "react-native-paper";
import ImagePickerModal from "./ImagePickerModal";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import MapSearch from "./MapSearchModal";
import DisplayAddress from "./DisplayAddress";
import CategoryModal from "./CategoryModal";
import {
  CreatePostPayload,
  ImageKitUploadResponse,
  uploadedImageType,
} from "@/types";
import { getImageKitAuthParams } from "@/api/ImageKit";
import { uploadToImageKit } from "@/utils/ImageKitHelper";
import { getStorageItemAsync } from "@/context/Storage";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { router } from "expo-router";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  modalTitle: string;
};

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Locations = {
  address: string;
 
};

type LocationType = "pickup" | "drop";
type PostStatus = "pending" | "in-processing" | "completed" | "cancel";

type Category = "delivery" | "errand";
type BilType = {
  basePrice?: number;
  price?: number;
  weight?: number;
  extraWeight?: number;
  extraCharge?: number;
};
interface formData {
  postID: string;
  userID: number;

  title: string; // use controller
  description: string; // use controller
  images: ImageType[]; // image picker permission - gallery permission or camera permission.

  dropLocation: string; // location permission.
  pickupLocation: string;
  // locationDetails: string
  weight: number;
  status: PostStatus;
  category: Category ;

  createAt: string;
  updateAt: string;
  price: number;
  bilEstimate: BilType;
}
type ImageType = {
  uri: string;
  hashedURI: string;
};
export default function CreatePostModal({
  // ------------------------------ form type  ------------------------------------- //
  isVisible,
  onClose,
  modalTitle,
}: Props) {
  
  //----------------------- form hook start ------------------------------------ //
  const { control, setValue, getValues, handleSubmit, reset } = useForm<formData>({
    defaultValues: {
      title: "",
      description: "",
      weight: 0,
      price: 0,
      category: "delivery",
      status: "pending",
      images: [],
      pickupLocation: "",
      dropLocation: "",
      bilEstimate: undefined,
    },
  });

  
  const token = useAuth().authState?.token;
  const [IsImagePickerModalShow, setIsImagePickerModalShow] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageType[]>([]);

  const [pickupLocation, setPickupLocation] = useState<Locations | null>(null);
  const [dropLocation, setDropLocation] = useState<Locations | null>(null);
  const [locationType, setLocationType] = useState<LocationType | null>(null);
  const [mapModalShow, setMapModalShow] = useState(false);

  const [categoryModalShow, setCategoryModalShow] = useState<boolean>(false);
  const [selectedCategroy, setSelectedCategroy] = useState<string | null>(null);

  const [weight, setWeight] = useState<number>(0);
  const [weightToPrice, setWeightToPrice] = useState<number>(0);
  const [weightValue, setWeightValue] = useState<string>("");
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const BARIKOI_MAP_API_KEY = process.env.BARIKOI_MAP_API_KEY;

  const [bilEstimate, setBilEstimate] = useState<{
    basePrice?: number;
    price?: number;
    weight?: number;
    extraWeight?: number;
    extraCharge?: number;
  }>({
    basePrice: 0,
    price: 0,
    weight: 0,
    extraCharge: 0,
    extraWeight: 0,
  });
  const pricingRule = [
    { maxWeight: 0.5, price: 50 },
    { maxWeight: 1, price: 60 },
    { maxWeight: 2, price: 80 },
  ];
  const extraPerKG = 20;

  useEffect(() => {
    console.log("selected Images uri", selectedImage);
    console.log("Pick up location: ", pickupLocation);
    console.log("Drop location: ", dropLocation);
  }, [selectedImage, pickupLocation, dropLocation, ]);

  const onImagePickerModal = () => {
    setIsImagePickerModalShow(!IsImagePickerModalShow);
  };

  const onChangeImageFormData = (imageData: ImageType[]) => {
    setValue("images", imageData);
    console.log("on change Effect images", getValues("images"));
  };
  const onRemoveImage = (URI: string) => {
    const filterImage = selectedImage.filter((image) => image.uri !== URI);
    setSelectedImage(filterImage);
    onChangeImageFormData(filterImage);
  };

  useEffect(() => {
    console.log(bilEstimate);
  }, [bilEstimate]);

  // ------------------------------------- Bill ---------------------------------- //
  const onConvertWeightToPrice = (weight: number): number => {
    for (let rule of pricingRule) {
      if (weight <= rule.maxWeight) {
        const calculatedPrice = rule.price;
        setBilEstimate((prev) => ({
          ...prev,
          basePrice: calculatedPrice,
          extraWeight: 0,
          extraCharge: 0,
          price: calculatedPrice,
          weight,
        }));

        return calculatedPrice;
      }
    }

    const basePrice = pricingRule[pricingRule.length - 1].price;
    const extraWeight = weight - pricingRule[pricingRule.length - 1].maxWeight;
    const extraCharge = Math.ceil(extraWeight) * extraPerKG;
    const totalPrice = basePrice + extraCharge;
    setBilEstimate((prev) => ({
      ...prev,
      basePrice,
      extraWeight: Math.ceil(extraWeight),
      extraCharge,
      price: totalPrice,
      weight,
    }));

    return totalPrice;
  };

  const handleWeightPrice = (value: string) => {
    setWeightValue(value);
    if (value === "") {
      setWeightToPrice(0);
    }
    const weightFloat = parseFloat(value);

    // if(weightFloat<=0.01){
    //   setWeight(0);
    //   setWeightToPrice(0)
    // }

    console.log("value weight", value);
    if (weightFloat === 0) {
      setWeight(0);
      setWeightToPrice(0);
    } else if (!isNaN(weightFloat)) {
      setWeight(weightFloat);
      setWeightToPrice(onConvertWeightToPrice(weightFloat));
    } else if (!isNaN(weightFloat)) {
      setWeight(0);
      setWeightToPrice(0);
    }
  };

  // ------------------------------------- Handle immage uploading ------------------------- //
  const handleUploadImages = async (
    images: ImageType[],
    fileAddition: string
  ): Promise<ImageKitUploadResponse[]> => {
    const uploadedImages: ImageKitUploadResponse[] = [];
    try {
      for (let index = 0; index < images.length; index++) {
        const image = images[index];
  
        const file = {
          uri: image.uri,
          fileName: `image${index + 1}_${image.hashedURI.slice(0, 8)}.jpg`,
          type: "image/jpeg"
        };
  
        const authParams = await getImageKitAuthParams();
        console.log(`Auth params for image ${index + 1}: `, authParams);
  
        const uploadedResponse = await uploadToImageKit({
          file,
          authParams,
          fileAddition
        });
  
        uploadedImages.push(uploadedResponse);
      }
  
      return uploadedImages;
     
    } catch (error) {
      console.log("Error, create post modal to upload image function: ", error);
      return [];
    }
  };

  // -------------------------------------- handle Submit ------------------------------------//
  const handleSubmitForm = async () => {
    try {
      setSaveLoading(true);
      // get value from form
      const formData = getValues();
      // uploading image on Image kit await.
      const uploadedImages = await handleUploadImages(
        selectedImage,
        "createApost"
      );
      // return error if failed to uploading images;
      if (uploadedImages.length === 0) {
        throw new Error("Uploading image failed. Please try again");
      }

      // convert response from imagekit to image data for save in backend;
      const imagePayLoad: uploadedImageType[] = uploadedImages.map((img) => ({
        url: img.url,
        fileId: img.fileId,
        thumbnail: img.thumbnailUrl,
      }));

      // merge all additional values;
      const dataToSubmit: CreatePostPayload = {
        ...formData,
        dropLocation: dropLocation ? dropLocation.address : "",
        pickupLocation: pickupLocation? pickupLocation.address: "",
        price: weightToPrice,
        weight,
        images: imagePayLoad,
        category: (selectedCategroy as Category) || "delivery",
        bilEstimate,
      };
      // debug; remove before submit;   // TODO
      console.log("Form data create post modal", dataToSubmit);

      
      console.log("user token", token)
      if (token) {
        const baseURL =
          process.env.EXPO_PUBLIC_API_URL || "https://default-api-url.com";
        const response = await axios.post(
          `${baseURL}/api/v1/posts/create`,
          dataToSubmit,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        console.log("Backend reposen create post: ",response)
        if (response.status === 200) {
          const data = response.data;
          
          console.log("Response data from backend", data);
          reset({
            title: "",
            description: "",
            weight: 0,
            price: 0,
            category: "delivery",
            status: "pending",
            images: [],
            pickupLocation: "",
            dropLocation: "",
            bilEstimate: undefined,
          });
         setSelectedImage([]);
         setDropLocation(null);
         setPickupLocation(null);
         setBilEstimate({
          basePrice: 0,
          price: 0,
          weight: 0,
          extraCharge: 0,
          extraWeight: 0,
         })
         setWeight(0);
  setWeightToPrice(0);
  setWeightValue("");
         onClose();
         setTimeout(() => {
          Alert.alert(
            "Success!",
            "Your post has been created successfully.",
            [{ text: "OK" }]
          );
        }, 300);
          router.replace("/(tabs)/post");
          // Navigate later.   // TODO - post page design too. List
        } else {
          throw { success: false, msg: "Reponse status", response };
        }
      }
    } catch (error: any) {
      console.log("Create post error", error);
      Alert.alert("Error ", error.msg || "Something error");
    } finally {
      setSaveLoading(false);
    }
  };

  const categoryOptions = ["Delivery", "Errand", "Laundry"];
  return (
    <View>
      <Modal animationType="slide" visible={isVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeaderContainer}>
              <Text style={styles.modalHeaderTitle}>{modalTitle}</Text>
              <TouchableOpacity onPress={onClose}>
                <Text>
                  <MaterialIcons name="close" size={24} color="black" />
                </Text>
              </TouchableOpacity>
            </View>
            {/* form */}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.formContainer}>
                {/*  title */}
                <View>
                  <Text style={styles.inputLabel}>Title</Text>

                  <View style={styles.inputContainer}>
                    <Controller
                      name="title"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Post title is require",
                        },
                        minLength: {
                          value: 3,
                          message: "Name must be at least 3 character",
                        },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          value={value}
                          onChangeText={(value) => {
                            onChange(value);
                          }}
                          onBlur={onBlur}
                          style={styles.input}
                        />
                      )}
                    />
                  </View>
                </View>

                {/* description */}
                <View>
                  <Text style={styles.inputLabel}>Description</Text>

                  <View
                    style={[
                      styles.inputContainer,
                      {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1.5 },
                        shadowOpacity: 0.1,
                        elevation: 3,
                        shadowRadius: 4,
                      },
                    ]}
                  >
                    <Controller
                      name="description"
                      control={control}
                      rules={{
                        minLength: {
                          value: 3,
                          message: "Name must be at least 3 character",
                        },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          value={value}
                          onChangeText={(value) => {
                            onChange(value);
                          }}
                          onBlur={onBlur}
                          style={styles.input}
                        />
                      )}
                    />
                  </View>
                </View>
                {/* add parcel images */}
                <View>
                  <View style={styles.addImageContainer}>
                    <Text style={styles.inputLabel}>
                      Add your percel images
                    </Text>

                    <View
                      style={[
                        styles.imageInput,
                        {
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.1,
                          elevation: 3,
                          shadowRadius: 4,
                        },
                      ]}
                    >
                      <Controller
                        name="images"
                        control={control}
                        defaultValue={[]}
                        rules={{
                          minLength: {
                            value: 3,
                            message: "Name must be at least 3 character",
                          },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <>
                            <TouchableOpacity
                              onPress={() => setIsImagePickerModalShow(true)}
                            >
                              <View>
                                <Ionicons
                                  name="images"
                                  size={24}
                                  color="black"
                                />
                              </View>
                            </TouchableOpacity>
                            <ImagePickerModal
                              visible={IsImagePickerModalShow}
                              onClose={onImagePickerModal}
                              selectedImages={selectedImage}
                              onSelectedImages={(images) => {
                                setSelectedImage(images);
                                onChangeImageFormData(images);
                              }}
                            />
                          </>
                        )}
                      />
                    </View>
                  </View>
                  <View>
                    {selectedImage.length > 0 && (
                      <View
                        style={{
                          paddingVertical: 10,
                          backgroundColor: "#D0D8EC",
                          marginTop: 5,
                          borderRadius: 5,
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.1,
                          elevation: 3,
                          shadowRadius: 4,
                        }}
                      >
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={{ paddingHorizontal: 10 }}
                          nestedScrollEnabled
                        >
                          {selectedImage.length > 0 &&
                            selectedImage.map((image, index) => (
                              <View key={`${image.uri}-${index}`}>
                                <TouchableOpacity
                                  onPress={() => onRemoveImage(image.uri)}
                                >
                                  <Entypo
                                    name="circle-with-cross"
                                    size={24}
                                    color="black"
                                  />
                                </TouchableOpacity>

                                <Image
                                  source={{ uri: image.uri }}
                                  style={{ width: 100, height: 100, margin: 5 }}
                                />
                              </View>
                            ))}
                        </ScrollView>
                      </View>
                    )}
                  </View>
                </View>

                {/* add location for pickup */}
                <View style={{ marginTop: 20 }}>
                  <View>
                    <Text style={styles.inputLabel}>Pickup Location</Text>

                    <TouchableOpacity
                      onPress={() => {
                        setLocationType("pickup"), setMapModalShow(true);
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          backgroundColor: "#E8EEF8",
                          padding: 15,
                          alignItems: "center",
                          marginTop: 10,
                          gap: 10,
                          borderRadius: 12,
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.1,
                          // elevation: 3,
                          shadowRadius: 4,
                        }}
                      >
                        <TextInput
                          value={
                            pickupLocation ? `${pickupLocation.address}` : ""
                          }
                          placeholder="Selected a pickup location"
                          editable={false}
                          multiline
                          style={{
                            fontSize: 18,
                            color: "black",
                            width: "90%",
                            textOverflow: "hidden",
                          }}
                        />
                        <Entypo name="location-pin" size={24} color="black" />
                      </View>
                    </TouchableOpacity>
                    {pickupLocation && (
                      <View style={{ marginTop: 10 }}>
                        <DisplayAddress location={pickupLocation} />
                      </View>
                    )}
                  </View>
                </View>

                {/* add location for drop */}
                <View style={{ marginTop: 10, marginBottom: 20 }}>
                  <View>
                    <Text style={styles.inputLabel}>Drop Location</Text>

                    <TouchableOpacity
                      onPress={() => {
                        setLocationType("drop");
                        setMapModalShow(true);
                      }}
                      // activeOpacity={0.8}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          backgroundColor: "#E8EEF8",
                          padding: 15,
                          alignItems: "center",
                          gap: 10,
                          marginTop: 10,
                          borderRadius: 12,
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.1,
                          // elevation: 3,
                          shadowRadius: 4,
                        }}
                      >
                        <TextInput
                          value={dropLocation ? `${dropLocation.address}` : ""}
                          placeholder="Selected a drop location"
                          editable={false}
                          multiline
                          style={{
                            fontSize: 18,
                            color: "black",
                            width: "90%",
                            textOverflow: "hidden",
                          }}
                        />
                        <Entypo name="location-pin" size={24} color="black" />
                      </View>
                    </TouchableOpacity>
                    {dropLocation && (
                      <View style={{ marginTop: 10 }}>
                        <DisplayAddress location={dropLocation} />
                      </View>
                    )}
                  </View>
                </View>
                {/* modal for map autocomplate part */}
                <View>
                  <MapSearch
                    visible={mapModalShow}
                    onClose={() => setMapModalShow(false)}
                    title={
                      locationType === "pickup"
                        ? "Select Pickup location"
                        : "Select Drop Location"
                    }
                    onSelect={(location) => {
                      if (locationType === "pickup") {
                        setPickupLocation(location);
                      } else if (locationType === "drop") {
                        setDropLocation(location);
                      }
                      setLocationType(null);
                      setMapModalShow(false);
                    }}
                  />
                </View>

                {/* weight and price(auto calculated) */}

                <View>
                  <Text style={styles.inputLabel}>
                    Input the product weight
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <View style={{ padding: 10, backgroundColor: "#E8EEF8" }}>
                      <TextInput
                        placeholder="weight(kg)"
                        style={{
                          fontSize: 18,
                          color: "black",
                          width: 100,
                        }}
                        onChangeText={handleWeightPrice}
                        keyboardType="decimal-pad"
                        value={weightValue}
                      />
                    </View>

                    <View>
                      <Text>৳{weightToPrice}</Text>
                    </View>
                  </View>
                </View>
                {/* category */}
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.inputLabel}>Product category</Text>
                  <TouchableOpacity onPress={() => setCategoryModalShow(true)}>
                    <View
                      style={{
                        backgroundColor: "#f5f5f5f5",
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          color: selectedCategroy ? "black" : "gray",
                        }}
                      >
                        {selectedCategroy || "Select an option"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <CategoryModal
                    visible={categoryModalShow}
                    onClosed={() => setCategoryModalShow(false)}
                    options={categoryOptions}
                    onSelected={(value) => {
                      setSelectedCategroy(value);
                      setCategoryModalShow(false);
                    }}
                    title={"Select a delivery categroy"}
                    currentSelectedOption={
                      selectedCategroy ? selectedCategroy : ""
                    }
                  />
                </View>

                {/* Post btn */}

                <TouchableOpacity onPress={handleSubmit(handleSubmitForm)}>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 30,
                      marginBottom: 20,
                      // bottom: 10
                      // paddingHorizontal: 30
                    }}
                  >
                    <Text
                      style={{
                        width: "80%",
                        backgroundColor: "orange",
                        textAlign: "center",
                        paddingVertical: 10,
                        fontSize: 20,
                        borderRadius: 10,
                        fontWeight: 500,
                      }}
                    >
                      Post
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
             
            </ScrollView> 
            {saveLoading && (
                <View style={styles.overlay}>
                  <ActivityIndicator
                    animating={true}
                    size="large"
                    color="#0000ff"
                  />
                </View>
              )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // justifyContent:"center",
    // alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 5,
    // color:"white"
  },
  modalHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  modalHeaderTitle: {
    // color: "black",
    fontWeight: 600,
    fontSize: 18,
  },
  formContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: "100%",
    // backgroundColor: "lightsalmon",
  },
  inputLabel: {
    fontSize: 20,
    color: "black",
    fontWeight: 600,
  },
  input: { fontSize: 20, width: "90%", color: "black" },
  inputContainer: {
    backgroundColor: "#f5f5f5f5",
    paddingHorizontal: 20,
    height: 70,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    // borderWidth: 1
  },
  addImageContainer: {
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  imageInput: {},
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(58, 49, 49, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});
