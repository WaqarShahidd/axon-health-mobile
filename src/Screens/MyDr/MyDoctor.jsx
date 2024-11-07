import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { colors, gradient } from "../../theme/theme";
import Header from "../../components/Header";

const MyDoctor = () => {
  const [doctor, setdoctor] = useState({});
  const [siteDetails, setSiteDetails] = useState({});
  const { userData } = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);

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
        console.log(res.data?.allPatientsDoctors?.assignedDoctor, "doctor");
        setdoctor(res.data?.allPatientsDoctors?.assignedDoctor);
        GetSiteDetails(res.data?.allPatientsDoctors?.siteId);
      })
      .catch((e) => {
        setloading(false);
      });
  };

  const GetSiteDetails = async (siteId) => {
    setloading(true);
    await axios
      .get(`${BASE_URL}/site/getSiteDetails?siteId=${siteId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setloading(false);
        setSiteDetails(res.data?.oneSite[0]);
      })
      .catch((e) => {
        setloading(false);
      });
  };

  useEffect(() => {
    GetDoctor();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(255,255,255,1)", "rgba(232,241,250,0.5)"]}
        style={gradient}
      />

      <ScrollView>
        <Header title="My Therapist" />
        <View style={{ marginHorizontal: 20 }}>
          <View style={styles.box}>
            <Image
              source={require("../../../assets/icons/user-doctor.png")}
              style={{
                height: 135,
                resizeMode: "contain",
                justifyContent: "center",
                position: "absolute",
                right: 10,
                zIndex: 0,
                width: 125,
              }}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                lineHeight: 24,
                color: colors.textClr,
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
                source={
                  doctor?.avatar
                    ? { uri: doctor?.avatar }
                    : require("../../../assets/images/user.png")
                }
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
                    textTransform: "uppercase",
                  }}
                >
                  DR. {doctor?.name}
                </Text>
                <Text style={styles.remainingText}>{doctor?.email}</Text>
                <Text style={styles.remainingText}>{doctor?.mobile}</Text>
              </View>
            </View>
          </View>

          <View style={styles.box}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                lineHeight: 24,
                color: colors.textClr,
                textTransform: "uppercase",
              }}
            >
              Site Details
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
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
                  {siteDetails?.site_name}
                </Text>
                <Text style={styles.remainingText}>{siteDetails?.email}</Text>
                <Text style={styles.remainingText}>{siteDetails?.mobile}</Text>
                <Text style={styles.remainingText}>{siteDetails?.address}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyDoctor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgClr,
    paddingTop: "10%",
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 30,
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
});
