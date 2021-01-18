import React from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Input from "../components/Input";
import {
  actionPostCreateProduct,
  actionPatchProduct,
} from "../../redux/actions/products";

const ProductForm = ({
  editingProduct,
  toggleModal,
  actionPostCreateProduct,
  actionPatchProduct,
}) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    toggleModal();
    if (editingProduct._id) {
      actionPatchProduct({ ...data, _id: editingProduct._id });
    } else {
      actionPostCreateProduct(data);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        ref={register({ required: "This is required." })}
        id="title"
        type="text"
        label="title"
        name="title"
        error={!!errors.title}
        helperText={errors?.title?.message}
        defaultValue={editingProduct.title}
      />
      <Input
        ref={register}
        id="description"
        type="text"
        label="description"
        name="description"
        error={!!errors.description}
        helperText={errors?.description?.message}
        defaultValue={editingProduct.description}
      />
      <Input
        ref={register({ required: "This is required.", valueAsNumber: true })}
        id="price"
        type="number"
        label="price"
        name="price"
        error={!!errors.price}
        helperText={errors?.price?.message}
        defaultValue={editingProduct.price}
      />
      <Input
        ref={register}
        id="numberDaysUntilEndDiscount"
        type="number"
        label="numberDaysUntilEndDiscount"
        name="numberDaysUntilEndDiscount"
        error={!!errors.numberDaysUntilEndDiscount}
        helperText={errors?.numberDaysUntilEndDiscount?.message}
        defaultValue={editingProduct.numberDaysUntilEndDiscount}
      />
      <Button startIcon={<SaveIcon />} color="primary" type="submit">
        Save
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  editingProduct: state.productsReducer.editingProduct,
});

export default connect(mapStateToProps, {
  actionPostCreateProduct,
  actionPatchProduct,
})(ProductForm);
