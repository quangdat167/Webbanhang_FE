import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getAllPhonesApi } from 'service/phone.service';
import { IPhone } from 'utils/interface';

const AdminHome = () => {
    const [phones, setPhones] = useState<IPhone[]>([]);
    useEffect(() => {
        const getPhones = async () => {
            const result = await getAllPhonesApi();
            setPhones(result);
        };
        getPhones();
    }, []);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);

    const handleDeleteConfirmation = () => {
        if (idToDelete) {
            // Gửi request xóa điện thoại với idToDelete
            console.log(`Deleting phone with ID: ${idToDelete}`);
            // Đóng modal sau khi xác nhận xóa
            setIdToDelete(null);
        }
    };

    const handleDeleteClick = (id: string) => {
        // Mở modal xác nhận xóa
        setIdToDelete(id);
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-3">Tất cả điện thoại</h2>
            </div>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên điện thoại</th>
                            <th scope="col">Thương hiệu</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Thời gian cập nhật</th>
                            <th scope="col" colSpan={2}></th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {phones.map((phone, index) => (
                            <tr key={phone._id}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    <a href={`/phones/${phone.slug}`} style={{ color: 'black' }}>
                                        {phone.name}
                                    </a>
                                </td>
                                <td>{phone.brand}</td>
                                <td>
                                    <img
                                        src={phone.images[0]}
                                        alt="Ảnh mẫu"
                                        className="image-swipe"
                                        style={{ pointerEvents: 'none', width: 50, height: 50 }}
                                    />
                                </td>
                                <td>{moment(phone.updatedAt).format('H:mm DD-MM-YYYY')}</td>
                                <td className="text-end">
                                    <a
                                        href={`/phones/${phone._id}/edit`}
                                        className="btn btn-primary mb-2"
                                        style={{ whiteSpace: 'nowrap' }}
                                    >
                                        Chỉnh sửa
                                    </a>
                                    <button
                                        className="btn btn-danger btn-delete mb-2 ms-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalDelete"
                                        data-id={phone._id}
                                        onClick={() => handleDeleteClick(phone._id)}
                                    >
                                        Xóa bỏ
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal delete */}
            <div className="modal fade" id="modalDelete" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Xóa điện thoại
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">Bạn có chắc chắn muốn xóa điện thoại này?</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-confirm-delete"
                                onClick={handleDeleteConfirmation}
                            >
                                Xóa vĩnh viễn
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
