import express from "express";
import cors from "cors"; // CORS paketini ekleyin
import sequelize from "./db/index.js";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
import orderRouter from "./routers/orderRouter.js";
import cartRouter from "./routers/cartRouter.js";
import "./models/Category.js";
import "./models/Order.js";
import "./models/OrderProduct.js";
import User from "./models/User.js";
import Cart from "./models/Cart.js";
import CartProduct from "./models/CartProduct.js";
import Product from "./models/Product.js"; // Product modelini içe aktarın

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // CORS'u etkinleştir
app.use(express.json()); // Gelen JSON verilerini parse etmek için

// Routers
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);
app.use("/cart", cartRouter);

// İlişkileri tanımlama
User.hasOne(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

Cart.belongsToMany(Product, { through: CartProduct, foreignKey: "cartId" });
Product.belongsToMany(Cart, { through: CartProduct, foreignKey: "productId" });

// Sunucuyu dinlemeye başlama
app.listen(PORT, async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
  } catch (error) {
    console.error("Veritabanı senkronizasyon hatası:", error);
  }
});
