/* eslint-disable jsx-a11y/anchor-is-valid */

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HeadsetIcon from '@mui/icons-material/Headset';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ButtonAuth from 'components/ButtonAuth/buttonAuth';
import Cart from 'components/ButtonCart/cart';
import MenuUser from 'components/MenuUser';
import InputSearchPhone from 'components/input-search-phone';
import MenuAccessories from 'components/menu-accessories';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'redux/store';
import RouteConfig from 'routes/Route';
import Config from 'utils/Config';
import Logo from '../../../images/logo_1.png';
import './styles.scss';

function Header() {
    const userInfo = useSelector((state: RootState) => state.userInfoState);
    const [showMenuAccessories, setShowMenuAccessories] = useState(false);
    return (
        <div className="header-wrapper">
            <nav
                className="navbar navbar-expand"
                style={{ backgroundColor: 'var(--primary)', padding: 8, height: 64 }}
            >
                <div className={'center justify-content-between w-100 flex-nowrap'}>
                    <div className="d-flex gap-2">
                        <Link
                            className="navbar-brand text-light"
                            to={
                                userInfo.role === Config.USER_ROLE_ADMIN
                                    ? RouteConfig.ADMIN_HOME
                                    : RouteConfig.HOME
                            }
                        >
                            <img src={Logo} alt="logo" style={{ height: '60px' }} />
                        </Link>
                        <div className="center text-light gap-2">
                            <a href={RouteConfig.PHONES} className="item-link-phone">
                                <PhoneIphoneIcon fontSize="small" />
                                <div>Điện thoại</div>
                            </a>
                            <div
                                className="item-link-phone"
                                onMouseEnter={() => {
                                    setShowMenuAccessories(true);
                                }}
                                onMouseLeave={() => {
                                    setShowMenuAccessories(false);
                                }}
                            >
                                <HeadsetIcon fontSize="small" />
                                <div>Phụ kiện</div>
                                <ArrowDropDownIcon fontSize="small" />

                                <MenuAccessories
                                    show={showMenuAccessories}
                                    setShow={setShowMenuAccessories}
                                />
                            </div>
                        </div>
                    </div>

                    <InputSearchPhone />

                    <div className="" id="">
                        <ul className="navbar-nav ms-auto align-items-center">
                            {userInfo.role !== Config.USER_ROLE_ADMIN ? (
                                <li className="me-2">
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
