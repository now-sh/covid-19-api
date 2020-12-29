const axios = require('axios');
<<<<<<< HEAD
const csv = require('csvtojson');
const cheerio = require('cheerio');
const logger = require('../../utils/logger');

const months = {
	January: '01',
	February: '02',
	March: '03',
	Arpril: '04',
	May: '05',
	June: '06',
	July: '07',
	August: '08',
	September: '09',
	October: '10',
	November: '11',
	December: '12'
};
=======
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const csv = require('csvtojson');
const logger = require('../../utils/logger');
const { phaseData } = require('../../utils/RAPS');

axiosCookieJarSupport(axios);
>>>>>>> 744a95cc2eb511427e68cbe00c9224cd47873883

const cleanData = (data) => {
	const htmlRegex = /<(?:.|\n)*?>/gm;
	const separatorRegex = /;&nbsp;|;/;
	const listify = (attribute) => attribute.split(separatorRegex).map((sponsor) => sponsor.replace(htmlRegex, '').trim());
	return data.map((trial) => ({
		candidate: trial.Candidate,
<<<<<<< HEAD
		sponsors: listify(trial.Sponsor),
		details: trial['Study Design & Details'].replace(htmlRegex, ''),
		trialPhase: trial['Trial Phase'],
		institutions: listify(trial.Institution),
		funding: listify(trial.Funding)
	}));
};

const phaseData = (data) => {
	const result = {};
	for (var i = 0; i < data.length; i++) {
		if (!result[data[i]['Trial Phase']]) {
			result[data[i]['Trial Phase']] = 0;
		}
		++result[data[i]['Trial Phase']];
	}
	return Object.keys(result).map((key) => ({
		phase: key,
		candidates: result[key].toString()
=======
		mechanism: trial.Mechanism,
		sponsors: listify(trial.Sponsor),
		details: trial.Details.replace(htmlRegex, ''),
		trialPhase: trial['Trial Phase'],
		institutions: listify(trial.Institution)
>>>>>>> 744a95cc2eb511427e68cbe00c9224cd47873883
	}));
};

/**
 * Fills redis with vaccine data
 * @param 	{string} 	keys	 Redis keys
 * @param 	{Object} 	redis 	 Redis instance
 */
const getVaccineData = async (keys, redis) => {
<<<<<<< HEAD
	let day, month, year;
	try {
		const html = cheerio.load((await axios.get('https://www.raps.org/news-and-articles/news-articles/2020/3/covid-19-vaccine-tracker')).data);
		const date = html(`.small:first-of-type`).text().split(' ').slice(1, 4);
		[day, month, year] = date;
	} catch (err) {
		logger.err('Error: Requesting vaccine data failed!', err);
	}
	try {
		const { data } = await axios.get(`https://www.raps.org/RAPS/media/news-images/data/${year}${months[month]}${day}-vax-tracker-chart-craven.csv`);
		const parsedData = await csv().fromString(data);
		redis.set(keys.vaccine, JSON.stringify({
			source: 'https://www.raps.org/news-and-articles/news-articles/2020/3/covid-19-vaccine-tracker',
			totalCandidates: parsedData.length.toString(),
			phases: phaseData(parsedData),
			data: cleanData(parsedData)
		}));
	} catch (err) {
		logger.err('Error: Requesting vaccine data failed!', err);
	}
=======
	const dateObj = new Date();
	const month = dateObj.getUTCMonth() + 1;
	const year = dateObj.getUTCFullYear();

	let dataExists = false;
	let counter = 0;
	do {
		try {
			const dateString = `${year}${month}${counter.toString().padStart(2, '0')}`;
			const cookieJar = new tough.CookieJar();
			const { data } = await axios.get(`https://www.raps.org/RAPS/media/news-images/data/${dateString}-vax-tracker-Craven.csv`, {
				jar: cookieJar,
				withCredentials: true,
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
					'Accept-Language': 'en-us',
					'Content-Language': 'en-us'
				}
			});
			const parsedData = await csv().fromString(data);
			redis.set(keys.vaccine, JSON.stringify({
				source: 'https://www.raps.org/news-and-articles/news-articles/2020/3/covid-19-vaccine-tracker',
				totalCandidates: parsedData.length.toString(),
				phases: phaseData(parsedData),
				data: cleanData(parsedData)
			}));
			dataExists = true;
		} catch (err) {
			logger.err('Error: Requesting vaccine CSV data failed!', err);
		}
		counter++;
	} while (dataExists === false && counter < 30);
>>>>>>> 744a95cc2eb511427e68cbe00c9224cd47873883
};

module.exports = getVaccineData;
