import http from "../../http-common";

class DocumentService {
    static getAll() {
      return http.get("/documents");
    }
    
    
  }
export default DocumentService;