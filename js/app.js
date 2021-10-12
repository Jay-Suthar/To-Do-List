console.log("started the server");
getcontent();
list();


let btn = document.getElementById('addbtn');
btn.addEventListener('click',()=>{
    // console.log("this is it");
    let addtxt = document.getElementById('addtxt');
    let addtitle = document.getElementById('addtitle');
    let task = localStorage.getItem('task');

    if(task==null)
    {
        obj = [];
    }

    else
    {
        obj = JSON.parse(task);
    }

    let cont = {
        title: addtitle.value,
        txt: addtxt.value
    }

    obj.push(cont);
    localStorage.setItem('task',JSON.stringify(obj));
    addtxt.value="";
    addtitle.value="";

    getcontent();
})


function getcontent() {
    let task1 = localStorage.getItem('task');
    if (task1 == null) {
        obj = [];
    }
    else {
        obj = JSON.parse(task1);
    }

    let html = "";
    obj.forEach((function (element, index) {
        html += `
        <div class="notecard my-2 mx-2 card">
        <div class="card-body">
            <h5 class="card-title">${index + 1}. ${element.title}</h5>
            <p class="card-text">${element.txt}</p>
            <button type="button" id="${index}" onclick = "deletenote(this.id)" class="btn btn-danger">Delete</button>
            <button type = "button" id="${index}" onclick="addnotecomplete(this.id)" class="btn btn-success">Completed</button>
        </div>
    </div>`;
    }))

    let ele = document.getElementById("notes");
    if (obj.length != 0) {
        ele.innerHTML = html;
    }

    else {
        ele.innerHTML = `Nothing to show! <br>Use "Add Task section to add the Task`;
    }
}

function deletenote(index) {
    let task = localStorage.getItem('task');
    if (task == null) {
        obj = [];
    }
    else {
        obj = JSON.parse(task);
    }
    obj.splice(index, 1);
    localStorage.setItem('task', JSON.stringify(obj));
    getcontent();
}

function addnotecomplete(i) {
    let task = localStorage.getItem('task');
    if (task == null) {
        obj = [];
    }
    else {
        obj = JSON.parse(task);
    }
    let t="";
    let x="";
    t = obj[i].txt;
    x = obj[i].title;

    // console.log(t + x);

    obj.splice(i, 1);
    localStorage.setItem('task', JSON.stringify(obj));
    getcontent();

    complete_task(t,x);
}

function complete_task(a,b)
{
    let ct = localStorage.getItem('ct');
    if(ct==null)
    {
        comp = [];
    }

    else
    {
        comp = JSON.parse(ct);
    }
    let abcd = {
        head: b,
        text: a
    }

    comp.push(abcd);
    localStorage.setItem('ct',JSON.stringify(comp));

    list();
}

function list()
{
    let ct = localStorage.getItem('ct');
    if(ct==null)
    {
        comp = [];
    }

    else
    {
        comp = JSON.parse(ct);
    }

    let val = "";
    comp.forEach(function(element,index){
        val+=`
    <div class="notecard my-2 mx-2 card">
        <div class="card-body">
            <h5 class="card-title">${index + 1}. ${element.head}</h5>
            <p class="card-text">${element.text}</p>
            <button type="button" id="${index}" onclick = "dlt(this.id)" class="btn btn-danger">Delete</button>
        </div>
    </div>`
    })

    let f = document.getElementById('note-complete');
    if(comp.length!=0){
        f.innerHTML = val;
    }

    else
    {
        f.innerHTML = `No task Completed`;
    }
}

function dlt(x) {
    let ct = localStorage.getItem('ct');
    if(ct==null)
    {
        comp = [];
    }

    else
    {
        comp = JSON.parse(ct);
    }
    comp.splice(x, 1);
    localStorage.setItem('ct', JSON.stringify(comp));
    list();
}