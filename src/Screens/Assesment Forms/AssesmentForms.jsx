import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors, gradient } from "../../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/Header";
import { draftItemData } from "../../../assets/data/dummyData";
import { useNavigation } from "@react-navigation/native";

const toggleBtns = [
  { id: 1, text: "Active Assignments", value: "active" },
  { id: 2, text: "History Assignments", value: "history" },
];

const AssesmentForms = () => {
  const navigation = useNavigation();

  const [selectedButton, setSelectedButton] = useState("active");

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

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Header title="Today’s Assessment" />
        <View
          style={{
            marginTop: 20,
          }}
        >
          {/* Assignment */}
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

          {/* Draft Items */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={draftItemData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("FormView")}
                style={{
                  width: 120,
                  height: 125,
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  marginVertical: 10,
                  marginHorizontal: 5,
                  padding: 12,
                  marginLeft: index === 0 ? 20 : 10,
                }}
              >
                <Image
                  source={item.image}
                  style={{ height: 42, width: 42, marginBottom: 5 }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "FiraSans-R",
                    color: colors.secondary,
                  }}
                  ellipsizeMode="tail"
                  numberOfLines={2}
                >
                  {item.text}
                </Text>
              </TouchableOpacity>
            )}
          />

          {/* All Items */}
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "FiraSans-Bold",
                  color: colors.textClr,
                }}
              >
                All Items ({draftItemData.length})
              </Text>
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 14,
                  fontFamily: "FiraSans-R",
                }}
              >
                See All
              </Text>
            </View>

            {draftItemData.map((item, index) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                  borderBottomColor: colors.borderClr,
                  borderBottomWidth: 1,
                  paddingBottom: 20,
                }}
                key={index}
              >
                <Image
                  source={item.image}
                  style={{ height: 42, width: 42, marginRight: 10 }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "FiraSans-R",
                    color: colors.textClr,
                    maxWidth: "80%",
                  }}
                >
                  {item.text}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AssesmentForms;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.borderClr,
    borderRadius: 12,
    padding: 2,
    marginHorizontal: 20,
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
    fontFamily: "FiraSans-R",
    color: colors.lightText,
    fontWeight: "400",
  },
  selectedButtonText: {
    fontSize: 14,
    fontFamily: "FiraSans-Bold",
    color: colors.textClr,
    fontWeight: "800",
  },
});
