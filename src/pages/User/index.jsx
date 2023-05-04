import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, Row, Empty, Image, Button, notification } from 'antd';
import { API } from '../../configs';
import BookDefault from "../../assets/images/bookDefault.png";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [listBooks, setListBooks] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const is_login = useSelector((state) => state.authUser.is_loading);
  const history = useHistory();
  useEffect(() => {
    setLoading(true);
    API.getAllBook().then((response) => {
      setListBooks(response.data);
      setLoading(false);
    }).catch(error => {
      notification["error"]({
        message: "Lấy danh sách không thành công",
      });
    });
  }, []);


  const handleBorrowBook = (bookId) => {
    if (is_login) {
      history.push(`books/${bookId}`);
    } else {
      notification["error"]({
        message: "Vui lòng đăng nhập"
      });
    }
  };
  return (
    <>
      {
        listBooks.length === 0 ? <Empty /> :
          <>
            <h3>Danh sách Book</h3>
            <Row gutter={[8, 16]}>
              {
                listBooks.map((item, index) => {
                  return (
                    <Col span={6} key={index} style={{ width: "100%" }}>
                      <Image
                        style={{ width: "100%", height: "300px", objectFit: "contain" }}
                        src={item.avatarBooks && item.avatarBooks.length > 0 ? `http://54.251.21.44/api/v1/file/${item.avatarBooks[0].avatar}` : BookDefault}
                      />
                      <div><span style={{ fontWeight: 500 }}>Tên sách: </span>{item.title}</div>
                      <div><span style={{ fontWeight: 500 }}>Tác giả: </span>{item.author.fullName}</div>
                      <div><span style={{ fontWeight: 500 }}>Mô tả: </span>{item.description}</div>
                      <Button type='primary' onClick={()=> handleBorrowBook(item.id)}>Mượn sách</Button>
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

export default HomePage;