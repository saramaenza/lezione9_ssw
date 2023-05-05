import './style.css';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse, AjaxRequest, AjaxError } from 'rxjs/ajax';
const URL: string =
  'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint';
var key: string;
document.getElementById('newbtn').addEventListener('click', newKey);
document.getElementById('setbtn').addEventListener('click', setValue);
document.getElementById('getbtn').addEventListener('click', getValue);

//funzione per creare una chiave nuova
function newKey() {
  //ajax è una funzione che restituisce un observable
  const obs = ajax({
    method: 'GET',
    url: URL + '/new?secret=ssw2022',
    crossDomain: true, //dico che coinvolgo un'altro server esterno
  });
  obs.subscribe({
    //gestione della risposta (res è la risposta che ricevo)
    next: (res: AjaxResponse<any>) => {
      //la risposta che ricevo è la chiave contenuto dentro res.response
      //imposta dentro la variabile globale key il valore della chiave che ricevo dal server
      key = res.response;
      document.getElementById('key').innerHTML = key;
    },
    error: (err: AjaxError) => console.error(err.response),
  });
}

//acquisisce i dati che stanno nella input text
function setValue() {
  console.log(document.getElementById('data'));
  //nuovo observable ajax con metodo post, perchè voglio impostare un nuovo valore in corrispondenza della chiave
  const obs = ajax({
    method: 'POST',
    url: URL + '/set?key=' + key,
    crossDomain: true,
    //passiamo il dato che abbiamo inserito nella input text
    body: document.getElementById('data').value,
  });
  obs.subscribe({
    next: (res: AjaxResponse<any>) => {
      document.getElementById('output').innerHTML = 'Ok!';
    },
    error: (err: AjaxError) => console.error(err.response),
  });
}

//recupero il valore collegato alla chiave
function getValue() {
  //observable con la funzione ajax
  const obs = ajax({
    //spedisco una richiesta http con get
    method: 'GET',
    url: URL + '/get?key=' + key,
    crossDomain: true,
  });
  obs.subscribe({
    //la richiesta ha successo
    next: (res: AjaxResponse<any>) => {
      //il risultato viene stampato
      document.getElementById('output').innerHTML = res.response;
    },
    error: (err: AjaxError) => console.error(err.response),
  });
}
