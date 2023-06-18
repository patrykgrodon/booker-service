import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterEach, expect, vi } from "vitest";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

vi.mock("modules/auth/hooks/useFirebaseAuthState", async () => {
  const actual = (await vi.importActual(
    "modules/auth/hooks/useFirebaseAuthState"
  )) as any;
  return {
    ...actual,
    default: () => ({ isCheckingAuth: false, userInfo: null } as any),
  };
});

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
