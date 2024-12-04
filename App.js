import { StyleSheet, Text, View } from "react-native";
import Navigation from "./src/routes/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "./src/constants/AppLoading";
import { Provider } from "react-redux";
import store from "./src/redux/store";

export default function App() {
  return (
    <AppLoading>
      <Provider store={store}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </Provider>
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
