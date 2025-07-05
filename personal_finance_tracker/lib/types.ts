type User = {
  userId: string;
  fullName: string;
  email: string;
};

type Account = {
  id: string;
  budget: number;
  userId: number;
};

type Payment = {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: 'MONTHLY' | 'EXTERNAL';
};



