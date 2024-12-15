import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import MoreButton from '@/components/MoreButton'

const Layout = () => {
  return (
<Stack screenOptions={{headerShadowVisible:false,contentStyle:{backgroundColor:Colors.background}}}>
  <Stack.Screen name='index' options={{
    title : "Today",
    headerLargeTitle :true,
    headerRight : ()=><MoreButton pageName='Today' />
  }}/>

</Stack>
  )
}

export default Layout