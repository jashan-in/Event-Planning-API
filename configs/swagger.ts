import swaggerUi from "swagger-ui-express";
import { Application } from "express";
import { generateSwaggerSpec } from "./swaggerOptions";

const setupSwagger = (app: Application): void => {
    const specs: object = generateSwaggerSpec();
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

export default setupSwagger;
