import LayoutDetailItem from 'components/layout-detail-item';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductBySlugApi } from 'service/product.service';
import { IItem } from 'utils/interface';

function DetailGlass() {
    const { slug } = useParams<{ slug: string }>();
    const [item, setItem] = useState<IItem | null>(null);

    useEffect(() => {
        const fetchItem = async () => {
            if (slug) {
                const result = await getProductBySlugApi({ slug: slug });
                setItem(result);
            }
        };
        fetchItem();
    }, [slug]);
    return (
        item && (
            <>
                <LayoutDetailItem item={item} />
            </>
        )
    );
}

export default DetailGlass;
