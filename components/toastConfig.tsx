import React from 'react';
import { View } from 'react-native';
import { BaseToastProps } from 'react-native-toast-message';
import { Text } from '~/components/ui/text';

interface CustomToastProps extends BaseToastProps {
  text1?: string;
  text2?: string;
}

const getToast = ({ text1, text2 }: CustomToastProps, color: string) => (
  <View className="flex max-w-[90vw] flex-col items-center justify-center">
    <View
      className={'rounded-lg border bg-background p-4'}
      style={{ borderColor: color }}
    >
      {text1 && (
        <Text className="text-lg font-semibold" style={{ color }}>
          {text1}
        </Text>
      )}
      {text2 && <Text className="mt-1 text-muted-foreground">{text2}</Text>}
    </View>
  </View>
);

const toastConfig = {
  error: (props: CustomToastProps) => getToast(props, 'red'),

  success: (props: CustomToastProps) => getToast(props, 'green'),
};

export default toastConfig;
