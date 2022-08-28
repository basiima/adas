import http from "../../http-common";

class RequestService {
    static getAll() {
      return http.get("/student_requests");
    }
    
    static get(student_number) {
      return http.get(`/student_requests/${student_number}`);
    }

    static create(data) {
      return http.post("/student_requests", data);
    }

    static findByName(student_name) {
      return http.get(`/student_requests?student_requests=${student_name}`);
    }

    static update = (request_id, data) => {
      return http.put(`/student_requests/${request_id}`, data);
    }
    
  }
export default RequestService;