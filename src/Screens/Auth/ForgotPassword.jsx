import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import CustomBtn from "../../components/CustomBtn";
import { CustomInput } from "../../components/CustomInput";
import { BASE_URL } from "../../constants/config";
import Snack from "../../components/Snack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, size } from "../../theme/theme";
import axios from "axios";

const { fontScale } = Dimensions.get("window");

const ForgotPassword = () => {
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");

  const [confirmation, setconfirmation] = useState(false);

  const forgotPass = async () => {
    if (email === "") {
      seterror(true);
      seterrorMsg("All fields are required");
    } else {
      setloading(true);
      seterror(false);
      await axios
        .get(
          `${BASE_URL}/user/sendPasswordResetLink?email=${email.toLowerCase()}`
        )
        .then((res) => {
          setloading(false);
          seterror(false);
          setconfirmation(true);
        })
        .catch((e) => {
          setloading(false);
          seterror(true);
          seterrorMsg(e.response?.data?.message);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* <Snack
        visible={confirmation}
        title="Reset Password Link has been provided to your email."
        error={false}
        onPress={() => setconfirmation(false)}
      /> */}
      <ScrollView
        style={{ marginHorizontal: 18 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Spinner visible={loading} />
          <View style={{}}>
            <Image
              source={require("../../../assets/images/icon.png")}
              style={styles.logo}
            />

            {/* Heading */}
            <Text style={[styles.topText, { fontWeight: "700" }]}>
              Forgot Password
            </Text>

            <Text style={styles.lightText}>
              Enter your email address below to reset your password
            </Text>

            {/* Form */}
            {error && (
              <Text
                style={{
                  marginTop: 25,
                  color: "red",
                }}
              >
                {errorMsg || "An error occured"}
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
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          margin: 20,
        }}
      >
        <CustomBtn text="Submit" onPress={forgotPass} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

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
