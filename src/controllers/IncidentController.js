const connection = require('../database/connection');
const crypto = require('crypto');

module.exports={
    async insert(req,res){
        const {title, description, value} = req.body;
        const ong_id = req.headers.authorization;    
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        console.log(id);
        return res.json({id});
    },

    async getSpecificIncidents(req,res){
        const ong_id = req.headers.authorization;
        const incidents = await connection('incidents').where('ong_id',ong_id).select('*');

        res.json({incidents});
    },
    async get(req,res){
        const {page = 1} = req.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs','ongs.id','=','incidents.ong_id')
        .select(['incidents.*','ongs.name','ongs.email','ongs.whatsapp','ongs.city','ongs.uf'])
        .limit(5)
        .offset((page-1)*5);

        res.header('X-Total-Count',count['count(*)']);

        console.log(page);

        return res.json(incidents);
    },

    async delete(req,res){
        const { id } = req.params;
        const ong_id = req.headers.authorization;
        const incident = await connection('incidents')
        .where('id',id)
        .select('ong_id')
        .first();

        if(incident.ong_id !== ong_id){
            return res.status(401).json({ error: "Operation not authorized"});
        }

        await connection('incidents').where('id',id).delete();

        console.log('Item deletado');

        return res.status(204).send();
    }
}