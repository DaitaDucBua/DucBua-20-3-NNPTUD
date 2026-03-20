let inventoryModel = require('../schemas/inventories');
let productModel = require('../schemas/products');

module.exports = {
    // Get all inventories with product details
    GetAllInventories: async function () {
        try {
            return await inventoryModel.find({})
                .populate({ path: 'product', select: 'title price description' });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Get inventory by ID with product details
    GetInventoryById: async function (id) {
        try {
            return await inventoryModel.findById(id)
                .populate({ path: 'product', select: 'title price description category images' });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Create inventory (called when product is created)
    CreateInventory: async function (productId) {
        try {
            let newInventory = new inventoryModel({
                product: productId,
                stock: 0,
                reserved: 0,
                soldCount: 0
            });
            return await newInventory.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Add stock
    AddStock: async function (productId, quantity) {
        try {
            let inventory = await inventoryModel.findOne({ product: productId });
            if (!inventory) {
                throw new Error('Inventory not found');
            }
            inventory.stock += quantity;
            return await inventory.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Remove stock
    RemoveStock: async function (productId, quantity) {
        try {
            let inventory = await inventoryModel.findOne({ product: productId });
            if (!inventory) {
                throw new Error('Inventory not found');
            }
            if (inventory.stock < quantity) {
                throw new Error('Insufficient stock');
            }
            inventory.stock -= quantity;
            return await inventory.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Reservation - reduce stock and increase reserved
    Reservation: async function (productId, quantity) {
        try {
            let inventory = await inventoryModel.findOne({ product: productId });
            if (!inventory) {
                throw new Error('Inventory not found');
            }
            if (inventory.stock < quantity) {
                throw new Error('Insufficient stock for reservation');
            }
            inventory.stock -= quantity;
            inventory.reserved += quantity;
            return await inventory.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Sold - reduce reserved and increase soldCount
    Sold: async function (productId, quantity) {
        try {
            let inventory = await inventoryModel.findOne({ product: productId });
            if (!inventory) {
                throw new Error('Inventory not found');
            }
            if (inventory.reserved < quantity) {
                throw new Error('Insufficient reserved quantity');
            }
            inventory.reserved -= quantity;
            inventory.soldCount += quantity;
            return await inventory.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Get inventory by product ID
    GetInventoryByProductId: async function (productId) {
        try {
            return await inventoryModel.findOne({ product: productId })
                .populate({ path: 'product', select: 'title price description' });
        } catch (error) {
            throw new Error(error.message);
        }
    }
};
