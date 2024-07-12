import {
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { colors } from "../theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export const CustomInput = ({
  placeholder,
  value,
  setValue,
  type,
  defaultValue,
  multi,
  disable,
  noCap,
  Icon,
  iconName,
  borderColor,
}) => {
  const [focus, setfocus] = useState(false);

  const handleTextChange = (inputText) => {
    if (noCap) {
      setValue(inputText);
    } else {
      setValue(inputText);
    }
  };

  const [isFocused, setIsFocused] = useState(false);
  const translateY = useRef(
    new Animated.Value(value || defaultValue ? -20 : 0)
  ).current;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const movePlaceholderUp = () => {
    Animated.timing(translateY, {
      toValue: -20,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const movePlaceholderDown = () => {
    if (!value && !defaultValue) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          color: "#000",
          paddingHorizontal: 16,
          height: value === "" ? 50 : 50,
          backgroundColor: "white",
          borderWidth: focus ? 2 : 1,
          borderColor: focus
            ? colors.primary
            : borderColor
            ? borderColor
            : "#59595A",
          borderRadius: 7,
          shadowColor: "#3bb247",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: focus ? 0.175 : 0,
          shadowRadius: 8,
          elevation: 1,
          // textTransform: noCap ? "none" : "capitalize",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Icon name={iconName} size={20} color={colors.textClr} />
        <>
          {/* {value !== "" && (
            <Animated.Text
              style={{
                position: "absolute",
                left: 40,
                top: 10,
                //   top: translateY,
                backgroundColor: "transparent",
                paddingHorizontal: 0,
                zIndex: 1,
                // fontFamily: "FiraSans_700Bold",
                fontSize: 11,
                textTransform: "uppercase",
              }}
            >
              {placeholder}
            </Animated.Text>
          )} */}
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={"#000"}
            value={value}
            defaultValue={defaultValue}
            // multiline={multi && true}
            // numberOfLines={multi && 5}
            onFocus={() => {
              setfocus(true);
              movePlaceholderUp();
            }}
            onBlur={() => {
              setfocus(false);
              movePlaceholderDown();
            }}
            onChangeText={handleTextChange}
            keyboardType={type && type}
            editable={disable ? false : true}
            returnKeyLabel="Done"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            style={{
              width: "95%",
              height: "100%",
              marginLeft: 5,
              paddingVertical: value === "" ? 0 : 0,
              paddingTop: value === "" ? 0 : 0,
            }}
          />
        </>
      </View>
    </View>
  );
};

export const CustomPasswordInput = ({
  placeholder,
  value,
  setValue,
  type,
  defaultValue,
  disable,
  noCap,
  borderColor,
}) => {
  const [focus, setfocus] = useState(false);

  const handleTextChange = (inputText) => {
    if (noCap) {
      setValue(inputText);
    } else {
      setValue(inputText);
    }
  };

  const [isFocused, setIsFocused] = useState(false);
  const translateY = useRef(
    new Animated.Value(value || defaultValue ? -20 : 0)
  ).current;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const movePlaceholderUp = () => {
    Animated.timing(translateY, {
      toValue: -20,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const movePlaceholderDown = () => {
    if (!value && !defaultValue) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  };

  const [security, setSecurity] = useState(true);

  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          color: "#000",
          paddingHorizontal: 16,
          height: value === "" ? 50 : 50,
          backgroundColor: "white",
          borderWidth: focus ? 2 : 1,
          borderColor: focus
            ? colors.primary
            : borderColor
            ? borderColor
            : "#59595A",
          borderRadius: 7,
          shadowColor: "#3bb247",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: focus ? 0.175 : 0,
          shadowRadius: 8,
          elevation: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <MaterialIcons name={"password"} size={20} color={colors.textClr} />

        <>
          {/* {value !== "" && (
            <Animated.Text
              style={{
                position: "absolute",
                left: 40,
                top: 10,
                //   top: translateY,
                backgroundColor: "transparent",
                paddingHorizontal: 0,
                zIndex: 1,
                fontFamily: "FiraSans-Bold",
                fontSize: 11,
                textTransform: "uppercase",
              }}
            >
              {placeholder}
            </Animated.Text>
          )} */}
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={"#000"}
            value={value}
            defaultValue={defaultValue}
            secureTextEntry={security}
            onFocus={() => {
              setfocus(true);
              movePlaceholderUp();
            }}
            onBlur={() => {
              setfocus(false);
              movePlaceholderDown();
            }}
            onChangeText={handleTextChange}
            keyboardType={type && type}
            editable={disable ? false : true}
            returnKeyLabel="Done"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            style={{
              width: "85%",
              height: "100%",
              marginLeft: 5,
              paddingVertical: value === "" ? 0 : 0,
              paddingTop: value === "" ? 0 : 0,
            }}
          />
          <TouchableOpacity
            onPress={() => setSecurity(!security)}
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name={security ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="#BBBCC0"
            />
          </TouchableOpacity>
        </>
      </View>
    </View>
  );
};

export const CustomTextArea = ({
  placeholder,
  value,
  setValue,
  type,
  defaultValue,
  multi,
  disable,
  noCap,
  borderColor,
}) => {
  const [focus, setfocus] = useState(false);

  const handleTextChange = (inputText) => {
    if (noCap) {
      setValue(inputText);
    } else {
      setValue(inputText);
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"#000"}
        value={value}
        defaultValue={defaultValue}
        onFocus={() => {
          setfocus(true);
        }}
        onBlur={() => {
          setfocus(false);
        }}
        onChangeText={handleTextChange}
        keyboardType={type && type}
        editable={disable ? false : true}
        numberOfLines={10}
        multiline={true}
        returnKeyLabel="Done"
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
        style={{
          color: "#000",
          padding: 16,
          paddingTop: 16,
          height: 110,
          backgroundColor: "white",
          borderWidth: focus ? 2 : 1,
          borderColor: focus
            ? colors.primary
            : borderColor
            ? borderColor
            : "#59595A",
          borderRadius: 7,
          shadowColor: "#3bb247",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: focus ? 0.175 : 0,
          shadowRadius: 8,
          elevation: 1,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
