import { useState, useEffect } from 'react'
import api from './api'


const App = () => {
  const [transactions, setTransactions] = useState([])
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: ''
  }) ;

  const fetchTransactions = async () => {
    const response = await api.get('/transactions/')
    setTransactions(response.data)
  };

  useEffect(() => {
    fetchTransactions()
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post('/transactions/', formData);
    fetchTransactions();
    setFormData({
      amount: '',
      category: '',
      description: '',
      is_income: false,
      date: ''
    });
  };


  return (
    <div> 
      <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <a className='navbar-brand' href='#'>
          Finance App
          </a>
          </div>
          </nav>

      <div className='container'>
       <form onSubmit={handleFormSubmit}>
      <div className="mb-3 mt-3">
        <label htmlFor="amount" className="form-label">Amount</label>
        <input name="amount" value={formData.amount} onChange={handleInputChange} placeholder="Amount" />
        </div>


        <div className="mb-3 mt-3">
        <label htmlFor="category" className="form-label">Category</label>
        <input name="category" value={formData.category} onChange={handleInputChange} placeholder="Category" />
        </div>


        <div className="mb-3 mt-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" />
        </div>


        <div className="mb-3 mt-3">
        <label htmlFor="is_income" className="form-label">Is_Income</label>
        <input type='check-box' id="is_income" name="is_income" value={formData.is_income} onChange={handleInputChange} placeholder="Is_Income" />
        </div>


        <div className="mb-3 mt-3">
        <label htmlFor="date" className="form-label">Date</label>
        <input name="date" value={formData.date} onChange={handleInputChange} placeholder="Date" />
        </div>
        <button type="submit" className='btn btn-primary'>
          Submit
          </button>
        </form>
      </div>
      <div className='container-details'>
      <table className='table table-striped table-bordered table-hover'>

        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Is_Income?</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.amount}</td>
            <td>{transaction.category}</td>
            <td>{transaction.description}</td>
            <td>{transaction.is_income ? 'Income' : 'Expense'}</td>
            <td>{transaction.date}</td>
          </tr> 
          ))}
          </tbody>
      </table>
      </div>
    </div>

  )
}

export default App
