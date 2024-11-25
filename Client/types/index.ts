export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  fundraisers: Fundraiser[];
  donations: Donation[];
};

export type Fundraiser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  description: string;
  category: string;
  image: string;
  totalAmount: number;
  amountRaised: number;
  status: string;
  user: User;
  donations: Donation[];
  createdAt: string;
  updatedAt: string;
};

export type Donation = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  paymentMethod: string;
  paymentStatus: string;
  amount: number;
  fundraiser: Fundraiser;
  user: User;
  createdAt: string;
  updatedAt: string;
};
