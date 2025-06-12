import { Link, Redirect, RelativePathString } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { useRegisterMutation } from '~/lib/hooks/useAuth';
import { useAuthStore } from '~/store/authStore';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterScreen() {
  const register = useRegisterMutation();
  const { accessToken, refreshToken, isLoading } = useAuthStore();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const password = watch('password');

  const onSubmit = (data: RegisterForm) => {
    const { name, email, password } = data;
    register.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          return <Redirect href={'/affirmations' as RelativePathString} />;
        },
        onError: (error: any) => {
          console.error('Registration error:', error);
          Alert.alert('Failed to create account');
        },
      },
    );
  };

  if (accessToken && refreshToken) {
    return <Redirect href={'/affirmations' as RelativePathString} />;
  }

  return (
    <View className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="justify-center px-6">
          <View className="mb-12 items-center">
            <Text className="mb-2 text-3xl font-bold">Create Account</Text>
            <Text className="text-center text-base">
              Start your journey with daily affirmations
            </Text>
          </View>

          <View className="mb-8 gap-4">
            <Controller
              control={control}
              name="name"
              rules={{ required: 'Name is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Label>Name</Label>
                  <Input
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter your name"
                  />
                  {errors.name?.message && (
                    <Text className="text-sm text-destructive">
                      {errors.name.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Label>Email</Label>
                  <Input
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="Enter your email"
                  />
                  {errors.email?.message && (
                    <Text className="text-sm text-destructive">
                      {errors.email.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Label>Password</Label>
                  <Input
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    placeholder="Enter your password"
                  />
                  {errors.password?.message && (
                    <Text className="text-sm text-destructive">
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Label>Confirm Password</Label>
                  <Input
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword?.message && (
                    <Text className="text-sm text-destructive">
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Button
              disabled={isLoading || (!!accessToken && !!refreshToken)}
              onPress={handleSubmit(onSubmit)}
              className="mt-2"
            >
              <Text>Sign Up</Text>
            </Button>
          </View>

          <View className="flex-row items-center justify-center">
            <Text>Already have an account? </Text>
            <Link href={'/login'}>
              <Text className="font-semibold">Log In</Text>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
