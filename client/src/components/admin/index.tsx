import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import axios from "axios";

export type FormType = {
  id?: string;
  imageUrl: string;
  price: string;
  title: string;
  description: string;
};

type AdminFormProps = {
  handleSubmit: (event: FormEvent) => void;
  forms: FormType;
  setForms: Dispatch<SetStateAction<FormType>>;
  preview: string | ArrayBuffer | null;
  setPreview: Dispatch<SetStateAction<string | ArrayBuffer | null>>;
};

const AdminForm = ({
  forms,
  handleSubmit,
  setForms,
  preview,
  setPreview,
}: AdminFormProps) => {
  const onChange = (event: any) => {
    const { value, name } = event.target;
    setForms({ ...forms, [name]: value });
  };
  const onChangeImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return alert("파일을 찾을 수 없습니다.");
    const file = event.target.files[0] as File;
    if (!/([^\s]+(?=\.(jpg|png|jpeg|PNG|JPG))\.\2)/.test(file.name))
      return alert("PNG,JPG 이미지만 업로드 가능합니다.");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    const { data, status } = await axios.post(
      `https://api.cloudinary.com/v1_1/diuiwn91v/image/upload`,
      formData
    );
    if (status === 200) {
      setForms({ ...forms, imageUrl: data.url });
    } else {
      return alert("이미지 로드 애러가 났습니다.");
    }
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
        {preview && <img src={preview as string} className={"image"} alt="" />}
        <label className={"label"}>
          <p>Image</p>
          <input type="file" onChange={onChangeImage} />
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
            !forms.price || !forms.title || !forms.description || !preview
          }
          value={"Submit"}
          className={"button"}
        />
      </form>
    </>
  );
};
export default AdminForm;
