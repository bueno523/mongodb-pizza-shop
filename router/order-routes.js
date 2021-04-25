var express = require('express'),
router = express.Router(),
orderCtrl = require('../controllers/order-controller.js');

router.post('/', orderCtrl.createOrder);
router.delete('/', orderCtrl.deleteOrder);
router.get('/', orderCtrl.getOrders);

module.exports = router;