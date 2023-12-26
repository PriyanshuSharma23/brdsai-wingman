
export interface User {
  id: number | null;
  email: string;
  fullName: string | null;
  type: number | null;
  accessToken: string;
  imagePath: string | null;
}
