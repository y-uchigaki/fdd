// Domain層: 型定義とValue Object
export interface HelloMessage {
  readonly message: string;
  readonly timestamp: Date;
}

export class HelloMessageVO {
  private readonly _message: string;
  private readonly _timestamp: Date;

  constructor(message: string, timestamp: Date = new Date()) {
    this._message = message;
    this._timestamp = timestamp;
  }

  get message(): string {
    return this._message;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  get formattedMessage(): string {
    return `${this._message} (${this._timestamp.toLocaleString()})`;
  }

  equals(other: HelloMessageVO): boolean {
    return this._message === other._message && 
           this._timestamp.getTime() === other._timestamp.getTime();
  }
}

// Repository層のインターフェース（Domain層で定義）
export interface HelloRepository {
  getHelloMessage(): Promise<HelloMessageVO>;
}

