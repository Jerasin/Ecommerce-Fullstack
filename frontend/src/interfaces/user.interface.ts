export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  img?: string;
  status?: boolean;
  address?: string;
}

export interface UserProps {
  id: number;
  img?: string;
  address?: string;
}
