import React from "react";
import styled from "styled-components";
import { Flex } from "../../Utlis";
import UseInput from "../../../hooks/useInput";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import { addElement } from "../../../config/aditional";
const Content = styled(Flex)`
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;
const Box = styled(Flex)`
  flex-direction: column;
  gap: 27px;
  padding-left: 38px;
  padding-right: 91px;
  width: 100%;
`;
const InputBox = styled(Flex)`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Inputs = styled.form`
  display: flex;
  gap: 18px;
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
const Input1 = styled.input`
  width: 763px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid #e5e6e6;
  background: rgba(242, 243, 244, 0.8);
  color: #444;
  font-family: Overpass;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.24px;
  padding: 13px 10px 12px 10px;
`;

const Input2 = styled.input`
  width: 1038px;
  height: 262px;
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid #e5e6e6;
  background: rgba(242, 243, 244, 0.8);
  color: #444;
  font-family: Overpass;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.24px;
  padding: 13px 10px 12px 10px;
`;
const Select = styled.select`
  width: 256px;
  height: 40px;
  border-radius: 3px;
  border: 1px solid #ddd;
  background: #f5f5f6;
`;

const AdditionalPostUz = () => {
  const [value2, setValue] = React.useState("");
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
  const obj = {
    side: "",
    type: "",
    titleUz: "",
  };
  const { value, changeValue } = UseInput(obj);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(addElement(value));
  }, [value]);
  React.useEffect(() => {
    dispatch(addElement({ descriptionUz: value2 }));
  }, [value2]);
  return (
    <>
      <Inputs>
        <InputBox>
          <Label>Nomi</Label>
          <Input1 placeholder="nomi" name="titleUz" onChange={changeValue} />
        </InputBox>
        <InputBox>
          <Label>Turi</Label>
          <Select name="type" onChange={changeValue}>
            <option selected>Turi</option>
            <option value="Agentlik haqida">Agentlik haqida</option>
            <option value="Axborot xizmati">Axborot xizmati</option>
            <option value="Mediateka">Mediateka</option>
            <option value="Meyoriy hujjatlar">Meyoriy hujjatlar</option>
            <option value="Ochiq Malumotlar">Ochiq Malumotlar</option>
            <option value="Online kredit">Online kredit</option>
            <option value="Bog'lanish">Bog'lanish</option>
            <option value="Link Generate">Link Generate</option>
          </Select>
        </InputBox>
      </Inputs>
      <InputBox>
        <Label>Bo'limi</Label>
        <Select
          disabled={value.type === "Link Generate"}
          name="side"
          onChange={changeValue}
        >
          <option selected>Tarafi</option>
          <option value="left">Chap</option>
          <option value="right">O'ng</option>
        </Select>
      </InputBox>
      <ReactQuill
        style={{ width: "768px", height: "300px" }}
        modules={moduls}
        theme="snow"
        value={value2}
        onChange={setValue}
      />
    </>
  );
};

export default AdditionalPostUz;
