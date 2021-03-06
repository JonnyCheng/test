/**
 * Created by chy on 15-8-31.
 */
var async = require('async');
//var poolConn = require("../model/util/mysqlPool");
var mysql = require('mysql');
var BaseQuery = function(/*param, callback*/) {

};

BaseQuery.prototype.find = function(conn, param, callback) {
    var sql = "SELECT * FROM ?? WHERE ?? = ?";
    var inserts = [param.table, 'id', mysql.escape(param.variable)];
    sql = mysql.format(sql, inserts);
    async.waterfall([
        function (_callback) {
            conn.query(sql, function (err, res) {
                var results = res.toObject(param.model);
                callback(err, results[0]);
                _callback(err, results, conn);
            });
        }
    ], function(err, result, conn) {
        if(err) {
            //console.log(err);
            throw err;
        }
    });
};

BaseQuery.prototype.create = function(conn, param, callback) {
    var sql = "INSERT INTO ?? SET ?";
    var inserts = [param.table, param.variable];
    sql = mysql.format(sql, inserts);
    async.waterfall([
        function (_callback) {
            conn.query(sql, function (err, res) {
                callback(err, res);
                _callback(err, res, conn);
            });
        }
    ], function(err, result, conn) {
        if(err) {
            //console.log(err);
            throw err;
        }
    });
};

BaseQuery.prototype.update = function(conn, param, callback) {
    var sql = "UPDATE ?? SET ? WHERE id = ?";
    var inserts = [param.table, param.variable, param.id];
    sql = mysql.format(sql, inserts);
    async.waterfall([
        function (_callback) {
            conn.query(sql, function (err, res) {
                callback(err, res);
                _callback(err, res, conn);
            });
        }
    ], function(err, result, conn) {
        if(err) {
            //console.log(err);
            throw err;
        }
    });
};

module.exports = BaseQuery;

//测试
//var baaseQuery = new BaseQuery();
//baaseQuery.update();
