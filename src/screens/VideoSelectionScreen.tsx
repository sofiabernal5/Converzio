import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedBackground from '../components/AnimatedBackground';
import {TextStyles, Typography} from '../constants/typography';

const {width} = Dimensions.get('window');

const VIDEO_TYPES = [
  {
    id: 'introduction',
    title: 'Introduction',
    description: 'Create a professional introduction video for your profile',
    gradient: ['#4a90e2', '#357abd'],
  },
  // More video types can be added here
];

export const VideoSelectionScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <AnimatedBackground />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Select Video Type</Text>
        <View style={styles.cardsContainer}>
          {VIDEO_TYPES.map(type => (
            <TouchableOpacity
              key={type.id}
              style={styles.card}
              onPress={() => {
                // Handle video type selection
                console.log(`Selected: ${type.title}`);
              }}>
              <LinearGradient
                colors={type.gradient}
                style={styles.cardGradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{type.title}</Text>
                  <Text style={styles.cardDescription}>{type.description}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 10,
    zIndex: 10,
  },
  backButton: {
    padding: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: Typography.fontSize.lg,
    color: '#ffffff',
    fontWeight: Typography.fontWeight.semiBold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
  },
  title: {
    ...TextStyles.heading2,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
    color: '#ffffff',
  },
  cardsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  card: {
    width: '100%',
    maxWidth: 500,
    height: 150,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  cardContent: {
    padding: 20,
    alignItems: 'center',
  },
  cardTitle: {
    ...TextStyles.heading3,
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    ...TextStyles.body,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
  },
});

export default VideoSelectionScreen; 