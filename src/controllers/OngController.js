const connection = require('../database/connection');
const crypto = require('crypto');

module.exports={
    async insert(req,res){
        const {name,email,whatsapp,city,uf} = req.body;
    
        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });
        console.log(id);
        return res.json({id});
    },

    async get(req,res){
        const ongs = await connection('ongs').select('*');
        return res.json(ongs);
    },

    async login(req,res){
        const {id} = req.body;
        const ongs = await connection('ongs').select('name').where('id',id).first();

        if(!ongs){
            return res.status(400).json({error: `No ONG found with ID ${id}`});
        }

        return res.json(ongs);
    }
}