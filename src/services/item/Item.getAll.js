import http from "../../http-common";

const getItems = async (keyword, currentPage, pageSize,sortBy) => {
    return await http.get("", { params: {keyword: keyword, page: currentPage, limit: pageSize,sort:sortBy }});
}
export { getItems };