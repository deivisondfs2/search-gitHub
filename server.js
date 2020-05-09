const app = require("./src/app");
const config = require("./src/lib/config");

const port = config.get("PORT");

app.listen(port, () => {
  // Onboarding.trigger();
  process.stdout.write(`Point your browser to: http://localhost:${port}\n`);
});
