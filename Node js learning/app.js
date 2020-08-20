const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoConnect = require("./utils/database").mongoConnect;
// const sequelize = require("./utils/database");

// const Product = require("./models/products");
const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");
// const Order = require("./models/order");
// const OrderItem = require("./models/order-item");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorsController = require("./controllers/error");

const app = express();

// app.engine('hbs',expressHbs({extname:'hbs',defaultLayout:'main-layout',layoutsDir:'views/layouts/'}));
// app.set("view engine", "hbs");
// app.set("views", "views");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
// we store the user in req object to use it during our different requests made
app.use((req, res, next) => {
  User.findById('5f3cd3e732f0c3ec66919e3a')
    .then((user) => {
      console.log(user)
      req.user = user;
      next();
    })
    .catch((error) => {
      console.log(error);
    });

});
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);

app.use(shopRoutes);   

app.use(errorsController.getError);

// //Making associations of different tables
// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// // cascade means products related to the user will be deleted when the user is deleted
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Product.belongsToMany(Cart, { through: CartItem });
// Cart.belongsToMany(Product, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

// sequelize
//   // .sync({force:true,})
//   .sync()
//   .then((result) => {
//     return User.findByPk(1);
//     // .log('result is ',result);
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({ name: "Chitesh", email: "test@test.com" });
//     }
//     // although Promise.resolve is not req as if you return a value in 'then' then it automatically
//     // gets wrapped in a promise
//     // just for understanding I have done this
//     // return user also works fine
//     return Promise.resolve(user);
//   })
//   .then((user) => {
//     return user.getCart().then((cart) => {
//       if (!cart) {
//         return user.createCart();
//       }
//       return cart;
//     });
//   })
//   .then((result) => {
//     app.listen(3000);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

mongoConnect(() => {
  app.listen(3000);
});
