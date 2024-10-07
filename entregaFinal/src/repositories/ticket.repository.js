import TicketDao from '../dao/ticket.dao.js';

class TicketRepository {
    async addTicket(data, amount) {
        return await TicketDao.add(data, amount);
    }
}

export default new TicketRepository();