const nodemailer = require("nodemailer");
const dotenv = require('dotenv').config({ path: __dirname + '/../.env' })


class OrdersViews {
    messages = {
        ok: { success: true, data: [], message: 'Thank you for your order' }
    }

    async sendData(res, data) {
        res.json(this.messages.ok);
        data.user.time = new Date(data.user.time).toLocaleString()
        await this.mainSendMail(res, data);
    }

    htmlText(data) {
        const userTable = Object.values(data.user).reduce((acc, el) => {
            return acc.concat(`<td> ${el} </td>`)
        }, '');

        const orderTable = data.order.reduce((acc, product) => {
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
            <h2> <b> Total price : ${data.total} </b> </h2>`
        return text;
    }

    async mainSendMail(res, data) {

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_LOGIN,
                pass: process.env.GMAIL_PASSWORD
            }
        });

        let mailOptions = {
            from: `Lulu <heloiseroyard@gmail.com>`,
            to: 'valeriia.danylenko@hotmail.com',
            subject: `New Order # ${data.order[0].order_id}`,
            html: this.htmlText(data)
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