// Redux Store設定
import { configureStore } from '@reduxjs/toolkit';
import helloReducer from './helloSlice';

export const store = configureStore({
  reducer: {
    hello: helloReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['hello/fetchMessage/fulfilled'],
        ignoredPaths: ['hello.message.timestamp'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

