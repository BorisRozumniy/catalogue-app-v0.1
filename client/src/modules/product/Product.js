import React from 'react';
import { connect } from "react-redux";
import { Col, Jumbotron, Button, Badge } from "reactstrap";
import { actionDeleteProduct, actionPatchProduct, actionSetEditingProduct } from '../../redux/actions/products';

const Product = ({
  product,
  actionSetEditingProduct,
  actionDeleteProduct,
}) => {
  const {
    _id,
    img,
    title,
    description,
    price,
    numberDaysUntilEndDiscount,
  } = product;

  const deleteHandler = () => {
    actionDeleteProduct(_id)
  }
  
  const editProductHandler = () => {
    actionSetEditingProduct(product)
  }

  const discountText = <>
      The discount will be valid for another {" "}
      <Badge color="success">{numberDaysUntilEndDiscount}</Badge> {" "}
      {numberDaysUntilEndDiscount === 1 ? "day" : "days"}!!!
    </>
    return (
      <Col lg={6} className="mb-5">
        <Jumbotron className=" h-100">
          <img src={img} alt="product1" className="product__image" />
          <h2>{title}</h2>
          <p>{description}</p>
          <Badge pill color="info" className="p-3 m-2">{price}$</Badge>
          {numberDaysUntilEndDiscount > 0 &&
            <h3 className="text-uppercase">{discountText}</h3>}
          <Button type="button" color="warning" block size="lg"
            onClick={editProductHandler} className="text-uppercase"
          >edit</Button>
          <Button type="button" color="danger" block size="lg"
            onClick={deleteHandler} className="text-uppercase"
          >remove</Button>
        </Jumbotron>
      </Col>
    );
  }
  

  const mapStateToProps = (state) => ({
    editingProduct: state.productsReducer.editingProduct,
  });
  
  export default connect(
    mapStateToProps,
    { actionDeleteProduct, actionPatchProduct, actionSetEditingProduct }
  )(Product);
  