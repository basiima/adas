import http from "../../http-common";

class DocumentsService {
    static getAll() {
      return http.get("/documents");
    }
    
    static get(id) {
      return http.get(`/documents/${id}`);
    }

    static create(data) {
      return http.post("/documents", data);
    }

    static update(id, data) {
      return http.put(`/documents/${id}`, data);
    }

    static delete(id) {
      return http.delete(`/documents/${id}`);
    }

    static deleteAll() {
      return http.delete(`/documents`);
    }

    static findByName(student_name) {
      return http.get(`/documents?key=${key}`);
    }
    
  }
export default DocumentsService;