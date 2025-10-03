// State管理層: Redux Store
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { HelloMessageVO } from '@/domain/hello';

// State型定義
export interface HelloState {
  message: {
    message: string;
    timestamp: string;
  } | null;
  loading: boolean;
  error: string | null;
}

// 初期状態
const initialState: HelloState = {
  message: null,
  loading: false,
  error: null,
};

// Async Thunk: UseCaseから呼び出される（初期表示用）
export const fetchHelloMessage = createAsyncThunk(
  'hello/fetchMessage',
  async (payload: string, { rejectWithValue }) => {
    try {
      // UseCaseを動的に作成してメッセージを取得
      const { HelloApiRepository } = await import('@/repository/helloRepository');
      const { HelloUseCase } = await import('@/usecase/helloUseCase');
      
      const repository = new HelloApiRepository();
      const useCase = new HelloUseCase(repository);
      const message = await useCase.getHelloMessage();
      
      return {
        message: message.message,
        timestamp: message.timestamp.toISOString()
      };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

// Async Thunk: UseCaseから呼び出される（ボタン押下時）
export const fetchRawMessage = createAsyncThunk(
  'hello/fetchRawMessage',
  async (payload: string, { rejectWithValue }) => {
    try {
      // UseCaseを動的に作成してメッセージを取得
      const { HelloApiRepository } = await import('@/repository/helloRepository');
      const { HelloUseCase } = await import('@/usecase/helloUseCase');
      
      const repository = new HelloApiRepository();
      const useCase = new HelloUseCase(repository);
      const message = await useCase.getRawMessage();
      
      return {
        message: message.message,
        timestamp: message.timestamp.toISOString()
      };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

// Slice定義
const helloSlice = createSlice({
  name: 'hello',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHelloMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHelloMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(fetchHelloMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRawMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRawMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(fetchRawMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, resetMessage } = helloSlice.actions;
export default helloSlice.reducer;
