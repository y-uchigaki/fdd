// テストセットアップファイル
import '@testing-library/jest-dom';

// Jestのグローバル関数を明示的にインポート
import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll } from '@jest/globals';

// グローバルに利用可能にする
global.describe = describe;
global.it = it;
global.expect = expect;
global.beforeEach = beforeEach;
global.afterEach = afterEach;
global.beforeAll = beforeAll;
global.afterAll = afterAll;
