import http from "../../http-common";

class StudentService {
    static getAll() {
      return http.get("/students");
    }
    
    static get(id) {
      return http.get(`/students/${id}`);
    }

    static create(data) {
      return http.post("/students", data);
    }

    static update(id, data) {
      return http.put(`/students/${id}`, data);
    }

    static delete(id) {
      return http.delete(`/students/${id}`);
    }

    static deleteAll() {
      return http.delete(`/students`);
    }

    static findByName(student_name) {
      return http.get(`/students?student_name=${student_name}`);
    }
    
  }
export default StudentService;