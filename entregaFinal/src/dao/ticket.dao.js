import TicketModel from './models/ticket.model.js';

class TicketDao {
    async add(data, amount) {
        const ticket =  new TicketModel({
            amount,
            purchaser: data.email
        });

        return await ticket.save();
    }
}

export default new TicketDao();