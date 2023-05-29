import { Link } from 'react-router-dom';
import styles from './MenuUser.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function menuUser() {
    return (
        <>
            <div className="nav-item dropdown">
                <Link
                    className="nav-link dropdown-toggle text-light d-flex align-items-center"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <img
                        src="https://storage.googleapis.com/hust-files/5807675312963584/images/hust-logo-official_.3m.jpeg"
                        alt="avatar"
                        className={cx('user-avatar', 'me-1')}
                    />
                    User
                </Link>
                <ul className="dropdown-menu dropdown-menu-end" data-bs-theme="light">
                    <li>
                        <Link className="dropdown-item" to="/phones/create">
                            Thêm điện thoại mới
                        </Link>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <Link className="dropdown-item" to="/phones/list">
                            Tất cả điện thoại
                        </Link>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <Link className="dropdown-item" to="#">
                            Đăng xuất
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default menuUser;
