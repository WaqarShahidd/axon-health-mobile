import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, gradient } from "../../theme/theme";
import DetailScreenHeader from "../../components/DetailScreenHeader";
import CustomBtn from "../../components/CustomBtn";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const PrivacyPolicy = () => {
  const navigation = useNavigation();
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
        title="Privacy Policy"
        marginH
        backPress={() => navigation.goBack()}
        noMoreOption={false}
      />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, paddingHorizontal: 20, marginVertical: 30 }}
      >
        <Text style={styles.text}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </Text>
        <Text style={styles.text}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32.
        </Text>
        <Text style={styles.text}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32.
        </Text>
      </ScrollView>

      <LinearGradient
        style={{
          height: "20%",
          width: "100%",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.8)"]}
        locations={[0, 0.3]}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          margin: 20,
          backgroundColor: "transparent",
          width: "90%",
        }}
      >
        <CustomBtn text="I agree" />
      </View>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: "400",
    fontFamily: "FiraSans-R",
    lineHeight: 18,
    color: colors.textClr,
  },
});
