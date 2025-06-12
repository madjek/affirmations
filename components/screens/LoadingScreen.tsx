'use client';
import { ActivityIndicator, View } from 'react-native';
import { useColorScheme } from '~/lib/hooks/useColorScheme';

export default function LoadingScreen() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-background">
      <ActivityIndicator
        size="large"
        color={isDarkColorScheme ? 'secondary' : 'primary'}
      />
    </View>
  );
}
