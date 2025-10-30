import { JsonWebTokenProvider } from "../gateways/TokenGateway/providers/JsonWebTokenProvider";
import { AuthenticateMiddleware } from "./AuthenticateMiddleware";

export function makeAuthenticated() {
  const middleware = new AuthenticateMiddleware({
    makeTokenGateway: () => {
      return new JsonWebTokenProvider();
    },
  });
  return middleware;
}
