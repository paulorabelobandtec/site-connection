'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Leitura = sequelize.define('Eventos',{	
		idEventos: {
			field: 'idEventos',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},	
		vTopo: {
			field: 'vTopo',
			type: DataTypes.REAL,
			allowNull: false
		},
		// dataHora: {
		// 	field: 'dataHora',
		// 	type: DataTypes.REAL,
		// 	allowNull: false
		// },
		dataHora: {
			field: 'dataHora',
			type: DataTypes.DATE, // NÃO existe DATETIME. O tipo DATE aqui já tem data e hora
			allowNull: false
		},
		momento_grafico: {
			type: DataTypes.VIRTUAL, // campo 'falso' (não existe na tabela). Deverá ser preenchido 'manualmente' no select
			allowNull: true
		}
	}, 
	{
		tableName: 'Eventos', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Leitura;
};
