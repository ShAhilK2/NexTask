import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Todo } from "@/types/interfaces";
import { Link } from "expo-router";

import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Colors } from "@/constants/Colors";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import { todos } from "@/db/schema";
interface TaskRowProps {
  task: Todo;
}
const TaskRow = ({ task }: TaskRowProps) => {

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  const markAsCompleted = async()=>{
    console.log('markAsCompleted' + task.id);
   await drizzleDb.update(todos).set({completed:1,date_completed:Date.now()}).where(eq(todos.id,task.id));

  }
  return (
    <View>
      <Link href={`/task/${task.id}`} style={styles.container} asChild>
      <TouchableOpacity>
        <View style={styles.row}>
<BouncyCheckbox size={25} textContainerStyle={{display:"none"}}
fillColor={task.project_color}
unFillColor="#fff"
isChecked={task.completed === 1}
onPress={markAsCompleted}/>

      <Text style={styles.name}>{task.name}</Text>
      
        </View>
        <Text style={styles.projectName}>
          {task.project_name}
        </Text>
      </TouchableOpacity>
      </Link>

    </View>
  );
};

export default TaskRow;

const styles = StyleSheet.create({
  container :{
    padding:14,
    backgroundColor:'#fff',
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderBottomColor:Colors.lightBorder
  },row:{
    flexDirection:"row",
    alignItems:"flex-start",
    gap:10
  },name:{
    fontSize:16,
    flex:1
  },projectName:{
    alignSelf:"flex-end",
    marginTop:14,
    fontSize:12,
    color:Colors.dark
  }
});
