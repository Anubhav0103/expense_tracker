const tableBody=document.getElementById('expense-body');
const expense=document.getElementById('expense-input');
const description=document.getElementById('expense-description');
const category=document.getElementById('expense-category');

const submitButton=document.getElementById('submit-button');

let currentEditIndex=null;

let serialNumber=1;
let index=0;
let objArr=[];

submitButton.addEventListener('click',(e)=>{
    if(!parseInt(expense.value)){
        alert('Enter Correct Price');
    }
    else{
    objArr=JSON.parse(localStorage.getItem('expenseItem'))||[];
    if(currentEditIndex!=null){
        objArr[currentEditIndex].value=parseInt(expense.value);
        objArr[currentEditIndex].desc=description.value;
        objArr[currentEditIndex].cat=category.value;
    }
    else{
        objArr.push({
            sno:objArr.length+1,
            value:parseInt(expense.value),
            desc:description.value,
            cat:category.value
        });
    }
    
    localStorage.setItem('expenseItem',JSON.stringify(objArr));
    buildTable();

    expense.value="";
    description.value="";
}
});

function buildTable(){
    tableBody.innerHTML='';
    const expenseData=JSON.parse(localStorage.getItem('expenseItem'));
    expenseData.forEach((element,index) => {
        const row=`<tr>
              <td>${element.sno}</td>
              <td>${element.value}</td>
              <td>${element.desc}</td>
              <td>${element.cat}</td>
              <td>
                <button class="edit-button" data-index=${index}>Edit</button>
                <button class="delete-button">Delete</button>
            </td>
              </tr>`;
    tableBody.innerHTML+=row;
    });

    attachDeleteFunction();
    attachEditFunction();
}

function attachEditFunction(){
    const editButton=document.querySelectorAll('.edit-button');
    editButton.forEach(buttons=>{
        buttons.addEventListener('click',(e)=>{
            e.preventDefault();
            currentEditIndex=e.target.getAttribute('data-index');
            const expenseData=JSON.parse(localStorage.getItem('expenseItem'));
            expense.value=expenseData[currentEditIndex].value;
            description.value=expenseData[currentEditIndex].desc;
            category.value=expenseData[currentEditIndex].cat;
        });
    });
}

function attachDeleteFunction(){
    const deleteButtons=document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button)=>{
        button.addEventListener('click',(e)=>{
            e.preventDefault();
            const index=parseInt((e.target.parentNode.parentNode.firstElementChild.textContent))-1;
            console.log(index);
            let expenseData=JSON.parse(localStorage.getItem('expenseItem'));
            expenseData.splice(index,1);
            expenseData = expenseData.map((item, index) => ({
                ...item,
                sno: index + 1
            }));
            localStorage.setItem('expenseItem',JSON.stringify(expenseData));
            buildTable();
        })
    })
}

buildTable();

const search=document.getElementById('search');

search.addEventListener('keyup',(e)=>{
    const searchValue=e.target.value.toLowerCase();
    const expenseData=JSON.parse(localStorage.getItem('expenseItem'));
    tableBody.innerHTML='';
    expenseData.forEach(items=>{
        if(items.desc.toLowerCase().includes(searchValue)){
            const row=`<tr>
                        <td>${items.sno}</td>
                        <td>${items.value}</td>
                        <td>${items.desc}</td>
                        <td>${items.cat}</td>
                        <td>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </td>
                    </tr>`;
    tableBody.innerHTML+=row;
        }
    })
})

const expenseValueHead=document.getElementById('expense-value-head');

expenseValueHead.addEventListener('click',(e)=>{
    const expenseData=JSON.parse(localStorage.getItem('expenseItem'));
    let dummyData=expenseData;
    const order=e.target.getAttribute('data-order');
    if(order=='asc'){
        e.target.setAttribute('data-order','desc');
        console.log(e.target.getAttribute('data-order'));
        dummyData=dummyData.sort(function(a,b){
            let expenseA=parseInt(a.value,10);
            let expenseB=parseInt(b.value,10)
            return expenseA-expenseB;})
        tableBody.innerHTML='';
        dummyData.forEach(items=>{
            const row=`<tr>
                        <td>${items.sno}</td>
                        <td>${items.value}</td>
                        <td>${items.desc}</td>
                        <td>${items.cat}</td>
                        <td>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </td>
                    </tr>`;
            tableBody.innerHTML+=row;
        })
        e.target.innerHTML='Expense &#9660;';
    }else{
        e.target.setAttribute('data-order','asc');
        console.log(e.target.getAttribute('data-order'));
        dummyData=dummyData.sort(function(a,b){
            let expenseA=parseInt(a.value,10);
            let expenseB=parseInt(b.value,10)
            return expenseB-expenseA;})
        tableBody.innerHTML='';
        dummyData.forEach(items=>{
            const row=`<tr>
                        <td>${items.sno}</td>
                        <td>${items.value}</td>
                        <td>${items.desc}</td>
                        <td>${items.cat}</td>
                        <td>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </td>
                    </tr>`;
            tableBody.innerHTML+=row;
            
        })
        e.target.innerHTML='Expense &#9650;';
    }
    e.preventDefault();
})