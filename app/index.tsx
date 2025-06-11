import { Link, Redirect, RelativePathString } from 'expo-router';
import * as React from 'react';
import { ActivityIndicator, ImageBackground, View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { useAuthStore } from '~/store/authStore';

export default function Screen() {
  const { accessToken, refreshToken, isLoading, loadTokensFromStorage } =
    useAuthStore();

  React.useEffect(() => {
    if (isLoading) {
      loadTokensFromStorage().catch((error: any) => {
        console.error('Failed to load tokens', error);
      });
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (accessToken && refreshToken) {
    return <Redirect href={'/affirmations' as RelativePathString} />;
  }

  return (
    <View>
      <Card className="w-full max-w-md">
        <ImageBackground
          source={require('../assets/images/welcome.jpg')}
          resizeMode="cover"
          className="h-[25vh] w-full"
        />
      </Card>
      <View className="flex flex-col justify-between p-6">
        <Text className="mb-4 text-center text-3xl font-bold">
          Find Your Inner Peace
        </Text>

        <Text className="mb-8 text-center text-lg">
          Discover daily affirmations to boost your mood and mindset.
        </Text>

        <Link href={'/login'} asChild>
          <Button
            className="w-full rounded-lg px-6 py-3"
            variant={'default'}
            size={'lg'}
          >
            <Text className="text-center text-lg font-semibold">
              Get Started
            </Text>
          </Button>
        </Link>
      </View>
    </View>
  );
}
