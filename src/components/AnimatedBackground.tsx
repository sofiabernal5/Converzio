import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, Animated } from 'react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export const AnimatedBackground: React.FC = () => {
  const rotation = new Animated.Value(0);
  const float = new Animated.Value(0);
  const scale = new Animated.Value(1);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 20,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={styles.container}>
      <LinearGradient
        colors={['#1e3c72', '#2a5298', '#3b6cb7']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFillObject}
      />
      <AnimatedSvg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={[styles.background, { transform: [{ rotate: spin }] }]}>
        <G>
          {/* Digital network pattern */}
          <Path
            d="M0,0 L100,100 M100,0 L0,100"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />
          <Circle
            cx={width / 2}
            cy={height / 2}
            r="100"
            fill="rgba(255, 255, 255, 0.05)"
          />
        </G>
      </AnimatedSvg>
      
      {/* Floating Digital Twins */}
      <Animated.View
        style={[
          styles.twin,
          {
            left: '20%',
            transform: [
              { translateY: float },
              { scale },
            ],
          },
        ]}>
        <Svg width={80} height={80} viewBox="0 0 80 80">
          <Circle cx="40" cy="40" r="30" fill="rgba(255, 255, 255, 0.2)" />
          <Path
            d="M30,40 Q40,20 50,40"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="2"
            fill="none"
          />
        </Svg>
      </Animated.View>

      <Animated.View
        style={[
          styles.twin,
          {
            left: '60%',
            transform: [
              { translateY: float },
              { scale },
            ],
          },
        ]}>
        <Svg width={60} height={60} viewBox="0 0 60 60">
          <Circle cx="30" cy="30" r="25" fill="rgba(255, 255, 255, 0.2)" />
          <Path
            d="M20,30 Q30,15 40,30"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="2"
            fill="none"
          />
        </Svg>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  twin: {
    position: 'absolute',
    top: '30%',
  },
});

export default AnimatedBackground; 