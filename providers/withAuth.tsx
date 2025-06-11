import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuthStore } from '~/store/authStore';

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
) {
  const ComponentWithAuth = (props: P) => {
    const { accessToken, isLoading } = useAuthStore();
    const navigation = useNavigation<NavigationProp<any>>();

    useEffect(() => {
      if (!isLoading && !accessToken) {
        navigation.navigate('index' as never);
      }
    }, [accessToken, isLoading]);

    if (isLoading || (!accessToken && !navigation.isFocused())) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator />
        </View>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
}
