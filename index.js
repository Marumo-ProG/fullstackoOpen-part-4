// const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");
// const PersonRouter = require("./controllers/Person");
// const config = require("./utils/config");
// const logger = require("./utils/logger");

// let app = express();

// app.use(morgan("tiny"));
// app.use(cors());
// app.use(express.json());
// app.use(express.static("build"));

// app.use("/api/persons", PersonRouter);

// let port = config.PORT;

// app.listen(port, logger.info(`server listening on port ${port}`));

const app = require("./app"); // The Express app
const config = require("./utils/config");
const logger = require("./utils/logger");

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
