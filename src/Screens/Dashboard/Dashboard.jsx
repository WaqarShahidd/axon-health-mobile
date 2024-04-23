import {
  Image,
  ImageBackground,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { colors, gradient } from "../../theme/theme";
import { MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Header from "../../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import GoalCards from "../../components/GoalCards";
import { useNavigation } from "@react-navigation/native";

const Dashboard = () => {
  // const [fontsLoaded, fontError] = useFonts({
  //   "FiraSans-R": require("../../../assets/fonts/FiraSans-Regular.ttf"),
  //   "FiraSans-Bold": require("../../../assets/fonts/FiraSans-Bold.ttf"),
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded || fontError) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, fontError]);

  // if (!fontsLoaded && !fontError) {
  //   return null;
  // }

  // useEffect(() => {
  //   const hideSplashScreen = async () => {
  //     if (fontsLoaded && !fontError) {
  //       await SplashScreen.hideAsync();
  //     }
  //   };

  //   hideSplashScreen();
  // }, [fontsLoaded, fontError]);

  const [selectedButton, setSelectedButton] = useState("active");

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  const goalCardData = [
    {
      title: "Today",
      cardText: "Connect with someone in recovery on an emotional level",
    },
    { title: "Today", cardText: "Next 1:1 Counselling Session" },
    {
      title: "This Week",
      cardText: "Connect with my sponsor on an emotional level",
    },
    { title: "This Week", cardText: "Attend a group therapy session" },
  ];

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCollapsed(!isCollapsed);
  };

  const toggleBtns = [
    { id: 1, text: "Active Goals", value: "active" },
    { id: 2, text: "Completed Goals", value: "completed" },
  ];

  const navigation = useNavigation();
  return (
    <View
      // onLayout={onLayoutRootView}
      style={{
        flex: 1,
        backgroundColor: colors.bgClr,
        paddingTop: "10%",
      }}
    >
      <LinearGradient
        colors={["rgba(255,255,255,1)", "rgba(232,241,250,0.5)"]}
        style={gradient}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Header title="Today's Goals" />
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 20,
          }}
        >
          {/* Goals Btn */}
          <View style={styles.btnContainer}>
            {toggleBtns.map((btn) => (
              <TouchableOpacity
                style={
                  selectedButton === btn.value
                    ? styles.selectedButton
                    : styles.button
                }
                onPress={() => handleButtonPress(btn.value)}
              >
                <Text
                  style={
                    selectedButton === btn.value
                      ? styles.selectedButtonText
                      : styles.buttonText
                  }
                >
                  {btn.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Accordions */}
          <View>
            <View style={styles.header}>
              <Text style={styles.headerText}>Today</Text>
              <TouchableOpacity
                style={styles.collapseButton}
                onPress={toggleCollapse}
              >
                <Text style={styles.collapseButtonText}>
                  {isCollapsed ? "Expand" : "Collapse"}
                </Text>
                <Entypo
                  name={isCollapsed ? "chevron-up" : "chevron-down"}
                  size={18}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
            {!isCollapsed && (
              <View>
                {goalCardData.map(
                  (goal, index) =>
                    goal?.title === "Today" && (
                      <View style={styles.box} key={index}>
                        <Text style={styles.boxText}>{goal.cardText}</Text>
                        <Text style={styles.remainingText}>
                          2 remaining today
                        </Text>
                      </View>
                    )
                )}
              </View>
            )}
          </View>
          <View>
            <View style={styles.header}>
              <Text style={styles.headerText}>This Week</Text>
              <TouchableOpacity
                style={styles.collapseButton}
                onPress={toggleCollapse}
              >
                <Text style={styles.collapseButtonText}>
                  {isCollapsed ? "Expand" : "Collapse"}
                </Text>
                <Entypo
                  name={isCollapsed ? "chevron-up" : "chevron-down"}
                  size={18}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
            {!isCollapsed && (
              <View>
                {goalCardData.map(
                  (goal, index) =>
                    goal?.title !== "Today" && (
                      <TouchableOpacity
                        onPress={() => navigation.navigate("GoalDetails")}
                        style={styles.box}
                        key={index}
                      >
                        <Text style={styles.boxText}>{goal.cardText}</Text>
                        <Text style={styles.remainingText}>
                          2 remaining today
                        </Text>
                      </TouchableOpacity>
                    )
                )}
              </View>
            )}
          </View>

          {/* Your Therapist */}
          <View style={{ justifyContent: "center" }}>
            <View style={styles.box}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  lineHeight: 24,
                  color: colors.textClr,
                  fontFamily: "FiraSans-Bold",
                  textTransform: "uppercase",
                }}
              >
                Your Therapist
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Image
                  source={require("../../../assets/images/avatar.jpeg")}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 360,
                    marginRight: 10,
                  }}
                />
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      lineHeight: 24,
                      color: colors.textClr,
                      fontFamily: "FiraSans-Bold",
                      textTransform: "uppercase",
                    }}
                  >
                    Your Therapist
                  </Text>
                  <Text style={styles.remainingText}>
                    Primary Care Physician
                  </Text>
                </View>
              </View>
            </View>
            <Image
              source={require("../../../assets/icons/user-doctor1.png")}
              style={{
                flex: 1,
                resizeMode: "contain", // or "cover"
                justifyContent: "center",
                position: "absolute",
                right: 0,
                zIndex: 0,
                width: 135,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.borderClr,
    borderRadius: 12,
    padding: 2,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingVertical: 15,
    borderRadius: 10,
  },
  selectedButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "FiraSans-R",
    color: colors.lightText,
    fontWeight: "400",
  },
  selectedButtonText: {
    fontSize: 16,
    fontFamily: "FiraSans-Bold",
    color: colors.textClr,
    fontWeight: "800",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "FiraSans-Bold",
  },
  collapseButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  collapseButtonText: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.primary,
    fontFamily: "FiraSans-R",
  },
  cardContainer: {
    overflow: "hidden",
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    marginTop: 20,
    position: "relative",
  },
  boxText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
    maxWidth: "80%",
  },
  remainingText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#596066",
    marginTop: 10,
  },
});
