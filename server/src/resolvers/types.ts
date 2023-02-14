type Method = "Query" | "Mutation";
export type ResolverType = {
  [k: string]: {
    [key: string]: (
      parent: any,
      args: { [key: string]: any },
      context: { db: { [key: string]: any[] } },
      info: any
    ) => any;
  };
};
export type ProductType = {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
  description: string;
};
export type ProductsType = ProductType[];
export type CartItem = {
  id: string;
  product: ProductType;
  amount: number;
};
export type Cart = CartItem[];
