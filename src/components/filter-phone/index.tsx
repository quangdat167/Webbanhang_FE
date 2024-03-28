import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TuneIcon from '@mui/icons-material/Tune';
import Slider from '@mui/material/Slider';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addItemFilter,
    rangePriceFilter,
    removeAllItemFilter,
    removeItemFilter,
} from 'redux/reducer/filter';
import { updatePhoneHome } from 'redux/reducer/home';
import { RootState } from 'redux/store';
import { filterPhoneApi } from 'service/phone.service';
import { convertStringsToMinMax, formatNumberWithCommas } from 'utils';
import './style.scss';
const minDistance = 0;

function FilterPhone() {
    const dispatch = useDispatch();
    const filterState = useSelector((state: RootState) => state.filterState);
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

    const isFilterActive = (filter: any, value: any) => {
        return filter.includes(value);
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
        };

        const fetchPhone = async () => {
            const result = await filterPhoneApi({ ...filter });
            dispatch(updatePhoneHome(result.phones));
        };
        fetchPhone();
        return () => {};
    }, [filterState]);

    return (
        <div className="box-filter">
            <div className={'filter-total ' + (showFilterTotal ? 'active' : '')}>
                <div
                    className="filter-item"
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
                        <div className="filter-list">
                            <div
                                className={
                                    'item-selection ' +
                                    (isFilterActive(brandState, 'samsung') ? 'active' : '')
                                }
                                onClick={handleClickItem}
                                data-ft={'samsung'}
                                data-title="brand"
                            >
                                <img
                                    src="//cdn.tgdd.vn/Brand/1/samsungnew-220x48-1.png"
                                    alt="samsung"
                                    height={24}
                                />
                            </div>
                            <div
                                className={
                                    'item-selection ' +
                                    (isFilterActive(brandState, 'apple') ? 'active' : '')
                                }
                                onClick={handleClickItem}
                                data-ft={'apple'}
                                data-title="brand"
                            >
                                <img
                                    src="//cdn.tgdd.vn/Brand/1/logo-iphone-220x48.png"
                                    alt="iphone"
                                    height={24}
                                />
                            </div>
                            <div
                                className={
                                    'item-selection ' +
                                    (isFilterActive(brandState, 'xiaomi') ? 'active' : '')
                                }
                                onClick={handleClickItem}
                                data-ft={'xiaomi'}
                                data-title="brand"
                            >
                                <img
                                    src="//cdn.tgdd.vn/Brand/1/logo-xiaomi-220x48-5.png"
                                    alt="xiaomi"
                                    height={24}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="filter-border"></div>

                    {/* Price */}
                    <div className="p-3 d-flex">
                        <div style={{ width: '60%' }}>
                            <div className="title">Giá</div>
                            <div className="filter-list">
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
                                            (isFilterActive(priceState, item.dataFt)
                                                ? 'active'
                                                : '')
                                        }
                                        onClick={handleClickItem}
                                        data-ft={item.dataFt}
                                        data-title="price"
                                    >
                                        {item.title}
                                    </div>
                                ))}
                            </div>

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
                                        'arrow-icon ' +
                                        (firstLoad ? '' : showRangePrice ? 'rotate' : 'close')
                                    }
                                >
                                    <ArrowDropDownIcon />
                                </div>
                            </div>

                            <div
                                className={
                                    'value-price-wrapper ' +
                                    (firstLoad && !showRangePrice
                                        ? ''
                                        : showRangePrice
                                        ? 'show'
                                        : 'hide')
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
                        </div>
                        <div style={{ width: '40%' }}>
                            <div className="title">Loại điện thoại</div>
                            <div className="filter-list">
                                <div
                                    className={
                                        'item-selection center flex-column ' +
                                        (isFilterActive(typeState, 'android') ? 'active' : '')
                                    }
                                    onClick={handleClickItem}
                                    data-ft={'android'}
                                    data-title="type"
                                >
                                    <img
                                        src="https://cdn.tgdd.vn/ValueIcons/android.jpg"
                                        alt="android"
                                        height={40}
                                    />
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
                                    <img
                                        src="https://cdn.tgdd.vn/ValueIcons/iphone.jpg"
                                        alt="iphone"
                                        height={40}
                                    />
                                    <div>IPhone</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="filter-border"></div>

                    {/* Ram */}
                    <div className="p-3 d-flex">
                        <div style={{ width: '35%' }}>
                            <div className="title">Ram</div>
                            <div className="filter-list">
                                {['2 GB', '3 GB', '4 GB', '6 GB', '8 GB', '12 GB'].map(
                                    (item, i) => (
                                        <div
                                            key={i}
                                            className={
                                                'item-selection ' +
                                                (isFilterActive(ramState, item) ? 'active' : '')
                                            }
                                            onClick={handleClickItem}
                                            data-ft={item}
                                            data-title="ram"
                                        >
                                            {item}
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                        <div style={{ width: '35%' }}>
                            <div className="title">Dung lượng lưu trữ</div>
                            <div className="filter-list">
                                {['32 GB', '64 GB', '128 GB', '256 GB', '512 GB', '1 TB'].map(
                                    (item, i) => (
                                        <div
                                            key={i}
                                            className={
                                                'item-selection ' +
                                                (isFilterActive(romState, item) ? 'active' : '')
                                            }
                                            onClick={handleClickItem}
                                            data-ft={item}
                                            data-title="rom"
                                        >
                                            {item}
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>

                        <div style={{ width: '35%' }}>
                            <div className="title">Tính năng sạc</div>
                            <div className="filter-list">
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
                                            (isFilterActive(chargingFeatureState, item.dataFt)
                                                ? 'active'
                                                : '')
                                        }
                                        onClick={handleClickItem}
                                        data-ft={item.dataFt}
                                        data-title="charging_feature"
                                    >
                                        {item.title}
                                    </div>
                                ))}
                            </div>
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
                </div>
            </div>
            {showFilterTotal && (
                <div
                    className="filter-overlay"
                    onClick={() => {
                        setShowFilterTotal(false);
                    }}
                ></div>
            )}
            <div className="filter-item"></div>
        </div>
    );
}

export default memo(FilterPhone);
