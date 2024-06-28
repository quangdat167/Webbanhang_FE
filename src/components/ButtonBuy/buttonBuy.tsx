import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import RouteConfig from 'routes/Route';

function ButtonBuy({ clickFunc }: { clickFunc: Function }) {
    return (
        // <Link to={RouteConfig.CONFIRM_INFO}>
        <Button
            variant="danger"
            as="input"
            value="Mua ngay"
            className="h-100 w-100 fw-semibold fs-4"
            onClick={() => clickFunc()}
        />
        // </Link>
    );
}

export default ButtonBuy;
