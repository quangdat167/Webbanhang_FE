import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuSearchResult from 'components/menu-search-result';
import { useEffect, useState } from 'react';
import { searchPhoneByNameApi } from 'service/product.service';
import { IPhone } from 'utils/interface';
import './style.scss';

function InputSearchPhone() {
    const isTablet = useMediaQuery('(max-width: 1024px)');
    const [keyword, setKeyword] = useState('');
    const [resultSearch, setResultSearch] = useState([] as IPhone[]);
    const [showPopupResult, setShowPopupResult] = useState(false);
    const [showRecomment, setShowRecomment] = useState(true);

    const handleChangeKeyword = (e: any) => {
        setKeyword(e.target.value);
    };

    const searchPhoneFunc = async () => {
        const result = await searchPhoneByNameApi({ keyword });
        setResultSearch(result);
        setShowPopupResult(true);
        if (result.length === 0) {
            setShowRecomment(true);
        } else {
            setShowRecomment(false);
        }
    };

    useEffect(() => {
        if (keyword.length) {
            searchPhoneFunc();
        } else {
            setShowRecomment(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword]);

    return (
        <div
            className="search-wrapper"
            style={{
                width: isTablet ? '35%' : '30%',
            }}
        >
            <Paper
                component="form"
                sx={{
                    p: '2px 16px 2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
                    <MenuIcon />
                </IconButton> */}
                <IconButton
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search"
                    onClick={() => {
                        setShowPopupResult(true);
                    }}
                >
                    <SearchIcon />
                </IconButton>
                <InputBase
                    onFocus={() => {
                        setShowPopupResult(true);
                    }}
                    type="search"
                    value={keyword}
                    onChange={handleChangeKeyword}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Tìm kiếm điện thoại"
                    inputProps={{ 'aria-label': 'Tìm kiếm điện thoại' }}
                />
            </Paper>

            <MenuSearchResult
                items={resultSearch}
                show={showPopupResult}
                setShow={setShowPopupResult}
                showRecomment={showRecomment}
                setShowRecomment={setShowRecomment}
            />
        </div>
    );
}

export default InputSearchPhone;
