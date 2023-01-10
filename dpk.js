const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (eventObject) => {
	if (!eventObject) {
		return TRIVIAL_PARTITION_KEY;
	}

	let partitionKey = eventObject.partitionKey;

	if (!partitionKey) {
		partitionKey = crypto
			.createHash("sha3-512")
			.update(JSON.stringify(eventObject))
			.digest("hex");
	}

	if (typeof partitionKey !== "string") {
		partitionKey = JSON.stringify(partitionKey);
	}

	if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
		partitionKey = crypto
			.createHash("sha3-512")
			.update(partitionKey)
			.digest("hex");
	}

	return partitionKey;
};
