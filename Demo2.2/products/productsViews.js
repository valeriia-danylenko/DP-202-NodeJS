const NotFoundData = require('../common/errors/not_found_data');

class ProductsViews {
    messages = {
        errorId : 'Product is not found',
        errorProducts: 'Products are not found',
        ok: { success: true, data: [], message: '' },
    }

    writeMessage(data, type, ...id) {
        if (data.length > 0) {
            this.messages.ok.data = data;
            return this.messages.ok;
        }

        switch (type) {
            case 'id':
                throw new NotFoundData([{ 'id': id[0] }], this.messages.errorId);
            // case 'search':
            //     throw new CustomError(data, this.messages.errorProducts);
            // case 'all':
            //     throw new CustomError(data, this.messages.errorProducts);
            default:
                throw new NotFoundData(data, this.messages.errorProducts);
        }
    }

    async sendData(res, data, type, ...id) {
        res.json(this.writeMessage(data, type, ...id));
    }
};

const productsViews = new ProductsViews();
module.exports = productsViews;
