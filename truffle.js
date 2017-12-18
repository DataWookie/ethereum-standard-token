module.exports = {
	networks: {
		development: {
			host: "localhost",
			port: 8545,
			network_id: "*",            // Match any network
			gas: 4000000
		},
		live: {
			host: "localhost",
			port: 8546,
			network_id: 1               // Ethereum public network
		}
	}
};
