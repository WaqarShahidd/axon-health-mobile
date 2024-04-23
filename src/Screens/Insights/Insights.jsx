import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/Header";

const Insights = () => {
  const pieData = [
    {
      value: 47,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
      focused: true,
    },
    { value: 40, color: "#93FCF8", gradientCenterColor: "#3BE9DE" },
    { value: 16, color: "#BDB2FA", gradientCenterColor: "#8F80F3" },
    { value: 3, color: "#FFA5BA", gradientCenterColor: "#FF7F97" },
  ];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bgClr,
        paddingTop: "10%",
      }}
    >
      <LinearGradient
        colors={["rgba(255,255,255,1)", "rgba(232,241,250,0.5)"]}
        style={{
          height: 225,
          width: 225,
          position: "absolute",
          top: -50,
          borderRadius: 360,
          right: -50,
        }}
      />

      <Header title="Insights" />

      <View
        style={{
          marginHorizontal: 20,
          marginTop: 20,
        }}
      ></View>
    </View>
  );
};

export default Insights;

const styles = StyleSheet.create({});
