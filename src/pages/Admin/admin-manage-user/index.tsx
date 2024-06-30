import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { IUserInfo } from 'redux/reducer/userinfo';
import { getAllUsersApi } from 'service/authen.service';
import { getAllOrdersAppApi } from 'service/order.service';
import { getAllProductsApi } from 'service/product.service';
import { formatNumberWithCommas } from 'utils';
import Config from 'utils/Config';
import { IOrder, IProductItem } from 'utils/interface';

export default function AdminManageUsers() {
    const [openPoppupAddTask, setOpenPoppupAddTask] = useState(false);
    const [rows, setRows] = useState<any[]>([]);
    //     const [role, setRole] = useState(Config.USERTASK_ROLE_NONE);
    const [mode, setMode] = useState('');
    const [products, setProducts] = useState([] as IUserInfo[]);

    const getCartFunc = async () => {
        const result = await getAllUsersApi({});
        if (result) {
            setProducts(result);
            //     dispatch(addOrders(result));
        }
    };

    useEffect(() => {
        getCartFunc();
    }, []);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'role', headerName: 'Vai trò', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Số điện thoại', width: 200 },
        { field: 'address', headerName: 'Địa chỉ', width: 300 },
        {
            field: 'edit',
            headerName: '',
            width: 100,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(params.row._id)}
                >
                    Edit
                </Button>
            ),
        },
    ];

    const handleEditClick = (slug: string) => {
        window.open(`/admin/edit-product/${slug}`, '_blank');
    };

    if (products?.length && rows.length === 0) {
        products?.map((user, id) => {
            setRows((rows) => [
                ...rows,
                {
                    id: id + 1,
                    name: user.firstName + ' ' + user.lastName,
                    role: user.role === Config.USER_ROLE_MEMBER ? 'member' : 'admin',
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                },
            ]);
        });
    }

    return (
        <>
            <div style={{ height: '90vh', width: '100%' }}>
                {rows.length > 0 && (
                    <DataGrid
                        rows={rows}
                        rowSelection={false}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 15 },
                            },
                        }}
                        pageSizeOptions={[15, 25, 35]}
                        // onCellClick={(e) => {
                        //     setOpenPoppupAddTask(true);
                        //     setMode(Config.MODE_VIEW);
                        //     setTaskInfo(e.row.taskInfo);
                        //     if (roles?.length) {
                        //         setRole(roles[e.row.id - 1]);
                        //     } else if (e.row.taskInfo?.usertask) {
                        //         setRole(e.row.taskInfo.usertask.role);
                        //     }
                        // }}
                        // checkboxSelection
                    />
                )}
            </div>

            {/* <PopupAddTask
                open={openPoppupAddTask}
                setOpen={setOpenPoppupAddTask}
                // type={Config.TASK_TYPE_INDIVIDUAL}
                mode={mode}
                setMode={setMode}
                taskInfo={taskInfo}
                projectName={projectName}
                workspaceName={workspaceName}
                role={role}
            /> */}
        </>
    );
}
