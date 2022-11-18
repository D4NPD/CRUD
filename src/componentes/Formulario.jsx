import React from "react";
import {firebase} from "../firebase";
import './Formulario.css'

function Formulario(){

  const [registrado, setRegistrado] = React.useState(false)
  const [listaUsuarios, setLista] = React.useState([])
  const [nombre, setNombre] = React.useState('')
  const [apellido, setApellido] = React.useState('')
  const [id, setId] =  React.useState('')

  React.useEffect(()=>{
    const getData = async()=>{
      try {
        const db = firebase.firestore()
        const data = await db.collection('Usuarios').get()
        const arrayData = data.docs.map((doc)=>({id : doc.id,...doc.data()}))
        setLista(arrayData)
      } 
      catch (error) {
        console.log(error)
      } 
    }
    getData()
  },[])


  const registrar = async(e)=>{
    e.preventDefault()
    if(!nombre.trim() || !apellido.trim()){
      alert("Por favor complete los campos")
    }else{
      try {
        const db = firebase.firestore()
        const nuevoUsuario = {
          Nombre : nombre,
          Apellido : apellido
        }
        const data = await db.collection('Usuarios').add(nuevoUsuario)
        setLista([...listaUsuarios,{...nuevoUsuario,id : data.id}])
      } catch (error) {
        console.log(error)
      }
      e.target.reset()
      setNombre('')
      setApellido('')
    }
  }

  const eliminar = async(id)=>{
    try {
      const db = firebase.firestore()
      await db.collection('Usuarios').doc(id).delete()
      const nuevaLista = listaUsuarios.filter((usuario) => usuario.id !== id)
      setLista(nuevaLista)
    } catch (error) {
      console.log(error)
    }
  }

  const editar  = usuario =>{
    setRegistrado(true)
    setNombre(usuario.Nombre)
    setApellido(usuario.Apellido)
    setId(usuario.id)
  }

  const editarUsuario = async(e) =>{
    e.preventDefault()
    if(!nombre.trim() || !apellido.trim()){
      alert("Por favor complete los campos")
    }else{
      try {
        const db = firebase.firestore()
        await db.collection('Usuarios').doc(id).update({Nombre : nombre, Apellido : apellido})
        const nuevaLista = listaUsuarios.map((usuario)=> usuario.id === id ? {id,Nombre:nombre, Apellido:apellido} : usuario)
        setLista(nuevaLista)
        setApellido('')
        setNombre('')
        setRegistrado(false)
        setId('')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return(
    <div>
      <div className="col-12">
        <h2> {registrado ? 'Edición de Usuarios' : 'Registro de Usuarios'} </h2>
        <form onSubmit={registrado ? editarUsuario : registrar}>
          <input value={nombre} type="text" placeholder="Nombre" className="form-control mb-2" onChange={(e)=>setNombre(e.target.value)}/>
          <input value={apellido} type="text" placeholder="Apellido" className="form-control mb-2" onChange={(e)=>setApellido(e.target.value)}/>
          <div className="d-grid gap-2 mb-2">
          <button type="submit" className="btn btn-outline-success">{registrado ? "Editar" : "Registrar"}</button>
          </div>
        </form>
      </div>
      <div>
        <h2>Lista de Usuarios</h2>
        <div>
          {
            listaUsuarios.map((usuario)=>(
              <div key={usuario.id} className='contenedor-lista'>
                <div className='texto-usuario'>
                    {usuario.Nombre} - {usuario.Apellido}
                </div>
                <div className='btn btn-outline-secondary' onClick={()=>editar(usuario)}>Editar</div>
                <div className='btn btn-danger' onClick={()=>eliminar(usuario.id)}>Eliminar</div>
              </div>
            ))
          }
        </div>
        
      </div>
    </div>
  )
}

export default Formulario;