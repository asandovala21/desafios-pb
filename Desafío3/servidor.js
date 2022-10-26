const express = require('express')
const app = express()
const Contenedor = require('./Contenedor.js')

let contenedor= new Contenedor("productos.txt")

let producto ={
    title: "Escuadra",
    price: 123.45,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id:1

}
let producto2 ={
    title: "Calculadora",
    price: 234.56,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id:2

}
let producto3 ={
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    id:3

}


metodos= async()=>{
 await contenedor.save(producto)
 await contenedor.save(producto2)
 await contenedor.save(producto3)
}

metodos()

app.get('/productos', async (requisito, respuesta) => {
    let result = await contenedor.getAll()
    respuesta.send(result)
})

app.get('/productoRandom', async (requisito, respuesta) => {
    let result = await contenedor.getAll()
    //https://parzibyte.me/blog/2021/11/30/elemento-aleatorio-arreglo-javascript/#:~:text=Lo%20%C3%BAnico%20que%20tenemos%20que,%2C%200.123123128389213892189321%20%2C%200.999123%20%2C%20etc%C3%A9tera.
    let result_random=result[Math.floor(Math.random() * result.length)];
    respuesta.send(result_random)
})


//diapo 21 
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
