import React, { useState, useEffect } from 'react';
import { Layout, Empty, Row, Col, Image, Button } from 'antd';
import API from '../../../configs/api';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthor } from "../../../redux/slice/AuthorUserSlice";
import UserDefault from "../../../assets/images/user-default.png";
import { useHistory } from 'react-router-dom';

const AuthorPage = () => {
  const dispatch = useDispatch();
  const listAuthor = useSelector((state) => state.authorUser.listAuthor);
  const history = useHistory();
  useEffect(() => {
    API.getAllAuthor().then(response => {
      dispatch(setAuthor(response.data));
    }).catch(error => {

    });
  }, []);

  return (
    <>
      {
        listAuthor.length === 0 ? <Empty /> :
          <>
            <h3>Danh sách tác giả</h3>
            <Row gutter={[32, 32]} style={{ width: "100%" }}>
              {
                listAuthor.map((item, index) => {
                  return (
                    <Col span={12} key={index} onClick={() => history.push(`/author/${item.id}`)}>
                      <div
                        style={{
                          border: "1px solid #d7d7d7",
                          borderRadius: 10,
                          width: "100%",
                          backgroundColor: "#ffffff",
                          padding: "40px 50px",
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        <div>
                          <Image
                            width={100}
                            height={100}
                            src={item.image ? `http://54.251.21.44/api/v1/file/${item.image}` : UserDefault}
                            style={{ objectFit: 'contain' }}
                          />
                        </div>
                        <div style={{marginLeft: "20px"}}>
                          <div><span style={{fontWeight: 500}}>Họ và tên:</span> {item.fullName}</div>
                          <div><span style={{fontWeight: 500}}>Ngày sinh:</span> {item.birthday}</div>
                          <div><span style={{fontWeight: 500}}>Mô tả:</span> {item.description}</div>
                        </div>
                      </div>
                    </Col>
                  );
                })
              }
            </Row>
            
          </>
      }
    </>
  );
};
export default AuthorPage;