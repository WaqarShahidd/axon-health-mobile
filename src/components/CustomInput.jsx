import {
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { colors } from "../theme/theme";

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
          height: value === "" ? 50 : 70,
          backgroundColor: "white",
          borderWidth: focus ? 2 : 1,
          borderColor: focus ? colors.primary : "#59595A",
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
          {value !== "" && (
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
          )}
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
              paddingVertical: value === "" ? 0 : 8,
              paddingTop: value === "" ? 0 : 20,
            }}
          />
        </>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
