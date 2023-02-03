import { atom, selectorFamily, useRecoilValue } from "recoil";
// cart atom state
const cartState = atom({
  key: "cartState",
  default: new Map(),
  //   default: {} //key 값에 접근하기 위해 Map 사용,
});
/* ❗ Selector 사용이유
    1. atom을 직접 변경하는 경우
    ex. const [value,setValue]= useRecoilState(atomValue)
    setState로 변경하는 경우, atom을 바라보고 있는 state의 상태가 모두 변경됨. 예상치 못한 side-effects
    가 일어날 수도 있음.
    2. selector 사용
    selector는 파생된 상태의 일부를 나타냄. 참조하고 있는 다른 데이터를 건들이지 않고,
    (atom의 불변성을 유지한 상태로) set할 수 있음.
* **/
export const cartsItemSelector = selectorFamily({
  key: "cartItem",
  get:
    (id: number) =>
    ({ get }) => {
      // const carts = get(cartState);
      // return carts.get(id);
      const carts = get(cartState);
      return carts.get(id);
    },
  set:
    (id: number) =>
    ({ get, set }, newValue) => {
      const newCart = new Map([...get(cartState)]); // atom values
      newCart.set(id, newValue); //value object set 해줌.
      set(cartState, newCart); //atom state set
    },
});
