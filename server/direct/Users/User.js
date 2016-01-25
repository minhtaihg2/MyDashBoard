var pg = global.App.postgres;
var pgcfg = global.App.pgcfg;

var dberror = function (text, log, err, callback) {
    console.error(text + ' ' + err.toString() + ' ' + log);
    callback({
        message: {
            text: text,
            detail: err.toString()
        }
    });
    return false;
};

var unflatten = function(arr) {
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

var User = {

    // curl -v -H "Content-type: application/json" -d '{"action":"Users.User","method":"readNavTree","data":[{"userid":25,"from":"test2","node":"root"}],"type":"rpc","tid":5}' http://localhost:3001/direct
    readNavTree: function (params, callback) {
        console.log(params);
        //console.log(request.session);
        //console.log(request.session.userid);

        var iduser = 31;
        var sql = '';
        sql += 'select *, NOT EXISTS (select * from users.menu inm where inm.idparent = users.menu.id) leaf ';
        sql += 'from users.menu ';
        sql += 'where id IN (select idmenu from users.permissao p, users.utilizador u ';
        sql += 'where p.idgrupo = u.idgrupo and id = ' + iduser + ' ) ';
        sql += 'order by id ';

        if (params.userid && params.userid == 25) {
            sql = 'select id, reverse(text) as text, "iconCls", idparent, extjsview, "routeId", NOT EXISTS (select * from users.menu inm where inm.idparent = users.menu.id) leaf, true as checked from users.menu ';
        } else {
            sql = 'select *, NOT EXISTS (select * from users.menu inm where inm.idparent = users.menu.id) leaf from users.menu ';
        }
        //sql += 'order by id ';

        pg.connect(global.App.connection, function (err, client, done) {
            if (err)
                return dberror('Database error', `${err.toString()} SQL: ${sql}`, err, callback);
            client.query(sql, function (err, result) {
                if (err)
                    return dberror('Database error', `${err.toString()} SQL: ${sql}`, err, callback);
                var tree = unflatten(result.rows);
                callback(null, tree);
                done();
            });
        });
    }

};

module.exports = User;