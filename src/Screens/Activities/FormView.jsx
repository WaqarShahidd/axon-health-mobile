import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors, gradient } from "../../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import DetailScreenHeader from "../../components/DetailScreenHeader";
import { CustomInput, CustomTextArea } from "../../components/CustomInput";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CustomBtn from "../../components/CustomBtn";
import { Button, Divider, Menu, Snackbar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

const FormView = () => {
  const navigation = useNavigation();

  const [name, setname] = useState("");
  const [message, setmessage] = useState("");

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const containerWidth = Dimensions.get("window").width;

  const [snackbarVisible, setsnackbarVisible] = React.useState(false);

  const onToggleSnackBar = () => {
    setsnackbarVisible(!snackbarVisible);
    closeMenu();
  };

  const onDismissSnackBar = () => setsnackbarVisible(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bgClr,
        paddingTop: "15%",
      }}
    >
      <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        style={{ backgroundColor: "#fff" }}
        wrapperStyle={{
          zIndex: 99999,
          top: "10%",
          height: "15%",
          color: colors.secondary,
          shadowColor: "#676E76",
          shadowOffset: {
            width: 5,
            height: 5,
          },
          shadowOpacity: 0.5,
          shadowRadius: 10,
        }}
        elevation={10}
        duration={200000}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ color: colors.secondary }}>
            Form has been downloaded successfully!
          </Text>
          <TouchableOpacity
            style={{
              borderRadius: 360,
              height: 30,
              width: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={onDismissSnackBar}
          >
            <AntDesign name="close" size={20} color={colors.secondary} />
          </TouchableOpacity>
        </View>
      </Snackbar>
      <LinearGradient
        colors={["rgba(255,255,255,1)", "rgba(232,241,250,0.5)"]}
        style={gradient}
      />
      <DetailScreenHeader
        title="Form View"
        marginH
        backPress={() => navigation.goBack()}
        moreOptionsFunc={openMenu}
      />

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={{ x: containerWidth - 26, y: 100 }}
        contentStyle={{
          backgroundColor: "#fff",
          width: 170,
        }}
      >
        <Menu.Item
          onPress={() => {}}
          title="Save Draft"
          style={{ backgroundColor: "white" }}
        />
        <Divider />
        <Menu.Item
          onPress={onToggleSnackBar}
          title="Download Form"
          style={{ backgroundColor: "white", maxWidth: "90%" }}
        />
      </Menu>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, paddingHorizontal: 20, marginVertical: 30 }}
      >
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../../assets/icons/pdf.png")}
              style={{
                height: 30,
                width: 30,
                marginRight: 10,
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                // fontFamily: "FiraSans_400Regular",
                color: colors.secondary,
                maxWidth: "80%",
              }}
            >
              How often have you been bothered by the following problems?
              [Feeling nervous, anxious or on edge.]{" "}
            </Text>
          </View>

          <View>
            <CustomInput
              placeholder="Name"
              value={name}
              setValue={setname}
              noCap={true}
              Icon={MaterialIcons}
              iconName="person-outline"
              borderColor="#EBEFF5"
            />

            <CustomTextArea
              placeholder="Message"
              value={message}
              setValue={setmessage}
              borderColor="#EBEFF5"
            />

            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                height: 150,
                width: "100%",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                borderWidth: 1,
                borderColor: "#EBEFF5",
                marginTop: 20,
              }}
            >
              <Image
                source={require("../../../assets/icons/upload.png")}
                style={{ height: 90, width: 90 }}
              />
              <View style={{ marginRight: 10 }}>
                <Text
                  style={{
                    color: colors.secondary,
                    fontSize: 16,
                    // fontFamily: "FiraSans_700Bold",
                  }}
                >
                  Upload Attachment
                </Text>
                <Text
                  style={{
                    color: colors.lightText,
                    fontSize: 12,
                    // fontFamily: "FiraSans_400Regular",
                    marginTop: 5,
                  }}
                >
                  or use the “Browse” button
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={{ justifyContent: "flex-end", margin: 20 }}>
        <CustomBtn text="Mark Activity Complete" />
      </View>
    </View>
  );
};

export default FormView;

const styles = StyleSheet.create({});
