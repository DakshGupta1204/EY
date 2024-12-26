# EY
# FOLDER STRUCTURE
my-backend/
├── src/
│   ├── config/            # Configuration files
│   │   ├── env.ts
│   │   ├── logger.ts
│   ├── controllers/       # Controllers for routes
│   │   ├── userController.ts
│   ├── middlewares/       # Custom middlewares
│   │   ├── errorHandler.ts
│   │   ├── requestLogger.ts
│   ├── models/            # Models or database schemas
│   │   ├── userModel.ts
│   ├── routes/            # API route definitions
│   │   ├── userRoutes.ts
│   ├── services/          # Business logic and reusable services
│   │   ├── userService.ts
│   ├── utils/             # Utility functions
│   │   ├── validate.ts
│   ├── app.ts             # Express app configuration
│   ├── server.ts          # Main server entry point
├── dist/                  # Compiled JavaScript files
├── .env                   # Environment variables
├── .eslintrc.json         # ESLint configuration
├── .gitignore             # Git ignore file
├── package.json
├── tsconfig.json
