export type User = {
  userId: string;
  fullName: string;
  email: string;
};

export type Account = {
  id: string;
  budget: number;
  userId: number;
};

export type Payment = {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: 'MONTHLY' | 'EXTERNAL';
};

export type FinanceClientProps = {
  user: User;
  account: Account | null;
  payments: Payment[];
};

export type JwtPayload = {
  userId: string;
  email: string;
  fullName: string;
};



