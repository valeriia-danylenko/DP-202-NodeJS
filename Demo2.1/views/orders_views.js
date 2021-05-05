const nodemailer = require("nodemailer");
const fs = require('fs');

class OrdersViews {
    messages = {
        ok: { status: 'ok', data: [], message: 'Thank you for your order' },
        errorUser: { status: 'error', data: [], message: 'User info is not valid' },
        errorData: { status: 'error', data: [], message: 'Invalid order data' },
        errorProducts: { status: 'error', data: [], message: 'Products are not found' },
        errorAvailability: { status: 'error', data: [], message: 'Not enough products' }
    }

    async sendData(res, info) {
        const { status, data } = info;
        this.messages[`${status}`].data = data;
        this.messages.ok.data = [];
        res.json(this.messages[`${status}`]);
        
        if (status === 'ok') {
            await this.mainSendMail(res, info.data);
        }
    }

    htmlText(info) {
        const userTable = Object.values(info.user).reduce((acc, el) => {
            return acc.concat(`<td> ${el} </td>`)
        }, '');

        const orderTable = info.order.reduce((acc, product) => {
            const row = Object.values(product).reduce((accum, val) => {
                return accum.concat(`<td> ${val} </td>`)
            }, '')
            return acc.concat(`<tr> ${row} </tr>`)
        }, '');

        const text = `<h1>A new order has been placed in your store.</h1>

            <p>Detailed info is presented below: </p>

            <h2> Customer Details: </h2>
            <table  cellspacing="2" border="1" cellpadding="5">
                <tr> <td> Name: </td> <td> Phone: </td> <td> Email: </td> <td> Order Time: </td> </tr>
                <tr> ${userTable} </tr>
            </table>

            <h2> Order Details: </h2>
            <table  cellspacing="2" border="1" cellpadding="5"> 
                <tr> <td> Order_Id: </td> <td> Product_Id: </td> <td> Name: </td>  
                <td> Amount: </td> <td> Units: </td> <td> Price: </td> <td> Price per Item: </td> </tr>
                ${orderTable}
            </table>
            <h2> <b> Total price : ${info.total} </b> </h2>`
        return text;
    }

    async mainSendMail(res, orderInfo) {
        const logs = JSON.parse(fs.readFileSync('./.logs.json', 'utf-8'));

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: logs.login,
                pass: logs.password
            }
        });

        let mailOptions = {
            from: `Lulu <heloiseroyard@gmail.com>`,
            to: 'valeriia.danylenko@hotmail.com',
            subject: `New Order # ${orderInfo.order[0].order_id}`,
            html: this.htmlText(orderInfo)
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
    }

};

const ordersViews = new OrdersViews();
module.exports = ordersViews;