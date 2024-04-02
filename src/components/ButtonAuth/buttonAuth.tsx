import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export default function ButtonAuth() {
    return (
        <Link to="/sign-in" className="header-btn hightlight">
            <FontAwesomeIcon
                className="me-1 fs-5"
                icon={faCircleUser}
                style={{ color: '#ffffff' }}
            />
            Đăng nhập
        </Link>
    );
}
