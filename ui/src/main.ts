import { createApp } from "vue"
import App from "./App.vue"

export let ready: Promise<void>;

async function bootstrap() {
  if (import.meta.env.DEV) {
    try {
      await fetch("http://localhost:8000/dev/login", { credentials: "include" });
      console.log("✅ Dev login set");
    } catch (err) {
      console.error("❌ Dev login failed", err);
    }
  }
  createApp(App).mount("#app");
}

ready = bootstrap();
