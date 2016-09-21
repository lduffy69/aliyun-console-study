define("common/helper/responsePreHandler", ["../cons/aliyunCons", "../services/topicService"], function(e) {
    var t = e.RESPONSE_CODE, n = e.SHOW_RESPONSE_ERROR_MESSAGE, r = function(e, r, i, s) {
        if (e.status == t.HTTP_SUCCESS) {
            var o = e.data;
            if (o.code == t.SUCCESS)
                return i == 1 ? o : o.data;
            if (s == 1)
                return;
            var u;
            return r ? r.invoke(["aliyunCommonTopicService", function(e) {
                u = e.publish(n, o, !0)
            }
            ]) : u = o.data, u
        }
    }, i = function(e, r, i, s, o) {
        if (e.status == t.HTTP_SUCCESS) {
            var u = e.data;
            if (u.code == t.SUCCESS)
                return i == 1 ? u : u.data;
            if (s == 1)
                return;
            var a;
            return r ? r.invoke(["aliyunCommonTopicService", function(e) {
                o && angular.isFunction(o) && o(u), a = e.publish(n, u, !0)
            }
            ]) : a = u.data, a
        }
    }, s = function(e, n, r) {
        if (e.status == t.HTTP_SUCCESS) {
            var i = e.data;
            if (i.code == t.SUCCESS)
                return r == 1 ? i : i.data;
            n && n.invoke(["$q", function(e) {
                var t = e.defer();
                return t.promise
            }
            ])
        }
    };
    return {
        responsePreHandler: r,
        responseHandler: i,
        responsePreHandlerNoDialog: s
    }
})