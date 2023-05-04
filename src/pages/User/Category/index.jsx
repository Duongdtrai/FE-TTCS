import React, { useEffect, useState } from 'react';
import { Row, Col, Select, Image, Button, Empty } from 'antd';
import { CATEGORY } from '../../../utils/constant';
import { API } from '../../../configs';
import BookDefault from "../../../assets/images/bookDefault.png";

const { Option } = Select;
const Category = () => {
  const [listBooks, setListBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

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
  }, [refresh]);

  const handleChangeCategory = (value) => {
    if (value === CATEGORY.all.value) {
      setRefresh(!refresh);
    } else {
      API.getAllBook().then((response) => {
        setListBooks(response.data.filter((item) => {
          return item.category === value;
        }));
      });
    }
  };
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
      <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
        <Select placeholder="Thể loại" onChange={handleChangeCategory} style={{ width: "400px" }} >
          <Option value={CATEGORY.all.value}>{CATEGORY.all.title}</Option>
          <Option value={CATEGORY.ccpl.value}>{CATEGORY.ccpl.title}</Option>
          <Option value={CATEGORY.khcn.value}>{CATEGORY.khcn.title}</Option>
          <Option value={CATEGORY.vhnt.value}>{CATEGORY.vhnt.title}</Option>
          <Option value={CATEGORY.vhxh.value}>{CATEGORY.vhxh.title}</Option>
          <Option value={CATEGORY.gt.value}>{CATEGORY.gt.title}</Option>
          <Option value={CATEGORY.ttt.value}>{CATEGORY.ttt.title}</Option>
          <Option value={CATEGORY.tttltg.value}>{CATEGORY.tttltg.title}</Option>
          <Option value={CATEGORY.stn.value}>{CATEGORY.stn.title}</Option>
        </Select>
      </div>
      {
        listBooks.length === 0 ? <Empty /> :
          <>
            <div>

              <div style={{ marginTop: "20px" }}>
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
                          <Button type='primary' onClick={handleBorrowBook}>Mượn sách</Button>
                        </Col>
                      );
                    })
                  }

                </Row>
              </div>

            </div>
          </>
      }
    </>

  );
};
export default Category;