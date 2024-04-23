import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../Screens/Dashboard/Dashboard";
import BottomTabs from "./BottomTabs";
import GoalDetails from "../Screens/GoalDetails/GoalDetails";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

const ModalScreen = ({}) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ height: "50%" }}>
        <Text>Modal Screen</Text>
        <Button title="Dismiss" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
      initialRouteName={"Home"}
    >
      <Stack.Screen name="Home" component={BottomTabs} />
      <Stack.Screen name="GoalDetails" component={GoalDetails} />
      <Stack.Screen
        name="Modal"
        component={ModalScreen}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
