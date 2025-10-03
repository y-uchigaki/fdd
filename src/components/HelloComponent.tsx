'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchHelloMessage, fetchRawMessage } from '@/store/helloSlice';
import { HelloUseCaseImpl } from '@/usecase/helloUseCase';
import { HelloApiRepository } from '@/repository/helloRepository';

// Hello Component
const HelloComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { message, loading, error } = useAppSelector((state) => state.hello);

  useEffect(() => {
    // UseCaseとRepositoryのインスタンスを作成
    const repository = new HelloApiRepository();
    const useCase = new HelloUseCaseImpl(repository);
    
    // ReduxのAsyncThunkを呼び出し
    dispatch(fetchHelloMessage(useCase));
  }, [dispatch]);

  const handleButtonClick = () => {
    const repository = new HelloApiRepository();
    const useCase = new HelloUseCaseImpl(repository);
    // ボタンを押すとRepositoryから生の「hell」を取得して表示
    dispatch(fetchRawMessage(useCase));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">エラー: {error}</div>
        <button 
          onClick={handleButtonClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          再試行
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {message?.message || 'はろーわー'}
        </h1>
        {message?.timestamp && (
          <p className="text-gray-600 text-sm">
            取得時刻: {new Date(message.timestamp).toLocaleString()}
          </p>
        )}
        <button 
          onClick={handleButtonClick}
          className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          ボタンを押すと「hell」を表示
        </button>
      </div>
    </div>
  );
};

export default HelloComponent;
