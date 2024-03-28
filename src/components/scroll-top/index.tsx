import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useEffect, useState } from 'react';
import { scrollToTop } from 'utils';
import './style.scss';
function ScrollToTopEle() {
    const [showBtn, setShowBtn] = useState(false);
    useEffect(() => {
        if (typeof window != undefined) {
            const trackScrolling = () => {
                if (typeof window !== undefined) {
                    setShowBtn(document.body.getBoundingClientRect().top <= -1000);
                }
            };

            window.addEventListener('scroll', trackScrolling);

            return () => {
                window.removeEventListener('scroll', trackScrolling);
            };
        }
    }, []);

    return showBtn ? (
        <>
            <div
                className="scroll-to-top-auto"
                onClick={() => {
                    scrollToTop(true);
                }}
            >
                <div className="btnn">
                    <ArrowUpwardIcon />
                </div>
            </div>
        </>
    ) : (
        <></>
    );
}

export default ScrollToTopEle;
