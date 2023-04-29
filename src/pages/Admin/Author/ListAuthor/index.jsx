import React, { useState, useEffect } from 'react';
import { Space, Table, Image, Button, notification, Popconfirm } from 'antd';
import Pagination from "../../../../components/Pagination";
import { useDocumentTitle } from "../../../../hooks/useDocumentTitle";
import { useHistory } from 'react-router-dom';
import { API } from "../../../../configs";
import UserDefault from "../../../../assets/images/user-default.png";

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
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_, record) => record.fullName ? record.fullName : '-'
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
          <Button type="primary" onClick={() => history.push(`/admin/list-author/${record.id}`)}>Chi tiết</Button>
          <Popconfirm
            title="Xóa tác giả"
            description="Bạn có muốn xóa tác giả không?"
            okText="Yes"
            cancelText="No"
            // open={open}
            // onConfirm={handleDeleteAuthor}
            // okButtonProps={{ loading: confirmLoading }}
            // onCancel={handleCancel}
          >
            <Button type="primary" danger onClick={() => handleDeleteAuthor(record.id)}>Xóa</Button>
          </Popconfirm>
        
        </Space>
      ),
    },
  ];
  // const [open, setOpen] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const showPopconfirm = () => {
  //   setOpen(true);
  // };
  // const handleCancel = () => {
  //   setOpen(false);
  // };
  const handleDeleteAuthor = (authorId) => {
    // setConfirmLoading(true);
    API.deleteAuthor(authorId).then(() => {
      notification["error"]({
        message: "Xóa tác giả thành công",
      });
      // setOpen(false);
      // setConfirmLoading(false);
      setRefresh(!refresh);
    }).catch((error) => {
      // setOpen(false);
      // setConfirmLoading(false);
      // notification["error"]({
      //   message: "Xóa tác giả không thành công",
      // });
    });
  };
  const handleTableChange = (page, size) => {
    setPage(page);
    setSize(size);
    setRefresh(!refresh);
  };
  return (
    <div>
      <h1 className="text-3xl">Danh sách tác giả</h1>
      <Button type="primary" className='mb-2' onClick={() => history.push("/admin/create-author")}>Thêm tác giả</Button>
      <Table columns={columns} dataSource={listAuthor} pagination={false} loading={loading} />
      <Pagination total={listAuthor.length} current={page} />
    </div>
  );
};
export default ListAuthor;