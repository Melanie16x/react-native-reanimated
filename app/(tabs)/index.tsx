import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, {
  SlideInUp, SlideOutUp,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export default function App() {

  const [started, setStarted] = useState(false);

  const backgroundColor = useSharedValue(0); // controla el color de fondo
  const titleOpacity = useSharedValue(1); // controla la opacidad del titulo

  // Funcion para iniciar la animacion cuando se presione el boton
  const startAnimation = () => {
    backgroundColor.value = started ? 0 : 1;
    titleOpacity.value = withTiming(started ? 1 : 0, { duration: 1000 });
    setStarted(!started);
  };

  // estilo para cambiar el color de fondo
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColorValue = backgroundColor.value === 0
      ? '#0060a0'  // color inicial
      : '#008040'; // color final

    return {
      backgroundColor: withTiming(backgroundColorValue, { duration: 1000 }),
    };
  });

  // estilo para la opacidad del título
  const animatedTitleStyle = useAnimatedStyle(() => {
    return {
      opacity: titleOpacity.value,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Animated.View entering={SlideInUp} exiting={SlideOutUp}>
        <Animated.Text style={[styles.title, animatedTitleStyle]}>
          Pantalla de Inicio Animada
        </Animated.Text>
      </Animated.View>

      <TouchableOpacity onPress={startAnimation} style={styles.button}>
        <Text style={styles.textButton}>Inicio</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}


// estilos para el titulo y el boton
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 60,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 40,
    width: 140,
    paddingVertical: 15,
    backgroundColor: '#06D6A0',
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  textButton: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});