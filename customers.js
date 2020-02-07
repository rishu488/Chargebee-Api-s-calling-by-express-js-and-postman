var express = require('express');
var app = express();
var chargebee = require("chargebee");
var bodyParser = require('body-parser');
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));
chargebee.configure({
  site: "diatoz-test",
  api_key: "test_1BtjOwttsoqpGHcd5Mf4nJvs87Udwr6cP"
});

app.get('/', (_, res) => res.sendFile(__dirname + '/index.html'));

app.post('/customers', function(req, res, next) {
  // res.send('respond with a resource');
  console.log(req, res)
  var params = {};
  params["customer"] = req.body.customer;
  params["plan_id"] = req.body.customer.subscription;
  params["subscription[plan_id]"] = req.body.customer.subscription;
  params["status"] = "active";
  console.log("CUSTOMER " + JSON.stringify(req.body.customer));
  chargebee.hosted_page.checkout_new(params).request(function(error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      // var customer = result.customer;
      // var subscription = result.subscription;
      var hosted_page = result.hosted_page;
      // res.writeHead(200, {
      //    'content-type': 'text/html'
      // });
      // res.status(200).json({result})
      // res.redirect(result.hosted_page.url)
      res.send(
        
        `<iframe style="border:none;min-height:100%" width="100%" height="100%" src="${result.hosted_page.url}"></iframe>`
     
        );
      // res.end("your subscription is successfull your subscription id is " + hosted_page.id);
    }
  });
});
// app.post('/customers', (req, res )=>{
//   res.send(`<iframe style="border:none;min-height:100%" width="100%" height="100%" src=" http://32dfea65.ngrok.io"></iframe>`);
// })

app.listen(3000 , (req , res)=>{
  console.log("server running at port 3000");
});
