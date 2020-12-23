import React, { useState, useEffect, useContext } from 'react';
import { connect } from "react-redux";
import { Row, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import backendApiUrls from "../../routes/backendUrls";
// import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from '../../context/AuthContext';
import { actionGetProducts, actionSetEditingProduct } from '../../redux/actions/products';

import Product from "../product/Product";
import ProductModal from "../product/ProductModal";

interface IProps {
    products: Array<IProduct>;
    editingProduct: IProduct;
    actionSetEditingProduct: any;
    actionGetProducts: any;
};

interface IProduct {
    _id: string
    img: string,
    title: string,
    description: string,
    price: string,
    numberDaysUntilEndDiscount: number,
};

interface RootState {
    productsReducer: {
        productsData: Array<IProduct>;
        editingProduct: IProduct;
    }
  }

const Catalogue = ({
    products,
    editingProduct,
    actionSetEditingProduct,
    actionGetProducts,
}: IProps) => {
    const auth = useContext(AuthContext)
    const isProductsExists = products.length > 0;
    useEffect(() => {
        !isProductsExists && actionGetProducts();
        
    }, [isProductsExists]);

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
        if (editingProduct._id) {
            setModal(false)
            actionSetEditingProduct({})
        }
    };

    return (
        <Container>
            <h1>Catalogue</h1>
            <Button color="danger" onClick={toggleModal} className="mb-2">Add Product</Button>
            <ProductModal isOpen={modal} toggleModal={toggleModal} />
            <Row>
                {isProductsExists && products.map(product =>
                    <Product key={product._id} product={product} />
                )}
            </Row>
        </Container>
    );
};


const mapStateToProps = (state: RootState) => ({
    products: state.productsReducer.productsData,
    editingProduct: state.productsReducer?.editingProduct,
});

export default connect(
	mapStateToProps,
	{ actionGetProducts, actionSetEditingProduct }
)(Catalogue);
