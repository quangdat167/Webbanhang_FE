import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { useEffect, useState } from 'react';
import RouteConfig from 'routes/Route';
const drawerWidth = 240;

const listItem = [
    // {
    //     icon: <HomeIcon />,
    //     text: "Home",
    //     route: RouteConfig.HOME,
    // },
    {
        icon: <HomeIcon />,
        text: 'Trang chủ',
        route: RouteConfig.ADMIN_HOME,
    },
    {
        icon: <ManageAccountsIcon />,
        text: 'Quản lý người dùng',
        route: RouteConfig.ADMIN_MANAGE_USER,
    },
    {
        icon: <ShoppingCartCheckoutIcon />,
        text: 'Quản lý đơn hàng',
        route: RouteConfig.ADMIN_MANAGE_ORDER,
    },
    {
        icon: <ControlPointIcon />,
        text: 'Thêm điện thoại mới',
        route: RouteConfig.ADMIN_ADD_PHONE,
    },
    {
        icon: <AutoAwesomeMotionIcon />,
        text: 'Sản phẩm mua kèm',
        route: RouteConfig.ADMIN_MANAGE_FREQUENT_PRODUCT,
    },
];

function DrawerLeft() {
    const [path, setPath] = useState('');
    const changeScreen = (item: any) => {
        window.location.href = item.route;
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPath(window.location.pathname);
        }
    }, []);
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    zIndex: 120,
                    top: 64,
                },
                '& .MuiToolbar-root': {
                    height: 0,
                    minHeight: 0,
                },
                // "& .Mui-selected": {
                //     backgroundColor: "#2f6dbf",
                // },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <List>
                {listItem.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            onClick={(e) => changeScreen(item)}
                            selected={path === item.route}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Drawer>
    );
}

export default DrawerLeft;
