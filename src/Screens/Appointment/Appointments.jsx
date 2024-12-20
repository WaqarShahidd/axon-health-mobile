import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/Header";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import CustomBtn from "../../components/CustomBtn";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import moment from "moment";

const Appointments = () => {
  const navigation = useNavigation();
  const [selectedButton, setSelectedButton] = useState("active");

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  const toggleBtns = [
    { id: 1, text: "Active Appointments", value: "active" },
    { id: 2, text: "Closed Appointments", value: "closed" },
  ];

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

  let currentDate = new Date();

  const [filterModal, setfilterModal] = useState(false);

  const [loading, setloading] = useState(false);

  const [allAppointments, setallAppointments] = useState([]);

  const GetAppointments = async (e) => {
    setloading(true);
    await axios
      .get(`${BASE_URL}/appointment/getAllAppointmentByPatientId`, {
        withCredentials: true,
      })
      .then((res) => {
        setloading(false);
        setallAppointments(res.data?.allAppointments);
      })
      .catch((e) => {
        setloading(false);
      });
  };

  useEffect(() => {
    GetAppointments();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bgClr,
        paddingTop: "10%",
      }}
    >
      <Modal
        isVisible={filterModal}
        onBackdropPress={() => setfilterModal(false)}
        testID={"modal"}
        onSwipeComplete={this.close}
        swipeDirection={["down"]}
        style={{
          justifyContent: "flex-end",
          margin: 0,
        }}
      >
        <View
          style={{
            height: "50%",
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                // fontFamily: "FiraSans_700Bold",
                color: colors.textClr,
              }}
            >
              Filters
            </Text>
            <Text
              style={{
                fontSize: 14,
                // fontFamily: "FiraSans_400Regular",
                color: colors.primary,
                textDecorationLine: "underline",
              }}
            >
              Clear All
            </Text>
          </View>
          <View
            style={{ flex: 1, justifyContent: "flex-end", marginBottom: 20 }}
          >
            <CustomBtn text="Apply Filters" />
          </View>
        </View>
      </Modal>
      <LinearGradient
        colors={["rgba(255,255,255,1)", "rgba(232,241,250,0.5)"]}
        style={{
          height: 225,
          width: 225,
          position: "absolute",
          top: -50,
          borderRadius: 360,
          right: -50,
        }}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Header title="Today's Appointments" />
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
                onPress={() => setSelectedButton(btn.value)}
                key={btn.id}
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

          <View>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                {selectedButton === "active"
                  ? `Active Appointments (${
                      allAppointments?.filter((val) => {
                        const appointmentDate = new Date(val?.date);

                        return appointmentDate < currentDate;
                      })?.length
                    })`
                  : `Past Appointments (${
                      allAppointments?.filter((val) => {
                        const appointmentDate = new Date(val?.date);

                        return appointmentDate > currentDate;
                      })?.length
                    })`}
              </Text>
              {/* <TouchableOpacity
                style={styles.collapseButton}
                onPress={() => setfilterModal(true)}
              >
                <Text style={styles.collapseButtonText}>Filters</Text>
              </TouchableOpacity> */}
            </View>

            <View>
              {allAppointments
                ?.filter((val) => {
                  const appointmentDate = new Date(val?.date);
                  if (selectedButton === "active") {
                    return appointmentDate < currentDate;
                  } else {
                    return appointmentDate > currentDate;
                  }
                })
                ?.map((appoint, index) => (
                  <View style={styles.box} key={index}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {appoint?.doctorDetails?.avatar && (
                        <Image
                          source={{ uri: appoint?.doctorDetails?.avatar }}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 360,
                            marginRight: 10,
                          }}
                        />
                      )}
                      <Text style={styles.boxText}>
                        {appoint?.doctorDetails?.name}
                      </Text>
                    </View>
                    <Text style={styles.remainingText}>
                      {moment(appoint?.date).format("DD MMM YYYY")}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Appointments;

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
    fontSize: 14,
    // fontFamily: "FiraSans_400Regular",
    color: colors.lightText,
    fontWeight: "400",
  },
  selectedButtonText: {
    fontSize: 14,
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
    fontSize: 20,
    fontWeight: "600",
    // fontFamily: "FiraSans_700Bold",
    maxWidth: "80%",
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
  cardContainer: {
    overflow: "hidden",
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    marginTop: 20,
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
