import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Fab from '@/components/Fab'
import { SQLiteDatabase, useSQLiteContext } from 'expo-sqlite'
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin'
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { todos } from '@/db/schema'

const Page = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  const {data} = useLiveQuery(drizzleDb.select().from(todos));
  console.log(`- Page -  data : `,data);
  useDrizzleStudio(db);

  

  return (
    <View style={styles.container}>
      <Fab />
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginBottom:82
  }
})


