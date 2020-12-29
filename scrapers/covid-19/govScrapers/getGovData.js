const canadaData = require('./getCanada');
const italyData = require('./getItaly');
const austriaData = require('./getAustria');
const switzerlandData = require('./getSwitzerland');
const nigeriaData = require('./getNigeria');
const indiaData = require('./getIndia');
const newZealandData = require('./getNewZealand');
const southAfricaData = require('./getSouthAfrica');
const ukData = require('./getUK');
const israelData = require('./getIsrael');
<<<<<<< HEAD
const mexicoData = require('./getMexico');
=======
const vietnamData = require('./getVietnam');
const indonesiaData = require('./getIndonesia');
const nameUtils = require('../../../utils/nameUtils');
>>>>>>> 744a95cc2eb511427e68cbe00c9224cd47873883

const logger = require('../../../utils/logger');

/**
 * Set government data in redis by calling individual country scrapers
 * @param 	{string} 	keys	 Redis keys
 * @param 	{Object} 	redis 	 Redis instance
 */
const govData = async (keys, redis) => {
	try {
		const _resolveData = async (obj) => {
			const { country, fn } = obj;
			const countryData = await fn();
<<<<<<< HEAD
			// If no data is returned, serve stale data instead of an error
			// if (countryData === null) {
			// 	const redisGovData = JSON.parse(await redis.get(keys.gov_countries));
			// 	countryData = redisGovData[country];
			// }
			data[country] = countryData;
=======

			if (countryData) {
				const standardizedCountryName = nameUtils.getCountryData(country.trim()).country;
				await redis.hset(keys.gov_countries, standardizedCountryName, JSON.stringify(countryData));
			} else {
				logger.info(`${country} scraper has failed.`);
			}
>>>>>>> 744a95cc2eb511427e68cbe00c9224cd47873883
		};

		await Promise.all([
			{ country: 'South Africa', fn: southAfricaData },
			{ country: 'Canada', fn: canadaData },
			{ country: 'Italy', fn: italyData },
			{ country: 'Austria', fn: austriaData },
			{ country: 'Switzerland', fn: switzerlandData },
			{ country: 'Nigeria', fn: nigeriaData },
			{ country: 'India', fn: indiaData },
			{ country: 'New Zealand', fn: newZealandData },
			{ country: 'UK', fn: ukData },
<<<<<<< HEAD
			{ country: 'Israel', fn: israelData },
			{ country: 'Mexico', fn: mexicoData }
=======
			{ country: 'Indonesia', fn: indonesiaData },
			{ country: 'Israel', fn: israelData },
			{ country: 'Vietnam', fn: vietnamData }
>>>>>>> 744a95cc2eb511427e68cbe00c9224cd47873883
		].map(_resolveData));

		logger.info(`Updated gov data: ${(await redis.hkeys(keys.gov_countries)).length} government sources`);
	} catch (err) {
		logger.err('Error: Requesting Gov data failed!', err);
	}
};

module.exports = govData;
