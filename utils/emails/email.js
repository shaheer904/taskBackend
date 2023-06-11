const Sib = require('sib-api-v3-sdk')
require('dotenv').config()
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.EMAIL_KEY
exports.sendEmail=async(emailAddress,password)=>{
    const tranEmailApi = new Sib.TransactionalEmailsApi()
    const sender = {
    email: process.env.SENDER_EMAIL,
}
const receivers = [{email: emailAddress}]

await tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: 'Welcome to Cars',
        textContent: `ok`,
        params: {
            role: 'Frontend',
        },
        htmlContent: `
        <h1>Cars Login Credentials</h1>
        <p>Email=${emailAddress}</p>
        <p>Password=${password}</p>

                `
    })
    


}