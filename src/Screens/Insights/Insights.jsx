import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/Header";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const Insights = () => {
  const data = [
    {
      name: "Completed",
      population: 5,
      color: "#138418",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Uncomplete",
      population: 10,
      color: "#F1F2F4",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

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
        style={{
          height: 225,
          width: 225,
          position: "absolute",
          top: -50,
          borderRadius: 360,
          right: -50,
        }}
      />

      <Header title="Your Insights" />

      <View
        style={{
          marginHorizontal: 20,
          borderRadius: 15,
          backgroundColor: "#fff",
          margin: 10,
          marginTop: 20,
          padding: 15,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontFamily: "FiraSans_700Bold",
            fontSize: 18,
            marginBottom: 10,
          }}
        >
          Daily Check-Ins:{" "}
        </Text>
        <PieChart
          data={data}
          width={screenWidth * 1.5}
          height={220}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          absolute
          hasLegend={false}
        />
        <View style={styles.legendContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: item.color,
                  borderRadius: 5,
                  marginRight: 5,
                }}
              />
              <Text>{item.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Insights;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgClr,
    paddingTop: "10%",
    alignItems: "center",
  },
  chartContainer: {
    borderRadius: 15,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
  },
  legendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
});
