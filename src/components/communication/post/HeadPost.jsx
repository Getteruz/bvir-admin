import React from "react";
import styled from "styled-components";
import {
  ArrowL,
  ArrowR,
  Cencel,
  Edit2,
  Priceteg,
  Redo,
  Save,
  Shield,
  User,
} from "../../../assets/img/img.js";
import { Flex } from "../../Utlis.js";
import { Link, useNavigate } from "react-router-dom";
import { addElem } from "../../../config/comunacation.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { editElement, showElem } from "../../../config/edit2.js";
const Header1 = styled.header`
  background: #f2f3f4;
  width: 100% !important;
  padding: 26px 91px 26px 35px;
`;
const Nav = styled.nav`
  width: 100% !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Left = styled(Flex)`
  gap: 15px;
  align-items: center;
`;
const Arrows = styled(Flex)`
  gap: 10px;
  align-items: center;
`;
const Arrow = styled.img`
  cursor: pointer;
`;
const Tittle = styled.p`
  color: #444;
  text-align: center;
  font-family: Overpass;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.26px;
  opacity: 0.6;
`;
const Right = styled(Flex)`
  align-items: center;
  gap: 40px;
`;
const Btns = styled(Flex)`
  gap: 28px;
  align-items: center;
`;
const Icon = styled.img`
  cursor: pointer;
`;
const Actions = styled(Flex)`
  gap: 20px;
`;
const Action = styled(Flex)`
  cursor: pointer;
  color: #444;
  font-family: Overpass;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.26px;
  gap: 5px;
  align-items: center;
`;
const HeadPost = () => {
  const navigate = useNavigate();
  const { comunacation } = useSelector(addElem);
  const click = async () => {
    try {
      await axios
        .patch("https://api.agroxizmatlar.uz/communication-tool/02ddac33-a2a2-4246-9ef3-af832a2fa567", comunacation, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status == 200) {
            alert("malumot o'zgartirildi");
            navigate("/dash/communication");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const { edit2 } = useSelector(showElem);
  const dispatch = useDispatch();
  return (
    <Header1>
      <div className="container2">
        <Nav>
          <Left>
            <Arrows>
              <Arrow src={ArrowR} />
              <Arrow src={ArrowL} />
            </Arrows>
            <Tittle>Bosh sahifa</Tittle>
          </Left>
          <Right>
            <Btns>
              <Icon
                src={Redo}
                onClick={() => window.location.reload()}
                alt=""
              />
              <Icon src={Priceteg} alt="" />
              <Icon src={Shield} alt="" />
            </Btns>
            <Actions>
              {edit2 == false ? (
                <Action onClick={() => dispatch(editElement(true))}>
                  <img src={Edit2} alt="" />
                  Tahrirlash
                </Action>
              ) : (
                <>
                  <Action
                    onClick={() => {
                      dispatch(editElement(false));
                      window.location.reload();
                    }}
                  >
                    <img src={Cencel} alt="" />
                    Bekor qilish
                  </Action>
                  <Link onClick={() => click()}>
                    <Action>
                      <img src={Save} alt="" />
                      Saqalsh
                    </Action>
                  </Link>
                </>
              )}
            </Actions>
            <img src={User} />
          </Right>
        </Nav>
      </div>
    </Header1>
  );
};

export default HeadPost;