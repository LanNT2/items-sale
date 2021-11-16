import http from "../http-common";

const getItems = async (keyword, currentPage, pageSize) => {
    return await http.get("", { params: {keyword: keyword, page: currentPage, limit: pageSize }});
}
export { getItems };