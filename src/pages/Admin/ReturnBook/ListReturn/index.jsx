import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, notification } from 'antd';
import Pagination from "../../../../components/Pagination";
import { API } from "../../../../configs";
import { useDocumentTitle } from "../../../../hooks/useDocumentTitle";
const ListReturn = () => {
  useDocumentTitle("Quản lý mượn sách");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [refresh, setRefresh] = useState(true);
  const [listReturnBook, setListReturnBook] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    API.getAllReturnAdmin().then(response => {
      setListReturnBook(response.data);
      setLoading(false);
    }).catch(error => {
      notification["error"]({
        message: "Lấy danh sách trả sách không thành công",
      });
    });
  }, [refresh]);
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
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">View</Button>
          <Button type="primary" danger>Delete</Button>
        </Space>
      ),
    },
  ];
  const handleTableChange = (page, size) => {
    setPage(page);
    setSize(size);
    setRefresh(!refresh);
  };
  return (
    <div>
      <h1 className="text-3xl mb-4">Danh sách trả sách</h1>
      <Table columns={columns} dataSource={listReturnBook} pagination={false} />
      <Pagination total={listReturnBook.length} current={page} handleTableChange={handleTableChange} />
    </div>
  );
};
export default ListReturn;