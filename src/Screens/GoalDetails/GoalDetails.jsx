import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "../../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import {
  FontAwesome6,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import CustomBtn from "../../components/CustomBtn";
import DetailScreenHeader from "../../components/DetailScreenHeader";

const GoalDetails = () => {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <LinearGradient
        colors={["rgba(255,255,255,1)", "rgba(232,241,250,0.5)"]}
        style={styles.gradient}
      />

      <DetailScreenHeader title="Goal Details" />

      <Text style={styles.goalText}>
        Connect with someone in recovery on an emotional level
      </Text>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="note-outline"
          size={20}
          color={colors.textClr}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Note"
          multiline={true}
          placeholderTextColor={colors.textClr}
          numberOfLines={4}
          borderRadius={12}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          marginBottom: 20,
        }}
      >
        <CustomBtn text="Mark Goal Completed" />
      </View>
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

  goalText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textClr,
    marginTop: 40,
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
