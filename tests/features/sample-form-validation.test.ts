import { validateSampleForm } from '@/features/home/components/SampleForm';

describe('sample form validation', () => {
  it('rejects invalid boundary input with field-specific messages', () => {
    const result = validateSampleForm({ name: 'A', email: 'not-an-email' });

    expect(result.success).toBe(false);
    if (result.success) {
      throw new Error('Expected validation to fail.');
    }

    expect(result.error.flatten().fieldErrors).toMatchObject({
      name: ['Please enter at least 2 characters.'],
      email: ['Please enter a valid email address.'],
    });
  });

  it('accepts a valid name and email address', () => {
    const result = validateSampleForm({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
    });

    expect(result.success).toBe(true);
  });
});
