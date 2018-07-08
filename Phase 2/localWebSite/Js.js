function GetData() {
    let request = new XMLHttpRequest();

    request.open('GET', 'http://192.168.1.105:4545', false);

    request.send(null);

    let res = request.responseText;
    return JSON.parse(res);
}

function GetDataFake() {
    let data = '[{"Nickname":"Tubelight","Room":"HallLights","State":false,"Brightness":100},{"Nickname":"Square","Room":"Kitchen","State":true,"Brightness":100},{"Nickname":"Tube","Room":"Kitchen","State":true,"Brightness":100},{"Nickname":"Tube","Room":"Ankur BedRoom","State":true,"Brightness":100},{"Nickname":"CFL","Room":"Ankur BedRoom","State":false,"Brightness":100}]';
    return JSON.parse(data);
}

function SendData(message) {
    console.log(message);
    let json = JSON.stringify(message);
    console.log(json);

    let request = new XMLHttpRequest();

    request.open('POST', 'http://192.168.1.105:4545', false);

    request.send(json);
}



function MakeDom() {
    let lights = GetData();
    let currentRoom = '';

    lights.forEach(element => {
        //console.log(element);
        //let x =document.createElement('div');
        if (currentRoom !== element.Room) {
            let heading = document.createElement('h3');
            heading.innerText = element.Room;
            currentRoom = element.Room;
            document.getElementById('data').appendChild(heading);
        }

        let Light = document.createElement('div');

        let Nickname = document.createElement('div');
        Nickname.textContent = element.Nickname;
        Light.appendChild(Nickname);
        Light.className = 'card';

        let State = document.createElement('input');
        State.type = 'checkbox';
        State.checked = element.State;

        State.onchange = function () {
            element.State = State.checked;
            SendData(element);
        };

        let Brightness = document.createElement('input');
        Brightness.type = 'range';
        Brightness.min = '0';
        Brightness.max = '100';
        Brightness.value = element.Brightness;

        Brightness.onchange = function () {
            element.Brightness = Brightness.value;
            SendData(element);
        }

        Light.appendChild(State);
        Light.appendChild(Brightness);

        document.getElementById('data').appendChild(Light);
    });
}

MakeDom();



