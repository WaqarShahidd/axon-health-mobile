import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../Screens/Dashboard/Dashboard";
import BottomTabs from "./BottomTabs";
import GoalDetails from "../Screens/GoalDetails/GoalDetails";
import { useNavigation } from "@react-navigation/native";
import PrivacyPolicy from "../Screens/Privacy Policy/PrivacyPolicy";
import Settings from "../Screens/Settings/Settings";
import Help from "../Screens/Help/Help";
import Activities from "../Screens/Activities/Activities";
import FormView from "../Screens/Activities/FormView";
import AssesmentForms from "../Screens/Assesment Forms/AssesmentForms";
import CheckIn from "../Screens/Daily Check-In/CheckIn";

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
      <Stack.Screen name="Activities" component={Activities} />
      <Stack.Screen name="FormView" component={FormView} />
      <Stack.Screen name="AssesmentForms" component={AssesmentForms} />
      <Stack.Screen name="GoalDetails" component={GoalDetails} />
      <Stack.Screen name="CheckIn" component={CheckIn} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Help" component={Help} />
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
