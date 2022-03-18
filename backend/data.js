import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "Loc",
      email: "admin1@gmail.com",
      phone: "0981074090",
      address: "4, Dương Quảng Hàm, Phường 5, Gò Vấp",
      password: bcrypt.hashSync("loc123", 8),
      isAdmin: true,
      isSeller: true,
    },
    {
      name: "Phuoc",
      email: "user@gmail.com",
      phone: "0981074090",
      address: "4, Dương Quảng Hàm, Phường 5, Gò Vấp",
      password: bcrypt.hashSync("loc123", 8),
      isAdmin: false,
      isSeller: false,
    },
  ],
  products: [
    {
      name: "CĂN HỘ THE EVERRICH INFINITYYYY",
      user: "6200933a189dbf4d5f3020b7",
      status: "Bán",
      type: "Căn Hộ",
      image: "/images/img-1.jpg",
      address: "12, Nguyễn Văn Bảo, Phường 8, Quận Gò Vấp",
      price: 12000000,
      acreage: 3000,
      bedroom: 3,
      toilet: 2,
      countInStock: 10,
      lat: 10.8230989,
      lng: 106.6296638,
      description:
        " Chủ Đầu Tư uy tín: Công ty Cổ Phần Phát Triển BĐS Phát Đạt",
    },
    {
      name: "CĂN HỘ VINHOME",
      user: "6200933a189dbf4d5f3020b7",
      status: "Cho Thuê",
      type: "Căn Hộ",
      image: "/images/img-2.jpg",
      address: "12, Nguyễn Văn Bảo, Phường 8, Quận Gò Vấp",
      price: 4000000,
      acreage: 2000,
      bedroom: 4,
      toilet: 2,
      countInStock:1,
      lat: 10.8230989,
      lng: 106.6296638,
      description:
        " Chủ Đầu Tư uy tín: Công ty Cổ Phần Phát Triển BĐS Phát Lộc",
    },
    {
      name: "NHÀ PHỐ",
      user: "6200933a189dbf4d5f3020b7",
      status: "Bán",
      type: "Căn Hộ",
      image: "/images/img-3.jpg",
      address: "12, Nguyễn Văn Bảo, Phường 8, Quận Gò Vấp",
      price: 192000000,
      acreage: 2000,
      bedroom: 2,
      toilet: 2,
      countInStock: 1,
      lat: 10.8230989,
      lng: 106.6296638,
      description:
        " Chủ Đầu Tư uy tín: Công ty Cổ Phần Phát Triển BĐS Phát Lộc",
    },
    {
      name: "NHÀ HẺM",
      user: "6200933a189dbf4d5f3020b7",
      status: "Bán",
      type: "Căn Hộ",
      image: "/images/img-4.jpg",
      address: "12, Nguyễn Văn Bảo, Phường 8, Quận Gò Vấp",
      price: 192000000,
      acreage: 2000,
      bedroom: 2,
      toilet: 2,
      countInStock: 1,
      lat: 10.8230989,
      lng: 106.6296638,
      description:
        " Chủ Đầu Tư uy tín: Công ty Cổ Phần Phát Triển BĐS Phát Lộc",
    },
    {
      name: "NHÀ VINHOME",
      user: "6200933a189dbf4d5f3020b7",
      status: "Bán",
      type: "Căn Hộ",
      image: "/images/img-5.jpg",
      address: "12, Nguyễn Văn Bảo, Phường 8, Quận Gò Vấp",
      price: 192000000,
      acreage: 2000,
      bedroom: 2,
      toilet: 2,
      countInStock: 1,
      lat: 10.8230989,
      lng: 106.6296638,
      description:
        " Chủ Đầu Tư uy tín: Công ty Cổ Phần Phát Triển BĐS Phát Lộc",
    },
  ],
};
export default data;
