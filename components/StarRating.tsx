import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StarRatingProps {
  maxStars?: number;
  onRate: (rating: number) => void;
  initialRating?: number;
}


const StarRating: React.FC<StarRatingProps> = ({ maxStars = 5, onRate, initialRating = 0, }) => {
  const [selectedStars, setSelectedStars] = useState<number>(initialRating || 0);


  const handlePress = (rating: number) => {
    setSelectedStars(rating);
    onRate(rating);
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: maxStars }, (_, index) => (
        <TouchableOpacity key={index} onPress={() => handlePress(index + 1)}>
          <Text style={[styles.star, selectedStars > index ? styles.selected : {}]}>★</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  star: {
    fontSize: 30,
    color: '#ccc',
    marginHorizontal: 5,
  },
  selected: {
    color: '#FFD700', // Kolor złoty
  },
});

export default StarRating;
