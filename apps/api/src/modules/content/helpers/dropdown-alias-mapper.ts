/**
 * Applies alias mappings and hardcoded fallback options for known screens.
 *
 * Ported 1-to-1 from the Express monolith dropdown endpoint.
 */

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownResponse {
  dropdowns: { key: string; label: string }[];
  options: Record<string, DropdownOption[]>;
  placeholders: Record<string, string>;
  labels: Record<string, string>;
}

export class DropdownAliasMapper {
  applyAliases(
    screen: string,
    language: string,
    response: DropdownResponse,
  ): void {
    this.applyCitizenshipAlias(screen, response);
    this.applyStep1Aliases(screen, language, response);
  }

  /* ── mortgage_step2 citizenship → citizenship_countries ── */
  private applyCitizenshipAlias(
    screen: string,
    response: DropdownResponse,
  ): void {
    if (screen !== 'mortgage_step2') return;
    const mainKey = `${screen}_citizenship`;
    const aliasKey = `${screen}_citizenship_countries`;
    if (!response.options[mainKey]) return;

    response.options[aliasKey] = response.options[mainKey];
    if (response.labels[mainKey])
      response.labels[aliasKey] = response.labels[mainKey];
    if (response.placeholders[mainKey])
      response.placeholders[aliasKey] = response.placeholders[mainKey];
    response.dropdowns.push({
      key: aliasKey,
      label: response.labels[aliasKey] ?? 'citizenship countries',
    });
  }

  /* ── mortgage_step1: when/when_needed  &  first/first_home ── */
  private applyStep1Aliases(
    screen: string,
    language: string,
    response: DropdownResponse,
  ): void {
    if (screen !== 'mortgage_step1') return;

    const aliasPairs: { source: string; alias: string }[] = [
      { source: 'when', alias: 'when_needed' },
      { source: 'first', alias: 'first_home' },
    ];

    for (const { source, alias } of aliasPairs) {
      const sourceKey = `${screen}_${source}`;
      const aliasKey = `${screen}_${alias}`;
      if (response.options[sourceKey] && !response.options[aliasKey]) {
        response.options[aliasKey] = response.options[sourceKey];
        if (response.labels[sourceKey])
          response.labels[aliasKey] = response.labels[sourceKey];
        if (response.placeholders[sourceKey])
          response.placeholders[aliasKey] = response.placeholders[sourceKey];
        response.dropdowns.push({
          key: aliasKey,
          label: response.labels[aliasKey] ?? alias.replace(/_/g, ' '),
        });
      }
    }

    this.ensureWhenNeeded(screen, language, response);
    this.ensureFirstHome(screen, language, response);
  }

  private ensureWhenNeeded(
    screen: string,
    language: string,
    response: DropdownResponse,
  ): void {
    const key = 'mortgage_step1_when_needed';
    if (response.options[key]) return;

    const isHe = language === 'he';
    response.options[key] = [
      {
        value: 'within_3_months',
        label: isHe ? 'תוך 3 חודשים' : 'Within 3 months',
      },
      { value: '3_to_6_months', label: isHe ? '3-6 חודשים' : '3 to 6 months' },
      {
        value: '6_to_12_months',
        label: isHe ? '6-12 חודשים' : '6 to 12 months',
      },
      {
        value: 'more_than_12_months',
        label: isHe ? 'יותר מ-12 חודשים' : 'More than 12 months',
      },
    ];
    response.labels[key] = isHe
      ? 'מתי תזדקק למשכנתא?'
      : 'When do you need the mortgage?';
    response.placeholders[key] = isHe ? 'בחר מסגרת זמן' : 'Select timing';
    response.dropdowns.push({ key, label: response.labels[key] });
  }

  private ensureFirstHome(
    screen: string,
    language: string,
    response: DropdownResponse,
  ): void {
    const key = 'mortgage_step1_first_home';
    if (response.options[key]) return;

    const isHe = language === 'he';
    response.options[key] = [
      { value: 'yes', label: isHe ? 'כן, דירה ראשונה' : 'Yes, first home' },
      {
        value: 'no',
        label: isHe ? 'לא, דירה נוספת' : 'No, additional property',
      },
      {
        value: 'investment',
        label: isHe ? 'נכס להשקעה' : 'Investment property',
      },
    ];
    response.labels[key] = isHe
      ? 'האם מדובר בדירה ראשונה?'
      : 'Is this your first home?';
    response.placeholders[key] = isHe ? 'בחר אפשרות' : 'Select option';
    response.dropdowns.push({ key, label: response.labels[key] });
  }
}
