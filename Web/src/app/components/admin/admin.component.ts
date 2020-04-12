import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import axios from 'axios' // Este import es importante, es con lo que se hacen los gets
import {Workers} from 'src/app/components/admin/worker';
import {SingleSeller} from 'src/app/components/admin/singleSeller';
import { SingleProduct } from './singleProduct';
import { singleBranch } from './singleBranch';
import { singleEmployee } from './singleEmployee';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private httpClient: HttpClient
    ) { }
    




  //Archivos usados para proyectar en las tablas
  items = [{"trackingID":123321,"client":"Ale","description":"Pandora\u0027s Box","deliveryDate":"4/5/2020","status":"On the way"},{"trackingID":456654,"client":"Kevin","description":"Chest","deliveryDate":"3/12/2020","status":"Customs"},{"trackingID":963366,"client":"Kevin","description":"Chest","deliveryDate":"3/12/2020","status":"Customs"},{"trackingID":489987,"client":"Jose","description":"Box Concept","deliveryDate":"8/8/2030","status":"Customs"}]
  branches = [{"name":"Gollo","address":"200 m south from La Fiesta del Maiz, El Bosque residential","province":"Alajuela","phone":87654321,"boss":"Ale","city":"La Garita","id":987},{"name":"El Verdugo","address":"250 m north from the TEC","province":"Cartago","phone":132435678,"boss":"Jesus","city":"Cartago","id":123},{"name":"Artelec","address":"100 m north from Ale\u0027s house","province":"Alejuela","phone":90909090,"boss":"Kevin","city":"Grecia","id":564},{"name":"Monge","address":"500 m south from La Basilica","province":"Cartago","phone":12345678,"boss":"Acuna","city":"Limon","id":675}]
  employees = [{"name": "Jose","department": "Delivery","eMail": "joseda@gmail.com","password": "4321","id": 1},{"name": "Ale","department": "Warehouse","eMail": "joseda@gmail.com","password": "4321","id": 2},{ "name": "Kevin", "department": "Administration","eMail": "joseda@gmail.com","password": "4321","id": 3},{"name": "Jesus","department": "Delivery","eMail": "joseda@gmail.com","password": "4321","id": 4}]
  workers = [{"idNumber":101,"fullName":"Ale Ibarra","birthday":"13/7/2000","entryDate":"3/12/2018","branch":"Monge","hourlyWage":5000,"monthlyWage":500000},{"idNumber":102,"fullName":"Jose David Sanchez","birthday":"5/4/1998","entryDate":"10/1/2019","branch":"Gollo","hourlyWage":1000,"monthlyWage":100000},{"idNumber":103,"fullName":"Jesus Sandoval","birthday":"7/12/1999","entryDate":"4/3/2015","branch":"Gollo","hourlyWage":10000,"monthlyWage":1000000},{"idNumber":100,"fullName":"Kevin Cordero","birthday":"3/12/1999","entryDate":"5/10/2018","branch":"Monge","hourlyWage":10000,"monthlyWage":100000}]
  sellers = [{"name":"Sahid","id":998},{"name":"Juancho","id":997},{"name":"Erick","id":996},{"name":"Esteban","id":999},{"name":"Kevin","id":0}]
  products = [{"name":"Chest","description":"Just another wooden chest to store your items in. If you buy two of them and place them next to each other, they will magically fuse and you\u2019ll get double the storage, talk about a deal! This chest ships in its crafted form, so you can get to storing all your diamonds and stacks of cobblestone right away. There\u2019s a random chance that your product will have a treasure inside.Arrr, matey!","barcode":1001,"seller":"Sahid","price":19,"paysTax":false,"discount":0,"entryDate":"9/8/2015","sales":50},{"name":"Apple TV 4K","description":"It\u2019s technically a box, one of the most advanced boxes we have. It\u2019s not very popular, the remote sucks and tvOS could use some work, but it has cool screensavers of landscapes and cities, so it\u2019s 100% worth it. Now you can ask him / her out for some coffee \u2014ahem\u2014 and sit down(or however you like it) for some Netflix \u0026chill on your Apple TV.Everyone has a background playlist, anyway.","barcode":998,"seller":"Juancho","price":199,"paysTax":true,"discount":5,"entryDate":"1/3/2017","sales":25},{"name":"Dropbox","description":"This box is ethereal. Here, you can store everything you could ever want, provided you use magical tools to abstract it into millions of 0\u2019s and 1\u2019s. You could eventually store yourself here, every memory, even that time he/she rejected your hand-made flower pot. No? Was it just me?","barcode":100,"seller":"Erick","price":9,"paysTax":false,"discount":0,"entryDate":"15/3/2019","sales":3},{"name":"Box Braids","description":"Margaret, why is this here?! Well, umm\u2026 I don\u2019t really know much about hair, but my girlfriend insisted that I needed to take an interest in what she likes.Something about getting to know each other, blah blah blah\u2026 Then again, it\u2019s cool to learn new things for a change. That\u2019s probably what I love the most about her.","barcode":789,"seller":"Juancho","price":49,"paysTax":false,"discount":10,"entryDate":"9/7/2013","sales":15},{"name":"Box Concept","description":"Someone recently asked me: \u201CWhat is it that you do?\u201D, and I replied with: \u201CI sell boxes, bitch!\u201D. Then, she looked at me with the face of an angry duck and said: \u201CWhat\u2019s a box?\u201D The question made a sparky mess inside my tiny human mind until I took a step back(literally, I was about to fall into a river) and realized the truth. A box is whatever we want it to be.A box is everything, and nothing, at the same time. This concept changed the way I looked at the world, so of course, I decided to charge for it. That\u2019d be $20.Right down, Sir / Ma\u2019am.","barcode":99999,"seller":"Juancho","price":20,"paysTax":true,"discount":0,"entryDate":"1/1/2020","sales":100},{"name":"Box Jellyfish","description":"For this one, we really wanted to take it to the extreme. The Box Jellyfish comes loaded with cool new features like a waterproof design and wireless charging. Be careful, it might sting you though, voltage is not regulated. Warning: Does not come with food, or a tank, or water. Actually, you might need to rehydrate it and apply dark magic with Elven runes to revive it. We apologize for this inconvenience.","barcode":13221123,"seller":"Erick","price":99,"paysTax":true,"discount":50,"entryDate":"4/8/2005","sales":65},{"name":"Bunch \u2018O Boxes","description":"Just a bunch \u2018o boxes layin\u2019 round in this junkyard. I guess there\u2019s not much to say here. Go eat something, dude! No one\u2019s gonna read this anyway, and if they do, do you really think they\u2019d click on a stupid picture of cardboard boxes? No! Go out! Make friends! Get drunk with coffee Coke and Caribbean rum! Ain\u2019t nobody got time to buy a bunch \u2018o boxes, anyway.","barcode":7777,"seller":"Esteban","price":9,"paysTax":true,"discount":1,"entryDate":"2/10/2014","sales":40},{"name":"Pandora\u0027s Box","description":"Did you know that the original story from greek mythology mentions a large storage jar rather than a box? From the brilliant minds behind TECBox and the makers of overpriced silver jewelry, comes the most sinister box of all time, all in a nice tidy package that you can put wherever you want. Place it on your bedside table, kitchen, or use it as a step to reach the jar of cookies on your fridge. Just be careful not to open it, it will release much more evil into the world. Oh, look, there\u2019s a small shiver of hope left. (Yes, you can put charms in it, just don\u2019t overdo it)","barcode":666,"seller":"Esteban","price":799,"paysTax":true,"discount":10,"entryDate":"12/3/2010","sales":10000}]

  ngOnInit(): void {
    
  }
  //Esto es para hacer gets y guarda lo que obtenga en la var json, de una vez parseado
  async getDataFromServer(){
    let url = 'meta el url aqui'// Usar el url como una variable para mantener el orden
    let response = await fetch(url); // Await espera la respuesta y fetch es una vara propia de JS
    if (response.ok) { 
      let json = await response.json();// Parsea lo que sea que me mande como un Json sin importar que sea
    } else {
      alert("HTTP-Error: " + response.status);//Este Else es en caso de que pegue algún error
    }
  }

  //Esta vara define el formato HTTP que se va a usar para hacer todos los post al server, como tal es un formato permanente(Tampoco tocar y no borrar ningun import de los que hice)
  sendPostRequest(data: any): Observable<any> {
    return this.httpClient.post<any>('meta el url aqui', data);
}
//Esta otra vara es la que hace post como tal(No tocar, paso un error y tuve que borrarla, son las 6 a.m y tengo suen, ahora la corrijo)
  

//Metodos de los botones para los workers
  addWorker(){ //Metodo para agrergar un nuevo trabajador

    //Variables que recojen los datos directamente del entry
    let idName = document.getElementById('uno').nodeValue
    let fullName = document.getElementById('dos').nodeValue;
    let birthday = document.getElementById('tres').nodeValue;
    let entryDay = document.getElementById('cuatro').nodeValue;
    let branch = document.getElementById('cinco').nodeValue;
    let hourlyWage = document.getElementById('seis').nodeValue;
    let monthlyWage = document.getElementById('siete').nodeValue;


    //Instancia incial de la clase molde workers
    let worker = new  Workers();

    //Este segmento agrega los datos obtenidos de los entries directo a la instancia
    worker.idName = idName;
    worker.fullName = fullName;
    worker.birthday = birthday;
    worker.entryDay = entryDay;
    worker.branch = branch;
    worker.hourlyWage = hourlyWage;
    worker.monthlyWage = monthlyWage;

    //Este segmento vacia los entries
    document.getElementById('uno').nodeValue = null;
    document.getElementById('dos').nodeValue = null;
    document.getElementById('tres').nodeValue = null;
    document.getElementById('cuatro').nodeValue = null;
    document.getElementById('cinco').nodeValue = null;
    document.getElementById('seis').nodeValue = null;
    document.getElementById('siete').nodeValue = null;

    //Este segmento serializa la instancia worker a Json, primero de objeto a string y luego de string a Json
    var dataWorker = { "ID":worker.idName, "Name": worker.fullName, "BirthDay": worker.birthday, "Entry":worker.entryDay, 'Branch': worker.branch, "HourlyWage":worker.hourlyWage, "MonthlyWage":worker.monthlyWage};
    var jsonStringWorker = JSON.stringify(dataWorker);
    var jsonWorker = JSON.parse(jsonStringWorker);

  }

//Este metodo es para agregar sellers
  addSeller(){//Metodo llamado por el boton

    //Esta parte obtiene los valores de los entries
    let name = document.getElementById('ocho').nodeValue;
    let idNumber = document.getElementById('nueve').nodeValue;

    //Creo una instancia de seller
    let seller = new SingleSeller();

    //le agrego valores a dicha instancia de seller
    seller.name = name;
    seller.idNumber = idNumber;

    //Vacio los entries
    document.getElementById('ocho').nodeValue = null;
    document.getElementById('nueve').nodeValue = null;

    //Creo el json de seller
    var dataSeller = {"firstName":name, "Id":idNumber};
    var jsonStringSeller = JSON.stringify(dataSeller);
    var jsonSeller = JSON.parse(jsonStringSeller);
  }


//Este metodo agrega productos
  addProduct(){
    let name = document.getElementById('diez').nodeValue
    let description = document.getElementById('once').nodeValue;
    let barcode = document.getElementById('doce').nodeValue;
    let seller = document.getElementById('trece').nodeValue;
    let price = document.getElementById('catorce').nodeValue;
    let payTaxes = document.getElementById('quince').nodeValue;
    let percentageDiscount = document.getElementById('dieciseis').nodeValue;
    let entryDate = document.getElementById('dieciseite').nodeValue;

    //Instancio product
    let product = new SingleProduct();

    //Le agrego valores a la instancia
    product.name = name;
    product.description = description;
    product.barcode = barcode;
    product.seller = seller;
    product.price = price;
    product.payTaxes = payTaxes;
    product.percentageDiscount = percentageDiscount;
    product.entryDate = entryDate;

    //Vacio los entries
    document.getElementById('diez').nodeValue = null;
    document.getElementById('once').nodeValue = null;
    document.getElementById('doce').nodeValue = null;
    document.getElementById('trece').nodeValue = null;
    document.getElementById('catorce').nodeValue = null;
    document.getElementById('quince').nodeValue = null;
    document.getElementById('dieciseis').nodeValue = null;
    document.getElementById('diecisiete').nodeValue = null;

    //Creo el Json de products
    var dataProduct = { "Name":product.name, "description": product.description, "Barcode": product.barcode, "Seller":product.seller, 'Price': product.price, "PayTaxes": product.payTaxes, "PercentageDiscount":product.percentageDiscount, "EntryDate": product.entryDate};
    var jsonStringProduct = JSON.stringify(dataProduct);
    var jsonWorker = JSON.parse(jsonStringProduct);
  }

//Este metodo agrega nuevas branch
  addBranch(){
    //Esta parte obtiene los valores de los entries
    let name = document.getElementById('b1').nodeValue;
    let address = document.getElementById('b2').nodeValue;
    let province = document.getElementById('b3').nodeValue;
    let phone = document.getElementById('b4').nodeValue;
    let city = document.getElementById('b5').nodeValue;
    let boss = document.getElementById('b6').nodeValue;

    //Creo una instancia de branch
    let branch = new singleBranch();

    //Le agrego valores a la instancia
    branch.name = name;
    branch.address = address;
    branch.province = province;
    branch.phone = phone;
    branch.city = city;
    branch.boss = boss;

    //Vacio los entries
    document.getElementById('b1').nodeValue = null;
    document.getElementById('b2').nodeValue = null;
    document.getElementById('b3').nodeValue = null;
    document.getElementById('b4').nodeValue = null;
    document.getElementById('b5').nodeValue = null;
    document.getElementById('b6').nodeValue = null;
    document.getElementById('b7').nodeValue = null;
    document.getElementById('b8').nodeValue = null;

    //Creo el Json de product
    var dataSeller = { "Name":branch.name, "Address": branch.address, "Province": branch.province, "Phone":branch.phone, 'City': branch.city, "Boss": branch.boss};
    var jsonStringSeller = JSON.stringify(dataSeller);
    var jsonSeller = JSON.parse(jsonStringSeller);
    
  }

//Este metodo agrega empleados
 addEmployee(){

    //Esta parte obtiene los valores de los entries
    let name = document.getElementById('e1').nodeValue;
    let deparment = document.getElementById('e2').nodeValue;

    //Creo una instancia de seller
    let employee = new singleEmployee();

    //Le agrego valores a la instancia
    employee.name = name;
    employee.deparment = deparment;

     //Vacio los entries
     document.getElementById('e1').nodeValue = null;
     document.getElementById('e2').nodeValue = null;

    //Creo el Json de product
    var dataEmployee = { "Name":employee.name, "Deparment": employee.deparment};
    var jsonStringEmployee = JSON.stringify(dataEmployee);
    var jsonEmployee = JSON.parse(jsonStringEmployee);
    console.log("Hola");

}
}