import React, { useState, useEffect } from 'react';
import { Empty, Row, Col, Image, Button } from 'antd';
import API from '../../../configs/api';
import { useDispatch, useSelector } from 'react-redux';
import { setDetailAuthor } from "../../../redux/slice/AuthorUserSlice";
import UserDefault from "../../../assets/images/user-default.png";
import BookDefault from "../../../assets/images/bookDefault.png";
import { useHistory, useParams } from 'react-router-dom';
import Slider from "react-slick";
import './detail-author.module.scss';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3
};

const DetailAuthor = () => {
  const dispatch = useDispatch();
  const detailAuthor = useSelector((state) => state.authorUser.detailAuthor);
  const { authorId } = useParams();
  const history = useHistory();
  const [listBook, setListBook] = useState([]);
  useEffect(() => {
    API.getDetailAuthor(authorId).then(response => {
      dispatch(setDetailAuthor(response.data));
      setListBook(response.data.books);
    });
  }, []);

  return (
    <div className="detail-author">
      <Row gutter={[32, 32]} style={{ width: "100%" }}>
        <Col span={24} onClick={() => history.push(`/author/${item.id}`)}>
          <div
            style={{
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
                width={150}
                height={150}
                src={detailAuthor.image ? `http://54.251.21.44/api/v1/file/${detailAuthor.image}` : UserDefault}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div style={{ marginLeft: "20px" }}>
              <div><span style={{ fontWeight: 500 }}>Họ và tên:</span> {detailAuthor.fullName}</div>
              <div><span style={{ fontWeight: 500 }}>Ngày sinh:</span> {detailAuthor.birthday}</div>
              <div><span style={{ fontWeight: 500 }}>Mô tả:</span> {detailAuthor.description}</div>
            </div>
          </div>
        </Col>
      </Row>
      <h2>Một số tác phẩm nổi bật</h2>
      <Slider {...settings}>
        {listBook.map((book, index) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div className='slider-item' key={index} >
              <Image
                width={150}
                height={150}
                preview={false}
                src={book.avatar && book.avatar.length > 0 ? `http://54.251.21.44/api/v1/file/${book.avatar[0]}` : BookDefault}
                style={{ objectFit: 'contain' }}
              />
              <div>
                <div><span style={{ fontWeight: 500 }}>Tiêu đề: </span>{book.title}</div>
                <div><span style={{ fontWeight: 500 }}>Mô tả: </span>{book.description}</div>
                <Button type='primary'>Mượn sách</Button>
              </div>
            </div>
              
          );
        })}
      </Slider>
    </div>
  );
};
export default DetailAuthor;