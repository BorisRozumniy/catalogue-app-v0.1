import React, { useMemo } from 'react';
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProductForm from './ProductForm';

const ProductModal = (props) => {
  const {
    editingProduct,
    isOpen,
    toggleModal,
  } = props;

  const checkIsOpenState = useMemo(() => isOpen || editingProduct._id, [editingProduct, isOpen])

  const headerText = editingProduct._id ? 'Edit exist Product' : 'Add New Product'

  return (
    <Modal isOpen={checkIsOpenState} toggleModal={toggleModal}>
      <ModalHeader toggleModal={toggleModal}>{headerText}</ModalHeader>
      <ModalBody>
        <ProductForm toggleModal={toggleModal} editingProduct={editingProduct} />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  editingProduct: state.productsReducer.editingProduct,
});

export default connect(
  mapStateToProps,
  {}
)(ProductModal);
