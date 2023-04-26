import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, notification } from 'antd';
import Pagination from "../../../../components/Pagination";
import { useDocumentTitle } from "../../../../hooks/useDocumentTitle";
import { useHistory } from 'react-router-dom';
import { API } from "../../../../configs";

const ListAuthor = () => {
  useDocumentTitle('Danh sách tác giả');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [listAuthor, setListAuthor] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setLoading(true);
    API.getAllAuthor().then(response => {
      setListAuthor(response.data);
      setLoading(false);
    }).catch(error => {
      notification["error"]({
        message: "Lấy danh sách tác giả không thành công",
      });
    });
  }, [refresh]);
  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (_, record) => record.avatar ? record.avatar : '-'
    },
    {
      title: 'Họ tên',
      dataIndex: 'username',
      key: 'username',
      render: (_, record) => record.username ? record.username : '-'
    },
    {
      title: 'Tuổi',
      dataIndex: 'age',
      key: 'age',
      render: (_, record) => record.age ? record.age : '-'
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: (_, record) => record.gender ? record.gender : '-'
    },
    {
      title: 'Công việc',
      dataIndex: 'job',
      key: 'job',
      render: (_, record) => record.job ? record.job : '-'
    },
    {
      title: 'Trạng thái làm việc',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <>
          {record.status ? record.status : '-'}
          {/* {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })} */}
        </>
      ),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render: (_, record) => record.address ? record.address : '-'
    },

    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => history.push("/admin/edit-author")}>Chi tiết</Button>
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
      <h1 className="text-3xl">Danh sách tác giả</h1>
      <Button type="primary" className='mb-2' onClick={() => history.push("/admin/create-author")}>Thêm tác giả</Button>
      <Table columns={columns} dataSource={listAuthor} pagination={false} loading={loading} />;
      <Pagination total={listAuthor.length} current={page} />
    </div>
  );
};
export default ListAuthor;