import express from "express";
import cors from "cors";
import sequelize from "./db/index.js";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
import orderRouter from "./routers/orderRouter.js";
import cartRouter from "./routers/cartRouter.js";
import errorHandler from "./middleware/errorHandler.js";
import "./models/Category.js";
import "./models/Order.js";
import "./models/OrderProduct.js";
import User from "./models/User.js";
import Cart from "./models/Cart.js";
import CartProduct from "./models/CartProduct.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";
import OrderProduct from "./models/OrderProduct.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON data

// Routers
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);
app.use("/cart", cartRouter);

// Global error handling middleware (should be added last)
app.use(errorHandler);

// Define model relationships
User.hasOne(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

Cart.belongsToMany(Product, { through: CartProduct, foreignKey: "cartId" });
Product.belongsToMany(Cart, { through: CartProduct, foreignKey: "productId" });

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Order.belongsToMany(Product, { through: OrderProduct, foreignKey: "orderId" });
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: "productId" });

// Start the server
app.listen(PORT, async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Database synchronization error:", error);
  }
});
