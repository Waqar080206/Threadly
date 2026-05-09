import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import './design.css';

import { WovenCanvas } from '../components/woven-canvas';

const rootStyle: React.CSSProperties = {
  position: 'relative',
  minHeight: '100vh',
  width: '100vw',
  overflow: 'hidden',
  backgroundColor: '#ffffff',
  backgroundImage: 'radial-gradient(circle at top left, rgba(56, 73, 105, 0.22), transparent 30%), radial-gradient(circle at bottom right, rgba(56, 73, 105, 0.18), transparent 35%)',
};

const contentStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 1,
  backgroundColor: 'transparent',
};

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <div style={rootStyle}>
        <WovenCanvas />
        <div style={contentStyle}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
        </div>
      </div>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
