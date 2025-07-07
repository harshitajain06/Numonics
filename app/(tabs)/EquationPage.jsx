import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EquationPage() {
  const route = useRoute();
  const navigation = useNavigation();
  const { formula } = route.params;
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);
  const variables = formula.match(/[a-z]/g) || [];

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const calculateResult = () => {
    try {
      const expr = formula.replace(/[a-z]/g, (match) => inputs[match] || 0);
      const computedResult = Function('"use strict";return (' + expr + ')')(); // Safer alternative to eval
      const rows = Math.abs(Math.floor(computedResult)); // Ensure rows are positive

      // Clamp rows to a reasonable range (max of 20 for pattern generation)
      const clampedRows = Math.min(rows, 20);
      const pattern = createRandomPattern(clampedRows); // Default to 5 rows if the result is 0

      setResult(computedResult);
      // Navigate to the ResultScreen with the result and pattern
      navigation.navigate('ResultScreen', { result: computedResult, pattern });
    } catch (error) {
      alert('Error calculating result. Please check your formula.');
    }
  };

  // Function to create and select one random pattern
  const createRandomPattern = (rows) => {
    const patterns = [];

    // Star Pyramid
    const pyramid = [];
    for (let i = 1; i <= rows; i++) {
      pyramid.push(' '.repeat(rows - i) + '* '.repeat(i).trim());
    }
    patterns.push({ title: 'Star Pyramid', pattern: pyramid });

    // Hollow Diamond
    const hollowDiamond = [];
    for (let i = 1; i <= rows; i++) {
      hollowDiamond.push(' '.repeat(rows - i) + (i === 1 ? '*' : '* ' + '  '.repeat(i - 1) + '*'));
    }
    for (let i = rows - 1; i > 0; i--) {
      hollowDiamond.push(' '.repeat(rows - i) + (i === 1 ? '*' : '* ' + '  '.repeat(i - 1) + '*'));
    }
    patterns.push({ title: 'Hollow Diamond', pattern: hollowDiamond });

    // Checkerboard Pattern
    const checkerboard = [];
    for (let i = 0; i < rows; i++) {
      checkerboard.push(
        Array(rows)
          .fill(null)
          .map((_, j) => ((i + j) % 2 === 0 ? '*' : ' ')) 
          .join(' ')
      );
    }
    patterns.push({ title: 'Checkerboard', pattern: checkerboard });

    // Pascal's Triangle
    const pascalTriangle = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      let value = 1;
      for (let j = 0; j <= i; j++) {
        row.push(value);
        value = (value * (i - j)) / (j + 1);
      }
      pascalTriangle.push(row.join(' '));
    }
    patterns.push({ title: "Pascal's Triangle", pattern: pascalTriangle });

    // Fibonacci Spiral Approximation
    const fibonacciSpiral = [];
    let fib1 = 0,
      fib2 = 1;
    for (let i = 0; i < rows; i++) {
      const fibRow = Array(fib2).fill('*').join(' ');
      fibonacciSpiral.push(fibRow);
      const nextFib = fib1 + fib2;
      fib1 = fib2;
      fib2 = nextFib;
    }
    patterns.push({ title: 'Fibonacci Spiral Approximation', pattern: fibonacciSpiral });

    // Concentric Squares
    const concentricSquares = [];
    for (let i = 0; i < rows; i++) {
      const line = '*'.repeat(rows - i) + ' '.repeat(2 * i) + '*'.repeat(rows - i);
      concentricSquares.push(line);
    }
    for (let i = rows - 2; i >= 0; i--) {
      const line = '*'.repeat(rows - i) + ' '.repeat(2 * i) + '*'.repeat(rows - i);
      concentricSquares.push(line);
    }
    patterns.push({ title: 'Concentric Squares', pattern: concentricSquares });

    // Cross Pattern
    const cross = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < rows; j++) {
        if (i === j || i + j === rows - 1) {
          row += '*';
        } else {
          row += ' ';
        }
      }
      cross.push(row);
    }
    patterns.push({ title: 'Cross', pattern: cross });

    // Zigzag Pattern
    const zigzag = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < rows; j++) {
        row += (i + j) % 2 === 0 ? '*' : ' ';
      }
      zigzag.push(row);
    }
    patterns.push({ title: 'Zigzag', pattern: zigzag });

    // Heart Shape
    const heart = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < rows * 2; j++) {
        if (
          (i === 0 && j === rows - 1) ||
          (i === 1 && (j === rows - 2 || j === rows)) ||
          (i === 2 && (j === rows - 3 || j === rows + 1)) ||
          (i === 3 && (j === rows - 4 || j === rows + 2)) ||
          (i > 3 && i < rows - 1 && (j === rows - i || j === rows + i))
        ) {
          row += '*';
        } else {
          row += ' ';
        }
      }
      heart.push(row);
    }
    patterns.push({ title: 'Heart', pattern: heart });

    // Spiral Pattern
    const spiral = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < rows; j++) {
        if (i === j || i + j === rows - 1 || i === rows / 2 || j === rows / 2) {
          row += '*';
        } else {
          row += ' ';
        }
      }
      spiral.push(row);
    }
    patterns.push({ title: 'Spiral', pattern: spiral });

    // Wave Pattern
    const wave = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < rows; j++) {
        row += i % 2 === 0 ? '*' : ' ';
      }
      wave.push(row);
    }
    patterns.push({ title: 'Wave', pattern: wave });

    // Diagonal Lines
    const diagonal = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < rows; j++) {
        if (i === j) {
          row += '*';
        } else {
          row += ' ';
        }
      }
      diagonal.push(row);
    }
    patterns.push({ title: 'Diagonal Lines', pattern: diagonal });

    // Randomly select one pattern
    return patterns[Math.floor(Math.random() * patterns.length)];
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Equation: {formula}</Text>
      {variables.map((variable, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter value for {variable}:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(value) => handleChange(variable, value)}
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
    marginBottom: 30,
    textAlign: 'center',
    color: '#114111',
    marginTop: 50,
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
