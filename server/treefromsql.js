/**
 * Created by jgr on 03-11-2015.
 */

var pg = require('pg');
var LTT = require('list-to-tree');

// npm install list-to-tree --save

function unflatten(arr) {
    var tree = [],
        mappedArr = {},
        arrElem,
        mappedElem;
    // First map the nodes of the array to an object -> create a hash table.
    for (var i = 0, len = arr.length; i < len; i++) {
        arrElem = arr[i];
        mappedArr[arrElem.id] = arrElem;
        mappedArr[arrElem.id]['children'] = [];
    }
    for (var id in mappedArr) {
        if (mappedArr.hasOwnProperty(id)) {
            mappedElem = mappedArr[id];
            // If the element is not at the root level, add it to its parent array of children.
            if (mappedElem.idparent) {
                mappedArr[mappedElem['idparent']]['children'].push(mappedElem);
            }
            // If the element is at the root level, add it to first level elements array.
            else {
                tree.push(mappedElem);
            }
        }
    }
    return tree;
};

var iduser = 31;
var sql = '';
sql += 'select *, NOT EXISTS (select * from users.menu inm where inm.idparent = users.menu.id) leaf ';
sql += 'from users.menu ';
sql += 'where id IN (select idmenu from users.permissao p, users.utilizador u ';
sql += 'where p.idgrupo = u.idgrupo and id = ' + iduser + ' ) ';
sql += 'order by id ';

sql = 'select *, NOT EXISTS (select * from users.menu inm where inm.idparent = users.menu.id) leaf from users.menu ';
//sql += 'order by id ';

pg.connect("postgres://geobox:geobox@localhost/geotuga", function (err, client, done) {
    client.query(sql, function (err, result) {
        if (err)
            console.log('Erro na query');
        //console.log(result.rows);
        // var tree = makeTree(result.rows);
        var tree = unflatten(result.rows);

        //var ltt = new LTT(result.rows, {
        //    key_id: 'id',
        //    key_parent: 'idparent'
        //});
        //var tree = ltt.GetTree();

        var result = {
            success: true,
            children: tree
        };
        console.log(JSON.stringify(result));

        // free this client, from the client pool
        done();
        // terminate
        pg.end();
    });
});
