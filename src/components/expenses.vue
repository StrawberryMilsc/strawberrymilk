<template>
    <div class="expense-tracker">
      <div class="expense-form">
        <h2>Add New Expense</h2>
        <form @submit.prevent="submitExpense">
          <div class="form-group">
            <label>Amount:</label>
            <input 
              type="number" 
              v-model.number="expense.amount" 
              required 
              step="0.01"
              min="0"
              placeholder="Enter expense amount"
            />
          </div>
          <div class="form-group">
            <label>Category:</label>
            <select v-model="expense.category" required>
              <option value="">Select Category</option>
              <option>Food</option>
              <option>Transport</option>
              <option>Entertainment</option>
              <option>Utilities</option>
              <option>Other</option>
            </select>
          </div>
          <div class="form-group">
            <label>Date:</label>
            <input 
              type="date" 
              v-model="expense.date" 
              required
            />
          </div>
          <div class="form-group">
            <label>Description:</label>
            <textarea 
              v-model="expense.description"
              placeholder="Optional description"
            ></textarea>
          </div>
          <button type="submit">Add Expense</button>
        </form>
      </div>
  
      <div class="expense-list">
        <h2>Expense History</h2>
        <div v-if="expenses.length === 0">No expenses recorded</div>
        <table v-else>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="expense in expenses" :key="expense.id">
              <td>{{ formatDate(expense.date) }}</td>
              <td>{{ expense.category }}</td>
              <td>${{ expense.amount.toFixed(2) }}</td>
              <td>{{ expense.description || '-' }}</td>
              <td>
                <button @click="deleteExpense(expense.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="expense-stats">
        <h2>Expense Statistics</h2>
        <div v-for="stat in categoryStats" :key="stat.category">
          <strong>{{ stat.category }}:</strong> 
          ${{ parseFloat(stat.total_amount).toFixed(2) }}
        </div>
        <div>
            Total Expenses: ${{ parseFloat(totalExpenses).toFixed(2) }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const expense = ref({
    amount: null,
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  })
  
  const expenses = ref([])
  const categoryStats = ref([])
  const totalExpenses = ref(0)
  
  const submitExpense = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/expenses', expense.value)
      expenses.value.unshift(response.data)
      
      // Reset form
      expense.value = {
        amount: null,
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
      }
  
      // Refresh stats
      await fetchStats()
    } catch (error) {
      console.error('Error adding expense:', error)
      alert('Failed to add expense')
    }
  }
  
  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/expenses')
      expenses.value = response.data
    } catch (error) {
      console.error('Error fetching expenses:', error)
    }
  }
  
  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/expenses/stats')
      categoryStats.value = response.data.categoryTotals
      console.log(response.data.total_expense)
      totalExpenses.value = response.data.total_expense
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }
  
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/expenses/${id}`)
      expenses.value = expenses.value.filter(e => e.id !== id)
      await fetchStats()
    } catch (error) {
      console.error('Error deleting expense:', error)
      alert('Failed to delete expense')
    }
  }
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }
  
  // Fetch expenses and stats when component mounts
  onMounted(() => {
    fetchExpenses()
    fetchStats()
  })
  </script>
  
  <style scoped>
  .expense-tracker {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  button {
    margin: 5px;
  }
  </style>