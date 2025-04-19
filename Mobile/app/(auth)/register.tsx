import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

type formData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
};
export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      address: "",
      phone: "",
    },
  });

  const { onRegister } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [serverError, setServerError] = useState("");

  const onChange = (arg: {
    nativeEvent: { text: string };
  }): { value: string } => {
    console.log(arg.nativeEvent.text);
    return {
      value: arg.nativeEvent.text,
    };
  };

  const onSubmit = async (data: formData) => {
    setServerError("");
    console.log(
      "Form data from register",
      data.name,
      data.password,
      data.phone,
      data.email,
      data.address
    );
    const result = await onRegister?.(
      data.name,
      data.email,
      data.phone,
      data.password,
      data.address
    );

    if (!result.success) {
      setServerError(result.msg);
    } else {
      router.replace("/(auth)/login");
    }
    console.log("Submit process", data);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* back btn and heading */}
        <KeyboardAvoidingView
          //   behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => router.back()}
              >
                <Entypo name="chevron-left" size={24} color="#E95322" />
              </TouchableOpacity>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>Register</Text>
              </View>
            </View>

            <View style={styles.modalContainer}>
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Welcome</Text>
                <Text style={styles.welcomeNote}>
                  Your trusted self-courier solution for{"\n"}Hassle-free
                  shipping.
                </Text>
              </View>
              {/* form */}

              <View style={{ marginTop: 30 }}>
                {/* name start */}
                <View>
                  <Text style={styles.inputLabel}>Your Name</Text>
                  <View style={styles.inputContainer}>
                    <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: { value: true, message: "name is require" },
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
                  {errors.name && (
                    <Text style={{ color: "black" }}>
                      {errors.name.message}
                    </Text>
                  )}
                </View>
                {/* email */}
                <View>
                  <Text style={styles.inputLabel}>Email</Text>
                  <View style={styles.inputContainer}>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: { value: true, message: "Email required" },
                        pattern: {
                          value: /[^@]+@[^@]+\.[a-zA-Z]{2,6}/,
                          message: "That aint no email",
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
                  {errors.email && <Text>{errors.email.message}</Text>}
                </View>
                {/* pHone */}
                <View>
                  <Text style={styles.inputLabel}>Phone</Text>
                  <View style={styles.inputContainer}>
                    <Controller
                      name="phone"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Phone number required",
                        },
                        pattern: {
                          value: /^(\+880|00880)?01[1-9]\d{8}$/,
                          message: "Enter a valid Bangladeshi phone number.",
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
                          keyboardType="phone-pad"
                        />
                      )}
                    />
                  </View>
                  {errors.phone && <Text>{errors.phone.message}</Text>}
                </View>

                {/* password start */}
                <View>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View
                    style={[styles.passwordContainer, styles.inputContainer]}
                  >
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Password required!",
                        },
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          value={value}
                          onChangeText={(value) => {
                            onChange(value);
                          }}
                          secureTextEntry={!showPassword}
                          onBlur={onBlur}
                          style={styles.input}
                        />
                      )}
                    />

                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Entypo name="eye" size={24} color="black" />
                      ) : (
                        <Entypo name="eye-with-line" size={24} color="black" />
                      )}
                    </TouchableOpacity>
                  </View>
                  {errors.password && <Text>{errors.password.message}</Text>}
                </View>

                {/* Address start */}
                <View>
                  <Text style={styles.inputLabel}>Address</Text>
                  <View
                    style={[styles.inputContainer]}
                  >
                    <Controller
                      name="address"
                      control={control}
                      rules={{
                        required: { value: true, message: "Address required" },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          value={value}
                          onChangeText={(value) => {
                            onChange(value);
                          }}
                          onBlur={onBlur}
                          style={[styles.input]}
                        />
                      )}
                    />
                  </View>
                  {errors.address && <Text>{errors.address.message}</Text>}
                </View>

                {/* sign in btn */}
                <TouchableOpacity  onPress={()=>handleSubmit(onSubmit)()}>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10,
                    }}
                   
                  >
                    <Text
                      style={{
                        backgroundColor: "black",
                        textAlign: "center",
                        fontSize: 20,
                        color: "white",
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        width: "70%",
                        borderRadius: 40,
                        fontWeight: 600,
                      }}
                    >
                      Register
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* create a new account */}
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 5,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>Already have an account</Text>
                  <TouchableOpacity
                    onPress={() => router.push("/(auth)/login")}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: "orange",
                        fontWeight: "bold",
                      }}
                    >
                      Log In
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFECAA",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center"
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  headerTextContainer: {
    width: "80%",
    alignItems: "center",
  },
  headerText: {
    color: "#050522",
    fontSize: 24,
  },
  backBtn: {
    marginLeft: 10,
  },
  modalContainer: {
    backgroundColor: "white",
    height: "100%",
    // overflow: "hidden",

    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  welcomeContainer: {
    gap: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 600,
  },
  welcomeNote: {
    fontSize: 16,
    color: "gray",
    fontWeight: 400,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: { fontSize: 20, width: "90%", color: "black" },
  inputLabel: {
    fontSize: 18,
  },
  inputContainer: {
    backgroundColor: "#F3E9B5",
    paddingHorizontal: 20,
    height: 70,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    justifyContent:"center"
  },
});
