import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getAllOrdersAppApi } from 'service/order.service';
import { formatNumberWithCommas } from 'utils';
import { IOrder } from 'utils/interface';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'phone', headerName: 'Số điện thoại', width: 200 },
    { field: 'time', headerName: 'Thời gian đặt hàng', width: 200 },
    { field: 'totalPrice', headerName: 'Tổng tiền', width: 200 },
    { field: 'status', headerName: 'Trạng thái', width: 200 },
    //     {
    //         field: 'status',
    //         headerName: 'Status',
    //         width: 160,
    //     },
];

export default function AdminManageOrder() {
    const [openPoppupAddTask, setOpenPoppupAddTask] = useState(false);
    const [rows, setRows] = useState<any[]>([]);
    //     const [role, setRole] = useState(Config.USERTASK_ROLE_NONE);
    const [mode, setMode] = useState('');
    const [orders, setOrders] = useState([] as IOrder[]);

    const getCartFunc = async () => {
        const result = await getAllOrdersAppApi({});
        if (result) {
            setOrders(result);
            //     dispatch(addOrders(result));
        }
    };

    useEffect(() => {
        getCartFunc();
    }, []);

    if (orders?.length && rows.length === 0) {
        orders?.map((order, id) => {
            const totalPrice = formatNumberWithCommas(
                order.products.reduce(
                    (value, prod) => (prod.price ? value + prod.price * prod.quantity : value),
                    0,
                ),
            );
            setRows((rows) => [
                ...rows,
                {
                    id: id + 1,
                    name: order.userInfo?.firstName + ' ' + order.userInfo?.lastName,
                    totalPrice: totalPrice,
                    phone: order.userInfo?.phone,
                    time: moment(order.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                    status: order.status,
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
