import LayoutItems from 'components/layout-items';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { getBackupChargeApi } from 'service/items.service';
import Config from 'utils/Config';

function BackupChargerPage() {
    const sortbyState = useSelector((state: RootState) => state.homeState?.sortby);

    const getBackupChargerFunc = async (offset?: number) => {
        return await getBackupChargeApi({
            limit: Config.LIMIT_ITEM_PER_PAGE,
            skip: offset ? offset * Config.LIMIT_ITEM_PER_PAGE : 0,
            sortby: sortbyState,
        });
    };

    return <LayoutItems getItemFunc={getBackupChargerFunc} />;
}

export default BackupChargerPage;
