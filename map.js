
//importing external json file

import users from './results.json' with {type: 'json'};
const computers = users;

let listContainer = document.querySelector("#computerListWrapper");
let btn = document.querySelector("#addpcBtn").addEventListener("click", ()=>{
computerList();
});

function computerList(){
    if(listContainer.style.display === 'block'){
        listContainer.style.display = 'none';
    }
    else{
        listContainer.style.display = 'block';
    }
}

// fix modal
let bodyListener = document.querySelector('.wrapper')

bodyListener.addEventListener('click', ()=>{
    listContainer.style.display = 'none';
})

listContainer.innerHTML = ' ';

computers.forEach( (computer)=> {
    let computerObject = document.createElement('li');
    computerObject.style.width = '100%';
    let computerName = document.createElement('h4');
    let computerState = document.createElement('h5');
    computerState.classList.add('statusTag')
    let computerIP = document.createElement("p");
    let ipType = document.createElement('h5');
    ipType.classList.add('ipType');
    
    computerName.textContent = `Name: ${computer.Name}`
    computerState.textContent = `${computer.State}`
    computerIP.textContent = `IP: ${computer.IPAddress}`

    //Append rest of values
    computerObject.appendChild(computerName);
    computerObject.appendChild(computerState);
    computerObject.appendChild(computerIP);

    //what if the IP Value is null?

    if(computer.IPAddress === null){
        computerIP.textContent = 'Unable to ping:(';
        computerObject.appendChild(computerIP);
    }
    
    //designate IP Type

   else if(computer.State === "On" && computer.IPAddress.split('.')[2] === '10'){
        ipType.textContent = 'Local Network';
        computerObject.appendChild(ipType);
    }

    else if(computer.State === "On" && computer.IPAddress.split('.')[2] === '110'){
        ipType.textContent = 'VPN';
        computerObject.appendChild(ipType);
    }

  

   computerObject.addEventListener('click', ()=>{
    // this calls the function to create a draggable node on click
    let dragDot = dragNode(computerObject);
    dragDot.style.background = indicator.style.background;
    console.log("div created");
    // need to restrict node area to just the map
    document.body.appendChild(dragDot);
   });


    let indicator = document.createElement('div')
    indicator.style.height = '10px';
    indicator.style.width = '10px';
    indicator.style.background = 'red';
    indicator.style.borderRadius = '50%';
    
    //this method adds a class to my programatically created div
    indicator.classList.add('status-indicator');

    if(computer.State === 'Off'){
        computerObject.appendChild(indicator);
    }

    else if(computer.State === 'On' && computer.IPAddress.split('.')[2] === '10'){
        indicator.style.background = 'blue';
        computerObject.appendChild(indicator);
    }

    else{
        indicator.style.backgroundColor = 'green';
        computerObject.appendChild(indicator);
    }

    listContainer.appendChild(computerObject);
    console.log(computerObject);
});

// this function creates the draggable nodes
function dragNode(computerElement) {
    let dot = document.createElement('div');
    dot.classList.add('draggable-dots');
    dot.style.zIndex = '1';

    // Create and append the pop-up
let popUp = createPopUp(computerElement);
document.body.appendChild(popUp);

    // Variables to track dragging state and offsets
let offsetX = 0, offsetY = 0, isDragging = false;

    // Event listener for mousedown to start dragging
dot.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - dot.getBoundingClientRect().left;
    offsetY = e.clientY - dot.getBoundingClientRect().top;
    // popUp.style.display = 'block'; // Show pop-up on mousedown
    });

    dot.addEventListener('click', ()=>{
        popUp.style.display = 'block';
    })

    // Event listener for mousemove to handle dragging
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const mapArea = document.querySelector('.mapArea').getBoundingClientRect();
            const newX = e.pageX - offsetX;
            const newY = e.pageY - offsetY;

            // Check if new position is within mapArea bounds
            if (newX >= mapArea.left && newX <= mapArea.right - dot.clientWidth &&
                newY >= mapArea.top && newY <= mapArea.bottom - dot.clientHeight) {
                dot.style.left = newX + 'px';
                dot.style.top = newY + 'px';
                popUp.style.left = newX - 90 + 'px'; // Adjusted position for pop-up
                popUp.style.top = newY - 120 + 'px'; // Adjusted position for pop-up
            }
        }
    });

    // Event listener for mouseup to stop dragging
    document.addEventListener('mouseup', () => {
        isDragging = false;
        popUp.style.display = 'none'; // Hide pop-up
    });

    return dot;
}


function createPopUp(computerElement){
let popUp = document.createElement('span');
popUp.classList.add('popUp');

//clone the child nodes from the computer elemnt

Array.from(computerElement.childNodes).forEach(child => {
    let clonedChild = child.cloneNode(true);
    popUp.appendChild(clonedChild);
});

return popUp;
}













