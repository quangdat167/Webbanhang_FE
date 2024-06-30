import React, { useEffect, useState } from 'react';
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
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getProductBySlugApi } from 'service/product.service';
import { updateProductApi } from 'service/order.service';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
}));

const productData = {
    name: 'iPhone 15 Pro Max',
    slug: 'iphone-15-pro-max',
    type: 'phone',
    brand: 'apple',
    priority: 5,
    specifications: ['6.7"', 'Super Retina XDR'],
    prices: [
        { type: '256GB', price: 30990000 },
        { type: '512GB', price: 37990000 },
        { type: '1TB', price: 44990000 },
    ],
    promotion: [
        'Cơ hội trúng 30 Bộ Quà Gia Dụng trị giá đến 25 triệu',
        'Thu cũ Đổi mới: Giảm đến 2 triệu (Tuỳ model máy cũ, Không kèm thanh toán qua cổng online, mua kèm)',
    ],
    colors: [
        {
            img: 'https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-200x200.jpg',
            color: 'Titan xanh',
        },
        {
            img: 'https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-black-thumbnew-200x200.jpg',
            color: 'Titan đen',
        },
        {
            img: 'https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-gold-thumbnew-200x200.jpg',
            color: 'Titan tự nhiên',
        },
        {
            img: 'https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-white-thumbnew-200x200.jpg',
            color: 'Titan trắng',
        },
    ],
    images: [
        'https://cdn.tgdd.vn/Products/Images/42/305658/Slider/vi-vn-iphone-15-pro-max-4-1020x570.jpg',
        // more images...
    ],
    description: [
        'Tăng độ cứng cáp và tối ưu khối lượng với chất liệu Titan',
        'Bứt phá mọi giới hạn về hiệu năng nhờ chip A17 Pro',
        // more descriptions...
    ],
    technical_infos: [
        {
            name: 'Màn hình',
            details: [
                { title: 'Công nghệ màn hình', infos: ['OLED'] },
                { title: 'Độ phân giải', infos: ['Super Retina XDR (1290 x 2796 Pixels)'] },
                // more details...
            ],
        },
        // more technical_infos...
    ],
    remain: 100,
};

function AdminEditProduct() {
    const [product, setProduct] = useState<any>(productData);
    const { slug } = useParams<{ slug: string }>();

    useEffect(() => {
        const fetchPhone = async () => {
            if (slug) {
                const result = await getProductBySlugApi({ slug: slug });
                setProduct(result);
            }
        };
        fetchPhone();
    }, [slug]);

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
            await updateProductApi({ slug: product.slug, product });
            alert('Lưu thành công');
        } catch (error) {
            console.error('Error saving product data:', error);
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Edit Product: {product.name}
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
                    <Grid item xs={12} md={6}>
                        <Item>
                            <TextField
                                fullWidth
                                label="Slug"
                                value={product.slug}
                                onChange={(e) => handleChange('slug', e.target.value)}
                            />
                        </Item>
                    </Grid>
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
                            {product.technical_infos.map((info: any, index: any) => (
                                <Box key={index} sx={{ marginBottom: 2 }}>
                                    <Typography variant="h6" className="mb-2">
                                        {info.name}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() =>
                                            handleAddNestedField('technical_infos', info.name)
                                        }
                                    >
                                        Add Detail
                                    </Button>
                                    <List>
                                        {info.details.map((detail: any, idx: any) => (
                                            <ListItem key={idx}>
                                                <TextField
                                                    label="Title"
                                                    value={detail.title}
                                                    onChange={(e) => {
                                                        const updatedDetails = [...info.details];
                                                        updatedDetails[idx].title = e.target.value;
                                                        const updatedTechnicalInfos = [
                                                            ...product.technical_infos,
                                                        ];
                                                        updatedTechnicalInfos[index].details =
                                                            updatedDetails;
                                                        setProduct({
                                                            ...product,
                                                            technical_infos: updatedTechnicalInfos,
                                                        });
                                                    }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Infos"
                                                    value={detail.infos.join(', ')}
                                                    onChange={(e) => {
                                                        const updatedDetails = [...info.details];
                                                        updatedDetails[idx].infos =
                                                            e.target.value.split(', ');
                                                        const updatedTechnicalInfos = [
                                                            ...product.technical_infos,
                                                        ];
                                                        updatedTechnicalInfos[index].details =
                                                            updatedDetails;
                                                        setProduct({
                                                            ...product,
                                                            technical_infos: updatedTechnicalInfos,
                                                        });
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
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

export default AdminEditProduct;
