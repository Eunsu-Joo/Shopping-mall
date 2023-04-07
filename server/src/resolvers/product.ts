import { ProductType, ResolverType } from "./types";
import { DBFile, writeDB } from "../dbController";
import { GraphQLError } from "graphql/error";

const setJSON = (data: ProductType[]) => writeDB(DBFile.PRODUCTS, data);

const productResolver: ResolverType = {
  // GraphQL 타입 선언
  Query: {
    products: (parent, { cursor = "" }, { db }, info) => {
      /** 🚀 parameters
       *  @param obj
       *  => 대부분 사용되지 않는 루트 Query 타입의 이전 객체
       *  @param args
       *  => GraphQL 쿼리의 필드에 제공된 인수
       *   @param context
       *  => 모든 resolver 함수에 전달되며, 현재 로그인한 사용자, 데이터베이스 액세스와 같은 중요한 문맥 정보를 보유하는 값.
       * */
      const fromIndex = db.products.findIndex((p) => p.id === cursor) + 1;
      return db.products.slice(fromIndex, fromIndex + 15) || [];
    },
    product: (parent, { id }, { db }, info) => {
      const product = db.products.find((data) => data.id === id);
      if (product) return product;
      return null;
    },
  },
  Mutation: {
    addProduct: (
      parent,
      { imageUrl, price, title, description },
      { db },
      info
    ) => {
      let newItem: any = {
        imageUrl,
        price,
        title,
        description,
      };
      if (!db.products.at(-1)) {
        newItem = {
          ...newItem,
          id: "0",
        };
      } else {
        newItem = {
          ...newItem,
          id: (+db.products[0].id + 1).toString(),
        };
      }
      db.products.unshift(newItem);
      setJSON(db.products);
      return 1;
    },
    updateProduct: (parent, forms, { db }) => {
      const target = db.products.find((item) => item.id === forms.id);
      console.log(forms);
      if (!forms.id || !target) {
        throw new GraphQLError("존재하지 않는 아이템입니다.", {
          extensions: { code: "BAD_REQUEST" },
        });
      }
      const existIndex = db.products.indexOf(target),
        newItem = { ...target, ...forms };
      db.products.splice(existIndex, 1, newItem);
      setJSON(db.products);
      return forms.id;
    },
    deleteProduct: (parent, { id }, { db }) => {
      const existIndex = db.products.findIndex(
          (item) => item.id === id.toString()
        ),
        existCartIndex = db.cart.findIndex((item) => item.id === id.toString());
      if (existIndex < 0) {
        throw new GraphQLError("존재하지 않는 아이템입니다.", {
          extensions: { code: "BAD_REQUEST" },
        });
      }
      if (existCartIndex > -1) {
        db.cart.splice(existCartIndex, 1);
        setJSON(db.cart);
      }
      db.products.splice(existIndex, 1);
      setJSON(db.products);
      return id;
    },
  },
};
export default productResolver;
