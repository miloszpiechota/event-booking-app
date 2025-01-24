import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface Location {
  latitude: number;
  longitude: number;
}

const EventMap: React.FC<{ location: Location }> = ({ location }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05, // Zoom mapy
          longitudeDelta: 0.05,
        }}
      >
        {/* Marker wskazujący na dokładne miejsce */}
        <Marker coordinate={location} title="Event Location" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300, // Możesz dostosować wysokość
    width: '100%',
    borderRadius: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Rozciąga mapę na cały kontener
    borderRadius: 10,
  },
});

export default EventMap;
