import { Link, Redirect, RelativePathString } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { useLoginMutation } from '~/hooks/useAuth';
import { useAuthStore } from '~/store/authStore';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const login = useLoginMutation();
  const { accessToken, refreshToken, isLoading } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    login.mutate(data, {
      onError: (error: any) => {
        console.error('Login error:', error);
        Alert.alert('Invalid email or password');
      },
    });
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
            <Text className="mb-2 text-3xl font-bold">Welcome Back</Text>
            <Text className="text-center text-base">
              Welcome back to your daily affirmations
            </Text>
          </View>

          <View className="mb-8 gap-4">
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
              rules={{ required: 'Password is required' }}
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

            <Button
              disabled={isLoading || (!!accessToken && !!refreshToken)}
              onPress={handleSubmit(onSubmit)}
              className="mt-2"
            >
              <Text>Login</Text>
            </Button>

            <TouchableOpacity className="mt-4 items-center">
              <Text className="text-sm">Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center justify-center">
            <Text>Don't have an account? </Text>
            <Link href={'/register'}>
              <Text className="font-semibold">Create Account</Text>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
