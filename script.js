document.addEventListener('DOMContentLoaded', function () 
{
    const expenseForm = document.getElementById('expenseForm');
    const expenseInput = document.getElementById('expenseInput');
    const amountInput = document.getElementById('amountInput');
    const expenseList = document.getElementById('expenseList');
    
    // Retrieve expenses from local storage if available
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    renderExpenses();
    
    // Add expense
    expenseForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const expenseName = expenseInput.value.trim();
      const amount = parseFloat(amountInput.value.trim());
      if (expenseName && amount) {
        expenses.push({ name: expenseName, amount: amount });
        saveExpenses();
        renderExpenses();
        expenseInput.value = '';
        amountInput.value = '';
      }
    });
    
    // Delete expense
    expenseList.addEventListener('click', function (e) {
      if (e.target && e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        expenses.splice(index, 1);
        saveExpenses();
        renderExpenses();
      }
    });
    
    // Edit expense
    expenseList.addEventListener('click', function (e) {
      if (e.target && e.target.classList.contains('edit-btn')) {
        const index = e.target.dataset.index;
        const li = expenseList.children[index];
        const spanElements = li.getElementsByTagName('span');
        const expenseName = spanElements[0].textContent;
        const amount = spanElements[1].textContent;
        const newName = prompt('Enter new expense name:', expenseName);
        const newAmount = parseFloat(prompt('Enter new amount:', amount));
        if (newName && newAmount) {
          expenses[index] = { name: newName, amount: newAmount };
          saveExpenses();
          renderExpenses();
        }
      }
    });
    
    // Render expenses
    function renderExpenses() {
      expenseList.innerHTML = '';
      expenses.forEach(function (expense, index) {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${expense.name}</span>
          <span>$${expense.amount}</span>
          <button class="edit-btn" data-index="${index}"><i class="fas fa-edit"></i> Edit</button>
          <button class="delete-btn" data-index="${index}"><i class="fas fa-trash-alt"></i> Delete</button>
        `;
        expenseList.appendChild(li);
      });
    }
    
    // Save expenses to local storage
    function saveExpenses() {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  });