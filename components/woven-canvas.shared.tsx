import { StyleSheet, View } from 'react-native';

const horizontalLines = Array.from({ length: 10 }, (_, index) => index * 40 + 20);
const diagonalLines = Array.from({ length: 10 }, (_, index) => index * 32 + 14);

export function WovenCanvas() {
  return (
    <View style={styles.background} pointerEvents="none">
      <View style={styles.overlay} />
      {horizontalLines.map((top) => (
        <View key={`h-${top}`} style={[styles.line, { top }]} />
      ))}
      {diagonalLines.map((top) => (
        <View key={`d-${top}`} style={[styles.diagonal, { top }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    inset: 0,
    backgroundColor: '#081020',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(8, 16, 32, 0.84)',
  },
  line: {
    position: 'absolute',
    left: '-10%',
    width: '120%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.045)',
  },
  diagonal: {
    position: 'absolute',
    left: '-20%',
    width: '140%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    transform: [{ rotate: '45deg' }],
  },
});
