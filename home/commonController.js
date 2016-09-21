define("common/controllers/commonController", ["./controller", "angular", "app", "../cons/aliyunCons", "../services/i18nService", "../services/Dialog", "../services/topicService"], function(e, t, n, r, i) {
    var s = i.getI18n("commonController"), n = n || e;
    n.provider("commonControllerConfig", function() {
        var e = {
            labels: {
                DIALOG_TITLE: s.i18n("dialog.title"),
                BTN_OK: s.i18n("dialog.btn.ok")
            }
        };
        return {
            setGlobalLabels: function(t) {
                e && (e.labels = t)
            },
            $get: function() {
                return e
            }
        }
    }), e.controller("aliyunCommonController", ["$scope", "$rootScope", "aliyunCommonTopicService", "aliyunDialog", "commonControllerConfig", function(e, n, i, o, u) {
        function c(e) {
            function c(t, n) {
                t && t.resolve({
                    buttonResult: n,
                    messageOptions: e
                }), l = null
            }
            var n = e, r = u.labels, i, s;
            t.isObject(e) && (n = e.message, n == undefined && (e.data && e.data.message ? n = e.data.message : n = a), i = e.modalResultDeferred, s = e.iconClass);
            var f = [{
                result: !0,
                label: r.BTN_OK,
                cssClass: "btn btn-primary"
            }
            ], h = o.showMessageDialogSimple(r.DIALOG_TITLE, n, f, e);
            return h.result.then(function(e) {
                c(i, e)
            }, function(e) {
                c(i, e)
            }), l
        }
        var a = s.i18n("defaultErrorMsg"), f = r.SHOW_RESPONSE_ERROR_MESSAGE, l;
        i.subscribe(f, function(e, n) {
            l != null && (l.close(!1), l = null), t.isString(n) && (n = {
                message: n
            }), n.iconClass = "icon-no-2", c(n)
        })
    }
    ])
})