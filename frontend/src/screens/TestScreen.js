import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, Input, Row, message } from "antd";
const { Option } = Select;

function TestScreen() {
  const [citys, setCitys] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");

  function GetCitys() {
    axios.get("https://provinces.open-api.vn/api/").then((res) => {
      setCitys(res.data);
    }).catch(error=>{
      message.error({
        content:error,
        duration:2,
      })
    })
  }

  function GetDistricts(code) {
    axios
      .get(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
      .then((res) => {
        setDistricts(res.data.districts);
        setCity(res.data.name);
      }).catch(error=>{
        message.error({
          content:error,
          duration:2,
        })
      })
  }

  function GetWards(code) {
    axios
      .get(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
      .then((res) => {
        setWards(res.data.wards);
        setDistrict(res.data.name);
      }).catch(error=>{
        message.error({
          content:error,
          duration:2,
        })
      })
  }

  useEffect(() => {
    GetCitys();
  }, []);

  return (
    <div>
      <Row>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Chọn tỉnh"
          filterOption={(input, option) =>
            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.label
              .toLowerCase()
              .localeCompare(optionB.label.toLowerCase())
          }
          options={
            citys &&
            citys.map((value) => {
              return { key: value.name, label: value.name, value: value.code };
            })
          }
          onChange={(value) => {
            GetDistricts(value);
          }}
        />
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Chọn quận/huyện"
          filterOption={(input, option) =>
            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.label
              .toLowerCase()
              .localeCompare(optionB.label.toLowerCase())
          }
          options={
            districts &&
            districts.map((value) => {
              return { key: value.name, label: value.name, value: value.code };
            })
          }
          onChange={(value) => GetWards(value)}
        />

        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Chọn xã"
          filterOption={(input, option) =>
            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.label
              .toLowerCase()
              .localeCompare(optionB.label.toLowerCase())
          }
          options={
            wards &&
            wards.map((value) => {
              return { key: value.name, label: value.name, value: value.name };
            })
          }
          onChange={(value) => setWard(value)}
        />
        <Input placeholder="Nhập địa chỉ nhà" value={address} onChange={value=>setAddress(value.target.value)}/>
          <Input size="large"
          width={1000}
          placeholder="Địa chỉ nhà nhận được" value={`${address?address+' ,':''}${ward?ward+' ,':''}${district?district+' ,':''}${city}`}/>
      </Row>
    </div>
  );
}

export default TestScreen;
