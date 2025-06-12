import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { withAuth } from '~/components/providers/withAuth';
import { CirclePlus } from '~/lib/icons/CirclePlus';
import { Heart } from '~/lib/icons/Heart';
import { TentTree } from '~/lib/icons/TentTree';

function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: () => <TentTree className="text-primary" size={28} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Affirmations',
          tabBarIcon: () => <Heart className="text-primary" size={28} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: () => <CirclePlus className="text-primary" size={28} />,
        }}
      />
    </Tabs>
  );
}

export default withAuth(TabLayout);
