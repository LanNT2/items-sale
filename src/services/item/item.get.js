import http from "../../http-common";

const getItem = async (id) => {
    return await http.get(`${id}`);
}
export { getItem };