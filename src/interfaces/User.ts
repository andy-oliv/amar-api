export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  pictureUrl?: string;
  refreshToken?: string;
  tokenIssueDate?: string;
}
