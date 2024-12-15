import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
import { router, Stack, usePathname, useRouter, useSegments } from 'expo-router';
import { tokenCache } from "@/utilis/cache";
import { Colors } from '@/constants/Colors';
import { useEffect } from 'react';
import { ActivityIndicator, LogBox } from 'react-native';
import { View } from 'react-native';
import {GestureHandlerRootView} from "react-native-gesture-handler"
import  {Toaster} from "sonner-native"

LogBox.ignoreLogs(['Clerk: Clerk has been loaded with development keys']);


const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  );
}

const InitialLayout = ()=>{
  const {isLoaded,isSignedIn} = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const pathName = usePathname();


  useEffect(()=>{
    if(!isLoaded) return;
    console.log('isLoaded',isLoaded);
    console.log('isSignedIn',isSignedIn);
    console.log('segments',segments);
    console.log('pathName',pathName);
    const inAuthGroup = segments[0] === '(authenticated)';

    if(isSignedIn && !inAuthGroup){
      router.replace('/(authenticated)/(tabs)/today')
    }else if(!isSignedIn && pathName !== '/'){ 
      router.replace("/")
    }
 
  
  },[isLoaded,isSignedIn]);

  if(!isLoaded){
    return <View style={{flex:1,justifyContent : "center",alignItems:"center"}}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  }

 
 

  return <Stack screenOptions={{headerShown:false,contentStyle:{backgroundColor:Colors.background}}}>
    <Stack.Screen name='index'/>
  </Stack>
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <GestureHandlerRootView style={{flex:1}}>
          <Toaster /> 
      <InitialLayout />
        </GestureHandlerRootView>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
