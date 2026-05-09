import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ContactsScreen() {
  return (
    <ThemedView lightColor="transparent" style={styles.container}>
      <ThemedText type="title">Contacts</ThemedText>
      <ThemedText>
        Your people are listed here. Use this space for quick access to the contacts
        and details that matter most.
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
