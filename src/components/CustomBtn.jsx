import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "../theme/theme";

const CustomBtn = ({ text, onPress, disabled = false }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? "#89C18B" : colors.primary,
        },
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
      <FontAwesome6 name="arrow-right-long" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    // fontFamily: "FiraSans_700Bold",
    marginRight: 15,
  },
});
