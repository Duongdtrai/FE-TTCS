import React, { useEffect, useState } from 'react';
import { Space, Table, Image, Button, notification } from 'antd';
import Pagination from "../../../../components/Pagination";
import { useDocumentTitle } from "../../../../hooks/useDocumentTitle";
import { API } from "../../../../configs";
import UserDefault from "../../../../assets/images/user-default.png";

const ListUser = () => {
  useDocumentTitle('Danh sách độc giả');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [listUser, setListUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);
  useEffect(() => {
    setLoading(true);
    API.getAllUser().then(response => {
      setListUser(response.data);
      setLoading(false);
    }).catch(error => {
      notification["error"]({
        message: "Lấy danh sách độc giả không thành công",
      });
    });
  }, [refresh]);
  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => <div> 
        <Image
          width={70}
          height={70}
          src={record.image ? `http://54.251.21.44/api/v1/file/${record.image}`: UserDefault}
          style={{objectFit: 'contain'}}
        />
      </div> 
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
          <Button type="primary">Chi tiết</Button>
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
      <h1 className="text-3xl mb-4">Danh sách độc giả</h1>
      <Table columns={columns} dataSource={listUser} pagination={false} loading={loading} />
      <Pagination total={listUser.length} current={page} handleTableChange={handleTableChange} />
    </div>
  );
};
export default ListUser;