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
import * as SplashScreen from "expo-splash-screen";
import Header from "../../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import GoalCards from "../../components/GoalCards";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import CustomBtn from "../../components/CustomBtn";
import Spinner from "react-native-loading-spinner-overlay";
import Snack from "../../components/Snack";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [selectedButton, setSelectedButton] = useState("pending");

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCollapsed(!isCollapsed);
  };

  const toggleBtns = [
    { id: 1, text: "Active Goals", value: "pending" },
    { id: 2, text: "Completed Goals", value: "completed" },
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

  useEffect(() => {
    GetDailyGoals();
    GetDoctor();
  }, [selectedButton]);

  const navigation = useNavigation();

  const [dailyGoals, setdailyGoals] = useState([]);

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

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
        style={gradient}
      />

      <Spinner visible={loading} />
      <Snack
        visible={confirmation}
        title="You have checked in successfully!"
        error={false}
        onPress={() => setconfirmation(false)}
      />

      <Header title="Today's Goals" />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={{ margin: 20 }}>
          <Text style={styles.headerText}>Check In for Today: </Text>
          <CustomBtn text="Check In" onPress={CheckIn} />
        </View>
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
                style={{
                  ...(selectedButton === btn.value
                    ? styles.selectedButton
                    : styles.button),
                }}
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
          {/* <View>
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
          </View> */}
          {dailyGoals
            ?.filter((val) => val?.status === selectedButton)
            ?.map((goal, index) => (
              <View>
                {/* <View style={styles.header}>
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
            </View> */}
                {!isCollapsed && (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("GoalDetails")}
                      style={styles.box}
                      key={index}
                    >
                      <Text style={styles.boxText}>{goal?.name}</Text>
                      <Text style={styles.remainingText}>
                        {goal?.frequency}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}

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
                Your Doctor
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                {doctor?.avatar && (
                  <Image
                    source={{ uri: doctor?.avatar }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 360,
                      marginRight: 10,
                    }}
                  />
                )}
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
                    {doctor?.name}
                  </Text>
                  <Text style={styles.remainingText}>{doctor?.doctorType}</Text>
                </View>
              </View>
            </View>
            <Image
              source={require("../../../assets/icons/user-doctor.png")}
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
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingVertical: 15,
    borderRadius: 10,
  },
  selectedButton: {
    width: "50%",
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
