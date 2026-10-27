import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { TextField } from '@/components/ui/TextField';

export interface SampleFormValidationMessages {
  nameRequired: string;
  nameTooShort: string;
  emailInvalid: string;
}

const defaultValidationMessages: SampleFormValidationMessages = {
  nameRequired: 'Name is required.',
  nameTooShort: 'Please enter at least 2 characters.',
  emailInvalid: 'Please enter a valid email address.',
};

export function createSampleFormSchema(
  messages: SampleFormValidationMessages = defaultValidationMessages,
) {
  return z.object({
    name: z.string().trim().min(1, messages.nameRequired).min(2, messages.nameTooShort),
    email: z.string().trim().email(messages.emailInvalid),
  });
}

export const sampleFormSchema = createSampleFormSchema();

export type SampleFormValues = z.infer<typeof sampleFormSchema>;

export function validateSampleForm(input: unknown) {
  return sampleFormSchema.safeParse(input);
}

const defaultValues: SampleFormValues = {
  name: '',
  email: '',
};

export function SampleForm() {
  const { t } = useTranslation();
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const nameLabel = t('home.nameLabel', { defaultValue: 'Name' });
  const emailLabel = t('home.emailLabel', { defaultValue: 'Email' });
  const submitLabel = t('home.submit', { defaultValue: 'Validate and submit' });
  const localizedSchema = createSampleFormSchema({
    nameRequired: t('home.nameRequired', { defaultValue: 'Name is required.' }),
    nameTooShort: t('home.nameTooShort', {
      defaultValue: 'Please enter at least 2 characters.',
    }),
    emailInvalid: t('home.emailInvalid', {
      defaultValue: 'Please enter a valid email address.',
    }),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SampleFormValues>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(localizedSchema),
  });

  const onSubmit = (values: SampleFormValues) => {
    setSubmittedName(values.name);
    reset(defaultValues);
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <AppText accessibilityRole="header" variant="heading">
          {t('home.formTitle', { defaultValue: 'Validated form' })}
        </AppText>
        <AppText color="muted">
          {t('home.formDescription', {
            defaultValue: 'React Hook Form and Zod validate input before submission.',
          })}
        </AppText>
      </View>

      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextField
            accessibilityLabel={nameLabel}
            autoCapitalize="words"
            autoComplete="name"
            error={errors.name?.message}
            label={nameLabel}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            placeholder={t('home.namePlaceholder', {
              defaultValue: 'Ada Lovelace',
            })}
            returnKeyType="next"
            value={field.value}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextField
            accessibilityLabel={emailLabel}
            autoCapitalize="none"
            autoComplete="email"
            error={errors.email?.message}
            keyboardType="email-address"
            label={emailLabel}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            onSubmitEditing={() => {
              void handleSubmit(onSubmit)();
            }}
            placeholder={t('home.emailPlaceholder', {
              defaultValue: 'ada@example.com',
            })}
            returnKeyType="done"
            value={field.value}
          />
        )}
      />

      <AppButton
        accessibilityLabel={submitLabel}
        fullWidth
        loading={isSubmitting}
        onPress={() => {
          void handleSubmit(onSubmit)();
        }}
        testID="sample-form-submit"
        title={submitLabel}
      />

      {submittedName ? (
        <AppText accessibilityLiveRegion="polite" color="primary" variant="label">
          {t('home.submitted', {
            defaultValue: 'Thanks, {{name}}. The local form is valid.',
            name: submittedName,
          })}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  heading: {
    gap: 4,
  },
});
