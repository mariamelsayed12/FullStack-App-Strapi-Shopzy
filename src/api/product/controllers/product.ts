import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::product.product", ({ strapi }) => ({
  
  // Custom PATCH method for updating a product
  async update(ctx) {
    try {
      const { id } = ctx.params; // Get the product ID
      const { data, files } = ctx.request.body; // Get request body
  
      // Ensure ID is valid
      if (!id) {
        return ctx.badRequest("Missing product ID");
      }
      // Check if product exists
      const existingProduct = await strapi.db.query("api::product.product").findOne({ where: { id } });
      if (!existingProduct) {
        return ctx.notFound("Product not found");
      }
      //  Update the product
      const updatedProduct = await strapi.entityService.update("api::product.product", id, {
        data: JSON.parse(data), // Parse JSON data
        files: files || undefined, // Attach files if they exist
      });
      return ctx.send({
        message: "Product updated successfully",
        data: updatedProduct,
      }, 200); //  Return 200 OK

    } catch (error) {
      return ctx.internalServerError("Something went wrong");
    }
  },

  //  Custom DELETE method (already implemented)
  async delete(ctx) {
    try {
      const { id } = ctx.params;
      
      // Use Strapi's delete service
      const entity = await strapi.db.query("api::product.product").delete({ where: { id } });

      if (!entity) {
        return ctx.notFound("Product not found"); // 404 if product is missing
      }

      return ctx.send({
        message: "Product deleted successfully",
        data: entity,  // Send the deleted product data
      }, 200); //  Return 200 OK instead of 204 No Content
    } catch (error) {
      return ctx.internalServerError("Something went wrong");
    }
  },
}));
