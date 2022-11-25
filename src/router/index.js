import config from "~/config"
import Home from "~/pages/Home"
import Login from "~/pages/Login"
import { ListNews, AddNews } from "~/pages/News";
import { ListMenu, AddMenu, EditMenu} from "~/pages/Menu";
import {BookTable, TableHandelBook} from "~/pages/Table/BookTable";
import {TableStatus} from "~/pages/Table/TableStatus";
import {ListPeople} from "~/pages/People";

const privateRouter = [
    {path: config.path.Home, component: Home},
    {path: config.path.Login, component: Login, layout: null},
    {path: config.path.News, component: ListNews},
    {path: config.path.AddNews, component: AddNews},
    {path: config.path.Menu, component: ListMenu},
    {path: config.path.AddMenu, component: AddMenu},
    {path: config.path.EditMenu, component: EditMenu},
    {path: config.path.TableBook, component: BookTable},
    {path: config.path.TableHandel, component: TableHandelBook},
    {path: config.path.TableStatus, component: TableStatus},
    {path: config.path.People, component: ListPeople},

]

export {privateRouter}