class Handler{
    constructor(capp, cacheSegmentKey,tableName)
    {
        this.capp = capp;
        this.cacheSegmentKey = cacheSegmentKey;
        this.tableName = tableName;
    }

    async persistToCache(id, item) {
            const cSegment = this.capp.cache().segment(this.cacheSegmentKey);
            await cSegment.put(id, JSON.stringify(item));
    };
        
    async getValueFromCatch ( id, fallback = undefined) {
            const cSegment = this.capp.cache().segment(this.cacheSegmentKey);
            let item = await cSegment.getValue(id).catch(() => null);
            if (item == null || item == undefined) {
                return fallback;
            }
            return JSON.parse(item);
    };

    async getItemById(id)
    {
        const item = await this.getValueFromCatch(d);
		if(!item)
		{
			const data = await this.capp.datastore().table(this.tableName).getRow(id);
			await this.persistToCache(id, data);
			return data
		}
		return item;
    }

    async getItems(fallback=undefined)
    {
        let items =await this.capp.datastore().table(this.tableName).getAllRows();
		if (!items) {
			return fallback;
		}
		return items;
    }
    
}

module.exports = Handler;