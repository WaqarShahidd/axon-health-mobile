import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./src/routes/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import AppLoading from "./src/constants/AppLoading";

export default function App() {
  return (
    <AppLoading>
      <PaperProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </PaperProvider>
    </AppLoading>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
