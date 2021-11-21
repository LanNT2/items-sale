import http from "../../http-common";
import authHeader from './auth-header';
class ItemService{
    async getItem(id) {
        return await http.get(`${id}`,{headers: authHeader()});
    }

    async getItems (keyword, currentPage, pageSize,sortBy){
        return await http.get("", { params: {keyword: keyword, page: currentPage, limit: pageSize,sort:sortBy },headers: authHeader()});
    }

    async updateItem (id,data){
        return await http.put(`/update/${id}`,data,{headers: authHeader()});
    }
    async deleteItem (id){
        return await http.delete(`/delete/${id}`,{headers: authHeader()});
    }
}
export default new ItemService();