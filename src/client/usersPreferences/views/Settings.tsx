import React, { useState, useEffect } from 'react';
import { getUserPreferences, savePreferences } from '../api/userPreferenceApi';
import { useRoute } from '@react-navigation/native';
import User from '../../../server/users/entity';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import OwnerSettings from '../components/OwnerSettings';
import SeekerSettings from '../components/SeekerSettings';
import * as Location from 'expo-location'; 

export default function Settings({ navigation }) {
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('');
    const [gpsCoords, setGpsCoords] = useState({ latitude: null, longitude: null }); 
    const [manualCoords, setManualCoords] = useState({ latitude: null, longitude: null });
    const [searchRange, setSearchRange] = useState('');
    const [pets, setPets] = useState('');
    const [numberRooms, setNumberRooms] = useState('');
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
                setGpsCoords({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });

                const [address] = await Location.reverseGeocodeAsync({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                });
                setLocation(`${address.name || ''}, ${address.city || ''}, ${address.country || ''}`);
            } catch (error) {
                Alert.alert('Error', 'No se pudo obtener la ubicación del dispositivo.');
            }
        };

        fetchPreferences();
        fetchLocation();
    }, [user]);

    const handleGeocodeAddress = async () => {
        if (!location) return;

        try {
            const geocoded = await Location.geocodeAsync(location);
            if (geocoded.length > 0) {
                const { latitude, longitude } = geocoded[0];
                setManualCoords({ latitude, longitude });
            } else {
                Alert.alert('Error', 'No se pudo obtener coordenadas para la dirección ingresada.');
                setLocation('');
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo realizar la geocodificación.');
        }
    };

    const handleSave = async () => {
        const finalCoords = manualCoords.latitude && manualCoords.longitude 
            ? manualCoords 
            : gpsCoords;

        const userPreferences = {
            user_id: user.id,
            role,
            location,
            search_range: Number(searchRange),
            latitude: finalCoords.latitude,
            longitude: finalCoords.longitude,
            numberRooms,
            pets,
        };

        try {
            const savePref = await savePreferences(userPreferences);
            if (!savePref) {
                Alert.alert('Error', 'No se pudieron guardar las preferencias.');
                return;
            } else {
                Alert.alert('Éxito', 'Preferencias guardadas correctamente.');
                navigation.navigate('dashboard');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un problema al guardar las preferencias.');
        }
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
                placeholder="Ubicación"
                value={location}
                onChangeText={setLocation}
                onBlur={handleGeocodeAddress}
            />

            {role === 'propietario' && (
                <OwnerSettings
                    location={location}
                    setLocation={setLocation}
                    numberRooms={numberRooms}
                    setNumberRooms={setNumberRooms}
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
                    numberRooms={numberRooms}
                    setNumberRooms={setNumberRooms}
                    pets={pets}
                    setPets={setPets}
                />
            )}

            <Button title="Guardar" onPress={handleSave} />
        </View>
    );
}

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


