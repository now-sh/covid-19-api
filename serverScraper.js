<<<<<<< HEAD
const { scraper: { executeScraper, executeScraperNYTData, excecuteScraperAppleData, excecuteScraperGov, excecuteScraperVaccine, excecuteScraperInfluenza }, config } = require('./routes/instances');
=======
const { scraper: { executeScraper, executeScraperNYTData, excecuteScraperAppleData, excecuteScraperGov, excecuteScraperVaccine, executeScraperTherapeutics, excecuteScraperInfluenza },
	config } = require('./routes/instances');
>>>>>>> 744a95cc2eb511427e68cbe00c9224cd47873883

executeScraper();
executeScraperNYTData();
excecuteScraperAppleData();
excecuteScraperGov();
excecuteScraperInfluenza();
excecuteScraperVaccine();
<<<<<<< HEAD
=======
executeScraperTherapeutics();
>>>>>>> 744a95cc2eb511427e68cbe00c9224cd47873883

// Update Worldometer and Johns Hopkins data every 10 minutes
setInterval(executeScraper, config.worldometersInterval);
// Update NYT data every hour
setInterval(executeScraperNYTData, config.nytInterval);
// Update Apple data every  24 hours
setInterval(excecuteScraperAppleData, config.appleInterval);
// Update Government data every  24 hours
<<<<<<< HEAD
setInterval(excecuteScraperGov, config.gov_interval);
// Update vaccine data every  24 hours
setInterval(excecuteScraperVaccine, config.vaccine_interval);
=======
setInterval(excecuteScraperGov, config.govInterval);
// Update vaccine data every  24 hours
setInterval(excecuteScraperVaccine, config.vaccineInterval);
// Update therapeutics data every 24 hours
setInterval(executeScraperTherapeutics, config.therapeuticsInterval);
>>>>>>> 744a95cc2eb511427e68cbe00c9224cd47873883
// Update CDC Influenza data every  24 hours
setInterval(excecuteScraperInfluenza, config.cdcInterval);
