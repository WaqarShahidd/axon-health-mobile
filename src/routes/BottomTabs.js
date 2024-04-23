import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Dashboard from "../Screens/Dashboard/Dashboard";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import Appointments from "../Screens/Appointment/Appointments";
import Insights from "../Screens/Insights/Insights";
import Profile from "../Screens/Profile/Profile";
import More from "../Screens/More/More";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: "10%",
          width: "100%",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          paddingHorizontal: 10,
          backgroundColor: "white",
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="dashboard" size={24} color="black" />
            ) : (
              <MaterialIcons name="dashboard" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={Appointments}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="calendar-clear" size={24} color="black" />
            ) : (
              <Ionicons name="calendar-clear-outline" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Insights"
        component={Insights}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <>
                <FontAwesome6 name="arrow-trend-up" size={24} color="black" />
              </>
            ) : (
              <>
                <FontAwesome6 name="arrow-trend-up" size={24} color="black" />
              </>
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="black" />
            ) : (
              <Ionicons name="person-outline" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={24}
                color="black"
              />
            ) : (
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={24}
                color="black"
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({});
