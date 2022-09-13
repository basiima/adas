import http from "../../http-common";

    const create = (data) => {
      return http.post("/verification_transactions", data);
    }
    
const TransactionService = {
  create
}
export default TransactionService;