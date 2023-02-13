const fs = require("fs");
import { resolve } from "path";
export enum DBFile {
  CART = "cart",
  PRODUCTS = "products",
}
const basePath = resolve();
// resolve => pathname 합치는 부분
const filenames = {
  [DBFile.CART]: resolve(basePath, "src/db/cart.json"),
  [DBFile.PRODUCTS]: resolve(basePath, "src/db/products.json"),
};

//read file
export const readDB = (target: DBFile) => {
  return JSON.parse(fs.readFileSync(filenames[target], "utf-8"));
};
//write file
export const writeDB = (target: DBFile, data: any) => {
  return JSON.stringify(fs.writeFileSync(filenames[target], data));
};
