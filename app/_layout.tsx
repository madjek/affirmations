import '~/global.css';

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Appearance, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { AuthProvider } from '~/components/providers/AuthProvider';
import { SettingsButton } from '~/components/SettingsButton';
import { ThemeToggle } from '~/components/ThemeToggle';
import toastConfig from '~/components/toastConfig';
import { NAV_THEME } from '~/lib/constants/constants';
import { useColorScheme } from '~/lib/hooks/useColorScheme';
import { setAndroidNavigationBar } from '~/lib/utils/android-navigation-bar';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

const usePlatformSpecificSetup = Platform.select({
  web: useSetWebBackgroundClassName,
  android: useSetAndroidNavigationBar,
  default: noop,
});

export default function RootLayout() {
  usePlatformSpecificSetup();
  const { isDarkColorScheme } = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  title: 'Welcome to Affirmations',
                  headerRight: () => <ThemeToggle />,
                }}
              />
              <Stack.Screen
                name="register/index"
                options={{
                  title: 'Register',
                  headerRight: () => <ThemeToggle />,
                }}
              />
              <Stack.Screen
                name="login/index"
                options={{ title: 'Login', headerRight: () => <ThemeToggle /> }}
              />
              <Stack.Screen
                name="affirmations/(tabs)"
                options={{
                  title: 'Affirmations',
                  headerRight: () => <SettingsButton />,
                }}
              />
              <Stack.Screen
                name="settings/index"
                options={{
                  title: 'Settings',
                  headerRight: () => <ThemeToggle />,
                }}
              />
              <Stack.Screen
                name="+not-found"
                options={{
                  title: 'Not found',
                }}
              />
            </Stack>
            <Toast config={toastConfig} />
            <PortalHost />
          </ThemeProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined'
    ? React.useEffect
    : React.useLayoutEffect;

function useSetWebBackgroundClassName() {
  useIsomorphicLayoutEffect(() => {
    // Adds the background color to the html element to prevent white background on overscroll.
    document.documentElement.classList.add('bg-background');
  }, []);
}

function useSetAndroidNavigationBar() {
  React.useLayoutEffect(() => {
    setAndroidNavigationBar(Appearance.getColorScheme() ?? 'light');
  }, []);
}

function noop() {}
