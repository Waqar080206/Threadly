import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function MorningConnectScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Morning Connect</ThemedText>
      <ThemedText>
        This space is for your top morning connection work. It should surface the
        most important tasks for the day and help the Crew start strong.
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
