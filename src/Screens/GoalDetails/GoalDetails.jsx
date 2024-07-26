import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import {
  FontAwesome6,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import CustomBtn from "../../components/CustomBtn";
import DetailScreenHeader from "../../components/DetailScreenHeader";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import RadioBtn from "../../components/RadioBtn";
import { useNavigation } from "@react-navigation/native";

const GoalDetails = ({ route }) => {
  const { id, type } = route.params;
  const [loading, setloading] = useState(false);
  const [activityDetail, setActivityDetail] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();

  const GetPatientActivityDetail = async (e) => {
    setloading(true);
    await axios
      .get(`${BASE_URL}/activity/getActivityDetails?activityId=${id}`, {
        withCredentials: true,
      })
      .then(async (res) => {
        setloading(false);
        setActivityDetail(res.data.activitySite);
      })
      .catch((e) => {
        console.log(e);

        setloading(false);
      });
  };
  const GetPatientFormDetail = async (e) => {
    setloading(true);
    await axios
      .get(`${BASE_URL}/form/getFormDetails?formId=${id}`, {
        withCredentials: true,
      })
      .then(async (res) => {
        setloading(false);
        console.log(res?.data?.allForm);
        setActivityDetail(res?.data?.allForm[0]);
      })
      .catch((e) => {
        setloading(false);
      });
  };
  useEffect(() => {
    if (
      route?.params?.type === "Daily Activity" ||
      route?.params?.type === "Daily Check-In Questions"
    ) {
      GetPatientActivityDetail();
    } else if (route?.params?.type === "Form") {
      GetPatientFormDetail();
    }
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <LinearGradient
        colors={["rgba(255,255,255,1)", "rgba(232,241,250,0.5)"]}
        style={styles.gradient}
      />
      <DetailScreenHeader
        title="Activity Details"
        backPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {(type === "Daily Activity" || "Daily Check-In Questions") && (
          <>
            <Text style={styles.goalText}>{activityDetail?.activityName}</Text>
            <View style={styles.inputContainer}>
              <RadioBtn
                options={activityDetail?.options}
                selectedOption={selectedOption}
                onSelect={(option) => setSelectedOption(option)}
              ></RadioBtn>
            </View>
          </>
        )}

        {type === "Form" && (
          <>
            <Text style={styles.formText}>{activityDetail?.form_name}</Text>
            {activityDetail?.questions?.map((question, index) => {
              return (
                <>
                  <Text style={styles.questions}>
                    {index + 1}: {question?.question}
                  </Text>
                  <View style={styles.inputContainer}>
                    <RadioBtn
                      options={question?.answers}
                      selectedOption={selectedOption}
                      onSelect={(option) => setSelectedOption(option)}
                    ></RadioBtn>
                  </View>
                </>
              );
            })}
          </>
        )}
      </ScrollView>
      {!route?.params?.completed && (
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: 20,
          }}
        >
          <CustomBtn
            text="Mark Goal Completed"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgClr,
    paddingTop: "10%",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  gradient: {
    height: 225,
    width: 225,
    position: "absolute",
    top: -50,
    borderRadius: 360,
    right: -50,
  },
  formText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textClr,
    marginTop: -40,
  },

  goalText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textClr,
    marginTop: 40,
    // fontFamily: "FiraSans_700Bold",
  },
  questions: {
    fontSize: 16,

    color: colors.textClr,
    marginTop: 20,
    // fontFamily: "FiraSans_700Bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EBEFF5",
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 120,
    paddingHorizontal: 10,
    paddingTop: 10,
    fontSize: 16,
    fontWeight: "600",
    // fontFamily: "FiraSans_400Regular",
  },
  icon: {
    paddingTop: 10,
    paddingLeft: 0,
    alignSelf: "flex-start",
  },
});

export default GoalDetails;
