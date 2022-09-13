import http from "../../http-common";

    const create = (data) => {
      return http.post("/blockchain_records", data);
    }
    
const BlockChainRecordService = {
  create
}
export default BlockChainRecordService;