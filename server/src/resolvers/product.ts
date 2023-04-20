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
import { Cart, ProductType, ResolverType } from "./types";
import { DBFile, writeDB } from "../dbController";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;

const PAGE_SIZE = 8;
const setJSON = (data: ProductType[]) => writeDB(DBFile.PRODUCTS, data);
const setCart = (data: Cart) => writeDB(DBFile.CART, data);
const productResolver: ResolverType = {
  Query: {
    products: async (
      parent,
      { cursor = "", showDeleted = false, filter },
      info
    ) => {
      //Admin에서는 다 보여주고, 일반 페이지에서는 createdAt이 있는 것들만 보여주기.
      //context 에 담긴 DB 필요할때마다 불러오기.
      const products = collection(db, "products"); //products collection
      let queryOptions: any[] = [orderBy("createdAt", "desc")]; //filterOptions
      if (cursor) {
        const snapshot = await getDoc(doc(db, "products", cursor));
        queryOptions.push(startAfter(snapshot));
      }

      /**
       * cursor 기본값 ="" (초기 진입했을 때) => 조건에 들어오지 않음
       * cursor 로 마지막 아이템 ID가 들어왔을 때 => 조건에 들어옴.
       * => queryOptions= [orderBy("createdAt", "desc"),startAfter(cursor)]
       *  @see 질문
       *  @question 들어오는 값은 해당 아이템의 ID 인데, 기준은 createdAt이 되는것 아닌가요?
       * */
      if (!showDeleted) {
        queryOptions.unshift(where("createdAt", "!=", null));
      }
      if (filter === "deleted") {
        queryOptions = [where("createdAt", "==", null)];
      }
      // showDeleted 가 아닐경우 모두 다 보여줌. (이 조건이 젤 처음 적용 됨)
      const q = query(products, ...queryOptions, limit(PAGE_SIZE));
      const snapshot = await getDocs(q);
      const data: DocumentData[] = [];
      snapshot.forEach((doc) => {
        // ID가 없기떄문에 강제로 ID 넣어줌.
        data.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt
            ? doc.data().createdAt.toDate()
            : null,
        });
      });
      console.log(data, cursor);
      return data;
    },
    product: async (parent, { id }) => {
      const snapshot = await getDoc(doc(db, "products", id));
      return {
        ...snapshot.data(),
        id: snapshot.id,
      };
    },
  },
  Mutation: {
    addProduct: async (
      parent,
      { imageUrl, price, title, description },
      info
    ) => {
      const products = collection(db, "products"); //DB
      const newProduct = {
        price,
        title,
        imageUrl,
        description,
      };
      const newData = await addDoc(products, {
        ...newProduct,
        createdAt: serverTimestamp(),
      });
      const test = await getDoc(doc(db, "products", newData.id));
      return { ...test.data(), id: newData.id };
    },
    updateProduct: async (parent, { id, ...data }) => {
      // const existedIndex = db.products.findIndex((item) => item.id === id);
      // if (existedIndex < 0) {
      //   throw new Error("존재하지 않는 상품입니다.");
      // }
      // const newData = {
      //   ...db.products[existedIndex],
      //   ...data,
      // };
      // db.products.splice(existedIndex, 1, newData);
      // setJSON(db.products);
      // return newData;
      // const test = await getDoc(doc(db, "products", id));
      const product = doc(db, "products", id);
      if (!product) throw new Error("상품이 없습니다.");
      await updateDoc(product, data);
      const updatedData = await getDoc(product);
      return { ...updatedData.data(), id };
    },
    deleteProduct: async (parent, { id }) => {
      // const existedIndex = db.products.findIndex((item) => item.id === id),
      //   existedCartIndex = db.cart.findIndex((item) => item.id === id);
      // if (existedIndex || existedCartIndex < 0) {
      //   throw new Error("존재하지 않는 상품입니다.");
      // }
      //
      // if (existedCartIndex > -1) {
      //   db.cart.splice(existedCartIndex, 1);
      //   setCart(db.cart);
      // }
      // const updatedItem = { ...db.products[existedIndex] };
      // delete updatedItem.createdAt;
      // db.products.splice(existedIndex, 1, updatedItem);
      // setJSON(db.products);
      //해당 아이디가 cart에 있는지 확인

      const productRef = doc(db, "products", id);
      const cartCollection = collection(db, "cart");
      const exist = (
        await getDocs(query(cartCollection, where("product", "==", productRef)))
      ).docs[0];
      if (exist) {
        await deleteDoc(doc(db, "cart", exist.id));
      }
      if (!productRef) throw new Error("상품이 없습니다.");
      await updateDoc(productRef, { createdAt: null });
      return id;
    },
    deleteHideProduct: async (parent, { id }) => {
      const productRef = doc(db, "products", id);
      const cartCollection = collection(db, "cart");
      const exist = (
        await getDocs(query(cartCollection, where("product", "==", productRef)))
      ).docs[0];
      if (exist) {
        await deleteDoc(doc(db, "cart", exist.id));
      }
      if (!productRef) throw new Error("상품이 없습니다.");
      await deleteDoc(doc(db, "products", id));
      return id;
    },
  },
};
export default productResolver;
