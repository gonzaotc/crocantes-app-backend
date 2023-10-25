import config from "./config";
import app from "./server";

app.listen(config.port, () => {
  console.log(`running on http://localhost:${config.port}`);
});
