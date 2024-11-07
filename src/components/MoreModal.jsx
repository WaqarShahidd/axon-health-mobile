import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { colors } from "../theme/theme";
import Modal from "react-native-modal";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { clearUserData } from "../redux/dispatchers/user.dispatcher";

const MoreModal = ({ modalVisible, setModalVisible }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const moreOptions = [
    // {
    //   id: 1,
    //   title: "Daily Check-Ins",
    //   icon: require("../../assets/icons/check-in.png"),
    // },
    // {
    //   id: 2,
    //   title: "Activities",
    //   icon: require("../../assets/icons/activities.png"),
    // },
    // {
    //   id: 3,
    //   title: "Assessment Forms",
    //   icon: require("../../assets/icons/forms.png"),
    // },
    // {
    //   id: 3,
    //   title: "Questions",
    //   icon: require("../../assets/icons/forms.png"),
    // },
    // {
    //   id: 1,
    //   title: "Settings",
    //   icon: require("../../assets/icons/settings.png"),
    // },
    // {
    //   id: 2,
    //   title: "Help",
    //   icon: require("../../assets/icons/help.png"),
    // },
    {
      id: 3,
      title: "Privacy Policy",
      icon: require("../../assets/icons/forms.png"),
    },
    {
      title: "Settings",
      icon: require("../../assets/icons/profile-o.png"),
    },
    {
      id: 5,
      title: "Logout",
    },
  ];

  const scrollViewRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(null);

  const handleOnScroll = (event) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const handleScrollTo = (p) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };

  return (
    <>
      {modalVisible ? (
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderTopWidth: 3,
            borderTopColor: colors.primary,
            paddingHorizontal: 20,
          }}
        >
          <Image
            source={require("../../assets/icons/more.png")}
            style={{ height: 28, width: 28 }}
          />
          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
              // fontFamily: "FiraSans_700Bold",
              color: colors.secondary,
              marginTop: 7.5,
            }}
          >
            More
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <Image
            source={require("../../assets/icons/more-o.png")}
            style={{ height: 28, width: 28 }}
          />
          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
              // fontFamily: "FiraSans_400Regular",
              color: colors.secondary,
              marginTop: 7.5,
            }}
          >
            More
          </Text>
        </TouchableOpacity>
      )}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        testID={"modal"}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection={["down"]}
        scrollTo={handleScrollTo}
        scrollOffset={scrollOffset}
        scrollOffsetMax={100}
        propagateSwipe={true}
        style={{
          justifyContent: "flex-end",
          margin: 0,
        }}
      >
        <View style={{ backgroundColor: "white", height: "40%" }}>
          <View style={{ marginVertical: 10 }}>
            <View
              style={{
                marginHorizontal: 20,
                marginVertical: 10,
                borderBottomWidth: 1,
                paddingBottom: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomColor: "#F7F8FA",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: colors.textClr,
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                More Options
              </Text>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 15,
                  backgroundColor: "#F7F8FA",
                }}
              >
                <MaterialIcons
                  name="close"
                  size={24}
                  color="black"
                  onPress={() => setModalVisible(false)}
                />
              </TouchableOpacity>
            </View>
            {moreOptions.map((item, index) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomColor: "#F7F8FA",
                  borderBottomWidth: 1,
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                }}
                key={index}
                onPress={() => {
                  if (item.title === "Privacy Policy") {
                    navigation.navigate("PrivacyPolicy");
                  } //else if (item.title === "Settings") {
                  //   navigation.navigate("Settings");
                  // }
                  else if (item.title === "Help") {
                    navigation.navigate("Help");
                  } else if (item.title === "Activities") {
                    navigation.navigate("Activities");
                  } else if (item.title === "Daily Check-Ins") {
                    navigation.navigate("CheckIn");
                  } else if (item.title === "Questions") {
                    navigation.navigate("Questions");
                  } else if (item.title === "Logout") {
                    dispatch(clearUserData());
                  } else if (item.title === "Settings") {
                    navigation.navigate("EditProfile");
                  }
                  setModalVisible(false);
                }}
              >
                {item.icon ? (
                  <Image source={item.icon} style={{ height: 25, width: 25 }} />
                ) : (
                  <MaterialIcons name="logout" size={24} color="red" />
                )}
                <Text
                  style={{
                    fontSize: 18,
                    // fontFamily: "FiraSans_400Regular",
                    color: colors.textClr,
                    marginLeft: 10,
                  }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* </ScrollView> */}
        </View>
      </Modal>
    </>
  );
};

export default MoreModal;

const styles = StyleSheet.create({});
