export type CartType = {
  id: string;
  product: ProductType;
  amount: number;
};

export type ProductType = {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
  description: string;
  createdAt?: string;
};
export type ProductsType = ProductType[];
export type CartsType = CartType[];
// Omit, Partial, Pick

type Test = {
  id: number;
  title: string;
  color: "red" | "blue";
  status: number;
};
