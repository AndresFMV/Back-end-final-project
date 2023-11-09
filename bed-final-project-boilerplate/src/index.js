import express from "express";
import * as Sentry from "@sentry/node";
import "dotenv/config";

import usersRouter from "./routes/users.js";
import loginRouter from "./routes/login.js";
import hostRouter from "./routes/hosts.js";
import amenityRouter from "./routes/amenities.js";
import propertyRouter from "./routes/properties.js";
import bookingRoutes from "./routes/bookings.js";
import reviewRoutes from "./routes/reviews.js";
import log from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import notFoundErrorHandler from "./middleware/notFoundErrorHandler.js";
import badRequestErrorHandler from "./middleware/badRequestErrorHandler.js";

const app = express();

// Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({
      tracing: true,
    }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({
      app,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
});

// Trace incoming requests
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Global middleware
app.use(express.json());
app.use(log);

// Resource routes
app.use("/users", usersRouter);
app.use("/hosts", hostRouter);
app.use("/amenities", amenityRouter);
app.use("/properties", propertyRouter);
app.use("/bookings", bookingRoutes)
app.use("/reviews", reviewRoutes);

// Login
app.use("/login", loginRouter);

// Trace errors
app.use(Sentry.Handlers.errorHandler());

// Error handlers
app.use(notFoundErrorHandler)
app.use(badRequestErrorHandler)
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
