import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  useFonts,
  FiraSans_400Regular,
  FiraSans_700Bold,
} from "@expo-google-fonts/fira-sans";

const AppLoading = ({ children }) => {
  let [fontsLoaded] = useFonts({
    FiraSans_400Regular,
    FiraSans_700Bold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return children;
};

export default AppLoading;

const styles = StyleSheet.create({});
