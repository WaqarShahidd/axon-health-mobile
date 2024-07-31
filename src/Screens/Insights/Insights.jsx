import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { colors, gradient } from "../../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/Header";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const Insights = () => {
  const data = [
    {
      name: "Completed",
      population: 5,
      color: "#F1F2F4",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Uncomplete",
      population: 10,
      color: "#138418",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
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
  };

  const renderItem = () => {
    return (
      <>
        <View style={styles.chartContainer}>
          <Text style={styles.chartHeader}>Daily Check-Ins Questions: </Text>
          <PieChart
            data={data}
            width={screenWidth * 1.5}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            absolute
            hasLegend={false}
          />
          <View style={styles.legendContainer}>
            {data.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={[
                    styles.legend,
                    {
                      backgroundColor:
                        item.name === "Completed" ? "#138418" : "#F1F2F4",
                    },
                  ]}
                />
                <Text onPress={() => console.log(item?.color)}>
                  {item.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.chartContainer}>
          <Text style={styles.chartHeader}>Daily Activities: </Text>
          <PieChart
            data={data}
            width={screenWidth * 1.5}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            absolute
            hasLegend={false}
          />
          <View style={styles.legendContainer}>
            {data.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={[
                    styles.legend,
                    {
                      backgroundColor: item.color,
                    },
                  ]}
                />
                <Text>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.chartContainer}>
          <Text style={styles.chartHeader}>Daily Assessment Forms: </Text>
          <PieChart
            data={data}
            width={screenWidth * 1.5}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            absolute
            hasLegend={false}
          />
          <View style={styles.legendContainer}>
            {data.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={[
                    styles.legend,
                    {
                      backgroundColor: item.color,
                    },
                  ]}
                />
                <Text>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </>
    );
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

      <ScrollView>
        <Header title="Your Insights" />

        {renderItem()}
      </ScrollView>
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
    marginHorizontal: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
    margin: 10,
    marginTop: 20,
    padding: 15,
  },
  chartHeader: {
    fontWeight: "bold",
    fontFamily: "FiraSans_700Bold",
    fontSize: 18,
    marginBottom: 10,
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
  legend: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
});
