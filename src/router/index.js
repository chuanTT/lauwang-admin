import config from "~/config"
import Home from "~/pages/Home"
import Login from "~/pages/Login"
import { ListNews, AddNews } from "~/pages/News";
import { ListMenu, AddMenu} from "~/pages/Menu";
import { BookTable } from "~/pages/Table";

const privateRouter = [
    {path: config.path.Home, component: Home},
    {path: config.path.Login, component: Login, layout: null},
    {path: config.path.News, component: ListNews},
    {path: config.path.AddNews, component: AddNews},
    {path: config.path.Menu, component: ListMenu},
    {path: config.path.AddMenu, component: AddMenu},
    {path: config.path.Table, component: BookTable}

]

export {privateRouter}