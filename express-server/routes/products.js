const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');

router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProductById);
router.post('/', controller.createProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;
