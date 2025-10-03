// UseCase層: ビジネスロジック
import { HelloRepository, HelloMessageVO } from '@/domain/hello';

export class HelloUseCase {
  constructor(private readonly repository: HelloRepository) {}

  async getHelloMessage(): Promise<HelloMessageVO> {
    try {
      // Repositoryからデータを取得
      const helloMessage = await this.repository.getHelloMessage();
      
      // Domain変換: 「hell」を「はろーわー」に変換（初期表示用）
      const transformedMessage = this.transformMessage(helloMessage.message);
      
      return new HelloMessageVO(transformedMessage, helloMessage.timestamp);
    } catch (error) {
      console.error('UseCase Error:', error);
      // エラー時はフォールバックメッセージを返す
      return new HelloMessageVO('はろーわー');
    }
  }

  async getRawMessage(): Promise<HelloMessageVO> {
    try {
      // Repositoryから生のデータを取得（ボタン押下時）
      const helloMessage = await this.repository.getHelloMessage();
      
      return new HelloMessageVO(helloMessage.message, helloMessage.timestamp);
    } catch (error) {
      console.error('UseCase Error:', error);
      // エラー時はフォールバックメッセージを返す
      return new HelloMessageVO('hell');
    }
  }

  private transformMessage(message: string): string {
    // Domain変換ロジック
    if (message === 'hell') {
      return 'はろーわー';
    }
    return message;
  }
}
