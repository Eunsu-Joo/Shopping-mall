// import { ProductType, ResolverType } from "./types";
// import { DBFile, writeDB } from "../dbController";
// import { GraphQLError } from "graphql/error";
//
// const setJSON = (data: ProductType[]) => writeDB(DBFile.PRODUCTS, data);
//
// const productResolver: ResolverType = {
//   // GraphQL 타입 선언
//   Query: {
//     products: (parent, { cursor = "" }, { db }, info) => {
//       /** 🚀 parameters
//        *  @param obj
//        *  => 대부분 사용되지 않는 루트 Query 타입의 이전 객체
//        *  @param args
//        *  => GraphQL 쿼리의 필드에 제공된 인수
//        *   @param context
//        *  => 모든 resolver 함수에 전달되며, 현재 로그인한 사용자, 데이터베이스 액세스와 같은 중요한 문맥 정보를 보유하는 값.
//        * */
//       const fromIndex = db.products.findIndex((p) => p.id === cursor) + 1;
//       return db.products.slice(fromIndex, fromIndex + 15) || [];
//     },
//     product: (parent, { id }, { db }, info) => {
//       const product = db.products.find((data) => data.id === id);
//       if (product) return product;
//       return null;
//     },
//   },
//   Mutation: {
//     addProduct: (
//       parent,
//       { imageUrl, price, title, description },
//       { db },
//       info
//     ) => {
//       let newItem: any = {
//         imageUrl,
//         price,
//         title,
//         description,
//       };
//       if (!db.products.at(-1)) {
//         newItem = {
//           ...newItem,
//           id: "0",
//         };
//       } else {
//         newItem = {
//           ...newItem,
//           id: (+db.products[0].id + 1).toString(),
//         };
//       }
//       db.products.unshift(newItem);
//       setJSON(db.products);
//       return 1;
//     },
//     updateProduct: (parent, forms, { db }) => {
//       const target = db.products.find((item) => item.id === forms.id);
//       console.log(forms);
//       if (!forms.id || !target) {
//         throw new GraphQLError("존재하지 않는 아이템입니다.", {
//           extensions: { code: "BAD_REQUEST" },
//         });
//       }
//       const existIndex = db.products.indexOf(target),
//         newItem = { ...target, ...forms };
//       db.products.splice(existIndex, 1, newItem);
//       setJSON(db.products);
//       return forms.id;
//     },
//     deleteProduct: (parent, { id }, { db }) => {
//       const existIndex = db.products.findIndex(
//           (item) => item.id === id.toString()
//         ),
//         existCartIndex = db.cart.findIndex((item) => item.id === id.toString());
//       if (existIndex < 0) {
//         throw new GraphQLError("존재하지 않는 아이템입니다.", {
//           extensions: { code: "BAD_REQUEST" },
//         });
//       }
//       if (existCartIndex > -1) {
//         db.cart.splice(existCartIndex, 1);
//         setJSON(db.cart);
//       }
//       db.products.splice(existIndex, 1);
//       setJSON(db.products);
//       return id;
//     },
//   },
// };
// export default productResolver;
import { ProductType, ResolverType } from "./types";
import { v4 as uuid } from "uuid";
import { DBFile, writeDB } from "../dbController";

const setJSON = (data: ProductType[]) => writeDB(DBFile.PRODUCTS, data);
const productResolver: ResolverType = {
  Query: {
    products: (
      parent,
      { cursor = "", showDeleted = false, filter = "" },
      { db },
      info
    ) => {
      //Admin에서는 다 보여주고, 일반 페이지에서는 createdAt이 있는 것들만 보여주기.
      let filterDB = showDeleted
        ? db.products
        : db.products.filter((item) => !!item.createdAt);
      if (filter === "deleted")
        filterDB = db.products.filter((item) => !item.createdAt);
      const fromIndex = filterDB.findIndex((p) => p.id === cursor) + 1;
      return filterDB.slice(fromIndex, fromIndex + 15) || [];
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
      const newProduct = {
        id: uuid(),
        price,
        title,
        imageUrl,
        description,
        createdAt: Date.now(),
      };
      db.products.unshift(newProduct);
      setJSON(db.products);
      return newProduct;
    },
    updateProduct: (parent, { id, ...data }, { db }) => {
      const existedIndex = db.products.findIndex((item) => item.id === id);
      if (existedIndex < 0) {
        throw new Error("존재하지 않는 상품입니다.");
      }
      const newData = {
        ...db.products[existedIndex],
        ...data,
      };
      db.products.splice(existedIndex, 1, newData);
      setJSON(db.products);
      return newData;
    },
    deleteProduct: (parent, { id }, { db }) => {
      const existedIndex = db.products.findIndex((item) => item.id === id);
      if (existedIndex < 0) {
        throw new Error("존재하지 않는 상품입니다.");
      }
      const updatedItem = { ...db.products[existedIndex] };
      delete updatedItem.createdAt;
      db.products.splice(existedIndex, 1, updatedItem);
      setJSON(db.products);
      return id;
    },
    deleteHideProduct: (parent, { id }, { db }) => {
      const existedIndex = db.products.findIndex((item) => item.id === id);
      if (existedIndex < 0) {
        throw new Error("존재하지 않는 상품입니다.");
      }
      db.products.splice(existedIndex, 1);
      setJSON(db.products);
      return id;
    },
  },
};
export default productResolver;
