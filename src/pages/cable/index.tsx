import LayoutItems from 'components/layout-items';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { getCapbleApi } from 'service/items.service';
import Config from 'utils/Config';

function CablePage() {
    const sortbyState = useSelector((state: RootState) => state.homeState?.sortby);

    const getCableFunc = async (offset?: number) => {
        return await getCapbleApi({
            limit: Config.LIMIT_ITEM_PER_PAGE,
            skip: offset ? offset * Config.LIMIT_ITEM_PER_PAGE : 0,
            sortby: sortbyState,
        });
    };

    return <LayoutItems getItemFunc={getCableFunc} />;
}

export default CablePage;
