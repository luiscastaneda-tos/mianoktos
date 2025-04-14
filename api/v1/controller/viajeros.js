const { executeSP } = require("../../../config/db");
const model = require("../model/viajeros");

const create = async (req, res) => {
  try {
    const response = await model.createViajero(req.body)
    res.status(201).json({ message: "Viajero creado correctamente", data: response })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error en el servidor', details: error })
  }
}

const read = async (req, res) => {
  try {
    const viajeros = await model.readViajero(req.body)
    res.status(200).json(viajeros)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error en el servidor', details: error })
  }
}
const get_viajeros_by_id_agente = async (req,res) => {
  const {id_agente} = req.params;

  try {
    const viajeros= await executeSP("get_viajeros_by_id_agente",[id_agente]);
    if (!viajeros) {
     res.estatus(404).json({message: "No se han recuperado viajeros a partir de ese agente, intente con otro"}); 
    } else {
      res.status(200).json({message: "Viajeros recuperados con exito ",data: viajeros });
    }
  } catch (error) {
    res-(500).json({message: "Error interno del servidor", error: error});
  }
}
module.exports = {
  create,
  read, get_viajeros_by_id_agente
}