import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, gradient } from "../../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import DetailScreenHeader from "../../components/DetailScreenHeader";
import CustomBtn from "../../components/CustomBtn";
import { useNavigation } from "@react-navigation/native";

const Help = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bgClr,
        paddingTop: "15%",
      }}
    >
      <LinearGradient
        colors={["rgba(255,255,255,1)", "rgba(232,241,250,0.5)"]}
        style={gradient}
      />
      <DetailScreenHeader
        title=" Help"
        marginH
        backPress={() => navigation.goBack()}
        noMoreOption={false}
      />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, paddingHorizontal: 20, marginVertical: 30 }}
      ></ScrollView>

      <LinearGradient
        style={{
          height: "20%",
          width: "100%",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.8)"]}
        locations={[0, 0.3]}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          margin: 20,
          backgroundColor: "transparent",
          width: "90%",
        }}
      >
        <CustomBtn text="I agree" />
      </View>
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({});
