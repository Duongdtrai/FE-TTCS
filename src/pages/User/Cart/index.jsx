import React, { useEffect, useState } from 'react';
import { Image, Col, Empty, Row, Tag, Table } from 'antd';
import { API } from '../../../configs';
const CartPage = () => {
  const [listBorrow, setListBorrow] = useState([]);

  useEffect(() => {
    API.getAllBorrowUser().then((response) => {
      setListBorrow(response.data);
    });
  }, []);
  const columns = [
    {
      title: 'Người mượn',
      dataIndex: 'user',
      key: 'user',
      render: (_, record) => <div>{record.user.username}</div>,
    },
    {
      title: 'Tên sách',
      dataIndex: 'book',
      key: 'book',
      render: (_, record) => <div>{record.book.title}</div>,
    },
    {
      title: 'Tác giả',
      dataIndex: 'bookAuthor',
      key: 'bookAuthor',
      render: (_, record) => <div>{record.book.author.fullName}</div>,
    },

    {
      title: 'Trạng Thái',
      dataIndex: 'bookAuthor',
      key: 'bookAuthor',
      render: (_, record) => <Tag color="green">
        {record.status}
      </Tag>
    },
    {
      title: 'Ngày mượn',
      dataIndex: 'borrowBook',
      key: 'borrowBook',
      render: (_, record) => {
        const timestamp = record.borrowedDate;
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const getFullDay = `${day}/${month}/${year}`;
        return (<div>{getFullDay}</div>);
      }
    },
    {
      title: 'Ngày trả',
      dataIndex: 'returnBook',
      key: 'returnBook',
      render: (_, record) => {
        const timestamp = record.paidDate;
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const getFullDay = `${day}/${month}/${year}`;
        return (<div>{getFullDay}</div>);
      }
    },
  ];
  return (
    <>
      <h3>Danh sách sách đang mượn</h3>
      {
        listBorrow.length === 0 ? <Empty /> :
          <Table columns={columns} dataSource={listBorrow} pagination={false} />
      }
    </>
  );
};
export default CartPage;