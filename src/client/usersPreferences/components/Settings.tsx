import React, { useState, useEffect } from 'react';
import { getUserPreferences } from '../api/userPreferenceApi';
import { useRoute } from '@react-navigation/native';
import User from '../../../server/users/entity';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const Settings = () => {
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('');
    const [searchRange, setSearchRange] = useState(10);
    const route = useRoute();
    const { user } = route.params as { user: User };

    useEffect(() => {
        const fetchPreferences = async () => {
            const { data } = await getUserPreferences(user.id);
            if (data) {
                setRole(data.role || '');
                setLocation(data.location || '');
                setSearchRange(data.search_range || 10);
            }
        };
        fetchPreferences();
    }, [user]);

    const handleSave = async () => {
        alert('Preferencias guardadas');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configuración Inicial</Text>
            <Picker
                selectedValue={role}
                onValueChange={(value) => setRole(value)}
                style={styles.input}
            >
                <Picker.Item label="Selecciona un rol" value="" />
                <Picker.Item label="Propietario" value="propietario" />
                <Picker.Item label="Buscador" value="buscador" />
            </Picker>
            <TextInput
                style={styles.input}
                placeholder="Introduce tu ubicación"
                value={location}
                onChangeText={setLocation}
            />
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Rango de búsqueda (km)"
                value={String(searchRange)}
                onChangeText={(text) => setSearchRange(Number(text))}
            />
            <Button title="Guardar" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
    },
});

export default Settings;