const Pagseguro = require('../models/Pagseguro');

let email = "alefrodrigues538@gmail.com";
let token = "F397326FBA1D47E19F563E7D412E0A98";

module.exports = {
    async index(req, res) {
        const pag = await Pagseguro.findAll();
    
        return res.json(pag);
    },

    async add(req, res){
        const { funcao, habilitar, sandbox, parcelas_sem_juros, vendedor_email, vendedor_token, vendedor_nome, vendedor_cpf, vendedor_ddd, vendedor_fone } = req.body;
        const pag = await Pagseguro.create({ funcao, habilitar, sandbox, parcelas_sem_juros, vendedor_email, vendedor_token, vendedor_nome, vendedor_cpf, vendedor_ddd, vendedor_fone });

        return res.json(pag);
    },

    async sessao(req, res){
        
        var options = {
            'method': 'GET',
            'url': 'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout?email='+email+'&token='+token,
            'headers': {
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);

            data = {
                "erro": 0,
                "mensagem": "bandeiras",
                "dados": [JSON.parse(response.body)]
            } 
            res.json(data)
        });
    },
    
    async bandeira(req, res){
        const { sessionId, cardNumber } = req.body

        var options = {
            'method': 'GET',
            'url': 'https://df.uol.com.br/df-fe/mvc/creditcard/v1/getBin?tk='+sessionId+'&creditCard='+cardNumber,
            'headers': {
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);

            data = {
                "erro": 0,
                "mensagem": "bandeiras",
                "dados": [JSON.parse(response.body)]
            } 
            res.json(data)
        });
    },
    
    async parcelamento(req, res){
        const { sessionId, amount, cardBrand, maxInstallment } = req.body
        var options = {
            'method': 'GET',
            'url': 'https://sandbox.pagseguro.uol.com.br/checkout/v2/installments.json?sessionId='+sessionId+'&amount='+amount+'&creditCardBrand='+cardBrand+'&maxInstallmentNoInterest='+maxInstallment,
            'headers': {
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);

            data = {
                "erro": 0,
                "mensagem": "parcelamento",
                "dados": [JSON.parse(response.body)]
            } 
            res.json(data)
        });
    },
    
    async token_cartao(req, res){
        const { sessionId, amount, cardNumber, cardBrand, cardCvv, cardExpirationMonth, cardExpirationYear } = req.body
    
        var options = {
            'method': 'POST',
            'url': 'https://df.uol.com.br/v2/cards',
            'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
            'sessionId': sessionId,
            'amount': amount,
            'cardNumber': cardNumber,
            'cardBrand': cardBrand,
            'cardCvv': cardCvv,
            'cardExpirationMonth': cardExpirationMonth,
            'cardExpirationYear': cardExpirationYear
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            let xmlString = response.body
            var result = convert.xml2json(xmlString, {compact: true, spaces: 4});
            let erro = 0
            let dados = null

            if(JSON.parse(result).card){
                dados = [ { "token":JSON.parse(result).card.token._text } ]
                erro = 0
            }else{
                dados = null
                erro = 1
            }

            data = {
                "erro": 0,
                "mensagem": "token_cartao",
                "dados": dados
            } 
            res.json(data)
        });
    },

    async credito_pagseguro(req, res){
        const { currency, extraAmount, notificationURL, reference, shippingAddressRequired, creditCardToken, installmentQuantity, installmentValue, noInterestInstallmentQuantity, creditCardHolderName, creditCardHolderCPF, creditCardHolderBirthDate, creditCardHolderAreaCode, creditCardHolderPhone, billingAddressStreet, billingAddressNumber, billingAddressComplement, billingAddressDistrict, billingAddressPostalCode, billingAddressCity, billingAddressState, billingAddressCountry, senderName, senderCPF, senderCNPJ, senderAreaCode, senderPhone, senderEmail, itemId, itemDescription, itemAmount, itemQuantity } = req.body

        var options = {
            'method': 'POST',
            'url': 'https://ws.sandbox.pagseguro.uol.com.br/v2/transactions?email='+email+'&token='+token,
            'headers': {
                'Content-Type': 'application/xml'
            },
            body:   '<payment>\r\n'+
            '<mode>default</mode>\r\n'+
            '<method>creditCard</method>\r\n'+
            '<sender>\r\n'+
                '<name>'+senderName+'</name>\r\n'+
                '<email>'+senderEmail+'</email>\r\n'+
                '<phone>\r\n'+
                    '<areaCode>'+senderAreaCode+'</areaCode>\r\n'+
                    '<number>'+senderPhone+'</number>\r\n'+
                '</phone>\r\n'+
                '<documents>\r\n'+
                    '<document>\r\n'+
                        '<type>CPF</type>\r\n'+
                        '<value>'+senderCPF+'</value>\r\n'+
                    '</document>\r\n'+
                '</documents>\r\n'+
            '</sender>\r\n'+
            '<currency>'+currency+'</currency>\r\n'+
            '<notificationURL>'+notificationURL+'</notificationURL>\r\n'+
            '<items>\r\n'+
                '<item>\r\n'+
                    '<id>'+itemId+'</id>\r\n'+
                    '<description>'+itemDescription+'</description>\r\n'+
                    '<quantity>'+itemQuantity+'</quantity>\r\n'+
                    '<amount>'+itemAmount+'</amount>\r\n'+
                '</item>\r\n'+
            '</items>\r\n'+
            '<extraAmount>'+extraAmount+'</extraAmount>\r\n'+
            '<reference>'+reference+'</reference>\r\n'+
            '<shipping>\r\n'+
                '<addressRequired>'+shippingAddressRequired+'</addressRequired>\r\n'+
            '</shipping>\r\n'+
            '<creditCard>\r\n'+
                '<token>'+creditCardToken+'</token>\r\n'+
                '<installment>\r\n'+
                    '<noInterestInstallmentQuantity>'+noInterestInstallmentQuantity+'</noInterestInstallmentQuantity>\r\n'+
                    '<quantity>'+installmentQuantity+'</quantity>\r\n'+
                    '<value>'+installmentValue+'</value>\r\n'+
                '</installment>\r\n'+
                '<holder>\r\n'+
                    '<name>'+creditCardHolderName+'</name>\r\n'+
                    '<documents>\r\n'+
                        '<document>\r\n'+
                            '<type>CPF</type>\r\n'+
                            '<value>'+creditCardHolderCPF+'</value>\r\n'+
                        '</document>\r\n'+
                    '</documents>\r\n'+
                    '<birthDate>'+creditCardHolderBirthDate+'</birthDate>\r\n'+
                    '<phone>\r\n'+
                        '<areaCode>'+creditCardHolderAreaCode+'</areaCode>\r\n'+
                        '<number>'+creditCardHolderPhone+'</number>\r\n'+
                    '</phone>\r\n'+
                '</holder>\r\n'+
                '<billingAddress>\r\n'+
                    '<street>'+billingAddressStreet+'</street>\r\n'+
                    '<number>'+billingAddressNumber+'</number>\r\n'+
                    '<complement>'+billingAddressComplement+'</complement>\r\n'+
                    '<district>'+billingAddressDistrict+'</district>\r\n'+
                    '<city>'+billingAddressCity+'</city>\r\n'+
                    '<state>'+billingAddressState+'</state>\r\n'+
                    '<country>'+billingAddressCountry+'</country>\r\n'+
                    '<postalCode>'+billingAddressPostalCode+'</postalCode>\r\n'+
                '</billingAddress>\r\n'+
            '</creditCard>\r\n'+
        '</payment>'
        };
        request(options, function (error, response) {
        if (error) throw new Error(error);
        let xmlString = response.body
        var result = convert.xml2json(xmlString, {compact: true, spaces: 4});
            data = {
                "erro": 0,
                "mensagem": "cartao_credito_pagseguro",
                "dados": [
                    JSON.parse(result)
                ]
            } 
            res.json(data)
        });
    },
    
    async boleto_pagseguro(req, res){
        const { currency, extraAmount, notificationURL, reference, shippingAddressRequired, senderName, senderCPF, senderAreaCode, senderPhone, senderEmail, itemId, itemDescription, itemAmount, itemQuantity } = req.body

        var options = {
            'method': 'POST',
            'url': 'https://ws.sandbox.pagseguro.uol.com.br/v2/transactions?email='+email+'&token='+token,
            'headers': {
                'Content-Type': 'application/xml'
            },
            body:   '<payment>\r\n'+
            '<mode>default</mode>\r\n'+
            '<method>boleto</method>\r\n'+
            '<sender>\r\n'+
                '<name>'+senderName+'</name>\r\n'+
                '<email>'+senderEmail+'</email>\r\n'+
                '<phone>\r\n'+
                    '<areaCode>'+senderAreaCode+'</areaCode>\r\n'+
                    '<number>'+senderPhone+'</number>\r\n'+
                '</phone>\r\n'+
                '<documents>\r\n'+
                    '<document>\r\n'+
                        '<type>CPF</type>\r\n'+
                        '<value>'+senderCPF+'</value>\r\n'+
                    '</document>\r\n'+
                '</documents>\r\n'+
            '</sender>\r\n'+
            '<currency>'+currency+'</currency>\r\n'+
            '<notificationURL>'+notificationURL+'</notificationURL>\r\n'+
            '<items>\r\n'+
                '<item>\r\n'+
                    '<id>'+itemId+'</id>\r\n'+
                    '<description>'+itemDescription+'</description>\r\n'+
                    '<quantity>'+itemQuantity+'</quantity>\r\n'+
                    '<amount>'+itemAmount+'</amount>\r\n'+
                '</item>\r\n'+
            '</items>\r\n'+
            '<extraAmount>'+extraAmount+'</extraAmount>\r\n'+
            '<reference>'+reference+'</reference>\r\n'+
            '<shipping>\r\n'+
                '<addressRequired>'+shippingAddressRequired+'</addressRequired>\r\n'+
            '</shipping>\r\n'+
        '</payment>'
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            let xmlString = response.body
            var result = convert.xml2json(xmlString, {compact: true, spaces: 4});
            data = {
                "erro": 0,
                "mensagem": "boleto_pagseguro",
                "dados": [
                    JSON.parse(result)
                ]
            } 
            res.json(data)
        });
    },
}