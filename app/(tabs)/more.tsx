import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function MoreScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">More</ThemedText>
      <ThemedText>
        Access settings, help, and additional tools in this section. It keeps the
        interface simple while preserving a polished editorial vibe.
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
