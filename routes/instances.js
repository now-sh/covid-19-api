// NODE PACKAGES
const Redis = require('ioredis');

// LOCAL FUNCTIONS
const logger = require('../utils/logger');
const getWorldometerPage = require('../scrapers/covid-19/getWorldometers');
const getStates = require('../scrapers/covid-19/getStates');
const jhuLocations = require('../scrapers/covid-19/jhuLocations');
const historical = require('../scrapers/covid-19/historical');
const nytData = require('../scrapers/covid-19/nytData');
const appleData = require('../scrapers/covid-19/appleMobilityData');
const govData = require('../scrapers/covid-19/govScrapers/getGovData');
const getVaccineData = require('../scrapers/covid-19/getVaccine');
<<<<<<< HEAD
=======
const getTherapeuticsData = require('../scrapers/covid-19/getTherapeutics');
>>>>>>> 744a95cc2eb511427e68cbe00c9224cd47873883
const getCDCDInfluenzaData = require('../scrapers/influenza/getCDC');

// KEYS
const { config, keys, port } = require('../config');

const redis = new Redis(config.redis.host, {
	password: config.redis.password,
	port: config.redis.port
});

module.exports = {
	redis,
	port,
	keys,
	config,
	scraper: {
		getWorldometerPage,
		getStates,
		jhuLocations,
		historical,
		nytData,
		appleData,
		executeScraper: async () => {
			await Promise.all([
				getWorldometerPage(keys, redis),
				getStates(keys, redis),
				jhuLocations.jhudataV2(keys, redis),
				historical.historicalV2(keys, redis),
				historical.getHistoricalUSADataV2(keys, redis)
			]);
			logger.info('Finished JHU and worldometers scraping!');
		},
		executeScraperNYTData: async () => {
			await nytData(keys, redis);
			logger.info('Finished NYT scraping!');
		},
		excecuteScraperAppleData: async () => {
			await appleData(keys, redis);
			logger.info('Finished Apple scraping!');
		},
		excecuteScraperGov: async () => {
			await govData(keys, redis);
			logger.info('Finished Government scraping!');
		},
		excecuteScraperVaccine: async () => {
			await getVaccineData(keys, redis);
			logger.info('Finished Vaccine scraping!');
		},
<<<<<<< HEAD
=======
		executeScraperTherapeutics: async () => {
			await getTherapeuticsData(keys, redis);
			logger.info('Finished Therapeutics scraping!');
		},
>>>>>>> 744a95cc2eb511427e68cbe00c9224cd47873883
		excecuteScraperInfluenza: async () => {
			await getCDCDInfluenzaData(keys, redis);
			logger.info('Finished CDC Influenza scraping!');
		}
	}
};
