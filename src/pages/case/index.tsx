import LayoutItems from 'components/layout-items';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { getCaseApi } from 'service/items.service';
import Config from 'utils/Config';

function CasePage() {
    const sortbyState = useSelector((state: RootState) => state.homeState?.sortby);

    const getCaseFunc = async (offset?: number) => {
        return await getCaseApi({
            limit: Config.LIMIT_ITEM_PER_PAGE,
            skip: offset ? offset * Config.LIMIT_ITEM_PER_PAGE : 0,
            sortby: sortbyState,
        });
    };

    return <LayoutItems getItemFunc={getCaseFunc} />;
}

export default CasePage;
