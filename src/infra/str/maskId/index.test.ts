import { maskId } from ".";

describe("maskId()", () => {
  it("should mask id", () => {
    expect(maskId("123456789")).toBe("123456");
  });
})