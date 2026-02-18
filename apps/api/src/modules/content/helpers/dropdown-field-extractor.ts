/**
 * Extracts the logical dropdown field name from a content_key string.
 *
 * The Express monolith used inline regex chains. This class centralises
 * every pattern into a single, testable extractor.
 */
export class DropdownFieldExtractor {
  extract(contentKey: string): string {
    return (
      this.fromMortgageStepField(contentKey) ??
      this.fromMortgageStepUnderscore(contentKey) ??
      this.fromCalculateMortgage(contentKey) ??
      this.fromMortgageCalculationField(contentKey) ??
      this.fromAppRefinanceStep1(contentKey) ??
      this.fromRefinanceStep1Underscore(contentKey) ??
      this.fromRefinanceStep2Underscore(contentKey) ??
      this.fromSimple(contentKey) ??
      contentKey.replace(/[._]/g, '_')
    );
  }

  /* ── Pattern 1: mortgage_step1.field.{fieldName} ── */
  private fromMortgageStepField(key: string): string | null {
    // Numbered options like additional_income_0_no_additional_income
    let m = key.match(
      /^[^.]*\.field\.([^.]+?)_[0-9]_(?:no_additional_income|no_obligations)/,
    );
    if (m) return m[1];

    // Known suffixes
    m = key.match(
      /^[^.]*\.field\.([^.]+)_(?:has_property|no_property|selling_property|within_3_months|3_to_6_months|6_to_12_months|over_12_months|apartment|garden_apartment|penthouse|private_house|other|yes_first_home|no_additional_property|investment|fixed_rate|variable_rate|mixed_rate|not_sure|im_|i_no_|i_own_|selling_|no_|has_|single|married|divorced|widowed|partner|commonlaw_partner|no_high_school_diploma|partial_high_school_diploma|full_high_school_diploma|postsecondary_education|bachelors|masters|doctorate|employee|selfemployed|pension|student|unemployed|unpaid_leave|additional_salary|additional_work|property_rental_income|no_additional_income|bank_loan|consumer_credit|credit_card|no_obligations|hapoalim|leumi|discount|massad|mizrahi)/,
    );
    if (m) return m[1];

    // Field-of-activity style suffixes
    m = key.match(
      /^[^.]*\.field\.([^.]+?)_(?:agriculture|technology|healthcare|education|finance|real_estate|construction|retail|manufacturing|government|transport|consulting|entertainment|other)/,
    );
    if (m) return m[1];

    // Fallback dot-field
    m = key.match(/^[^.]*\.field\.([^.]+)/);
    return m ? m[1] : null;
  }

  /* ── Pattern 1.5: mortgage_stepN_{fieldName} ── */
  private fromMortgageStepUnderscore(key: string): string | null {
    let m = key.match(/^mortgage_step\d+_([^_]+(?:_[^_]+)*)_(?:options_)?ph$/);
    if (m) return m[1];

    if (key.includes('_option_') || key.includes('_options_')) {
      m = key.match(
        /^mortgage_step\d+_([^_]+(?:_[^_]+)*)_(?:option|options)_\d+$/,
      );
      if (m) return m[1];
    }

    m = key.match(/^mortgage_step\d+_([^_]+(?:_[^_]+)*)$/);
    return m ? m[1] : null;
  }

  /* ── Pattern 2: calculate_mortgage_{fieldName} ── */
  private fromCalculateMortgage(key: string): string | null {
    if (!key.includes('calculate_mortgage_')) return null;

    if (key.includes('_ph')) {
      const m = key.match(/calculate_mortgage_([^_]+(?:_[^_]+)*)_ph$/);
      if (m) return m[1];
    }

    if (key.includes('_option_')) {
      const m = key.match(/calculate_mortgage_([^_]+(?:_[^_]+)*)_option_\d+$/);
      if (m) return m[1];
    }

    let m = key.match(
      /calculate_mortgage_([^_]+(?:_[^_]+)*)_(?:im_|i_no_|i_own_|selling_|no_|has_)/,
    );
    if (m) return m[1];

    m = key.match(/calculate_mortgage_([^_]+(?:_[^_]+)*)$/);
    return m ? m[1] : null;
  }

  /* ── Pattern 3: mortgage_calculation.field.{fieldName} ── */
  private fromMortgageCalculationField(key: string): string | null {
    let m = key.match(
      /mortgage_calculation\.field\.([^.]+?)_(?:im_|i_no_|i_own_|selling_|no_|has_)/,
    );
    if (m) return m[1];

    m = key.match(/mortgage_calculation\.field\.([^.]+)/);
    return m ? m[1] : null;
  }

  /* ── Pattern 4: app.refinance.step1.{fieldName} ── */
  private fromAppRefinanceStep1(key: string): string | null {
    const fieldMapping: Record<string, string> = {
      why: 'why',
      property_type: 'property_type',
      registered: 'registration',
      current_bank: 'bank',
      balance: 'balance',
      property_value: 'property_value',
      start_date: 'start_date',
    };

    let m = key.match(/app\.refinance\.step1\.(.+)_label$/);
    if (m) return fieldMapping[m[1]] ?? m[1];

    m = key.match(/app\.refinance\.step1\.(.+)_option_\d+$/);
    if (m) return fieldMapping[m[1]] ?? m[1];

    return null;
  }

  /* ── Pattern 5: refinance_step1_{fieldName} ── */
  private fromRefinanceStep1Underscore(key: string): string | null {
    let m = key.match(
      /refinance_step1_([^_]+(?:_[^_]+)*)_(?:lower_interest_rate|reduce_monthly_payment|shorten_mortgage_term|cash_out_refinance|consolidate_debts|fixed_interest|variable_interest|prime_interest|mixed_interest|other|apartment|private_house|commercial|land|no_not_registered|hapoalim|leumi|discount|massad)/,
    );
    if (m) return m[1];

    m = key.match(/refinance_step1_([^_]+(?:_[^_]+)*)(?:_ph|$)/);
    return m ? m[1] : null;
  }

  /* ── Pattern 6: refinance_step2_{fieldName} ── */
  private fromRefinanceStep2Underscore(key: string): string | null {
    let m = key.match(
      /refinance_step2_([^_]+(?:_[^_]+)*)_(?:bachelors|masters|doctorate|full_certificate|partial_certificate|no_certificate|post_secondary|postsecondary_education|full_high_school_certificate|partial_high_school_certificate|no_high_school_certificate)/,
    );
    if (m) return m[1];

    m = key.match(/refinance_step2_([^_]+(?:_[^_]+)*)(?:_ph|$)/);
    return m ? m[1] : null;
  }

  /* ── Pattern 7: simple fallback ── */
  private fromSimple(key: string): string | null {
    const m = key.match(/([^._]+)(?:_option_|_ph|$)/);
    if (m && m[1] !== 'mortgage' && m[1] !== 'step1' && m[1] !== 'field') {
      return m[1];
    }
    return null;
  }
}
