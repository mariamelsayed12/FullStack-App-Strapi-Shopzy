/**
 * product router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::product.product", {
  config: {
    update: {
      policies: [], // Apply policies if needed
      middlewares: [], // Add middlewares if required
    },
  },
});
