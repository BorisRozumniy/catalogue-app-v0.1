const {Router} = require('express')
const config = require('config')
const Product = require('../models/Product')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {
    const {
      img,
      title,
      description,
      price,
      numberDaysUntilEndDiscount,
    } = req.body

    const existing = await Product.findOne({ title })

    if (existing) {
      return res.status(400).json({message: 'Продукт с таким названием уже существует'})
    }

    const product = new Product({
      img,
      title,
      description,
      price,
      numberDaysUntilEndDiscount,
      owner: req.user.userId
    })

    await product.save()

    res.status(201).json({ product })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user.userId })
    res.json(products)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.userId)
    res.json(product)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.json({
      message: `Продукт ${deletedProduct.title} успешно удален`,
      deletedProduct
    })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
  }
})

module.exports = router