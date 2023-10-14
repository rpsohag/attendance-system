import mongoose from "mongoose";

const mongoDBConnection = (connectionString) => {
  return new Promise((resolve, reject) => {
    try {
      mongoose
        .connect(connectionString, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then((res) => {
          console.log(
            `Connected Database Name: ${res.connection.db.databaseName}`
          );
          console.log(`Connected Database Port: ${res.connection.port}`);
          resolve();
        })
        .catch((e) => {
          reject(e);
        });
      mongoose.connection.on("connected", () => {
        console.log("MongoDB Database Connection Is Working!...");
      });
    } catch (error) {
      reject(error);
    }
  });
};

export default mongoDBConnection;
