import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import {
  FormGroup,
  TextField,
  FormHelperText,
  Button,
  FormControl,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
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
  const {
    title,
    img,
    description,
    price,
    numberDaysUntilEndDiscount,
  } = editingProduct;
  const [form, setForm] = useState({
    title,
    img,
    description,
    price,
    numberDaysUntilEndDiscount,
  });

  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    title && setForm(editingProduct);
  }, [editingProduct]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    toggleModal();
    if (editingProduct._id) {
      actionPatchProduct(form);
    } else {
      actionPostCreateProduct(form);
    }
  };

  return (
    <FormControl onSubmit={submitHandler}>
      <FormGroup row>
        <TextField
          name="title"
          type="title"
          label="title"
          variant="outlined"
          // error={error.errors && error.errors[0].param === "email"}
          // helperText={error.errors && error.errors[0].msg}
          fullWidth
          value={form.title}
          onChange={changeHandler}
          // inputRef={}
        />
        <FormHelperText style={{ marginBottom: 12 }}>
          Заголовок (обязательное поле, минимум 20, максимум 60 символов);
        </FormHelperText>
      </FormGroup>
      <FormGroup row>
        <TextField
          type="file"
          name="img"
          label="img"
          value={form.img}
          onChange={changeHandler}
          invalid
        />
        <FormHelperText style={{ marginBottom: 12 }} color="muted">
          Фото (обязательное поле, минимальные ширина/высота = 200px,
          максимальные 4000px).
        </FormHelperText>
      </FormGroup>
      <FormGroup row>
        <TextField
          name="description"
          type="text"
          label="description"
          variant="outlined"
          // error={error.errors && error.errors[0].param === "email"}
          // helperText={error.errors && error.errors[0].msg}
          fullWidth
          value={form.description}
          onChange={changeHandler}
          // inputRef={}
        />
        <FormHelperText style={{ marginBottom: 12 }} color="muted">
          Описание товара (не обязательное поле, максимум 200 символов);
        </FormHelperText>
      </FormGroup>
      <FormGroup row>
        <TextField
          name="price"
          type="number"
          label="price"
          variant="outlined"
          // error={error.errors && error.errors[0].param === "email"}
          // helperText={error.errors && error.errors[0].msg}
          value={form.price}
          onChange={changeHandler}
          style={{ width: "25%" }}
          // inputRef={}
        />
        <FormHelperText style={{ marginBottom: 12 }} color="muted">
          Цена (обязательное поле, положительное число, максимальное значение
          99999999.99$).
        </FormHelperText>
      </FormGroup>
      <FormGroup row>
        <TextField
          name="numberDaysUntilEndDiscount"
          type="number"
          label="numberDaysUntilEndDiscount"
          variant="outlined"
          // error={error.errors && error.errors[0].param === "email"}
          // helperText={error.errors && error.errors[0].msg}
          value={form.numberDaysUntilEndDiscount}
          onChange={changeHandler}
          style={{ width: "25%" }}
          // inputRef={}
        />
        <FormHelperText style={{ marginBottom: 12 }} color="muted">
          Дней до завершения акции
        </FormHelperText>
      </FormGroup>
      <FormGroup row>
        <Button variant="contained" color="primary" startIcon={<SaveIcon />}>
          Submit
        </Button>
      </FormGroup>
    </FormControl>
  );
};

const mapStateToProps = (state) => ({
  editingProduct: state.productsReducer.editingProduct,
});

export default connect(mapStateToProps, {
  actionPostCreateProduct,
  actionPatchProduct,
})(ProductForm);
