// API Features Class..
class ApiFeatures {
    // Constructor Method..
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    // Item's Searching.. DB keys checking with results..
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        } : {};

        // console.log(keyword);
        this.query = this.query.find({ ...keyword });
        return this;
    }

    // Filtering.. To lower then and gretter then filter..
    filter() {
        const queryCopy = { ...this.queryStr };
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(key => delete queryCopy[key]);

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`); 
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    // Pagination Logic..
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        // Skip items to start for the next page to start from last of before page..
        const skip = resultPerPage * (currentPage - 1);
        // Make mongoose query here to limit and skip for next page..
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
};

module.exports = ApiFeatures;