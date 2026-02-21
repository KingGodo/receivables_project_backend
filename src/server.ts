import app from "./app";
import { env } from "./config/env";

const PORT = env.PORT || 5000;
const HOST = env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
