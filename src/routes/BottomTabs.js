import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import Dashboard from "../Screens/Dashboard/Dashboard";
import Appointments from "../Screens/Appointment/Appointments";
import Insights from "../Screens/Insights/Insights";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../theme/theme";
import MoreModal from "../components/MoreModal";
import AssesmentForms from "../Screens/Assesment Forms/AssesmentForms";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const MoreScreen = () => {
    return null;
  };

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
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderTopWidth: focused ? 3 : 0,
                borderTopColor: colors.primary,
              }}
            >
              <Image
                source={
                  focused
                    ? require("../../assets/icons/dashboard.png")
                    : require("../../assets/icons/dashboard-o.png")
                }
                style={{ height: 28, width: 28 }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  // fontFamily: "FiraSans_700Bold",
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
      {/* <Tab.Screen
        name="Appointment"
        component={Appointments}
        options={{
          tabBarIcon: ({ focused }) =>
            <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopWidth: focused ? 3 : 0,
                  borderTopColor: colors.primary,
                }}
              >
                <Image
                  source={focused ? require("../../assets/icons/appointment.png") : require("../../assets/icons/appointment-o.png")}
                  style={{ height: 28, width: 28 }}
                />
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "500",
                    // fontFamily: "FiraSans_700Bold",
                    color: colors.secondary,
                    marginTop: 7.5,
                  }}
                >
                  Appointment
                </Text>
              </View>
            
        }}
      /> */}
      <Tab.Screen
        name="Insights"
        component={Insights}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderTopWidth: focused ? 3 : 0,
                borderTopColor: colors.primary,
              }}
            >
              <Image
                source={
                  focused
                    ? require("../../assets/icons/insight.png")
                    : require("../../assets/icons/insight-o.png")
                }
                style={{ height: 28, width: 28 }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  // fontFamily: "FiraSans_700Bold",
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
        name="Documents"
        component={AssesmentForms}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderTopWidth: focused ? 3 : 0,
                borderTopColor: colors.primary,
              }}
            >
              <Image
                source={
                  focused
                    ? require("../../assets/icons/profile.png")
                    : require("../../assets/icons/profile-o.png")
                }
                style={{ height: 28, width: 28 }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  // fontFamily: "FiraSans_700Bold",
                  color: colors.secondary,
                  marginTop: 7.5,
                }}
              >
                Documents{" "}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarButton: () => (
            <MoreModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({});
