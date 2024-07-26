import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { colors } from "../theme/theme";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Divider, Menu } from "react-native-paper";

const DetailScreenHeader = ({
  title,
  marginH,
  backPress,
  noMoreOption = true,
  moreOptionsFunc,
}) => {
  return (
    <View style={[styles.header, { marginHorizontal: marginH ? 20 : 0 }]}>
      <TouchableOpacity onPress={backPress} style={styles.btn}>
        <AntDesign name="arrowleft" size={24} color={colors.secondary} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
      {
        title!='Activity Details'?
        <TouchableOpacity onPress={moreOptionsFunc} style={styles.btn}>
        {noMoreOption && (
          <FontAwesome6
            name="ellipsis-vertical"
            size={24}
            color={colors.secondary}
          />
        )}
      </TouchableOpacity>
        :      
        <TouchableOpacity onPress={backPress} style={styles.btn}>
        {/* <AntDesign name="arrowleft" size={24} color={colors.secondary} /> */}
      </TouchableOpacity>

      }
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
    // fontFamily: "FiraSans_700Bold",
  },
  btn: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 360,
  },
});
