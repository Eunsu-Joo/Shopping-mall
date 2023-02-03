export type ProductItemProps = {
  category: string;
  description: string;
  id: number;
  url: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
};
export type CartType = {
  id: number;
  url: string;
  price: number;
  title: string;
};
// Omit, Partial, Pick

type Test = {
  id: number;
  title: string;
  color: "red" | "blue";
  status: number;
};
type PartialTest = Partial<Test>;
//파셜 타입은 특정 타입의 부분집합을 만족하는 타입
type OmitTest = Omit<Test, "color">;
// 부분 제외한 타입
type PickTest = Pick<Test, "id" | "status">;
//해당 타입만 가져옴. id, status type만 가져옴
const test: Test = {
  id: 1,
  title: "제목",
  color: "red",
  status: 200,
};
const testPartial1: PartialTest = {}; //가능
const testPartial2: PartialTest = { color: "red", status: 400 }; //가능
const testPick: PickTest = {
  status: 400,
  id: 3,
};
const testOmit: OmitTest = {
  title: "제목",
  status: 401,
  id: 2,
  // color:"red" //애러
};
export type ProductType = {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
  description: string;
  createdAt: string;
};
