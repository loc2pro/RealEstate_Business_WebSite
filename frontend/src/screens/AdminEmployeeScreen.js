import { Button, Modal, notification, Row, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignment, listProducts } from "../actions/productActions";
import { listSellers } from "../actions/userActions";
import AssignmentAdmin from "../components/AssignmentAdmin";
import SellerAdmin from "../components/SellerAdmin";
import { useReactToPrint } from "react-to-print";
import EmployeeAdmin from "../components/EmployeeAdmin";
import dayjs from "dayjs";

function AdminEmployeeScreen() {
  const dispatch = useDispatch();
  const listSeller = useSelector((state) => state.listSeller);
  const { loading: loadingSeller, error: errorSeller, sellers } = listSeller;
  const updateSeller = useSelector((state) => state.updateSeller);
  const { seller } = updateSeller;
  const [salary, setSalary] = useState();
  const [isSalary, setIsSalary] = useState(false);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    dispatch(listSellers());
  }, [dispatch, salary]);
  //productId
  const callbackSalary = (chilData) => {
    setSalary(chilData);
  };
  const onSalary = () => {
    setIsSalary(true);
  };
  const resetSalary = () => {
    setIsSalary(false);
  };

  const columns = [
    {
      title: "Tên Nhân Viên",
      dataIndex: "name",
      with: 300,
    },
    {
      title: "Lương cơ bản",
      dataIndex: ["seller", "salary"],
      with: 300,
    },
    {
      title: "Thưởng hoa hồng",
      dataIndex: ["seller", "bonus"],
      with: 300,
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
        Danh sách nhân viên
      </h3>

      <div className="btn-wrapper animated ">
        <button
          onClick={onSalary}
          className="theme-btn-1 btn btn-effect-1 go-top"
          style={{ float: "right", margin: "0 0 5px" }}
        >
          In bảng lương
        </button>
      </div>
      <EmployeeAdmin
        sellers={sellers}
        loading={loadingSeller}
        error={errorSeller}
        parentCallback={callbackSalary}
      />
      <Modal
        title="Lương nhân viên"
        visible={isSalary}
        width={1000}
        okText="In"
        onCancel={() => {
          resetSalary();
        }}
        onOk={() => {
          handlePrint();
          resetSalary();
        }}
      >
        <div ref={componentRef}>
          <Row>
            <h3 style={{ marginLeft: "250px" }}>Bảng Thanh Toán Lương</h3>
          </Row>
          <Row>
            <h5 style={{ marginLeft: "320px" }}>
              {dayjs(Date()).format("DD-MM-YYYY")}
            </h5>
          </Row>
          <Row>
            <Table
              columns={columns}
              dataSource={sellers}
              scroll={{ x: 900, y: 1000 }}
            />
          </Row>
        </div>
      </Modal>
    </div>
  );
}

export default AdminEmployeeScreen;
