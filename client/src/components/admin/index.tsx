import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  SyntheticEvent,
  useState,
} from "react";
import { useMutation, useQueryClient } from "react-query";
import graphqlFetcher from "../../utils/graphqlFetcher";
import { UPDATE_PRODUCT } from "../../graphql/products";
import QueryKeys from "../../constants/queryKeys";
import { useNavigate } from "react-router-dom";

const AdminForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation(
    (forms: any) => graphqlFetcher(UPDATE_PRODUCT, { ...forms }),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries([QueryKeys.PRODUCTS]);
        console.log(data);
        // if (confirm("등록되었습니다.")) {
        //   return navigate("/products");
        // }
      },
    }
  );
  const [forms, setForms] = useState({
    title: "",
    price: "",
    description: "",
  });
  const [image, setImage] = useState<{
    preview: string | ArrayBuffer | null;
    url: string;
  }>({
    preview: "",
    url: "",
  });
  const onChange = (event: any) => {
    const { value, name } = event.target;
    setForms({ ...forms, [name]: value });
  };

  const onChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return alert("파일을 찾을 수 없습니다.");
    const file = event.target.files[0] as File;
    if (!/([^\s]+(?=\.(jpg|png))\.\2)/.test(file.name))
      return alert("PNG,JPG 이미지만 업로드 가능합니다.");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage({ ...image, preview: reader.result });
    };
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!/^[0-9]+$/.test(forms.price)) {
      return alert("가격은 숫자만 입력 가능합니다.");
    }
    mutate({
      ...forms,
      price: +forms.price,
      imageUrl: "https://picsum.photos/200/300?random=2",
    });
    //https://picsum.photos/200/300?random=2
  };
  return (
    <>
      <form onSubmit={handleSubmit} autoComplete={"off"}>
        <label className={"label"}>
          <p>Title</p>
          <input
            type="text"
            name={"title"}
            value={forms.title}
            placeholder={"제목을 입력해주세요."}
            onChange={onChange}
          />
        </label>
        <label className={"label"}>
          <p>Price</p>
          <input
            type="text"
            name={"price"}
            value={forms.price}
            placeholder={"가격을 입력해주세요."}
            onChange={onChange}
          />
        </label>
        {image.preview && (
          <img src={image.preview as string} className={"image"} alt="" />
        )}
        <label className={"label"}>
          <p>Image</p>
          <input type="file" onChange={onChangeImage} value={image.url} />
        </label>
        <label className={"label"}>
          <p>Description</p>
          <textarea
            name="description"
            value={forms.description}
            placeholder={"내용을 입력해주세요."}
            cols={30}
            rows={10}
            onChange={onChange}
          />
        </label>
        <input
          type="submit"
          disabled={
            !forms.price || !forms.title || !forms.description || !image.preview
          }
          value={"Submit"}
          className={"button"}
        />
      </form>
    </>
  );
};
export default AdminForm;
