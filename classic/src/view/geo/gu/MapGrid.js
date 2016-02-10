Ext.define("Admin.view.geo.gu.MapGrid", {
    extend: "Admin.view.geo.MapGrid",
    alias: 'widget.geo-mapgrid-gu',

    title: 'Edificado',

    //plugins: 'gridfilters',

    columns: [{
        xtype: 'gx_symbolizercolumn',
        width: 40
    }, {
        text: 'Internal ID',
        dataIndex: 'gid',
        width: 80,
        hidden: true,
        filter: {
            type: 'number'
        }
    }, {
        text: 'Inspire ID',
        dataIndex: 'inspireid',
        width: 80,
        filter: {
            type: 'number'
        }
    }, {
        text: 'Data (inser.)',
        dataIndex: 'data_inser',
        xtype: 'datecolumn',
        format: 'Y-m-d H:i:s',
        width: 150,
        filter: {
            type: 'date'
        }
    }, {
        text: 'Data (sub.)',
        dataIndex: 'data_sub',
        xtype: 'datecolumn',
        format: 'Y-m-d H:i:s',
        width: 150,
        hidden: true,
        filter: {
            type: 'date'
        }
    }, {
        text: 'Estado',
        dataIndex: 'estado',
        width: 120,
        filter: {
            type: 'string',
            value: 'funcional' // active with tis initial value
        }
    }, {
        text: 'Valor Elev.',
        dataIndex: 'valor_elev',
        xtype: 'numbercolumn',
        //format: '0,000',
        width: 80,
        filter: {
            type: 'number'
        }
    }, {
        text: 'Função (Uso)',
        dataIndex: 'funcao_uso',
        flex: 1,
        filter: {
            type: 'string'
        }
    }, {
        text: 'Nº Proc.',
        dataIndex: 'n_proc',
        width: 80,
        filter: {
            type: 'string'
        }
    }, {
        text: 'Observações',
        dataIndex: 'obs',
        flex: 2,
        hidden: true,
        filter: {
            type: 'string'
        }
    }]

});

/*

 * gid	Integer	false	1/1
 * inspireid	Long	true	0/1
 * data_inser	String	true	0/1
 * data_sub	String	true	0/1
 * estado	String	true	0/1
 data_const	String	true	0/1
 data_renov	String	true	0/1
 refer_elev	String	true	0/1
 v_crsi	String	true	0/1
 * valor_elev	BigDecimal	true	0/1
 cota_p_a	BigDecimal	true	0/1
 cota_solei	BigDecimal	true	0/1
 ref_altura	String	true	0/1
 valor_altu	BigDecimal	true	0/1
 altura_max	BigDecimal	true	0/1
 nome	String	true	0/1
 tipo	String	true	0/1
* funcao_uso	String	true	0/1
 percent	BigDecimal	true	0/1
 num_fogos	Long	true	0/1
 habitantes	Long	true	0/1
 n_servicos	Long	true	0/1
 n_comercio	Long	true	0/1
 n_entradas	Long	true	0/1
 n_fracoes	Long	true	0/1
 n_pisos_ac	Long	true	0/1
 n_pisos_ab	Long	true	0/1
* n_proc	String	true	0/1
 n_alvara	String	true	0/1
 id_lev	BigDecimal	true	0/1
 siou	String	true	0/1
 fonte_vect	String	true	0/1
 fonte_alfa	String	true	0/1
 fonte_var	String	true	0/1
 ref_extern	String	true	0/1
 r_ext_nome	String	true	0/1
 perimetro	BigDecimal	true	0/1
 area	BigDecimal	true	0/1
 * obs	String	true	0/1
 the_geom	MultiPolygon	true	0/1
 u_insere	String	true	0/1
 d_insere	String	true	0/1
 u_actualiz	String	true	0/1
 d_actualiz	String	true	0/1

 */