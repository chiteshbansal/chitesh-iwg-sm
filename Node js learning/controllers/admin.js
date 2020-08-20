const Product = require("../models/products");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    docTitle: "Add-product",
    path: "/admin/add-product",
    editing: false,
  });
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        res.redirect("/");
      }
      res.render("admin/edit-product", {
        docTitle: "Edit-product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const UpdateProduct = new Product(
    title,
    price,
    description,
    imageUrl,
    prodId
  );
  UpdateProduct.save()
    .then((result) => {
      console.log("updated Product");
      res.redirect("/admin/products");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const product = new Product(title, price, description, imageUrl, null);
  product
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.destroy({where:{
  //   id:prodId,
  // }})
  //   .then((result) => {
  //     res.redirect("/admin/products");
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // Product.findByPk(prodId)
  //   .then((product) => {
  //     return product.destroy();
  //   })
  //   .then((result) => {
  //     res.redirect("/admin/products");
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.redirect("/admin/products");
  //   });

  Product.deleteById(prodId)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((error) => {
      console.log(error);
      res.redirect('/admin/products');
    });
};
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prds: products,
        docTitle: "Admin Products ",
        path: "/admin/products",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
