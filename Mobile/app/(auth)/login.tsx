import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
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
  email: string;
  password: string;
};
export default function Login() {
  const { control,handleSubmit, formState:{errors} } = useForm<formData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {onLogin} = useAuth()

  const onChange = (arg: {
    nativeEvent: { text: string };
  }): { value: string } => {
    // console.log(arg.nativeEvent.text);
    return {
      value: arg.nativeEvent.text,
    };
  };

  const onSubmit = async (data:formData) =>{
    // console.log("handle from login")
    setServerError("");
    const result = await onLogin?.(
      data.email,
      data.password
    )

    if(!result.success){
      setServerError(result.msg)
    }
    else{
      router.replace("/(tabs)");
    }
    
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* back btn and heading */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => router.back()}
            >
              <Entypo name="chevron-left" size={24} color="#E95322" />
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Log In</Text>
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
              {/* email */}
              <View>
                <Text style={styles.inputLabel}>Email or phone number</Text>
                <View style={styles.inputContainer}>
                  <Controller
                    name="email"
                    rules={{
                      required: { value: true, message: "Email required" },
                      pattern: {
                        value: /[^@]+@[^@]+\.[a-zA-Z]{2,6}/,
                        message: "That aint no email",
                      },
                    }}
                    control={control}
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

              {/* password */}
              <View>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={[styles.passwordContainer, styles.inputContainer]}>
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
              </View>

              {/* forget password */}
              <View>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "orange",
                      fontSize: 16,
                      textAlign: "right",
                    }}
                  >
                    Forget Password
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.password && <Text>{errors.password.message}</Text>}

              {/* sign in btn */}
              <TouchableOpacity
               onPress={()=>handleSubmit(onSubmit)()}
              >
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
                    Log In
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
                <Text style={{ fontSize: 18 }}>Create a new account?</Text>
                <TouchableOpacity
                  onPress={() => router.push("/(auth)/register")}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "orange",
                      fontWeight: "bold",
                    }}
                  >
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
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
    overflow: "hidden",

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
    // paddingVertical: 20,
        marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    justifyContent:"center"
  },
});
