import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Row, Button, Spinner } from 'reactstrap';
import { actionGetProducts, actionSetEditingProduct } from '../../redux/actions/products';

import { MainContainer } from "../components/MainContainer";
import Product from "../product/Product";
import ProductModal from "../product/ProductModal";

interface IProps {
  products: Array<IProduct>;
  editingProduct: IProduct;
  isLoading: boolean;
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
    productsRequestLoading: boolean;
  }
}

const Catalogue = ({
  products,
  editingProduct,
  isLoading,
  actionSetEditingProduct,
  actionGetProducts,
}: IProps) => {
  const isProductsExist = products.length > 0;

  useEffect(() => {
    !isProductsExist && actionGetProducts();
  }, []);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal)
    if (editingProduct._id) {
      setModal(false)
      actionSetEditingProduct({})
    }
  };

  return (
    <MainContainer>
      <h1>Catalogue</h1>
      <Button color="danger" onClick={toggleModal} className="mb-2">Add Product</Button>
      <ProductModal isOpen={modal} toggleModal={toggleModal} />
      <Row>
        {isProductsExist && products.map(product =>
          <Product key={product._id} product={product} />
        )}
        {isLoading &&
          <div
            className="d-flex justify-content-center w-100"
          >
            <Spinner color="primary" />
          </div>
        }
      </Row>
    </MainContainer>
  );
};


const mapStateToProps = (state: RootState) => ({
  products: state.productsReducer.productsData,
  isLoading: state.productsReducer.productsRequestLoading,
  editingProduct: state.productsReducer?.editingProduct,
});

export default connect(
  mapStateToProps,
  { actionGetProducts, actionSetEditingProduct }
)(Catalogue);
