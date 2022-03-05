const express = require('express');
const app = express(); //create express application
const bodyParser = require('body-parser'); //used to read req.body 
const jsonParser = bodyParser.json();
const connection = require('./connection.js');
app.get('/', (req, res) => {
  res.send('Welcome to Rest API Implementation');
});
app.get('/api/customer', (req, res) => {
  return new Promise((resolve, reject) => {
    fetchAllCustomer()
      .then((result) => {
        if (result.length) {
          return res.send({ success: true, message: result });
        } else {
          return res.status(404).send({ success: false, message: 'Cannot Find the Customer' });
        }
      })
      .catch((err) => {
        return res.status(404).send({ success: false, message: err });
      });
  });
});
app.get('/api/customer/:id', (req, res) => {
  return new Promise((resolve, reject) => {
    let id = parseInt(req.params.id);
    let p1 = Promise.resolve();
    if (id) {
      p1 = fetchBasisCustomerId(id)
    } else {
      p1 = Promise.reject({ message: 'Please enter id' })
    }
    p1
      .then((result) => {
        if (result.length) {
          return res.send({ success: true, message: result });
        } else {
          return res.status(404).send({ success: false, message: 'Cannot Find the Customer' });
        }
      })
      .catch((err) => {
        return res.status(404).send({ success: false, message: err });
      });
  })
});
app.post('/api/customer/:id', jsonParser, (req, res) => {
  return new Promise((resolve, reject) => {
    let name = req.body && req.body.name ? req.body.name : '';
    let id = parseInt(req.params.id);
    let p1 = Promise.resolve();
    if (name) {
      p1 = createCustomerBasisId(id, name)
    } else {
      p1 = Promise.reject({ message: 'Please enter name of the customer' })
    }
    p1
      .then((result) => {
        if (result) {
          return res.send({ success: true, message: 'Customer Created Successfully' });
        } else {
          return res.status(404).send({ success: false, message: 'Please enter name of the customer' });
        }
      })
      .catch((err) => {
        return res.status(404).send({ success: false, message: err });
      });
  })
});
app.put('/api/customer/:id', jsonParser, (req, res) => {
  return new Promise((resolve, reject) => {
    let name = req.body && req.body.name ? req.body.name : '';
    let id = parseInt(req.params.id);
    let p1 = Promise.resolve();
    if (name) {
      p1 = updateCustomerBasisId(id, name)
    } else {
      p1 = Promise.reject({ message: 'Please enter name of the customer' })
    }
    p1
      .then((result) => {
        if (result) {
          return res.send({ success: true, message: 'Customer Data Updated Successfully' });
        } else {
          return res.status(404).send({ success: false, message: 'Cannot Find the Customer with id entered' });
        }
      })
      .catch((err) => {
        return res.status(404).send({ success: false, message: err });
      });
  })
});
app.delete('/api/customer/:id', (req, res) => {
  return new Promise((resolve, reject) => {
    let id = parseInt(req.params.id);
    deleteCustomerBasisId(id)
      .then((result) => {
        if (result) {
          return res.send({ success: true, message: `Successfully deleted customer data for id ${id}` });
        } else {
          return res.status(404).send({ success: false, message: 'Cannot Find the Customer with id entered' });
        }
      })
      .catch((err) => {
        return res.status(404).send({ success: false, message: err });
      });
  })
});
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});
function fetchAllCustomer() {
  return new Promise((resolve, reject) => {
    let sql = 'select * from customer.customer_details';
    connection.query(sql, function (err, result) {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}
function fetchBasisCustomerId(id) {
  return new Promise((resolve, reject) => {
    let sql = 'select * from customer.customer_details where id=?';
    connection.query(sql, [id], function (err, result) {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}
function createCustomerBasisId(id, name) {
  return new Promise((resolve, reject) => {
    let sql = 'insert into customer.customer_details (id,name) values (?,?)';
    connection.query(sql, [id, name], function (err, result) {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}
function updateCustomerBasisId(id, name) {
  return new Promise((resolve, reject) => {
    let sql = 'update customer.customer_details set name = ? where id = ?';
    connection.query(sql, [name, id], function (err, result) {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}
function deleteCustomerBasisId(id) {
  return new Promise((resolve, reject) => {
    let sql = 'delete from customer.customer_details where id = ?';
    connection.query(sql, [id], function (err, result) {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}
