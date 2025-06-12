import React, { useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import AffirmationCard from '~/components/AffirmationCard';
import CategorySelect from '~/components/CategorySelect';
import { Text } from '~/components/ui/text';
import { AffirmationCategory } from '~/lib/constants/affirmation';
import { usePublicAffirmationsQuery } from '~/lib/hooks/useAffirmation';
import { useSettingsStore } from '~/store/settingsStore';

export default function AllAffirmations() {
  const { language } = useSettingsStore();
  const { data, isLoading, isError } = usePublicAffirmationsQuery(language);

  console.log(data);

  const [category, setCategory] = useState<AffirmationCategory>(
    AffirmationCategory.MOTIVATION,
  );

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
        <Text className="text-lg">No affirmations found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View className="flex flex-row items-center justify-between p-6">
        <Text className="text-3xl font-bold">Explore</Text>
        <CategorySelect
          className="w-40"
          category={category}
          setCategory={setCategory}
        />
      </View>

      <FlatList
        data={data.filter((item) => item.category === category)}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        renderItem={({ item }) => (
          <AffirmationCard key={item.id} explore affirmation={item} />
        )}
      />
    </View>
  );
}
