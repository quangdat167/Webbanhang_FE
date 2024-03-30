import {
    faArrowDownShortWide,
    faArrowDownWideShort,
    faEye,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { updateSortByHome } from 'redux/reducer/home';
import { RootState } from 'redux/store';
import Config from 'utils/Config';
import './style.scss';

function SortBy() {
    const dispatch = useDispatch();
    const sortbyState = useSelector((state: RootState) => state.homeState?.sortby);

    const updateSortBy = (sortby: string) => {
        dispatch(updateSortByHome(sortby));
    };

    return (
        <>
            <div className="pb-3 sortby-wrapper">
                <div className="fw-semibold fs-5 pb-1">Sắp xếp theo</div>
                <div className="sortby-button">
                    <div
                        className={
                            'sortby-item ' +
                            (sortbyState === Config.SORT_BY.PRICE_DESC ? 'active' : '')
                        }
                        onClick={() => {
                            updateSortBy(Config.SORT_BY.PRICE_DESC);
                        }}
                    >
                        <FontAwesomeIcon icon={faArrowDownWideShort} />
                        <div>Giá Cao - Thấp</div>
                    </div>
                    <div
                        className={
                            'sortby-item ' +
                            (sortbyState === Config.SORT_BY.PRICE_ASC ? 'active' : '')
                        }
                        onClick={() => {
                            updateSortBy(Config.SORT_BY.PRICE_ASC);
                        }}
                    >
                        <FontAwesomeIcon icon={faArrowDownShortWide} />
                        <div>Giá Thấp - Cao</div>
                    </div>
                    <div
                        className={
                            'sortby-item ' +
                            (sortbyState === Config.SORT_BY.POPULAR ? 'active' : '')
                        }
                        onClick={() => {
                            updateSortBy(Config.SORT_BY.POPULAR);
                        }}
                    >
                        <FontAwesomeIcon icon={faEye} />
                        <div>Nổi bật</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SortBy;
