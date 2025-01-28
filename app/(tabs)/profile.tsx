import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function ProfileScreen() {
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [items, setItems] = useState([
    { label: 'Java', value: 'java' },
    { label: 'JavaScript', value: 'js' },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Profile Screen</Text>
      <DropDownPicker
        open={open}
        value={selectedLanguage}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedLanguage}
        setItems={setItems}
        style={styles.dropdown}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
  dropdown: { width: 200, marginTop: 20 },
});
