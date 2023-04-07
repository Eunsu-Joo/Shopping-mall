import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useInfiniteQuery } from "react-query";
import QueryKeys from "../../constants/queryKeys";
import graphqlFetcher from "../../utils/graphqlFetcher";
import GET_PRODUCTS from "../../graphql/products";
import { ProductsType } from "../../type";
import AdminItem from "../../components/admin/adminItem";

const Admin = () => {
  const fetchTarget = useRef<null | HTMLDivElement>(null);
  const intersecting = useInfiniteScroll(fetchTarget);
  const { data, isFetchingNextPage, isSuccess, hasNextPage, fetchNextPage } =
    useInfiniteQuery<{ products: ProductsType }>(
      [QueryKeys.PRODUCTS],
      ({ pageParam = "" }) => {
        return graphqlFetcher(GET_PRODUCTS, { cursor: pageParam });
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          // last : 마지막 으로 불러들어온 데이터 , allPages: 누적된 모든 데이터
          return lastPage.products.at(-1)?.id;
        },
      }
    );

  useEffect(() => {
    (async () => {
      if (!intersecting || !hasNextPage || !isSuccess)
        //   intersection : true => target 도달 탐색중
        // hasNextPage : 다음페이지 존재 여부
        // isFetchingNextPage : 타겟에 닿았을 때 true 가 되는데 자세히 모르겠음 ㅠ
        return;
      await fetchNextPage();
    })();
  }, [intersecting]);
  return (
    <div className={"container"}>
      <h1>ADMIN</h1>
      <Link to={"/admin/add"} className={"link"}>
        목록 추가하기
      </Link>
      <ul className={"adminList"}>
        {data?.pages.map((item) => {
          return item.products.map((product, index) => (
            <AdminItem {...product} key={index} />
          ));
        })}
        {/* InfiniteTarget    */}
        <div ref={fetchTarget} />
      </ul>
    </div>
  );
};
export default Admin;
