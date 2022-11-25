import config from "~/config";

const DataSlider = [
  {
    name: "Tổng quan",
    icon: "icon-home",
    path: config.path.Home,
  },

  {
    name: "Tin tức",
    icon: "icon-file-text",
    path: config.path.News,
  },

  {
    name: "Thực đơn",
    icon: "icon-clipboard",
    path: config.path.Menu
  },

  {
    name: "Đặt bàn",
    icon: "icon-layout",
    path: config.path.Table,
    children: [
      {
        path: config.path.TableBook,
        name: "Bàn chờ duyệt"
      },
      {
        path: config.path.TableStatus,
        name: "Trạng thái bàn"
      }
    ]
  },

  {
    name: "Nhân viên",
    icon: "icon-users",
    path: config.path.People,
  }
];

export default DataSlider;
