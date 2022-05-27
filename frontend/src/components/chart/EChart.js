import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";

function EChart() {
  const { Title, Paragraph } = Typography;

  const items = [
    {
      Title: "3,6K",
      user: "Người Dùng",
    },
    {
      Title: "2m",
      user: "Số lượt xem",
    },
    {
      Title: "$772",
      user: "Danh Thu",
    },
    {
      Title: "82",
      user: "Sản phẩm",
    },
  ];

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Người dùng hoạt động</Title>
        <Paragraph className="lastweek">
          hơn tuần trước <span className="bnb2">+30%</span>
        </Paragraph>
        <Paragraph className="lastweek">Thống kê tổng quan</Paragraph>
        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default EChart;
