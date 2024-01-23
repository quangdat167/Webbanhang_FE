/* eslint-disable jsx-a11y/anchor-is-valid */
import classnames from 'classnames/bind';
import styles from './Header.module.scss';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import ButtonAuth from 'components/ButtonAuth/buttonAuth';
import Cart from 'components/ButtonCart/cart';
import MenuUser from 'components/MenuUser';
import MenuSearchResult from 'components/menu-search-result';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'redux/store';
import './styles.scss';
import InputSearchPhone from 'components/input-search-phone';
import Config from 'utils/Config';
import RouteConfig from 'routes/Route';

const cx = classnames.bind(styles);
function Header() {
    const userInfo = useSelector((state: RootState) => state.userInfoState);
    return (
        <div className="header-wrapper">
            <nav className="navbar navbar-expand" style={{ backgroundColor: 'var(--primary)' }}>
                <div className={cx('container-1200', 'container flex-nowrap')}>
                    <Link
                        className="navbar-brand text-light"
                        to={
                            userInfo.role === Config.USER_ROLE_ADMIN
                                ? RouteConfig.ADMIN_HOME
                                : RouteConfig.HOME
                        }
                    >
                        Quang Đạt
                    </Link>

                    <InputSearchPhone />

                    <div className="" id="">
                        <ul className="navbar-nav ms-auto align-items-center">
                            {userInfo.role !== Config.USER_ROLE_ADMIN ? (
                                <li>
                                    <Cart />
                                </li>
                            ) : (
                                <></>
                            )}
                            <li>{userInfo?.email ? <MenuUser /> : <ButtonAuth />}</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
