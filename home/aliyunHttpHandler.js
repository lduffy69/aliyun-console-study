define("common/services/aliyunHttpHandler", ["angular", "./services", "../cons/aliyunCons", "../services/i18nService", "angular-growl", "../services/topicService"], function(e, t, n, r) {
    var i = r.getI18n("services.aliyunHttpHandler"), s = {
        timeoutTipPrefix: i.i18n("msg.timeoutTip.partOne"),
        timeoutTipSufix: i.i18n("msg.timeoutTip.partTwo"),
        error: i.i18n("msg.response.error")
    }, o = n.RESPONSE_CODE, u = n.SHOW_RESPONSE_ERROR_MESSAGE, a = n.ALIYUN_CONSOLE_SESSION_TIMEOUT;
    t.constant("aliyunConsoleConf", {
        linkHandler: function(e) {
            return e
        },
        httpOptionInterceptor: function(e) {
            return e
        },
        httpOptionWrapper: function(e) {
            return e
        },
        httpResponseInterceptor: function(e) {
            return e
        },
        responseSuccessCode: o.SUCCESS,
        enableSessionTimeout: !0,
        sessionTimeoutCode: o.SESSION_TIMEOUT,
        sessionTimeoutLink: "",
        sessionTimeoutNeedCallbackFunc: !0,
        labels: {
            SESSION_TIMEOUT1: s.timeoutTipPrefix,
            SESSION_TIMEOUT2: s.timeoutTipSufix,
            RESPONSE_ERROR: s.error
        }
    }).provider("aliyunConsoleSetting", ["aliyunConsoleConf", function(t) {
        var n = t;
        return {
            setProviderOptions: function(t) {
                e.extend(n, t)
            },
            setGlobalLabels: function(e) {
                n && (n.labels = e)
            },
            $get: function() {
                return n
            }
        }
    }
    ]).config(["$httpProvider", function(e) {
        e.interceptors.push("aliyunConsoleHttpInterceptor")
    }
    ]).config(["growlProvider", "$compileProvider", "$tooltipProvider", function(e, t, n) {
        e.onlyUniqueMessages(!0), e.globalTimeToLive(3e3), e.globalEnableHtml(!0), t.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/), n.options({
            animation: !1
        })
    }
    ]).factory("aliyun.console.request", ["aliyun.console.requestWrapper", "growl", "$q", "aliyunCommonTopicService", "aliyunConsoleSetting", function(e, t, n, r, i) {
        function s(s, a) {
            a = a || {};
            var s = i.linkHandler(s);
            if (a && a.method) {
                var f = a.method.toUpperCase();
                f == "POST" && (a.data == undefined && (a.data = {}), i.httpOptionInterceptor(a))
            } else
                a.method = "GET";
            return a && a.submitMessage && t.addSuccessMessage(a.submitMessage), i.httpOptionWrapper(a), e.sendRequestWithUrl(s, a).then(function(e) {
                var n = e.data, r = e.config;
                return r && n && n.code == o.SUCCESS && r.successMessage != undefined && t.addSuccessMessage(r.successMessage), e
            }, function(e) {
                return a && a.ignoreErrorHandler && a.ignoreErrorHandler == 1 ? n.reject(e) : (console.log(e), e.status !== o.HTTP_SUCCESS && r.publish(u, i.labels.RESPONSE_ERROR), n.reject(e))
            })
        }
        return {
            request: s
        }
    }
    ]).factory("aliyunConsoleHttpInterceptor", ["$q", "$rootScope", "aliyunConsoleSetting", "$injector", function(e, t, n, r) {
        return {
            response: function(i) {
                var s = i.data;
                return n.enableSessionTimeout && s.code == n.sessionTimeoutCode ? (t.$emit(a, i), e.reject(i)) : n.httpResponseInterceptor(i, r)===!1 ? e.reject(i) : i || e.when(i)
            },
            responseError: function(t) {
                return e.reject(t)
            }
        }
    }
    ]).run(["$rootScope", "aliyunCommonTopicService", "aliyunConsoleSetting", function(e, t, n) {
        var r = n.labels;
        e.gConfig == undefined && (e.gConfig = {
            sessionTimeout: !1
        }), e.$on(a, function(i, s) {
            var o;
            n.sessionTimeoutNeedCallbackFunc ? o = n.sessionTimeoutLink + "?oauth_callback=" + encodeURIComponent(location.href) : o = n.sessionTimeoutLink + encodeURIComponent(location.href);
            var a = r.SESSION_TIMEOUT1 + "<a href=" + o + ">" + r.SESSION_TIMEOUT2 + "</a>。";
            e.gConfig.sessionTimeout == 0 && (e.gConfig.sessionTimeout=!0, setTimeout(function() {
                var e = t.publish(u, a, !0);
                e.then(function(e) {
                    window.location = o
                })
            }, 0))
        })
    }
    ])
})