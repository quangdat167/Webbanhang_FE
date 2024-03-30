class Config {
    static USER_ROLE_ADMIN = 1;
    static USER_ROLE_MEMBER = 2;

    static PRIORITY_HIGHEST = 'highest';
    static PRIORITY_HIGH = 'high';
    static PRIORITY_MEDIUM = 'medium';
    static PRIORITY_NORMAL = 'normal';
    static PRIORITY_LOW = 'low';
    static PRIORITY_LOWEST = 'lowest';

    static TASK_TYPE_INDIVIDUAL = 'individual';
    static TASK_TYPE_GROUP = 'group';

    static MODE_VIEW_EVENT = 'view';
    static MODE_EDIT_EVENT = 'edit';
    static MODE_CREATE_EVENT = 'create';

    static SORT_BY = {
        PRICE_DESC: 'price_desc',
        PRICE_ASC: 'price_asc',
        POPULAR: 'popular',
    };
}

export default Config;
