import { HealthController } from "./HealthController";

export function makeHealthController() {
  const controller = new HealthController();
  return controller;
}
