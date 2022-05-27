import { Button, Modal, notification, Row, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignmentGround, listBrowseGrounds } from "../actions/groundActions";
import { assignment, listBrowseProducts } from "../actions/productActions";
import { listSellers } from "../actions/userActions";
import Browse from "../components/Browse";
import BrowseGround from "../components/BrowseGround";
const { TabPane } = Tabs;

function BrowseScreen() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const browseList = useSelector((state) => state.browseList);
  const { loading, error, products } = browseList;
  const browseGroundList = useSelector((state) => state.browseGroundList);
  const {
    loading: loadingGround,
    error: errorGround,
    grounds,
  } = browseGroundList;
  const listSeller = useSelector((state) => state.listSeller);
  const { loading: loadingSeller, error: errorSeller, sellers } = listSeller;

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingGround, setIsEditingGround] = useState(false);

  const [selectedRowKeysSeller, SetSelectedRowkeysSeller] = useState([]);
  const [productId, setProductId] = useState([]);
  const [groundId, setGroundId] = useState([]);
  const [dataSource, setDataSource] = useState();
  const [deletee, setDeletee] = useState();

  //List sản phẩm nhà/ chung cư
  useEffect(() => {
    dispatch(listBrowseProducts());
  }, [dispatch, dataSource, deletee]);
  //List sản phẩm đất
  useEffect(() => {
    dispatch(listBrowseGrounds());
  }, [dispatch, dataSource]);
  //List nhân viên
  useEffect(() => {
    dispatch(listSellers());
  }, [dispatch]);
  //productId
  const callbackProduct = (chilData) => {
    setProductId(chilData);
  };
  //groundId
  const callbackGround = (chilData) => {
    setGroundId(chilData);
  };
  //xóa
  const callbackDelete = (chilData) => {
    setDeletee(chilData);
  };
  const onEditProduct = () => {
    setIsEditing(true);
  };
  const resetEditing = () => {
    setIsEditing(false);
  };

  const onEditGround = () => {
    setIsEditingGround(true);
  };
  const resetEditingGround = () => {
    setIsEditingGround(false);
  };
  const onSelectChange = (selectedRowKeysSeller) => {
    console.log("selectedRowKeysSeller changed: ", selectedRowKeysSeller);
    SetSelectedRowkeysSeller(selectedRowKeysSeller);
  };
  const rowSelection = {
    selectedRowKeysSeller,
    onChange: onSelectChange,
  };
  const handleBrowseAndAssignment = (e) => {
    const create = dispatch(assignment(productId, selectedRowKeysSeller));
    create
      .then((data) => {
        if (data.success) {
          notification.success({
            description: data.message,
            placement: "bottomRight",
            duration: 3,
          });
          console.log(data, "data");
          setDataSource(data);
          setProductId([]);
        } else {
          notification.warning({
            description: data.message,
            placement: "bottomRight",
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          description: err.message,
          placement: "bottomRight",
          duration: 3,
        });
      });
  };

  const handleBrowseGroundAndAssignment = (e) => {
    const create = dispatch(assignmentGround(groundId, selectedRowKeysSeller));
    create
      .then((data) => {
        if (data.success) {
          notification.success({
            description: data.message,
            placement: "bottomRight",
            duration: 3,
          });
          console.log(data, "data");
          setDataSource(data);
          setGroundId([]);
        } else {
          notification.warning({
            description: data.message,
            placement: "bottomRight",
            duration: 3,
          });
        }
      })
      .catch((err) => {
        notification.error({
          description: err.message,
          placement: "bottomRight",
          duration: 3,
        });
      });
  };
  const data = [];
  if (sellers) {
    for (let item of sellers) {
      data.push({
        key: item._id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        address: item.address,
      });
    }
  }
  const columns = [
    {
      title: "Tên nhân viên",
      dataIndex: "name",
      width: 100,
      fixed: "left",
    },
    {
      title: "email",
      dataIndex: "email",
      width: 100,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 100,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: 200,
    },
  ];
  return (
    <div>
      <h3
        class="title_sticky"
        id="jumpto_0"
        style={{
          fontWeight: "bold",
          fontSize: "30px",
          color: "red",
          marginLeft: "2rem",
        }}
      >
        Đăng sản phẩm
      </h3>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size="Large"
        style={{ fontWeight: "bold", fontSize: "60px" }}
      >
        <TabPane tab=" Nhà Ở/ Chung Cư" key="1">
          <Browse
            products={products}
            loading={loading}
            error={error}
            userInfo={userInfo}
            parentCallback={callbackProduct}
            parentDeletee={callbackDelete}
          />
          {productId.length < 1 ? (
            <Button
              disabled
              type="primary"
              block
              style={{
                marginTop: "100px",
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
              }}
              onClick={() => {
                onEditProduct();
              }}
            >
              Đăng bài
            </Button>
          ) : (
            <Button
              type="primary"
              block
              style={{
                marginTop: "100px",
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
              }}
              onClick={() => {
                onEditProduct();
              }}
            >
              Đăng bài
            </Button>
          )}
        </TabPane>
        <TabPane tab=" Đất" key="2">
          <BrowseGround
            grounds={grounds}
            loading={loadingGround}
            error={errorGround}
            userInfo={userInfo}
            parentCallback={callbackGround}
          />
          {groundId.length < 1 ? (
            <Button
              disabled
              type="primary"
              block
              style={{
                marginTop: "100px",
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
              }}
              onClick={() => {
                onEditGround();
              }}
            >
              Đăng bài
            </Button>
          ) : (
            <Button
              type="primary"
              block
              style={{
                marginTop: "100px",
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
              }}
              onClick={() => {
                onEditGround();
              }}
            >
              Đăng bài
            </Button>
          )}
        </TabPane>
      </Tabs>

      <Modal
        title="Danh sách nhân viên "
        visible={isEditing}
        width={1600}
        okText="Đăng bài "
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          handleBrowseAndAssignment();
          resetEditing();
        }}
      >
        <Row>
          <Table
            columns={columns}
            dataSource={data}
            rowSelection={{ ...rowSelection, type: "radio" }}
            scroll={{ x: 900, y: 400 }}
          />
        </Row>
      </Modal>
      <Modal
        title="Danh sách nhân viên1 "
        visible={isEditingGround}
        width={1600}
        okText="Phân công"
        onCancel={() => {
          resetEditingGround();
        }}
        onOk={() => {
          handleBrowseGroundAndAssignment();
          resetEditingGround();
        }}
      >
        <Row>
          <Table
            columns={columns}
            dataSource={data}
            rowSelection={{ ...rowSelection, type: "radio" }}
            scroll={{ x: 900, y: 400 }}
          />
        </Row>
      </Modal>
    </div>
  );
}

export default BrowseScreen;
