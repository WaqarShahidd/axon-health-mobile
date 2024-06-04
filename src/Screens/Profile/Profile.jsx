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
import { CustomInput } from "../../components/CustomInput";
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

const Profile = () => {
  const { userData } = useSelector((state) => state.user);

  const [avatar, setavatar] = useState(userData?.avatar);
  const [fullName, setfullName] = useState(userData?.fullName);
  const [email, setemail] = useState(userData?.email);
  const [gender, setgender] = useState(userData?.gender);
  const [mobile, setmobile] = useState(userData?.mobile);

  const [loading, setloading] = useState(false);
  const [confirmation, setconfirmation] = useState(false);

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
    setloading(true);
    await axios
      .post(
        `${BASE_URL}/user/updateUser`,
        {
          userId: userData?.id,
          name: fullName,
          mobile: mobile,
          email: email,
          gender: gender,
          avatar: avatar,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setloading(false);
        dispatch(getUserById(userData?.id));
        setconfirmation(true);
      })
      .catch((e) => {
        setloading(false);
        setconfirmation(false);
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <LinearGradient
        colors={["rgba(255,255,255,1)", "rgba(232,241,250,0.5)"]}
        style={gradient}
      />

      <Spinner visible={loading} />
      <Snack
        visible={confirmation}
        title="Profile Updated Successfully"
        error={false}
        onPress={() => setconfirmation(false)}
      />

      <DetailScreenHeader title="Edit Profile" />

      <ScrollView style={{ marginVertical: 40 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {userData?.avatar !== "" && (
            <View style={{ flex: 0.2 }}>
              <Image
                source={{ uri: userData?.avatar }}
                style={{
                  height: 120,
                  width: 100,
                  borderRadius: 6,
                  borderColor: "#59595A",
                  borderWidth: 1,
                }}
              />
            </View>
          )}
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
              padding: 18,
              flexDirection: "row",
              flex: 0.65,
            }}
            onPress={pickImage}
          >
            <Image
              source={require("../../../assets/icons/upload.png")}
              style={{ height: 90, width: 90 }}
            />
            <Text
              style={{
                color: colors.textClr,
                fontSize: 14,
                fontFamily: "FiraSans-Bold",
              }}
            >
              Upload Picture
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <CustomInput
            placeholder="Full Name"
            value={fullName}
            setValue={setfullName}
            noCap={true}
            Icon={MaterialIcons}
            iconName="person-outline"
          />
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
      </ScrollView>
      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 20 }}>
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
});
