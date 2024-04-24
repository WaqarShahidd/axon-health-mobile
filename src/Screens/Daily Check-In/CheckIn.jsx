import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors, gradient } from "../../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import DetailScreenHeader from "../../components/DetailScreenHeader";
import { useNavigation } from "@react-navigation/native";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { dailyCheckInData } from "../../../assets/data/dummyData";
import Modal from "react-native-modal";
import CustomBtn from "../../components/CustomBtn";

const CheckIn = () => {
  const navigation = useNavigation();

  const [dateModal, setdateModal] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bgClr,
        paddingTop: "15%",
      }}
    >
      <LinearGradient
        colors={["rgba(255,255,255,1)", "rgba(232,241,250,0.5)"]}
        style={gradient}
      />
      <DetailScreenHeader
        title="Daily Check-Ins"
        marginH
        backPress={() => navigation.goBack()}
        noMoreOption={false}
      />

      <FlatList
        data={dailyCheckInData}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginHorizontal: 20, marginTop: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setdateModal(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 15,
              borderBottomColor: "#E6E6E6",
              borderBottomWidth: 1,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather
                name="check-circle"
                size={24}
                color={item?.checked ? colors.primary : "#9EAFAD"}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: colors.secondary,
                  fontWeight: "600",
                  marginLeft: 5,
                }}
              >
                {item.text}
              </Text>
            </View>
            <FontAwesome6 name="arrow-right-long" size={24} color="#9eafad" />
          </TouchableOpacity>
        )}
      />

      <Modal
        isVisible={dateModal}
        onBackdropPress={() => setdateModal(false)}
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
                fontFamily: "FiraSans-Bold",
                color: colors.textClr,
              }}
            >
              Daily Check-Ins
            </Text>

            {/* <DropDownPicker
              items={items}
              defaultValue={selectedValue}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: "#fafafa" }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) => setSelectedValue(item.value)}
            /> */}
          </View>
          <View
            style={{ flex: 1, justifyContent: "flex-end", marginBottom: 20 }}
          >
            <CustomBtn text="Check-Ins" onPress={() => setdateModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CheckIn;

const styles = StyleSheet.create({});
