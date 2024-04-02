import LayoutItems from 'components/layout-items';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { getGlassApi } from 'service/items.service';
import Config from 'utils/Config';

function GlassPage() {
    const sortbyState = useSelector((state: RootState) => state.homeState?.sortby);

    const getGlassFunc = async (offset?: number) => {
        return await getGlassApi({
            limit: Config.LIMIT_ITEM_PER_PAGE,
            skip: offset ? offset * Config.LIMIT_ITEM_PER_PAGE : 0,
            sortby: sortbyState,
        });
    };

    return <LayoutItems getItemFunc={getGlassFunc} />;
}

export default GlassPage;
