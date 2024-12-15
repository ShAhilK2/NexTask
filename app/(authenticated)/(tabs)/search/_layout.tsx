import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

import MoreButton from '@/components/MoreButton'
import { Colors } from '@/constants/Colors'

const Layout = () => {
  return (
<Stack screenOptions={{headerShadowVisible:false,contentStyle:{backgroundColor:Colors.background}}}>
  <Stack.Screen name='index' options={{
    title : "Search",
    headerLargeTitle :true,
    headerSearchBarOptions :{
      placeholder : 'Tasks, Projects, and More',
      tintColor : Colors.primary
    }
  }}/>

</Stack>
  )
}

export default Layout