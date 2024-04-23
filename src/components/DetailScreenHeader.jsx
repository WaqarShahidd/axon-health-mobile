import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../theme/theme";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";

const DetailScreenHeader = ({ title }) => {
  return (
    <View style={styles.header}>
      <AntDesign name="arrowleft" size={24} color={colors.secondary} />
      <Text style={styles.headerText}>{title}</Text>
      <FontAwesome6
        name="ellipsis-vertical"
        size={24}
        color={colors.secondary}
      />
    </View>
  );
};

export default DetailScreenHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textClr,
    fontFamily: "FiraSans-Bold",
  },
});
