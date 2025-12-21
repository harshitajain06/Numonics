import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import PatternPage from './Pattern';
import EquationPage from './EquationPage';
import ResultScreen from './ResultScreen';
import LearnPage from './Learn';
import TopicDetails from './TopicDetails';
import Register from './Register';
import Login from './index';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons'; // If using Expo
import { signOut } from 'firebase/auth'; // Ensure Firebase auth is configured
import { auth } from '../../config/firebase'; // Adjust the path to your Firebase config file
import Toast from 'react-native-toast-message';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


const PatternStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="PatternPage" component={PatternPage} options={{ title: 'Pattern' }} />
      <Stack.Screen name="EquationPage" component={EquationPage} options={{ title: 'Equation' }} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ title: 'Result' }} />
    </Stack.Navigator>
  );
};

const LearnStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LearnPage" component={LearnPage} />
      <Stack.Screen name="TopicDetails" component={TopicDetails} />
    </Stack.Navigator>
  );
};




// Bottom Tab Navigator Component
const BottomTabs = () => {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Pattern') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Learn') {
            iconName = focused ? 'book' : 'book-outline';
          } 

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Pattern" component={PatternStack} />
      <Tab.Screen name="Learn" component={LearnStack} />
    </Tab.Navigator>
  );
};

// Drawer Navigator Component
const DrawerNavigator = () => {
  const navigation = useNavigation();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLogoutModalVisible(true);
  };

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      setIsLogoutModalVisible(false);
      Toast.show({
        type: 'success',
        text1: 'Logged out successfully',
        text2: 'You have been logged out',
        position: 'top',
        visibilityTime: 2000,
      });
      navigation.replace('Login');
    } catch (err) {
      console.error('Logout Error:', err);
      setIsLogoutModalVisible(false);
      Toast.show({
        type: 'error',
        text1: 'Logout Failed',
        text2: 'Failed to logout. Please try again.',
        position: 'top',
        visibilityTime: 3000,
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const cancelLogout = () => {
    setIsLogoutModalVisible(false);
  };

  return (
    <>
      <Drawer.Navigator initialRouteName="MainTabs">
        <Drawer.Screen name="MainTabs" component={BottomTabs} options={{ title: 'Learn' }} />
        {/* Additional screens can be added here if needed */}

        {/* Logout option */}
        <Drawer.Screen
          name="Logout"
          component={BottomTabs}
          options={{
            title: 'Logout',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="log-out-outline" size={size} color={color} />
            ),
          }}
          listeners={{
            drawerItemPress: (e) => {
              e.preventDefault();
              handleLogout();
            },
          }}
        />
      </Drawer.Navigator>

      {/* Logout Confirmation Modal */}
      <Modal
        isVisible={isLogoutModalVisible}
        onBackdropPress={cancelLogout}
        onBackButtonPress={cancelLogout}
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Ionicons name="log-out-outline" size={32} color="#ff6b6b" />
            <Text style={styles.modalTitle}>Confirm Logout</Text>
          </View>
          
          <Text style={styles.modalMessage}>
            Are you sure you want to logout?
          </Text>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={cancelLogout}
              disabled={isLoggingOut}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.modalButton, styles.logoutButton]}
              onPress={confirmLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.logoutButtonText}>Logout</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Toast />
    </>
  );
};

// Stack Navigator Component
export default function StackLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background },
      }}
    >
      {/* Authentication Screens */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '85%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2d3748',
    marginTop: 12,
  },
  modalMessage: {
    fontSize: 16,
    color: '#4a5568',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  cancelButton: {
    backgroundColor: '#e2e8f0',
  },
  cancelButtonText: {
    color: '#4a5568',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#ff6b6b',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
