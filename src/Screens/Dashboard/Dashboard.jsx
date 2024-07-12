import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../theme/theme";
import { Entypo } from "@expo/vector-icons";
import Header from "../../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const Dashboard = () => {
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

  const [isTodayCollapsed, setIsTodayCollapsed] = useState(false);
  const [isWeekCollapsed, setIsWeekCollapsed] = useState(false);

  const toggleTodayCollapse = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsTodayCollapsed(!isTodayCollapsed);
  };

  const toggleWeekCollapse = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsWeekCollapsed(!isWeekCollapsed);
  };

  const toggleBtns = [
    { id: 1, text: "Active Goals", value: "active" },
    { id: 2, text: "Completed Goals", value: "completed" },
  ];

  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bgClr,
        paddingTop: "10%",
      }}
    >
      <LinearGradient
        colors={["rgba(255,255,255,1)", "rgba(232,241,250,0.5)"]}
        style={styles.gradient}
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
                key={btn.id}
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
            {/* Today Goals */}
            <View style={styles.header}>
              <Text style={styles.headerText}>Today</Text>
              <TouchableOpacity
                style={styles.collapseButton}
                onPress={toggleTodayCollapse}
              >
                <Text style={styles.collapseButtonText}>
                  {isTodayCollapsed ? "Expand" : "Collapse"}
                </Text>
                <Entypo
                  name={!isTodayCollapsed ? "chevron-up" : "chevron-down"}
                  size={18}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
            {!isTodayCollapsed && (
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

          {/* This Week Goals */}
          <View>
            <View style={styles.header}>
              <Text style={styles.headerText}>This Week</Text>
              <TouchableOpacity
                style={styles.collapseButton}
                onPress={toggleWeekCollapse}
              >
                <Text style={styles.collapseButtonText}>
                  {isWeekCollapsed ? "Expand" : "Collapse"}
                </Text>
                <Entypo
                  name={!isWeekCollapsed ? "chevron-up" : "chevron-down"}
                  size={18}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
            {!isWeekCollapsed && (
              <View>
                {goalCardData.map(
                  (goal, index) =>
                    goal?.title === "This Week" && (
                      <TouchableOpacity
                        onPress={() => navigation.navigate("GoalDetails")}
                        style={styles.box}
                        key={index}
                      >
                        <Text style={styles.boxText}>{goal.cardText}</Text>
                        <Text style={styles.remainingText}>
                          2 remaining this week
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
                  // fontFamily: "FiraSans_700Bold",
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
                      // fontFamily: "FiraSans_700Bold",
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
              source={require("../../../assets/icons/user-doctor.png")}
              style={{
                height: 135,
                resizeMode: "contain",
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
    // fontFamily: "FiraSans_400Regular",
    color: colors.lightText,
    fontWeight: "400",
  },
  selectedButtonText: {
    fontSize: 16,
    // fontFamily: "FiraSans_700Bold",
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
    // fontFamily: "FiraSans_700Bold",
  },
  collapseButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  collapseButtonText: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.primary,
    // fontFamily: "FiraSans_400Regular",
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
    // fontFamily: "FiraSans_400Regular",
  },
  remainingText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#596066",
    marginTop: 10,
    // fontFamily: "FiraSans_400Regular",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 200,
  },
});
