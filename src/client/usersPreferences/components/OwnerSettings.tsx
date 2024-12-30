import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface OwnerSettingsProps {
    location: string;
    setLocation: (value: string) => void;
    pets: string;
    setPets: (value: string) => void;
    numberRooms: string;
    setNumberRooms: (value: string) => void;
}

const OwnerSettings: React.FC<OwnerSettingsProps> = ({ location, setLocation, pets, setPets, numberRooms, setNumberRooms }) => {
    return (
        <View>
            <Text style={styles.subtitle}>Configuración de Propietario</Text>
            <Button title="Subir imágenes del inmueble" onPress={() => alert('Subir imágenes')} />
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
                placeholder="Número de habitaciones"
                value={String(numberRooms)}
                onChangeText={(text) => setNumberRooms(String(text))}
            />
            <Picker
                selectedValue={pets}
                onValueChange={(value) => setPets(value)}
                style={styles.input}
            >
                <Picker.Item label="Se admiten mascotas" value="si" />
                <Picker.Item label="No se admiten mascotas" value="no" />
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

export default OwnerSettings;
