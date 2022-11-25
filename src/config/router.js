const PathRouter = {
    Home: "/",
    Login: "/dang-nhap",

    News: "/tin-tuc",
    AddNews: "/tin-tuc/them-tin-tuc",

    Menu: "/thuc-don",
    MenuParams: "/thuc-don/:pages?",
    AddMenu: "/thuc-don/them-thuc-don",
    EditMenuNoParams: "/thuc-don/chinh-sua-thuc-don/",
    EditMenu: "/thuc-don/chinh-sua-thuc-don/:id",

    Table: "/dat-ban",
    TableBook: "/dat-ban/ban-cho-duyet",
    TableHandel: "/dat-ban/ban-cho-duyet/:id",

    TableStatus: "/dat-ban/trang-thai-ban",

    People: "/nhan-vien"

}


export {PathRouter}