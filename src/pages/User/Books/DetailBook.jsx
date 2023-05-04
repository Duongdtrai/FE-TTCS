import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, Row, Image, Button, notification, InputNumber, DatePicker, Typography, Space, Form, Input, Rate } from 'antd';
import { API } from '../../../configs';
import BookDefault from "../../../assets/images/bookDefault.png";
import UserDefault from "../../../assets/images/user-default.png";
import { DATE_FORMAT } from '../../../utils/constant';
import moment from 'moment';

const DetailBook = () => {
  const [loading, setLoading] = useState(false);
  const [bookDetails, setBookDetails] = useState([]);
  const [listComments, setListComments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [dataBorrow, setDataBorrow] = useState({
    quantity: 0,
    paidDate: null
  });
  const is_login = useSelector((state) => state.authUser.is_loading);
  const { bookId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!is_login) {
      notification["error"]({
        message: "Vui lòng đăng nhập"
      });
      history.push("/");
    }
    setLoading(true);
    API.getDetailBook(bookId).then((response) => {
      setBookDetails(response.data);
      setLoading(false);
      API.getAllCommentBook(bookId).then((response) => {
        setListComments(response.data);
      });
    }).catch(error => {
      notification["error"]({
        message: "Lấy danh sách không thành công",
      });
    });
  }, [refresh]);

  let formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  let formattedPrice = formatter.format(bookDetails.price);

  const handleBorrowBook = () => {
    if (dataBorrow.quantity === 0 || dataBorrow.paidDate === null) {
      notification["warning"]({
        message: "Vui lòng chọn số lượng và ngày trả"
      });
      return;
    }
    setLoading(true);
    API.borrowBookUser({
      quantity: dataBorrow.quantity,
      paidDate: moment(dataBorrow.releaseDate).format("YYYY-MM-DD"),
    }, bookId).then(() => {
      notification["success"]({
        message: "Mượn sách thành công"
      });
      history.push("/cart");
    }).catch(err => {
      notification["error"]({
        message: "Mượn sách không thành công"
      });
    }).finally(() => {
      setLoading(false);
    });
  };

  const onFinish = async (values) => {
    API.commentBook(bookId, values).then(() => {
      notification["success"]({
        message: "Thêm đánh giá thành công",
      });
      setRefresh(!refresh);
    }).catch(err => {
      notification["error"]({
        message: "Thêm đánh giá không thành công",
      });
    });
  };

  return (
    <>
      <h3>{bookDetails.title}</h3>
      <Row gutter={[16, 16]}>
        <Col span={8} >
          <Image
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
            src={bookDetails.avatarBooks && bookDetails.avatarBooks.length > 0 ? `http://54.251.21.44/api/v1/file/${bookDetails.avatarBooks[0].avatar}` : BookDefault}
          />

        </Col>
        <Col span={16} style={{ width: "100%" }}>
          <Row gutter={[16, 16]}>
            <Col span={6} style={{ fontWeight: 500 }}>Tên sách:</Col>
            <Col span={18}>{bookDetails.title}</Col>
            <Col span={6} style={{ fontWeight: 500 }}>Tác giả:</Col>
            <Col span={18}>{bookDetails?.author?.fullName}</Col>
            <Col span={6} style={{ fontWeight: 500 }}>Giá tiền:</Col>
            <Col span={18} className="align-right">{formattedPrice}</Col>
            <Col span={6} style={{ fontWeight: 500 }}>Số lượng:</Col>
            <Col span={18} className="align-right">
              <InputNumber
                defaultValue={0}
                min={1}
                onChange={(value) => setDataBorrow({ ...dataBorrow, quantity: value })}
              />
            </Col>
            <Col span={6} style={{ fontWeight: 500 }}>Ngày trả:</Col>
            <Col span={18} className="align-right">
              <DatePicker
                placeholder='Ngày trả'
                format={DATE_FORMAT}
                onChange={(value) => {
                  setDataBorrow({ ...dataBorrow, paidDate: moment(value).format(DATE_FORMAT) });
                }}
              />
            </Col>
            <Col span={24} className="align-right">
              <Button type='primary' onClick={handleBorrowBook} loading={loading}>Mượn sách</Button>
            </Col>
            <Col span={24} className="align-right">
              <Form name="review-form" onFinish={onFinish}>
                <Form.Item name="star" label="Đánh giá" labelCol={{ style: { fontWeight: 'bold' } }}>
                  <Rate value={2} />
                </Form.Item>
                <Form.Item name="comment" label="Nhận xét" labelCol={{ style: { fontWeight: 'bold' } }}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Đánh giá
                  </Button>
                </Form.Item>
              </Form>
            </Col>

          </Row>
        </Col>
      </Row>
      <h1 className='mt-2'>ĐÁNH GIÁ SẢN PHẨM</h1>
      <Row>
        {
          listComments.map((item, index) => {
            return (
              <Col key={index} span={24}>
                <Row gutter={[16, 8]}>
                  <Col span={24}>
                    <Space>
                      <Image
                        preview={false}
                        src={item.user.avatar ? `http://54.251.21.44/api/v1/file/${item.user.avatar}` : UserDefault}
                        style={{ width: "70px", height: "70px", borderRadius: "50%", objectFit: "contain" }}
                      />
                      <div>
                        <div>{item.user.username}</div>
                        <Rate value={item.star} disabled />
                      </div>
                    </Space>
                  </Col>
                  <Col span={24}>
                    <p>{item.comment}</p>
                  </Col>
                </Row>
                {index !== listComments.length - 1 && <hr></hr>}
              </Col>
            );
          })
        }
      </Row>

    </>
  );
};

export default DetailBook;