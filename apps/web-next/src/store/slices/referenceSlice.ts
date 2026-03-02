import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { ReferenceOption } from '@/interfaces/ReferenceOption';

type ReferenceType = 'cities' | 'regions';

function referenceKey(type: ReferenceType, language: string): string {
  return `${type}:${language}`;
}

type ReferenceEntry = {
  data: ReferenceOption[];
  error: string | null;
};

function normalizeCitiesResponse(raw: unknown, lang: string): ReferenceOption[] {
  if (Array.isArray(raw)) {
    return raw.map((item) => {
      if (item && typeof item === 'object' && 'value' in item && 'label' in item) {
        return { value: String(item.value), label: String(item.label) };
      }
      if (item && typeof item === 'object' && 'key' in item && 'name' in item) {
        return { value: String((item as { key: string }).key), label: String((item as { name: string }).name) };
      }
      return { value: '', label: String(item) };
    });
  }
  if (raw && typeof raw === 'object' && 'data' in raw && Array.isArray((raw as { data: unknown[] }).data)) {
    const data = (raw as { data: Array<{ key?: string; name?: string }> }).data;
    return data.map((city) => ({
      value: city.key ?? String(city),
      label: city.name ?? String(city),
    }));
  }
  if (raw && typeof raw === 'object' && 'cities' in raw && Array.isArray((raw as { cities: unknown[] }).cities)) {
    return normalizeCitiesResponse((raw as { cities: unknown[] }).cities, lang);
  }
  return [];
}

function normalizeV1CitiesResponse(raw: unknown, lang: string): ReferenceOption[] {
  if (!raw || typeof raw !== 'object' || !('data' in raw) || !Array.isArray((raw as { data: unknown[] }).data)) {
    return [];
  }
  const data = (raw as { data: Array<{ id: number; name_en?: string; name_he?: string; name_ru?: string }> }).data;
  const langKey = lang === 'he' ? 'name_he' : lang === 'ru' ? 'name_ru' : 'name_en';
  return data.map((city) => ({
    value: city.name_en?.toLowerCase().replace(/\s+/g, '_') ?? String(city.id),
    label: (city[langKey as keyof typeof city] as string) ?? city.name_en ?? '',
  }));
}

function normalizeRegionsResponse(raw: unknown): ReferenceOption[] {
  if (Array.isArray(raw)) {
    return raw.map((item) => {
      if (item && typeof item === 'object' && 'value' in item && 'label' in item) {
        return { value: String(item.value), label: String(item.label) };
      }
      return { value: String(item), label: String(item) };
    });
  }
  return [];
}

export const fetchCities = createAsyncThunk<
  ReferenceEntry,
  string,
  { state: RootState }
>(
  'reference/fetchCities',
  async (language, { getState, rejectWithValue }) => {
    const key = referenceKey('cities', language);
    const existing = getState().reference.byKey[key];
    if (existing?.data?.length) {
      return existing;
    }
    try {
      const res = await fetch(`/api/get-cities?lang=${language}`);
      const data = await res.json();
      if (res.ok) {
        const options = normalizeCitiesResponse(data, language);
        if (options.length > 0) {
          return { data: options, error: null };
        }
      }
    } catch {
      // fallback
    }
    try {
      const res = await fetch('/api/v1/cities');
      const data = await res.json();
      const options = normalizeV1CitiesResponse(data, language);
      return { data: options, error: null };
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Failed to load cities');
    }
  }
);

export const fetchRegions = createAsyncThunk<
  ReferenceEntry,
  string,
  { state: RootState }
>(
  'reference/fetchRegions',
  async (language, { getState, rejectWithValue }) => {
    const key = referenceKey('regions', language);
    const existing = getState().reference.byKey[key];
    if (existing?.data?.length) {
      return existing;
    }
    try {
      const res = await fetch(`/api/get-regions?lang=${language}`);
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(`HTTP ${res.status}`);
      }
      const options = normalizeRegionsResponse(data);
      return { data: options, error: null };
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Failed to load regions');
    }
  }
);

type ReferenceState = {
  byKey: Record<string, ReferenceEntry>;
  loadingByKey: Record<string, boolean>;
};

const initialState: ReferenceState = {
  byKey: {},
  loadingByKey: {},
};

const referenceSlice = createSlice({
  name: 'reference',
  initialState,
  reducers: {
    clearReferenceKey(
      state,
      action: { payload: { type: ReferenceType; language: string } }
    ) {
      const key = referenceKey(action.payload.type, action.payload.language);
      delete state.byKey[key];
      delete state.loadingByKey[key];
    },
    clearAllReference() {
      return { byKey: {}, loadingByKey: {} };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state, action) => {
        const key = referenceKey('cities', action.meta.arg);
        state.loadingByKey[key] = true;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        const key = referenceKey('cities', action.meta.arg);
        state.byKey[key] = action.payload;
        state.loadingByKey[key] = false;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        const key = referenceKey('cities', action.meta.arg);
        state.loadingByKey[key] = false;
        state.byKey[key] = {
          data: [],
          error: (action.payload as string) ?? action.error.message ?? 'Unknown error',
        };
      })
      .addCase(fetchRegions.pending, (state, action) => {
        const key = referenceKey('regions', action.meta.arg);
        state.loadingByKey[key] = true;
      })
      .addCase(fetchRegions.fulfilled, (state, action) => {
        const key = referenceKey('regions', action.meta.arg);
        state.byKey[key] = action.payload;
        state.loadingByKey[key] = false;
      })
      .addCase(fetchRegions.rejected, (state, action) => {
        const key = referenceKey('regions', action.meta.arg);
        state.loadingByKey[key] = false;
        state.byKey[key] = {
          data: [],
          error: (action.payload as string) ?? action.error.message ?? 'Unknown error',
        };
      });
  },
});

export const { clearReferenceKey, clearAllReference } = referenceSlice.actions;

export const selectReferenceEntry =
  (type: ReferenceType, language: string) =>
  (state: RootState): ReferenceEntry | undefined =>
    state.reference.byKey[referenceKey(type, language)];

export const selectReferenceLoading =
  (type: ReferenceType, language: string) =>
  (state: RootState): boolean =>
    state.reference.loadingByKey[referenceKey(type, language)] ?? false;

export default referenceSlice.reducer;
