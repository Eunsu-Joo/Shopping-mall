import { Cart, ResolverType } from "./types";
import { DBFile, writeDB } from "../dbController";
const setJSON = (data: Cart) => writeDB(DBFile.CART, data);

const productResolver: ResolverType = {
  // GraphQL 타입 선언
  Query: {
    products: (parent, { cursor = "" }, { db }, info) => {
      console.log(db.products.length);
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
      const lastID = db.products[db.products.length - 1].id;
      const newItem = {
        imageUrl,
        price,
        title,
        description,
        id: +lastID + 1,
      };
      db.products.push(newItem);
      setJSON(db.products);
      return lastID;
    },
  },
};
export default productResolver;
