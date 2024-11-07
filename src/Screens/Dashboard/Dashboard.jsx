import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { colors } from "../../theme/theme";
import { Entypo } from "@expo/vector-icons";
import Header from "../../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import { useSelector } from "react-redux";
import moment from "moment";
import Spinner from "react-native-loading-spinner-overlay";

const Dashboard = () => {
  const [selectedButton, setSelectedButton] = useState("active");

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

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
    { id: 1, text: "Active", value: "active" },
    { id: 2, text: "Future", value: "future" },
    { id: 3, text: "Past", value: "past" },
  ];

  const { userData } = useSelector((state) => state.user);

  const [loading, setloading] = useState(false);

  const [todaysActivities, setTodaysActivities] = useState([]);
  const [futureActivities, setFutureActivities] = useState([]);
  const [pastActivities, setPastActivities] = useState([]);

  const GetAllPatientActivities = async (e) => {
    setloading(true);
    await axios
      .get(
        `${BASE_URL}/user/getAllAssignmentsByPatientIdForPatients?patientId=${userData?.id}`,
        {
          withCredentials: true,
        }
      )
      .then(async (res) => {
        setloading(false);
        const allActivity = res.data.allFormsAndActivities;
        console.log(allActivity, "allActivity");

        let future = [];
        let past = [];
        let todays = [];

        const today = new Date();

        allActivity?.map((i) => {
          const eventDate = new Date(i.date);
          const eD = moment(eventDate).format("YYYY-MM-DD");
          const tD = moment(today).format("YYYY-MM-DD");

          if (moment(eD).isAfter(tD)) {
            return future.push(i);
          } else if (moment(eD).isBefore(tD)) {
            return past.push(i);
          } else if (moment(eD).isSame(tD)) {
            return todays.push(i);
          }
        });

        setTodaysActivities(todays);
        setFutureActivities(future);
        setPastActivities(past);
      })
      .catch((e) => {
        setloading(false);
      });
  };

  const getAllCompletedAssignments = async (e) => {
    setloading(true);
    await axios
      .get(
        `${BASE_URL}/user/getAllCompletedAssignmentsByPatientIdForPatients?patientId=${userData?.id}`,
        {
          withCredentials: true,
        }
      )
      .then(async (res) => {
        setloading(false);
        const allActivities = res.data.allFormsAndActivities;
        // console.log('allActivities',allActivities);
        if (allActivities.length >= 0) {
          for (let i = 0; i <= allActivities.length; i++) {
            // console.log('allActivities',allActivities[i]);
            //          setAllCompletedActivities([...completedActivities,allActivities[i]]);
          }
        }
        // setAllCompletedActivities(allActivities);
      })
      .catch((e) => {
        setloading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      GetAllPatientActivities();
    }, [])
  );

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
        {selectedButton === "active" ? (
          <Header title="Activities" />
        ) : selectedButton === "past" ? (
          <Header title="Activities" />
        ) : (
          <Header title="Activities"></Header>
        )}
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 20,
          }}
        >
          {/* Goals Btn */}
          <View style={styles.btnContainer}>
            {toggleBtns?.map((btn, index) => (
              <TouchableOpacity
                key={index}
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

          {loading && (
            <ActivityIndicator
              animating={loading}
              size="large"
              color={colors.primary}
              style={{ zIndex: 999999, marginTop: 25 }}
            />
          )}

          {/* Accordions */}
          {selectedButton === "active" ? (
            <View>
              {/* Today Goals */}
              <View style={styles.header}>
                <Text style={styles.headerText}>Active</Text>
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
              {!isTodayCollapsed ? (
                todaysActivities?.length != 0 ? (
                  <View>
                    {todaysActivities?.map((goal, index) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("GoalDetails", {
                            id: goal.id,
                            type: goal.type,
                            patientActivityId: goal?.patientActivityId,
                            disabled: goal?.patientActivityStatus !== "pending",
                          })
                        }
                        style={[
                          styles.greyBox,
                          {
                            backgroundColor:
                              goal?.patientActivityStatus === "pending"
                                ? "#ececec"
                                : colors.primary,
                          },
                        ]}
                        key={index}
                      >
                        <Text
                          style={[
                            styles.boxText,
                            {
                              color:
                                goal?.patientActivityStatus === "pending"
                                  ? "#000"
                                  : "#fff",
                            },
                          ]}
                        >
                          {goal.name}
                        </Text>
                        <Text
                          style={[
                            styles.remainingText,
                            {
                              color:
                                goal?.patientActivityStatus === "pending"
                                  ? "#000"
                                  : "#fff",
                            },
                          ]}
                        >
                          {"Assigned By: " + goal?.assignedBy?.name}
                        </Text>
                        <Text
                          style={[
                            styles.remainingText,
                            {
                              color:
                                goal?.patientActivityStatus === "pending"
                                  ? "#000"
                                  : "#fff",
                            },
                          ]}
                        >
                          {"Date: " + goal?.date?.split("T")[0]}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <View style={{ marginTop: 10 }}>
                    <Text>No Activities For today found.</Text>
                  </View>
                )
              ) : null}
            </View>
          ) : null}

          {/* This Week Goals */}
          {selectedButton == "future" ? (
            <View>
              <View style={styles.header}>
                <Text style={styles.headerText}>Future Activities</Text>
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
                  {futureActivities?.map((goal, index) => (
                    <View
                      style={[
                        styles.greyBox,
                        {
                          backgroundColor:
                            goal?.patientActivityStatus === "pending"
                              ? "#ececec"
                              : "#138418",
                        },
                      ]}
                      key={index}
                    >
                      <Text style={styles?.boxText}>{goal?.name}</Text>
                      <Text style={styles.remainingText}>
                        {"Assigned By: " + goal?.assignedBy?.name}
                      </Text>
                      <Text style={styles.remainingText}>
                        {"Date: " + goal?.date?.split("T")[0]}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ) : null}

          {selectedButton === "past" ? (
            <View>
              <View style={styles.header}>
                <Text style={styles?.headerText}>Past Activities</Text>
              </View>
              {pastActivities.map((goal, index) => {
                return (
                  <View
                    style={[
                      styles.greyBox,
                      {
                        backgroundColor:
                          goal?.patientActivityStatus === "pending"
                            ? "#ececec"
                            : "#138418",
                      },
                    ]}
                    key={index}
                  >
                    <Text
                      style={[
                        styles.boxText,
                        {
                          color:
                            goal?.patientActivityStatus === "pending"
                              ? "#000"
                              : "#fff",
                        },
                      ]}
                    >
                      {goal?.name}
                    </Text>
                    <Text
                      style={[
                        styles.remainingText,
                        {
                          color:
                            goal?.patientActivityStatus === "pending"
                              ? "#000"
                              : "#fff",
                        },
                      ]}
                    >
                      {"Assigned By: " + goal?.assignedBy?.name}
                    </Text>
                    <Text
                      style={[
                        styles.remainingText,
                        {
                          color:
                            goal?.patientActivityStatus === "pending"
                              ? "#000"
                              : "#fff",
                        },
                      ]}
                    >
                      {"Date: " + goal?.date?.split("T")[0]}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : null}
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
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingVertical: 15,
    borderRadius: 10,
  },
  selectedButton: {
    width: "40%",
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
    borderRadius: 20,
    padding: 18,
    marginTop: 20,
    position: "relative",
  },
  greyBox: {
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
    height: 225,
    width: 225,
    position: "absolute",
    top: -50,
    borderRadius: 360,
    right: -50,
  },
});
