import LayoutItems from 'components/layout-items';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import RouteConfig from 'routes/Route';
import { getProductByTypeApi } from 'service/product.service';
import Config from 'utils/Config';

function AdapterPage() {
    const sortbyState = useSelector((state: RootState) => state.homeState?.sortby);

    const getAdapterFunc = async (offset?: number) => {
        return await getProductByTypeApi({
            limit: Config.LIMIT_ITEM_PER_PAGE,
            skip: offset ? offset * Config.LIMIT_ITEM_PER_PAGE : 0,
            sortby: sortbyState,
            type: Config.PRODUCT_TYPE.ADAPTER,
        });
    };

    return <LayoutItems getItemFunc={getAdapterFunc} pathname={RouteConfig.ADAPTER} />;
}

export default AdapterPage;
