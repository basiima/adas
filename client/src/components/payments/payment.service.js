import http from "../../http-common";

class PaymentService {
    static create(payment_data) {
      return http.post("/payment_records", payment_data);
    }    
  }
export default PaymentService;