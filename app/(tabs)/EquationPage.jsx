import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EquationPage() {
  const route = useRoute();
  const navigation = useNavigation();
  const { formula } = route.params;
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);
  // Extract variables and handle squared terms
  const variables = formula.match(/[a-z]/g) || [];
  
  // Process formula to handle "square" terms
  const processFormula = (formula) => {
    return formula
      .replace(/([a-z])\s*square/g, '($1 * $1)') // Replace "a square" with "(a * a)"
      .replace(/([a-z])\s*\^2/g, '($1 * $1)')   // Replace "a^2" with "(a * a)"
      .replace(/([a-z])\s*\*\*\s*2/g, '($1 * $1)'); // Replace "a**2" with "(a * a)"
  };

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const calculateResult = () => {
    try {
      // Validate that all variables have been entered
      const missingVariables = variables.filter(variable => 
        !inputs[variable] || inputs[variable].trim() === ''
      );
      
      if (missingVariables.length > 0) {
        alert(`Please enter values for: ${missingVariables.join(', ')}`);
        return;
      }

      // Convert string inputs to numbers and validate
      const numericInputs = {};
      for (const variable of variables) {
        const value = parseFloat(inputs[variable]);
        if (isNaN(value)) {
          alert(`Invalid number entered for ${variable}. Please enter a valid number.`);
          return;
        }
        numericInputs[variable] = value;
      }

      // Process the formula to handle squared terms, then replace variables with numeric values
      const processedFormula = processFormula(formula);
      const expr = processedFormula.replace(/[a-z]/g, (match) => numericInputs[match]);
      
      // Evaluate the expression safely
      const computedResult = Function('"use strict";return (' + expr + ')')();
      
      // Validate the result
      if (isNaN(computedResult) || !isFinite(computedResult)) {
        alert('The calculation resulted in an invalid number. Please check your formula.');
        return;
      }

      const rows = Math.abs(Math.floor(computedResult)); // Ensure rows are positive

      // Clamp rows to a reasonable range (max of 20 for pattern generation)
      const clampedRows = Math.min(Math.max(rows, 1), 20); // Ensure minimum 1 row
      const pattern = createRandomPattern(clampedRows);

      setResult(computedResult);
      // Navigate to the ResultScreen with the result and pattern
      navigation.navigate('ResultScreen', { result: computedResult, pattern });
    } catch (error) {
      console.error('Calculation error:', error);
      alert('Error calculating result. Please check your formula and input values.');
    }
  };

  // Function to create complex and attractive patterns
  const createRandomPattern = (rows) => {
    const patterns = [];
    const center = Math.floor(rows / 2);

    // Detailed Smiley Face with Expressions
    const detailedSmiley = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < rows; j++) {
        const dist = Math.sqrt((i - center) ** 2 + (j - center) ** 2);
        if (dist <= center * 0.9 && dist >= center * 0.7) {
          row += '*'; // Face outline
        } else if (Math.abs(i - center + 1) <= 1 && Math.abs(j - center - 2) <= 1) {
          row += '*'; // Left eye
        } else if (Math.abs(i - center + 1) <= 1 && Math.abs(j - center + 2) <= 1) {
          row += '*'; // Right eye
        } else if (i === center + 1 && Math.abs(j - center) <= 3) {
          row += '*'; // Smile
        } else if (i === center + 2 && Math.abs(j - center) <= 2) {
          row += '*'; // Smile line
        } else if (i === center - 1 && Math.abs(j - center) <= 1) {
          row += '*'; // Nose
        } else {
          row += ' ';
        }
      }
      detailedSmiley.push(row);
    }
    patterns.push({ title: 'Smiley', pattern: detailedSmiley });

    // Complex Robot with Details
    const complexRobot = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < rows; j++) {
        if (i === 0 || i === rows - 1 || j === 0 || j === rows - 1) {
          row += '*'; // Face border
        } else if (Math.abs(i - center + 1) <= 1 && Math.abs(j - center - 2) <= 1) {
          row += '*'; // Left eye
        } else if (Math.abs(i - center + 1) <= 1 && Math.abs(j - center + 2) <= 1) {
          row += '*'; // Right eye
        } else if (i === center + 1 && Math.abs(j - center) <= 2) {
          row += '*'; // Mouth
        } else if (i === center - 1 && j === center) {
          row += '*'; // Antenna
        } else if (i === center - 2 && Math.abs(j - center) <= 1) {
          row += '*'; // Antenna top
        } else if (Math.abs(i - center) <= 1 && Math.abs(j - center) <= 1) {
          row += '*'; // Face details
        } else {
          row += ' ';
        }
      }
      complexRobot.push(row);
    }
    patterns.push({ title: 'Robot', pattern: complexRobot });

    // Detailed Cat with Whiskers
    const detailedCat = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < rows; j++) {
        if (Math.abs(i - center) <= 2 && Math.abs(j - center) <= 3) {
          row += '*'; // Face
        } else if (i === center - 3 && Math.abs(j - center) <= 1) {
          row += '*'; // Ears
        } else if (Math.abs(i - center + 1) <= 1 && Math.abs(j - center - 1) <= 1) {
          row += '*'; // Left eye
        } else if (Math.abs(i - center + 1) <= 1 && Math.abs(j - center + 1) <= 1) {
          row += '*'; // Right eye
        } else if (i === center + 1 && j === center) {
          row += '*'; // Nose
        } else if (i === center + 2 && Math.abs(j - center) <= 1) {
          row += '*'; // Mouth
        } else if (i === center && (j === center - 4 || j === center + 4)) {
          row += '*'; // Whiskers
        } else if (i === center + 1 && (j === center - 4 || j === center + 4)) {
          row += '*'; // Whiskers
        } else {
          row += ' ';
        }
      }
      detailedCat.push(row);
    }
    patterns.push({ title: 'Cat', pattern: detailedCat });

    // Complex Heart with Details
    const complexHeart = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < rows; j++) {
        const dist1 = Math.sqrt((i - center + 1) ** 2 + (j - center - 1) ** 2);
        const dist2 = Math.sqrt((i - center + 1) ** 2 + (j - center + 1) ** 2);
        if (dist1 <= center * 0.7 || dist2 <= center * 0.7) {
          row += '*';
        } else if (i >= center + 1 && Math.abs(j - center) <= 2) {
          row += '*';
        } else if (i === center && Math.abs(j - center) <= 1) {
          row += '*'; // Heart center
        } else {
          row += ' ';
        }
      }
      complexHeart.push(row);
    }
    patterns.push({ title: 'Heart', pattern: complexHeart });

    // Detailed Star with Multiple Points
    const detailedStar = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < rows; j++) {
        const dist = Math.abs(i - center) + Math.abs(j - center);
        const angle = Math.atan2(i - center, j - center);
        if (dist <= center && (i === center || j === center || Math.abs(i - j) <= 1)) {
          row += '*';
        } else if (Math.abs(i - center) <= 1 && Math.abs(j - center) <= 1) {
          row += '*';
        } else if (dist <= center * 0.8 && Math.floor(angle * 8) % 2 === 0) {
          row += '*'; // Star points
        } else {
          row += ' ';
        }
      }
      detailedStar.push(row);
    }
    patterns.push({ title: 'Star', pattern: detailedStar });

    // Complex Butterfly with Patterns
    const complexButterfly = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < rows; j++) {
        if (j === center) {
          row += '*'; // Body
        } else if (Math.abs(i - center) <= 2 && Math.abs(j - center) <= 3) {
          row += '*'; // Wings
        } else if (i === center - 3 && Math.abs(j - center) <= 1) {
          row += '*'; // Antenna
        } else if (Math.abs(i - center) <= 1 && Math.abs(j - center) <= 1) {
          row += '*'; // Wing patterns
        } else {
          row += ' ';
        }
      }
      complexButterfly.push(row);
    }
    patterns.push({ title: 'Butterfly', pattern: complexButterfly });

    // Detailed Flower with Petals
    const detailedFlower = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < rows; j++) {
        const dist = Math.sqrt((i - center) ** 2 + (j - center) ** 2);
        if (dist <= center * 0.3) {
          row += '*'; // Center
        } else if (dist <= center * 0.8 && dist >= center * 0.5) {
          if (Math.abs(i - center) <= 2 || Math.abs(j - center) <= 2) {
            row += '*'; // Petals
          } else if (Math.abs(i - j) <= 1 || Math.abs(i + j - rows + 1) <= 1) {
            row += '*'; // Diagonal petals
          } else {
            row += ' ';
          }
        } else {
          row += ' ';
        }
      }
      detailedFlower.push(row);
    }
    patterns.push({ title: 'Flower', pattern: detailedFlower });

    // Complex Lightning with Branches
    const complexLightning = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < rows; j++) {
        if (j === center + Math.floor((i - center) / 2)) {
          row += '*';
        } else if (j === center - Math.floor((i - center) / 2) && i > center) {
          row += '*';
        } else if (i === center && Math.abs(j - center) <= 2) {
          row += '*'; // Horizontal branch
        } else if (Math.abs(i - center) <= 1 && Math.abs(j - center) <= 1) {
          row += '*'; // Lightning details
        } else {
          row += ' ';
        }
      }
      complexLightning.push(row);
    }
    patterns.push({ title: 'Lightning', pattern: complexLightning });

    // Detailed Diamond with Facets
    const detailedDiamond = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < rows; j++) {
        const dist = Math.abs(i - center) + Math.abs(j - center);
        if (dist <= center && dist % 2 === 0) {
          row += '*';
        } else if (dist <= center * 0.8 && (i === center || j === center)) {
          row += '*'; // Diamond facets
        } else if (Math.abs(i - j) <= 1 && dist <= center) {
          row += '*'; // Diagonal facets
        } else {
          row += ' ';
        }
      }
      detailedDiamond.push(row);
    }
    patterns.push({ title: 'Diamond', pattern: detailedDiamond });

    // Complex Sun with Rays
    const complexSun = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < rows; j++) {
        const dist = Math.sqrt((i - center) ** 2 + (j - center) ** 2);
        if (dist <= center * 0.4) {
          row += '*'; // Center
        } else if (dist <= center * 0.9 && dist >= center * 0.6) {
          if (i === center || j === center || Math.abs(i - j) <= 2 || Math.abs(i + j - rows + 1) <= 2) {
            row += '*'; // Rays
          } else if (Math.floor(Math.atan2(i - center, j - center) * 8) % 2 === 0) {
            row += '*'; // Additional rays
          } else {
            row += ' ';
          }
        } else {
          row += ' ';
        }
      }
      complexSun.push(row);
    }
    patterns.push({ title: 'Sun', pattern: complexSun });

    // Mandala Pattern
    const mandala = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < rows; j++) {
        const dist = Math.sqrt((i - center) ** 2 + (j - center) ** 2);
        const angle = Math.atan2(i - center, j - center);
        if (dist <= center && (Math.floor(dist) % 2 === 0 || Math.floor(angle * 12) % 2 === 0)) {
          row += '*';
        } else if (Math.abs(i - center) <= 1 && Math.abs(j - center) <= 1) {
          row += '*'; // Center
        } else {
          row += ' ';
        }
      }
      mandala.push(row);
    }
    patterns.push({ title: 'Mandala', pattern: mandala });

    // Geometric Spiral
    const spiral = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < rows; j++) {
        const dist = Math.sqrt((i - center) ** 2 + (j - center) ** 2);
        const angle = Math.atan2(i - center, j - center);
        if (dist <= center && Math.floor(dist + angle * 2) % 3 === 0) {
          row += '*';
        } else {
          row += ' ';
        }
      }
      spiral.push(row);
    }
    patterns.push({ title: 'Spiral', pattern: spiral });

    // Celtic Knot
    const celticKnot = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < rows; j++) {
        if (i === center || j === center) {
          row += '*';
        } else if (Math.abs(i - center) <= 1 && Math.abs(j - center) <= 1) {
          row += '*';
        } else if ((i + j) % 3 === 0 && Math.abs(i - center) + Math.abs(j - center) <= center) {
          row += '*';
        } else {
          row += ' ';
        }
      }
      celticKnot.push(row);
    }
    patterns.push({ title: 'Celtic Knot', pattern: celticKnot });

    // Randomly select one pattern
    return patterns[Math.floor(Math.random() * patterns.length)];
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Equation: {formula}</Text>
      <Text style={styles.processedFormula}>Processed: {processFormula(formula)}</Text>
      {variables.map((variable, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter value for {variable}:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={inputs[variable] || ''}
            onChangeText={(value) => handleChange(variable, value)}
            placeholder={`Enter value for ${variable}`}
          />
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={calculateResult}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#114111',
    marginTop: 50,
  },
  processedFormula: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 30,
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#114111',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
