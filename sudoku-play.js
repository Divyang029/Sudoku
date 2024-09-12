const gameboard = document.querySelector('#gameboard');
const digits = document.querySelector('#digits');
const del = document.querySelector('#delete');
var mistake = document.querySelector('#mistake');
var error = 0;
var lselect = null;

const puzzle = [
    "9------4-",
    "21638479-",
    "4----9821",
    "-6-1--9--",
    "5-19-8-76",
    "-29576--8",
    "1-4865237",
    "--7----64",
    "652437189",
 ];

let c1=1,c2,c3,c=0;
window.addEventListener("load",()=>{
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            const div=document.createElement('div');
            div.classList.add('sbox');
            div.addEventListener('click',select);
            div.setAttribute('r',i);
            div.setAttribute('c',j);

            if(puzzle[i][j]!='-'){
                div.innerText = puzzle[i][j];
                div.classList.add('filled'); 
            }

            if(i==2 || i==5)
                div.classList.add('border-bottom')
            if(j==2 || j==5)
                div.classList.add('border-right');

            c2=c1+1;
            c3=c2+1;
            if(c<3){
                div.setAttribute('box',c1);
                c++;
            }
            else if(c<6){
                div.setAttribute('box',c2);
                c++;
            }
            else if(c<9){
                div.setAttribute('box',c3);
                c++;
            }
            else{
                if(j==0 && (i==3 || i==6))
                    c1=c3+1;
                div.setAttribute('box',c1);
                c=1;
            }
            gameboard.appendChild(div);
        }
    }

    for(let i=0;i<9;i++){
        const div = document.createElement('div');
        div.classList.add('sbox');
        div.innerText = i+1;  
        div.addEventListener('click',addnum);
        digits.appendChild(div);
    }
});

function select(){
    if(lselect!=null)
        lselect.classList.remove('selected');

    lselect = this;
    lselect.classList.add('selected');

    removehighlight();
    addhighlight();

    if(lselect.innerText!=''){
        boxcheck(lselect.innerHTML);
        rowcolcheck(lselect.innerHTML);
    }
}


function addnum(){
    if(lselect.innerHTML=='' || lselect.classList.contains('danger')){
        lselect.classList.add('filled');
        let u = rowcolcheck(this.innerHTML);
        let v =boxcheck(this.innerHTML);

        if(u==1 || v==1){
            lselect.classList.add('danger');
            play();
            add_error_display();
        }
        else if(u==0 && v==0)
            lselect.classList.remove('danger');

        lselect.innerText = this.innerText;

        if(error>9){
            alert('Opps.. you lost.');
            location.reload();
        }

        if(allfilled()){
            alert('Congratulations !... you win the game.');
            location.reload();
        }
    }
}

function rowcolcheck(text){
    const divElements = document.querySelectorAll('#gameboard div');
    let row = lselect.getAttribute('r');
    let col = lselect.getAttribute('c');
    let rc=0;
    // Loop through all div elements and check their row and col value
    divElements.forEach((div) => {
        const currentrow = div.getAttribute('r');
        const currentcol = div.getAttribute('c');
            if ((currentrow == row || currentcol == col) && div.innerHTML == text && !(currentrow == row && currentcol == col)){
                div.classList.remove('highlight');
                div.classList.add('backred');
                rc=1;
            }
    });

    if(rc==0)
        return 0;
    else
        return 1;
}

function boxcheck(text){
    const divElements = document.querySelectorAll('#gameboard div');
    let boxno = lselect.getAttribute('box');
    let row = lselect.getAttribute('r');
    let col = lselect.getAttribute('c');
    let rc=0;
    divElements.forEach((div) => {
        const currentrow = div.getAttribute('r');
        const currentcol = div.getAttribute('c');
        const currentboxno = div.getAttribute('box');
            if ((currentboxno == boxno) && div.innerHTML == text && !(currentrow == row && currentcol == col)){
                div.classList.remove('highlight');
                div.classList.add('backred');
                rc=1;
            }
    });  
    
    if(rc==0)
        return 0;
    else
        return 1;
}

function addhighlight(){
    const divElements = document.querySelectorAll('#gameboard div');
    let boxno = lselect.getAttribute('box');
    let row = lselect.getAttribute('r');
    let col = lselect.getAttribute('c');

    divElements.forEach((div) => {
        const currentrow = div.getAttribute('r');
        const currentcol = div.getAttribute('c');
        const currentboxno = div.getAttribute('box');
            if ((currentboxno == boxno || currentrow == row || currentcol == col) && !(currentrow == row && currentcol == col))
                div.classList.add('highlight');
    });  
}

function removehighlight(){
    const divElements = document.querySelectorAll('#gameboard div');
    
    divElements.forEach((div) => {
        div.classList.remove('backred');
        div.classList.remove('highlight');
    });  
}

function removered(){
    const divElements = document.querySelectorAll('#gameboard div');
    divElements.forEach((div) => {
        div.classList.remove('backred');
    });  
}

del.addEventListener('click',()=>{
    if(lselect.classList.contains('danger'))
        lselect.innerText = '';
    removered();
    addhighlight();
});

function add_error_display(){
    error++;
    mistake.innerHTML = error;
}

function allfilled(){
    const allboxes = gameboard.querySelectorAll('.sbox');
    return [...allboxes].every((box)=>{
        return box.classList.contains('filled') && !(box.classList.contains('danger'));
    });
}

function play() { 
    var audio = new Audio('beep.mp3'); 
    audio.play(); 
} 