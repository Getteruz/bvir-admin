import React from "react";
import styled from "styled-components";
import { Flex } from "../../Utlis";
import { useDispatch } from "react-redux";
import UseInput from "../../../hooks/useInput";
import { addElement } from "../../../config/leader";
import axios from "axios";
import FileInput from "../../library/FileInput";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";

const Left = styled(Flex)`
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;
const InputBox = styled(Flex)`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Right = styled(Flex)`
  border-radius: 3px;
  border: 1px solid #e5e6e6;
  background: #f5f5f6;
  width: 212px;
  padding: 20px 15px 34px 15px;
  flex-direction: column;
  gap: 8px;
`;
const Label2 = styled.label`
  color: #444;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.75px;
`;
const Label = styled.label`
  color: #444;
  font-family: Overpass;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.24px;
  opacity: 0.7;
`;

const Input2 = styled.input`
  width: 256px;
  height: 40px;
  border-radius: 3px;
  border: 1px solid #ddd;
  background: #f5f5f6;
  padding: 13px 10px 12px 10px;
`;
const Input3 = styled.input`
  width: 531px;
  height: 40px;
  border-radius: 3px;
  border: 1px solid #ddd;
  background: #f5f5f6;
  padding: 13px 10px 12px 10px;
`;
const Inputs = styled(Flex)`
  gap: 19px;
  justify-content: space-between;
  width: 100%;
`;
const Input4 = styled.input`
  width: 806px;
  height: 376px;
  border-radius: 3px;
  border: 1px solid #ddd;
  background: #f5f5f6;
  padding: 13px 10px;
`;

const LInputEdUz = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState({});
  const [value2, setValue] = React.useState(data.taskUz);
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = React.useState("");
  let urlFile = "";
  const handleFileChange = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);

    await axios
      .post("https://grm-upload.getter.uz/upload/image", formData)
      .then(async (response) => {
        if (response.status == "400") {
          alert("iltimos rasm qayta yuklang!");
        }
        urlFile = response.data;
        setSelectedFile({ url: response.data });
      })
      .catch((error) => {
        console.error("File upload failed:", error);
      });
  };
  async function getInfo() {
    await axios
      .get(`https://api.agroxizmatlar.uz/management/${id}`)
      .then((res) => {
        setData(res.data);
        setValue(res.data.taskUz);
      });
  }
  const { value, changeValue } = UseInput(data);
  const moduls = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["bold", "italic", "underline", "strike", "blockquote"],
      ["link", "image", "video"],
    ],
  };
  React.useEffect(() => {
    getInfo();
  }, []);
  React.useEffect(() => {
    dispatch(addElement(value));
  }, [value]);
  React.useEffect(() => {
    dispatch(addElement({ taskUz: value2 }));
  }, [value2]);
  React.useEffect(() => {
    dispatch(addElement(selectedFile));
  }, [selectedFile]);
  return (
    <>
      <Left>
        <Inputs>
          <InputBox>
            <Label>Ism</Label>
            <Input2
              placeholder="Ism"
              name="firstNameUz"
              defaultValue={data.firstNameUz}
              onChange={changeValue}
            />
          </InputBox>
          <InputBox>
            <Label>Familiyasi</Label>
            <Input2
              placeholder="Familiyasi"
              name="Familiyasi"
              defaultValue={data.lastNameUz}
              onChange={changeValue}
            />
          </InputBox>
          <InputBox>
            <Label>Sharifi</Label>
            <Input2
              placeholder="Sharifi"
              name="fatherNameUz"
              defaultValue={data.fatherNameUz}
              onChange={changeValue}
            />
          </InputBox>
        </Inputs>
        <Inputs>
          <InputBox>
            <Label>Rasm</Label>
            <FileInput name={"image"} func={handleFileChange} />
          </InputBox>
          <InputBox>
            <Label>Lavozimi</Label>
            <Input3
              placeholder="Ism"
              name="positionUz"
              defaultValue={data.positionUz}
              onChange={changeValue}
            />
          </InputBox>
        </Inputs>

        <ReactQuill
         style={{ width: "768px", height: "300px" }}
          modules={moduls}
          theme="snow"
          value={value2}
          onChange={setValue}
        />
      </Left>
    </>
  );
};

export default LInputEdUz;