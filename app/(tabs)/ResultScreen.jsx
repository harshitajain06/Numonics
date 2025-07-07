import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function ResultScreen() {
  const route = useRoute(); // Use useRoute to access the route parameters
  const { result, pattern } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Calculation Result</Text>
        <Text style={styles.result}>Result: {result}</Text>

        {/* <Text style={styles.patternTitle}>{pattern.title}</Text> */}
        <ScrollView
          contentContainerStyle={styles.patternContainer}
          horizontal // Enable horizontal scrolling
          showsHorizontalScrollIndicator={true} // Optional: Show horizontal scroll indicator
          style={{ width: '100%' }} // Ensure the scroll view stretches full width
        >
          <View style={styles.patternWrapper}>
            {pattern.pattern.map((line, index) => (
              <Text key={index} style={styles.patternLine}>
                {line}
              </Text>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContent: {
    paddingTop: 50, // Adding padding to top for better layout
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0A6F0A',
    textAlign: 'center',
  },
  result: {
    fontSize: 22,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
    paddingHorizontal: 15,
    textAlign: 'center',
    lineHeight: 28,
  },
//   patternTitle: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#0A6F0A',
//     textAlign: 'center',
//   },
  patternContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#e9f7e9',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center', // Center content horizontally
  },
  patternWrapper: {
    flexDirection: 'row', // Align content horizontally in a row
    flexWrap: 'wrap', // Allow wrapping of lines
  },
  patternLine: {
    fontSize: 10, // Reduced font size to make the pattern more compact
    fontFamily: 'monospace',
    color: '#0A6F0A', // Green color for the pattern lines
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 16, // Reduced line height for better spacing
    marginRight: 3, // Reduced space between lines
    width: 'auto', // Allow the line to take its natural width
  },
});
