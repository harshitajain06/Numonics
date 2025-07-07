import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MainPage() {
  const navigation = useNavigation();
  const equations = [
    { id: 1, name: 'a² + b²', formula: 'a^2 + b^2' },
    { id: 2, name: 'a² - b²', formula: 'a^2 - b^2' },
    { id: 3, name: 'a * b + c', formula: 'a * b + c' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose an Equation</Text>
      <ScrollView contentContainerStyle={styles.equationList}>
        {equations.map((equation) => (
          <TouchableOpacity
            key={equation.id}
            style={styles.equationButton}
            onPress={() =>
              navigation.navigate('EquationPage', { formula: equation.formula })
            }
          >
            <Text style={styles.equationText}>{equation.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#114111', // Matching the theme from previous pages
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginTop: 50,
  },
  equationList: {
    width: '100%',
    alignItems: 'center',
  },
  equationButton: {
    backgroundColor: '#1f7a1f',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  equationText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
});
