import { WebView } from 'react-native-webview';
// import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';


const PDFViewer = ({route}) => {
    const { source } = route.params;
    console.log(source);
    return (
      <WebView
      style={styles.container}
      originWhitelist={['*']}

              source={{ uri: source }}
      />
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   marginTop: Constants.statusBarHeight,
    },
  });
 export default PDFViewer;