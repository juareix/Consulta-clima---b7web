document.querySelector('.busca').addEventListener('submit', async (event) => { //verifica se o formulário foi enviado (verifica se o botão foi pressionado...)
    event.preventDefault(); //previne o comportamento padrão que o formulário deveria ter. Evita que a pagina seja atualizada

    let input = document.querySelector('#searchInput').value; //pegando o que foi digitado no input de pesquisa
    //console.log(input);

    if (input !== ""){ //verificando se o input está preenchido
        showWarning('Carregando...'); //mostrando mensagem enquanto carrega as informações

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=2362bee6328428b054ebe4c6f0ba2a3d&units=metric&lang=pt_br`; //URL DA API: Lembrar de oclocar o "encodeURI" para eliminar os espaços.
        //console.log(url);
        let results = await fetch(url);
        let json = await results.json();
        //console.log(json)
        if (json.cod === 200){
            showIfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempoIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        }else{
            clearInfo();
            showWarning('Não encontramos essa localização.');
        }

    }else {
        clearInfo();
    }
}); 

function showIfo(json){
    showWarning('');
    document.querySelector('.titulo').innerHTML = `${json.name},${json.country}`;  //mostrando o nome e o país da cidade selecionada
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`; //mostrando a temperatura
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`; //mostrando a velocidade do vento
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempoIcon}@2x.png`); //mostrando a imagem referente ao tempo
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`; //mostranto a direção do vento
    document.querySelector('.resultado').style.display = 'block'; //mostrando o bloco com as informações
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none'; //apagando bloco de informações
}