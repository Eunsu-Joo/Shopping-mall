import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useInfiniteQuery } from "react-query";
import QueryKeys from "../../constants/queryKeys";
import graphqlFetcher from "../../utils/graphqlFetcher";
import GET_PRODUCTS from "../../graphql/products";
import { ProductType } from "../../type";
import AdminItem from "../../components/admin/adminItem";

const Admin = () => {
  const fetchTarget = useRef<null | HTMLDivElement>(null);
  const intersecting = useInfiniteScroll(fetchTarget);
  const searchParams = new URLSearchParams(document.location.search);
  const [checked, setChecked] = useState(searchParams.get("filter") ?? "all");
  const navigate = useNavigate();

  const { data, isFetchingNextPage, isSuccess, hasNextPage, fetchNextPage } =
    useInfiniteQuery<any>(
      [QueryKeys.ADMIN, checked],
      ({ pageParam = "" }) => {
        return graphqlFetcher(GET_PRODUCTS, {
          cursor: pageParam,
          showDeleted: true,
          filter: checked,
        });
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          console.log(allPages);
          // last : 마지막 으로 불러들어온 데이터 , allPages: 누적된 모든 데이터
          return lastPage.products.at(-1)?.id;
        },
      }
    );
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.value);
    navigate({
      pathname: "/admin",
      search: `?filter=${event.target.value}`,
    });
  };
  useEffect(() => {
    if (!intersecting || !isSuccess || isFetchingNextPage || !hasNextPage)
      //   intersection : true => target 도달 탐색중
      // hasNextPage : 다음페이지 존재 여부
      // isFetchingNextPage : 타겟에 닿았을 때 true 가 되는데 자세히 모르겠음 ㅠ
      return;
    fetchNextPage();
  }, [intersecting]);

  return (
    <div className={"container"}>
      <h1>ADMIN</h1>
      <Link to={"/admin/add"} className={"link"}>
        목록 추가하기
      </Link>
      <div className={"radioGroup"}>
        <input
          id={"radio1"}
          type="radio"
          name={"radio"}
          value={"all"}
          checked={checked === "all"}
          onChange={onChange}
          hidden={true}
        />
        <label htmlFor="radio1"> 전체보기</label>
        <input
          type="radio"
          value={"deleted"}
          checked={checked === "deleted"}
          onChange={onChange}
          id={"radio2"}
          hidden={true}
        />
        <label htmlFor="radio2">삭제된 게시물</label>
      </div>
      <ul className={"adminList"}>
        {data?.pages.length === 0 && <li>리스트가 없습니다.</li>}
        {data?.pages.map((item, index) => {
          return item.products.map((product: ProductType, index: number) => {
            return <AdminItem {...product} key={index} />;
          });
        })}
        {/* InfiniteTarget    */}
        {checked === "all" && <div ref={fetchTarget} />}
      </ul>
    </div>
  );
};
export default Admin;
