import { ResolverType } from "./types";

const productResolver: ResolverType = {
  Query: {
    products: (parent, args, { db }, info) => {
      return db.products;
    },
    product: (parent, { id }, { db }, info) => {
      const product = db.products.find((data) => data.id === id);
      if (product) return product;
      return null;
    },
  },
};
export default productResolver;
