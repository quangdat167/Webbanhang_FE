import Button from 'react-bootstrap/Button';

function ButtonBuy() {
    return (
        <>
            <Button
                variant="danger"
                as="input"
                type="submit"
                value="Mua ngay"
                className="h-100 w-100 fw-semibold fs-4"
            />
        </>
    );
}

export default ButtonBuy;
