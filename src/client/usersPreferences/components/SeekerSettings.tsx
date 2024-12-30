import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface SeekerSettingsProps {
    location: string;
    setLocation: (value: string) => void;
    searchRange: string;
    setSearchRange: (value: string) => void;
    pets: string;
    setPets: (value: string) => void;
    numberRooms: string;
    setNumberRooms: (value: string) => void;
}

const SeekerSettings: React.FC<SeekerSettingsProps> = ({ location, setLocation, searchRange, setSearchRange, pets, setPets, numberRooms, setNumberRooms }) => {
    return (
        <View>
            <Text style={styles.subtitle}>Configuración del Buscador</Text>
            <Picker
                selectedValue={location}
                onValueChange={(value) => setLocation(value)}
                style={styles.input}
            >
                <Picker.Item label="Piso" value="piso" />
                <Picker.Item label="Casa" value="casa" />
            </Picker>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Número de habitaciones que busca"
                value={String(numberRooms)}
                onChangeText={(text) => setNumberRooms(String(text))}
            />
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Rango de búsqueda (km)"
                value={String(searchRange)}
                onChangeText={(text) => setSearchRange(String(text))}
            />
            <Picker
                selectedValue={pets}
                onValueChange={(value) => setPets(value)}
                style={styles.input}
            >
                <Picker.Item label="Tengo mascota" value="si" />
                <Picker.Item label="No tengo mascota" value="no" />
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
    },
});

export default SeekerSettings;
