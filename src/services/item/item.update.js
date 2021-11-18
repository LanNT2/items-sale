import http from "../../http-common";

const updateItem = async (id,data) => {
    return await http.put(`/update/${id}`,data);
}
export { updateItem };