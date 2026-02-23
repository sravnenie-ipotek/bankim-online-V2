import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export type UploadDocumentPayload = {
  uploadId: string;
  file: File;
};

export const uploadDocument = createAsyncThunk<
  void,
  UploadDocumentPayload,
  { rejectValue: string }
>(
  'documents/upload',
  async (payload, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('file', payload.file);
    formData.append('uploadId', payload.uploadId);
    const res = await fetch('/api/documents/upload', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) return rejectWithValue('Upload failed');
  }
);

type DocumentsState = {
  uploadLoading: boolean;
  uploadError: string | null;
};

const initialState: DocumentsState = {
  uploadLoading: false,
  uploadError: null,
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    clearDocumentsError(state) {
      state.uploadError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadDocument.pending, (state) => {
        state.uploadLoading = true;
        state.uploadError = null;
      })
      .addCase(uploadDocument.fulfilled, (state) => {
        state.uploadLoading = false;
        state.uploadError = null;
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.uploadLoading = false;
        state.uploadError = (action.payload as string) ?? action.error.message ?? 'Unknown error';
      });
  },
});

export const { clearDocumentsError } = documentsSlice.actions;

export const selectDocumentsUploadLoading = (state: RootState): boolean =>
  state.documents.uploadLoading;
export const selectDocumentsUploadError = (state: RootState): string | null =>
  state.documents.uploadError;

export default documentsSlice.reducer;
