import { Col, Row, Empty, Image, Button, Carousel } from 'antd';
import React, { useState } from 'react';
import Pagination from '../../components/Pagination';

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [refresh, setRefresh] = useState(true);

  const handleTableChange = (page, size) => {
    setPage(page);
    setSize(size);
    setRefresh(!refresh);
  };

  const mock_data = [
    {
      id: "1",
      author: "Phạm Tùng Dương",
      image: "",
      price: "20000",
      star: 2
    },
    {
      id: "1",
      author: "Phạm Tùng Dương",
      image: "",
      price: "20000",
      star: 2
    },
    {
      id: "1",
      author: "Phạm Tùng Dương",
      image: "",
      price: "20000",
      star: 2
    },
    {
      id: "1",
      author: "Phạm Tùng Dương",
      image: "",
      price: "20000",
      star: 2
    },
    {
      id: "1",
      author: "Phạm Tùng Dương",
      image: "",
      price: "20000",
      star: 2
    },
    {
      id: "1",
      author: "Phạm Tùng Dương",
      image: "",
      price: "20000",
      star: 2
    },
    {
      id: "1",
      author: "Phạm Tùng Dương",
      image: "",
      price: "20000",
      star: 2
    },
    {
      id: "1",
      author: "Phạm Tùng Dương",
      image: "",
      price: "20000",
      star: 2
    },
    {
      id: "1",
      author: "Phạm Tùng Dương",
      image: "",
      price: "20000",
      star: 2
    },
    {
      id: "1",
      author: "Phạm Tùng Dương",
      image: "",
      price: "20000",
      star: 2
    },
    {
      id: "1",
      author: "Phạm Tùng Dương",
      image: "",
      price: "20000",
      star: 2
    }
  ];
  const contentStyle = {
    height: '200px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    border: "1px solid black"
  };
  return (
    <>
      {
        mock_data.length === 0 ? <Empty /> : 
          <>
            <button type="button" className="btn btn-primary">Test boostrap</button>
            <Carousel>
              <div>
                <h3 style={contentStyle}>
                  <Image
                    preview={false}
                    src="https://salt.tikicdn.com/cache/w1240/ts/brickv2og/de/2b/e1/6c050d9f840361d190ec848fa71d2b69.png.webp"
                    style={{height: '200px', width: '100%'}}
                  />
                </h3>
              </div>
              <div>
                <h3 style={contentStyle}>
                  <Image
                    preview={false}
                    src="https://salt.tikicdn.com/cache/w1240/ts/brickv2og/de/2b/e1/6c050d9f840361d190ec848fa71d2b69.png.webp"
                    style={{height: '200px', width: '100%'}}
                  />
                </h3>
                
              </div>
              <div>
                <h3 style={contentStyle}>
                  <Image
                    preview={false}
                    src="https://salt.tikicdn.com/cache/w1240/ts/brickv2og/de/2b/e1/6c050d9f840361d190ec848fa71d2b69.png.webp"
                    style={{height: '200px', width: '100%'}}
                  />
                </h3>
              </div>
              <div>
                <h3 style={contentStyle}>
                  <Image
                    preview={false}
                    src="https://salt.tikicdn.com/cache/w1240/ts/brickv2og/de/2b/e1/6c050d9f840361d190ec848fa71d2b69.png.webp"
                    style={{height: '200px', width: '100%'}}
                  />
                </h3>
              </div>
            </Carousel>
            <Row gutter={[8, 16]}>
              {
                mock_data.map((item, index) => {
                  return (
                    <>
                      <Col span={6}>
                        <Image
                          width={200}
                          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                        <div>
                          {item.author}
                        </div>
                        <div>{item.price}</div>
                        <Button type="primary">Đặt mua</Button>
                        <Button type="danger">Mượn sách</Button>
                      </Col>
                    </>
                  );
                })
              }
            
            </Row>
            <Pagination
              total={mock_data.length}
              handleTableChange={handleTableChange}
              current={1}
            />
          </>
      }
    </>
  );
};

export default HomePage;