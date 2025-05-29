/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  SafeAreaView,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AnimatedBackground from './src/components/AnimatedBackground';
import LinearGradient from 'react-native-linear-gradient';
import VideoSelectionScreen from './src/screens/VideoSelectionScreen';
import LoginScreen from './src/screens/LoginScreen';
import {TextStyles} from './src/constants/typography';
import AboutModal from './src/components/AboutModal';

const {width} = Dimensions.get('window');
const Stack = createNativeStackNavigator();

function HomeScreen({navigation}: any): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const highlightAnim = new Animated.Value(0);
  const cardScale = new Animated.Value(1);
  const buttonScale = new Animated.Value(1);
  const [showAboutModal, setShowAboutModal] = React.useState(false);

  useEffect(() => {
    // Continuous highlight animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(highlightAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(highlightAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Subtle breathing animation for the card
    Animated.loop(
      Animated.sequence([
        Animated.timing(cardScale, {
          toValue: 1.02,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(cardScale, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const highlightOpacity = highlightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AnimatedBackground />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.centerContent,
            {
              transform: [{scale: cardScale}],
            },
          ]}>
            <View style={styles.contentWrapper}>
              <Animated.Text
                style={[
                  styles.welcomeText,
                  {
                    opacity: highlightOpacity,
                  },
                ]}>
                Welcome to Converzio
              </Animated.Text>
              <Text style={styles.sloganText}>
                Digitize Your Professional Branding
              </Text>
              <View style={styles.separator} />
              <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={() => navigation.navigate('Login')}
                style={styles.buttonContainer}>
                <Animated.View
                  style={[
                    styles.buttonWrapper,
                    {transform: [{scale: buttonScale}]},
                  ]}>
                  <LinearGradient
                    colors={['#4a90e2', '#357abd']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={StyleSheet.absoluteFill}
                  />
                  <Text style={styles.buttonText}>START NOW</Text>
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.infoButton}
                onPress={() => setShowAboutModal(true)}>
                <Text style={styles.infoButtonText}>
                  What is Converzio?
                </Text>
              </TouchableOpacity>
            </View>
        </Animated.View>
      </ScrollView>
      <AboutModal 
        visible={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
    </SafeAreaView>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="VideoSelection" component={VideoSelectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    ...TextStyles.heading1,
    textAlign: 'center',
    marginBottom: 10,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  sloganText: {
    ...TextStyles.slogan,
    textAlign: 'center',
    marginBottom: 30,
    color: '#ffffff',
    opacity: 0.9,
  },
  separator: {
    height: 2,
    width: 80,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    marginBottom: 40,
    borderRadius: 1,
    opacity: 0.5,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonWrapper: {
    borderRadius: 25,
    overflow: 'hidden',
    paddingVertical: 14,
    paddingHorizontal: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    ...TextStyles.button,
    color: '#fff',
    textAlign: 'center',
  },
  infoButton: {
    marginTop: 20,
    padding: 8,
  },
  infoButtonText: {
    ...TextStyles.caption,
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#ffffff',
    opacity: 0.8,
  },
});

export default App;
