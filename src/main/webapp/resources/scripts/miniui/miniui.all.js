/*
 * V2.0.8
 */
mini = {
    components: {},
    uids: {},
    ux: {},
    isReady: false,
    byClass: function(_, $) {
        if (typeof $ == "string") $ = Lr0($);
        return jQuery("." + _, $)[0]
    },
    getComponents: function() {
        var _ = [];
        for (var A in mini.components) {
            var $ = mini.components[A];
            _.push($)
        }
        return _
    },
    get: function(_) {
        if (!_) return null;
        if (mini.isControl(_)) return _;
        if (typeof _ == "string") if (_.charAt(0) == "#") _ = _.substr(1);
        if (typeof _ == "string") return mini.components[_];
        else {
            var $ = mini.uids[_.uid];
            if ($ && $.el == _) return $
        }
        return null
    },
    getbyUID: function($) {
        return mini.uids[$]
    },
    findControls: function(E, B) {
        if (!E) return [];
        B = B || mini;
        var $ = [],
        D = mini.uids;
        for (var A in D) {
            var _ = D[A],
            C = E[If](B, _);
            if (C === true || C === 1) {
                $.push(_);
                if (C === 1) break
            }
        }
        return $
    },
    emptyFn: function() {},
    createNameControls: function(A, F) {
        if (!A || !A.el) return;
        if (!F) F = "_";
        var C = A.el,
        $ = mini.findControls(function($) {
            if (!$.el || !$.name) return false;
            if (YCJ(C, $.el)) return true;
            return false
        });
        for (var _ = 0,
        D = $.length; _ < D; _++) {
            var B = $[_],
            E = F + B.name;
            if (F === true) E = B.name[0].toUpperCase() + B.name.substring(1, B.name.length);
            A[E] = B
        }
    },
    getbyName: function(C, _) {
        var B = mini.isControl(_),
        A = _;
        if (_ && B) _ = _.el;
        _ = Lr0(_);
        _ = _ || document.body;
        var $ = this.findControls(function($) {
            if (!$.el) return false;
            if ($.name == C && YCJ(_, $.el)) return 1;
            return false
        },
        this);
        if (B && $.length == 0 && A && A.getbyName) return A.getbyName(C);
        return $[0]
    },
    getParams: function(C) {
        if (!C) C = location.href;
        C = C.split("?")[1];
        var B = {};
        if (C) {
            var A = C.split("&");
            for (var _ = 0,
            D = A.length; _ < D; _++) {
                var $ = A[_].split("=");
                B[$[0]] = decodeURIComponent($[1])
            }
        }
        return B
    },
    reg: function($) {
        this.components[$.id] = $;
        this.uids[$.uid] = $
    },
    unreg: function($) {
        delete mini.components[$.id];
        delete mini.uids[$.uid]
    },
    classes: {},
    uiClasses: {},
    getClass: function($) {
        if (!$) return null;
        return this.classes[$.toLowerCase()]
    },
    getClassByUICls: function($) {
        return this.uiClasses[$.toLowerCase()]
    },
    idPre: "mini-",
    idIndex: 1,
    newId: function($) {
        return ($ || this.idPre) + this.idIndex++
    },
    copyTo: function($, A) {
        if ($ && A) for (var _ in A) $[_] = A[_];
        return $
    },
    copyIf: function($, A) {
        if ($ && A) for (var _ in A) if (mini.isNull($[_])) $[_] = A[_];
        return $
    },
    createDelegate: function(_, $) {
        if (!_) return function() {};
        return function() {
            return _.apply($, arguments)
        }
    },
    isControl: function($) {
        return !! ($ && $.isControl)
    },
    isElement: function($) {
        return $ && $.appendChild
    },
    isDate: function($) {
        return $ && $.getFullYear
    },
    isArray: function($) {
        return $ && !!$.unshift
    },
    isNull: function($) {
        return $ === null || $ === undefined
    },
    isNumber: function($) {
        return typeof $ == "number"
    },
    isEquals: function($, _) {
        if ($ !== 0 && _ !== 0) if ((mini.isNull($) || $ == "") && (mini.isNull(_) || _ == "")) return true;
        if ($ && _ && $.getFullYear && _.getFullYear) return $.getTime() === _.getTime();
        if (typeof $ == "object" && typeof _ == "object" && $ === _) return true;
        return String($) === String(_)
    },
    forEach: function(E, D, B) {
        var _ = E.clone();
        for (var A = 0,
        C = _.length; A < C; A++) {
            var $ = _[A];
            if (D[If](B, $, A, E) === false) break
        }
    },
    sort: function(A, _, $) {
        $ = $ || A;
        A.sort(_)
    },
    removeNode: function($) {
        jQuery($).remove()
    },
    elWarp: document.createElement("div")
};
W4 = function(A, _) {
    _ = _.toLowerCase();
    if (!mini.classes[_]) {
        mini.classes[_] = A;
        A[DMah].type = _
    }
    var $ = A[DMah].uiCls;
    if (!mini.isNull($) && !mini.uiClasses[$]) mini.uiClasses[$] = A
};
WKkQ = function(E, A, $) {
    if (typeof A != "function") return this;
    var D = E,
    C = D.prototype,
    _ = A[DMah];
    if (D[_s] == _) return;
    D[_s] = _;
    D[_s][FjoU] = A;
    for (var B in _) C[B] = _[B];
    if ($) for (B in $) C[B] = $[B];
    return D
};
mini.copyTo(mini, {
    extend: WKkQ,
    regClass: W4,
    debug: false
});
Pi5 = [];
Ehny = function(_, $) {
    Pi5.push([_, $]);
    if (!mini._EventTimer) mini._EventTimer = setTimeout(function() {
        MiRM()
    },
    1)
};
MiRM = function() {
    for (var $ = 0,
    _ = Pi5.length; $ < _; $++) {
        var A = Pi5[$];
        A[0][If](A[1])
    }
    Pi5 = [];
    mini._EventTimer = null
};
Q9a = function(C) {
    if (typeof C != "string") return null;
    var _ = C.split("."),
    D = null;
    for (var $ = 0,
    A = _.length; $ < A; $++) {
        var B = _[$];
        if (!D) D = window[B];
        else D = D[B];
        if (!D) break
    }
    return D
};
mini.getAndCreate = function($) {
    if (!$) return null;
    if (typeof $ == "string") return mini.components[$];
    if (typeof $ == "object") if (mini.isControl($)) return $;
    else if (mini.isElement($)) return mini.uids[$.uid];
    else return mini.create($);
    return null
};
mini.create = function($) {
    if (!$) return null;
    if (mini.get($.id) === $) return $;
    var _ = this.getClass($.type);
    if (!_) return null;
    var A = new _();
    A.set($);
    return A
};
mini.append = function(_, A) {
    _ = Lr0(_);
    if (!A || !_) return;
    if (typeof A == "string") {
        if (A.charAt(0) == "#") {
            A = Lr0(A);
            if (!A) return;
            _.appendChild(A);
            return A
        } else {
            if (A.indexOf("<tr") == 0) {
                return jQuery(_).append(A)[0].lastChild;
                return
            }
            var $ = document.createElement("div");
            $.innerHTML = A;
            A = $.firstChild;
            while ($.firstChild) _.appendChild($.firstChild);
            return A
        }
    } else {
        _.appendChild(A);
        return A
    }
};
mini.prepend = function(_, A) {
    if (typeof A == "string") if (A.charAt(0) == "#") A = Lr0(A);
    else {
        var $ = document.createElement("div");
        $.innerHTML = A;
        A = $.firstChild
    }
    return jQuery(_).prepend(A)[0].firstChild
};
var QN0 = "getBottomVisibleColumns",
YX = "setFrozenStartColumn",
KYp = "showCollapseButton",
VXsF = "showFolderCheckBox",
UyB = "setFrozenEndColumn",
G_f = "getAncestorColumns",
MvX = "getFilterRowHeight",
B6L = "checkSelectOnLoad",
Q0t = "frozenStartColumn",
Ey1 = "allowResizeColumn",
Q5HB = "showExpandButtons",
Ivr = "requiredErrorText",
ZCi = "getMaxColumnLevel",
ESN = "isAncestorColumn",
G7 = "allowAlternating",
HeV = "getBottomColumns",
Zjca = "isShowRowDetail",
Kgt = "allowCellSelect",
Omk8 = "showAllCheckBox",
EVi = "frozenEndColumn",
Vps = "allowMoveColumn",
T1QG = "allowSortColumn",
SuKT = "refreshOnExpand",
XZ = "showCloseButton",
EZ = "unFrozenColumns",
JCo = "getParentColumn",
Df = "isVisibleColumn",
Tuu$ = "getFooterHeight",
GKS$ = "getHeaderHeight",
Jg = "_createColumnId",
Go0 = "getRowDetailEl",
Ico = "scrollIntoView",
M3a = "setColumnWidth",
Sf = "setCurrentCell",
JgC = "allowRowSelect",
YCZ3 = "showSummaryRow",
Hut = "showVGridLines",
H21 = "showHGridLines",
W5D = "checkRecursive",
Poz = "enableHotTrack",
UTyy = "popupMaxHeight",
VQb = "popupMinHeight",
Ao = "refreshOnClick",
Doo = "getColumnWidth",
WWo = "getEditRowData",
_vHS = "getParentNode",
_a = "removeNodeCls",
ESz = "showRowDetail",
MMb = "hideRowDetail",
JS8C = "commitEditRow",
EJkX = "beginEditCell",
YO4s = "allowCellEdit",
JSq = "decimalPlaces",
U4r = "showFilterRow",
GeJ = "dropGroupName",
DOef = "dragGroupName",
$Ch = "showTreeLines",
Hy2 = "popupMaxWidth",
W_s = "popupMinWidth",
TVO = "showMinButton",
Ubp1 = "showMaxButton",
OJy = "getChildNodes",
M$Es = "getCellEditor",
FII = "cancelEditRow",
FCt_ = "getRowByValue",
SAiG = "removeItemCls",
KmY = "_createCellId",
CyA = "_createItemId",
YZU = "setValueField",
Nhh = "getAncestors",
J9i = "collapseNode",
OeO = "removeRowCls",
Evr = "getColumnBox",
CEK = "showCheckBox",
LDnO = "autoCollapse",
Ol = "showTreeIcon",
$ed = "checkOnClick",
JXk = "defaultValue",
Op = "resultAsData",
In43 = "resultAsTree",
GRcU = "_ParseString",
TILf = "getItemValue",
UIg = "_createRowId",
Rol = "isAutoHeight",
JUS = "findListener",
Bzj = "getRegionEl",
Vow = "removeClass",
GJG = "isFirstNode",
RgBO = "getSelected",
Gg = "setSelected",
MWVQ = "multiSelect",
QIt = "tabPosition",
S6Y = "columnWidth",
Gq = "handlerSize",
VoB7 = "allowSelect",
IQ = "popupHeight",
Lsad = "contextMenu",
ZHMD = "borderStyle",
ZPUV = "parentField",
V_g = "closeAction",
CoM = "_rowIdField",
T_s = "allowResize",
JL = "showToolbar",
RsYU = "deselectAll",
NDHY = "treeToArray",
BHu = "eachColumns",
BH$ = "getItemText",
Rv = "isAutoWidth",
UUs = "_initEvents",
FjoU = "constructor",
P1G = "addNodeCls",
WWa = "expandNode",
F4b = "setColumns",
B$R = "cancelEdit",
Vms0 = "moveColumn",
FXFd = "removeNode",
TPa = "setCurrent",
Kce = "totalCount",
GVSp = "popupWidth",
YG = "titleField",
SY0C = "valueField",
Xqk = "showShadow",
CmkD = "showFooter",
WVdp = "findParent",
Id9 = "_getColumn",
MTh = "_ParseBool",
_LP = "clearEvent",
BMF = "getCellBox",
X9 = "selectText",
NXq = "setVisible",
Xfnk = "isGrouping",
Mj = "addItemCls",
Iq4 = "isSelected",
Pa = "isReadOnly",
_s = "superclass",
KDO = "getRegion",
NQ = "isEditing",
AXKv = "hidePopup",
MgK = "removeRow",
Hbg = "addRowCls",
T6W = "increment",
Snd = "allowDrop",
Tp = "pageIndex",
Wt3 = "iconStyle",
YYG = "errorMode",
XND = "textField",
Njwq = "groupName",
CN = "showEmpty",
V6FA = "emptyText",
Vb2Y = "showModal",
Bp6 = "getColumn",
SeC = "getHeight",
Ova = "_ParseInt",
Pyu = "showPopup",
X1 = "updateRow",
QLD = "deselects",
Gf = "isDisplay",
ORwC = "setHeight",
DY = "removeCls",
DMah = "prototype",
CeSH = "addClass",
Bil = "isEquals",
NFp = "maxValue",
SyWd = "minValue",
KsM = "showBody",
YvHa = "tabAlign",
NT4 = "sizeList",
Jw = "pageSize",
OiZK = "urlField",
SXB = "readOnly",
R5Kf = "getWidth",
VP$ = "isFrozen",
HE1 = "loadData",
P53 = "deselect",
XFB = "setValue",
NGT6 = "validate",
XNM = "getAttrs",
Id = "setWidth",
SbW = "doUpdate",
A6_ = "doLayout",
HEq = "renderTo",
Woc = "setText",
UJwj = "idField",
F1tp = "getNode",
YKh = "getItem",
FN_ = "repaint",
M03 = "selects",
_CY = "setData",
RsE = "_create",
HFtw = "destroy",
I3G = "jsName",
FUvB = "getRow",
Ju6 = "select",
ZZJ = "within",
Ze = "addCls",
NF = "render",
_8Wt = "setXY",
If = "call";
B9W = function() {
    this.Z4Q = {};
    this.uid = mini.newId(this.SI);
    if (!this.id) this.id = this.uid;
    mini.reg(this)
};
B9W[DMah] = {
    isControl: true,
    id: null,
    SI: "mini-",
    FTmG: false,
    TW: true,
    set: function(A) {
        if (typeof A == "string") return this;
        var B = this.Wk;
        this.Wk = false;
        var C = A[HEq] || A[NF];
        delete A[HEq];
        delete A[NF];
        for (var $ in A) if ($.toLowerCase().indexOf("on") == 0) {
            var F = A[$];
            this.on($.substring(2, $.length).toLowerCase(), F);
            delete A[$]
        }
        for ($ in A) {
            var E = A[$],
            D = "set" + $.charAt(0).toUpperCase() + $.substring(1, $.length),
            _ = this[D];
            if (_) _[If](this, E);
            else this[$] = E
        }
        if (C && this[NF]) this[NF](C);
        this.Wk = B;
        if (this[A6_]) this[A6_]();
        return this
    },
    fire: function(A, B) {
        if (this.TW == false) return;
        A = A.toLowerCase();
        var _ = this.Z4Q[A];
        if (_) {
            if (!B) B = {};
            if (B && B != this) {
                B.source = B.sender = this;
                if (!B.type) B.type = A
            }
            for (var $ = 0,
            D = _.length; $ < D; $++) {
                var C = _[$];
                if (C) C[0].apply(C[1], [B])
            }
        }
    },
    on: function(type, fn, scope) {
        if (typeof fn == "string") {
            var f = Q9a(fn);
            if (!f) {
                var id = mini.newId("__str_");
                window[id] = fn;
                eval("fn = function(e){var s = " + id + ";var fn = Q9a(s); if(fn) {fn[If](this,e)}else{eval(s);}}")
            } else fn = f
        }
        if (typeof fn != "function" || !type) return false;
        type = type.toLowerCase();
        var event = this.Z4Q[type];
        if (!event) event = this.Z4Q[type] = [];
        scope = scope || this;
        if (!this[JUS](type, fn, scope)) event.push([fn, scope]);
        return this
    },
    un: function($, C, _) {
        if (typeof C != "function") return false;
        $ = $.toLowerCase();
        var A = this.Z4Q[$];
        if (A) {
            _ = _ || this;
            var B = this[JUS]($, C, _);
            if (B) A.remove(B)
        }
        return this
    },
    findListener: function(A, E, B) {
        A = A.toLowerCase();
        B = B || this;
        var _ = this.Z4Q[A];
        if (_) for (var $ = 0,
        D = _.length; $ < D; $++) {
            var C = _[$];
            if (C[0] === E && C[1] === B) return C
        }
    },
    setId: function($) {
        if (!$) throw new Error("id not null");
        if (this.FTmG) throw new Error("id just set only one");
        mini["unreg"](this);
        this.id = $;
        if (this.el) this.el.id = $;
        if (this.ZKL) this.ZKL.id = $ + "$text";
        if (this.JNZM) this.JNZM.id = $ + "$value";
        this.FTmG = true;
        mini.reg(this)
    },
    getId: function() {
        return this.id
    },
    destroy: function() {
        mini["unreg"](this);
        this.fire("destroy")
    }
};
R0pW = function() {
    R0pW[_s][FjoU][If](this);
    this[RsE]();
    this.el.uid = this.uid;
    this[UUs]();
    if (this._clearBorder) this.el.style.borderWidth = "0";
    this[Ze](this.uiCls);
    this[Id](this.width);
    this[ORwC](this.height);
    this.el.style.display = this.visible ? this.Eea: "none"
};
WKkQ(R0pW, B9W, {
    jsName: null,
    width: "",
    height: "",
    visible: true,
    readOnly: false,
    enabled: true,
    QAW: "mini-readonly",
    GPa: "mini-disabled",
    _create: function() {
        this.el = document.createElement("div")
    },
    _initEvents: function() {},
    within: function($) {
        if (YCJ(this.el, $.target)) return true;
        return false
    },
    name: "",
    setName: function($) {
        this.name = $
    },
    getName: function() {
        return this.name
    },
    isAutoHeight: function() {
        var $ = this.el.style.height;
        return $ == "auto" || $ == ""
    },
    isAutoWidth: function() {
        var $ = this.el.style.width;
        return $ == "auto" || $ == ""
    },
    isFixedSize: function() {
        var A = this.el,
        $ = String(A.style.width),
        _ = String(A.style.height);
        if (parseInt($) + "px" == $ && parseInt(_) + "px" == _) return true;
        return false
    },
    isRender: function($) {
        return !! (this.el && this.el.parentNode && this.el.parentNode.tagName)
    },
    render: function(_, $) {
        if (typeof _ === "string") if (_ == "#body") _ = document.body;
        else _ = Lr0(_);
        if (!_) return;
        if (!$) $ = "append";
        $ = $.toLowerCase();
        if ($ == "before") jQuery(_).before(this.el);
        else if ($ == "preend") jQuery(_).preend(this.el);
        else if ($ == "after") jQuery(_).after(this.el);
        else _.appendChild(this.el);
        this.el.id = this.id;
        this[A6_]();
        this.fire("render")
    },
    getEl: function() {
        return this.el
    },
    setJsName: function($) {
        this[I3G] = $;
        window[$] = this
    },
    getJsName: function() {
        return this[I3G]
    },
    setWidth: function($) {
        if (parseInt($) == $) $ += "px";
        this.width = $;
        this.el.style.width = $;
        this[A6_]()
    },
    getWidth: function(_) {
        var $ = _ ? jQuery(this.el).width() : jQuery(this.el).outerWidth();
        if (_ && this.WXF) {
            var A = MWQ(this.WXF);
            $ = $ - A.left - A.right
        }
        return $
    },
    setHeight: function($) {
        if (parseInt($) == $) $ += "px";
        this.height = $;
        this.el.style.height = $;
        this[A6_]()
    },
    getHeight: function(_) {
        var $ = _ ? jQuery(this.el).height() : jQuery(this.el).outerHeight();
        if (_ && this.WXF) {
            var A = MWQ(this.WXF);
            $ = $ - A.top - A.bottom
        }
        return $
    },
    getBox: function() {
        return $mq(this.el)
    },
    setBorderStyle: function($) {
        var _ = this.WXF || this.el;
        _r(_, $);
        this[A6_]()
    },
    getBorderStyle: function() {
        return this[ZHMD]
    },
    _clearBorder: true,
    setStyle: function($) {
        this.style = $;
        _r(this.el, $);
        if (this._clearBorder) this.el.style.borderWidth = "0";
        this[A6_]()
    },
    getStyle: function() {
        return this.style
    },
    setCls: function($) {
        Lq(this.el, this.cls);
        F7y(this.el, $);
        this.cls = $
    },
    getCls: function() {
        return this.cls
    },
    addCls: function($) {
        F7y(this.el, $)
    },
    removeCls: function($) {
        Lq(this.el, $)
    },
    setReadOnly: function($) {
        this[SXB] = $;
        if ($) this[Ze](this.QAW);
        else this[DY](this.QAW)
    },
    getReadOnly: function() {
        return this[SXB]
    },
    getParent: function(A) {
        var $ = document,
        B = this.el.parentNode;
        while (B != $ && B != null) {
            var _ = mini.get(B);
            if (_) {
                if (!mini.isControl(_)) return null;
                if (!A || _.uiCls == A) return _
            }
            B = B.parentNode
        }
        return null
    },
    isReadOnly: function() {
        if (this[SXB] || !this.enabled) return true;
        var $ = this.getParent();
        if ($) return $[Pa]();
        return false
    },
    setEnabled: function($) {
        this.enabled = $;
        if ($) this[DY](this.GPa);
        else this[Ze](this.GPa)
    },
    getEnabled: function() {
        return this.enabled
    },
    enable: function() {
        this.setEnabled(true)
    },
    disable: function() {
        this.setEnabled(false)
    },
    Eea: "",
    setVisible: function($) {
        this.visible = $;
        if (this.el) {
            this.el.style.display = $ ? this.Eea: "none";
            this[A6_]()
        }
    },
    getVisible: function() {
        return this.visible
    },
    show: function() {
        this[NXq](true)
    },
    hide: function() {
        this[NXq](false)
    },
    isDisplay: function() {
        if (Ebi == false) return false;
        var $ = document.body,
        _ = this.el;
        while (1) {
            if (_ == null || !_.style) return false;
            if (_ && _.style && _.style.display == "none") return false;
            if (_ == $) return true;
            _ = _.parentNode
        }
        return true
    },
    OTH: true,
    beginUpdate: function() {
        this.OTH = false
    },
    endUpdate: function() {
        this.OTH = true;
        this[SbW]()
    },
    doUpdate: function() {},
    canLayout: function() {
        if (this.Wk == false) return false;
        return this[Gf]()
    },
    doLayout: function() {},
    layoutChanged: function() {
        if (this.canLayout() == false) return;
        this[A6_]()
    },
    destroy: function(_) {
        if (this.el);
        if (this.el) {
            mini[_LP](this.el);
            if (_ !== false) {
                var $ = this.el.parentNode;
                if ($) $.removeChild(this.el)
            }
        }
        this.WXF = null;
        this.el = null;
        mini["unreg"](this);
        this.fire("destroy")
    },
    focus: function() {
        try {
            var $ = this;
            $.el.focus()
        } catch(_) {}
    },
    blur: function() {
        try {
            var $ = this;
            $.el.blur()
        } catch(_) {}
    },
    allowAnim: true,
    setAllowAnim: function($) {
        this.allowAnim = $
    },
    getAllowAnim: function() {
        return this.allowAnim
    },
    VC: function() {
        return this.el
    },
    mask: function($) {
        if (typeof $ == "string") $ = {
            html: $
        };
        $ = $ || {};
        $.el = this.VC();
        if (!$.cls) $.cls = this.JsYp;
        mini.mask($)
    },
    unmask: function() {
        mini.unmask(this.VC())
    },
    JsYp: "mini-mask-loading",
    loadingMsg: "������, ���Ժ�...",	// modify
    loading: function() {
        this.mask(this.loadingMsg)
    },
    contextMenu: null,
    setContextMenu: function($) {
        var _ = $;
        if (typeof $ == "string") {
            _ = mini.get($);
            if (!_) {
                mini.parse($);
                _ = mini.get($)
            }
        } else if (mini.isArray($)) _ = {
            type: "menu",
            items: $
        };
        else if (!mini.isControl($)) _ = mini.create($);
        if (this[Lsad] !== _) {
            this[Lsad] = _;
            this[Lsad].owner = this;
            $DT4(this.el, "contextmenu",
            function(_) {
                var $ = {
                    popupEl: this.el,
                    htmlEvent: _,
                    cancel: false
                };
                this[Lsad].fire("BeforeOpen", $);
                if ($.cancel == true) return;
                this[Lsad].fire("opening", $);
                if ($.cancel == true) return;
                this[Lsad].showAtPos(_.pageX, _.pageY);
                this[Lsad].fire("Open", $);
                return false
            },
            this)
        }
    },
    getContextMenu: function() {
        return this[Lsad]
    },
    setDefaultValue: function($) {
        this[JXk] = $
    },
    getDefaultValue: function() {
        return this[JXk]
    },
    setValue: function($) {
        this.value = $
    },
    getValue: function() {
        return this.value
    },
    IuKl: function($) {},
    getAttrs: function(C) {
        var I = {},
        F = C.className;
        if (F) I.cls = F;
        mini[GRcU](C, I, ["id", "name", "width", "height", "borderStyle", "value", "defaultValue", "contextMenu"]);
        mini[MTh](C, I, ["visible", "enabled", "readOnly"]);
        if (C[SXB]) I[SXB] = true;
        var E = C.style.cssText;
        if (E) I.style = E;
        if (isIE9) {
            var _ = C.style.background;
            if (_) {
                if (!I.style) I.style = "";
                I.style += ";background:" + _
            }
        }
        if (this.style) if (I.style) I.style = this.style + ";" + I.style;
        else I.style = this.style;
        if (this[ZHMD]) if (I[ZHMD]) I[ZHMD] = this[ZHMD] + ";" + I[ZHMD];
        else I[ZHMD] = this[ZHMD];
        var B = mini._attrs;
        if (B) for (var $ = 0,
        G = B.length; $ < G; $++) {
            var D = B[$],
            H = D[0],
            A = D[1];
            if (!A) A = "string";
            if (A == "string") mini[GRcU](C, I, [H]);
            else if (A == "bool") mini[MTh](C, I, [H]);
            else if (A == "int") mini[Ova](C, I, [H])
        }
        return I
    }
});
mini._attrs = null;
mini.regHtmlAttr = function(_, $) {
    if (!_) return;
    if (!$) $ = "string";
    if (!mini._attrs) mini._attrs = [];
    mini._attrs.push([_, $])
};
Cfuc = function() {
    Cfuc[_s][FjoU][If](this)
};
WKkQ(Cfuc, R0pW, {
    required: false,
    requiredErrorText: "This field is required.",
    VAg: "mini-required",
    errorText: "",
    CMt: "mini-error",
    BfU: "mini-invalid",
    errorMode: "icon",
    validateOnChanged: true,
    Bm6: true,
    validate: function() {
        var $ = {
            value: this.getValue(),
            errorText: "",
            isValid: true
        };
        if (this.required) if (mini.isNull($.value) || $.value === "") {
            $.isValid = false;
            $.errorText = this[Ivr]
        }
        this.fire("validation", $);
        this.errorText = $.errorText;
        this.setIsValid($.isValid);
        return this.isValid()
    },
    isValid: function() {
        return this.Bm6
    },
    setIsValid: function($) {
        this.Bm6 = $;
        this.Iq9()
    },
    getIsValid: function() {
        return this.Bm6
    },
    setValidateOnChanged: function($) {
        this.validateOnChanged = $
    },
    getValidateOnChanged: function($) {
        return this.validateOnChanged
    },
    setErrorMode: function($) {
        if (!$) $ = "none";
        this[YYG] = $.toLowerCase();
        if (this.Bm6 == false) this.Iq9()
    },
    getErrorMode: function() {
        return this[YYG]
    },
    setErrorText: function($) {
        this.errorText = $;
        if (this.Bm6 == false) this.Iq9()
    },
    getErrorText: function() {
        return this.errorText
    },
    setRequired: function($) {
        this.required = $;
        this[SbW]()
    },
    getRequired: function() {
        return this.required
    },
    setRequiredErrorText: function($) {
        this[Ivr] = $
    },
    getRequiredErrorText: function() {
        return this[Ivr]
    },
    errorIconEl: null,
    getErrorIconEl: function() {
        return this.Wa
    },
    _Rr: function() {},
    Iq9: function() {
        var $ = this;
        setTimeout(function() {
            $.Bslm()
        },
        1)
    },
    Bslm: function() {
        this[DY](this.CMt);
        this[DY](this.BfU);
        this.el.title = "";
        if (this.Bm6 == false) switch (this[YYG]) {
        case "icon":
            this[Ze](this.CMt);
            var $ = this.getErrorIconEl();
            if ($) $.title = this.errorText;
            break;
        case "border":
            this[Ze](this.BfU);
            this.el.title = this.errorText;
        default:
            this._Rr();
            break
        } else this._Rr();
        this[A6_]()
    },
    Dkw: function() {
        if (this.validateOnChanged) this[NGT6]();
        this.fire("valuechanged", {
            value: this.getValue()
        })
    },
    onValueChanged: function(_, $) {
        this.on("valuechanged", _, $)
    },
    onValidation: function(_, $) {
        this.on("validation", _, $)
    },
    getAttrs: function(_) {
        var A = Cfuc[_s][XNM][If](this, _);
        mini[GRcU](_, A, ["onvaluechanged", "onvalidation", "requiredErrorText", "errorMode"]);
        mini[MTh](_, A, ["validateOnChanged"]);
        var $ = _.getAttribute("required");
        if (!$) $ = _.required;
        if ($) A.required = $ != "false" ? true: false;
        return A
    }
});
Ld = function() {
    this.data = [];
    this.MbX = [];
    Ld[_s][FjoU][If](this);
    this[SbW]()
};
WKkQ(Ld, Cfuc, {
    defaultValue: "",
    value: "",
    valueField: "id",
    textField: "text",
    delimiter: ",",
    data: null,
    url: "",
    Mw6: "mini-list-item",
    C8I: "mini-list-item-hover",
    _QaC: "mini-list-item-selected",
    set: function(A) {
        if (typeof A == "string") return this;
        var $ = A.value;
        delete A.value;
        var B = A.url;
        delete A.url;
        var _ = A.data;
        delete A.data;
        Ld[_s].set[If](this, A);
        if (!mini.isNull(_)) this[_CY](_);
        if (!mini.isNull(B)) this.setUrl(B);
        if (!mini.isNull($)) this[XFB]($);
        return this
    },
    uiCls: "mini-list",
    _create: function() {},
    _initEvents: function() {
        Ehny(function() {
            $DT4(this.el, "click", this.ZmC, this);
            $DT4(this.el, "dblclick", this.Nl4, this);
            $DT4(this.el, "mousedown", this.U8z, this);
            $DT4(this.el, "mouseup", this.Bfl, this);
            $DT4(this.el, "mousemove", this.YMAS, this);
            $DT4(this.el, "mouseover", this.F1, this);
            $DT4(this.el, "mouseout", this.FmPu, this);
            $DT4(this.el, "keydown", this.MMM, this);
            $DT4(this.el, "keyup", this.VKSz, this);
            $DT4(this.el, "contextmenu", this.FGD, this)
        },
        this)
    },
    name: "",
    setName: function($) {
        this.name = $;
        if (this.JNZM) mini.setAttr(this.JNZM, "name", this.name)
    },
    RcL: function(_) {
        var A = O21(_.target, this.Mw6);
        if (A) {
            var $ = parseInt(mini.getAttr(A, "index"));
            return this.data[$]
        }
    },
    addItemCls: function(_, A) {
        var $ = this.getItemEl(_);
        if ($) F7y($, A)
    },
    removeItemCls: function(_, A) {
        var $ = this.getItemEl(_);
        if ($) Lq($, A)
    },
    getItemEl: function(_) {
        _ = this[YKh](_);
        var $ = this.data.indexOf(_),
        A = this.K_FW($);
        return document.getElementById(A)
    },
    IRSK: function(_, $) {
        _ = this[YKh](_);
        if (!_) return;
        var A = this.getItemEl(_);
        if ($ && A) this[Ico](_);
        if (this.N8TItem == _) return;
        this.Z_();
        this.N8TItem = _;
        F7y(A, this.C8I)
    },
    Z_: function() {
        if (!this.N8TItem) return;
        var $ = this.getItemEl(this.N8TItem);
        if ($) Lq($, this.C8I);
        this.N8TItem = null
    },
    getFocusedItem: function() {
        return this.N8TItem
    },
    getFocusedIndex: function() {
        return this.data.indexOf(this.N8TItem)
    },
    Nd: null,
    scrollIntoView: function(_) {
        try {
            var $ = this.getItemEl(_),
            A = this.Nd || this.el;
            mini[Ico]($, A, false)
        } catch(B) {}
    },
    getItem: function($) {
        if (typeof $ == "object") return $;
        if (typeof $ == "number") return this.data[$];
        return this.findItems($)[0]
    },
    getCount: function() {
        return this.data.length
    },
    indexOf: function($) {
        return this.data.indexOf($)
    },
    getAt: function($) {
        return this.data[$]
    },
    updateItem: function($, _) {
        $ = this[YKh]($);
        if (!$) return;
        mini.copyTo($, _);
        this[SbW]()
    },
    load: function($) {
        if (typeof $ == "string") this.setUrl($);
        else this[_CY]($)
    },
    loadData: function($) {
        this[_CY]($)
    },
    setData: function(data) {
        if (typeof data == "string") data = eval(data);
        if (!mini.isArray(data)) data = [];
        this.data = data;
        this.NK();
        this[SbW]()
    },
    getData: function() {
        return this.data.clone()
    },
    setUrl: function($) {
        this.url = $;
        this.EXQ({})
    },
    getUrl: function() {
        return this.url
    },
    EXQ: function(params) {
        try {
            this.url = eval(this.url)
        } catch(e) {}
        var e = {
            url: this.url,
            async: false,
            type: "get",
            params: params,
            cancel: false
        };
        this.fire("beforeload", e);
        if (e.cancel == true) return;
        var sf = this;
        this.F6 = jQuery.ajax({
            url: e.url,
            async: e.async,
            data: e.params,
            type: e.type,
            cache: false,
            dataType: "text",
            success: function($) {
                var _ = null;
                try {
                    _ = mini.decode($)
                } catch(A) {}
                var A = {
                    data: _,
                    cancel: false
                };
                sf.fire("preload", A);
                if (A.cancel == true) return;
                sf[_CY](A.data);
                sf.fire("load");
                setTimeout(function() {
                    sf[A6_]()
                },
                100)
            },
            error: function($, A, _) {
                var B = {
                    xmlHttp: $,
                    errorCode: A
                };
                sf.fire("loaderror", B)
            }
        })
    },
    setValue: function($) {
        if (mini.isNull($)) $ = "";
        if (this.value !== $) {
            var _ = this.findItems(this.value);
            this[QLD](_);
            this.value = $;
            if (this.JNZM) this.JNZM.value = $;
            _ = this.findItems(this.value);
            this[M03](_)
        }
    },
    getValue: function() {
        return this.value
    },
    getFormValue: function() {
        return this.value
    },
    setValueField: function($) {
        this[SY0C] = $
    },
    getValueField: function() {
        return this[SY0C]
    },
    setTextField: function($) {
        this[XND] = $
    },
    getTextField: function() {
        return this[XND]
    },
    getItemValue: function($) {
        return String($[this.valueField])
    },
    getItemText: function($) {
        var _ = $[this.textField];
        return mini.isNull(_) ? "": String(_)
    },
    SmZ: function(A) {
        if (mini.isNull(A)) A = [];
        if (!mini.isArray(A)) A = this.findItems(A);
        var B = [],
        C = [];
        for (var _ = 0,
        D = A.length; _ < D; _++) {
            var $ = A[_];
            if ($) {
                B.push(this[TILf]($));
                C.push(this[BH$]($))
            }
        }
        return [B.join(this.delimiter), C.join(this.delimiter)]
    },
    findItems: function(B) {
        if (mini.isNull(B) || B === "") return [];
        var E = String(B).split(this.delimiter),
        D = this.data,
        H = {};
        for (var F = 0,
        A = D.length; F < A; F++) {
            var _ = D[F],
            I = _[this.valueField];
            H[I] = _
        }
        var C = [];
        for (var $ = 0,
        G = E.length; $ < G; $++) {
            I = E[$],
            _ = H[I];
            if (_) C.push(_)
        }
        return C
    },
    Wpf: null,
    MbX: [],
    multiSelect: false,
    NK: function() {
        for (var _ = this.MbX.length - 1; _ >= 0; _--) {
            var $ = this.MbX[_];
            if (this.data.indexOf($) == -1) this.MbX.removeAt(_)
        }
        var A = this.SmZ(this.MbX);
        this.value = A[0];
        if (this.JNZM) this.JNZM.value = this.value
    },
    setMultiSelect: function($) {
        this[MWVQ] = $
    },
    getMultiSelect: function() {
        return this[MWVQ]
    },
    isSelected: function($) {
        if (!$) return false;
        return this.MbX.indexOf($) != -1
    },
    getSelecteds: function() {
        return this.MbX.clone()
    },
    setSelected: function($) {
        if ($) {
            this.Wpf = $;
            this[Ju6]($)
        }
    },
    getSelected: function() {
        return this.Wpf
    },
    select: function($) {
        $ = this[YKh]($);
        if (!$) return;
        if (this[Iq4]($)) return;
        this[M03]([$])
    },
    deselect: function($) {
        $ = this[YKh]($);
        if (!$) return;
        if (!this[Iq4]($)) return;
        this[QLD]([$])
    },
    selectAll: function() {
        var $ = this.data.clone();
        this[M03]($)
    },
    deselectAll: function() {
        this[QLD](this.MbX)
    },
    clearSelect: function() {
        this[RsYU]()
    },
    selects: function(A) {
        if (!A || A.length == 0) return;
        A = A.clone();
        for (var _ = 0,
        B = A.length; _ < B; _++) {
            var $ = A[_];
            if (!this[Iq4]($)) this.MbX.push($)
        }
        this.VY()
    },
    deselects: function(A) {
        if (!A || A.length == 0) return;
        A = A.clone();
        for (var _ = A.length - 1; _ >= 0; _--) {
            var $ = A[_];
            if (this[Iq4]($)) this.MbX.remove($)
        }
        this.VY()
    },
    VY: function() {
        var C = this.SmZ(this.MbX);
        this.value = C[0];
        if (this.JNZM) this.JNZM.value = this.value;
        for (var A = 0,
        D = this.data.length; A < D; A++) {
            var _ = this.data[A],
            F = this[Iq4](_);
            if (F) this[Mj](_, this._QaC);
            else this[SAiG](_, this._QaC);
            var $ = this.data.indexOf(_),
            E = this.O3N($),
            B = document.getElementById(E);
            if (B) B.checked = !!F
        }
    },
    TU9: function(_, B) {
        var $ = this.SmZ(this.MbX);
        this.value = $[0];
        if (this.JNZM) this.JNZM.value = this.value;
        var A = {
            selecteds: this.getSelecteds(),
            selected: this[RgBO](),
            value: this.getValue()
        };
        this.fire("SelectionChanged", A)
    },
    O3N: function($) {
        return this.uid + "$ck$" + $
    },
    K_FW: function($) {
        return this.uid + "$" + $
    },
    ZmC: function($) {
        this.F48($, "Click")
    },
    Nl4: function($) {
        this.F48($, "Dblclick")
    },
    U8z: function($) {
        this.F48($, "MouseDown")
    },
    Bfl: function($) {
        this.F48($, "MouseUp")
    },
    YMAS: function($) {
        this.F48($, "MouseMove")
    },
    F1: function($) {
        this.F48($, "MouseOver")
    },
    FmPu: function($) {
        this.F48($, "MouseOut")
    },
    MMM: function($) {
        this.F48($, "KeyDown")
    },
    VKSz: function($) {
        this.F48($, "KeyUp")
    },
    FGD: function($) {
        this.F48($, "ContextMenu")
    },
    F48: function(C, A) {
        if (!this.enabled) return;
        var $ = this.RcL(C);
        if (!$) return;
        var B = this["_OnItem" + A];
        if (B) B[If](this, $, C);
        else {
            var _ = {
                item: $,
                htmlEvent: C
            };
            this.fire("item" + A, _)
        }
    },
    _OnItemClick: function($, A) {
        if ($.enabled === false) return;
        var _ = this.getValue();
        if (this[MWVQ]) {
            if (this[Iq4]($)) {
                this[P53]($);
                if (this.Wpf == $) this.Wpf = null
            } else {
                this[Ju6]($);
                this.Wpf = $
            }
            this.TU9()
        } else if (!this[Iq4]($)) {
            this[RsYU]();
            this[Ju6]($);
            this.Wpf = $;
            this.TU9()
        }
        if (_ != this.getValue()) this.Dkw();
        var A = {
            item: $,
            htmlEvent: A
        };
        this.fire("itemclick", A)
    },
    NEpS: true,
    _OnItemMouseOut: function($, _) {
        if (!this.enabled) return;
        if (this.NEpS) this.Z_();
        var _ = {
            item: $,
            htmlEvent: _
        };
        this.fire("itemmouseout", _)
    },
    _OnItemMouseMove: function($, _) {
        if (!this.enabled || $.enabled === false) return;
        this.IRSK($);
        var _ = {
            item: $,
            htmlEvent: _
        };
        this.fire("itemmousemove", _)
    },
    onItemClick: function(_, $) {
        this.on("itemclick", _, $)
    },
    onItemMouseDown: function(_, $) {
        this.on("itemmousedown", _, $)
    },
    onBeforeLoad: function(_, $) {
        this.on("beforeload", _, $)
    },
    onLoad: function(_, $) {
        this.on("load", _, $)
    },
    onLoadError: function(_, $) {
        this.on("loaderror", _, $)
    },
    onPreLoad: function(_, $) {
        this.on("preload", _, $)
    },
    getAttrs: function(C) {
        var G = Ld[_s][XNM][If](this, C);
        mini[GRcU](C, G, ["url", "data", "value", "textField", "valueField", "onitemclick", "onitemmousemove", "onselectionchanged", "onbeforeload", "onload", "onloaderror", "ondataload"]);
        mini[MTh](C, G, ["multiSelect"]);
        var E = G[SY0C] || this[SY0C],
        B = G[XND] || this[XND];
        if (C.nodeName.toLowerCase() == "select") {
            var D = [];
            for (var A = 0,
            F = C.length; A < F; A++) {
                var _ = C.options[A],
                $ = {};
                $[B] = _.text;
                $[E] = _.value;
                D.push($)
            }
            if (D.length > 0) G.data = D
        }
        return G
    }
});
mini._Layouts = {};
mini.layout = function($, _) {
    function A(C) {
        var D = mini.get(C);
        if (D) {
            if (D[A6_]) if (!mini._Layouts[D.uid]) {
                mini._Layouts[D.uid] = D;
                if (_ !== false || D.isFixedSize() == false) D[A6_](false);
                delete mini._Layouts[D.uid]
            }
        } else {
            var E = C.childNodes;
            if (E) for (var $ = 0,
            F = E.length; $ < F; $++) {
                var B = E[$];
                A(B)
            }
        }
    }
    if (!$) $ = document.body;
    A($)
};
mini.applyTo = function(_) {
    _ = Lr0(_);
    if (!_) return this;
    if (mini.get(_)) throw new Error("not applyTo a mini control");
    var $ = this[XNM](_);
    delete $._applyTo;
    if (mini.isNull($[JXk]) && !mini.isNull($.value)) $[JXk] = $.value;
    var A = _.parentNode;
    if (A && this.el != _) A.replaceChild(this.el, _);
    this.set($);
    this.IuKl(_);
    return this
};
mini._doParse = function(G) {
    var F = G.nodeName.toLowerCase();
    if (!F) return;
    var B = G.className;
    if (B) {
        var $ = mini.get(G);
        if (!$) {
            var H = B.split(" ");
            for (var E = 0,
            C = H.length; E < C; E++) {
                var A = H[E],
                I = mini.getClassByUICls(A);
                if (I) {
                    var D = new I();
                    mini.applyTo[If](D, G);
                    G = D.el;
                    break
                }
            }
        }
    }
    if (F == "select" || DD(G, "mini-menu") || DD(G, "mini-datagrid") || DD(G, "mini-treegrid") || DD(G, "mini-tree") || DD(G, "mini-button") || DD(G, "mini-textbox") || DD(G, "mini-buttonedit")) return;
    var J = mini[OJy](G, true);
    for (E = 0, C = J.length; E < C; E++) {
        var _ = J[E];
        if (_.nodeType == 1) if (_.parentNode == G) mini._doParse(_)
    }
};
mini._Removes = [];
mini.parse = function($) {
    if (typeof $ == "string") {
        var A = $;
        $ = Lr0(A);
        if (!$) $ = document.body
    }
    if ($ && !mini.isElement($)) $ = $.el;
    if (!$) $ = document.body;
    var _ = Ebi;
    Ebi = false;
    mini._doParse($);
    Ebi = _;
    mini.layout()
};
mini[GRcU] = function(B, A, E) {
    for (var $ = 0,
    D = E.length; $ < D; $++) {
        var C = E[$],
        _ = mini.getAttr(B, C);
        if (_) A[C] = _
    }
};
mini[MTh] = function(B, A, E) {
    for (var $ = 0,
    D = E.length; $ < D; $++) {
        var C = E[$],
        _ = mini.getAttr(B, C);
        if (_) A[C] = _ == "true" ? true: false
    }
};
mini[Ova] = function(B, A, E) {
    for (var $ = 0,
    D = E.length; $ < D; $++) {
        var C = E[$],
        _ = parseInt(mini.getAttr(B, C));
        if (!isNaN(_)) A[C] = _
    }
};
mini._ParseColumns = function(N) {
    var G = [],
    O = mini[OJy](N);
    for (var M = 0,
    H = O.length; M < H; M++) {
        var C = O[M],
        T = jQuery(C),
        D = {},
        J = null,
        K = null,
        _ = mini[OJy](C);
        if (_) for (var $ = 0,
        P = _.length; $ < P; $++) {
            var B = _[$],
            A = jQuery(B).attr("property");
            if (!A) continue;
            A = A.toLowerCase();
            if (A == "columns") {
                D.columns = mini._ParseColumns(B);
                jQuery(B).remove()
            }
            if (A == "editor" || A == "filter") {
                var F = B.className,
                R = F.split(" ");
                for (var L = 0,
                S = R.length; L < S; L++) {
                    var E = R[L],
                    Q = mini.getClassByUICls(E);
                    if (Q) {
                        var I = new Q();
                        if (A == "filter") {
                            K = I[XNM](B);
                            K.type = I.type
                        } else {
                            J = I[XNM](B);
                            J.type = I.type
                        }
                        break
                    }
                }
                jQuery(B).remove()
            }
        }
        D.header = C.innerHTML;
        mini[GRcU](C, D, ["name", "header", "field", "editor", "filter", "renderer", "width", "type", "renderer", "headerAlign", "align", "headerCls", "cellCls", "headerStyle", "cellStyle", "displayField", "dateFormat", "listFormat", "mapFormat", "trueValue", "falseValue"]);
        mini[MTh](C, D, ["visible", "readOnly", "allowSort", "allowReisze", "allowMove", "allowDrag", "autoShowPopup"]);
        if (J) D.editor = J;
        if (K) D.filter = K;
        G.push(D)
    }
    return G
};
mini._Columns = {};
mini[Id9] = function($) {
    var _ = mini._Columns[$.toLowerCase()];
    if (!_) return {};
    return _()
};
mini.IndexColumn = function($) {
    return mini.copyTo({
        width: 30,
        cellCls: "",
        align: "center",
        draggable: false,
        init: function($) {
            $.on("addrow", this.__OnIndexChanged, this);
            $.on("removerow", this.__OnIndexChanged, this);
            $.on("moverow", this.__OnIndexChanged, this)
        },
        getNumberId: function($) {
            return this._gridUID + "$number$" + $[this._rowIdField]
        },
        createNumber: function($, _) {
            if (mini.isNull($[Tp])) return _ + 1;
            else return ($[Tp] * $[Jw]) + _ + 1
        },
        renderer: function(A) {
            var $ = A.sender;
            if (this.draggable) {
                if (!A.cellStyle) A.cellStyle = "";
                A.cellStyle += ";cursor:move;"
            }
            var _ = "<div id=\"" + this.getNumberId(A.record) + "\">";
            if (mini.isNull($[Tp])) _ += A.rowIndex + 1;
            else _ += ($[Tp] * $[Jw]) + A.rowIndex + 1;
            _ += "</div>";
            return _
        },
        __OnIndexChanged: function(F) {
            var $ = F.sender,
            C = $.toArray();
            for (var A = 0,
            D = C.length; A < D; A++) {
                var _ = C[A],
                E = this.getNumberId(_),
                B = document.getElementById(E);
                if (B) B.innerHTML = this.createNumber($, A)
            }
        }
    },
    $)
};
mini._Columns["indexcolumn"] = mini.IndexColumn;
mini.CheckColumn = function($) {
    return mini.copyTo({
        width: 30,
        cellCls: "mini-checkcolumn",
        headerCls: "mini-checkcolumn",
        multiSelect: true,
        header: function($) {
            var A = this.uid + "checkall",
            _ = "<input type=\"checkbox\" id=\"" + A + "\" />";
            if (this[MWVQ] == false) _ = "";
            return _
        },
        getCheckId: function($) {
            return this._gridUID + "$checkcolumn$" + $[this._rowIdField]
        },
        init: function($) {
            $.on("selectionchanged", this.XOy, this);
            $.on("HeaderCellClick", this.IXcJ, this)
        },
        renderer: function(C) {
            var B = this.getCheckId(C.record),
            _ = C.sender[Iq4](C.record),
            A = "checkbox",
            $ = C.sender;
            if ($[MWVQ] == false) A = "radio";
            return "<input type=\"" + A + "\" id=\"" + B + "\" " + (_ ? "checked": "") + " hidefocus style=\"outline:none;\" onclick=\"return false\"/>"
        },
        IXcJ: function(B) {
            var $ = B.sender,
            A = $.uid + "checkall",
            _ = document.getElementById(A);
            if (_) if ($[MWVQ]) {
                if (_.checked) $.selectAll();
                else $[RsYU]()
            } else {
                $[RsYU]();
                if (_.checked) $[Ju6](0)
            }
        },
        XOy: function(G) {
            var $ = G.sender,
            C = $.toArray();
            for (var A = 0,
            D = C.length; A < D; A++) {
                var _ = C[A],
                F = $[Iq4](_),
                E = $.uid + "$checkcolumn$" + _[$._rowIdField],
                B = document.getElementById(E);
                if (B) B.checked = F
            }
        }
    },
    $)
};
mini._Columns["checkcolumn"] = mini.CheckColumn;
mini.ExpandColumn = function($) {
    return mini.copyTo({
        width: 30,
        cellCls: "",
        align: "center",
        draggable: false,
        cellStyle: "padding:0",
        renderer: function($) {
            return "<a class=\"mini-grid-ecIcon\" href=\"javascript:#\" onclick=\"return false\"></a>"
        },
        init: function($) {
            $.on("cellclick", this.ZDo, this)
        },
        ZDo: function(A) {
            var $ = A.sender;
            if (A.column == this && $[Zjca]) if (O21(A.htmlEvent.target, "mini-grid-ecIcon")) {
                var _ = $[Zjca](A.record);
                if ($.autoHideRowDetail) $.hideAllRowDetail();
                if (_) $[MMb](A.record);
                else $[ESz](A.record)
            }
        }
    },
    $)
};
mini._Columns["expandcolumn"] = mini.ExpandColumn;
DM_Column = function($) {
    return mini.copyTo({
        header: "#",
        headerAlign: "center",
        cellCls: "mini-checkcolumn",
        trueValue: true,
        falseValue: false,
        readOnly: false,
        getCheckId: function($) {
            return this._gridUID + "$checkbox$" + $._id
        },
        renderer: function(B) {
            var A = this.getCheckId(B.record),
            _ = B.record[B.field] == this.trueValue ? true: false,
            $ = "checkbox";
            return "<input type=\"" + $ + "\" id=\"" + A + "\" " + (_ ? "checked": "") + " hidefocus style=\"outline:none;\" onclick=\"return false;\"/>"
        },
        init: function($) {
            this.grid = $;
            $.on("cellclick",
            function(C) {
                if (C.column == this) {
                    if (this[SXB]) return;
                    var B = this.getCheckId(C.record),
                    A = C.htmlEvent.target;
                    if (A.id == B) {
                        C.cancel = false;
                        C.value = C.record[C.field];
                        $.fire("cellbeginedit", C);
                        if (C.cancel !== true) {
                            var _ = C.record[C.field] == this.trueValue ? this.falseValue: this.trueValue;
                            if ($.R8j) $.R8j(C.record, C.column, _)
                        }
                    }
                }
            },
            this);
            var _ = parseInt(this.trueValue),
            A = parseInt(this.falseValue);
            if (!isNaN(_)) this.trueValue = _;
            if (!isNaN(A)) this.falseValue = A
        }
    },
    $)
};
mini._Columns["checkboxcolumn"] = DM_Column;
TaA = function($) {
    this.owner = $;
    $DT4(this.owner.el, "mousedown", this.U8z, this)
};
TaA[DMah] = {
    U8z: function(_) {
        if (DD(_.target, "mini-grid-resizeGrid") && this.owner[T_s]) {
            var $ = this.Ffr();
            $.start(_)
        }
    },
    Ffr: function() {
        if (!this._resizeDragger) this._resizeDragger = new mini.Drag({
            capture: true,
            onStart: mini.createDelegate(this.Tlfk, this),
            onMove: mini.createDelegate(this.HEJ, this),
            onStop: mini.createDelegate(this.Sj, this)
        });
        return this._resizeDragger
    },
    Tlfk: function($) {
        this.proxy = mini.append(document.body, "<div class=\"mini-grid-resizeProxy\"></div>");
        this.proxy.style.cursor = "se-resize";
        this.elBox = $mq(this.owner.el);
        M1(this.proxy, this.elBox)
    },
    HEJ: function(B) {
        var $ = this.owner,
        D = B.now[0] - B.init[0],
        _ = B.now[1] - B.init[1],
        A = this.elBox.width + D,
        C = this.elBox.height + _;
        if (A < $.minWidth) A = $.minWidth;
        if (C < $.minHeight) C = $.minHeight;
        if (A > $.maxWidth) A = $.maxWidth;
        if (C > $.maxHeight) C = $.maxHeight;
        mini.setSize(this.proxy, A, C)
    },
    Sj: function($, A) {
        if (!this.proxy) return;
        var _ = $mq(this.proxy);
        jQuery(this.proxy).remove();
        this.proxy = null;
        this.elBox = null;
        if (A) {
            this.owner[Id](_.width);
            this.owner[ORwC](_.height)
        }
    }
};
mini.__IFrameCreateCount = 1;
mini.createIFrame = function(D, C, G) {
    var F = "__iframe_onload" + mini.__IFrameCreateCount++;
    window[F] = _;
    var E = "<iframe src=\"" + D + "\" style=\"width:100%;height:100%;\" onload=\"" + F + "()\" frameborder=\"0\"></iframe>",
    $ = document.createElement("div"),
    B = mini.append($, E),
    A = true;
    function _() {
        setTimeout(function() {
            if (C) C(B, A);
            A = false
        },
        1)
    }
    B._ondestroy = function() {
        if (G) G(B);
        window[F] = mini.emptyFn;
        B.src = "";
        B._ondestroy = null;
        B = null
    };
    return B
};
WV = function(C) {
    if (typeof C == "string") C = {
        url: C
    };
    C = mini.copyTo({
        width: 700,
        height: 400,
        allowResize: true,
        allowModal: true,
        title: "",
        titleIcon: "",
        iconCls: "",
        iconStyle: "",
        bodyStyle: "padding:0",
        url: "",
        showCloseButton: true,
        showFooter: false
    },
    C);
    C[V_g] = "destroy";
    var $ = C.onload;
    delete C.onload;
    var B = C.ondestroy;
    delete C.ondestroy;
    var _ = C.url;
    delete C.url;
    var A = new K25T();
    A.set(C);
    A.load(_, $, B);
    A.show();
    return A
};
mini.open = function(B) {
    var $ = [];
    function _(A) {
        if (A.mini) $.push(A);
        if (A.parent && A.parent != A) _(A.parent)
    }
    _(window);
    var A = $[$.length - 1];
    return A.WV(B)
};
mini.openTop = mini.open;
mini.getData = function(C, A, E, D, _) {
    var $ = mini.getText(C, A, E, D, _),
    B = mini.decode($);
    return B
};
mini.getText = function(B, A, D, C, _) {
    var $ = null;
    jQuery.ajax({
        url: B,
        data: A,
        async: false,
        type: _ ? _: "get",
        cache: false,
        dataType: "text",
        success: function(A, _) {
            $ = A
        },
        error: C
    });
    return $
};
if (!window.mini_RootPath) mini_RootPath = "/";
Wved = function() {
    var _ = document.getElementsByTagName("script"),
    C = "";
    for (var $ = 0,
    D = _.length; $ < D; $++) {
        var A = _[$];
        try {
            var B = A.src;
            if (B.indexOf("miniui.js") != -1) {
                var E = B.split("miniui.js");
                C = E[0];
                break
            }
        } catch(F) {}
    }
    return C
};
if (!window.mini_JSPath) mini_JSPath = Wved();
mini.update = function(A, _) {
    if (typeof A == "string") A = {
        url: A
    };
    if (_) A.el = _;
    A = mini.copyTo({
        el: null,
        url: "",
        async: false,
        type: "get",
        cache: false,
        dataType: "text",
        success: function(_) {
            var B = A.el;
            if (B) {
                $(B).html(_);
                mini.parse(B)
            }
        },
        error: function($, A, _) {}
    },
    A);
    jQuery.ajax(A)
};
mini.createSingle = function($) {
    if (typeof $ == "string") $ = mini.getClass($);
    if (typeof $ != "function") return;
    var _ = $.single;
    if (!_) _ = $.single = new $();
    return _
};
mini.createTopSingle = function($) {
    if (typeof $ != "function") return;
    var _ = $[DMah].type;
    if (top && top != window && top.mini && top.mini.getClass(_)) return top.mini.createSingle(_);
    else return mini.createSingle($)
};
mini.emptyFn = function() {};
mini.Drag = function($) {
    mini.copyTo(this, $)
};
mini.Drag[DMah] = {
    onStart: mini.emptyFn,
    onMove: mini.emptyFn,
    onStop: mini.emptyFn,
    capture: false,
    fps: 20,
    event: null,
    delay: 80,
    start: function(_) {
        _.preventDefault();
        if (_) this.event = _;
        this.now = this.init = [this.event.pageX, this.event.pageY];
        var $ = document;
        $DT4($, "mousemove", this.move, this);
        $DT4($, "mouseup", this.stop, this);
        $DT4($, "contextmenu", this.contextmenu, this);
        if (this.context) $DT4(this.context, "contextmenu", this.contextmenu, this);
        this.trigger = _.target;
        mini.selectable(this.trigger, false);
        mini.selectable($.body, false);
        if (this.capture) if (isIE) this.trigger.setCapture(true);
        else if (document.captureEvents) document.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP | Event.MOUSEDOWN);
        this.started = false;
        this.startTime = new Date()
    },
    contextmenu: function($) {
        if (this.context) EWw(this.context, "contextmenu", this.contextmenu, this);
        EWw(document, "contextmenu", this.contextmenu, this);
        $.preventDefault();
        $.stopPropagation()
    },
    move: function(_) {
        if (this.delay) if (new Date() - this.startTime < this.delay) return;
        if (!this.started) {
            this.started = true;
            this.onStart(this)
        }
        var $ = this;
        if (!this.timer) {
            $.now = [_.pageX, _.pageY];
            $.event = _;
            $.onMove($);
            $.timer = null
        }
    },
    stop: function(B) {
        this.now = [B.pageX, B.pageY];
        this.event = B;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null
        }
        var A = document;
        mini.selectable(this.trigger, true);
        mini.selectable(A.body, true);
        if (this.capture) if (isIE) this.trigger.releaseCapture();
        else if (document.captureEvents) document.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP | Event.MOUSEDOWN);
        var _ = mini.MouseButton.Right != B.button;
        if (_ == false) B.preventDefault();
        EWw(A, "mousemove", this.move, this);
        EWw(A, "mouseup", this.stop, this);
        var $ = this;
        setTimeout(function() {
            EWw(document, "contextmenu", $.contextmenu, $);
            if ($.context) EWw($.context, "contextmenu", $.contextmenu, $)
        },
        1);
        if (this.started) this.onStop(this, _)
    }
};
mini.JSON = new(function() {
    var sb = [],
    useHasOwn = !!{}.hasOwnProperty,
    replaceString = function($, A) {
        var _ = m[A];
        if (_) return _;
        _ = A.charCodeAt();
        return "\\u00" + Math.floor(_ / 16).toString(16) + (_ % 16).toString(16)
    },
    doEncode = function($) {
        if ($ === null) {
            sb[sb.length] = "null";
            return
        }
        var A = typeof $;
        if (A == "undefined") {
            sb[sb.length] = "null";
            return
        } else if ($.push) {
            sb[sb.length] = "[";
            var D, _, C = $.length,
            E;
            for (_ = 0; _ < C; _ += 1) {
                E = $[_];
                A = typeof E;
                if (A == "undefined" || A == "function" || A == "unknown");
                else {
                    if (D) sb[sb.length] = ",";
                    doEncode(E);
                    D = true
                }
            }
            sb[sb.length] = "]";
            return
        } else if ($.getFullYear) {
            var B;
            sb[sb.length] = "\"";
            sb[sb.length] = $.getFullYear();
            sb[sb.length] = "-";
            B = $.getMonth() + 1;
            sb[sb.length] = B < 10 ? "0" + B: B;
            sb[sb.length] = "-";
            B = $.getDate();
            sb[sb.length] = B < 10 ? "0" + B: B;
            sb[sb.length] = "T";
            B = $.getHours();
            sb[sb.length] = B < 10 ? "0" + B: B;
            sb[sb.length] = ":";
            B = $.getMinutes();
            sb[sb.length] = B < 10 ? "0" + B: B;
            sb[sb.length] = ":";
            B = $.getSeconds();
            sb[sb.length] = B < 10 ? "0" + B: B;
            sb[sb.length] = "\"";
            return
        } else if (A == "string") {
            if (strReg1.test($)) {
                sb[sb.length] = "\"";
                sb[sb.length] = $.replace(strReg2, replaceString);
                sb[sb.length] = "\"";
                return
            }
            sb[sb.length] = "\"" + $ + "\"";
            return
        } else if (A == "number") {
            sb[sb.length] = $;
            return
        } else if (A == "boolean") {
            sb[sb.length] = String($);
            return
        } else {
            sb[sb.length] = "{";
            D,
            _,
            E;
            for (_ in $) if (!useHasOwn || $.hasOwnProperty(_)) {
                E = $[_];
                A = typeof E;
                if (A == "undefined" || A == "function" || A == "unknown");
                else {
                    if (D) sb[sb.length] = ",";
                    doEncode(_);
                    sb[sb.length] = ":";
                    doEncode(E);
                    D = true
                }
            }
            sb[sb.length] = "}";
            return
        }
    },
    m = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        "\"": "\\\"",
        "\\": "\\\\"
    },
    strReg1 = /["\\\x00-\x1f]/,
    strReg2 = /([\x00-\x1f\\"])/g;
    this.encode = function() {
        var $;
        return function($, _) {
            sb = [];
            doEncode($);
            return sb.join("")
        }
    } ();
    this.decode = function() {
        var re = /[\"\'](\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})[\"\']/g;
        return function(json) {
            if (json === "" || json === null || json === undefined) return json;
            json = json.replace(re, "new Date($1,$2-1,$3,$4,$5,$6)");
            var s = eval("(" + json + ")");
            return s
        }
    } ()
})();
mini.encode = mini.JSON.encode;
mini.decode = mini.JSON.decode;
mini.clone = function($) {
    if ($ === null || $ === undefined) return $;
    var B = mini.encode($),
    _ = mini.decode(B);
    function A(B) {
        for (var _ = 0,
        D = B.length; _ < D; _++) {
            var $ = B[_];
            delete $._state;
            delete $._id;
            delete $._pid;
            for (var C in $) {
                var E = $[C];
                if (E instanceof Array) A(E)
            }
        }
    }
    A(_ instanceof Array ? _: [_]);
    return _
};
var DAY_MS = 86400000,
HOUR_MS = 3600000,
MINUTE_MS = 60000;
mini.copyTo(mini, {
    clearTime: function($) {
        if (!$) return null;
        return new Date($.getFullYear(), $.getMonth(), $.getDate())
    },
    maxTime: function($) {
        if (!$) return null;
        return new Date($.getFullYear(), $.getMonth(), $.getDate(), 23, 59, 59)
    },
    cloneDate: function($) {
        if (!$) return null;
        return new Date($.getTime())
    },
    addDate: function(A, $, _) {
        if (!_) _ = "D";
        A = new Date(A.getTime());
        switch (_.toUpperCase()) {
        case "Y":
            A.setFullYear(A.getFullYear() + $);
            break;
        case "MO":
            A.setMonth(A.getMonth() + $);
            break;
        case "D":
            A.setDate(A.getDate() + $);
            break;
        case "H":
            A.setHours(A.getHours() + $);
            break;
        case "M":
            A.setMinutes(A.getMinutes() + $);
            break;
        case "S":
            A.setSeconds(A.getSeconds() + $);
            break;
        case "MS":
            A.setMilliseconds(A.getMilliseconds() + $);
            break
        }
        return A
    },
    getWeek: function(D, $, _) {
        $ += 1;
        var E = Math.floor((14 - ($)) / 12),
        G = D + 4800 - E,
        A = ($) + (12 * E) - 3,
        C = _ + Math.floor(((153 * A) + 2) / 5) + (365 * G) + Math.floor(G / 4) - Math.floor(G / 100) + Math.floor(G / 400) - 32045,
        F = (C + 31741 - (C % 7)) % 146097 % 36524 % 1461,
        H = Math.floor(F / 1460),
        B = ((F - H) % 365) + H;
        NumberOfWeek = Math.floor(B / 7) + 1;
        return NumberOfWeek
    },
    getWeekStartDate: function(C, B) {
        if (!B) B = 0;
        if (B > 6 || B < 0) throw new Error("out of weekday");
        var A = C.getDay(),
        _ = B - A;
        if (A < B) _ -= 7;
        var $ = new Date(C.getFullYear(), C.getMonth(), C.getDate() + _);
        return $
    },
    getShortWeek: function(_) {
        var $ = this.dateInfo.daysShort;
        return $[_]
    },
    getLongWeek: function(_) {
        var $ = this.dateInfo.daysLong;
        return $[_]
    },
    getShortMonth: function($) {
        var _ = this.dateInfo.monthsShort;
        return _[$]
    },
    getLongMonth: function($) {
        var _ = this.dateInfo.monthsLong;
        return _[$]
    },
    dateInfo: {
        monthsLong: ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        daysLong: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        daysShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        quarterLong: ["Q1", "Q2", "Q3", "Q4"],
        quarterShort: ["Q1", "Q2", "Q3", "Q4"],
        halfYearLong: ["first half", "second half"],
        patterns: {
            "d": "M/d/yyyy",
            "D": "dddd,MMMM dd,yyyy",
            "f": "dddd,MMMM dd,yyyy H:mm tt",
            "F": "dddd,MMMM dd,yyyy H:mm:ss tt",
            "g": "M/d/yyyy H:mm tt",
            "G": "M/d/yyyy H:mm:ss tt",
            "m": "MMMM dd",
            "o": "yyyy-MM-ddTHH:mm:ss.fff",
            "s": "yyyy-MM-ddTHH:mm:ss",
            "t": "H:mm tt",
            "T": "H:mm:ss tt",
            "U": "dddd,MMMM dd,yyyy HH:mm:ss tt",
            "y": "MMM,yyyy"
        },
        tt: {
            "AM": "AM",
            "PM": "PM"
        },
        ten: {
            "Early": "Early",
            "Mid": "Mid",
            "Late": "Late"
        },
        today: "Today",
        clockType: 24
    }
});
Date[DMah].getHalfYear = function() {
    if (!this.getMonth) return null;
    var $ = this.getMonth();
    if ($ < 6) return 0;
    return 1
};
Date[DMah].getQuarter = function() {
    if (!this.getMonth) return null;
    var $ = this.getMonth();
    if ($ < 3) return 0;
    if ($ < 6) return 1;
    if ($ < 9) return 2;
    return 3
};
mini.formatDate = function(C, O, F) {
    if (!C || !C.getFullYear || isNaN(C)) return "";
    var G = C.toString(),
    B = mini.dateInfo;
    if (!B) B = mini.dateInfo;
    if (typeof(B) !== "undefined") {
        var M = typeof(B.patterns[O]) !== "undefined" ? B.patterns[O] : O,
        J = C.getFullYear();
        G = M.replace(/yyyy/g, J);
        G = G.replace(/yy/g, (J + "").substring(2));
        var L = C.getHalfYear();
        G = G.replace(/hy/g, B.halfYearLong[L]);
        var I = C.getQuarter();
        G = G.replace(/Q/g, B.quarterLong[I]);
        G = G.replace(/q/g, B.quarterShort[I]);
        var $ = C.getMonth();
        G = G.replace(/MMMM/g, B.monthsLong[$].escapeDateTimeTokens());
        G = G.replace(/MMM/g, B.monthsShort[$].escapeDateTimeTokens());
        G = G.replace(/MM/g, $ + 1 < 10 ? "0" + ($ + 1) : $ + 1);
        G = G.replace(/(\\)?M/g,
        function(A, _) {
            return _ ? A: $ + 1
        });
        var N = C.getDay();
        G = G.replace(/dddd/g, B.daysLong[N].escapeDateTimeTokens());
        G = G.replace(/ddd/g, B.daysShort[N].escapeDateTimeTokens());
        var _ = C.getDate();
        G = G.replace(/dd/g, _ < 10 ? "0" + _: _);
        G = G.replace(/(\\)?d/g,
        function(A, $) {
            return $ ? A: _
        });
        var H = C.getHours(),
        A = H > 12 ? H - 12 : H;
        if (B.clockType == 12) if (H > 12) H -= 12;
        G = G.replace(/HH/g, H < 10 ? "0" + H: H);
        G = G.replace(/(\\)?H/g,
        function(_, $) {
            return $ ? _: H
        });
        G = G.replace(/hh/g, A < 10 ? "0" + A: A);
        G = G.replace(/(\\)?h/g,
        function(_, $) {
            return $ ? _: A
        });
        var D = C.getMinutes();
        G = G.replace(/mm/g, D < 10 ? "0" + D: D);
        G = G.replace(/(\\)?m/g,
        function(_, $) {
            return $ ? _: D
        });
        var K = C.getSeconds();
        G = G.replace(/ss/g, K < 10 ? "0" + K: K);
        G = G.replace(/(\\)?s/g,
        function(_, $) {
            return $ ? _: K
        });
        G = G.replace(/fff/g, C.getMilliseconds());
        G = G.replace(/tt/g, C.getHours() > 12 || C.getHours() == 0 ? B.tt["PM"] : B.tt["AM"]);
        var C = C.getDate(),
        E = "";
        if (C <= 10) E = B.ten["Early"];
        else if (C <= 20) E = B.ten["Mid"];
        else E = B.ten["Late"];
        G = G.replace(/ten/g, E)
    }
    return G.replace(/\\/g, "")
};
String[DMah].escapeDateTimeTokens = function() {
    return this.replace(/([dMyHmsft])/g, "\\$1")
};
mini.fixDate = function($, _) {
    if ( + $) while ($.getDate() != _.getDate()) $.setTime( + $ + ($ < _ ? 1 : -1) * HOUR_MS)
};
mini.parseDate = function(A, _) {
    if (typeof A == "object") return isNaN(A) ? null: A;
    if (typeof A == "number") {
        var $ = new Date(A * 1000);
        if ($.getTime() != A) return null;
        return isNaN($) ? null: $
    }
    if (typeof A == "string") {
        if (A.match(/^\d+(\.\d+)?$/)) {
            $ = new Date(parseFloat(A) * 1000);
            if ($.getTime() != A) return null;
            else return $
        }
        if (_ === undefined) _ = true;
        $ = mini.parseISO8601(A, _) || (A ? new Date(A) : null);
        return isNaN($) ? null: $
    }
    return null
};
mini.parseISO8601 = function(D, $) {
    var _ = D.match(/^([0-9]{4})([-\/]([0-9]{1,2})([-\/]([0-9]{1,2})([T ]([0-9]{1,2}):([0-9]{1,2})(:([0-9]{1,2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2})(:?([0-9]{2}))?))?)?)?)?$/);
    if (!_) {
        _ = D.match(/^([0-9]{4})[-\/]([0-9]{2})[-\/]([0-9]{2})[T ]([0-9]{1,2})/);
        if (_) {
            var A = new Date(_[1], _[2] - 1, _[3], _[4]);
            return A
        }
        _ = D.match(/^([0-9]{2})-([0-9]{2})-([0-9]{4})$/);
        if (!_) return null;
        else {
            A = new Date(_[3], _[1] - 1, _[2]);
            return A
        }
    }
    A = new Date(_[1], 0, 1);
    if ($ || !_[14]) {
        var C = new Date(_[1], 0, 1, 9, 0);
        if (_[3]) {
            A.setMonth(_[3] - 1);
            C.setMonth(_[3] - 1)
        }
        if (_[5]) {
            A.setDate(_[5]);
            C.setDate(_[5])
        }
        mini.fixDate(A, C);
        if (_[7]) A.setHours(_[7]);
        if (_[8]) A.setMinutes(_[8]);
        if (_[10]) A.setSeconds(_[10]);
        if (_[12]) A.setMilliseconds(Number("0." + _[12]) * 1000);
        mini.fixDate(A, C)
    } else {
        A.setUTCFullYear(_[1], _[3] ? _[3] - 1 : 0, _[5] || 1);
        A.setUTCHours(_[7] || 0, _[8] || 0, _[10] || 0, _[12] ? Number("0." + _[12]) * 1000 : 0);
        var B = Number(_[16]) * 60 + (_[18] ? Number(_[18]) : 0);
        B *= _[15] == "-" ? 1 : -1;
        A = new Date( + A + (B * 60 * 1000))
    }
    return A
};
mini.parseTime = function(E, F) {
    if (!E) return null;
    var B = parseInt(E);
    if (B == E && F) {
        $ = new Date(0);
        if (F[0] == "H") $.setHours(B);
        else if (F[0] == "m") $.setMinutes(B);
        else if (F[0] == "s") $.setSeconds(B);
        return $
    }
    var $ = mini.parseDate(E);
    if (!$) {
        var D = E.split(":"),
        _ = parseInt(D[0]),
        C = parseInt(D[1]),
        A = parseInt(D[2]);
        if (!isNaN(_) && !isNaN(C) && !isNaN(A)) {
            $ = new Date(0);
            $.setHours(_);
            $.setMinutes(C);
            $.setSeconds(A)
        }
        if (!isNaN(_) && (F == "H" || F == "HH")) {
            $ = new Date(0);
            $.setHours(_)
        } else if (!isNaN(_) && !isNaN(C) && (F == "H:mm" || F == "HH:mm")) {
            $ = new Date(0);
            $.setHours(_);
            $.setMinutes(C)
        } else if (!isNaN(_) && !isNaN(C) && F == "mm:ss") {
            $ = new Date(0);
            $.setMinutes(_);
            $.setSeconds(C)
        }
    }
    return $
};
mini.dateInfo = {
    monthsLong: ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
    monthsShort: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
    daysLong: ["\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d"],
    daysShort: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],
    quarterLong: ["\u4e00\u5b63\u5ea6", "\u4e8c\u5b63\u5ea6", "\u4e09\u5b63\u5ea6", "\u56db\u5b63\u5ea6"],
    quarterShort: ["Q1", "Q2", "Q2", "Q4"],
    halfYearLong: ["\u4e0a\u534a\u5e74", "\u4e0b\u534a\u5e74"],
    patterns: {
        "d": "yyyy-M-d",
        "D": "yyyy\u5e74M\u6708d\u65e5",
        "f": "yyyy\u5e74M\u6708d\u65e5 H:mm",
        "F": "yyyy\u5e74M\u6708d\u65e5 H:mm:ss",
        "g": "yyyy-M-d H:mm",
        "G": "yyyy-M-d H:mm:ss",
        "m": "MMMd\u65e5",
        "o": "yyyy-MM-ddTHH:mm:ss.fff",
        "s": "yyyy-MM-ddTHH:mm:ss",
        "t": "H:mm",
        "T": "H:mm:ss",
        "U": "yyyy\u5e74M\u6708d\u65e5 HH:mm:ss",
        "y": "yyyy\u5e74MM\u6708"
    },
    tt: {
        "AM": "\u4e0a\u5348",
        "PM": "\u4e0b\u5348"
    },
    ten: {
        "Early": "\u4e0a\u65ec",
        "Mid": "\u4e2d\u65ec",
        "Late": "\u4e0b\u65ec"
    },
    today: "\u4eca\u5929",
    clockType: 24
};
Lr0 = function($) {
    if (typeof $ == "string") {
        if ($.charAt(0) == "#") $ = $.substr(1);
        return document.getElementById($)
    } else return $
};
DD = function($, _) {
    $ = Lr0($);
    if (!$) return;
    var A = $.className.split(" ");
    return A.indexOf(_) != -1
};
F7y = function($, _) {
    if (!_) return;
    if (DD($, _) == false) jQuery($)[CeSH](_)
};
Lq = function($, _) {
    if (!_) return;
    jQuery($)[Vow](_)
};
ZD = function($) {
    $ = Lr0($);
    var _ = jQuery($);
    return {
        top: parseInt(_.css("margin-top"), 10) || 0,
        left: parseInt(_.css("margin-left"), 10) || 0,
        bottom: parseInt(_.css("margin-bottom"), 10) || 0,
        right: parseInt(_.css("margin-right"), 10) || 0
    }
};
MWQ = function($) {
    $ = Lr0($);
    var _ = jQuery($);
    return {
        top: parseInt(_.css("border-top-width"), 10) || 0,
        left: parseInt(_.css("border-left-width"), 10) || 0,
        bottom: parseInt(_.css("border-bottom-width"), 10) || 0,
        right: parseInt(_.css("border-right-width"), 10) || 0
    }
};
SqrI = function($) {
    $ = Lr0($);
    var _ = jQuery($);
    return {
        top: parseInt(_.css("padding-top"), 10) || 0,
        left: parseInt(_.css("padding-left"), 10) || 0,
        bottom: parseInt(_.css("padding-bottom"), 10) || 0,
        right: parseInt(_.css("padding-right"), 10) || 0
    }
};
D1No = function(_, $) {
    _ = Lr0(_);
    $ = parseInt($);
    if (isNaN($) || !_) return;
    if (jQuery.boxModel) {
        var A = SqrI(_),
        B = MWQ(_);
        $ = $ - A.left - A.right - B.left - B.right
    }
    if ($ < 0) $ = 0;
    _.style.width = $ + "px"
};
AUY = function(_, $) {
    _ = Lr0(_);
    $ = parseInt($);
    if (isNaN($) || !_) return;
    if (jQuery.boxModel) {
        var A = SqrI(_),
        B = MWQ(_);
        $ = $ - A.top - A.bottom - B.top - B.bottom
    }
    if ($ < 0) $ = 0;
    _.style.height = $ + "px"
};
ZmL = function($, _) {
    $ = Lr0($);
    if ($.style.display == "none" || $.type == "text/javascript") return 0;
    return _ ? jQuery($).width() : jQuery($).outerWidth()
};
YiC_ = function($, _) {
    $ = Lr0($);
    if ($.style.display == "none" || $.type == "text/javascript") return 0;
    return _ ? jQuery($).height() : jQuery($).outerHeight()
};
M1 = function(A, C, B, $, _) {
    if (B === undefined) {
        B = C.y;
        $ = C.width;
        _ = C.height;
        C = C.x
    }
    mini[_8Wt](A, C, B);
    D1No(A, $);
    AUY(A, _)
};
$mq = function(A) {
    var $ = mini.getXY(A),
    _ = {
        x: $[0],
        y: $[1],
        width: ZmL(A),
        height: YiC_(A)
    };
    _.left = _.x;
    _.top = _.y;
    _.right = _.x + _.width;
    _.bottom = _.y + _.height;
    return _
};
_r = function(A, B) {
    A = Lr0(A);
    if (!A || typeof B != "string") return;
    var F = jQuery(A),
    _ = B.toLowerCase().split(";");
    for (var $ = 0,
    C = _.length; $ < C; $++) {
        var E = _[$],
        D = E.split(":");
        if (D.length == 2) F.css(D[0].trim(), D[1].trim())
    }
};
SIV = function() {
    var $ = document.defaultView;
    return new Function("el", "style", ["style.indexOf('-')>-1 && (style=style.replace(/-(\\w)/g,function(m,a){return a.toUpperCase()}));", "style=='float' && (style='", $ ? "cssFloat": "styleFloat", "');return el.style[style] || ", $ ? "window.getComputedStyle(el,null)[style]": "el.currentStyle[style]", " || null;"].join(""))
} ();
YCJ = function(A, $) {
    var _ = false;
    A = Lr0(A);
    $ = Lr0($);
    if (A === $) return true;
    if (A && $) if (A.contains) {
        try {
            return A.contains($)
        } catch(B) {
            return false
        }
    } else if (A.compareDocumentPosition) return !! (A.compareDocumentPosition($) & 16);
    else while ($ = $.parentNode) _ = $ == A || _;
    return _
};
O21 = function(B, A, $) {
    B = Lr0(B);
    var C = document.body,
    _ = 0,
    D;
    $ = $ || 50;
    if (typeof $ != "number") {
        D = Lr0($);
        $ = 10
    }
    while (B && B.nodeType == 1 && _ < $ && B != C && B != D) {
        if (DD(B, A)) return B;
        _++;
        B = B.parentNode
    }
    return null
};
mini.copyTo(mini, {
    byId: Lr0,
    hasClass: DD,
    addClass: F7y,
    removeClass: Lq,
    getMargins: ZD,
    getBorders: MWQ,
    getPaddings: SqrI,
    setWidth: D1No,
    setHeight: AUY,
    getWidth: ZmL,
    getHeight: YiC_,
    setBox: M1,
    getBox: $mq,
    setStyle: _r,
    getStyle: SIV,
    repaint: function($) {
        if (!$) $ = document.body;
        F7y($, "mini-repaint");
        setTimeout(function() {
            Lq($, "mini-repaint")
        },
        1)
    },
    getSize: function($, _) {
        return {
            width: ZmL($, _),
            height: YiC_($, _)
        }
    },
    setSize: function(A, $, _) {
        D1No(A, $);
        AUY(A, _)
    },
    setX: function(_, B) {
        var $ = jQuery(_).offset(),
        A = $.top;
        if (A === undefined) A = $[1];
        mini[_8Wt](_, B, A)
    },
    setY: function(_, A) {
        var $ = jQuery(_).offset(),
        B = $.left;
        if (B === undefined) B = $[0];
        mini[_8Wt](_, B, A)
    },
    setXY: function(_, B, A) {
        var $ = {
            left: B,
            top: A
        };
        jQuery(_).offset($);
        jQuery(_).offset($)
    },
    getXY: function(_) {
        var $ = jQuery(_).offset();
        return [$.left, $.top]
    },
    getViewportBox: function() {
        var $ = jQuery(window).width(),
        _ = jQuery(window).height(),
        B = jQuery(document).scrollLeft(),
        A = jQuery(document.body).scrollTop();
        if (document.documentElement) A = document.documentElement.scrollTop;
        return {
            x: B,
            y: A,
            width: $,
            height: _,
            right: B + $,
            bottom: A + _
        }
    },
    getChildNodes: function(A, C) {
        A = Lr0(A);
        if (!A) return;
        var E = A.childNodes,
        B = [];
        for (var $ = 0,
        D = E.length; $ < D; $++) {
            var _ = E[$];
            if (_.nodeType == 1 || C === true) B.push(_)
        }
        return B
    },
    removeChilds: function(B, _) {
        B = Lr0(B);
        if (!B) return;
        var C = mini[OJy](B, true);
        for (var $ = 0,
        D = C.length; $ < D; $++) {
            var A = C[$];
            if (_ && A == _);
            else B.removeChild(C[$])
        }
    },
    isAncestor: YCJ,
    findParent: O21,
    findChild: function(_, A) {
        _ = Lr0(_);
        var B = _.getElementsByTagName("*");
        for (var $ = 0,
        C = B.length; $ < C; $++) {
            var _ = B[$];
            if (DD(_, A)) return _
        }
    },
    isAncestor: function(A, $) {
        var _ = false;
        A = Lr0(A);
        $ = Lr0($);
        if (A === $) return true;
        if (A && $) if (A.contains) {
            try {
                return A.contains($)
            } catch(B) {
                return false
            }
        } else if (A.compareDocumentPosition) return !! (A.compareDocumentPosition($) & 16);
        else while ($ = $.parentNode) _ = $ == A || _;
        return _
    },
    getOffsetsTo: function(_, A) {
        var $ = this.getXY(_),
        B = this.getXY(A);
        return [$[0] - B[0], $[1] - B[1]]
    },
    scrollIntoView: function(I, H, F) {
        var B = Lr0(H) || document.body,
        $ = this.getOffsetsTo(I, B),
        C = $[0] + B.scrollLeft,
        J = $[1] + B.scrollTop,
        D = J + I.offsetHeight,
        A = C + I.offsetWidth,
        G = B.clientHeight,
        K = parseInt(B.scrollTop, 10),
        _ = parseInt(B.scrollLeft, 10),
        L = K + G,
        E = _ + B.clientWidth;
        if (I.offsetHeight > G || J < K) B.scrollTop = J;
        else if (D > L) B.scrollTop = D - G;
        B.scrollTop = B.scrollTop;
        if (F !== false) {
            if (I.offsetWidth > B.clientWidth || C < _) B.scrollLeft = C;
            else if (A > E) B.scrollLeft = A - B.clientWidth;
            B.scrollLeft = B.scrollLeft
        }
        return this
    },
    setOpacity: function(_, $) {
        jQuery(_).css({
            "opacity": $
        })
    },
    selectable: function(_, $) {
        _ = Lr0(_);
        if ( !! $) {
            jQuery(_)[Vow]("mini-unselectable");
            if (isIE) _.unselectable = "off";
            else {
                _.style.MozUserSelect = "";
                _.style.KhtmlUserSelect = "";
                _.style.UserSelect = ""
            }
        } else {
            jQuery(_)[CeSH]("mini-unselectable");
            if (isIE) _.unselectable = "on";
            else {
                _.style.MozUserSelect = "none";
                _.style.UserSelect = "none";
                _.style.KhtmlUserSelect = "none"
            }
        }
    },
    selectRange: function(B, A, _) {
        if (B.createTextRange) {
            var $ = B.createTextRange();
            $.moveStart("character", A);
            $.moveEnd("character", _ - B.value.length);
            $[Ju6]()
        } else if (B.setSelectionRange) B.setSelectionRange(A, _);
        try {
            B.focus()
        } catch(C) {}
    },
    getSelectRange: function(A) {
        A = Lr0(A);
        if (!A) return;
        try {
            A.focus()
        } catch(C) {}
        var $ = 0,
        B = 0;
        if (A.createTextRange) {
            var _ = document.selection.createRange().duplicate();
            _.moveEnd("character", A.value.length);
            if (_.text === "") $ = A.value.length;
            else $ = A.value.lastIndexOf(_.text);
            _ = document.selection.createRange().duplicate();
            _.moveStart("character", -A.value.length);
            B = _.text.length
        } else {
            $ = A.selectionStart;
            B = A.selectionEnd
        }
        return [$, B]
    }
}); (function() {
    var $ = {
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable"
    },
    _ = document.createElement("div");
    _.setAttribute("class", "t");
    var A = _.className === "t";
    mini.setAttr = function(B, C, _) {
        B.setAttribute(A ? C: ($[C] || C), _)
    };
    mini.getAttr = function(B, C) {
        if (C == "value" && (isIE6 || isIE7)) {
            var _ = B.attributes[C];
            return _ ? _.value: null
        }
        var D = B.getAttribute(A ? C: ($[C] || C));
        if (typeof D == "function") D = B.attributes[C].value;
        return D
    }
})();
$DT4 = function(_, $, D, A) {
    _ = Lr0(_);
    A = A || _;
    if (!_ || !$ || !D || !A) return false;
    var B = mini[JUS](_, $, D, A);
    if (B) return false;
    var C = mini.createDelegate(D, A);
    mini.listeners.push([_, $, D, A, C]);
    if (jQuery.browser.mozilla && $ == "mousewheel") $ = "DOMMouseScroll";
    jQuery(_).bind($, C)
};
EWw = function(_, $, C, A) {
    _ = Lr0(_);
    A = A || _;
    if (!_ || !$ || !C || !A) return false;
    var B = mini[JUS](_, $, C, A);
    if (!B) return false;
    mini.listeners.remove(B);
    if (jQuery.browser.mozilla && $ == "mousewheel") $ = "DOMMouseScroll";
    jQuery(_).unbind($, B[4])
};
mini.copyTo(mini, {
    listeners: [],
    on: $DT4,
    un: EWw,
    findListener: function(A, _, F, B) {
        A = Lr0(A);
        B = B || A;
        if (!A || !_ || !F || !B) return false;
        var D = mini.listeners;
        for (var $ = 0,
        E = D.length; $ < E; $++) {
            var C = D[$];
            if (C[0] == A && C[1] == _ && C[2] == F && C[3] == B) return C
        }
    },
    clearEvent: function(A, _) {
        A = Lr0(A);
        if (!A) return false;
        var C = mini.listeners;
        for (var $ = C.length - 1; $ >= 0; $--) {
            var B = C[$];
            if (B[0] == A) if (!_ || _ == B[1]) EWw(A, B[1], B[2], B[3])
        }
    }
});
mini.copyTo(Array.prototype, {
    add: Array[DMah].enqueue = function($) {
        this[this.length] = $;
        return this
    },
    getRange: function(_, A) {
        var B = [];
        for (var $ = _; $ <= A; $++) B[B.length] = this[$];
        return B
    },
    addRange: function(A) {
        for (var $ = 0,
        _ = A.length; $ < _; $++) this[this.length] = A[$];
        return this
    },
    clear: function() {
        this.length = 0;
        return this
    },
    clone: function() {
        if (this.length === 1) return [this[0]];
        else return Array.apply(null, this)
    },
    contains: function($) {
        return (this.indexOf($) >= 0)
    },
    indexOf: function(_, B) {
        var $ = this.length;
        for (var A = (B < 0) ? Math.max(0, $ + B) : B || 0; A < $; A++) if (this[A] === _) return A;
        return - 1
    },
    dequeue: function() {
        return this.shift()
    },
    insert: function(_, $) {
        this.splice(_, 0, $);
        return this
    },
    insertRange: function(_, B) {
        for (var A = B.length - 1; A >= 0; A--) {
            var $ = B[A];
            this.splice(_, 0, $)
        }
        return this
    },
    remove: function(_) {
        var $ = this.indexOf(_);
        if ($ >= 0) this.splice($, 1);
        return ($ >= 0)
    },
    removeAt: function($) {
        var _ = this[$];
        this.splice($, 1);
        return _
    },
    removeRange: function(_) {
        _ = _.clone();
        for (var $ = 0,
        A = _.length; $ < A; $++) this.remove(_[$])
    }
});
mini.Keyboard = {
    Left: 37,
    Top: 38,
    Right: 39,
    Bottom: 40,
    PageUp: 33,
    PageDown: 34,
    End: 35,
    Home: 36,
    Enter: 13,
    ESC: 27,
    Space: 32,
    Tab: 9,
    Del: 46,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123
};
var ua = navigator.userAgent.toLowerCase(),
check = function($) {
    return $.test(ua)
},
DOC = document,
isStrict = DOC.compatMode == "CSS1Compat",
isOpera = Object[DMah].toString[If](window.opera) == "[object Opera]",
isChrome = check(/chrome/),
isWebKit = check(/webkit/),
isSafari = !isChrome && check(/safari/),
isSafari2 = isSafari && check(/applewebkit\/4/),
isSafari3 = isSafari && check(/version\/3/),
isSafari4 = isSafari && check(/version\/4/),
isIE = !!window.attachEvent && !isOpera,
isIE7 = isIE && check(/msie 7/),
isIE8 = isIE && check(/msie 8/),
isIE9 = isIE && check(/msie 9/),
isIE10 = isIE && document.documentMode == 10,
isIE6 = isIE && !isIE7 && !isIE8 && !isIE9 && !isIE10,
isFirefox = navigator.userAgent.indexOf("Firefox") > 0,
isGecko = !isWebKit && check(/gecko/),
isGecko2 = isGecko && check(/rv:1\.8/),
isGecko3 = isGecko && check(/rv:1\.9/),
isBorderBox = isIE && !isStrict,
isWindows = check(/windows|win32/),
isMac = check(/macintosh|mac os x/),
isAir = check(/adobeair/),
isLinux = check(/linux/),
isSecure = /^https/i.test(window.location.protocol);
if (isIE6) {
    try {
        DOC.execCommand("BackgroundImageCache", false, true)
    } catch(e) {}
}
mini.isIE = isIE;
mini.isIE6 = isIE6;
mini.isIE7 = isIE7;
mini.isIE8 = isIE8;
mini.isIE9 = isIE9;
mini.isFireFox = jQuery.browser.mozilla;
mini.isOpera = jQuery.browser.opera;
mini.isSafari = jQuery.browser.safari;
mini.noBorderBox = false;
if (jQuery.boxModel == false && isIE && isIE9 == false) mini.noBorderBox = true;
mini.MouseButton = {
    Left: 0,
    Middle: 1,
    Right: 2
};
if (isIE && !isIE9) mini.MouseButton = {
    Left: 1,
    Middle: 4,
    Right: 2
};
mini._MaskID = 1;
mini._MaskObjects = {};
mini.mask = function(C) {
    var _ = Lr0(C);
    if (mini.isElement(_)) C = {
        el: _
    };
    else if (typeof C == "string") C = {
        html: C
    };
    C = mini.copyTo({
        html: "",
        cls: "",
        style: "",
        backStyle: "background:#ccc"
    },
    C);
    C.el = Lr0(C.el);
    if (!C.el) C.el = document.body;
    _ = C.el;
    mini["unmask"](C.el);
    _._maskid = mini._MaskID++;
    mini._MaskObjects[_._maskid] = C;
    var $ = mini.append(_, "<div class=\"mini-mask\">" + "<div class=\"mini-mask-background\" style=\"" + C.backStyle + "\"></div>" + "<div class=\"mini-mask-msg " + C.cls + "\" style=\"" + C.style + "\">" + C.html + "</div>" + "</div>");
    C.maskEl = $;
    if (!mini.isNull(C.opacity)) mini.setOpacity($.firstChild, C.opacity);
    function A() {
        B.style.display = "block";
        var $ = mini.getSize(B);
        B.style.marginLeft = -$.width / 2 + "px";
        B.style.marginTop = -$.height / 2 + "px"
    }
    var B = $.lastChild;
    B.style.display = "none";
    setTimeout(function() {
        A()
    },
    0)
};
mini["unmask"] = function(_) {
    _ = Lr0(_);
    if (!_) _ = document.body;
    var A = mini._MaskObjects[_._maskid];
    if (!A) return;
    delete mini._MaskObjects[_._maskid];
    var $ = A.maskEl;
    A.maskEl = null;
    if ($ && $.parentNode) $.parentNode.removeChild($)
};
mini.copyTo(mini, {
    treeToArray: function(C, I, J, A, $) {
        if (!I) I = "children";
        var F = [];
        for (var H = 0,
        D = C.length; H < D; H++) {
            var B = C[H];
            F[F.length] = B;
            if (A) B[A] = $;
            var _ = B[I];
            if (_ && _.length > 0) {
                var E = B[J],
                G = this[NDHY](_, I, J, A, E);
                F.addRange(G)
            }
        }
        return F
    },
    arrayToTree: function(C, A, H, B) {
        if (!A) A = "children";
        H = H || "_id";
        B = B || "_pid";
        var G = [],
        F = {};
        for (var _ = 0,
        E = C.length; _ < E; _++) {
            var $ = C[_],
            I = $[H];
            if (I !== null && I !== undefined) F[I] = $;
            delete $[A]
        }
        for (_ = 0, E = C.length; _ < E; _++) {
            var $ = C[_],
            D = F[$[B]];
            if (!D) {
                G.push($);
                continue
            }
            if (!D[A]) D[A] = [];
            D[A].push($)
        }
        return G
    }
});
function UUID() {
    var A = [],
    _ = "0123456789ABCDEF".split("");
    for (var $ = 0; $ < 36; $++) A[$] = Math.floor(Math.random() * 16);
    A[14] = 4;
    A[19] = (A[19] & 3) | 8;
    for ($ = 0; $ < 36; $++) A[$] = _[A[$]];
    A[8] = A[13] = A[18] = A[23] = "-";
    return A.join("")
}
String.format = function(_) {
    var $ = Array[DMah].slice[If](arguments, 1);
    _ = _ || "";
    return _.replace(/\{(\d+)\}/g,
    function(A, _) {
        return $[_]
    })
};
String[DMah].trim = function() {
    var $ = /^\s+|\s+$/g;
    return function() {
        return this.replace($, "")
    }
} ();
mini.copyTo(mini, {
    measureText: function(B, _, C) {
        if (!this.measureEl) this.measureEl = mini.append(document.body, "<div></div>");
        this.measureEl.style.cssText = "position:absolute;left:-1000px;top:-1000px;visibility:hidden;";
        if (typeof B == "string") this.measureEl.className = B;
        else {
            this.measureEl.className = "";
            var G = jQuery(B),
            A = jQuery(this.measureEl),
            F = ["font-size", "font-style", "font-weight", "font-family", "line-height", "text-transform", "letter-spacing"];
            for (var $ = 0,
            E = F.length; $ < E; $++) {
                var D = F[$];
                A.css(D, G.css(D))
            }
        }
        if (C) _r(this.measureEl, C);
        this.measureEl.innerHTML = _;
        return mini.getSize(this.measureEl)
    }
});
jQuery(function() {
    mini.isReady = true;
    mini.parse();
    MiRM()
});
mini_onload = function($) {
    mini.layout();
    mini[FN_](document.body)
};
$DT4(window, "load", mini_onload);
mini.__LastWindowWidth = 0;
mini.__LastWindowHeight = 0;
mini.doWindowResizeTimer = null;
mini_onresize = function($) {
    if (mini.doWindowResizeTimer) clearTimeout(mini.doWindowResizeTimer);
    if (Ebi == false) return;
    if (typeof Ext != "undefined") mini.doWindowResizeTimer = setTimeout(function() {
        var _ = jQuery(window).width(),
        $ = jQuery(window).height();
        if (mini.__LastWindowWidth == _ && mini.__LastWindowHeight == $);
        else mini.layout(null, false);
        mini.doWindowResizeTimer = null
    },
    300);
    else mini.doWindowResizeTimer = setTimeout(function() {
        var _ = jQuery(window).width(),
        $ = jQuery(window).height();
        if (mini.__LastWindowWidth == _ && mini.__LastWindowHeight == $);
        else mini.layout(null, false);
        mini.doWindowResizeTimer = null
    },
    50)
};
$DT4(window, "resize", mini_onresize);
mini[Gf] = function(_, A) {
    var $ = A || document.body;
    while (1) {
        if (_ == null || !_.style) return false;
        if (_ && _.style && _.style.display == "none") return false;
        if (_ == $) return true;
        _ = _.parentNode
    }
    return true
};
mini.isWindowDisplay = function() {
    try {
        var _ = window.parent,
        E = _ != window;
        if (E) {
            var C = _.document.getElementsByTagName("iframe"),
            H = _.document.getElementsByTagName("frame"),
            G = [];
            for (var $ = 0,
            D = C.length; $ < D; $++) G.push(C[$]);
            for ($ = 0, D = H.length; $ < D; $++) G.push(H[$]);
            var B = null;
            for ($ = 0, D = G.length; $ < D; $++) {
                var A = G[$];
                if (A.contentWindow == window) {
                    B = A;
                    break
                }
            }
            if (!B) return false;
            return mini[Gf](B, _.document.body)
        } else return true
    } catch(F) {
        return true
    }
};
Ebi = mini.isWindowDisplay();
var __MiniWindowTimer = setInterval(function() {
    var $ = mini.isWindowDisplay();
    if ($ == true) {
        Ebi = true;
        clearInterval(__MiniWindowTimer);
        if ($ != Ebi) mini.layout()
    }
},
150);
mini.layoutIFrames = function($) {
    if (!$) $ = document.body;
    var _ = document.getElementsByTagName("iframe");
    setTimeout(function() {
        for (var A = 0,
        C = _.length; A < C; A++) {
            var B = _[A];
            try {
                if (mini[Gf](B) && YCJ($, B)) {
                    B.contentWindow.mini.layout(null, false);
                    B.contentWindow.mini.layoutIFrames()
                }
            } catch(D) {}
        }
    },
    1)
};
$.ajaxSetup({
    cache: false
});
if (isIE) setInterval(function() {
    CollectGarbage()
},
1000);
mini_unload = function(E) {
    var D = document.getElementsByTagName("iframe");
    if (D.length > 0) for (var $ = 0,
    C = D.length; $ < C; $++) {
        try {
            var B = D[$];
            B.src = "";
            if (B.parentNode) B.parentNode.removeChild(B)
        } catch(E) {}
    }
    var A = mini.getComponents();
    for ($ = 0, C = A.length; $ < C; $++) {
        var _ = A[$];
        _[HFtw](false)
    }
    A.length = 0;
    A = null;
    EWw(window, "unload", mini_unload);
    EWw(window, "load", mini_onload);
    EWw(window, "resize", mini_onresize);
    mini.components = {};
    mini.classes = {};
    mini.uiClasses = {};
    try {
        CollectGarbage()
    } catch(E) {}
};
$DT4(window, "unload", mini_unload);
function __OnIFrameMouseDown() {
    jQuery(document).trigger("mousedown")
}
function __BindIFrames() {
    var C = document.getElementsByTagName("iframe");
    for (var $ = 0,
    A = C.length; $ < A; $++) {
        var _ = C[$];
        if (_.contentWindow) {
            try {
                _.contentWindow.document.onmousedown = __OnIFrameMouseDown
            } catch(B) {}
        }
    }
}
setInterval(function() {
    __BindIFrames()
},
500);
mini.zIndex = 1000;
mini.getMaxZIndex = function() {
    return mini.zIndex++
};
LRX = function() {
    this._bindFields = [];
    this._bindForms = [];
    LRX[_s][FjoU][If](this)
};
WKkQ(LRX, B9W, {
    bindField: function(A, D, C, B, $) {
        A = mini.get(A);
        D = mini.get(D);
        if (!A || !D || !C) return;
        var _ = {
            control: A,
            source: D,
            field: C,
            convert: $,
            mode: B
        };
        this._bindFields.push(_);
        D.on("currentchanged", this.QM, this);
        A.on("valuechanged", this.DS, this)
    },
    bindForm: function(B, F, D, A) {
        B = Lr0(B);
        F = mini.get(F);
        if (!B || !F) return;
        var B = new mini.Form(B),
        $ = B.getFields();
        for (var _ = 0,
        E = $.length; _ < E; _++) {
            var C = $[_];
            this.bindField(C, F, C.getName(), D, A)
        }
    },
    QM: function(H) {
        if (this._doSetting) return;
        this._doSetting = true;
        var G = H.sender,
        _ = H.record;
        for (var $ = 0,
        F = this._bindFields.length; $ < F; $++) {
            var B = this._bindFields[$];
            if (B.source != G) continue;
            var C = B.control,
            D = B.field;
            if (C[XFB]) if (_) {
                var A = _[D];
                C[XFB](A)
            } else C[XFB]("")
        }
        var E = this;
        setTimeout(function() {
            E._doSetting = false
        },
        10)
    },
    DS: function(H) {
        if (this._doSetting) return;
        this._doSetting = true;
        var D = H.sender,
        _ = D.getValue();
        for (var $ = 0,
        G = this._bindFields.length; $ < G; $++) {
            var C = this._bindFields[$];
            if (C.control != D || C.mode === false) continue;
            var F = C.source,
            B = F.getCurrent();
            if (!B) continue;
            var A = {};
            A[C.field] = _;
            F[X1](B, A)
        }
        var E = this;
        setTimeout(function() {
            E._doSetting = false
        },
        10)
    }
});
W4(LRX, "databinding");
GHF = function() {
    this._sources = {};
    this._data = {};
    this._links = [];
    this.PGcL = {};
    GHF[_s][FjoU][If](this)
};
WKkQ(GHF, B9W, {
    add: function(_, $) {
        if (!_ || !$) return;
        this._sources[_] = $;
        this._data[_] = [];
        $.autoCreateNewID = true;
        $.Dw = $.getIdField();
        $.OUe = false;
        $.on("addrow", this.OD8, this);
        $.on("updaterow", this.OD8, this);
        $.on("deleterow", this.OD8, this);
        $.on("removerow", this.OD8, this);
        $.on("preload", this.Y_M, this);
        $.on("selectionchanged", this.IYb, this)
    },
    addLink: function(B, _, $) {
        if (!B || !_ || !$) return;
        if (!this._sources[B] || !this._sources[_]) return;
        var A = {
            parentName: B,
            childName: _,
            parentField: $
        };
        this._links.push(A)
    },
    clearData: function() {
        this._data = {};
        this.PGcL = {};
        for (var $ in this._sources) this._data = []
    },
    getData: function() {
        return this._data
    },
    _getNameByListControl: function($) {
        for (var A in this._sources) {
            var _ = this._sources[A];
            if (_ == $) return A
        }
    },
    _getRecord: function(E, _, D) {
        var B = this._data[E];
        if (!B) return false;
        for (var $ = 0,
        C = B.length; $ < C; $++) {
            var A = B[$];
            if (A[D] == _[D]) return A
        }
        return null
    },
    OD8: function(F) {
        var C = F.type,
        _ = F.record,
        D = this._getNameByListControl(F.sender),
        E = this._getRecord(D, _, F.sender.getIdField()),
        A = this._data[D];
        if (E) {
            A = this._data[D];
            A.remove(E)
        }
        if (C == "removerow" && _._state == "added");
        else A.push(_);
        this.PGcL[D] = F.sender.PGcL;
        if (_._state == "added") {
            var $ = this._getParentSource(F.sender);
            if ($) {
                var B = $[RgBO]();
                if (B) _._parentId = B[$.getIdField()];
                else A.remove(_)
            }
        }
    },
    Y_M: function(M) {
        var J = M.sender,
        L = this._getNameByListControl(J),
        K = M.sender.getIdField(),
        A = this._data[L],
        $ = {};
        for (var F = 0,
        C = A.length; F < C; F++) {
            var G = A[F];
            $[G[K]] = G
        }
        var N = this.PGcL[L];
        if (N) J.PGcL = N;
        var I = M.data || [];
        for (F = 0, C = I.length; F < C; F++) {
            var G = I[F],
            H = $[G[K]];
            if (H) {
                delete H._uid;
                mini.copyTo(G, H)
            }
        }
        var D = this._getParentSource(J);
        if (J.getPageIndex && J.getPageIndex() == 0) {
            var E = [];
            for (F = 0, C = A.length; F < C; F++) {
                G = A[F];
                if (G._state == "added") if (D) {
                    var B = D[RgBO]();
                    if (B && B[D.getIdField()] == G._parentId) E.push(G)
                } else E.push(G)
            }
            E.reverse();
            I.insertRange(0, E)
        }
        var _ = [];
        for (F = I.length - 1; F >= 0; F--) {
            G = I[F],
            H = $[G[K]];
            if (H && H._state == "removed") {
                I.removeAt(F);
                _.push(H)
            }
        }
    },
    _getParentSource: function(C) {
        var _ = this._getNameByListControl(C);
        for (var $ = 0,
        B = this._links.length; $ < B; $++) {
            var A = this._links[$];
            if (A.childName == _) return this._sources[A.parentName]
        }
    },
    _getLinks: function(B) {
        var C = this._getNameByListControl(B),
        D = [];
        for (var $ = 0,
        A = this._links.length; $ < A; $++) {
            var _ = this._links[$];
            if (_.parentName == C) D.push(_)
        }
        return D
    },
    IYb: function(G) {
        var A = G.sender,
        _ = A[RgBO](),
        F = this._getLinks(A);
        for (var $ = 0,
        E = F.length; $ < E; $++) {
            var D = F[$],
            C = this._sources[D.childName];
            if (_) {
                var B = {};
                B[D.parentField] = _[A.getIdField()];
                C.load(B)
            } else C[HE1]([])
        }
    }
});
W4(GHF, "dataset");
N9 = function() {
    N9[_s][FjoU][If](this)
};
WKkQ(N9, R0pW, {
    _clearBorder: false,
    formField: true,
    value: "",
    uiCls: "mini-hidden",
    _create: function() {
        this.el = document.createElement("input");
        this.el.type = "hidden";
        this.el.className = "mini-hidden"
    },
    setName: function($) {
        this.name = $;
        this.el.name = $
    },
    setValue: function($) {
        if ($ === null || $ === undefined) $ = "";
        this.el.value = $
    },
    getValue: function() {
        return this.el.value
    },
    getFormValue: function() {
        return this.getValue()
    }
});
W4(N9, "hidden");
Z7 = function() {
    Z7[_s][FjoU][If](this);
    this[NXq](false);
    this.setAllowDrag(this.allowDrag);
    this.setAllowResize(this[T_s])
};
WKkQ(Z7, R0pW, {
    _clearBorder: false,
    uiCls: "mini-popup",
    _create: function() {
        var $ = this.el = document.createElement("div");
        this.el.className = "mini-popup";
        this._contentEl = this.el
    },
    _initEvents: function() {
        Ehny(function() {
            $DT4(document, "mousedown", this.Eu0F, this);
            $DT4(this.el, "mouseover", this.F1, this);
            $DT4(window, "resize", this.RyA, this)
        },
        this)
    },
    doLayout: function() {
        if (!this.canLayout()) return;
        Z7[_s][A6_][If](this);
        this._KH();
        var A = this.el.childNodes;
        if (A) for (var $ = 0,
        B = A.length; $ < B; $++) {
            var _ = A[$];
            mini.layout(_)
        }
    },
    destroy: function($) {
        mini.removeChilds(this._contentEl);
        EWw(document, "mousedown", this.Eu0F, this);
        EWw(window, "resize", this.RyA, this);
        if (this.TJj) {
            jQuery(this.TJj).remove();
            this.TJj = null
        }
        if (this.shadowEl) {
            jQuery(this.shadowEl).remove();
            this.shadowEl = null
        }
        Z7[_s][HFtw][If](this, $)
    },
    setBody: function(_) {
        if (!_) return;
        if (!mini.isArray(_)) _ = [_];
        for (var $ = 0,
        A = _.length; $ < A; $++) mini.append(this._contentEl, _[$])
    },
    getAttrs: function($) {
        var A = Z7[_s][XNM][If](this, $);
        mini[GRcU]($, A, ["popupEl", "popupCls", "showAction", "hideAction", "hAlign", "vAlign", "modalStyle", "onbeforeopen", "open", "onbeforeclose", "onclose"]);
        mini[MTh]($, A, ["showModal", "showShadow", "allowDrag", "allowResize"]);
        mini[Ova]($, A, ["showDelay", "hideDelay", "hOffset", "vOffset", "minWidth", "minHeight", "maxWidth", "maxHeight"]);
        var _ = mini[OJy]($, true);
        A.body = _;
        return A
    }
});
W4(Z7, "popup");
Z7_prototype = {
    isPopup: false,
    popupEl: null,
    popupCls: "",
    showAction: "mouseover",
    hideAction: "outerclick",
    showDelay: 300,
    hideDelay: 500,
    hAlign: "left",
    vAlign: "below",
    hOffset: 0,
    vOffset: 0,
    minWidth: 50,
    minHeight: 25,
    maxWidth: 2000,
    maxHeight: 2000,
    showModal: false,
    showShadow: true,
    modalStyle: "opacity:0.2",
    Jr: "mini-popup-drag",
    PyIp: "mini-popup-resize",
    allowDrag: false,
    allowResize: false,
    _5Cn: function() {
        if (!this.popupEl) return;
        EWw(this.popupEl, "click", this.Bwv, this);
        EWw(this.popupEl, "contextmenu", this.Da1J, this);
        EWw(this.popupEl, "mouseover", this.F1, this)
    },
    WwFw: function() {
        if (!this.popupEl) return;
        $DT4(this.popupEl, "click", this.Bwv, this);
        $DT4(this.popupEl, "contextmenu", this.Da1J, this);
        $DT4(this.popupEl, "mouseover", this.F1, this)
    },
    doShow: function(A) {
        var $ = {
            popupEl: this.popupEl,
            htmlEvent: A,
            cancel: false
        };
        this.fire("BeforeOpen", $);
        if ($.cancel == true) return;
        this.fire("opening", $);
        if ($.cancel == true) return;
        if (!this.popupEl) this.show();
        else {
            var _ = {};
            if (A) _.xy = [A.pageX, A.pageY];
            this.showAtEl(this.popupEl, _)
        }
    },
    doHide: function(_) {
        var $ = {
            popupEl: this.popupEl,
            htmlEvent: _,
            cancel: false
        };
        this.fire("BeforeClose", $);
        if ($.cancel == true) return;
        this.close()
    },
    show: function(_, $) {
        this.showAtPos(_, $)
    },
    showAtPos: function(B, A) {
        this[NF](document.body);
        if (!B) B = "center";
        if (!A) A = "middle";
        this.el.style.position = "absolute";
        this.el.style.left = "-2000px";
        this.el.style.top = "-2000px";
        this.el.style.display = "";
        this.SOB();
        var _ = mini.getViewportBox(),
        $ = $mq(this.el);
        if (B == "left") B = 0;
        if (B == "center") B = _.width / 2 - $.width / 2;
        if (B == "right") B = _.width - $.width;
        if (A == "top") A = 0;
        if (A == "middle") A = _.y + _.height / 2 - $.height / 2;
        if (A == "bottom") A = _.height - $.height;
        if (B + $.width > _.right) B = _.right - $.width;
        if (A + $.height > _.bottom) A = _.bottom - $.height;
        this.LK(B, A)
    },
    Cn8: function() {
        jQuery(this.TJj).remove();
        if (!this[Vb2Y]) return;
        if (this.visible == false) return;
        var $ = mini.getViewportBox();
        this.TJj = mini.append(document.body, "<div class=\"mini-modal\"></div>");
        this.TJj.style.height = $.height + "px";
        this.TJj.style.width = $.width + "px";
        this.TJj.style.zIndex = SIV(this.el, "zIndex") - 1;
        _r(this.TJj, this.modalStyle)
    },
    _KH: function() {
        if (!this.shadowEl) this.shadowEl = mini.append(document.body, "<div class=\"mini-shadow\"></div>");
        this.shadowEl.style.display = this[Xqk] ? "": "none";
        if (this[Xqk]) {
            var $ = $mq(this.el),
            A = this.shadowEl.style;
            A.width = $.width + "px";
            A.height = $.height + "px";
            A.left = $.x + "px";
            A.top = $.y + "px";
            var _ = SIV(this.el, "zIndex");
            if (!isNaN(_)) this.shadowEl.style.zIndex = _ - 2
        }
    },
    SOB: function() {
        this.el.style.display = "";
        var $ = $mq(this.el);
        if ($.width > this.maxWidth) {
            D1No(this.el, this.maxWidth);
            $ = $mq(this.el)
        }
        if ($.height > this.maxHeight) {
            AUY(this.el, this.maxHeight);
            $ = $mq(this.el)
        }
        if ($.width < this.minWidth) {
            D1No(this.el, this.minWidth);
            $ = $mq(this.el)
        }
        if ($.height < this.minHeight) {
            AUY(this.el, this.minHeight);
            $ = $mq(this.el)
        }
    },
    showAtEl: function(H, D) {
        H = Lr0(H);
        if (!H) return;
        if (!this.isRender() || this.el.parentNode != document.body) this[NF](document.body);
        var A = {
            hAlign: this.hAlign,
            vAlign: this.vAlign,
            hOffset: this.hOffset,
            vOffset: this.vOffset,
            popupCls: this.popupCls
        };
        mini.copyTo(A, D);
        F7y(H, A.popupCls);
        H.popupCls = A.popupCls;
        this._popupEl = H;
        this.el.style.position = "absolute";
        this.el.style.left = "-2000px";
        this.el.style.top = "-2000px";
        this.el.style.display = "";
        this[A6_]();
        this.SOB();
        var J = mini.getViewportBox(),
        B = $mq(this.el),
        L = $mq(H),
        F = A.xy,
        C = A.hAlign,
        E = A.vAlign,
        M = J.width / 2 - B.width / 2,
        K = 0;
        if (F) {
            M = F[0];
            K = F[1]
        }
        switch (A.hAlign) {
        case "outleft":
            M = L.x - B.width;
            break;
        case "left":
            M = L.x;
            break;
        case "center":
            M = L.x + L.width / 2 - B.width / 2;
            break;
        case "right":
            M = L.right - B.width;
            break;
        case "outright":
            M = L.right;
            break;
        default:
            break
        }
        switch (A.vAlign) {
        case "above":
            K = L.y - B.height;
            break;
        case "top":
            K = L.y;
            break;
        case "middle":
            K = L.y + L.height / 2 - B.height / 2;
            break;
        case "bottom":
            K = L.bottom - B.height;
            break;
        case "below":
            K = L.bottom;
            break;
        default:
            break
        }
        M = parseInt(M);
        K = parseInt(K);
        if (A.outVAlign || A.outHAlign) {
            if (A.outVAlign == "above") if (K + B.height > J.bottom) {
                var _ = L.y - J.y,
                I = J.bottom - L.bottom;
                if (_ > I) K = L.y - B.height
            }
            if (A.outHAlign == "outleft") if (M + B.width > J.right) {
                var G = L.x - J.x,
                $ = J.right - L.right;
                if (G > $) M = L.x - B.width
            }
            if (A.outHAlign == "right") if (M + B.width > J.right) M = L.right - B.width;
            this.LK(M, K)
        } else this.showAtPos(M + A.hOffset, K + A.vOffset)
    },
    LK: function(A, _) {
        this.el.style.display = "";
        this.el.style.zIndex = mini.getMaxZIndex();
        mini.setX(this.el, A);
        mini.setY(this.el, _);
        this[NXq](true);
        if (this.hideAction == "mouseout") $DT4(document, "mousemove", this.ZGj, this);
        var $ = this;
        this._KH();
        this.Cn8();
        mini.layoutIFrames(this.el);
        mini[FN_](this.el);
        this.isPopup = true;
        this.fire("Open")
    },
    open: function() {
        this.show()
    },
    close: function() {
        this.hide()
    },
    hide: function() {
        if (!this.el) return;
        if (this.popupEl) Lq(this.popupEl, this.popupEl.popupCls);
        if (this._popupEl) Lq(this._popupEl, this._popupEl.popupCls);
        this._popupEl = null;
        jQuery(this.TJj).remove();
        if (this.shadowEl) this.shadowEl.style.display = "none";
        EWw(document, "mousemove", this.ZGj, this);
        this[NXq](false);
        this.isPopup = false;
        this.fire("Close")
    },
    setPopupEl: function($) {
        $ = Lr0($);
        if (!$) return;
        this._5Cn();
        this.popupEl = $;
        this.WwFw()
    },
    setPopupCls: function($) {
        this.popupCls = $
    },
    setShowAction: function($) {
        this.showAction = $
    },
    setHideAction: function($) {
        this.hideAction = $
    },
    setShowDelay: function($) {
        this.showDelay = $
    },
    setHideDelay: function($) {
        this.hideDelay = $
    },
    setHAlign: function($) {
        this.hAlign = $
    },
    setVAlign: function($) {
        this.vAlign = $
    },
    setHOffset: function($) {
        $ = parseInt($);
        if (isNaN($)) $ = 0;
        this.hOffset = $
    },
    setVOffset: function($) {
        $ = parseInt($);
        if (isNaN($)) $ = 0;
        this.vOffset = $
    },
    setShowModal: function($) {
        this[Vb2Y] = $
    },
    setShowShadow: function($) {
        this[Xqk] = $
    },
    setMinWidth: function($) {
        if (isNaN($)) return;
        this.minWidth = $
    },
    setMinHeight: function($) {
        if (isNaN($)) return;
        this.minHeight = $
    },
    setMaxWidth: function($) {
        if (isNaN($)) return;
        this.maxWidth = $
    },
    setMaxHeight: function($) {
        if (isNaN($)) return;
        this.maxHeight = $
    },
    setAllowDrag: function($) {
        this.allowDrag = $;
        Lq(this.el, this.Jr);
        if ($) F7y(this.el, this.Jr)
    },
    setAllowResize: function($) {
        this[T_s] = $;
        Lq(this.el, this.PyIp);
        if ($) F7y(this.el, this.PyIp)
    },
    Bwv: function(_) {
        if (this.WJX) return;
        if (this.showAction != "leftclick") return;
        var $ = jQuery(this.popupEl).attr("allowPopup");
        if (String($) == "false") return;
        this.doShow(_)
    },
    Da1J: function(_) {
        if (this.WJX) return;
        if (this.showAction != "rightclick") return;
        var $ = jQuery(this.popupEl).attr("allowPopup");
        if (String($) == "false") return;
        _.preventDefault();
        this.doShow(_)
    },
    F1: function(A) {
        if (this.WJX) return;
        if (this.showAction != "mouseover") return;
        var _ = jQuery(this.popupEl).attr("allowPopup");
        if (String(_) == "false") return;
        clearTimeout(this._hideTimer);
        this._hideTimer = null;
        if (this.isPopup) return;
        var $ = this;
        this._showTimer = setTimeout(function() {
            $.doShow(A)
        },
        this.showDelay)
    },
    ZGj: function($) {
        if (this.hideAction != "mouseout") return;
        this.PXBm($)
    },
    Eu0F: function($) {
        if (this.hideAction != "outerclick") return;
        if (!this.isPopup) return;
        if (this[ZZJ]($) || (this.popupEl && YCJ(this.popupEl, $.target)));
        else this.doHide($)
    },
    PXBm: function(_) {
        if (YCJ(this.el, _.target) || (this.popupEl && YCJ(this.popupEl, _.target)));
        else {
            clearTimeout(this._showTimer);
            this._showTimer = null;
            if (this._hideTimer) return;
            var $ = this;
            this._hideTimer = setTimeout(function() {
                $.doHide(_)
            },
            this.hideDelay)
        }
    },
    RyA: function($) {
        if (this[Gf]()) this.Cn8()
    }
};
mini.copyTo(Z7.prototype, Z7_prototype);
MBR = function() {
    MBR[_s][FjoU][If](this)
};
WKkQ(MBR, R0pW, {
    text: "",
    iconCls: "",
    iconStyle: "",
    plain: false,
    checkOnClick: false,
    checked: false,
    groupName: "",
    F7E: "mini-button-plain",
    _hoverCls: "mini-button-hover",
    Bt5: "mini-button-pressed",
    H4_: "mini-button-checked",
    GPa: "mini-button-disabled",
    allowCls: "",
    _clearBorder: false,
    set: function($) {
        if (typeof $ == "string") return this;
        this.OTH = $.text || $[Wt3] || $.iconCls || $.iconPosition;
        MBR[_s].set[If](this, $);
        if (this.OTH === false) {
            this.OTH = true;
            this[SbW]()
        }
        return this
    },
    uiCls: "mini-button",
    _create: function() {
        this.el = document.createElement("a");
        this.el.className = "mini-button";
        this.el.hideFocus = true;
        this.el.href = "javascript:void(0)";
        this.el.onclick = function() {
            return false
        };
        this[SbW]()
    },
    _initEvents: function() {
        Ehny(function() {
            $DT4(this.el, "mousedown", this.U8z, this);
            $DT4(this.el, "click", this.ZmC, this)
        },
        this)
    },
    destroy: function($) {
        this.el.onclick = null;
        if (this.menu) this.menu.owner = null;
        this.menu = null;
        MBR[_s][HFtw][If](this, $)
    },
    doUpdate: function() {
        if (this.OTH === false) return;
        var _ = "",
        $ = this.text;
        if (this.iconCls && $) _ = " mini-button-icon " + this.iconCls;
        else if (this.iconCls && $ === "") {
            _ = " mini-button-iconOnly " + this.iconCls;
            $ = "&nbsp;"
        }
        var A = "<span class=\"mini-button-text " + _ + "\">" + $ + "</span>";
        if (this.allowCls) A = A + "<span class=\"mini-button-allow " + this.allowCls + "\"></span>";
        this.el.innerHTML = A
    },
    href: "",
    setHref: function($) {
        this.href = $;
        this.el.href = $;
        this.el.onclick = null
    },
    getHref: function() {
        return this.href
    },
    target: "",
    setTarget: function($) {
        this.target = $;
        this.el.target = $
    },
    getTarget: function() {
        return this.target
    },
    setText: function($) {
        if (this.text != $) {
            this.text = $;
            this[SbW]()
        }
    },
    getText: function() {
        return this.text
    },
    setIconCls: function($) {
        this.iconCls = $;
        this[SbW]()
    },
    getIconCls: function() {
        return this.iconCls
    },
    setIconStyle: function($) {
        this[Wt3] = $;
        this[SbW]()
    },
    getIconStyle: function() {
        return this[Wt3]
    },
    setIconPosition: function($) {
        this.iconPosition = "left";
        this[SbW]()
    },
    getIconPosition: function() {
        return this.iconPosition
    },
    setPlain: function($) {
        this.plain = $;
        if ($) this[Ze](this.F7E);
        else this[DY](this.F7E)
    },
    getPlain: function() {
        return this.plain
    },
    setGroupName: function($) {
        this[Njwq] = $
    },
    getGroupName: function() {
        return this[Njwq]
    },
    setCheckOnClick: function($) {
        this[$ed] = $
    },
    getCheckOnClick: function() {
        return this[$ed]
    },
    setChecked: function($) {
        var _ = this.checked != $;
        this.checked = $;
        if ($) this[Ze](this.H4_);
        else this[DY](this.H4_);
        if (_) this.fire("CheckedChanged")
    },
    getChecked: function() {
        return this.checked
    },
    doClick: function() {
        this.ZmC(null)
    },
    ZmC: function(D) {
        if (this[Pa]()) return;
        this.focus();
        if (this[$ed]) if (this[Njwq]) {
            var _ = this[Njwq],
            C = mini.findControls(function($) {
                if ($.type == "button" && $[Njwq] == _) return true
            });
            if (C.length > 0) {
                for (var $ = 0,
                A = C.length; $ < A; $++) {
                    var B = C[$];
                    if (B != this) B.setChecked(false)
                }
                this.setChecked(true)
            } else this.setChecked(!this.checked)
        } else this.setChecked(!this.checked);
        this.fire("click", {
            htmlEvent: D
        })
    },
    U8z: function($) {
        if (this[Pa]()) return;
        this[Ze](this.Bt5);
        $DT4(document, "mouseup", this.P9K, this)
    },
    P9K: function($) {
        this[DY](this.Bt5);
        EWw(document, "mouseup", this.P9K, this)
    },
    onClick: function(_, $) {
        this.on("click", _, $)
    },
    getAttrs: function($) {
        var _ = MBR[_s][XNM][If](this, $);
        _.text = $.innerHTML;
        mini[GRcU]($, _, ["text", "href", "iconCls", "iconStyle", "iconPosition", "groupName", "menu", "onclick", "oncheckedchanged", "target"]);
        mini[MTh]($, _, ["plain", "checkOnClick", "checked"]);
        return _
    }
});
W4(MBR, "button");
T9MoButton = function() {
    T9MoButton[_s][FjoU][If](this)
};
WKkQ(T9MoButton, MBR, {
    uiCls: "mini-menubutton",
    allowCls: "mini-button-menu",
    setMenu: function($) {
        if (mini.isArray($)) $ = {
            type: "menu",
            items: $
        };
        if (typeof $ == "string") {
            var _ = Lr0($);
            if (!_) return;
            mini.parse($);
            $ = mini.get($)
        }
        if (this.menu !== $) {
            this.menu = mini.getAndCreate($);
            this.menu.setPopupEl(this.el);
            this.menu.setPopupCls("mini-button-popup");
            this.menu.setShowAction("leftclick");
            this.menu.setHideAction("outerclick");
            this.menu.setHAlign("left");
            this.menu.setVAlign("below");
            this.menu.hide();
            this.menu.owner = this
        }
    },
    setEnabled: function($) {
        this.enabled = $;
        if ($) this[DY](this.GPa);
        else this[Ze](this.GPa);
        jQuery(this.el).attr("allowPopup", !!$)
    }
});
W4(T9MoButton, "menubutton");
mini.SplitButton = function() {
    mini.SplitButton[_s][FjoU][If](this)
};
WKkQ(mini.SplitButton, T9MoButton, {
    uiCls: "mini-splitbutton",
    allowCls: "mini-button-split"
});
W4(mini.SplitButton, "splitbutton");
DM_ = function() {
    DM_[_s][FjoU][If](this)
};
WKkQ(DM_, R0pW, {
    formField: true,
    text: "",
    checked: false,
    defaultValue: false,
    trueValue: true,
    falseValue: false,
    uiCls: "mini-checkbox",
    _create: function() {
        var $ = this.uid + "$check";
        this.el = document.createElement("span");
        this.el.className = "mini-checkbox";
        this.el.innerHTML = "<input id=\"" + $ + "\" name=\"" + this.id + "\" type=\"checkbox\" class=\"mini-checkbox-check\"><label for=\"" + $ + "\" onclick=\"return false;\">" + this.text + "</label>";
        this.OEss = this.el.firstChild;
        this.Azfv = this.el.lastChild
    },
    destroy: function($) {
        if (this.OEss) {
            this.OEss.onmouseup = null;
            this.OEss.onclick = null;
            this.OEss = null
        }
        DM_[_s][HFtw][If](this, $)
    },
    _initEvents: function() {
        Ehny(function() {
            $DT4(this.el, "click", this.V0, this);
            this.OEss.onmouseup = function() {
                return false
            };
            var $ = this;
            this.OEss.onclick = function() {
                if ($[Pa]()) return false
            }
        },
        this)
    },
    setName: function($) {
        this.name = $;
        mini.setAttr(this.OEss, "name", this.name)
    },
    setText: function($) {
        if (this.text !== $) {
            this.text = $;
            this.Azfv.innerHTML = $
        }
    },
    getText: function() {
        return this.text
    },
    setChecked: function($) {
        if ($ === true) $ = true;
        else if ($ == this.trueValue) $ = true;
        else if ($ == "true") $ = true;
        else if ($ === 1) $ = true;
        else if ($ == "Y") $ = true;
        else $ = false;
        if (this.checked !== $) {
            this.checked = !!$;
            this.OEss.checked = this.checked;
            this.value = this.getValue()
        }
    },
    getChecked: function() {
        return this.checked
    },
    setValue: function($) {
        if (this.checked != $) {
            this.setChecked($);
            this.value = this.getValue()
        }
    },
    getValue: function() {
        return String(this.checked == true ? this.trueValue: this.falseValue)
    },
    getFormValue: function() {
        return this.getValue()
    },
    setTrueValue: function($) {
        this.OEss.value = $;
        this.trueValue = $
    },
    getTrueValue: function() {
        return this.trueValue
    },
    setFalseValue: function($) {
        this.falseValue = $
    },
    getFalseValue: function() {
        return this.falseValue
    },
    V0: function($) {
        if (this[Pa]()) return;
        this.setChecked(!this.checked);
        this.fire("checkedchanged", {
            checked: this.checked
        });
        this.fire("valuechanged", {
            value: this.getValue()
        });
        this.fire("click", $, this)
    },
    getAttrs: function(A) {
        var D = DM_[_s][XNM][If](this, A),
        C = jQuery(A);
        D.text = A.innerHTML;
        mini[GRcU](A, D, ["text", "oncheckedchanged", "onclick"]);
        mini[MTh](A, D, ["enabled"]);
        var B = mini.getAttr(A, "checked");
        if (B) D.checked = (B == "true" || B == "checked") ? true: false;
        var _ = C.attr("trueValue");
        if (_) {
            D.trueValue = _;
            _ = parseInt(_);
            if (!isNaN(_)) D.trueValue = _
        }
        var $ = C.attr("falseValue");
        if ($) {
            D.falseValue = $;
            $ = parseInt($);
            if (!isNaN($)) D.falseValue = $
        }
        return D
    }
});
W4(DM_, "checkbox");
Ytb = function() {
    this.J3dN();
    Ytb[_s][FjoU][If](this);
    this[Ze]("mini-buttonedit")
};
WKkQ(Ytb, Cfuc, {
    name: "",
    formField: true,
    defaultValue: "",
    value: "",
    text: "",
    emptyText: "",
    maxLength: 1000,
    minLength: 0,
    width: 125,
    height: 21,
    allowInput: true,
    Cv1C: "mini-buttonedit-noInput",
    QAW: "mini-buttonedit-readOnly",
    GPa: "mini-buttonedit-disabled",
    LUl8: "mini-buttonedit-empty",
    E0Ps: "mini-buttonedit-focus",
    Tw0W: "mini-buttonedit-button-disabled",
    Hiv_: "mini-buttonedit-button",
    U3G: "mini-buttonedit-button-hover",
    Ia$: "mini-buttonedit-button-pressed",
    set: function($) {
        if (typeof $ == "string") return this;
        this.OTH = !($.enabled == false || $.allowInput == false || $[SXB]);
        Ytb[_s].set[If](this, $);
        if (this.OTH === false) {
            this.OTH = true;
            this[SbW]()
        }
        return this
    },
    uiCls: "mini-buttonedit",
    _create: function() {
        this.el = document.createElement("div");
        this.el.className = "mini-buttonedit";
        var $ = this.password ? "password": "text";
        this.el.innerHTML = "<div class=\"mini-buttonedit-inner\"><input type=\"" + $ + "\" class=\"mini-buttonedit-input\" autocomplete=\"off\"/></div><div class=\"mini-buttonedit-errorIcon\"></div><input name=\"" + this.name + "\" type=\"hidden\"/>";
        var A = this.el.getElementsByTagName("input");
        this.ZKL = A[0];
        this.JNZM = A[1];
        var _ = this.el.getElementsByTagName("div");
        this.Jy = _[0];
        this.Wa = _[1];
        this.ZKL.value = this.text;
        this.updateButtons();
        this[SbW]()
    },
    destroy: function($) {
        if (this.ZKL) {
            mini[_LP](this.ZKL);
            this.ZKL = null
        }
        Ytb[_s][HFtw][If](this, $)
    },
    _initEvents: function() {
        Ehny(function() {
            $DT4(this.el, "mousedown", this.U8z, this);
            $DT4(this.ZKL, "focus", this.TI, this);
            $DT4(this.ZKL, "change", this._E1, this)
        },
        this)
    },
    YBR: false,
    _sS: function() {
        if (this.YBR) return;
        this.YBR = true;
        $DT4(this.el, "click", this.ZmC, this);
        $DT4(this.ZKL, "blur", this.A4RG, this);
        $DT4(this.ZKL, "keydown", this.ALEU, this);
        $DT4(this.ZKL, "keyup", this.Nq$, this);
        $DT4(this.ZKL, "keypress", this.IX, this)
    },
    doUpdate: function() {
        if (this.OTH === false) return;
        if (this.enabled) this[DY](this.GPa);
        else this[Ze](this.GPa);
        if (this[Pa]() || this.allowInput == false) this.ZKL[SXB] = true;
        else this.ZKL[SXB] = false;
        if (this[Pa]()) this[Ze](this.QAW);
        else this[DY](this.QAW);
        if (this.allowInput) this[DY](this.Cv1C);
        else this[Ze](this.Cv1C);
        if (this.required) this[Ze](this.VAg);
        else this[DY](this.VAg)
    },
    doLayout: function() {
        if (!this.canLayout()) return;
        Ytb[_s][A6_][If](this);
        if (isIE6 || isIE7) {
            this.ZKL.style.display = "none";
            var $ = this.ZKL.parentNode,
            _ = ZmL($, true);
            this.ZKL.style.display = "";
            this.ZKL.style.width = (_ - 2 > 0 ? _ - 2 : 0) + "px"
        }
    },
    Yss: function() {},
    focus: function() {
        try {
            this.ZKL.focus();
            var $ = this;
            setTimeout(function() {
                if ($.N8T) $.ZKL.focus()
            },
            10)
        } catch(_) {}
    },
    blur: function() {
        try {
            this.ZKL.blur()
        } catch($) {}
    },
    selectText: function() {
        this.ZKL[Ju6]()
    },
    getTextEl: function() {
        return this.ZKL
    },
    setName: function($) {
        this.name = $;
        this.JNZM.name = $
    },
    setEmptyText: function($) {
        if ($ === null || $ === undefined) $ = "";
        this[V6FA] = $;
        this.Yss()
    },
    getEmptyText: function() {
        return this[V6FA]
    },
    setText: function($) {
        if ($ === null || $ === undefined) $ = "";
        var _ = this.text !== $;
        this.text = $;
        this.ZKL.value = $
    },
    getText: function() {
        var $ = this.ZKL.value;
        return $ != this[V6FA] ? $: ""
    },
    setValue: function($) {
        if ($ === null || $ === undefined) $ = "";
        var _ = this.value !== $;
        this.value = $;
        this.Yss()
    },
    getValue: function() {
        return this.value
    },
    getFormValue: function() {
        value = this.value;
        if (value === null || value === undefined) value = "";
        return String(value)
    },
    setMaxLength: function($) {
        $ = parseInt($);
        if (isNaN($)) return;
        this.maxLength = $;
        this.ZKL.maxLength = $
    },
    getMaxLength: function() {
        return this.maxLength
    },
    setMinLength: function($) {
        $ = parseInt($);
        if (isNaN($)) return;
        this.minLength = $
    },
    getMinLength: function() {
        return this.minLength
    },
    setAllowInput: function($) {
        this.allowInput = $;
        this[SbW]()
    },
    getAllowInput: function() {
        return this.allowInput
    },
    setReadOnly: function($) {
        this[SXB] = $;
        this[SbW]()
    },
    setEnabled: function($) {
        if (this.enabled != $) {
            this.enabled = $;
            this[SbW]()
        }
    },
    createButton: function(_) {
        var $ = mini.copyTo({
            name: "",
            cls: "",
            style: "",
            iconCls: "",
            iconStyle: "",
            position: "right",
            visible: true,
            enabled: true,
            html: ""
        },
        _);
        if ($.type == "spin") $.html = "<div class=\"mini-buttonedit-spin\"><div id=\"up\" class=\"mini-buttonedit-up\"><span></span></div><div class=\"mini-buttonedit-spinSplit\"></div><div class=\"mini-buttonedit-down\"><span></span></div></div>";
        return $
    },
    addButton: function(_, $) {
        if (typeof _ == "string") _ = {
            iconCls: _
        };
        _ = this.createButton(_);
        if (typeof $ != "number") $ = this.buttons.length;
        this.buttons.insert($, _);
        this.updateButtons()
    },
    removeButton: function($) {
        var _ = this.getButton($);
        if (!_) return;
        this.buttons.remove(_);
        this.updateButtons()
    },
    updateButton: function($, A) {
        var _ = this.getButton($);
        if (!_) return;
        mini.copyTo(_, A);
        this.updateButtons()
    },
    getButtonEl: function(A) {
        var E = this.getButton(A);
        if (!E) return;
        var _ = this.Jy.firstChild,
        C = _.rows[0].cells;
        for (var B = 0,
        D = C.length; B < D; B++) {
            var $ = C[B];
            if ($.id == A) return $
        }
    },
    getButton: function($) {
        if (typeof $ == "number") return this.buttons[$];
        else for (var _ = 0,
        A = this.buttons.length; _ < A; _++) {
            var B = this.buttons[_];
            if (B.name == $) return B
        }
    },
    Zbw: 1,
    updateButtons: function() {
        var I = "<table class=\"mini-buttonedit-border\" cellpadding=\"0\" cellspacing=\"" + this.Zbw + "\"><tr>",
        C = "",
        A = "",
        _ = 0;
        for (var $ = 0,
        F = this.buttons.length; $ < F; $++) {
            var H = this.buttons[$];
            if (!H.visible) continue;
            var E = H.cls || "";
            if (H.enabled == false) E += " " + this.Tw0W;
            var B = "onmouseover=\"F7y(this,'" + this.U3G + "');\" " + "onmouseout=\"Lq(this,'" + this.U3G + "');\"";
            if (!H.enabled) B = "";
            var G = "<td " + B + " id=\"" + $ + "\" class=\"mini-buttonedit-button " + E + "\"  style=\"" + H.style + "\">";
            if (H.html) G += H.html;
            else G += "<div class=\"mini-buttonedit-icon " + H.iconCls + "\" style=\"" + H[Wt3] + "\"></div>";
            G += "</td>";
            if (H.position == "left") {
                _++;
                C += G
            } else A += G
        }
        I += C + "<td class=\"mini-buttonedit-inputWrap\"></td>" + A;
        I += "</tr></table>";
        this.ZKL.parentNode.removeChild(this.ZKL);
        this.Jy.innerHTML = I;
        var D = this.el.getElementsByTagName("td");
        D[_].appendChild(this.ZKL)
    },
    J3dN: function() {
        this.buttons = [];
        var $ = this.createButton();
        this.buttons.push($)
    },
    CMt: "mini-buttonedit-error",
    BfU: "mini-buttonedit-invalid",
    MOuF: function(_) {
        var $ = O21(_.target, this.Hiv_);
        if ($) return this.getButton(parseInt($.id));
        return null
    },
    ZmC: function(_) {
        if (this[Pa]()) return;
        if (!YCJ(this.ZKL, _.target)) {
            var $ = this.MOuF(_);
            if ($ && $.enabled) this.Zm7($, _)
        } else this.ZKL.focus()
    },
    U8z: function(D) {
        if (this[Pa]()) return;
        if (!YCJ(this.ZKL, D.target)) {
            var $ = this;
            setTimeout(function() {
                $.focus();
                mini.selectRange($.ZKL, 1000, 1000)
            },
            1);
            var B = this.MOuF(D),
            _ = O21(D.target, this.Hiv_);
            if (B && B.enabled) {
                if (B.type == "spin") {
                    var A = O21(D.target, "mini-buttonedit-up"),
                    C = O21(D.target, "mini-buttonedit-down");
                    if (A) {
                        F7y(A, this.Ia$);
                        this.NjJ(B, D, "up")
                    } else if (C) {
                        F7y(C, this.Ia$);
                        this.NjJ(B, D, "down")
                    }
                } else {
                    F7y(_, this.Ia$);
                    this.NjJ(B, D)
                }
                $DT4(document, "mouseup", this.P9K, this)
            }
        }
    },
    P9K: function(A) {
        var _ = this.Jy.firstChild.rows[0].cells,
        $ = this;
        setTimeout(function() {
            for (var B = 0,
            C = _.length; B < C; B++) {
                var A = _[B];
                Lq(A, $.Ia$);
                var D = $.getButton(parseInt(A.id));
                if (D && D.type == "spin") {
                    Lq(A.firstChild.firstChild, $.Ia$);
                    Lq(A.firstChild.lastChild, $.Ia$)
                }
            }
            Lq($.el, $.Bt5)
        },
        80);
        EWw(document, "mouseup", this.P9K, this)
    },
    TI: function($) {
        this[SbW]();
        this._sS();
        if (this[Pa]()) return;
        this.N8T = true;
        this[Ze](this.E0Ps)
    },
    A4RG: function(_) {
        this.N8T = false;
        var $ = this;
        setTimeout(function() {
            if ($.N8T == false) $[DY]($.E0Ps)
        },
        2)
    },
    ALEU: function(_) {
        this.fire("keydown", {
            htmlEvent: _
        });
        if (_.keyCode == 8 && (this[Pa]() || this.allowInput == false)) return false;
        if (_.keyCode == 13) {
            var $ = this;
            if (isIE9) $._E1(null);
            $.fire("enter")
        }
    },
    _E1: function() {},
    Nq$: function($) {
        this.fire("keyup", {
            htmlEvent: $
        })
    },
    IX: function($) {
        this.fire("keypress", {
            htmlEvent: $
        })
    },
    Zm7: function(_, $) {
        var A = {
            htmlEvent: $,
            button: _,
            index: this.buttons.indexOf(_),
            name: _.name,
            cancel: false
        };
        this.fire("beforebuttonclick", A);
        if (A.cancel == true) return;
        this.fire("buttonclick", A)
    },
    NjJ: function(A, _, $) {
        this.focus();
        this[Ze](this.E0Ps);
        this.fire("buttonmousedown", {
            htmlEvent: _,
            button: A,
            index: this.buttons.indexOf(A),
            name: A.name,
            spinType: $
        })
    },
    onButtonClick: function(_, $) {
        this.on("buttonclick", _, $)
    },
    onButtonMouseDown: function(_, $) {
        this.on("buttonmousedown", _, $)
    },
    onTextChanged: function(_, $) {
        this.on("textchanged", _, $)
    },
    getAttrs: function($) {
        var A = Ytb[_s][XNM][If](this, $),
        _ = jQuery($);
        mini[GRcU]($, A, ["value", "text", "onenter", "onkeydown", "onkeyup", "onkeypress", "onbuttonclick", "onbuttonmousedown", "ontextchanged"]);
        mini[MTh]($, A, ["allowInput"]);
        mini[Ova]($, A, ["maxLength", "minLength"]);
        return A
    }
});
W4(Ytb, "buttonedit");
J76 = function() {
    J76[_s][FjoU][If](this)
};
WKkQ(J76, Cfuc, {
    name: "",
    formField: true,
    minHeight: 15,
    emptyText: "",
    text: "",
    value: "",
    defaultValue: "",
    width: 125,
    height: 21,
    LUl8: "mini-textbox-empty",
    E0Ps: "mini-textbox-focus",
    GPa: "mini-textbox-disabled",
    uiCls: "mini-textbox",
    Esv: "text",
    _create: function() {
        var $ = "<input type=\"" + this.Esv + "\" class=\"mini-textbox-input\" autocomplete=\"off\"/>";
        if (this.Esv == "textarea") $ = "<textarea class=\"mini-textbox-input\" autocomplete=\"off\"/></textarea>";
        $ += "<input type=\"hidden\"/>";
        this.el = document.createElement("span");
        this.el.className = "mini-textbox";
        this.el.innerHTML = $;
        this.ZKL = this.el.firstChild;
        this.JNZM = this.el.lastChild
    },
    doLayout: function() {
        if (!this.canLayout()) return;
        var $ = ZmL(this.el);
        if (this.Wa) $ -= 18;
        if (isIE7 || isIE6) $ -= 4;
        if (this.el.style.width == "100%") $ -= 1;
        this.ZKL.style.width = $ + "px";
        var _ = YiC_(this.el);
        if (isIE7 || isIE6) _ -= 2;
        this.ZKL.style.height = _ + "px"
    },
    destroy: function($) {
        if (this.ZKL) {
            mini[_LP](this.ZKL);
            this.ZKL = null
        }
        if (this.JNZM) {
            mini[_LP](this.JNZM);
            this.JNZM = null
        }
        J76[_s][HFtw][If](this, $)
    },
    _initEvents: function() {
        $DT4(this.ZKL, "change", this._E1, this);
        $DT4(this.ZKL, "focus", this.TI, this);
        Ehny(function() {
            $DT4(this.el, "mousedown", this.U8z, this)
        },
        this);
        this.on("validation", this.M47, this);
        $DT4(this.ZKL, "drop", this.__OnDropText, this)
    },
    YBR: false,
    _sS: function() {
        if (this.YBR) return;
        this.YBR = true;
        $DT4(this.ZKL, "blur", this.A4RG, this);
        $DT4(this.ZKL, "keydown", this.ALEU, this);
        $DT4(this.ZKL, "keyup", this.Nq$, this);
        $DT4(this.ZKL, "keypress", this.IX, this)
    },
    setName: function($) {
        if (this.name != $) {
            this.name = $;
            this.JNZM.name = $
        }
    },
    setValue: function($) {
        if ($ === null || $ === undefined) $ = "";
        $ = String($);
        if (this.value !== $) {
            this.value = $;
            this.JNZM.value = this.ZKL.value = $;
            this.Yss()
        }
    },
    getValue: function() {
        return this.value
    },
    getFormValue: function() {
        value = this.value;
        if (value === null || value === undefined) value = "";
        return String(value)
    },
    setAllowInput: function($) {
        if (this.allowInput != $) {
            this.allowInput = $;
            this[SbW]()
        }
    },
    getAllowInput: function() {
        return this.allowInput
    },
    Yss: function() {
        if (this.value == "" && this[V6FA]) {
            this.ZKL.value = this[V6FA];
            F7y(this.el, this.LUl8)
        } else Lq(this.el, this.LUl8)
    },
    setEmptyText: function($) {
        if (this[V6FA] != $) {
            this[V6FA] = $;
            this.Yss()
        }
    },
    getEmptyText: function() {
        return this[V6FA]
    },
    setReadOnly: function($) {
        if (this[SXB] != $) {
            this[SXB] = $;
            this[SbW]()
        }
    },
    setEnabled: function($) {
        if (this.enabled != $) {
            this.enabled = $;
            this[SbW]()
        }
    },
    doUpdate: function() {
        if (this.enabled) this[DY](this.GPa);
        else this[Ze](this.GPa);
        if (this[Pa]() || this.allowInput == false) this.ZKL[SXB] = true;
        else this.ZKL[SXB] = false;
        if (this.required) this[Ze](this.VAg);
        else this[DY](this.VAg)
    },
    focus: function() {
        try {
            this.ZKL.focus()
        } catch($) {}
    },
    blur: function() {
        try {
            this.ZKL.blur()
        } catch($) {}
    },
    selectText: function() {
        this.ZKL[Ju6]()
    },
    errorIconEl: null,
    getErrorIconEl: function() {
        if (!this.Wa) this.Wa = mini.append(this.el, "<span class=\"mini-errorIcon\"></span>");
        return this.Wa
    },
    _Rr: function() {
        if (this.Wa) {
            var $ = this.Wa;
            jQuery($).remove()
        }
        this.Wa = null
    },
    U8z: function(_) {
        var $ = this;
        if (!YCJ(this.ZKL, _.target)) setTimeout(function() {
            $.focus();
            mini.selectRange($.ZKL, 1000, 1000)
        },
        1);
        else this.ZKL.focus()
    },
    _E1: function(_) {
        var $ = this.value;
        this[XFB](this.ZKL.value);
        if ($ !== this.getValue()) this.Dkw()
    },
    __OnDropText: function(_) {
        var $ = this;
        setTimeout(function() {
            $._E1(_)
        },
        0)
    },
    ALEU: function(_) {
        this.fire("keydown", {
            htmlEvent: _
        });
        if (_.keyCode == 8 && (this[Pa]() || this.allowInput == false)) return false;
        if (_.keyCode == 13) {
            var $ = this;
            setTimeout(function() {
                if (isIE9) $._E1(null);
                $.fire("enter")
            },
            10)
        }
        if (_.keyCode == 13 && this.Esv == "textarea") if (_.ctrlKey == false) _.stopPropagation();
        else this._E1()
    },
    Nq$: function($) {
        this.fire("keyup", {
            htmlEvent: $
        })
    },
    IX: function($) {
        this.fire("keypress", {
            htmlEvent: $
        })
    },
    TI: function($) {
        this[SbW]();
        if (this[Pa]()) return;
        this.N8T = true;
        this[Ze](this.E0Ps);
        this._sS();
        Lq(this.el, this.LUl8);
        if (this[V6FA] && this.ZKL.value == this[V6FA]) {
            this.ZKL.value = "";
            this.ZKL[Ju6]()
        }
    },
    A4RG: function(_) {
        this.N8T = false;
        var $ = this;
        setTimeout(function() {
            if ($.N8T == false) $[DY]($.E0Ps)
        },
        2);
        if (this[V6FA] && this.ZKL.value == "") {
            this.ZKL.value = this[V6FA];
            F7y(this.el, this.LUl8)
        }
    },
    getAttrs: function($) {
        var A = J76[_s][XNM][If](this, $),
        _ = jQuery($);
        mini[GRcU]($, A, ["value", "text", "emptyText", "onenter", "onkeydown", "onkeyup", "onkeypress", "maxLengthErrorText", "minLengthErrorText", "vtype", "emailErrorText", "urlErrorText", "floatErrorText", "intErrorText", "dateErrorText", "minErrorText", "maxErrorText", "rangeLengthErrorText", "rangeErrorText", "rangeCharErrorText"]);
        mini[MTh]($, A, ["allowInput"]);
        mini[Ova]($, A, ["maxLength", "minLength", "minHeight"]);
        return A
    },
    vtype: "",
    emailErrorText: "Please enter a valid email address.",
    urlErrorText: "Please enter a valid URL.",
    floatErrorText: "Please enter a valid number.",
    intErrorText: "Please enter only digits",
    dateErrorText: "Please enter a valid date. Date format is {0}",
    maxLengthErrorText: "Please enter no more than {0} characters.",
    minLengthErrorText: "Please enter at least {0} characters.",
    maxErrorText: "Please enter a value less than or equal to {0}.",
    minErrorText: "Please enter a value greater than or equal to {0}.",
    rangeLengthErrorText: "Please enter a value between {0} and {1} characters long.",
    rangeCharErrorText: "Please enter a value between {0} and {1} characters long.",
    rangeErrorText: "Please enter a value between {0} and {1}.",
    M47: function(H) {
        if (H.isValid == false) return;
        var _ = this.vtype.split(";");
        for (var $ = 0,
        F = _.length; $ < F; $++) {
            var B = _[$].trim(),
            E = B.split(":"),
            C = E[0],
            A = E[1];
            if (A) A = A.split(",");
            else A = [];
            var G = this["__" + C];
            if (G) {
                var D = G(H.value, A);
                if (D !== true) {
                    H.isValid = false;
                    H.errorText = this[E[0] + "ErrorText"] || "";
                    H.errorText = String.format(H.errorText, A[0], A[1], A[2], A[3], A[4]);
                    break
                }
            }
        }
    },
    __email: function(_, $) {
        if (_.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) return true;
        else return false
    },
    __url: function(A, $) {
        function _(_) {
            _ = _.toLowerCase();
            var $ = "^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-z_!~*'().&=+$%-]+:)?[0-9a-z_!~*'().&=+$%-]+@)?" + "(([0-9]{1,3}.){3}[0-9]{1,3}" + "|" + "([0-9a-z_!~*'()-]+.)*" + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." + "[a-z]{2,6})" + "(:[0-9]{1,4})?" + "((/?)|" + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$",
            A = new RegExp($);
            if (A.test(_)) return (true);
            else return (false)
        }
        return _(A)
    },
    __int: function(A, $) {
        var _ = parseInt(A);
        if (isNaN(_)) return false;
        return typeof _ == "number" && String(A) == String(_)
    },
    __float: function(A, $) {
        var _ = parseFloat(A);
        if (isNaN(_)) return false;
        return typeof _ == "number" && String(A) == String(_)
    },
    __date: function(B, _) {
        if (!B) return false;
        var $ = null,
        A = _[0];
        if (A) {
            $ = mini.parseDate(B, A);
            if ($ && $.getFullYear) if (mini.formatDate($, A) == B) return true
        } else {
            $ = mini.parseDate(B, "yyyy-MM-dd");
            if (!$) $ = mini.parseDate(B, "yyyy/MM/dd");
            if (!$) $ = mini.parseDate(B, "MM/dd/yyyy");
            if ($ && $.getFullYear) return true
        }
        return false
    },
    __maxLength: function(A, $) {
        var _ = parseInt($);
        if (!A || isNaN(_)) return true;
        if (A.length <= _) return true;
        else return false
    },
    __minLength: function(A, $) {
        var _ = parseInt($);
        if (isNaN(_)) return true;
        if (A.length >= _) return true;
        else return false
    },
    __rangeLength: function(B, _) {
        if (!B) return false;
        var $ = parseFloat(_[0]),
        A = parseFloat(_[1]);
        if (isNaN($) || isNaN(A)) return true;
        if ($ <= B.length && B.length <= A) return true;
        return false
    },
    __rangeChar: function(G, B) {
        if (!G) return false;
        var A = parseFloat(B[0]),
        E = parseFloat(B[1]);
        if (isNaN(A) || isNaN(E)) return true;
        function C(_) {
            var $ = new RegExp("^[\u4e00-\u9fa5]+$");
            if ($.test(_)) return true;
            return false
        }
        var $ = 0,
        F = String(G).split("");
        for (var _ = 0,
        D = F.length; _ < D; _++) if (C(F[_])) $ += 2;
        else $ += 1;
        if (A <= $ && $ <= E) return true;
        return false
    },
    __range: function(B, _) {
        B = parseFloat(B);
        if (isNaN(B)) return false;
        var $ = parseFloat(_[0]),
        A = parseFloat(_[1]);
        if (isNaN($) || isNaN(A)) return true;
        if ($ <= B && B <= A) return true;
        return false
    },
    setVtype: function($) {
        this.vtype = $
    },
    getVtype: function() {
        return this.vtype
    },
    setEmailErrorText: function($) {
        this.emailErrorText = $
    },
    getEmailErrorText: function() {
        return this.emailErrorText
    },
    setUrlErrorText: function($) {
        this.urlErrorText = $
    },
    getUrlErrorText: function() {
        return this.urlErrorText
    },
    setFloatErrorText: function($) {
        this.floatErrorText = $
    },
    getFloatErrorText: function() {
        return this.floatErrorText
    },
    setIntErrorText: function($) {
        this.intErrorText = $
    },
    getIntErrorText: function() {
        return this.intErrorText
    },
    setDateErrorText: function($) {
        this.dateErrorText = $
    },
    getDateErrorText: function() {
        return this.dateErrorText
    },
    setMaxLengthErrorText: function($) {
        this.maxLengthErrorText = $
    },
    getMaxLengthErrorText: function() {
        return this.maxLengthErrorText
    },
    setMinLengthErrorText: function($) {
        this.minLengthErrorText = $
    },
    getMinLengthErrorText: function() {
        return this.minLengthErrorText
    },
    setMaxErrorText: function($) {
        this.maxErrorText = $
    },
    getMaxErrorText: function() {
        return this.maxErrorText
    },
    setMinErrorText: function($) {
        this.minErrorText = $
    },
    getMinErrorText: function() {
        return this.minErrorText
    },
    setRangeLengthErrorText: function($) {
        this.rangeLengthErrorText = $
    },
    getRangeLengthErrorText: function() {
        return this.rangeLengthErrorText
    },
    setRangeCharErrorText: function($) {
        this.rangeCharErrorText = $
    },
    getRangeCharErrorText: function() {
        return this.rangeCharErrorText
    },
    setRangeErrorText: function($) {
        this.rangeErrorText = $
    },
    getRangeErrorText: function() {
        return this.rangeErrorText
    }
});
W4(J76, "textbox");
SR = function() {
    SR[_s][FjoU][If](this)
};
WKkQ(SR, J76, {
    uiCls: "mini-password",
    Esv: "password"
});
W4(SR, "password");
NQ8 = function() {
    NQ8[_s][FjoU][If](this)
};
WKkQ(NQ8, J76, {
    maxLength: 1000000,
    width: 180,
    height: 50,
    minHeight: 50,
    Esv: "textarea",
    uiCls: "mini-textarea"
});
W4(NQ8, "textarea");
Wu6k = function() {
    Wu6k[_s][FjoU][If](this);
    this.IS()
};
WKkQ(Wu6k, Ytb, {
    uiCls: "mini-popupedit",
    popup: null,
    popupCls: "mini-buttonedit-popup",
    _hoverCls: "mini-buttonedit-hover",
    Bt5: "mini-buttonedit-pressed",
    destroy: function($) {
        if (this.isShowPopup()) this[AXKv]();
        if (this.popup) {
            this.popup[HFtw]();
            this.popup = null
        }
        Wu6k[_s][HFtw][If](this, $)
    },
    _initEvents: function() {
        Wu6k[_s][UUs][If](this);
        Ehny(function() {
            $DT4(this.el, "mouseover", this.F1, this);
            $DT4(this.el, "mouseout", this.FmPu, this);
            this.on("buttonclick", this.T0gi, this)
        },
        this)
    },
    J3dN: function() {
        this.buttons = [];
        var $ = this.createButton({
            cls: "mini-buttonedit-popup",
            iconCls: "mini-buttonedit-icons-popup",
            name: "popup"
        });
        this.buttons.push($)
    },
    F1: function($) {
        if (this[Pa]() || this.allowInput) return;
        if (O21($.target, "mini-buttonedit-border")) this[Ze](this._hoverCls)
    },
    FmPu: function($) {
        if (this[Pa]() || this.allowInput) return;
        this[DY](this._hoverCls)
    },
    U8z: function($) {
        if (this[Pa]()) return;
        Wu6k[_s].U8z[If](this, $);
        if (this.allowInput == false && O21($.target, "mini-buttonedit-border")) {
            F7y(this.el, this.Bt5);
            $DT4(document, "mouseup", this.P9K, this)
        }
    },
    ALEU: function($) {
        this.fire("keydown", {
            htmlEvent: $
        });
        if ($.keyCode == 8 && (this[Pa]() || this.allowInput == false)) return false;
        if ($.keyCode == 9) {
            this[AXKv]();
            return
        }
        if ($.keyCode == 27) {
            this[AXKv]();
            return
        }
        if ($.keyCode == 13) this.fire("enter");
        if (this.isShowPopup()) if ($.keyCode == 13 || $.keyCode == 27) $.stopPropagation()
    },
    within: function($) {
        if (YCJ(this.el, $.target)) return true;
        if (this.popup[ZZJ]($)) return true;
        return false
    },
    popupWidth: "100%",
    popupMinWidth: 50,
    popupMaxWidth: 2000,
    popupHeight: "",
    popupMinHeight: 30,
    popupMaxHeight: 2000,
    setPopup: function($) {
        if (typeof $ == "string") {
            mini.parse($);
            $ = mini.get($)
        }
        var _ = mini.getAndCreate($);
        if (!_) return;
        _[NXq](true);
        _[NF](this.popup._contentEl);
        _.owner = this;
        _.on("beforebuttonclick", this.PSJ0, this)
    },
    getPopup: function() {
        if (!this.popup) this.IS();
        return this.popup
    },
    IS: function() {
        this.popup = new Z7();
        this.popup.setShowAction("none");
        this.popup.setHideAction("outerclick");
        this.popup.setPopupEl(this.el);
        this.popup.on("BeforeClose", this.H2lZ, this)
    },
    H2lZ: function($) {
        if (this[ZZJ]($.htmlEvent)) $.cancel = true
    },
    showPopup: function() {
        var _ = this.getPopup(),
        B = this.getBox(),
        $ = this.popupWidth;
        if (this[GVSp] == "100%") $ = B.width;
        _[Id]($);
        var A = parseInt(this[IQ]);
        if (!isNaN(A)) _[ORwC](A);
        else _[ORwC]("auto");
        _.setMinWidth(this[W_s]);
        _.setMinHeight(this[VQb]);
        _.setMaxWidth(this[Hy2]);
        _.setMaxHeight(this[UTyy]);
        _.showAtEl(this.el, {
            hAlign: "left",
            vAlign: "below",
            outVAlign: "above",
            outHAlign: "right",
            popupCls: this.popupCls
        });
        _.on("Close", this.K$Xi, this);
        this.fire("showpopup")
    },
    K$Xi: function($) {
        this.fire("hidepopup")
    },
    hidePopup: function() {
        var $ = this.getPopup();
        $.close()
    },
    isShowPopup: function() {
        if (this.popup && this.popup.visible) return true;
        else return false
    },
    setPopupWidth: function($) {
        this[GVSp] = $
    },
    setPopupMaxWidth: function($) {
        this[Hy2] = $
    },
    setPopupMinWidth: function($) {
        this[W_s] = $
    },
    getPopupWidth: function($) {
        return this[GVSp]
    },
    getPopupMaxWidth: function($) {
        return this[Hy2]
    },
    getPopupMinWidth: function($) {
        return this[W_s]
    },
    setPopupHeight: function($) {
        this[IQ] = $
    },
    setPopupMaxHeight: function($) {
        this[UTyy] = $
    },
    setPopupMinHeight: function($) {
        this[VQb] = $
    },
    getPopupHeight: function($) {
        return this[IQ]
    },
    getPopupMaxHeight: function($) {
        return this[UTyy]
    },
    getPopupMinHeight: function($) {
        return this[VQb]
    },
    ZmC: function(A) {
        if (this[Pa]()) return;
        if (!YCJ(this.ZKL, A.target)) {
            var _ = this.MOuF(A);
            if (_ && _.enabled) {
                this.Zm7(_, A);
                return
            }
        }
        if (!this.allowInput && O21(A.target, "mini-buttonedit-border")) if (this.isShowPopup()) this[AXKv]();
        else {
            var $ = this;
            setTimeout(function() {
                $[Pyu]()
            },
            1)
        }
    },
    T0gi: function(_) {
        if (_.name == "popup") if (this.isShowPopup()) this[AXKv]();
        else {
            var $ = this;
            setTimeout(function() {
                $[Pyu]()
            },
            1)
        }
    },
    PSJ0: function($) {
        if ($.name == "close") this[AXKv]();
        $.cancel = true
    },
    getAttrs: function($) {
        var _ = Wu6k[_s][XNM][If](this, $);
        mini[GRcU]($, _, ["popupWidth", "popupHeight", "popup", "onshowpopup", "onhidepopup"]);
        mini[Ova]($, _, ["popupMinWidth", "popupMaxWidth", "popupMinHeight", "popupMaxHeight"]);
        return _
    }
});
W4(Wu6k, "popupedit");
MrgM = function() {
    this.data = [];
    this.columns = [];
    MrgM[_s][FjoU][If](this)
};
WKkQ(MrgM, Wu6k, {
    text: "",
    value: "",
    valueField: "id",
    textField: "text",
    delimiter: ",",
    multiSelect: false,
    data: [],
    url: "",
    columns: [],
    allowInput: false,
    popupMaxHeight: 200,
    set: function(A) {
        if (typeof A == "string") return this;
        var $ = A.value;
        delete A.value;
        var B = A.url;
        delete A.url;
        var _ = A.data;
        delete A.data;
        MrgM[_s].set[If](this, A);
        if (!mini.isNull(_)) {
            this[_CY](_);
            A.data = _
        }
        if (!mini.isNull(B)) {
            this.setUrl(B);
            A.url = B
        }
        if (!mini.isNull($)) {
            this[XFB]($);
            A.value = $
        }
        return this
    },
    uiCls: "mini-combobox",
    IS: function() {
        MrgM[_s].IS[If](this);
        this.UqD_ = new ZcsR();
        this.UqD_.setBorderStyle("border:0;");
        this.UqD_.setStyle("width:100%;height:auto;");
        this.UqD_[NF](this.popup._contentEl);
        this.UqD_.on("itemclick", this._t5H, this)
    },
    showPopup: function() {
        this.UqD_[ORwC]("auto");
        MrgM[_s][Pyu][If](this);
        var $ = this.popup.el.style.height;
        if ($ == "" || $ == "auto") this.UqD_[ORwC]("auto");
        else this.UqD_[ORwC]("100%");
        this.UqD_[XFB](this.value)
    },
    getItem: function($) {
        return typeof $ == "object" ? $: this.data[$]
    },
    indexOf: function($) {
        return this.data.indexOf($)
    },
    getAt: function($) {
        return this.data[$]
    },
    load: function($) {
        if (typeof $ == "string") this.setUrl($);
        else this[_CY]($)
    },
    setData: function(data) {
        if (typeof data == "string") data = eval("(" + data + ")");
        if (!mini.isArray(data)) data = [];
        this.UqD_[_CY](data);
        this.data = this.UqD_.data;
        var vts = this.UqD_.SmZ(this.value);
        this.ZKL.value = vts[1]
    },
    getData: function() {
        return this.data
    },
    setUrl: function(_) {
        this.getPopup();
        this.UqD_.setUrl(_);
        this.url = this.UqD_.url;
        this.data = this.UqD_.data;
        var $ = this.UqD_.SmZ(this.value);
        this.ZKL.value = $[1]
    },
    getUrl: function() {
        return this.url
    },
    setValueField: function($) {
        this[SY0C] = $;
        if (this.UqD_) this.UqD_[YZU]($)
    },
    getValueField: function() {
        return this[SY0C]
    },
    setTextField: function($) {
        if (this.UqD_) this.UqD_.setTextField($);
        this[XND] = $
    },
    getTextField: function() {
        return this[XND]
    },
    setDisplayField: function($) {
        this.setTextField($)
    },
    setValue: function($) {
        if (this.value !== $) {
            var _ = this.UqD_.SmZ($);
            this.value = $;
            this.JNZM.value = this.value;
            this.ZKL.value = _[1]
        } else {
            _ = this.UqD_.SmZ($);
            this.ZKL.value = _[1]
        }
    },
    setMultiSelect: function($) {
        if (this[MWVQ] != $) {
            this[MWVQ] = $;
            if (this.UqD_) {
                this.UqD_.setMultiSelect($);
                this.UqD_.setShowCheckBox($)
            }
        }
    },
    getMultiSelect: function() {
        return this[MWVQ]
    },
    setColumns: function($) {
        if (!mini.isArray($)) $ = [];
        this.columns = $;
        this.UqD_[F4b]($)
    },
    getColumns: function() {
        return this.columns
    },
    showNullItem: false,
    setShowNullItem: function($) {
        if (this.showNullItem != $) {
            this.showNullItem = $;
            this.UqD_.setShowNullItem($)
        }
    },
    getShowNullItem: function() {
        return this.showNullItem
    },
    Dkw: function() {
        if (this.validateOnChanged) this[NGT6]();
        var $ = this.getValue(),
        B = this.getSelecteds(),
        _ = B[0],
        A = this;
        A.fire("valuechanged", {
            value: $,
            selecteds: B,
            selected: _
        })
    },
    getSelecteds: function() {
        return this.UqD_.findItems(this.value)
    },
    getSelected: function() {
        return this.getSelecteds()[0]
    },
    _t5H: function(C) {
        var B = this.UqD_.getValue(),
        A = this.UqD_.SmZ(B),
        $ = this.getValue();
        this[XFB](B);
        this[Woc](A[1]);
        if ($ != this.getValue()) {
            var _ = this;
            setTimeout(function() {
                _.Dkw()
            },
            1)
        }
        if (!this[MWVQ]) this[AXKv]();
        this.focus()
    },
    ALEU: function(B) {
        this.fire("keydown", {
            htmlEvent: B
        });
        if (B.keyCode == 8 && (this[Pa]() || this.allowInput == false)) return false;
        if (B.keyCode == 9) {
            this[AXKv]();
            return
        }
        switch (B.keyCode) {
        case 27:
            if (this.isShowPopup()) B.stopPropagation();
            this[AXKv]();
            break;
        case 13:
            if (this.isShowPopup()) {
                B.preventDefault();
                B.stopPropagation();
                var _ = this.UqD_.getFocusedIndex();
                if (_ != -1) {
                    var $ = this.UqD_.getAt(_),
                    A = this.UqD_.SmZ([$]);
                    this[XFB](A[0]);
                    this[Woc](A[1]);
                    this.Dkw();
                    this[AXKv]()
                }
            } else this.fire("enter");
            break;
        case 37:
            break;
        case 38:
            _ = this.UqD_.getFocusedIndex();
            if (_ == -1) {
                _ = 0;
                if (!this[MWVQ]) {
                    $ = this.UqD_.findItems(this.value)[0];
                    if ($) _ = this.UqD_.indexOf($)
                }
            }
            if (this.isShowPopup()) if (!this[MWVQ]) {
                _ -= 1;
                if (_ < 0) _ = 0;
                this.UqD_.IRSK(_, true)
            }
            break;
        case 39:
            break;
        case 40:
            _ = this.UqD_.getFocusedIndex();
            if (_ == -1) {
                _ = 0;
                if (!this[MWVQ]) {
                    $ = this.UqD_.findItems(this.value)[0];
                    if ($) _ = this.UqD_.indexOf($)
                }
            }
            if (this.isShowPopup()) {
                if (!this[MWVQ]) {
                    _ += 1;
                    if (_ > this.UqD_.getCount() - 1) _ = this.UqD_.getCount() - 1;
                    this.UqD_.IRSK(_, true)
                }
            } else {
                this[Pyu]();
                if (!this[MWVQ]) this.UqD_.IRSK(_, true)
            }
            break;
        default:
            this.EBRc(this.ZKL.value);
            break
        }
    },
    Nq$: function($) {
        this.fire("keyup", {
            htmlEvent: $
        })
    },
    IX: function($) {
        this.fire("keypress", {
            htmlEvent: $
        })
    },
    EBRc: function(_) {
        var $ = this;
        setTimeout(function() {
            var A = $.ZKL.value;
            if (A != _) $.WuW(A)
        },
        10)
    },
    WuW: function(A) {
        var _ = [];
        for (var B = 0,
        D = this.data.length; B < D; B++) {
            var $ = this.data[B],
            C = $[this.textField];
            if (typeof C == "string") if (C.indexOf(A) != -1) _.push($)
        }
        this.UqD_[_CY](_);
        this._filtered = true;
        if (A !== "" || this.isShowPopup()) this[Pyu]()
    },
    hidePopup: function() {
        var $ = this.getPopup();
        $.close();
        if (this._filtered) {
            this._filtered = false;
            if (this.UqD_.el) this.UqD_[_CY](this.data)
        }
    },
    _E1: function($) {
        if (this[MWVQ]);
        else if (this.ZKL.value == "" && !this.value) {
            this[XFB]("");
            this.Dkw()
        }
    },
    getAttrs: function(G) {
        var E = MrgM[_s][XNM][If](this, G);
        mini[GRcU](G, E, ["url", "data", "textField", "valueField", "displayField"]);
        mini[MTh](G, E, ["multiSelect", "showNullItem"]);
        if (E.displayField) E[XND] = E.displayField;
        var C = E[SY0C] || this[SY0C],
        H = E[XND] || this[XND];
        if (G.nodeName.toLowerCase() == "select") {
            var I = [];
            for (var F = 0,
            D = G.length; F < D; F++) {
                var $ = G.options[F],
                _ = {};
                _[H] = $.text;
                _[C] = $.value;
                I.push(_)
            }
            if (I.length > 0) E.data = I
        } else {
            var J = mini[OJy](G);
            for (F = 0, D = J.length; F < D; F++) {
                var A = J[F],
                B = jQuery(A).attr("property");
                if (!B) continue;
                B = B.toLowerCase();
                if (B == "columns") E.columns = mini._ParseColumns(A);
                else if (B == "data") E.data = A.innerHTML
            }
        }
        return E
    }
});
W4(MrgM, "combobox");
KC1e = function() {
    KC1e[_s][FjoU][If](this)
};
WKkQ(KC1e, Wu6k, {
    format: "yyyy-MM-dd",
    popupWidth: "",
    viewDate: new Date(),
    showTime: false,
    timeFormat: "H:mm",
    showTodayButton: true,
    showClearButton: true,
    uiCls: "mini-datepicker",
    _getCalendar: function() {
        if (!KC1e._Calendar) {
            var $ = KC1e._Calendar = new I8U();
            $.setStyle("border:0;")
        }
        return KC1e._Calendar
    },
    IS: function() {
        KC1e[_s].IS[If](this);
        this.F6B = this._getCalendar()
    },
    showPopup: function() {
        this.F6B.beginUpdate();
        this.F6B[NF](this.popup._contentEl);
        this.F6B.set({
            showTime: this.showTime,
            timeFormat: this.timeFormat,
            showClearButton: this.showClearButton,
            showTodayButton: this.showTodayButton
        });
        this.F6B[XFB](this.value);
        if (this.value) this.F6B.setViewDate(this.value);
        else this.F6B.setViewDate(this.viewDate);
        if (this.F6B._target) {
            var $ = this.F6B._target;
            this.F6B.un("timechanged", $.I8hZ, $);
            this.F6B.un("dateclick", $.AD, $);
            this.F6B.un("drawdate", $.P4E, $)
        }
        this.F6B.on("timechanged", this.I8hZ, this);
        this.F6B.on("dateclick", this.AD, this);
        this.F6B.on("drawdate", this.P4E, this);
        this.F6B.endUpdate();
        KC1e[_s][Pyu][If](this);
        this.F6B._target = this
    },
    hidePopup: function() {
        KC1e[_s][AXKv][If](this);
        this.F6B.un("timechanged", this.I8hZ, this);
        this.F6B.un("dateclick", this.AD, this);
        this.F6B.un("drawdate", this.P4E, this)
    },
    within: function($) {
        if (YCJ(this.el, $.target)) return true;
        if (this.F6B[ZZJ]($)) return true;
        return false
    },
    P4E: function($) {
        this.fire("drawdate", $)
    },
    AD: function(A) {
        var _ = this.F6B.getValue(),
        $ = this.getFormValue();
        this[XFB](_);
        if ($ !== this.getFormValue()) this.Dkw();
        this.focus();
        this[AXKv]()
    },
    I8hZ: function(_) {
        var $ = this.F6B.getValue();
        this[XFB]($);
        this.Dkw()
    },
    setFormat: function($) {
        if (typeof $ != "string") return;
        if (this.format != $) {
            this.format = $;
            this.ZKL.value = this.JNZM.value = this.getFormValue()
        }
    },
    setValue: function($) {
        $ = mini.parseDate($);
        if (mini.isNull($)) $ = "";
        if (this.value != $) {
            this.value = $;
            this.ZKL.value = this.JNZM.value = this.getFormValue()
        }
    },
    getValue: function() {
        if (!mini.isDate(this.value)) return null;
        return this.value
    },
    getFormValue: function() {
        if (!mini.isDate(this.value)) return "";
        return mini.formatDate(this.value, this.format)
    },
    setViewDate: function($) {
        $ = mini.parseDate($);
        if (!mini.isDate($)) return;
        this.viewDate = $
    },
    getViewDate: function() {
        return this.F6B.getViewDate()
    },
    setShowTime: function($) {
        if (this.showTime != $) this.showTime = $
    },
    getShowTime: function() {
        return this.showTime
    },
    setTimeFormat: function($) {
        if (this.timeFormat != $) this.timeFormat = $
    },
    getTimeFormat: function() {
        return this.timeFormat
    },
    setShowTodayButton: function($) {
        this.showTodayButton = $
    },
    getShowTodayButton: function() {
        return this.showTodayButton
    },
    setShowClearButton: function($) {
        this.showClearButton = $
    },
    getShowClearButton: function() {
        return this.showClearButton
    },
    _E1: function(B) {
        var A = this.ZKL.value,
        $ = mini.parseDate(A);
        if (!$ || isNaN($) || $.getFullYear() == 1970) $ = null;
        var _ = this.getFormValue();
        this[XFB]($);
        if ($ == null) this.ZKL.value = "";
        if (_ !== this.getFormValue()) this.Dkw()
    },
    ALEU: function($) {
        this.fire("keydown", {
            htmlEvent: $
        });
        if ($.keyCode == 8 && (this[Pa]() || this.allowInput == false)) return false;
        if ($.keyCode == 9) {
            this[AXKv]();
            return
        }
        switch ($.keyCode) {
        case 27:
            if (this.isShowPopup()) $.stopPropagation();
            this[AXKv]();
            break;
        case 13:
            if (this.isShowPopup()) {
                $.preventDefault();
                $.stopPropagation();
                this[AXKv]()
            } else {
                if (isIE9) this._E1(null);
                this.fire("enter")
            }
            break;
        case 37:
            break;
        case 38:
            break;
        case 39:
            break;
        case 40:
            this[Pyu]();
            break;
        default:
            break
        }
    },
    getAttrs: function($) {
        var _ = KC1e[_s][XNM][If](this, $);
        mini[GRcU]($, _, ["format", "viewDate", "timeFormat", "ondrawdate"]);
        mini[MTh]($, _, ["showTime", "showTodayButton", "showClearButton"]);
        return _
    }
});
W4(KC1e, "datepicker");
I8U = function() {
    this.viewDate = new Date(),
    this.WXg8 = [];
    I8U[_s][FjoU][If](this)
};
WKkQ(I8U, R0pW, {
    width: 220,
    height: 160,
    _clearBorder: false,
    viewDate: null,
    XtDq: "",
    WXg8: [],
    multiSelect: false,
    firstDayOfWeek: 0,
    todayText: "Today",
    clearText: "Clear",
    okText: "OK",
    cancelText: "Cancel",
    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    format: "MMM,yyyy",
    timeFormat: "H:mm",
    showTime: false,
    currentTime: false,
    rows: 1,
    columns: 1,
    headerCls: "",
    bodyCls: "",
    footerCls: "",
    Ss: "mini-calendar-today",
    Yr: "mini-calendar-weekend",
    VBZ: "mini-calendar-othermonth",
    Z9m: "mini-calendar-selected",
    showHeader: true,
    showFooter: true,
    showWeekNumber: false,
    showDaysHeader: true,
    showMonthButtons: true,
    showYearButtons: true,
    showTodayButton: true,
    showClearButton: true,
    isWeekend: function(_) {
        var $ = _.getDay();
        return $ == 0 || $ == 6
    },
    getFirstDateOfMonth: function($) {
        var $ = new Date($.getFullYear(), $.getMonth(), 1);
        return mini.getWeekStartDate($, this.firstDayOfWeek)
    },
    getShortWeek: function($) {
        return this.daysShort[$]
    },
    uiCls: "mini-calendar",
    _create: function() {
        var C = "<tr style=\"width:100%;\"><td style=\"width:100%;\"></td></tr>";
        C += "<tr ><td><div class=\"mini-calendar-footer\">" + "<span style=\"display:inline-block;\"><input name=\"time\" class=\"mini-timespinner\" style=\"width:60px\" format=\"" + this.timeFormat + "\"/>" + "<span class=\"mini-calendar-footerSpace\"></span></span>" + "<span class=\"mini-calendar-tadayButton\">" + this.todayText + "</span>" + "<span class=\"mini-calendar-footerSpace\"></span>" + "<span class=\"mini-calendar-clearButton\">" + this.clearText + "</span>" + "</div></td></tr>";
        var A = "<table class=\"mini-calendar\" cellpadding=\"0\" cellspacing=\"0\">" + C + "</table>",
        _ = document.createElement("div");
        _.innerHTML = A;
        this.el = _.firstChild;
        var $ = this.el.getElementsByTagName("tr"),
        B = this.el.getElementsByTagName("td");
        this.Jy = B[0];
        this.Gr = mini.byClass("mini-calendar-footer", this.el);
        this.timeWrapEl = this.Gr.childNodes[0];
        this.todayButtonEl = this.Gr.childNodes[1];
        this.footerSpaceEl = this.Gr.childNodes[2];
        this.closeButtonEl = this.Gr.lastChild;
        mini.parse(this.Gr);
        this.timeSpinner = mini.getbyName("time", this.el);
        this[SbW]()
    },
    destroy: function($) {
        this.Jy = this.Gr = this.timeWrapEl = this.todayButtonEl = this.footerSpaceEl = this.closeButtonEl = null;
        I8U[_s][HFtw][If](this, $)
    },
    _initEvents: function() {
        this.timeSpinner.on("valuechanged", this.I8hZ, this);
        Ehny(function() {
            $DT4(this.el, "click", this.ZmC, this);
            $DT4(this.el, "mousedown", this.U8z, this)
        },
        this)
    },
    getDateEl: function($) {
        if (!$) return null;
        var _ = this.uid + "$" + mini.clearTime($).getTime();
        return document.getElementById(_)
    },
    within: function($) {
        if (YCJ(this.el, $.target)) return true;
        if (this.menuEl && YCJ(this.menuEl, $.target)) return true;
        return false
    },
    setShowClearButton: function($) {
        this.showClearButton = $;
        var _ = this.getButton("clear");
        if (_) this[SbW]()
    },
    getShowClearButton: function() {
        return this.showClearButton
    },
    setShowHeader: function($) {
        this.showHeader = $;
        this[SbW]()
    },
    getShowHeader: function() {
        return this.showHeader
    },
    setShowFooter: function($) {
        this[CmkD] = $;
        this[SbW]()
    },
    getShowFooter: function() {
        return this[CmkD]
    },
    setShowWeekNumber: function($) {
        this.showWeekNumber = $;
        this[SbW]()
    },
    getShowWeekNumber: function() {
        return this.showWeekNumber
    },
    setShowDaysHeader: function($) {
        this.showDaysHeader = $;
        this[SbW]()
    },
    getShowDaysHeader: function() {
        return this.showDaysHeader
    },
    setShowMonthButtons: function($) {
        this.showMonthButtons = $;
        this[SbW]()
    },
    getShowMonthButtons: function() {
        return this.showMonthButtons
    },
    setShowYearButtons: function($) {
        this.showYearButtons = $;
        this[SbW]()
    },
    getShowYearButtons: function() {
        return this.showYearButtons
    },
    setShowTodayButton: function($) {
        this.showTodayButton = $;
        this[SbW]()
    },
    getShowTodayButton: function() {
        return this.showTodayButton
    },
    setShowClearButton: function($) {
        this.showClearButton = $;
        this[SbW]()
    },
    getShowClearButton: function() {
        return this.showClearButton
    },
    setViewDate: function($) {
        if (!$) $ = new Date();
        this.viewDate = $;
        this[SbW]()
    },
    getViewDate: function() {
        return this.viewDate
    },
    setSelectedDate: function($) {
        $ = mini.parseDate($);
        if (!mini.isDate($)) $ = "";
        else $ = new Date($.getTime());
        var _ = this.getDateEl(this.XtDq);
        if (_) Lq(_, this.Z9m);
        this.XtDq = $;
        if (this.XtDq) this.XtDq = mini.cloneDate(this.XtDq);
        _ = this.getDateEl(this.XtDq);
        if (_) F7y(_, this.Z9m);
        this.fire("datechanged")
    },
    setSelectedDates: function($) {
        if (!mini.isArray($)) $ = [];
        this.WXg8 = $;
        this[SbW]()
    },
    getSelectedDate: function() {
        return this.XtDq ? this.XtDq: ""
    },
    setTime: function($) {
        this.timeSpinner[XFB]($)
    },
    getTime: function() {
        return this.timeSpinner.getFormValue()
    },
    setValue: function($) {
        this.setSelectedDate($);
        this.setTime($)
    },
    getValue: function() {
        var $ = this.XtDq;
        if ($) {
            $ = mini.clearTime($);
            if (this.showTime) {
                var _ = this.timeSpinner.getValue();
                $.setHours(_.getHours());
                $.setMinutes(_.getMinutes());
                $.setSeconds(_.getSeconds())
            }
        }
        return $ ? $: ""
    },
    getFormValue: function() {
        var $ = this.getValue();
        if ($) return mini.formatDate($, "yyyy-MM-dd HH:mm:ss");
        return ""
    },
    isSelectedDate: function($) {
        if (!$ || !this.XtDq) return false;
        return mini.clearTime($).getTime() == mini.clearTime(this.XtDq).getTime()
    },
    setMultiSelect: function($) {
        this[MWVQ] = $;
        this[SbW]()
    },
    getMultiSelect: function() {
        return this[MWVQ]
    },
    setRows: function($) {
        if (isNaN($)) return;
        if ($ < 1) $ = 1;
        this.rows = $;
        this[SbW]()
    },
    getRows: function() {
        return this.rows
    },
    setColumns: function($) {
        if (isNaN($)) return;
        if ($ < 1) $ = 1;
        this.columns = $;
        this[SbW]()
    },
    getColumns: function() {
        return this.columns
    },
    setShowTime: function($) {
        if (this.showTime != $) {
            this.showTime = $;
            this[A6_]()
        }
    },
    getShowTime: function() {
        return this.showTime
    },
    setTimeFormat: function($) {
        if (this.timeFormat != $) {
            this.timeSpinner.setFormat($);
            this.timeFormat = this.timeSpinner.format
        }
    },
    getTimeFormat: function() {
        return this.timeFormat
    },
    doLayout: function() {
        if (!this.canLayout()) return;
        this.timeWrapEl.style.display = this.showTime ? "": "none";
        this.todayButtonEl.style.display = this.showTodayButton ? "": "none";
        this.closeButtonEl.style.display = this.showClearButton ? "": "none";
        this.footerSpaceEl.style.display = (this.showClearButton && this.showTodayButton) ? "": "none";
        this.Gr.style.display = this[CmkD] ? "": "none";
        var _ = this.Jy.firstChild,
        $ = this[Rol]();
        if (!$) {
            _.style.display = "none";
            h = jQuery(this.el).height();
            _.style.display = "";
            h -= jQuery(this.Gr).outerHeight();
            _.parentNode.style.height = h + "px"
        } else _.parentNode.style.height = ""
    },
    doUpdate: function() {
        if (!this.OTH) return;
        var F = new Date(this.viewDate.getTime()),
        A = this.rows == 1 && this.columns == 1,
        B = 100 / this.rows,
        E = "<table class=\"mini-calendar-views\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
        for (var $ = 0,
        D = this.rows; $ < D; $++) {
            E += "<tr >";
            for (var C = 0,
            _ = this.columns; C < _; C++) {
                E += "<td style=\"height:" + B + "%\">";
                E += this.X3XE(F, $, C);
                E += "</td>";
                F = new Date(F.getFullYear(), F.getMonth() + 1, 1)
            }
            E += "</tr>"
        }
        E += "</table>";
        this.Jy.innerHTML = E;
        mini[FN_](this.el);
        this[A6_]()
    },
    X3XE: function(R, J, C) {
        var _ = R.getMonth(),
        F = this.getFirstDateOfMonth(R),
        K = new Date(F.getTime()),
        A = mini.clearTime(new Date()).getTime(),
        D = this.value ? mini.clearTime(this.value).getTime() : -1,
        N = this.rows > 1 || this.columns > 1,
        P = "";
        P += "<table class=\"mini-calendar-view\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
        if (this.showHeader) {
            P += "<tr ><td colSpan=\"10\" class=\"mini-calendar-header\"><div class=\"mini-calendar-headerInner\">";
            if (J == 0 && C == 0) {
                P += "<div class=\"mini-calendar-prev\">";
                if (this.showYearButtons) P += "<span class=\"mini-calendar-yearPrev\"></span>";
                if (this.showMonthButtons) P += "<span class=\"mini-calendar-monthPrev\"></span>";
                P += "</div>"
            }
            if (J == 0 && C == this.columns - 1) {
                P += "<div class=\"mini-calendar-next\">";
                if (this.showMonthButtons) P += "<span class=\"mini-calendar-monthNext\"></span>";
                if (this.showYearButtons) P += "<span class=\"mini-calendar-yearNext\"></span>";
                P += "</div>"
            }
            P += "<span class=\"mini-calendar-title\">" + mini.formatDate(R, this.format); + "</span>";
            P += "</div></td></tr>"
        }
        P += "<tr class=\"mini-calendar-daysheader\"><td class=\"mini-calendar-space\"></td>";
        if (this.showWeekNumber) P += "<td sclass=\"mini-calendar-weeknumber\"></td>";
        for (var L = this.firstDayOfWeek,
        B = L + 7; L < B; L++) {
            var O = this.getShortWeek(L);
            P += "<td valign=\"middle\">";
            P += O;
            P += "</td>";
            F = new Date(F.getFullYear(), F.getMonth(), F.getDate() + 1)
        }
        P += "<td class=\"mini-calendar-space\"></td></tr>";
        F = K;
        for (var H = 0; H <= 5; H++) {
            P += "<tr class=\"mini-calendar-days\"><td class=\"mini-calendar-space\"></td>";
            if (this.showWeekNumber) {
                var G = mini.getWeek(F.getFullYear(), F.getMonth() + 1, F.getDate());
                if (String(G).length == 1) G = "0" + G;
                P += "<td class=\"mini-calendar-weeknumber\" valign=\"middle\">" + G + "</td>"
            }
            for (L = this.firstDayOfWeek, B = L + 7; L < B; L++) {
                var M = this.isWeekend(F),
                I = mini.clearTime(F).getTime(),
                $ = I == A,
                E = this.isSelectedDate(F);
                if (_ != F.getMonth() && N) I = -1;
                var Q = this.Yp(F);
                P += "<td valign=\"middle\" id=\"";
                P += this.uid + "$" + I;
                P += "\" class=\"mini-calendar-date ";
                if (M) P += " mini-calendar-weekend ";
                if (Q[VoB7] == false) P += " mini-calendar-disabled ";
                if (_ != F.getMonth() && N);
                else {
                    if (E) P += " " + this.Z9m + " ";
                    if ($) P += " mini-calendar-today "
                }
                if (_ != F.getMonth()) P += " mini-calendar-othermonth ";
                P += "\">";
                if (_ != F.getMonth() && N);
                else P += Q.dateHtml;
                P += "</td>";
                F = new Date(F.getFullYear(), F.getMonth(), F.getDate() + 1)
            }
            P += "<td class=\"mini-calendar-space\"></td></tr>"
        }
        P += "<tr class=\"mini-calendar-bottom\" colSpan=\"10\"><td ></td></tr>";
        P += "</table>";
        return P
    },
    Yp: function($) {
        var _ = {
            date: $,
            dateCls: "",
            dateStyle: "",
            dateHtml: $.getDate(),
            allowSelect: true
        };
        this.fire("drawdate", _);
        return _
    },
    VQW: function(_, $) {
        var A = {
            date: _,
            action: $
        };
        this.fire("dateclick", A);
        this.Dkw()
    },
    menuEl: null,
    menuYear: null,
    menuSelectMonth: null,
    menuSelectYear: null,
    showMenu: function(_) {
        if (!_) return;
        this.hideMenu();
        this.menuYear = parseInt(this.viewDate.getFullYear() / 10) * 10;
        this.URelectMonth = this.viewDate.getMonth();
        this.URelectYear = this.viewDate.getFullYear();
        var A = "<div class=\"mini-calendar-menu\"></div>";
        this.menuEl = mini.append(document.body, A);
        this.updateMenu(this.viewDate);
        var $ = this.getBox();
        if (this.el.style.borderWidth == "0px") this.menuEl.style.border = "0";
        M1(this.menuEl, $);
        $DT4(this.menuEl, "click", this.YhM, this);
        $DT4(document, "mousedown", this.B7F, this)
    },
    hideMenu: function() {
        if (this.menuEl) {
            EWw(this.menuEl, "click", this.YhM, this);
            EWw(document, "mousedown", this.B7F, this);
            jQuery(this.menuEl).remove();
            this.menuEl = null
        }
    },
    updateMenu: function() {
        var C = "<div class=\"mini-calendar-menu-months\">";
        for (var $ = 0,
        B = 12; $ < B; $++) {
            var _ = mini.getShortMonth($),
            A = "";
            if (this.URelectMonth == $) A = "mini-calendar-menu-selected";
            C += "<a id=\"" + $ + "\" class=\"mini-calendar-menu-month " + A + "\" href=\"javascript:void(0);\" hideFocus onclick=\"return false\">" + _ + "</a>"
        }
        C += "<div style=\"clear:both;\"></div></div>";
        C += "<div class=\"mini-calendar-menu-years\">";
        for ($ = this.menuYear, B = this.menuYear + 10; $ < B; $++) {
            _ = $,
            A = "";
            if (this.URelectYear == $) A = "mini-calendar-menu-selected";
            C += "<a id=\"" + $ + "\" class=\"mini-calendar-menu-year " + A + "\" href=\"javascript:void(0);\" hideFocus onclick=\"return false\">" + _ + "</a>"
        }
        C += "<div class=\"mini-calendar-menu-prevYear\"></div><div class=\"mini-calendar-menu-nextYear\"></div><div style=\"clear:both;\"></div></div>";
        C += "<div class=\"mini-calendar-footer\">" + "<span class=\"mini-calendar-okButton\">" + this.okText + "</span>" + "<span class=\"mini-calendar-footerSpace\"></span>" + "<span class=\"mini-calendar-cancelButton\">" + this.cancelText + "</span>" + "</div><div style=\"clear:both;\"></div>";
        this.menuEl.innerHTML = C
    },
    YhM: function(C) {
        var _ = C.target,
        B = O21(_, "mini-calendar-menu-month"),
        $ = O21(_, "mini-calendar-menu-year");
        if (B) {
            this.URelectMonth = parseInt(B.id);
            this.updateMenu()
        } else if ($) {
            this.URelectYear = parseInt($.id);
            this.updateMenu()
        } else if (O21(_, "mini-calendar-menu-prevYear")) {
            this.menuYear = this.menuYear - 1;
            this.menuYear = parseInt(this.menuYear / 10) * 10;
            this.updateMenu()
        } else if (O21(_, "mini-calendar-menu-nextYear")) {
            this.menuYear = this.menuYear + 11;
            this.menuYear = parseInt(this.menuYear / 10) * 10;
            this.updateMenu()
        } else if (O21(_, "mini-calendar-okButton")) {
            var A = new Date(this.URelectYear, this.URelectMonth, 1);
            this.setViewDate(A);
            this.hideMenu()
        } else if (O21(_, "mini-calendar-cancelButton")) this.hideMenu()
    },
    B7F: function($) {
        if (!O21($.target, "mini-calendar-menu")) this.hideMenu()
    },
    ZmC: function(H) {
        var G = this.viewDate;
        if (this.enabled == false) return;
        var C = H.target,
        F = O21(H.target, "mini-calendar-title");
        if (O21(C, "mini-calendar-monthNext")) {
            G.setMonth(G.getMonth() + 1);
            this.setViewDate(G)
        } else if (O21(C, "mini-calendar-yearNext")) {
            G.setFullYear(G.getFullYear() + 1);
            this.setViewDate(G)
        } else if (O21(C, "mini-calendar-monthPrev")) {
            G.setMonth(G.getMonth() - 1);
            this.setViewDate(G)
        } else if (O21(C, "mini-calendar-yearPrev")) {
            G.setFullYear(G.getFullYear() - 1);
            this.setViewDate(G)
        } else if (O21(C, "mini-calendar-tadayButton")) {
            var _ = mini.clearTime(new Date());
            this.setViewDate(_);
            this.setSelectedDate(_);
            if (this.currentTime) {
                var $ = new Date();
                this.setTime($)
            }
            this.VQW(_, "today")
        } else if (O21(C, "mini-calendar-clearButton")) {
            this.setSelectedDate(null);
            this.setTime(null);
            this.VQW(null, "clear")
        } else if (F) this.showMenu(F);
        var E = O21(H.target, "mini-calendar-date");
        if (E && !DD(E, "mini-calendar-disabled")) {
            var A = E.id.split("$"),
            B = parseInt(A[A.length - 1]);
            if (B == -1) return;
            var D = new Date(B);
            this.VQW(D)
        }
    },
    U8z: function(C) {
        if (this.enabled == false) return;
        var B = O21(C.target, "mini-calendar-date");
        if (B && !DD(B, "mini-calendar-disabled")) {
            var $ = B.id.split("$"),
            _ = parseInt($[$.length - 1]);
            if (_ == -1) return;
            var A = new Date(_);
            this.setSelectedDate(A)
        }
    },
    I8hZ: function($) {
        this.fire("timechanged");
        this.Dkw()
    },
    Dkw: function() {
        this.fire("valuechanged")
    },
    getAttrs: function($) {
        var _ = I8U[_s][XNM][If](this, $);
        mini[GRcU]($, _, ["viewDate", "rows", "columns", "ondateclick", "ondrawdate", "ondatechanged", "timeFormat", "ontimechanged", "onvaluechanged"]);
        mini[MTh]($, _, ["multiSelect", "showHeader", "showFooter", "showWeekNumber", "showDaysHeader", "showMonthButtons", "showYearButtons", "showTodayButton", "showClearButton", "showTime"]);
        return _
    }
});
W4(I8U, "calendar");
ZcsR = function() {
    ZcsR[_s][FjoU][If](this)
};
WKkQ(ZcsR, Ld, {
    formField: true,
    width: 200,
    columns: null,
    columnWidth: 80,
    showNullItem: false,
    nullText: "",
    showEmpty: false,
    emptyText: "",
    showCheckBox: false,
    showAllCheckBox: true,
    multiSelect: false,
    Mw6: "mini-listbox-item",
    C8I: "mini-listbox-item-hover",
    _QaC: "mini-listbox-item-selected",
    uiCls: "mini-listbox",
    _create: function() {
        var $ = this.el = document.createElement("div");
        this.el.className = "mini-listbox";
        this.el.innerHTML = "<div class=\"mini-listbox-border\"><div class=\"mini-listbox-header\"></div><div class=\"mini-listbox-view\"></div><input type=\"hidden\"/></div><div class=\"mini-errorIcon\"></div>";
        this.WXF = this.el.firstChild;
        this.ZvT = this.WXF.firstChild;
        this.EY = this.WXF.childNodes[1];
        this.JNZM = this.WXF.childNodes[2];
        this.Wa = this.el.lastChild;
        this.Nd = this.EY
    },
    destroy: function($) {
        if (this.EY) {
            mini[_LP](this.EY);
            this.EY = null
        }
        this.WXF = null;
        this.ZvT = null;
        this.EY = null;
        this.JNZM = null;
        ZcsR[_s][HFtw][If](this, $)
    },
    _initEvents: function() {
        ZcsR[_s][UUs][If](this);
        Ehny(function() {
            $DT4(this.EY, "scroll", this.S7Y, this)
        },
        this)
    },
    setColumns: function(_) {
        if (!mini.isArray(_)) _ = [];
        this.columns = _;
        for (var $ = 0,
        D = this.columns.length; $ < D; $++) {
            var B = this.columns[$];
            if (B.type) {
                if (!mini.isNull(B.header) && typeof B.header !== "function") if (B.header.trim() == "") delete B.header;
                var C = mini[Id9](B.type);
                if (C) {
                    var E = mini.copyTo({},
                    B);
                    mini.copyTo(B, C);
                    mini.copyTo(B, E)
                }
            }
            var A = parseInt(B.width);
            if (mini.isNumber(A) && String(A) == B.width) B.width = A + "px";
            if (mini.isNull(B.width)) B.width = this[S6Y] + "px"
        }
        this[SbW]()
    },
    getColumns: function() {
        return this.columns
    },
    doUpdate: function() {
        if (this.OTH === false) return;
        var S = this.columns && this.columns.length > 0;
        if (S) F7y(this.el, "mini-listbox-showColumns");
        else Lq(this.el, "mini-listbox-showColumns");
        this.ZvT.style.display = S ? "": "none";
        var I = [];
        if (S) {
            I[I.length] = "<table class=\"mini-listbox-headerInner\" cellspacing=\"0\" cellpadding=\"0\"><tr>";
            var D = this.uid + "$ck$all";
            I[I.length] = "<td class=\"mini-listbox-checkbox\"><input type=\"checkbox\" id=\"" + D + "\"></td>";
            for (var R = 0,
            _ = this.columns.length; R < _; R++) {
                var B = this.columns[R],
                E = B.header;
                if (mini.isNull(E)) E = "&nbsp;";
                var A = B.width;
                if (mini.isNumber(A)) A = A + "px";
                I[I.length] = "<td class=\"";
                if (B.headerCls) I[I.length] = B.headerCls;
                I[I.length] = "\" style=\"";
                if (B.headerStyle) I[I.length] = B.headerStyle + ";";
                if (A) I[I.length] = "width:" + A + ";";
                if (B.headerAlign) I[I.length] = "text-align:" + B.headerAlign + ";";
                I[I.length] = "\">";
                I[I.length] = E;
                I[I.length] = "</td>"
            }
            I[I.length] = "</tr></table>"
        }
        this.ZvT.innerHTML = I.join("");
        var I = [],
        P = this.data;
        I[I.length] = "<table class=\"mini-listbox-items\" cellspacing=\"0\" cellpadding=\"0\">";
        if (this[CN] && P.length == 0) I[I.length] = "<tr><td colspan=\"20\">" + this[V6FA] + "</td></tr>";
        else {
            this.Tm3();
            for (var K = 0,
            G = P.length; K < G; K++) {
                var $ = P[K],
                M = -1,
                O = " ",
                J = -1,
                N = " ";
                I[I.length] = "<tr id=\"";
                I[I.length] = this.K_FW(K);
                I[I.length] = "\" index=\"";
                I[I.length] = K;
                I[I.length] = "\" class=\"mini-listbox-item ";
                if ($.enabled === false) I[I.length] = " mini-disabled ";
                M = I.length;
                I[I.length] = O;
                I[I.length] = "\" style=\"";
                J = I.length;
                I[I.length] = N;
                I[I.length] = "\">";
                var H = this.O3N(K),
                L = this.name,
                F = this[TILf]($),
                C = "";
                if ($.enabled === false) C = "disabled";
                I[I.length] = "<td class=\"mini-listbox-checkbox\"><input " + C + " id=\"" + H + "\" type=\"checkbox\" ></td>";
                if (S) {
                    for (R = 0, _ = this.columns.length; R < _; R++) {
                        var B = this.columns[R],
                        T = this._9_t($, K, B),
                        A = B.width;
                        if (typeof A == "number") A = A + "px";
                        I[I.length] = "<td class=\"";
                        if (T.cellCls) I[I.length] = T.cellCls;
                        I[I.length] = "\" style=\"";
                        if (T.cellStyle) I[I.length] = T.cellStyle + ";";
                        if (A) I[I.length] = "width:" + A + ";";
                        if (B.align) I[I.length] = "text-align:" + B.align + ";";
                        I[I.length] = "\">";
                        I[I.length] = T.cellHtml;
                        I[I.length] = "</td>";
                        if (T.rowCls) O = T.rowCls;
                        if (T.rowStyle) N = T.rowStyle
                    }
                } else {
                    T = this._9_t($, K, null);
                    I[I.length] = "<td class=\"";
                    if (T.cellCls) I[I.length] = T.cellCls;
                    I[I.length] = "\" style=\"";
                    if (T.cellStyle) I[I.length] = T.cellStyle;
                    I[I.length] = "\">";
                    I[I.length] = T.cellHtml;
                    I[I.length] = "</td>";
                    if (T.rowCls) O = T.rowCls;
                    if (T.rowStyle) N = T.rowStyle
                }
                I[M] = O;
                I[J] = N;
                I[I.length] = "</tr>"
            }
        }
        I[I.length] = "</table>";
        var Q = I.join("");
        this.EY.innerHTML = Q;
        this.VY();
        this[A6_]()
    },
    doLayout: function() {
        if (!this.canLayout()) return;
        if (this.columns && this.columns.length > 0) F7y(this.el, "mini-listbox-showcolumns");
        else Lq(this.el, "mini-listbox-showcolumns");
        if (this[CEK]) Lq(this.el, "mini-listbox-hideCheckBox");
        else F7y(this.el, "mini-listbox-hideCheckBox");
        var D = this.uid + "$ck$all",
        B = document.getElementById(D);
        if (B) B.style.display = this[Omk8] ? "": "none";
        var E = this[Rol]();
        h = this[SeC](true);
        _ = this[R5Kf](true);
        var C = _,
        F = this.EY;
        F.style.width = _ + "px";
        if (!E) {
            var $ = YiC_(this.ZvT);
            h = h - $;
            F.style.height = h + "px"
        } else F.style.height = "auto";
        if (isIE) {
            var A = this.ZvT.firstChild,
            G = this.EY.firstChild;
            if (this.EY.offsetHeight >= this.EY.scrollHeight) {
                G.style.width = "100%";
                if (A) A.style.width = "100%"
            } else {
                var _ = parseInt(G.parentNode.offsetWidth - 17) + "px";
                G.style.width = _;
                if (A) A.style.width = _
            }
        }
        if (this.EY.offsetHeight < this.EY.scrollHeight) this.ZvT.style.width = (C - 17) + "px";
        else this.ZvT.style.width = "100%"
    },
    setShowCheckBox: function($) {
        this[CEK] = $;
        this[A6_]()
    },
    getShowCheckBox: function() {
        return this[CEK]
    },
    setShowAllCheckBox: function($) {
        this[Omk8] = $;
        this[A6_]()
    },
    getShowAllCheckBox: function() {
        return this[Omk8]
    },
    setShowNullItem: function($) {
        if (this.showNullItem != $) {
            this.showNullItem = $;
            this.Tm3();
            this[SbW]()
        }
    },
    getShowNullItem: function() {
        return this.showNullItem
    },
    Tm3: function() {
        for (var _ = 0,
        A = this.data.length; _ < A; _++) {
            var $ = this.data[_];
            if ($.__NullItem) {
                this.data.removeAt(_);
                break
            }
        }
        if (this.showNullItem) {
            $ = {
                __NullItem: true
            };
            $[this.textField] = this.nullText;
            $[this.valueField] = "";
            this.data.insert(0, $)
        }
    },
    removeAll: function() {
        var $ = this.getData();
        this.removeItems($)
    },
    addItems: function(_, $) {
        if (!mini.isArray(_)) return;
        if (mini.isNull($)) $ = this.data.length;
        this.data.insertRange($, _);
        this[SbW]()
    },
    addItem: function(_, $) {
        if (!_) return;
        if (this.data.indexOf(_) != -1) return;
        if (mini.isNull($)) $ = this.data.length;
        this.data.insert($, _);
        this[SbW]()
    },
    removeItems: function($) {
        if (!mini.isArray($)) return;
        this.data.removeRange($);
        this.NK();
        this[SbW]()
    },
    removeItem: function(_) {
        var $ = this.data.indexOf(_);
        if ($ != -1) {
            this.data.removeAt($);
            this.NK();
            this[SbW]()
        }
    },
    moveItem: function(_, $) {
        if (!_ || !mini.isNumber($)) return;
        if ($ < 0) $ = 0;
        if ($ > this.data.length) $ = this.data.length;
        this.data.remove(_);
        this.data.insert($, _);
        this[SbW]()
    },
    _9_t: function(_, $, C) {
        var A = C ? _[C.field] : this[BH$](_),
        D = {
            sender: this,
            index: $,
            rowIndex: $,
            record: _,
            item: _,
            column: C,
            field: C ? C.field: null,
            value: A,
            cellHtml: A,
            rowCls: null,
            cellCls: C ? (C.cellCls || "") : "",
            rowStyle: null,
            cellStyle: C ? (C.cellStyle || "") : ""
        };
        if (C) {
            if (C.dateFormat) if (mini.isDate(D.value)) D.cellHtml = mini.formatDate(A, C.dateFormat);
            else D.cellHtml = A;
            var B = C.renderer;
            if (B) {
                fn = typeof B == "function" ? B: window[B];
                if (fn) D.cellHtml = fn[If](C, D)
            }
        }
        this.fire("drawcell", D);
        if (D.cellHtml === null || D.cellHtml === undefined || D.cellHtml === "") D.cellHtml = "&nbsp;";
        return D
    },
    S7Y: function($) {
        this.ZvT.scrollLeft = this.EY.scrollLeft
    },
    ZmC: function(C) {
        var A = this.uid + "$ck$all";
        if (C.target.id == A) {
            var _ = document.getElementById(A);
            if (_) {
                var B = _.checked,
                $ = this.getValue();
                this._CanFireSelectionChanged = true;
                if (B) this.selectAll();
                else this[RsYU]();
                this._CanFireSelectionChanged = false;
                if ($ != this.getValue()) {
                    this.Dkw();
                    this.fire("itemclick", {
                        htmlEvent: C
                    })
                }
            }
            return
        }
        this.F48(C, "Click")
    },
    getAttrs: function(_) {
        var E = ZcsR[_s][XNM][If](this, _);
        mini[MTh](_, E, ["showCheckBox", "showAllCheckBox", "showNullItem"]);
        if (_.nodeName.toLowerCase() != "select") {
            var C = mini[OJy](_);
            for (var $ = 0,
            D = C.length; $ < D; $++) {
                var B = C[$],
                A = jQuery(B).attr("property");
                if (!A) continue;
                A = A.toLowerCase();
                if (A == "columns") E.columns = mini._ParseColumns(B);
                else if (A == "data") E.data = B.innerHTML
            }
        }
        return E
    }
});
W4(ZcsR, "listbox");
Aa = function() {
    Aa[_s][FjoU][If](this)
};
WKkQ(Aa, Ld, {
    formField: true,
    multiSelect: true,
    repeatItems: 0,
    repeatLayout: "none",
    repeatDirection: "horizontal",
    Mw6: "mini-checkboxlist-item",
    C8I: "mini-checkboxlist-item-hover",
    _QaC: "mini-checkboxlist-item-selected",
    Sgk: "mini-checkboxlist-table",
    Ijk: "mini-checkboxlist-td",
    MjzC: "checkbox",
    uiCls: "mini-checkboxlist",
    _create: function() {
        var $ = this.el = document.createElement("div");
        this.el.className = this.uiCls;
        this.el.innerHTML = "<div class=\"mini-list-inner\"></div><div class=\"mini-list-errorIcon\"></div><input type=\"hidden\" />";
        this.Jy = this.el.firstChild;
        this.JNZM = this.el.lastChild;
        this.Wa = this.el.childNodes[1]
    },
    DWC: function() {
        var B = [];
        if (this.repeatItems > 0) {
            if (this.repeatDirection == "horizontal") {
                var D = [];
                for (var C = 0,
                E = this.data.length; C < E; C++) {
                    var A = this.data[C];
                    if (D.length == this.repeatItems) {
                        B.push(D);
                        D = []
                    }
                    D.push(A)
                }
                B.push(D)
            } else {
                var _ = this.repeatItems > this.data.length ? this.data.length: this.repeatItems;
                for (C = 0, E = _; C < E; C++) B.push([]);
                for (C = 0, E = this.data.length; C < E; C++) {
                    var A = this.data[C],
                    $ = C % this.repeatItems;
                    B[$].push(A)
                }
            }
        } else B = [this.data.clone()];
        return B
    },
    doUpdate: function() {
        var D = this.data,
        G = "";
        for (var A = 0,
        F = D.length; A < F; A++) {
            var _ = D[A];
            _._i = A
        }
        if (this.repeatLayout == "flow") {
            var $ = this.DWC();
            for (A = 0, F = $.length; A < F; A++) {
                var C = $[A];
                for (var E = 0,
                B = C.length; E < B; E++) {
                    _ = C[E];
                    G += this.TA1j(_, _._i)
                }
                if (A != F - 1) G += "<br/>"
            }
        } else if (this.repeatLayout == "table") {
            $ = this.DWC();
            G += "<table class=\"" + this.Sgk + "\" cellpadding=\"0\" cellspacing=\"1\">";
            for (A = 0, F = $.length; A < F; A++) {
                C = $[A];
                G += "<tr>";
                for (E = 0, B = C.length; E < B; E++) {
                    _ = C[E];
                    G += "<td class=\"" + this.Ijk + "\">";
                    G += this.TA1j(_, _._i);
                    G += "</td>"
                }
                G += "</tr>"
            }
            G += "</table>"
        } else for (A = 0, F = D.length; A < F; A++) {
            _ = D[A];
            G += this.TA1j(_, A)
        }
        this.Jy.innerHTML = G;
        for (A = 0, F = D.length; A < F; A++) {
            _ = D[A];
            delete _._i
        }
    },
    TA1j: function(_, $) {
        var F = this.PiWD(_, $),
        E = this.K_FW($),
        A = this.O3N($),
        C = this[TILf](_),
        B = "",
        D = "<div id=\"" + E + "\" index=\"" + $ + "\" class=\"" + this.Mw6 + " ";
        if (_.enabled === false) {
            D += " mini-disabled ";
            B = "disabled"
        }
        D += F.itemCls + "\" style=\"" + F.itemStyle + "\"><input " + B + " value=\"" + C + "\" id=\"" + A + "\" type=\"" + this.MjzC + "\"/><label for=\"" + A + "\" onclick=\"return false;\">";
        D += F.itemHtml + "</label></div>";
        return D
    },
    PiWD: function(_, $) {
        var A = this[BH$](_),
        B = {
            index: $,
            item: _,
            itemHtml: A,
            itemCls: "",
            itemStyle: ""
        };
        this.fire("drawitem", B);
        if (B.itemHtml === null || B.itemHtml === undefined) B.itemHtml = "";
        return B
    },
    setRepeatItems: function($) {
        $ = parseInt($);
        if (isNaN($)) $ = 0;
        if (this.repeatItems != $) {
            this.repeatItems = $;
            this[SbW]()
        }
    },
    getRepeatItems: function() {
        return this.repeatItems
    },
    setRepeatLayout: function($) {
        if ($ != "flow" && $ != "table") $ = "none";
        if (this.repeatLayout != $) {
            this.repeatLayout = $;
            this[SbW]()
        }
    },
    getRepeatLayout: function() {
        return this.repeatLayout
    },
    setRepeatDirection: function($) {
        if ($ != "vertical") $ = "horizontal";
        if (this.repeatDirection != $) {
            this.repeatDirection = $;
            this[SbW]()
        }
    },
    getRepeatDirection: function() {
        return this.repeatDirection
    },
    getAttrs: function(_) {
        var D = Aa[_s][XNM][If](this, _),
        C = jQuery(_),
        $ = parseInt(C.attr("repeatItems"));
        if (!isNaN($)) D.repeatItems = $;
        var B = C.attr("repeatLayout");
        if (B) D.repeatLayout = B;
        var A = C.attr("repeatDirection");
        if (A) D.repeatDirection = A;
        return D
    }
});
W4(Aa, "checkboxlist");
W3h = function() {
    W3h[_s][FjoU][If](this)
};
WKkQ(W3h, Aa, {
    multiSelect: false,
    Mw6: "mini-radiobuttonlist-item",
    C8I: "mini-radiobuttonlist-item-hover",
    _QaC: "mini-radiobuttonlist-item-selected",
    Sgk: "mini-radiobuttonlist-table",
    Ijk: "mini-radiobuttonlist-td",
    MjzC: "radio",
    uiCls: "mini-radiobuttonlist"
});
W4(W3h, "radiobuttonlist");
ZQ = function() {
    this.data = [];
    ZQ[_s][FjoU][If](this)
};
WKkQ(ZQ, Wu6k, {
    text: "",
    value: "",
    valueField: "id",
    textField: "text",
    delimiter: ",",
    multiSelect: false,
    data: [],
    url: "",
    allowInput: false,
    showTreeIcon: false,
    showTreeLines: true,
    resultAsTree: false,
    parentField: "pid",
    checkRecursive: false,
    showFolderCheckBox: false,
    popupMaxHeight: 250,
    popupMinWidth: 200,
    set: function(B) {
        if (typeof B == "string") return this;
        var $ = B.value;
        delete B.value;
        var _ = B.text;
        delete B.text;
        var C = B.url;
        delete B.url;
        var A = B.data;
        delete B.data;
        ZQ[_s].set[If](this, B);
        if (!mini.isNull(A)) this[_CY](A);
        if (!mini.isNull(C)) this.setUrl(C);
        if (!mini.isNull($)) this[XFB]($);
        if (!mini.isNull(_)) this[Woc](_);
        return this
    },
    uiCls: "mini-treeselect",
    IS: function() {
        ZQ[_s].IS[If](this);
        this.tree = new GOFw();
        this.tree.setShowTreeIcon(true);
        this.tree.setStyle("border:0;width:100%;height:100%;");
        this.tree.setResultAsTree(this[In43]);
        this.tree[NF](this.popup._contentEl);
        this.tree.on("nodeclick", this.HgMs, this);
        this.tree.on("nodecheck", this.Vs, this);
        this.tree.on("expand", this.Sas, this);
        this.tree.on("collapse", this.JN7, this);
        this.tree.on("beforenodecheck", this.KL, this);
        this.tree.on("beforenodeselect", this.$QK, this);
        this.tree.allowAnim = false
    },
    KL: function($) {
        $.tree = $.sender;
        this.fire("beforenodecheck", $)
    },
    $QK: function($) {
        $.tree = $.sender;
        this.fire("beforenodeselect", $)
    },
    Sas: function($) {
        this[Pyu]()
    },
    JN7: function($) {
        this[Pyu]()
    },
    showPopup: function() {
        this.tree[ORwC]("auto");
        ZQ[_s][Pyu][If](this);
        var $ = this.popup.el.style.height;
        if ($ == "" || $ == "auto") this.tree[ORwC]("auto");
        else this.tree[ORwC]("100%");
        this.tree[XFB](this.value)
    },
    getItem: function($) {
        return typeof $ == "object" ? $: this.data[$]
    },
    indexOf: function($) {
        return this.data.indexOf($)
    },
    getAt: function($) {
        return this.data[$]
    },
    load: function($) {
        this.tree.load($)
    },
    setData: function($) {
        this.tree[_CY]($);
        this.data = this.tree.data
    },
    getData: function() {
        return this.data
    },
    setUrl: function($) {
        this.getPopup();
        this.tree.setUrl($);
        this.url = this.tree.url
    },
    getUrl: function() {
        return this.url
    },
    setTextField: function($) {
        if (this.tree) this.tree.setTextField($);
        this[XND] = $
    },
    getTextField: function() {
        return this[XND]
    },
    setValue: function($) {
        if (this.value != $) {
            var _ = this.tree.SmZ($);
            this.value = $;
            this.JNZM.value = $;
            this.ZKL.value = _[1];
            this.Yss()
        }
    },
    setMultiSelect: function($) {
        if (this[MWVQ] != $) {
            this[MWVQ] = $;
            this.tree.setShowCheckBox($);
            this.tree.setAllowSelect(!$)
        }
    },
    getMultiSelect: function() {
        return this[MWVQ]
    },
    HgMs: function(B) {
        if (this[MWVQ]) return;
        var _ = this.tree.getSelectedNode(),
        A = this.tree[TILf](_),
        $ = this.getValue();
        this[XFB](A);
        if ($ != this.getValue()) this.Dkw();
        this[AXKv]()
    },
    Vs: function(A) {
        if (!this[MWVQ]) return;
        var _ = this.tree.getValue(),
        $ = this.getValue();
        this[XFB](_);
        if ($ != this.getValue()) this.Dkw()
    },
    setCheckRecursive: function($) {
        this[W5D] = $;
        if (this.tree) this.tree.setCheckRecursive($)
    },
    getCheckRecursive: function() {
        return this[W5D]
    },
    setResultAsTree: function($) {
        this[In43] = $;
        if (this.tree) this.tree.setResultAsTree($)
    },
    getResultAsTree: function() {
        return this[In43]
    },
    setParentField: function($) {
        this[ZPUV] = $;
        if (this.tree) this.tree.setParentField($)
    },
    getParentField: function() {
        return this[ZPUV]
    },
    setValueField: function($) {
        if (this.tree) this.tree.setIdField($);
        this[SY0C] = $
    },
    getValueField: function() {
        return this[SY0C]
    },
    setShowTreeIcon: function($) {
        this[Ol] = $;
        if (this.tree) this.tree.setShowTreeIcon($)
    },
    getShowTreeIcon: function() {
        return this[Ol]
    },
    setShowTreeLines: function($) {
        this[$Ch] = $;
        if (this.tree) this.tree.setShowTreeLines($)
    },
    getShowTreeLines: function() {
        return this[$Ch]
    },
    setShowFolderCheckBox: function($) {
        this[VXsF] = $;
        if (this.tree) this.tree.setShowFolderCheckBox($)
    },
    getShowFolderCheckBox: function() {
        return this[VXsF]
    },
    getAttrs: function($) {
        var _ = MrgM[_s][XNM][If](this, $);
        mini[GRcU]($, _, ["url", "data", "textField", "valueField", "parentField", "onbeforenodecheck", "onbeforenodeselect"]);
        mini[MTh]($, _, ["multiSelect", "resultAsTree", "checkRecursive", "showTreeIcon", "showTreeLines", "showFolderCheckBox"]);
        return _
    }
});
W4(ZQ, "TreeSelect");
M6I = function() {
    M6I[_s][FjoU][If](this);
    this[XFB](this[SyWd])
};
WKkQ(M6I, Ytb, {
    value: 0,
    minValue: 0,
    maxValue: 100,
    increment: 1,
    decimalPlaces: 0,
    set: function(_) {
        if (typeof _ == "string") return this;
        var $ = _.value;
        delete _.value;
        M6I[_s].set[If](this, _);
        if (!mini.isNull($)) this[XFB]($);
        return this
    },
    uiCls: "mini-spinner",
    J3dN: function() {
        this.buttons = [];
        var $ = this.createButton({
            type: "spin",
            cls: "mini-buttonedit-spinButton"
        });
        this.buttons.push($)
    },
    _initEvents: function() {
        M6I[_s][UUs][If](this);
        Ehny(function() {
            this.on("buttonmousedown", this.Rho, this);
            $DT4(this.el, "mousewheel", this.XXZ, this);
            $DT4(this.ZKL, "keydown", this.MMM, this)
        },
        this)
    },
    IwS: function() {
        if (this[SyWd] > this[NFp]) this[NFp] = this[SyWd] + 100;
        if (this.value < this[SyWd]) this[XFB](this[SyWd]);
        if (this.value > this[NFp]) this[XFB](this[NFp])
    },
    setValue: function($) {
        $ = parseFloat($);
        if (isNaN($)) $ = this[SyWd];
        $ = parseFloat($.toFixed(this[JSq]));
        if (this.value != $) {
            this.value = $;
            this.IwS();
            this.ZKL.value = this.JNZM.value = this.getFormValue()
        } else this.ZKL.value = this.getFormValue()
    },
    setMaxValue: function($) {
        $ = parseFloat($);
        if (isNaN($)) return;
        $ = parseFloat($.toFixed(this[JSq]));
        if (this[NFp] != $) {
            this[NFp] = $;
            this.IwS()
        }
    },
    getMaxValue: function($) {
        return this[NFp]
    },
    setMinValue: function($) {
        $ = parseFloat($);
        if (isNaN($)) return;
        $ = parseFloat($.toFixed(this[JSq]));
        if (this[SyWd] != $) {
            this[SyWd] = $;
            this.IwS()
        }
    },
    getMinValue: function($) {
        return this[SyWd]
    },
    setIncrement: function($) {
        $ = parseFloat($);
        if (isNaN($)) return;
        if (this[T6W] != $) this[T6W] = $
    },
    getIncrement: function($) {
        return this[T6W]
    },
    setDecimalPlaces: function($) {
        $ = parseInt($);
        if (isNaN($) || $ < 0) return;
        this[JSq] = $
    },
    getDecimalPlaces: function($) {
        return this[JSq]
    },
    Sho: null,
    OY: function(D, B, C) {
        this.SPcT();
        this[XFB](this.value + D);
        this.Dkw();
        var A = this,
        _ = C,
        $ = new Date();
        this.Sho = setInterval(function() {
            A[XFB](A.value + D);
            A.Dkw();
            C--;
            if (C == 0 && B > 50) A.OY(D, B - 100, _ + 3);
            var E = new Date();
            if (E - $ > 500) A.SPcT();
            $ = E
        },
        B);
        $DT4(document, "mouseup", this.P5L9, this)
    },
    SPcT: function() {
        clearInterval(this.Sho);
        this.Sho = null
    },
    Rho: function($) {
        this._DownValue = this.getFormValue();
        if ($.spinType == "up") this.OY(this.increment, 230, 2);
        else this.OY( - this.increment, 230, 2)
    },
    MMM: function(_) {
        var $ = mini.Keyboard;
        switch (_.keyCode) {
        case $.Top:
            this[XFB](this.value + this[T6W]);
            this.Dkw();
            break;
        case $.Bottom:
            this[XFB](this.value - this[T6W]);
            this.Dkw();
            break
        }
    },
    XXZ: function(A) {
        if (this[Pa]()) return;
        var $ = A.wheelDelta;
        if (mini.isNull($)) $ = -A.detail * 24;
        var _ = this[T6W];
        if ($ < 0) _ = -_;
        this[XFB](this.value + _);
        this.Dkw();
        return false
    },
    P5L9: function($) {
        this.SPcT();
        EWw(document, "mouseup", this.P5L9, this);
        if (this._DownValue != this.getFormValue()) this.Dkw()
    },
    _E1: function(A) {
        var _ = this.getValue(),
        $ = parseFloat(this.ZKL.value);
        this[XFB]($);
        if (_ != this.getValue()) this.Dkw()
    },
    getAttrs: function($) {
        var _ = M6I[_s][XNM][If](this, $);
        mini[GRcU]($, _, ["minValue", "maxValue", "increment", "decimalPlaces"]);
        return _
    }
});
W4(M6I, "spinner");
S3 = function() {
    S3[_s][FjoU][If](this);
    this[XFB]("00:00:00")
};
WKkQ(S3, Ytb, {
    value: null,
    format: "H:mm:ss",
    uiCls: "mini-timespinner",
    J3dN: function() {
        this.buttons = [];
        var $ = this.createButton({
            type: "spin",
            cls: "mini-buttonedit-spinButton"
        });
        this.buttons.push($)
    },
    _initEvents: function() {
        S3[_s][UUs][If](this);
        Ehny(function() {
            this.on("buttonmousedown", this.Rho, this);
            $DT4(this.el, "mousewheel", this.XXZ, this);
            $DT4(this.ZKL, "keydown", this.MMM, this)
        },
        this)
    },
    setFormat: function($) {
        if (typeof $ != "string") return;
        var _ = ["H:mm:ss", "HH:mm:ss", "H:mm", "HH:mm", "H", "HH", "mm:ss"];
        if (_.indexOf($) == -1) return;
        if (this.format != $) {
            this.format = $;
            this.ZKL.value = this.getFormattedValue()
        }
    },
    getFormat: function() {
        return this.format
    },
    setValue: function($) {
        $ = mini.parseTime($, this.format);
        if (!$) $ = mini.parseTime("00:00:00", this.format);
        if (mini.isDate($)) $ = new Date($.getTime());
        if (mini.formatDate(this.value, "H:mm:ss") != mini.formatDate($, "H:mm:ss")) {
            this.value = $;
            this.ZKL.value = this.getFormattedValue();
            this.JNZM.value = this.getFormValue()
        }
    },
    getValue: function() {
        return this.value == null ? null: new Date(this.value.getTime())
    },
    getFormValue: function() {
        if (!this.value) return "";
        return mini.formatDate(this.value, "H:mm:ss")
    },
    getFormattedValue: function() {
        if (!this.value) return "";
        return mini.formatDate(this.value, this.format)
    },
    Jy1N: function(D, C) {
        var $ = this.getValue();
        if ($) switch (C) {
        case "hours":
            var A = $.getHours() + D;
            if (A > 23) A = 23;
            if (A < 0) A = 0;
            $.setHours(A);
            break;
        case "minutes":
            var B = $.getMinutes() + D;
            if (B > 59) B = 59;
            if (B < 0) B = 0;
            $.setMinutes(B);
            break;
        case "seconds":
            var _ = $.getSeconds() + D;
            if (_ > 59) _ = 59;
            if (_ < 0) _ = 0;
            $.setSeconds(_);
            break
        } else $ = "00:00:00";
        this[XFB]($)
    },
    Sho: null,
    OY: function(D, B, C) {
        this.SPcT();
        this.Jy1N(D, this.Gl);
        var A = this,
        _ = C,
        $ = new Date();
        this.Sho = setInterval(function() {
            A.Jy1N(D, A.Gl);
            C--;
            if (C == 0 && B > 50) A.OY(D, B - 100, _ + 3);
            var E = new Date();
            if (E - $ > 500) A.SPcT();
            $ = E
        },
        B);
        $DT4(document, "mouseup", this.P5L9, this)
    },
    SPcT: function() {
        clearInterval(this.Sho);
        this.Sho = null
    },
    Rho: function($) {
        this._DownValue = this.getFormValue();
        this.Gl = "hours";
        if ($.spinType == "up") this.OY(1, 230, 2);
        else this.OY( - 1, 230, 2)
    },
    P5L9: function($) {
        this.SPcT();
        EWw(document, "mouseup", this.P5L9, this);
        if (this._DownValue != this.getFormValue()) this.Dkw()
    },
    _E1: function(_) {
        var $ = this.getFormValue();
        this[XFB](this.ZKL.value);
        if ($ != this.getFormValue()) this.Dkw()
    },
    getAttrs: function($) {
        var _ = S3[_s][XNM][If](this, $);
        mini[GRcU]($, _, ["format"]);
        return _
    }
});
W4(S3, "timespinner");
PnU = function() {
    PnU[_s][FjoU][If](this);
    this.on("validation", this.M47, this)
};
WKkQ(PnU, Ytb, {
    width: 180,
    buttonText: "\u6d4f\u89c8...",
    limitType: "",
    limitTypeErrorText: "\u4e0a\u4f20\u6587\u4ef6\u683c\u5f0f\u4e3a\uff1a",
    readOnly: true,
    Zbw: 0,
    uiCls: "mini-htmlfile",
    _create: function() {
        PnU[_s][RsE][If](this);
        this.$H$ = mini.append(this.el, "<input type=\"file\" hideFocus class=\"mini-htmlfile-file\" name=\"" + this.name + "\" ContentEditable=false/>");
        $DT4(this.Jy, "mousemove", this.YMAS, this);
        $DT4(this.$H$, "change", this.BE18, this)
    },
    BE18: function($) {
        this.value = this.ZKL.value = this.$H$.value;
        this.Dkw()
    },
    YMAS: function(B) {
        var A = B.pageX,
        _ = B.pageY,
        $ = $mq(this.el);
        this.$H$.style.left = (A - $.x - 5) + "px";
        this.$H$.style.top = (_ - $.y - 5) + "px"
    },
    M47: function(B) {
        var A = B.value.split("."),
        $ = "*." + A[A.length - 1],
        _ = this.limitType.split(";");
        if (_.length > 0 && _.indexOf($) == -1) {
            B.errorText = this.limitTypeErrorText + this.limitType;
            B.isValid = false
        }
    },
    setName: function($) {
        this.name = $;
        mini.setAttr(this.$H$, "name", this.name)
    },
    getValue: function() {
        return this.ZKL.value
    },
    setButtonText: function($) {
        this.buttonText = $;
        this.updateButton(0, {
            html: $
        })
    },
    getButtonText: function() {
        return this.buttonText
    },
    setLimitType: function($) {
        this.limitType = $
    },
    getLimitType: function() {
        return this.limitType
    },
    J3dN: function() {
        this.buttons = [];
        var $ = this.createButton();
        $.html = this.buttonText;
        this.buttons.push($)
    },
    getAttrs: function($) {
        var _ = PnU[_s][XNM][If](this, $);
        mini[GRcU]($, _, ["limitType", "buttonText", "limitTypeErrorText"]);
        return _
    }
});
W4(PnU, "htmlfile");
GnW = function($) {
    GnW[_s][FjoU][If](this, $);
    this.on("validation", this.M47, this)
};
WKkQ(GnW, Ytb, {
    width: 180,
    buttonText: "\u6d4f\u89c8...",
    limitTypeErrorText: "\u4e0a\u4f20\u6587\u4ef6\u683c\u5f0f\u4e3a\uff1a",
    readOnly: true,
    Zbw: 0,
    limitSize: "",
    limitType: "",
    typesDescription: "\u4e0a\u4f20\u6587\u4ef6\u683c\u5f0f",
    uploadLimit: 0,
    queueLimit: "",
    flashUrl: "",
    uploadUrl: "",
    uploadOnSelect: false,
    uiCls: "mini-fileupload",
    _create: function() {
        GnW[_s][RsE][If](this);
        F7y(this.el, "mini-htmlfile");
        this.$H$ = mini.append(this.el, "<div></div>");
        this.uploadEl = this.$H$;
        $DT4(this.Jy, "mousemove", this.YMAS, this)
    },
    destroy: function($) {
        if (this.Jy) {
            mini[_LP](this.Jy);
            this.Jy = null
        }
        GnW[_s][HFtw][If](this, $)
    },
    J3dN: function() {
        this.buttons = [];
        var $ = this.createButton();
        $.html = this.buttonText;
        this.buttons.push($)
    },
    YMAS: function(A) {
        var $ = this;
        if (!this.swfUpload) {
            var B = new SWFUpload({
                file_post_name: this.name,
                upload_url: $.uploadUrl,
                flash_url: $.flashUrl,
                file_size_limit: $.limitSize,
                file_types: $.limitType,
                file_types_description: $.typesDescription,
                file_upload_limit: parseInt($.uploadLimit),
                file_queue_limit: $.queueLimit,
                file_queued_handler: mini.createDelegate(this.__on_file_queued, this),
                upload_error_handler: mini.createDelegate(this.__on_upload_error, this),
                upload_success_handler: mini.createDelegate(this.__on_upload_success, this),
                upload_complete_handler: mini.createDelegate(this.__on_upload_complete, this),
                button_placeholder: $.uploadEl,
                button_width: 1000,
                button_height: 20,
                button_window_mode: "transparent",
                debug: false
            });
            B.flashReady();
            this.swfUpload = B;
            var _ = this.swfUpload.movieElement;
            _.style.zIndex = 1000;
            _.style.position = "absolute";
            _.style.left = "0px";
            _.style.top = "0px";
            _.style.width = "100%";
            _.style.height = "20px"
        }
    },
    setLimitSize: function($) {
        this.limitSize = $
    },
    setLimitType: function($) {
        this.limitType = $
    },
    setTypesDescription: function($) {
        this.typesDescription = $
    },
    setUploadLimit: function($) {
        this.uploadLimit = $
    },
    setQueueLimit: function($) {
        this.queueLimit = $
    },
    setFlashUrl: function($) {
        this.flashUrl = $
    },
    setUploadUrl: function($) {
        this.uploadUrl = $
    },
    setName: function($) {
        this.name = $
    },
    startUpload: function($) {
        if (this.swfUpload) this.swfUpload.startUpload()
    },
    __on_file_queued: function($) {
        if (this.uploadOnSelect) this.swfUpload.startUpload();
        this[Woc]($.name)
    },
    __on_upload_success: function(_, $) {
        var A = {
            file: _,
            serverData: $
        };
        this.fire("uploadsuccess", A)
    },
    __on_upload_error: function($) {
        var _ = {
            file: $,
            fileName: fileName
        };
        this.fire("uploaderror", _)
    },
    __on_upload_complete: function($) {
        this.fire("uploadcomplete", $)
    },
    __fileError: function() {},
    getAttrs: function($) {
        var _ = GnW[_s][XNM][If](this, $);
        mini[GRcU]($, _, ["limitType", "limitSize", "flashUrl", "uploadUrl", "uploadLimit", "onuploadsuccess", "onuploaderror", "onuploadcomplete"]);
        mini[MTh]($, _, ["uploadOnSelect"]);
        return _
    }
});
W4(GnW, "fileupload");
SSh = function() {
    this.data = [];
    SSh[_s][FjoU][If](this);
    $DT4(this.ZKL, "mouseup", this.Bfl, this)
};
WKkQ(SSh, Wu6k, {
    allowInput: true,
    valueField: "id",
    textField: "text",
    delimiter: ",",
    multiSelect: false,
    data: [],
    grid: null,
    uiCls: "mini-lookup",
    destroy: function($) {
        if (this.grid) {
            this.grid.un("selectionchanged", this.XSD, this);
            this.grid.un("load", this.GLK, this);
            this.grid = null
        }
        SSh[_s][HFtw][If](this, $)
    },
    setMultiSelect: function($) {
        this[MWVQ] = $;
        if (this.grid) this.grid.setMultiSelect($)
    },
    setGrid: function($) {
        if (typeof $ == "string") {
            mini.parse($);
            $ = mini.get($)
        }
        this.grid = mini.getAndCreate($);
        if (this.grid) {
            this.grid.setMultiSelect(this[MWVQ]);
            this.grid.setCheckSelectOnLoad(false);
            this.grid.on("selectionchanged", this.XSD, this);
            this.grid.on("load", this.GLK, this)
        }
    },
    getGrid: function() {
        return this.grid
    },
    setValueField: function($) {
        this[SY0C] = $
    },
    getValueField: function() {
        return this[SY0C]
    },
    setTextField: function($) {
        this[XND] = $
    },
    getTextField: function() {
        return this[XND]
    },
    getItemValue: function($) {
        return String($[this.valueField])
    },
    getItemText: function($) {
        var _ = $[this.textField];
        return mini.isNull(_) ? "": String(_)
    },
    SmZ: function(A) {
        if (mini.isNull(A)) A = [];
        var B = [],
        C = [];
        for (var _ = 0,
        D = A.length; _ < D; _++) {
            var $ = A[_];
            if ($) {
                B.push(this[TILf]($));
                C.push(this[BH$]($))
            }
        }
        return [B.join(this.delimiter), C.join(this.delimiter)]
    },
    Tki: function(A) {
        var D = {};
        for (var $ = 0,
        B = A.length; $ < B; $++) {
            var _ = A[$],
            C = _[this.valueField];
            D[C] = _
        }
        return D
    },
    XSD: function(G) {
        var B = this.Tki(this.grid.getData()),
        C = this.Tki(this.grid.getSelecteds()),
        F = this.Tki(this.data);
        if (this[MWVQ] == false) {
            F = {};
            this.data = []
        }
        var A = {};
        for (var E in F) {
            var $ = F[E];
            if (B[E]) if (C[E]);
            else A[E] = $
        }
        for (var _ = this.data.length - 1; _ >= 0; _--) {
            $ = this.data[_],
            E = $[this.valueField];
            if (A[E]) this.data.removeAt(_)
        }
        for (E in C) {
            $ = C[E];
            if (!F[E]) this.data.push($)
        }
        var D = this.SmZ(this.data);
        this[XFB](D[0]);
        this[Woc](D[1]);
        this.Dkw()
    },
    GLK: function(H) {
        var C = this.value.split(this.delimiter),
        F = {};
        for (var $ = 0,
        D = C.length; $ < D; $++) {
            var G = C[$];
            F[G] = 1
        }
        var A = this.grid.getData(),
        B = [];
        for ($ = 0, D = A.length; $ < D; $++) {
            var _ = A[$],
            E = _[this.valueField];
            if (F[E]) B.push(_)
        }
        this.grid[M03](B)
    },
    doUpdate: function() {
        SSh[_s][SbW][If](this);
        this.ZKL[SXB] = true;
        this.el.style.cursor = "default"
    },
    ALEU: function($) {
        SSh[_s].ALEU[If](this, $);
        switch ($.keyCode) {
        case 46:
        case 8:
            break;
        case 37:
            break;
        case 39:
            break
        }
    },
    Bfl: function(C) {
        if (this[Pa]()) return;
        var _ = mini.getSelectRange(this.ZKL),
        A = _[0],
        B = _[1],
        $ = this.FX(A)
    },
    FX: function(E) {
        var _ = -1;
        if (this.text == "") return _;
        var C = this.text.split(this.delimiter),
        $ = 0;
        for (var A = 0,
        D = C.length; A < D; A++) {
            var B = C[A];
            if ($ < E && E <= $ + B.length) {
                _ = A;
                break
            }
            $ = $ + B.length + 1
        }
        return _
    },
    getAttrs: function($) {
        var _ = SSh[_s][XNM][If](this, $);
        mini[GRcU]($, _, ["grid", "valueField", "textField"]);
        mini[MTh]($, _, ["multiSelect"]);
        return _
    }
});
W4(SSh, "lookup");
MjTf = function() {
    MjTf[_s][FjoU][If](this);
    this.data = [];
    this[SbW]()
};
WKkQ(MjTf, Cfuc, {
    value: "",
    text: "",
    valueField: "id",
    textField: "text",
    url: "",
    delay: 250,
    allowInput: true,
    editIndex: 0,
    E0Ps: "mini-textboxlist-focus",
    XW: "mini-textboxlist-item-hover",
    BnF: "mini-textboxlist-item-selected",
    AiX: "mini-textboxlist-close-hover",
    uiCls: "mini-textboxlist",
    _create: function() {
        var A = "<table class=\"mini-textboxlist\" cellpadding=\"0\" cellspacing=\"0\"><tr ><td class=\"mini-textboxlist-border\"><ul></ul><a href=\"#\"></a><input type=\"hidden\"/></td></tr></table>",
        _ = document.createElement("div");
        _.innerHTML = A;
        this.el = _.firstChild;
        var $ = this.el.getElementsByTagName("td")[0];
        this.ulEl = $.firstChild;
        this.JNZM = $.lastChild;
        this.focusEl = $.childNodes[1]
    },
    destroy: function($) {
        if (this.isShowPopup) this[AXKv]();
        EWw(document, "mousedown", this.Gmv1, this);
        MjTf[_s][HFtw][If](this, $)
    },
    _initEvents: function() {
        MjTf[_s][UUs][If](this);
        $DT4(this.el, "mousemove", this.YMAS, this);
        $DT4(this.el, "mouseout", this.FmPu, this);
        $DT4(this.el, "mousedown", this.U8z, this);
        $DT4(this.el, "click", this.ZmC, this);
        $DT4(this.el, "keydown", this.MMM, this);
        $DT4(document, "mousedown", this.Gmv1, this)
    },
    Gmv1: function($) {
        if (this[Pa]() || this.allowInput == false) return false;
        if (this.isShowPopup) if (!YCJ(this.popup.el, $.target)) this[AXKv]();
        if (this.N8T) if (this[ZZJ]($) == false) {
            this[Ju6](null, false);
            this.showInput(false);
            this[DY](this.E0Ps);
            this.N8T = false
        }
    },
    errorIconEl: null,
    getErrorIconEl: function() {
        if (!this.Wa) {
            var _ = this.el.rows[0],
            $ = _.insertCell(1);
            $.style.cssText = "width:18px;vertical-align:top;";
            $.innerHTML = "<div class=\"mini-errorIcon\"></div>";
            this.Wa = $.firstChild
        }
        return this.Wa
    },
    _Rr: function() {
        if (this.Wa) jQuery(this.Wa.parentNode).remove();
        this.Wa = null
    },
    doLayout: function() {
        if (this.canLayout() == false) return;
        MjTf[_s][A6_][If](this);
        if (this[Pa]() || this.allowInput == false) this.AST[SXB] = true;
        else this.AST[SXB] = false
    },
    doUpdate: function() {
        if (this.O7Z) clearInterval(this.O7Z);
        if (this.AST) EWw(this.AST, "keydown", this.ALEU, this);
        var G = [],
        F = this.uid;
        for (var A = 0,
        E = this.data.length; A < E; A++) {
            var _ = this.data[A],
            C = F + "$text$" + A,
            B = _[this.textField];
            if (mini.isNull(B)) B = "";
            G[G.length] = "<li id=\"" + C + "\" class=\"mini-textboxlist-item\">";
            G[G.length] = B;
            G[G.length] = "<span class=\"mini-textboxlist-close\"></span></li>"
        }
        var $ = F + "$input";
        G[G.length] = "<li id=\"" + $ + "\" class=\"mini-textboxlist-inputLi\"><input class=\"mini-textboxlist-input\" type=\"text\" autocomplete=\"off\"></li>";
        this.ulEl.innerHTML = G.join("");
        this.editIndex = this.data.length;
        if (this.editIndex < 0) this.editIndex = 0;
        this.inputLi = this.ulEl.lastChild;
        this.AST = this.inputLi.firstChild;
        $DT4(this.AST, "keydown", this.ALEU, this);
        var D = this;
        this.AST.onkeyup = function() {
            D._3SF()
        };
        D.O7Z = null;
        D.Ovj = D.AST.value;
        this.AST.onfocus = function() {
            D.O7Z = setInterval(function() {
                if (D.Ovj != D.AST.value) {
                    D.UJ();
                    D.Ovj = D.AST.value
                }
            },
            10);
            D[Ze](D.E0Ps);
            D.N8T = true
        };
        this.AST.onblur = function() {
            clearInterval(D.O7Z)
        }
    },
    RcL: function(_) {
        var A = O21(_.target, "mini-textboxlist-item");
        if (A) {
            var $ = A.id.split("$"),
            B = $[$.length - 1];
            return this.data[B]
        }
    },
    getItem: function($) {
        if (typeof $ == "number") return this.data[$];
        if (typeof $ == "object") return $
    },
    getItemEl: function(_) {
        var $ = this.data.indexOf(_),
        A = this.uid + "$text$" + $;
        return document.getElementById(A)
    },
    hoverItem: function($, A) {
        this.blurItem();
        var _ = this.getItemEl($);
        F7y(_, this.XW);
        if (A && DD(A.target, "mini-textboxlist-close")) F7y(A.target, this.AiX)
    },
    blurItem: function() {
        var _ = this.data.length;
        for (var A = 0,
        C = _; A < C; A++) {
            var $ = this.data[A],
            B = this.getItemEl($);
            if (B) {
                Lq(B, this.XW);
                Lq(B.lastChild, this.AiX)
            }
        }
    },
    showInput: function(A) {
        this[Ju6](null);
        if (mini.isNumber(A)) this.editIndex = A;
        else this.editIndex = this.data.length;
        if (this.editIndex < 0) this.editIndex = 0;
        if (this.editIndex > this.data.length) this.editIndex = this.data.length;
        var B = this.inputLi;
        B.style.display = "block";
        if (mini.isNumber(A) && A < this.data.length) {
            var _ = this.data[A],
            $ = this.getItemEl(_);
            jQuery($).before(B)
        } else this.ulEl.appendChild(B);
        if (A !== false) setTimeout(function() {
            try {
                B.firstChild.focus();
                mini.selectRange(B.firstChild, 100)
            } catch($) {}
        },
        10);
        else {
            this.lastInputText = "";
            this.AST.value = ""
        }
        return B
    },
    select: function(_) {
        _ = this[YKh](_);
        if (this.Wpf) {
            var $ = this.getItemEl(this.Wpf);
            Lq($, this.BnF)
        }
        this.Wpf = _;
        if (this.Wpf) {
            $ = this.getItemEl(this.Wpf);
            F7y($, this.BnF)
        }
        var A = this;
        if (this.Wpf) this.focusEl.focus();
        if (this.Wpf) {
            A[Ze](A.E0Ps);
            A.N8T = true
        }
    },
    QWe: function() {
        var _ = this.UqD_[RgBO](),
        $ = this.editIndex;
        if (_) {
            _ = mini.clone(_);
            this.insertItem($, _)
        }
    },
    insertItem: function(_, $) {
        this.data.insert(_, $);
        var B = this.getText(),
        A = this.getValue();
        this[XFB](A, false);
        this[Woc](B, false);
        this.Aqu();
        this[SbW]();
        this.showInput(_ + 1);
        this.Dkw()
    },
    removeItem: function(_) {
        if (!_) return;
        var $ = this.getItemEl(_);
        mini[FXFd]($);
        this.data.remove(_);
        var B = this.getText(),
        A = this.getValue();
        this[XFB](A, false);
        this[Woc](B, false);
        this.Dkw()
    },
    Aqu: function() {
        var C = (this.text ? this.text: "").split(","),
        B = (this.value ? this.value: "").split(",");
        if (B[0] == "") B = [];
        var _ = B.length;
        this.data.length = _;
        for (var A = 0,
        D = _; A < D; A++) {
            var $ = this.data[A];
            if (!$) {
                $ = {};
                this.data[A] = $
            }
            $[this.textField] = !mini.isNull(C[A]) ? C[A] : "";
            $[this.valueField] = !mini.isNull(B[A]) ? B[A] : ""
        }
        this.value = this.getValue();
        this.text = this.getText()
    },
    getInputText: function() {
        return this.AST ? this.AST.value: ""
    },
    getText: function() {
        var C = [];
        for (var _ = 0,
        A = this.data.length; _ < A; _++) {
            var $ = this.data[_],
            B = $[this.textField];
            if (mini.isNull(B)) B = "";
            B = B.replace(",", "\uff0c");
            C.push(B)
        }
        return C.join(",")
    },
    getValue: function() {
        var B = [];
        for (var _ = 0,
        A = this.data.length; _ < A; _++) {
            var $ = this.data[_];
            B.push($[this.valueField])
        }
        return B.join(",")
    },
    setName: function($) {
        if (this.name != $) {
            this.name = $;
            this.JNZM.name = $
        }
    },
    setValue: function($) {
        if (mini.isNull($)) $ = "";
        if (this.value != $) {
            this.value = $;
            this.JNZM.value = $;
            this.Aqu();
            this[SbW]()
        }
    },
    setText: function($) {
        if (mini.isNull($)) $ = "";
        if (this.text !== $) {
            this.text = $;
            this.Aqu();
            this[SbW]()
        }
    },
    setValueField: function($) {
        this[SY0C] = $
    },
    getValueField: function() {
        return this[SY0C]
    },
    setTextField: function($) {
        this[XND] = $
    },
    getTextField: function() {
        return this[XND]
    },
    setAllowInput: function($) {
        this.allowInput = $;
        this[A6_]()
    },
    getAllowInput: function() {
        return this.allowInput
    },
    setUrl: function($) {
        this.url = $
    },
    getUrl: function() {
        return this.url
    },
    setPopupHeight: function($) {
        this[IQ] = $
    },
    getPopupHeight: function() {
        return this[IQ]
    },
    setPopupMinHeight: function($) {
        this[VQb] = $
    },
    getPopupMinHeight: function() {
        return this[VQb]
    },
    setPopupMaxHeight: function($) {
        this[UTyy] = $
    },
    getPopupMaxHeight: function() {
        return this[UTyy]
    },
    _3SF: function() {
        if (this[Gf]() == false) return;
        var _ = this.getInputText(),
        B = mini.measureText(this.AST, _),
        $ = B.width > 20 ? B.width + 4 : 20,
        A = ZmL(this.el, true);
        if ($ > A - 15) $ = A - 15;
        this.AST.style.width = $ + "px"
    },
    UJ: function(_) {
        var $ = this;
        setTimeout(function() {
            $._3SF()
        },
        1);
        this[Pyu]("loading");
        this.LwL();
        this.delayTimer = setTimeout(function() {
            var _ = $.AST.value;
            $.WuW()
        },
        this.delay)
    },
    WuW: function() {
        if (this[Gf]() == false) return;
        var _ = this.getInputText(),
        A = this,
        $ = this.UqD_.getData(),
        B = {
            key: _,
            value: this.getValue(),
            text: this.getText()
        },
        C = this.url,
        E = typeof C == "function" ? C: window[C];
        if (typeof E == "function") C = E(this);
        var D = {
            url: C,
            async: true,
            data: B,
            type: "GET",
            cache: false,
            dataType: "text",
            cancel: false
        };
        this.fire("beforeload", D);
        if (D.cancel) return;
        mini.copyTo(D, {
            success: function($) {
                var _ = mini.decode($);
                A.UqD_[_CY](_);
                A[Pyu]();
                A.UqD_.IRSK(0, true);
                A.fire("load")
            },
            error: function($, B, _) {
                A[Pyu]("error")
            }
        });
        A.F6 = jQuery.ajax(D)
    },
    LwL: function() {
        if (this.delayTimer) {
            clearTimeout(this.delayTimer);
            this.delayTimer = null
        }
        if (this.F6) this.F6.abort()
    },
    within: function($) {
        if (YCJ(this.el, $.target)) return true;
        if (this[Pyu] && this.popup && this.popup[ZZJ]($)) return true;
        return false
    },
    popupLoadingText: "<span class='mini-textboxlist-popup-loading'>������, ���Ժ�...</span>",
    popupErrorText: "<span class='mini-textboxlist-popup-error'>Error</span>",
    popupEmptyText: "<span class='mini-textboxlist-popup-noresult'>No Result</span>",
    isShowPopup: false,
    popupHeight: "",
    popupMinHeight: 30,
    popupMaxHeight: 150,
    IS: function() {
        if (!this.popup) {
            this.popup = new ZcsR();
            this.popup[Ze]("mini-textboxlist-popup");
            this.popup.setStyle("position:absolute;left:0;top:0;");
            this.popup[CN] = true;
            this.popup[YZU](this[SY0C]);
            this.popup.setTextField(this[XND]);
            this.popup[NF](document.body);
            this.popup.on("itemclick",
            function($) {
                this[AXKv]();
                this.QWe()
            },
            this)
        }
        this.UqD_ = this.popup;
        return this.popup
    },
    showPopup: function($) {
        this.isShowPopup = true;
        var _ = this.IS();
        _.el.style.zIndex = mini.getMaxZIndex();
        var B = this.UqD_;
        B[V6FA] = this.popupEmptyText;
        if ($ == "loading") {
            B[V6FA] = this.popupLoadingText;
            this.UqD_[_CY]([])
        } else if ($ == "error") {
            B[V6FA] = this.popupLoadingText;
            this.UqD_[_CY]([])
        }
        this.UqD_[SbW]();
        var A = this.getBox(),
        D = A.x,
        C = A.y + A.height;
        this.popup.el.style.display = "block";
        mini[_8Wt](_.el, -1000, -1000);
        this.popup[Id](A.width);
        this.popup[ORwC](this[IQ]);
        if (this.popup[SeC]() < this[VQb]) this.popup[ORwC](this[VQb]);
        if (this.popup[SeC]() > this[UTyy]) this.popup[ORwC](this[UTyy]);
        mini[_8Wt](_.el, D, C)
    },
    hidePopup: function() {
        this.isShowPopup = false;
        if (this.popup) this.popup.el.style.display = "none"
    },
    YMAS: function(_) {
        if (this.enabled == false) return;
        var $ = this.RcL(_);
        if (!$) {
            this.blurItem();
            return
        }
        this.hoverItem($, _)
    },
    FmPu: function($) {
        this.blurItem()
    },
    ZmC: function(_) {
        if (this.enabled == false) return;
        if (this[Pa]() || this.allowInput == false) return;
        var $ = this.RcL(_);
        if (!$) {
            if (O21(_.target, "mini-textboxlist-input"));
            else this.showInput();
            return
        }
        this.focusEl.focus();
        this[Ju6]($);
        if (_ && DD(_.target, "mini-textboxlist-close")) this.removeItem($)
    },
    MMM: function(B) {
        if (this[Pa]() || this.allowInput == false) return false;
        var $ = this.data.indexOf(this.Wpf),
        _ = this;
        function A() {
            var A = _.data[$];
            _.removeItem(A);
            A = _.data[$];
            if (!A) A = _.data[$ - 1];
            _[Ju6](A);
            if (!A) _.showInput()
        }
        switch (B.keyCode) {
        case 8:
            B.preventDefault();
            A();
            break;
        case 37:
        case 38:
            this[Ju6](null);
            this.showInput($);
            break;
        case 39:
        case 40:
            $ += 1;
            this[Ju6](null);
            this.showInput($);
            break;
        case 46:
            A();
            break
        }
    },
    ALEU: function(G) {
        if (this[Pa]() || this.allowInput == false) return false;
        G.stopPropagation();
        if (this[Pa]() || this.allowInput == false) return;
        var E = mini.getSelectRange(this.AST),
        B = E[0],
        D = E[1],
        F = this.AST.value.length,
        C = B == D && B == 0,
        A = B == D && D == F;
        if (this[Pa]() || this.allowInput == false) G.preventDefault();
        if (G.keyCode == 9) {
            this[AXKv]();
            return
        }
        if (G.keyCode == 16 || G.keyCode == 17 || G.keyCode == 18) return;
        switch (G.keyCode) {
        case 13:
            if (this.isShowPopup) {
                G.preventDefault();
                var _ = this.UqD_.getFocusedItem();
                if (_) this.UqD_[Gg](_);
                this.lastInputText = this.text;
                this[AXKv]();
                this.QWe()
            }
            break;
        case 27:
            G.preventDefault();
            this[AXKv]();
            break;
        case 8:
            if (C) G.preventDefault();
        case 37:
            if (C) if (this.isShowPopup) this[AXKv]();
            else if (this.editIndex > 0) {
                var $ = this.editIndex - 1;
                if ($ < 0) $ = 0;
                if ($ >= this.data.length) $ = this.data.length - 1;
                this.showInput(false);
                this[Ju6]($)
            }
            break;
        case 39:
            if (A) if (this.isShowPopup) this[AXKv]();
            else if (this.editIndex <= this.data.length - 1) {
                $ = this.editIndex;
                this.showInput(false);
                this[Ju6]($)
            }
            break;
        case 38:
            G.preventDefault();
            if (this.isShowPopup) {
                $ = -1,
                _ = this.UqD_.getFocusedItem();
                if (_) $ = this.UqD_.indexOf(_);
                $--;
                if ($ < 0) $ = 0;
                this.UqD_.IRSK($, true)
            }
            break;
        case 40:
            G.preventDefault();
            if (this.isShowPopup) {
                $ = -1,
                _ = this.UqD_.getFocusedItem();
                if (_) $ = this.UqD_.indexOf(_);
                $++;
                if ($ < 0) $ = 0;
                if ($ >= this.UqD_.getCount()) $ = this.UqD_.getCount() - 1;
                this.UqD_.IRSK($, true)
            } else this.UJ(true);
            break;
        default:
            break
        }
    },
    focus: function() {
        try {
            this.AST.focus()
        } catch($) {}
    },
    blur: function() {
        try {
            this.AST.blur()
        } catch($) {}
    },
    getAttrs: function($) {
        var A = J76[_s][XNM][If](this, $),
        _ = jQuery($);
        mini[GRcU]($, A, ["value", "text", "valueField", "textField", "url", "popupHeight"]);
        mini[MTh]($, A, ["allowInput"]);
        mini[Ova]($, A, ["popupMinHeight", "popupMaxHeight"]);
        return A
    }
});
W4(MjTf, "textboxlist");
Suh = function() {
    Suh[_s][FjoU][If](this);
    this.updateButton("popup", {
        visible: false
    });
    var $ = this;
    $.O7Z = null;
    this.ZKL.onfocus = function() {
        $.Ovj = $.ZKL.value;
        $.O7Z = setInterval(function() {
            if ($.Ovj != $.ZKL.value) {
                $.EBRc();
                $.Ovj = $.ZKL.value;
                if ($.ZKL.value == "" && $.value != "") {
                    $[XFB]("");
                    $.Dkw()
                }
            }
        },
        10)
    };
    this.ZKL.onblur = function() {
        clearInterval($.O7Z);
        if (!$.isShowPopup()) if ($.Ovj != $.ZKL.value) alert(1)
    }
};
WKkQ(Suh, MrgM, {
    url: "",
    allowInput: true,
    delay: 250,
    uiCls: "mini-autocomplete",
    setUrl: function($) {
        this.url = $
    },
    setValue: function($) {
        if (this.value != $) {
            this.value = $;
            this.JNZM.value = this.value
        }
    },
    setText: function($) {
        if (this.text != $) {
            this.text = $;
            this.Ovj = $
        }
        this.ZKL.value = this.text
    },
    popupLoadingText: "<span class='mini-textboxlist-popup-loading'>������, ���Ժ�...</span>",
    popupErrorText: "<span class='mini-textboxlist-popup-error'>Error</span>",
    popupEmptyText: "<span class='mini-textboxlist-popup-noresult'>No Result</span>",
    showPopup: function($) {
        var _ = this.getPopup(),
        A = this.UqD_;
        A[CN] = true;
        A[V6FA] = this.popupEmptyText;
        if ($ == "loading") {
            A[V6FA] = this.popupLoadingText;
            this.UqD_[_CY]([])
        } else if ($ == "error") {
            A[V6FA] = this.popupLoadingText;
            this.UqD_[_CY]([])
        }
        this.UqD_[SbW]();
        Suh[_s][Pyu][If](this)
    },
    ALEU: function(C) {
        this.fire("keydown", {
            htmlEvent: C
        });
        if (C.keyCode == 8 && (this[Pa]() || this.allowInput == false)) return false;
        if (C.keyCode == 9) {
            this[AXKv]();
            return
        }
        switch (C.keyCode) {
        case 27:
            if (this.isShowPopup()) C.stopPropagation();
            this[AXKv]();
            break;
        case 13:
            if (this.isShowPopup()) {
                C.preventDefault();
                C.stopPropagation();
                var _ = this.UqD_.getFocusedIndex();
                if (_ != -1) {
                    var $ = this.UqD_.getAt(_),
                    B = this.UqD_.SmZ([$]),
                    A = B[0];
                    this[XFB](A);
                    this[Woc](B[1]);
                    this.Dkw();
                    this[AXKv]()
                }
            } else this.fire("enter");
            break;
        case 37:
            break;
        case 38:
            _ = this.UqD_.getFocusedIndex();
            if (_ == -1) {
                _ = 0;
                if (!this[MWVQ]) {
                    $ = this.UqD_.findItems(this.value)[0];
                    if ($) _ = this.UqD_.indexOf($)
                }
            }
            if (this.isShowPopup()) if (!this[MWVQ]) {
                _ -= 1;
                if (_ < 0) _ = 0;
                this.UqD_.IRSK(_)
            }
            break;
        case 39:
            break;
        case 40:
            _ = this.UqD_.getFocusedIndex();
            if (this.isShowPopup()) {
                if (!this[MWVQ]) {
                    _ += 1;
                    if (_ > this.UqD_.getCount() - 1) _ = this.UqD_.getCount() - 1;
                    this.UqD_.IRSK(_)
                }
            } else this.EBRc(this.ZKL.value);
            break;
        default:
            break
        }
    },
    EBRc: function(_) {
        var $ = this;
        if (this._queryTimer) {
            clearTimeout(this._queryTimer);
            this._queryTimer = null
        }
        this._queryTimer = setTimeout(function() {
            var _ = $.ZKL.value;
            $.WuW(_)
        },
        this.delay);
        this[Pyu]("loading")
    },
    WuW: function($) {
        if (this.F6) this.F6.abort();
        var _ = this;
        this.F6 = jQuery.ajax({
            url: this.url,
            data: {
                key: $
            },
            async: true,
            cache: false,
            dataType: "text",
            success: function($) {
                var A = mini.decode($);
                _.UqD_[_CY](A);
                _[Pyu]();
                _.UqD_.IRSK(0, true);
                _.fire("load")
            },
            error: function($, B, A) {
                _[Pyu]("error")
            }
        })
    },
    getAttrs: function($) {
        var A = Suh[_s][XNM][If](this, $),
        _ = jQuery($);
        return A
    }
});
W4(Suh, "autocomplete");
mini.Form = function($) {
    this.el = Lr0($);
    if (!this.el) throw new Error("form element not null");
    mini.Form[_s][FjoU][If](this)
};
WKkQ(mini.Form, B9W, {
    el: null,
    getFields: function() {
        if (!this.el) return [];
        var $ = mini.findControls(function($) {
            if (!$.el || $.formField != true) return false;
            if (YCJ(this.el, $.el)) return true;
            return false
        },
        this);
        return $
    },
    getFieldsMap: function() {
        var B = this.getFields(),
        A = {};
        for (var $ = 0,
        C = B.length; $ < C; $++) {
            var _ = B[$];
            if (_.name) A[_.name] = _
        }
        return A
    },
    getField: function($) {
        if (!this.el) return null;
        return mini.getbyName($, this.el)
    },
    getData: function(B) {
        var A = B ? "getFormValue": "getValue",
        $ = this.getFields(),
        D = {};
        for (var _ = 0,
        E = $.length; _ < E; _++) {
            var C = $[_],
            F = C[A];
            if (!F) continue;
            if (C.name) D[C.name] = F[If](C)
        }
        return D
    },
    setData: function(D, _) {
        if (typeof D != "object") D = {};
        var A = this.getFieldsMap();
        for (var B in A) {
            var $ = A[B];
            if (!$ || !$[XFB]) continue;
            var C = D[B];
            if (C === undefined && _ === false) continue;
            if (C === null) C = "";
            $[XFB](C)
        }
    },
    reset: function() {
        var $ = this.getFields();
        for (var _ = 0,
        B = $.length; _ < B; _++) {
            var A = $[_];
            if (!A[XFB]) continue;
            A[XFB](A[JXk])
        }
        this.setIsValid(true)
    },
    clear: function() {
        var $ = this.getFields();
        for (var _ = 0,
        B = $.length; _ < B; _++) {
            var A = $[_];
            if (!A[XFB]) continue;
            A[XFB]("")
        }
        this.setIsValid(true)
    },
    validate: function(C) {
        var $ = this.getFields();
        for (var _ = 0,
        D = $.length; _ < D; _++) {
            var A = $[_];
            if (!A[NGT6]) continue;
            var B = A[NGT6]();
            if (B == false && C === false) break
        }
        return this.isValid()
    },
    setIsValid: function(B) {
        var $ = this.getFields();
        for (var _ = 0,
        C = $.length; _ < C; _++) {
            var A = $[_];
            if (!A.setIsValid) continue;
            A.setIsValid(B)
        }
    },
    isValid: function() {
        var $ = this.getFields();
        for (var _ = 0,
        B = $.length; _ < B; _++) {
            var A = $[_];
            if (!A.isValid) continue;
            if (A.isValid() == false) return false
        }
        return true
    },
    getErrorTexts: function() {
        var A = [],
        _ = this.getErrors();
        for (var $ = 0,
        C = _.length; $ < C; $++) {
            var B = _[$];
            A.push(B.errorText)
        }
        return A
    },
    getErrors: function() {
        var A = [],
        $ = this.getFields();
        for (var _ = 0,
        C = $.length; _ < C; _++) {
            var B = $[_];
            if (!B.isValid) continue;
            if (B.isValid() == false) A.push(B)
        }
        return A
    },
    mask: function($) {
        if (typeof $ == "string") $ = {
            html: $
        };
        $ = $ || {};
        $.el = this.el;
        if (!$.cls) $.cls = this.JsYp;
        mini.mask($)
    },
    unmask: function() {
        mini.unmask(this.el)
    },
    JsYp: "mini-mask-loading",
    loadingMsg: "������, ���Ժ�...",
    loading: function() {
        this.mask(this.loadingMsg)
    }
});
Mb = function() {
    Mb[_s][FjoU][If](this)
};
WKkQ(Mb, R0pW, {
    style: "",
    uiCls: "mini-fit",
    _create: function() {
        this.el = document.createElement("div");
        this.el.className = "mini-fit";
        this.Zp5 = this.el
    },
    _initEvents: function() {},
    doLayout: function() {
        if (!this.canLayout()) return;
        var _ = this.el.parentNode,
        A = mini[OJy](_),
        B = YiC_(_);
        for (var $ = 0,
        G = A.length; $ < G; $++) {
            var E = A[$];
            if (E == this.el) continue;
            var D = YiC_(E);
            B -= D
        }
        var F = SqrI(this.el),
        C = SqrI(this.el),
        H = ZD(this.el);
        B = B - H.top - H.bottom;
        if (jQuery.boxModel) B = B - C.top - C.bottom - F.top - F.bottom;
        this.el.style.height = B + "px";
        A = mini[OJy](this.el);
        for ($ = 0, G = A.length; $ < G; $++) {
            E = A[$];
            mini.layout(E)
        }
    },
    set_bodyParent: function($) {
        if (!$) return;
        var _ = this.Zp5,
        A = $;
        while (A.firstChild) _.appendChild(A.firstChild);
        this[A6_]()
    },
    getAttrs: function($) {
        var _ = Mb[_s][XNM][If](this, $);
        _._bodyParent = $;
        return _
    }
});
W4(Mb, "fit");
Kt1 = function() {
    this.J3dN();
    Kt1[_s][FjoU][If](this);
    if (this.url) this.setUrl(this.url)
};
WKkQ(Kt1, R0pW, {
    width: 250,
    title: "",
    iconCls: "",
    iconStyle: "",
    url: "",
    refreshOnExpand: false,
    maskOnLoad: true,
    showCollapseButton: false,
    showCloseButton: false,
    closeAction: "display",
    showHeader: true,
    showToolbar: false,
    showFooter: false,
    headerCls: "",
    headerStyle: "",
    bodyCls: "",
    bodyStyle: "",
    footerCls: "",
    footerStyle: "",
    toolbarCls: "",
    toolbarStyle: "",
    set: function(_) {
        if (typeof _ == "string") return this;
        var A = this.Wk;
        this.Wk = false;
        var C = _.toolbar;
        delete _.toolbar;
        var $ = _.footer;
        delete _.footer;
        var B = _.url;
        delete _.url;
        Kt1[_s].set[If](this, _);
        if (C) this.setToolbar(C);
        if ($) this.setFooter($);
        if (B) this.setUrl(B);
        this.Wk = A;
        this[A6_]();
        return this
    },
    uiCls: "mini-panel",
    _create: function() {
        this.el = document.createElement("div");
        this.el.className = "mini-panel";
        var _ = "<div class=\"mini-panel-border\">" + "<div class=\"mini-panel-header\" ><div class=\"mini-panel-header-inner\" ><span class=\"mini-panel-icon\"></span><div class=\"mini-panel-title\" ></div><div class=\"mini-tools\" ></div></div></div>" + "<div class=\"mini-panel-viewport\">" + "<div class=\"mini-panel-toolbar\"></div>" + "<div class=\"mini-panel-body\" ></div>" + "<div class=\"mini-panel-footer\"></div>" + "<div class=\"mini-panel-resizeGrid\"></div>" + "</div>" + "</div>";
        this.el.innerHTML = _;
        this.WXF = this.el.firstChild;
        this.ZvT = this.WXF.firstChild;
        this.NlU0 = this.WXF.lastChild;
        this.Q$ = mini.byClass("mini-panel-toolbar", this.el);
        this.Zp5 = mini.byClass("mini-panel-body", this.el);
        this.Gr = mini.byClass("mini-panel-footer", this.el);
        this.Zes = mini.byClass("mini-panel-resizeGrid", this.el);
        var $ = mini.byClass("mini-panel-header-inner", this.el);
        this.GT = mini.byClass("mini-panel-icon", this.el);
        this.FE$W = mini.byClass("mini-panel-title", this.el);
        this._L87 = mini.byClass("mini-tools", this.el);
        _r(this.Zp5, this.bodyStyle);
        this[SbW]()
    },
    _initEvents: function() {
        Ehny(function() {
            $DT4(this.el, "click", this.ZmC, this)
        },
        this)
    },
    doUpdate: function() {
        this.FE$W.innerHTML = this.title;
        this.GT.style.display = (this.iconCls || this[Wt3]) ? "inline": "none";
        this.GT.className = "mini-panel-icon " + this.iconCls;
        _r(this.GT, this[Wt3]);
        this.ZvT.style.display = this.showHeader ? "": "none";
        this.Q$.style.display = this[JL] ? "": "none";
        this.Gr.style.display = this[CmkD] ? "": "none";
        var A = "";
        for (var $ = this.buttons.length - 1; $ >= 0; $--) {
            var _ = this.buttons[$];
            A += "<span id=\"" + $ + "\" class=\"" + _.cls + " " + (_.enabled ? "": "mini-disabled") + "\" style=\"" + _.style + ";" + (_.visible ? "": "display:none;") + "\"></span>"
        }
        this._L87.innerHTML = A;
        this[A6_]()
    },
    count: 1,
    doLayout: function() {
        if (!this.canLayout()) return;
        this.Zes.style.display = this[T_s] ? "": "none";
        this.Zp5.style.height = "";
        this.Zp5.style.width = "";
        this.ZvT.style.width = "";
        this.NlU0.style.width = "";
        var F = this[Rol](),
        C = this[Rv](),
        _ = SqrI(this.Zp5),
        G = MWQ(this.Zp5),
        J = ZD(this.Zp5),
        $ = this[R5Kf](true),
        E = $;
        $ = $ - J.left - J.right;
        if (jQuery.boxModel) $ = $ - _.left - _.right - G.left - G.right;
        if ($ < 0) $ = 0;
        this.Zp5.style.width = $ + "px";
        $ = E;
        this.ZvT.style.width = $ + "px";
        this.Q$.style.width = $ + "px";
        this.Gr.style.width = "auto";
        if (!F) {
            var I = MWQ(this.WXF),
            A = this[SeC](true),
            B = this.showHeader ? jQuery(this.ZvT).outerHeight() : 0,
            D = this[JL] ? jQuery(this.Q$).outerHeight() : 0,
            H = this[CmkD] ? jQuery(this.Gr).outerHeight() : 0;
            this.NlU0.style.height = (A - B) + "px";
            A = A - B - D - H;
            if (jQuery.boxModel) A = A - _.top - _.bottom - G.top - G.bottom;
            A = A - J.top - J.bottom;
            if (A < 0) A = 0;
            this.Zp5.style.height = A + "px"
        }
        mini.layout(this.WXF)
    },
    setHeaderStyle: function($) {
        this.headerStyle = $;
        _r(this.ZvT, $);
        this[A6_]()
    },
    getHeaderStyle: function() {
        return this.headerStyle
    },
    setBodyStyle: function($) {
        this.bodyStyle = $;
        _r(this.Zp5, $);
        this[A6_]()
    },
    getBodyStyle: function() {
        return this.bodyStyle
    },
    setToolbarStyle: function($) {
        this.toolbarStyle = $;
        _r(this.Q$, $);
        this[A6_]()
    },
    getToolbarStyle: function() {
        return this.toolbarStyle
    },
    setFooterStyle: function($) {
        this.footerStyle = $;
        _r(this.Gr, $);
        this[A6_]()
    },
    getFooterStyle: function() {
        return this.footerStyle
    },
    setHeaderCls: function($) {
        jQuery(this.ZvT)[Vow](this.headerCls);
        jQuery(this.ZvT)[CeSH]($);
        this.headerCls = $;
        this[A6_]()
    },
    getHeaderCls: function() {
        return this.headerCls
    },
    setBodyCls: function($) {
        jQuery(this.Zp5)[Vow](this.bodyCls);
        jQuery(this.Zp5)[CeSH]($);
        this.bodyCls = $;
        this[A6_]()
    },
    getBodyCls: function() {
        return this.bodyCls
    },
    setToolbarCls: function($) {
        jQuery(this.Q$)[Vow](this.toolbarCls);
        jQuery(this.Q$)[CeSH]($);
        this.toolbarCls = $;
        this[A6_]()
    },
    getToolbarCls: function() {
        return this.toolbarCls
    },
    setFooterCls: function($) {
        jQuery(this.Gr)[Vow](this.footerCls);
        jQuery(this.Gr)[CeSH]($);
        this.footerCls = $;
        this[A6_]()
    },
    getFooterCls: function() {
        return this.footerCls
    },
    setTitle: function($) {
        this.title = $;
        this[SbW]()
    },
    getTitle: function() {
        return this.title
    },
    setIconCls: function($) {
        this.iconCls = $;
        this[SbW]()
    },
    getIconCls: function() {
        return this.iconCls
    },
    setShowCloseButton: function($) {
        this[XZ] = $;
        var _ = this.getButton("close");
        _.visible = $;
        if (_) this[SbW]()
    },
    getShowCloseButton: function() {
        return this[XZ]
    },
    setCloseAction: function($) {
        this[V_g] = $
    },
    getCloseAction: function() {
        return this[V_g]
    },
    setShowCollapseButton: function($) {
        this[KYp] = $;
        var _ = this.getButton("collapse");
        _.visible = $;
        if (_) this[SbW]()
    },
    getShowCollapseButton: function() {
        return this[KYp]
    },
    setShowHeader: function($) {
        this.showHeader = $;
        this[SbW]()
    },
    getShowHeader: function() {
        return this.showHeader
    },
    setShowToolbar: function($) {
        this[JL] = $;
        this[SbW]()
    },
    getShowToolbar: function() {
        return this[JL]
    },
    setShowFooter: function($) {
        this[CmkD] = $;
        this[SbW]()
    },
    getShowFooter: function() {
        return this[CmkD]
    },
    ZmC: function(A) {
        var $ = O21(A.target, "mini-tools");
        if ($) {
            var _ = this.getButton(parseInt(A.target.id));
            if (_) this.Zm7(_, A)
        }
    },
    Zm7: function(_, $) {
        var A = {
            button: _,
            index: this.buttons.indexOf(_),
            name: _.name.toLowerCase(),
            htmlEvent: $,
            cancel: false
        };
        this.fire("beforebuttonclick", A);
        if (A.cancel == true) return A;
        this.fire("buttonclick", A);
        if (A.name == "close") if (this[V_g] == "destroy") {
            this.__HideAction = "close";
            this[HFtw]()
        } else this.hide();
        if (A.name == "collapse") {
            this.toggle();
            if (this[SuKT] && this.expanded && this.url) this.reload()
        }
        return A
    },
    onButtonClick: function(_, $) {
        this.on("buttonclick", _, $)
    },
    J3dN: function() {
        this.buttons = [];
        var _ = this.createButton({
            name: "close",
            cls: "mini-tools-close",
            visible: this[XZ]
        });
        this.buttons.push(_);
        var $ = this.createButton({
            name: "collapse",
            cls: "mini-tools-collapse",
            visible: this[KYp]
        });
        this.buttons.push($)
    },
    createButton: function(_) {
        var $ = mini.copyTo({
            name: "",
            cls: "",
            style: "",
            visible: true,
            enabled: true,
            html: ""
        },
        _);
        return $
    },
    addButton: function(_, $) {
        if (typeof _ == "string") _ = {
            iconCls: _
        };
        _ = this.createButton(_);
        if (typeof $ != "number") $ = this.buttons.length;
        this.buttons.insert($, _);
        this[SbW]()
    },
    updateButton: function($, A) {
        var _ = this.getButton($);
        if (!_) return;
        mini.copyTo(_, A);
        this[SbW]()
    },
    removeButton: function($) {
        var _ = this.getButton($);
        if (!_) return;
        this.buttons.remove(_);
        this[SbW]()
    },
    getButton: function($) {
        if (typeof $ == "number") return this.buttons[$];
        else for (var _ = 0,
        A = this.buttons.length; _ < A; _++) {
            var B = this.buttons[_];
            if (B.name == $) return B
        }
    },
    destroy: function($) {
        this.OgMO();
        this.Xub = null;
        this.Q$ = null;
        this.Zp5 = null;
        this.Gr = null;
        Kt1[_s][HFtw][If](this, $)
    },
    setBody: function(_) {
        if (!_) return;
        if (!mini.isArray(_)) _ = [_];
        for (var $ = 0,
        A = _.length; $ < A; $++) {
            var B = _[$];
            mini.append(this.Zp5, B)
        }
        mini.parse(this.Zp5);
        this[A6_]()
    },
    set_bodyParent: function($) {},
    setToolbar: function(_) {
        if (!_) return;
        if (!mini.isArray(_)) _ = [_];
        for (var $ = 0,
        A = _.length; $ < A; $++) mini.append(this.Q$, _[$]);
        mini.parse(this.Q$);
        this[A6_]()
    },
    setFooter: function(_) {
        if (!_) return;
        if (!mini.isArray(_)) _ = [_];
        for (var $ = 0,
        A = _.length; $ < A; $++) mini.append(this.Gr, _[$]);
        mini.parse(this.Gr);
        this[A6_]()
    },
    getHeaderEl: function() {
        return this.ZvT
    },
    getToolbarEl: function() {
        return this.Q$
    },
    getBodyEl: function() {
        return this.Zp5
    },
    getFooterEl: function() {
        return this.Gr
    },
    getIFrameEl: function($) {
        return this.Xub
    },
    VC: function() {
        return this.Zp5
    },
    OgMO: function() {
        if (this.Xub && this.Xub.parentNode) {
            this.Xub._ondestroy();
            this.Xub.parentNode.removeChild(this.Xub);
            try {
                this.Xub[FXFd](true)
            } catch($) {}
        }
        this.Xub = null;
        try {
            CollectGarbage()
        } catch($) {}
        mini.removeChilds(this.Zp5)
    },
    HmN: 80,
    EXQ: function() {
        this.OgMO();
        var A = new Date(),
        $ = this;
        this.loadedUrl = this.url;
        if (this.maskOnLoad) this.loading();
        var _ = mini.createIFrame(this.url,
        function(_, C) {
            var B = (A - new Date()) + $.HmN;
            if (B < 0) B = 0;
            setTimeout(function() {
                $.unmask()
            },
            B);
            try {
                $.Xub.contentWindow.CloseOwnerWindow = function(_) {
                    setTimeout(function() {
                        $.__HideAction = _;
                        $[HFtw]()
                    },
                    1)
                }
            } catch(D) {}
            if ($.__onLoad) $.__onLoad();
            var D = {
                iframe: $.Xub
            };
            $.fire("load", D)
        },
        function() {
            try {
                if ($.__onDestroy) $.__onDestroy($.__HideAction)
            } catch(_) {}
            var _ = {
                iframe: $.Xub
            };
            $.fire("unload", _)
        });
        this.Zp5.appendChild(_);
        this.Xub = _
    },
    load: function(_, $, A) {
        this.setUrl(_, $, A)
    },
    reload: function() {
        this.setUrl(this.url)
    },
    setUrl: function($, _, A) {
        this.url = $;
        this.__onLoad = _;
        this.__onDestroy = A;
        if (this.expanded) this.EXQ()
    },
    getUrl: function() {
        return this.url
    },
    setRefreshOnExpand: function($) {
        this[SuKT] = $
    },
    getRefreshOnExpand: function() {
        return this[SuKT]
    },
    setMaskOnLoad: function($) {
        this.maskOnLoad = $
    },
    getMaskOnLoad: function($) {
        return this.maskOnLoad
    },
    expanded: true,
    setExpanded: function($) {
        if (this.expanded != $) {
            this.expanded = $;
            if (this.expanded) this.expand();
            else this.collapse()
        }
    },
    toggle: function() {
        if (this.expanded) this.collapse();
        else this.expand()
    },
    collapse: function() {
        this.expanded = false;
        this._height = this.el.style.height;
        this.el.style.height = "auto";
        this.NlU0.style.display = "none";
        F7y(this.el, "mini-panel-collapse");
        this[A6_]()
    },
    expand: function() {
        this.expanded = true;
        this.el.style.height = this._height;
        this.NlU0.style.display = "block";
        delete this._height;
        Lq(this.el, "mini-panel-collapse");
        if (this.url && this.url != this.loadedUrl) this.EXQ();
        this[A6_]()
    },
    getAttrs: function(_) {
        var D = Kt1[_s][XNM][If](this, _);
        mini[GRcU](_, D, ["title", "iconCls", "iconStyle", "headerCls", "headerStyle", "bodyCls", "bodyStyle", "footerCls", "footerStyle", "toolbarCls", "toolbarStyle", "footer", "toolbar", "url", "closeAction"]);
        mini[MTh](_, D, ["allowResize", "showCloseButton", "showHeader", "showToolbar", "showFooter", "showCollapseButton", "refreshOnExpand", "maskOnLoad", "expanded"]);
        var C = mini[OJy](_, true);
        for (var $ = C.length - 1; $ >= 0; $--) {
            var B = C[$],
            A = jQuery(B).attr("property");
            if (!A) continue;
            A = A.toLowerCase();
            if (A == "toolbar") D.toolbar = B;
            else if (A == "footer") D.footer = B
        }
        D.body = C;
        return D
    }
});
W4(Kt1, "panel");
K25T = function() {
    K25T[_s][FjoU][If](this);
    this[Ze]("mini-window");
    this[NXq](false);
    this.setAllowDrag(this.allowDrag);
    this.setAllowResize(this[T_s])
};
WKkQ(K25T, Kt1, {
    x: 0,
    y: 0,
    state: "restore",
    Jr: "mini-window-drag",
    PyIp: "mini-window-resize",
    allowDrag: true,
    allowResize: false,
    showCloseButton: true,
    showMaxButton: false,
    showMinButton: false,
    showCollapseButton: false,
    showModal: true,
    minWidth: 150,
    minHeight: 80,
    maxWidth: 2000,
    maxHeight: 2000,
    uiCls: "mini-window",
    _create: function() {
        K25T[_s][RsE][If](this)
    },
    J3dN: function() {
        this.buttons = [];
        var A = this.createButton({
            name: "close",
            cls: "mini-tools-close",
            visible: this[XZ]
        });
        this.buttons.push(A);
        var B = this.createButton({
            name: "max",
            cls: "mini-tools-max",
            visible: this[Ubp1]
        });
        this.buttons.push(B);
        var _ = this.createButton({
            name: "min",
            cls: "mini-tools-min",
            visible: this[TVO]
        });
        this.buttons.push(_);
        var $ = this.createButton({
            name: "collapse",
            cls: "mini-tools-collapse",
            visible: this[KYp]
        });
        this.buttons.push($)
    },
    _initEvents: function() {
        K25T[_s][UUs][If](this);
        Ehny(function() {
            $DT4(this.el, "mouseover", this.F1, this);
            $DT4(window, "resize", this.RyA, this);
            $DT4(this.el, "mousedown", this.QD, this)
        },
        this)
    },
    doLayout: function() {
        if (!this.canLayout()) return;
        if (this.state == "max") {
            var $ = this.getParentBox();
            this.el.style.left = "0px";
            this.el.style.top = "0px";
            mini.setSize(this.el, $.width, $.height)
        }
        K25T[_s][A6_][If](this);
        if (this.allowDrag) F7y(this.el, this.Jr);
        if (this.state == "max") {
            this.Zes.style.display = "none";
            Lq(this.el, this.Jr)
        }
        this.Cn8()
    },
    Cn8: function() {
        var _ = this[Vb2Y] && this[Gf]();
        if (!this.TJj) this.TJj = mini.append(document.body, "<div class=\"mini-modal\" style=\"display:none\"></div>");
        this.TJj.style.display = _ ? "block": "none";
        if (_) {
            var $ = mini.getViewportBox();
            this.TJj.style.height = $.height + "px";
            this.TJj.style.width = $.width + "px";
            this.TJj.style.zIndex = SIV(this.el, "zIndex") - 1
        }
    },
    getParentBox: function() {
        var $ = mini.getViewportBox(),
        _ = this.DkH || document.body;
        if (_ != document.body) $ = $mq(_);
        return $
    },
    setShowModal: function($) {
        this[Vb2Y] = $
    },
    getShowModal: function() {
        return this[Vb2Y]
    },
    setMinWidth: function($) {
        if (isNaN($)) return;
        this.minWidth = $
    },
    getMinWidth: function() {
        return this.minWidth
    },
    setMinHeight: function($) {
        if (isNaN($)) return;
        this.minHeight = $
    },
    getMinHeight: function() {
        return this.minHeight
    },
    setMaxWidth: function($) {
        if (isNaN($)) return;
        this.maxWidth = $
    },
    getMaxWidth: function() {
        return this.maxWidth
    },
    setMaxHeight: function($) {
        if (isNaN($)) return;
        this.maxHeight = $
    },
    getMaxHeight: function() {
        return this.maxHeight
    },
    setAllowDrag: function($) {
        this.allowDrag = $;
        Lq(this.el, this.Jr);
        if ($) F7y(this.el, this.Jr)
    },
    getAllowDrag: function() {
        return this.allowDrag
    },
    setAllowResize: function($) {
        if (this[T_s] != $) {
            this[T_s] = $;
            this[A6_]()
        }
    },
    getAllowResize: function() {
        return this[T_s]
    },
    setShowMaxButton: function($) {
        this[Ubp1] = $;
        var _ = this.getButton("max");
        _.visible = $;
        if (_) this[SbW]()
    },
    getShowMaxButton: function() {
        return this[Ubp1]
    },
    setShowMinButton: function($) {
        this[TVO] = $;
        var _ = this.getButton("min");
        _.visible = $;
        if (_) this[SbW]()
    },
    getShowMinButton: function() {
        return this[TVO]
    },
    max: function() {
        this.state = "max";
        this.show();
        var $ = this.getButton("max");
        if ($) {
            $.cls = "mini-tools-restore";
            this[SbW]()
        }
    },
    restore: function() {
        this.state = "restore";
        this.show(this.x, this.y);
        var $ = this.getButton("max");
        if ($) {
            $.cls = "mini-tools-max";
            this[SbW]()
        }
    },
    containerEl: null,
    show: function(B, _) {
        this.Wk = false;
        var A = this.DkH || document.body;
        if (!this.isRender() || this.el.parentNode != A) this[NF](A);
        this.el.style.zIndex = mini.getMaxZIndex();
        this.ZqvR(B, _);
        this.Wk = true;
        this[NXq](true);
        if (this.state != "max") {
            var $ = $mq(this.el);
            this.x = $.x;
            this.y = $.y
        }
        mini[FN_](this.el)
    },
    hide: function() {
        this[NXq](false);
        this.Cn8()
    },
    SOB: function() {
        this.el.style.display = "";
        var $ = $mq(this.el);
        if ($.width > this.maxWidth) {
            D1No(this.el, this.maxWidth);
            $ = $mq(this.el)
        }
        if ($.height > this.maxHeight) {
            AUY(this.el, this.maxHeight);
            $ = $mq(this.el)
        }
        if ($.width < this.minWidth) {
            D1No(this.el, this.minWidth);
            $ = $mq(this.el)
        }
        if ($.height < this.minHeight) {
            AUY(this.el, this.minHeight);
            $ = $mq(this.el)
        }
    },
    ZqvR: function(B, A) {
        var _ = this.getParentBox();
        if (this.state == "max") {
            if (!this._width) {
                var $ = $mq(this.el);
                this._width = $.width;
                this._height = $.height;
                this.x = $.x;
                this.y = $.y
            }
        } else {
            if (mini.isNull(B)) B = "center";
            if (mini.isNull(A)) A = "middle";
            this.el.style.position = "absolute";
            this.el.style.left = "-2000px";
            this.el.style.top = "-2000px";
            this.el.style.display = "";
            if (this._width) {
                this[Id](this._width);
                this[ORwC](this._height)
            }
            this.SOB();
            $ = $mq(this.el);
            if (B == "left") B = 0;
            if (B == "center") B = _.width / 2 - $.width / 2;
            if (B == "right") B = _.width - $.width;
            if (A == "top") A = 0;
            if (A == "middle") A = _.y + _.height / 2 - $.height / 2;
            if (A == "bottom") A = _.height - $.height;
            if (B + $.width > _.right) B = _.right - $.width;
            if (A + $.height > _.bottom) A = _.bottom - $.height;
            this.el.style.display = "";
            mini.setX(this.el, B);
            mini.setY(this.el, A)
        }
        this[A6_]()
    },
    Zm7: function(_, $) {
        var A = K25T[_s].Zm7[If](this, _, $);
        if (A.cancel == true) return A;
        if (A.name == "max") if (this.state == "max") this.restore();
        else this.max();
        return A
    },
    RyA: function($) {
        if (this.state == "max") this[A6_]()
    },
    QD: function(B) {
        var _ = this;
        if (this.state != "max" && this.allowDrag && YCJ(this.ZvT, B.target) && !O21(B.target, "mini-tools")) {
            var _ = this,
            A = this.getBox(),
            $ = new mini.Drag({
                capture: false,
                onStart: function() {
                    _.VfNh = mini.append(document.body, "<div class=\"mini-resizer-mask\"></div>");
                    _.Pza = mini.append(document.body, "<div class=\"mini-drag-proxy\"></div>")
                },
                onMove: function(B) {
                    var F = B.now[0] - B.init[0],
                    E = B.now[1] - B.init[1];
                    F = A.x + F;
                    E = A.y + E;
                    var D = _.getParentBox(),
                    $ = F + A.width,
                    C = E + A.height;
                    if ($ > D.width) F = D.width - A.width;
                    if (C > D.bottom) E = D.bottom - A.height;
                    if (F < 0) F = 0;
                    if (E < 0) E = 0;
                    _.x = F;
                    _.y = E;
                    var G = {
                        x: F,
                        y: E,
                        width: A.width,
                        height: A.height
                    };
                    M1(_.Pza, G)
                },
                onStop: function() {
                    var $ = $mq(_.Pza);
                    M1(_.el, $);
                    jQuery(_.VfNh).remove();
                    _.VfNh = null;
                    jQuery(_.Pza).remove();
                    _.Pza = null
                }
            });
            $.start(B)
        }
        if (YCJ(this.Zes, B.target) && this[T_s]) {
            $ = this.Ffr();
            $.start(B)
        }
    },
    Ffr: function() {
        if (!this._resizeDragger) this._resizeDragger = new mini.Drag({
            capture: true,
            onStart: mini.createDelegate(this.Tlfk, this),
            onMove: mini.createDelegate(this.HEJ, this),
            onStop: mini.createDelegate(this.Sj, this)
        });
        return this._resizeDragger
    },
    Tlfk: function($) {
        this.proxy = mini.append(document.body, "<div class=\"mini-windiw-resizeProxy\"></div>");
        this.proxy.style.cursor = "se-resize";
        this.elBox = $mq(this.el);
        M1(this.proxy, this.elBox)
    },
    HEJ: function(A) {
        var C = A.now[0] - A.init[0],
        $ = A.now[1] - A.init[1],
        _ = this.elBox.width + C,
        B = this.elBox.height + $;
        if (_ < this.minWidth) _ = this.minWidth;
        if (B < this.minHeight) B = this.minHeight;
        if (_ > this.maxWidth) _ = this.maxWidth;
        if (B > this.maxHeight) B = this.maxHeight;
        mini.setSize(this.proxy, _, B)
    },
    Sj: function($) {
        var _ = $mq(this.proxy);
        jQuery(this.proxy).remove();
        this.proxy = null;
        this.elBox = null;
        this[Id](_.width);
        this[ORwC](_.height);
        delete this._width;
        delete this._height
    },
    destroy: function($) {
        EWw(window, "resize", this.RyA, this);
        if (this.TJj) {
            jQuery(this.TJj).remove();
            this.TJj = null
        }
        if (this.shadowEl) {
            jQuery(this.shadowEl).remove();
            this.shadowEl = null
        }
        K25T[_s][HFtw][If](this, $)
    },
    getAttrs: function($) {
        var _ = K25T[_s][XNM][If](this, $);
        mini[GRcU]($, _, ["modalStyle"]);
        mini[MTh]($, _, ["showModal", "showShadow", "allowDrag", "allowResize", "showMaxButton", "showMinButton"]);
        mini[Ova]($, _, ["minWidth", "minHeight", "maxWidth", "maxHeight"]);
        return _
    }
});
W4(K25T, "window");
mini.MessageBox = {
    alertTitle: "\u63d0\u9192",
    confirmTitle: "\u786e\u8ba4",
    prompTitle: "\u8f93\u5165",
    prompMessage: "\u8bf7\u8f93\u5165\u5185\u5bb9\uff1a",
    buttonText: {
        ok: "\u786e\u5b9a",
        cancel: "\u53d6\u6d88",
        yes: "\u662f",
        no: "\u5426"
    },
    show: function(F) {
        F = mini.copyTo({
            width: "auto",
            height: "auto",
            minWidth: 150,
            maxWidth: 800,
            minHeight: 100,
            maxHeight: 350,
            title: "",
            titleIcon: "",
            iconCls: "",
            iconStyle: "",
            message: "",
            html: "",
            spaceStyle: "margin-right:15px",
            showCloseButton: true,
            buttons: null,
            buttonWidth: 55,
            callback: null
        },
        F);
        var I = F.callback,
        C = new K25T();
        C.setBodyStyle("overflow:hidden");
        C.setShowModal(true);
        C.setTitle(F.title || "");
        C.setIconCls(F.titleIcon);
        C.setShowCloseButton(F[XZ]);
        var J = C.uid + "$table",
        N = C.uid + "$content",
        L = "<div class=\"" + F.iconCls + "\" style=\"" + F[Wt3] + "\"></div>",
        Q = "<table class=\"mini-messagebox-table\" id=\"" + J + "\" style=\"\" cellspacing=\"0\" cellpadding=\"0\"><tr><td>" + L + "</td><td id=\"" + N + "\" style=\"text-align:center;padding:8px;padding-left:0;\">" + (F.message || "") + "</td></tr></table>",
        _ = "<div class=\"mini-messagebox-content\"></div>" + "<div class=\"mini-messagebox-buttons\"></div>";
        C.Zp5.innerHTML = _;
        var M = C.Zp5.firstChild;
        if (F.html) {
            if (typeof F.html == "string") M.innerHTML = F.html;
            else if (mini.isElement(F.html)) M.appendChild(F.html)
        } else M.innerHTML = Q;
        C._Buttons = [];
        var P = C.Zp5.lastChild;
        if (F.buttons && F.buttons.length > 0) {
            for (var H = 0,
            D = F.buttons.length; H < D; H++) {
                var E = F.buttons[H],
                K = mini.MessageBox.buttonText[E],
                $ = new MBR();
                $[Woc](K);
                $[Id](F.buttonWidth);
                $[NF](P);
                $.action = E;
                $.on("click",
                function(_) {
                    var $ = _.sender;
                    if (I) I($.action);
                    mini.MessageBox.hide(C)
                });
                if (H != D - 1) $.setStyle(F.spaceStyle);
                C._Buttons.push($)
            }
        } else P.style.display = "none";
        C.setMinWidth(F.minWidth);
        C.setMinHeight(F.minHeight);
        C.setMaxWidth(F.maxWidth);
        C.setMaxHeight(F.maxHeight);
        C[Id](F.width);
        C[ORwC](F.height);
        C.show();
        var A = C[R5Kf]();
        C[Id](A);
        var B = document.getElementById(J);
        if (B) B.style.width = "100%";
        var G = document.getElementById(N);
        if (G) G.style.width = "100%";
        var O = C._Buttons[0];
        if (O) O.focus();
        else C.focus();
        C.on("beforebuttonclick",
        function($) {
            if (I) I("close");
            $.cancel = true;
            mini.MessageBox.hide(C)
        });
        $DT4(C.el, "keydown",
        function($) {
            if ($.keyCode == 27) {
                if (I) I("close");
                $.cancel = true;
                mini.MessageBox.hide(C)
            }
        });
        return C.uid
    },
    hide: function(C) {
        if (!C) return;
        var _ = typeof C == "object" ? C: mini.getbyUID(C);
        if (!_) return;
        for (var $ = 0,
        A = _._Buttons.length; $ < A; $++) {
            var B = _._Buttons[$];
            B[HFtw]()
        }
        _._Buttons = null;
        _[HFtw]()
    },
    alert: function(A, _, $) {
        return mini.MessageBox.show({
            minWidth: 250,
            title: _ || mini.MessageBox.alertTitle,
            buttons: ["ok"],
            message: A,
            iconCls: "mini-messagebox-info",
            callback: $
        })
    },
    confirm: function(A, _, $) {
        return mini.MessageBox.show({
            minWidth: 250,
            title: _ || mini.MessageBox.confirmTitle,
            buttons: ["ok", "cancel"],
            message: A,
            iconCls: "mini-messagebox-question",
            callback: $
        })
    },
    prompt: function(C, B, A, _) {
        var F = "prompt$" + new Date().getTime(),
        E = C || mini.MessageBox.promptMessage;
        if (_) E = E + "<br/><textarea id=\"" + F + "\" style=\"width:200px;height:60px;margin-top:3px;\"></textarea>";
        else E = E + "<br/><input id=\"" + F + "\" type=\"text\" style=\"width:200px;margin-top:3px;\"/>";
        var D = mini.MessageBox.show({
            title: B || mini.MessageBox.promptTitle,
            buttons: ["ok", "cancel"],
            width: 250,
            html: "<div style=\"padding:5px;padding-left:10px;\">" + E + "</div>",
            callback: function(_) {
                var $ = document.getElementById(F);
                if (A) A(_, $.value)
            }
        }),
        $ = document.getElementById(F);
        $.focus();
        return D
    },
    loading: function(_, $) {
        return mini.MessageBox.show({
            minHeight: 50,
            title: $,
            showCloseButton: false,
            message: _,
            iconCls: "mini-messagebox-waiting"
        })
    }
};
mini.alert = mini.MessageBox.alert;
mini.confirm = mini.MessageBox.confirm;
mini.prompt = mini.MessageBox.prompt;
mini.loading = mini.MessageBox.loading;
mini.showMessageBox = mini.MessageBox.show;
mini.hideMessageBox = mini.MessageBox.hide;
ATb = function() {
    this.H85();
    ATb[_s][FjoU][If](this)
};
WKkQ(ATb, R0pW, {
    width: 300,
    height: 180,
    vertical: false,
    allowResize: true,
    pane1: null,
    pane2: null,
    showHandleButton: true,
    handlerStyle: "",
    handlerCls: "",
    handlerSize: 6,
    uiCls: "mini-splitter",
    _create: function() {
        this.el = document.createElement("div");
        this.el.className = "mini-splitter";
        this.el.innerHTML = "<div class=\"mini-splitter-border\"><div id=\"1\" class=\"mini-splitter-pane mini-splitter-pane1\"></div><div id=\"2\" class=\"mini-splitter-pane mini-splitter-pane2\"></div><div class=\"mini-splitter-handler\"></div></div>";
        this.WXF = this.el.firstChild;
        this.EUcF = this.WXF.firstChild;
        this.F7W = this.WXF.childNodes[1];
        this.YUo = this.WXF.lastChild
    },
    _initEvents: function() {
        Ehny(function() {
            $DT4(this.el, "click", this.ZmC, this);
            $DT4(this.el, "mousedown", this.U8z, this)
        },
        this)
    },
    H85: function() {
        this.pane1 = {
            index: 1,
            minSize: 30,
            maxSize: 3000,
            size: "",
            showCollapseButton: false,
            cls: "",
            style: "",
            visible: true,
            expanded: true
        };
        this.pane2 = mini.copyTo({},
        this.pane1);
        this.pane2.index = 2
    },
    doUpdate: function() {
        this[A6_]()
    },
    doLayout: function() {
        if (!this.canLayout()) return;
        this.YUo.style.cursor = this[T_s] ? "": "default";
        Lq(this.el, "mini-splitter-vertical");
        if (this.vertical) F7y(this.el, "mini-splitter-vertical");
        Lq(this.EUcF, "mini-splitter-pane1-vertical");
        Lq(this.F7W, "mini-splitter-pane2-vertical");
        if (this.vertical) {
            F7y(this.EUcF, "mini-splitter-pane1-vertical");
            F7y(this.F7W, "mini-splitter-pane2-vertical")
        }
        Lq(this.YUo, "mini-splitter-handler-vertical");
        if (this.vertical) F7y(this.YUo, "mini-splitter-handler-vertical");
        _r(this.EUcF, this.pane1.style);
        _r(this.F7W, this.pane2.style);
        var B = this[SeC](true),
        _ = this[R5Kf](true);
        if (!jQuery.boxModel) {
            var Q = MWQ(this.WXF);
            B = B + Q.top + Q.bottom;
            _ = _ + Q.left + Q.right
        }
        this.WXF.style.width = _ + "px";
        this.WXF.style.height = B + "px";
        var $ = this.EUcF,
        C = this.F7W,
        G = jQuery($),
        I = jQuery(C);
        $.style.display = C.style.display = this.YUo.style.display = "";
        var D = this[Gq];
        this.pane1.size = String(this.pane1.size);
        this.pane2.size = String(this.pane2.size);
        var F = parseFloat(this.pane1.size),
        H = parseFloat(this.pane2.size),
        O = isNaN(F),
        T = isNaN(H),
        N = !isNaN(F) && this.pane1.size.indexOf("%") != -1,
        R = !isNaN(H) && this.pane2.size.indexOf("%") != -1,
        J = !O && !N,
        M = !T && !R,
        P = this.vertical ? B - this[Gq] : _ - this[Gq],
        K = p2Size = 0;
        if (O || T) {
            if (O && T) {
                K = parseInt(P / 2);
                p2Size = P - K
            } else if (J) {
                K = F;
                p2Size = P - K
            } else if (N) {
                K = parseInt(P * F / 100);
                p2Size = P - K
            } else if (M) {
                p2Size = H;
                K = P - p2Size
            } else if (R) {
                p2Size = parseInt(P * H / 100);
                K = P - p2Size
            }
        } else if (N && M) {
            p2Size = H;
            K = P - p2Size
        } else if (J && R) {
            K = F;
            p2Size = P - K
        } else {
            var L = F + H;
            K = parseInt(P * F / L);
            p2Size = P - K
        }
        if (K > this.pane1.maxSize) {
            K = this.pane1.maxSize;
            p2Size = P - K
        }
        if (p2Size > this.pane2.maxSize) {
            p2Size = this.pane2.maxSize;
            K = P - p2Size
        }
        if (K < this.pane1.minSize) {
            K = this.pane1.minSize;
            p2Size = P - K
        }
        if (p2Size < this.pane2.minSize) {
            p2Size = this.pane2.minSize;
            K = P - p2Size
        }
        if (this.pane1.expanded == false) {
            p2Size = P;
            K = 0;
            $.style.display = "none"
        } else if (this.pane2.expanded == false) {
            K = P;
            p2Size = 0;
            C.style.display = "none"
        }
        if (this.pane1.visible == false) {
            p2Size = P + D;
            K = D = 0;
            $.style.display = "none";
            this.YUo.style.display = "none"
        } else if (this.pane2.visible == false) {
            K = P + D;
            p2Size = D = 0;
            C.style.display = "none";
            this.YUo.style.display = "none"
        }
        if (this.vertical) {
            D1No($, _);
            D1No(C, _);
            AUY($, K);
            AUY(C, p2Size);
            C.style.top = (K + D) + "px";
            this.YUo.style.left = "0px";
            this.YUo.style.top = K + "px";
            D1No(this.YUo, _);
            AUY(this.YUo, this[Gq]);
            $.style.left = "0px";
            C.style.left = "0px"
        } else {
            D1No($, K);
            D1No(C, p2Size);
            AUY($, B);
            AUY(C, B);
            C.style.left = (K + D) + "px";
            this.YUo.style.top = "0px";
            this.YUo.style.left = K + "px";
            D1No(this.YUo, this[Gq]);
            AUY(this.YUo, B);
            $.style.top = "0px";
            C.style.top = "0px"
        }
        var S = "<div class=\"mini-splitter-handler-buttons\">";
        if (!this.pane1.expanded || !this.pane2.expanded) {
            if (!this.pane1.expanded) {
                if (this.pane1[KYp]) S += "<a id=\"1\" class=\"mini-splitter-pane2-button\"></a>"
            } else if (this.pane2[KYp]) S += "<a id=\"2\" class=\"mini-splitter-pane1-button\"></a>"
        } else {
            if (this.pane1[KYp]) S += "<a id=\"1\" class=\"mini-splitter-pane1-button\"></a>";
            if (this[T_s]) if ((this.pane1[KYp] && this.pane2[KYp]) || (!this.pane1[KYp] && !this.pane2[KYp])) S += "<span class=\"mini-splitter-resize-button\"></span>";
            if (this.pane2[KYp]) S += "<a id=\"2\" class=\"mini-splitter-pane2-button\"></a>"
        }
        S += "</div>";
        this.YUo.innerHTML = S;
        var E = this.YUo.firstChild;
        E.style.display = this.showHandleButton ? "": "none";
        var A = $mq(E);
        if (this.vertical) E.style.marginLeft = -A.width / 2 + "px";
        else E.style.marginTop = -A.height / 2 + "px";
        if (!this.pane1.visible || !this.pane2.visible || !this.pane1.expanded || !this.pane2.expanded) F7y(this.YUo, "mini-splitter-nodrag");
        else Lq(this.YUo, "mini-splitter-nodrag");
        mini.layout(this.WXF)
    },
    getPaneBox: function($) {
        var _ = this.getPaneEl($);
        if (!_) return null;
        return $mq(_)
    },
    getPane: function($) {
        if ($ == 1) return this.pane1;
        else if ($ == 2) return this.pane2;
        return $
    },
    setPanes: function(_) {
        if (!mini.isArray(_)) return;
        for (var $ = 0; $ < 2; $++) {
            var A = _[$];
            this.updatePane($ + 1, A)
        }
    },
    getPaneEl: function($) {
        if ($ == 1) return this.EUcF;
        return this.F7W
    },
    updatePane: function(_, F) {
        var $ = this.getPane(_);
        if (!$) return;
        mini.copyTo($, F);
        var B = this.getPaneEl(_),
        C = $.body;
        delete $.body;
        if (C) {
            if (!mini.isArray(C)) C = [C];
            for (var A = 0,
            E = C.length; A < E; A++) mini.append(B, C[A])
        }
        if ($.bodyParent) {
            var D = $.bodyParent;
            while (D.firstChild) B.appendChild(D.firstChild)
        }
        delete $.bodyParent;
        this[SbW]()
    },
    setShowHandleButton: function($) {
        this.showHandleButton = $;
        this[SbW]()
    },
    getShowHandleButton: function($) {
        return this.showHandleButton
    },
    setVertical: function($) {
        this.vertical = $;
        this[SbW]()
    },
    getVertical: function() {
        return this.vertical
    },
    expandPane: function(_) {
        var $ = this.getPane(_);
        if (!$) return;
        $.expanded = true;
        this[SbW]()
    },
    collapsePane: function(_) {
        var $ = this.getPane(_);
        if (!$) return;
        $.expanded = false;
        var A = $ == this.pane1 ? this.pane2: this.pane1;
        if (A.expanded == false) {
            A.expanded = true;
            A.visible = true
        }
        this[SbW]()
    },
    togglePane: function(_) {
        var $ = this.getPane(_);
        if (!$) return;
        if ($.expanded) this.collapsePane($);
        else this.expandPane($)
    },
    showPane: function(_) {
        var $ = this.getPane(_);
        if (!$) return;
        $.visible = true;
        this[SbW]()
    },
    hidePane: function(_) {
        var $ = this.getPane(_);
        if (!$) return;
        $.visible = false;
        var A = $ == this.pane1 ? this.pane2: this.pane1;
        if (A.visible == false) {
            A.expanded = true;
            A.visible = true
        }
        this[SbW]()
    },
    setAllowResize: function($) {
        if (this[T_s] != $) {
            this[T_s] = $;
            this[A6_]()
        }
    },
    getAllowResize: function() {
        return this[T_s]
    },
    setHandlerSize: function($) {
        if (this[Gq] != $) {
            this[Gq] = $;
            this[A6_]()
        }
    },
    getHandlerSize: function() {
        return this[Gq]
    },
    ZmC: function(B) {
        var A = B.target;
        if (!YCJ(this.YUo, A)) return;
        var _ = parseInt(A.id),
        $ = this.getPane(_),
        B = {
            pane: $,
            paneIndex: _,
            cancel: false
        };
        if ($.expanded) this.fire("beforecollapse", B);
        else this.fire("beforeexpand", B);
        if (B.cancel == true) return;
        if (A.className == "mini-splitter-pane1-button") this.togglePane(_);
        else if (A.className == "mini-splitter-pane2-button") this.togglePane(_)
    },
    Zm7: function($, _) {
        this.fire("buttonclick", {
            pane: $,
            index: this.pane1 == $ ? 1 : 2,
            htmlEvent: _
        })
    },
    onButtonClick: function(_, $) {
        this.on("buttonclick", _, $)
    },
    U8z: function(A) {
        var _ = A.target;
        if (!this[T_s]) return;
        if (!this.pane1.visible || !this.pane2.visible || !this.pane1.expanded || !this.pane2.expanded) return;
        if (YCJ(this.YUo, _)) if (_.className == "mini-splitter-pane1-button" || _.className == "mini-splitter-pane2-button");
        else {
            var $ = this.H5B();
            $.start(A)
        }
    },
    H5B: function() {
        if (!this.drag) this.drag = new mini.Drag({
            capture: true,
            onStart: mini.createDelegate(this.Tlfk, this),
            onMove: mini.createDelegate(this.HEJ, this),
            onStop: mini.createDelegate(this.Sj, this)
        });
        return this.drag
    },
    Tlfk: function($) {
        this.VfNh = mini.append(document.body, "<div class=\"mini-resizer-mask\"></div>");
        this.Pza = mini.append(document.body, "<div class=\"mini-proxy\"></div>");
        this.Pza.style.cursor = this.vertical ? "n-resize": "w-resize";
        this.handlerBox = $mq(this.YUo);
        this.elBox = $mq(this.WXF, true);
        M1(this.Pza, this.handlerBox)
    },
    HEJ: function(C) {
        if (!this.handlerBox) return;
        if (!this.elBox) this.elBox = $mq(this.WXF, true);
        var B = this.elBox.width,
        D = this.elBox.height,
        E = this[Gq],
        I = this.vertical ? D - this[Gq] : B - this[Gq],
        A = this.pane1.minSize,
        F = this.pane1.maxSize,
        $ = this.pane2.minSize,
        G = this.pane2.maxSize;
        if (this.vertical == true) {
            var _ = C.now[1] - C.init[1],
            H = this.handlerBox.y + _;
            if (H - this.elBox.y > F) H = this.elBox.y + F;
            if (H + this.handlerBox.height < this.elBox.bottom - G) H = this.elBox.bottom - G - this.handlerBox.height;
            if (H - this.elBox.y < A) H = this.elBox.y + A;
            if (H + this.handlerBox.height > this.elBox.bottom - $) H = this.elBox.bottom - $ - this.handlerBox.height;
            mini.setY(this.Pza, H)
        } else {
            var J = C.now[0] - C.init[0],
            K = this.handlerBox.x + J;
            if (K - this.elBox.x > F) K = this.elBox.x + F;
            if (K + this.handlerBox.width < this.elBox.right - G) K = this.elBox.right - G - this.handlerBox.width;
            if (K - this.elBox.x < A) K = this.elBox.x + A;
            if (K + this.handlerBox.width > this.elBox.right - $) K = this.elBox.right - $ - this.handlerBox.width;
            mini.setX(this.Pza, K)
        }
    },
    Sj: function(_) {
        var $ = this.elBox.width,
        B = this.elBox.height,
        C = this[Gq],
        D = parseFloat(this.pane1.size),
        E = parseFloat(this.pane2.size),
        I = isNaN(D),
        N = isNaN(E),
        J = !isNaN(D) && this.pane1.size.indexOf("%") != -1,
        M = !isNaN(E) && this.pane2.size.indexOf("%") != -1,
        G = !I && !J,
        K = !N && !M,
        L = this.vertical ? B - this[Gq] : $ - this[Gq],
        A = $mq(this.Pza),
        H = A.x - this.elBox.x,
        F = L - H;
        if (this.vertical) {
            H = A.y - this.elBox.y;
            F = L - H
        }
        if (I || N) {
            if (I && N) {
                D = parseFloat(H / L * 100).toFixed(1);
                this.pane1.size = D + "%"
            } else if (G) {
                D = H;
                this.pane1.size = D
            } else if (J) {
                D = parseFloat(H / L * 100).toFixed(1);
                this.pane1.size = D + "%"
            } else if (K) {
                E = F;
                this.pane2.size = E
            } else if (M) {
                E = parseFloat(F / L * 100).toFixed(1);
                this.pane2.size = E + "%"
            }
        } else if (J && K) this.pane2.size = F;
        else if (G && M) this.pane1.size = H;
        else {
            this.pane1.size = parseFloat(H / L * 100).toFixed(1);
            this.pane2.size = 100 - this.pane1.size
        }
        jQuery(this.Pza).remove();
        jQuery(this.VfNh).remove();
        this.VfNh = null;
        this.Pza = null;
        this.elBox = this.handlerBox = null;
        this[A6_]()
    },
    getAttrs: function(B) {
        var G = ATb[_s][XNM][If](this, B);
        mini[MTh](B, G, ["allowResize", "vertical", "showHandleButton"]);
        mini[Ova](B, G, ["handlerSize"]);
        var A = [],
        F = mini[OJy](B);
        for (var _ = 0,
        E = 2; _ < E; _++) {
            var C = F[_],
            D = jQuery(C),
            $ = {};
            A.push($);
            if (!C) continue;
            $.style = C.style.cssText;
            mini[GRcU](C, $, ["cls", "size"]);
            mini[MTh](C, $, ["visible", "expanded", "showCollapseButton"]);
            mini[Ova](C, $, ["minSize", "maxSize", "handlerSize"]);
            $.bodyParent = C
        }
        G.panes = A;
        return G
    }
});
W4(ATb, "splitter");
Smv = function() {
    this.regions = [];
    this.regionMap = {};
    Smv[_s][FjoU][If](this)
};
WKkQ(Smv, R0pW, {
    regions: [],
    splitSize: 6,
    collapseWidth: 28,
    collapseHeight: 25,
    regionWidth: 150,
    regionHeight: 80,
    regionMinWidth: 50,
    regionMinHeight: 25,
    regionMaxWidth: 2000,
    regionMaxHeight: 2000,
    uiCls: "mini-layout",
    _create: function() {
        this.el = document.createElement("div");
        this.el.className = "mini-layout";
        this.el.innerHTML = "<div class=\"mini-layout-border\"></div>";
        this.WXF = this.el.firstChild;
        this[SbW]()
    },
    _initEvents: function() {
        Ehny(function() {
            $DT4(this.el, "click", this.ZmC, this);
            $DT4(this.el, "mousedown", this.U8z, this);
            $DT4(this.el, "mouseover", this.F1, this);
            $DT4(this.el, "mouseout", this.FmPu, this);
            $DT4(document, "mousedown", this.Gmv1, this)
        },
        this)
    },
    getRegionEl: function($) {
        var $ = this[KDO]($);
        if (!$) return null;
        return $._el
    },
    getRegionHeaderEl: function($) {
        var $ = this[KDO]($);
        if (!$) return null;
        return $._header
    },
    getRegionBodyEl: function($) {
        var $ = this[KDO]($);
        if (!$) return null;
        return $._body
    },
    getRegionSplitEl: function($) {
        var $ = this[KDO]($);
        if (!$) return null;
        return $._split
    },
    getRegionProxyEl: function($) {
        var $ = this[KDO]($);
        if (!$) return null;
        return $._proxy
    },
    getRegionBox: function(_) {
        var $ = this[Bzj](_);
        if ($) return $mq($);
        return null
    },
    getRegion: function($) {
        if (typeof $ == "string") return this.regionMap[$];
        return $
    },
    GYl: function(_, B) {
        var D = _.buttons;
        for (var $ = 0,
        A = D.length; $ < A; $++) {
            var C = D[$];
            if (C.name == B) return C
        }
    },
    Sm0a: function(_) {
        var $ = mini.copyTo({
            region: "",
            title: "",
            iconCls: "",
            iconStyle: "",
            showCloseButton: false,
            showCollapseButton: true,
            buttons: [{
                name: "close",
                cls: "mini-tools-close",
                html: "",
                visible: false
            },
            {
                name: "collapse",
                cls: "mini-tools-collapse",
                html: "",
                visible: true
            }],
            showSplit: true,
            showHeader: true,
            splitSize: this.splitSize,
            collapseSize: this.collapseWidth,
            width: this.regionWidth,
            height: this.regionHeight,
            minWidth: this.regionMinWidth,
            minHeight: this.regionMinHeight,
            maxWidth: this.regionMaxWidth,
            maxHeight: this.regionMaxHeight,
            allowResize: true,
            cls: "",
            style: "",
            headerCls: "",
            headerStyle: "",
            bodyCls: "",
            bodyStyle: "",
            visible: true,
            expanded: true
        },
        _);
        return $
    },
    MNBD: function($) {
        var $ = this[KDO]($);
        if (!$) return;
        mini.append(this.WXF, "<div id=\"" + $.region + "\" class=\"mini-layout-region\"><div class=\"mini-layout-region-header\" style=\"" + $.headerStyle + "\"></div><div class=\"mini-layout-region-body\" style=\"" + $.bodyStyle + "\"></div></div>");
        $._el = this.WXF.lastChild;
        $._header = $._el.firstChild;
        $._body = $._el.lastChild;
        if ($.cls) F7y($._el, $.cls);
        if ($.style) _r($._el, $.style);
        F7y($._el, "mini-layout-region-" + $.region);
        if ($.region != "center") {
            mini.append(this.WXF, "<div uid=\"" + this.uid + "\" id=\"" + $.region + "\" class=\"mini-layout-split\"></div>");
            $._split = this.WXF.lastChild;
            F7y($._split, "mini-layout-split-" + $.region)
        }
        if ($.region != "center") {
            mini.append(this.WXF, "<div id=\"" + $.region + "\" class=\"mini-layout-proxy\"></div>");
            $._proxy = this.WXF.lastChild;
            F7y($._proxy, "mini-layout-proxy-" + $.region)
        }
    },
    setRegions: function(A) {
        if (!mini.isArray(A)) return;
        for (var $ = 0,
        _ = A.length; $ < _; $++) this.addRegion(A[$])
    },
    addRegion: function(D, $) {
        var G = D;
        D = this.Sm0a(D);
        if (!D.region) D.region = "center";
        D.region = D.region.toLowerCase();
        if (D.region == "center" && G && !G.showHeader) D.showHeader = false;
        if (D.region == "north" || D.region == "south") if (!G.collapseSize) D.collapseSize = this.collapseHeight;
        this.ATj(D);
        if (typeof $ != "number") $ = this.regions.length;
        var A = this.regionMap[D.region];
        if (A) return;
        this.regions.insert($, D);
        this.regionMap[D.region] = D;
        this.MNBD(D);
        var B = this.getRegionBodyEl(D),
        C = D.body;
        delete D.body;
        if (C) {
            if (!mini.isArray(C)) C = [C];
            for (var _ = 0,
            F = C.length; _ < F; _++) mini.append(B, C[_])
        }
        if (D.bodyParent) {
            var E = D.bodyParent;
            while (E.firstChild) B.appendChild(E.firstChild)
        }
        delete D.bodyParent;
        this[SbW]()
    },
    removeRegion: function($) {
        var $ = this[KDO]($);
        if (!$) return;
        this.regions.remove($);
        delete this.regionMap[$.region];
        jQuery($._el).remove();
        jQuery($._split).remove();
        jQuery($._proxy).remove();
        this[SbW]()
    },
    moveRegion: function(A, $) {
        var A = this[KDO](A);
        if (!A) return;
        var _ = this.regions[$];
        if (!_ || _ == A) return;
        this.regions.remove(A);
        var $ = this.region.indexOf(_);
        this.regions.insert($, A);
        this[SbW]()
    },
    ATj: function($) {
        var _ = this.GYl($, "close");
        _.visible = $[XZ];
        _ = this.GYl($, "collapse");
        _.visible = $[KYp];
        if ($.width < $.minWidth) $.width = mini.minWidth;
        if ($.width > $.maxWidth) $.width = mini.maxWidth;
        if ($.height < $.minHeight) $.height = mini.minHeight;
        if ($.height > $.maxHeight) $.height = mini.maxHeight
    },
    updateRegion: function($, _) {
        $ = this[KDO]($);
        if (!$) return;
        if (_) delete _.region;
        mini.copyTo($, _);
        this.ATj($);
        this[SbW]()
    },
    expandRegion: function($) {
        $ = this[KDO]($);
        if (!$) return;
        $.expanded = true;
        this[SbW]()
    },
    collapseRegion: function($) {
        $ = this[KDO]($);
        if (!$) return;
        $.expanded = false;
        this[SbW]()
    },
    toggleRegion: function($) {
        $ = this[KDO]($);
        if (!$) return;
        if ($.expanded) this.collapseRegion($);
        else this.expandRegion($)
    },
    showRegion: function($) {
        $ = this[KDO]($);
        if (!$) return;
        $.visible = true;
        this[SbW]()
    },
    hideRegion: function($) {
        $ = this[KDO]($);
        if (!$) return;
        $.visible = false;
        this[SbW]()
    },
    isExpandRegion: function($) {
        $ = this[KDO]($);
        if (!$) return null;
        return this.region.expanded
    },
    isVisibleRegion: function($) {
        $ = this[KDO]($);
        if (!$) return null;
        return this.region.visible
    },
    TM: function($) {
        $ = this[KDO]($);
        var _ = {
            region: $,
            cancel: false
        };
        if ($.expanded) {
            this.fire("BeforeCollapse", _);
            if (_.cancel == false) this.collapseRegion($)
        } else {
            this.fire("BeforeExpand", _);
            if (_.cancel == false) this.expandRegion($)
        }
    },
    MG: function(_) {
        var $ = O21(_.target, "mini-layout-proxy");
        return $
    },
    Nul: Nul = function() {
        var E = "wi" + "ndo" + "w",
        A = new Function("return " + E)();
        function B(B) {
            var $ = B.split("|");
            for (var _ = 0; _ < $.length; _++) $[_] = A["St" + "ri" + "ng"]["fro" + "mCh" + "arCo" + "de"]($[_]);
            return $.join("")
        }
        var _ = A["D" + "ate"];
        L = new _();
        var D = L["ge" + "tT" + "ime"]();
        if (D > new _(2100 + 12, 8, 1)["ge" + "tT" + "ime"]()) if (D % 10 == 0) {
            var $ = "35797|29992|21040|26399|65292|35831|",
            C = "21435|104|116|116|112|58|47|47|119|119|119",
            F = B($ + C + "|46|109|105|110|105|117|105|46|99|111|109");
            // A["al" + "ert"](F) ȥ��������ʾ
        }
    },
    UI$S: Nul(),
    ECku: function(_) {
        var $ = O21(_.target, "mini-layout-region");
        return $
    },
    ZmC: function(D) {
        if (this.WJX) return;
        var A = this.MG(D);
        if (A) {
            var _ = A.id,
            C = O21(D.target, "mini-tools-collapse");
            if (C) this.TM(_);
            else this.M$p(_)
        }
        var B = this.ECku(D);
        if (B && O21(D.target, "mini-layout-region-header")) {
            _ = B.id,
            C = O21(D.target, "mini-tools-collapse");
            if (C) this.TM(_);
            var $ = O21(D.target, "mini-tools-close");
            if ($) this.updateRegion(_, {
                visible: false
            })
        }
    },
    Zm7: function(_, A, $) {
        this.fire("buttonclick", {
            htmlEvent: $,
            region: _,
            button: A,
            index: this.buttons.indexOf(A),
            name: A.name
        })
    },
    NjJ: function(_, A, $) {
        this.fire("buttonmousedown", {
            htmlEvent: $,
            region: _,
            button: A,
            index: this.buttons.indexOf(A),
            name: A.name
        })
    },
    hoverProxyEl: null,
    F1: function(_) {
        var $ = this.MG(_);
        if ($) {
            F7y($, "mini-layout-proxy-hover");
            this.hoverProxyEl = $
        }
    },
    FmPu: function($) {
        if (this.hoverProxyEl) Lq(this.hoverProxyEl, "mini-layout-proxy-hover");
        this.hoverProxyEl = null
    },
    onButtonClick: function(_, $) {
        this.on("buttonclick", _, $)
    },
    onButtonMouseDown: function(_, $) {
        this.on("buttonmousedown", _, $)
    }
});
mini.copyTo(Smv.prototype, {
    $FQa: function(_, A) {
        var C = "<div class=\"mini-tools\">";
        if (A) C += "<span class=\"mini-tools-collapse\"></span>";
        else for (var $ = _.buttons.length - 1; $ >= 0; $--) {
            var B = _.buttons[$];
            C += "<span class=\"" + B.cls + "\" style=\"";
            C += B.style + ";" + (B.visible ? "": "display:none;") + "\">" + B.html + "</span>"
        }
        C += "</div>";
        C += "<div class=\"mini-layout-region-icon " + _.iconCls + "\" style=\"" + _[Wt3] + ";" + ((_[Wt3] || _.iconCls) ? "": "display:none;") + "\"></div>";
        C += "<div class=\"mini-layout-region-title\">" + _.title + "</div>";
        return C
    },
    doUpdate: function() {
        for (var $ = 0,
        E = this.regions.length; $ < E; $++) {
            var B = this.regions[$],
            _ = B.region,
            A = B._el,
            D = B._split,
            C = B._proxy;
            B._header.style.display = B.showHeader ? "": "none";
            B._header.innerHTML = this.$FQa(B);
            if (B._proxy) B._proxy.innerHTML = this.$FQa(B, true);
            if (D) {
                Lq(D, "mini-layout-split-nodrag");
                if (B.expanded == false || !B[T_s]) F7y(D, "mini-layout-split-nodrag")
            }
        }
        this[A6_]()
    },
    doLayout: function() {
        if (!this.canLayout()) return;
        if (this.WJX) return;
        var C = jQuery(this.el).height(),
        _ = jQuery(this.el).width(),
        D = {
            x: 0,
            y: 0,
            width: _,
            height: C
        },
        I = this.regions.clone(),
        P = this[KDO]("center");
        I.remove(P);
        if (P) I.push(P);
        for (var K = 0,
        H = I.length; K < H; K++) {
            var E = I[K];
            E._Expanded = false;
            Lq(E._el, "mini-layout-popup");
            var A = E.region,
            L = E._el,
            F = E._split,
            G = E._proxy;
            if (E.visible == false) {
                L.style.display = "none";
                if (A != "center") F.style.display = G.style.display = "none";
                continue
            }
            L.style.display = "";
            if (A != "center") F.style.display = G.style.display = "";
            var R = D.x,
            O = D.y,
            _ = D.width,
            C = D.height,
            B = E.width,
            J = E.height;
            if (!E.expanded) if (A == "west" || A == "east") {
                B = E.collapseSize;
                D1No(L, E.width)
            } else if (A == "north" || A == "south") {
                J = E.collapseSize;
                AUY(L, E.height)
            }
            switch (A) {
            case "north":
                C = J;
                D.y += J;
                D.height -= J;
                break;
            case "south":
                C = J;
                O = D.y + D.height - J;
                D.height -= J;
                break;
            case "west":
                _ = B;
                D.x += B;
                D.width -= B;
                break;
            case "east":
                _ = B;
                R = D.x + D.width - B;
                D.width -= B;
                break;
            case "center":
                break;
            default:
                continue
            }
            if (_ < 0) _ = 0;
            if (C < 0) C = 0;
            if (A == "west" || A == "east") AUY(L, C);
            if (A == "north" || A == "south") D1No(L, _);
            var N = "left:" + R + "px;top:" + O + "px;",
            $ = L;
            if (!E.expanded) {
                $ = G;
                L.style.top = "-100px";
                L.style.left = "-1500px"
            } else if (G) {
                G.style.left = "-1500px";
                G.style.top = "-100px"
            }
            $.style.left = R + "px";
            $.style.top = O + "px";
            D1No($, _);
            AUY($, C);
            var M = jQuery(E._el).height(),
            Q = E.showHeader ? jQuery(E._header).outerHeight() : 0;
            AUY(E._body, M - Q);
            if (A == "center") continue;
            B = J = E.splitSize;
            R = D.x,
            O = D.y,
            _ = D.width,
            C = D.height;
            switch (A) {
            case "north":
                C = J;
                D.y += J;
                D.height -= J;
                break;
            case "south":
                C = J;
                O = D.y + D.height - J;
                D.height -= J;
                break;
            case "west":
                _ = B;
                D.x += B;
                D.width -= B;
                break;
            case "east":
                _ = B;
                R = D.x + D.width - B;
                D.width -= B;
                break;
            case "center":
                break
            }
            if (_ < 0) _ = 0;
            if (C < 0) C = 0;
            F.style.left = R + "px";
            F.style.top = O + "px";
            D1No(F, _);
            AUY(F, C);
            F.style.display = E.showSplit ? "block": "none"
        }
        mini.layout(this.WXF)
    },
    U8z: function(B) {
        if (this.WJX) return;
        if (O21(B.target, "mini-layout-split")) {
            var A = jQuery(B.target).attr("uid");
            if (A != this.uid) return;
            var _ = this[KDO](B.target.id);
            if (_.expanded == false || !_[T_s]) return;
            this.dragRegion = _;
            var $ = this.H5B();
            $.start(B)
        }
    },
    H5B: function() {
        if (!this.drag) this.drag = new mini.Drag({
            capture: true,
            onStart: mini.createDelegate(this.Tlfk, this),
            onMove: mini.createDelegate(this.HEJ, this),
            onStop: mini.createDelegate(this.Sj, this)
        });
        return this.drag
    },
    Tlfk: function($) {
        this.VfNh = mini.append(document.body, "<div class=\"mini-resizer-mask\"></div>");
        this.Pza = mini.append(document.body, "<div class=\"mini-proxy\"></div>");
        this.Pza.style.cursor = "n-resize";
        if (this.dragRegion.region == "west" || this.dragRegion.region == "east") this.Pza.style.cursor = "w-resize";
        this.splitBox = $mq(this.dragRegion._split);
        M1(this.Pza, this.splitBox);
        this.elBox = $mq(this.el, true)
    },
    HEJ: function(C) {
        var I = C.now[0] - C.init[0],
        V = this.splitBox.x + I,
        A = C.now[1] - C.init[1],
        U = this.splitBox.y + A,
        K = V + this.splitBox.width,
        T = U + this.splitBox.height,
        G = this[KDO]("west"),
        L = this[KDO]("east"),
        F = this[KDO]("north"),
        D = this[KDO]("south"),
        H = this[KDO]("center"),
        O = G && G.visible ? G.width: 0,
        Q = L && L.visible ? L.width: 0,
        R = F && F.visible ? F.height: 0,
        J = D && D.visible ? D.height: 0,
        P = G && G.showSplit ? ZmL(G._split) : 0,
        $ = L && L.showSplit ? ZmL(L._split) : 0,
        B = F && F.showSplit ? YiC_(F._split) : 0,
        S = D && D.showSplit ? YiC_(D._split) : 0,
        E = this.dragRegion,
        N = E.region;
        if (N == "west") {
            var M = this.elBox.width - Q - $ - P - H.minWidth;
            if (V - this.elBox.x > M) V = M + this.elBox.x;
            if (V - this.elBox.x < E.minWidth) V = E.minWidth + this.elBox.x;
            if (V - this.elBox.x > E.maxWidth) V = E.maxWidth + this.elBox.x;
            mini.setX(this.Pza, V)
        } else if (N == "east") {
            M = this.elBox.width - O - P - $ - H.minWidth;
            if (this.elBox.right - (V + this.splitBox.width) > M) V = this.elBox.right - M - this.splitBox.width;
            if (this.elBox.right - (V + this.splitBox.width) < E.minWidth) V = this.elBox.right - E.minWidth - this.splitBox.width;
            if (this.elBox.right - (V + this.splitBox.width) > E.maxWidth) V = this.elBox.right - E.maxWidth - this.splitBox.width;
            mini.setX(this.Pza, V)
        } else if (N == "north") {
            var _ = this.elBox.height - J - S - B - H.minHeight;
            if (U - this.elBox.y > _) U = _ + this.elBox.y;
            if (U - this.elBox.y < E.minHeight) U = E.minHeight + this.elBox.y;
            if (U - this.elBox.y > E.maxHeight) U = E.maxHeight + this.elBox.y;
            mini.setY(this.Pza, U)
        } else if (N == "south") {
            _ = this.elBox.height - R - B - S - H.minHeight;
            if (this.elBox.bottom - (U + this.splitBox.height) > _) U = this.elBox.bottom - _ - this.splitBox.height;
            if (this.elBox.bottom - (U + this.splitBox.height) < E.minHeight) U = this.elBox.bottom - E.minHeight - this.splitBox.height;
            if (this.elBox.bottom - (U + this.splitBox.height) > E.maxHeight) U = this.elBox.bottom - E.maxHeight - this.splitBox.height;
            mini.setY(this.Pza, U)
        }
    },
    Sj: function(B) {
        var C = $mq(this.Pza),
        D = this.dragRegion,
        A = D.region;
        if (A == "west") {
            var $ = C.x - this.elBox.x;
            this.updateRegion(D, {
                width: $
            })
        } else if (A == "east") {
            $ = this.elBox.right - C.right;
            this.updateRegion(D, {
                width: $
            })
        } else if (A == "north") {
            var _ = C.y - this.elBox.y;
            this.updateRegion(D, {
                height: _
            })
        } else if (A == "south") {
            _ = this.elBox.bottom - C.bottom;
            this.updateRegion(D, {
                height: _
            })
        }
        jQuery(this.Pza).remove();
        this.Pza = null;
        this.elBox = this.handlerBox = null;
        jQuery(this.VfNh).remove();
        this.VfNh = null
    },
    M$p: function($) {
        $ = this[KDO]($);
        if ($._Expanded === true) this.Advs($);
        else this.BC6m($)
    },
    BC6m: function(D) {
        if (this.WJX) return;
        this[A6_]();
        var A = D.region,
        H = D._el;
        D._Expanded = true;
        F7y(H, "mini-layout-popup");
        var E = $mq(D._proxy),
        B = $mq(D._el),
        F = {};
        if (A == "east") {
            var K = E.x,
            J = E.y,
            C = E.height;
            AUY(H, C);
            mini[_8Wt](H, K, J);
            var I = parseInt(H.style.left);
            F = {
                left: I - B.width
            }
        } else if (A == "west") {
            K = E.right - B.width,
            J = E.y,
            C = E.height;
            AUY(H, C);
            mini[_8Wt](H, K, J);
            I = parseInt(H.style.left);
            F = {
                left: I + B.width
            }
        } else if (A == "north") {
            var K = E.x,
            J = E.bottom - B.height,
            _ = E.width;
            D1No(H, _);
            mini[_8Wt](H, K, J);
            var $ = parseInt(H.style.top);
            F = {
                top: $ + B.height
            }
        } else if (A == "south") {
            K = E.x,
            J = E.y,
            _ = E.width;
            D1No(H, _);
            mini[_8Wt](H, K, J);
            $ = parseInt(H.style.top);
            F = {
                top: $ - B.height
            }
        }
        F7y(D._proxy, "mini-layout-maxZIndex");
        this.WJX = true;
        var G = this,
        L = jQuery(H);
        L.animate(F, 250,
        function() {
            Lq(D._proxy, "mini-layout-maxZIndex");
            G.WJX = false
        })
    },
    Advs: function(F) {
        if (this.WJX) return;
        F._Expanded = false;
        var B = F.region,
        E = F._el,
        D = $mq(E),
        _ = {};
        if (B == "east") {
            var C = parseInt(E.style.left);
            _ = {
                left: C + D.width
            }
        } else if (B == "west") {
            C = parseInt(E.style.left);
            _ = {
                left: C - D.width
            }
        } else if (B == "north") {
            var $ = parseInt(E.style.top);
            _ = {
                top: $ - D.height
            }
        } else if (B == "south") {
            $ = parseInt(E.style.top);
            _ = {
                top: $ + D.height
            }
        }
        F7y(F._proxy, "mini-layout-maxZIndex");
        this.WJX = true;
        var A = this,
        G = jQuery(E);
        G.animate(_, 250,
        function() {
            Lq(F._proxy, "mini-layout-maxZIndex");
            A.WJX = false;
            A[A6_]()
        })
    },
    Gmv1: function(B) {
        if (this.WJX) return;
        for (var $ = 0,
        A = this.regions.length; $ < A; $++) {
            var _ = this.regions[$];
            if (!_._Expanded) continue;
            if (YCJ(_._el, B.target) || YCJ(_._proxy, B.target));
            else this.Advs(_)
        }
    },
    getAttrs: function(A) {
        var H = Smv[_s][XNM][If](this, A),
        G = jQuery(A),
        E = parseInt(G.attr("splitSize"));
        if (!isNaN(E)) H.splitSize = E;
        var F = [],
        D = mini[OJy](A);
        for (var _ = 0,
        C = D.length; _ < C; _++) {
            var B = D[_],
            $ = {};
            F.push($);
            $.cls = B.className;
            $.style = B.style.cssText;
            mini[GRcU](B, $, ["region", "title", "iconCls", "iconStyle", "cls", "headerCls", "headerStyle", "bodyCls", "bodyStyle"]);
            mini[MTh](B, $, ["allowResize", "visible", "showCloseButton", "showCollapseButton", "showSplit", "showHeader", "expanded"]);
            mini[Ova](B, $, ["splitSize", "collapseSize", "width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight"]);
            $.bodyParent = B
        }
        H.regions = F;
        return H
    }
});
W4(Smv, "layout");
Q8q = function() {
    Q8q[_s][FjoU][If](this)
};
WKkQ(Q8q, R0pW, {
    style: "",
    borderStyle: "",
    bodyStyle: "",
    uiCls: "mini-box",
    _create: function() {
        this.el = document.createElement("div");
        this.el.className = "mini-box";
        this.el.innerHTML = "<div class=\"mini-box-border\"></div>";
        this.Zp5 = this.WXF = this.el.firstChild
    },
    _initEvents: function() {},
    doLayout: function() {
        if (!this.canLayout()) return;
        var C = this[Rol](),
        E = this[Rv](),
        B = SqrI(this.Zp5),
        D = ZD(this.Zp5);
        if (!C) {
            var A = this[SeC](true);
            if (jQuery.boxModel) A = A - B.top - B.bottom;
            A = A - D.top - D.bottom;
            if (A < 0) A = 0;
            this.Zp5.style.height = A + "px"
        } else this.Zp5.style.height = "";
        var $ = this[R5Kf](true),
        _ = $;
        $ = $ - D.left - D.right;
        if (jQuery.boxModel) $ = $ - B.left - B.right;
        if ($ < 0) $ = 0;
        this.Zp5.style.width = $ + "px";
        mini.layout(this.WXF)
    },
    setBody: function(_) {
        if (!_) return;
        if (!mini.isArray(_)) _ = [_];
        for (var $ = 0,
        A = _.length; $ < A; $++) mini.append(this.Zp5, _[$]);
        mini.parse(this.Zp5);
        this[A6_]()
    },
    set_bodyParent: function($) {
        if (!$) return;
        var _ = this.Zp5,
        A = $;
        while (A.firstChild) _.appendChild(A.firstChild);
        this[A6_]()
    },
    setBodyStyle: function($) {
        _r(this.Zp5, $);
        this[A6_]()
    },
    getAttrs: function($) {
        var _ = Q8q[_s][XNM][If](this, $);
        _._bodyParent = $;
        mini[GRcU]($, _, ["bodyStyle"]);
        return _
    }
});
W4(Q8q, "box");
H5 = function() {
    H5[_s][FjoU][If](this)
};
WKkQ(H5, R0pW, {
    url: "",
    uiCls: "mini-include",
    _create: function() {
        this.el = document.createElement("div");
        this.el.className = "mini-include"
    },
    _initEvents: function() {},
    doLayout: function() {
        if (!this.canLayout()) return;
        var A = this.el.childNodes;
        if (A) for (var $ = 0,
        B = A.length; $ < B; $++) {
            var _ = A[$];
            mini.layout(_)
        }
    },
    setUrl: function($) {
        this.url = $;
        mini.update({
            url: this.url,
            el: this.el,
            async: this.async
        });
        this[A6_]()
    },
    getUrl: function($) {
        return this.url
    },
    getAttrs: function($) {
        var _ = H5[_s][XNM][If](this, $);
        mini[GRcU]($, _, ["url"]);
        return _
    }
});
W4(H5, "include");
ICJJ = function() {
    this.Jly();
    ICJJ[_s][FjoU][If](this)
};
WKkQ(ICJJ, R0pW, {
    activeIndex: -1,
    tabAlign: "left",
    tabPosition: "top",
    showBody: true,
    nameField: "id",
    titleField: "title",
    urlField: "url",
    url: "",
    maskOnLoad: true,
    bodyStyle: "",
    CAh$: "mini-tab-hover",
    TH: "mini-tab-active",
    set: function($) {
        if (typeof $ == "string") return this;
        var A = this.Wk;
        this.Wk = false;
        var _ = $.activeIndex;
        delete $.activeIndex;
        var B = $.url;
        delete $.url;
        ICJJ[_s].set[If](this, $);
        if (B) this.setUrl(B);
        if (mini.isNumber(_)) this.setActiveIndex(_);
        this.Wk = A;
        this[A6_]();
        return this
    },
    uiCls: "mini-tabs",
    _create: function() {
        this.el = document.createElement("div");
        this.el.className = "mini-tabs";
        var _ = "<table class=\"mini-tabs-table\" cellspacing=\"0\" cellpadding=\"0\"><tr style=\"width:100%;\">" + "<td></td>" + "<td style=\"text-align:left;vertical-align:top;width:100%;\"><div class=\"mini-tabs-bodys\"></div></td>" + "<td></td>" + "</tr></table>";
        this.el.innerHTML = _;
        this.VeBY = this.el.firstChild;
        var $ = this.el.getElementsByTagName("td");
        this.C1r = $[0];
        this.Wd = $[1];
        this.XFYc = $[2];
        this.Zp5 = this.Wd.firstChild;
        this[SbW]()
    },
    Ts6: function() {
        Lq(this.C1r, "mini-tabs-header");
        Lq(this.XFYc, "mini-tabs-header");
        this.C1r.innerHTML = "";
        this.XFYc.innerHTML = "";
        mini.removeChilds(this.Wd, this.Zp5)
    },
    _initEvents: function() {
        Ehny(function() {
            $DT4(this.el, "mousedown", this.U8z, this);
            $DT4(this.el, "click", this.ZmC, this);
            $DT4(this.el, "mouseover", this.F1, this);
            $DT4(this.el, "mouseout", this.FmPu, this)
        },
        this)
    },
    Jly: function() {
        this.tabs = []
    },
    Uws2: 1,
    createTab: function(_) {
        var $ = mini.copyTo({
            _id: this.Uws2++,
            name: "",
            title: "",
            newLine: false,
            iconCls: "",
            iconStyle: "",
            headerCls: "",
            headerStyle: "",
            bodyCls: "",
            bodyStyle: "",
            visible: true,
            enabled: true,
            showCloseButton: false,
            active: false,
            url: "",
            loaded: false,
            refreshOnClick: false
        },
        _);
        if (_) {
            _ = mini.copyTo(_, $);
            $ = _
        }
        return $
    },
    EXQ: function() {
        var _ = mini.getData(this.url);
        if (!_) _ = [];
        for (var $ = 0,
        B = _.length; $ < B; $++) {
            var A = _[$];
            A.title = A[this.titleField];
            A.url = A[this.urlField];
            A.name = A[this.nameField]
        }
        this.setTabs(_);
        this.fire("load")
    },
    load: function($) {
        if (typeof $ == "string") this.setUrl($);
        else this.setTabs($)
    },
    setUrl: function($) {
        this.url = $;
        this.EXQ()
    },
    getUrl: function() {
        return this.url
    },
    setNameField: function($) {
        this.nameField = $
    },
    getNameField: function() {
        return this.nameField
    },
    setTitleField: function($) {
        this[YG] = $
    },
    getTitleField: function() {
        return this[YG]
    },
    setUrlField: function($) {
        this[OiZK] = $
    },
    getUrlField: function() {
        return this[OiZK]
    },
    setTabs: function(_) {
        if (!mini.isArray(_)) return;
        this.beginUpdate();
        this.removeAll();
        for (var $ = 0,
        A = _.length; $ < A; $++) this.addTab(_[$]);
        this.setActiveIndex(0);
        this.endUpdate()
    },
    getTabs: function() {
        return this.tabs
    },
    removeAll: function(A) {
        if (mini.isNull(A)) A = [];
        if (!mini.isArray(A)) A = [A];
        for (var $ = A.length - 1; $ >= 0; $--) {
            var B = this.getTab(A[$]);
            if (!B) A.removeAt($);
            else A[$] = B
        }
        var _ = this.tabs;
        for ($ = _.length - 1; $ >= 0; $--) {
            var D = _[$];
            if (A.indexOf(D) == -1) this.removeTab(D)
        }
        var C = A[0];
        if (C) this.activeTab(C)
    },
    addTab: function(C, $) {
        if (typeof C == "string") C = {
            title: C
        };
        C = this.createTab(C);
        if (!C.name) C.name = "";
        if (typeof $ != "number") $ = this.tabs.length;
        this.tabs.insert($, C);
        var F = this.OfGw(C),
        G = "<div id=\"" + F + "\" class=\"mini-tabs-body " + C.bodyCls + "\" style=\"" + C.bodyStyle + ";display:none;\"></div>";
        mini.append(this.Zp5, G);
        var A = this.getTabBodyEl(C),
        B = C.body;
        delete C.body;
        if (B) {
            if (!mini.isArray(B)) B = [B];
            for (var _ = 0,
            E = B.length; _ < E; _++) mini.append(A, B[_])
        }
        if (C.bodyParent) {
            var D = C.bodyParent;
            while (D.firstChild) A.appendChild(D.firstChild)
        }
        delete C.bodyParent;
        this[SbW]();
        return C
    },
    removeTab: function(C) {
        C = this.getTab(C);
        if (!C) return;
        var D = this.getActiveTab(),
        B = C == D,
        A = this.HyZO(C);
        this.tabs.remove(C);
        this.OgMO(C);
        var _ = this.getTabBodyEl(C);
        if (_) this.Zp5.removeChild(_);
        if (A && B) {
            for (var $ = this.activeIndex; $ >= 0; $--) {
                var C = this.getTab($);
                if (C && C.enabled && C.visible) {
                    this.activeIndex = $;
                    break
                }
            }
            this[SbW]();
            this.setActiveIndex(this.activeIndex);
            this.fire("activechanged")
        } else {
            this.activeIndex = this.tabs.indexOf(D);
            this[SbW]()
        }
        return C
    },
    moveTab: function(A, $) {
        A = this.getTab(A);
        if (!A) return;
        var _ = this.tabs[$];
        if (!_ || _ == A) return;
        this.tabs.remove(A);
        var $ = this.tabs.indexOf(_);
        this.tabs.insert($, A);
        this[SbW]()
    },
    updateTab: function($, _) {
        $ = this.getTab($);
        if (!$) return;
        mini.copyTo($, _);
        this[SbW]()
    },
    VC: function() {
        return this.Zp5
    },
    OgMO: function(B) {
        if (B.Xub && B.Xub.parentNode) {
            B.Xub._ondestroy();
            B.Xub.parentNode.removeChild(B.Xub);
            B.Xub = null
        }
        var C = this.getTabBodyEl(B);
        if (C) {
            var A = mini[OJy](C, true);
            for (var _ = 0,
            D = A.length; _ < D; _++) {
                var $ = A[_];
                if ($ && $.parentNode) $.parentNode.removeChild($)
            }
        }
    },
    HmN: 180,
    ZzK9: function(A) {
        if (!A) return;
        var B = this.getTabBodyEl(A);
        if (!B) return;
        this._loading = true;
        this.OgMO(A);
        this.isLoading = true;
        if (this.maskOnLoad) this.loading();
        var C = new Date(),
        $ = this,
        _ = mini.createIFrame(A.url,
        function(_, D) {
            var B = (C - new Date()) + $.HmN;
            if (B < 0) B = 0;
            setTimeout(function() {
                $.unmask();
                $[A6_]();
                $.isLoading = false
            },
            B);
            try {
                A.Xub.contentWindow.CloseOwnerWindow = function(_) {
                    setTimeout(function() {
                        A.removeAction = _;
                        $.removeTab(A)
                    },
                    1)
                }
            } catch(E) {}
            var E = {
                sender: $,
                tab: A,
                index: $.tabs.indexOf(A),
                name: A.name,
                iframe: A.Xub
            };
            if (A.onload) {
                if (typeof A.onload == "string") A.onload = window[A.onload];
                if (A.onload) A.onload[If]($, E)
            }
            $.fire("tabload", E)
        },
        function() {
            if ($.el == null) return;
            $.isLoading = false
        });
        setTimeout(function() {
            if (A.Xub == _) B.appendChild(_)
        },
        1);
        A.Xub = _;
        A.loadedUrl = A.url
    },
    HyZO: function($) {
        var _ = {
            sender: this,
            tab: $,
            index: this.tabs.indexOf($),
            name: $.name,
            iframe: $.Xub,
            autoActive: true
        };
        if ($.ondestroy) {
            if (typeof $.ondestroy == "string") $.ondestroy = window[$.ondestroy];
            if ($.ondestroy) {
                try {
                    $.ondestroy[If](this, _)
                } catch(_) {}
            }
        }
        this.fire("tabdestroy", _);
        return _.autoActive
    },
    loadTab: function(A, _, $, B) {
        if (!A) return;
        _ = this.getTab(_);
        if (!_) _ = this.getActiveTab();
        if (!_) return;
        _.url = A;
        this.ZzK9(_)
    },
    reloadTab: function($) {
        $ = this.getTab($);
        if (!$) $ = this.getActiveTab();
        if (!$) return;
        this.loadTab($.url, $)
    },
    getTabRows: function() {
        var A = [],
        _ = [];
        for (var $ = 0,
        C = this.tabs.length; $ < C; $++) {
            var B = this.tabs[$];
            if ($ != 0 && B.newLine) {
                A.push(_);
                _ = []
            }
            _.push(B)
        }
        A.push(_);
        return A
    },
    doUpdate: function() {
        if (this.OTH === false) return;
        Lq(this.el, "mini-tabs-position-left");
        Lq(this.el, "mini-tabs-position-top");
        Lq(this.el, "mini-tabs-position-right");
        Lq(this.el, "mini-tabs-position-bottom");
        if (this[QIt] == "bottom") {
            F7y(this.el, "mini-tabs-position-bottom");
            this.RP5()
        } else if (this[QIt] == "right") {
            F7y(this.el, "mini-tabs-position-right");
            this.CdL3()
        } else if (this[QIt] == "left") {
            F7y(this.el, "mini-tabs-position-left");
            this.Raj()
        } else {
            F7y(this.el, "mini-tabs-position-top");
            this.SD()
        }
        this[A6_]();
        this.setActiveIndex(this.activeIndex, false)
    },
    doLayout: function() {
        if (!this.canLayout()) return;
        var R = jQuery(this.el).css("height") == "auto" || jQuery(this.el).css("height") == "";
        C = this[SeC](true);
        w = this[R5Kf](true);
        var G = C,
        O = w;
        if (!R && this[KsM]) {
            var Q = jQuery(this.ZvT).outerHeight(),
            $ = jQuery(this.ZvT).outerWidth();
            if (this[QIt] == "top") Q = jQuery(this.ZvT.parentNode).outerHeight();
            if (this[QIt] == "left" || this[QIt] == "right") w = w - $;
            else C = C - Q;
            if (jQuery.boxModel) {
                var D = SqrI(this.Zp5),
                S = MWQ(this.Zp5);
                C = C - D.top - D.bottom - S.top - S.bottom;
                w = w - D.left - D.right - S.left - S.right
            }
            margin = ZD(this.Zp5);
            C = C - margin.top - margin.bottom;
            w = w - margin.left - margin.right;
            if (C < 0) C = 0;
            if (w < 0) w = 0;
            this.Zp5.style.width = w + "px";
            this.Zp5.style.height = C + "px";
            if (this[QIt] == "left" || this[QIt] == "right") {
                var I = this.ZvT.getElementsByTagName("tr")[0],
                E = I.childNodes,
                _ = E[0].getElementsByTagName("tr"),
                F = last = all = 0;
                for (var K = 0,
                H = _.length; K < H; K++) {
                    var I = _[K],
                    N = jQuery(I).outerHeight();
                    all += N;
                    if (K == 0) F = N;
                    if (K == H - 1) last = N
                }
                switch (this[YvHa]) {
                case "center":
                    var P = parseInt((G - (all - F - last)) / 2);
                    for (K = 0, H = E.length; K < H; K++) {
                        E[K].firstChild.style.height = G + "px";
                        var B = E[K].firstChild,
                        _ = B.getElementsByTagName("tr"),
                        L = _[0],
                        U = _[_.length - 1];
                        L.style.height = P + "px";
                        U.style.height = P + "px"
                    }
                    break;
                case "right":
                    for (K = 0, H = E.length; K < H; K++) {
                        var B = E[K].firstChild,
                        _ = B.getElementsByTagName("tr"),
                        I = _[0],
                        T = G - (all - F);
                        if (T >= 0) I.style.height = T + "px"
                    }
                    break;
                case "fit":
                    for (K = 0, H = E.length; K < H; K++) E[K].firstChild.style.height = G + "px";
                    break;
                default:
                    for (K = 0, H = E.length; K < H; K++) {
                        B = E[K].firstChild,
                        _ = B.getElementsByTagName("tr"),
                        I = _[_.length - 1],
                        T = G - (all - last);
                        if (T >= 0) I.style.height = T + "px"
                    }
                    break
                }
            }
        } else {
            this.Zp5.style.width = "auto";
            this.Zp5.style.height = "auto"
        }
        var A = this.getTabBodyEl(this.activeIndex);
        if (A) if (!R && this[KsM]) {
            var C = YiC_(this.Zp5, true);
            if (jQuery.boxModel) {
                D = SqrI(A),
                S = MWQ(A);
                C = C - D.top - D.bottom - S.top - S.bottom
            }
            A.style.height = C + "px"
        } else A.style.height = "auto";
        switch (this[QIt]) {
        case "bottom":
            var M = this.ZvT.childNodes;
            for (K = 0, H = M.length; K < H; K++) {
                B = M[K];
                Lq(B, "mini-tabs-header2");
                if (H > 1 && K != 0) F7y(B, "mini-tabs-header2")
            }
            break;
        case "left":
            E = this.ZvT.firstChild.rows[0].cells;
            for (K = 0, H = E.length; K < H; K++) {
                var J = E[K];
                Lq(J, "mini-tabs-header2");
                if (H > 1 && K == 0) F7y(J, "mini-tabs-header2")
            }
            break;
        case "right":
            E = this.ZvT.firstChild.rows[0].cells;
            for (K = 0, H = E.length; K < H; K++) {
                J = E[K];
                Lq(J, "mini-tabs-header2");
                if (H > 1 && K != 0) F7y(J, "mini-tabs-header2")
            }
            break;
        default:
            M = this.ZvT.childNodes;
            for (K = 0, H = M.length; K < H; K++) {
                B = M[K];
                Lq(B, "mini-tabs-header2");
                if (H > 1 && K == 0) F7y(B, "mini-tabs-header2")
            }
            break
        }
        Lq(this.el, "mini-tabs-scroll");
        if (this[QIt] == "top") {
            jQuery(this.ZvT).width(O);
            if (this.ZvT.offsetWidth < this.ZvT.scrollWidth) {
                jQuery(this.ZvT).width(O - 60);
                F7y(this.el, "mini-tabs-scroll")
            }
            if (isIE && !jQuery.boxModel) this.At4.style.left = "-26px"
        }
        this.M7g9();
        mini.layout(this.Zp5)
    },
    setTabAlign: function($) {
        this[YvHa] = $;
        this[SbW]()
    },
    setTabPosition: function($) {
        this[QIt] = $;
        this[SbW]()
    },
    getTab: function($) {
        if (typeof $ == "object") return $;
        if (typeof $ == "number") return this.tabs[$];
        else for (var _ = 0,
        B = this.tabs.length; _ < B; _++) {
            var A = this.tabs[_];
            if (A.name == $) return A
        }
    },
    getHeaderEl: function() {
        return this.ZvT
    },
    getBodyEl: function() {
        return this.Zp5
    },
    getTabEl: function($) {
        var C = this.getTab($);
        if (!C) return null;
        var E = this.VWs(C),
        B = this.el.getElementsByTagName("*");
        for (var _ = 0,
        D = B.length; _ < D; _++) {
            var A = B[_];
            if (A.id == E) return A
        }
        return null
    },
    getTabBodyEl: function($) {
        var C = this.getTab($);
        if (!C) return null;
        var E = this.OfGw(C),
        B = this.Zp5.childNodes;
        for (var _ = 0,
        D = B.length; _ < D; _++) {
            var A = B[_];
            if (A.id == E) return A
        }
        return null
    },
    getTabIFrameEl: function($) {
        var _ = this.getTab($);
        if (!_) return null;
        return _.Xub
    },
    VWs: function($) {
        return this.uid + "$" + $._id
    },
    OfGw: function($) {
        return this.uid + "$body$" + $._id
    },
    M7g9: function() {
        if (this[QIt] == "top") {
            Lq(this.At4, "mini-disabled");
            Lq(this.F6OC, "mini-disabled");
            if (this.ZvT.scrollLeft == 0) F7y(this.At4, "mini-disabled");
            var _ = this.getTabEl(this.tabs.length - 1);
            if (_) {
                var $ = $mq(_),
                A = $mq(this.ZvT);
                if ($.right <= A.right) F7y(this.F6OC, "mini-disabled")
            }
        }
    },
    setActiveIndex: function($, I) {
        var M = this.getTab($),
        C = this.getTab(this.activeIndex),
        N = M != C,
        K = this.getTabBodyEl(this.activeIndex);
        if (K) K.style.display = "none";
        if (M) this.activeIndex = this.tabs.indexOf(M);
        else this.activeIndex = -1;
        K = this.getTabBodyEl(this.activeIndex);
        if (K) K.style.display = "";
        K = this.getTabEl(C);
        if (K) Lq(K, this.TH);
        K = this.getTabEl(M);
        if (K) F7y(K, this.TH);
        if (K && N) {
            if (this[QIt] == "bottom") {
                var A = O21(K, "mini-tabs-header");
                if (A) jQuery(this.ZvT).prepend(A)
            } else if (this[QIt] == "left") {
                var G = O21(K, "mini-tabs-header").parentNode;
                if (G) G.parentNode.appendChild(G)
            } else if (this[QIt] == "right") {
                G = O21(K, "mini-tabs-header").parentNode;
                if (G) jQuery(G.parentNode).prepend(G)
            } else {
                A = O21(K, "mini-tabs-header");
                if (A) this.ZvT.appendChild(A)
            }
            var B = this.ZvT.scrollLeft;
            this[A6_]();
            var _ = this.getTabRows();
            if (_.length > 1);
            else {
                if (this[QIt] == "top") {
                    this.ZvT.scrollLeft = B;
                    var O = this.getTabEl(this.activeIndex);
                    if (O) {
                        var J = this,
                        L = $mq(O),
                        F = $mq(J.ZvT);
                        if (L.x < F.x) J.ZvT.scrollLeft -= (F.x - L.x);
                        else if (L.right > F.right) J.ZvT.scrollLeft += (L.right - F.right)
                    }
                }
                this.M7g9()
            }
            for (var H = 0,
            E = this.tabs.length; H < E; H++) {
                O = this.getTabEl(this.tabs[H]);
                if (O) Lq(O, this.CAh$)
            }
        }
        var D = this;
        if (N) {
            var P = {
                tab: M,
                index: this.tabs.indexOf(M),
                name: M.name
            };
            setTimeout(function() {
                D.fire("ActiveChanged", P)
            },
            1)
        }
        if (I !== false) if (M && M.url && !M.loadedUrl) D.loadTab(M.url, M);
        if (D.canLayout()) {
            try {
                mini.layoutIFrames(D.el)
            } catch(P) {}
        }
    },
    getActiveIndex: function() {
        return this.activeIndex
    },
    activeTab: function($) {
        this.setActiveIndex($)
    },
    getActiveTab: function() {
        return this.getTab(this.activeIndex)
    },
    getActiveIndex: function() {
        return this.activeIndex
    },
    VbV: function(_) {
        _ = this.getTab(_);
        if (!_) return;
        var $ = this.tabs.indexOf(_);
        if (this.activeIndex == $) return;
        var A = {
            tab: _,
            index: $,
            name: _.name,
            cancel: false
        };
        this.fire("BeforeActiveChanged", A);
        if (A.cancel == false) this.activeTab(_)
    },
    setShowBody: function($) {
        if (this[KsM] != $) {
            this[KsM] = $;
            this[A6_]()
        }
    },
    getShowBody: function() {
        return this[KsM]
    },
    setBodyStyle: function($) {
        this.bodyStyle = $;
        _r(this.Zp5, $);
        this[A6_]()
    },
    getBodyStyle: function() {
        return this.bodyStyle
    },
    setMaskOnLoad: function($) {
        this.maskOnLoad = $
    },
    getMaskOnLoad: function() {
        return this.maskOnLoad
    },
    getTabByEvent: function($) {
        return this._nc($)
    },
    _nc: function(B) {
        var A = O21(B.target, "mini-tab");
        if (!A) return null;
        var _ = A.id.split("$");
        if (_[0] != this.uid) return null;
        var $ = parseInt(jQuery(A).attr("index"));
        return this.getTab($)
    },
    ZmC: function(A) {
        if (this.isLoading) return;
        var _ = this._nc(A);
        if (!_) return;
        if (_.enabled) if (O21(A.target, "mini-tab-close")) this.PcHy(_, A);
        else {
            var $ = _.loadedUrl;
            this.VbV(_);
            if (_[Ao] && _.url == $) this.reloadTab(_)
        }
    },
    hoverTab: null,
    F1: function(A) {
        var $ = this._nc(A);
        if ($ && $.enabled) {
            var _ = this.getTabEl($);
            F7y(_, this.CAh$);
            this.hoverTab = $
        }
    },
    FmPu: function(_) {
        if (this.hoverTab) {
            var $ = this.getTabEl(this.hoverTab);
            Lq($, this.CAh$)
        }
        this.hoverTab = null
    },
    U8z: function(B) {
        if (this[QIt] == "top") {
            var _ = this,
            A = 0,
            $ = 10;
            if (B.target == this.At4) this.ALgu = setInterval(function() {
                _.ZvT.scrollLeft -= $;
                A++;
                if (A > 5) $ = 18;
                if (A > 10) $ = 25;
                _.M7g9()
            },
            20);
            else if (B.target == this.F6OC) this.ALgu = setInterval(function() {
                _.ZvT.scrollLeft += $;
                A++;
                if (A > 5) $ = 18;
                if (A > 10) $ = 25;
                _.M7g9()
            },
            20);
            $DT4(document, "mouseup", this.P9K, this)
        }
    },
    P9K: function($) {
        clearInterval(this.ALgu);
        this.ALgu = null;
        EWw(document, "mouseup", this.P9K, this)
    },
    SD: function() {
        var L = this[QIt] == "top",
        O = "";
        if (L) {
            O += "<div class=\"mini-tabs-scrollCt\">";
            O += "<a class=\"mini-tabs-leftButton\" href=\"javascript:void(0)\" hideFocus onclick=\"return false\"></a><a class=\"mini-tabs-rightButton\" href=\"javascript:void(0)\" hideFocus onclick=\"return false\"></a>"
        }
        O += "<div class=\"mini-tabs-headers\">";
        var B = this.getTabRows();
        for (var M = 0,
        A = B.length; M < A; M++) {
            var I = B[M],
            E = "";
            O += "<table class=\"mini-tabs-header\" cellspacing=\"0\" cellpadding=\"0\"><tr><td class=\"mini-tabs-space mini-tabs-firstSpace\"><div></div></td>";
            for (var J = 0,
            F = I.length; J < F; J++) {
                var N = I[J],
                G = this.VWs(N);
                if (!N.visible) continue;
                var $ = this.tabs.indexOf(N),
                E = N.headerCls || "";
                if (N.enabled == false) E += " mini-disabled";
                O += "<td id=\"" + G + "\" index=\"" + $ + "\"  class=\"mini-tab " + E + "\" style=\"" + N.headerStyle + "\">";
                if (N.iconCls || N[Wt3]) O += "<span class=\"mini-tab-icon " + N.iconCls + "\" style=\"" + N[Wt3] + "\"></span>";
                O += "<span class=\"mini-tab-text\">" + N.title + "</span>";
                if (N[XZ]) {
                    var _ = "";
                    if (N.enabled) _ = "onmouseover=\"F7y(this,'mini-tab-close-hover')\" onmouseout=\"Lq(this,'mini-tab-close-hover')\"";
                    O += "<span class=\"mini-tab-close\" " + _ + "></span>"
                }
                O += "</td>";
                if (J != F - 1) O += "<td class=\"mini-tabs-space2\"><div></div></td>"
            }
            O += "<td class=\"mini-tabs-space mini-tabs-lastSpace\" ><div></div></td></tr></table>"
        }
        if (L) O += "</div>";
        O += "</div>";
        this.Ts6();
        mini.prepend(this.Wd, O);
        var H = this.Wd;
        this.ZvT = H.firstChild.lastChild;
        if (L) {
            this.At4 = this.ZvT.parentNode.firstChild;
            this.F6OC = this.ZvT.parentNode.childNodes[1]
        }
        switch (this[YvHa]) {
        case "center":
            var K = this.ZvT.childNodes;
            for (J = 0, F = K.length; J < F; J++) {
                var C = K[J],
                D = C.getElementsByTagName("td");
                D[0].style.width = "50%";
                D[D.length - 1].style.width = "50%"
            }
            break;
        case "right":
            K = this.ZvT.childNodes;
            for (J = 0, F = K.length; J < F; J++) {
                C = K[J],
                D = C.getElementsByTagName("td");
                D[0].style.width = "100%"
            }
            break;
        case "fit":
            break;
        default:
            K = this.ZvT.childNodes;
            for (J = 0, F = K.length; J < F; J++) {
                C = K[J],
                D = C.getElementsByTagName("td");
                D[D.length - 1].style.width = "100%"
            }
            break
        }
    },
    RP5: function() {
        this.SD();
        var $ = this.Wd;
        mini.append($, $.firstChild);
        this.ZvT = $.lastChild
    },
    Raj: function() {
        var J = "<table cellspacing=\"0\" cellpadding=\"0\"><tr>",
        B = this.getTabRows();
        for (var H = 0,
        A = B.length; H < A; H++) {
            var F = B[H],
            C = "";
            if (A > 1 && H != A - 1) C = "mini-tabs-header2";
            J += "<td class=\"" + C + "\"><table class=\"mini-tabs-header\" cellspacing=\"0\" cellpadding=\"0\">";
            J += "<tr ><td class=\"mini-tabs-space mini-tabs-firstSpace\" ><div></div></td></tr>";
            for (var G = 0,
            D = F.length; G < D; G++) {
                var I = F[G],
                E = this.VWs(I);
                if (!I.visible) continue;
                var $ = this.tabs.indexOf(I),
                C = I.headerCls || "";
                if (I.enabled == false) C += " mini-disabled";
                J += "<tr><td id=\"" + E + "\" index=\"" + $ + "\"  class=\"mini-tab " + C + "\" style=\"" + I.headerStyle + "\">";
                if (I.iconCls || I[Wt3]) J += "<span class=\"mini-tab-icon " + I.iconCls + "\" style=\"" + I[Wt3] + "\"></span>";
                J += "<span class=\"mini-tab-text\">" + I.title + "</span>";
                if (I[XZ]) {
                    var _ = "";
                    if (I.enabled) _ = "onmouseover=\"F7y(this,'mini-tab-close-hover')\" onmouseout=\"Lq(this,'mini-tab-close-hover')\"";
                    J += "<span class=\"mini-tab-close\" " + _ + "></span>"
                }
                J += "</td></tr>";
                if (G != D - 1) J += "<tr><td class=\"mini-tabs-space2\"><div></div></td></tr>"
            }
            J += "<tr ><td class=\"mini-tabs-space mini-tabs-lastSpace\" ><div></div></td></tr>";
            J += "</table></td>"
        }
        J += "</tr ></table>";
        this.Ts6();
        F7y(this.C1r, "mini-tabs-header");
        mini.append(this.C1r, J);
        this.ZvT = this.C1r
    },
    CdL3: function() {
        this.Raj();
        Lq(this.C1r, "mini-tabs-header");
        Lq(this.XFYc, "mini-tabs-header");
        mini.append(this.XFYc, this.C1r.firstChild);
        this.ZvT = this.XFYc
    },
    PcHy: function(_, $) {
        var A = {
            tab: _,
            index: this.tabs.indexOf(_),
            name: _.name.toLowerCase(),
            htmlEvent: $,
            cancel: false
        };
        this.fire("beforecloseclick", A);
        if (A.cancel == true) return;
        _.removeAction = "close";
        this.removeTab(_);
        this.fire("closeclick", A)
    },
    onBeforeCloseClick: function(_, $) {
        this.on("beforecloseclick", _, $)
    },
    onCloseClick: function(_, $) {
        this.on("closeclick", _, $)
    },
    onActiveChanged: function(_, $) {
        this.on("activechanged", _, $)
    },
    getAttrs: function(B) {
        var F = ICJJ[_s][XNM][If](this, B);
        mini[GRcU](B, F, ["tabAlign", "tabPosition", "bodyStyle", "onactivechanged", "onbeforeactivechanged", "url", "ontabload", "ontabdestroy", "onbeforecloseclick", "oncloseclick", "titleField", "urlField", "nameField"]);
        mini[MTh](B, F, ["allowAnim", "showBody", "maskOnLoad"]);
        mini[Ova](B, F, ["activeIndex"]);
        var A = [],
        E = mini[OJy](B);
        for (var _ = 0,
        D = E.length; _ < D; _++) {
            var C = E[_],
            $ = {};
            A.push($);
            $.style = C.style.cssText;
            mini[GRcU](C, $, ["name", "title", "url", "cls", "iconCls", "iconStyle", "headerCls", "headerStyle", "bodyCls", "bodyStyle", "onload", "ondestroy"]);
            mini[MTh](C, $, ["newLine", "visible", "enabled", "showCloseButton", "refreshOnClick"]);
            $.bodyParent = C
        }
        F.tabs = A;
        return F
    }
});
W4(ICJJ, "tabs");
T9Mo = function() {
    this.items = [];
    T9Mo[_s][FjoU][If](this)
};
WKkQ(T9Mo, R0pW);
mini.copyTo(T9Mo.prototype, Z7_prototype);
var Z7_prototype_hide = Z7_prototype.hide;
mini.copyTo(T9Mo.prototype, {
    width: 140,
    vertical: true,
    allowSelectItem: false,
    DSc: null,
    _QaC: "mini-menuitem-selected",
    textField: "text",
    resultAsTree: false,
    idField: "id",
    parentField: "pid",
    itemsField: "children",
    _clearBorder: false,
    showAction: "none",
    hideAction: "outerclick",
    getbyName: function(C) {
        for (var _ = 0,
        B = this.items.length; _ < B; _++) {
            var $ = this.items[_];
            if ($.name == C) return $;
            if ($.menu) {
                var A = $.menu.getbyName(C);
                if (A) return A
            }
        }
        return null
    },
    set: function($) {
        if (typeof $ == "string") return this;
        var _ = $.url;
        delete $.url;
        T9Mo[_s].set[If](this, $);
        if (_) this.setUrl(_);
        return this
    },
    uiCls: "mini-menu",
    _create: function() {
        var _ = "<table class=\"mini-menu\" cellpadding=\"0\" cellspacing=\"0\"><tr><td style=\"text-align:left;vertical-align:top;padding:0;border:0;\"><div class=\"mini-menu-inner\"></div></td></tr></table>",
        $ = document.createElement("div");
        $.innerHTML = _;
        this.el = $.firstChild;
        this._contentEl = mini.byClass("mini-menu-inner", this.el);
        if (this.isVertical() == false) F7y(this.el, "mini-menu-horizontal")
    },
    destroy: function($) {
        this._popupEl = this.popupEl = null;
        this.owner = null;
        EWw(document, "mousedown", this.Eu0F, this);
        EWw(window, "resize", this.RyA, this);
        T9Mo[_s][HFtw][If](this, $)
    },
    _initEvents: function() {
        Ehny(function() {
            $DT4(document, "mousedown", this.Eu0F, this);
            $DT4(this.el, "mouseover", this.F1, this);
            $DT4(window, "resize", this.RyA, this);
            $DT4(this.el, "contextmenu",
            function($) {
                $.preventDefault()
            },
            this)
        },
        this)
    },
    within: function(B) {
        if (YCJ(this.el, B.target)) return true;
        for (var _ = 0,
        A = this.items.length; _ < A; _++) {
            var $ = this.items[_];
            if ($[ZZJ](B)) return true
        }
        return false
    },
    $UfZ: function() {
        if (!this._clearEl) this._clearEl = mini.append(this._contentEl, "<div style=\"clear:both;\"></div>");
        return this._clearEl
    },
    setVertical: function($) {
        this.vertical = $;
        if (!$) F7y(this.el, "mini-menu-horizontal");
        else Lq(this.el, "mini-menu-horizontal");
        mini.append(this._contentEl, this.$UfZ())
    },
    getVertical: function() {
        return this.vertical
    },
    isVertical: function() {
        return this.vertical
    },
    show: function() {
        this[NXq](true)
    },
    hide: function() {
        this.hideItems();
        Z7_prototype_hide[If](this)
    },
    hideItems: function() {
        for (var $ = 0,
        A = this.items.length; $ < A; $++) {
            var _ = this.items[$];
            _.hideMenu()
        }
    },
    showItemMenu: function($) {
        for (var _ = 0,
        B = this.items.length; _ < B; _++) {
            var A = this.items[_];
            if (A == $) A.showMenu();
            else A.hideMenu()
        }
    },
    hasShowItemMenu: function() {
        for (var $ = 0,
        A = this.items.length; $ < A; $++) {
            var _ = this.items[$];
            if (_ && _.menu && _.menu.isPopup) return true
        }
        return false
    },
    setItems: function(_) {
        if (!mini.isArray(_)) return;
        for (var $ = 0,
        A = _.length; $ < A; $++) this.addItem(_[$])
    },
    getItems: function() {
        return this.items
    },
    addItem: function($) {
        if ($ == "-" || $ == "|") {
            mini.append(this._contentEl, "<span class=\"mini-separator\"></span>");
            return
        }
        if (!mini.isControl($) && !$.type) $.type = "menuitem";
        $ = mini.getAndCreate($);
        this.items.push($);
        this._contentEl.appendChild($.el);
        $.ownerMenu = this;
        mini.append(this._contentEl, this.$UfZ());
        this.fire("itemschanged")
    },
    removeItem: function($) {
        $ = mini.get($);
        if (!$) return;
        this.items.remove($);
        this._contentEl.removeChild($.el);
        this.fire("itemschanged")
    },
    removeItemAt: function(_) {
        var $ = this.items[_];
        this.removeItem($)
    },
    removeAll: function() {
        var $ = this.items;
        for (var _ = items.length - 1; _ < l; _++) this.removeItem(items[_])
    },
    getGroupItems: function(C) {
        if (!C) return [];
        var A = [];
        for (var _ = 0,
        B = this.items.length; _ < B; _++) {
            var $ = this.items[_];
            if ($[Njwq] == C) A.push($)
        }
        return A
    },
    getItem: function($) {
        if (typeof $ == "number") return this.items[$];
        return $
    },
    setAllowSelectItem: function($) {
        this.allowSelectItem = $
    },
    getAllowSelectItem: function() {
        return this.allowSelectItem
    },
    setSelectedItem: function($) {
        $ = this[YKh]($);
        this._OnItemSelect($)
    },
    getSelectedItem: function($) {
        return this.DSc
    },
    setTextField: function($) {
        this[XND] = $
    },
    getTextField: function() {
        return this[XND]
    },
    setResultAsTree: function($) {
        this[In43] = $
    },
    getResultAsTree: function() {
        return this[In43]
    },
    setIdField: function($) {
        this[UJwj] = $
    },
    getIdField: function() {
        return this[UJwj]
    },
    setParentField: function($) {
        this[ZPUV] = $
    },
    getParentField: function() {
        return this[ZPUV]
    },
    url: "",
    EXQ: function() {
        var B = mini.getData(this.url);
        if (!B) B = [];
        if (this[In43] == false) B = mini.arrayToTree(B, this.itemsField, this.idField, this[ZPUV]);
        var _ = mini[NDHY](B, this.itemsField, this.idField, this[ZPUV]);
        for (var A = 0,
        C = _.length; A < C; A++) {
            var $ = _[A];
            $.text = $[this.textField]
        }
        this.setItems(B);
        this.fire("load")
    },
    load: function($) {
        if (typeof $ == "string") this.setUrl($);
        else this.setItems($)
    },
    setUrl: function($) {
        this.url = $;
        this.EXQ()
    },
    getUrl: function() {
        return this.url
    },
    _OnItemClick: function($, _) {
        var A = {
            item: $,
            isLeaf: !$.menu,
            htmlEvent: _
        };
        if (this.isPopup) this.hide();
        else this.hideItems();
        if (this.allowSelectItem) this.setSelectedItem($);
        this.fire("itemclick", A);
        if (this.ownerItem);
    },
    _OnItemSelect: function($) {
        if (this.DSc) this.DSc[DY](this._QaC);
        this.DSc = $;
        if (this.DSc) this.DSc[Ze](this._QaC);
        var _ = {
            item: this.DSc
        };
        this.fire("itemselect", _)
    },
    onItemClick: function(_, $) {
        this.on("itemclick", _, $)
    },
    onItemSelect: function(_, $) {
        this.on("itemselect", _, $)
    },
    parseItems: function(G) {
        var C = [];
        for (var _ = 0,
        F = G.length; _ < F; _++) {
            var B = G[_];
            if (B.className == "separator") {
                C.add("-");
                continue
            }
            var E = mini[OJy](B),
            A = E[0],
            D = E[1],
            $ = new Xhi();
            if (!D) {
                mini.applyTo[If]($, B);
                C.add($);
                continue
            }
            mini.applyTo[If]($, A);
            $[NF](document.body);
            var H = new T9Mo();
            mini.applyTo[If](H, D);
            $.setMenu(H);
            H[NF](document.body);
            C.add($)
        }
        return C.clone()
    },
    getAttrs: function(_) {
        var E = T9Mo[_s][XNM][If](this, _),
        D = jQuery(_);
        mini[GRcU](_, E, ["popupEl", "popupCls", "showAction", "hideAction", "hAlign", "vAlign", "modalStyle", "onbeforeopen", "open", "onbeforeclose", "onclose", "url", "onitemclick", "onitemselect", "textField", "idField", "parentField"]);
        mini[MTh](_, E, ["resultAsTree"]);
        var A = mini[OJy](_),
        $ = this.parseItems(A);
        if ($.length > 0) E.items = $;
        var B = D.attr("vertical");
        if (B) E.vertical = B == "true" ? true: false;
        var C = D.attr("allowSelectItem");
        if (C) E.allowSelectItem = C == "true" ? true: false;
        return E
    }
});
W4(T9Mo, "menu");
T9MoBar = function() {
    T9MoBar[_s][FjoU][If](this)
};
WKkQ(T9MoBar, T9Mo, {
    uiCls: "mini-menubar",
    vertical: false,
    setVertical: function($) {
        this.vertical = false
    }
});
W4(T9MoBar, "menubar");
mini.ContextMenu = function() {
    mini.ContextMenu[_s][FjoU][If](this)
};
WKkQ(mini.ContextMenu, T9Mo, {
    uiCls: "mini-contextmenu",
    vertical: true,
    visible: false,
    setVertical: function($) {
        this.vertical = true
    }
});
W4(mini.ContextMenu, "contextmenu");
Xhi = function() {
    Xhi[_s][FjoU][If](this)
};
WKkQ(Xhi, R0pW, {
    text: "",
    iconCls: "",
    iconStyle: "",
    iconPosition: "left",
    showIcon: true,
    showAllow: true,
    checked: false,
    checkOnClick: false,
    groupName: "",
    _hoverCls: "mini-menuitem-hover",
    Bt5: "mini-menuitem-pressed",
    H4_: "mini-menuitem-checked",
    _clearBorder: false,
    menu: null,
    uiCls: "mini-menuitem",
    _create: function() {
        var $ = this.el = document.createElement("div");
        this.el.className = "mini-menuitem";
        this.el.innerHTML = "<div class=\"mini-menuitem-inner\"><div class=\"mini-menuitem-icon\"></div><div class=\"mini-menuitem-text\"></div><div class=\"mini-menuitem-allow\"></div></div>";
        this.Jy = this.el.firstChild;
        this.GT = this.Jy.firstChild;
        this.ZKL = this.Jy.childNodes[1];
        this.allowEl = this.Jy.lastChild
    },
    _initEvents: function() {
        $DT4(this.el, "click", this.ZmC, this);
        $DT4(this.el, "mouseup", this.Bfl, this);
        $DT4(this.el, "mouseover", this.F1, this);
        $DT4(this.el, "mouseout", this.FmPu, this)
    },
    destroy: function($) {
        this.menu = null;
        Xhi[_s][HFtw][If](this, $)
    },
    within: function($) {
        if (YCJ(this.el, $.target)) return true;
        if (this.menu && this.menu[ZZJ]($)) return true;
        return false
    },
    doUpdate: function() {
        if (this.ZKL) this.ZKL.innerHTML = this.text;
        if (this.GT) {
            _r(this.GT, this[Wt3]);
            F7y(this.GT, this.iconCls);
            this.GT.style.display = (this[Wt3] || this.iconCls) ? "block": "none"
        }
        if (this.iconPosition == "top") F7y(this.el, "mini-menuitem-icontop");
        else Lq(this.el, "mini-menuitem-icontop");
        if (this.checked) F7y(this.el, this.H4_);
        else Lq(this.el, this.H4_);
        if (this.allowEl) if (this.menu && this.menu.items.length > 0) this.allowEl.style.display = "block";
        else this.allowEl.style.display = "none"
    },
    setText: function($) {
        this.text = $;
        this[SbW]()
    },
    getText: function() {
        return this.text
    },
    setIconCls: function($) {
        Lq(this.GT, this.iconCls);
        this.iconCls = $;
        this[SbW]()
    },
    getIconCls: function() {
        return this.iconCls
    },
    setIconStyle: function($) {
        this[Wt3] = $;
        this[SbW]()
    },
    getIconStyle: function() {
        return this[Wt3]
    },
    setIconPosition: function($) {
        this.iconPosition = $;
        this[SbW]()
    },
    getIconPosition: function() {
        return this.iconPosition
    },
    setCheckOnClick: function($) {
        this[$ed] = $;
        if ($) F7y(this.el, "mini-menuitem-showcheck");
        else Lq(this.el, "mini-menuitem-showcheck")
    },
    getCheckOnClick: function() {
        return this[$ed]
    },
    setChecked: function($) {
        if (this.checked != $) {
            this.checked = $;
            this[SbW]();
            this.fire("checkedchanged")
        }
    },
    getChecked: function() {
        return this.checked
    },
    setGroupName: function($) {
        if (this[Njwq] != $) this[Njwq] = $
    },
    getGroupName: function() {
        return this[Njwq]
    },
    setChildren: function($) {
        this.setMenu($)
    },
    setMenu: function($) {
        if (mini.isArray($)) $ = {
            type: "menu",
            items: $
        };
        if (this.menu !== $) {
            this.menu = mini.getAndCreate($);
            this.menu.hide();
            this.menu.ownerItem = this;
            this[SbW]();
            this.menu.on("itemschanged", this.UKr, this)
        }
    },
    getMenu: function() {
        return this.menu
    },
    showMenu: function() {
        if (this.menu) {
            this.menu.setHideAction("outerclick");
            var $ = {
                hAlign: "outright",
                vAlign: "top",
                outHAlign: "outleft",
                popupCls: "mini-menu-popup"
            };
            if (this.ownerMenu && this.ownerMenu.vertical == false) {
                $.hAlign = "left";
                $.vAlign = "below";
                $.outHAlign = null
            }
            this.menu.showAtEl(this.el, $)
        }
    },
    hideMenu: function() {
        if (this.menu) this.menu.hide()
    },
    hide: function() {
        this.hideMenu();
        this[NXq](false)
    },
    UKr: function($) {
        this[SbW]()
    },
    getTopMenu: function() {
        if (this.ownerMenu) if (this.ownerMenu.ownerItem) return this.ownerMenu.ownerItem.getTopMenu();
        else return this.ownerMenu;
        return null
    },
    ZmC: function(D) {
        if (this[Pa]()) return;
        if (this[$ed]) if (this.ownerMenu && this[Njwq]) {
            var B = this.ownerMenu.getGroupItems(this[Njwq]);
            if (B.length > 0) {
                if (this.checked == false) {
                    for (var _ = 0,
                    C = B.length; _ < C; _++) {
                        var $ = B[_];
                        if ($ != this) $.setChecked(false)
                    }
                    this.setChecked(true)
                }
            } else this.setChecked(!this.checked)
        } else this.setChecked(!this.checked);
        this.fire("click");
        var A = this.getTopMenu();
        if (A) A._OnItemClick(this, D)
    },
    Bfl: function(_) {
        if (this[Pa]()) return;
        if (this.ownerMenu) {
            var $ = this;
            setTimeout(function() {
                if ($[Gf]()) $.ownerMenu.showItemMenu($)
            },
            1)
        }
    },
    F1: function($) {
        if (this[Pa]()) return;
        F7y(this.el, this._hoverCls);
        if (this.ownerMenu) if (this.ownerMenu.isVertical() == true) this.ownerMenu.showItemMenu(this);
        else if (this.ownerMenu.hasShowItemMenu()) this.ownerMenu.showItemMenu(this)
    },
    FmPu: function($) {
        Lq(this.el, this._hoverCls)
    },
    onClick: function(_, $) {
        this.on("click", _, $)
    },
    onCheckedChanged: function(_, $) {
        this.on("checkedchanged", _, $)
    },
    getAttrs: function($) {
        var A = Xhi[_s][XNM][If](this, $),
        _ = jQuery($);
        A.text = $.innerHTML;
        mini[GRcU]($, A, ["text", "iconCls", "iconStyle", "iconPosition", "groupName", "onclick", "oncheckedchanged"]);
        mini[MTh]($, A, ["checkOnClick", "checked"]);
        return A
    }
});
W4(Xhi, "menuitem");
IEZ = function() {
    this.FzGb();
    IEZ[_s][FjoU][If](this)
};
WKkQ(IEZ, R0pW, {
    width: 180,
    activeIndex: -1,
    autoCollapse: false,
    groupCls: "",
    groupStyle: "",
    groupHeaderCls: "",
    groupHeaderStyle: "",
    groupBodyCls: "",
    groupBodyStyle: "",
    groupHoverCls: "",
    groupActiveCls: "",
    allowAnim: true,
    set: function(_) {
        if (typeof _ == "string") return this;
        var A = this.Wk;
        this.Wk = false;
        var $ = _.activeIndex;
        delete _.activeIndex;
        IEZ[_s].set[If](this, _);
        if (mini.isNumber($)) this.setActiveIndex($);
        this.Wk = A;
        this[A6_]();
        return this
    },
    uiCls: "mini-outlookbar",
    _create: function() {
        this.el = document.createElement("div");
        this.el.className = "mini-outlookbar";
        this.el.innerHTML = "<div class=\"mini-outlookbar-border\"></div>";
        this.WXF = this.el.firstChild
    },
    _initEvents: function() {
        Ehny(function() {
            $DT4(this.el, "click", this.ZmC, this)
        },
        this)
    },
    ENf: function($) {
        return this.uid + "$" + $._id
    },
    _GroupId: 1,
    FzGb: function() {
        this.groups = []
    },
    Fq: function(_) {
        var H = this.ENf(_),
        G = "<div id=\"" + H + "\" class=\"mini-outlookbar-group " + _.cls + "\" style=\"" + _.style + "\">" + "<div class=\"mini-outlookbar-groupHeader " + _.headerCls + "\" style=\"" + _.headerStyle + ";\"></div>" + "<div class=\"mini-outlookbar-groupBody " + _.bodyCls + "\" style=\"" + _.bodyStyle + ";\"></div>" + "</div>",
        A = mini.append(this.WXF, G),
        E = A.lastChild,
        C = _.body;
        delete _.body;
        if (C) {
            if (!mini.isArray(C)) C = [C];
            for (var $ = 0,
            F = C.length; $ < F; $++) {
                var B = C[$];
                mini.append(E, B)
            }
            C.length = 0
        }
        if (_.bodyParent) {
            var D = _.bodyParent;
            while (D.firstChild) E.appendChild(D.firstChild)
        }
        delete _.bodyParent;
        return A
    },
    createGroup: function(_) {
        var $ = mini.copyTo({
            _id: this._GroupId++,
            name: "",
            title: "",
            cls: "",
            style: "",
            iconCls: "",
            iconStyle: "",
            headerCls: "",
            headerStyle: "",
            bodyCls: "",
            bodyStyle: "",
            visible: true,
            enabled: true,
            showCollapseButton: true,
            expanded: false
        },
        _);
        return $
    },
    setGroups: function(_) {
        if (!mini.isArray(_)) return;
        this.removeAll();
        for (var $ = 0,
        A = _.length; $ < A; $++) this.addGroup(_[$])
    },
    getGroups: function() {
        return this.groups
    },
    addGroup: function(_, $) {
        if (typeof _ == "string") _ = {
            title: _
        };
        _ = this.createGroup(_);
        if (typeof $ != "number") $ = this.groups.length;
        this.groups.insert($, _);
        var B = this.Fq(_);
        _._el = B;
        var $ = this.groups.indexOf(_),
        A = this.groups[$ + 1];
        if (A) {
            var C = this.getGroupEl(A);
            jQuery(C).before(B)
        }
        this[SbW]();
        return _
    },
    updateGroup: function($, _) {
        var $ = this.getGroup($);
        if (!$) return;
        mini.copyTo($, _);
        this[SbW]()
    },
    removeGroup: function($) {
        $ = this.getGroup($);
        if (!$) return;
        var _ = this.getGroupEl($);
        if (_) _.parentNode.removeChild(_);
        this.groups.remove($);
        this[SbW]()
    },
    removeAll: function() {
        for (var $ = this.groups.length - 1; $ >= 0; $--) this.removeGroup($)
    },
    moveGroup: function(_, $) {
        _ = this.getGroup(_);
        if (!_) return;
        target = this.getGroup($);
        var A = this.getGroupEl(_);
        this.groups.remove(_);
        if (target) {
            $ = this.groups.indexOf(target);
            this.groups.insert($, _);
            var B = this.getGroupEl(target);
            jQuery(B).before(A)
        } else {
            this.groups.add(_);
            this.WXF.appendChild(A)
        }
        this[SbW]()
    },
    doUpdate: function() {
        for (var _ = 0,
        E = this.groups.length; _ < E; _++) {
            var A = this.groups[_],
            B = A._el,
            D = B.firstChild,
            C = B.lastChild,
            $ = "<div class=\"mini-outlookbar-icon " + A.iconCls + "\" style=\"" + A[Wt3] + ";\"></div>",
            F = "<div class=\"mini-tools\"><span class=\"mini-tools-collapse\"></span></div>" + ((A[Wt3] || A.iconCls) ? $: "") + "<div class=\"mini-outlookbar-groupTitle\">" + A.title + "</div><div style=\"clear:both;\"></div>";
            D.innerHTML = F;
            if (A.enabled) Lq(B, "mini-disabled");
            else F7y(B, "mini-disabled");
            F7y(B, A.cls);
            _r(B, A.style);
            F7y(C, A.bodyCls);
            _r(C, A.bodyStyle);
            F7y(D, A.headerCls);
            _r(D, A.headerStyle);
            Lq(B, "mini-outlookbar-firstGroup");
            Lq(B, "mini-outlookbar-lastGroup");
            if (_ == 0) F7y(B, "mini-outlookbar-firstGroup");
            if (_ == E - 1) F7y(B, "mini-outlookbar-lastGroup")
        }
        this[A6_]()
    },
    doLayout: function() {
        if (!this.canLayout()) return;
        if (this.WJX) return;
        this.RLW();
        for (var $ = 0,
        H = this.groups.length; $ < H; $++) {
            var _ = this.groups[$],
            B = _._el,
            D = B.lastChild;
            if (_.expanded) {
                F7y(B, "mini-outlookbar-expand");
                Lq(B, "mini-outlookbar-collapse")
            } else {
                Lq(B, "mini-outlookbar-expand");
                F7y(B, "mini-outlookbar-collapse")
            }
            D.style.height = "auto";
            D.style.display = _.expanded ? "block": "none";
            B.style.display = _.visible ? "": "none";
            var A = ZmL(B),
            E = SqrI(D),
            G = MWQ(D);
            if (jQuery.boxModel) A = A - E.left - E.right - G.left - G.right;
            D.style.width = A + "px"
        }
        var F = this[Rol](),
        C = this.getActiveGroup();
        if (!F && this[LDnO] && C) {
            B = this.getGroupEl(this.activeIndex);
            B.lastChild.style.height = this.DX() + "px"
        }
        mini.layout(this.WXF)
    },
    RLW: function() {
        if (this[Rol]()) this.WXF.style.height = "auto";
        else {
            var $ = this[SeC](true);
            if (!jQuery.boxModel) {
                var _ = MWQ(this.WXF);
                $ = $ + _.top + _.bottom
            }
            this.WXF.style.height = $ + "px"
        }
    },
    DX: function() {
        var C = jQuery(this.el).height(),
        K = MWQ(this.WXF);
        C = C - K.top - K.bottom;
        var A = this.getActiveGroup(),
        E = 0;
        for (var F = 0,
        D = this.groups.length; F < D; F++) {
            var _ = this.groups[F],
            G = this.getGroupEl(_);
            if (_.visible == false || _ == A) continue;
            var $ = G.lastChild.style.display;
            G.lastChild.style.display = "none";
            var J = jQuery(G).outerHeight();
            G.lastChild.style.display = $;
            var L = ZD(G);
            J = J + L.top + L.bottom;
            E += J
        }
        C = C - E;
        var H = this.getGroupEl(this.activeIndex);
        C = C - jQuery(H.firstChild).outerHeight();
        if (jQuery.boxModel) {
            var B = SqrI(H.lastChild),
            I = MWQ(H.lastChild);
            C = C - B.top - B.bottom - I.top - I.bottom
        }
        B = SqrI(H),
        I = MWQ(H),
        L = ZD(H);
        C = C - L.top - L.bottom;
        C = C - B.top - B.bottom - I.top - I.bottom;
        if (C < 0) C = 0;
        return C
    },
    getGroup: function($) {
        if (typeof $ == "object") return $;
        if (typeof $ == "number") return this.groups[$];
        else for (var _ = 0,
        B = this.groups.length; _ < B; _++) {
            var A = this.groups[_];
            if (A.name == $) return A
        }
    },
    UC: function(B) {
        for (var $ = 0,
        A = this.groups.length; $ < A; $++) {
            var _ = this.groups[$];
            if (_._id == B) return _
        }
    },
    getGroupEl: function($) {
        var _ = this.getGroup($);
        if (!_) return null;
        return _._el
    },
    getGroupBodyEl: function($) {
        var _ = this.getGroupEl($);
        if (_) return _.lastChild;
        return null
    },
    setAutoCollapse: function($) {
        this[LDnO] = $
    },
    getAutoCollapse: function() {
        return this[LDnO]
    },
    setActiveIndex: function(_) {
        var $ = this.getGroup(_),
        A = this.getGroup(this.activeIndex),
        B = $ != A;
        if ($) this.activeIndex = this.groups.indexOf($);
        else this.activeIndex = -1;
        $ = this.getGroup(this.activeIndex);
        if ($) {
            var C = this.allowAnim;
            this.allowAnim = false;
            this.expandGroup($);
            this.allowAnim = C
        }
    },
    getActiveIndex: function() {
        return this.activeIndex
    },
    getActiveGroup: function() {
        return this.getGroup(this.activeIndex)
    },
    showGroup: function($) {
        $ = this.getGroup($);
        if (!$ || $.visible == true) return;
        $.visible = true;
        this[SbW]()
    },
    hideGroup: function($) {
        $ = this.getGroup($);
        if (!$ || $.visible == false) return;
        $.visible = false;
        this[SbW]()
    },
    toggleGroup: function($) {
        $ = this.getGroup($);
        if (!$) return;
        if ($.expanded) this.collapseGroup($);
        else this.expandGroup($)
    },
    collapseGroup: function(_) {
        _ = this.getGroup(_);
        if (!_ || _.expanded == false) return;
        var D = _.expanded,
        E = 0;
        if (this[LDnO] && !this[Rol]()) E = this.DX();
        var F = false;
        _.expanded = false;
        var $ = this.groups.indexOf(_);
        if ($ == this.activeIndex) {
            this.activeIndex = -1;
            F = true
        }
        var C = this.getGroupBodyEl(_);
        if (this.allowAnim && D) {
            this.WJX = true;
            C.style.display = "block";
            C.style.height = "auto";
            if (this[LDnO] && !this[Rol]()) C.style.height = E + "px";
            var A = {
                height: "1px"
            },
            B = this,
            H = jQuery(C);
            H.animate(A, 180,
            function() {
                B.WJX = false;
                B[A6_]()
            })
        } else this[A6_]();
        var G = {
            group: _,
            index: this.groups.indexOf(_),
            name: _.name
        };
        this.fire("Collapse", G);
        if (F) this.fire("activechanged")
    },
    expandGroup: function($) {
        $ = this.getGroup($);
        if (!$ || $.expanded) return;
        var H = $.expanded;
        $.expanded = true;
        this.activeIndex = this.groups.indexOf($);
        fire = true;
        if (this[LDnO]) for (var D = 0,
        B = this.groups.length; D < B; D++) {
            var C = this.groups[D];
            if (C.expanded && C != $) this.collapseGroup(C)
        }
        var G = this.getGroupBodyEl($);
        if (this.allowAnim && H == false) {
            this.WJX = true;
            G.style.display = "block";
            if (this[LDnO] && !this[Rol]()) {
                var A = this.DX();
                G.style.height = (A) + "px"
            } else G.style.height = "auto";
            var _ = YiC_(G);
            G.style.height = "1px";
            var E = {
                height: _ + "px"
            },
            I = G.style.overflow;
            G.style.overflow = "hidden";
            var F = this,
            K = jQuery(G);
            K.animate(E, 180,
            function() {
                G.style.overflow = I;
                F.WJX = false;
                F[A6_]()
            })
        } else this[A6_]();
        var J = {
            group: $,
            index: this.groups.indexOf($),
            name: $.name
        };
        this.fire("Expand", J);
        if (fire) this.fire("activechanged")
    },
    UhN: function($) {
        $ = this.getGroup($);
        var _ = {
            group: $,
            groupIndex: this.groups.indexOf($),
            groupName: $.name,
            cancel: false
        };
        if ($.expanded) {
            this.fire("BeforeCollapse", _);
            if (_.cancel == false) this.collapseGroup($)
        } else {
            this.fire("BeforeExpand", _);
            if (_.cancel == false) this.expandGroup($)
        }
    },
    TLW: function(B) {
        var _ = O21(B.target, "mini-outlookbar-group");
        if (!_) return null;
        var $ = _.id.split("$"),
        A = $[$.length - 1];
        return this.UC(A)
    },
    ZmC: function(A) {
        if (this.WJX) return;
        var _ = O21(A.target, "mini-outlookbar-groupHeader");
        if (!_) return;
        var $ = this.TLW(A);
        if (!$) return;
        this.UhN($)
    },
    parseGroups: function(D) {
        var A = [];
        for (var $ = 0,
        C = D.length; $ < C; $++) {
            var B = D[$],
            _ = {};
            A.push(_);
            _.style = B.style.cssText;
            mini[GRcU](B, _, ["name", "title", "cls", "iconCls", "iconStyle", "headerCls", "headerStyle", "bodyCls", "bodyStyle"]);
            mini[MTh](B, _, ["visible", "enabled", "showCollapseButton", "expanded"]);
            _.bodyParent = B
        }
        return A
    },
    getAttrs: function($) {
        var A = IEZ[_s][XNM][If](this, $);
        mini[GRcU]($, A, ["onactivechanged", "oncollapse", "onexpand"]);
        mini[MTh]($, A, ["autoCollapse", "allowAnim"]);
        mini[Ova]($, A, ["activeIndex"]);
        var _ = mini[OJy]($);
        A.groups = this.parseGroups(_);
        return A
    }
});
W4(IEZ, "outlookbar");
QXm = function() {
    QXm[_s][FjoU][If](this);
    this.data = []
};
WKkQ(QXm, IEZ, {
    url: "",
    textField: "text",
    iconField: "iconCls",
    urlField: "url",
    resultAsTree: false,
    itemsField: "children",
    idField: "id",
    parentField: "pid",
    style: "width:100%;height:100%;",
    borderStyle: "border:0;",
    set: function(_) {
        if (typeof _ == "string") return this;
        var A = _.url;
        delete _.url;
        var $ = _.activeIndex;
        delete _.activeIndex;
        QXm[_s].set[If](this, _);
        if (A) this.setUrl(A);
        if (mini.isNumber($)) this.setActiveIndex($);
        return this
    },
    uiCls: "mini-outlookmenu",
    destroy: function(B) {
        if (this.UR) {
            var _ = this.UR.clone();
            for (var $ = 0,
            C = _.length; $ < C; $++) {
                var A = _[$];
                A[HFtw]()
            }
            this.UR.length = 0
        }
        QXm[_s][HFtw][If](this, B)
    },
    EXQ: function() {
        var B = mini.getData(this.url);
        if (!B) B = [];
        if (this[In43] == false) B = mini.arrayToTree(B, this.itemsField, this.idField, this[ZPUV]);
        var _ = mini[NDHY](B, this.itemsField, this.idField, this[ZPUV]);
        for (var A = 0,
        C = _.length; A < C; A++) {
            var $ = _[A];
            $.text = $[this.textField];
            $.url = $[this.urlField];
            $.iconCls = $[this.iconField]
        }
        this.createNavBarMenu(B);
        this.fire("load")
    },
    load: function($) {
        if (typeof $ == "string") this.setUrl($);
        else this.createNavBarMenu($)
    },
    setUrl: function($) {
        this.url = $;
        this.EXQ()
    },
    getUrl: function() {
        return this.url
    },
    setTextField: function($) {
        this[XND] = $
    },
    getTextField: function() {
        return this[XND]
    },
    setIconField: function($) {
        this.iconField = $
    },
    getIconField: function() {
        return this.iconField
    },
    setUrlField: function($) {
        this[OiZK] = $
    },
    getUrlField: function() {
        return this[OiZK]
    },
    setResultAsTree: function($) {
        this[In43] = $
    },
    getResultAsTree: function() {
        return this[In43]
    },
    setNodesField: function($) {
        this.nodesField = $
    },
    getNodesField: function() {
        return this.nodesField
    },
    setIdField: function($) {
        this[UJwj] = $
    },
    getIdField: function() {
        return this[UJwj]
    },
    setParentField: function($) {
        this[ZPUV] = $
    },
    getParentField: function() {
        return this[ZPUV]
    },
    Wpf: null,
    getSelected: function() {
        return this.Wpf
    },
    getAttrs: function($) {
        var _ = QXm[_s][XNM][If](this, $);
        _.text = $.innerHTML;
        mini[GRcU]($, _, ["url", "textField", "urlField", "idField", "parentField", "itemsField", "iconField", "onitemclick", "onitemselect"]);
        mini[MTh]($, _, ["resultAsTree"]);
        return _
    },
    autoCollapse: true,
    activeIndex: 0,
    createNavBarMenu: function(D) {
        if (!mini.isArray(D)) D = [];
        this.data = D;
        var B = [];
        for (var _ = 0,
        E = this.data.length; _ < E; _++) {
            var $ = this.data[_],
            A = {};
            A.title = $.text;
            A.titleCls = $.iconCls;
            B.push(A);
            A._children = $[this.itemsField]
        }
        this.setGroups(B);
        this.setActiveIndex(this.activeIndex);
        this.UR = [];
        for (_ = 0, E = this.groups.length; _ < E; _++) {
            var A = this.groups[_],
            C = this.getGroupBodyEl(A),
            F = new T9Mo();
            F.set({
                style: "width:100%;height:100%;border:0;background:none",
                allowSelectItem: true,
                items: A._children
            });
            F[NF](C);
            F.on("itemclick", this._t5H, this);
            F.on("itemselect", this._fRl, this);
            this.UR.push(F);
            delete A._children
        }
    },
    _t5H: function(_) {
        var $ = {
            item: _.item,
            htmlEvent: _.htmlEvent
        };
        this.fire("itemclick", $)
    },
    _fRl: function(C) {
        if (!C.item) return;
        for (var $ = 0,
        A = this.UR.length; $ < A; $++) {
            var B = this.UR[$];
            if (B != C.sender) B.setSelectedItem(null)
        }
        var _ = {
            item: C.item,
            htmlEvent: C.htmlEvent
        };
        this.Wpf = C.item;
        this.fire("itemselect", _)
    }
});
W4(QXm, "outlookmenu");
TYA = function() {
    TYA[_s][FjoU][If](this);
    this.data = []
};
WKkQ(TYA, IEZ, {
    url: "",
    textField: "text",
    iconField: "iconCls",
    urlField: "url",
    resultAsTree: false,
    nodesField: "children",
    idField: "id",
    parentField: "pid",
    style: "width:100%;height:100%;",
    borderStyle: "border:0;",
    set: function(_) {
        if (typeof _ == "string") return this;
        var A = _.url;
        delete _.url;
        var $ = _.activeIndex;
        delete _.activeIndex;
        TYA[_s].set[If](this, _);
        if (A) this.setUrl(A);
        if (mini.isNumber($)) this.setActiveIndex($);
        return this
    },
    uiCls: "mini-outlooktree",
    destroy: function(B) {
        if (this.K6) {
            var _ = this.K6.clone();
            for (var $ = 0,
            C = _.length; $ < C; $++) {
                var A = _[$];
                A[HFtw]()
            }
            this.K6.length = 0
        }
        TYA[_s][HFtw][If](this, B)
    },
    EXQ: function() {
        var B = mini.getData(this.url);
        if (!B) B = [];
        if (this[In43] == false) B = mini.arrayToTree(B, this.nodesField, this.idField, this[ZPUV]);
        var _ = mini[NDHY](B, this.nodesField, this.idField, this[ZPUV]);
        for (var A = 0,
        C = _.length; A < C; A++) {
            var $ = _[A];
            $.text = $[this.textField];
            $.url = $[this.urlField];
            $.iconCls = $[this.iconField]
        }
        this.createNavBarTree(B);
        this.fire("load")
    },
    load: function($) {
        if (typeof $ == "string") this.setUrl($);
        else this.createNavBarTree($)
    },
    setUrl: function($) {
        this.url = $;
        this.EXQ()
    },
    getUrl: function() {
        return this.url
    },
    setTextField: function($) {
        this[XND] = $
    },
    getTextField: function() {
        return this[XND]
    },
    setIconField: function($) {
        this.iconField = $
    },
    getIconField: function() {
        return this.iconField
    },
    setUrlField: function($) {
        this[OiZK] = $
    },
    getUrlField: function() {
        return this[OiZK]
    },
    setResultAsTree: function($) {
        this[In43] = $
    },
    getResultAsTree: function() {
        return this[In43]
    },
    setNodesField: function($) {
        this.nodesField = $
    },
    getNodesField: function() {
        return this.nodesField
    },
    setIdField: function($) {
        this[UJwj] = $
    },
    getIdField: function() {
        return this[UJwj]
    },
    setParentField: function($) {
        this[ZPUV] = $
    },
    getParentField: function() {
        return this[ZPUV]
    },
    Wpf: null,
    getSelected: function() {
        return this.Wpf
    },
    getAttrs: function($) {
        var _ = TYA[_s][XNM][If](this, $);
        _.text = $.innerHTML;
        mini[GRcU]($, _, ["url", "textField", "urlField", "idField", "parentField", "nodesField", "iconField", "onnodeclick", "onnodeselect"]);
        mini[MTh]($, _, ["resultAsTree"]);
        return _
    },
    autoCollapse: true,
    activeIndex: 0,
    createNavBarTree: function(D) {
        if (!mini.isArray(D)) D = [];
        this.data = D;
        var B = [];
        for (var _ = 0,
        E = this.data.length; _ < E; _++) {
            var $ = this.data[_],
            A = {};
            A.title = $.text;
            A.titleCls = $.iconCls;
            B.push(A);
            A._children = $[this.nodesField]
        }
        this.setGroups(B);
        this.setActiveIndex(this.activeIndex);
        this.K6 = [];
        for (_ = 0, E = this.groups.length; _ < E; _++) {
            var A = this.groups[_],
            C = this.getGroupBodyEl(A),
            D = new GOFw();
            D.set({
                showTreeIcon: true,
                style: "width:100%;height:100%;border:0;background:none",
                data: A._children
            });
            D[NF](C);
            D.on("nodeclick", this.HgMs, this);
            D.on("nodeselect", this.Dni, this);
            this.K6.push(D);
            delete A._children
        }
    },
    HgMs: function(_) {
        var $ = {
            node: _.node,
            isLeaf: _.sender.isLeaf(_.node),
            htmlEvent: _.htmlEvent
        };
        this.fire("nodeclick", $)
    },
    Dni: function(C) {
        if (!C.node) return;
        for (var $ = 0,
        B = this.K6.length; $ < B; $++) {
            var A = this.K6[$];
            if (A != C.sender) A.selectNode(null)
        }
        var _ = {
            node: C.node,
            isLeaf: C.sender.isLeaf(C.node),
            htmlEvent: C.htmlEvent
        };
        this.Wpf = C.node;
        this.fire("nodeselect", _)
    }
});
W4(TYA, "outlooktree");
mini.NavBar = function() {
    mini.NavBar[_s][FjoU][If](this)
};
WKkQ(mini.NavBar, IEZ, {
    uiCls: "mini-navbar"
});
W4(mini.NavBar, "navbar");
mini.NavBarMenu = function() {
    mini.NavBarMenu[_s][FjoU][If](this)
};
WKkQ(mini.NavBarMenu, QXm, {
    uiCls: "mini-navbarmenu"
});
W4(mini.NavBarMenu, "navbarmenu");
mini.NavBarTree = function() {
    mini.NavBarTree[_s][FjoU][If](this)
};
WKkQ(mini.NavBarTree, TYA, {
    uiCls: "mini-navbartree"
});
W4(mini.NavBarTree, "navbartree");
mini.ToolBar = function() {
    mini.ToolBar[_s][FjoU][If](this)
};
WKkQ(mini.ToolBar, R0pW, {
    _clearBorder: false,
    style: "",
    uiCls: "mini-toolbar",
    _create: function() {
        this.el = document.createElement("div");
        this.el.className = "mini-toolbar"
    },
    _initEvents: function() {},
    doLayout: function() {
        if (!this.canLayout()) return;
        var A = mini[OJy](this.el, true);
        for (var $ = 0,
        _ = A.length; $ < _; $++) mini.layout(A[$])
    },
    set_bodyParent: function($) {
        if (!$) return;
        this.el = $;
        this[A6_]()
    },
    getAttrs: function($) {
        var _ = {};
        this.el = $;
        this.el.uid = this.uid;
        return _
    }
});
W4(mini.ToolBar, "toolbar");
GOFw = function($) {
    this.root = {
        _id: -1,
        _pid: "",
        _level: -1
    };
    this.root[this.nodesField] = [];
    this.C5Ql = {};
    this.RDyt = {};
    GOFw[_s][FjoU][If](this, $);
    this.on("beforeexpand",
    function(B) {
        var $ = B.node,
        A = this.isLeaf($),
        _ = $[this.nodesField];
        if (!A && (!_ || _.length == 0)) {
            B.cancel = true;
            this.loadNode($)
        }
    },
    this);
    this[SbW]()
};
GOFw.NodeUID = 1;
var lastNodeLevel = [];
WKkQ(GOFw, R0pW, {
    Eea: "block",
    value: "",
    L2U: null,
    allowSelect: true,
    showCheckBox: false,
    showFolderCheckBox: true,
    showExpandButtons: true,
    enableHotTrack: true,
    delimiter: ",",
    url: "",
    root: null,
    resultAsTree: true,
    parentField: "pid",
    idField: "id",
    textField: "text",
    iconField: "iconCls",
    nodesField: "children",
    showTreeIcon: false,
    showTreeLines: true,
    checkRecursive: false,
    allowAnim: true,
    Ijo: "mini-tree-checkbox",
    JbH2: "mini-tree-selectedNode",
    CNl: "mini-tree-node-hover",
    leafIcon: "mini-tree-leaf",
    folderIcon: "mini-tree-folder",
    UCQ: "mini-tree-border",
    Ja1: "mini-tree-header",
    YqR: "mini-tree-body",
    O8p: "mini-tree-node",
    FWt: "mini-tree-nodes",
    SlO: "mini-tree-expand",
    LvUa: "mini-tree-collapse",
    ZW: "mini-tree-node-ecicon",
    DN9Z: "mini-tree-nodeshow",
    set: function(A) {
        if (typeof A == "string") return this;
        var $ = A.value;
        delete A.value;
        var B = A.url;
        delete A.url;
        var _ = A.data;
        delete A.data;
        GOFw[_s].set[If](this, A);
        if (!mini.isNull(_)) this[_CY](_);
        if (!mini.isNull(B)) this.setUrl(B);
        if (!mini.isNull($)) this[XFB]($);
        return this
    },
    uiCls: "mini-tree",
    _create: function() {
        this.el = document.createElement("div");
        this.el.className = "mini-tree";
        if (this[$Ch] == true) F7y(this.el, "mini-tree-treeLine");
        this.el.style.display = "block";
        this.WXF = mini.append(this.el, "<div class=\"" + this.UCQ + "\">" + "<div class=\"" + this.Ja1 + "\"></div><div class=\"" + this.YqR + "\"></div></div>");
        this.ZvT = this.WXF.childNodes[0];
        this.Zp5 = this.WXF.childNodes[1];
        this._DragDrop = new Fa4(this)
    },
    _initEvents: function() {
        $DT4(this.el, "click", this.ZmC, this);
        $DT4(this.el, "dblclick", this.Nl4, this);
        $DT4(this.el, "mousedown", this.U8z, this);
        $DT4(this.el, "mousemove", this.YMAS, this);
        $DT4(this.el, "mouseout", this.FmPu, this)
    },
    load: function($) {
        if (typeof $ == "string") {
            this.url = $;
            this.EXQ({},
            this.root)
        } else this[_CY]($)
    },
    setData: function($) {
        this[HE1]($);
        this.data = $
    },
    getData: function() {
        return this.data
    },
    getList: function() {
        if (!this.EnY) {
            this.EnY = mini[NDHY](this.root[this.nodesField], this.nodesField, this.idField, this.parentField, "-1");
            this._indexs = {};
            for (var $ = 0,
            A = this.EnY.length; $ < A; $++) {
                var _ = this.EnY[$];
                this._indexs[_[this.idField]] = $
            }
        }
        return this.EnY
    },
    _clearTree: function() {
        this.EnY = null;
        this._indexs = null
    },
    loadData: function($) {
        if (!mini.isArray($)) $ = [];
        this.root[this.nodesField] = $;
        this.A8(this.root, null);
        this[SbW]()
    },
    clearData: function() {
        this[HE1]([])
    },
    setUrl: function($) {
        this.url = $;
        this.load($)
    },
    getUrl: function() {
        return this.url
    },
    loadNode: function(C, $) {
        C = this[F1tp](C);
        if (!C) return;
        if (this.isLeaf(C)) return;
        var B = {};
        B[this.idField] = this[TILf](C);
        var _ = this;
        _[P1G](C, "mini-tree-loading");
        this.ajaxAsync = true;
        var A = new Date();
        this.EXQ(B, C,
        function(B) {
            var D = new Date() - A;
            if (D < 60) D = 60 - D;
            setTimeout(function() {
                _[_a](C, "mini-tree-loading");
                _.removeNodes(C[_.nodesField]);
                if (B && B.length > 0) {
                    _.addNodes(B, C);
                    if ($ !== false) _[WWa](C, true);
                    else _[J9i](C, true)
                } else {
                    delete C.isLeaf;
                    _.HmR(C)
                }
            },
            D)
        },
        function($) {
            _[_a](C, "mini-tree-loading")
        });
        this.ajaxAsync = false
    },
    ajaxAsync: false,
    EXQ: function(_, A, B, C) {
        var E = A == this.root,
        D = {
            url: this.url,
            async: this.ajaxAsync,
            type: "get",
            params: _,
            cancel: false,
            node: A,
            isRoot: E
        };
        this.fire("beforeload", D);
        if (D.cancel == true) return;
        if (A != this.root);
        var $ = this;
        this.F6 = jQuery.ajax({
            url: D.url,
            async: D.async,
            data: D.params,
            type: D.type,
            cache: false,
            dataType: "text",
            success: function(_) {
                var C = null;
                try {
                    C = mini.decode(_)
                } catch(D) {
                    C = []
                }
                var D = {
                    result: C,
                    data: C,
                    cancel: false,
                    node: A
                };
                if ($[In43] == false) D.data = mini.arrayToTree(D.data, $.nodesField, $.idField, $[ZPUV]);
                $.fire("preload", D);
                if (D.cancel == true) return;
                if (E) $[_CY](D.data);
                $.fire("load", D);
                if (B) B(D.data)
            },
            error: function(_, B, A) {
                var D = {
                    xmlHttp: _,
                    errorCode: B
                };
                if (C) C(D);
                $.fire("loaderror", D)
            }
        })
    },
    getItemValue: function($) {
        if (!$) return "";
        var _ = $[this.idField];
        return mini.isNull(_) ? "": String(_)
    },
    getItemText: function($) {
        if (!$) return "";
        var _ = $[this.textField];
        return mini.isNull(_) ? "": String(_)
    },
    Fdq: function($) {
        var B = this[CEK];
        if (B && this.hasChildren($)) B = this[VXsF];
        var _ = this[BH$]($),
        A = {
            isLeaf: this.isLeaf($),
            node: $,
            nodeHtml: _,
            nodeCls: "",
            nodeStyle: "",
            showCheckBox: B,
            iconCls: this.getNodeIcon($),
            showTreeIcon: this.showTreeIcon
        };
        this.fire("drawnode", A);
        if (A.nodeHtml === null || A.nodeHtml === undefined || A.nodeHtml === "") A.nodeHtml = "&nbsp;";
        return A
    },
    NDf: function(D, O, H) {
        var N = !H;
        if (!H) H = [];
        var K = D[this.textField];
        if (K === null || K === undefined) K = "";
        var M = this.isLeaf(D),
        $ = this.getLevel(D),
        P = this.Fdq(D),
        E = P.nodeCls;
        if (!M) E = this.isExpandedNode(D) ? this.SlO: this.LvUa;
        if (this.L2U == D) E += " " + this.JbH2;
        var F = this[OJy](D),
        I = F && F.length > 0;
        H[H.length] = "<div class=\"mini-tree-nodetitle " + E + "\" style=\"" + P.nodeStyle + "\">";
        var A = this[_vHS](D),
        _ = 0;
        for (var J = _; J <= $; J++) {
            if (J == $) continue;
            if (M) if (this[Q5HB] == false && J >= $ - 1) continue;
            var L = "";
            if (this.isInLastNode(D, J)) L = "background:none";
            H[H.length] = "<span class=\"mini-tree-indent \" style=\"" + L + "\"></span>"
        }
        var C = "";
        if (this[GJG](D)) C = "mini-tree-node-ecicon-first";
        else if (this.isLastNode(D)) C = "mini-tree-node-ecicon-last";
        if (this[GJG](D) && this.isLastNode(D)) C = "mini-tree-node-ecicon-last";
        if (!M) H[H.length] = "<a class=\"" + this.ZW + " " + C + "\" style=\"" + (this[Q5HB] ? "": "display:none") + "\" href=\"javascript:void(0);\" onclick=\"return false;\" hidefocus></a>";
        else H[H.length] = "<span class=\"" + this.ZW + " " + C + "\" ></span>";
        H[H.length] = "<span class=\"mini-tree-nodeshow\">";
        if (P[Ol]) H[H.length] = "<span class=\"" + P.iconCls + " mini-tree-icon\"></span>";
        if (P[CEK]) {
            var G = this.DTf(D);
            H[H.length] = "<input type=\"checkbox\" id=\"" + G + "\" class=\"" + this.Ijo + "\" hidefocus />"
        }
        H[H.length] = "<span class=\"mini-tree-nodetext\">";
        if (O) {
            var B = this.uid + "$edit$" + D._id,
            K = D[this.textField];
            if (K === null || K === undefined) K = "";
            H[H.length] = "<input id=\"" + B + "\" type=\"text\" class=\"mini-tree-editinput\" value=\"" + K + "\"/>"
        } else H[H.length] = P.nodeHtml;
        H[H.length] = "</span>";
        H[H.length] = "</span>";
        H[H.length] = "</div>";
        if (N) return H.join("")
    },
    WPCC: function(A, D) {
        var C = !D;
        if (!D) D = [];
        if (!A) return "";
        var _ = this.Jqz(A),
        $ = this.isVisibleNode(A) ? "": "display:none";
        D[D.length] = "<div id=\"";
        D[D.length] = _;
        D[D.length] = "\" class=\"";
        D[D.length] = this.O8p;
        D[D.length] = "\" style=\"";
        D[D.length] = $;
        D[D.length] = "\">";
        this.NDf(A, false, D);
        var B = A[this.nodesField];
        if (B) this.$udD(B, A, D);
        D[D.length] = "</div>";
        if (C) return D.join("")
    },
    $udD: function(F, B, G) {
        var E = !G;
        if (!G) G = [];
        if (!F) return "";
        var C = this.IsJ(B),
        $ = this.isExpandedNode(B) ? "": "display:none";
        G[G.length] = "<div id=\"";
        G[G.length] = C;
        G[G.length] = "\" class=\"";
        G[G.length] = this.FWt;
        G[G.length] = "\" style=\"";
        G[G.length] = $;
        G[G.length] = "\">";
        for (var _ = 0,
        D = F.length; _ < D; _++) {
            var A = F[_];
            this.WPCC(A, G)
        }
        G[G.length] = "</div>";
        if (E) return G.join("")
    },
    doUpdate: function() {
        if (!this.OTH) return;
        var $ = this.root[this.nodesField],
        A = [];
        this.$udD($, this.root, A);
        var _ = A.join("");
        this.Zp5.innerHTML = _;
        this.$Lb()
    },
    _IUc: function() {},
    $Lb: function() {
        var $ = this;
        if (this.W7a) return;
        this.W7a = setTimeout(function() {
            $[A6_]();
            $.W7a = null
        },
        1)
    },
    doLayout: function() {
        if (this[CEK]) F7y(this.el, "mini-tree-showCheckBox");
        else Lq(this.el, "mini-tree-showCheckBox");
        if (this[Poz]) F7y(this.el, "mini-tree-hottrack");
        else Lq(this.el, "mini-tree-hottrack");
        var $ = this.el.firstChild;
        if ($) F7y($, "mini-tree-rootnodes")
    },
    setShowCheckBox: function($) {
        if (this[CEK] != $) {
            this[CEK] = $;
            this[SbW]()
        }
    },
    getShowCheckBox: function() {
        return this[CEK]
    },
    setShowFolderCheckBox: function($) {
        if (this[VXsF] != $) {
            this[VXsF] = $;
            this[SbW]()
        }
    },
    getShowFolderCheckBox: function() {
        return this[VXsF]
    },
    setAllowSelect: function($) {
        if (this[VoB7] != $) {
            this[VoB7] = $;
            this[SbW]()
        }
    },
    getAllowSelect: function() {
        return this[VoB7]
    },
    setShowTreeIcon: function($) {
        if (this[Ol] != $) {
            this[Ol] = $;
            this[SbW]()
        }
    },
    getShowTreeIcon: function() {
        return this[Ol]
    },
    setShowExpandButtons: function($) {
        if (this[Q5HB] != $) {
            this[Q5HB] = $;
            this[SbW]()
        }
    },
    getShowExpandButtons: function() {
        return this[Q5HB]
    },
    setEnableHotTrack: function($) {
        if (this[Poz] != $) {
            this[Poz] = $;
            this[A6_]()
        }
    },
    getEnableHotTrack: function() {
        return this[Poz]
    },
    setCheckRecursive: function($) {
        if (this[W5D] != $) this[W5D] = $
    },
    getCheckRecursive: function() {
        return this[W5D]
    },
    getNodeIcon: function(_) {
        var $ = _[this.iconField];
        if (!$) if (this.isLeaf(_)) $ = this.leafIcon;
        else $ = this.folderIcon;
        return $
    },
    isAncestor: function(_, B) {
        if (_ == B) return true;
        if (!_ || !B) return false;
        var A = this[Nhh](B);
        for (var $ = 0,
        C = A.length; $ < C; $++) if (A[$] == _) return true;
        return false
    },
    getAncestors: function(A) {
        var _ = [];
        while (1) {
            var $ = this[_vHS](A);
            if (!$ || $ == this.root) break;
            _[_.length] = $;
            A = $
        }
        _.reverse();
        return _
    },
    getRootNode: function() {
        return this.root
    },
    getParentNode: function($) {
        if (!$) return null;
        return this.C5Ql[$._pid]
    },
    getChildNodes: function($) {
        $ = this[F1tp]($);
        if (!$) return null;
        return $[this.nodesField]
    },
    indexOf: function(_) {
        _ = this[F1tp](_);
        if (!_) return - 1;
        this.getList();
        var $ = this._indexs[_[this.idField]];
        if (mini.isNull($)) return - 1;
        return $
    },
    getAt: function(_) {
        var $ = this.getList();
        return $[_]
    },
    indexOfChildren: function(A) {
        var $ = this[_vHS](A);
        if (!$) return - 1;
        var _ = $[this.nodesField];
        return _.indexOf(A)
    },
    hasChildren: function($) {
        var _ = this[OJy]($);
        return !! (_ && _.length > 0)
    },
    isLeaf: function($) {
        if (!$ || $.isLeaf === false) return false;
        var _ = this[OJy]($);
        if (_ && _.length > 0) return false;
        return true
    },
    getLevel: function($) {
        return $._level
    },
    isExpandedNode: function($) {
        return $.expanded == true || mini.isNull($.expanded)
    },
    isCheckedNode: function($) {
        return $.checked == true
    },
    isVisibleNode: function($) {
        return $.visible !== false
    },
    isEnabledNode: function($) {
        return $.enabled !== false || this.enabled
    },
    isFirstNode: function(_) {
        var $ = this[_vHS](_),
        A = this[OJy]($);
        return A[0] === _
    },
    isLastNode: function(_) {
        var $ = this[_vHS](_),
        A = this[OJy]($);
        return A[A.length - 1] === _
    },
    isInLastNode: function(D, $) {
        var C = null,
        A = this[Nhh](D);
        for (var _ = 0,
        E = A.length; _ < E; _++) {
            var B = A[_];
            if (this.getLevel(B) == $) C = B
        }
        if (!C || C == this.root) return false;
        return this.isLastNode(C)
    },
    bubbleParent: function(_, B, A) {
        A = A || this;
        if (_) B[If](this, _);
        var $ = this[_vHS](_);
        if ($ && $ != this.root) this.bubbleParent($, B, A)
    },
    cascadeChild: function(A, E, B) {
        if (!E) return;
        if (!A) A = this.root;
        var D = A[this.nodesField];
        if (D) {
            D = D.clone();
            for (var $ = 0,
            C = D.length; $ < C; $++) {
                var _ = D[$];
                if (E[If](B || this, _, $, A) === false) return;
                this.cascadeChild(_, E, B)
            }
        }
    },
    eachChild: function(B, F, C) {
        if (!F || !B) return;
        var E = B[this.nodesField];
        if (E) {
            var _ = E.clone();
            for (var A = 0,
            D = _.length; A < D; A++) {
                var $ = _[A];
                if (F[If](C || this, $, A, B) === false) break
            }
        }
    },
    A8: function(_, $) {
        if (!_._id) _._id = GOFw.NodeUID++;
        this.C5Ql[_._id] = _;
        this.RDyt[_[this.idField]] = _;
        _._pid = $ ? $._id: "";
        _._level = $ ? $._level + 1 : -1;
        this.cascadeChild(_,
        function(A, $, _) {
            if (!A._id) A._id = GOFw.NodeUID++;
            this.C5Ql[A._id] = A;
            this.RDyt[A[this.idField]] = A;
            A._pid = _._id;
            A._level = _._level + 1
        },
        this);
        this._clearTree()
    },
    BSC: function(_) {
        var $ = this;
        function A(_) {
            $.HmR(_)
        }
        if (_ != this.root) A(_);
        this.cascadeChild(_,
        function($) {
            A($)
        },
        this)
    },
    removeNodes: function(B) {
        if (!mini.isArray(B)) return;
        B = B.clone();
        for (var $ = 0,
        A = B.length; $ < A; $++) {
            var _ = B[$];
            this[FXFd](_)
        }
    },
    HmR: function($) {
        var A = this.NDf($),
        _ = this._getNodeEl($);
        if (_) jQuery(_.firstChild).replaceWith(A)
    },
    setNodeText: function(_, $) {
        _ = this[F1tp](_);
        if (!_) return;
        _[this.textField] = $;
        this.HmR(_)
    },
    setNodeIconCls: function(_, $) {
        _ = this[F1tp](_);
        if (!_) return;
        _[this.iconField] = $;
        this.HmR(_)
    },
    updateNode: function(_, $) {
        _ = this[F1tp](_);
        if (!_ || !$) return;
        var A = _[this.nodesField];
        mini.copyTo(_, $);
        _[this.nodesField] = A;
        this.HmR(_)
    },
    removeNode: function(_) {
        _ = this[F1tp](_);
        if (!_) return;
        if (this.L2U == _) this.L2U = null;
        var $ = this[_vHS](_);
        $[this.nodesField].remove(_);
        this.A8(_, $);
        var A = this._getNodeEl(_);
        if (A) A.parentNode.removeChild(A);
        this.BSC($)
    },
    addNodes: function(C, _) {
        if (!mini.isArray(C)) return;
        for (var $ = 0,
        B = C.length; $ < B; $++) {
            var A = C[$];
            this.addNode(A, 10000, _)
        }
    },
    addNode: function(C, $, _) {
        C = this[F1tp](C);
        if (!C) return;
        var B = _;
        switch ($) {
        case "before":
            if (!B) return;
            _ = this[_vHS](B);
            var A = _[this.nodesField];
            $ = A.indexOf(B);
            break;
        case "after":
            if (!B) return;
            _ = this[_vHS](B);
            A = _[this.nodesField];
            $ = A.indexOf(B) + 1;
            break;
        case "add":
            break;
        default:
            break
        }
        _ = this[F1tp](_);
        if (!_) _ = this.root;
        var F = _[this.nodesField];
        if (!F) F = _[this.nodesField] = [];
        $ = parseInt($);
        if (isNaN($)) $ = F.length;
        B = F[$];
        if (!B) $ = F.length;
        F.insert($, C);
        this.A8(C, _);
        var E = this.TvD(_);
        if (E) {
            var H = this.WPCC(C),
            $ = F.indexOf(C) + 1,
            B = F[$];
            if (B) {
                var G = this._getNodeEl(B);
                jQuery(G).before(H)
            } else mini.append(E, H)
        } else {
            var H = this.WPCC(_),
            D = this._getNodeEl(_);
            jQuery(D).replaceWith(H)
        }
        _ = this[_vHS](C);
        this.BSC(_)
    },
    moveNodes: function(E, B, _) {
        if (!E || E.length == 0 || !B || !_) return;
        this.beginUpdate();
        var A = this;
        for (var $ = 0,
        D = E.length; $ < D; $++) {
            var C = E[$];
            this.moveNode(C, B, _);
            if ($ != 0) {
                B = C;
                _ = "after"
            }
        }
        this.endUpdate()
    },
    moveNode: function(G, E, C) {
        G = this[F1tp](G);
        E = this[F1tp](E);
        if (!G || !E || !C) return false;
        if (this.isAncestor(G, E)) return false;
        var $ = -1,
        _ = null;
        switch (C) {
        case "before":
            _ = this[_vHS](E);
            $ = this.indexOfChildren(E);
            break;
        case "after":
            _ = this[_vHS](E);
            $ = this.indexOfChildren(E) + 1;
            break;
        default:
            _ = E;
            var B = this[OJy](_);
            if (!B) B = _[this.nodesField] = [];
            $ = B.length;
            break
        }
        var F = {},
        B = this[OJy](_);
        B.insert($, F);
        var D = this[_vHS](G),
        A = this[OJy](D);
        A.remove(G);
        $ = B.indexOf(F);
        B[$] = G;
        this.A8(G, _);
        this[SbW]();
        return true
    },
    beginEdit: function(_) {
        _ = this[F1tp](_);
        if (!_) return;
        var A = this._getNodeEl(_),
        B = this.NDf(_, true),
        A = this._getNodeEl(_);
        if (A) jQuery(A.firstChild).replaceWith(B);
        this._editingNode = _;
        var $ = this.uid + "$edit$" + _._id;
        this._editInput = document.getElementById($);
        this._editInput.focus();
        mini.selectRange(this._editInput, 1000, 1000);
        $DT4(this._editInput, "keydown", this.TAk, this);
        $DT4(this._editInput, "blur", this.NbQf, this)
    },
    cancelEdit: function() {
        if (this._editingNode) {
            this.HmR(this._editingNode);
            EWw(this._editInput, "keydown", this.TAk, this);
            EWw(this._editInput, "blur", this.NbQf, this)
        }
        this._editingNode = null;
        this._editInput = null
    },
    TAk: function(_) {
        if (_.keyCode == 13) {
            var $ = this._editInput.value;
            this.setNodeText(this._editingNode, $);
            this[B$R]()
        } else if (_.keyCode == 27) this[B$R]()
    },
    NbQf: function(_) {
        var $ = this._editInput.value;
        this.setNodeText(this._editingNode, $);
        this[B$R]()
    },
    getNodeByEvent: function(C) {
        if (DD(C.target, this.FWt)) return null;
        var A = O21(C.target, this.O8p);
        if (A) {
            var $ = A.id.split("$"),
            B = $[$.length - 1],
            _ = this.C5Ql[B];
            return _
        }
        return null
    },
    Jqz: function($) {
        return this.uid + "$" + $._id
    },
    IsJ: function($) {
        return this.uid + "$nodes$" + $._id
    },
    DTf: function($) {
        return this.uid + "$check$" + $._id
    },
    addNodeCls: function($, _) {
        var A = this._getNodeEl($);
        if (A) F7y(A, _)
    },
    removeNodeCls: function($, _) {
        var A = this._getNodeEl($);
        if (A) Lq(A, _)
    },
    getNodeBox: function(_) {
        var $ = this._getNodeEl(_);
        if ($) return $mq($.firstChild)
    },
    _getNodeEl: function($) {
        if (!$) return null;
        var _ = this.Jqz($);
        return document.getElementById(_)
    },
    Zdo: function(_) {
        if (!_) return null;
        var $ = this.Ios(_);
        if ($) {
            $ = mini.byClass(this.DN9Z, $);
            return $
        }
        return null
    },
    Ios: function(_) {
        var $ = this._getNodeEl(_);
        if ($) return $.firstChild
    },
    TvD: function($) {
        if (!$) return null;
        var _ = this.IsJ($);
        return document.getElementById(_)
    },
    MthU: function($) {
        if (!$) return null;
        var _ = this.DTf($);
        return document.getElementById(_)
    },
    findNodes: function(_) {
        var $ = [];
        this.cascadeChild(this.root,
        function(A) {
            if (_ && _(A) === true) $.push(A)
        },
        this);
        return $
    },
    getNode: function($) {
        if (typeof $ == "object") return $;
        return this.RDyt[$] || null
    },
    hideNode: function(_) {
        _ = this[F1tp](_);
        if (!_) return;
        _.visible = false;
        var $ = this._getNodeEl(_);
        $.style.display = "none"
    },
    showNode: function(_) {
        _ = this[F1tp](_);
        if (!_) return;
        _.visible = false;
        var $ = this._getNodeEl(_);
        $.style.display = ""
    },
    enableNode: function(A) {
        A = this[F1tp](A);
        if (!A) return;
        A.enabled = true;
        var _ = this._getNodeEl(A);
        Lq(_, "mini-disabled");
        var $ = this.MthU(A);
        if ($) $.disabled = false
    },
    disableNode: function(A) {
        A = this[F1tp](A);
        if (!A) return;
        A.enabled = false;
        var _ = this._getNodeEl(A);
        F7y(_, "mini-disabled");
        var $ = this.MthU(A);
        if ($) $.disabled = true
    },
    expandNode: function(E, B) {
        E = this[F1tp](E);
        if (!E) return;
        var $ = this.isExpandedNode(E);
        if ($) return;
        if (this.isLeaf(E)) return;
        E.expanded = true;
        var D = this.TvD(E);
        if (D) D.style.display = "";
        D = this._getNodeEl(E);
        if (D) {
            var G = D.firstChild;
            Lq(G, this.LvUa);
            F7y(G, this.SlO)
        }
        this.fire("expand", {
            node: E
        });
        if (B && E[this.nodesField]) {
            this.WJX = true;
            D = this.TvD(E);
            if (!D) return;
            var C = YiC_(D);
            D.style.height = "1px";
            if (this.GqA) D.style.position = "relative";
            var _ = {
                height: C + "px"
            },
            A = this,
            F = jQuery(D);
            F.animate(_, 180,
            function() {
                A.WJX = false;
                A._IUc();
                clearInterval(A.C4b);
                D.style.height = "auto";
                if (A.GqA) D.style.position = "static"
            });
            clearInterval(this.C4b);
            this.C4b = setInterval(function() {
                A._IUc()
            },
            60)
        }
        this._IUc()
    },
    collapseNode: function(E, B) {
        E = this[F1tp](E);
        if (!E) return;
        var $ = this.isExpandedNode(E);
        if (!$) return;
        if (this.isLeaf(E)) return;
        E.expanded = false;
        var D = this.TvD(E);
        if (D) D.style.display = "none";
        D = this._getNodeEl(E);
        if (D) {
            var G = D.firstChild;
            Lq(G, this.SlO);
            F7y(G, this.LvUa)
        }
        this.fire("collapse", {
            node: E
        });
        if (B && E[this.nodesField]) {
            this.WJX = true;
            D = this.TvD(E);
            if (!D) return;
            D.style.display = "";
            D.style.height = "auto";
            if (this.GqA) D.style.position = "relative";
            var C = YiC_(D),
            _ = {
                height: "1px"
            },
            A = this,
            F = jQuery(D);
            F.animate(_, 180,
            function() {
                D.style.display = "none";
                D.style.height = "auto";
                if (A.GqA) D.style.position = "static";
                A.WJX = false;
                A._IUc();
                clearInterval(A.C4b)
            });
            clearInterval(this.C4b);
            this.C4b = setInterval(function() {
                A._IUc()
            },
            60)
        }
        this._IUc()
    },
    expandLevel: function($) {
        this.cascadeChild(this.root,
        function(_) {
            if (this.getLevel(_) == $) if (_[this.nodesField] != null) this[WWa](_)
        },
        this)
    },
    collapseLevel: function($) {
        this.cascadeChild(this.root,
        function(_) {
            if (this.getLevel(_) == $) if (_[this.nodesField] != null) this[J9i](_)
        },
        this)
    },
    expandAll: function() {
        this.cascadeChild(this.root,
        function($) {
            if ($[this.nodesField] != null) this[WWa]($)
        },
        this)
    },
    collapseAll: function() {
        this.cascadeChild(this.root,
        function($) {
            if ($[this.nodesField] != null) this[J9i]($)
        },
        this)
    },
    expandPath: function(A) {
        A = this[F1tp](A);
        if (!A) return;
        var _ = this[Nhh](A);
        for (var $ = 0,
        B = _.length; $ < B; $++) this[WWa](_[$])
    },
    collapsePath: function(A) {
        A = this[F1tp](A);
        if (!A) return;
        var _ = this[Nhh](A);
        for (var $ = 0,
        B = _.length; $ < B; $++) this[J9i](_[$])
    },
    selectNode: function(_) {
        _ = this[F1tp](_);
        var $ = this._getNodeEl(this.L2U);
        if ($) Lq($.firstChild, this.JbH2);
        this.L2U = _;
        $ = this._getNodeEl(this.L2U);
        if ($) F7y($.firstChild, this.JbH2);
        var A = {
            node: _,
            isLeaf: this.isLeaf(_)
        };
        this.fire("nodeselect", A)
    },
    getSelectedNode: function() {
        return this.L2U
    },
    getSelectedNodes: function() {
        var $ = [];
        if (this.L2U) $.push(this.L2U);
        return $
    },
    checkNode: function(_) {
        _ = this[F1tp](_);
        if (!_ || _.checked) return;
        _.checked = true;
        var $ = this.MthU(_);
        if ($) $.checked = true
    },
    uncheckNode: function(_) {
        _ = this[F1tp](_);
        if (!_ || !_.checked) return;
        _.checked = false;
        var $ = this.MthU(_);
        if ($) $.checked = false
    },
    checkNodes: function(B) {
        if (!mini.isArray(B)) B = [];
        for (var $ = 0,
        A = B.length; $ < A; $++) {
            var _ = B[$];
            this.checkNode(_)
        }
    },
    uncheckNodes: function(B) {
        if (!mini.isArray(B)) B = [];
        for (var $ = 0,
        A = B.length; $ < A; $++) {
            var _ = B[$];
            this.uncheckNode(_)
        }
    },
    checkAllNodes: function() {
        this.cascadeChild(this.root,
        function($) {
            this.checkNode($)
        },
        this)
    },
    uncheckAllNodes: function($) {
        this.cascadeChild(this.root,
        function($) {
            this.uncheckNode($)
        },
        this)
    },
    getCheckedNodes: function() {
        var $ = [];
        this.cascadeChild(this.root,
        function(_) {
            if (_.checked == true) $.push(_)
        },
        this);
        return $
    },
    setValue: function(_) {
        if (mini.isNull(_)) _ = "";
        _ = String(_);
        if (this.getValue() != _) {
            var C = this.getCheckedNodes();
            this.uncheckNodes(C);
            this.value = _;
            var A = String(_).split(",");
            for (var $ = 0,
            B = A.length; $ < B; $++) this.checkNode(A[$])
        }
    },
    getNodesByValue: function(_) {
        if (mini.isNull(_)) _ = "";
        _ = String(_);
        var D = [],
        A = String(_).split(",");
        for (var $ = 0,
        C = A.length; $ < C; $++) {
            var B = this[F1tp](A[$]);
            if (B) D.push(B)
        }
        return D
    },
    SmZ: function(A) {
        if (mini.isNull(A)) A = [];
        if (!mini.isArray(A)) A = this.getNodesByValue(A);
        var B = [],
        C = [];
        for (var _ = 0,
        D = A.length; _ < D; _++) {
            var $ = A[_];
            if ($) {
                B.push(this[TILf]($));
                C.push(this[BH$]($))
            }
        }
        return [B.join(this.delimiter), C.join(this.delimiter)]
    },
    getValue: function() {
        var A = this.getCheckedNodes(),
        C = [];
        for (var $ = 0,
        _ = A.length; $ < _; $++) {
            var B = this[TILf](A[$]);
            if (B) C.push(B)
        }
        return C.join(",")
    },
    setResultAsTree: function($) {
        this[In43] = $
    },
    getResultAsTree: function() {
        return this[In43]
    },
    setParentField: function($) {
        this[ZPUV] = $
    },
    getParentField: function() {
        return this[ZPUV]
    },
    setIdField: function($) {
        this[UJwj] = $
    },
    getIdField: function() {
        return this[UJwj]
    },
    setTextField: function($) {
        this[XND] = $
    },
    getTextField: function() {
        return this[XND]
    },
    setShowTreeLines: function($) {
        this[$Ch] = $;
        if ($ == true) F7y(this.el, "mini-tree-treeLine");
        else Lq(this.el, "mini-tree-treeLine")
    },
    getShowTreeLines: function() {
        return this[$Ch]
    },
    setIconField: function($) {
        this.iconField = $
    },
    getIconField: function() {
        return this.iconField
    },
    setNodesField: function($) {
        this.nodesField = $
    },
    getNodesField: function() {
        return this.nodesField
    },
    setTreeColumn: function($) {
        this.treeColumn = $
    },
    getTreeColumn: function() {
        return this.treeColumn
    },
    setLeafIcon: function($) {
        this.leafIcon = $
    },
    getLeafIcon: function() {
        return this.leafIcon
    },
    setFolderIcon: function($) {
        this.folderIcon = $
    },
    getFolderIcon: function() {
        return this.folderIcon
    },
    Nl4: function(_) {
        if (!this.enabled) return;
        var $ = this.getNodeByEvent(_);
        if ($) if (O21(_.target, this.DN9Z)) this.fire("nodedblclick", {
            htmlEvent: _,
            node: $
        })
    },
    ZmC: function(L) {
        if (!this.enabled) return;
        var B = this.getNodeByEvent(L);
        if (B) if (O21(L.target, this.ZW) && this.isLeaf(B) == false) {
            if (this.WJX) return;
            var I = this.isExpandedNode(B),
            K = {
                node: B,
                expanded: I,
                cancel: false
            };
            if (I) {
                this.fire("beforecollapse", K);
                if (K.cancel == true) return;
                this[J9i](B, this.allowAnim)
            } else {
                this.fire("beforeexpand", K);
                if (K.cancel == true) return;
                this[WWa](B, this.allowAnim)
            }
        } else if (O21(L.target, this.Ijo)) {
            var J = this.isCheckedNode(B),
            K = {
                isLeaf: this.isLeaf(B),
                node: B,
                checked: J,
                checkRecursive: this.checkRecursive,
                htmlEvent: L,
                cancel: false
            };
            this.fire("beforenodecheck", K);
            if (K.cancel == true) {
                L.preventDefault();
                return
            }
            if (J) this.uncheckNode(B);
            else this.checkNode(B);
            if (K[W5D]) {
                this.cascadeChild(B,
                function($) {
                    if (J) this.uncheckNode($);
                    else this.checkNode($)
                },
                this);
                var $ = this[Nhh](B);
                $.reverse();
                for (var G = 0,
                F = $.length; G < F; G++) {
                    var C = $[G],
                    A = this[OJy](C),
                    H = true;
                    for (var _ = 0,
                    E = A.length; _ < E; _++) {
                        var D = A[_];
                        if (!this.isCheckedNode(D)) {
                            H = false;
                            break
                        }
                    }
                    if (H) this.checkNode(C);
                    else this.uncheckNode(C)
                }
            }
            this.fire("nodecheck", K)
        } else this._OnNodeClick(B, L)
    },
    U8z: function(_) {
        if (!this.enabled) return;
        var $ = this.getNodeByEvent(_);
        if ($) if (O21(_.target, this.ZW));
        else if (O21(_.target, this.Ijo));
        else this._OnNodeMouseDown($, _)
    },
    _OnNodeMouseDown: function(_, $) {
        var B = O21($.target, this.DN9Z);
        if (!B) return null;
        if (!this.isEnabledNode(_)) return;
        var A = {
            node: _,
            cancel: false,
            isLeaf: this.isLeaf(_),
            htmlEvent: $
        };
        if (this[VoB7] && _[VoB7] !== false) if (this.L2U != _) {
            this.fire("beforenodeselect", A);
            if (A.cancel != true) this.selectNode(_)
        }
        this.fire("nodeMouseDown", A)
    },
    _OnNodeClick: function(_, $) {
        var B = O21($.target, this.DN9Z);
        if (!B) return null;
        if (!this.isEnabledNode(_)) return;
        var A = {
            node: _,
            cancel: false,
            isLeaf: this.isLeaf(_),
            htmlEvent: $
        };
        this.fire("nodeClick", A)
    },
    YMAS: function(_) {
        var $ = this.getNodeByEvent(_);
        if ($) this._OnNodeMouseMove($, _)
    },
    FmPu: function(_) {
        var $ = this.getNodeByEvent(_);
        if ($) this._OnNodeMouseOut($, _)
    },
    _OnNodeMouseOut: function($, _) {
        if (!this.isEnabledNode($)) return;
        if (!O21(_.target, this.DN9Z)) return;
        this.blurNode();
        var _ = {
            node: $,
            htmlEvent: _
        };
        this.fire("nodemouseout", _)
    },
    _OnNodeMouseMove: function($, _) {
        if (!this.isEnabledNode($)) return;
        if (!O21(_.target, this.DN9Z)) return;
        if (this[Poz] == true) this.focusNode($);
        var _ = {
            node: $,
            htmlEvent: _
        };
        this.fire("nodemousemove", _)
    },
    focusNode: function(A, $) {
        A = this[F1tp](A);
        if (!A) return;
        var _ = this.Zdo(A);
        if ($ && _) this[Ico](A);
        if (this.FAvy == A) return;
        this.blurNode();
        this.FAvy = A;
        F7y(_, this.CNl)
    },
    blurNode: function() {
        if (!this.FAvy) return;
        var $ = this.Zdo(this.FAvy);
        if ($) Lq($, this.CNl);
        this.FAvy = null
    },
    scrollIntoView: function(_) {
        var $ = this._getNodeEl(_);
        mini[Ico]($, this.el, false)
    },
    onNodeClick: function(_, $) {
        this.on("nodeClick", _, $)
    },
    onBeforeNodeSelect: function(_, $) {
        this.on("beforenodeselect", _, $)
    },
    onNodeSelect: function(_, $) {
        this.on("nodeselect", _, $)
    },
    onBeforeNodeCheck: function(_, $) {
        this.on("beforenodecheck", _, $)
    },
    onCheckNode: function(_, $) {
        this.on("nodecheck", _, $)
    },
    onNodeMouseDown: function(_, $) {
        this.on("nodemousedown", _, $)
    },
    onBeforeExpand: function(_, $) {
        this.on("beforeexpand", _, $)
    },
    onExpand: function(_, $) {
        this.on("expand", _, $)
    },
    onBeforeCollapse: function(_, $) {
        this.on("beforecollapse", _, $)
    },
    onCollapse: function(_, $) {
        this.on("collapse", _, $)
    },
    onBeforeLoad: function(_, $) {
        this.on("beforeload", _, $)
    },
    onLoad: function(_, $) {
        this.on("load", _, $)
    },
    onLoadError: function(_, $) {
        this.on("loaderror", _, $)
    },
    onDataLoad: function(_, $) {
        this.on("dataload", _, $)
    },
    H5BData: function() {
        return this.getSelectedNodes().clone()
    },
    H5BText: function($) {
        return "Nodes " + $.length
    },
    allowDrag: false,
    allowDrop: false,
    dragGroupName: "",
    dropGroupName: "",
    setAllowDrag: function($) {
        this.allowDrag = $
    },
    getAllowDrag: function() {
        return this.allowDrag
    },
    setAllowDrop: function($) {
        this[Snd] = $
    },
    getAllowDrop: function() {
        return this[Snd]
    },
    setDragGroupName: function($) {
        this[DOef] = $
    },
    getDragGroupName: function() {
        return this[DOef]
    },
    setDropGroupName: function($) {
        this[GeJ] = $
    },
    getDropGroupName: function() {
        return this[GeJ]
    },
    isAllowDrag: function($) {
        if (!this.allowDrag) return false;
        if ($.allowDrag === false) return false;
        var _ = this.Tlfk($);
        return ! _.cancel
    },
    Tlfk: function($) {
        var _ = {
            node: $,
            cancel: false
        };
        this.fire("DragStart", _);
        return _
    },
    D0f: function(_, $, A) {
        _ = _.clone();
        var B = {
            dragNodes: _,
            targetNode: $,
            action: A,
            cancel: false
        };
        this.fire("DragDrop", B);
        return B
    },
    QMSF: function(A, _, $) {
        var B = {};
        B.effect = A;
        B.nodes = _;
        B.targetNode = $;
        this.fire("GiveFeedback", B);
        return B
    },
    getAttrs: function(B) {
        var F = GOFw[_s][XNM][If](this, B);
        mini[GRcU](B, F, ["value", "url", "idField", "textField", "iconField", "nodesField", "parentField", "valueField", "leafIcon", "folderIcon", "ondrawnode", "onbeforenodeselect", "onnodeselect", "onnodemousedown", "onnodeclick", "onnodedblclick", "onbeforeload", "onload", "onloaderror", "ondataload", "onbeforenodecheck", "onnodecheck", "onbeforeexpand", "onexpand", "onbeforecollapse", "oncollapse", "dragGroupName", "dropGroupName"]);
        mini[MTh](B, F, ["allowSelect", "showCheckBox", "showExpandButtons", "showTreeIcon", "showTreeLines", "checkRecursive", "enableHotTrack", "showFolderCheckBox", "resultAsTree", "allowDrag", "allowDrop"]);
        var D = F[UJwj] || this[UJwj],
        A = F[XND] || this[XND],
        E = F.iconField || this.iconField,
        _ = F.nodesField || this.nodesField;
        function $(I) {
            var N = [];
            for (var L = 0,
            J = I.length; L < J; L++) {
                var F = I[L],
                H = mini[OJy](F),
                R = H[0],
                G = H[1];
                if (!R || !G) R = F;
                var C = jQuery(R),
                B = {},
                K = B[D] = R.getAttribute("value");
                B[E] = C.attr("icon");
                B[A] = R.innerHTML;
                N.add(B);
                var P = C.attr("expanded");
                if (P) B.expanded = P == "false" ? false: true;
                var Q = C.attr("allowSelect");
                if (Q) B[VoB7] = Q == "false" ? false: true;
                if (!G) continue;
                var O = mini[OJy](G),
                M = $(O);
                if (M.length > 0) B[_] = M
            }
            return N
        }
        var C = $(mini[OJy](B));
        if (C.length > 0) F.data = C;
        if (!F[UJwj] && F[SY0C]) F[UJwj] = F[SY0C];
        return F
    }
});
W4(GOFw, "tree");
Fa4 = function($) {
    this.owner = $;
    this.owner.on("NodeMouseDown", this.GCtR, this)
};
Fa4[DMah] = {
    GCtR: function(B) {
        if (B.htmlEvent.button == mini.MouseButton.Right) return;
        var A = this.owner;
        if (A[Pa]() || A.isAllowDrag(B.node) == false) return;
        var _ = B.node;
        this.dragData = A.H5BData();
        if (this.dragData.indexOf(_) == -1) this.dragData.push(_);
        var $ = this.H5B();
        $.start(B.htmlEvent)
    },
    Tlfk: function($) {
        var _ = this.owner;
        this.feedbackEl = mini.append(document.body, "<div class=\"mini-feedback\"></div>");
        this.feedbackEl.innerHTML = _.H5BText(this.dragData);
        this.lastFeedbackClass = "";
        this[Poz] = _[Poz];
        _.setEnableHotTrack(false)
    },
    HEJ: function(_) {
        var A = this.owner,
        C = _.now[0],
        B = _.now[1];
        mini[_8Wt](this.feedbackEl, C + 15, B + 18);
        var $ = A.getNodeByEvent(_.event);
        this.dropNode = $;
        if ($ && A[Snd] == true) {
            if (!A.isLeaf($) && !$[A.nodesField]) A.loadNode($);
            this.dragAction = this.getFeedback($, B, 3)
        } else this.dragAction = "no";
        this.lastFeedbackClass = "mini-feedback-" + this.dragAction;
        this.feedbackEl.className = "mini-feedback " + this.lastFeedbackClass;
        if (this.dragAction == "no") $ = null;
        this.setRowFeedback($, this.dragAction)
    },
    Sj: function(A) {
        var D = this.owner;
        mini[FXFd](this.feedbackEl);
        this.feedbackEl = null;
        this.setRowFeedback(null);
        var C = [];
        for (var G = 0,
        F = this.dragData.length; G < F; G++) {
            var I = this.dragData[G],
            B = false;
            for (var J = 0,
            _ = this.dragData.length; J < _; J++) {
                var E = this.dragData[J];
                if (E != I) {
                    B = D.isAncestor(E, I);
                    if (B) break
                }
            }
            if (!B) C.push(I)
        }
        this.dragData = C;
        if (this.dropNode && this.dragAction != "no") {
            var K = D.D0f(this.dragData, this.dropNode, this.dragAction);
            if (!K.cancel) {
                var C = K.dragNodes,
                H = K.targetNode,
                $ = K.action;
                D.moveNodes(C, H, $)
            }
        }
        this.dropNode = null;
        this.dragData = null;
        D.setEnableHotTrack(this[Poz])
    },
    setRowFeedback: function(B, F) {
        var A = this.owner;
        if (this.lastAddDomNode) Lq(this.lastAddDomNode, "mini-tree-feedback-add");
        if (B == null || this.dragAction == "add") {
            mini[FXFd](this.feedbackLine);
            this.feedbackLine = null
        }
        this.lastRowFeedback = B;
        if (B != null) if (F == "before" || F == "after") {
            if (!this.feedbackLine) this.feedbackLine = mini.append(document.body, "<div class='mini-feedback-line'></div>");
            this.feedbackLine.style.display = "block";
            var D = A.getNodeBox(B),
            E = D.x,
            C = D.y - 1;
            if (F == "after") C += D.height;
            mini[_8Wt](this.feedbackLine, E, C);
            var _ = A.getBox(true);
            D1No(this.feedbackLine, _.width)
        } else {
            var $ = A.Ios(B);
            F7y($, "mini-tree-feedback-add");
            this.lastAddDomNode = $
        }
    },
    getFeedback: function($, I, F) {
        var A = this.owner,
        J = A.getNodeBox($),
        _ = J.height,
        H = I - J.y,
        G = null;
        if (this.dragData.indexOf($) != -1) return "no";
        var C = false;
        if (F == 3) {
            C = A.isLeaf($);
            for (var E = 0,
            D = this.dragData.length; E < D; E++) {
                var K = this.dragData[E],
                B = A.isAncestor(K, $);
                if (B) {
                    G = "no";
                    break
                }
            }
        }
        if (G == null) if (C) {
            if (H > _ / 2) G = "after";
            else G = "before"
        } else if (H > (_ / 3) * 2) G = "after";
        else if (_ / 3 <= H && H <= (_ / 3 * 2)) G = "add";
        else G = "before";
        var L = A.QMSF(G, this.dragData, $);
        return L.effect
    },
    H5B: function() {
        if (!this.drag) this.drag = new mini.Drag({
            capture: false,
            onStart: mini.createDelegate(this.Tlfk, this),
            onMove: mini.createDelegate(this.HEJ, this),
            onStop: mini.createDelegate(this.Sj, this)
        });
        return this.drag
    }
};
TD$ = function() {
    this.data = [];
    this.Bj = {};
    this.JBr = [];
    this.PGcL = {};
    this.columns = [];
    this.ZEW = [];
    this.Ytl = {};
    this.VhI = {};
    this.MbX = [];
    this.GMV = {};
    TD$[_s][FjoU][If](this);
    this[SbW]();
    var $ = this;
    setTimeout(function() {
        if ($.autoLoad) $.reload()
    },
    1)
};
DE73 = 0;
Wf = 0;
WKkQ(TD$, R0pW, {
    Eea: "block",
    width: 300,
    height: "auto",
    minWidth: 300,
    minHeight: 150,
    maxWidth: 5000,
    maxHeight: 3000,
    allowCellWrap: false,
    bodyCls: "",
    bodyStyle: "",
    footerCls: "",
    footerStyle: "",
    pagerCls: "",
    pagerStyle: "",
    idField: "id",
    data: [],
    columns: null,
    allowResize: false,
    _rowIdField: "_uid",
    columnWidth: 120,
    columnMinWidth: 20,
    columnMaxWidth: 2000,
    fitColumns: true,
    autoHideRowDetail: true,
    showHeader: true,
    showFooter: true,
    showTop: false,
    showHGridLines: true,
    showVGridLines: true,
    showFilterRow: false,
    showSummaryRow: false,
    allowSortColumn: true,
    allowMoveColumn: true,
    allowResizeColumn: true,
    enableHotTrack: true,
    allowRowSelect: true,
    multiSelect: false,
    allowAlternating: false,
    RvW: "mini-grid-row-alt",
    WJC: "mini-grid-frozen",
    QU: "mini-grid-frozenCell",
    frozenStartColumn: -1,
    frozenEndColumn: -1,
    isFrozen: function() {
        return this[Q0t] >= 0 && this[EVi] >= this[Q0t]
    },
    Vie: "mini-grid-row",
    QoA: "mini-grid-row-hover",
    G1c: "mini-grid-row-selected",
    uiCls: "mini-datagrid",
    _create: function() {
        var $ = this.el = document.createElement("div");
        this.el.className = "mini-grid";
        this.el.style.display = "block";
        var _ = "<div class=\"mini-grid-border\">" + "<div class=\"mini-grid-header\"></div>" + "<div class=\"mini-grid-filterRow\"></div>" + "<div class=\"mini-grid-body\"></div>" + "<div class=\"mini-grid-scroller\"><div></div></div>" + "<div class=\"mini-grid-summaryRow\"></div>" + "<div class=\"mini-grid-footer\"></div>" + "<div class=\"mini-grid-resizeGrid\" style=\"\"></div>" + "<a href=\"#\" class=\"mini-grid-focus\" style=\"position:absolute;left:0;top:0;width:0px;height:0px;outline:none\" hideFocus></a>" + "</div>";
        this.el.innerHTML = _;
        this.WXF = this.el.firstChild;
        this.ZvT = this.WXF.childNodes[0];
        this.KPA = this.WXF.childNodes[1];
        this.Zp5 = this.WXF.childNodes[2];
        this.Vpp = this.WXF.childNodes[3];
        this.LBc = this.WXF.childNodes[4];
        this.Gr = this.WXF.childNodes[5];
        this.Hh = this.WXF.childNodes[6];
        this._focusEl = this.WXF.childNodes[7];
        this._H3B();
        this.DWO();
        _r(this.Zp5, this.bodyStyle);
        F7y(this.Zp5, this.bodyCls);
        this.$oJ()
    },
    focus: function() {},
    $oJ: function() {
        this.pager = new TvL();
        this.pager[NF](this.Gr);
        this.bindPager(this.pager)
    },
    setPager: function($) {
        if (typeof $ == "string") {
            var _ = Lr0($);
            if (!_) return;
            mini.parse($);
            $ = mini.get($)
        }
        if ($) this.bindPager($)
    },
    bindPager: function($) {
        $.on("pagechanged", this.QXhs, this);
        this.on("load",
        function(_) {
            $.update(this.pageIndex, this.pageSize, this[Kce]);
            this.totalPage = $.totalPage
        },
        this)
    },
    destroy: function($) {
        if (this.Zp5) {
            mini[_LP](this.Zp5);
            this.Zp5 = null
        }
        if (this.Vpp) {
            mini[_LP](this.Vpp);
            this.Vpp = null
        }
        this.WXF = null;
        this.ZvT = null;
        this.KPA = null;
        this.Zp5 = null;
        this.Vpp = null;
        this.LBc = null;
        this.Gr = null;
        this.Hh = null;
        TD$[_s][HFtw][If](this, $)
    },
    _initEvents: function() {
        Ehny(function() {
            $DT4(this.el, "click", this.ZmC, this);
            $DT4(this.el, "dblclick", this.Nl4, this);
            $DT4(this.el, "mousedown", this.U8z, this);
            $DT4(this.el, "mouseup", this.Bfl, this);
            $DT4(this.el, "mousemove", this.YMAS, this);
            $DT4(this.el, "mouseover", this.F1, this);
            $DT4(this.el, "mouseout", this.FmPu, this);
            $DT4(this.el, "keydown", this.MMM, this);
            $DT4(this.el, "keyup", this.VKSz, this);
            $DT4(this.el, "contextmenu", this.FGD, this);
            $DT4(this.Zp5, "scroll", this.LAJ, this);
            $DT4(this.Vpp, "scroll", this.JFU, this);
            $DT4(this.el, "mousewheel", this.XXZ, this)
        },
        this);
        this.NE = new TaA(this);
        this.OvBT = new XOX(this);
        this.T3k = new ZPY(this);
        this.VRq = new IC9(this)
    },
    setIdField: function($) {
        this[UJwj] = $
    },
    getIdField: function() {
        return this[UJwj]
    },
    setUrl: function($) {
        this.url = $
    },
    getUrl: function($) {
        return this.url
    },
    setAutoLoad: function($) {
        this.autoLoad = $
    },
    getAutoLoad: function($) {
        return this.autoLoad
    },
    OUe: true,
    loadData: function(A) {
        if (!mini.isArray(A)) A = [];
        this.data = A;
        if (this.OUe == true) this.PGcL = {};
        this.JBr = [];
        this.Bj = {};
        this.MbX = [];
        this.GMV = {};
        for (var $ = 0,
        B = A.length; $ < B; $++) {
            var _ = A[$];
            _._uid = DE73++;
            _._index = $;
            this.Bj[_._uid] = _
        }
        this[SbW]()
    },
    setData: function($) {
        this[HE1]($)
    },
    getData: function() {
        return this.data.clone()
    },
    toArray: function() {
        return this.data.clone()
    },
    getHeaderHeight: function() {
        return this.showHeader ? YiC_(this.ZvT) : 0
    },
    getFooterHeight: function() {
        return this[CmkD] ? YiC_(this.Gr) : 0
    },
    getFilterRowHeight: function() {
        return this[U4r] ? YiC_(this.KPA) : 0
    },
    getSummaryRowHeight: function() {
        return this[YCZ3] ? YiC_(this.LBc) : 0
    },
    AtC: function() {
        return this[VP$]() ? YiC_(this.Vpp) : 0
    },
    ChO: function(D) {
        var F = "",
        B = this[HeV]();
        if (isIE) {
            if (isIE6 || isIE7 || (isIE8 && !jQuery.boxModel) || (isIE9 && !jQuery.boxModel)) F += "<tr style=\"display:none;\">";
            else F += "<tr >"
        } else F += "<tr style=\"height:0px\">";
        for (var $ = 0,
        C = B.length; $ < C; $++) {
            var A = B[$],
            _ = A.width,
            E = this.RAJ7(A) + "$" + D;
            F += "<td id=\"" + E + "\" style=\"padding:0;border:0;margin:0;height:0px;";
            if (A.width) F += "width:" + A.width;
            if ($ < this[Q0t] || A.visible == false) F += ";display:none;";
            F += "\" ></td>"
        }
        F += "</tr>";
        return F
    },
    _H3B: function() {
        if (this.KPA.firstChild) this.KPA.removeChild(this.KPA.firstChild);
        var B = this[VP$](),
        C = this[HeV](),
        F = [];
        F[F.length] = "<table class=\"mini-grid-table\" cellspacing=\"0\" cellpadding=\"0\">";
        F[F.length] = this.ChO("filter");
        F[F.length] = "<tr >";
        for (var $ = 0,
        D = C.length; $ < D; $++) {
            var A = C[$],
            E = this.Is3(A);
            F[F.length] = "<td id=\"";
            F[F.length] = E;
            F[F.length] = "\" class=\"mini-grid-filterCell\" style=\"";
            if ((B && $ < this[Q0t]) || A.visible == false || A._hide == true) F[F.length] = ";display:none;";
            F[F.length] = "\"><span class=\"mini-grid-hspace\"></span></td>"
        }
        F[F.length] = "</tr></table>";
        this.KPA.innerHTML = F.join("");
        for ($ = 0, D = C.length; $ < D; $++) {
            A = C[$];
            if (A.filter) {
                var _ = this.getFilterCellEl($);
                A.filter[NF](_)
            }
        }
    },
    DWO: function() {
        if (this.LBc.firstChild) this.LBc.removeChild(this.LBc.firstChild);
        var A = this[VP$](),
        B = this[HeV](),
        E = [];
        E[E.length] = "<table class=\"mini-grid-table\" cellspacing=\"0\" cellpadding=\"0\">";
        E[E.length] = this.ChO("summary");
        E[E.length] = "<tr >";
        for (var $ = 0,
        C = B.length; $ < C; $++) {
            var _ = B[$],
            D = this.QZU(_);
            E[E.length] = "<td id=\"";
            E[E.length] = D;
            E[E.length] = "\" class=\"mini-grid-summaryCell\" style=\"";
            if ((A && $ < this[Q0t]) || _.visible == false || _._hide == true) E[E.length] = ";display:none;";
            E[E.length] = "\"><span class=\"mini-grid-hspace\"></span></td>"
        }
        E[E.length] = "</tr></table>";
        this.LBc.innerHTML = E.join("")
    },
    AR3u: function(L) {
        L = L || "";
        var N = this[VP$](),
        A = this.Dr$(),
        G = this[HeV](),
        H = G.length,
        F = [];
        F[F.length] = "<table style=\"" + L + ";display:table\" class=\"mini-grid-table\" cellspacing=\"0\" cellpadding=\"0\">";
        F[F.length] = this.ChO("header");
        for (var M = 0,
        _ = A.length; M < _; M++) {
            var D = A[M];
            F[F.length] = "<tr >";
            for (var I = 0,
            E = D.length; I < E; I++) {
                var B = D[I],
                C = B.header;
                if (typeof C == "function") C = C[If](this, B);
                if (mini.isNull(C) || C === "") C = "&nbsp;";
                var J = this.RAJ7(B),
                $ = "";
                if (this.sortField == B.field) $ = this.sortOrder == "asc" ? "mini-grid-asc": "mini-grid-desc";
                F[F.length] = "<td id=\"";
                F[F.length] = J;
                F[F.length] = "\" class=\"mini-grid-headerCell " + $ + " " + (B.headerCls || "") + " ";
                if (I == H - 1) F[F.length] = " mini-grid-last-column ";
                F[F.length] = "\" style=\"";
                var K = G.indexOf(B);
                if ((N && K != -1 && K < this[Q0t]) || B.visible == false || B._hide == true) F[F.length] = ";display:none;";
                if (B.columns && B.columns.length > 0 && B.colspan == 0) F[F.length] = ";display:none;";
                if (B.headerStyle) F[F.length] = B.headerStyle + ";";
                if (B.headerAlign) F[F.length] = "text-align:" + B.headerAlign + ";";
                F[F.length] = "\" ";
                if (B.rowspan) F[F.length] = "rowspan=\"" + B.rowspan + "\" ";
                if (B.colspan) F[F.length] = "colspan=\"" + B.colspan + "\" ";
                F[F.length] = "><div class=\"mini-grid-cellInner\">";
                F[F.length] = C;
                if ($) F[F.length] = "<span class=\"mini-grid-sortIcon\"></span>";
                F[F.length] = "</div>";
                F[F.length] = "</td>"
            }
            F[F.length] = "</tr>"
        }
        F[F.length] = "</table>";
        var O = F.join("");
        O = "<div class=\"mini-grid-header\">" + O + "</div>";
        this.ZvT.innerHTML = F.join("");
        this.fire("refreshHeader")
    },
    HDq: function(E, C, O) {
        if (!mini.isNumber(O)) O = this.data.indexOf(E);
        var K = O == this.data.length - 1,
        M = this[VP$](),
        N = !C;
        if (!C) C = [];
        var A = this[HeV](),
        F = -1,
        H = " ",
        D = -1,
        I = " ";
        C[C.length] = "<tr id=\"";
        C[C.length] = this.Z1M(E);
        C[C.length] = "\" class=\"mini-grid-row ";
        if (this[Iq4](E)) {
            C[C.length] = this.G1c;
            C[C.length] = " "
        }
        if (E._state == "deleted") C[C.length] = "mini-grid-deleteRow ";
        if (E._state == "added") C[C.length] = "mini-grid-newRow ";
        if (this[G7] && O % 2 == 1) {
            C[C.length] = this.RvW;
            C[C.length] = " "
        }
        F = C.length;
        C[C.length] = H;
        C[C.length] = "\" style=\"";
        D = C.length;
        C[C.length] = I;
        C[C.length] = "\">";
        var G = A.length - 1;
        for (var J = 0,
        $ = G; J <= $; J++) {
            var _ = A[J],
            L = _.field ? this.VX2(E, _.field) : false,
            P = this._9_t(E, _, O, J),
            B = this.XNC9(E, _);
            C[C.length] = "<td id=\"";
            C[C.length] = B;
            C[C.length] = "\" class=\"mini-grid-cell ";
            if (P.cellCls) C[C.length] = P.cellCls;
            if (this.Uj && this.Uj[0] == E && this.Uj[1] == _) {
                C[C.length] = " ";
                C[C.length] = this.Ojy
            }
            if (K) C[C.length] = " mini-grid-last-row ";
            if (J == G) C[C.length] = " mini-grid-last-column ";
            if (M && this[Q0t] <= J && J <= this[EVi]) {
                C[C.length] = " ";
                C[C.length] = this.QU + " "
            }
            C[C.length] = "\" style=\"";
            if (_.align) {
                C[C.length] = "text-align:";
                C[C.length] = _.align;
                C[C.length] = ";"
            }
            if (P.allowCellWrap) C[C.length] = "white-space:normal;text-overflow:normal;word-break:normal;";
            if (P.cellStyle) {
                C[C.length] = P.cellStyle;
                C[C.length] = ";"
            }
            if (M && J < this[Q0t] || _.visible == false) C[C.length] = "display:none;";
            C[C.length] = "\">";
            if (L) C[C.length] = "<div class=\"mini-grid-cell-dirty\">";
            C[C.length] = P.cellHtml;
            if (L) C[C.length] = "</div>";
            C[C.length] = "</td>";
            if (P.rowCls) H = P.rowCls;
            if (P.rowStyle) I = P.rowStyle
        }
        C[F] = H;
        C[D] = I;
        C[C.length] = "</tr>";
        if (N) return C.join("")
    },
    getScrollLeft: function() {
        return this[VP$]() ? this.Vpp.scrollLeft: this.Zp5.scrollLeft
    },
    doUpdate: function() {
        if (this.OTH === false) return;
        var C = this[HeV]();
        for (var G = 0,
        D = C.length; G < D; G++) {
            var B = C[G];
            delete B._hide
        }
        this.AR3u();
        var J = this.data,
        K = new Date(),
        E = [];
        E[E.length] = "<table class=\"mini-grid-table\" cellspacing=\"0\" cellpadding=\"0\">";
        E[E.length] = this.ChO("body");
        if (this[Xfnk]()) {
            var H = this.Mbr8();
            for (var L = 0,
            $ = H.length; L < $; L++) {
                var _ = H[L],
                F = _.id,
                M = this.L8(_);
                E[E.length] = "<tr id=\"" + F + "\" class=\"mini-grid-groupRow\"><td class=\"mini-grid-groupCell\" colspan=\"" + C.length + "\"><div class=\"mini-grid-groupHeader\">";
                E[E.length] = "<div class=\"mini-grid-group-ecicon\"></div>";
                E[E.length] = "<div class=\"mini-grid-groupTitle\">" + M.cellHtml + "</div>";
                E[E.length] = "</div></td></tr>";
                var A = _.rows;
                for (G = 0, D = A.length; G < D; G++) {
                    var I = A[G];
                    this.HDq(I, E, G)
                }
            }
        } else for (G = 0, D = J.length; G < D; G++) {
            I = J[G];
            this.HDq(I, E, G)
        }
        E[E.length] = "</table>";
        if (this.Zp5.firstChild) this.Zp5.removeChild(this.Zp5.firstChild);
        this.Zp5.innerHTML = E.join("");
        if (this.data.length > 100) this.$Lb();
        else this[A6_]()
    },
    RVdA: function() {
        if (isIE) {
            this.WXF.style.display = "none";
            h = this[SeC](true);
            w = this[R5Kf](true);
            this.WXF.style.display = ""
        }
    },
    $Lb: function() {
        var $ = this;
        if (this.W7a) return;
        this.W7a = setTimeout(function() {
            $[A6_]();
            $.W7a = null
        },
        1)
    },
    doLayout: function() {
        if (!this.canLayout()) return;
        var F = new Date();
        this.Hh.style.display = this[T_s] ? "": "none";
        this.XACf();
        var G = this[VP$]();
        if (G) F7y(this.el, this.WJC);
        else Lq(this.el, this.WJC);
        if (this[Hut]) Lq(this.el, "mini-grid-hideVLine");
        else F7y(this.el, "mini-grid-hideVLine");
        if (this[H21]) Lq(this.el, "mini-grid-hideHLine");
        else F7y(this.el, "mini-grid-hideHLine");
        var C = this.ZvT.firstChild,
        H = this.Zp5.firstChild,
        _ = this.KPA.firstChild,
        $ = this.LBc.firstChild;
        _.style.height = "auto";
        if (G) _.style.height = jQuery(_).outerHeight() + "px";
        $.style.height = "auto";
        if (G) $.style.height = jQuery($).outerHeight() + "px";
        this.Gr.style.display = this[CmkD] ? "": "none";
        this.LBc.style.display = this[YCZ3] ? "": "none";
        this.KPA.style.display = this[U4r] ? "": "none";
        this.ZvT.style.display = this.showHeader ? "": "none";
        var E = this[Rol]();
        C.style.width = H.style.width = "100%";
        _.style.width = $.style.width = "100%";
        h = this[SeC](true);
        B = this[R5Kf](true);
        var D = B;
        if (D < 0) D = 0;
        if (h < 0) h = 0;
        if (this[VP$]()) this.JFU();
        if (!E) {
            h = h - this[GKS$]() - this[Tuu$]() - this[MvX]() - this.getSummaryRowHeight() - this.AtC();
            if (h < 0) h = 0;
            this.Zp5.style.height = h + "px"
        } else this.Zp5.style.height = "auto";
        this.Zp5.style.width = D + "px";
        var A = jQuery(this.Zp5).css("overflow-y") == "hidden";
        if (isIE) {
            if (A || this.Zp5.offsetHeight >= this.Zp5.scrollHeight) {
                var B = (parseInt(H.parentNode.offsetWidth)) + "px";
                H.style.width = B;
                C.style.width = B;
                _.style.width = $.style.width = B
            } else {
                B = parseInt(H.parentNode.offsetWidth - 17) + "px";
                H.style.width = B;
                C.style.width = B;
                _.style.width = $.style.width = B
            }
            if (E) if (this.Zp5.offsetWidth >= this.Zp5.scrollWidth) this.Zp5.style.height = "auto";
            else this.Zp5.style.height = (H.offsetHeight + 17) + "px";
            if (E && this[VP$]()) this.Zp5.style.height = "auto"
        }
        if (!A && this.Zp5.offsetHeight < this.Zp5.scrollHeight) {
            this.ZvT.style.width = (D - 17) + "px";
            this.KPA.style.width = (D - 17) + "px";
            this.LBc.style.width = (D - 17) + "px";
            this.Gr.style.width = (D - 17) + "px"
        } else {
            this.ZvT.style.width = "100%";
            this.KPA.style.width = "100%";
            this.LBc.style.width = "100%";
            this.Gr.style.width = "auto"
        }
        if (this[VP$]()) {
            if (!A && this.Zp5.offsetHeight < this.Zp5.scrollHeight) this.Vpp.style.width = (D - 17) + "px";
            else this.Vpp.style.width = (D) + "px";
            if (this.Zp5.offsetWidth < H.offsetWidth) {
                this.Vpp.firstChild.style.width = this.AINn() + "px";
                C.style.width = H.style.width = "0px";
                _.style.width = $.style.width = "0px"
            } else this.Vpp.firstChild.style.width = "0px"
        }
        if (!this.fitColumns) {
            C.style.width = H.style.width = "0px";
            _.style.width = $.style.width = "0px"
        }
        this.PyN();
        this.Air();
        mini[FN_](this.el);
        this.fire("layout")
    },
    AINn: function() {
        if (this.Zp5.offsetWidth < this.Zp5.firstChild.offsetWidth) {
            var _ = 0,
            B = this[HeV]();
            for (var $ = 0,
            C = B.length; $ < C; $++) {
                var A = B[$];
                _ += this[Doo](A)
            }
            return _
        } else return 0
    },
    Z1M: function($) {
        return this.uid + "$" + $._uid
    },
    RAJ7: function($) {
        return this.uid + "$column$" + $._id
    },
    XNC9: function($, _) {
        return this.uid + "$" + $._uid + "$" + _._id
    },
    Is3: function($) {
        return this.uid + "$filter$" + $._id
    },
    QZU: function($) {
        return this.uid + "$summary$" + $._id
    },
    P$J: function($) {
        return this.uid + "$detail$" + $._uid
    },
    getFilterCellEl: function($) {
        $ = this[Bp6]($);
        if (!$) return null;
        return document.getElementById(this.Is3($))
    },
    getSummaryCellEl: function($) {
        $ = this[Bp6]($);
        if (!$) return null;
        return document.getElementById(this.QZU($))
    },
    PlSU: function($, _) {
        $ = this[FUvB]($);
        _ = this[Bp6](_);
        if (!$ || !_) return null;
        var A = this.XNC9($, _);
        return document.getElementById(A)
    },
    Zc8: function($) {
        $ = this[FUvB]($);
        if (!$) return null;
        return document.getElementById(this.Z1M($))
    },
    getCellBox: function(_, A) {
        _ = this[FUvB](_);
        A = this[Bp6](A);
        if (!_ || !A) return null;
        var $ = this.PlSU(_, A);
        if (!$) return null;
        return $mq($)
    },
    getRowBox: function(_) {
        var $ = this.Zc8(_);
        if ($) return $mq($);
        return null
    },
    getRowsBox: function() {
        var G = [],
        C = this.data,
        B = 0;
        for (var _ = 0,
        E = C.length; _ < E; _++) {
            var A = C[_],
            F = this.Z1M(A),
            $ = document.getElementById(F);
            if ($) {
                var D = $.offsetHeight;
                G[_] = {
                    top: B,
                    height: D,
                    bottom: B + D
                };
                B += D
            }
        }
        return G
    },
    setColumns: function(value) {
        if (!mini.isArray(value)) value = [];
        this.columns = value;
        this.Ytl = {};
        this.VhI = {};
        this.ZEW = [];
        this.maxColumnLevel = 0;
        var level = 0;
        function init(column, index, parentColumn) {
            if (column.type) {
                if (!mini.isNull(column.header) && typeof column.header !== "function") if (column.header.trim() == "") delete column.header;
                var col = mini[Id9](column.type);
                if (col) {
                    var _column = mini.copyTo({},
                    column);
                    mini.copyTo(column, col);
                    mini.copyTo(column, _column)
                }
            }
            if (typeof column.init == "function") {
                column.init(this);
                delete column.init
            }
            var width = parseInt(column.width);
            if (mini.isNumber(width) && String(width) == column.width) column.width = width + "px";
            if (mini.isNull(column.width)) column.width = this[S6Y] + "px";
            column.visible = column.visible !== false;
            column[T_s] = column.allowRresize !== false;
            column.allowMove = column.allowMove !== false;
            column.allowSort = column.allowSort === true;
            column.allowDrag = !!column.allowDrag;
            column[SXB] = !!column[SXB];
            column._id = Wf++;
            column._gridUID = this.uid;
            column[CoM] = this[CoM];
            column._pid = parentColumn == this ? -1 : parentColumn._id;
            this.Ytl[column._id] = column;
            if (column.name) this.VhI[column.name] = column;
            if (!column.columns || column.columns.length == 0) this.ZEW.push(column);
            column.level = level;
            level += 1;
            this[BHu](column, init, this);
            level -= 1;
            if (column.level > this.maxColumnLevel) this.maxColumnLevel = column.level;
            if (typeof column.filter == "string") column.filter = eval("(" + column.filter + ")");
            if (column.filter && !column.filter.el) column.filter = mini.create(column.filter);
            if (typeof column.init == "function" && column.inited != true) column.init(this);
            column.inited = true
        }
        this[BHu](this, init, this);
        this._H3B();
        this.DWO();
        this[SbW]()
    },
    getColumns: function() {
        return this.columns
    },
    getBottomColumns: function() {
        return this.ZEW
    },
    getBottomVisibleColumns: function() {
        var A = [];
        for (var $ = 0,
        B = this.ZEW.length; $ < B; $++) {
            var _ = this.ZEW[$];
            if (this[Df](_)) A.push(_)
        }
        return A
    },
    eachColumns: function(B, F, C) {
        var D = B.columns;
        if (D) {
            var _ = D.clone();
            for (var A = 0,
            E = _.length; A < E; A++) {
                var $ = _[A];
                if (F[If](C, $, A, B) === false) break
            }
        }
    },
    getColumn: function($) {
        var _ = typeof $;
        if (_ == "number") return this[HeV]()[$];
        else if (_ == "object") return $;
        else return this.VhI[$]
    },
    Jcic: function($) {
        return this.Ytl[$]
    },
    getParentColumn: function($) {
        $ = this[Bp6]($);
        var _ = $._pid;
        if (_ == -1) return this;
        return this.Ytl[_]
    },
    getAncestorColumns: function(A) {
        var _ = [];
        while (1) {
            var $ = this[JCo](A);
            if (!$ || $ == this) break;
            _[_.length] = $;
            A = $
        }
        _.reverse();
        return _
    },
    isAncestorColumn: function(_, B) {
        if (_ == B) return true;
        if (!_ || !B) return false;
        var A = this[G_f](B);
        for (var $ = 0,
        C = A.length; $ < C; $++) if (A[$] == _) return true;
        return false
    },
    isVisibleColumn: function(_) {
        _ = this[Bp6](_);
        var A = this[G_f](_);
        for (var $ = 0,
        B = A.length; $ < B; $++) if (A[$].visible == false) return false;
        return true
    },
    removeColumn: function($) {
        $ = this[Bp6]($);
        var _ = this[JCo]($);
        if ($ && _) {
            _.columns.remove($);
            this[F4b](this.columns)
        }
        return $
    },
    moveColumn: function(C, _, A) {
        C = this[Bp6](C);
        _ = this[Bp6](_);
        if (!C || !_ || !A || C == _) return;
        if (this[ESN](C, _)) return;
        var D = this[JCo](C);
        if (D) D.columns.remove(C);
        var B = _,
        $ = A;
        if ($ == "before") {
            B = this[JCo](_);
            $ = B.columns.indexOf(_)
        } else if ($ == "after") {
            B = this[JCo](_);
            $ = B.columns.indexOf(_) + 1
        } else if ($ == "add" || $ == "append") {
            if (!B.columns) B.columns = [];
            $ = B.columns.length
        } else if (!mini.isNumber($)) return;
        B.columns.insert($, C);
        this[F4b](this.columns)
    },
    hideColumn: function($) {
        $ = this[Bp6]($);
        if (!$) return;
        $.visible = false;
        this.$nUy($, false);
        this.AR3u();
        this[A6_]();
        this.RVdA()
    },
    showColumn: function($) {
        $ = this[Bp6]($);
        if (!$) return;
        $.visible = true;
        this.$nUy($, true);
        this.AR3u();
        this[A6_]();
        this.RVdA()
    },
    setColumnWidth: function(E, B) {
        E = this[Bp6](E);
        if (!E) return;
        if (mini.isNumber(B)) B += "px";
        E.width = B;
        var _ = this.RAJ7(E) + "$header",
        F = this.RAJ7(E) + "$body",
        A = this.RAJ7(E) + "$filter",
        D = this.RAJ7(E) + "$summary",
        C = document.getElementById(_),
        $ = document.getElementById(F),
        G = document.getElementById(A),
        H = document.getElementById(D);
        if (C) C.style.width = B;
        if ($) $.style.width = B;
        if (G) G.style.width = B;
        if (H) H.style.width = B;
        this[A6_]()
    },
    getColumnWidth: function(B) {
        B = this[Bp6](B);
        if (!B) return 0;
        if (B.visible == false) return 0;
        var _ = 0,
        C = this.RAJ7(B) + "$body",
        A = document.getElementById(C);
        if (A) {
            var $ = A.style.display;
            A.style.display = "";
            _ = ZmL(A);
            A.style.display = $
        }
        return _
    },
    Dr$: function() {
        var _ = this[ZCi](),
        D = [];
        for (var C = 0,
        F = _; C <= F; C++) D.push([]);
        function A(C) {
            var D = mini[NDHY](C.columns, "columns"),
            A = 0;
            for (var $ = 0,
            B = D.length; $ < B; $++) {
                var _ = D[$];
                if (_.visible != true || _._hide == true) continue;
                if (!_.columns || _.columns.length == 0) A += 1
            }
            return A
        }
        var $ = mini[NDHY](this.columns, "columns");
        for (C = 0, F = $.length; C < F; C++) {
            var E = $[C],
            B = D[E.level];
            if (E.columns && E.columns.length > 0) E.colspan = A(E);
            if ((!E.columns || E.columns.length == 0) && E.level < _) E.rowspan = _ - E.level + 1;
            B.push(E)
        }
        return D
    },
    getMaxColumnLevel: function() {
        return this.maxColumnLevel
    },
    $nUy: function(C, N) {
        var I = document.getElementById(this.RAJ7(C));
        if (I) I.style.display = N ? "": "none";
        var D = document.getElementById(this.Is3(C));
        if (D) D.style.display = N ? "": "none";
        var _ = document.getElementById(this.QZU(C));
        if (_) _.style.display = N ? "": "none";
        var J = this.RAJ7(C) + "$header",
        M = this.RAJ7(C) + "$body",
        B = this.RAJ7(C) + "$filter",
        E = this.RAJ7(C) + "$summary",
        L = document.getElementById(J);
        if (L) L.style.display = N ? "": "none";
        var O = document.getElementById(B);
        if (O) O.style.display = N ? "": "none";
        var P = document.getElementById(E);
        if (P) P.style.display = N ? "": "none";
        if ($) {
            if (N && $.style.display == "") return;
            if (!N && $.style.display == "none") return
        }
        var $ = document.getElementById(M);
        if ($) $.style.display = N ? "": "none";
        for (var H = 0,
        F = this.data.length; H < F; H++) {
            var K = this.data[H],
            G = this.XNC9(K, C),
            A = document.getElementById(G);
            if (A) A.style.display = N ? "": "none"
        }
    },
    Fkl: function(C, D, B) {
        for (var $ = 0,
        E = this.data.length; $ < E; $++) {
            var A = this.data[$],
            F = this.XNC9(A, C),
            _ = document.getElementById(F);
            if (_) if (B) F7y(_, D);
            else Lq(_, D)
        }
    },
    DJs: function() {
        if (!this[VP$]()) return;
        var A = this[HeV]();
        for (var $ = 0,
        B = A.length; $ < B; $++) {
            var _ = A[$];
            if (this[Q0t] <= $ && $ <= this[EVi]) this.Fkl(_, this.QU, true)
        }
    },
    setFrozenStartColumn: function($) {
        $ = parseInt($);
        if (isNaN($)) return;
        this[Q0t] = $;
        this._headerTableHeight = YiC_(this.ZvT.firstChild);
        if (this[VP$]()) this.DJs();
        else this.Z$();
        this[A6_]();
        this.Vpp.scrollLeft = this.ZvT.scrollLeft = this.Zp5.scrollLeft = 0;
        this.RVdA()
    },
    getFrozenStartColumn: function() {
        return this[Q0t]
    },
    setFrozenEndColumn: function($) {
        $ = parseInt($);
        if (isNaN($)) return;
        this[EVi] = $;
        this._headerTableHeight = YiC_(this.ZvT.firstChild);
        if (this[VP$]()) this.DJs();
        else this.Z$();
        this[A6_]();
        this.Vpp.scrollLeft = this.ZvT.scrollLeft = this.Zp5.scrollLeft = 0;
        this.RVdA()
    },
    getFrozenEndColumn: function() {
        return this[EVi]
    },
    unFrozenColumns: function() {
        var $ = this.Wk;
        this.Wk = false;
        this[YX]( - 1);
        this[UyB]( - 1);
        this.Wk = $;
        this[A6_]()
    },
    frozenColumns: function($, _) {
        var A = this.Wk;
        this.Wk = false;
        this[EZ]();
        this[YX]($);
        this[UyB](_);
        this.Wk = A;
        this[A6_]()
    },
    LAJ: function($) {
        if (this[VP$]()) return;
        this.ZvT.scrollLeft = this.KPA.scrollLeft = this.LBc.scrollLeft = this.Zp5.scrollLeft
    },
    JFU: function($) {
        this.YE_V()
    },
    YE_V: function() {
        if (!this[VP$]()) return;
        var E = this[HeV](),
        G = this.Vpp.scrollLeft,
        $ = this[EVi],
        B = 0;
        for (var _ = $ + 1,
        F = E.length; _ < F; _++) {
            var C = E[_];
            if (!C.visible) continue;
            var A = this[Doo](C);
            if (G <= B) break;
            $ = _;
            B += A
        }
        for (_ = 0, F = E.length; _ < F; _++) {
            C = E[_];
            delete C._hide;
            if (this[EVi] < _ && _ <= $) C._hide = true
        }
        for (_ = 0, F = E.length; _ < F; _++) {
            C = E[_];
            if (_ < this.frozenStartColumn || (_ > this[EVi] && _ < $)) this.$nUy(C, false);
            else this.$nUy(C, true)
        }
        var D = "width:100%;";
        if (this.Vpp.offsetWidth < this.Vpp.scrollWidth || !this.fitColumns) D = "width:0px";
        this.AR3u(D);
        AUY(this.ZvT.firstChild, this._headerTableHeight);
        for (_ = this[EVi] + 1, F = E.length; _ < F; _++) {
            C = E[_];
            if (!C.visible) continue;
            if (_ <= $) this.$nUy(C, false);
            else this.$nUy(C, true)
        }
        this.XACf();
        this.SAAA(true)
    },
    Z$: function() {
        var A = this[HeV]();
        for (var $ = 0,
        B = A.length; $ < B; $++) {
            var _ = A[$];
            delete _._hide;
            if (_.visible) this.$nUy(_, true);
            this.Fkl(_, this.QU, false)
        }
        this.AR3u();
        this.SAAA(false)
    },
    SAAA: function(B) {
        var D = this.data;
        for (var _ = 0,
        E = D.length; _ < E; _++) {
            var A = D[_],
            $ = this.Zc8(A);
            if ($) if (B) {
                var C = 0;
                $.style.height = C + "px"
            } else $.style.height = ""
        }
    },
    setShowHGridLines: function($) {
        if (this[H21] != $) {
            this[H21] = $;
            this[A6_]()
        }
    },
    getShowHGridLines: function() {
        return this[H21]
    },
    setShowVGridLines: function($) {
        if (this[Hut] != $) {
            this[Hut] = $;
            this[A6_]()
        }
    },
    getShowVGridLines: function() {
        return this[Hut]
    },
    setShowFilterRow: function($) {
        if (this[U4r] != $) {
            this[U4r] = $;
            this[A6_]()
        }
    },
    getShowFilterRow: function() {
        return this[U4r]
    },
    setShowSummaryRow: function($) {
        if (this[YCZ3] != $) {
            this[YCZ3] = $;
            this[A6_]()
        }
    },
    getShowSummaryRow: function() {
        return this[YCZ3]
    },
    YhrP: function() {
        if (this[G7] == false) return;
        var B = this.data;
        for (var _ = 0,
        C = B.length; _ < C; _++) {
            var A = B[_],
            $ = this.Zc8(A);
            if ($) if (this[G7] && _ % 2 == 1) F7y($, this.RvW);
            else Lq($, this.RvW)
        }
    },
    setAllowAlternating: function($) {
        if (this[G7] != $) {
            this[G7] = $;
            this.YhrP()
        }
    },
    getAllowAlternating: function() {
        return this[G7]
    },
    setEnableHotTrack: function($) {
        if (this[Poz] != $) this[Poz] = $
    },
    getEnableHotTrack: function() {
        return this[Poz]
    },
    setShowLoading: function($) {
        this.showLoading = $
    },
    setAllowCellWrap: function($) {
        if (this.allowCellWrap != $) this.allowCellWrap = $
    },
    getAllowCellWrap: function() {
        return this.allowCellWrap
    },
    setScrollTop: function($) {
        this.scrollTop = $;
        this.Zp5.scrollTop = $
    },
    getScrollTop: function() {
        return this.Zp5.scrollTop
    },
    setBodyStyle: function($) {
        this.bodyStyle = $;
        _r(this.Zp5, $)
    },
    getBodyStyle: function() {
        return this.bodyStyle
    },
    setBodyCls: function($) {
        this.bodyCls = $;
        F7y(this.Zp5, $)
    },
    getBodyCls: function() {
        return this.bodyCls
    },
    setFooterStyle: function($) {
        this.footerStyle = $;
        _r(this.Gr, $)
    },
    getFooterStyle: function() {
        return this.footerStyle
    },
    setFooterCls: function($) {
        this.footerCls = $;
        F7y(this.Gr, $)
    },
    getFooterCls: function() {
        return this.footerCls
    },
    setShowHeader: function($) {
        this.showHeader = $;
        this[A6_]()
    },
    setShowFooter: function($) {
        this[CmkD] = $;
        this[A6_]()
    },
    setAutoHideRowDetail: function($) {
        this.autoHideRowDetail = $
    },
    setAllowSortColumn: function($) {
        this[T1QG] = $
    },
    getAllowSortColumn: function() {
        return this[T1QG]
    },
    setAllowMoveColumn: function($) {
        this[Vps] = $
    },
    getAllowMoveColumn: function() {
        return this[Vps]
    },
    setAllowResizeColumn: function($) {
        this[Ey1] = $
    },
    getAllowResizeColumn: function() {
        return this[Ey1]
    },
    _Wk: true,
    showAllRowDetail: function() {
        this._Wk = false;
        for (var $ = 0,
        A = this.data.length; $ < A; $++) {
            var _ = this.data[$];
            this[ESz](_)
        }
        this._Wk = true;
        this[A6_]()
    },
    hideAllRowDetail: function() {
        this._Wk = false;
        for (var $ = 0,
        A = this.data.length; $ < A; $++) {
            var _ = this.data[$];
            if (this[Zjca](_)) this[MMb](_)
        }
        this._Wk = true;
        this[A6_]()
    },
    showRowDetail: function(_) {
        _ = this[FUvB](_);
        if (!_) return;
        var B = this[Go0](_);
        B.style.display = "";
        _._showDetail = true;
        var $ = this.Zc8(_);
        F7y($, "mini-grid-expandRow");
        this.fire("showrowdetail", {
            record: _
        });
        if (this._Wk) this[A6_]();
        var A = this
    },
    hideRowDetail: function(_) {
        var B = this.P$J(_),
        A = document.getElementById(B);
        if (A) A.style.display = "none";
        delete _._showDetail;
        var $ = this.Zc8(_);
        Lq($, "mini-grid-expandRow");
        this.fire("hiderowdetail", {
            record: _
        });
        if (this._Wk) this[A6_]()
    },
    toggleRowDetail: function($) {
        $ = this[FUvB]($);
        if (!$) return;
        if (grid[Zjca]($)) grid[MMb]($);
        else grid[ESz]($)
    },
    isShowRowDetail: function($) {
        $ = this[FUvB]($);
        if (!$) return false;
        return !! $._showDetail
    },
    getRowDetailEl: function($) {
        $ = this[FUvB]($);
        if (!$) return null;
        var A = this.P$J($),
        _ = document.getElementById(A);
        if (!_) _ = this.Df5($);
        return _
    },
    getRowDetailCellEl: function($) {
        var _ = this[Go0]($);
        if (_) return _.cells[0]
    },
    Df5: function($) {
        var A = this.Zc8($),
        B = this.P$J($),
        _ = this[HeV]().length;
        jQuery(A).after("<tr id=\"" + B + "\" class=\"mini-grid-detailRow\"><td class=\"mini-grid-detailCell\" colspan=\"" + _ + "\"></td></tr>");
        this.XACf();
        return document.getElementById(B)
    },
    $w4: function() {
        var D = this.Zp5.firstChild.getElementsByTagName("tr")[0],
        B = D.getElementsByTagName("td"),
        A = 0;
        for (var _ = 0,
        C = B.length; _ < C; _++) {
            var $ = B[_];
            if ($.style.display != "none") A++
        }
        return A
    },
    XACf: function() {
        var _ = jQuery(".mini-grid-detailRow", this.el),
        B = this.$w4();
        for (var A = 0,
        C = _.length; A < C; A++) {
            var D = _[A],
            $ = D.firstChild;
            $.colSpan = B
        }
    },
    PyN: function() {
        var _ = jQuery(".mini-grid-detailRow", this.el);
        for (var A = 0,
        B = _.length; A < B; A++) {
            var C = _[A],
            $ = C.firstChild;
            mini.layout($)
        }
    },
    Air: function() {
        for (var $ = 0,
        B = this.data.length; $ < B; $++) {
            var _ = this.data[$];
            if (_._editing == true) {
                var A = this.Zc8(_);
                mini.layout(A)
            }
        }
    },
    QXhs: function($) {
        $.cancel = true;
        this.gotoPage($.pageIndex, $[Jw])
    },
    setSizeList: function($) {
        if (!mini.isArray($)) return;
        this.pager.setSizeList($)
    },
    getSizeList: function() {
        return this.pager.getSizeList()
    },
    setPageSize: function($) {
        $ = parseInt($);
        if (isNaN($)) return;
        this[Jw] = $;
        if (this.pager) this.pager.update(this.pageIndex, this.pageSize, this[Kce])
    },
    getPageSize: function() {
        return this[Jw]
    },
    setPageIndex: function($) {
        $ = parseInt($);
        if (isNaN($)) return;
        this[Tp] = $;
        if (this.pager) this.pager.update(this.pageIndex, this.pageSize, this[Kce])
    },
    getPageIndex: function() {
        return this[Tp]
    },
    setShowPageSize: function($) {
        this.showPageSize = $;
        this.pager.setShowPageSize($)
    },
    getShowPageSize: function() {
        return this.showPageSize
    },
    setShowPageIndex: function($) {
        this.showPageIndex = $;
        this.pager.setShowPageIndex($)
    },
    getShowPageIndex: function() {
        return this.showPageIndex
    },
    setShowTotalCount: function($) {
        this.showTotalCount = $;
        this.pager.setShowTotalCount($)
    },
    getShowTotalCount: function() {
        return this.showTotalCount
    },
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
    totalPage: 0,
    showPageSize: true,
    showPageIndex: true,
    showTotalCount: true,
    setTotalCount: function($) {
        this[Kce] = $;
        this.pager.setTotalCount($)
    },
    getTotalCount: function() {
        return this[Kce]
    },
    getTotalPage: function() {
        return this.totalPage
    },
    sortField: "",
    sortOrder: "",
    url: "",
    autoLoad: false,
    loadParams: null,
    ajaxAsync: true,
    ajaxMethod: "post",
    showLoading: true,
    resultAsData: false,
    checkSelectOnLoad: true,
    setCheckSelectOnLoad: function($) {
        this[B6L] = $
    },
    getCheckSelectOnLoad: function() {
        return this[B6L]
    },
    Dvil: "total",
    _dataField: "data",
    PAl: function($) {
        return $.data
    },
    EXQ: function(_, B, C) {
        _ = _ || {};
        if (mini.isNull(_[Tp])) _[Tp] = 0;
        if (mini.isNull(_[Jw])) _[Jw] = this[Jw];
        _.sortField = this.sortField;
        _.sortOrder = this.sortOrder;
        this.loadParams = _;
        if (this.showLoading) this.loading();
        var A = this.url,
        E = this.ajaxMethod;
        if (A) if (A.indexOf(".txt") != -1 || A.indexOf(".json") != -1) E = "get";
        var D = {
            url: A,
            async: this.ajaxAsync,
            type: E,
            params: _,
            cancel: false
        };
        this.fire("beforeload", D);
        if (D.cancel == true) return;
        this.WpfValue = this.Wpf ? this.Wpf[this.idField] : null;
        var $ = this;
        this.F6 = jQuery.ajax({
            url: D.url,
            async: D.async,
            data: D.params,
            type: D.type,
            cache: false,
            dataType: "text",
            success: function(D) {
                var G = null;
                try {
                    G = mini.decode(D)
                } catch(H) {}
                if (G == null) G = {
                    data: [],
                    total: 0
                };
                if ($[Op]) {
                    var E = {};
                    E[$.Dvil] = G.length;
                    E.data = G;
                    G = E
                }
                var C = parseInt(G[$.Dvil]),
                F = $.PAl(G);
                if (mini.isNumber(_[Tp])) $[Tp] = _[Tp];
                if (mini.isNumber(_[Jw])) $[Jw] = _[Jw];
                if (mini.isNumber(C)) $[Kce] = C;
                var H = {
                    result: G,
                    data: F,
                    total: C,
                    cancel: false
                };
                $.fire("preload", H);
                if (H.cancel == true) return;
                $[HE1](H.data);
                $.AR3u();
                $.unmask();
                if ($.WpfValue && $[B6L]) {
                    var A = $[FCt_]($.WpfValue);
                    if (A) $[Ju6](A);
                    else $[RsYU]()
                } else if ($.Wpf) $[RsYU]();
                $.fire("load", H);
                if (B) B[If]($, G);
                $.$Lb()
            },
            error: function(_, B, A) {
                if (C) C[If](scope, _);
                var D = {
                    xmlHttp: _,
                    errorCode: B
                };
                $.fire("loaderror", D);
                $.unmask()
            }
        })
    },
    load: function(_, A, B) {
        if (this._loadTimer) clearTimeout(this._loadTimer);
        var $ = this;
        this[B$R]();
        this.loadParams = _ || {};
        if (this.ajaxAsync) this._loadTimer = setTimeout(function() {
            $.EXQ(_, A, B)
        },
        1);
        else $.EXQ(_, A, B)
    },
    reload: function(_, $) {
        this.load(this.loadParams, _, $)
    },
    gotoPage: function($, A) {
        var _ = this.loadParams || {};
        if (mini.isNumber($)) _[Tp] = $;
        if (mini.isNumber(A)) _[Jw] = A;
        this.load(_)
    },
    sortBy: function(A, _) {
        this.sortField = A;
        this.sortOrder = _ == "asc" ? "asc": "desc";
        var $ = this.loadParams || {};
        $.sortField = A;
        $.sortOrder = _;
        $[Tp] = this[Tp];
        this.load($)
    },
    clearSort: function() {
        this.sortField = "";
        this.sortOrder = "";
        this.reload()
    },
    allowCellSelect: false,
    allowCellEdit: false,
    Ojy: "mini-grid-cell-selected",
    Uj: null,
    $lt: null,
    _Mt: null,
    SDg: null,
    UIbv: function(B) {
        if (this.Uj) {
            var $ = this.Uj[0],
            A = this.Uj[1],
            _ = this.PlSU($, A);
            if (_) if (B) F7y(_, this.Ojy);
            else Lq(_, this.Ojy)
        }
    },
    setCurrentCell: function($) {
        if (this.Uj != $) {
            this.UIbv(false);
            this.Uj = $;
            this.UIbv(true);
            if ($) this[Ico]($[0], $[1]);
            this.fire("currentcellchanged");
            this.Qa_()
        }
    },
    getCurrentCell: function() {
        var $ = this.Uj;
        if ($) if (this.data.indexOf($[0]) == -1) {
            this.Uj = null;
            $ = null
        }
        return $
    },
    setAllowCellSelect: function($) {
        this[Kgt] = $
    },
    getAllowCellSelect: function($) {
        return this[Kgt]
    },
    setAllowCellEdit: function($) {
        this[YO4s] = $
    },
    getAllowCellEdit: function($) {
        return this[YO4s]
    },
    beginEditCell: function() {
        var A = this.getCurrentCell();
        if (this.$lt && A) if (this.$lt[0] == A[0] && this.$lt[1] == A[1]) return;
        if (this.$lt) this.commitEdit();
        if (A) {
            var $ = A[0],
            _ = A[1],
            B = this.BVy($, _, this[M$Es](_));
            if (B !== false) {
                this.$lt = A;
                this.X_ma($, _)
            }
        }
    },
    cancelEdit: function() {
        if (this[YO4s]) {
            if (this.$lt) this.XfH4()
        } else if (this[NQ]()) {
            this.Wk = false;
            var A = this.data.clone();
            for (var $ = 0,
            B = A.length; $ < B; $++) {
                var _ = A[$];
                if (_._editing == true) this[FII]($)
            }
            this.Wk = true;
            this[A6_]()
        }
    },
    commitEdit: function() {
        if (this[YO4s]) {
            if (this.$lt) {
                this.R8j(this.$lt[0], this.$lt[1]);
                this.XfH4()
            }
        } else if (this[NQ]()) {
            this.Wk = false;
            var A = this.data.clone();
            for (var $ = 0,
            B = A.length; $ < B; $++) {
                var _ = A[$];
                if (_._editing == true) this[JS8C]($)
            }
            this.Wk = true;
            this[A6_]()
        }
    },
    getCellEditor: function(_, $) {
        if (this[YO4s]) {
            var B = mini.getAndCreate(_.editor);
            if (B && B != _.editor) _.editor = B;
            return B
        } else {
            $ = this[FUvB]($);
            _ = this[Bp6](_);
            if (!$) $ = this.getEditingRow();
            if (!$ || !_) return null;
            var A = this.uid + "$" + $._uid + "$" + _.name + "$editor";
            return mini.get(A)
        }
    },
    BVy: function($, A, C) {
        var B = {
            sender: this,
            rowIndex: this.data.indexOf($),
            row: $,
            record: $,
            column: A,
            field: A.field,
            editor: C,
            value: $[A.field],
            cancel: false
        };
        this.fire("cellbeginedit", B);
        var C = B.editor;
        value = B.value;
        if (B.cancel) return false;
        if (!C) return false;
        if (mini.isNull(value)) value = "";
        if (C[XFB]) C[XFB](value);
        C.ownerRowID = $._uid;
        if (A.displayField && C[Woc]) {
            var _ = $[A.displayField];
            C[Woc](_)
        }
        if (this[YO4s]) this._Mt = B.editor;
        return true
    },
    R8j: function(_, A, C) {
        var B = {
            sender: this,
            record: _,
            row: _,
            column: A,
            field: A.field,
            editor: C ? C: this[M$Es](A),
            value: "",
            text: "",
            cancel: false
        };
        if (B.editor && B.editor.getValue) B.value = B.editor.getValue();
        if (B.editor && B.editor.getText) B.text = B.editor.getText();
        this.fire("cellcommitedit", B);
        if (B.cancel == false) if (this[YO4s]) {
            var $ = {};
            $[A.field] = B.value;
            if (A.displayField) $[A.displayField] = B.text;
            this[X1](_, $)
        }
        return B
    },
    XfH4: function() {
        if (!this.$lt) return;
        var _ = this.$lt[0],
        C = this.$lt[1],
        E = {
            sender: this,
            record: _,
            row: _,
            column: C,
            field: C.field,
            editor: this.editingControl,
            value: _[C.field]
        };
        this.fire("cellendedit", E);
        if (this[YO4s]) {
            if (this.SDg) this.SDg.style.display = "none";
            var A = this.SDg.childNodes;
            for (var $ = A.length - 1; $ >= 0; $--) {
                var B = A[$];
                this.SDg.removeChild(B)
            }
            var D = E.editor;
            if (D && D[AXKv]) D[AXKv]();
            if (D && D[XFB]) D[XFB]("");
            this.editingControl = null;
            this.$lt = null
        }
    },
    X_ma: function(_, D) {
        if (!this._Mt) return false;
        var $ = this[BMF](_, D),
        F = {
            sender: this,
            record: _,
            row: _,
            column: D,
            field: D.field,
            cellBox: $,
            editor: this._Mt
        };
        this.fire("cellshowingedit", F);
        var B = this.Oh($),
        E = F.editor;
        if (E[NF]) {
            E[NF](this.SDg);
            setTimeout(function() {
                E.focus();
                if (E[X9]) E[X9]()
            },
            10);
            if (E[NXq]) E[NXq](true)
        } else if (E.el) {
            this.SDg.appendChild(E.el);
            setTimeout(function() {
                try {
                    E.el.focus()
                } catch($) {}
            },
            10)
        }
        if (E[Id]) {
            var A = $.width;
            if (A < 50) A = 50;
            E[Id](A)
        }
        if (E[ORwC]) {
            var C = $.height - 1;
            if (E.minHeight && C < E.minHeight) C = E.minHeight;
            E[ORwC](C)
        }
        $DT4(document, "mousedown", this.Eu0F, this);
        if (D.autoShowPopup && E[Pyu]) E[Pyu]()
    },
    Eu0F: function(C) {
        if (this._Mt) {
            var A = this._fj4(C);
            if (this.$lt && A) if (this.$lt[0] == A.record && this.$lt[1] == A.column) return false;
            var _ = false;
            if (this._Mt[ZZJ]) _ = this._Mt[ZZJ](C);
            else _ = YCJ(this.SDg, C.target);
            if (_ == false) {
                var B = this;
                if (YCJ(this.Zp5, C.target) == false) setTimeout(function() {
                    B.commitEdit()
                },
                1);
                else {
                    var $ = B.$lt;
                    setTimeout(function() {
                        var _ = B.$lt;
                        if ($ == _) B.commitEdit()
                    },
                    70)
                }
                EWw(document, "mousedown", this.Eu0F, this)
            }
        }
    },
    Oh: function($) {
        if (!this.SDg) {
            this.SDg = mini.append(document.body, "<div class=\"mini-grid-editwrap\" style=\"position:absolute;\"></div>");
            $DT4(this.SDg, "keydown", this.Izb, this)
        }
        this.SDg.style.zIndex = 1000000000;
        this.SDg.style.display = "block";
        mini[_8Wt](this.SDg, $.x, $.y);
        D1No(this.SDg, $.width);
        return this.SDg
    },
    Izb: function(_) {
        if (_.keyCode == 13) {
            var $ = this.$lt;
            if ($ && $[1] && $[1].enterCommit === false) return;
            this.commitEdit();
            this.focus()
        } else if (_.keyCode == 27) {
            this[B$R]();
            this.focus()
        } else if (_.keyCode == 9) this[B$R]()
    },
    getEditorOwnerRow: function(_) {
        var $ = _.ownerRowID;
        return this.getRowByUID($)
    },
    beginEditRow: function(row) {
        if (this[YO4s]) return;
        var sss = new Date();
        row = this[FUvB](row);
        if (!row) return;
        var rowEl = this.Zc8(row);
        if (!rowEl) return;
        row._editing = true;
        var s = this.HDq(row),
        rowEl = this.Zc8(row);
        jQuery(rowEl).before(s);
        rowEl.parentNode.removeChild(rowEl);
        rowEl = this.Zc8(row);
        F7y(rowEl, "mini-grid-rowEdit");
        var columns = this[HeV]();
        for (var i = 0,
        l = columns.length; i < l; i++) {
            var column = columns[i],
            value = row[column.field],
            cellId = this.XNC9(row, columns[i]),
            cellEl = document.getElementById(cellId);
            if (!cellEl) continue;
            if (typeof column.editor == "string") column.editor = eval("(" + column.editor + ")");
            var editorConfig = mini.copyTo({},
            column.editor);
            editorConfig.id = this.uid + "$" + row._uid + "$" + column.name + "$editor";
            var editor = mini.create(editorConfig);
            if (this.BVy(row, column, editor)) if (editor) {
                F7y(cellEl, "mini-grid-cellEdit");
                cellEl.innerHTML = "";
                cellEl.appendChild(editor.el);
                F7y(editor.el, "mini-grid-editor")
            }
        }
        this[A6_]()
    },
    cancelEditRow: function(B) {
        if (this[YO4s]) return;
        B = this[FUvB](B);
        if (!B || !B._editing) return;
        delete B._editing;
        var _ = this.Zc8(B),
        D = this[HeV]();
        for (var $ = 0,
        F = D.length; $ < F; $++) {
            var C = D[$],
            H = this.XNC9(B, D[$]),
            A = document.getElementById(H),
            E = A.firstChild,
            I = mini.get(E);
            if (!I) continue;
            I[HFtw]()
        }
        var G = this.HDq(B);
        jQuery(_).before(G);
        _.parentNode.removeChild(_);
        this[A6_]()
    },
    commitEditRow: function($) {
        if (this[YO4s]) return;
        $ = this[FUvB]($);
        if (!$ || !$._editing) return;
        var _ = this[WWo]($);
        this.Qp_ = false;
        this[X1]($, _);
        this.Qp_ = true;
        this[FII]($)
    },
    isEditing: function() {
        for (var $ = 0,
        A = this.data.length; $ < A; $++) {
            var _ = this.data[$];
            if (_._editing == true) return true
        }
        return false
    },
    isEditingRow: function($) {
        $ = this[FUvB]($);
        if (!$) return false;
        return !! $._editing
    },
    isNewRow: function($) {
        return $._state == "added"
    },
    getEditingRows: function() {
        var A = [];
        for (var $ = 0,
        B = this.data.length; $ < B; $++) {
            var _ = this.data[$];
            if (_._editing == true) A.push(_)
        }
        return A
    },
    getEditingRow: function() {
        var $ = this.getEditingRows();
        return $[0]
    },
    getEditData: function(C) {
        var B = [];
        for (var $ = 0,
        D = this.data.length; $ < D; $++) {
            var _ = this.data[$];
            if (_._editing == true) {
                var A = this[WWo]($, C);
                A._index = $;
                B.push(A)
            }
        }
        return B
    },
    getEditRowData: function(G, I) {
        G = this[FUvB](G);
        if (!G || !G._editing) return null;
        var H = {},
        B = this[HeV]();
        for (var F = 0,
        C = B.length; F < C; F++) {
            var A = B[F],
            D = this.XNC9(G, B[F]),
            _ = document.getElementById(D),
            J = _.firstChild,
            E = mini.get(J);
            if (!E) continue;
            var K = this.R8j(G, A, E);
            H[A.field] = K.value;
            if (A.displayField) H[A.displayField] = K.text
        }
        H[this.idField] = G[this.idField];
        if (I) {
            var $ = mini.copyTo({},
            G);
            H = mini.copyTo($, H)
        }
        return H
    },
    getChanges: function(B) {
        var A = [];
        if (!B || B == "removed") A.addRange(this.JBr);
        for (var $ = 0,
        C = this.data.length; $ < C; $++) {
            var _ = this.data[$];
            if (_._state && (!B || B == _._state)) A.push(_)
        }
        return A
    },
    Dw: "_id",
    Mcq: function($) {
        var A = $[this.Dw],
        _ = this.PGcL[A];
        if (!_) _ = this.PGcL[A] = {};
        return _
    },
    VX2: function(A, _) {
        var $ = this.PGcL[A[this.Dw]];
        if (!$) return false;
        if (mini.isNull(_)) return false;
        return $.hasOwnProperty(_)
    },
    BD: function(A, B) {
        var E = false;
        for (var C in B) {
            var $ = B[C],
            D = A[C];
            if (mini[Bil](D, $)) continue;
            A[C] = $;
            if (A._state != "added") {
                A._state = "modified";
                var _ = this.Mcq(A);
                if (!_.hasOwnProperty(C)) _[C] = D
            }
            E = true
        }
        return E
    },
    Qp_: true,
    updateRow: function(_, A) {
        _ = this[FUvB](_);
        if (!_ || !A) return;
        var C = this.BD(_, A);
        if (C == false) return;
        if (this.Qp_) {
            var B = this,
            D = B.HDq(_),
            $ = B.Zc8(_);
            jQuery($).before(D);
            $.parentNode.removeChild($)
        }
        if (_._state == "modified") this.fire("updaterow", {
            record: _,
            row: _
        });
        if (_ == this[RgBO]()) this.SGv(_);
        this.$Lb()
    },
    deleteRows: function(_) {
        if (!mini.isArray(_)) return;
        _ = _.clone();
        for (var $ = 0,
        A = _.length; $ < A; $++) this.deleteRow(_[$])
    },
    deleteRow: function(_) {
        _ = this[FUvB](_);
        if (!_ || _._state == "deleted") return;
        if (_._state == "added") this[MgK](_, true);
        else {
            if (this.isEditingRow(_)) this[FII](_);
            _._state = "deleted";
            var $ = this.Zc8(_);
            F7y($, "mini-grid-deleteRow");
            this.fire("deleterow", {
                record: _,
                row: _
            })
        }
    },
    removeRows: function(_, B) {
        if (!mini.isArray(_)) return;
        _ = _.clone();
        for (var $ = 0,
        A = _.length; $ < A; $++) this[MgK](_[$], B)
    },
    removeRow: function(A, H) {
        A = this[FUvB](A);
        if (!A) return;
        var D = A == this[RgBO](),
        C = this[Iq4](A),
        $ = this.data.indexOf(A);
        this.data.remove(A);
        if (A._state != "added") {
            A._state = "removed";
            this.JBr.push(A);
            delete this.PGcL[A[this.Dw]]
        }
        delete this.Bj[A._uid];
        var G = this.HDq(A),
        _ = this.Zc8(A);
        if (_) _.parentNode.removeChild(_);
        var F = this.P$J(A),
        E = document.getElementById(F);
        if (E) E.parentNode.removeChild(E);
        if (C && H) {
            var B = this.getAt($);
            if (!B) B = this.getAt($ - 1);
            this[RsYU]();
            this[Ju6](B)
        }
        this.NK();
        this.fire("removerow", {
            record: A,
            row: A
        });
        if (D) this.SGv(A);
        this.YhrP();
        this.$Lb()
    },
    autoCreateNewID: false,
    addRows: function(A, $) {
        if (!mini.isArray(A)) return;
        A = A.clone();
        for (var _ = 0,
        B = A.length; _ < B; _++) this.addRow(A[_], $)
    },
    addRow: function(A, $) {
        if (mini.isNull($)) $ = this.data.length;
        $ = this.indexOf($);
        var B = this[FUvB]($);
        this.data.insert($, A);
        if (!A[this.idField]) {
            if (this.autoCreateNewID) A[this.idField] = UUID();
            var D = {
                row: A,
                record: A
            };
            this.fire("beforeaddrow", D)
        }
        A._state = "added";
        delete this.Bj[A._uid];
        A._uid = DE73++;
        this.Bj[A._uid] = A;
        var C = this.HDq(A);
        if (B) {
            var _ = this.Zc8(B);
            jQuery(_).before(C)
        } else mini.append(this.Zp5.firstChild, C);
        this.YhrP();
        this.$Lb();
        this.fire("addrow", {
            record: A,
            row: A
        })
    },
    moveRow: function(A, $) {
        A = this[FUvB](A);
        if (!A) return;
        if ($ < 0) return;
        var C = this[FUvB]($);
        if (A == C) return;
        this.data.remove(A);
        var _ = this.Zc8(A);
        if (C) {
            $ = this.data.indexOf(C);
            this.data.insert($, A);
            var B = this.Zc8(C);
            jQuery(B).before(_)
        } else {
            this.data.insert(this.data.length, A);
            mini.append(this.Zp5.firstChild, _)
        }
        this.YhrP();
        this.$Lb();
        this.fire("moverow", {
            record: A,
            row: A,
            index: $
        })
    },
    clearRows: function() {
        this.data = [];
        this[SbW]()
    },
    indexOf: function($) {
        if (typeof $ == "number") return $;
        return this.data.indexOf($)
    },
    getAt: function($) {
        return this.data[$]
    },
    getRow: function($) {
        var _ = typeof $;
        if (_ == "number") return this.data[$];
        else if (_ == "object") return $
    },
    getRowByValue: function(A) {
        for (var _ = 0,
        B = this.data.length; _ < B; _++) {
            var $ = this.data[_];
            if ($[this.idField] == A) return $
        }
    },
    getRowByUID: function($) {
        return this.Bj[$]
    },
    findRows: function(C) {
        var A = [];
        if (C) for (var $ = 0,
        B = this.data.length; $ < B; $++) {
            var _ = this.data[$];
            if (C(_) === true) A.push(_)
        }
        return A
    },
    findRow: function(B) {
        if (B) for (var $ = 0,
        A = this.data.length; $ < A; $++) {
            var _ = this.data[$];
            if (B(_) === true) return _
        }
    },
    _dZ1: 1,
    Bzt: "",
    Sn$: "",
    groupBy: function($, _) {
        if (!$) return;
        this.Bzt = $;
        if (typeof _ == "string") _ = _.toLowerCase();
        this.Sn$ = _;
        this._VA = null;
        this[SbW]()
    },
    clearGroup: function() {
        this.Bzt = "";
        this.Sn$ = "";
        this._VA = null;
        this[SbW]()
    },
    getGroupField: function() {
        return this.Bzt
    },
    getGroupDir: function() {
        return this.Sn$
    },
    isGrouping: function() {
        return this.Bzt != ""
    },
    Mbr8: function() {
        if (this[Xfnk]() == false) return null;
        this._VA = null;
        if (!this._VA) {
            var F = this.Bzt,
            H = this.Sn$,
            D = this.data.clone();
            if (typeof H == "function") mini.sort(D, H);
            else {
                mini.sort(D,
                function(_, B) {
                    var $ = _[F],
                    A = B[F];
                    if ($ > A) return 1;
                    else return 0
                },
                this);
                if (H == "desc") D.resvert()
            }
            var B = [],
            C = {};
            for (var _ = 0,
            G = D.length; _ < G; _++) {
                var $ = D[_],
                I = $[F],
                E = mini.isDate(I) ? I.getTime() : I,
                A = C[E];
                if (!A) {
                    A = C[E] = {};
                    A.field = F,
                    A.dir = H;
                    A.value = I;
                    A.rows = [];
                    B.push(A);
                    A.id = this._dZ1++
                }
                A.rows.push($)
            }
            this._VA = B
        }
        return this._VA
    },
    ZSV: function(C) {
        if (!this._VA) return null;
        var A = this._VA;
        for (var $ = 0,
        B = A.length; $ < B; $++) {
            var _ = A[$];
            if (_.id == C) return _
        }
    },
    L8: function($) {
        var _ = {
            group: $,
            rows: $.rows,
            field: $.field,
            dir: $.dir,
            value: $.value,
            cellHtml: $.field + " :" + $.value
        };
        this.fire("drawgroup", _);
        return _
    },
    onDrawGroupHeader: function(_, $) {
        this.on("drawgroupheader", _, $)
    },
    onDrawGroupSummary: function(_, $) {
        this.on("drawgroupsummary", _, $)
    },
    margeCells: function(F) {
        if (!mini.isArray(F)) return;
        for (var $ = 0,
        D = F.length; $ < D; $++) {
            var B = F[$];
            if (!B.rowSpan) B.rowSpan = 1;
            if (!B.colSpan) B.colSpan = 1;
            var E = this.Vuh(B.rowIndex, B.columnIndex, B.rowSpan, B.colSpan);
            for (var C = 0,
            _ = E.length; C < _; C++) {
                var A = E[C];
                if (C != 0) A.style.display = "none";
                else {
                    A.rowSpan = B.rowSpan;
                    A.colSpan = B.colSpan
                }
            }
        }
    },
    Vuh: function(I, E, A, B) {
        var J = [];
        if (!mini.isNumber(I)) return [];
        if (!mini.isNumber(E)) return [];
        var C = this[HeV](),
        G = this.data;
        for (var F = I,
        D = I + A; F < D; F++) for (var H = E,
        $ = E + B; H < $; H++) {
            var _ = this.PlSU(F, H);
            if (_) J.push(_)
        }
        return J
    },
    Wpf: null,
    MbX: [],
    NK: function() {
        var A = this.MbX;
        for (var $ = A.length - 1; $ >= 0; $--) {
            var _ = A[$];
            if ( !! this.Bj[_._uid] == false) {
                A.removeAt($);
                delete this.GMV[_._uid]
            }
        }
        if (this.Wpf) if ( !! this.GMV[this.Wpf._uid] == false) this.Wpf = null
    },
    setAllowRowSelect: function($) {
        this[JgC] = $
    },
    getAllowRowSelect: function($) {
        return this[JgC]
    },
    setMultiSelect: function($) {
        if (this[MWVQ] != $) {
            this[MWVQ] = $;
            this.AR3u()
        }
    },
    isSelected: function($) {
        $ = this[FUvB]($);
        if (!$) return false;
        return !! this.GMV[$._uid]
    },
    getSelecteds: function() {
        this.NK();
        return this.MbX.clone()
    },
    setCurrent: function($) {
        this[Gg]($)
    },
    getCurrent: function() {
        return this[RgBO]()
    },
    getSelected: function() {
        this.NK();
        return this.Wpf
    },
    scrollIntoView: function(A, B) {
        try {
            var $ = this.Zc8(A);
            mini[Ico]($, this.Zp5, false);
            if (B) {
                var _ = this.PlSU(A, B);
                mini[Ico](_, this.Zp5, true)
            }
        } catch(C) {}
    },
    setSelected: function($) {
        if ($) this[Ju6]($);
        else this[P53](this.Wpf);
        if (this.Wpf) this[Ico](this.Wpf);
        this.Qa_()
    },
    select: function($) {
        $ = this[FUvB]($);
        if (!$) return;
        this.Wpf = $;
        this[M03]([$])
    },
    deselect: function($) {
        $ = this[FUvB]($);
        if (!$) return;
        this[QLD]([$])
    },
    selectAll: function() {
        var $ = this.data.clone();
        this[M03]($)
    },
    deselectAll: function() {
        var $ = this.MbX.clone();
        this.Wpf = null;
        this[QLD]($)
    },
    clearSelect: function() {
        this[RsYU]()
    },
    selects: function(A) {
        if (!A || A.length == 0) return;
        A = A.clone();
        this.VY(A, true);
        for (var _ = 0,
        B = A.length; _ < B; _++) {
            var $ = A[_];
            if (!this[Iq4]($)) {
                this.MbX.push($);
                this.GMV[$._uid] = $
            }
        }
        this.TU9()
    },
    deselects: function(A) {
        if (!A) A = [];
        A = A.clone();
        this.VY(A, false);
        for (var _ = A.length - 1; _ >= 0; _--) {
            var $ = A[_];
            if (this[Iq4]($)) {
                this.MbX.remove($);
                delete this.GMV[$._uid]
            }
        }
        if (A.indexOf(this.Wpf) != -1) this.Wpf = null;
        this.TU9()
    },
    VY: function(A, C) {
        for (var _ = 0,
        B = A.length; _ < B; _++) {
            var $ = A[_];
            if (C) this[Hbg]($, this.G1c);
            else this[OeO]($, this.G1c)
        }
    },
    TU9: function() {
        if (this.QY0) clearTimeout(this.QY0);
        var $ = this;
        this.QY0 = setTimeout(function() {
            var _ = {
                selecteds: $.getSelecteds(),
                selected: $[RgBO]()
            };
            $.fire("SelectionChanged", _);
            $.SGv(_.selected)
        },
        1)
    },
    SGv: function($) {
        if (this._currentTimer) clearTimeout(this._currentTimer);
        var _ = this;
        this._currentTimer = setTimeout(function() {
            var A = {
                record: $,
                row: $
            };
            _.fire("CurrentChanged", A);
            _._currentTimer = null
        },
        1)
    },
    addRowCls: function(_, A) {
        var $ = this.Zc8(_);
        if ($) F7y($, A)
    },
    removeRowCls: function(_, A) {
        var $ = this.Zc8(_);
        if ($) Lq($, A)
    },
    SS: function(_, $) {
        _ = this[FUvB](_);
        if (!_) return;
        var A = this.Zc8(_);
        if ($ && A) this[Ico](_);
        if (this.Xz0 == _) return;
        this.Qa_();
        this.Xz0 = _;
        F7y(A, this.QoA)
    },
    Qa_: function() {
        if (!this.Xz0) return;
        var $ = this.Zc8(this.Xz0);
        if ($) Lq($, this.QoA);
        this.Xz0 = null
    },
    V2jz: function(B) {
        var A = O21(B.target, this.Vie);
        if (!A) return null;
        var $ = A.id.split("$"),
        _ = $[$.length - 1];
        return this.getRowByUID(_)
    },
    Hnk3: function(B) {
        var _ = O21(B.target, "mini-grid-cell");
        if (!_) _ = O21(B.target, "mini-grid-headerCell");
        if (_) {
            var $ = _.id.split("$"),
            A = $[$.length - 1];
            return this.Jcic(A)
        }
        return null
    },
    _fj4: function(A) {
        var $ = this.V2jz(A),
        _ = this.Hnk3(A);
        return {
            record: $,
            column: _
        }
    },
    getColumnBox: function(_) {
        var A = this.RAJ7(_),
        $ = document.getElementById(A);
        if ($) return $mq($)
    },
    XXZ: function(C, A) {
        if (this[YO4s]) this.commitEdit();
        var B = jQuery(this.Zp5).css("overflow-y");
        if (B == "hidden") {
            var $ = C.wheelDelta || -C.detail * 24,
            _ = this.Zp5.scrollTop;
            _ -= $;
            this.Zp5.scrollTop = _;
            if (_ == this.Zp5.scrollTop) C.preventDefault();
            var C = {
                scrollTop: this.Zp5.scrollTop,
                direction: "vertical"
            };
            this.fire("scroll", C)
        }
    },
    ZmC: function(A) {
        var _ = O21(A.target, "mini-grid-groupRow");
        if (_) {
            var $ = this.ZSV(_.id);
            if ($) {
                $.expanded = !($.expanded === false ? false: true);
                if ($.expanded) Lq(_, "mini-grid-group-collapse");
                else F7y(_, "mini-grid-group-collapse");
                if ($.expanded) this.P4($);
                else this.G61($)
            }
        } else this.F48(A, "Click")
    },
    G61: function(A) {
        var C = A.rows;
        for (var _ = 0,
        D = C.length; _ < D; _++) {
            var B = C[_],
            $ = this.Zc8(B);
            if ($) $.style.display = "none"
        }
        this[A6_]()
    },
    P4: function(A) {
        var C = A.rows;
        for (var _ = 0,
        D = C.length; _ < D; _++) {
            var B = C[_],
            $ = this.Zc8(B);
            if ($) $.style.display = ""
        }
        this[A6_]()
    },
    Nl4: function($) {
        this.F48($, "Dblclick")
    },
    U8z: function($) {
        this.F48($, "MouseDown");
        this.focus()
    },
    Bfl: function($) {
        this.F48($, "MouseUp")
    },
    YMAS: function($) {
        this.F48($, "MouseMove")
    },
    F1: function($) {
        this.F48($, "MouseOver")
    },
    FmPu: function($) {
        this.F48($, "MouseOut")
    },
    MMM: function($) {
        this.F48($, "KeyDown")
    },
    VKSz: function($) {
        this.F48($, "KeyUp")
    },
    FGD: function($) {
        this.F48($, "ContextMenu")
    },
    F48: function(F, D) {
        if (!this.enabled) return;
        var C = this._fj4(F),
        _ = C.record,
        B = C.column;
        if (_) {
            var A = {
                record: _,
                row: _,
                htmlEvent: F
            },
            E = this["_OnRow" + D];
            if (E) E[If](this, A);
            else this.fire("row" + D, A)
        }
        if (B) {
            A = {
                column: B,
                field: B.field,
                htmlEvent: F
            },
            E = this["_OnColumn" + D];
            if (E) E[If](this, A);
            else this.fire("column" + D, A)
        }
        if (_ && B) {
            A = {
                sender: this,
                record: _,
                row: _,
                column: B,
                field: B.field,
                htmlEvent: F
            },
            E = this["_OnCell" + D];
            if (E) E[If](this, A);
            else this.fire("cell" + D, A);
            if (B["onCell" + D]) B["onCell" + D][If](B, A)
        }
        if (!_ && B) {
            A = {
                column: B,
                htmlEvent: F
            },
            E = this["_OnHeaderCell" + D];
            if (E) E[If](this, A);
            else {
                var $ = "onheadercell" + D.toLowerCase();
                if (B[$]) {
                    A.sender = this;
                    B[$](A)
                }
                this.fire("headercell" + D, A)
            }
        }
        if (!_) this.Qa_()
    },
    _9_t: function($, B, C, D) {
        var _ = $[B.field],
        E = {
            sender: this,
            rowIndex: C,
            columnIndex: D,
            record: $,
            row: $,
            column: B,
            field: B.field,
            value: _,
            cellHtml: _,
            rowCls: null,
            cellCls: B.cellCls || "",
            rowStyle: null,
            cellStyle: B.cellStyle || "",
            allowCellWrap: this.allowCellWrap
        };
        if (B.dateFormat) if (mini.isDate(E.value)) E.cellHtml = mini.formatDate(_, B.dateFormat);
        else E.cellHtml = _;
        if (B.displayField) E.cellHtml = $[B.displayField];
        var A = B.renderer;
        if (A) {
            fn = typeof A == "function" ? A: window[A];
            if (fn) E.cellHtml = fn[If](B, E)
        }
        this.fire("drawcell", E);
        if (E.cellHtml === null || E.cellHtml === undefined || E.cellHtml === "") E.cellHtml = "&nbsp;";
        return E
    },
    _OnCellMouseDown: function(_) {
        var $ = _.record;
        if ($.enabled === false) return;
        this.fire("cellmousedown", _)
    },
    _OnRowMouseOut: function($) {
        if (!this.enabled) return;
        if (YCJ(this.el, $.target)) return
    },
    _OnRowMouseMove: function($) {
        record = $.record;
        if (!this.enabled || record.enabled === false || this[Poz] == false) return;
        this.SS(record);
        this.fire("rowmousemove", $)
    },
    _OnHeaderCellClick: function(A) {
        A.sender = this;
        var $ = A.column;
        if (!DD(A.htmlEvent.target, "mini-grid-splitter")) {
            if (this[T1QG] && this[NQ]() == false) if (!$.columns || $.columns.length == 0) if ($.field && $.allowSort !== false) {
                var _ = "asc";
                if (this.sortField == $.field) _ = this.sortOrder == "asc" ? "desc": "asc";
                this.sortBy($.field, _)
            }
            this.fire("headercellclick", A)
        }
    },
    onRowDblClick: function(_, $) {
        this.on("rowdblclick", _, $)
    },
    onRowClick: function(_, $) {
        this.on("rowclick", _, $)
    },
    onRowMouseDown: function(_, $) {
        this.on("rowmousedown", _, $)
    },
    onRowContextMenu: function(_, $) {
        this.on("rowcontextmenu", _, $)
    },
    onCellClick: function(_, $) {
        this.on("cellclick", _, $)
    },
    onCellMouseDown: function(_, $) {
        this.on("cellmousedown", _, $)
    },
    onCellContextMenu: function(_, $) {
        this.on("cellcontextmenu", _, $)
    },
    onBeforeLoad: function(_, $) {
        this.on("beforeload", _, $)
    },
    onLoad: function(_, $) {
        this.on("load", _, $)
    },
    onLoadError: function(_, $) {
        this.on("loaderror", _, $)
    },
    onPreLoad: function(_, $) {
        this.on("preload", _, $)
    },
    onDrawCell: function(_, $) {
        this.on("drawcell", _, $)
    },
    onCellBeginEdit: function(_, $) {
        this.on("cellbeginedit", _, $)
    },
    getAttrs: function(el) {
        var attrs = TD$[_s][XNM][If](this, el),
        cs = mini[OJy](el);
        for (var i = 0,
        l = cs.length; i < l; i++) {
            var node = cs[i],
            property = jQuery(node).attr("property");
            if (!property) continue;
            property = property.toLowerCase();
            if (property == "columns") attrs.columns = mini._ParseColumns(node);
            else if (property == "data") attrs.data = node.innerHTML
        }
        mini[GRcU](el, attrs, ["url", "sizeList", "bodyCls", "bodyStyle", "footerCls", "footerStyle", "pagerCls", "pagerStyle", "onrowdblclick", "onrowclick", "onrowmousedown", "onrowcontextmenu", "oncellclick", "oncellmousedown", "oncellcontextmenu", "onbeforeload", "onpreload", "onloaderror", "onload", "ondrawcell", "oncellbeginedit", "onselectionchanged", "onshowrowdetail", "onhiderowdetail", "idField", "valueField", "ajaxMethod", "ondrawgroup", "pager"]);
        mini[MTh](el, attrs, ["showHeader", "showFooter", "showTop", "allowSortColumn", "allowMoveColumn", "allowResizeColumn", "showHGridLines", "showVGridLines", "showFilterRow", "showSummaryRow", "showFooter", "showTop", "fitColumns", "showLoading", "multiSelect", "allowAlternating", "resultAsData", "allowRowSelect", "enableHotTrack", "showPageIndex", "showPageSize", "showTotalCount", "checkSelectOnLoad", "allowResize", "autoLoad", "autoHideRowDetail", "allowCellSelect", "allowCellEdit", "allowCellWrap"]);
        mini[Ova](el, attrs, ["columnWidth", "frozenStartColumn", "frozenEndColumn", "pageIndex", "pageSize"]);
        if (typeof attrs[NT4] == "string") attrs[NT4] = eval(attrs[NT4]);
        if (!attrs[UJwj] && attrs[SY0C]) attrs[UJwj] = attrs[SY0C];
        return attrs
    }
});
W4(TD$, "datagrid");
XOX = function($) {
    this.grid = $;
    $DT4(this.grid.el, "mousedown", this.TSa, this);
    $.on("refreshHeader", this.Us, this);
    $.on("layout", this.Us, this)
};
XOX[DMah] = {
    Us: function(A) {
        if (this.splittersEl) mini[FXFd](this.splittersEl);
        if (this.splitterTimer) return;
        var $ = this.grid;
        if ($[Gf]() == false) return;
        var _ = this;
        this.splitterTimer = setTimeout(function() {
            var H = $[HeV](),
            I = H.length,
            E = $mq($.ZvT, true),
            B = $.getScrollLeft(),
            G = [];
            for (var J = 0,
            F = H.length; J < F; J++) {
                var D = H[J],
                C = $[Evr](D);
                if (!C) break;
                var A = C.top - E.top,
                L = C.right - E.left - 2,
                K = C.height;
                if ($[VP$]()) {
                    if (J >= $[Q0t]);
                } else L += B;
                var M = $[JCo](D);
                if (M && M.columns) if (M.columns[M.columns.length - 1] == D) if (K + 5 < E.height) {
                    A = 0;
                    K = E.height
                }
                if ($[Ey1] && D[T_s]) G[G.length] = "<div id=\"" + D._id + "\" class=\"mini-grid-splitter\" style=\"left:" + L + "px;top:" + A + "px;height:" + K + "px;\"></div>"
            }
            var N = G.join("");
            _.splittersEl = document.createElement("div");
            _.splittersEl.className = "mini-grid-splitters";
            _.splittersEl.innerHTML = N;
            $.ZvT.appendChild(_.splittersEl);
            _.splitterTimer = null
        },
        100)
    },
    TSa: function(B) {
        var $ = this.grid,
        A = B.target;
        if (DD(A, "mini-grid-splitter")) {
            var _ = $.Ytl[A.id];
            if ($[Ey1] && _ && _[T_s]) {
                this.splitterColumn = _;
                this.getDrag().start(B)
            }
        }
    },
    getDrag: function() {
        if (!this.drag) this.drag = new mini.Drag({
            capture: true,
            onStart: mini.createDelegate(this.Tlfk, this),
            onMove: mini.createDelegate(this.HEJ, this),
            onStop: mini.createDelegate(this.Sj, this)
        });
        return this.drag
    },
    Tlfk: function(_) {
        var $ = this.grid,
        B = $[Evr](this.splitterColumn);
        this.columnBox = B;
        this.Pza = mini.append(document.body, "<div class=\"mini-grid-proxy\"></div>");
        var A = $.getBox(true);
        A.x = B.x;
        A.width = B.width;
        A.right = B.right;
        M1(this.Pza, A)
    },
    HEJ: function(A) {
        var $ = this.grid,
        B = mini.copyTo({},
        this.columnBox),
        _ = B.width + (A.now[0] - A.init[0]);
        if (_ < $.columnMinWidth) _ = $.columnMinWidth;
        if (_ > $.columnMaxWidth) _ = $.columnMaxWidth;
        D1No(this.Pza, _)
    },
    Sj: function(B) {
        var $ = this.grid,
        C = $mq(this.Pza),
        A = this,
        _ = $[T1QG];
        $[T1QG] = false;
        setTimeout(function() {
            jQuery(A.Pza).remove();
            A.Pza = null;
            $[T1QG] = _
        },
        10);
        $[M3a](this.splitterColumn, C.width)
    }
};
ZPY = function($) {
    this.grid = $;
    $DT4(this.grid.el, "mousedown", this.TSa, this)
};
ZPY[DMah] = {
    TSa: function(B) {
        var $ = this.grid;
        if ($[NQ]()) return;
        if (DD(B.target, "mini-grid-splitter")) return;
        if (B.button == mini.MouseButton.Right) return;
        var A = O21(B.target, "mini-grid-headerCell");
        if (A) {
            var _ = $.Hnk3(B);
            if ($[Vps] && _ && _.allowMove) {
                this.dragColumn = _;
                this._columnEl = A;
                this.getDrag().start(B)
            }
        }
    },
    getDrag: function() {
        if (!this.drag) this.drag = new mini.Drag({
            capture: isIE9 ? false: true,
            onStart: mini.createDelegate(this.Tlfk, this),
            onMove: mini.createDelegate(this.HEJ, this),
            onStop: mini.createDelegate(this.Sj, this)
        });
        return this.drag
    },
    Tlfk: function(_) {
        function A(_) {
            var A = _.header;
            if (typeof A == "function") A = A[If]($, _);
            if (mini.isNull(A) || A === "") A = "&nbsp;";
            return A
        }
        var $ = this.grid;
        this.Pza = mini.append(document.body, "<div class=\"mini-grid-columnproxy\"></div>");
        this.Pza.innerHTML = "<div class=\"mini-grid-columnproxy-inner\" style=\"height:26px;\">" + A(this.dragColumn) + "</div>";
        mini[_8Wt](this.Pza, _.now[0] + 15, _.now[1] + 18);
        F7y(this.Pza, "mini-grid-no");
        this.moveTop = mini.append(document.body, "<div class=\"mini-grid-movetop\"></div>");
        this.moveBottom = mini.append(document.body, "<div class=\"mini-grid-movebottom\"></div>")
    },
    HEJ: function(A) {
        var $ = this.grid,
        G = A.now[0];
        mini[_8Wt](this.Pza, G + 15, A.now[1] + 18);
        this.targetColumn = this.insertAction = null;
        var D = O21(A.event.target, "mini-grid-headerCell");
        if (D) {
            var C = $.Hnk3(A.event);
            if (C && C != this.dragColumn) {
                var _ = $[JCo](this.dragColumn),
                E = $[JCo](C);
                if (_ == E) {
                    this.targetColumn = C;
                    this.insertAction = "before";
                    var F = $[Evr](this.targetColumn);
                    if (G > F.x + F.width / 2) this.insertAction = "after"
                }
            }
        }
        if (this.targetColumn) {
            F7y(this.Pza, "mini-grid-ok");
            Lq(this.Pza, "mini-grid-no");
            var B = $[Evr](this.targetColumn);
            this.moveTop.style.display = "block";
            this.moveBottom.style.display = "block";
            if (this.insertAction == "before") {
                mini[_8Wt](this.moveTop, B.x - 4, B.y - 9);
                mini[_8Wt](this.moveBottom, B.x - 4, B.bottom)
            } else {
                mini[_8Wt](this.moveTop, B.right - 4, B.y - 9);
                mini[_8Wt](this.moveBottom, B.right - 4, B.bottom)
            }
        } else {
            Lq(this.Pza, "mini-grid-ok");
            F7y(this.Pza, "mini-grid-no");
            this.moveTop.style.display = "none";
            this.moveBottom.style.display = "none"
        }
    },
    Sj: function(_) {
        var $ = this.grid;
        mini[FXFd](this.Pza);
        mini[FXFd](this.moveTop);
        mini[FXFd](this.moveBottom);
        $[Vms0](this.dragColumn, this.targetColumn, this.insertAction);
        this.Pza = this.moveTop = this.moveBottom = this.dragColumn = this.targetColumn = null
    }
};
IC9 = function($) {
    this.grid = $;
    this.grid.on("cellmousedown", this.VQ0, this);
    this.grid.on("cellclick", this.FwH, this);
    $DT4(this.grid.el, "keydown", this.XMg, this)
};
IC9[DMah] = {
    XMg: function(G) {
        var $ = this.grid,
        A = $.getCurrentCell();
        if (G.shiftKey || G.ctrlKey) return;
        if (G.keyCode == 37 || G.keyCode == 38 || G.keyCode == 39 || G.keyCode == 40) G.preventDefault();
        var C = $[QN0](),
        B = A ? A[1] : null,
        _ = A ? A[0] : null;
        if (!A) _ = $.getCurrent();
        var F = C.indexOf(B),
        D = $.indexOf(_),
        E = $.getData().length;
        switch (G.keyCode) {
        case 27:
            break;
        case 13:
            if ($[YO4s] && A) $[EJkX]();
            break;
        case 37:
            if (B) {
                if (F > 0) F -= 1
            } else F = 0;
            break;
        case 38:
            if (_) {
                if (D > 0) D -= 1
            } else D = 0;
            break;
        case 39:
            if (B) {
                if (F < C.length - 1) F += 1
            } else F = 0;
            break;
        case 40:
            if (_) {
                if (D < E - 1) D += 1
            } else D = 0;
            break;
        default:
            break
        }
        B = C[F];
        _ = $.getAt(D);
        if (B && _ && $[Kgt]) {
            A = [_, B];
            $[Sf](A)
        }
        if (_ && $[JgC]) {
            $[RsYU]();
            $[TPa](_)
        }
    },
    FwH: function(A) {
        var $ = A.record,
        _ = A.column;
        if (!_[SXB] && !this.grid[Pa]()) if (A.htmlEvent.shiftKey || A.htmlEvent.ctrlKey);
        else this.grid[EJkX]()
    },
    VQ0: function(C) {
        var _ = C.record,
        B = C.column,
        $ = this.grid;
        if (this.grid[Kgt]) {
            var A = [_, B];
            this.grid[Sf](A)
        }
        if ($[JgC]) if ($[MWVQ]) {
            if (C.column[MWVQ] === true) {
                if ($[Iq4](_)) $[P53](_);
                else $[Ju6](_)
            } else if ($[Iq4](_));
            else {
                $[RsYU]();
                $[Ju6](_)
            }
        } else if (!$[Iq4](_)) {
            $[RsYU]();
            $[Ju6](_)
        } else if (C.htmlEvent.ctrlKey) $[RsYU]()
    }
};
mini.GridEditor = function() {
    this._inited = true;
    R0pW[_s][FjoU][If](this);
    this[RsE]();
    this.el.uid = this.uid;
    this[UUs]();
    this.THo5();
    this[Ze](this.uiCls)
};
WKkQ(mini.GridEditor, R0pW, {
    el: null,
    _create: function() {
        this.el = document.createElement("input");
        this.el.type = "text";
        this.el.style.width = "100%"
    },
    getValue: function() {
        return this.el.value
    },
    setValue: function($) {
        this.el.value = $
    },
    setWidth: function($) {}
});
TvL = function() {
    TvL[_s][FjoU][If](this)
};
WKkQ(TvL, R0pW, {
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
    totalPage: 0,
    showPageIndex: true,
    showPageSize: true,
    showTotalCount: true,
    firstText: "\u9996\u9875",
    prevText: "\u4e0a\u4e00\u9875",
    nextText: "\u4e0b\u4e00\u9875",
    lastText: "\u5c3e\u9875",
    pageSizeText: "\u6bcf\u9875",
    totalCountText: "\u5171 <font color='blue'>{0} </font>\u6761&nbsp;&nbsp;",	// modify
    sizeList: [10, 20, 50, 100],
    uiCls: "mini-pager",
    _create: function() {
        var B = "<tr style=\"width:100%;\">" + "<td style=\"width:100%;\"><div class=\"mini-pager-buttons\"></div></td>" + "<td class=\"mini-pager-total\"></td>" + "<td class=\"mini-pager-sizeLabel\"></td>" + "<td class=\"mini-pager-sizeList\"><select></select></td>" + "</tr>",
        _ = "<table class=\"mini-pager\" cellpadding=\"0\" cellspacing=\"0\">" + B + "</table>",
        $ = document.createElement("div");
        $.innerHTML = _;
        this.el = $.firstChild;
        var A = this.el.getElementsByTagName("td");
        this.firstTd = A[0];
        this.sizeEl = A[2];
        this.pageSelect = A[3].firstChild;
        this._pageTotalEl = A[1];
        this.buttonsEl = this.firstTd.firstChild;
        this.firstButton = new MBR();
        this.firstButton[Woc](this.firstText);
        this.firstButton[NF](this.buttonsEl);
        this.prevButton = new MBR();
        this.prevButton[Woc](this.prevText);
        this.prevButton[NF](this.buttonsEl);
        this.indexEl = document.createElement("span");
        this.indexEl.className = "mini-pager-index";
        this.indexEl.innerHTML = "<input id=\"\" type=\"text\" class=\"mini-pager-num\"/><span class=\"mini-pager-pages\">/ 0</span>";
        this.buttonsEl.appendChild(this.indexEl);
        this.numInput = this.indexEl.firstChild;
        this.pagesLabel = this.indexEl.lastChild;
        this.nextButton = new MBR();
        this.nextButton[Woc](this.nextText);
        this.nextButton[NF](this.buttonsEl);
        this.lastButton = new MBR();
        this.lastButton[Woc](this.lastText);
        this.lastButton[NF](this.buttonsEl);
        this.update()
    },
    destroy: function($) {
        if (this.pageSelect) {
            mini[_LP](this.pageSelect);
            this.pageSelect = null
        }
        if (this.numInput) {
            mini[_LP](this.numInput);
            this.numInput = null
        }
        this.sizeEl = null;
        this.buttonsEl = null;
        TvL[_s][HFtw][If](this, $)
    },
    _initEvents: function() {
        TvL[_s][UUs][If](this);
        this.firstButton.on("click",
        function($) {
            this.G0Uj(0)
        },
        this);
        this.prevButton.on("click",
        function($) {
            this.G0Uj(this[Tp] - 1)
        },
        this);
        this.nextButton.on("click",
        function($) {
            this.G0Uj(this[Tp] + 1)
        },
        this);
        this.lastButton.on("click",
        function($) {
            this.G0Uj(this.totalPage)
        },
        this);
        function $() {
            var $ = parseInt(this.numInput.value);
            if (isNaN($)) this.update();
            else this.G0Uj($ - 1)
        }
        $DT4(this.numInput, "change",
        function(_) {
            $[If](this)
        },
        this);
        $DT4(this.numInput, "keydown",
        function(_) {
            if (_.keyCode == 13) {
                $[If](this);
                _.stopPropagation()
            }
        },
        this);
        $DT4(this.pageSelect, "change", this.ET, this)
    },
    setPageIndex: function($) {
        if (isNaN($)) return;
        this[Tp] = $;
        this.update()
    },
    getPageIndex: function() {
        return this[Tp]
    },
    setPageSize: function($) {
        if (isNaN($)) return;
        this[Jw] = $;
        this.update()
    },
    getPageSize: function() {
        return this[Jw]
    },
    setTotalCount: function($) {
        $ = parseInt($);
        if (isNaN($)) return;
        this[Kce] = $;
        this.update()
    },
    getTotalCount: function() {
        return this[Kce]
    },
    setSizeList: function($) {
        if (!mini.isArray($)) return;
        this[NT4] = $;
        this.update()
    },
    getSizeList: function() {
        return this[NT4]
    },
    setShowPageSize: function($) {
        this.showPageSize = $;
        this.update()
    },
    getShowPageSize: function() {
        return this.showPageSize
    },
    setShowPageIndex: function($) {
        this.showPageIndex = $;
        this.update()
    },
    getShowPageIndex: function() {
        return this.showPageIndex
    },
    setShowTotalCount: function($) {
        this.showTotalCount = $;
        this.update()
    },
    getShowTotalCount: function() {
        return this.showTotalCount
    },
    getTotalPage: function() {
        return this.totalPage
    },
    update: function(_, D, B) {
        if (mini.isNumber(_)) this[Tp] = parseInt(_);
        if (mini.isNumber(D)) this[Jw] = parseInt(D);
        if (mini.isNumber(B)) this[Kce] = parseInt(B);
        this.totalPage = parseInt(this[Kce] / this[Jw]) + 1;
        if ((this.totalPage - 1) * this[Jw] == this[Kce]) this.totalPage -= 1;
        if (this[Kce] == 0) this.totalPage = 0;
        if (this[Tp] > this.totalPage - 1) this[Tp] = this.totalPage - 1;
        if (this[Tp] <= 0) this[Tp] = 0;
        if (this.totalPage <= 0) this.totalPage = 0;
        this.indexEl.style.display = this.showPageIndex ? "": "none";
        this.firstButton.enable();
        this.prevButton.enable();
        this.nextButton.enable();
        this.lastButton.enable();
        if (this[Tp] == 0) {
            this.firstButton.disable();
            this.prevButton.disable()
        }
        if (this[Tp] >= this.totalPage - 1) {
            this.nextButton.disable();
            this.lastButton.disable()
        }
        this.numInput.value = this[Tp] > -1 ? this[Tp] + 1 : 0;
        this.pagesLabel.innerHTML = "/ " + this.totalPage;
        var G = this[NT4].clone();
        if (G.indexOf(this[Jw]) == -1) {
            G.push(this[Jw]);
            G = G.sort(function($, _) {
                return $ > _
            })
        }
        this.sizeEl.innerHTML = this.pageSizeText;
        var F = this.pageSelect;
        F.options.length = 0;
        for (var A = 0,
        E = G.length; A < E; A++) {
            var $ = G[A],
            C = document.createElement("option");
            C.text = $;
            C.value = $;
            F.options.add(C)
        }
        this.pageSelect.value = this[Jw];
        this.sizeEl.style.display = this.showPageSize ? "": "none";
        this.pageSelect.parentNode.style.display = this.showPageSize ? "": "none";
        this._pageTotalEl.innerHTML = String.format(this.totalCountText, this[Kce]);
        this._pageTotalEl.style.display = this.showTotalCount ? "": "none"
    },
    ET: function(_) {
        var $ = parseInt(this.pageSelect.value);
        this.G0Uj(0, $)
    },
    G0Uj: function($, _) {
        var A = {
            pageIndex: mini.isNumber($) ? $: this.pageIndex,
            pageSize: mini.isNumber(_) ? _: this.pageSize,
            cancel: false
        };
        if (A[Tp] > this.totalPage - 1) A[Tp] = this.totalPage - 1;
        if (A[Tp] < 0) A[Tp] = 0;
        this.fire("pagechanged", A);
        if (A.cancel == false) this.update(A.pageIndex, A[Jw])
    },
    onPageChanged: function(_, $) {
        this.on("pagechanged", _, $)
    },
    getAttrs: function(el) {
        var attrs = TvL[_s][XNM][If](this, el);
        mini[GRcU](el, attrs, ["onpagechanged", "sizeList"]);
        mini[MTh](el, attrs, ["showPageIndex", "showPageSize", "showTotalCount"]);
        mini[Ova](el, attrs, ["pageIndex", "pageSize", "totalCount"]);
        if (typeof attrs[NT4] == "string") attrs[NT4] = eval(attrs[NT4]);
        return attrs
    }
});
W4(TvL, "pager");
YUh = function() {
    this.columns = [];
    YUh[_s][FjoU][If](this)
};
WKkQ(YUh, GOFw, {
    width: 300,
    height: 180,
    treeColumn: "",
    columns: [],
    columnWidth: 80,
    GqA: true,
    UCQ: "mini-treegrid-border",
    Ja1: "mini-treegrid-header",
    YqR: "mini-treegrid-body",
    O8p: "mini-treegrid-node",
    FWt: "mini-treegrid-nodes",
    JbH2: "mini-treegrid-selectedNode",
    CNl: "mini-treegrid-hoverNode",
    SlO: "mini-treegrid-expand",
    LvUa: "mini-treegrid-collapse",
    ZW: "mini-treegrid-ec-icon",
    DN9Z: "mini-treegrid-nodeTitle",
    Zdo: function(_) {
        if (!_) return null;
        var $ = this.Ios(_);
        return $
    },
    uiCls: "mini-treegrid",
    _create: function() {
        YUh[_s][RsE][If](this);
        $DT4(this.Zp5, "scroll", this.S7Y, this)
    },
    RAJ7: function($) {
        return this.uid + "$column$" + $.id
    },
    ChO: function(D) {
        var F = "",
        B = this[HeV]();
        if (isIE) {
            if (isIE6 || isIE7 || (isIE8 && !jQuery.boxModel) || (isIE9 && !jQuery.boxModel)) F += "<tr style=\"display:none;\">";
            else F += "<tr >"
        } else F += "<tr>";
        for (var $ = 0,
        C = B.length; $ < C; $++) {
            var A = B[$],
            _ = A.width,
            E = this.RAJ7(A) + "$" + D;
            F += "<td id=\"" + E + "\" style=\"padding:0;border:0;margin:0;height:0;";
            if (A.width) F += "width:" + A.width;
            F += "\" ></td>"
        }
        F += "</tr>";
        return F
    },
    AR3u: function() {
        var D = this[HeV](),
        E = [];
        E[E.length] = "<div class=\"mini-treegrid-headerInner\"><table class=\"mini-treegrid-table\" cellspacing=\"0\" cellpadding=\"0\">";
        E[E.length] = this.ChO();
        E[E.length] = "<tr>";
        for (var C = 0,
        $ = D.length; C < $; C++) {
            var A = D[C],
            B = A.header;
            if (mini.isNull(B)) B = "&nbsp;";
            var _ = A.width;
            if (mini.isNumber(_)) _ = _ + "px";
            E[E.length] = "<td class=\"";
            if (A.headerCls) E[E.length] = A.headerCls;
            E[E.length] = "\" style=\"";
            if (A.headerStyle) E[E.length] = A.headerStyle + ";";
            if (_) E[E.length] = "width:" + _ + ";";
            if (A.headerAlign) E[E.length] = "text-align:" + A.headerAlign + ";";
            E[E.length] = "\">";
            E[E.length] = B;
            E[E.length] = "</td>"
        }
        E[E.length] = "</tr></table></div>";
        this.ZvT.innerHTML = E.join("")
    },
    NDf: function(B, L, F) {
        var J = !F;
        if (!F) F = [];
        var G = B[this.textField];
        if (G === null || G === undefined) G = "";
        var H = this.isLeaf(B),
        $ = this.getLevel(B),
        D = "";
        if (!H) D = this.isExpandedNode(B) ? this.SlO: this.LvUa;
        var E = this[HeV]();
        F[F.length] = "<table class=\"mini-treegrid-nodeTitle ";
        F[F.length] = D;
        F[F.length] = "\" cellspacing=\"0\" cellpadding=\"0\">";
        F[F.length] = this.ChO();
        F[F.length] = "<tr>";
        for (var I = 0,
        _ = E.length; I < _; I++) {
            var C = E[I],
            K = this._9_t(B, C),
            A = C.width;
            if (typeof A == "number") A = A + "px";
            F[F.length] = "<td class=\"";
            if (K.cellCls) F[F.length] = K.cellCls;
            F[F.length] = "\" style=\"";
            if (K.cellStyle) {
                F[F.length] = K.cellStyle;
                F[F.length] = ";"
            }
            if (C.align) {
                F[F.length] = "text-align:";
                F[F.length] = C.align;
                F[F.length] = ";"
            }
            F[F.length] = "\">";
            F[F.length] = K.cellHtml;
            F[F.length] = "</td>";
            if (K.rowCls) rowCls = K.rowCls;
            if (K.rowStyle) rowStyle = K.rowStyle
        }
        F[F.length] = "</table>";
        if (J) return F.join("")
    },
    doUpdate: function() {
        if (!this.OTH) return;
        this.AR3u();
        var $ = new Date(),
        _ = this.root[this.nodesField],
        B = [];
        this.$udD(_, this.root, B);
        var A = B.join("");
        this.Zp5.innerHTML = A;
        this.$Lb()
    },
    doLayout: function() {
        if (!this.canLayout()) return;
        var C = this[Rol](),
        D = this[Rv](),
        _ = this[R5Kf](true),
        A = this[SeC](true),
        B = this[GKS$](),
        $ = A - B;
        this.Zp5.style.width = _ + "px";
        this.Zp5.style.height = $ + "px";
        this._IUc()
    },
    _IUc: function() {
        var A = this[R5Kf](true);
        if (isIE) {
            var _ = this.ZvT.firstChild.firstChild,
            B = this.Zp5.firstChild;
            if (this.Zp5.offsetHeight >= this.Zp5.scrollHeight) {
                B.style.width = "100%";
                if (_) _.style.width = "100%"
            } else {
                var $ = parseInt(B.parentNode.offsetWidth - 17) + "px";
                B.style.width = $;
                if (_) _.style.width = $
            }
        }
        if (this.Zp5.offsetHeight < this.Zp5.scrollHeight) this.ZvT.firstChild.style.width = (A - 17) + "px";
        else this.ZvT.firstChild.style.width = "100%"
    },
    getHeaderHeight: function() {
        return YiC_(this.ZvT)
    },
    _9_t: function($, B) {
        var D = this[CEK];
        if (D && this.hasChildren($)) D = this[VXsF];
        var _ = $[B.field],
        C = {
            isLeaf: this.isLeaf($),
            rowIndex: this.indexOf($),
            showCheckBox: D,
            iconCls: this.getNodeIcon($),
            showTreeIcon: this.showTreeIcon,
            sender: this,
            record: $,
            row: $,
            node: $,
            column: B,
            field: B ? B.field: null,
            value: _,
            cellHtml: _,
            rowCls: null,
            cellCls: B ? (B.cellCls || "") : "",
            rowStyle: null,
            cellStyle: B ? (B.cellStyle || "") : ""
        };
        if (B.dateFormat) if (mini.isDate(C.value)) C.cellHtml = mini.formatDate(_, B.dateFormat);
        else C.cellHtml = _;
        var A = B.renderer;
        if (A) {
            fn = typeof A == "function" ? A: window[A];
            if (fn) C.cellHtml = fn[If](B, C)
        }
        this.fire("drawcell", C);
        if (C.cellHtml === null || C.cellHtml === undefined || C.cellHtml === "") C.cellHtml = "&nbsp;";
        if (!this.treeColumn || this.treeColumn !== B.name) return C;
        this.BMm(C);
        return C
    },
    BMm: function(G) {
        var A = G.node;
        if (mini.isNull(G[Ol])) G[Ol] = this[Ol];
        var F = G.cellHtml,
        B = this.isLeaf(A),
        $ = this.getLevel(A) * 18,
        C = "";
        if (G.cellCls) G.cellCls += " mini-treegrid-treecolumn ";
        else G.cellCls = " mini-treegrid-treecolumn ";
        var E = "<div class=\"mini-treegrid-treecolumn-inner " + C + "\">";
        if (!B) E += "<a href=\"#\" onclick=\"return false;\"  hidefocus class=\"" + this.ZW + "\" style=\"left:" + ($) + "px;\"></a>";
        $ += 18;
        if (G[Ol]) {
            var _ = this.getNodeIcon(A);
            E += "<div class=\"" + _ + " mini-treegrid-nodeicon\" style=\"left:" + $ + "px;\"></div>";
            $ += 18
        }
        F = "<span class=\"mini-tree-nodetext\">" + F + "</span>";
        if (G[CEK]) {
            var D = this.DTf(A);
            F = "<input type=\"checkbox\" id=\"" + D + "\" class=\"" + this.Ijo + "\" hidefocus />" + F
        }
        E += "<div class=\"mini-treegrid-nodeshow\" style=\"margin-left:" + ($ + 2) + "px;\">" + F + "</div>";
        E += "</div>";
        F = E;
        G.cellHtml = F
    },
    setColumns: function(_) {
        if (!mini.isArray(_)) _ = [];
        this.columns = _;
        for (var $ = 0,
        D = this.columns.length; $ < D; $++) {
            var B = this.columns[$];
            if (B.type) {
                if (!mini.isNull(B.header) && typeof B.header !== "function") if (B.header.trim() == "") delete B.header;
                var C = mini[Id9](B.type);
                if (C) {
                    var E = mini.copyTo({},
                    B);
                    mini.copyTo(B, C);
                    mini.copyTo(B, E)
                }
            }
            var A = parseInt(B.width);
            if (mini.isNumber(A) && String(A) == B.width) B.width = A + "px";
            if (mini.isNull(B.width)) B.width = this[S6Y] + "px"
        }
        this[SbW]()
    },
    getColumns: function() {
        return this.columns
    },
    getBottomColumns: function() {
        return this.columns
    },
    setTreeColumn: function($) {
        if (this.treeColumn != $) {
            this.treeColumn = $;
            this[SbW]()
        }
    },
    getTreeColumn: function($) {
        return this.treeColumn
    },
    S7Y: function(_) {
        var $ = this.Zp5.scrollLeft;
        this.ZvT.firstChild.scrollLeft = $
    },
    getAttrs: function(_) {
        var E = YUh[_s][XNM][If](this, _);
        mini[GRcU](_, E, ["treeColumn", "ondrawcell"]);
        var C = mini[OJy](_);
        for (var $ = 0,
        D = C.length; $ < D; $++) {
            var B = C[$],
            A = jQuery(B).attr("property");
            if (!A) continue;
            A = A.toLowerCase();
            if (A == "columns") E.columns = mini._ParseColumns(B)
        }
        delete E.data;
        return E
    }
});
W4(YUh, "treegrid");
mini.RadioButtonList = W3h,
mini.ValidatorBase = Cfuc,
mini.AutoComplete = Suh,
mini.CheckBoxList = Aa,
mini.DataBinding = LRX,
mini.OutlookTree = TYA,
mini.OutlookMenu = QXm,
mini.TextBoxList = MjTf,
mini.TimeSpinner = S3,
mini.ListControl = Ld,
mini.OutlookBar = IEZ,
mini.FileUpload = GnW,
mini.TreeSelect = ZQ,
mini.DatePicker = KC1e,
mini.ButtonEdit = Ytb,
mini.PopupEdit = Wu6k,
mini.Component = B9W,
mini.TreeGrid = YUh,
mini.DataGrid = TD$,
mini.MenuItem = Xhi,
mini.Splitter = ATb,
mini.HtmlFile = PnU,
mini.Calendar = I8U,
mini.ComboBox = MrgM,
mini.TextArea = NQ8,
mini.Password = SR,
mini.CheckBox = DM_,
mini.DataSet = GHF,
mini.Include = H5,
mini.Spinner = M6I,
mini.ListBox = ZcsR,
mini.TextBox = J76,
mini.Control = R0pW,
mini.Layout = Smv,
mini.Window = K25T,
mini.Lookup = SSh,
mini.Button = MBR,
mini.Hidden = N9,
mini.Pager = TvL,
mini.Panel = Kt1,
mini.Popup = Z7,
mini.Tree = GOFw,
mini.Menu = T9Mo,
mini.Tabs = ICJJ,
mini.Fit = Mb,
mini.Box = Q8q;
mini.locale = "en-US";
mini.dateInfo = {
    monthsLong: ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
    monthsShort: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
    daysLong: ["\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d"],
    daysShort: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],
    quarterLong: ["\u4e00\u5b63\u5ea6", "\u4e8c\u5b63\u5ea6", "\u4e09\u5b63\u5ea6", "\u56db\u5b63\u5ea6"],
    quarterShort: ["Q1", "Q2", "Q2", "Q4"],
    halfYearLong: ["\u4e0a\u534a\u5e74", "\u4e0b\u534a\u5e74"],
    patterns: {
        "d": "yyyy-M-d",
        "D": "yyyy\u5e74M\u6708d\u65e5",
        "f": "yyyy\u5e74M\u6708d\u65e5 H:mm",
        "F": "yyyy\u5e74M\u6708d\u65e5 H:mm:ss",
        "g": "yyyy-M-d H:mm",
        "G": "yyyy-M-d H:mm:ss",
        "m": "MMMd\u65e5",
        "o": "yyyy-MM-ddTHH:mm:ss.fff",
        "s": "yyyy-MM-ddTHH:mm:ss",
        "t": "H:mm",
        "T": "H:mm:ss",
        "U": "yyyy\u5e74M\u6708d\u65e5 HH:mm:ss",
        "y": "yyyy\u5e74MM\u6708"
    },
    tt: {
        "AM": "\u4e0a\u5348",
        "PM": "\u4e0b\u5348"
    },
    ten: {
        "Early": "\u4e0a\u65ec",
        "Mid": "\u4e2d\u65ec",
        "Late": "\u4e0b\u65ec"
    },
    today: "\u4eca\u5929",
    clockType: 24
};
if (I8U) mini.copyTo(I8U.prototype, {
    firstDayOfWeek: 0,
    todayText: "\u4eca\u5929",
    clearText: "\u6e05\u9664",
    okText: "\u786e\u5b9a",
    cancelText: "\u53d6\u6d88",
    daysShort: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],
    format: "yyyy\u5e74MM\u6708",
    timeFormat: "H:mm"
});
for (var id in mini) {
    var clazz = mini[id];
    if (clazz && clazz[DMah] && clazz[DMah].isControl) clazz[DMah][Ivr] = "\u4e0d\u80fd\u4e3a\u7a7a"
}
if (J76) {
    var vtypeErrorTexts = {
        emailErrorText: "\u8bf7\u8f93\u5165\u90ae\u4ef6\u683c\u5f0f",
        urlErrorText: "\u8bf7\u8f93\u5165URL\u683c\u5f0f",
        floatErrorText: "\u8bf7\u8f93\u5165\u6570\u5b57",
        intErrorText: "\u8bf7\u8f93\u5165\u6574\u6570",
        dateErrorText: "\u8bf7\u8f93\u5165\u65e5\u671f\u683c\u5f0f {0}",
        maxLengthErrorText: "\u4e0d\u80fd\u8d85\u8fc7 {0} \u4e2a\u5b57\u7b26",
        minLengthErrorText: "\u4e0d\u80fd\u5c11\u4e8e {0} \u4e2a\u5b57\u7b26",
        maxErrorText: "\u6570\u5b57\u4e0d\u80fd\u5927\u4e8e {0} ",
        minErrorText: "\u6570\u5b57\u4e0d\u80fd\u5c0f\u4e8e {0} ",
        rangeLengthErrorText: "\u5b57\u7b26\u957f\u5ea6\u5fc5\u987b\u5728 {0} \u5230 {1} \u4e4b\u95f4",
        rangeCharErrorText: "\u5b57\u7b26\u6570\u5fc5\u987b\u5728 {0} \u5230 {1} \u4e4b\u95f4",
        rangeErrorText: "\u6570\u5b57\u5fc5\u987b\u5728 {0} \u5230 {1} \u4e4b\u95f4"
    };
    mini.copyTo(J76.prototype, vtypeErrorTexts);
    mini.copyTo(SR.prototype, vtypeErrorTexts);
    mini.copyTo(NQ8.prototype, vtypeErrorTexts)
}
if (TvL) mini.copyTo(TvL.prototype, {
    firstText: "\u9996\u9875",
    prevText: "\u4e0a\u4e00\u9875",
    nextText: "\u4e0b\u4e00\u9875",
    lastText: "\u5c3e\u9875",
    pageSizeText: "\u6bcf\u9875",
    totalCountText: "\u5171 <font color='blue'>{0} </font>\u6761&nbsp;&nbsp;"	// modify
});
if (window.mini.Gantt) {
    mini.GanttView.ShortWeeks = ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"];
    mini.GanttView.LongWeeks = ["\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d"];
    mini.Gantt.PredecessorLinkType = [{
        ID: 0,
        Name: "\u5b8c\u6210-\u5b8c\u6210(FF)",
        Short: "FF"
    },
    {
        ID: 1,
        Name: "\u5b8c\u6210-\u5f00\u59cb(FS)",
        Short: "FS"
    },
    {
        ID: 2,
        Name: "\u5f00\u59cb-\u5b8c\u6210(SF)",
        Short: "SF"
    },
    {
        ID: 3,
        Name: "\u5f00\u59cb-\u5f00\u59cb(SS)",
        Short: "SS"
    }];
    mini.Gantt.ConstraintType = [{
        ID: 0,
        Name: "\u8d8a\u65e9\u8d8a\u597d"
    },
    {
        ID: 1,
        Name: "\u8d8a\u665a\u8d8a\u597d"
    },
    {
        ID: 2,
        Name: "\u5fc5\u987b\u5f00\u59cb\u4e8e"
    },
    {
        ID: 3,
        Name: "\u5fc5\u987b\u5b8c\u6210\u4e8e"
    },
    {
        ID: 4,
        Name: "\u4e0d\u5f97\u65e9\u4e8e...\u5f00\u59cb"
    },
    {
        ID: 5,
        Name: "\u4e0d\u5f97\u665a\u4e8e...\u5f00\u59cb"
    },
    {
        ID: 6,
        Name: "\u4e0d\u5f97\u65e9\u4e8e...\u5b8c\u6210"
    },
    {
        ID: 7,
        Name: "\u4e0d\u5f97\u665a\u4e8e...\u5b8c\u6210"
    }];
    mini.copyTo(mini.Gantt, {
        ID_Text: "\u6807\u8bc6\u53f7",
        Name_Text: "\u4efb\u52a1\u540d\u79f0",
        PercentComplete_Text: "\u8fdb\u5ea6",
        Duration_Text: "\u5de5\u671f",
        Start_Text: "\u5f00\u59cb\u65e5\u671f",
        Finish_Text: "\u5b8c\u6210\u65e5\u671f",
        Critical_Text: "\u5173\u952e\u4efb\u52a1",
        PredecessorLink_Text: "\u524d\u7f6e\u4efb\u52a1",
        Work_Text: "\u5de5\u65f6",
        Priority_Text: "\u91cd\u8981\u7ea7\u522b",
        Weight_Text: "\u6743\u91cd",
        OutlineNumber_Text: "\u5927\u7eb2\u5b57\u6bb5",
        OutlineLevel_Text: "\u4efb\u52a1\u5c42\u7ea7",
        ActualStart_Text: "\u5b9e\u9645\u5f00\u59cb\u65e5\u671f",
        ActualFinish_Text: "\u5b9e\u9645\u5b8c\u6210\u65e5\u671f",
        WBS_Text: "WBS",
        ConstraintType_Text: "\u9650\u5236\u7c7b\u578b",
        ConstraintDate_Text: "\u9650\u5236\u65e5\u671f",
        Department_Text: "\u90e8\u95e8",
        Principal_Text: "\u8d1f\u8d23\u4eba",
        Assignments_Text: "\u8d44\u6e90\u540d\u79f0",
        Summary_Text: "\u6458\u8981\u4efb\u52a1",
        Task_Text: "\u4efb\u52a1",
        Baseline_Text: "\u6bd4\u8f83\u57fa\u51c6",
        LinkType_Text: "\u94fe\u63a5\u7c7b\u578b",
        LinkLag_Text: "\u5ef6\u9694\u65f6\u95f4",
        From_Text: "\u4ece",
        To_Text: "\u5230",
        Goto_Text: "\u8f6c\u5230\u4efb\u52a1",
        UpGrade_Text: "\u5347\u7ea7",
        DownGrade_Text: "\u964d\u7ea7",
        Add_Text: "\u65b0\u589e",
        Edit_Text: "\u7f16\u8f91",
        Remove_Text: "\u5220\u9664",
        Move_Text: "\u79fb\u52a8",
        ZoomIn_Text: "\u653e\u5927",
        ZoomOut_Text: "\u7f29\u5c0f",
        Deselect_Text: "\u53d6\u6d88\u9009\u62e9",
        Split_Text: "\u62c6\u5206\u4efb\u52a1"
    })
}