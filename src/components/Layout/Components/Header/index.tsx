/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from './Header.module.scss';
import classnames from 'classnames/bind';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import MenuUser from 'components/MenuUser';
import Cart from 'components/ButtonCart/cart';
import ButtonAuth from 'components/ButtonAuth/buttonAuth'
const cx = classnames.bind(styles);

function Header() {
    const isLogin = false;
    return (
        <div>
            <nav className="navbar navbar-expand" style={{ backgroundColor: 'var(--primary)' }}>
                <div className={cx('container-1200', 'container flex-nowrap')}>
                    <Link className="navbar-brand text-light" to="/">
                        Quang Đạt
                    </Link>

                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-1"
                            type="search"
                            placeholder="Tìm kiếm điện thoại"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-light d-none d-sm-block" type="submit">
                            <FontAwesomeIcon className="fs-5" icon={faMagnifyingGlass} />
                        </button>
                    </form>

                    <div className="" id="">
                        <ul className="navbar-nav ms-auto align-items-center">
                            <li>
                                <Cart />
                            </li>
                            <li>{isLogin ? <MenuUser /> : <ButtonAuth />}</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
