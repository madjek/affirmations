import React, { useEffect } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import {
  useMyAffirmationsQuery,
  useSaveAffirmationMutation,
  useUnsaveAffirmationMutation,
} from '~/lib/hooks/useAffirmation';
import { CircleUser } from '~/lib/icons/CircleUser';
import { Globe } from '~/lib/icons/Globe';
import { Save } from '~/lib/icons/Save';
import { Share } from '~/lib/icons/Share';
import { Affirmation } from '~/lib/interfaces/affirmation.interface';
import { cn } from '~/lib/utils/cn';
import { formatCategory } from '~/lib/utils/formatCategory';
import { Button } from './ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from './ui/context-menu';
import { Text } from './ui/text';

export default function AffirmationCard({
  affirmation,
  explore,
}: {
  affirmation: Affirmation;
  explore?: boolean;
}) {
  const { mutate: save, isPending, isSuccess } = useSaveAffirmationMutation();
  const {
    mutate: unsave,
    isPending: isUnsavePending,
    isSuccess: isUnsaveSuccess,
  } = useUnsaveAffirmationMutation();
  const { data } = useMyAffirmationsQuery();
  const isSaved = data?.some((a) => a.id === affirmation.id);

  useEffect(() => {
    if (isSuccess)
      Toast.show({
        type: 'success',
        text1: 'Affirmation saved',
      });
  }, [isSuccess]);

  useEffect(() => {
    if (isUnsaveSuccess)
      Toast.show({
        type: 'success',
        text1: 'Affirmation removed',
      });
  }, [isUnsaveSuccess]);

  return (
    <ContextMenu>
      <ContextMenuTrigger className="relative mb-2 rounded-xl bg-background shadow">
        <View className="absolute left-0 top-1 flex w-full flex-row items-center justify-between pl-4 pr-1">
          <Text className="text-xs text-muted-foreground">
            {formatCategory(affirmation.category)}
          </Text>
          {explore ? (
            <>
              {affirmation.createdByMe ? null : affirmation.createdByUser ? (
                <CircleUser className="text-primary" size={16} />
              ) : (
                <View className="flex flex-row gap-1">
                  {isSaved ? (
                    <Save className="text-primary" size={16} />
                  ) : (
                    <Globe className="text-primary" size={16} />
                  )}
                </View>
              )}
            </>
          ) : affirmation.saved ? (
            <Save className="text-primary" size={16} />
          ) : (
            affirmation.isPublic && (
              <Share
                className={cn(
                  affirmation.isApproved ? 'text-primary' : 'text-muted',
                )}
                size={16}
              />
            )
          )}
        </View>
        {<Text className="mt-4 px-4 py-2 font-medium">{affirmation.text}</Text>}
      </ContextMenuTrigger>
      {!affirmation.createdByMe && (
        <ContextMenuContent align="start" className="p-0">
          {explore ? (
            <>
              {isSaved ? (
                <Button
                  disabled={isUnsavePending}
                  onPress={() => unsave(affirmation.id)}
                >
                  <Text>Remove from my list</Text>
                </Button>
              ) : (
                <Button
                  disabled={isPending}
                  onPress={() => save(affirmation.id)}
                >
                  <Text>Add to my list</Text>
                </Button>
              )}
            </>
          ) : (
            <>
              {affirmation.saved && (
                <Button
                  disabled={isUnsavePending}
                  onPress={() => unsave(affirmation.id)}
                >
                  <Text>Remove from my list</Text>
                </Button>
              )}
            </>
          )}
        </ContextMenuContent>
      )}
    </ContextMenu>
  );
}
