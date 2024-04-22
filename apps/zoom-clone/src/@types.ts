export type MessageTypes = 'message' | 'nickname' | 'join' | 'leave';
export interface MessageData {
  type: MessageTypes;
  nickname?: string;
  payload: string;
}
