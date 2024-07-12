import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../theme/theme";

const GoalCards = ({ title, cardData }) => {
  const [collapsed, setCollapsed] = useState(false);
  const collapseAnimation = useRef(new Animated.Value(1)).current;

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    Animated.timing(collapseAnimation, {
      toValue: collapsed ? 1 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const animatedStyles = {
    height: collapseAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 500],
    }),
  };

  return (
    <>
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
          <TouchableOpacity
            onPress={toggleCollapse}
            style={styles.collapseButton}
          >
            <Text style={styles.collapseButtonText}>Collapse</Text>
            <Entypo name="chevron-down" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View style={[styles.container, animatedStyles]}>
        {/* White Box */}
        {cardData?.map(
          (card, index) =>
            card?.title === title && (
              <View style={styles.box}>
                <Text style={styles.boxText}>{card?.cardText}</Text>
                <Text style={styles.remainingText}>2 remaining today</Text>
              </View>
            )
        )}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
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
  container: {
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

export default GoalCards;
