import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Space, Table, Tag, Button } from 'antd';
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
      title: 'FullName',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">Chi tiết</Button>
          <Button type="primary" danger>Xóa</Button>
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
      <h1 className="text-3xl">Danh sách Book</h1>
      <Button type="primary" className='mb-2' onClick={() => history.push("/admin/create-book")}>Thêm book</Button>
      <Table columns={columns} dataSource={listBook} pagination={false} loading={loading} />
      <Pagination total={listBook.length} current={page} />
    </div>
  );
};
export default ListBook;