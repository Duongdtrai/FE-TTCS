import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Space, Table, Tag, Button, Popconfirm } from 'antd';
import Pagination from "../../../../components/Pagination";
import { useDocumentTitle } from "../../../../hooks/useDocumentTitle";
import { API } from "../../../../configs";

const ListBook = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const [listBook, setListBook] = useState([]);
  const history = useHistory();
  useDocumentTitle("Danh sách Book");
  useEffect(() => {
    setLoading(true);
    API.getAllBook().then(response => {
      setListBook(response.data);
      setLoading(false);
    }).catch(error => {
      notification["error"]({
        message: "Lấy danh sách Book không thành công",
      });
    });
  }, [refresh]);

  const columns = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => <div>{record.title}</div>,
    },
    {
      title: 'category',
      dataIndex: 'category',
      key: 'category',
      render: (_, record) => <div>{record.category}</div>,
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      render: (_, record) => <div>{record.description}</div>,
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
      render: (_, record) => record?.author.fullName ? (<div>{record?.author.fullName}</div>) : '-',
    },
    {
      title: 'initialQuantity',
      dataIndex: 'initialQuantity',
      key: 'initialQuantity',
      render: (_, record) => <div>{record.initialQuantity}</div>,
    },
    {
      title: 'numberPage',
      dataIndex: 'numberPage',
      key: 'numberPage',
      render: (_, record) => <div>{record.numberPage}</div>,
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => <div>{record.price} vnđ</div>,
    },
    {
      title: 'releaseDate',
      dataIndex: 'releaseDate',
      key: 'releaseDate',
      render: (_, record) => {
        const timestamp = record.releaseDate;
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return (
          <div>{`${day}/${month}/${year}`}</div>
        );
      }
    },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => history.push(`/admin/list-book/${record.id}`)}>Chi tiết</Button>
          <Popconfirm
            title="Xóa sách"
            description="Bạn có muốn xóa sách không?"
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger onClick={handleDeleteBook(record.id)}>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleDeleteBook = (bookId) => {
    API.deleteBook(bookId).then(() => {
      notification["error"]({
        message: "Xóa book thành công",
      });
      setRefresh(!refresh);
    }).catch((error) => {
      notification["error"]({
        message: "Xóa book không thành công",
      });
    });
  };
  const handleTableChange = (page, size) => {
    setPage(page);
    setSize(size);
    setRefresh(!refresh);
  };
  return (
    <div>
      <h1 className="text-3xl">Danh sách Book</h1>
      <Button type="primary" className='mb-2' onClick={() => history.push("/admin/create-book")}>Thêm book</Button>
      <Table columns={columns} dataSource={listBook} pagination={false} loading={loading} />
      <Pagination total={listBook.length} current={page} />
    </div>
  );
};
export default ListBook;