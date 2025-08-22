import arcjet, { shield, fixedWindow } from "@arcjet/next";

export const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Set your Arcjet site key here
  rules: [
    shield({ mode: "LIVE" }),      // Web Application Firewall
    fixedWindow({
      mode: "LIVE",
      window: "1h",
      max: 69,
      //characteristics: ["ip.src"],
    }),
    fixedWindow({
      mode: "DRY_RUN",
      characteristics: ["ip.src"],
      window: "1h",
      max: 600,
    }),
  ],
});