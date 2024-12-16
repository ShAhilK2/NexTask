import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
import { router, Stack, useNavigationContainerRef, usePathname, useRouter, useSegments } from 'expo-router';
import { tokenCache } from "@/utilis/cache";
import { Colors } from '@/constants/Colors';
import { Suspense, useEffect } from 'react';
import { ActivityIndicator, LogBox } from 'react-native';
import { View } from 'react-native';
import {GestureHandlerRootView} from "react-native-gesture-handler"
import  {Toaster} from "sonner-native"
import {openDatabaseSync, SQLiteProvider} from "expo-sqlite"
import React from 'react';
import { todos } from '@/db/schema';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import {useMigrations} from "drizzle-orm/expo-sqlite/migrator";
import migrations from '../drizzle/migrations';
import { addDummyData } from '@/utilis/addDummyData';
import 'text-encoding';

import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import * as Sentry from '@sentry/react-native'; //Only in native builds ,not n expo Go 


const navigattionIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay:true,
})
Sentry.init({
  dsn: 'https://71d5bd95ce33e66c7b9c99446679fd4d@o4507033311379456.ingest.us.sentry.io/4508476632465408',
  enableSpotlight: __DEV__,
  attachScreenshot : true,
  tracesSampleRate:1.0,
  _experiments: {
    profilesSampleRate:1.0,
    replaysSessionSampleRate: 1.0, // Change in Production 
    replaysOnErrorSampleRate: 1.0,

  },
  integrations: [Sentry.mobileReplayIntegration({
    maskAllImages : false,
    maskAllText:false,
    maskAllVectors:false
  }),
navigattionIntegration,
Sentry.spotlightIntegration()
],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // enableSpotlight: __DEV__,
});
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

function RootLayout() {
  const ref = useNavigationContainerRef();
  useEffect(()=>{
    navigattionIntegration.registerNavigationContainer(ref);
  },[ref])

  const expoDB = openDatabaseSync('todos');
  const db = drizzle(expoDB);

  const {success,error} = useMigrations(db,migrations);
  console.log('RootLayout - error',error);
  console.log('RootLayout - success',success);

  useEffect(()=>{
    if(!success) return;
    addDummyData(db);

  },[success])

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <Suspense fallback={<Loading />}>

        <SQLiteProvider databaseName='todos'>
        <GestureHandlerRootView style={{flex:1}}>
          <Toaster /> 
          <InitialLayout />
        </GestureHandlerRootView>
        </SQLiteProvider>
        </Suspense>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

function Loading(){
  return <ActivityIndicator size="large" color={Colors.primary} />
}


export default Sentry.wrap(RootLayout);