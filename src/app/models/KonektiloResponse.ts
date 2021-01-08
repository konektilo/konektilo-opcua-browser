export interface KonektiloResponse<T> {
  success: boolean;
  description: string;
  messages: string[];
  result: {
    [x: string]: T;
  };
}
