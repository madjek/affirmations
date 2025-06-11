import React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { withAuth } from '~/providers/withAuth';

function AllAffirmations() {
  return (
    <View className="flex-1">
      <View className="flex flex-row items-center justify-between p-6">
        <Text className="text-3xl font-bold">All Affirmations</Text>
      </View>
    </View>
  );
}

export default withAuth(AllAffirmations);
