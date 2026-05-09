import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ConnectScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Connect</ThemedText>
      <ThemedText>
        Find and share connections here. This section is designed to help you build
        meaningful relationships with a clean, editorial interface.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 12,
  },
});
