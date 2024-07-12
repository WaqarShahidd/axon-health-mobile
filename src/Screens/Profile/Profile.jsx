import {
  Image,
  KeyboardAvoidingView,
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

const Profile = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [dob, setdob] = useState("");
  const [gender, setgender] = useState("");
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <LinearGradient
        colors={["rgba(255,255,255,1)", "rgba(232,241,250,0.5)"]}
        style={gradient}
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
          <View style={{ flex: 0.2 }}>
            <Image
              source={require("../../../assets/images/avatar2.png")}
              style={{
                height: 120,
                width: 100,
                borderRadius: 6,
                borderColor: "#59595A",
                borderWidth: 1,
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
        </View>

        <View>
          <CustomInput
            placeholder="First Name"
            value={firstName}
            setValue={setfirstName}
            noCap={true}
            Icon={MaterialIcons}
            iconName="person-outline"
          />
          <CustomInput
            placeholder="Last Name"
            value={lastName}
            setValue={setlastName}
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
            placeholder="Address"
            value={address}
            setValue={setaddress}
            noCap={true}
            Icon={Octicons}
            iconName="location"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgClr,
    paddingTop: "10%",
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
