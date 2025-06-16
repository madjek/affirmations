import notifee, { AuthorizationStatus } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { withAuth } from '~/components/providers/withAuth';
import { Button } from '~/components/ui/button';
import { Switch } from '~/components/ui/switch';
import { Text } from '~/components/ui/text';
import { useNotificationPermissionStatus } from '~/lib/hooks/useNotificationPermissionStatus';

const STORAGE_KEY = 'notifications_enabled';

function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const permissionStatus = useNotificationPermissionStatus();

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored === 'true') {
        setNotificationsEnabled(true);
      }
      setIsLoading(false);
    })();
  }, []);

  const handleToggle = async (checked: boolean) => {
    setNotificationsEnabled(checked);
    await AsyncStorage.setItem(STORAGE_KEY, String(checked));

    if (checked) {
      const settings = await notifee.requestPermission();

      if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
        Toast.show({
          type: 'success',
          text1: 'Permission granted',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Permission denied',
        });
        setNotificationsEnabled(false);
        await AsyncStorage.setItem(STORAGE_KEY, 'false');
      }
    }
  };

  const sendTestNotification = async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  if (isLoading) return null;

  return (
    <View className="flex-1">
      <View className="flex flex-row items-center justify-between p-6">
        <Text className="text-3xl font-bold">Settings</Text>
      </View>

      <View className="gap-4 p-6">
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-medium">Notifications</Text>
          <Switch
            checked={notificationsEnabled}
            onCheckedChange={handleToggle}
          />
        </View>

        <Button
          onPress={sendTestNotification}
          disabled={permissionStatus !== AuthorizationStatus.AUTHORIZED}
        >
          <Text>Send test notification</Text>
        </Button>
      </View>
    </View>
  );
}

export default withAuth(Settings);
