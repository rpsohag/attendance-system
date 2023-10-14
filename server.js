import http from "http";
import app from "./app/app.js";
import mongoDBConnection from "./database/config.js";

const server = http.createServer(app);
const PORT = process.env.PORT || 5050;

mongoDBConnection(process.env.MONGODB_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Application server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
