import http from "../../http-common";

class ItemService{
    async getItem(id) {
        return await http.get(`${id}`);
    }

    async getItems (keyword, currentPage, pageSize,sortBy){
        return await http.get("", { params: {keyword: keyword, page: currentPage, limit: pageSize,sort:sortBy }});
    }

    async updateItem (id,data){
        return await http.put(`/update/${id}`,data);
    }
}
export default new ItemService();