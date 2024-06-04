import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import SnackBar from "react-native-snackbar-component";

const Snack = ({ visible, title, onPress, error }) => {
  return (
    <SnackBar
      visible={visible}
      textMessage={() => {
        return (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {error ? (
                <AntDesign
                  name="infocirlceo"
                  size={24}
                  color="white"
                  style={{ marginRight: 10 }}
                />
              ) : (
                <View
                  style={{
                    width: 5,
                    height: 30,
                    backgroundColor: "#387CFF",
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                />
              )}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: error ? "white" : "#1B1B1B",
                }}
              >
                {title}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onPress}
              style={{
                height: 25,
                width: 25,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="close"
                size={25}
                color={error ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>
        );
      }}
      actionHandler={onPress}
      actionText=" "
      accentColor={"#1E2022"}
      containerStyle={{ marginHorizontal: 18, borderRadius: 10, height: 75 }}
      backgroundColor={error ? "red" : "white"}
      bottom={20}
      autoHidingTime={2000}
    />
  );
};

export default Snack;

const styles = StyleSheet.create({});
