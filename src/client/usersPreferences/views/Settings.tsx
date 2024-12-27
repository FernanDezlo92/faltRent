import React, { useState, useEffect } from 'react';
import { getUserPreferences } from '../api/userPreferenceApi';
import { useRoute } from '@react-navigation/native';
import User from '../../../server/users/entity';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import OwnerSettings from '../components/OwnerSettings';
import SeekerSettings from '../components/SeekerSettings';
import * as Location from 'expo-location';

const Settings = () => {
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('');
    const [gpsLocation, setGpsLocation] = useState('');
    const [searchRange, setSearchRange] = useState('');
    const [pets, setPets] = useState('');
    const route = useRoute();
    const { user } = route.params as { user: User };

    useEffect(() => {
        const fetchPreferences = async () => {
            const { data } = await getUserPreferences(user.id);
            if (data) {
                setRole(data.role || '');
                setLocation(data.location || '');
                setSearchRange(data.search_range || '');
            }
        };

        const fetchLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permiso denegado', 'Se necesita acceso a la ubicación para continuar.');
                    return;
                }

                const loc = await Location.getCurrentPositionAsync({});
                setGpsLocation(`${loc.coords.latitude}, ${loc.coords.longitude}`);
            } catch (error) {
                Alert.alert('Error', 'No se pudo obtener la ubicación del dispositivo.');
            }
        };

        fetchPreferences();
        fetchLocation();
    }, [user]);

    const handleSave = async () => {
        const finalLocation = location || gpsLocation;
        alert(`Preferencias guardadas: Rol: ${role}, Ubicación: ${finalLocation}, Rango: ${searchRange}`);
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

            {role === 'propietario' && (
                <OwnerSettings
                    location={location}
                    setLocation={setLocation}
                    searchRange={searchRange}
                    setSearchRange={setSearchRange}
                    pets={pets}
                    setPets={setPets}
                />
            )}
            {role === 'buscador' && (
                <SeekerSettings
                    location={location}
                    setLocation={setLocation}
                    searchRange={searchRange}
                    setSearchRange={setSearchRange}
                    pets={pets}
                    setPets={setPets}
                />
            )}

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
