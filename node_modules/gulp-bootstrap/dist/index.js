/// <reference path="typings/main.d.ts" />
var through = require("through2");
var path = require("path");
module.exports = function (myArg1, myArg2) {
    if (myArg1 === void 0) { myArg1 = "undefined"; }
    if (myArg2 === void 0) { myArg2 = true; }
    return through.obj(function (file, enc, cb) {
        return cb(null, file);
    });
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBDQUEwQztBQUMxQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTNCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBQyxNQUFvQixFQUFDLE1BQWE7SUFBbEMsc0JBQW9CLEdBQXBCLG9CQUFvQjtJQUFDLHNCQUFhLEdBQWIsYUFBYTtJQUNoRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFTLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNyQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ0eXBpbmdzL21haW4uZC50c1wiIC8+XG52YXIgdGhyb3VnaCA9IHJlcXVpcmUoXCJ0aHJvdWdoMlwiKTtcbnZhciBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gKG15QXJnMSA9IFwidW5kZWZpbmVkXCIsbXlBcmcyID0gdHJ1ZSkgPT4ge1xuICAgIHJldHVybiB0aHJvdWdoLm9iaihmdW5jdGlvbihmaWxlLCBlbmMsIGNiKXtcbiAgICAgICAgcmV0dXJuIGNiKG51bGwsIGZpbGUpO1xuICAgIH0pO1xufTtcbiJdfQ==
