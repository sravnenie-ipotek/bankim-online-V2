import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { SubmitBrokerDto } from './submit-broker.dto';

function validateDto(
  plain: Record<string, unknown>,
): ReturnType<typeof validateSync> {
  const dto = plainToInstance(SubmitBrokerDto, plain);
  return validateSync(dto);
}

const validPayload: Record<string, unknown> = {
  firstName: 'Jane',
  lastName: 'Doe',
  phone: '+972501234567',
  email: 'jane@example.com',
  city: 'tel_aviv',
  desiredRegion: 'center',
  employmentType: 'employment',
  monthlyIncome: '10000',
  experience: '5',
  hasClientCases: true,
  hasDebtCases: false,
  agreeTerms: true,
};

describe('SubmitBrokerDto', () => {
  describe('valid payload', () => {
    it('passes validation', () => {
      const errors = validateDto(validPayload);
      expect(errors).toHaveLength(0);
    });
  });

  describe('negative validation', () => {
    it('fails when firstName is missing', () => {
      const payload = { ...validPayload, firstName: undefined };
      const errors = validateDto(payload);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'firstName')).toBe(true);
    });

    it('fails when email is invalid', () => {
      const payload = { ...validPayload, email: 'not-an-email' };
      const errors = validateDto(payload);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'email')).toBe(true);
    });

    it('fails when email is empty string', () => {
      const payload = { ...validPayload, email: '' };
      const errors = validateDto(payload);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'email')).toBe(true);
    });

    it('fails when hasClientCases is not boolean', () => {
      const payload = { ...validPayload, hasClientCases: 'yes' };
      const errors = validateDto(payload);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'hasClientCases')).toBe(true);
    });

    it('fails when agreeTerms is not boolean', () => {
      const payload = { ...validPayload, agreeTerms: 'yes' };
      const errors = validateDto(payload);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'agreeTerms')).toBe(true);
    });

    it('fails when additionalInfo exceeds MaxLength', () => {
      const payload = {
        ...validPayload,
        additionalInfo: 'x'.repeat(2001),
      };
      const errors = validateDto(payload);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'additionalInfo')).toBe(true);
    });

    it('fails when licenseNumber exceeds MaxLength', () => {
      const payload = {
        ...validPayload,
        licenseNumber: 'x'.repeat(256),
      };
      const errors = validateDto(payload);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'licenseNumber')).toBe(true);
    });

    it('fails when phone is missing', () => {
      const payload = { ...validPayload, phone: undefined };
      const errors = validateDto(payload);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'phone')).toBe(true);
    });

    it('fails when lastName is missing', () => {
      const payload = { ...validPayload, lastName: undefined };
      const errors = validateDto(payload);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'lastName')).toBe(true);
    });
  });
});
