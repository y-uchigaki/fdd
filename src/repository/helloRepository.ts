// Repository層: API/DBアクセス
import { HelloRepository, HelloMessageVO } from '@/domain/hello';

export class HelloApiRepository implements HelloRepository {
  private readonly baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async getHelloMessage(): Promise<HelloMessageVO> {
    try {
      // APIから「hell」の文字列を取得
      const response = await fetch(`${this.baseUrl}/hello`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Repository層では生のデータをそのまま返す
      return new HelloMessageVO(data.message);
    } catch (error) {
      console.error('Failed to fetch hello message:', error);
      // フォールバックとして「はろーわー」を返す
      return new HelloMessageVO('はろーわー');
    }
  }
}

