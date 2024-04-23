import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../theme/theme";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const { fontScale } = Dimensions.get("window");

const Header = ({ title }) => {
  return (
    <View style={{ paddingTop: "10%", marginHorizontal: 20 }}>
      <View
        style={{
          position: "relative",
          backgroundColor: "grey",
          width: 75,
          height: 75,
          borderRadius: 360,
        }}
      >
        <Image
          source={require("../../assets/images/avatar.jpeg")}
          style={{
            width: 75,
            height: 75,
            borderRadius: 360,
            objectFit: "contain",
          }}
        />
        <View
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
        </View>
      </View>
      <View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#333742",
            marginTop: 10,
            fontFamily: "FiraSans-Bold",
          }}
        >
          Hi, Welcome back!
        </Text>
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
              fontFamily: "FiraSans-Bold",
            }}
          >
            Today's {title}
          </Text>
          <AntDesign name="search1" size={24} color={colors.primary} />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
