
import { useOAuth } from "@clerk/clerk-expo";
import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { SafeAreaInsetsContext, useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from "@/constants/Colors";
import React from "react";


export default function Index() {
  const {startOAuthFlow}=useOAuth({strategy:'oauth_apple'});
  const {startOAuthFlow:googleOAuth}=useOAuth({strategy:'oauth_google'});

  const {top} = useSafeAreaInsets();


  const handleAppleOAuth = async()=>{
    try{
      const {createdSessionId,setActive} = await startOAuthFlow();
      console.log(`~ handleAppleOAuth ~ createdSessionId`,createdSessionId);

      if(createdSessionId){
        setActive!({session:createdSessionId,})
      }
      
    }catch(err){
      console.log(err);
    }
  }

  const handleGoogleOAuth = async()=>{
    try{
      const {createdSessionId,setActive} = await googleOAuth();
      console.log(`~handleGoogleOAuth  ~ createdSessionId`,createdSessionId);

      if(createdSessionId){
        setActive!({session:createdSessionId,})
      }
      
    }catch(err){
      console.log(err);
    }
  };

  const openLink = async()=>{
    WebBrowser.openBrowserAsync("https://github.com/ShAhilK2")
  }


  return (
    <View style={[styles.container],{paddingTop:top}}>
 <Image source={require("../assets/images/todoist-logo.png")} style={styles.loginImage}/>
 <Image source={require("../assets/images/login.png")} style={styles.bannerImage}/>


 <View style={styles.buttonContainer}>
 <TouchableOpacity onPress={handleAppleOAuth} style={styles.btn} >
  <Ionicons name="logo-apple" size={24} color="black"/>
  <Text style={styles.btnText}>Continue With Apple</Text>
</TouchableOpacity>
<TouchableOpacity onPress={handleGoogleOAuth} style={styles.btn} >
  <Ionicons name="logo-google" size={24} color="black"/>
  <Text style={styles.btnText}>Continue With Google</Text>
</TouchableOpacity>
<TouchableOpacity  style={styles.btn} >
  <Ionicons name="mail" size={24} color="black"/>
  <Text style={styles.btnText}>Continue With Email</Text>
</TouchableOpacity>

<Text style={styles.description}>
  By Continuing you agree to Todoist's {" "} 
  <Text style={styles.link} onPress={openLink}>Terms of Service </Text>
  {' '}and{' '}
  <Text style={styles.link} onPress={openLink}>Privacy Policy </Text>

</Text>
 </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    gap: 40,
    marginTop: 20,
  },
  loginImage: {
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  banner: {
    height: 280,
    resizeMode: 'contain',
  },
  title: {
    marginHorizontal: 50,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 20,
    marginHorizontal: 40,
  },
  btn: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 6,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.lightBorder,
    borderWidth: StyleSheet.hairlineWidth,
  },
  btnText: {
    fontSize: 20,
    fontWeight: '500',
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.lightText,
  },
  link: {
    color: Colors.lightText,
    fontSize: 12,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});