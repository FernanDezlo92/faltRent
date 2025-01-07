import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, FlatList, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

interface OwnerSettingsProps {
    location: string;
    setLocation: (value: string) => void;
    pets: string;
    setPets: (value: string) => void;
    numberRooms: string;
    setNumberRooms: (value: string) => void;
}

const OwnerSettings: React.FC<OwnerSettingsProps> = ({ location, setLocation, pets, setPets, numberRooms, setNumberRooms }) => {
    type ImageData = {
        uri: string;
        name: string;
        type: string;
    };

    const [images, setImages] = useState<ImageData[]>([]);

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permiso denegado', 'Se necesita acceso a la galería para continuar.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true, // Solo para iOS 14+
            base64: false,
        });

        if (!result.canceled && result.assets) {
            setImages((prevImages) => [
                ...prevImages,
                ...result.assets.map((asset) => ({
                    uri: asset.uri,
                    name: asset.fileName || `image_${prevImages.length}.jpg`,
                    type: asset.type || 'image/jpeg',
                })),
            ]);
        }
    };

    const uploadImages = async () => {
        try {
            const formData = new FormData();
            images.forEach((image) => {
                formData.append('images', {
                    uri: image.uri,
                    name: image.name,
                    type: image.type,
                } as unknown as Blob);
            });
    
            const response = await fetch('https://tu-backend/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });
    
            if (response.ok) {
                Alert.alert('Éxito', 'Imágenes subidas correctamente.');
            } else {
                Alert.alert('Error', 'No se pudieron subir las imágenes.');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un problema al subir las imágenes.');
        }
    };
    


    return (
        <View>
            <Text style={styles.subtitle}>Configuración de Propietario</Text>
            <Button title="Subir imágenes del inmueble" onPress={pickImage} />
            <FlatList
                data={images}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                renderItem={({ item }) => <Image source={{ uri: item.uri }} style={styles.image} />}
            />
            {images.length > 0 && <Button title="Subir imágenes" onPress={uploadImages} />}
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
    image: {
        width: 100,
        height: 100,
        margin: 8,
        borderRadius: 8,
    },
});

export default OwnerSettings;
