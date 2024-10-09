import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
const PORT = process.env.PORT || 3000;



const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Hello World',
        version: '1.0.0',
      },
      components: {
        schemas: {
            User: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'מזהה ייחודי של המשתמש'
                    },
                    name: {
                        type: 'string',
                        description: 'שם המשתמש'
                    },
                    email: {
                        type: 'string',
                        description: 'דוא"ל המשתמש'
                    },
                    role: {
                        type: 'string',
                        enum: ['admin', 'user', 'moderator'],
                        description: 'התפקיד של המשתמש'
                    }
                }
            }
        }
    },
      servers:[{
        url: `http://localhost:${PORT}`,
        }
      ]
    },
    apis: ['./src/routes/*.ts'], // files containing annotations as above
  };
  
const openapiSpecification = swaggerJsDoc(options);

export default (app:any) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
};
