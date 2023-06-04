import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';

function ButtonAddToCart() {
    return (
        <Button
            variant="outline-danger"
            className=" w-100 h-100 d-flex flex-column align-items-center "
        >
            <FontAwesomeIcon className="mt-1 fs-5" icon={faCartPlus} />

            <p className="mt-1 fs-12 mb-0"> Thêm vào giỏ</p>
        </Button>
    );
}

export default ButtonAddToCart;
