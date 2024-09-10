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

  console.log(userData, "user");
  const [avatar, setavatar] = useState(userData?.avatar);
  const [fullName, setfullName] = useState(userData?.name);
  const [email, setemail] = useState(userData?.email);
  const [gender, setgender] = useState(userData?.gender);
  const [mobile, setmobile] = useState(userData?.mobile);


  const [oldPassword, setoldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const [loading, setloading] = useState(false);
  const [confirmation, setconfirmation] = useState(false);
  const [errorConfirmation, seterrorConfirmation] = useState(false);
  const [errorMsg, seterrorMsg] = useState('');

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
    if(userData?.email != email || userData.mobile != mobile)
    {
      await axios
        .post(
          `${BASE_URL}/user/updateUser`,
          {
            userId: userData?.id,
            name: fullName,
            mobile: mobile,
            email: email,
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
    }
    if(newPassword != '')
    {
      if(newPassword === confirmPassword)
      {
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
          setloading(false);
          dispatch(getUserById(userData?.id));
          setconfirmation(true);
        })
        .catch((e) => {
          setloading(false);
          seterrorConfirmation(true);
          seterrorMsg('Something went wrong.')
        });
      }
      else{
        setloading(false);
        seterrorConfirmation(true);
        seterrorMsg('New Password & Confirm Password Mismatched.')

      }
    }
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
      <Snack
        visible={errorConfirmation}
        title={errorMsg}
        error={true}
        onPress={() => seterrorConfirmation(false)}
      />

      <DetailScreenHeader
        title="Settings"
        backPress={() => navigation.goBack()}
      />

      <ScrollView style={{ marginVertical: 40 }}>
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 0.15 }}>
            <Image
              source={
                userData?.avatar
                  ? { uri: userData?.avatar }
                  : require("../../../assets/icons/user.png")
              }
              style={{
                height: 100,
                width: 90,
                borderRadius: 6,
                objectFit: "contain",
              }}
            />
          </View>

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
                // fontFamily: "FiraSans_700Bold",
              }}
            >
              Upload Picture
            </Text>
          </TouchableOpacity>
        </View> */}

        <View>
          {/* <CustomInput
            placeholder="Full Name"
            value={fullName}
            setValue={setfullName}
            noCap={true}
            Icon={MaterialIcons}
            iconName="person-outline"
          /> */}

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
