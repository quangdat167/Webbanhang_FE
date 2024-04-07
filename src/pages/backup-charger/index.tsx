import LayoutItems from 'components/layout-items';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import RouteConfig from 'routes/Route';
import { getProductByTypeApi } from 'service/product.service';
import Config from 'utils/Config';

function BackupChargerPage() {
    const sortbyState = useSelector((state: RootState) => state.homeState?.sortby);

    const getBackupChargerFunc = async (offset?: number) => {
        return await getProductByTypeApi({
            limit: Config.LIMIT_ITEM_PER_PAGE,
            skip: offset ? offset * Config.LIMIT_ITEM_PER_PAGE : 0,
            sortby: sortbyState,
            type: Config.PRODUCT_TYPE.BACKUP_CHARGE,
        });
    };

    return <LayoutItems getItemFunc={getBackupChargerFunc} pathname={RouteConfig.BACKUPCHARGER} />;
}

export default BackupChargerPage;
