import React from 'react';
import { View } from 'react-native';
import { withAuth } from '~/components/providers/withAuth';
import { Text } from '~/components/ui/text';

function Settings() {
  return (
    <View className="flex-1">
      <View className="flex flex-row items-center justify-between p-6">
        <Text className="text-3xl font-bold">Settings</Text>
      </View>
    </View>
  );
}
export default withAuth(Settings);
