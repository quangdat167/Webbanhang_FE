import React, { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Grid,
    Paper,
    Box,
    List,
    ListItem,
} from '@mui/material';
import { styled } from '@mui/system';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
}));

const initialProductData = {
    name: '',
    // slug: '',
    type: '',
    brand: '',
    priority: 0,
    specifications: [''],
    prices: [{ type: '', price: 0 }],
    promotion: [''],
    colors: [{ img: '', color: '' }],
    images: [''],
    description: [''],
    technical_infos: [
        {
            name: 'Màn hình',
            details: [
                { title: 'Công nghệ màn hình', infos: [''] },
                { title: 'Độ phân giải', infos: [''] },
                { title: 'Màn hình rộng', infos: [''] },
                { title: 'Độ sáng tối đa', infos: [''] },
                { title: 'Mặt kính cảm ứng', infos: [''] },
            ],
        },
        {
            name: 'Camera sau',
            details: [
                { title: 'Độ phân giải', infos: [''] },
                { title: 'Quay phim', infos: [''] },
                { title: 'Đèn Flash', infos: [''] },
                { title: 'Tính năng', infos: [''] },
            ],
        },
        {
            name: 'Camera trước',
            details: [
                { title: 'Độ phân giải', infos: [''] },
                { title: 'Tính năng', infos: [''] },
            ],
        },
        {
            name: 'Hệ điều hành & CPU',
            details: [
                { title: 'Hệ điều hành', infos: [''] },
                { title: 'Chip xử lý (CPU)', infos: [''] },
                { title: 'Tốc độ CPU', infos: [''] },
                { title: 'Chip đồ họa (GPU)', infos: [''] },
            ],
        },
        {
            name: 'Bộ nhớ & Lưu trữ',
            details: [
                { title: 'RAM', infos: [''] },
                { title: 'Dung lượng lưu trữ', infos: [''] },
                { title: 'Dung lượng còn lại (khả dụng) khoảng', infos: [''] },
                { title: 'Danh bạ', infos: [''] },
            ],
        },
        {
            name: 'Kết nối',
            details: [
                { title: 'Mạng di động', infos: [''] },
                { title: 'SIM', infos: [''] },
                { title: 'Wifi', infos: [''] },
                { title: 'GPS', infos: [''] },
                { title: 'Bluetooth', infos: [''] },
                { title: 'Cổng kết nối/sạc', infos: [''] },
                { title: 'Jack tai nghe', infos: [''] },
                { title: 'Kết nối khác', infos: [''] },
            ],
        },
        {
            name: 'Pin & Sạc',
            details: [
                { title: 'Dung lượng pin', infos: [''] },
                { title: 'Loại pin', infos: [''] },
                { title: 'Hỗ trợ sạc tối đa', infos: [''] },
                { title: 'Công nghệ pin', infos: [''] },
            ],
        },
        {
            name: 'Tiện ích',
            details: [
                { title: 'Bảo mật nâng cao', infos: [''] },
                { title: 'Tính năng đặc biệt', infos: [''] },
                { title: 'Kháng nước, bụi', infos: [''] },
                { title: 'Ghi âm', infos: [''] },
                { title: 'Xem phim', infos: [''] },
                { title: 'Nghe nhạc', infos: [''] },
            ],
        },
        {
            name: 'Thông tin chung',
            details: [
                { title: 'Thiết kế', infos: [''] },
                { title: 'Chất liệu', infos: [''] },
                { title: 'Kích thước, khối lượng', infos: [''] },
                { title: 'Thời điểm ra mắt', infos: [''] },
                { title: 'Hãng', infos: [''] },
            ],
        },
    ],
    remain: 0,
};

function AdminAddProduct() {
    const [product, setProduct] = useState<any>(initialProductData);

    const handleChange = (field: string, value: any) => {
        setProduct((prevProduct: any) => ({ ...prevProduct, [field]: value }));
    };

    const handleNestedChange = (field: string, index: number, key: string, value: any) => {
        setProduct((prevProduct: any) => {
            const updatedField = prevProduct[field].map((item: any, idx: number) =>
                idx === index ? { ...item, [key]: value } : item,
            );
            return { ...prevProduct, [field]: updatedField };
        });
    };

    const handleTechnicalInfoChange = (techIndex: number, detailIndex: number, value: any) => {
        setProduct((prevProduct: any) => {
            const updatedTechnicalInfos = [...prevProduct.technical_infos];
            updatedTechnicalInfos[techIndex].details[detailIndex].infos = value.split(', ');
            return { ...prevProduct, technical_infos: updatedTechnicalInfos };
        });
    };

    const handleAddField = (field: string) => {
        setProduct((prevProduct: any) => ({
            ...prevProduct,
            [field]: [...prevProduct[field], field === 'prices' ? { type: '', price: 0 } : ''],
        }));
    };

    const handleAddNestedField = (field: string, nestedField: string) => {
        setProduct((prevProduct: any) => ({
            ...prevProduct,
            [field]: prevProduct[field].map((item: any) =>
                item.name === nestedField
                    ? { ...item, details: [...item.details, { title: '', infos: [] }] }
                    : item,
            ),
        }));
    };

    const handleSave = async () => {
        try {
            // await createProductApi({ product });
            console.log('Product data:', product);

            alert('Product added successfully');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Add New Product
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Item>
                            <TextField
                                fullWidth
                                label="Name"
                                value={product.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                            />
                        </Item>
                    </Grid>
                    {/* <Grid item xs={12} md={6}>
                        <Item>
                            <TextField
                                fullWidth
                                label="Slug"
                                value={product.slug}
                                onChange={(e) => handleChange('slug', e.target.value)}
                            />
                        </Item>
                    </Grid> */}
                    <Grid item xs={12} md={6}>
                        <Item>
                            <TextField
                                fullWidth
                                label="Type"
                                value={product.type}
                                onChange={(e) => handleChange('type', e.target.value)}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Item>
                            <TextField
                                fullWidth
                                label="Brand"
                                value={product.brand}
                                onChange={(e) => handleChange('brand', e.target.value)}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Item>
                            <TextField
                                fullWidth
                                label="Priority"
                                type="number"
                                value={product.priority}
                                onChange={(e) => handleChange('priority', e.target.value)}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Item>
                            <TextField
                                fullWidth
                                label="Stock Quantity"
                                type="number"
                                value={product.remain}
                                onChange={(e) => handleChange('remain', e.target.value)}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <Typography variant="h6">Specifications</Typography>
                            <List>
                                {product.specifications.map((spec: any, index: any) => (
                                    <ListItem key={index}>
                                        <TextField
                                            fullWidth
                                            value={spec}
                                            onChange={(e) => {
                                                const updatedSpecs = [...product.specifications];
                                                updatedSpecs[index] = e.target.value;
                                                setProduct({
                                                    ...product,
                                                    specifications: updatedSpecs,
                                                });
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleAddField('specifications')}
                            >
                                Add Specification
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <Typography variant="h6">Prices</Typography>
                            <List>
                                {product.prices.map((price: any, index: any) => (
                                    <ListItem key={index}>
                                        <TextField
                                            label="Type"
                                            value={price.type}
                                            onChange={(e) =>
                                                handleNestedChange(
                                                    'prices',
                                                    index,
                                                    'type',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <TextField
                                            label="Price"
                                            type="number"
                                            value={price.price}
                                            onChange={(e) =>
                                                handleNestedChange(
                                                    'prices',
                                                    index,
                                                    'price',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleAddField('prices')}
                            >
                                Add Price
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <Typography variant="h6">Promotions</Typography>
                            <List>
                                {product.promotion.map((promo: any, index: any) => (
                                    <ListItem key={index}>
                                        <TextField
                                            fullWidth
                                            value={promo}
                                            onChange={(e) => {
                                                const updatedPromotions = [...product.promotion];
                                                updatedPromotions[index] = e.target.value;
                                                setProduct({
                                                    ...product,
                                                    promotion: updatedPromotions,
                                                });
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleAddField('promotion')}
                            >
                                Add Promotion
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <Typography variant="h6">Colors</Typography>
                            <List>
                                {product.colors.map((color: any, index: any) => (
                                    <ListItem key={index}>
                                        <TextField
                                            label="Image URL"
                                            value={color.img}
                                            onChange={(e) =>
                                                handleNestedChange(
                                                    'colors',
                                                    index,
                                                    'img',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <TextField
                                            label="Color"
                                            value={color.color}
                                            onChange={(e) =>
                                                handleNestedChange(
                                                    'colors',
                                                    index,
                                                    'color',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleAddField('colors')}
                            >
                                Add Color
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <Typography variant="h6">Images</Typography>
                            <List>
                                {product.images.map((image: any, index: any) => (
                                    <ListItem key={index}>
                                        <TextField
                                            fullWidth
                                            value={image}
                                            onChange={(e) => {
                                                const updatedImages = [...product.images];
                                                updatedImages[index] = e.target.value;
                                                setProduct({ ...product, images: updatedImages });
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleAddField('images')}
                            >
                                Add Image
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <Typography variant="h6">Descriptions</Typography>
                            <List>
                                {product.description.map((desc: any, index: any) => (
                                    <ListItem key={index}>
                                        <TextField
                                            fullWidth
                                            value={desc}
                                            onChange={(e) => {
                                                const updatedDescriptions = [
                                                    ...product.description,
                                                ];
                                                updatedDescriptions[index] = e.target.value;
                                                setProduct({
                                                    ...product,
                                                    description: updatedDescriptions,
                                                });
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleAddField('description')}
                            >
                                Add Description
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <Typography variant="h6" className="mb-3">
                                Technical Infos
                            </Typography>
                            {product.technical_infos.map((info: any, techIndex: any) => (
                                <Box key={techIndex} sx={{ marginBottom: 2 }}>
                                    <Typography variant="h6" className="mb-2">
                                        {info.name}
                                    </Typography>
                                    <List>
                                        {info.details.map((detail: any, detailIndex: any) => (
                                            <ListItem key={detailIndex}>
                                                <TextField
                                                    label="Title"
                                                    value={detail.title}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Infos"
                                                    value={detail.infos.join(', ')}
                                                    onChange={(e) => {
                                                        handleTechnicalInfoChange(
                                                            techIndex,
                                                            detailIndex,
                                                            e.target.value,
                                                        );
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() =>
                                            handleAddNestedField('technical_infos', info.name)
                                        }
                                    >
                                        Add Detail
                                    </Button>
                                </Box>
                            ))}
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default AdminAddProduct;
