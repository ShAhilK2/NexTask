import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { Colors, DEFAULT_PROJECT_COLOR } from '@/constants/Colors';
import { projects } from '@/db/schema';
import { useSQLiteContext } from 'expo-sqlite';
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useHeaderHeight } from '@react-navigation/elements';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMMKVString } from 'react-native-mmkv';

const Page = () => {
    const [projectName, setProjectName] = useState('');
    const [refreshKey, setRefreshKey] = useState(0); // State to force refresh
    const router = useRouter();
    const [selectedColor, setSelectedColor] = useMMKVString('selectedColor');
    const color = selectedColor || DEFAULT_PROJECT_COLOR;

    const db = useSQLiteContext();
    const drizzleDb = drizzle(db);
    const headerHeight = useHeaderHeight();

    // Automatically listen for changes in the database
    const projectsData = useLiveQuery(drizzleDb.select().from(projects), [refreshKey]);

    console.log('Projects Data:', projectsData);

    const onCreateProject = async () => {
        if (!projectName) return;

        try {
            // Insert project into database
            await drizzleDb.insert(projects).values({
                name: projectName,
                color: color,
            });

            console.log('Project inserted successfully!');

            // Trigger a re-fetch to re-render the UI
            setRefreshKey((prev) => prev + 1);

            // Reset color and navigate back
            setSelectedColor(DEFAULT_PROJECT_COLOR);
            router.back();
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    };

    return (
        <View style={{ marginTop: headerHeight }}>
            <Stack.Screen
                options={{
                    headerRight: () => (
                        <TouchableOpacity onPress={onCreateProject} disabled={projectName.length === 0}>
                            <Text style={projectName.length === 0 ? styles.btnTextDisabled : styles.btnText}>
                                Create
                            </Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <View style={styles.container}>
                <TextInput
                    placeholder="Name"
                    value={projectName}
                    onChangeText={setProjectName}
                    style={styles.input}
                    autoFocus
                />
                <TouchableOpacity style={styles.btnItem} onPress={() => router.push('/browse/new-project/color-select')}>
                    <Ionicons name="color-palette-outline" size={24} color={Colors.dark} />
                    <Text style={styles.btnItemText}>Color</Text>
                    <View style={[styles.colorPreview, { backgroundColor: color }]} />
                    <Ionicons name="chevron-forward" size={22} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Page;

const styles = StyleSheet.create({
    btnText: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.primary,
    },
    btnTextDisabled: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.dark,
    },
    container: {
        marginHorizontal: 20,
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    input: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.lightBorder,
        padding: 12,
        fontSize: 16,
    },
    btnItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        gap: 12,
    },
    btnItemText: {
        fontSize: 16,
        flex: 1,
        fontWeight: '500',
    },
    colorPreview: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
});
