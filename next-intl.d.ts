import en from "./messages/en.json";
import { LOCALES } from "./src/lib/site";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof LOCALES)[number];
    Messages: typeof en;
  }
}
