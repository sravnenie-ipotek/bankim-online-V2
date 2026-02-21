'use client'

import React, { useState, useEffect } from 'react'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'
import { useContentApi } from '@hooks/useContentApi'
import FormContainer from '@/components/ui/FormContainer/FormContainer'
import FormCaption from '@/components/ui/FormCaption/FormCaption'
import FormRow from '@/components/ui/FormRow/FormRow'
import FormColumn from '@/components/ui/FormColumn/FormColumn'
import FormattedInput from '@/components/ui/FormattedInput/FormattedInput'
import SliderInput from '@/components/ui/SliderInput/SliderInput'
import DropdownSelect from '@/components/ui/DropdownSelect/DropdownSelect'
import FormError from '@/components/ui/FormError/FormError'
import { CalculateMortgageTypes } from '@/interfaces/CalculateMortgageTypes'
import type { CityOption } from './interfaces/CityOption'
import type { LtvRatios } from './interfaces/LtvRatios'

const DEFAULT_LTV_RATIOS: LtvRatios = {
  no_property: 0.75,
  has_property: 0.50,
  selling_property: 0.70,
}

function getMinInitialPayment(priceOfEstate: number, propertyOwnership: string, ltvRatios: LtvRatios): number {
  if (!priceOfEstate || priceOfEstate === 0) return 0
  const ltvRatio = ltvRatios[propertyOwnership] || ltvRatios.no_property || 0.75
  const maxLoanAmount = priceOfEstate * ltvRatio
  return priceOfEstate - maxLoanAmount
}

const FirstStepForm: React.FC = () => {
  const { i18n } = useTranslation()
  const { getContent } = useContentApi('mortgage_step1')

  const [cityOptions, setCityOptions] = useState<CityOption[]>([])
  const [ltvRatios, setLtvRatios] = useState<LtvRatios>(DEFAULT_LTV_RATIOS)

  const { setFieldValue, values, errors, touched, setFieldTouched } =
    useFormikContext<CalculateMortgageTypes>()

  // Fetch cities from API (get-cities returns { key, name }; fallback to v1/cities on failure)
  useEffect(() => {
    const lang = i18n.language || 'en'
    const fetchCities = async () => {
      try {
        const response = await fetch(`/api/get-cities?lang=${lang}`)
        const data = await response.json()
        if (data.status === 'success' && Array.isArray(data.data)) {
          const formatted: CityOption[] = data.data.map((city: { key: string; name: string }) => ({
            value: city.key,
            label: city.name,
          }))
          setCityOptions(formatted)
          return
        }
      } catch {
        // Fallback: try hardcoded cities
      }
      try {
        const response = await fetch('/api/v1/cities')
        const data = await response.json()
        if (data.status === 'success' && Array.isArray(data.data)) {
          const langKey = lang === 'he' ? 'name_he' : lang === 'ru' ? 'name_ru' : 'name_en'
          const formatted: CityOption[] = data.data.map(
            (city: { id: number; name_en: string; name_he: string; name_ru: string }) => ({
              value: String(city.id),
              label: city[langKey as keyof typeof city] ?? city.name_en,
            }),
          )
          setCityOptions(formatted)
        }
      } catch {
        setCityOptions([])
      }
    }
    fetchCities()
  }, [i18n.language])

  // Fetch LTV ratios from API
  useEffect(() => {
    const fetchLtvRatios = async () => {
      try {
        const response = await fetch('/api/v1/calculation-parameters?business_path=mortgage')
        const data = await response.json()
        if (data.status === 'success' && data.data?.property_ownership_ltvs) {
          const ratios: LtvRatios = {}
          Object.keys(data.data.property_ownership_ltvs).forEach((key) => {
            ratios[key] = data.data.property_ownership_ltvs[key].ltv / 100
          })
          setLtvRatios(ratios)
        }
      } catch {
        setLtvRatios(DEFAULT_LTV_RATIOS)
      }
    }
    fetchLtvRatios()
  }, [])

  // Auto-adjust initial payment when property ownership changes
  useEffect(() => {
    if (values.propertyOwnership && values.priceOfEstate) {
      const minPayment = getMinInitialPayment(values.priceOfEstate, values.propertyOwnership, ltvRatios)
      if (values.initialFee < minPayment) {
        setFieldValue('initialFee', minPayment)
      } else if (values.initialFee > values.priceOfEstate) {
        setFieldValue('initialFee', values.priceOfEstate)
      }
    }
  }, [values.propertyOwnership, values.priceOfEstate, ltvRatios, values.initialFee, setFieldValue])

  // Dropdown options
  const whenNeededOptions = [
    { value: 'option_1', label: getContent('calculate_mortgage_when_options_1') },
    { value: 'option_2', label: getContent('calculate_mortgage_when_options_2') },
    { value: 'option_3', label: getContent('calculate_mortgage_when_options_3') },
    { value: 'option_4', label: getContent('calculate_mortgage_when_options_4') },
  ]

  const typeOptions = [
    { value: 'option_1', label: getContent('calculate_mortgage_type_options_1') },
    { value: 'option_2', label: getContent('calculate_mortgage_type_options_2') },
    { value: 'option_3', label: getContent('calculate_mortgage_type_options_3') },
    { value: 'option_4', label: getContent('calculate_mortgage_type_options_4') },
  ]

  const firstHomeOptions = [
    { value: 'option_1', label: getContent('calculate_mortgage_first_options_1') },
    { value: 'option_2', label: getContent('calculate_mortgage_first_options_2') },
    { value: 'option_3', label: getContent('calculate_mortgage_first_options_3') },
  ]

  const propertyOwnershipOptions = [
    { value: 'no_property', label: getContent('calculate_mortgage_property_ownership_option_1') },
    { value: 'has_property', label: getContent('calculate_mortgage_property_ownership_option_2') },
    { value: 'selling_property', label: getContent('calculate_mortgage_property_ownership_option_3') },
  ]

  const minInitialPayment = getMinInitialPayment(values.priceOfEstate, values.propertyOwnership, ltvRatios)

  return (
    <FormContainer>
      <FormCaption title={getContent('calculate_mortgage_title')} />

      {/* Row 1: Price, City, When */}
      <FormRow>
        <FormColumn>
          <FormattedInput
            name="priceOfEstate"
            title={getContent('calculate_mortgage_price')}
            value={values.priceOfEstate}
            onChange={(val) => setFieldValue('priceOfEstate', val || 0)}
            placeholder="1,000,000"
            error={touched.priceOfEstate ? errors.priceOfEstate : undefined}
            data-testid="property-price-input"
          />
          {touched.priceOfEstate && errors.priceOfEstate && <FormError error={errors.priceOfEstate} />}
        </FormColumn>
        <FormColumn>
          <DropdownSelect
            title={getContent('calculate_mortgage_city')}
            data={cityOptions}
            placeholder={getContent('bank_worker_select_city')}
            value={values.cityWhereYouBuy}
            onChange={(val) => setFieldValue('cityWhereYouBuy', val)}
            onBlur={() => setFieldTouched('cityWhereYouBuy', true)}
            searchable
            searchPlaceholder={getContent('search')}
            nothingFoundText={getContent('nothing_found')}
            error={touched.cityWhereYouBuy ? errors.cityWhereYouBuy : undefined}
            data-testid="city-dropdown"
          />
        </FormColumn>
        <FormColumn>
          <DropdownSelect
            title={getContent('calculate_mortgage_when')}
            data={whenNeededOptions}
            placeholder={getContent('calculate_mortgage_when_options_ph')}
            value={values.whenDoYouNeedMoney}
            onChange={(val) => setFieldValue('whenDoYouNeedMoney', val)}
            onBlur={() => setFieldTouched('whenDoYouNeedMoney', true)}
            error={touched.whenDoYouNeedMoney ? errors.whenDoYouNeedMoney : undefined}
            data-testid="when-needed-dropdown"
          />
        </FormColumn>
      </FormRow>

      {/* Row 2: Initial Fee, Type, First Home */}
      <FormRow>
        <FormColumn>
          <SliderInput
            name="initialFee"
            title={getContent('calculate_mortgage_initial_fee')}
            value={values.initialFee}
            min={minInitialPayment}
            max={values.priceOfEstate || 1}
            onChange={(val) => setFieldValue('initialFee', val)}
            error={touched.initialFee ? errors.initialFee : undefined}
            disableRangeValues
            data-testid="initial-fee-input"
          />
          {touched.initialFee && errors.initialFee && <FormError error={errors.initialFee} />}
        </FormColumn>
        <FormColumn>
          <DropdownSelect
            title={getContent('calculate_mortgage_type')}
            data={typeOptions}
            placeholder={getContent('calculate_mortgage_type_ph')}
            value={values.typeSelect}
            onChange={(val) => setFieldValue('typeSelect', val)}
            onBlur={() => setFieldTouched('typeSelect', true)}
            error={touched.typeSelect ? errors.typeSelect : undefined}
            data-testid="property-type-dropdown"
          />
        </FormColumn>
        <FormColumn>
          <DropdownSelect
            title={getContent('calculate_mortgage_first')}
            data={firstHomeOptions}
            placeholder={getContent('calculate_mortgage_first_ph')}
            value={values.willBeYourFirst}
            onChange={(val) => setFieldValue('willBeYourFirst', val)}
            onBlur={() => setFieldTouched('willBeYourFirst', true)}
            error={touched.willBeYourFirst ? errors.willBeYourFirst : undefined}
            data-testid="first-home-dropdown"
          />
        </FormColumn>
      </FormRow>

      {/* Row 3: Property Ownership */}
      <FormRow>
        <FormColumn>
          <DropdownSelect
            title={getContent('calculate_mortgage_property_ownership')}
            data={propertyOwnershipOptions}
            placeholder={getContent('calculate_mortgage_property_ownership_ph')}
            value={values.propertyOwnership}
            onChange={(val) => setFieldValue('propertyOwnership', val)}
            onBlur={() => setFieldTouched('propertyOwnership', true)}
            error={touched.propertyOwnership ? errors.propertyOwnership : undefined}
            data-testid="property-ownership-dropdown"
          />
        </FormColumn>
        <FormColumn />
        <FormColumn />
      </FormRow>

      {/* Divider */}
      <div className="w-full border-t border-[#333535]" />

      {/* Period and Monthly Payment */}
      <FormRow>
        <FormColumn>
          <SliderInput
            name="period"
            title={getContent('calculate_mortgage_period')}
            value={values.period}
            min={4}
            max={30}
            onChange={(val) => setFieldValue('period', val)}
            currencySymbol=""
            unitsMin={getContent('calculate_mortgage_period_units_min')}
            unitsMax={getContent('calculate_mortgage_period_units_max')}
            error={touched.period ? errors.period : undefined}
          />
          {touched.period && errors.period && <FormError error={errors.period} />}
        </FormColumn>
        <FormColumn>
          <SliderInput
            name="monthlyPayment"
            title={getContent('calculate_mortgage_initial_payment')}
            value={values.monthlyPayment}
            min={2654}
            max={values.priceOfEstate || 1}
            onChange={(val) => setFieldValue('monthlyPayment', val)}
            error={touched.monthlyPayment ? errors.monthlyPayment : undefined}
          />
          {touched.monthlyPayment && errors.monthlyPayment && <FormError error={errors.monthlyPayment} />}
        </FormColumn>
        <FormColumn />
      </FormRow>
    </FormContainer>
  )
}

export default FirstStepForm
