//  data format
// {
//     id: 1,
//     name: dinner
//     category: food
//     amount: 300
// }


//Learning : 
// Element.addEventListener("click", () => {
//     someFunction(value);
// });

// state

let expenses = [];
let id = 1;

const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");
const expenseCategoryInput = document.getElementById("expenseCategory");
const expenseList = document.getElementById("expenseList");

const addButton = document.getElementById("addBtn");
const categoryFilter = document.getElementById("filter");
const searchButton = document.getElementById("searchBtn");
const searchInput = document.getElementById("search");

const totalAmountElement = document.getElementById("totalAmount");
const foodAmountElement = document.getElementById("foodAmount");
const travelAmountElement = document.getElementById("travelAmount");
const otherAmountElement = document.getElementById("otherAmount");


function calculateTotal(){
    return expenses.reduce((sum, expense)=>{
        return  sum + expense.amount;
    }, 0)
}

function calculateCategoryTotal(expenses, category){
        return expenses
        .filter((expense) =>{
            return expense.category === category;
        })
        .reduce((sum, expense) =>{
            return sum + expense.amount;
        }, 0)
}

function calculateOverview(){
    totalAmountElement.textContent = calculateTotal(expenses);
    foodAmountElement.textContent = calculateCategoryTotal(expenses, "food");
    travelAmountElement.textContent = calculateCategoryTotal(expenses, "travel");
    otherAmountElement.textContent = calculateCategoryTotal(expenses, "other");
}


const createExpense = function(expense){
    const listItem = document.createElement('li')
    const expenseName = document.createElement('span');
    expenseName.textContent = expense.name;

    const expenseCategory = document.createElement('span');
    expenseCategory.textContent = expense.category;

    const expenseAmount = document.createElement('span');
    expenseAmount.textContent = expense.amount;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "delete";

    deleteButton.addEventListener("click", ()=>{
        deleteExpense(expense.id);
    });

    listItem.append(
        expenseName,
        expenseCategory,
        expenseAmount,
        deleteButton
    )

    return listItem;

}

//delete Function
function deleteExpense(expenseId){
    expenses = expenses.filter((expense)=>{
        return expense.id !== expenseId;
    })

    renderExpenses();
}

const getVisibleExpenses = function(){
    
    const searchElem = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;
    const visibleExpenses = expenses.filter((expense) =>{
        const matchesSearch = expense.name.includes(searchElem) ;
        const matchesCategory =  selectedCategory === "All" || selectedCategory === expense.category;

        return (matchesCategory && matchesSearch)
    });

    return visibleExpenses;
}

const renderExpenses = function (){
    const visibleExpenses = getVisibleExpenses();
    const fragment = document.createDocumentFragment();

    visibleExpenses.forEach((expense) =>{
        fragment.appendChild(createExpense(expense));
    })

    expenseList.replaceChildren(fragment);
    calculateOverview();

}

const addNewExpense = function(){

    const name = expenseNameInput.value.trim().toLowerCase();
    const category = expenseCategoryInput.value;
    const amount = Number(expenseAmountInput.value);

    if(!name){
        alert("name is required!!");
        expenseNameInput.focus();
        return;
    }

    if(
        !amount || !Number.isFinite(amount) ||
        amount <= 0
    ){
        alert("enter finite amount greater than zero")
        expenseAmountInput.focus();
        return;
    }

    const expense = {
        id : id,
        name,
        amount, 
        category
    }

    id++;
    expenses.push(expense);

    expenseNameInput.value = "";
    expenseAmountInput.value = "";
    renderExpenses();

}

//Event listener

addButton.addEventListener('click', addNewExpense);

searchButton.addEventListener('click', renderExpenses);
searchInput.addEventListener('input', renderExpenses);
categoryFilter.addEventListener('change', renderExpenses);

renderExpenses();