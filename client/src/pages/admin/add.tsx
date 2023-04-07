import AdminForm, { FormType } from "../../components/admin";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import graphqlFetcher from "../../utils/graphqlFetcher";
import { ADD_PRODUCT } from "../../graphql/products";
import QueryKeys from "../../constants/queryKeys";
import { FormEvent, useState } from "react";

const AdminAdd = () => {
  const [forms, setForms] = useState<FormType>({
    title: "",
    price: "",
    description: "",
    imageUrl: "",
  });
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation(
    (forms: any) => graphqlFetcher(ADD_PRODUCT, { ...forms }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([QueryKeys.PRODUCTS]);
        if (confirm("등록되었습니다.")) {
          return navigate("/admin");
        }
      },
    }
  );
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!/^[0-9]+$/.test(forms.price)) {
      return alert("가격은 숫자만 입력 가능합니다.");
    }
    mutate({
      title: forms.title,
      description: forms.description,
      price: +forms.price,
      imageUrl: forms.imageUrl,
    });
  };
  return (
    <div className={"container"}>
      <h1>ADMIN Add</h1>
      <AdminForm
        handleSubmit={handleSubmit}
        forms={forms}
        setForms={setForms}
        preview={preview}
        setPreview={setPreview}
      />
    </div>
  );
};
export default AdminAdd;
