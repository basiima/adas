import http from "../../http-common";

class CompanyService {
    static getAll() {
      return http.get("/companies");
    }
    
    static get(id) {
      return http.get(`/companies/${id}`);
    }

    static create(data) {
      return http.post("/companies", data);
    }

    static update(id, data) {
      return http.put(`/companies/${id}`, data);
    }

    static delete(id) {
      return http.delete(`/companies/${id}`);
    }

    static deleteAll() {
      return http.delete(`/companies`);
    }

    static findByName(company_name) {
      return http.get(`/companies?companies=${company_name}`);
    }
    
  }
export default CompanyService;