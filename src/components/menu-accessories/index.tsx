import RouteConfig from 'routes/Route';
import './style.scss';

function MenuAccessories({ show, setShow }: { show: boolean; setShow: Function }) {
    return show ? (
        <>
            <div className="menu-accessories">
                <a href={RouteConfig.BACKUPCHARGER} className="item">
                    Sạc dự phòng
                </a>
                <div className="menu-border"></div>
                <a href={RouteConfig.ADAPTER} className="item">
                    Củ sạc
                </a>
                <div className="menu-border"></div>
                <a href={RouteConfig.CAPBLE} className="item">
                    Cáp sạc
                </a>
                <div className="menu-border"></div>
                <a href={RouteConfig.CASE} className="item">
                    Ốp lưng
                </a>
                <div className="menu-border"></div>
                <a href={RouteConfig.GLASS} className="item">
                    Cường lực
                </a>
            </div>
        </>
    ) : (
        <></>
    );
}

export default MenuAccessories;
