import { app } from "./app.js";
import connectDatabase from "./Database/database.js";

connectDatabase();

console.log(process.env.PORT);
console.log(process.env.HOST_NAME);

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port http://${process.env.HOST_NAME}:${process.env.PORT} in ${process.env.NODE_ENV} Mode`
  );
});
