import { ResolverType } from "./types";

const fakeData = Array.from({ length: 20 }).map((_, i) => ({
  id: (i + 1).toString(),
  imageUrl: `https://picsum.photos/200/300?random=${i + 1}`,
  price: Math.floor(Math.random() * 300),
  title: "제목입니다.",
  description: "설명입니다.",
  createdAt: new Date().toString(),
}));

const productResolver: ResolverType = {
  Query: {
    products: (parent, args, context, info) => {
      console.log({ parent, context });
      return fakeData;
    },
    product: (parent, { id }, context, info) => {
      const product = fakeData.find((data) => data.id === id);
      if (product) return product;
      return null;
    },
  },
};
export default productResolver;
