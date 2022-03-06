/* Creating command writing */
function createCommand(command) {
    document.getElementById('magma_form').reset();
    var entered_command = document.createElement('p');
    entered_command.innerText = `user:$ ${command}`;
    document.getElementById("command_outputs").appendChild(entered_command);
    document.getElementById("command_outputs").scrollTop = document.getElementById("command_outputs").scrollHeight;
  }
  
  function createMessage(content) {
    var entered_command = document.createElement('p');
    entered_command.innerText = `${content}`;
    document.getElementById("command_outputs").appendChild(entered_command);
    document.getElementById("command_outputs").scrollTop = document.getElementById("command_outputs").scrollHeight;
  }
  
  function createArguments(string){
    list = string.split(' ');
    list.shift();
    return list.join(' ');
  }  

/* function for sending and processing input */
function runCommand(command) {
    createCommand(command);

    switch (command.split(' ')[0]) {
        case 'help':
          createMessage('You can toggle the visibilty of Magma by pressing "\\"!');
          createMessage('\nhelp: Displays all commands and their parameters');
          createMessage('\nrainbow <cycle_time>: rotates the hues of all the colors on the webpage so it looks rainbow-ish. <cycle_time> is how many seconds it takes to do a full cycle from beginning to end.');
          createMessage('\nimg_replace <url>: replaces all images on a webpage with an image you choose via URL.');
          createMessage('\ncalc <equation>: returns the answer to <equation>, or will inject JS code if you write JS code in <equation>. (This command may not work on all websites)');
          break;

        case 'rainbow':
          document.body.animate([]);
          document.body.animate([{filter:'hue-rotate(0deg)'},{filter:'hue-rotate(360deg)'}],{duration:createArguments(command) * 1000,iterations:Infinity});
          createMessage("Rainbow!");
          break;

        case 'img_replace':
          images = document.getElementsByTagName('img');
          for (let i = 0;i != images.length; i++) {
              images[i].setAttribute('src',createArguments(command));
          }
          break;
        
        case 'calc':
          createMessage(eval(createArguments(command)));
    }
}

/* function for creating and styling all of the elements */
function makeElements() {
    /* Creating Magma div */
    div = document.createElement('div');
    div.style.backgroundColor = "#111111";
    div.style.border = "5px solid #aa0000";
    div.style.borderRadius = "20px";
    div.style.width = "400px";
    div.style.height = "350px";
    div.style.position = "absolute";
    div.style.left = "50px";
    div.style.top = "50px";
    div.style.zIndex = "100";
    div.style.filter = "drop-shadow(0 0 1rem #ff0000)";
    div.style.visibility = "visible";
    /* Creating input field */
    form = document.createElement('form');
    form.setAttribute('onsubmit','return false;');
    form.setAttribute('id','magma_form');
    submit = document.createElement('input');
    submit.setAttribute('type','submit');
    submit.setAttribute('onclick','runCommand(document.getElementById("magma_input").value);');
    submit.style.visibility = "hidden";
    input = document.createElement('input');
    input.setAttribute('id','magma_input');
    input.style.width = "300px";
    input.style.height =  "30px";
    input.style.backgroundColor = "#222222";
    input.style.marginLeft = "48px";
    input.style.marginTop = "22.5px";
    input.style.border = "0px solid #000000";
    input.style.borderRadius = "10px";
    input.style.fontFamily = "monospace";
    input.style.color = "#aa0000";
    input.style.outline = 'none';
    /* Creating command output field */
    command_outputs = document.createElement('div');
    command_outputs.setAttribute('id','command_outputs');
    command_outputs.style.marginTop = '5px';
    command_outputs.style.width = '400px';
    command_outputs.style.height = '270px';
    command_outputs.style.fontFamily = "monospace";
    command_outputs.style.color = "#aa0000";
    command_outputs.style.overflow = "auto";
    command_outputs.style.borderBottom = '3px solid #aa0000';
    form.appendChild(input);
    form.appendChild(submit);
    div.appendChild(command_outputs);
    div.appendChild(form);
    document.body.appendChild(div);
    /* Making visibility toggalable */
    document.addEventListener('keydown', toggleVisible);
    function toggleVisible(e) {
      moves = {'hidden':'visible','visible':'hidden'};
      if (e.code == 'Backslash') {
        div.style.visibility = moves[div.style.visibility];
        console.log(div.style.visibility);
      }
    }
}