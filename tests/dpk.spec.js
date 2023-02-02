import { deterministicPartitionKey } from "../src/dpk.js";

describe("test context for deterministicPartitionKey", () => {
  it("returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("returns has with Event without partitionKey", () => {
    const hash = deterministicPartitionKey({ test: "test" });

    expect(hash).not.toEqual("0");
    expect(hash).toEqual(
      "e713e2c89bc829e783a43a53583c0f8db2e9ad5f392f88d3a3be9776a5d6307ddaa4fb1d427c2390be1834bcf73646ddbbab8979eaf923e01376b3031ef9189d"
    );
  });

  it("returns has the exactly the same partitionKey when it was given in Event", () => {
    const hash = deterministicPartitionKey({ partitionKey: "potato" });

    expect(hash).not.toEqual("0");
    expect(hash).toEqual("potato");
  });

  it("returns a serialized object if partition key is different to string", () => {
    const hash = deterministicPartitionKey({ partitionKey: { key: "potato" } });

    expect(hash).not.toEqual("0");
    expect(hash).not.toEqual("potato");
    expect(hash).toEqual('{"key":"potato"}');
  });

  it("returns a serialized array if particion key is an Array ", () => {
    const hash = deterministicPartitionKey({ partitionKey: ["potato"] });

    expect(hash).not.toEqual("0");
    expect(hash).not.toEqual("potato");
    expect(hash).toEqual('["potato"]');
  });

  it("returns hash if  partitionKey array is greater than MAX_PARTITION_KEY_LENGTH", () => {
    const mockedArray = [...Array(260).keys()];
    const hash = deterministicPartitionKey({ partitionKey: mockedArray });

    expect(hash).not.toEqual("0");
    expect(hash).not.toEqual("potato");
    expect(hash).not.toEqual('["potato"]');
    expect(hash).toEqual(
      "f83d71ed86050f1bda4dc868a392f5291c709568b5471eb24435d2d01875b721e7d5d146ec6f97519e8f1afa5264e298335e38b495eec3b6210f64d02f3e4cbd"
    );
  });
});
