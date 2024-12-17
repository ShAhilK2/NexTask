import { View, Text, Button } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'


const Layout = () => {
    const router = useRouter();
  return (
    <Stack screenOptions={{headerShadowVisible:false,
    headerTintColor:Colors.primary,
    headerTitleStyle:{color:"#000"},
    contentStyle:{backgroundColor:Colors.backgroundAlt}
}}>
        <Stack.Screen name='index' options={{
            title:"New Project",
            headerTransparent:true,
            headerLeft : ()=>(<Button title="Cancel" color={Colors.primary} onPress={()=>router.dismiss()}/>)
        }}/>
        <Stack.Screen name='color-select' options={{
            title:"Color" ,
            headerTransparent:true
        }} />
    </Stack>
  )
}

export default Layout