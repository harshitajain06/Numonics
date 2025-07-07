import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function TopicDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { title, formula, mnemonic, dhruv } = route.params;

  return (
    <View style={styles.wrapper}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.section}>📘 Formula / Concept</Text>
          <Text style={styles.content}>{formula || 'N/A'}</Text>

          <Text style={styles.section}>🧠 Mnemonic</Text>
          <Text style={styles.content}>{mnemonic || 'N/A'}</Text>

          <Text style={styles.section}>🗣️ Dhruv’s Version</Text>
          <Text style={styles.content}>{dhruv || 'N/A'}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f6f9ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
    color: '#333',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    color: '#1c2c4c',
  },
  content: {
    fontSize: 16,
    color: '#444',
    marginTop: 8,
    lineHeight: 22,
  },
});
