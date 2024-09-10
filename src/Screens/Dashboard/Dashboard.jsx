import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../theme/theme";
import { Entypo } from "@expo/vector-icons";
import Header from "../../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import { useSelector } from "react-redux";
import moment from "moment";

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

  const [confirmation, setconfirmation] = useState(false);
  const [loading, setloading] = useState(false);

  const CheckIn = async (e) => {
    setloading(true);
    await axios
      .post(`${BASE_URL}/patient_checkin/createPatientCheckIn`, {
        withCredentials: true,
      })
      .then((res) => {
        setloading(false);
        setconfirmation(true);
      })
      .catch((e) => {
        setloading(false);
        setconfirmation(false);
      });
  };

  const GetDailyGoals = async (e) => {
    setloading(true);
    await axios
      .get(
        `${BASE_URL}/patient_goal/getAllPatientGoal?patientId=${userData?.id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setloading(false);
        setdailyGoals(res.data?.allPatientGoals);
      })
      .catch((e) => {
        setloading(false);
      });
  };

  const [doctor, setdoctor] = useState({});
  const [todaysActivities, setTodaysActivities] = useState([]);
  const [futureActivities, setFutureActivities] = useState([]);
  const [pastActivities, setPastActivities] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  const [completedActivities, setAllCompletedActivities] = useState([]);

  const GetDoctor = async (e) => {
    setloading(true);
    await axios
      .get(
        `${BASE_URL}/doctor_patient/getAssignedDoctorWithPatientId?patientId=${userData?.id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setloading(false);
        setdoctor(res.data?.allPatientsDoctors?.assignedDoctor);
      })
      .catch((e) => {
        setloading(false);
      });
  };

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

        let future = []
        let past = []
        let todays = []

        const today = new Date()
        
        allActivity?.map((i) => {
          const eventDate = new Date(i.date);
          const eD = moment(eventDate).format("YYYY-MM-DD")
          const tD = moment(today).format("YYYY-MM-DD")

          if(moment(eD).isAfter(tD)){
            return future.push(i)
          } else if(moment(eD).isBefore(tD)){
            return past.push(i)
          } else if(moment(eD).isSame(tD)){
            return todays.push(i)
          }
        })
        // console.log(past?.map((i) => i?.date), "past")
        // console.log(todayS?.map((i) => i?.date), "today")
        // console.log(future?.map((i) => i?.date), "future")
        setTodaysActivities(todays);
        setFutureActivities(future);
        setPastActivities(past);

        // if (todaysEvents.length == 0) {
        //   setIsTodayCollapsed(true);
        // }
        // if (allActivity.length == 0) {
        //   setIsWeekCollapsed(true);
        // }
        // setAllActivities(allActivity);
        // setTodaysActivities(todaysEvents);
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
        if(allActivities.length>=0)
        {
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
  // console.log('completedActivities',completedActivities);
  useEffect(() => {
    GetDailyGoals();
    GetDoctor();
    GetAllPatientActivities();
   // getAllCompletedAssignments();
  }, []);

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
        ):<Header title="Activities"></Header>}
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
                          })
                        }
                        style={[styles.greyBox, {
                          backgroundColor: goal?.patientActivityStatus === "pending" ? "#ececec" : "#138418"
                        }]}                        
                        key={index}
                      >
                        {/* <View style={styles.box} key={index}> */}
                        <Text style={styles.boxText}>{goal.name}</Text>
                        <Text style={styles.remainingText}>
                          {"Assigned By: " + goal?.assignedBy?.name}
                        </Text>
                        <Text style={styles.remainingText}>
                    {"Date: " + goal?.date?.split('T')[0]}
                  </Text>

                        {/* </View> */}
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <View style={{ marginTop: 10 }}>
                    <Text>No Activities For today found.</Text>
                  </View>
                )
              ) : (
                ""
              )}
            </View>
          ) : (
            ""
          )}

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
                    <TouchableOpacity
                      // onPress={() =>
                      //   navigation.navigate("GoalDetails", {
                      //     id: goal?.id,
                      //     type: goal?.type,
                      //     patientActivityId: goal?.patientActivityId,
                      //   })
                      // }
                      style={[styles.greyBox, {
                        backgroundColor: goal?.patientActivityStatus === "pending" ? "#ececec" : "#138418"
                      }]}                      
                      key={index}
                    >
                      <Text style={styles?.boxText}>{goal?.name}</Text>
                      <Text style={styles.remainingText}>
                        {"Assigned By: " + goal?.assignedBy?.name}
                      </Text>
                      <Text style={styles.remainingText}>
                    {"Date: " + goal?.date?.split('T')[0]}
                  </Text>

                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ) : (
            ""
          )}
          {selectedButton === "past" ? (
            <View>

              <View style={styles.header}>
                      <Text style={styles?.headerText}>Past Activities</Text>
                </View>              
              {pastActivities.map((goal, index) => {
                return (
                <TouchableOpacity
//                   onPress={() =>
//                     navigation.navigate("GoalDetails", {
//                       id: goal?.id,
//                       type: goal?.type,
//                       completed: true,
//                       patientActivityId: goal?.patientActivityId,
//                     })
// //                    getAllCompletedAssignments()
//                   }
                  style={[styles.greyBox, {
                    backgroundColor: goal?.patientActivityStatus === "pending" ? "#ececec" : "#138418"
                  }]}
                  
                  key={index}
                >
                  <Text style={styles.boxText}>{goal?.name}</Text>
                  <Text style={styles.remainingText}>
                    {"Assigned By: " + goal?.assignedBy?.name}
                  </Text>
                  <Text style={styles.remainingText}>
                    {"Date: " + goal?.date?.split('T')[0]}
                  </Text>
                </TouchableOpacity>
                )
              
              })}
            </View>
          ) : (
            ""
          )}
          {/* Your Therapist */}
          {/* <View style={{ justifyContent: "center" }}>
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
                  source={require("../../../assets/images/user.png")}
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
          </View> */}
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
