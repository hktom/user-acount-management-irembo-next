import { passwordSame, passwordCheck } from "@/config/redux/auth/helpers";

test("password are the same", () => {
  expect(passwordSame("qwert", "qwerty")).toBe(false);
});
