import React, { useState, useContext, useEffect } from 'react';
import { connect } from "react-redux";
import { Col, Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import backendApiUrls from "../../routes/backendUrls";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from '../../context/AuthContext';
import { actionSetEditingProduct, actionPutProduct } from '../../redux/actions/products';

const ProductForm = ({
  editingProduct,
  toggleModal,
  actionPutProduct,
}) => {
  const {
    title,
    img,
    description,
    price,
    numberDaysUntilEndDiscount,
  } = editingProduct
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const [form, setForm] = useState({
    title,
    img,
    description,
    price,
    numberDaysUntilEndDiscount,
  });

  useEffect(() => {
    title && setForm(editingProduct)
  }, [editingProduct])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  
  const submitHandler = async e => {
    e.preventDefault()
    actionSetEditingProduct({})
    toggleModal()
    if (editingProduct._id) {
      actionPutProduct(form, {
        Authorization: `Bearer ${auth.token}`
      })
    } else {
      try {
        await request(backendApiUrls.generate, 'POST', {...form}, {
          Authorization: `Bearer ${auth.token}`
        })
      } catch (e) {
        console.log('---', e)
      }
    }
  };
  
  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <FormGroup row>
          <Label for="title" sm={2}>Title</Label>
          <Col sm={10}>
            <Input
              valid
              type="title"
              name="title"
              id="title"
              value={form.title}
              placeholder="with a placeholder"
              onChange={changeHandler}
            />
            <FormText>Заголовок (обязательное поле, минимум 20, максимум 60 символов);</FormText>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="img" sm={2}>Foto</Label>
          <Col sm={10}>
            <Input
              type="file"
              name="img"
              id="img"
              value={form.img}
              onChange={changeHandler}
              invalid
            />
            <FormText color="muted">
              Фото (обязательное поле, минимальные ширина/высота = 200px, максимальные 4000px).
            </FormText>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="description" sm={2}>Description</Label>
          <Col sm={10}>
            <Input
              type="textarea"
              name="description"
              id="description"
              value={form.description}
              onChange={changeHandler}
            />
            <FormText color="muted">
              Описание товара (не обязательное поле, максимум 200 символов);
            </FormText>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="price" sm={2}>Price</Label>
          <Col sm={10}>
            <Input
              type="number"
              name="price"
              id="price"
              value={form.price}
              onChange={changeHandler}
              invalid
            />
            <FormText color="muted">
              Цена (обязательное поле, положительное число, максимальное значение 99999999.99$).
            </FormText>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="numberDaysUntilEndDiscount" sm={2}>Скидка</Label>
          <Col sm={10}>
            <Input
              type="number"
              name="numberDaysUntilEndDiscount"
              id="numberDaysUntilEndDiscount"
              value={form.numberDaysUntilEndDiscount}
              onChange={changeHandler}
              invalid
            />
            <FormText color="muted">
              Дней до завершения акции
            </FormText>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col className="mt-3">
            <Button size="lg" color="success" className="w-100">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  editingProduct: state.productsReducer.editingProduct,
});

export default connect(
  mapStateToProps,
  { actionSetEditingProduct, actionPutProduct }
)(ProductForm);
