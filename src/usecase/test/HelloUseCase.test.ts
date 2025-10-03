// HelloUseCase のテスト
import '../test/setup';
import { HelloUseCase } from '../helloUseCase';
import { HelloRepository, HelloMessageVO } from '@/domain/hello';

// モックRepository
class MockHelloRepository implements HelloRepository {
  private mockMessage: string;
  private shouldThrowError: boolean = false;

  constructor(mockMessage: string = 'hell') {
    this.mockMessage = mockMessage;
  }

  setMockMessage(message: string): void {
    this.mockMessage = message;
  }

  setShouldThrowError(shouldThrow: boolean): void {
    this.shouldThrowError = shouldThrow;
  }

  async getHelloMessage(): Promise<HelloMessageVO> {
    if (this.shouldThrowError) {
      throw new Error('Repository Error');
    }
    return new HelloMessageVO(this.mockMessage);
  }
}

describe('HelloUseCase', () => {
  let useCase: HelloUseCase;
  let mockRepository: MockHelloRepository;

  beforeEach(() => {
    mockRepository = new MockHelloRepository();
    useCase = new HelloUseCase(mockRepository);
  });

  describe('getHelloMessage', () => {
    it('「hell」を「はろーわー」に変換して返す', async () => {
      // Arrange
      mockRepository.setMockMessage('hell');

      // Act
      const result = await useCase.getHelloMessage();

      // Assert
      expect(result.message).toBe('はろーわー');
      expect(result.timestamp).toBeDefined();
    });

    it('「hell」以外のメッセージはそのまま返す', async () => {
      // Arrange
      const originalMessage = 'hello world';
      mockRepository.setMockMessage(originalMessage);

      // Act
      const result = await useCase.getHelloMessage();

      // Assert
      expect(result.message).toBe(originalMessage);
      expect(result.timestamp).toBeDefined();
    });

    it('Repositoryでエラーが発生した場合はフォールバックメッセージを返す', async () => {
      // Arrange
      mockRepository.setShouldThrowError(true);

      // Act
      const result = await useCase.getHelloMessage();

      // Assert
      expect(result.message).toBe('はろーわー');
      expect(result.timestamp).toBeDefined();
    });
  });

  describe('getRawMessage', () => {
    it('Repositoryから取得した生のメッセージをそのまま返す', async () => {
      // Arrange
      const originalMessage = 'hell';
      mockRepository.setMockMessage(originalMessage);

      // Act
      const result = await useCase.getRawMessage();

      // Assert
      expect(result.message).toBe(originalMessage);
      expect(result.timestamp).toBeDefined();
    });

    it('Repositoryでエラーが発生した場合はフォールバックメッセージを返す', async () => {
      // Arrange
      mockRepository.setShouldThrowError(true);

      // Act
      const result = await useCase.getRawMessage();

      // Assert
      expect(result.message).toBe('hell');
      expect(result.timestamp).toBeDefined();
    });
  });

  describe('transformMessage (private method)', () => {
    it('「hell」を「はろーわー」に変換する', async () => {
      // Arrange
      mockRepository.setMockMessage('hell');

      // Act
      const result = await useCase.getHelloMessage();

      // Assert
      expect(result.message).toBe('はろーわー');
    });

    it('「hell」以外は変換しない', async () => {
      // Arrange
      const testMessages = ['hello', 'world', 'test', ''];
      
      for (const message of testMessages) {
        mockRepository.setMockMessage(message);
        
        // Act
        const result = await useCase.getHelloMessage();
        
        // Assert
        expect(result.message).toBe(message);
      }
    });
  });
});
