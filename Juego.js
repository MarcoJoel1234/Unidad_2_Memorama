alert("Bienvenido al juego 'MEMORAMA'");

class Juego{//Inicio de la clase.

    constructor(){ //Constructor.
    }

    jugar(){ 
        //Llamar el metodo pedirNombre()
        this.pedirNombre();
        //Almacenar en una variable el numero de cartas.
        let f;
        //Mientras una condicion se cumpla esta cambiara su valor.
        let band = false;
         //Instrucciones
         alert("INSTRUCCIONES\n\n-Al ingresar el numero de cartas con las que deseas jugar solo podras ingresar un numero del 4 al 10\n-Solo puedes ingresar numeros pares");
         //Mientras el número no sea valido se repetira el proceso.
        while(!band){
            //Número de cartas
            f = parseInt(prompt(`${this._nombre} ingresa el numero de cartas con las que deseas jugar`));
            //Comprobar si el número es válido. 
            if((f%2 == 0) && (f <= 10 && f >= 4)){
                break; //Si el número es válido, el buble finaliza.
            }else{
                alert(`${this._nombre} has ingresado un caracter no valido`); //Manda a mostrar mensaje de que el número que se ingreso no fue correcto en caso de que se haya ingresado un número impar.
            }
        }
        
        this.generarArreglo(f);//Genera el arreglo
        alert("Se ha creado tu tablero\n!A jugar!");
        console.log(`${this._nombre}Este es tu tablero`);
        this.puntos = 0;
        this.vidas = 5; //El jugador iniciara con 5 vidas
        while(this.puntos < f/2 && this.vidas != 0){
            this.mostrarTablero(f); //Muestra el tablero.
            this.destaparCartas(f);
        }
        if(this.puntos == f/2){//Si la cantidad de puntos == a el numero de pares
            alert(`¡Felicidades ${this._nombre}, has ganado!`);
        }
        if(this.vidas == 0){ //Si las vidas == 0
            alert(`¡Que mal ${this._nombre} , has perdido!`);
        }
    }
    
    generarArreglo(tamanio){ //
        this.simbolos= ["♔", "♖", "♗", "♘", "♙"]; //Simbolos de las cartas.
        this.cartas = new Array(tamanio/2);//Arreglo donde se alamacenara una carta de cada par
        this.cartas1 = new Array(tamanio/2);//Arreglo donde se alamacenara una carta de cada par
        this.cartas3 = new Array(tamanio);//Arreglo combinado de cartas[] y cartas1[]
        this.tablero = new Array(tamanio);//Tablero donde estan ocultas las cartas
        
        for(let i = 0; i < tamanio/2; i++){  //Rellenar los tableros con los simbolos
            this.cartas[i] = this.simbolos[i];
            this.cartas1[((tamanio/2)-1) - i] = this.simbolos[i];
        }
        for(let m = 0; m < tamanio; m++){//Rellenar tablero con cartas ocultas.
            this.tablero[m] = "-"; 
        }
        for(let p = 0; p < tamanio; p++){//Juntar cartas[] y cartas1[] para generar el tablero con los simbolos
            if(p < tamanio/2){
                this.cartas3[p] = this.cartas[p];
            }else{
                this.cartas3[p] = this.cartas1[p - (tamanio/2)];
            }
        }
    } 
    //Método tablero.
    mostrarTablero(tamanio){
        let texto = "";
        let texto1 = ""; 
        for(let i = 0; i < tamanio; i++){//Almacenar en una variable de tipo string el tablero que se mostrara en consola
            texto1 += " |" + (i + 1) + "| ";
            texto += " |" + this.tablero[i] + "| ";
        }
        console.log(texto1); //Manda a imprimir las posiciones
        console.log(`${texto}\n\n`); //Manda a imprimir el arreglo con las cartas ocultas.
    }
    
    pedirNombre(){//Pedir el nombre del usuario.
        this._nombre = prompt("Ingresa el nombre del jugador: "); 
    }
    
    adivinarCartas(a, b){
        if(this.cartas3[a] == this.cartas3[b]){//Si la primera carta destapada == a la segunda
            alert("¡Muy bien, has adivinado un par!"); 
            this.puntos++;//Los puntos van sumando
            //El tablero se mostrara con el par de cartas adivinado
            this.tablero[a] = this.cartas3[a];
            this.tablero[b] = this.cartas3[b];
        }else{
            alert("¡Lo siento, no has adivinado!");
            this.vidas --; //Resta vidas de 1 por 1 en caso de un intento fallido.
            alert(`Te quedan ${this.vidas} vidas`);
            //Se vuelven a ocultar las cartas destapadas
            this.tablero[a] = "-";
            this.tablero[b] = "-";
        }
    }

    destaparCartas(tamanio){
        let band1 = false, band3 = false;
        let no1, no2;
        while(!band1){
            no1 = parseInt(prompt(`${this._nombre} ingresa la primera carta que deseas destapar`)); //Usuario ingresa la primer carta a destapar.
            if(no1 > tamanio || no1 < 1 || isNaN(no1)){
                alert("Has ingresado un caracter no valido");
            }else{
                band3 = false;
                for(let o = 0; o < this.cartas3.length; o++){
                    if(this.tablero[no1-1] == this.simbolos[o]){//Si se destapa una carta que ya habia sido seleccionada
                        alert("Has destapado una carta que ya habia sido destapada");
                        band3 = true;
                        break;
                    }
                }
                if(band3 == false){    
                    this.tablero[no1-1] = this.cartas3[no1-1];//Se muestra la carta destapada
                    this.mostrarTablero(tamanio);
                    band1 = true;
                }
            }
        }
        band3 = false;
        band1 = false;
        while(!band1){
            no2 = parseInt(prompt(`${this._nombre} ingresa la segunda carta que deseas destapar`)); //Usuario ingresa la segunda carta a destapar.
            if((no2 > tamanio || no2 < 1 || isNaN(no2))){
                alert("Has ingresado un caracter no valido");
            }else{
                band3 = false;
                for(let i = 0; i < this.cartas3.length; i++){
                    if(this.tablero[no2-1] == this.simbolos[i] || no2 == no1){//Si se destapa una carta que ya habia sido seleccionada
                        alert("Has destapado una carta que ya habia sido destapada");
                        band3 = true;
                        break;
                    }
                }
                if(band3 == false){
                    band1 = true;
                    this.tablero[no2-1] = this.cartas3[no2-1];//Se muestra la carta destapada
                    this.mostrarTablero(tamanio);
                }
            }
        }
        this.adivinarCartas(no1-1, no2-1); //Manda a llamar al método adivinar cartas con los parametros.
    }
}