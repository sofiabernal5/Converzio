import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TextStyles, Typography} from '../constants/typography';

interface AboutModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({visible, onClose}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <LinearGradient
            colors={['#2a5298', '#1e3c72']}
            style={styles.gradient}>
            <SafeAreaView style={styles.safeArea}>
              <View style={styles.header}>
                <Text style={styles.title}>What is Converzio?</Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
              
              <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                <Text style={styles.description}>
                  Converzio is a self-service interactive video platform that empowers
                  professionals to bring their LinkedIn profiles or personal brands to
                  life through{' '}
                  <Text style={styles.highlight}>AI-powered avatars</Text>.
                </Text>
                
                <Text style={styles.description}>
                  Users can create{' '}
                  <Text style={styles.highlight}>
                    personalized, conversational digital experiences
                  </Text>{' '}
                  that answer questions, schedule meetings, capture leads, and
                  showcase expertise—all from a shareable, mobile-friendly interface.
                </Text>
                
                <Text style={styles.description}>
                  Whether you're a{' '}
                  <Text style={styles.highlight}>
                    job seeker, entrepreneur, or thought leader
                  </Text>
                  , Converzio transforms your static profile into an engaging,
                  interactive representation of your professional identity.
                </Text>
                
                <TouchableOpacity 
                  style={styles.gotItButton}
                  onPress={onClose}>
                  <Text style={styles.gotItButtonText}>Got it!</Text>
                </TouchableOpacity>
              </ScrollView>
            </SafeAreaView>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    ...TextStyles.heading2,
    color: '#ffffff',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: Typography.fontSize['2xl'],
    color: '#ffffff',
    fontWeight: Typography.fontWeight.bold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
  },
  description: {
    ...TextStyles.body,
    color: '#ffffff',
    marginBottom: 20,
    lineHeight: Typography.fontSize.base * 1.8,
  },
  highlight: {
    color: '#8ab4f8',
    fontWeight: Typography.fontWeight.semiBold,
  },
  gotItButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  gotItButtonText: {
    ...TextStyles.button,
    color: '#ffffff',
  },
});

export default AboutModal; 