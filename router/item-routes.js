var express = require('express'),
router = express.Router(),
itemCtrl = require('../controllers/item-controller');

router.post('/', itemCtrl.createItem);
router.delete('/', itemCtrl.deleteItem);
router.get('/', itemCtrl.getItems);
router.put('/', itemCtrl.updateItem);

module.exports = router;