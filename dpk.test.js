const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
	test("returns correct partition key when event object has partitionKey property", () => {
		const eventObject = { partitionKey: "12345" };
		const result = deterministicPartitionKey(eventObject);
		expect(result).toBe("12345");
	});

	test("returns correct partition key when event object does not have partitionKey property", () => {
		const eventObject = { foo: "bar" };
		const result = deterministicPartitionKey(eventObject);
		expect(result).toBe(
			crypto
				.createHash("sha3-512")
				.update(JSON.stringify(eventObject))
				.digest("hex")
		);
	});

	test("returns trivial partition key when event object is falsy", () => {
		const result = deterministicPartitionKey(null);
		expect(result).toBe("0");
	});

	test("returns hashed partition key when partition key is longer than max length", () => {
		const longKey = "a".repeat(300);
		const eventObject = { partitionKey: longKey };
		const result = deterministicPartitionKey(eventObject);
		expect(result).toBe(
			crypto.createHash("sha3-512").update(longKey).digest("hex")
		);
	});

	test("returns hashed partition key when partition key is not a string", () => {
		const eventObject = { partitionKey: 12345 };
		const result = deterministicPartitionKey(eventObject);
		expect(result).toBe("12345");
	});
});
