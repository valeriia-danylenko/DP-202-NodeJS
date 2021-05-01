class ProductsViews {
    messages = {
        ok: { status: 'ok', data: [], message: '' },
        errorOk: { status: 'ok', data: [], message: 'Products are not found' },
        errorProducts: { status: 'error', data: [], message: 'Products are not found' },
        errorId: { status: 'error', data: [], message: 'Products is not found' }
    }

    writeMessage(data, type, ...id) {
        if (data.length > 0) {
            this.messages.ok.data = data;
            return this.messages.ok;
        }
        switch (type) {
            case 'id':
                this.messages.errorId.data = [{ 'id': id[0] }];
                return this.messages.errorId;
            case 'search':
                this.messages.errorOk.data = data
                return this.messages.errorOk;
            case 'all':
                this.messages.errorProducts.data = data
                return this.messages.errorProducts;
            default:
                return  this.messages.errorProducts;
        }
    }

    async sendData(res, data, type, ...id) {
        res.json(this.writeMessage(data, type, ...id));
    }
};

const productsViews = new ProductsViews();
module.exports = productsViews;
