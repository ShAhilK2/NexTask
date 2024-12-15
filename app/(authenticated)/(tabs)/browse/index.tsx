import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'

const Page = () => {
    const {signOut}  =useAuth();
  return (
    <View>
        <Text>Page</Text>
        <Button  onPress={()=>signOut()} title='Sign Out'/>
    
    </View>
  )
}

export default Page