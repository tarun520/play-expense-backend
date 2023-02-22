const Sib=require('sib-api-v3-sdk')
require('dotenv').config()
const client=Sib.ApiClient.instance

const apiKey=client.authentications['api-key']
apiKey.apiKey=process.env.API_KEY

const tranEmailApi=new Sib.TransactionalEmailsApi()

const sender={
    email:'gadipuditarun@gmail.com'
}

const reciever={
    email:'gadipuditarun01@gmail.com'
}
tranEmailApi.sendTransacEmail({
    sender,
    to:reciever,
    subject:'reset the password',
    textContent:'hey there'
})