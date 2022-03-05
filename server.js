const express = require('express');
const app = express(); //create express application
var bodyParser = require('body-parser'); //used to read req.body 
var jsonParser = bodyParser.json();
//creating a hardcoded data in server although not recommended
const customers = [
  {
    id: 1,
    name: 'DEVRAJ SEN'
  },
  {
    id: 2,
    name: 'SAURABH SINGH'
  },
  {
    id: 3,
    name: 'HIMANSHU GUPTA'
  },
  {
    id: 4,
    name: 'PRIYA SINGH'
  }
]
app.get('/', (req, res) => {
  res.send('Welcome to Rest API Implementation');
});
app.get('/api/customer', (req, res) => {
  res.send(customers);
});
app.get('/api/customer/:id', (req, res) => {
  let foundCustomer = customers.find((customer) => {
    if (parseInt(req.params.id) === customer.id) {
      return true;
    }
    return false;
  });
  if (foundCustomer) {
    res.send(foundCustomer);
  } else {
    res.status(404).send('Cannot Find the Customer');
  }
});
app.post('/api/customer/:id', jsonParser, (req, res) => {
  let name = req.body && req.body.name ? req.body.name : '';
  let id = parseInt(req.params.id);
  if (name) {
    customers.push({
      id: id,
      name: name
    });
    res.send('Customer Created Successfully');
  } else {
    res.status(404).send('Please enter name of the customer');
  }
});
app.put('/api/customer/:id', jsonParser, (req, res) => {
  let name = req.body && req.body.name ? req.body.name : '';
  let id = parseInt(req.params.id);
  let foundCustomer = false;
  if (name) {
    customers.forEach((data) => {
      if (data.id === id) {
        data.name = name;
        foundCustomer = true;
      }
    });
    if (foundCustomer) {
      res.send('Customer Data Updated Successfully');
    } else {
      res.status(404).send('Cannot Find the Customer');
    }
  } else {
    res.status(404).send('Please enter name of the customer to update');
  }
});
app.delete('/api/customer/:id', (req, res) => {
  let foundIndex;
  let foundCustomer = customers.find((customer, index) => {
    if (parseInt(req.params.id) === customer.id) {
      foundIndex = index;
      return true;
    }
    return false;
  });
  if (foundCustomer) {
    customers.splice(foundIndex, 1);
    res.send(`Successfully deleted customer data for id ${foundCustomer.id}`);
  } else {
    res.status(404).send('Cannot Find the Customer To Delete');
  }
});
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});

