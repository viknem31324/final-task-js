let plus = document.querySelector('.plus');
let wrapper = document.querySelector('.wrapper');
let countColumns = 1;
let columnWidth = 200;
plus.addEventListener('click', () =>{
    countColumns++;
    let divColumn = document.createElement('div');
    divColumn.id = `column${countColumns}`;
    divColumn.classList.add('column');
    divColumn.style.left = `${columnWidth}px`;
    columnWidth += 200;

    let divTitle = document.createElement('div');
    divTitle.classList.add('column__title');

    let divView = document.createElement('div');
    divView.textContent = 'Заголовок';
    divView.classList.add('view');
    divView.id = `view${countColumns}`;
    let divBody = document.createElement('div');
    divBody.classList.add('column__body');
    divBody.id = `body${countColumns}`;

    wrapper.appendChild(divColumn);
    divColumn.appendChild(divTitle);
    divTitle.appendChild(divView);
    divColumn.appendChild(divBody);
    let coords = plus.getBoundingClientRect();
    plus.style.left = coords.left + divColumn.offsetWidth + "px";
});

let check = false;
let newBlock = false;

document.body.addEventListener('click', event =>{
  let elem = event.target;
  if(event.target.className == 'view'){
    let input = document.createElement('input');
    input.className = 'edit';
    for(let i = 0; i < event.target.textContent.length; i++){
      if(event.target.textContent[i] !== ' '){
        input.value += event.target.textContent[i];
      }
    }
    
    input.onkeydown = function(event) {
      if (event.key == 'Enter') {
          this.blur();
      }
    };

    input.onblur = function() {
      event.target.textContent = input.value;
      input.replaceWith(event.target);
    };

    event.target.replaceWith(input);
    input.focus();
  }
  if(document.querySelector('.elem-form')){
    return;
  } 
  if(event.target.className == 'column__body'){
      let elem = document.querySelector(`#${event.target.id}`);
      check = false;
      creatBlockForm(elem);
  }else if(event.target.className == 'body-elem'){
      check = true;
      creatBlockForm(elem);
  }else if(event.target.className == 'title' || event.target.className == 'text'){
    check = true;
    elem = event.target.parentNode;
    console.log(elem);
    creatBlockForm(elem);
  }
  
});

function creatBlockForm(par){
    let elemForm = document.createElement('div');
    elemForm.classList.add('elem-form');

    let elemFormTitle = document.createElement('input');
    elemFormTitle.type = 'text';
    elemFormTitle.value = 'Заголовок';
    elemForm.appendChild(elemFormTitle);

    let elemFormArea = document.createElement('textarea');
    elemFormArea.value = 'Текст';
    elemForm.appendChild(elemFormArea);

    let elemFormBack = document.createElement('input');
    elemFormBack.type = 'color';
    elemForm.appendChild(elemFormBack);

    let elemButtonOk = document.createElement('button');
    elemButtonOk.textContent = 'Ок';
    elemButtonOk.className = 'btn';
    elemForm.appendChild(elemButtonOk);

    let elemButtonCancel = document.createElement('button');
    elemButtonCancel.textContent = 'Отмена';
    elemButtonCancel.className = 'btn';
    elemForm.appendChild(elemButtonCancel);

    let block = document.createElement('div');
    block.classList.add('block');
    let blockId = 0;
    if(par.children.length == 0){
      blockId = 1;
    }else{
        for(let i = 0; i <= par.children.length; i++){
          blockId++;
        }
    }
    block.id = `block${blockId}_${par.id}`;
    block.style.left = '0px';

    let bodyElem = document.createElement('div');
    bodyElem.classList.add('body-elem');
    let bodyId = 0;
    if(par.children.length == 0){
        bodyId = 1;
    }else{
        for(let i = 0; i <= par.children.length; i++){
          bodyId++;
        }
    }
    bodyElem.id = `elem${bodyId}_${block.id}`;
    
    let hightY = 0;
    if(par.children.length == 0){
        hightY = 0;
    }else{
        for(let i = 0; i < par.children.length; i++){
            hightY += 150;
        }
    }
    block.style.top = hightY + 'px';
    if(!check){
        par.appendChild(block);
        block.appendChild(bodyElem);
        bodyElem.appendChild(elemForm);
    }else{
        par.appendChild(elemForm);
        elemFormTitle.value = par.children[0].textContent;
        elemFormArea.value = par.children[1].textContent;
        elemFormBack.value = `${rgb2hex(par.style.background)}`;
        elemButtonOk.addEventListener('click', () =>{
            par.children[0].textContent = elemFormTitle.value;
            par.children[1].textContent = elemFormArea.value;
            par.style.background = elemFormBack.value;
            if(par.style.background == 'rgb(0, 0, 0)'){
              par.style.color = 'white';
            }
            elemForm.remove();
        });
    }

    let divTitle = document.createElement('div');
    divTitle.classList.add('title');

    let divText = document.createElement('div');
    divText.classList.add('text');

    elemButtonOk.addEventListener('click', () =>{
        bodyElem.appendChild(divTitle);
        bodyElem.appendChild(divText);
        divTitle.textContent = elemFormTitle.value;
        divText.textContent = elemFormArea.value;
        bodyElem.style.background = elemFormBack.value;
        if(bodyElem.style.background == 'rgb(0, 0, 0)'){
          bodyElem.style.color = 'white';
        }
        elemForm.remove();
    });
    elemButtonCancel.addEventListener('click', () =>{
        elemForm.remove();
        bodyElem.remove();
        block.remove();
    });
}

function creatBlock(parent, child){
  let block = document.createElement('div');
  block.classList.add('block');
  let blockId = 0;
  if(parent.children.length == 0){
      blockId = 1;
  }else{
      for(let i = 0; i <= parent.children.length; i++){
        blockId++;
      }
  }
  block.id = `block${blockId}_${parent.id}`;
  block.style.left = '0px';

  let bodyElem = document.createElement('div');
  bodyElem.classList.add('body-elem');
  let bodyId = 0;
  if(parent.children.length == 0){
      bodyId = 1;
  }else{
      for(let i = 0; i <= parent.children.length; i++){
        bodyId++;
      }
  }
  bodyElem.id = `elem${bodyId}_${block.id}`;

  let hightY = 0;
  if(parent.children.length == 0){
      hightY = 0;
  }else{
      for(let i = 0; i < parent.children.length; i++){
          hightY += 150;
      }
  }
  block.style.top = hightY + 'px';

  let divTitle = document.createElement('div');
  divTitle.classList.add('title');

  let divText = document.createElement('div');
  divText.classList.add('text');
  
  bodyElem.appendChild(divTitle);
  bodyElem.appendChild(divText);
  divTitle.textContent = child.children[0].textContent;
  divText.textContent = child.children[1].textContent;
  bodyElem.style.background = child.style.background;
  if(bodyElem.style.background == 'rgb(0, 0, 0)'){
    bodyElem.style.color = 'white';
  }
  parent.appendChild(block);
  block.appendChild(bodyElem);
}

var dragObject = {};

document.onmousedown = function(e) {
  if(document.querySelector('.elem-form')){
    return;
  }
  if (e.which != 1) {
    return; 
  }

  var elem = e.target.closest('.body-elem');

  if (!elem){
    return;
  } 

  dragObject.elem = elem;
  dragObject.downX = e.pageX;
  dragObject.downY = e.pageY;
}

document.onmousemove = function(e) {
  if (!dragObject.elem){
      return;
  } 

  if (!dragObject.avatar) { 
    let moveX = e.pageX - dragObject.downX;
    let moveY = e.pageY - dragObject.downY;
    if ( Math.abs(moveX) < 3 && Math.abs(moveY) < 3 ) {
      return;
    }

    dragObject.avatar = createAvatar(); 
    if (!dragObject.avatar) {
      dragObject = {}; 
      return; 
    }
    dragObject.shiftX = dragObject.downX;
    dragObject.shiftY = dragObject.downY;

    startDrag(); 
  }

  dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
  dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

  return false;
}

function createAvatar() {
  let avatar = dragObject.elem;
  let old = {
    parent: avatar.parentNode,
    previousSibling: avatar.previousSibling,
    position: avatar.position || '',
    left: avatar.left || '',
    top: avatar.style.top || '',
    zIndex: avatar.zIndex || ''
  };
  // функция для отмены переноса
  avatar.rollback = function() {
    old.parent.insertBefore(avatar, old.previousSibling);
    avatar.style.position = old.position;
    avatar.style.left = old.left;
    avatar.style.top = old.top;
    avatar.style.zIndex = old.zIndex
  };

  return avatar;
}

function startDrag() {
  let avatar = dragObject.avatar;
  avatar.style.zIndex = 1000;
}

document.onmouseup = function(e) {
  if (dragObject.avatar) {
    finishDrag(e);
  }
  dragObject = {};
}

function finishDrag(e) {
  let dropElem = findDroppable(e).elem;
  let activElem = findDroppable(e).activElem;

  let dropElemBlock = document.getElementById(`${activElem.parentNode.id}`);
  let dropElemColumn = document.getElementById(`${dropElemBlock.parentNode.id}`);
  if (dropElem.closest('.body-elem')) {
      let bufer1 = dropElem.children[0].textContent;
      let bufer2 = dropElem.children[1].textContent;
      dropElem.children[0].textContent = activElem.children[0].textContent;
      dropElem.children[1].textContent = activElem.children[1].textContent;
      activElem.children[0].textContent = bufer1;
      activElem.children[1].textContent = bufer2;
      let value = `${rgb2hex(dropElem.style.background)}`;

      dropElem.style.background = activElem.style.background;
      if(dropElem.style.background == 'rgb(0, 0, 0)'){
        dropElem.style.color = 'white';
      }else dropElem.style.color = 'black';

      activElem.style.background = value;
      if(activElem.style.background == 'rgb(0, 0, 0)'){
        activElem.style.color = 'white';
      }else activElem.style.color = 'black';

      dragObject.avatar.rollback();
  }else if (dropElem.className == 'column__body' && dropElemColumn != dropElem) {
      creatBlock(dropElem, activElem);
      let index = [...dropElemBlock.parentElement.children].indexOf(dropElemBlock);
      dropElemColumn.removeChild(dropElemBlock);
      let age = 150;
      for(let i = index; i < dropElemColumn.children.length; i++){
        dropElemColumn.children[i].style.top  = `${(age * (i))}px`;
        dropElemColumn.children[i].id = `block${i+1}_${dropElemColumn.id}`;
        dropElemColumn.children[i].children[0].id = `elem${i+1}_${dropElemColumn.children[i].id}`
      }
  }else{
      dragObject.avatar.rollback();
  }
}

function findDroppable(event) {
  let activElem = document.elementFromPoint(event.clientX, event.clientY);
  if(activElem.className == 'title' || activElem.className == 'text'){
    activElem = activElem.parentElement;
  }
  dragObject.avatar.hidden = true;
  let elem = document.elementFromPoint(event.clientX, event.clientY);
  if(elem.className == 'title' || elem.className == 'text'){
    elem = elem.parentElement;
  }
  dragObject.avatar.hidden = false;

  if (elem == null) {
    return null;
  }

  return {
    elem: elem,
    activElem: activElem,
  }
}

function rgb2hex(rgb) {
    var rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
};


