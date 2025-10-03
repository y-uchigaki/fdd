# はろーわー - Clean Architecture Demo

NextJSでClean Architectureの構成を実装した「はろーわー」表示アプリケーションです。

## アーキテクチャ構成

```
[ Component(UI) ] 
     ↓ イベント
[ UseCase層 ]  ----→ [ Repository層(API/DB) ]
     ↓ Domain変換
[ Domain層 (型＋VO) ]
     ↓
[ State管理層 (Redux) ]
     ↑
[ Component(UI) ] (購読して描画)
```

## ディレクトリ構造

```
src/
├── app/                    # NextJS App Router
│   ├── api/hello/         # API Route
│   ├── globals.css        # グローバルスタイル
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # メインページ
├── components/            # UI Component層
│   └── HelloComponent.tsx
├── domain/                # Domain層（型＋VO）
│   └── hello.ts
├── repository/            # Repository層（API/DB）
│   └── helloRepository.ts
├── store/                 # State管理層（Redux）
│   ├── helloSlice.ts
│   ├── hooks.ts
│   └── index.ts
└── usecase/               # UseCase層
    └── helloUseCase.ts
```

## 機能

- Repository層で「hell」の文字列を取得
- UseCase層でDomain変換（「hell」→「はろーわー」）
- ReduxでState管理
- Component層でUI描画
- 美しいUI（TailwindCSS使用）

## セットアップ

1. 依存関係のインストール:
```bash
yarn install
```

2. 開発サーバーの起動:
```bash
yarn dev
```

3. ブラウザで `http://localhost:3000` にアクセス

## 技術スタック

- **NextJS 14** - React フレームワーク
- **TypeScript** - 型安全性
- **Redux Toolkit** - State管理
- **TailwindCSS** - スタイリング
- **Clean Architecture** - アーキテクチャパターン

## 動作フロー

1. Componentがマウントされると、UseCaseを呼び出し
2. UseCaseがRepositoryを通じてAPIから「hell」を取得
3. UseCaseでDomain変換（「hell」→「はろーわー」）
4. Redux Storeに状態を保存
5. ComponentがStoreを購読して「はろーわー」を描画

## 起動方法

```bash
yarn install
yarn dev
```
