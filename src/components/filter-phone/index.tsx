/* eslint-disable react-hooks/exhaustive-deps */
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TuneIcon from '@mui/icons-material/Tune';
import Slider from '@mui/material/Slider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { memo, useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
    addItemFilter,
    rangePriceFilter,
    removeAllItemFilter,
    removeItemFilter,
} from 'redux/reducer/filter';
import { updateProductsHome } from 'redux/reducer/home';
import { RootState } from 'redux/store';
import { filterPhoneApi } from 'service/product.service';
import { convertStringsToMinMax, formatNumberWithCommas } from 'utils';
import Config from 'utils/Config';
import LayoutFilter from './layout-filter';
import './style.scss';
const minDistance = 0;

const isFilterActive = (filter: any, value: any) => {
    return filter.includes(value);
};

function FilterPhone() {
    const isTablet = useMediaQuery('(max-width: 1024px)');
    const dispatch = useDispatch();
    const filterState = useSelector((state: RootState) => state.filterState);
    const sortbyState = useSelector((state: RootState) => state.homeState?.sortby);
    const priceState = filterState?.price;
    const brandState = filterState?.brand;
    const typeState = filterState?.type;
    const ramState = filterState?.ram;
    const romState = filterState?.rom;
    const chargingFeatureState = filterState?.charging_feature;

    const [showFilterTotal, setShowFilterTotal] = useState(false);
    const [showRangePrice, setShowRangePrice] = useState(false);
    const [value1, setValue1] = useState<number[]>([20, 100]);
    const [firstLoad, setFirstLoad] = useState(true);
    const [totalResult, setTotalResult] = useState(0);

    const [showFilterBrand, setShowFilterBrand] = useState(false);
    const [showFilterPrice, setShowFilterPrice] = useState(false);
    const [showFilterType, setShowFilterType] = useState(false);
    const [showFilterRam, setShowFilterRam] = useState(false);
    const [showFilterRom, setShowFilterRom] = useState(false);
    const [showFilterCharge, setShowFilterCharge] = useState(false);

    const handleChange1 = (event: Event, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    };

    const handleClickItem = (event: any) => {
        const data = event.currentTarget.getAttribute('data-ft');
        const title = event.currentTarget.getAttribute('data-title');

        if (title === 'price' && showRangePrice) {
            setShowRangePrice(false);
            dispatch(removeAllItemFilter({ price: true }));
        }

        if ((filterState as any)[title]?.includes(data)) {
            dispatch(removeItemFilter({ [title]: data }));
        } else {
            dispatch(addItemFilter({ [title]: data }));
        }
    };

    useEffect(() => {
        if (showFilterTotal && !firstLoad) {
            setFirstLoad(true);
        }
    }, [showFilterTotal]);

    useEffect(() => {
        if (showRangePrice) {
            if (filterState.price?.length > 0) {
                dispatch(removeAllItemFilter({ price: true }));
            }
        }
    }, [showRangePrice]);

    const handleChangeCommitted = () => {
        const newValue = [value1[0] * 0.01 * 50, value1[1] * 0.01 * 50];
        dispatch(rangePriceFilter({ price: [JSON.stringify(newValue)] }));
    };

    useEffect(() => {
        const { brand, price, type, ram, rom, charging_feature } = filterState;

        const filter = {
            brand,
            price: convertStringsToMinMax(price),
            type,
            ram,
            rom,
            charging_feature,
            sortby: sortbyState,
            limit: Config.LIMIT_ITEM_PER_PAGE,
            skip: 0,
        };

        const fetchPhone = async () => {
            const result = await filterPhoneApi({ ...filter });
            if (result) {
                dispatch(
                    updateProductsHome({
                        products: result.phones,
                        totalRemaining: result.totalRemaining,
                    }),
                );
                setTotalResult(result.totalPhone);
            }
        };
        fetchPhone();
    }, [filterState, sortbyState]);

    const contentBrandFilter = (
        <>
            <div
                className={
                    'item-selection ' + (isFilterActive(brandState, 'samsung') ? 'active' : '')
                }
                onClick={handleClickItem}
                data-ft={'samsung'}
                data-title="brand"
            >
                <img
                    src="//cdn.tgdd.vn/Brand/1/samsungnew-220x48-1.png"
                    alt="samsung"
                    style={{ height: '1.5rem' }}
                />
            </div>
            <div
                className={
                    'item-selection ' + (isFilterActive(brandState, 'apple') ? 'active' : '')
                }
                onClick={handleClickItem}
                data-ft={'apple'}
                data-title="brand"
            >
                <img
                    src="//cdn.tgdd.vn/Brand/1/logo-iphone-220x48.png"
                    alt="iphone"
                    style={{ height: '1.5rem' }}
                />
            </div>
            <div
                className={
                    'item-selection ' + (isFilterActive(brandState, 'xiaomi') ? 'active' : '')
                }
                onClick={handleClickItem}
                data-ft={'xiaomi'}
                data-title="brand"
            >
                <img
                    src="//cdn.tgdd.vn/Brand/1/logo-xiaomi-220x48-5.png"
                    alt="xiaomi"
                    style={{ height: '1.5rem' }}
                />
            </div>
        </>
    );

    const ContentFilterPrice = (
        <>
            {[
                {
                    dataFt: '[0, 4]',
                    title: 'Dưới 4 triệu',
                },
                {
                    dataFt: '[4, 7]',
                    title: ' Từ 4 - 7 triệu',
                },
                {
                    dataFt: '[7, 13]',
                    title: 'Từ 7 - 13 triệu',
                },
                {
                    dataFt: '[13, 20]',
                    title: ' Từ 13 - 20 triệu',
                },
                {
                    dataFt: '[20, 100]',
                    title: ' Trên 20 triệu',
                },
            ].map((item, i) => (
                <div
                    key={i}
                    className={
                        'item-selection ' +
                        (isFilterActive(priceState, item.dataFt) ? 'active' : '')
                    }
                    onClick={handleClickItem}
                    data-ft={item.dataFt}
                    data-title="price"
                >
                    {item.title}
                </div>
            ))}
        </>
    );

    const OtherOptionPrice = (
        <>
            <div
                className="other-options-price"
                onClick={() => {
                    setFirstLoad(false);
                    setShowRangePrice(!showRangePrice);
                }}
            >
                <TuneIcon />
                <div>Hoặc chọn mức giá phù hợp với bạn</div>
                <div
                    className={
                        'arrow-icon ' + (firstLoad ? '' : showRangePrice ? 'rotate' : 'close')
                    }
                >
                    <ArrowDropDownIcon />
                </div>
            </div>
            <div
                className={
                    'value-price-wrapper ' +
                    (firstLoad && !showRangePrice ? '' : showRangePrice ? 'show' : 'hide')
                }
            >
                <div className="value-price">
                    <div className="value-min">
                        {formatNumberWithCommas(value1[0] * 0.01 * 50 * 1000000)}
                    </div>
                    <div className="value-max">
                        {formatNumberWithCommas(value1[1] * 0.01 * 50 * 1000000)}
                    </div>
                </div>
                <Slider
                    value={value1}
                    onChange={handleChange1}
                    onChangeCommitted={handleChangeCommitted}
                    disableSwap
                    color="error"
                />
            </div>
        </>
    );

    const ContentFilterType = (
        <>
            {' '}
            <div
                className={
                    'item-selection center flex-column ' +
                    (isFilterActive(typeState, 'android') ? 'active' : '')
                }
                onClick={handleClickItem}
                data-ft={'android'}
                data-title="type"
            >
                <img src="https://cdn.tgdd.vn/ValueIcons/android.jpg" alt="android" height={40} />
                <div>Android</div>
            </div>
            <div
                className={
                    'item-selection center flex-column ' +
                    (isFilterActive(typeState, 'apple') ? 'active' : '')
                }
                onClick={handleClickItem}
                data-ft={'apple'}
                data-title="type"
            >
                <img src="https://cdn.tgdd.vn/ValueIcons/iphone.jpg" alt="iphone" height={40} />
                <div>IPhone</div>
            </div>
        </>
    );

    const ContentFilterRam = (
        <>
            {['2 GB', '3 GB', '4 GB', '6 GB', '8 GB', '12 GB'].map((item, i) => (
                <div
                    key={i}
                    className={'item-selection ' + (isFilterActive(ramState, item) ? 'active' : '')}
                    onClick={handleClickItem}
                    data-ft={item}
                    data-title="ram"
                >
                    {item}
                </div>
            ))}
        </>
    );

    const ContentFilterRom = (
        <>
            {['32 GB', '64 GB', '128 GB', '256 GB', '512 GB', '1 TB'].map((item, i) => (
                <div
                    key={i}
                    className={'item-selection ' + (isFilterActive(romState, item) ? 'active' : '')}
                    onClick={handleClickItem}
                    data-ft={item}
                    data-title="rom"
                >
                    {item}
                </div>
            ))}
        </>
    );

    const ContentFilterCharging = (
        <>
            {' '}
            {[
                {
                    dataFt: '20 W',
                    title: 'Sạc nhanh (từ 20W)',
                },
                {
                    dataFt: '60 W',
                    title: 'Sạc siêu nhanh (từ 60W)',
                },
                {
                    dataFt: 'Sạc không dây',
                    title: 'Sạc không dây',
                },
            ].map((item, i) => (
                <div
                    key={i}
                    className={
                        'item-selection ' +
                        (isFilterActive(chargingFeatureState, item.dataFt) ? 'active' : '')
                    }
                    onClick={handleClickItem}
                    data-ft={item.dataFt}
                    data-title="charging_feature"
                >
                    {item.title}
                </div>
            ))}
        </>
    );

    return (
        <>
            <div className="fw-semibold fs-5">Chọn theo tiêu chí</div>
            <div className="box-filter">
                <div className={'filter-total '} style={showFilterTotal ? { zIndex: 3 } : {}}>
                    <div
                        className={'filter-item ' + (showFilterTotal ? 'active' : '')}
                        onClick={() => {
                            setShowFilterTotal(true);
                        }}
                    >
                        <FilterAltIcon color="action" />
                        <div>Bộ lọc</div>
                        <div className="filter-arrow"></div>
                    </div>
                    <div className={'filter-show ' + (showFilterTotal ? 'show-total' : '')}>
                        {/* Hãng */}
                        <div className="p-3 pb-0">
                            <div className="title">Hãng</div>
                            <div className="filter-list">{contentBrandFilter}</div>
                        </div>

                        {!isTablet && <div className="filter-border"></div>}

                        {/* Price */}
                        <div className={'p-3 ' + (isTablet ? 'py-0' : 'd-flex')}>
                            <div style={isTablet ? {} : { width: '60%' }}>
                                <div className="title">Giá</div>
                                <div className="filter-list"> {ContentFilterPrice}</div>
                                {OtherOptionPrice}
                            </div>
                            <div style={isTablet ? { marginTop: '0.75rem' } : { width: '40%' }}>
                                <div className="title">Loại điện thoại</div>
                                <div className="filter-list">{ContentFilterType}</div>
                            </div>
                        </div>

                        {!isTablet && <div className="filter-border"></div>}

                        {/* Ram */}
                        <div className={'p-3 ' + (isTablet ? 'py-0' : 'd-flex')}>
                            <div style={isTablet ? {} : { width: '35%' }}>
                                <div className="title">Ram</div>
                                <div className="filter-list">{ContentFilterRam}</div>
                            </div>
                            {/* Dung lượng lưu trữ */}
                            <div style={isTablet ? {} : { width: '35%' }}>
                                <div className="title">Dung lượng lưu trữ</div>
                                <div className="filter-list">{ContentFilterRom}</div>
                            </div>

                            <div style={isTablet ? {} : { width: '35%' }}>
                                <div className="title">Tính năng sạc</div>
                                <div className="filter-list">{ContentFilterCharging}</div>
                            </div>
                        </div>
                        <div
                            className="filter-close"
                            onClick={() => {
                                setShowFilterTotal(false);
                            }}
                        >
                            <CloseIcon />
                        </div>
                        <div className="filter-button m-0">
                            <Button
                                variant="outline-danger"
                                onClick={() => {
                                    dispatch(removeAllItemFilter({ all: true }));
                                    setShowFilterTotal(false);
                                }}
                            >
                                Bỏ chọn
                            </Button>
                            <Button
                                onClick={() => {
                                    setShowFilterTotal(false);
                                }}
                            >
                                Xem {totalResult} kết quả
                            </Button>
                        </div>
                    </div>
                </div>

                <LayoutFilter
                    show={showFilterBrand}
                    setShow={setShowFilterBrand}
                    title={'Hãng'}
                    content={contentBrandFilter}
                    hightlight={!!brandState.length}
                    totalResult={totalResult}
                    actionClearAll={() => {
                        dispatch(removeAllItemFilter({ brand: true }));
                    }}
                />
                <LayoutFilter
                    show={showFilterPrice}
                    setShow={setShowFilterPrice}
                    title={'Giá'}
                    content={ContentFilterPrice}
                    otherOption={OtherOptionPrice}
                    hightlight={!!priceState.length}
                    totalResult={totalResult}
                    actionClearAll={() => {
                        dispatch(removeAllItemFilter({ price: true }));
                    }}
                />
                <LayoutFilter
                    show={showFilterType}
                    setShow={setShowFilterType}
                    title={'Loại điện thoại'}
                    content={ContentFilterType}
                    hightlight={!!typeState.length}
                    totalResult={totalResult}
                    actionClearAll={() => {
                        dispatch(removeAllItemFilter({ type: true }));
                    }}
                />
                <LayoutFilter
                    show={showFilterRam}
                    setShow={setShowFilterRam}
                    title={'Ram'}
                    content={ContentFilterRam}
                    hightlight={!!ramState.length}
                    totalResult={totalResult}
                    actionClearAll={() => {
                        dispatch(removeAllItemFilter({ ram: true }));
                    }}
                />
                <LayoutFilter
                    show={showFilterRom}
                    setShow={setShowFilterRom}
                    title={'Dung lượng lưu trữ'}
                    content={ContentFilterRom}
                    right={true}
                    hightlight={!!romState.length}
                    totalResult={totalResult}
                    actionClearAll={() => {
                        dispatch(removeAllItemFilter({ rom: true }));
                    }}
                />
                <LayoutFilter
                    show={showFilterCharge}
                    setShow={setShowFilterCharge}
                    title={'Tính năng sạc'}
                    content={ContentFilterCharging}
                    right={true}
                    hightlight={!!chargingFeatureState.length}
                    totalResult={totalResult}
                    actionClearAll={() => {
                        dispatch(removeAllItemFilter({ charging_feature: true }));
                    }}
                />
            </div>
            {showFilterTotal && (
                <div
                    className="filter-overlay-total"
                    onClick={() => {
                        setShowFilterTotal(false);
                    }}
                ></div>
            )}
        </>
    );
}

export default memo(FilterPhone);
