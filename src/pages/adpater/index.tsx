import LayoutItems from 'components/layout-items';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { getAdapterApi } from 'service/items.service';
import Config from 'utils/Config';

function AdapterPage() {
    const sortbyState = useSelector((state: RootState) => state.homeState?.sortby);

    const getAdapterFunc = async (offset?: number) => {
        return await getAdapterApi({
            limit: Config.LIMIT_ITEM_PER_PAGE,
            skip: offset ? offset * Config.LIMIT_ITEM_PER_PAGE : 0,
            sortby: sortbyState,
        });
    };

    return <LayoutItems getItemFunc={getAdapterFunc} />;
}

export default AdapterPage;
