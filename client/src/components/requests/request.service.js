import http from "../../http-common";

class RequestService {
    static getAll() {
      return http.get("/student_requests");
    }
    
    static get(request_id) {
      return http.get(`/student_requests/${request_id}`);
    }

    static create(data) {
      return http.post("/student_requests", data);
    }

    static findByName(student_name) {
      return http.get(`/student_requests?student_requests=${student_name}`);
    }
    
  }
export default RequestService;