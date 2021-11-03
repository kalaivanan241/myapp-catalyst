const Handler = require("./../../utils/Handler")

const tableName = "Collections"
const collection_segment = '7134000000011594'

exports.itemObj = (capp) => new Handler(capp, collection_segment,tableName );

exports.getValueFromDB = {
	byId: async (capp, id, fallback = undefined) => {
		const item = await this.getValueFromCatch(capp, id);
		if(!item)
		{
			const data = await capp.datastore().table(tableName).getRow(id);
			await this.persistToCache(capp, id, data);
			return data
		}
		return item;
	},
	all: async (capp, fallback = undefined) => {
		let items =await capp.datastore().table(tableName).getAllRows();
		if (!items) {
			return fallback;
		}
		return items;
	},
};

exports.persistToDB = async (capp, item) => {
	return await capp
		.datastore()
		.table(tableName)
		.insertRow(item);
};

exports.persistToCache = async (capp, urlCode, item) => {
	const cSegment = capp.cache().segment(collection_segment);
	await cSegment.put(urlCode, JSON.stringify(item));
};

exports.getValueFromCatch = async (capp, urlCode, fallback = undefined) => {
	const cSegment = capp.cache().segment(collection_segment);
	let item = await cSegment.getValue(urlCode).catch(() => null);
	if (item == null || item == undefined) {
		return fallback;
	}
	return JSON.parse(item);
};