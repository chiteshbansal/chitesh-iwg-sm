const Product = require("../models/products");
// const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prds: products,
        docTitle: "Shop",
        path: "/products",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      console.log(product);
      res.render("shop/product-detail", {
        product: product,
        docTitle: product.title,
        path: "/products",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prds: products,
        docTitle: "HomePage",
        path: "/",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// exports.getCart = (req, res, next) => {
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts();
//     })
//     .then((products) => {
//       res.render("shop/cart", {
//         path: "/cart",
//         docTitle: "Your Cart",
//         products: products,
//         totalPrice: Cart.totalPrice,
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   //   Cart.getCart((Cart) => {
//   //     Product.fetchAll((products) => {
//   //       const cartProducts = [];
//   //       for (product of products) {
//   //         const cartProductData = Cart.products.find((prod) => {
//   //           return prod.id == product.id;
//   //         });
//   //         if (cartProductData) {
//   //           cartProducts.push({ productData: product, qty: cartProductData.qty });
//   //         }
//   //       }
//   //       res.render("shop/cart", {
//   //         path: "/cart",
//   //         docTitle: "Your Cart",
//   //         products: cartProducts,
//   //         totalPrice: Cart.totalPrice,
//   //       });
//   //     });
//   //   });
// };
// exports.postCart = (req, res, next) => {
//   const productId = req.body.productId;
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts({ where: { id: productId } });
//     })
//     .then((products) => {
//       let product;
//       if (products.length > 0) {
//         product = products[0];
//       }
//       let newQuantity = 1;
//       if (product) {
//         //...increase the qty
//         let oldQty = product.cartItem.quantity;
//         return fetchedCart.addProduct(product, {
//           through: { quantity: oldQty + 1 },
//         });
//       }

//       return Product.findByPk(productId)
//         .then((product) => {
//           return fetchedCart.addProduct(product, {
//             through: { quantity: newQuantity },
//           });
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     })
//     .then(() => {
//       res.redirect("/cart");
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// exports.postCartDeleteItem = (req, res, next) => {
//   const prodId = req.body.productId;
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts({ where: { id: prodId } });
//     })
//     .then((products) => {
//       const product = products[0];
//       return product.cartItem.destroy();
//     })
//     .then(() => {
//       res.redirect("/cart");
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   // Product.findById(prodId, (product) => {
//   //   Cart.deleteProduct(prodId, product.price);
//   //   res.redirect("/cart");
//   // });
// };

// exports.postOrder = (req, res, next) => {
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then((products) => {
//       return req.user
//         .createOrder()
//         .then((order) => {
//           return order.addProducts(
//             products.map((product) => {
//               product.orderItem = { quantity: product.cartItem.quantity };
//               return product;
//             })
//           );
//         })
//         .then((result) => {
//           return fetchedCart.setProducts(null);
//         })
//         .then((result) => {
//           res.redirect("/orders");
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     path: "/checkout",
//     docTitle: "CheckoutPage",
//   });
// };

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders({include:['products']})
//     .then((orders) => {
//       console.log(orders);
//       res.render("shop/orders", {
//         path: "/orders",
//         orders:orders,
//         docTitle: "My Orders Page",
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
