import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import CustomBtn from "../../components/CustomBtn";
import DetailScreenHeader from "../../components/DetailScreenHeader";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import RadioBtn from "../../components/RadioBtn";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import { useSelector } from "react-redux";

const FormOptions = ({ question, setAnswers, index, patientFormId }) => {
  const [selectedOption, setSelectedOption] = useState(
    question?.patient_form_answer?.answer || null
  );

  return (
    <React.Fragment key={index}>
      <Text style={styles.questions}>
        {index + 1}: {question?.question}
      </Text>
      <View style={styles.inputContainer}>
        <RadioBtn
          options={question?.answers}
          selectedOption={selectedOption}
          onSelect={(option) => {
            setSelectedOption(option);
            setAnswers((prev) => [
              ...prev,
              {
                questionId: question?.id,
                answer: option,
                formId: question?.formId,
                patientFormId: patientFormId,
              },
            ]);
          }}
        />
      </View>
    </React.Fragment>
  );
};

const GoalDetails = ({ route }) => {
  const { id, type, patientActivityId } = route.params;
  const { userData } = useSelector((state) => state.user);
  const navigation = useNavigation();

  const [loading, setloading] = useState(false);
  const [activityDetail, setActivityDetail] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const [answers, setAnswers] = useState([]);

  const GetPatientActivityDetail = async (e) => {
    console.log("GetPatientActivityDetail");
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

  const GetPatientFormDetail = async () => {
    setloading(true);
    await axios
      .get(
        `${BASE_URL}/form/getFormDetailsForPatient?formId=${id}&patientFormId=${patientActivityId}`,
        {
          withCredentials: true,
        }
      )
      .then(async (res) => {
        setloading(false);
        setActivityDetail(res?.data?.allForm[0]);
      })
      .catch((e) => {
        console.log(e);
        setloading(false);
      });
  };

  const PostAnswer = async () => {
    setloading(true);
    await axios
      .post(
        `${BASE_URL}/patient_form/setPatientFormAnswers`,
        {
          patientFormAnswer: answers,
          status: "completed",
        },
        {
          withCredentials: true,
        }
      )
      .then(async (res) => {
        setloading(false);
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e, "post answer error");
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

  const activtyOptions = ["Yes", "No"];

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <LinearGradient
        colors={["rgba(255,255,255,1)", "rgba(232,241,250,0.5)"]}
        style={styles.gradient}
      />
      <Spinner visible={loading} />
      <DetailScreenHeader
        title="Activity Details"
        backPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {(type === "Daily Activity" || "Daily Check-In Questions") && (
          <>
            <Text style={styles.goalText}>{activityDetail?.activityName}</Text>
            <View style={styles.inputContainer}>
              {type === "Daily Activity" ? (
                <RadioBtn
                  options={activtyOptions}
                  selectedOption={selectedOption}
                  onSelect={(option) => setSelectedOption(option)}
                />
              ) : (
                <RadioBtn
                  options={activityDetail?.options}
                  selectedOption={selectedOption}
                  onSelect={(option) => setSelectedOption(option)}
                />
              )}
            </View>
          </>
        )}

        {type === "Form" && (
          <>
            <Text style={styles.formText}>{activityDetail?.form_name}</Text>
            {activityDetail?.questions?.map((question, index) => {
              return (
                <FormOptions
                  question={question}
                  setAnswers={setAnswers}
                  index={index}
                  patientFormId={patientActivityId}
                />
              );
            })}
          </>
        )}
      </ScrollView>
      {!route?.params?.completed && (
        <View
          style={{
            justifyContent: "flex-end",
            marginBottom: 20,
          }}
        >
          <CustomBtn
            text="Mark Goal Completed"
            onPress={() => {
              if (answers.length > 0) {
                PostAnswer();
              }
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
