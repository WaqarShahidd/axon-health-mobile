import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const { fontScale } = Dimensions.get("window");

const Header = ({ title }) => {
  const { userData } = useSelector((state) => state.user);
  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? "5%" : "10%",
        marginHorizontal: 20,
      }}
    >
     {title=="Today's Goals" && ( <View
        style={{
          position: "relative",
          backgroundColor: "grey",
          width: 75,
          height: 75,
          borderRadius: 360,
        }}
      >
         <Image
          source={
            userData?.avatar
              ? userData?.avatar
              : require("../../assets/images/user.png")
          }
          style={{
            width: 75,
            height: 75,
            borderRadius: 360,
            objectFit: "contain",
          }}
        />
        {/* <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: "#fff",
            borderRadius: 360,
            padding: 5,
          }}
        >
          <MaterialCommunityIcons
            name="pencil"
            size={15}
            color={colors.primary}
          />
        </View> */}
      </View>)}
      <View>
      {title=="Today's Goals" && ( <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#333742",
            marginTop: 10,
            // fontFamily: "FiraSans_700Bold",
          }}
        >
          Hi, Welcome back!
        </Text>)}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 28 / fontScale,
              fontWeight: "bold",
              color: "#333742",
              marginTop: 10,
              // fontFamily: "FiraSans_700Bold",
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
