/**
 * Admin Redux Slice
 * Manages admin authentication and state
 */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StorageHelper } from '@/helpers/StorageHelper';
import type { AdminState } from './interfaces/AdminState';

// Initial state
const initialState: AdminState = {
  user: null,
  token: StorageHelper.getItem('adminToken'),
  isAuthenticated: false,
  isLoading: false,
  error: null,
  stats: {
    totalClients: 0,
    totalAdmins: 0,
    totalBanks: 0,
    totalApplications: 0,
    lastUpdated: null,
  },
  bankWorkerInvitations: [],
  bankWorkerApprovals: [],
  bankWorkerLoading: false,
};

// API base URL
const getApiBaseUrl = (): string => {
  if (process.env.NODE_ENV === 'development') {
    return '/api';
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
};

const API_BASE_URL = getApiBaseUrl();

/**
 * Admin Login Async Thunk
 */
export const adminLogin = createAsyncThunk(
  'admin/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed');
      }

      StorageHelper.setItem('adminToken', data.data.token);

      return data.data;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

/**
 * Get Admin Profile Async Thunk
 */
export const getAdminProfile = createAsyncThunk(
  'admin/getProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { admin: AdminState };
      const token = state.admin.token;

      if (!token) {
        return rejectWithValue('No authentication token');
      }

      const response = await fetch(`${API_BASE_URL}/admin/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          StorageHelper.removeItem('adminToken');
        }
        return rejectWithValue(data.message || 'Failed to get profile');
      }

      return data.data.admin;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

/**
 * Get Admin Stats Async Thunk
 */
export const getAdminStats = createAsyncThunk(
  'admin/getStats',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { admin: AdminState };
      const token = state.admin.token;

      if (!token) {
        return rejectWithValue('No authentication token');
      }

      const response = await fetch(`${API_BASE_URL}/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to get stats');
      }

      return data.data;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

/**
 * Fetch bank worker invitations and approval queue
 */
export const fetchBankWorkerData = createAsyncThunk(
  'admin/fetchBankWorkerData',
  async (_, { rejectWithValue }) => {
    try {
      const [invRes, appRes] = await Promise.all([
        fetch(`${API_BASE_URL}/bank-worker/invitations`),
        fetch(`${API_BASE_URL}/bank-worker/approval-queue`),
      ]);
      const invitations = invRes.ok ? await invRes.json() : [];
      const approvals = appRes.ok ? await appRes.json() : [];
      return { invitations, approvals };
    } catch (error) {
      return rejectWithValue('Failed to fetch bank worker data');
    }
  }
);

/**
 * Send bank worker invitation
 */
export const sendBankWorkerInvitation = createAsyncThunk(
  'admin/sendBankWorkerInvitation',
  async (payload: { email: string; bank: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bank-worker/invitations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) return rejectWithValue('Failed to send invitation');
      return await response.json();
    } catch (error) {
      return rejectWithValue('Network error');
    }
  }
);

/**
 * Approve bank worker
 */
export const approveBankWorker = createAsyncThunk(
  'admin/approveBankWorker',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bank-worker/approve/${id}`, {
        method: 'POST',
      });
      if (!response.ok) return rejectWithValue('Failed to approve');
      return id;
    } catch (error) {
      return rejectWithValue('Network error');
    }
  }
);

/**
 * Reject bank worker
 */
export const rejectBankWorker = createAsyncThunk(
  'admin/rejectBankWorker',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bank-worker/reject/${id}`, {
        method: 'POST',
      });
      if (!response.ok) return rejectWithValue('Failed to reject');
      return id;
    } catch (error) {
      return rejectWithValue('Network error');
    }
  }
);

/**
 * Admin Slice
 */
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    // Clear admin state (logout)
    clearAdmin: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.bankWorkerInvitations = [];
      state.bankWorkerApprovals = [];
      StorageHelper.removeItem('adminToken');
    },

    // Clear admin error
    clearAdminError: (state) => {
      state.error = null;
    },

    // Set admin token (for auto-login)
    setAdminToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      StorageHelper.setItem('adminToken', action.payload);
    },
  },
  extraReducers: (builder) => {
    // Admin Login
    builder
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.admin;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Get Admin Profile
    builder
      .addCase(getAdminProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getAdminProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });

    // Get Admin Stats
    builder
      .addCase(getAdminStats.pending, () => {
        // Don't set loading for stats (non-blocking)
      })
      .addCase(getAdminStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(getAdminStats.rejected, (state, action) => {
        console.error('Failed to load admin stats:', action.payload);
      });

    // Fetch bank worker data
    builder
      .addCase(fetchBankWorkerData.pending, (state) => {
        state.bankWorkerLoading = true;
      })
      .addCase(fetchBankWorkerData.fulfilled, (state, action) => {
        state.bankWorkerLoading = false;
        state.bankWorkerInvitations = action.payload.invitations;
        state.bankWorkerApprovals = action.payload.approvals;
      })
      .addCase(fetchBankWorkerData.rejected, (state) => {
        state.bankWorkerLoading = false;
      });

    // Send invitation
    builder.addCase(sendBankWorkerInvitation.fulfilled, (state, action) => {
      state.bankWorkerInvitations = [...state.bankWorkerInvitations, action.payload];
    });

    // Approve
    builder.addCase(approveBankWorker.fulfilled, (state, action) => {
      const id = action.payload;
      state.bankWorkerApprovals = state.bankWorkerApprovals.map((a) =>
        a.id === id ? { ...a, status: 'approved' } : a
      );
    });

    // Reject
    builder.addCase(rejectBankWorker.fulfilled, (state, action) => {
      const id = action.payload;
      state.bankWorkerApprovals = state.bankWorkerApprovals.map((a) =>
        a.id === id ? { ...a, status: 'rejected' } : a
      );
    });
  },
});

// Export actions
export const { clearAdmin, clearAdminError, setAdminToken } = adminSlice.actions;

// Export selectors
export const selectAdminUser = (state: { admin: AdminState }) => state.admin.user;
export const selectAdminToken = (state: { admin: AdminState }) => state.admin.token;
export const selectAdminIsAuthenticated = (state: { admin: AdminState }) =>
  state.admin.isAuthenticated;
export const selectAdminIsLoading = (state: { admin: AdminState }) => state.admin.isLoading;
export const selectAdminError = (state: { admin: AdminState }) => state.admin.error;
export const selectAdminStats = (state: { admin: AdminState }) => state.admin.stats;
export const selectBankWorkerInvitations = (state: { admin: AdminState }) =>
  state.admin.bankWorkerInvitations;
export const selectBankWorkerApprovals = (state: { admin: AdminState }) =>
  state.admin.bankWorkerApprovals;
export const selectBankWorkerLoading = (state: { admin: AdminState }) =>
  state.admin.bankWorkerLoading;

// Export reducer
export default adminSlice.reducer;
