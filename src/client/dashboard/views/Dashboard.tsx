import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 120;

const apartments = [
  {
    id: '1',
    image: 'https://api.a0.dev/assets/image?text=modern%20bright%20apartment%20living%20room%20with%20large%20windows%20and%20city%20view&aspect=16:9',
    price: '£800',
    location: 'Camden, London',
    roommates: 2,
    moveInDate: 'March 1st',
    amenities: ['WiFi', 'Washing Machine', 'Garden'],
  },
  {
    id: '2',
    image: 'https://api.a0.dev/assets/image?text=cozy%20shared%20apartment%20kitchen%20with%20island%20and%20modern%20appliances&aspect=16:9',
    price: '£750',
    location: 'Shoreditch, London',
    roommates: 3,
    moveInDate: 'February 15th',
    amenities: ['Gym', 'Parking', 'Bills Included'],
  },
  {
    id: '3',
    image: 'https://api.a0.dev/assets/image?text=stylish%20apartment%20bedroom%20with%20workspace%20and%20natural%20light&aspect=16:9',
    price: '£900',
    location: 'Islington, London',
    roommates: 1,
    moveInDate: 'ASAP',
    amenities: ['En-suite', 'Balcony', 'Bills Included'],
  },
];

export default function FlatShareSwiper() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const rotation = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        swipeRight(gesture);
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        swipeLeft(gesture);
      } else {
        resetPosition();
      }
    },
  });

  const swipeRight = (gesture?: { dx: number; dy: number }) => {
    Animated.timing(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: gesture?.dy ?? 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => nextCard());
  };
  
  const swipeLeft = (gesture?: { dx: number; dy: number }) => {
    Animated.timing(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: gesture?.dy ?? 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => nextCard());
  };
  
  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const nextCard = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    position.setValue({ x: 0, y: 0 });
  };

  const renderCard = () => {
    if (currentIndex >= apartments.length) {
      return (
        <View style={styles.noMoreCards}>
          <MaterialCommunityIcons name="home-search" size={60} color="#666" />
          <Text style={styles.noMoreCardsText}>No more flats to show!</Text>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={() => setCurrentIndex(0)}
          >
            <Text style={styles.resetButtonText}>Start Over</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const apartment = apartments[currentIndex];

    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.card,
          {
            transform: [
              { translateX: position.x },
              { translateY: position.y },
              { rotate: rotation },
            ],
          },
        ]}
      >
        <Image source={{ uri: apartment.image }} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={styles.gradient}
        >
          <View style={styles.cardContent}>
            <Text style={styles.price}>{apartment.price} / month</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-sharp" size={20} color="white" />
              <Text style={styles.location}>{apartment.location}</Text>
            </View>
            
            <View style={styles.detailsContainer}>
              <View style={styles.detail}>
                <MaterialCommunityIcons name="account-group" size={20} color="white" />
                <Text style={styles.detailText}>{apartment.roommates} roommate(s)</Text>
              </View>
              <View style={styles.detail}>
                <MaterialCommunityIcons name="calendar-month" size={20} color="white" />
                <Text style={styles.detailText}>{apartment.moveInDate}</Text>
              </View>
            </View>

            <View style={styles.amenitiesContainer}>
              {apartment.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityTag}>
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {renderCard()}
      <View style={styles.buttonsContainer}>
      <TouchableOpacity style={[styles.button, styles.noButton]} onPress={() => swipeLeft()}>
        <Ionicons name="close" size={30} color="#FF6B6B" />
        </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.yesButton]} onPress={() => swipeRight()}>
        <Ionicons name="heart" size={30} color="#4CD964" />
      </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  card: {
    width: SCREEN_WIDTH - 30,
    height: SCREEN_WIDTH * 1.4,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    position: 'absolute',
    top: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 18,
    color: 'white',
    marginLeft: 6,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    color: 'white',
    marginLeft: 6,
    fontSize: 16,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  amenityText: {
    color: 'white',
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    width: '60%',
    justifyContent: 'space-between',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
    noButton: {
        backgroundColor: 'white',
    },
    yesButton: {
        backgroundColor: 'white',
    },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  noMoreCardsText: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  resetButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});