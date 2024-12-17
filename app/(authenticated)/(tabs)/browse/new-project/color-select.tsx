
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, PROJECT_COLORS } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMMKVString } from 'react-native-mmkv';

const ColorSelect = () => {
    const [selected, setSelected] = useMMKVString('selectedColor') || DEFAULT_PROJECT_COLOR;
    const router = useRouter();
    const headerHeight = useHeaderHeight();

    const onColorSelect = (color: string) => {
        setSelected(color);
        router.back(); // Navigate back after selection
    };

    return (
        <View style={[styles.container, { marginTop: headerHeight }]}>
            {PROJECT_COLORS.map((color) => (
                <TouchableOpacity
                    key={color}
                    style={[styles.colorCircle, { backgroundColor: color }]}
                    onPress={() => onColorSelect(color)}
                >
                    {selected === color && <Ionicons name="checkmark" size={24} color="#fff" />}
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default ColorSelect;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 10,
    },
    colorCircle: {
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
});
