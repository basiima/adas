import http from "../../http-common";

class DocumentService {

    static create(data) {
      return http.post("/signed_documents", data);
    }

    static getAll() {
      return http.get("/signed_documents");
    }
    
    static get(referenceId) {
      return http.get(`/signed_documents/${referenceId}`);
    }
    
  }
export default DocumentService;