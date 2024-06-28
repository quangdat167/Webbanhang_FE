import React, { useState } from 'react';
import { IPhone } from 'utils/interface';

const AdminAddPhone = () => {
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        specifications: ['', '', ''],
        prices: [
            { type: '', price: '' },
            { type: '', price: '' },
            { type: '', price: '' },
            { type: '', price: '' },
            { type: '', price: '' },
            { type: '', price: '' },
        ],
        promotion: '',
        colors: [
            { color: '', img: '' },
            { color: '', img: '' },
            { color: '', img: '' },
            { color: '', img: '' },
            { color: '', img: '' },
            { color: '', img: '' },
        ],
        images: ['', '', '', '', '', '', '', '', '', ''],
        description: ['', '', '', ''],
    });

    const handleArrayFieldChange = (fieldName: string, index: number, value: string) => {
        setFormData((prevData: any) => {
            const updatedArray = [...prevData[fieldName]];
            updatedArray[index] = value;

            return {
                ...prevData,
                [fieldName]: updatedArray,
            };
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        console.log('name: ', name);
        console.log('value: ', value);

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePriceChange = (index: number, field: 'type' | 'price', value: string) => {
        setFormData((prevData) => {
            const updatedPrices = [...prevData.prices];

            updatedPrices[index][field] = value;

            return {
                ...prevData,
                prices: updatedPrices,
            };
        });
    };

    const handleColorChange = (index: number, field: 'color' | 'img', value: string) => {
        setFormData((prevData) => {
            const updatedColors = [...prevData.colors];
            updatedColors[index][field] = value;

            return {
                ...prevData,
                colors: updatedColors,
            };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submission: ', formData);

        // onSubmit(formData);
    };

    return (
        <div className="mt-4 container-1200 mx-auto">
            <h3>Thêm sản phẩm mới</h3>

            <form method="POST" action="/phones/store" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Tên điện thoại
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tên điện thoại"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="brand" className="form-label">
                        Hãng điện thoại
                    </label>
                    <input
                        type="text"
                        list="datalistBrand"
                        className="form-control"
                        placeholder="Hãng điện thoại"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="specifications" className="form-label">
                        Thông số kĩ thuật
                    </label>
                    {formData.specifications.map((spec, index) => (
                        <input
                            key={index}
                            type="text"
                            className="form-control mb-2"
                            placeholder={`Specifications ${index + 1}`}
                            name={`specifications[${index}]`}
                            value={spec}
                            onChange={(e) =>
                                handleArrayFieldChange('specifications', index, e.target.value)
                            }
                        />
                    ))}
                </div>

                <div className="mb-3">
                    <label htmlFor="prices" className="form-label">
                        Giá
                    </label>
                    <div className="row">
                        <div className="col text-center">
                            Phân loại
                            {formData.prices.map((price, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    className="form-control mb-2"
                                    list="datalistMemory"
                                    placeholder={`Type ${index + 1}`}
                                    name={`prices[${index}].type`}
                                    value={price.type}
                                    onChange={(e) =>
                                        handlePriceChange(index, 'type', e.target.value)
                                    }
                                />
                            ))}
                        </div>
                        <div className="col text-center">
                            Giá
                            {formData.prices.map((price, index) => (
                                <input
                                    key={index}
                                    type="number"
                                    className="form-control mb-2"
                                    placeholder={`Price ${index + 1}`}
                                    name={`prices[${index}].price`}
                                    value={price.price}
                                    onChange={(e) =>
                                        handlePriceChange(index, 'price', e.target.value)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="promotion" className="form-label">
                        Khuyến mãi
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Promotion"
                        name="promotion"
                        value={formData.promotion}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="colors" className="form-label">
                        Màu sắc
                    </label>
                    <div className="row g-3">
                        <div className="col-3 text-center">
                            Màu sắc
                            {formData.colors.map((color, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    className="form-control mb-2"
                                    list="datalistColors"
                                    placeholder={`Color ${index + 1}`}
                                    name={`colors[${index}].color`}
                                    value={color.color}
                                    onChange={(e) =>
                                        handleColorChange(index, 'color', e.target.value)
                                    }
                                />
                            ))}
                        </div>
                        <div className="col-9 text-center">
                            Link ảnh minh họa
                            {formData.colors.map((color, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder={`Img ${index + 1}`}
                                    name={`colors[${index}].img`}
                                    value={color.img}
                                    onChange={(e) =>
                                        handleColorChange(index, 'img', e.target.value)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="images" className="form-label">
                        Hình ảnh sản phẩm
                    </label>
                    {formData.images.map((img, index) => (
                        <input
                            key={index}
                            type="text"
                            className="form-control mb-2"
                            placeholder={`Images ${index + 1}`}
                            name={`images[${index}]`}
                            value={img}
                            onChange={(e) =>
                                handleArrayFieldChange('images', index, e.target.value)
                            }
                        />
                    ))}
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Miêu tả
                    </label>
                    {formData.description.map((desc, index) => (
                        <input
                            key={index}
                            type="text"
                            className="form-control mb-2"
                            placeholder={`Description ${index + 1}`}
                            name={`description[${index}]`}
                            value={desc}
                            onChange={(e) =>
                                handleArrayFieldChange('description', index, e.target.value)
                            }
                        />
                    ))}
                </div>

                <datalist id="datalistBrand">
                    <option value="apple" />
                    <option value="samsung" />
                    <option value="xiaomi" />
                    <option value="oppo" />
                </datalist>

                <datalist id="datalistInches">
                    <option value="6.1 inches" />
                    <option value="6.4 inches" />
                    <option value="6.5 inches" />
                    <option value="6.6 inches" />
                    <option value="6.7 inches" />
                    <option value="6.8 inches" />
                </datalist>

                <datalist id="datalistRam">
                    <option value="4 GB" />
                    <option value="6 GB" />
                    <option value="8 GB" />
                </datalist>

                <datalist id="datalistMemory">
                    <option value="64 GB" />
                    <option value="128 GB" />
                    <option value="256 GB" />
                    <option value="512 GB" />
                </datalist>

                <datalist id="datalistColors">
                    <option value="Đỏ" />
                    <option value="Đen" />
                    <option value="Xanh lá" />
                    <option value="Hồng" />
                    <option value="Trắng" />
                    <option value="Xanh dương" />
                    <option value="Vàng" />
                    <option value="Tím" />
                    <option value="Bạc" />
                </datalist>

                <button type="submit" className="btn btn-primary mb-3">
                    Thêm điện thoại
                </button>
            </form>
        </div>
    );
};

export default AdminAddPhone;
