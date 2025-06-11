import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { H1 } from '~/components/ui/typography';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center bg-white px-4 pb-24 dark:bg-background">
        <H1 className="mb-4 text-center font-semibold text-gray-800 dark:text-gray-100">
          This screen doesn't exist.
        </H1>

        <Link href="/" asChild>
          <Text className="text-base text-primary underline dark:text-primary">
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}
