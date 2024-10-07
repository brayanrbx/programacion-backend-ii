import TicketRepository from "../repositories/ticket.repository.js";
import { totalCalculate } from '../utils.js/util.js';

class TicketService {

    async addTicket(data, products) {
        const amount = totalCalculate(products)
        return await TicketRepository.addTicket(data, amount);
    }
}

export default new TicketService();