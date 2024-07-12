import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    FiraSansRegular: require("../../assets/fonts/FiraSans-Regular.ttf"),
    FiraSansBold: require("../../assets/fonts/FiraSans-Bold.ttf"),
  });
