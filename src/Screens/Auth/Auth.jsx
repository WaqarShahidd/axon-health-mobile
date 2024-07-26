import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  AntDesign,
  EvilIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import { size, colors } from "../../theme/theme";
import CustomBtn from "../../components/CustomBtn";
import { CustomInput, CustomPasswordInput } from "../../components/CustomInput";
import { BASE_URL } from "../../constants/config";
import { getUserById } from "../../redux/dispatchers/user.dispatcher";

const { fontScale } = Dimensions.get("window");

const Auth = () => {
  const nav = useNavigation();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");

  const handleLogin = async (e) => {
    if (email === "" || password === "") {
      seterror(true);
      seterrorMsg("All fields are required");
    } else {
      setloading(true);
      seterror(false);
      await axios
        .post(
          `${BASE_URL}/user/login`,
          {
            email: email?.toLocaleLowerCase(),
            password: password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          dispatch(getUserById(res?.data?.user?.id))
            .then((res) => {
              setloading(false);
              seterror(false);
            })
            .catch((e) => {
              setloading(false);
              seterror(true);
              seterrorMsg(e.response?.data?.message);
              console.log(e);
            });
        })
        .catch((e) => {
          setloading(false);
          seterror(true);
          seterrorMsg(e.response?.data?.message);
          console.log(e);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <Spinner visible={loading} />
            <View style={{ paddingHorizontal: 29 }}>
              <Image
                source={require("../../../assets/images/icon.png")}
                style={styles.logo}
              />

              {/* Heading */}
              <Text style={styles.topText}>Let’s get you</Text>
              <Text style={[styles.topText, { fontWeight: "700" }]}>
                In the app!
              </Text>

              <Text style={styles.lightText}>
                Hey, enter your details to get sign in to your account
              </Text>

              {/* Form */}
              {error && (
                <Text
                  style={{
                    marginTop: 25,
                    color: "red",
                  }}
                >
                  {errorMsg}
                </Text>
              )}
              <CustomInput
                placeholder="Email"
                value={email}
                setValue={setemail}
                noCap={true}
                Icon={MaterialCommunityIcons}
                iconName="email-outline"
                type="email-address"
              />
              <CustomPasswordInput
                placeholder="Password"
                value={password}
                setValue={setpassword}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            margin: 20,
          }}
        >
          <CustomBtn text="Sign In" onPress={handleLogin} />
        </View>
      </ScrollView>
      {/* <Snack
        visible={emptyError}
        onPress={() => setemptyError(false)}
        title="Fill all the required fields!"
        error={true}
      /> */}
    </KeyboardAvoidingView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    paddingBottom: "6%",
    backgroundColor: "#fff",
  },
  logo: {
    height: 75,
    width: 150,
    resizeMode: "contain",
    marginBottom: "7.5%",
  },
  topText: {
    fontWeight: "400",
    fontSize: size.h1 / fontScale,
    color: colors.secondary,
  },
  lightText: {
    fontWeight: "400",
    fontSize: size.h4 / fontScale,
    // color: colors.textLight,
    maxWidth: "75%",
    paddingVertical: 7.5,
  },
  forgot: {
    fontWeight: "400",
    fontSize: size.h4 / fontScale,
    color: colors.secondary,
    textDecorationLine: "underline",
    paddingTop: 10,
    letterSpacing: -0.2,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: "15%",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  socialCircleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22.5,
    marginTop: 10,
  },
  socialCircles: {
    height: 60,
    width: 60,
    borderRadius: 360,
    backgroundColor: "#EFF2F7",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 7.5,
  },
  signWith: {
    fontWeight: "400",
    fontSize: size.h4 / fontScale,
    // color: colors.textLight,
    textTransform: "uppercase",
  },
});
