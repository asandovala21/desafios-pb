const fs= require('fs');

class Contenedor {

    constructor(archivo)
    {
    this.filename=archivo
    }

    save= async (producto)=>{
    try { 
        if( fs.existsSync(this.filename)){
            let result= await this.getAll()
            let lastId= result.reduce((acc, item)=> item.id>acc? acc=item.id: acc,0 )
            let newProduct={
                id: lastId+1,
                ...producto
            }
            result.push(newProduct)

            await fs.promises.writeFile(this.filename, JSON.stringify(result,null,2));
        return lastId+1
        }else{
            let newProduct={
            id:1,
            ...producto
            }
        await fs.promises.writeFile(this.filename,JSON.stringify([newProduct],null,2))
            return 1
        }
    } catch (error) {
        console.log(error);
    }  
    }


    getById= async (id)=>{
        if(fs.existsSync(this.filename)){
            let result= await this.getAll()
            let producto=result.find(item => item.id == id)

            if (producto==undefined){
                producto=[null]
            }
            
            return producto
            
        }else{
            console.log("El archivo no existe")
        }
    }
  
    deleteById = async (id) => {
        if (fs.existsSync(this.filename)) {
            let result = await this.getAll()
            let largo_antes=result.length
            let nuevo=result.filter(item=>item.id!==id)
            if (nuevo.length == largo_antes) {
                console.log(`El id: ${id} no existe`)
            }
            else{
                try {
                await fs.promises.writeFile(this.filename, JSON.stringify(nuevo, null, 2))
                } catch (error) {
                console.log(error);
                }
            }            
        } else {
                console.log("El archivo no existe")
        }
    }

    deleteAll = async () => {
        if (fs.existsSync(this.filename)) {
            let n_result =[]
            try {
                await fs.promises.writeFile(this.filename, JSON.stringify(n_result, null, 2))
                } catch (error) {
                console.log(error);
            }            
        } else {
                console.log("El archivo no existe")
        }
    }



    getAll= async()=>{
        try {
            if( fs.existsSync(this.filename)){
                let result= await fs.promises.readFile(this.filename)
                return JSON.parse(result)
            }else{
            throw "No se encontro el archivo"
            }
            } catch (error) {
            console.log(error);
            }

    }

}

let contenedor= new Contenedor("productos.txt")
let producto ={
    title:"Papitas",
    price:100,
    thumbail:"https://www.comedera.com/wp-content/uploads/2022/04/Papas-rusticas-shutterstock_2022241940.jpg"

}
let producto2 ={
    title:"zanahoria",
    price:300,
    thumbail:"https://www.comedera.com/wp-content/uploads/2022/04/Papas-rusticas-shutterstock_2022241940.jpg"

}
let producto3 ={
    title:"Tomates",
    price:200,
    thumbail:"https://www.comedera.com/wp-content/uploads/2022/04/Papas-rusticas-shutterstock_2022241940.jpg"

}

metodos= async()=>{
 await contenedor.save(producto)
 await contenedor.save(producto2)
 await contenedor.save(producto3)
 
 console.log("La lista de objetos creada es:")
 console.log(await contenedor.getAll())

 console.log("El objeto con el id=1 es:")
 console.log(await contenedor.getById(1))
 console.log("El objeto con el id=3 es:")
 console.log(await contenedor.getById(3))
 console.log("El objeto con el id=0 es:")
 console.log(await contenedor.getById(0))
 console.log("La nueva lista de objetos eliminando el objeto con id=2 es:")
 await contenedor.deleteById(2)
 console.log(await contenedor.getAll())
 console.log("Eliminando todos los objetos")
 await contenedor.deleteAll()


}

metodos()