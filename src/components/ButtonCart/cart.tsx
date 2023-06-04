import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function Cart() {
    return (
        <Link className="header-btn" to="/cart">
            <FontAwesomeIcon className="me-1 fs-5" icon={faCartShopping} />
            Giỏ hàng
        </Link>
    );
}

export default Cart;
