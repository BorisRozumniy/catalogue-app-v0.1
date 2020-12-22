import React, { useEffect, useContext } from 'react';
import { connect } from "react-redux";
import { AuthContext } from '../../context/AuthContext';
import { Col, Jumbotron, Button, Badge } from "reactstrap";
import { actionDeleteProduct } from '../../redux/actions/products';

const Product = ({
  _id,
  img,
  title,
  description,
  price,
  numberDaysUntilEndDiscount,
  actionDeleteProduct,
}) => {
  const auth = useContext(AuthContext)

  const deleteHandler = () => {
    actionDeleteProduct(_id, {Authorization: `Bearer ${auth.token}`})
  }
  const editHandler = () => {
    alert("edit")
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
          <Button type="button" color="danger" block size="lg"
            onClick={deleteHandler} className="text-uppercase"
          >remove</Button>
          <Button type="button" color="warning" block size="lg"
            onClick={editHandler} className="text-uppercase"
          >edit</Button>
        </Jumbotron>
      </Col>
    );
  }
  

  const mapStateToProps = (state) => ({
    products: state.productsReducer.productsData,
  });
  
  export default connect(
    mapStateToProps,
    { actionDeleteProduct }
  )(Product);
  