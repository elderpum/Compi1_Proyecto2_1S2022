import Entorno from "./Entorno";
import Excepcion from "../excepciones/Errores";
import { Instruccion } from "../abstracto/Instruccion";
import ListaSimbolo from "./ListaSimbolos";
import { Expresion } from "../expresiones/expresion";
import { nodoAST } from "../abstracto/nodoAST";

export default class ArbolAST {
    public instrucciones: Array<any>;
    public FUNCIONES: Array<Instruccion> = new Array<Instruccion>();
    public errores: Array<Excepcion> = new Array<Excepcion>();
    public consola: String;
    public global: Entorno;
    public raiz:nodoAST = new nodoAST("INSTRUCCIONES");
    public num_error:number = 0;
    public pilaCiclo:any[] = [];
    public pilaFuncion:any[] = [];
    private c:number=0;
    private grafo:string="";
    public exec: Array<Expresion> = new Array<Expresion>();
    public lista_simbolos:Array<any> = new Array<any>();
    constructor(instrucciones: Array<Instruccion>){
        this.instrucciones = instrucciones;
        this.consola = "";
        this.global = new Entorno();
    }

}