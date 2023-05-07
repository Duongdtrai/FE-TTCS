import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, notification, Image } from 'antd';
import Pagination from "../../../../components/Pagination";
import { useDocumentTitle } from "../../../../hooks/useDocumentTitle";
import { useHistory } from 'react-router-dom';
import { API } from "../../../../configs";
import UserDefault from "../../../../assets/images/user-default.png";

const ListEmployee = () => {
  useDocumentTitle('Danh sách nhân viên');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [listEmployee, setListEmployee] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    API.getAllUser().then(response => {
      setListEmployee(response.data.filter(item => item.role === 1));
      setLoading(false);
    }).catch(error => {
      notification["error"]({
        message: "Lấy danh sách nhân viên không thành công",
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
          src={record.avatar ? `http://54.251.21.44/api/v1/file/${record.avatar}`: UserDefault}
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
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => history.push(`/admin/list-employee/${record.id}`)}>Chi tiết</Button>
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
      <h1 className="text-3xl mb-2">Danh sách nhân viên</h1>
      <Button type="primary" className='mb-2' onClick={() => history.push("/admin/create-employee")}>Thêm nhân viên</Button>
      <Table columns={columns} dataSource={listEmployee} pagination={false} loading={loading} />
      <Pagination total={listEmployee.length} current={page} />
    </div>
  );
};
export default ListEmployee;