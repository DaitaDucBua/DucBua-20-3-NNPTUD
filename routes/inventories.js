var express = require('express');
var router = express.Router();
let inventoryController = require('../controllers/inventories');

// Get all inventories
router.get('/', async function (req, res, next) {
    try {
        let result = await inventoryController.GetAllInventories();
        res.status(200).json({
            success: true,
            data: result,
            message: 'Get all inventories successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get inventory by ID
router.get('/:id', async function (req, res, next) {
    try {
        let result = await inventoryController.GetInventoryById(req.params.id);
        if (result) {
            res.status(200).json({
                success: true,
                data: result,
                message: 'Get inventory successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Inventory not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Add stock
router.post('/add-stock', async function (req, res, next) {
    try {
        const { product, quantity } = req.body;
        if (!product || !quantity || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Product ID and quantity (>0) are required'
            });
        }
        let result = await inventoryController.AddStock(product, quantity);
        res.status(200).json({
            success: true,
            data: result,
            message: `Added ${quantity} units to stock`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Remove stock
router.post('/remove-stock', async function (req, res, next) {
    try {
        const { product, quantity } = req.body;
        if (!product || !quantity || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Product ID and quantity (>0) are required'
            });
        }
        let result = await inventoryController.RemoveStock(product, quantity);
        res.status(200).json({
            success: true,
            data: result,
            message: `Removed ${quantity} units from stock`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Reservation
router.post('/reservation', async function (req, res, next) {
    try {
        const { product, quantity } = req.body;
        if (!product || !quantity || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Product ID and quantity (>0) are required'
            });
        }
        let result = await inventoryController.Reservation(product, quantity);
        res.status(200).json({
            success: true,
            data: result,
            message: `Reserved ${quantity} units successfully`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Sold
router.post('/sold', async function (req, res, next) {
    try {
        const { product, quantity } = req.body;
        if (!product || !quantity || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Product ID and quantity (>0) are required'
            });
        }
        let result = await inventoryController.Sold(product, quantity);
        res.status(200).json({
            success: true,
            data: result,
            message: `Marked ${quantity} units as sold`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
