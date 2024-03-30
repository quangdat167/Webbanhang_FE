import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from 'react-bootstrap/esm/Button';

function LayoutFilter({
    show,
    setShow,
    content,
    title,
    otherOption,
    right,
    hightlight,
    totalResult,
    actionClearAll,
}: {
    show: boolean;
    setShow: Function;
    content: any;
    title: string;
    otherOption?: any;
    right?: boolean;
    hightlight?: boolean;
    totalResult?: number;
    actionClearAll?: Function;
}) {
    return (
        <>
            <div className="filter-wrapper">
                <div
                    className={
                        'filter-item ' + (show ? 'active' : '') + (hightlight ? ' hightlight' : '')
                    }
                    onClick={() => {
                        setShow(true);
                    }}
                >
                    <div>{title}</div>
                    <ArrowDropDownIcon />
                    <div className="filter-arrow"></div>
                </div>

                <div
                    className={
                        'filter-show ' + (show ? 'show-total' : '') + (right ? ' right' : '')
                    }
                >
                    <div className="filter-list">{content}</div>
                    {otherOption}
                    <div className="filter-button">
                        <Button
                            variant="outline-danger"
                            onClick={() => {
                                actionClearAll && actionClearAll();
                                setShow(false);
                            }}
                        >
                            Bỏ chọn
                        </Button>
                        <Button
                            onClick={() => {
                                setShow(false);
                            }}
                        >
                            Xem {totalResult} kết quả
                        </Button>
                    </div>
                </div>
                {show && (
                    <div
                        className="filter-overlay"
                        onClick={() => {
                            setShow(false);
                        }}
                    ></div>
                )}
            </div>
        </>
    );
}

export default LayoutFilter;
