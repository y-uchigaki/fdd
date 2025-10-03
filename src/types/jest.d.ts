// Jest型定義ファイル
/// <reference types="jest" />

declare global {
  namespace jest {
    interface Matchers<R> {
      // カスタムマッチャーがあればここに追加
    }
  }
}

export {};
