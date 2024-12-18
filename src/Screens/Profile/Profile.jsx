import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import DetailScreenHeader from "../../components/DetailScreenHeader";
import { colors, gradient } from "../../theme/theme";
import Header from "../../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import { CustomInput, CustomPasswordInput } from "../../components/CustomInput";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { useSelector } from "react-redux";
import CustomBtn from "../../components/CustomBtn";
import axios from "axios";
import { getUserById } from "../../redux/dispatchers/user.dispatcher";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../constants/config";
import Spinner from "react-native-loading-spinner-overlay";
import Snack from "../../components/Snack";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();
  const { userData } = useSelector((state) => state.user);

  const [avatar, setavatar] = useState(userData?.avatar);
  const [email, setemail] = useState(userData?.email);
  const [mobile, setmobile] = useState(userData?.mobile);

  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [loading, setloading] = useState(false);
  const [confirmation, setconfirmation] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState(false);
  const [errorConfirmation, seterrorConfirmation] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");

  const dispatch = useDispatch();

  let formData = new FormData();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    let imageUri = result.assets[0].uri;
    const newImageUri = "file:/" + imageUri.split("file:/").join("");

    if (!result.canceled) {
      formData.append("file", {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: newImageUri.split("/").pop(),
      });

      UploadImage();
    }
  };

  const UploadImage = async (img) => {
    setloading(true);
    fetch(`${BASE_URL}/api/aws/file?email=${user?.companyId}`, {
      body: formData,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    })
      .then(async (res) => {
        setloading(false);
        const response = await res.json();
        setavatar(response.url);
      })
      .catch(async (e) => {
        setloading(false);
        const error = await e.json();
        console.log(error, "err");
      });
  };

  const UpdateUser = async () => {
    seterrorConfirmation(false);
    console.log(userData?.email, email, "email", userData);
    if (userData?.email !== email || userData.mobile !== mobile) {
      setloading(true);
      await axios
        .post(
          `${BASE_URL}/user/updateUser`,
          {
            userId: userData?.id,
            mobile: mobile,
            email: email,
            avatar: avatar,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data, "update user");
          setloading(false);
          dispatch(getUserById(userData?.id));
          navigation.goBack();
          setconfirmation(true);
          seterrorConfirmation(false);
        })
        .catch((e) => {
          setloading(false);
          setconfirmation(false);
          seterrorConfirmation(true);
        });
    }
    if (newPassword != "") {
      if (newPassword === confirmPassword) {
        console.log("password update", userData?.id, oldPassword, newPassword);
        await axios
          .post(
            `${BASE_URL}/user/updatePassword`,
            {
              userId: userData?.id,
              oldPassword: oldPassword,
              newPassword: newPassword,
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res.data, "password update");
            setloading(false);
            dispatch(getUserById(userData?.id));
            navigation.goBack();
            setPasswordConfirmation(true);
            seterrorConfirmation(false);
            setoldPassword("");
            setNewPassword("");
            setconfirmPassword("");
          })
          .catch((e) => {
            console.log(e?.response?.data?.err, "error");
            setloading(false);
            seterrorConfirmation(true);
            seterrorMsg("Something went wrong.");
          });
      } else {
        setloading(false);
        seterrorConfirmation(true);
        seterrorMsg("New Password & Confirm Password Mismatched.");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LinearGradient
        colors={["rgba(255,255,255,1)", "rgba(232,241,250,0.5)"]}
        style={gradient}
      />

      <Spinner visible={loading} />
      {/* <Snack
        visible={confirmation}
        title="Profile Updated Successfully"
        error={false}
        onPress={() => setconfirmation(false)}
      />
      <Snack
        visible={passwordConfirmation}
        title="Password Updated Successfully"
        error={false}
        onPress={() => setPasswordConfirmation(false)}
      />
      <Snack
        visible={errorConfirmation}
        title={errorMsg}
        error={true}
        onPress={() => seterrorConfirmation(false)}
      /> */}

      <DetailScreenHeader
        title="Settings"
        backPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        style={{ marginTop: 10 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View>
          {errorConfirmation && (
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
            type={"email-address"}
            noCap={true}
            Icon={MaterialCommunityIcons}
            iconName="email-outline"
          />
          <CustomInput
            placeholder="Mobile"
            value={mobile}
            setValue={setmobile}
            type={"number-pad"}
            noCap={true}
            Icon={MaterialCommunityIcons}
            iconName="phone-outline"
          />
        </View>

        <View>
          <View style={styles.header}>
            <Text style={styles.headerText}>Update Password</Text>
          </View>
          <CustomPasswordInput
            placeholder="Old Password"
            value={oldPassword}
            setValue={setoldPassword}
            noCap={true}
            Icon={MaterialCommunityIcons}
            iconName=""
          />
          <CustomPasswordInput
            placeholder="New Password"
            value={newPassword}
            setValue={setNewPassword}
            noCap={true}
            Icon={MaterialCommunityIcons}
            iconName=""
          />
          <CustomPasswordInput
            placeholder="Confirm Password"
            value={confirmPassword}
            setValue={setconfirmPassword}
            noCap={true}
            Icon={MaterialCommunityIcons}
            iconName="password"
          />
        </View>
      </ScrollView>

      <View
        style={{
          marginBottom: 20,
        }}
      >
        <CustomBtn text="Update" onPress={UpdateUser} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgClr,
    paddingTop: Platform.OS === "android" ? "2.5%" : "10%",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  gradient: {
    height: 225,
    width: 225,
    position: "absolute",
    top: -50,
    borderRadius: 360,
    right: -50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    // fontFamily: "FiraSans_700Bold",
  },
  btnContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.borderClr,
    borderRadius: 12,
    padding: 2,
  },
});
