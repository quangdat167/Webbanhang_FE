import { Link } from 'react-router-dom';
import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Cart() {
    return (
        <Link className={cx('wrapper')} to="/cart">
            <FontAwesomeIcon className="me-1 fs-5" icon={faCartShopping} />
            Giỏ hàng
        </Link>
    );
}

export default Cart;
