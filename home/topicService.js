define("common/services/topicService", ["./services"], function(e) {
    var t = {};
    return e.factory("aliyunCommonTopicService", ["$rootScope", "$q", function(e, n) {
        function r(t, r, i) {
            if (i===!0) {
                var s = n.defer();
                return angular.isString(r) ? r = {
                    message: r,
                    modalResultDeferred: s
                } : r.modalResultDeferred = s, e.$emit(t, r), s.promise
            }
            e.$emit(t, r)
        }
        function i(t, n) {
            return e.$on(t, n)
        }
        return t = {
            publish: r,
            subscribe: i
        }, t
    }
    ]), t
})