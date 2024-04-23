import { Image, Platform, StyleSheet, Text, View } from "react-native";
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
import { colors } from "../theme/theme";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Platform.OS === "ios" ? "15%" : "10%",
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
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopWidth: 3,
                  borderTopColor: colors.primary,
                }}
              >
                <Image
                  source={require("../../assets/icons/dashboard.png")}
                  style={{ height: 28, width: 28 }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    fontFamily: "FiraSans-Bold",
                    color: colors.secondary,
                    marginTop: 7.5,
                  }}
                >
                  Home
                </Text>
              </View>
            ) : (
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/icons/dashboard-o.png")}
                  style={{ height: 28, width: 28 }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    fontFamily: "FiraSans-r",
                    color: colors.secondary,
                    marginTop: 7.5,
                  }}
                >
                  Home
                </Text>
              </View>
            ),
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={Appointments}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopWidth: 3,
                  borderTopColor: colors.primary,
                }}
              >
                <Image
                  source={require("../../assets/icons/appointment.png")}
                  style={{ height: 28, width: 28 }}
                />
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "500",
                    fontFamily: "FiraSans-Bold",
                    color: colors.secondary,
                    marginTop: 7.5,
                  }}
                >
                  Appointment
                </Text>
              </View>
            ) : (
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/icons/appointment-o.png")}
                  style={{ height: 28, width: 28 }}
                />
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "500",
                    fontFamily: "FiraSans-R",
                    color: colors.secondary,
                    marginTop: 7.5,
                  }}
                >
                  Appointment
                </Text>
              </View>
            ),
        }}
      />
      <Tab.Screen
        name="Insights"
        component={Insights}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopWidth: 3,
                  borderTopColor: colors.primary,
                }}
              >
                <Image
                  source={require("../../assets/icons/insight.png")}
                  style={{ height: 28, width: 28 }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    fontFamily: "FiraSans-Bold",
                    color: colors.secondary,
                    marginTop: 7.5,
                  }}
                >
                  Insights
                </Text>
              </View>
            ) : (
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/icons/insight-o.png")}
                  style={{ height: 28, width: 28 }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    fontFamily: "FiraSans-r",
                    color: colors.secondary,
                    marginTop: 7.5,
                  }}
                >
                  Insights
                </Text>
              </View>
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopWidth: 3,
                  borderTopColor: colors.primary,
                }}
              >
                <Image
                  source={require("../../assets/icons/profile.png")}
                  style={{ height: 28, width: 28 }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    fontFamily: "FiraSans-Bold",
                    color: colors.secondary,
                    marginTop: 7.5,
                  }}
                >
                  Profile{" "}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/icons/profile-o.png")}
                  style={{ height: 28, width: 28 }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    fontFamily: "FiraSans-r",
                    color: colors.secondary,
                    marginTop: 7.5,
                  }}
                >
                  Profile
                </Text>
              </View>
            ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopWidth: 3,
                  borderTopColor: colors.primary,
                }}
              >
                <Image
                  source={require("../../assets/icons/more.png")}
                  style={{ height: 28, width: 28 }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    fontFamily: "FiraSans-Bold",
                    color: colors.secondary,
                    marginTop: 7.5,
                  }}
                >
                  More
                </Text>
              </View>
            ) : (
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/icons/more-o.png")}
                  style={{ height: 28, width: 28 }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    fontFamily: "FiraSans-r",
                    color: colors.secondary,
                    marginTop: 7.5,
                  }}
                >
                  More
                </Text>
              </View>
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({});
