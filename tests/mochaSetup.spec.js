<<<<<<< HEAD
const { scraper: { executeScraper, executeScraperNYTData, excecuteScraperAppleData, excecuteScraperGov, excecuteScraperInfluenza, excecuteScraperVaccine }, redis } = require('../routes/instances');
=======
const { scraper: { executeScraper, executeScraperNYTData, excecuteScraperAppleData, excecuteScraperGov, excecuteScraperInfluenza },
	redis } = require('../routes/instances');
>>>>>>> 744a95cc2eb511427e68cbe00c9224cd47873883
const logger = require('../utils/logger');

const [arg] = process.argv[5].split('/').slice(-1);
const argValue = arg.substring(arg.indexOf('_') + 1, arg.indexOf('.'));

const mapArgToScraper = {
	worldometers: executeScraper,
	jhucsse: executeScraper,
	historical: executeScraper,
	nyt: executeScraperNYTData,
	apple: excecuteScraperAppleData,
	gov: excecuteScraperGov,
	influenza: excecuteScraperInfluenza
};

// eslint-disable-next-line
before(async () => {
	await redis.flushall();
	logger.info('Finished flushing all data from redis.');
<<<<<<< HEAD

	await executeScraper();
	await executeScraperNYTData();
	await excecuteScraperAppleData();
	await excecuteScraperGov();
	await excecuteScraperInfluenza();
	await excecuteScraperVaccine();
	logger.info('Scraping all data finished.');
=======
	if (argValue in mapArgToScraper) {
		await mapArgToScraper[argValue]();
	} else {
		await executeScraper();
		await executeScraperNYTData();
		await excecuteScraperAppleData();
		await excecuteScraperGov();
		await excecuteScraperInfluenza();
		logger.info('Scraping all data finished.');
	}
>>>>>>> 744a95cc2eb511427e68cbe00c9224cd47873883
});
