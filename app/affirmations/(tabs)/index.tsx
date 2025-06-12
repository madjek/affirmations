import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import AffirmationCard from '~/components/AffirmationCard';
import { Text } from '~/components/ui/text';
import { useMyAffirmationsQuery } from '~/lib/hooks/useAffirmation';

export default function MyAffirmations() {
  const { data, isLoading, isError } = useMyAffirmationsQuery();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text className="mt-4">Loading affirmations...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Failed to load affirmations</Text>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View className="items-center justify-center">
        <Text className="text-lg">No affirmations found. Add some!</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 gap-6 p-6">
      <Text className="text-3xl font-bold">My Affirmations</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AffirmationCard affirmation={item} />}
      />
    </View>
  );
}
