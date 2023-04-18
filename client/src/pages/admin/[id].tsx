import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import QueryKeys from "../../constants/queryKeys";
import graphqlFetcher from "../../utils/graphqlFetcher";
import { GET_PRODUCT, UPDATE_PRODUCT } from "../../graphql/products";
import { FormEvent, useEffect, useState } from "react";
import { ProductType } from "../../type";
import AdminForm, { FormType } from "../../components/admin";

const AdminEdit = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigator = useNavigate();
  const { data } = useQuery<{ product: ProductType }>(
    [QueryKeys.PRODUCT, id],
    () => graphqlFetcher(GET_PRODUCT, { id })
  );
  const { mutate, isLoading } = useMutation(
    (forms: ProductType) => {
      return graphqlFetcher(UPDATE_PRODUCT, {
        ...forms,
        updateProductId: id,
      });
    },
    {
      onSuccess: async (data) => {
        console.log(data);
        if (confirm("수정이 완료되었습니다.")) {
          if (!data.createdAt)
            await queryClient.invalidateQueries([QueryKeys.ADMIN, "deleted"]);
          await queryClient.invalidateQueries([QueryKeys.ADMIN, "all"]);
          await queryClient.invalidateQueries([QueryKeys.PRODUCTS]);
          await queryClient.invalidateQueries([QueryKeys.PRODUCTS, id]);
          navigator("/admin");
        }
      },
    }
  );

  const [forms, setForms] = useState<FormType>({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  useEffect(() => {
    if (data) {
      setForms({
        title: data!.product.title,
        description: data!.product.description,
        price: data!.product.price.toString(),
        imageUrl: data!.product.imageUrl,
      });
      setPreview(data!.product.imageUrl);
    }
  }, [data]);
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    mutate({ ...forms, price: +forms.price, id: id as string });
  };

  // console.log(data);
  return (
    <>
      <div className={"container"}>
        <h1>Admin Edit</h1>
        <div className={"container"}>
          <AdminForm
            handleSubmit={handleSubmit}
            forms={forms}
            setForms={setForms}
            preview={preview}
            setPreview={setPreview}
          />
        </div>
      </div>
    </>
  );
};
export default AdminEdit;
