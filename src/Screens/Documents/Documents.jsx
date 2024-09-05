import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  PermissionsAndroid,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, gradient } from "../../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/Header";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import { useSelector } from "react-redux";
import * as FileSystem from "expo-file-system";
import * as Linking from "expo-linking";
import * as Sharing from "expo-sharing";
import Spinner from "react-native-loading-spinner-overlay";
import { Feather } from "@expo/vector-icons";

const Documents = () => {
  const { userData } = useSelector((state) => state.user);

  const [allDocuments, setAllDocuments] = useState([]);
  const [loading, setloading] = useState(false);

  const getAllDocuments = async (e) => {
    setloading(true);
    await axios
      .get(
        `${BASE_URL}/patient_document/getDocumentByPatientId?patientId=${userData?.id}`,
        {
          withCredentials: true,
        }
      )
      .then(async (res) => {
        setloading(false);
        setAllDocuments(res?.data?.allDocuments);
      })
      .catch((e) => {
        setloading(false);
      });
  };

  async function downloadFile(url, filename) {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert(
        "Permission Denied",
        "Cannot download the file without storage permission."
      );
      return;
    }
    try {
      // Define the file path
      const fileUri = `${FileSystem.documentDirectory}${filename}`;

      // Start the download
      //      console.log(url);
      const { uri } = await FileSystem.downloadAsync(url, fileUri);
      if (await Sharing.isAvailableAsync()) {
        // Share the file
        await Sharing.shareAsync(uri);
      } else {
        // Fallback: Try to open the file with an external app
        Alert.alert(
          "Sharing not available",
          "Opening the file with an external app."
        );
        await Linking.openURL(uri);
      }
      //   console.log(uri);

      //   const fileInfo = await FileSystem.getInfoAsync(uri);
      //   console.log(fileInfo);

      // if (fileInfo.exists) {
      //   await Linking.openURL(encodeURI(fileInfo.uri));
      // }
      // else{
      //   console.error('File does not exist at:', uri);
      //   Alert.alert('Download failed', 'File does not exist after download.');
      //   return;

      // }

      // const formattedUri = encodeURI(uri);
      // console.log(formattedUri);

      // const canOpen = await Linking.canOpenURL(formattedUri);
      // console.log(canOpen);

      // if (canOpen) {
      //   await Linking.openURL(formattedUri);
      // } else {
      //   console.error("Can't open URL:", formattedUri);
      //   Alert.alert('Open failed', 'Unable to open the file.');
      // }
    } catch (error) {
      // Handle errors
      console.error("Download error:", error);
      Alert.alert(
        "Download failed",
        "There was an error downloading the file."
      );
    }
  }

  async function requestStoragePermission() {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Required",
            message:
              "This app needs access to your storage to download and open files.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the storage");
          return true;
        } else {
          console.log("Storage permission denied");
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      // iOS or other platforms
      return true;
    }
  }

  useEffect(() => {
    getAllDocuments();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bgClr,
        paddingTop: "10%",
      }}
    >
      <Spinner visible={loading} />
      <LinearGradient
        colors={["rgba(255,255,255,1)", "rgba(232,241,250,0.5)"]}
        style={gradient}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Header title="Documents" />
        <View
          style={{
            marginTop: 20,
          }}
        >
          {/* Assignment */}
          {/* <View style={styles.btnContainer}>
            {toggleBtns.map((btn) => (
              <TouchableOpacity
                key={btn.id}
                style={
                  selectedButton === btn.value
                    ? styles.selectedButton
                    : styles.button
                }
                onPress={() => handleButtonPress(btn.value)}
              >
                <Text
                  style={
                    selectedButton === btn.value
                      ? styles.selectedButtonText
                      : styles.buttonText
                  }
                >
                  {btn.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View> */}

          {/* Draft Items */}
          {/* <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={allDocuments}
            contentContainerStyle={{ paddingRight: 20 }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  downloadFile(item.document_url, item.documentName)
                }
                style={{
                  width: 120,
                  height: 125,
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  marginVertical: 10,
                  marginHorizontal: 5,
                  padding: 12,
                  marginLeft: index === 0 ? 20 : 10,
                }}
              >
                <Image
                  source={require("../../../assets/icons/pdf.png")}
                  style={{ height: 42, width: 42, marginBottom: 5 }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    // fontFamily: "FiraSans_400Regular",
                    color: colors.secondary,
                  }}
                  ellipsizeMode="tail"
                  numberOfLines={2}
                >
                  {item.documentName}
                </Text>
              </TouchableOpacity>
            )}
          /> */}

          {/* All Items */}
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  // fontFamily: "FiraSans_700Bold",
                  color: colors.textClr,
                }}
              >
                All Items ({allDocuments.length})
              </Text>
              {/* <Text
                style={{
                  color: colors.primary,
                  fontSize: 14,
                  // fontFamily: "FiraSans_400Regular",
                }}
              >
                See All
              </Text> */}
            </View>

            {allDocuments?.map((item, index) => (
              <TouchableOpacity
              //onPress={() => navigation.navigate('PDFViewer', { source: item?.document_url })}

              onPress={() => 
                // <PDFViewer source={item.document_url} />
                 downloadFile(item?.document_url,item?.documentName)
                //console.log(item)
              }

                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 10,
                  borderBottomColor: colors.borderClr,
                  borderBottomWidth: 1,
                  paddingBottom: 20,
                }}
                key={index}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "90%",
                  }}
                >
                  <Image
                    source={require("../../../assets/icons/pdf.png")}
                    style={{ height: 42, width: 42, marginBottom: 5 }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      // fontFamily: "FiraSans_400Regular",
                      color: colors.textClr,
                      maxWidth: "80%",
                    }}
                  >
                    {item?.documentName}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    downloadFile(item.document_url, item.documentName)
                  }
                >
                  <Feather name="download" size={24} color="black" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Documents;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.borderClr,
    borderRadius: 12,
    padding: 2,
    marginHorizontal: 20,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingVertical: 15,
    borderRadius: 10,
  },
  selectedButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    // fontFamily: "FiraSans_400Regular",
    color: colors.lightText,
    fontWeight: "400",
  },
  selectedButtonText: {
    fontSize: 14,
    // fontFamily: "FiraSans_700Bold",
    color: colors.textClr,
    fontWeight: "800",
  },
  remainingText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#596066",
    marginTop: 10,
    // fontFamily: "FiraSans_400Regular",
  },
});
