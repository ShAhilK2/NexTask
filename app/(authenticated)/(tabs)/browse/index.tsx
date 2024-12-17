import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { projects } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Fab from '@/components/Fab';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { FlatList } from 'react-native-gesture-handler';
import * as ContextMenu from 'zeego/context-menu';

const Page = () => {
  const { signOut } = useAuth();
  const router = useRouter();
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);

  const [refreshKey, setRefreshKey] = useState(0); // State to force re-render

  // Re-fetch data whenever refreshKey changes
  const { data } = useLiveQuery(drizzleDb.select().from(projects), [refreshKey]);

  // Delete Project and refresh list
  const onDeleteProject = async (id: number) => {
    await drizzleDb.delete(projects).where(eq(projects.id, id));
    
    setRefreshKey((prev) => prev + 1); // Trigger a re-fetch
  };

  const isPro = true;

  const onNewProject = async () => {
    if (data.length >= 5 && !isPro) {
      // Go Pro logic here
    } else {
      router.push('/browse/new-project');
    }
  };

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>My Projects</Text>
          <TouchableOpacity onPress={onNewProject}>
            <Ionicons name="add" size={24} color={Colors.dark} />
          </TouchableOpacity>
        </View>

        {/* Project List */}
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ContextMenu.Root>
              <ContextMenu.Trigger>
                <TouchableOpacity style={styles.projectButton}>
                  <Text style={{ color: item.color }}>#</Text>
                  <Text style={styles.projectButtonText}>{item.name}</Text>
                </TouchableOpacity>
              </ContextMenu.Trigger>
              <ContextMenu.Content>
                <ContextMenu.Item
                  key="delete"
                  onSelect={() => onDeleteProject(item.id)}
                >
                  <ContextMenu.ItemTitle>Delete</ContextMenu.ItemTitle>
                  <ContextMenu.ItemIcon
                    ios={{
                      name: 'trash',
                      pointSize: 18,
                    }}
                  />
                </ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu.Root>
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={
            <TouchableOpacity
              onPress={() => signOut()}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>Log Out</Text>
            </TouchableOpacity>
          }
        />
      </View>
      <Fab />
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
  },
  clearButton: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    color: Colors.primary,
    fontSize: 18,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.lightBorder,
  },
  projectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    gap: 14,
    padding: 14,
  },
  projectButtonText: {
    fontSize: 16,
  },
});
