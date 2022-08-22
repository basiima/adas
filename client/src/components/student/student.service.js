import http from "../../http-common";

    const getAll = () => {
      return http.get("/students");
    }
    
    const get = (username) => {
      return http.get(`/students/${username}`);
    }

    const create = (data) => {
      return http.post("/students", data);
    }

    const update = (id, data) => {
      return http.put(`/students/${id}`, data);
    }

    const remove = id => {
      return http.delete(`/students/${id}`);
    }

    const deleteAll = () => {
      return http.delete(`/students`);
    }
    
const StudentService = {
  getAll,
  get,
  create,
  update,
  remove,
  deleteAll
}
export default StudentService;