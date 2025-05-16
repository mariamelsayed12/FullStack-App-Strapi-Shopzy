export default {
    routes: [
      {
        method: "PATCH",
        path: "/products/:id",
        handler: "product.update",
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };
  