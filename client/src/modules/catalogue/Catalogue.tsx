import React, { useEffect, useContext } from 'react';
import { connect } from "react-redux";
import { Row, Container } from 'reactstrap';
// import backendApiUrls from "../../routes/backendUrls";
// import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from '../../context/AuthContext';
import { actionGetProducts } from '../../redux/actions/products';

import Product from "../product/Product";

interface IProps {
    products: Array<IProduct>;
    actionGetProducts: any
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
    }
  }

const Catalogue = ({
    products,
    actionGetProducts,
}: IProps) => {
    const auth = useContext(AuthContext)
    // const { request } = useHttp()
    const isProductsExists = products.length > 0;
    useEffect(() => {
        !isProductsExists && actionGetProducts({
            Authorization: `Bearer ${auth.token}`
        });
        // request(backendApiUrls.generate, 'GET', {
        //     Authorization: `Bearer ${auth.token}`
        //   })
    }, [isProductsExists]);

    return (
        <Container>
            <h1>Catalogue</h1>
            <Row>
                {isProductsExists && products.map(product =>
                    <Product key={product._id} {...product} />
                )}
            </Row>
        </Container>
    );
};


const mapStateToProps = (state: RootState) => ({
	products: state.productsReducer.productsData,
});

export default connect(
	mapStateToProps,
	{ actionGetProducts }
)(Catalogue);
