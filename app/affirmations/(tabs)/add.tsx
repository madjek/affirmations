import { RelativePathString, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import CategorySelect from '~/components/CategorySelect';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Switch } from '~/components/ui/switch';
import { Text } from '~/components/ui/text';
import { Textarea } from '~/components/ui/textarea';
import { AffirmationCategory } from '~/lib/constants/affirmation';
import { useCreateAffirmationMutation } from '~/lib/hooks/useAffirmation';
import { CreateAffirmation } from '~/lib/interfaces/affirmation.interface';
import { useSettingsStore } from '~/store/settingsStore';

export default function Add() {
  const { language } = useSettingsStore();
  const {
    mutate: create,
    isPending,
    isSuccess,
  } = useCreateAffirmationMutation();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAffirmation>({
    defaultValues: {
      text: '',
      category: AffirmationCategory.MOTIVATION,
      language,
      isPublic: false,
    },
  });

  const onSubmit = (data: CreateAffirmation) => {
    create(data);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      Promise.resolve().then(() => {
        router.replace('/affirmations' as RelativePathString);
      });
    }
  }, [isSuccess]);

  const [triggerWidth, setTriggerWidth] = useState(0);

  const onTriggerLayout = (event: any) => {
    setTriggerWidth(event.nativeEvent.layout.width);
  };

  return (
    <View className="flex-1 gap-6 p-6">
      <Text className="text-3xl font-bold">Add Affirmation</Text>

      <Controller
        control={control}
        name="text"
        rules={{ required: 'Affirmation text is required' }}
        render={({ field: { onChange, value } }) => (
          <View>
            <Label>Text</Label>
            <Textarea
              numberOfLines={3}
              className="rounded border border-gray-300 p-2"
              placeholder="Write your affirmation here..."
              value={value}
              onChangeText={onChange}
            />
            {errors.text && (
              <Text className="text-red-500">{errors.text.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="category"
        rules={{ required: 'Category is required' }}
        render={({ field: { onChange, value } }) => (
          <View>
            <Label>Category</Label>
            <CategorySelect
              category={value}
              setCategory={(el) => onChange(value)}
            />
          </View>
        )}
      />

      <Controller
        control={control}
        name="isPublic"
        render={({ field: { onChange, value } }) => (
          <View className="flex-row items-center justify-between">
            <Label>Share with others</Label>
            <Switch checked={!!value} onCheckedChange={onChange} />
          </View>
        )}
      />

      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
        className="mt-6"
      >
        <Text>{isPending ? 'Submitting...' : 'Create'}</Text>
      </Button>
    </View>
  );
}
