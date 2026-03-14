import type { BrokerFormErrors } from '../interfaces/BrokerFormErrors';
import type { ValidateBrokerQuestionnaireFormParams } from '../interfaces/ValidateBrokerQuestionnaireFormParams';

export class BrokerQuestionnaireValidationHelper {
  private static readonly NAME_REGEX = /^[\p{L}\s'-]+$/u;
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private static readonly DIGITS_REGEX = /^\d+$/;
  private static readonly MIN_NAME_LENGTH = 2;
  private static readonly MAX_NAME_LENGTH = 100;
  private static readonly MAX_ADDITIONAL_INFO_LENGTH = 2000;
  private static readonly MIN_PHONE_DIGITS = 7;
  private static readonly MAX_PHONE_DIGITS = 10;

  static splitFullName(fullName: string): { firstName: string; lastName: string } {
    const normalizedName = fullName.trim().replace(/\s+/g, ' ');
    if (!normalizedName) {
      return { firstName: '', lastName: '' };
    }

    const nameParts = normalizedName.split(' ');
    const firstName = nameParts[0] ?? '';
    const lastName = nameParts.slice(1).join(' ');

    return {
      firstName,
      lastName: lastName || firstName,
    };
  }

  static validateForm(params: ValidateBrokerQuestionnaireFormParams): BrokerFormErrors {
    const errors: BrokerFormErrors = {};

    const fullName = params.fullName.trim();
    const email = params.email.trim();
    const phoneDigits = params.phone.trim();
    const additionalInfo = params.additionalInfo.trim();

    if (!fullName) {
      errors.fullName = params.getContent('broker_questionnaire_error_required');
    } else if (fullName.length < this.MIN_NAME_LENGTH) {
      errors.fullName = params.getContent('broker_questionnaire_error_name_min');
    } else if (fullName.length > this.MAX_NAME_LENGTH) {
      errors.fullName = params.getContent('broker_questionnaire_error_name_max');
    } else if (!this.NAME_REGEX.test(fullName)) {
      errors.fullName = params.getContent('broker_questionnaire_error_name_format');
    }

    if (!phoneDigits) {
      errors.phone = params.getContent('broker_questionnaire_error_required');
    } else if (
      !this.DIGITS_REGEX.test(phoneDigits) ||
      phoneDigits.length < this.MIN_PHONE_DIGITS ||
      phoneDigits.length > this.MAX_PHONE_DIGITS
    ) {
      errors.phone = params.getContent('broker_questionnaire_error_phone_format');
    }

    if (!email) {
      errors.email = params.getContent('broker_questionnaire_error_required');
    } else if (!this.EMAIL_REGEX.test(email)) {
      errors.email = params.getContent('broker_questionnaire_error_email_invalid');
    }

    if (!params.city.trim()) {
      errors.city = params.getContent('broker_questionnaire_error_required');
    }

    if (!params.desiredRegion.trim()) {
      errors.desiredRegion = params.getContent('broker_questionnaire_error_required');
    }

    if (!params.employmentType.trim()) {
      errors.employmentType = params.getContent('broker_questionnaire_error_required');
    }

    if (!params.monthlyIncome.trim()) {
      errors.monthlyIncome = params.getContent('broker_questionnaire_error_required');
    }

    if (!params.experience.trim()) {
      errors.experience = params.getContent('broker_questionnaire_error_required');
    }

    if (params.hasClientCases === null) {
      errors.hasClientCases = params.getContent('broker_questionnaire_select_answer');
    }

    if (params.hasDebtCases === null) {
      errors.hasDebtCases = params.getContent('broker_questionnaire_select_answer');
    }

    if (additionalInfo.length > this.MAX_ADDITIONAL_INFO_LENGTH) {
      errors.additionalInfo = params.getContent('broker_questionnaire_error_comments_max');
    }

    if (!params.agreeTerms) {
      errors.agreeTerms = params.getContent('broker_questionnaire_error_agreement');
    }

    return errors;
  }
}
