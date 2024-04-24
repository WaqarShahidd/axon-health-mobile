import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { colors } from "../theme/theme";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

const MoreModal = ({ modalVisible, setModalVisible }) => {
  const navigation = useNavigation();

  const moreOptions = [
    {
      id: 1,
      title: "Daily Check-Ins",
      icon: require("../../assets/icons/check-in.png"),
    },
    {
      id: 2,
      title: "Activities",
      icon: require("../../assets/icons/activities.png"),
    },
    {
      id: 3,
      title: "Assessment Forms",
      icon: require("../../assets/icons/forms.png"),
    },
    {
      id: 4,
      title: "Settings",
      icon: require("../../assets/icons/settings.png"),
    },
    {
      id: 5,
      title: "Help",
      icon: require("../../assets/icons/help.png"),
    },
    {
      id: 6,
      title: "Privacy Policy",
      icon: require("../../assets/icons/forms.png"),
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
              fontFamily: "FiraSans-Bold",
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
              fontFamily: "FiraSans-R",
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
        <View style={{ backgroundColor: "white", height: "50%" }}>
          <ScrollView
            ref={scrollViewRef}
            onScroll={handleOnScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View style={{ marginVertical: 10 }}>
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
                    } else if (item.title === "Settings") {
                      navigation.navigate("Settings");
                    } else if (item.title === "Help") {
                      navigation.navigate("Help");
                    } else if (item.title === "Activities") {
                      navigation.navigate("Activities");
                    } else if (item.title === "Assessment Forms") {
                      navigation.navigate("AssesmentForms");
                    } else if (item.title === "Daily Check-Ins") {
                      navigation.navigate("CheckIn");
                    }
                    setModalVisible(false);
                  }}
                >
                  <Image source={item.icon} style={{ height: 25, width: 25 }} />
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "FiraSans-R",
                      color: colors.textClr,
                      marginLeft: 10,
                    }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default MoreModal;

const styles = StyleSheet.create({});
