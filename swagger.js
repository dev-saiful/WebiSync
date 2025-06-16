import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WebinarJam to ActiveCampagain",
      version: "1.0.0",
      description: "API documentation for Automation Node.js project",
    },
  },
  apis: ["./routes.js"], // 👈 path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
