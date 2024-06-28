import { Link } from 'react-router-dom';
import styles from './MenuUser.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { auth } from 'firebaseConfig/firebase';
import { signOutReducer } from 'redux/reducer/userinfo';
import RouteConfig from 'routes/Route';

const cx = classNames.bind(styles);

function MenuUser() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfoState);
    const handleSignOut = () => {
        auth.signOut().then(
            function () {
                dispatch(signOutReducer({}));
                window.location.pathname = RouteConfig.SIGN_IN;
                // window.location.href = RouteConfig.SIGN_IN;
            },
            function (error) {
                console.error('Sign Out Error', error);
            },
        );
    };
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
                        className={cx('user-avatar')}
                    />
                    {userInfo.firstName + ' ' + userInfo.lastName}
                </Link>
                <ul className="dropdown-menu dropdown-menu-end" data-bs-theme="light">
                    {/* <li>
                        <Link className="dropdown-item" to="">
                            Cập nhật thông tin
                        </Link>
                    </li> */}
                    {/* <li>
                        <hr className="dropdown-divider" />
                    </li> */}
                    <li>
                        <Link className="dropdown-item" to={RouteConfig.ORDER}>
                            Lịch sử mua hàng
                        </Link>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <div className="dropdown-item" onClick={handleSignOut}>
                            Đăng xuất
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default MenuUser;
