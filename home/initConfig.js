define("home/initConfig", ["angular", "app", "common/helper/i18nHelper", "home/cons/homeCons", "home/utils/homeVariablesService", "common/helper/objectHelper", "home/controllers/_base", "common/controllers/commonController", "common/services/aliyunHttpHandler"], function(e, t, n, r, i) {
    t.config(["aliyunConsoleSettingProvider", function(e) {
        e.setProviderOptions({
            sessionTimeoutCode: "ConsoleNeedLogin",
            sessionTimeoutLink: "https://account.aliyun.com"
        })
    }
    ]), t.config(["$tooltipProvider", function(e) {
        e.options({
            appendToBody: !0,
            animation: !0
        })
    }
    ]), t.run(["$rootScope", "viewFrameworkSetting", function(e, t) {
        e.homeConsoleConfig = window.ALIYUN_HOME_CONSOLE_CONFIG, t.setProductId("home"), t.setSidebar("full"), t.setProductNavBar("disabled")
    }
    ]), t.config(["$translateProvider", function(e) {
        var t = window.ALIYUN_HOME_CONSOLE_MESSAGE || {};
        e.translations("zh", t), e.preferredLanguage("zh"), n.i18nConfig(t)
    }
    ])
})