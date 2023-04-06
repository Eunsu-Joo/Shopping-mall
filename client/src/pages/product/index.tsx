import { useInfiniteQuery, useQuery } from "react-query";
import QueryKeys from "../../constants/queryKeys";
import graphqlFetcher from "../../utils/graphqlFetcher";
import GET_PRODUCTS from "../../graphql/products";
import NoResult from "../../components/common/NoResult";
import ProductList from "../../components/product/list";
import { ProductsType } from "../../type";
import Button from "../../components/common/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import { hasNextPage } from "react-query/types/core/infiniteQueryBehavior";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
const ProductPage = () => {
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const intersecting = useInfiniteScroll(fetchMoreRef);

  const { fetchNextPage, isFetchingNextPage, isSuccess, data, hasNextPage } =
    useInfiniteQuery<{ products: ProductsType }>(
      [QueryKeys.PRODUCTS],
      ({ pageParam = "" }) => {
        return graphqlFetcher(GET_PRODUCTS, { cursor: pageParam });
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          //nextPage에 필요한 값을(params) return 해주는 역활
          // 요청을 할때마다 자동으로 실행할꺼임 return 값이 pageParam이 되는거임.
          // return index, id 등등
          return lastPage.products.at(-1)?.id;
        },
        getPreviousPageParam: (firstPage, allPages) => {},
      }
    );
  useEffect(() => {
    if (!intersecting) return;
    if (!intersecting || !isSuccess || isFetchingNextPage || !hasNextPage)
      return;
    fetchNextPage();
  }, [intersecting]);
  // if (isLoading) return <div>Loading...</div>;
  // if (data.products.length === 0)
  //   return <NoResult message={"상품이 없습니다."} />;
  // 사용자가 막 스크롤을 수도 없이 내렸다 올려서 코드가 꼬일수도 있음.
  //  * 추가 요청 중에는 요청을 하지 않음 => observer-> loading -> unobserver`
  // 1. isFetchingNextPage === true 일때 unObserver -> observer
  // 2. isFetchingNextPage === true 일때 요청자체를 하지 않기.

  return (
    <div className={"container"}>
      <h1>상품페이지</h1>
      <ProductList list={data?.pages || []} />
      <div ref={fetchMoreRef} />
    </div>
  );
};
export default ProductPage;
