/*!
 * Copyright 2002 - 2013 Webdetails, a Pentaho company.  All rights reserved.
 *
 * This software was developed by Webdetails and is provided under the terms
 * of the Mozilla Public License, Version 2.0, or any later version. You may not use
 * this file except in compliance with the license. If you need a copy of the license,
 * please go to  http://mozilla.org/MPL/2.0/. The Initial Developer is Webdetails.
 *
 * Software distributed under the Mozilla Public License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or  implied. Please refer to
 * the license for the specific language governing your rights and limitations.
 */

/*! VERSION TRUNK-20140627 */
var pvc = function (f, t) {
    function Ya() {
        if (i.debug > 0 && typeof console !== "undefined")["log", "info", ["trace", "debug"], "error", "warn", ["group", "groupCollapsed"], "groupEnd"].forEach(function (a) {
            a = a instanceof Array ? a : [a, a];
            ya(i, a[0], a[1], "[pvChart]")
        }); else {
            if (i.debug > 1)i.debug = 1;
            ["log", "info", "trace", "warn", "group", "groupEnd"].forEach(function (a) {
                i[a] = f.noop
            });
            i.error = function (a) {
                if (a && typeof a === "object" && a.message) a = a.message;
                a = "" + f.nullyTo(a, "");
                if (a.indexOf("[pvChart ERROR]: ") < 0) a = "[pvChart ERROR]: " + a;
                throw new Error(a);
            }
        }
        i.logError = i.error;
        t.error = i.error
    }

    function Za() {
        var a = t.Behavior.tipsy;
        if (a && a.setDebug) {
            a.setDebug(i.debug);
            a.log = i.log
        }
    }

    function ya(a, b, c, d) {
        c || (c = b);
        var e = console, g = e[c] || e.log, h;
        if (g) {
            var j = d + ": %s";
            if (f.fun.is(g))h = g.bind(e, j); else {
                var k = Function.prototype.apply;
                h = function () {
                    k.call(g, e, f.array.append([j], arguments))
                }
            }
        }
        a[b] = h
    }

    function $a(a, b) {
        if (a) {
            if (f.object.is(a))return a.abs;
            return b ? b + f.firstUpperCase(a) : a
        }
        return b
    }

    function za(a) {
        a = t.color(a);
        var b = a.r, c = a.g;
        a = a.b;
        var d = (b + c + a) / 3;
        return Math.abs(b - d) <= 2 && Math.abs(c - d) <= 2 && Math.abs(a - d) <= 2
    }

    function Aa(a) {
        a || f.fail.argumentRequired("keyArgs");
        var b = a.type || f.fail.argumentRequired("keyArgs.type");
        switch (b) {
            case "linear":
                return (new i.color.LinearScalesBuild(a)).buildMap();
            case "discrete":
                return (new i.color.DiscreteScalesBuild(a)).buildMap();
            case "normal":
                return (new i.color.NormalScalesBuild(a)).buildMap()
        }
        throw f.error.argumentInvalid("scaleType", "Unexistent scale type '{0}'.", [b]);
    }

    function Ba(a) {
        a || f.fail.argumentRequired("keyArgs");
        var b = a.type || f.fail.argumentRequired("keyArgs.type");
        switch (b) {
            case "linear":
                return (new i.color.LinearScalesBuild(a)).build();
            case "discrete":
                return (new i.color.DiscreteScalesBuild(a)).build();
            case "normal":
                return (new i.color.NormalScalesBuild(a)).build()
        }
        throw f.error.argumentInvalid("scaleType", "Unexistent scale type '{0}'.", [b]);
    }

    function fa(a, b) {
        function c(o) {
            return n[o].resolve()
        }

        function d(o, p) {
            o = c(o);
            return p && !o.isSpecified ? undefined : o.value
        }

        function e(o) {
            return c(o).isSpecified
        }

        function g(o) {
            return d(o,
                true)
        }

        function h(o) {
            return f.hasOwn(n, o)
        }

        function j(o) {
            return l(o, false)
        }

        function k(o) {
            return l(o, true)
        }

        function m(o) {
            return c(o)._dv
        }

        function l(o, p) {
            for (var q in o) {
                var r = f.hasOwnProp.call(n, q) && n[q];
                if (r) {
                    var s = o[q];
                    s !== undefined && r.set(s, p)
                }
            }
            return d
        }

        a || f.fail.argumentRequired("specs");
        var n = {};
        f.each(a, function (o, p) {
            o = new ab(p, d, b, o);
            n[o.name] = o
        });
        d.option = d;
        d.specified = g;
        d.defaultValue = m;
        d.isSpecified = e;
        d.isDefined = h;
        d.specify = j;
        d.defaults = k;
        return d
    }

    function bb(a) {
        return function (b) {
            for (var c =
                0, d = a.length; c < d; c++) {
                var e = a[c];
                if (typeof e === "string")e = this[e];
                if (e.call(this, b) === true)return true
            }
        }
    }

    function cb(a) {
        return function (b) {
            b.specify(a);
            return true
        }
    }

    function db(a) {
        return function (b) {
            var c = a.call(this, b);
            if (c !== undefined) {
                b.specify(c);
                return true
            }
        }
    }

    function eb(a) {
        return function (b) {
            var c = a.call(this, b);
            if (c !== undefined) {
                b.defaultValue(c);
                return true
            }
        }
    }

    function ia(a, b) {
        var c = a && a.length;
        if (c) {
            for (var d = 0; d < c; d++) {
                var e = a[d];
                if (b)e[b] = null;
                e.dispose()
            }
            a.length = 0
        }
    }

    function ma(a, b, c, d,
                e) {
        c[d] = a;
        a = a[b] || (a[b] = []);
        e == null || e >= a.length ? a.push(c) : a.splice(e, 0, c)
    }

    function na(a, b, c, d) {
        if (a = a[b]) {
            b = a.indexOf(c);
            b >= 0 && f.array.removeAt(a, b)
        }
        c[d] = null
    }

    function fb(a) {
        this.playedVisualRoles.set(a.name, a);
        Ca.call(this.complexType, this)
    }

    function gb(a) {
        this.playedVisualRoles.rem(a.name);
        Ca.call(this.complexType, this)
    }

    function Ca() {
        this._isPctRoleDimTypeMap = null
    }

    function hb(a, b) {
        function c() {
            var e = {}, g = f.query(d.source).select(function (h) {
                b(h, e);
                h = e.series;
                if (h != null && h.v != null)h = h.v;
                return h ||
                    null
            }).distinct().array();
            return d._createPlot2SeriesKeySet(a, g)
        }

        var d = this;
        return this._dataPartGet(c, b)
    }

    function ib(a, b) {
        return a.id - b.id
    }

    function jb(a, b) {
        return b.id - a.id
    }

    function Da() {
        delete this.isSelected
    }

    function kb(a) {
        return a.isNull || a.isSelected
    }

    function Ea(a) {
        return a.isSelected === true
    }

    function Fa(a) {
        return a.isSelected === false
    }

    function ja(a) {
        return a.isVisible === true
    }

    function Ga(a) {
        return a.isVisible === false
    }

    function Ha(a) {
        return a.isNull === true
    }

    function Ia(a) {
        return a.isNull === false
    }

    function Ja(a, b, c, d, e, g) {
        if (this.owner === this) {
            if (e == null)e = (a = a._formatter) ? a(d, b) : d;
            e = "" + e;
            !e && i.debug >= 2 && i.log("Only the null value should have an empty label.");
            b = new i.data.Atom(this, d, e, b, c);
            if (g)b.isVirtual = true
        } else {
            var h = this.parent || this.linkParent;
            b = h._atomsByKey[c] || Ja.call(h, a, b, c, d, e, g)
        }
        f.array.insert(this._atoms, b, this._atomComparer);
        ga.call(this);
        return this._atomsByKey[c] = b
    }

    function Ka(a) {
        var b = a.key, c = this;
        if (a.dimension === c) {
            c.owner === c || f.assert("Should be an owner dimension");
            if (!b && a === c._virtualNullAtom)a = c.intern(null);
            return a
        }
        var d = !c._lazyInit;
        if (d) {
            var e = c._atomsByKey[b];
            if (e) {
                if (e !== a)throw f.error.operationInvalid("Atom is from a different root data.");
                return a
            }
            if (c.owner === c)throw f.error.operationInvalid("Atom is from a different root data.");
        }
        Ka.call(c.parent || c.linkParent, a);
        if (d) {
            c._atomsByKey[b] = a;
            if (b)f.array.insert(c._atoms, a, c._atomComparer); else {
                c._nullAtom = a;
                c._atoms.unshift(a)
            }
            ga.call(c)
        }
        return a
    }

    function La(a) {
        var b = f.get(a, "visible");
        a = f.get(a, "selected");
        return (b == null ? null : !!b) + ":" + (a == null ? null : !!a)
    }

    function ha(a) {
        var b = this._nullAtom;
        if (!b) {
            if (this.owner === this) {
                b = this.type._formatter;
                a = "" + (b ? b.call(null, null, a) : "");
                b = new i.data.Atom(this, null, a, null, "");
                this.data._atomsBase[this.name] = b
            } else b = ha.call(this.parent || this.linkParent, a);
            this._atomsByKey[""] = this._nullAtom = b;
            this._atoms.unshift(b)
        }
        return b
    }

    function lb() {
        this.owner === this || f.assert("Can only create atoms on an owner dimension.");
        if (!this._virtualNullAtom) {
            this._virtualNullAtom = new i.data.Atom(this,
                null, "", null, "");
            this.data._atomsBase[this.name] = this._virtualNullAtom
        }
        return this._virtualNullAtom
    }

    function mb() {
        this.owner === this || f.assert("Can only unintern atoms of an owner dimension.");
        var a = this._atoms;
        if (a) {
            for (var b = this._atomsByKey, c = 0, d = a.length; c < d;) {
                var e = a[c];
                if (e.visited) {
                    delete e.visited;
                    c++
                } else if (e !== this._virtualNullAtom) {
                    a.splice(c, 1);
                    d--;
                    e = e.key;
                    delete b[e];
                    if (!e) {
                        delete this._nullAtom;
                        this.data._atomsBase[this.name] = this._virtualNullAtom
                    }
                }
            }
            ga.call(this)
        }
    }

    function nb() {
        var a =
            this._atoms;
        if (a) {
            for (var b = this._atomsByKey, c = 0, d = a.length, e; c < d;) {
                var g = a[c];
                if (g.isVirtual) {
                    a.splice(c, 1);
                    d--;
                    e = true;
                    g = g.key || f.assert("Cannot be the null or virtual null atom.");
                    delete b[g]
                } else c++
            }
            e && ga.call(this)
        }
    }

    function ga() {
        this._atomVisibleDatumsCount = this._sumCache = this._visibleAtoms = this._visibleIndexes = null
    }

    function ob(a) {
        ma(this, "childNodes", a, "parent");
        a.owner = this.owner
    }

    function pb(a) {
        ma(this, "_linkChildren", a, "linkParent");
        a.owner = this.owner
    }

    function qb(a, b) {
        var c;
        if (!this._disposed &&
            (c = this._atomVisibleDatumsCount)) {
            a = a.atoms[this.name].key;
            f.hasOwn(this._atomsByKey, a) || f.assert("Atom must exist in this dimension.");
            var d = c[a];
            b || d > 0 || f.assert("Must have had accounted for at least one visible datum.");
            c[a] = (d || 0) + (b ? 1 : -1);
            this._visibleAtoms = this._sumCache = this._visibleIndexes = null
        }
    }

    function rb() {
        var a = this._atomVisibleDatumsCount;
        if (!a) {
            a = {};
            this.data.datums(null, {visible: true}).each(function (b) {
                b = b.atoms[this.name].key;
                a[b] = (a[b] || 0) + 1
            }, this);
            this._atomVisibleDatumsCount = a
        }
        return a
    }

    function sb(a) {
        var b = [];
        this._atoms.forEach(function (c, d) {
            this.isVisible(c) === a && b.push(d)
        }, this);
        return b
    }

    function tb(a) {
        return f.query(this._atoms).where(function (b) {
            return this.isVisible(b) === a
        }, this).array()
    }

    function ub(a, b) {
        this.insertAt(a, b);
        f.lazy(this, "_childrenByKey")[a.key] = a
    }

    function vb(a, b) {
        ma(this, "_linkChildren", a, "linkParent", b)
    }

    function wb(a) {
        na(this, "_linkChildren", a, "linkParent")
    }

    function oa() {
        ia(this.childNodes, "parent");
        this._childrenByKey = null;
        ia(this._linkChildren, "linkParent");
        this._sumAbsCache = this._groupByCache = null
    }

    function Ma() {
        this.isOwner() || f.fail("Can only be called on the owner data.")
    }

    function xb(a, b) {
        !a.isNull || f.assert("Null datums do not notify selected changes");
        b ? this._selectedNotNullDatums.set(a.id, a) : this._selectedNotNullDatums.rem(a.id);
        this._sumAbsCache = null
    }

    function pa(a, b) {
        var c = a.id, d = this;
        if (f.hasOwnProp.call(d._datumsById, c)) {
            !a.isNull || f.assert("Null datums do not notify visible changes");
            b ? d._visibleNotNullDatums.set(c, a) : d._visibleNotNullDatums.rem(c);
            d._sumAbsCache = null;
            c = d._dimensionsList;
            for (var e = 0, g = c.length; e < g;)qb.call(c[e++], a, b);
            c = d.childNodes;
            e = 0;
            for (g = c.length; e < g;)pa.call(c[e++], a, b);
            if ((c = d._linkChildren) && (g = c.length))for (e = 0; e < g;)pa.call(c[e++], a, b)
        }
    }

    function yb(a, b) {
        f.string.is(a) || f.fail.argumentInvalid("groupLevelText", "Invalid grouping specification.");
        return f.query(a.split(/\s*\|\s*/)).where(f.truthy).select(function (c) {
            var d = zb.exec(c) || f.fail.argumentInvalid("groupLevelText", "Invalid grouping level syntax '{0}'.", [c]);
            c =
                d[1];
            d = (d[2] || "").toLowerCase() === "desc";
            return new i.data.GroupingDimensionSpec(c, d, b)
        })
    }

    function qa(a, b) {
        function c(q) {
            if (q) {
                var r = q.key;
                if (!f.hasOwnProp.call(o, r)) {
                    if (!g && m && f.hasOwnProp.call(m, r))q = m[r];
                    var s = q.id;
                    n.push(q);
                    o[r] = q;
                    p[s] = q;
                    l && l.push(q);
                    ra.call(this, q, h, e);
                    if (!q.isNull) {
                        k && q.isSelected && k.set(s, q);
                        q.isVisible && j.set(s, q)
                    }
                }
            }
        }

        a || f.fail.argumentRequired("addDatums");
        var d, e = f.get(b, "doAtomGC", false), g = f.get(b, "isAdditive", false), h = !!this._dimensions, j = this._visibleNotNullDatums, k = this._selectedNotNullDatums,
            m;
        if (b = this._datums) {
            m = this._datumsByKey;
            d = this._datumsById;
            g && e && b.forEach(function (q) {
                ra.call(this, q, false, true)
            }, this)
        } else g = false;
        var l, n, o, p;
        if (g) {
            l = [];
            n = b;
            p = d;
            o = m;
            this._sumAbsCache = null
        } else {
            this._datums = n = [];
            this._datumsById = p = {};
            this._datumsByKey = o = {};
            if (b) {
                oa.call(this);
                j.clear();
                k && k.clear()
            }
        }
        if (f.array.is(a)) {
            d = 0;
            for (b = a.length; d < b;)c.call(this, a[d++])
        } else if (a instanceof f.Query)a.each(c, this); else throw f.error.argumentInvalid("addDatums", "Argument is of invalid type.");
        if (e) {
            a = this._dimensionsList;
            d = 0;
            for (b = a.length; d < b;)mb.call(a[d++])
        }
        if (g)if (a = this._linkChildren) {
            d = 0;
            for (b = a.length; d < b;)sa.call(a[d++], l)
        }
    }

    function ra(a, b, c) {
        var d = this._dimensionsList;
        d || (b = false);
        if (b || c) {
            a = a.atoms;
            var e = 0, g, h, j;
            if (d)for (g = d.length; e < g;) {
                j = d[e++];
                if (h = a[j.name]) {
                    b && Ka.call(j, h);
                    if (c)h.visited = true
                }
            } else {
                b = this.type.dimensionsNames();
                for (g = b.length; e < g;)if (h = a[b[e++]])h.visited = true
            }
        }
    }

    function sa(a) {
        a || f.fail.argumentRequired("newDatums");
        var b = this._groupOper;
        if (b)a = b.executeAdd(this, a); else {
            if (b = this._wherePred)a =
                a.filter(b);
            Na.call(this, a)
        }
        var c = (b = this._linkChildren) && b.length;
        if (c)for (var d = 0; d < c; d++)sa.call(b[d], a)
    }

    function Na(a) {
        var b = this;
        b._sumAbsCache = null;
        for (var c = b._datums, d = b._visibleNotNullDatums, e = b._selectedNotNullDatums, g = b._datumsById, h = 0, j = a.length; h < j; h++) {
            var k = a[h], m = k.id;
            g[m] = k;
            ra.call(b, k, true, false);
            if (!k.isNull) {
                e && k.isSelected && e.set(m, k);
                k.isVisible && d.set(m, k)
            }
            c.push(k)
        }
    }

    function ta(a) {
        function b(d) {
            if (d != null) {
                typeof d === "object" || f.fail.invalidArgument("datumFilter");
                var e = {},
                    g = false;
                for (var h in d) {
                    var j = this.dimensions(h).getDistinctAtoms(f.array.as(d[h]));
                    if (j.length) {
                        g = true;
                        e[h] = j
                    }
                }
                g && c.push(e)
            }
        }

        var c = [];
        (a = f.array.as(a)) && a.forEach(b, this);
        return c
    }

    function ka(a, b) {
        var c = f.get(b, "visible"), d = f.get(b, "isNull"), e = f.get(b, "selected");
        b = f.get(b, "where");
        if (c != null)a = a.where(c ? ja : Ga);
        if (d != null)a = a.where(d ? Ha : Ia);
        if (e != null)a = a.where(e ? Ea : Fa);
        if (b)a = a.where(b);
        return a
    }

    function Ab(a, b) {
        var c = f.get(b, "visible"), d = f.get(b, "isNull"), e = f.get(b, "selected");
        b = f.get(b, "where");
        var g = [];
        if (c != null)g.unshift(c ? ja : Ga);
        if (d != null)g.unshift(d ? Ha : Ia);
        if (e != null)g.unshift(e ? Ea : Fa);
        b && g.unshift(b);
        a && g.unshift(Oa(a));
        var h = g.length;
        if (h) {
            if (h === 1)return g[0];
            return function (j) {
                for (var k = h; k;)if (!g[--k](j))return false;
                return true
            }
        }
    }

    function Oa(a) {
        function b(e) {
            e = e.atoms;
            for (var g = 0; g < d; g++)if (c(e, a[g]))return true;
            return false
        }

        function c(e, g) {
            for (var h in g)if (g[h].indexOf(e[h]) < 0)return false;
            return true
        }

        var d = a.length;
        return b
    }

    function ua(a, b) {
        var c = f.array.as(f.get(b, "orderBy")),
            d = f.create(b || {}, {orderBy: null});
        return f.query(a).selectMany(function (e, g) {
            if (c)d.orderBy = c[g];
            return Bb.call(this, e, d)
        }, this).distinct(f.propGet("id"))
    }

    function Bb(a, b) {
        var c = b.orderBy;
        if (c) {
            if (c.indexOf("|") >= 0)throw f.error.argumentInvalid("keyArgs.orderBy", "Multi-dimension order by is not supported.");
        } else c = Object.keys(a).sort().join(",");
        var d = this.groupBy(c, b), e = d.treeHeight, g = [];
        return f.query(function () {
            var h;
            if (this._data) {
                if (this._datumsQuery) {
                    this._data || f.assert("Must have a current data");
                    g.length || f.assert("Must have a parent data");
                    !this._dimAtomsOrQuery || f.assert();
                    if (this._datumsQuery.next()) {
                        this.item = this._datumsQuery.item;
                        return 1
                    }
                    this._datumsQuery = null;
                    h = g.pop();
                    this._data = h.data;
                    this._dimAtomsOrQuery = h.dimAtomsOrQuery
                }
            } else {
                this._data = d;
                this._dimAtomsOrQuery = f.query(a[d._groupLevelSpec.dimensions[0].name])
            }
            this._dimAtomsOrQuery || f.assert("Invalid programmer");
            this._data || f.assert("Must have a current data");
            var j = g.length;
            do {
                for (; this._dimAtomsOrQuery.next();)if ((h = this._data.child(this._dimAtomsOrQuery.item.key)) &&
                    (j < e - 1 || h._datums.length)) {
                    g.push({data: this._data, dimAtomsOrQuery: this._dimAtomsOrQuery});
                    this._data = h;
                    if (j < e - 1) {
                        this._dimAtomsOrQuery = f.query(a[h._groupLevelSpec.dimensions[0].name]);
                        j++
                    } else {
                        this._dimAtomsOrQuery = null;
                        this._datumsQuery = f.query(h._datums);
                        this._datumsQuery.next();
                        this.item = this._datumsQuery.item;
                        return 1
                    }
                }
                if (!j)return 0;
                h = g.pop();
                this._data = h.data;
                this._dimAtomsOrQuery = h.dimAtomsOrQuery;
                j--
            } while (1);
            return 0
        })
    }

    function Cb(a) {
        if (this._renderId !== a) {
            this._renderId = a;
            this.renderState =
            {}
        }
    }

    function Pa(a) {
        var b;
        if (a && (b = a.ownerScene))a = b;
        b = this._active;
        if (b !== a) {
            b && Qa.call(b, false);
            (this._active = b = a || null) && Qa.call(b, true);
            return true
        }
        return false
    }

    function Qa(a) {
        if (this.isActive !== a)if (a)this.isActive = true; else delete this.isActive
    }

    function Db(a, b) {
        return function () {
            var c = this.vars[a];
            if (c === undefined) {
                c = this[b]();
                if (c === undefined)c = null;
                this.vars[a] = c
            }
            return c
        }
    }

    function Ra(a, b) {
        this.event = t.event;
        if (this.pvMark = a) {
            a = this.sign = a.sign || null;
            if (!b && a)b = a.scene();
            if (b)this.index = b.childIndex();
            else {
                this.index = null;
                b = new i.visual.Scene(null, {panel: this.panel})
            }
        } else {
            this.index = this.sign = null;
            b = new i.visual.Scene(null, {panel: this.panel, source: this.chart.root.data})
        }
        this.scene = b
    }

    function Eb(a) {
        var b = Fb(a) || f.assert("There must exist an ancestor sign");
        return new i.visual.BasicSign(b.panel, a)
    }

    function Fb(a) {
        var b;
        do a = a.parent; while (a && !(b = a.sign) && (!a.proto || !(b = a.proto.sign)));
        return b
    }

    function Sa(a) {
        return a.isDiscrete() ? "discrete" : a.firstDimensionValueType() === Date ? "timeSeries" : "numeric"
    }

    function Gb(a, b) {
        return i.parseDomainScope(a, b.orientation)
    }

    function Hb(a) {
        if (a) {
            if (f.hasOwn(E.namesSet, a))return i.BasePanel[this.orientation === "y" ? "horizontalAlign" : "verticalAlign2"][a];
            i.debug >= 2 && i.log(f.format("Invalid axis position value '{0}'.", [a]))
        }
        return this.orientation === "x" ? "bottom" : "left"
    }

    function Ta(a) {
        var b = this.option("Position");
        return M.toOrtho(a, b)
    }

    function Ua(a) {
        var b = this.option("Position");
        return M.to(a, {singleProp: i.BasePanel.orthogonalLength[b]})
    }

    function Ib(a) {
        var b;
        if (a) {
            var c;
            f.eachOwn(a, function (d, e) {
                c = true;
                a[e] = t.color(d)
            });
            if (c)b = a
        }
        return b
    }

    function Jb() {
        var a;
        if (a = this.scaleType)if (a === "discrete")if (this.index === 0)a = i.createColorScheme(); else {
            var b = this;
            a = function () {
                return b.chart._getRoleColorScale(b.role.name)
            }
        } else {
            va || (va = ["red", "yellow", "green"].map(t.color));
            a = va.slice()
        } else a = i.createColorScheme();
        return a
    }

    function Va(a) {
        if (!f.object.is(a)) {
            var b = this.option("Position");
            a = (new M).setSize(a, {singleProp: i.BasePanel.orthogonalLength[b]})
        }
        return a
    }

    function Kb(a) {
        var b =
            this.option("Position");
        return i.parseAlign(b, a)
    }

    function Lb(a) {
        return (new M).setSize(a, {singleProp: "width"})
    }

    function Mb(a) {
        return a.dataPartValue
    }

    function Nb(a) {
        if (this.name === "trend")return null;
        var b = this.option("TrendType");
        if (!b && a)b = a.type;
        if (!b || b === "none")return null;
        a = a ? Object.create(a) : {};
        var c = i.trends.get(b);
        a.info = c;
        a.type = b;
        b = this.option("TrendLabel");
        a.label = b != null ? String(b) : c.dataPartAtom.f;
        return a
    }

    function wa(a, b) {
        return {
            resolveV1: function (c) {
                if (this.globalIndex === 0) {
                    this._specifyChartOption(c,
                        "show" + a) || c.defaultValue(b);
                    return true
                }
            }
        }
    }

    function Wa(a) {
        return {
            resolveV1: function (b) {
                this._specifyChartOption(b, "show" + a);
                return true
            }
        }
    }

    var i = f.globalSpace("pvc", {debug: 0});
    (function () {
        if (typeof window !== "undefined" && window.location) {
            var a = function (d) {
                return d && /\bdebug=true\b/.test(d) ? d : null
            }, b = a(window.location.href);
            if (!b)try {
                b = a(window.top.location.href)
            } catch (c) {
            }
            if (b) {
                a = /\bdebugLevel=(\d+)/.exec(b);
                i.debug = a ? +a[1] : 3
            }
        }
    })();
    var Q = t.Mark;
    i.invisibleFill = "rgba(127,127,127,0.00001)";
    i.logSeparator =
        "------------------------------------------";
    var Ob = Array.prototype.slice;
    i.setDebug = function (a) {
        a = +a;
        i.debug = isNaN(a) ? 0 : a;
        Ya();
        Za();
        return i.debug
    };
    i.setDebug(i.debug);
    i.defaultCompatVersion = function (a) {
        var b = i.BaseChart.prototype.defaults;
        if (a != null)return b.compatVersion = a;
        return b.compatVersion
    };
    i.cloneMatrix = function (a) {
        return a.map(function (b) {
            return b.slice()
        })
    };
    i.stringify = function (a, b) {
        var c = f.get(b, "maxLevel") || 5, d = [];
        i.stringifyRecursive(d, a, c, b);
        return d.join("")
    };
    i.stringifyRecursive =
        function (a, b, c, d) {
            if (c > 0) {
                c--;
                switch (typeof b) {
                    case "undefined":
                        return a.push("undefined");
                    case "object":
                        if (!b) {
                            a.push("null");
                            return true
                        }
                        if (f.fun.is(b.stringify))return b.stringify(a, c, d);
                        if (b instanceof Array) {
                            a.push("[");
                            b.forEach(function (j, k) {
                                k && a.push(", ");
                                i.stringifyRecursive(a, j, c, d) || a.pop()
                            });
                            a.push("]")
                        } else {
                            var e = f.get(d, "ownOnly", true);
                            if (b === f.global) {
                                a.push("<window>");
                                return true
                            }
                            if (f.fun.is(b.cloneNode)) {
                                a.push("<dom #" + (b.id || b.name || "?") + ">");
                                return true
                            }
                            if (c > 1 && b.constructor !==
                                Object) {
                                c = 1;
                                e = true
                            }
                            a.push("{");
                            var g = true;
                            for (var h in b)if (!e || f.hasOwnProp.call(b, h)) {
                                g || a.push(", ");
                                a.push(h + ": ");
                                if (i.stringifyRecursive(a, b[h], c, d)) {
                                    if (g)g = false
                                } else {
                                    a.pop();
                                    g || a.pop()
                                }
                            }
                            if (g) {
                                b = "" + b;
                                b !== "[object Object]" && a.push("{" + b + "}")
                            }
                            a.push("}")
                        }
                        return true;
                    case "number":
                        a.push("" + Math.round(1E5 * b) / 1E5);
                        return true;
                    case "boolean":
                        a.push("" + b);
                        return true;
                    case "string":
                        a.push(JSON.stringify(b));
                        return true;
                    case "function":
                        if (f.get(d, "funs", false)) {
                            a.push(JSON.stringify(b.toString().substr(0,
                                13) + "..."));
                            return true
                        }
                        return false
                }
                a.push("'new ???'");
                return true
            }
        };
    i.orientation = {vertical: "vertical", horizontal: "horizontal"};
    i.extensionTag = "extension";
    i.extendType = function (a, b, c) {
        if (b) {
            var d, e = a.prototype._vars, g = function (h, j) {
                if (h !== undefined) {
                    d || (d = {});
                    if (e && e[j])j = "_" + j + "EvalCore";
                    d[j] = f.fun.to(h)
                }
            };
            c ? c.forEach(function (h) {
                g(b[h], h)
            }) : f.each(g);
            d && a.add(d)
        }
    };
    t.Color.prototype.stringify = function (a, b, c) {
        return i.stringifyRecursive(a, this.key, b, c)
    };
    Q.prototype.hasDelegateValue = function (a,
                                             b) {
        var c = this.$propertiesMap[a];
        if (c)return !b || c.tag === b;
        if (this.proto)return this.proto.hasDelegateValue(a, b);
        return false
    };
    i.defaultColorScheme = null;
    i.brighterColorTransform = function (a) {
        return (a.rgb ? a : t.color(a)).brighter(0.6)
    };
    i.setDefaultColorScheme = function (a) {
        return i.defaultColorScheme = i.colorScheme(a)
    };
    i.defaultColor = t.Colors.category10()("?");
    i.colorScheme = function (a) {
        if (a == null)return null;
        if (typeof a === "function") {
            if (!a.hasOwnProperty("range"))return a;
            a = a.range()
        } else a = f.array.as(a);
        if (!a.length)return null;
        return function () {
            var b = t.colors(a);
            b.domain.apply(b, arguments);
            return b
        }
    };
    i.createColorScheme = function (a) {
        return i.colorScheme(a) || i.defaultColorScheme || t.Colors.category10
    };
    i.toGrayScale = function (a, b, c, d) {
        a = t.color(a);
        var e = 0.299 * a.r + 0.587 * a.g + 0.114 * a.b;
        if (c === undefined)c = 200; else if (c == null)c = 255;
        if (d === undefined)d = 30; else if (d == null)d = 0;
        var g = c - d;
        e = g <= 0 ? c : d + e / 255 * g;
        if (b == null)b = a.opacity; else if (b < 0)b = -b * a.opacity;
        e = Math.round(e);
        return t.rgb(e, e, e, b)
    };
    i.removeTipsyLegends =
        function () {
            try {
                $(".tipsy").remove()
            } catch (a) {
            }
        };
    i.createDateComparer = function (a, b) {
        if (!b)b = t.identity;
        return function (c, d) {
            return a.parse(b(c)) - a.parse(b(d))
        }
    };
    i.time = {
        intervals: {y: 31536E6, m: 2592E6, d30: 2592E6, w: 6048E5, d7: 6048E5, d: 864E5, h: 36E5, M: 6E4, s: 1E3, ms: 1}, withoutTime: function (a) {
            return new Date(a.getFullYear(), a.getMonth(), a.getDate())
        }, weekday: {
            previousOrSelf: function (a, b) {
                if (b = a.getDay() - b)a = new Date(a - (b < 0 ? 7 + b : b) * i.time.intervals.d);
                return a
            }, nextOrSelf: function (a, b) {
                if (b = a.getDay() - b)a = new Date(a +
                (b > 0 ? 7 - b : -b) * i.time.intervals.d);
                return a
            }, closestOrSelf: function (a, b) {
                if (b = a.getDay() - b) {
                    var c = i.time.intervals.d, d = b > 0 ? 1 : -1;
                    b = Math.abs(b);
                    a = b >= 4 ? new Date(a.getTime() + d * (7 - b) * c) : new Date(a.getTime() - d * b * c)
                }
                return a
            }
        }
    };
    t.Format.createParser = function (a) {
        function b(c) {
            return c instanceof Date ? c : f.number.is(c) ? new Date(c) : a.parse(c)
        }

        return b
    };
    t.Format.createFormatter = function (a) {
        function b(c) {
            return c != null ? a.format(c) : ""
        }

        return b
    };
    i.buildTitleFromName = function (a) {
        return f.firstUpperCase(a).replace(/([a-z\d])([A-Z])/,
            "$1 $2")
    };
    i.buildIndexedId = function (a, b) {
        if (b > 0)return a + "" + (b + 1);
        return a
    };
    i.splitIndexedId = function (a) {
        a = /^(.*?)(\d*)$/.exec(a);
        var b = null;
        if (a[2]) {
            b = Number(a[2]);
            if (b <= 1)b = 1; else b--
        }
        return [a[1], b]
    };
    var Pb = [null];
    i.makeExtensionAbsId = function (a, b) {
        if (!a)return b;
        var c = [];
        b = f.array.to(b) || Pb;
        a = f.array.to(a);
        for (var d = 0, e = b.length; d < e; d++)for (var g = 0, h = a.length; g < h; g++) {
            var j = $a(a[g], b[d]);
            j && c.push(j)
        }
        return c
    };
    i.makeEnumParser = function (a, b, c) {
        if (f.array.is(b)) {
            var d = {};
            b.forEach(function (e) {
                if (e)d[e.toLowerCase()] =
                    e
            });
            b = function (e) {
                return f.hasOwn(d, e)
            }
        }
        if (c)c = c.toLowerCase();
        return function (e) {
            if (e)e = ("" + e).toLowerCase();
            if (!b(e)) {
                e && i.debug >= 2 && i.warn("Invalid '" + a + "' value: '" + e + "'. Assuming '" + c + "'.");
                e = c
            }
            return e
        }
    };
    i.parseDistinctIndexArray = function (a, b, c) {
        a = f.array.as(a);
        if (a == null)return null;
        if (b == null)b = 0;
        if (c == null)c = Infinity;
        a = f.query(a).select(function (d) {
            return +d
        }).where(function (d) {
            return !isNaN(d) && d >= b && d <= c
        }).distinct().array();
        return a.length ? a : null
    };
    i.parseMultiChartOverflow = i.makeEnumParser("multiChartOverflow",
        ["grow", "fit", "clip"], "grow");
    i.parseLegendClickMode = i.makeEnumParser("legendClickMode", ["toggleSelected", "toggleVisible", "none"], "toggleVisible");
    i.parseTooltipAutoContent = i.makeEnumParser("tooltipAutoContent", ["summary", "value"], "value");
    i.parseSelectionMode = i.makeEnumParser("selectionMode", ["rubberBand", "focusWindow"], "rubberBand");
    i.parseClearSelectionMode = i.makeEnumParser("clearSelectionMode", ["emptySpaceClick", "manual"], "emptySpaceClick");
    i.parseShape = i.makeEnumParser("shape", t.Scene.hasSymbol,
        null);
    i.parseTreemapColorMode = i.makeEnumParser("colorMode", ["byParent", "bySelf"], "byParent");
    i.parseTreemapLayoutMode = i.makeEnumParser("layoutMode", ["squarify", "slice-and-dice", "slice", "dice"], "squarify");
    i.parseContinuousColorScaleType = function (a) {
        if (a) {
            a = ("" + a).toLowerCase();
            switch (a) {
                case "linear":
                case "normal":
                case "discrete":
                    break;
                default:
                    i.debug >= 2 && i.log("[Warning] Invalid 'ScaleType' option value: '" + a + "'.");
                    a = null;
                    break
            }
        }
        return a
    };
    i.parseDomainScope = function (a, b) {
        if (a) {
            a = ("" + a).toLowerCase();
            switch (a) {
                case "cell":
                case "global":
                    break;
                case "section":
                    if (!b)throw f.error.argumentRequired("orientation");
                    a = b === "y" ? "row" : "column";
                    break;
                case "column":
                case "row":
                    if (b && b !== (a === "row" ? "y" : "x")) {
                        a = "section";
                        i.debug >= 2 && i.log("[Warning] Invalid 'DomainScope' option value: '" + a + "' for the orientation: '" + b + "'.")
                    }
                    break;
                default:
                    i.debug >= 2 && i.log("[Warning] Invalid 'DomainScope' option value: '" + a + "'.");
                    a = null;
                    break
            }
        }
        return a
    };
    i.parseDomainRoundingMode = function (a) {
        if (a) {
            a = ("" + a).toLowerCase();
            switch (a) {
                case "none":
                case "nice":
                case "tick":
                    break;
                default:
                    i.debug >= 2 && i.log("[Warning] Invalid 'DomainRoundMode' value: '" + a + "'.");
                    a = null;
                    break
            }
        }
        return a
    };
    i.parseOverlappedLabelsMode = function (a) {
        if (a) {
            a = ("" + a).toLowerCase();
            switch (a) {
                case "leave":
                case "hide":
                case "rotatethenhide":
                    break;
                default:
                    i.debug >= 2 && i.log("[Warning] Invalid 'OverlappedLabelsMode' option value: '" + a + "'.");
                    a = null;
                    break
            }
        }
        return a
    };
    i.castNumber = function (a) {
        if (a != null) {
            a = +a;
            if (isNaN(a))a = null
        }
        return a
    };
    i.castPositiveNumber = function (a) {
        a = i.castNumber(a);
        if (a != null && !(a > 0))a = null;
        return a
    };
    i.parseWaterDirection = function (a) {
        if (a) {
            a = ("" + a).toLowerCase();
            switch (a) {
                case "up":
                case "down":
                    return a
            }
            i.debug >= 2 && i.log("[Warning] Invalid 'WaterDirection' value: '" + a + "'.")
        }
    };
    i.parseTrendType = function (a) {
        if (a) {
            a = ("" + a).toLowerCase();
            if (a === "none")return a;
            if (i.trends.has(a))return a;
            i.debug >= 2 && i.log("[Warning] Invalid 'TrendType' value: '" + a + "'.")
        }
    };
    i.parseNullInterpolationMode = function (a) {
        if (a) {
            a = ("" + a).toLowerCase();
            switch (a) {
                case "none":
                case "linear":
                case "zero":
                    return a
            }
            i.debug >=
            2 && i.log("[Warning] Invalid 'NullInterpolationMode' value: '" + a + "'.")
        }
    };
    i.parseAlign = function (a, b) {
        if (b)b = ("" + b).toLowerCase();
        var c;
        if (a === "left" || a === "right") {
            a = b && i.BasePanel.verticalAlign[b];
            if (!a) {
                a = "middle";
                c = !!b
            }
        } else {
            a = b && i.BasePanel.horizontalAlign[b];
            if (!a) {
                a = "center";
                c = !!b
            }
        }
        c && i.debug >= 2 && i.log(f.format("Invalid alignment value '{0}'. Assuming '{1}'.", [b, a]));
        return a
    };
    i.parseAnchor = function (a) {
        if (a) {
            a = ("" + a).toLowerCase();
            switch (a) {
                case "top":
                case "left":
                case "center":
                case "bottom":
                case "right":
                    return a
            }
            i.debug >=
            2 && i.log(f.format("Invalid anchor value '{0}'.", [a]))
        }
    };
    i.parseAnchorWedge = function (a) {
        if (a) {
            a = ("" + a).toLowerCase();
            switch (a) {
                case "outer":
                case "inner":
                case "center":
                case "start":
                case "end":
                    return a
            }
            i.debug >= 2 && i.log(f.format("Invalid wedge anchor value '{0}'.", [a]))
        }
    };
    i.unionExtents = function (a, b) {
        if (a) {
            if (b) {
                if (b.min < a.min)a.min = b.min;
                if (b.max > a.max)a.max = b.max
            }
        } else {
            if (!b)return null;
            a = {min: b.min, max: b.max}
        }
        return a
    };
    var E = i.Sides = function (a) {
        a != null && this.setSides(a)
    };
    E.hnames = "left right".split(" ");
    E.vnames = "top bottom".split(" ");
    E.names = "left right top bottom".split(" ");
    E.namesSet = t.dict(E.names, f.retTrue);
    i.parsePosition = function (a, b) {
        if (a) {
            a = ("" + a).toLowerCase();
            if (!f.hasOwn(E.namesSet, a)) {
                var c = b || "left";
                i.debug >= 2 && i.log(f.format("Invalid position value '{0}. Assuming '{1}'.", [a, c]));
                a = c
            }
        }
        return a || b || "left"
    };
    E.as = function (a) {
        if (a != null && !(a instanceof E))a = (new E).setSides(a);
        return a
    };
    E.to = function (a) {
        if (a == null || !(a instanceof E))a = (new E).setSides(a);
        return a
    };
    E.prototype.stringify =
        function (a, b, c) {
            return i.stringifyRecursive(a, f.copyOwn(this), b, c)
        };
    E.prototype.setSides = function (a) {
        if (typeof a === "string") {
            var b = a.split(/\s+/).map(function (c) {
                return L.parse(c)
            });
            switch (b.length) {
                case 1:
                    this.set("all", b[0]);
                    return this;
                case 2:
                    this.set("top", b[0]);
                    this.set("left", b[1]);
                    this.set("right", b[1]);
                    this.set("bottom", b[0]);
                    return this;
                case 3:
                    this.set("top", b[0]);
                    this.set("left", b[1]);
                    this.set("right", b[1]);
                    this.set("bottom", b[2]);
                    return this;
                case 4:
                    this.set("top", b[0]);
                    this.set("right",
                        b[1]);
                    this.set("bottom", b[2]);
                    this.set("left", b[3]);
                    return this;
                case 0:
                    return this
            }
        } else if (typeof a === "number") {
            this.set("all", a);
            return this
        } else if (typeof a === "object") {
            if (a instanceof L)this.set("all", a); else {
                this.set("all", a.all);
                this.set("width", a.width);
                this.set("height", a.height);
                for (b in a)E.namesSet.hasOwnProperty(b) && this.set(b, a[b])
            }
            return this
        }
        i.debug && i.log("Invalid 'sides' value: " + i.stringify(a));
        return this
    };
    E.prototype.set = function (a, b) {
        b = L.parse(b);
        if (b != null)switch (a) {
            case "all":
                E.names.forEach(function (c) {
                    this[c] =
                        b
                }, this);
                break;
            case "width":
                this.left = this.right = L.divide(b, 2);
                break;
            case "height":
                this.top = this.bottom = L.divide(b, 2);
                break;
            default:
                if (f.hasOwn(E.namesSet, a))this[a] = b
        }
    };
    E.prototype.resolve = function (a, b) {
        if (typeof a === "object") {
            b = a.height;
            a = a.width
        }
        var c = {};
        E.names.forEach(function (d) {
            var e = 0, g = this[d];
            if (g != null)e = typeof g === "number" ? g : g.resolve(d === "left" || d === "right" ? a : b);
            c[d] = e
        }, this);
        return E.updateSize(c)
    };
    E.updateSize = function (a) {
        a.width = (a.left || 0) + (a.right || 0);
        a.height = (a.bottom || 0) + (a.top ||
        0);
        return a
    };
    E.resolvedMax = function (a, b) {
        var c = {};
        E.names.forEach(function (d) {
            c[d] = Math.max(a[d] || 0, b[d] || 0)
        });
        return c
    };
    E.inflate = function (a, b) {
        var c = {};
        E.names.forEach(function (d) {
            c[d] = (a[d] || 0) + b
        });
        return E.updateSize(c)
    };
    var L = i.PercentValue = function (a) {
        this.percent = a
    };
    L.prototype.resolve = function (a) {
        return this.percent * a
    };
    L.prototype.divide = function (a) {
        return new L(this.percent / a)
    };
    L.divide = function (a, b) {
        return a instanceof L ? a.divide(b) : a / b
    };
    L.parse = function (a) {
        if (a != null && a !== "") {
            switch (typeof a) {
                case "number":
                    return a;
                case "string":
                    var b = a.match(/^(.+?)\s*(%)?$/);
                    if (b) {
                        var c = +b[1];
                        if (!isNaN(c))if (b[2]) {
                            if (c >= 0)return new L(c / 100)
                        } else return c
                    }
                    break;
                case "object":
                    if (a instanceof L)return a;
                    break
            }
            i.debug && i.log(f.format("Invalid margins component '{0}'", ["" + a]))
        }
    };
    L.resolve = function (a, b) {
        return a instanceof L ? a.resolve(b) : a
    };
    var Xa = Q.prototype.zOrder;
    Q.prototype.zOrder = function (a) {
        var b = this.borderPanel;
        if (b && b !== this)return Xa.call(b, a);
        return Xa.call(this, a)
    };
    Q.prototype.wrapper = function (a) {
        this._wrapper = a;
        return this
    };
    Q.prototype.wrap = function (a, b) {
        if (a && f.fun.is(a) && this._wrapper && !a._cccWrapped) {
            a = this._wrapper(a, b);
            a._cccWrapped = true
        }
        return a
    };
    Q.prototype.lock = function (a, b) {
        b !== undefined && this[a](b);
        (this._locked || (this._locked = {}))[a] = true;
        return this
    };
    Q.prototype.isIntercepted = function (a) {
        return this._intercepted && this._intercepted[a]
    };
    Q.prototype.isLocked = function (a) {
        return this._locked && this._locked[a]
    };
    Q.prototype.ensureEvents = function (a) {
        var b = this.propertyValue("events", true);
        if (!b || b === "none")this.events(a ||
        "all");
        return this
    };
    Q.prototype.addMargin = function (a, b) {
        if (b !== 0) {
            var c = f.nullyTo(this.propertyValue(a), 0), d = t.functor(c);
            this[a](function () {
                return b + d.apply(this, Ob.call(arguments))
            })
        }
        return this
    };
    Q.prototype.addMargins = function (a) {
        var b = f.get(a, "all", 0);
        this.addMargin("left", f.get(a, "left", b));
        this.addMargin("right", f.get(a, "right", b));
        this.addMargin("top", f.get(a, "top", b));
        this.addMargin("bottom", f.get(a, "bottom", b));
        return this
    };
    Q.prototype.eachInstanceWithData = function (a, b) {
        this.eachInstance(function (c,
                                    d, e) {
            c.mark.sign && c[d].data && a.call(b, c, d, e)
        })
    };
    Q.prototype.eachSceneWithDataOnRect = function (a, b, c, d) {
        function e(k, m) {
            if (k.intersectsRect(a))(k = m.data) && k.datum && b.call(c, k)
        }

        var g = this, h = g.sign;
        if (!(h && !h.selectable())) {
            if (d == null)d = g.rubberBandSelectionMode || "partial";
            var j = d === "center";
            g.eachInstanceWithData(function (k, m, l) {
                var n = g.getShape(k, m, 0.15);
                n = (j ? n.center() : n).apply(l);
                e(n, k[m], m)
            })
        }
    };
    Q.prototype.eachDatumOnRect = function (a, b, c, d) {
        function e(k, m) {
            if (k.intersectsRect(a))(k = m.data) && k.datum &&
            k.datums().each(function (l) {
                l.isNull || b.call(c, l)
            })
        }

        var g = this, h = g.sign;
        if (!(h && !h.selectable())) {
            if (d == null)d = g.rubberBandSelectionMode || "partial";
            var j = d === "center";
            g.eachInstanceWithData(function (k, m, l) {
                var n = g.getShape(k, m, 0.15);
                n = (j ? n.center() : n).apply(l);
                e(n, k[m], m)
            })
        }
    };
    t.Transform.prototype.transformHPosition = function (a) {
        return this.x + this.k * a
    };
    t.Transform.prototype.transformVPosition = function (a) {
        return this.y + this.k * a
    };
    t.Transform.prototype.transformLength = function (a) {
        return this.k * a
    };
    var M =
        f.type("pvc.Size").init(function (a, b) {
            if (arguments.length === 1)a != null && this.setSize(a); else {
                if (a != null)this.width = a;
                if (b != null)this.height = b
            }
        }).add({
            stringify: function (a, b, c) {
                return i.stringifyRecursive(a, f.copyOwn(this), b, c)
            }, setSize: function (a, b) {
                if (typeof a === "string") {
                    var c = a.split(/\s+/).map(function (d) {
                        return L.parse(d)
                    });
                    switch (c.length) {
                        case 1:
                            this.set(f.get(b, "singleProp", "all"), c[0]);
                            return this;
                        case 2:
                            this.set("width", c[0]);
                            this.set("height", c[1]);
                            return this;
                        case 0:
                            return this
                    }
                } else if (typeof a ===
                    "number") {
                    this.set(f.get(b, "singleProp", "all"), a);
                    return this
                } else if (typeof a === "object") {
                    if (a instanceof L)this.set(f.get(b, "singleProp", "all"), a); else {
                        this.set("all", a.all);
                        for (c in a)c !== "all" && this.set(c, a[c])
                    }
                    return this
                }
                i.debug && i.log("Invalid 'size' value: " + i.stringify(a));
                return this
            }, set: function (a, b) {
                if (b != null && (a === "all" || f.hasOwn(M.namesSet, a))) {
                    b = L.parse(b);
                    if (b != null)if (a === "all")M.names.forEach(function (c) {
                        this[c] = b
                    }, this); else this[a] = b
                }
                return this
            }, clone: function () {
                return new M(this.width,
                    this.height)
            }, intersect: function (a) {
                return new M(Math.min(this.width, a.width), Math.min(this.height, a.height))
            }, resolve: function (a) {
                var b = {};
                M.names.forEach(function (c) {
                    var d = this[c];
                    if (d != null)if (typeof d === "number")b[c] = d; else if (a) {
                        var e = a[c];
                        if (e != null)b[c] = d.resolve(e)
                    }
                }, this);
                return b
            }
        });
    M.names = ["width", "height"];
    M.namesSet = t.dict(M.names, f.retTrue);
    M.toOrtho = function (a, b) {
        if (a != null) {
            var c;
            if (b)c = i.BasePanel.orthogonalLength[b];
            a = M.to(a, {singleProp: c});
            b && delete a[i.BasePanel.oppositeLength[c]]
        }
        return a
    };
    M.to = function (a, b) {
        if (a != null && !(a instanceof M))a = (new M).setSize(a, b);
        return a
    };
    var W = f.type("pvc.Offset").init(function (a, b) {
        if (arguments.length === 1)a != null && this.setOffset(a); else {
            if (a != null)this.x = a;
            if (b != null)this.y = b
        }
    }).add({
        stringify: function (a, b, c) {
            return i.stringifyRecursive(a, f.copyOwn(this), b, c)
        }, setOffset: function (a, b) {
            if (typeof a === "string") {
                var c = a.split(/\s+/).map(function (d) {
                    return L.parse(d)
                });
                switch (c.length) {
                    case 1:
                        this.set(f.get(b, "singleProp", "all"), c[0]);
                        return this;
                    case 2:
                        this.set("x",
                            c[0]);
                        this.set("y", c[1]);
                        return this;
                    case 0:
                        return this
                }
            } else if (typeof a === "number") {
                this.set(f.get(b, "singleProp", "all"), a);
                return this
            } else if (typeof a === "object") {
                this.set("all", a.all);
                for (c in a)c !== "all" && this.set(c, a[c]);
                return this
            }
            i.debug && i.log("Invalid 'offset' value: " + i.stringify(a));
            return this
        }, set: function (a, b) {
            if (b != null && f.hasOwn(W.namesSet, a)) {
                b = L.parse(b);
                if (b != null)if (a === "all")W.names.forEach(function (c) {
                    this[c] = b
                }, this); else this[a] = b
            }
        }, resolve: function (a) {
            var b = {};
            M.names.forEach(function (c) {
                var d =
                    W.namesSizeToOffset[c], e = this[d];
                if (e != null)if (typeof e === "number")b[d] = e; else if (a) {
                    c = a[c];
                    if (c != null)b[d] = e.resolve(c)
                }
            }, this);
            return b
        }
    });
    W.addStatic({names: ["x", "y"]}).addStatic({
        namesSet: t.dict(W.names, f.retTrue),
        namesSizeToOffset: {width: "x", height: "y"},
        namesSidesToOffset: {left: "x", right: "x", top: "y", bottom: "y"},
        as: function (a) {
            if (a != null && !(a instanceof W))a = (new W).setOffset(a);
            return a
        }
    });
    if ($.support.svg == null)$.support.svg = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure",
        "1.1");
    i.text = {
        getFitInfo: function (a, b, c, d, e) {
            if (c === "")return {h: true, v: true, d: true};
            c = t.Text.measureWidth(c, d);
            return {h: c <= a, v: c <= b, d: c <= Math.sqrt(a * a + b * b) - e}
        }, trimToWidthB: function (a, b, c, d, e) {
            var g = 1.5 * t.Text.measureWidth(d, c);
            return i.text.trimToWidth(a, b, c, d, e, g)
        }, trimToWidth: function (a, b, c, d, e, g) {
            if (b === "")return b;
            var h = t.Text.measureWidth(b, c);
            if (h <= a)return b;
            if (h > a * 1.5)return i.text.trimToWidthBin(a, b, c, d, e, g);
            for (a -= t.Text.measureWidth(d, c); h > a;) {
                b = e ? b.slice(1) : b.slice(0, b.length - 1);
                h = t.Text.measureWidth(b,
                    c)
            }
            if (g && h <= g)return "";
            return e ? d + b : b + d
        }, trimToWidthBin: function (a, b, c, d, e, g) {
            a -= t.Text.measureWidth(d, c);
            for (var h = b.length, j = h - 2, k = 0, m, l; k <= j && j > 0;) {
                m = Math.ceil((k + j) / 2);
                var n = e ? b.slice(h - m) : b.slice(0, m);
                l = t.Text.measureWidth(n, c);
                if (l > a)j = m - 1; else if (t.Text.measureWidth(e ? b.slice(h - m - 1) : b.slice(0, m + 1), c) < a)k = m + 1; else {
                    if (g && l <= g)return "";
                    return e ? d + n : n + d
                }
            }
            b = e ? b.slice(h - j) : b.slice(0, j);
            l = b.length;
            if (g && l <= g)return "";
            return e ? d + b : b + d
        }, justify: function (a, b, c) {
            var d = [];
            if (b < t.Text.measureWidth("a",
                    c))return d;
            a = (a || "").split(/\s+/);
            for (var e = ""; a.length;) {
                var g = a.shift();
                if (g) {
                    var h = e ? e + " " + g : g;
                    if (t.Text.measureWidth(h, c) > b) {
                        e && d.push(e);
                        e = g
                    } else e = h
                }
            }
            e && d.push(e);
            return d
        }, getLabelBBox: function (a, b, c, d, e, g) {
            b = t.Label.getPolygon(a, b, c, d, e, g);
            d = b.bbox();
            d.source = b;
            d.sourceAngle = e;
            d.sourceAlign = c;
            d.sourceTextWidth = a;
            return d
        }
    };
    i.color = {scale: Ba, scales: Aa, toGray: i.toGrayScale, isGray: za};
    f.type("pvc.color.ScalesBuild").init(function (a) {
        this.keyArgs = a;
        this.data = a.data || f.fail.argumentRequired("keyArgs.data");
        this.domainDimName = a.colorDimension || f.fail.argumentRequired("keyArgs.colorDimension");
        this.domainDim = this.data.dimensions(this.domainDimName);
        var b = this.domainDim.type;
        if (b.isComparable)this.domainComparer = function (c, d) {
            return b.compare(c, d)
        }; else {
            this.domainComparer = null;
            i.log("Color value dimension should be comparable. Generated color scale may be invalid.")
        }
        this.nullRangeValue = a.colorMissing ? t.color(a.colorMissing) : t.Color.transparent;
        this.domainRangeCountDif = 0
    }).add({
        build: function () {
            this.range =
                this._getRange();
            this.desiredDomainCount = this.range.length + this.domainRangeCountDif;
            return this._createScale(this._getDomain())
        }, buildMap: function () {
            this.range = this._getRange();
            this.desiredDomainCount = this.range.length + this.domainRangeCountDif;
            var a;
            if (this.keyArgs.normPerBaseCategory)a = function (b) {
                return this._createScale(this._ensureDomain(null, false, b))
            }; else {
                a = this._createScale(this._getDomain());
                a = f.fun.constant(a)
            }
            return this._createCategoryScalesMap(a)
        }, _createScale: f.method({isAbstract: true}),
        _createCategoryScalesMap: function (a) {
            return this.data.children().object({
                name: function (b) {
                    return b.absKey
                }, value: a, context: this
            })
        }, _getRange: function () {
            var a = this.keyArgs, b = a.colors || ["red", "yellow", "green"];
            if (a.colorMin != null && a.colorMax != null)b = [a.colorMin, a.colorMax]; else if (a.colorMin != null)b.unshift(a.colorMin); else a.colorMax != null && b.push(a.colorMax);
            return b.map(function (c) {
                return t.color(c)
            })
        }, _getDataExtent: function (a) {
            var b = a.dimensions(this.domainDimName).extent({visible: true});
            if (!b)return null;
            a = b.min.value;
            b = b.max.value;
            if (b == a)if (b >= 1)a = b - 1; else b = a + 1;
            return {min: a, max: b}
        }, _getDomain: function () {
            var a = this.keyArgs.colorDomain;
            if (a != null) {
                this.domainComparer && a.sort(this.domainComparer);
                if (a.length > this.desiredDomainCount)a = a.slice(0, this.desiredDomainCount)
            } else a = [];
            return this._ensureDomain(a, true, this.data)
        }, _ensureDomain: function (a, b, c) {
            var d;
            if (a && b) {
                b = this.desiredDomainCount - a.length;
                if (b > 0)if (d = this._getDataExtent(c))switch (b) {
                    case 1:
                        this.domainComparer ? f.array.insert(a, d.max, this.domainComparer) :
                            a.push(d.max);
                        break;
                    case 2:
                        if (this.domainComparer) {
                            f.array.insert(a, d.min, this.domainComparer);
                            f.array.insert(a, d.max, this.domainComparer)
                        } else {
                            a.unshift(d.min);
                            a.push(d.max)
                        }
                        break;
                    default:
                        i.debug >= 2 && i.log("Ignoring option 'colorDomain' due to unsupported length." + f.format(" Should have '{0}', but instead has '{1}'.", [this.desiredDomainCount, a.length]));
                        a = null
                }
            }
            if (!a) {
                d || (d = this._getDataExtent(c));
                if (d) {
                    a = d.min;
                    d = d.max;
                    c = (d - a) / (this.desiredDomainCount - 1);
                    a = t.range(a, d + c, c)
                }
            }
            return a
        }
    });
    f.type("pvc.color.LinearScalesBuild",
        i.color.ScalesBuild).add({
            _createScale: function (a) {
                var b = t.Scale.linear();
                a && b.domain.apply(b, a);
                b.range.apply(b, this.range);
                return b
            }
        });
    f.type("pvc.color.DiscreteScalesBuild", i.color.ScalesBuild).init(function (a) {
        this.base(a);
        this.domainRangeCountDif = 1
    }).add({
        _createScale: function (a) {
            function b(h) {
                if (h == null)return e;
                for (var j = 0; j < c; j++)if (h <= a[j + 1])return d[j];
                return d[g]
            }

            var c = a.length - 1, d = this.range, e = this.nullRangeValue, g = d.length - 1;
            f.copy(b, t.Scale.common);
            b.domain = function () {
                return a
            };
            b.range =
                function () {
                    return d
                };
            return b
        }
    });
    f.space("pvc.trends", function (a) {
        var b = {};
        f.set(a, "define", function (c, d) {
            c || f.fail.argumentRequired("type");
            d || f.fail.argumentRequired("trendSpec");
            f.object.is(d) || f.fail.argumentInvalid("trendSpec", "Must be a trend specification object.");
            c = ("" + c).toLowerCase();
            i.debug >= 2 && f.hasOwn(b, c) && i.log(f.format("[WARNING] A trend type with the name '{0}' is already defined.", [c]));
            var e = d.label || f.fail.argumentRequired("trendSpec.label");
            d = d.model || f.fail.argumentRequired("trendSpec.model");
            f.fun.is(d) || f.fail.argumentInvalid("trendSpec.mode", "Must be a function.");
            b[c] = {dataPartAtom: {v: "trend", f: e}, type: c, label: e, model: d}
        }, "get", function (c) {
            c || f.fail.argumentRequired("type");
            return f.getOwn(b, c) || f.fail.operationInvalid("Undefined trend type '{0}'.", [c])
        }, "has", function (c) {
            return f.hasOwn(b, c)
        }, "types", function () {
            return f.ownKeys(b)
        });
        a.define("linear", {
            label: "Linear trend", model: function (c) {
                for (var d = f.get(c, "rows"), e = f.get(c, "x"), g = f.get(c, "y"), h = 0, j = c = 0, k = 0, m = 0, l = 0, n = function (s) {
                    return s !=
                    null ? +s : NaN
                }; d.next();) {
                    var o = d.item, p = e ? n(e(o)) : h;
                    if (!isNaN(p)) {
                        o = n(g(o));
                        if (!isNaN(o)) {
                            c++;
                            j += p;
                            k += o;
                            m += p * o;
                            l += p * p
                        }
                    }
                    h++
                }
                var q, r;
                if (c >= 2) {
                    d = j / c;
                    e = k / c;
                    m = m / c;
                    c = l / c - d * d;
                    r = c === 0 ? 0 : (m - d * e) / c;
                    q = e - r * d;
                    return {
                        alpha: q, beta: r, reset: f.noop, sample: function (s) {
                            return q + r * +s
                        }
                    }
                }
            }
        });
        a.define("moving-average", {
            label: "Moving average", model: function (c) {
                var d = Math.max(+(f.get(c, "periods") || 3), 2), e = 0, g = [];
                return {
                    reset: function () {
                        e = 0;
                        g.length = 0
                    }, sample: function (h, j) {
                        h = d;
                        if (j != null) {
                            g.unshift(j);
                            e += j;
                            h = g.length;
                            if (h > d) {
                                e -=
                                    g.pop();
                                h = d
                            }
                        }
                        return e / h
                    }
                }
            }
        });
        a.define("weighted-moving-average", {
            label: "Weighted Moving average", model: function (c) {
                var d = Math.max(+(f.get(c, "periods") || 3), 2), e = 0, g = 0, h = [], j = 0, k = 0;
                return {
                    reset: function () {
                        e = g = k = j = 0;
                        h.length = 0
                    }, sample: function (m, l) {
                        if (l != null)if (j < d) {
                            h.push(l);
                            j++;
                            k += j;
                            g += j * l;
                            e += l
                        } else {
                            g += j * l - e;
                            e += l - h[0];
                            for (m = 1; m < d; m++)h[m - 1] = h[m];
                            h[d - 1] = l
                        }
                        return g / k
                    }
                }
            }
        })
    });
    fa.resolvers = bb;
    fa.constant = cb;
    fa.specify = db;
    fa.defaultValue = eb;
    i.options = fa;
    var ab = f.type().init(function (a, b, c, d) {
        this.name =
            a;
        this.option = b;
        this._dv = this.value = f.get(d, "value");
        this._resolve = f.get(d, "resolve");
        this.isResolved = a = !this._resolve;
        this._setCalled = this.isSpecified = false;
        this._context = c;
        this._cast = f.get(d, "cast");
        this._getDefault = a ? null : f.get(d, "getDefault");
        this.data = f.get(d, "data")
    }).add({
        resolve: function () {
            if (!this.isResolved) {
                this.isResolved = true;
                this._setCalled = false;
                this._getFunProp("_resolve").call(this._context, this);
                if (!this._setCalled) {
                    this.isSpecified = false;
                    var a = this._dynDefault();
                    if (a != null)this.value =
                        this._dv = a
                }
            }
            return this
        }, specify: function (a) {
            return this.set(a, false)
        }, defaultValue: function (a) {
            arguments.length && this.set(a, true);
            return this._dv
        }, cast: function (a) {
            if (a != null) {
                var b = this._getFunProp("_cast");
                if (b)a = b.call(this._context, a, this)
            }
            return a
        }, set: function (a, b) {
            this._setCalled = true;
            if (a != null)a = this.cast(a);
            if (a == null) {
                a = this._dynDefault();
                if (a == null) {
                    if (!this.isSpecified)return this;
                    a = this._dv
                }
                b = true
            }
            if (b) {
                this._dv = a;
                if (!this.isSpecified)this.value = a
            } else {
                this.isResolved = this.isSpecified =
                    true;
                this.value = a
            }
            return this
        }, _dynDefault: function () {
            var a = this._getFunProp("_getDefault");
            return a && this.cast(a.call(this._context, this))
        }, _getFunProp: function (a) {
            if (a = this[a]) {
                var b = this._context;
                if (b && typeof a === "string")a = b[a]
            }
            return a
        }
    });
    f.global.NoDataException = function () {
    };
    f.global.InvalidDataException = function (a) {
        this.message = a ? a : "Invalid Data."
    };
    i.data = {visibleKeyArgs: {visible: true}};
    f.type("pvc.data.DimensionType").init(function (a, b, c) {
        this.complexType = a;
        this.name = b;
        this.label = f.get(c,
            "label") || i.buildTitleFromName(b);
        a = i.splitIndexedId(b);
        this.group = a[0];
        this.groupLevel = f.nullyTo(a[1], 0);
        if (this.label.indexOf("{") >= 0)this.label = f.format(this.label, [this.groupLevel + 1]);
        this.playedVisualRoles = new f.Map;
        this.isHidden = !!f.get(c, "isHidden");
        a = f.get(c, "valueType") || null;
        b = i.data.DimensionType.valueTypeName(a);
        var d = f.getOwn(i.data.DimensionType.cast, b, null);
        this.valueType = a;
        this.valueTypeName = b;
        this.cast = d;
        this.isDiscreteValueType = this.valueType !== Number && this.valueType !== Date;
        this.isDiscrete =
            f.get(c, "isDiscrete");
        if (this.isDiscrete == null)this.isDiscrete = this.isDiscreteValueType; else {
            this.isDiscrete = !!this.isDiscrete;
            if (!this.isDiscrete && this.isDiscreteValueType)throw f.error.argumentInvalid("isDiscrete", "The only supported continuous value types are Number and Date.");
        }
        this._converter = f.get(c, "converter") || null;
        if (!this._converter)if (a = f.get(c, "rawFormat"))switch (this.valueType) {
            case Date:
                this._converter = t.Format.createParser(t.Format.date(a));
                break
        }
        this._key = f.get(c, "key") || null;
        this._comparer =
            f.get(c, "comparer");
        if (this._comparer === undefined)switch (this.valueType) {
            case Number:
            case Date:
                this._comparer = f.compare;
                break;
            default:
                this._comparer = null
        }
        this.isComparable = this._comparer != null;
        this._formatter = f.get(c, "formatter") || null;
        if (!this._formatter)switch (this.valueType) {
            case Number:
                this._formatter = t.Format.createFormatter(t.Format.number().fractionDigits(0, 2));
                break;
            case Date:
                a = f.get(c, "format");
                if (!a)if (a = f.get(c, "rawFormat"))a = a.replace(/-/g, "/");
                a || (a = "%Y/%m/%d");
                this._formatter = t.Format.createFormatter(t.Format.date(a));
                break
        }
    }).add({
        isCalculated: false, compare: function (a, b) {
            if (a == null) {
                if (b == null)return 0;
                return -1
            } else if (b == null)return 1;
            return this._comparer.call(null, a, b)
        }, comparer: function (a) {
            if (!this.isComparable)return null;
            var b = this;
            if (a)return this._reverseComparer || (this._reverseComparer = function (c, d) {
                    return b.compare(d, c)
                });
            return this._directComparer || (this._directComparer = function (c, d) {
                    return b.compare(c, d)
                })
        }, atomComparer: function (a) {
            if (a)return this._reverseAtomComparer || (this._reverseAtomComparer =
                    this._createReverseAtomComparer());
            return this._directAtomComparer || (this._directAtomComparer = this._createDirectAtomComparer())
        }, _toDiscrete: function () {
            this.isDiscrete = true
        }, _toCalculated: function () {
            this.isCalculated = true
        }, _createReverseAtomComparer: function () {
            function a(c, d) {
                if (c === d)return 0;
                return b.compare(d.value, c.value)
            }

            if (!this.isComparable)return jb;
            var b = this;
            return a
        }, _createDirectAtomComparer: function () {
            function a(c, d) {
                if (c === d)return 0;
                return b.compare(c.value, d.value)
            }

            if (!this.isComparable)return ib;
            var b = this;
            return a
        }, formatter: function () {
            return this._formatter
        }, converter: function () {
            return this._converter
        }, playingPercentVisualRole: function () {
            return f.query(this.playedVisualRoles.values()).any(function (a) {
                return a.isPercent
            })
        }
    });
    i.data.DimensionType.cast = {
        Date: function (a) {
            return a instanceof Date ? a : new Date(a)
        }, Number: function (a) {
            a = Number(a);
            return isNaN(a) ? null : a
        }, String: String, Boolean: Boolean, Object: Object, Any: null
    };
    i.data.DimensionType.dimensionGroupName = function (a) {
        return a.replace(/^(.*?)(\d*)$/,
            "$1")
    };
    i.data.DimensionType.valueTypeName = function (a) {
        if (a == null)return "Any";
        switch (a) {
            case Boolean:
                return "Boolean";
            case Number:
                return "Number";
            case String:
                return "String";
            case Object:
                return "Object";
            case Date:
                return "Date";
            default:
                throw f.error.argumentInvalid("valueType", "Invalid valueType function: '{0}'.", [a]);
        }
    };
    i.data.DimensionType.extendSpec = function (a, b, c) {
        a = i.data.DimensionType.dimensionGroupName(a);
        var d = f.get(c, "dimensionGroups");
        if (d)if (d = d[a])b = f.create(d, b);
        b || (b = {});
        switch (a) {
            case "category":
                if (f.get(c,
                        "isCategoryTimeSeries", false))if (b.valueType === undefined)b.valueType = Date;
                break;
            case "value":
                if (b.valueType === undefined)b.valueType = Number;
                if (b.valueType === Number)if (b.formatter === undefined && !b.format)b.formatter = f.get(c, "valueNumberFormatter");
                break
        }
        if (b.converter === undefined && b.valueType === Date && !b.rawFormat)b.rawFormat = f.get(c, "timeSeriesFormat");
        return b
    };
    f.type("pvc.data.ComplexType").init(function (a) {
        this._dims = {};
        this._dimsList = [];
        this._dimsNames = [];
        this._calculations = [];
        this._calculatedDimNames =
        {};
        this._dimsIndexByName = null;
        this._dimsByGroup = {};
        this._dimsNamesByGroup = {};
        if (a)for (var b in a)this.addDimension(b, a[b])
    }).add({
        describe: function () {
            var a = ["COMPLEX TYPE INFORMATION", i.logSeparator];
            this._dimsList.forEach(function (b) {
                var c = [];
                c.push(b.valueTypeName);
                b.isComparable && c.push("comparable");
                b.isDiscrete || c.push("continuous");
                b.isHidden && c.push("hidden");
                a.push("  " + b.name + " (" + c.join(", ") + ")")
            });
            return a.join("\n")
        }, dimensions: function (a, b) {
            if (a == null)return this._dims;
            var c = f.getOwn(this._dims,
                a, null);
            if (!c && f.get(b, "assertExists", true))throw f.error.argumentInvalid("name", "Undefined dimension '{0}'", [a]);
            return c
        }, dimensionsList: function () {
            return this._dimsList
        }, calculatedDimensionsList: function () {
            return this._calcDimsList
        }, dimensionsNames: function () {
            return this._dimsNames
        }, groupDimensions: function (a, b) {
            var c = f.getOwn(this._dimsByGroup, a);
            if (!c && f.get(b, "assertExists", true))throw f.error.operationInvalid("There is no dimension type group with name '{0}'.", [a]);
            return c
        }, groupDimensionsNames: function (a,
                                           b) {
            var c = f.getOwn(this._dimsNamesByGroup, a);
            if (!c && f.get(b, "assertExists", true))throw f.error.operationInvalid("There is no dimension type group with name '{0}'.", [a]);
            return c
        }, addDimension: function (a, b) {
            a || f.fail.argumentRequired("name");
            !f.hasOwn(this._dims, a) || f.fail.operationInvalid("A dimension type with name '{0}' is already defined.", [a]);
            b = new i.data.DimensionType(this, a, b);
            this._dims[a] = b;
            this._dimsIndexByName = null;
            var c = b.group, d;
            if (c) {
                var e = f.getOwn(this._dimsByGroup, c);
                if (e)d = this._dimsNamesByGroup[c];
                else {
                    e = this._dimsByGroup[c] = [];
                    d = this._dimsNamesByGroup[c] = []
                }
                d = f.array.insert(d, a, f.compare);
                d = ~d;
                f.array.insertAt(e, d, b)
            }
            var g;
            e = this._dimsList.length;
            if (c) {
                d = b.groupLevel;
                for (var h = 0; h < e; h++) {
                    var j = this._dimsList[h];
                    if (j.group === c) {
                        if (j.groupLevel > d) {
                            g = h;
                            break
                        }
                        g = h + 1
                    }
                }
                if (g == null)g = e
            } else g = e;
            f.array.insertAt(this._dimsList, g, b);
            f.array.insertAt(this._dimsNames, g, a);
            if (b._calculate) {
                g = f.array.binarySearch(this._calcDimsList, b._calculationOrder, f.compare, function (k) {
                    return k._calculationOrder
                });
                if (g >=
                    0)g++; else g = ~g;
                f.array.insertAt(this._calcDimsList, g, b)
            }
            this._isPctRoleDimTypeMap = null;
            return b
        }, addCalculation: function (a, b) {
            a || f.fail.argumentRequired("calcSpec");
            var c = a.calculation || f.fail.argumentRequired("calculations[i].calculation");
            a = a.names;
            if ((a = typeof a === "string" ? a.split(/\s*\,\s*/) : f.array.as(a)) && a.length) {
                var d = this._calculatedDimNames;
                a.forEach(function (e) {
                    if (e) {
                        e = e.replace(/^\s*(.+?)\s*$/, "$1");
                        !f.hasOwn(d, e) || f.fail.argumentInvalid("calculations[i].names", "Dimension name '{0}' is already being calculated.",
                            [e]);
                        var g = this._dims[e];
                        if (!g) {
                            var h = i.data.DimensionType.extendSpec(e, null, b);
                            this.addDimension(e, h)
                        }
                        d[e] = true;
                        g._toCalculated()
                    }
                }, this)
            }
            this._calculations.push(c)
        }, isCalculated: function (a) {
            return f.hasOwn(this._calculatedDimNames, a)
        }, _calculate: function (a) {
            var b = this._calculations, c = b.length;
            if (c) {
                for (var d = {}, e = 0; e < c; e++)b[e](a, d);
                return d
            }
        }, getPlayingPercentVisualRoleDimensionMap: function () {
            var a = this._isPctRoleDimTypeMap;
            if (!a)a = this._isPctRoleDimTypeMap = new f.Map(f.query(f.own(this._dims)).where(function (b) {
                return b.playingPercentVisualRole()
            }).object({
                name: function (b) {
                    return b.name
                }
            }));
            return a
        }, sortDimensionNames: function (a, b) {
            var c = this._dimsIndexByName;
            if (!c)this._dimsIndexByName = c = f.query(this._dimsList).object({
                name: function (d) {
                    return d.name
                }, value: function (d, e) {
                    return e
                }
            });
            a.sort(function (d, e) {
                return f.compare(c[b ? b(d) : d], c[b ? b(e) : e])
            });
            return a
        }
    });
    f.type("pvc.data.ComplexTypeProject").init(function (a) {
        this._dims = {};
        this._dimList = [];
        this._dimGroupsDims = {};
        this._dimGroupSpecs = a || {};
        this._calcList = []
    }).add({
        _ensureDim: function (a, b) {
            a || f.fail.argumentInvalid("name", "Invalid dimension name '{0}'.",
                [a]);
            var c = f.getOwn(this._dims, a);
            if (c)b && f.setUDefaults(c.spec, b); else {
                c = this._dims[a] = this._createDim(a, b);
                this._dimList.push(c);
                b = f.array.lazy(this._dimGroupsDims, c.groupName);
                f.array.insert(b, a, f.compare)
            }
            return c
        }, hasDim: function (a) {
            return f.hasOwn(this._dims, a)
        }, setDim: function (a, b) {
            a = this._ensureDim(a).spec;
            b && f.copy(a, b);
            return this
        }, setDimDefaults: function (a, b) {
            f.setUDefaults(this._ensureDim(a).spec, b);
            return this
        }, _createDim: function (a, b) {
            var c = i.data.DimensionType.dimensionGroupName(a),
                d = this._dimGroupSpecs[c];
            if (d)b = f.create(d, b);
            return {name: a, groupName: c, spec: b || {}}
        }, readDim: function (a, b) {
            b = this._ensureDim(a, b);
            if (b.isRead)throw f.error.operationInvalid("Dimension '{0}' already is the target of a reader.", [a]);
            if (b.isCalc)throw f.error.operationInvalid("Dimension '{0}' is being calculated, so it cannot be the target of a reader.", [a]);
            b.isRead = true
        }, calcDim: function (a, b) {
            b = this._ensureDim(a, b);
            if (b.isCalc)throw f.error.operationInvalid("Dimension '{0}' already is being calculated.",
                [a]);
            if (b.isRead)throw f.error.operationInvalid("Dimension '{0}' is the target of a reader, so it cannot be calculated.", [a]);
            b.isCalc = true
        }, isReadOrCalc: function (a) {
            if (a)if (a = f.getOwn(this._dims, a))return a.isRead || a.isCalc;
            return false
        }, groupDimensionsNames: function (a) {
            return this._dimGroupsDims[a]
        }, setCalc: function (a) {
            a || f.fail.argumentRequired("calculations[i]");
            a.calculation || f.fail.argumentRequired("calculations[i].calculation");
            var b = a.names;
            (b = typeof b === "string" ? b.split(/\s*\,\s*/) : f.array.as(b)) &&
            b.length && b.forEach(this.calcDim, this);
            this._calcList.push(a)
        }, configureComplexType: function (a, b) {
            this._dimList.forEach(function (c) {
                var d = c.name;
                c = c.spec;
                c = i.data.DimensionType.extendSpec(d, c, b);
                a.addDimension(d, c)
            });
            this._calcList.forEach(function (c) {
                a.addCalculation(c)
            })
        }
    });
    f.type("pvc.data.TranslationOper").init(function (a, b, c, d, e) {
        this.chart = a;
        this.complexTypeProj = b;
        this.source = c || f.fail.argumentRequired("source");
        this.metadata = d || f.fail.argumentRequired("metadata");
        this.options = e || {};
        this._initType();
        if (i.debug >= 4) {
            this._logItems = true;
            this._logItemCount = 0
        }
    }).add({
        _logItems: false,
        logSource: f.method({isAbstract: true}),
        logVItem: f.method({isAbstract: true}),
        _translType: "Unknown",
        logTranslatorType: function () {
            return this._translType + " data source translator"
        },
        virtualItemSize: function () {
            return this.metadata.length
        },
        freeVirtualItemSize: function () {
            return this.virtualItemSize() - this._userUsedIndexesCount
        },
        setSource: function (a) {
            if (!a)throw f.error.argumentRequired("source");
            this.source = a
        },
        defReader: function (a) {
            a ||
            f.fail.argumentRequired("readerSpec");
            var b;
            b = f.string.is(a) ? a : a.names;
            b = f.string.is(b) ? b.split(/\s*\,\s*/) : f.array.as(b);
            var c = f.array.as(a.indexes);
            c && c.forEach(this._userUseIndex, this);
            var d = !!(b && b.length);
            if (a = a.reader) {
                d || f.fail.argumentRequired("reader.names", "Required argument when a reader function is specified.");
                this._userRead(a, b)
            } else {
                if (d)return this._userCreateReaders(b, c);
                c && c.forEach(function (e) {
                    this._userIndexesToSingleDim[e] = null
                }, this)
            }
            return c
        },
        configureType: function () {
            this._configureTypeCore()
        },
        _configureTypeCore: f.method({isAbstract: true}),
        _initType: function () {
            this._userDimsReaders = [];
            this._userDimsReadersByDim = {};
            this._userItem = [];
            this._userUsedIndexes = {};
            this._userUsedIndexesCount = 0;
            this._userIndexesToSingleDim = [];
            var a = this.options.readers;
            a && a.forEach(this.defReader, this);
            if (a = i.parseDistinctIndexArray(this.options.multiChartIndexes))this._multiChartIndexes = this.defReader({
                names: "multiChart",
                indexes: a
            })
        },
        _userUseIndex: function (a) {
            a = +a;
            if (a < 0)throw f.error.argumentInvalid("index", "Invalid reader index: '{0}'.",
                [a]);
            if (f.hasOwn(this._userUsedIndexes, a))throw f.error.argumentInvalid("index", "Virtual item index '{0}' is already assigned.", [a]);
            this._userUsedIndexes[a] = true;
            this._userUsedIndexesCount++;
            this._userItem[a] = true;
            return a
        },
        _userCreateReaders: function (a, b) {
            if (b)b.forEach(function (k, m) {
                b[m] = +k
            }); else b = [];
            var c = b.length, d = a.length, e;
            if (d > c) {
                e = c > 0 ? b[c - 1] + 1 : 0;
                do {
                    e = this._nextAvailableItemIndex(e);
                    b[c] = e;
                    this._userUseIndex(e);
                    c++
                } while (d > c)
            }
            for (var g = c === d ? d : d - 1, h, j = 0; j < g; j++) {
                e = a[j];
                h = b[j];
                this._userIndexesToSingleDim[h] =
                    e;
                this._userRead(this._propGet(e, h), e)
            }
            if (g < d) {
                e = i.splitIndexedId(a[d - 1]);
                a = e[0];
                d = f.nullyTo(e[1], 0);
                for (g = g; g < c; g++, d++) {
                    e = i.buildIndexedId(a, d);
                    h = b[g];
                    this._userIndexesToSingleDim[h] = e;
                    this._userRead(this._propGet(e, h), e)
                }
            }
            return b
        },
        _userRead: function (a, b) {
            f.fun.is(a) || f.fail.argumentInvalid("reader", "Reader must be a function.");
            f.array.is(b) ? b.forEach(function (c) {
                this._readDim(c, a)
            }, this) : this._readDim(b, a);
            this._userDimsReaders.push(a)
        },
        _readDim: function (a, b) {
            var c, d;
            c = this._userIndexesToSingleDim.indexOf(a);
            if (c >= 0)if ((c = this._itemInfos[c]) && !this.options.ignoreMetadataLabels)if (c = c.label || c.name)d = {label: c};
            this.complexTypeProj.readDim(a, d);
            this._userDimsReadersByDim[a] = b
        },
        execute: function (a) {
            this.data = a;
            return this._executeCore()
        },
        _executeCore: function () {
            var a = this._getDimensionsReaders();
            return f.query(this._getItems()).select(function (b) {
                return this._readItem(b, a)
            }, this)
        },
        _getItems: function () {
            return this.source
        },
        _getDimensionsReaders: function () {
            return this._userDimsReaders
        },
        _readItem: function (a,
                             b) {
            var c = this._logItems;
            if (c)if (this._logItemCount < 10) {
                i.log("virtual item [" + this._logItemCount + "]: " + i.stringify(a));
                this._logItemCount++
            } else {
                i.log("...");
                c = this._logItems = false
            }
            for (var d = 0, e = b.length, g = this.data, h = {}; d < e;)b[d++].call(g, a, h);
            if (c) {
                a = {};
                for (var j in h) {
                    b = h[j];
                    if (f.object.is(b))b = "v"in b ? b.v : "value"in b ? b.value : "...";
                    a[j] = b
                }
                i.log("-> read: " + i.stringify(a))
            }
            return h
        },
        _propGet: function (a, b) {
            function c(d, e) {
                e[a] = d[b]
            }

            return c
        },
        _nextAvailableItemIndex: function (a, b) {
            if (a == null)a = 0;
            if (b ==
                null)b = Infinity;
            for (; a < b && f.hasOwn(this._userItem, a);)a++;
            return a < b ? a : -1
        },
        _getUnboundRoleDefaultDimNames: function (a, b, c, d) {
            if ((a = this.chart.visualRoles[a]) && !a.isPreBound())if (a = a.defaultDimensionName) {
                a = a.match(/^(.*?)(\*)?$/)[1];
                c || (c = []);
                if (d == null)d = 0;
                if (b == null)b = 1;
                for (; b--;) {
                    var e = i.buildIndexedId(a, d++);
                    this.complexTypeProj.isReadOrCalc(e) || c.push(e)
                }
                return c.length ? c : null
            }
        },
        collectFreeDiscreteAndConstinuousIndexes: function (a, b) {
            this._itemInfos.forEach(function (c, d) {
                if (!this._userUsedIndexes[d])(c =
                    c.type === 1 ? b : a) && c.push(d)
            }, this)
        }
    });
    f.type("pvc.data.MatrixTranslationOper", i.data.TranslationOper).add({
        _initType: function () {
            this.J = this.metadata.length;
            this.I = this.source.length;
            this._processMetadata();
            this.base()
        }, setSource: function (a) {
            this.base(a);
            this.I = this.source.length
        }, _knownContinuousColTypes: {numeric: 1, number: 1, integer: 1}, _processMetadata: function () {
            for (var a = this._knownContinuousColTypes, b = f.query(this.metadata).select(function (n, o) {
                n.colIndex = o;
                return n
            }).where(function (n) {
                n = n.colType;
                return !n || a[n.toLowerCase()] !== 1
            }).select(function (n) {
                return n.colIndex
            }).array(), c = f.array.create(this.J, 1), d = this.I, e = this.source, g = b.length, h = 0; h < d && g > 0; h++)for (var j = e[h], k = 0; k < g;) {
                var m = b[k], l = j[m];
                if (l != null) {
                    c[m] = this._getSourceValueType(l);
                    b.splice(k, 1);
                    g--
                } else k++
            }
            this._columnTypes = c
        }, _buildItemInfoFromMetadata: function (a) {
            var b = this.metadata[a];
            return {type: this._columnTypes[a], name: b.colName, label: b.colLabel}
        }, _getSourceValueType: function (a) {
            switch (typeof a) {
                case "number":
                    return 1;
                case "object":
                    if (a instanceof
                        Date)return 1
            }
            return 0
        }, logSource: function () {
            var a = ["DATA SOURCE SUMMARY", i.logSeparator, "ROWS (" + Math.min(10, this.I) + "/" + this.I + ")"];
            f.query(this.source).take(10).each(function (c, d) {
                a.push("  [" + d + "] " + i.stringify(c))
            });
            this.I > 10 && a.push("  ...");
            a.push("COLS (" + this.J + ")");
            var b = this._columnTypes;
            this.metadata.forEach(function (c, d) {
                a.push("  [" + d + "] '" + c.colName + "' (type: " + c.colType + ", inspected: " + (b[d] ? "number" : "string") + (c.colLabel ? ", label: '" + c.colLabel + "'" : "") + ")")
            });
            a.push("");
            return a.join("\n")
        },
        _logVItem: function (a, b) {
            var c = ["VIRTUAL ITEM ARRAY", i.logSeparator], d = 4, e = 5, g = 9;
            this._itemInfos.forEach(function (j, k) {
                d = Math.max(d, (j.name || "").length);
                e = Math.max(e, (j.label || "").length);
                if (j = this._userIndexesToSingleDim[k])g = Math.max(g, j.length)
            }, this);
            c.push("Index | Kind | Type   | " + f.string.padRight("Name", d) + " | " + f.string.padRight("Label", e) + " > Dimension", "------+------+--------+-" + f.string.padRight("", d, "-") + "-+-" + f.string.padRight("", e, "-") + "-+-" + f.string.padRight("", g, "-") + "-");
            var h = 0;
            a.forEach(function (j) {
                for (var k = 0, m = b[j]; k < m; k++) {
                    var l = this._itemInfos[h], n = this._userIndexesToSingleDim[h];
                    if (n === undefined)n = "";
                    c.push(" " + h + "    | " + j + "    | " + (l.type ? "number" : "string") + " | " + f.string.padRight(l.name || "", d) + " | " + f.string.padRight(l.label || "", e) + " | " + n);
                    h++
                }
            }, this);
            c.push("");
            return c.join("\n")
        }, _createPlot2SeriesKeySet: function (a, b) {
            var c = null, d = b.length;
            f.query(a).each(function (e) {
                var g = +e;
                if (isNaN(g))throw f.error.argumentInvalid("plot2DataSeriesIndexes", "Element is not a number '{0}'.",
                    [e]);
                if (g < 0) {
                    if (g <= -d)throw f.error.argumentInvalid("plot2DataSeriesIndexes", "Index is out of range '{0}'.", [g]);
                    g = d + g
                } else if (g >= d)throw f.error.argumentInvalid("plot2DataSeriesIndexes", "Index is out of range '{0}'.", [g]);
                c || (c = {});
                c[b[g]] = true
            });
            return c
        }, _dataPartGet: function (a, b) {
            function c(l, n) {
                if (!g) {
                    h = a();
                    g = d.data.dimensions(e);
                    i.debug >= 3 && h && i.log("Second axis series values: " + i.stringify(f.keys(h)))
                }
                b(l, m);
                l = m.series;
                if (l != null && l.v != null)l = l.v;
                l = f.hasOwn(h, l) ? k || (k = g.intern("1")) : j || (j =
                    g.intern("0"));
                n[e] = l
            }

            var d = this, e = this.options.dataPartDimName, g, h, j, k, m = {};
            return c
        }
    });
    f.type("pvc.data.CrosstabTranslationOper", i.data.MatrixTranslationOper).add({
        _translType: "Crosstab", virtualItemSize: function () {
            return this.R + this.C + this.M
        }, _executeCore: function () {
            function a(j, k) {
                var m = g[j], l = 0;
                for (j = h[j]; j-- > 0;)e[m++] = k[l++]
            }

            function b(j, k) {
                var m = g.M;
                k = h._colGroupsIndexes[k];
                for (var l = h.M, n = 0; n < l; n++) {
                    var o = k[n];
                    e[m++] = o != null ? j[o] : null
                }
            }

            function c(j) {
                a("R", j);
                return f.query(this._colGroups).select(function (k,
                                                                 m) {
                    a("C", k);
                    b(j, m);
                    return this._readItem(e, d)
                }, this)
            }

            if (!this.metadata.length)return f.query();
            var d = this._getDimensionsReaders(), e = new Array(this.virtualItemSize()), g = this._itemCrossGroupIndex, h = this;
            return f.query(this.source).selectMany(c, this)
        }, _processMetadata: function () {
            this.base();
            this._separator = this.options.separator || "~";
            var a = this.R = 1;
            this.M = this.C = 1;
            this.measuresDirection = null;
            var b = this.options.seriesInRows, c;
            c = this.metadata;
            c = b ? c.map(function (h) {
                return h.colName
            }) : this.options.compatVersion <=
            1 ? c.map(function (h) {
                return {v: h.colName}
            }) : c.map(function (h) {
                return {v: h.colName, f: h.colLabel}
            });
            var d = this._itemCrossGroupInfos = {};
            if (this.options.isMultiValued) {
                var e = f.get(this.options, "measuresInColumns", true);
                if (e || this.options.measuresIndex == null) {
                    a = this.R = this._getCategoriesCount();
                    c = c.slice(a);
                    if (c.length > 0) {
                        if (e) {
                            this.measuresDirection = "columns";
                            this._processEncodedColGroups(c)
                        } else {
                            this._colGroups = c;
                            this._colGroupsIndexes = [];
                            this._colGroups.forEach(function (h, j) {
                                this._colGroups[j] = this._splitEncodedColGroupCell(h);
                                this._colGroupsIndexes[j] = [this.R + j]
                            }, this);
                            d.M = [this._buildItemInfoFromMetadata(a)]
                        }
                        this.C = this._colGroups[0].length;
                        d.C = f.range(0, this.C).select(function () {
                            return {type: 0}
                        }).array()
                    } else {
                        this.C = this.M = 0;
                        d.M = [];
                        d.C = []
                    }
                } else {
                    this.measuresDirection = "rows";
                    this.R = +this.options.measuresIndex;
                    e = this.options.measuresCount;
                    if (e == null)e = 1;
                    this.M = e;
                    this._colGroups = c.slice(this.R + 1);
                    this._colGroups.forEach(function (h, j) {
                        this._colGroups[j] = [h]
                    }, this)
                }
            } else {
                a = this.R = this._getCategoriesCount();
                this._colGroups =
                    c.slice(a);
                this._colGroupsIndexes = new Array(this._colGroups.length);
                this._colGroups.forEach(function (h, j) {
                    this._colGroups[j] = [h];
                    this._colGroupsIndexes[j] = [a + j]
                }, this);
                d.C = [{type: 0}];
                d.M = [{type: this._columnTypes[a]}]
            }
            d.R = f.range(0, this.R).select(this._buildItemInfoFromMetadata, this).array();
            c = this._itemCrossGroupIndex = {C: !b ? 0 : this.R, R: !b ? this.C : 0, M: this.C + this.R};
            var g = this._itemInfos = new Array(this.virtualItemSize());
            f.eachOwn(c, function (h, j) {
                d[j].forEach(function (k, m) {
                    g[h + m] = k
                })
            });
            this._itemLogicalGroup =
            {series: b ? this.R : this.C, category: b ? this.C : this.R, value: this.M};
            this._itemLogicalGroupIndex = {series: 0, category: this._itemLogicalGroup.series, value: this.C + this.R}
        }, logVItem: function () {
            return this._logVItem(["C", "R", "M"], {C: this.C, R: this.R, M: this.M})
        }, _getCategoriesCount: function () {
            var a = this.options.categoriesCount;
            if (a != null && (!isFinite(a) || a < 0))a = null;
            if (a == null)(a = f.query(this._columnTypes).whayl(function (b) {
                return b === 0
            }).count()) || (a = 1);
            return a
        }, _splitEncodedColGroupCell: function (a) {
            var b = a.v,
                c;
            if (b == null)b = []; else {
                b = b.split(this._separator);
                if (c = a.f)c = c.split(this._separator)
            }
            return b.map(function (d, e) {
                return {v: d, f: c && c[e]}
            })
        }, _processEncodedColGroups: function (a) {
            for (var b = a.length || f.assert("Must have columns"), c = this.R, d = [], e, g = {}, h = [], j = 0; j < b; j++) {
                var k = a[j], m = k.v, l = k.f, n = m.lastIndexOf(this._separator), o, p, q;
                if (n < 0) {
                    k = m;
                    o = l;
                    m = "";
                    p = []
                } else {
                    k = m.substring(n + 1);
                    m = m.substring(0, n);
                    p = m.split(this._separator);
                    if (l != null) {
                        q = l.split(this._separator);
                        o = q.pop()
                    }
                    p.forEach(function (A, x) {
                        p[x] = {
                            v: A,
                            f: q && q[x]
                        }
                    })
                }
                if (!e || e.encValues !== m) {
                    e = {startIndex: j, encValues: m, values: p, measureNames: [k]};
                    d.push(e)
                } else e.measureNames.push(k);
                m = j - e.startIndex;
                if (l = f.getOwn(g, k)) {
                    if (m > l.groupIndex)l.groupIndex = m
                } else {
                    g[k] = l = {name: k, label: o, type: this._columnTypes[c + j], groupIndex: m, index: j};
                    h.push(l)
                }
            }
            h.sort(function (A, x) {
                return f.compare(A.groupIndex, x.groupIndex) || f.compare(A.index, x.index)
            });
            h.forEach(function (A, x) {
                A.groupIndex = x
            });
            a = d.length;
            var r = new Array(a), s = new Array(a), u = h.length;
            d.map(function (A, x) {
                r[x] =
                    A.values;
                var y = A.startIndex, w = s[x] = new Array(u);
                A.measureNames.forEach(function (z, v) {
                    w[g[z].groupIndex] = c + y + v
                })
            });
            this._colGroups = r;
            this._colGroupsIndexes = s;
            this._itemCrossGroupInfos.M = h;
            this.M = u
        }, configureType: function () {
            if (this.measuresDirection === "rows")throw f.error.notImplemented();
            this.base()
        }, _configureTypeCore: function () {
            function a(m, l, n) {
                for (var o = d[m] + n; n > 0;) {
                    var p = i.buildIndexedId(m, l);
                    if (!b.complexTypeProj.isReadOrCalc(p)) {
                        e = b._nextAvailableItemIndex(e);
                        if (e >= o)return;
                        g.push({
                            names: p,
                            indexes: e
                        });
                        e++;
                        n--
                    }
                    l++
                }
            }

            var b = this, c = b._itemLogicalGroup, d = b._itemLogicalGroupIndex, e = 0, g = [], h = this.options.dataPartDimName;
            if (h && this.C === 1 && !this.complexTypeProj.isReadOrCalc(h)) {
                var j = this.options.plot2DataSeriesIndexes;
                if (j != null) {
                    var k = this._colGroups.map(function (m) {
                        return "" + m[0].v
                    });
                    this._plot2SeriesKeySet = this._createPlot2SeriesKeySet(j, k)
                }
            }
            ["series", "category", "value"].forEach(function (m) {
                var l = c[m];
                l > 0 && a(m, 0, l)
            });
            g && g.forEach(this.defReader, this);
            if (this._plot2SeriesKeySet)(j = this._userDimsReadersByDim.series) &&
            this._userRead(this._dataPartGet(f.fun.constant(this._plot2SeriesKeySet), j), h)
        }
    });
    f.type("pvc.data.RelationalTranslationOper", i.data.MatrixTranslationOper).add({
        M: 0, C: 0, S: 0, _translType: "Relational", _processMetadata: function () {
            this.base();
            var a = this.metadata, b = this.J, c = this.options.categoriesCount;
            if (c != null && (!isFinite(c) || c < 0))c = 0;
            var d, e, g;
            if (this.options.isMultiValued)g = (e = i.parseDistinctIndexArray(this.options.measuresIndexes, 0, b - 1)) ? e.length : 0;
            var h;
            if (g == null)if (b > 0 && b <= 3 && (c == null || c === 1) &&
                d == null) {
                g = 1;
                e = [b - 1];
                c = b >= 2 ? 1 : 0;
                d = b >= 3 ? 1 : 0;
                h = c + d
            } else if (c != null && c >= b) {
                c = h = b;
                g = d = 0
            } else {
                g = c != null ? b - c : Infinity;
                e = f.query(a).where(function (n, o) {
                    return this._columnTypes[o] !== 0
                }, this).select(function (n) {
                    return n.colIndex
                }).take(g).array();
                g = e.length
            }
            if (h == null) {
                h = b - g;
                if (h === 0)d = c = 0; else if (c != null)if (c > h) {
                    c = h;
                    d = 0
                } else d = h - c; else {
                    d = h > 1 ? 1 : 0;
                    c = h - d
                }
            }
            a = this.options.seriesInRows;
            var j = [];
            if (h) {
                d && !a && j.push({name: "S", count: d});
                c && j.push({name: "C", count: c});
                d && a && j.push({name: "S", count: d})
            }
            g && j.push({
                name: "M",
                count: g
            });
            var k = f.range(0, b).array();
            e && e.forEach(function (n) {
                k.splice(n, 1)
            });
            var m = {};
            j.forEach(function (n) {
                var o = n.count, p = n.name;
                m[p] = n;
                n.indexes = e && p === "M" ? e : k.splice(0, o)
            });
            this.M = g;
            this.S = d;
            this.C = c;
            var l = [];
            ["S", "C", "M"].forEach(function (n) {
                (n = m[n]) && f.array.append(l, n.indexes)
            });
            this._itemInfos = l.map(this._buildItemInfoFromMetadata, this);
            this._itemCrossGroupIndex = {S: 0, C: this.S, M: this.S + this.C};
            this._itemPerm = l
        }, logVItem: function () {
            return this._logVItem(["S", "C", "M"], {S: this.S, C: this.C, M: this.M})
        },
        _configureTypeCore: function () {
            function a(j, k, m, l) {
                for (k = b._itemCrossGroupIndex[k] + l; l > 0;) {
                    var n = i.buildIndexedId(j, m);
                    if (!b.complexTypeProj.isReadOrCalc(n)) {
                        c = b._nextAvailableItemIndex(c);
                        if (c >= k)return;
                        d.push({names: n, indexes: c});
                        c++;
                        l--
                    }
                    m++
                }
            }

            var b = this, c = 0, d = [];
            this.S > 0 && a("series", "S", 0, this.S);
            this.C > 0 && a("category", "C", 0, this.C);
            this.M > 0 && a("value", "M", 0, this.M);
            d && d.forEach(this.defReader, this);
            var e = this.options.dataPartDimName;
            if (e && !this.complexTypeProj.isReadOrCalc(e)) {
                var g = this.options.plot2DataSeriesIndexes;
                if (g != null) {
                    var h = this._userDimsReadersByDim.series;
                    h && this._userRead(hb.call(this, g, h), e)
                }
            }
        }, _executeCore: function () {
            var a = this._getDimensionsReaders(), b = this._itemPerm;
            return f.query(this._getItems()).select(function (c) {
                c = t.permute(c, b);
                return this._readItem(c, a)
            }, this)
        }
    });
    f.type("pvc.data.Atom").init(function (a, b, c, d, e) {
        this.dimension = a;
        this.id = b == null ? -f.nextId() : f.nextId();
        this.value = b;
        this.label = c;
        if (d !== undefined)this.rawValue = d;
        this.key = e
    }).add({
        isVirtual: false, rawValue: undefined, toString: function () {
            var a =
                this.label;
            if (a != null)return a;
            a = this.value;
            return a != null ? "" + a : ""
        }
    });
    var Qb = 1;
    f.type("pvc.data.Complex").init(function (a, b, c, d, e, g) {
        var h = this;
        h.id = Qb++;
        var j;
        if (a) {
            j = a.owner;
            if (!d)d = a.atoms
        }
        h.owner = j = j || h;
        var k = j.type || f.fail.argumentRequired("owner.type");
        h.atoms = d ? Object.create(d) : {};
        var m = !!c;
        if (!c)c = k._dimsNames;
        var l = h.atoms;
        a = c.length;
        var n;
        if (b) {
            var o = j._dimensions, p = function (u) {
                var A = b[u], x = o[u].intern(A);
                if (A != null && (!d || x !== d[u]))l[u] = x
            };
            if (m)for (m = a; m--;)p(c[m]); else for (n in b)p(n);
            if (g) {
                b = k._calculate(h);
                for (n in b)f.hasOwnProp.call(l, n) || p(n)
            }
        }
        if (a)if (a === 1) {
            j = l[c[0]];
            h.value = j.value;
            h.rawValue = j.rawValue;
            h.key = j.key;
            if (e)h.label = j.label
        } else {
            var q, r, s;
            g = j.keySep;
            n = j.labelSep;
            for (m = 0; m < a; m++) {
                j = l[c[m]];
                if (m)q += g + j.key; else q = j.key;
                if (e && (s = j.label))if (r)r += n + s; else r = s
            }
            h.value = h.rawValue = h.key = q;
            if (e)h.label = r
        } else {
            h.value = null;
            h.key = "";
            if (e)h.label = ""
        }
    }).add({
        labelSep: " ~ ", keySep: "~", value: null, label: null, rawValue: undefined, ensureLabel: function () {
            var a = this.label;
            if (a ==
                null) {
                a = "";
                var b = this.owner.labelSep;
                f.eachOwn(this.atoms, function (c) {
                    if (c = c.label)if (a)a += b + c; else a = c
                });
                this.label = a
            }
            return a
        }, view: function (a) {
            return new i.data.ComplexView(this, a)
        }, toString: function () {
            var a = ["" + this.constructor.typeName];
            this.index != null && a.push("#" + this.index);
            this.owner.type.dimensionsNames().forEach(function (b) {
                a.push(b + ": " + i.stringify(this.atoms[b].value))
            }, this);
            return a.join(" ")
        }, rightTrimKeySep: function (a) {
            return a && i.data.Complex.rightTrimKeySep(a, this.owner.keySep)
        },
        absKeyTrimmed: function () {
            return this.rightTrimKeySep(this.absKey)
        }, keyTrimmed: function () {
            return this.rightTrimKeySep(this.key)
        }
    });
    i.data.Complex.rightTrimKeySep = function (a, b) {
        if (a && b)for (var c, d = b.length; a.lastIndexOf(b) === (c = a.length - d) && c >= 0;)a = a.substr(0, c);
        return a
    };
    i.data.Complex.values = function (a, b) {
        var c = a.atoms;
        return b.map(function (d) {
            return c[d].value
        })
    };
    i.data.Complex.compositeKey = function (a, b) {
        var c = a.atoms;
        return b.map(function (d) {
            return c[d].key
        }).join(a.owner.keySep)
    };
    i.data.Complex.labels =
        function (a, b) {
            var c = a.atoms;
            return b.map(function (d) {
                return c[d].label
            })
        };
    var Rb = f.propGet("id");
    f.type("pvc.data.ComplexView", i.data.Complex).init(function (a, b) {
        this.source = a;
        this.viewDimNames = b;
        this.base(a, a.atoms, b, a.owner.atoms, true)
    }).add({
        values: function () {
            return i.data.Complex.values(this, this.viewDimNames)
        }, labels: function () {
            return i.data.Complex.labels(this, this.viewDimNames)
        }
    });
    f.type("pvc.data.Datum", i.data.Complex).init(function (a, b) {
        this.base(a, b, null, null, false, true)
    }).add({
        isSelected: false,
        isVisible: true,
        isNull: false,
        isVirtual: false,
        isTrend: false,
        trend: null,
        isInterpolated: false,
        interpolation: null,
        setSelected: function (a) {
            if (this.isNull)return false;
            a = a == null || !!a;
            var b = this.isSelected !== a;
            if (b) {
                if (a)this.isSelected = true; else delete this.isSelected;
                xb.call(this.owner, this, a)
            }
            return b
        },
        toggleSelected: function () {
            return this.setSelected(!this.isSelected)
        },
        setVisible: function (a) {
            if (this.isNull)return false;
            a = a == null || !!a;
            var b = this.isVisible !== a;
            if (b) {
                this.isVisible = a;
                pa.call(this.owner,
                    this, a)
            }
            return b
        },
        toggleVisible: function () {
            return this.setVisible(!this.isVisible)
        }
    });
    var xa = f.propGet("isSelected");
    f.type("pvc.data.TrendDatum", i.data.Datum).init(function (a, b, c) {
        this.base(a, b);
        this.trend = c
    }).add({isVirtual: true, isTrend: true});
    f.type("pvc.data.InterpolationDatum", i.data.Datum).init(function (a, b, c) {
        this.base(a, b);
        this.interpolation = c
    }).add({isVirtual: true, isInterpolated: true});
    f.type("pvc.data.Dimension").init(function (a, b) {
        this.data = a;
        this.type = b;
        this.root = this;
        this.owner = this;
        var c = b.name;
        this.name = c;
        this._atomComparer = b.atomComparer();
        this._atomsByKey = {};
        if (a.isOwner()) {
            this._atoms = [];
            lb.call(this)
        } else {
            b = a.parent;
            var d;
            if (b) {
                d = b._dimensions[c];
                ob.call(d, this);
                this.root = a.parent.root
            } else {
                (b = a.linkParent) || f.assert("Data must have a linkParent");
                d = b._dimensions[c];
                pb.call(d, this)
            }
            this._nullAtom = this.owner._nullAtom;
            this._lazyInit = function () {
                this._lazyInit = null;
                for (var e = this.data._datums, g = e.length, h = this._atomsByKey, j = 0; j < g; j++) {
                    var k = e[j].atoms[c];
                    h[k.key] = k
                }
                this._atoms =
                    d.atoms().filter(function (m) {
                        return f.hasOwnProp.call(h, m.key)
                    })
            }
        }
    }).add({
        parent: null,
        linkParent: null,
        _linkChildren: null,
        _atomsByKey: null,
        _atomVisibleDatumsCount: null,
        _disposed: false,
        _nullAtom: null,
        _virtualNullAtom: null,
        _visibleAtoms: null,
        _visibleIndexes: null,
        _atomComparer: null,
        _atoms: null,
        _sumCache: null,
        count: function () {
            this._lazyInit && this._lazyInit();
            return this._atoms.length
        },
        isVisible: function (a) {
            this._lazyInit && this._lazyInit();
            f.hasOwn(this._atomsByKey, a.key) || f.assert("Atom must exist in this dimension.");
            return rb.call(this)[a.key] > 0
        },
        atoms: function (a) {
            this._lazyInit && this._lazyInit();
            a = f.get(a, "visible");
            if (a == null)return this._atoms;
            a = !!a;
            this._visibleAtoms || (this._visibleAtoms = {});
            return this._visibleAtoms[a] || (this._visibleAtoms[a] = tb.call(this, a))
        },
        indexes: function (a) {
            this._lazyInit && this._lazyInit();
            a = f.get(a, "visible");
            if (a == null)return t.range(0, this._atoms.length);
            a = !!a;
            this._visibleIndexes || (this._visibleIndexes = {});
            return this._visibleIndexes[a] || (this._visibleIndexes[a] = sb.call(this, a))
        },
        atom: function (a) {
            if (a == null || a === "")return this._nullAtom;
            if (a instanceof i.data.Atom)return a;
            this._lazyInit && this._lazyInit();
            var b = this.type._key;
            return this._atomsByKey[b ? b.call(null, a) : a] || null
        },
        getDistinctAtoms: function (a) {
            var b = [], c = a ? a.length : 0;
            if (c)for (var d = {}, e = 0; e < c; e++) {
                var g = this.atom(a[e]), h;
                if (g && !d[h = "\u0000" + g.key]) {
                    d[h] = g;
                    b.push(g)
                }
            }
            return b
        },
        extent: function (a) {
            var b = this.atoms(a), c = b.length;
            if (c) {
                var d = this._nullAtom && b[0].value == null ? 1 : 0, e = c - d;
                if (e > 0) {
                    d = b[d];
                    c = b[c - 1];
                    if (d !== c &&
                        f.get(a, "abs", false)) {
                        a = c.value < 0 ? -1 : 1;
                        if ((d.value < 0 ? -1 : 1) === a) {
                            if (a < 0) {
                                b = c;
                                c = d;
                                d = b
                            }
                        } else if (e > 2) {
                            if (c.value < -d.value)c = d;
                            d = f.array.binarySearch(b, 0, this.type.comparer(), function (g) {
                                return g.value
                            });
                            if (d < 0) {
                                d = ~d;
                                e = b[d - 1];
                                b = b[d];
                                d = -e.value < b.value ? e : b
                            } else d = b[d]
                        } else if (c.value < -d.value) {
                            b = c;
                            c = d;
                            d = b
                        }
                    }
                    return {min: d, max: c}
                }
            }
        },
        min: function (a) {
            a = this.atoms(a);
            var b = a.length;
            if (b) {
                var c = this._nullAtom && a[0].value == null ? 1 : 0;
                return b > c ? a[c] : undefined
            }
        },
        max: function (a) {
            a = this.atoms(a);
            var b = a.length;
            return b &&
            a[b - 1].value != null ? a[b - 1] : undefined
        },
        sum: function (a) {
            var b = !!f.get(a, "abs", false), c = f.get(a, "zeroIfNone", true), d = La(a) + ":" + b, e = f.getOwn(this._sumCache, d);
            if (e === undefined) {
                var g = this.name;
                e = this.data.datums(null, a).reduce(function (h, j) {
                    j = j.atoms[g].value;
                    if (b && j < 0)j = -j;
                    return h != null ? h + j : j
                }, null);
                (this._sumCache || (this._sumCache = {}))[d] = e
            }
            return c ? e || 0 : e
        },
        percent: function (a, b) {
            a = a instanceof i.data.Atom ? a.value : a;
            if (!a)return 0;
            return (b = this.sum(f.create(b, {abs: true}))) ? Math.abs(a) / b : 0
        },
        percentOverParent: function (a) {
            var b =
                this.sum(a);
            if (!b)return 0;
            var c = this.data.parent;
            if (!c)return 1;
            return (a = c.dimensionsSumAbs(this.name, a)) ? Math.abs(b) / a : 0
        },
        format: function (a, b) {
            return "" + (this.type._formatter ? this.type._formatter.call(null, a, b) : "")
        },
        intern: function (a, b) {
            if (a == null || a === "")return this._nullAtom || ha.call(this, a);
            if (a instanceof i.data.Atom) {
                if (a.dimension !== this)throw f.error.operationInvalid("Atom is of a different dimension.");
                return a
            }
            var c, d, e = this.type;
            if (typeof a === "object" && "v"in a) {
                d = a.f;
                a = a.v;
                if (a == null ||
                    a === "")return this._nullAtom || ha.call(this)
            }
            if (b)c = a; else if (c = e._converter) {
                c = c(a);
                if (c == null || c === "")return this._nullAtom || ha.call(this, a)
            } else c = a;
            var g = e.cast;
            if (g) {
                c = g(c);
                if (c == null || c === "")return this._nullAtom || ha.call(this)
            }
            g = e._key;
            (g = "" + (g ? g(c) : c)) || f.fail.operationInvalid("Only a null value can have an empty key.");
            var h = this._atomsByKey[g];
            if (h) {
                !b && h.isVirtual && delete h.isVirtual;
                return h
            }
            return Ja.call(this, e, a, g, c, d, b)
        },
        read: function (a, b) {
            if (a == null || a === "")return null;
            var c, d = this.type;
            if (typeof a === "object" && "v"in a) {
                b = a.f;
                a = a.v;
                if (a == null || a === "")return null
            }
            c = (c = d._converter) ? c(a) : a;
            if (c == null || c === "")return null;
            var e = d.cast;
            if (e) {
                c = e(c);
                if (c == null || c === "")return null
            }
            e = d._key;
            e = "" + (e ? e(c) : c);
            var g = this._atomsByKey[e];
            if (g)return {rawValue: a, key: e, value: g.value, label: "" + (b == null ? g.label : b)};
            if (b == null)b = (b = d._formatter) ? b(c, a) : c;
            b = "" + b;
            return {rawValue: a, key: e, value: c, label: b}
        },
        dispose: function () {
            var a = this;
            if (!a._disposed) {
                ia(a.childNodes, "parent");
                ia(a._linkChildren, "linkParent");
                var b;
                if (b = a.parent)na(b, "childNodes", a, "parent");
                if (b = a.linkParent)na(b, "_linkChildren", a, "linkParent");
                ga.call(a);
                a._lazyInit = a._atoms = a._nullAtom = a._virtualNullAtom = null;
                a._disposed = true
            }
        }
    });
    f.type("pvc.data.Data", i.data.Complex).init(function (a) {
        a || f.fail.argumentRequired("keyArgs");
        this._visibleNotNullDatums = new f.Map;
        var b, c, d, e, g, h, j = this.parent = a.parent || null;
        if (j) {
            this.root = j.root;
            this.depth = j.depth + 1;
            this.type = j.type;
            g = a.datums || f.fail.argumentRequired("datums");
            b = j.owner;
            c = a.atoms || f.fail.argumentRequired("atoms");
            e = a.atomsDimNames || f.fail.argumentRequired("atomsDimNames");
            d = j.atoms
        } else {
            this.root = this;
            e = [];
            var k = a.linkParent || null;
            if (k) {
                b = k.owner;
                this.type = b.type;
                g = a.datums || f.fail.argumentRequired("datums");
                this._leafs = [];
                this._wherePred = a.where || null;
                d = k.atoms;
                h = f.get(a, "index", null);
                vb.call(k, this, h)
            } else {
                b = this;
                d = {};
                if (a.labelSep)this.labelSep = a.labelSep;
                if (a.keySep)this.keySep = a.keySep;
                this.type = a.type || f.fail.argumentRequired("type");
                this._selectedNotNullDatums = new f.Map
            }
        }
        g && qa.call(this, g);
        this.owner =
            b;
        this._atomsBase = d;
        this._dimensions = {};
        this._dimensionsList = [];
        this.type.dimensionsList().forEach(this._initDimension, this);
        this.base(b, c, e, d, true);
        t.Dom.Node.call(this);
        if (j) {
            h = f.get(a, "index", null);
            ub.call(j, this, h);
            this.absLabel = j.absLabel ? f.string.join(b.labelSep, j.absLabel, this.label) : this.label;
            this.absKey = j.absKey ? f.string.join(b.keySep, j.absKey, this.key) : this.key
        } else {
            this.absLabel = this.label;
            this.absKey = this.key
        }
    }).add(t.Dom.Node).add({
        parent: null,
        linkParent: null,
        _dimensions: null,
        _dimensionsList: null,
        _freeDimensionNames: null,
        _linkChildren: null,
        _leafs: null,
        _childrenByKey: null,
        _visibleNotNullDatums: null,
        _selectedNotNullDatums: null,
        _groupByCache: null,
        _sumAbsCache: null,
        treeHeight: null,
        _groupOper: null,
        _wherePred: null,
        _groupSpec: null,
        _groupLevel: null,
        _datums: null,
        _datumsById: null,
        _datumsByKey: null,
        depth: 0,
        label: "",
        absLabel: "",
        _disposed: false,
        _isFlattenGroup: false,
        _isDegenerateFlattenGroup: false,
        _initDimension: function (a) {
            var b = new i.data.Dimension(this, a);
            this._dimensions[a.name] = b;
            this._dimensionsList.push(b)
        },
        dimensions: function (a, b) {
            if (a == null)return this._dimensions;
            var c = f.getOwn(this._dimensions, a);
            if (!c && f.get(b, "assertExists", true))throw f.error.argumentInvalid("name", "Undefined dimension '{0}'.", [a]);
            return c
        },
        dimensionsList: function () {
            return this._dimensionsList
        },
        freeDimensionsNames: function () {
            var a = this._freeDimensionNames;
            if (!a)this._freeDimensionNames = a = this.type.dimensionsNames().filter(function (b) {
                b = this.atoms[b];
                return !(b instanceof i.data.Atom) || b.value == null
            }, this);
            return a
        },
        isOwner: function () {
            return this.owner ===
                this
        },
        children: function () {
            var a = this.childNodes;
            return a.length ? f.query(a) : f.query()
        },
        child: function (a) {
            return f.getOwn(this._childrenByKey, a, null)
        },
        childCount: function () {
            return this.childNodes.length
        },
        leafs: function () {
            return f.query(this._leafs)
        },
        count: function () {
            return this._datums.length
        },
        firstDatum: function () {
            return this._datums.length ? this._datums[0] : null
        },
        firstAtoms: function () {
            return (this.firstDatum() || this).atoms
        },
        singleDatum: function () {
            var a = this._datums;
            return a.length === 1 ? a[0] : null
        },
        dispose: function () {
            var a =
                this;
            if (!a._disposed) {
                oa.call(a);
                var b;
                (b = a._selectedNotNullDatums) && b.clear();
                a._visibleNotNullDatums.clear();
                b = a._dimensionsList;
                for (var c = 0, d = b.length; c < d; c++)b[c].dispose();
                a._dimensions = null;
                a._dimensionsLIst = null;
                if (b = a.parent) {
                    b.removeChild(a);
                    a.parent = null
                }
                if (b = a.linkParent)wb.call(b, a);
                a._disposed = true
            }
        },
        disposeChildren: function () {
            oa.call(this)
        }
    });
    i.data.Data.add({
        selectedCount: function () {
            if (!this.isOwner())return this.datums(null, {selected: true}).count();
            return this._selectedNotNullDatums.count
        },
        selectedDatums: function () {
            if (!this.isOwner())return this.datums(null, {selected: true}).array();
            return this._selectedNotNullDatums.values()
        }, selectedDatumMap: function () {
            if (!this.isOwner()) {
                var a = this.datums(null, {selected: true}).object({name: f.propGet("id")});
                return new f.Set(a)
            }
            return this._selectedNotNullDatums.clone()
        }, visibleCount: function () {
            return this._visibleNotNullDatums.count
        }, replaceSelected: function (a) {
            f.array.is(a) || (a = a.array());
            var b = f.query(a).where(xa).object({name: Rb}), c = this.owner.clearSelected(function (d) {
                return !f.hasOwn(b,
                    d.id)
            });
            c |= i.data.Data.setSelected(a, true);
            return c
        }, clearSelected: function (a) {
            if (this.owner !== this)return this.owner.clearSelected(a);
            if (!this._selectedNotNullDatums.count)return false;
            var b;
            if (a) {
                b = false;
                this._selectedNotNullDatums.values().filter(a).forEach(function (c) {
                    b = true;
                    Da.call(c);
                    this._selectedNotNullDatums.rem(c.id)
                }, this)
            } else {
                b = true;
                this._selectedNotNullDatums.values().forEach(function (c) {
                    Da.call(c)
                });
                this._selectedNotNullDatums.clear()
            }
            return b
        }
    });
    i.data.Data.setSelected = function (a,
                                        b) {
        var c = 0;
        a && f.query(a).each(function (d) {
            c |= d.setSelected(b)
        });
        return !!c
    };
    i.data.Data.toggleSelected = function (a, b) {
        f.array.isLike(a) || (a = f.query(a).array());
        var c = f.query(a);
        b = b ? c.any(xa) : c.all(kb);
        return this.setSelected(a, !b)
    };
    i.data.Data.setVisible = function (a, b) {
        var c = 0;
        a && f.query(a).each(function (d) {
            c |= d.setVisible(b)
        });
        return !!c
    };
    i.data.Data.toggleVisible = function (a) {
        f.array.isLike(a) || (a = f.query(a).array());
        var b = f.query(a).all(f.propGet("isVisible"));
        return i.data.Data.setVisible(a, !b)
    };
    f.space("pvc.data").FlatteningMode =
        f.set(f.makeEnum(["DfsPre", "DfsPost"]), "None", 0);
    f.type("pvc.data.GroupingSpec").init(function (a, b, c) {
        this.type = b || null;
        var d = [];
        this.hasCompositeLevels = false;
        var e = [];
        this.levels = f.query(a || undefined).where(function (g) {
            return g.dimensions.length > 0
        }).select(function (g) {
            d.push(g.id);
            f.array.append(e, g.dimensionNames());
            if (!this.hasCompositeLevels && g.dimensions.length > 1)this.hasCompositeLevels = true;
            g._setAccDimNames(e.slice(0));
            return g
        }, this).array();
        this._dimNames = e;
        this.depth = this.levels.length;
        this.isSingleDimension = (this.isSingleLevel = this.depth === 1) && !this.hasCompositeLevels;
        this.firstDimension = this.depth > 0 ? this.levels[0].dimensions[0] : null;
        this.rootLabel = f.get(c, "rootLabel") || "";
        this.flatteningMode = f.get(c, "flatteningMode") || i.data.FlatteningMode.None;
        this._cacheKey = this._calcCacheKey();
        this.id = this._cacheKey + "##" + d.join("||")
    }).add({
        _calcCacheKey: function (a) {
            return [f.get(a, "flatteningMode") || this.flatteningMode, f.get(a, "reverse") || "false", f.get(a, "isSingleLevel") || this.isSingleLevel,
                f.get(a, "rootLabel") || this.rootLabel].join("#")
        }, bind: function (a) {
            this.type = a || f.fail.argumentRequired("type");
            this.levels.forEach(function (b) {
                b.bind(a)
            })
        }, dimensions: function () {
            return f.query(this.levels).prop("dimensions").selectMany()
        }, dimensionNames: function () {
            return this._dimNames
        }, view: function (a) {
            return a.view(this.dimensionNames())
        }, isDiscrete: function () {
            var a;
            return !this.isSingleDimension || !!(a = this.firstDimension) && a.type.isDiscrete
        }, firstDimensionType: function () {
            var a = this.firstDimension;
            return a && a.type
        }, firstDimensionName: function () {
            var a = this.firstDimensionType();
            return a && a.name
        }, firstDimensionValueType: function () {
            var a = this.firstDimensionType();
            return a && a.valueType
        }, isNull: function () {
            return !this.levels.length
        }, ensure: function (a) {
            var b;
            if (a) {
                var c = this._calcCacheKey(a);
                if (c !== this._cacheKey) {
                    var d = f.lazy(this, "_groupingCache");
                    (b = f.getOwn(d, c)) || (b = d[c] = this._ensure(a))
                }
            }
            return b || this
        }, _ensure: function (a) {
            var b = this;
            if (f.get(a, "isSingleLevel") && !b.isSingleLevel)return b._singleLevelGrouping(a);
            if (f.get(a, "reverse"))return b._reverse(a);
            var c = f.get(a, "flatteningMode") || b.flatteningMode;
            a = f.get(a, "rootLabel") || b.rootLabel;
            if (c !== b.flatteningMode || a !== b.rootLabel)return new i.data.GroupingSpec(b.levels, b.type, {flatteningMode: c, rootLabel: a});
            return b
        }, _singleLevelGrouping: function (a) {
            var b = !!f.get(a, "reverse"), c = this.dimensions().select(function (d) {
                return b ? new i.data.GroupingDimensionSpec(d.name, !d.reverse, d.type.complexType) : d
            });
            c = new i.data.GroupingLevelSpec(c, this.type);
            return new i.data.GroupingSpec([c],
                this.type, {flatteningMode: null, rootLabel: f.get(a, "rootLabel") || this.rootLabel})
        }, _reverse: function (a) {
            var b = f.query(this.levels).select(function (c) {
                c = f.query(c.dimensions).select(function (d) {
                    return new i.data.GroupingDimensionSpec(d.name, !d.reverse, d.type.complexType)
                });
                return new i.data.GroupingLevelSpec(c, this.type)
            });
            return new i.data.GroupingSpec(b, this.type, {
                flatteningMode: f.get(a, "flatteningMode") || this.flatteningMode,
                rootLabel: f.get(a, "rootLabel") || this.rootLabel
            })
        }, toString: function () {
            return f.query(this.levels).select(function (a) {
                return "" +
                    a
            }).array().join(", ")
        }
    });
    f.type("pvc.data.GroupingLevelSpec").init(function (a, b) {
        var c = [], d = [];
        this.dimensions = f.query(a).select(function (g) {
            c.push(g.id);
            d.push(g.name);
            return g
        }).array();
        this._dimNames = d;
        this.dimensionsInDefOrder = this.dimensions.slice(0);
        b && this._sortDimensions(b);
        this.id = c.join(",");
        this.depth = this.dimensions.length;
        var e = this;
        this.comparer = function (g, h) {
            return e.compare(g, h)
        }
    }).add({
        _sortDimensions: function (a) {
            a.sortDimensionNames(this.dimensionsInDefOrder, function (b) {
                return b.name
            })
        },
        _setAccDimNames: function (a) {
            this._accDimNames = a
        }, accDimensionNames: function () {
            return this._accDimNames
        }, dimensionNames: function () {
            return this._dimNames
        }, bind: function (a) {
            this._sortDimensions(a);
            this.dimensions.forEach(function (b) {
                b.bind(a)
            })
        }, compare: function (a, b) {
            for (var c = this.dimensions, d = this.depth, e = 0; e < d; e++) {
                var g = c[e].compareDatums(a, b);
                if (g)return g
            }
            return 0
        }, key: function (a) {
            var b = "", c = this._dimNames, d = this.depth, e = a.owner.keySep;
            a = a.atoms;
            for (var g = 0; g < d; g++) {
                var h = a[c[g]].key;
                if (g)b += e +
                h; else b = h
            }
            return b
        }, atomsInfo: function (a) {
            var b = {}, c = this._dimNames, d = this.depth;
            a = a.atoms;
            for (var e = 0; e < d; e++) {
                var g = c[e];
                b[g] = a[g]
            }
            return {atoms: b, dimNames: c}
        }, toString: function () {
            return f.query(this.dimensions).select(function (a) {
                return "" + a
            }).array().join("|")
        }
    });
    f.type("pvc.data.GroupingDimensionSpec").init(function (a, b, c) {
        this.name = a;
        this.reverse = !!b;
        this.id = a + ":" + (b ? "0" : "1");
        c && this.bind(c)
    }).add({
        type: null, comparer: null, bind: function (a) {
            a || f.fail.argumentRequired("type");
            this.type = a.dimensions(this.name);
            this.comparer = this.type.atomComparer(this.reverse)
        }, compareDatums: function (a, b) {
            if (this.type.isComparable) {
                var c = this.name;
                return this.comparer(a.atoms[c], b.atoms[c])
            }
            return this.reverse ? b.id - a.id : a.id - b.id
        }, toString: function () {
            return this.name + (this.reverse ? " desc" : "")
        }
    });
    i.data.GroupingSpec.parse = function (a, b) {
        if (!a)return new i.data.GroupingSpec(null, b);
        var c;
        if (f.array.is(a))c = a; else if (f.string.is(a))c = a.split(/\s*,\s*/);
        a = f.query(c).select(function (d) {
            d = yb(d, b);
            return new i.data.GroupingLevelSpec(d,
                b)
        });
        return new i.data.GroupingSpec(a, b)
    };
    var zb = /^\s*(.+?)(?:\s+(asc|desc))?\s*$/i;
    f.type("pvc.data.DataOper").init(function (a) {
        a || f.fail.argumentRequired("linkParent");
        this._linkParent = a
    }).add({key: null, execute: f.method({isAbstract: true})});
    f.type("pvc.data.GroupingOper", i.data.DataOper).init(function (a, b, c) {
        b || f.fail.argumentRequired("groupingSpecs");
        this.base(a, c);
        this._where = f.get(c, "where");
        this._visible = f.get(c, "visible", null);
        this._selected = f.get(c, "selected", null);
        var d = this._isNull = f.get(c,
            "isNull", null);
        this._postFilter = d != null ? function (j) {
            return j.isNull === d
        } : null;
        var e = this._selected == null, g = "";
        if (this._where) {
            g = f.get(c, "whereKey");
            if (!g)if (!c || g === null)e = false; else {
                g = "" + f.nextId("dataOperWhereKey");
                c.whereKey = g
            }
        }
        var h = [];
        this._groupSpecs = f.array.as(b).map(function (j) {
            if (j instanceof i.data.GroupingSpec) {
                if (j.type !== a.type)throw f.error.argumentInvalid("groupingSpecText", "Invalid associated complex type.");
            } else j = i.data.GroupingSpec.parse(j, a.type);
            h.push(j.id);
            return j
        });
        if (e)this.key =
            h.join("!!") + "||visible:" + this._visible + "||isNull:" + this._isNull + "||where:" + g
    }).add({
        execute: function () {
            return this._generateData(this._group(ka(f.query(this._linkParent._datums), {
                visible: this._visible,
                selected: this._selected,
                where: this._where
            })), null, this._linkParent)
        }, executeAdd: function (a, b) {
            b = this._group(ka(f.query(b), {visible: this._visible, selected: this._selected, where: this._where}));
            this._generateData(b, null, this._linkParent, a);
            return b.datums
        }, _group: function (a) {
            var b = {
                isRoot: true, treeHeight: f.query(this._groupSpecs).select(function (c) {
                    var d =
                        c.levels.length;
                    if (!d)return 0;
                    return c.flatteningMode ? 1 : d
                }).reduce(f.add, 0), datums: []
            };
            b.treeHeight > 0 && this._groupSpecRecursive(b, f.query(a).array(), 0);
            return b
        }, _groupSpecRecursive: function (a, b, c) {
            var d = this._groupSpecs[c];
            d.flatteningMode ? this._groupSpecRecursiveFlattened(a, b, d, c) : this._groupSpecRecursiveNormal(a, b, d, c)
        }, _groupSpecRecursiveNormal: function (a, b, c, d) {
            function e(k, m, l) {
                var n = g[l], o = l === h - 1, p = j && o;
                k.groupSpec = c;
                k.groupLevelSpec = n;
                m = k.children = this._groupLevelDatums(n, k, m, false);
                n = 0;
                for (var q = m.length; n < q; n++) {
                    var r = m[n];
                    if (!p) {
                        var s = r.datums;
                        r.datums = [];
                        o ? this._groupSpecRecursive(r, s, d + 1) : e.call(this, r, s, l + 1)
                    }
                    f.array.append(k.datums, r.datums)
                }
            }

            var g = c.levels, h = g.length, j = d === this._groupSpecs.length - 1;
            if (a.isRoot)a.label = c.rootLabel;
            e.call(this, a, b, 0)
        }, _groupSpecRecursiveFlattened: function (a, b, c, d) {
            function e(o, p, q) {
                var r = q === j - 1, s = k && r;
                p = this._groupLevelDatums(h[q], o, p, true);
                for (var u = !k ? [] : o.datums, A = 0, x = p.length; A < x; A++) {
                    var y = p[A], w = y.datums;
                    f.array.lazy(o, "_children").push(y);
                    if (f.hasOwn(l, y.key))f.array.append(u, w); else {
                        var z = m.length;
                        if (!g) {
                            n(y);
                            o.isFlattenGroup = true
                        }
                        if (!s) {
                            y.datums = [];
                            r ? this._groupSpecRecursive(y, w, d + 1) : e.call(this, y, w, q + 1)
                        }
                        f.array.append(u, y.datums);
                        if (g) {
                            if (f.hasOwn(l, y.key)) {
                                y.isFlattenGroup || f.assert("Must be a parent for duplicate keys to exist.");
                                if (y._children.length === 1) {
                                    m.splice(z, m.length - z);
                                    y.isDegenerateFlattenGroup = true
                                }
                            }
                            n(y);
                            o.isFlattenGroup = true
                        }
                    }
                }
                k || this._groupSpecRecursive(o, u, d + 1)
            }

            var g = c.flatteningMode === i.data.FlatteningMode.DfsPost,
                h = c.levels, j = h.length, k = d === this._groupSpecs.length - 1, m = [], l = {};
            a.children = m;
            a.childrenByKey = l;
            c = {key: "", absKey: "", atoms: {}, datums: [], label: c.rootLabel, dimNames: []};
            var n = function (o) {
                m.push(o);
                l[o.key] = o
            };
            g || n(c);
            e.call(this, c, b, 0);
            g && n(c);
            a.datums = c.datums
        }, _groupLevelDatums: function (a, b, c, d) {
            for (var e = [], g = {}, h = this._postFilter, j, k = a.comparer, m = function (r, s) {
                return k(r.firstDatum, s.firstDatum)
            }, l = 0, n = c.length; l < n; l++) {
                var o = c[l], p = a.key(o), q = f.hasOwnProp.call(g, p) && g[p];
                if (q) {
                    if (!h || h(o))q.datums.push(o)
                } else {
                    q =
                        a.atomsInfo(o);
                    q.key = p;
                    q.firstDatum = o;
                    q.datums = !h || h(o) ? [o] : [];
                    if (d) {
                        if (!j)j = o.owner.keySep;
                        this._onNewChildNodeFlattened(p, j, q, a, b)
                    }
                    f.array.insert(e, q, m);
                    g[p] = q
                }
            }
            if (h)for (l = e.length; l--;)e[l].datums.length || e.splice(l, 1);
            return e
        }, _onNewChildNodeFlattened: function (a, b, c, d, e) {
            f.copy(c.atoms, e.atoms);
            c.dimNames = d.accDimensionNames();
            if (e.dimNames.length) {
                a = e.absKey + b + a;
                c.absKey = a;
                c.key = i.data.Complex.rightTrimKeySep(a, b)
            } else c.absKey = a
        }, _generateData: function (a, b, c, d) {
            var e, g;
            if (a.isRoot)if (d) {
                e =
                    d;
                Na.call(e, a.datums)
            } else {
                g = true;
                e = new i.data.Data({linkParent: c, datums: a.datums});
                e.treeHeight = a.treeHeight;
                e._groupOper = this
            } else {
                if (d)(e = c.child(a.key)) && sa.call(e, a.datums);
                if (!e) {
                    g = true;
                    var h, j;
                    if (d && (j = c.childNodes))h = ~f.array.binarySearch(j, a.datums[0], b.groupLevelSpec.comparer);
                    e = new i.data.Data({parent: c, atoms: a.atoms, atomsDimNames: a.dimNames, datums: a.datums, index: h})
                }
            }
            if (g) {
                if (a.isFlattenGroup) {
                    e._isFlattenGroup = true;
                    e._isDegenerateFlattenGroup = !!a.isDegenerateFlattenGroup
                }
                if (b = a.label) {
                    e.label +=
                        b;
                    e.absLabel += b
                }
            }
            if (c = (b = a.children) && b.length) {
                if (g) {
                    e._groupSpec = a.groupSpec;
                    e._groupLevelSpec = a.groupLevelSpec
                }
                for (g = 0; g < c; g++)this._generateData(b[g], a, e, d)
            } else if (g && !a.isRoot) {
                a = e.root._leafs;
                e.leafIndex = a.length;
                a.push(e)
            }
            return e
        }
    });
    f.type("pvc.data.LinearInterpolationOper").init(function (a, b, c, d, e, g, h) {
        this._newDatums = [];
        this._data = c;
        var j = d.flatten(a, {visible: true, isNull: false}).children(), k = e.isBound() ? e.flatten(b, {
            visible: true,
            isNull: false
        }).children().array() : [null];
        this._isCatDiscrete =
            d.grouping.isDiscrete();
        this._firstCatDim = !this._isCatDiscrete ? a.owner.dimensions(d.firstDimensionName()) : null;
        this._stretchEnds = h;
        var m = this._valDim = a.owner.dimensions(g.firstDimensionName()), l = {visible: true, zeroIfNone: false};
        this._catInfos = j.select(function (n, o) {
            var p = c.child(n.key), q = {data: p || n, value: n.value, isInterpolated: false, serInfos: null, index: o};
            q.serInfos = k.map(function (r) {
                var s = p;
                if (s && r)s = s.child(r.key);
                var u = s ? s.dimensions(m.name).sum(l) : null;
                return {
                    data: r, group: s, value: u, isNull: u == null,
                    catInfo: q
                }
            });
            return q
        }).array();
        this._serCount = k.length;
        this._serStates = f.range(0, this._serCount).select(function (n) {
            return new i.data.LinearInterpolationOperSeriesState(this, n)
        }, this).array()
    }).add({
        interpolate: function () {
            for (var a; a = this._catInfos.shift();)a.serInfos.forEach(this._visitSeries, this);
            a = this._newDatums;
            a.length && this._data.owner.add(a)
        }, _visitSeries: function (a, b) {
            this._serStates[b].visit(a)
        }, nextUnprocessedNonNullCategOfSeries: function (a) {
            for (var b = 0, c = this._catInfos.length; b < c;) {
                var d =
                    this._catInfos[b++].serInfos[a];
                if (!d.isNull)return d
            }
        }
    });
    f.type("pvc.data.LinearInterpolationOperSeriesState").init(function (a, b) {
        this.interpolation = a;
        this.index = b;
        this._lastNonNull(null)
    }).add({
        visit: function (a) {
            a.isNull ? this._interpolate(a) : this._lastNonNull(a)
        }, _lastNonNull: function (a) {
            if (arguments.length) {
                this.__lastNonNull = a;
                this.__nextNonNull = undefined
            }
            return this.__lastNonNull
        }, _nextNonNull: function () {
            return this.__nextNonNull
        }, _initInterpData: function () {
            if (this.__nextNonNull === undefined) {
                var a =
                    this.__lastNonNull, b = this.__nextNonNull = this.interpolation.nextUnprocessedNonNullCategOfSeries(this.index) || null;
                if (b && a) {
                    var c = b.value - a.value;
                    if (this.interpolation._isCatDiscrete) {
                        b = b.catInfo.index - a.catInfo.index;
                        b >= 2 || f.assert("Must have at least one interpolation point.");
                        this._stepValue = c / b;
                        this._middleIndex = ~~(b / 2);
                        this._isOdd = (b - 1) % 2 > 0
                    } else {
                        a = +a.catInfo.value;
                        b = +b.catInfo.value;
                        this._steep = c / (b - a);
                        this._middleCat = (b + a) / 2
                    }
                }
            }
        }, _interpolate: function (a) {
            this._initInterpData();
            var b = this.__nextNonNull,
                c = this.__lastNonNull, d = b || c;
            if (d) {
                var e = this.interpolation, g = a.catInfo;
                if (b && c)if (e._isCatDiscrete) {
                    d = g.index - c.catInfo.index;
                    a = c.value + this._stepValue * d;
                    b = this._isOdd ? d < this._middleIndex ? c.group : b.group : d <= this._middleIndex ? c.group : b.group
                } else {
                    d = +g.value;
                    a = c.value + this._steep * (d - +c.catInfo.value);
                    b = d < this._middleCat ? c.group : b.group
                } else {
                    if (!e._stretchEnds)return;
                    a = d.value;
                    b = d.group
                }
                c = Object.create(b._datums[0].atoms);
                f.copyOwn(c, g.data.atoms);
                a = e._valDim.intern(a, true);
                c[a.dimension.name] = a;
                e._newDatums.push(new i.data.InterpolationDatum(b.owner,
                    c, "linear"))
            }
        }
    });
    f.type("pvc.data.ZeroInterpolationOper").init(function (a, b, c, d, e, g, h) {
        this._newDatums = [];
        this._data = c;
        var j = d.flatten(a, {visible: true, isNull: false}).children(), k = e.isBound() ? e.flatten(b, {
            visible: true,
            isNull: false
        }).children().array() : [null];
        this._isCatDiscrete = d.grouping.isDiscrete();
        this._firstCatDim = !this._isCatDiscrete ? a.owner.dimensions(d.firstDimensionName()) : null;
        this._stretchEnds = h;
        var m = this._valDim = a.owner.dimensions(g.firstDimensionName()), l = {visible: true, zeroIfNone: false};
        this._catInfos = j.select(function (n, o) {
            var p = c.child(n.key), q = {data: p || n, value: n.value, isInterpolated: false, serInfos: null, index: o};
            q.serInfos = k.map(function (r) {
                var s = p;
                if (s && r)s = s.child(r.key);
                var u = s ? s.dimensions(m.name).sum(l) : null;
                return {data: r, group: s, value: u, isNull: u == null, catInfo: q}
            });
            return q
        }).array();
        this._serCount = k.length;
        this._serStates = f.range(0, this._serCount).select(function (n) {
            return new i.data.ZeroInterpolationOperSeriesState(this, n)
        }, this).array()
    }).add({
        interpolate: function () {
            for (var a; a =
                this._catInfos.shift();)a.serInfos.forEach(this._visitSeries, this);
            a = this._newDatums;
            a.length && this._data.owner.add(a)
        }, _visitSeries: function (a, b) {
            this._serStates[b].visit(a)
        }, nextUnprocessedNonNullCategOfSeries: function (a) {
            for (var b = 0, c = this._catInfos.length; b < c;) {
                var d = this._catInfos[b++].serInfos[a];
                if (!d.isNull)return d
            }
        }
    });
    f.type("pvc.data.ZeroInterpolationOperSeriesState").init(function (a, b) {
        this.interpolation = a;
        this.index = b;
        this._lastNonNull(null)
    }).add({
        visit: function (a) {
            a.isNull ? this._interpolate(a) :
                this._lastNonNull(a)
        }, _lastNonNull: function (a) {
            if (arguments.length) {
                this.__lastNonNull = a;
                this.__nextNonNull = undefined
            }
            return this.__lastNonNull
        }, _nextNonNull: function () {
            return this.__nextNonNull
        }, _initInterpData: function () {
            if (this.__nextNonNull === undefined) {
                var a = this.__lastNonNull, b = this.__nextNonNull = this.interpolation.nextUnprocessedNonNullCategOfSeries(this.index) || null;
                if (b && a)if (this.interpolation._isCatDiscrete) {
                    a = b.catInfo.index - a.catInfo.index;
                    a >= 2 || f.assert("Must have at least one interpolation point.");
                    this._middleIndex = ~~(a / 2);
                    this._isOdd = (a - 1) % 2 > 0
                } else this._middleCat = (+b.catInfo.value + +a.catInfo.value) / 2
            }
        }, _interpolate: function (a) {
            this._initInterpData();
            var b = this.__nextNonNull, c = this.__lastNonNull, d = b || c;
            if (d) {
                var e = this.interpolation;
                a = a.catInfo;
                if (b && c)if (e._isCatDiscrete) {
                    d = a.index - c.catInfo.index;
                    b = this._isOdd ? d < this._middleIndex ? c.group : b.group : d <= this._middleIndex ? c.group : b.group
                } else b = +a.value < this._middleCat ? c.group : b.group; else {
                    if (!e._stretchEnds)return;
                    b = d.group
                }
                c = Object.create(b._datums[0].atoms);
                f.copyOwn(c, a.data.atoms);
                a = e._zeroAtom || (e._zeroAtom = e._valDim.intern(0, true));
                c[a.dimension.name] = a;
                e._newDatums.push(new i.data.InterpolationDatum(b.owner, c, "zero"))
            }
        }
    });
    i.data.Data.add({
        load: function (a, b) {
            Ma.call(this);
            var c = f.get(b, "where"), d = f.get(b, "isNull");
            a = f.query(a).select(function (e) {
                e = new i.data.Datum(this, e);
                if (d && d(e))e.isNull = true;
                if (c && !c(e))return null;
                return e
            }, this);
            qa.call(this, a, {isAdditive: false, doAtomGC: true})
        }, clearVirtuals: function () {
            var a = this._datums;
            if (a) {
                this._sumAbsCache =
                    null;
                for (var b = this._visibleNotNullDatums, c = this._selectedNotNullDatums, d = this._datumsByKey, e = this._datumsById, g = 0, h = a.length, j; g < h;) {
                    var k = a[g];
                    if (k.isVirtual) {
                        j = k.id;
                        var m = k.key;
                        a.splice(g, 1);
                        delete e[j];
                        delete d[m];
                        c && k.isSelected && c.rem(j);
                        k.isVisible && b.rem(j);
                        h--;
                        j = true
                    } else g++
                }
                if (j) {
                    if (!a.length && this.parent) {
                        this.dispose();
                        return
                    }
                    if (a = this.childNodes) {
                        g = 0;
                        for (h = a.length; g < h;) {
                            b = a[g];
                            b.clearVirtuals();
                            if (b.parent)g++; else h--
                        }
                    }
                    this._linkChildren && this._linkChildren.forEach(function (l) {
                        l.clearVirtuals()
                    })
                }
            }
            f.eachOwn(this._dimensions,
                function (l) {
                    nb.call(l)
                })
        }, add: function (a) {
            Ma.call(this);
            qa.call(this, a, {isAdditive: true, doAtomGC: true})
        }, groupBy: function (a, b) {
            a = new i.data.GroupingOper(this, a, b);
            b = a.key;
            var c, d;
            if (b)d = (c = this._groupByCache) && c[b];
            if (d)i.debug >= 7 && i.log("[GroupBy] Cache key hit '" + b + "'"); else {
                if (i.debug >= 7)i.log("[GroupBy] " + (b ? "Cache key not found: '" + b + "'" : "No Cache key"));
                d = a.execute();
                if (b)(c || (this._groupByCache = {}))[b] = d
            }
            return d
        }, where: function (a, b) {
            var c;
            if (a) {
                a = ta.call(this, a, b);
                c = ua.call(this, a, b)
            } else {
                if (!b)return f.query(this._datums);
                c = ka(f.query(this._datums), b)
            }
            a = Ab(a, b);
            return new i.data.Data({linkParent: this, datums: c, where: a})
        }, datums: function (a, b) {
            if (!a) {
                if (!b)return f.query(this._datums);
                return ka(f.query(this._datums), b)
            }
            a = ta.call(this, a, b);
            return ua.call(this, a, b)
        }, datum: function (a, b) {
            a || f.fail.argumentRequired("whereSpec");
            a = ta.call(this, a, b);
            return ua.call(this, a, b).first() || null
        }, dimensionsSumAbs: function (a, b) {
            var c = a + ":" + La(b), d = f.getOwn(this._sumAbsCache, c);
            if (d == null) {
                d = this.children().where(function (e) {
                    return !e._isFlattenGroup ||
                        e._isDegenerateFlattenGroup
                }).select(function (e) {
                    return Math.abs(e.dimensions(a).sum(b))
                }, this).reduce(f.add, 0);
                (this._sumAbsCache || (this._sumAbsCache = {}))[c] = d
            }
            return d
        }
    });
    i.data.Data.add({
        getInfo: function () {
            var a = ["DATA SUMMARY", i.logSeparator, "  Dimension", i.logSeparator];
            f.eachOwn(this.dimensions(), function (b, c) {
                var d = b.count(), e = b.type, g = [];
                g.push('"' + e.label + '"');
                g.push(e.valueTypeName);
                e.isComparable && g.push("comparable");
                e.isDiscrete || g.push("continuous");
                e.isHidden && g.push("hidden");
                a.push("  " +
                c + " (" + g.join(", ") + ") (" + d + ")\n\t" + b.atoms().slice(0, 10).map(function (h) {
                    return h.label
                }).join(", ") + (d > 10 ? "..." : ""))
            });
            return a.join("\n")
        }, getValues: function () {
            return t.range(0, this.getCategoriesSize()).map(function (a) {
                return this._getValuesForCategoryIndex(a)
            }, this)
        }, _getDimensionValues: function (a) {
            return this.dimensions(a).atoms().map(function (b) {
                return b.value
            })
        }, _getDimensionVisibleValues: function (a) {
            return this.dimensions(a).atoms({visible: true}).map(function (b) {
                return b.value
            })
        }, getSeries: function () {
            return this._getDimensionValues("series")
        },
        getVisibleSeriesIndexes: function () {
            return this.dimensions("series").indexes({visible: true})
        }, getVisibleCategoriesIndexes: function () {
            return this.dimensions("category").indexes({visible: true})
        }, getVisibleSeries: function () {
            return this._getDimensionVisibleValues("series")
        }, getCategories: function () {
            return this._getDimensionValues("category")
        }, getVisibleCategories: function () {
            return this._getDimensionVisibleValues("category")
        }, _getValuesForCategoryIndex: function (a) {
            var b = this.datums({category: this.dimensions("category").atoms()[a]}).uniqueIndex(function (c) {
                return c.atoms.series.key
            });
            return this.dimensions("series").atoms().map(function (c) {
                return (c = f.getOwn(b, c.key)) ? c.atoms.value.value : null
            })
        }, getSeriesSize: function () {
            var a = this.dimensions("series", {assertExists: false});
            return a ? a.count() : 0
        }, getCategoriesSize: function () {
            var a = this.dimensions("category", {assertExists: false});
            return a ? a.count() : 0
        }
    });
    f.scope(function () {
        var a = f.makeEnum(["Interactive", "ShowsActivity", "ShowsSelection", "ShowsTooltip", "Selectable", "Unselectable", "Hoverable", "Clickable", "DoubleClickable", "SelectableByClick",
            "SelectableByRubberband", "SelectableByFocusWindow", "Animatable"]);
        a.ShowsInteraction = a.ShowsActivity | a.ShowsSelection;
        a.Actionable = a.Hoverable | a.Clickable | a.DoubleClickable | a.SelectableByClick;
        a.HandlesEvents = a.Actionable | a.ShowsTooltip;
        a.HandlesClickEvent = a.Clickable | a.SelectableByClick;
        f.type("pvc.visual.Interactive").addStatic(a).addStatic({
            ShowsAny: a.ShowsInteraction | a.ShowsTooltip,
            SelectableAny: a.Selectable | a.SelectableByClick | a.SelectableByRubberband | a.SelectableByFocusWindow
        }).add({_ibits: -1}).add(f.query(f.ownKeys(a)).object({
            name: f.firstLowerCase,
            value: function (b) {
                var c = a[b];
                return function () {
                    return !!(this._ibits & c)
                }
            }
        }))
    });
    f.type("pvc.visual.Scene").init(function (a, b) {
        if (i.debug >= 4)this.id = f.nextId("scene");
        this._renderId = 0;
        this.renderState = {};
        t.Dom.Node.call(this, null);
        this.parent = a || null;
        if (a) {
            this.root = a.root;
            var c = f.get(b, "index", null);
            a.insertAt(this, c)
        } else {
            this.root = this;
            this._active = null;
            this._panel = f.get(b, "panel") || f.fail.argumentRequired("panel", "Argument is required on root scene.")
        }
        var d, e, g, h, j, k;
        if ((b = f.array.to(f.get(b, "source"))) &&
            b.length) {
            this.source = b;
            d = b[0];
            if (d instanceof i.data.Data) {
                e = d;
                j = b;
                g = e.firstDatum() || f.query(j).select(function (m) {
                    return m.firstDatum()
                }).first(f.notNully)
            } else {
                d instanceof i.data.Datum || f.assert("not a datum");
                g = d;
                h = b
            }
            b = d.atoms;
            k = g && g.atoms || d.atoms
        } else b = a ? (k = Object.create(a.atoms)) : (k = {});
        this.atoms = b;
        this.firstAtoms = k;
        j && (this.groups = j);
        e && (this.group = e);
        h && (this._datums = h);
        g && (this.datum = g);
        if (!d || d.isNull)this.isNull = true;
        this.vars = a ? Object.create(a.vars) : {}
    }).add(t.Dom.Node).add(i.visual.Interactive).add({
        source: null,
        groups: null, group: null, _datums: null, datum: null, isNull: false, get: function (a, b) {
            return (a = this.vars[a]) && a[b || "value"]
        }, getSeries: function () {
            return this.get("series")
        }, getCategory: function () {
            return this.get("category")
        }, getValue: function () {
            return this.get("value")
        }, getTick: function () {
            return this.get("tick")
        }, getX: function () {
            return this.get("x")
        }, getY: function () {
            return this.get("y")
        }, getSeriesLabel: function () {
            return this.get("series", "label")
        }, getCategoryLabel: function () {
            return this.get("category", "label")
        },
        getValueLabel: function () {
            return this.get("value", "label")
        }, getTickLabel: function () {
            return this.get("tick", "label")
        }, getXLabel: function () {
            return this.get("x", "label")
        }, getYLabel: function () {
            return this.get("y", "label")
        }, data: function () {
            var a = this.group;
            if (!a) {
                for (var b = this; !a && (b = b.parent);)a = b.group;
                if (!a)a = this.panel.data
            }
            return a
        }, datums: function () {
            return this.groups ? f.query(this.groups).selectMany(function (a) {
                return a.datums()
            }) : this._datums ? f.query(this._datums) : f.query()
        }, format: function (a) {
            return f.format(a,
                this._formatScope, this)
        }, _formatScope: function (a) {
            if (a.charAt(0) === "#") {
                a = a.substr(1).split(".");
                if (a.length > 2)throw f.error.operationInvalid("Scene format mask is invalid.");
                var b = this.firstAtoms[a[0]];
                if (b) {
                    if (a.length > 1)switch (a[1]) {
                        case "value":
                            return b.value;
                        case "label":
                            break;
                        default:
                            throw f.error.operationInvalid("Scene format mask is invalid.");
                    }
                    return b
                }
                return null
            }
            return f.getPath(this.vars, a)
        }, isRoot: function () {
            return this.root === this
        }, panel: function () {
            return this.root._panel
        }, chart: function () {
            return this.root._panel.chart
        },
        compatVersion: function () {
            return this.root._panel.compatVersion()
        }, children: function () {
            var a = this.childNodes;
            return a.length ? f.query(a) : f.query()
        }, leafs: function () {
            function a(c) {
                for (; c.childNodes.length;)c = c.childNodes[0];
                return c
            }

            var b = this;
            return f.query(function (c) {
                if (!c) {
                    c = a(b);
                    if (c === b)return 0;
                    this.item = c;
                    return 1
                }
                if (c = this.item.nextSibling) {
                    this.item = c;
                    return 1
                }
                for (var d = this.item; d !== b && (d = d.parentNode);)if (c = d.nextSibling) {
                    this.item = a(c);
                    return 1
                }
                return 0
            })
        }, anyInteraction: function () {
            return !!this.root._active ||
                this.anySelected()
        }, isActive: false, setActive: function (a) {
            a = !!a;
            if (this.isActive !== a)Pa.call(this.root, this.isActive ? null : this)
        }, clearActive: function () {
            return Pa.call(this.root, null)
        }, anyActive: function () {
            return !!this.root._active
        }, active: function () {
            return this.root._active
        }, activeSeries: function () {
            var a = this.active(), b;
            return a && (b = a.vars.series) && b.value
        }, isActiveSeries: function () {
            if (this.isActive)return true;
            var a = this.renderState.isActiveSeries;
            if (a == null) {
                var b;
                a = (b = this.activeSeries()) != null &&
                b === this.vars.series.value;
                this.renderState.isActiveSeries = a
            }
            return a
        }, isActiveDatum: function () {
            if (this.isActive)return true;
            var a = this.renderState.isActiveDatum;
            if (a == null) {
                a = (a = this.active()) ? this.group && a.group === this.group || this.datum && a.datum === this.datum : false;
                this.renderState.isActiveDatum = a
            }
            return a
        }, isActiveDescendantOrSelf: function () {
            if (this.isActive)return true;
            return f.lazy(this.renderState, "isActiveDescOrSelf", this._calcIsActiveDescOrSelf, this)
        }, _calcIsActiveDescOrSelf: function () {
            var a =
                this.active();
            if (a)for (; a = a.parent;)if (a === this)return true;
            return false
        }, isVisible: function () {
            return this._visibleInfo().is
        }, anyVisible: function () {
            return this._visibleInfo().any
        }, _visibleInfo: function () {
            return f.lazy(this.renderState, "visibleInfo", this._createVisibleInfo, this)
        }, _createVisibleInfo: function () {
            var a = this.chart().data.owner.visibleCount() > 0, b = a && this.datums().any(f.propGet("isVisible"));
            return {any: a, is: b}
        }, isSelected: function () {
            return this._selectedInfo().is
        }, anySelected: function () {
            return this._selectedInfo().any
        },
        _selectedInfo: function () {
            return f.lazy(this.renderState, "selectedInfo", this._createSelectedInfo, this)
        }, _createSelectedInfo: function () {
            var a = this.chart().data.owner.selectedCount() > 0, b = a && this.datums().any(xa);
            return {any: a, is: b}
        }, select: function (a) {
            var b = this, c = b.datums().array();
            if (c.length) {
                var d = b.chart();
                d._updatingSelections(function () {
                    if ((c = d._onUserSelection(c)) && c.length)d.options.ctrlSelectMode && f.get(a, "replace", true) ? d.data.replaceSelected(c) : i.data.Data.toggleSelected(c)
                })
            }
        }, isSelectedDescendantOrSelf: function () {
            if (this.isSelected())return true;
            return f.lazy(this.renderState, "isSelectedDescOrSelf", this._calcIsSelectedDescOrSelf, this)
        }, _calcIsSelectedDescOrSelf: function () {
            var a = this.firstChild;
            if (a) {
                do if (a.isSelectedDescendantOrSelf())return true; while (a = a.nextSibling)
            }
            return false
        }, toggleVisible: function () {
            i.data.Data.toggleVisible(this.datums()) && this.chart().render(true, true, false)
        }
    });
    i.visual.Scene.prototype.variable = function (a, b) {
        var c = this, d;
        if (!c._vars || !c._vars[a]) {
            if (!c.hasOwnProperty("_vars"))c._vars = f.create(c._vars);
            c._vars[a] =
                true;
            d = {};
            var e = "_" + a + "Eval";
            d[a] = Db(a, e);
            a = e + "Core";
            f.hasOwn(c, e) || (d[e] = f.methodCaller(a));
            f.hasOwn(c, a) || (d[a] = f.fun.to(b === undefined ? null : b))
        } else if (b !== undefined)d = f.set({}, "_" + a + "EvalCore", f.fun.to(b));
        d && c.constructor.add(d);
        return c
    };
    var I = i.visual.ValueLabelVar = function (a, b, c, d) {
        this.value = a;
        this.label = b;
        if (c !== undefined)this.rawValue = c;
        if (d !== undefined)this.absLabel = d
    };
    f.set(I.prototype, "rawValue", undefined, "absLabel", undefined, "setValue", function (a) {
            this.value = a;
            return this
        }, "setLabel",
        function (a) {
            this.label = a;
            return this
        }, "clone", function () {
            return new I(this.value, this.label, this.rawValue)
        }, "toString", function () {
            var a = this.label || this.value;
            return a == null ? "" : typeof a !== "string" ? "" + a : a
        });
    I.fromComplex = function (a) {
        return a ? new I(a.value, a.label, a.rawValue, a.absLabel) : new I(null, "", null)
    };
    I.fromAtom = I.fromComplex;
    f.type("pvc.visual.Context").init(function (a, b, c) {
        this.chart = a.chart;
        this.panel = a;
        Ra.call(this, b, c)
    }).add({
        isPinned: false, pin: function () {
            this.isPinned = true;
            return this
        },
        compatVersion: function () {
            return this.panel.compatVersion()
        }, finished: function (a) {
            return this.sign.finished(a)
        }, delegate: function (a) {
            return this.sign.delegate(a)
        }, getV1Series: function () {
            var a;
            return f.nullyTo(this.scene.firstAtoms && (a = this.scene.firstAtoms[this.panel._getV1DimName("series")]) && a.rawValue, "Series")
        }, getV1Category: function () {
            var a;
            return this.scene.firstAtoms && (a = this.scene.firstAtoms[this.panel._getV1DimName("category")]) && a.rawValue
        }, getV1Value: function () {
            var a;
            return this.scene.firstAtoms &&
                (a = this.scene.firstAtoms[this.panel._getV1DimName("value")]) && a.value
        }, getV1Datum: function () {
            return this.panel._getV1Datum(this.scene)
        }, get: function (a, b) {
            return this.scene.get(a, b)
        }, getSeries: function () {
            return this.scene.get("series")
        }, getCategory: function () {
            return this.scene.get("category")
        }, getValue: function () {
            return this.scene.get("value")
        }, getTick: function () {
            return this.scene.get("tick")
        }, getX: function () {
            return this.scene.get("x")
        }, getY: function () {
            return this.scene.get("y")
        }, getSeriesLabel: function () {
            return this.scene.get("series",
                "label")
        }, getCategoryLabel: function () {
            return this.scene.get("category", "label")
        }, getValueLabel: function () {
            return this.scene.get("value", "label")
        }, getTickLabel: function () {
            return this.scene.get("tick", "label")
        }, getXLabel: function () {
            return this.scene.get("x", "label")
        }, getYLabel: function () {
            return this.scene.get("y", "label")
        }, select: function (a) {
            return this.scene.select(a)
        }, toggleVisible: function () {
            return this.scene.toggleVisible()
        }, click: function () {
            var a = this;
            a.clickable() && a.panel._onClick(a);
            if (a.selectableByClick()) {
                var b =
                    a.event;
                a.select({replace: !b || !b.ctrlKey})
            }
        }, doubleClick: function () {
            this.doubleClickable() && this.panel._onDoubleClick(this)
        }, clickable: function () {
            var a = this;
            return (a.sign ? a.sign.clickable() : a.panel.clickable()) && (!a.scene || a.scene.clickable())
        }, selectableByClick: function () {
            var a = this;
            return (a.sign ? a.sign.selectableByClick() : a.panel.selectableByClick()) && (!a.scene || a.scene.selectableByClick())
        }, doubleClickable: function () {
            var a = this;
            return (a.sign ? a.sign.doubleClickable() : a.panel.doubleClickable()) &&
                (!a.scene || a.scene.doubleClickable())
        }, hoverable: function () {
            var a = this;
            return (a.sign ? a.sign.hoverable() : a.panel.hoverable()) && (!a.scene || a.scene.hoverable())
        }
    });
    if (Object.defineProperty)try {
        Object.defineProperty(i.visual.Context.prototype, "parent", {
            get: function () {
                throw f.error.operationInvalid("The 'this.parent.index' idiom has no equivalent in this version. Please try 'this.pvMark.parent.index'.");
            }
        })
    } catch ($b) {
    }
    f.space("pvc.visual").TraversalMode = f.makeEnum(["Tree", "FlattenedSingleLevel", "FlattenDfsPre",
        "FlattenDfsPost"]);
    f.type("pvc.visual.Role").init(function (a, b) {
        this.name = a;
        this.label = f.get(b, "label") || i.buildTitleFromName(a);
        this.index = f.get(b, "index") || 0;
        this.dimensionDefaults = f.get(b, "dimensionDefaults") || {};
        if (f.get(b, "isRequired", false))this.isRequired = true;
        if (f.get(b, "autoCreateDimension", false))this.autoCreateDimension = true;
        if (a = f.get(b, "defaultSourceRole"))this.defaultSourceRoleName = a;
        if (a = f.get(b, "defaultDimension"))this.defaultDimensionName = a;
        if (!a && this.autoCreateDimension)throw f.error.argumentRequired("defaultDimension");
        var c;
        a = f.get(b, "requireIsDiscrete");
        if (a != null)a || (c = true);
        if (c != null)if (c = f.get(b, "requireSingleDimension", false)) {
            if (f.get(b, "isMeasure", false)) {
                this.isMeasure = true;
                if (f.get(b, "isPercent", false))this.isPercent = true
            }
            var d = f.get(b, "valueType", null);
            if (d !== this.valueType) {
                this.valueType = d;
                this.dimensionDefaults.valueType = d
            }
        }
        if (c !== this.requireSingleDimension)this.requireSingleDimension = c;
        if (a != this.requireIsDiscrete) {
            this.requireIsDiscrete = !!a;
            this.dimensionDefaults.isDiscrete = this.requireIsDiscrete
        }
        b =
            f.get(b, "traversalMode");
        if (b != null && b !== this.traversalMode)this.traversalMode = b
    }).add({
        isRequired: false,
        requireSingleDimension: false,
        valueType: null,
        requireIsDiscrete: null,
        isMeasure: false,
        isPercent: false,
        defaultSourceRoleName: null,
        defaultDimensionName: null,
        grouping: null,
        traversalMode: i.visual.TraversalMode.FlattenedSingleLevel,
        rootLabel: "",
        autoCreateDimension: false,
        isReversed: false,
        label: null,
        sourceRole: null,
        isDefaultSourceRole: false,
        firstDimensionType: function () {
            var a = this.grouping;
            return a && a.firstDimensionType()
        },
        firstDimensionName: function () {
            var a = this.grouping;
            return a && a.firstDimensionName()
        },
        firstDimensionValueType: function () {
            var a = this.grouping;
            return a && a.firstDimensionValueType()
        },
        isDiscrete: function () {
            var a = this.grouping;
            return a && a.isDiscrete()
        },
        setSourceRole: function (a, b) {
            this.sourceRole = a;
            this.isDefaultSourceRole = !!b
        },
        setIsReversed: function (a) {
            if (a)this.isReversed = true; else delete this.isReversed
        },
        setTraversalMode: function (a) {
            var b = i.visual.TraversalMode;
            a = f.nullyTo(a, b.FlattenedSingleLevel);
            if (a !==
                this.traversalMode)if (a === b.FlattenedSingleLevel)delete this.traversalMode; else this.traversalMode = a
        },
        setRootLabel: function (a) {
            if (a !== this.rootLabel) {
                if (a)this.rootLabel = a; else delete this.rootLabel;
                this.grouping && this._updateBind(this.grouping)
            }
        },
        flatten: function (a, b) {
            var c = this.flattenedGrouping(b) || f.fail.operationInvalid("Role is unbound.");
            return a.groupBy(c, b)
        },
        flattenedGrouping: function (a) {
            var b = this.grouping;
            if (b) {
                a = a ? Object.create(a) : {};
                var c = a.flatteningMode;
                if (c == null)c = a.flatteningMode =
                    this._flatteningMode();
                if (a.isSingleLevel == null && !c)a.isSingleLevel = true;
                return b.ensure(a)
            }
        },
        _flatteningMode: function () {
            var a = i.visual.TraversalMode, b = i.data.FlatteningMode;
            switch (this.traversalMode) {
                case a.FlattenDfsPre:
                    return b.DfsPre;
                case a.FlattenDfsPost:
                    return b.DfsPost
            }
            return a.None
        },
        select: function (a, b) {
            var c = this.grouping;
            if (c) {
                f.setUDefaults(b, "flatteningMode", i.data.FlatteningMode.None);
                return a.groupBy(c.ensure(b), b)
            }
        },
        view: function (a) {
            var b = this.grouping;
            if (b)return b.view(a)
        },
        preBind: function (a) {
            this.__grouping =
                a;
            return this
        },
        isPreBound: function () {
            return !!this.__grouping
        },
        preBoundGrouping: function () {
            return this.__grouping
        },
        isBound: function () {
            return !!this.grouping
        },
        postBind: function (a) {
            var b = this.__grouping;
            if (b) {
                delete this.__grouping;
                b.bind(a);
                this.bind(b)
            }
            return this
        },
        bind: function (a) {
            a = this._validateBind(a);
            this._updateBind(a);
            return this
        },
        _validateBind: function (a) {
            if (a)if (a.isNull())a = null; else {
                if (this.requireSingleDimension && !a.isSingleDimension)throw f.error.operationInvalid("Role '{0}' only accepts a single dimension.",
                    [this.name]);
                var b = this.valueType, c = this.requireIsDiscrete;
                a.dimensions().each(function (d) {
                    d = d.type;
                    if (b && d.valueType !== b)throw f.error.operationInvalid("Role '{0}' cannot be bound to dimension '{1}'. \nIt only accepts dimensions of type '{2}' and not of type '{3}'.", [this.name, d.name, i.data.DimensionType.valueTypeName(b), d.valueTypeName]);
                    if (c != null && d.isDiscrete !== c)if (c)d._toDiscrete(); else throw f.error.operationInvalid("Role '{0}' cannot be bound to dimension '{1}'. \nIt only accepts {2} dimensions.",
                        [this.name, d.name, c ? "discrete" : "continuous"]);
                }, this)
            }
            return a
        },
        _updateBind: function (a) {
            this.grouping && this.grouping.dimensions().each(function (b) {
                b.type && gb.call(b.type, this)
            }, this);
            if (this.grouping = a) {
                this.grouping = this.grouping.ensure({reverse: this.isReversed, rootLabel: this.rootLabel});
                this.grouping.dimensions().each(function (b) {
                    fb.call(b.type, this)
                }, this)
            }
        }
    });
    f.type("pvc.visual.RoleVarHelper").init(function (a, b, c) {
        var d = f.get(c, "hasPercentSubVar", false), e = f.get(c, "roleVar"), g = this.grouping = b &&
        b.grouping;
        if (g) {
            this.role = b;
            this.sourceRoleName = b.sourceRole && b.sourceRole.name;
            var h = a.panel();
            this.panel = h;
            if (!g.isDiscrete()) {
                this.rootContDim = h.data.owner.dimensions(g.firstDimensionName());
                if (d)this.percentFormatter = h.chart.options.percentValueFormat
            }
        }
        if (!e) {
            if (!b)throw f.error.operationInvalid("Role is not defined, so the roleVar argument is required.");
            e = b.name
        }
        if (!g) {
            b = a.vars[e] = new I(null, "");
            if (d)b.percent = new I(null, "")
        }
        this.roleVarName = e;
        a["is" + f.firstUpperCase(e) + "Bound"] = !!g;
        if (f.get(c,
                "allowNestedVars"))this.allowNestedVars = true
    }).add({
        allowNestedVars: false, isBound: function () {
            return !!this.grouping
        }, onNewScene: function (a, b) {
            if (this.grouping) {
                var c = this.roleVarName;
                if (!(this.allowNestedVars ? f.hasOwnProp.call(a.vars, c) : a.vars[c])) {
                    var d = this.sourceRoleName;
                    if (d)if (d = f.getOwn(a.vars, d)) {
                        a.vars[c] = d.clone();
                        return
                    }
                    if (b) {
                        var e;
                        if (b = this.rootContDim) {
                            var g;
                            var h = (d = a.group) ? d.singleDatum() : a.datum;
                            if (h) {
                                if (!h.isNull) {
                                    e = I.fromAtom(h.atoms[b.name]);
                                    if (e.value != null && this.percentFormatter)if (d) {
                                        d =
                                            d.dimensions(b.name);
                                        g = d.percentOverParent({visible: true})
                                    } else g = a.data().dimensions(b.name).percent(e.value)
                                }
                            } else if (d) {
                                d = d.dimensions(b.name);
                                h = d.sum({visible: true, zeroIfNone: false});
                                if (h != null) {
                                    e = b.format(h);
                                    e = new I(h, e, h);
                                    if (this.percentFormatter)g = d.percentOverParent({visible: true})
                                }
                            }
                            if (e && this.percentFormatter)e.percent = e.value == null ? new I(null, "") : new I(g, this.percentFormatter.call(null, g))
                        } else if ((g = a.datum) && !g.isNull) {
                            e = this.grouping.view(g);
                            e = I.fromComplex(e)
                        }
                        if (!e) {
                            e = new I(null, "");
                            if (this.percentFormatter)e.percent = new I(null, "")
                        }
                        a.vars[c] = e
                    }
                }
            }
        }
    });
    Q.prototype.getSign = function () {
        return this.sign || Eb(this)
    };
    Q.prototype.getScene = function () {
        return this.getSign().scene()
    };
    Q.prototype.getContext = function () {
        return this.getSign().context()
    };
    Q.prototype.preBuildInstance = function (a) {
        a = a.data;
        a instanceof i.visual.Scene && Cb.call(a, this.renderId())
    };
    f.type("pvc.visual.BasicSign").init(function (a, b) {
        this.chart = a.chart;
        this.panel = a;
        !b.sign || f.assert("Mark already has an attached Sign.");
        this.pvMark = b;
        b.sign = this
    }).add({
        compatVersion: function () {
            return this.chart.compatVersion()
        }, localProperty: function (a, b) {
            this.pvMark.localProperty(a, b);
            return this
        }, lock: function (a, b) {
            return this.lockMark(a, this._bindWhenFun(b, a))
        }, optional: function (a, b, c) {
            return this.optionalMark(a, this._bindWhenFun(b, a), c)
        }, lockMark: function (a, b) {
            return this.pvMark.lock(a, b), this
        }, optionalMark: function (a, b, c) {
            return this.pvMark[a](b, c), this
        }, delegate: function (a, b) {
            return this.pvMark.delegate(a, b)
        }, delegateExtension: function (a) {
            return this.pvMark.delegate(a,
                i.extensionTag)
        }, hasDelegate: function (a) {
            return this.pvMark.hasDelegate(a)
        }, _createPropInterceptor: function (a, b) {
            var c = this;
            return function () {
                var d = this.sign;
                if (!d || d !== c)return c._getPvSceneProp(a, this.index);
                return b.apply(c, arguments)
            }
        }, _getPvSceneProp: function (a, b) {
            var c = this.pvMark, d = c.scene;
            if (d) {
                b = c.hasOwnProperty("index") ? c.index : Math.min(b, d.length - 1);
                if (b != null)return d[b][a]
            }
            throw f.error.operationInvalid("Cannot evaluate inherited property.");
        }, _bindWhenFun: function (a, b) {
            if (f.fun.is(a)) {
                var c =
                    this;
                return c._createPropInterceptor(b, function (d) {
                    return a.call(c, d)
                })
            }
            return a
        }, _lockDynamic: function (a, b) {
            var c = this;
            return c.lockMark(a, c._createPropInterceptor(a, function (d) {
                return c[b].call(c, d)
            }))
        }, scene: function () {
            var a = this.pvMark.instance();
            a = a && a.data;
            return a instanceof i.visual.Scene ? a : null
        }, instanceState: function (a) {
            return this.pvMark.instanceState(a)
        }, context: function (a, b) {
            var c;
            if (b || !(c = this.instanceState()))return this._createContext(a);
            return c.cccContext || (c.cccContext = this._createContext(a))
        },
        _createContext: function (a) {
            return new i.visual.Context(this.panel, this.pvMark, a)
        }
    });
    f.type("pvc.visual.Sign", i.visual.BasicSign).init(function (a, b, c) {
        var d = this;
        d.base(a, b, c);
        d._ibits = a._ibits;
        var e = f.get(c, "extensionId");
        if (e != null)d.extensionAbsIds = f.array.to(a._makeExtensionAbsId(e));
        d.isActiveSeriesAware = f.get(c, "activeSeriesAware", true);
        if (d.isActiveSeriesAware) {
            a = (a = a.visualRoles) && a.series;
            if (!a || !a.isBound())d.isActiveSeriesAware = false
        }
        b.wrapper(f.get(c, "wrapper") || d.createDefaultWrapper());
        f.get(c, "freeColor", true) || d._bindProperty("fillStyle", "fillColor", "color")._bindProperty("strokeStyle", "strokeColor", "color")
    }).postInit(function (a, b, c) {
        this._addInteractive(c);
        a._addSign(this)
    }).add({
        createDefaultWrapper: function () {
            var a = this;
            return function (b) {
                return function (c) {
                    return b.call(a.context(), c)
                }
            }
        }, property: function (a) {
            var b = f.firstUpperCase(a), c = "base" + b, d = "default" + b, e = "normal" + b, g = "interactive" + b;
            b = {};
            b[a] = function (h, j) {
                this._finished = false;
                this._arg = j;
                var k = this[c](h, j);
                if (k == null)return null;
                if (this._finished)return k;
                k = this.showsInteraction() && h.anyInteraction() ? this[g](h, k, j) : this[e](h, k, j);
                this._arg = null;
                return k
            };
            b[c] = function () {
                return this.delegateExtension()
            };
            b[d] = function () {
            };
            b[e] = function (h, j) {
                return j
            };
            b[g] = function (h, j) {
                return j
            };
            this.constructor.add(b);
            return this
        }, anyInteraction: function (a) {
            return a.anyInteraction()
        }, finished: function (a) {
            this._finished = true;
            return a
        }, applyExtensions: function () {
            if (!this._extended) {
                this._extended = true;
                var a = this.extensionAbsIds;
                a && a.forEach(function (b) {
                    this.panel.extendAbs(this.pvMark,
                        b)
                }, this)
            }
            return this
        }, intercept: function (a, b) {
            b = this._createPropInterceptor(a, b);
            return this._intercept(a, b)
        }, lockDimensions: function () {
            this.pvMark.lock("left").lock("right").lock("top").lock("bottom").lock("width").lock("height");
            return this
        }, _extensionKeyArgs: {tag: i.extensionTag}, _bindProperty: function (a, b, c) {
            var d = this;
            c || (c = b);
            var e = "default" + f.firstUpperCase(c);
            if (f.fun.is(d[e]))d.pvMark.hasDelegateValue(a, i.extensionTag) || d.pvMark.intercept(a, function (g) {
                return d[e](g, d._arg)
            }, d._extensionKeyArgs);
            c = this._createPropInterceptor(a, function (g) {
                return d[b](g)
            });
            return d._intercept(a, c)
        }, _intercept: function (a, b) {
            var c = this.pvMark, d = this.extensionAbsIds;
            d && f.query(d).select(function (e) {
                return this.panel._getExtensionAbs(e, a)
            }, this).where(f.notUndef).each(function (e) {
                e = c.wrap(e, a);
                c.intercept(a, e, this._extensionKeyArgs)
            }, this);
            (c._intercepted || (c._intercepted = {}))[a] = true;
            c.intercept(a, b);
            return this
        }
    }).prototype.property("color").constructor.add(i.visual.Interactive).add({
            extensionAbsIds: null, _addInteractive: function (a) {
                var b =
                    this, c = f.get;
                if (b.interactive()) {
                    var d = b._ibits, e = i.visual.Interactive;
                    if (c(a, "noTooltip"))d &= ~e.ShowsTooltip;
                    if (c(a, "noHover"))d &= ~e.Hoverable;
                    if (c(a, "noClick"))d &= ~e.Clickable;
                    if (c(a, "noDoubleClick"))d &= ~e.DoubleClickable;
                    if (c(a, "noSelect"))d &= ~e.SelectableAny; else if (this.selectable()) {
                        if (c(a, "noClickSelect"))d &= ~e.SelectableByClick;
                        if (c(a, "noRubberSelect"))d &= ~e.SelectableByRubberband
                    }
                    if (b.showsInteraction()) {
                        if (c(a, "showsInteraction") === false)d &= ~e.ShowsInteraction;
                        if (b.showsActivity())if (c(a,
                                "showsActivity") === false)d &= ~e.ShowsActivity;
                        if (b.showsSelection())if (c(a, "showsSelection") === false)d &= ~e.ShowsSelection
                    }
                    b._ibits = d
                }
                if (b.handlesEvents()) {
                    b.showsTooltip() && b._addPropTooltip(c(a, "tooltipArgs"));
                    b.hoverable() && b._addPropHoverable();
                    b.handlesClickEvent() && b._addPropClick();
                    b.doubleClickable() && b._addPropDoubleClick()
                } else b.pvMark.events("none")
            }, fillColor: function (a) {
                return this.color(a, "fill")
            }, strokeColor: function (a) {
                return this.color(a, "stroke")
            }, defaultColor: function (a) {
                return this.defaultColorSceneScale()(a)
            },
            dimColor: function (a, b) {
                if (b === "text")return i.toGrayScale(a, -0.75, null, null);
                return i.toGrayScale(a, -0.3, null, null)
            }, defaultColorSceneScale: function () {
                return f.lazy(this, "_defaultColorSceneScale", this._initDefColorScale, this)
            }, _initDefColorScale: function () {
                var a = this.panel.axes.color;
                return a ? a.sceneScale({sceneVarName: "color"}) : f.fun.constant(i.defaultColor)
            }, mayShowActive: function (a, b) {
                if (!this.showsActivity())return false;
                return a.isActive || !b && this.isActiveSeriesAware && a.isActiveSeries() || a.isActiveDatum()
            },
            mayShowNotAmongSelected: function (a) {
                return this.mayShowAnySelected(a) && !a.isSelected()
            }, mayShowSelected: function (a) {
                return this.showsSelection() && a.isSelected()
            }, mayShowAnySelected: function (a) {
                return this.showsSelection() && a.anySelected()
            }, _addPropTooltip: function (a) {
                if (!this.pvMark.hasTooltip) {
                    var b = f.create(this.chart._tooltipOptions, f.get(a, "options"));
                    b.isLazy = f.get(a, "isLazy", true);
                    var c = f.get(a, "buildTooltip") || this._getTooltipFormatter(b);
                    if (c) {
                        b.isEnabled = this._isTooltipEnabled.bind(this);
                        (a = f.get(a, "tipsyEvent")) || (a = "mouseover");
                        this.pvMark.localProperty("tooltip").tooltip(this._createTooltipProp(c, b.isLazy)).title(f.fun.constant("")).ensureEvents().event(a, t.Behavior.tipsy(b)).hasTooltip = true
                    }
                }
            }, _getTooltipFormatter: function (a) {
                return this.panel._getTooltipFormatter(a)
            }, _isTooltipEnabled: function () {
                return this.panel._isTooltipEnabled()
            }, _createTooltipProp: function (a, b) {
                var c = this, d;
                d = b ? function (e) {
                    var g = c.context(e, true), h;
                    return function () {
                        if (g) {
                            h = a(g);
                            g = null
                        }
                        return h
                    }
                } : function (e) {
                    e =
                        c.context(e);
                    return a(e)
                };
                return function (e) {
                    if (e && !e.isIntermediate && e.showsTooltip())return d(e)
                }
            }, _addPropHoverable: function () {
                var a = this.panel;
                this.pvMark.ensureEvents().event("mouseover", function (b) {
                    if (b.hoverable() && !a.selectingByRubberband() && !a.animating()) {
                        b.setActive(true);
                        a.renderInteractive()
                    }
                }).event("mouseout", function (b) {
                    b.hoverable() && !a.selectingByRubberband() && !a.animating() && b.clearActive() && a.renderInteractive()
                })
            }, _ignoreClicks: 0, _propCursorClick: function (a) {
                a = this._ibits & a._ibits;
                var b = i.visual.Interactive;
                return a & b.HandlesClickEvent || a & b.DoubleClickable ? "pointer" : null
            }, _addPropClick: function () {
                var a = this;
                a.pvMark.cursor(a._propCursorClick.bind(a)).ensureEvents().event("click", a._handleClick.bind(a))
            }, _addPropDoubleClick: function () {
                var a = this;
                a.pvMark.cursor(a._propCursorClick.bind(a)).ensureEvents().event("dblclick", a._handleDoubleClick.bind(a))
            }, _handleClick: function () {
                var a = this, b = a.pvMark, c = b.instance().data;
                if (a.doubleClickable() && c.doubleClickable()) {
                    var d = b.scene,
                        e = b.index, g = t.event;
                    window.setTimeout(function () {
                        if (a._ignoreClicks)a._ignoreClicks--; else try {
                            t.event = g;
                            b.context(d, e, function () {
                                a._handleClickCore()
                            })
                        } catch (h) {
                            t.error(h)
                        } finally {
                            delete t.event
                        }
                    }, a.chart.options.doubleClickMaxDelay || 300)
                } else if (a._ignoreClicks)a._ignoreClicks--; else a._handleClickCore()
            }, _handleClickCore: function () {
                this._onClick(this.context())
            }, _handleDoubleClick: function () {
                var a = this, b = a.scene();
                if (b && b.doubleClickable()) {
                    a._ignoreClicks = 2;
                    a._onDoubleClick(a.context(b))
                }
            }, _onClick: function (a) {
                a.click()
            },
            _onDoubleClick: function (a) {
                a.doubleClick()
            }
        });
    f.type("pvc.visual.Panel", i.visual.Sign).init(function (a, b, c) {
        var d = f.get(c, "panel");
        if (!d) {
            d = f.get(c, "panelType") || t.Panel;
            d = b.add(d)
        }
        this.base(a, d, c)
    }).add({
        _addInteractive: function (a) {
            a = f.setDefaults(a, "noSelect", true, "noHover", true, "noTooltip", true, "noClick", true, "noDoubleClick", true);
            this.base(a)
        }
    });
    f.type("pvc.visual.Label", i.visual.Sign).init(function (a, b, c) {
        b = b.add(t.Label);
        this.base(a, b, c)
    }).add({
        _addInteractive: function (a) {
            a = f.setDefaults(a,
                "noSelect", true, "noHover", true, "noTooltip", true, "noClick", true, "noDoubleClick", true, "showsInteraction", false);
            this.base(a)
        }, defaultColor: f.fun.constant(t.Color.names.black)
    });
    f.type("pvc.visual.ValueLabel", i.visual.Label).init(function (a, b, c) {
        this.valuesFont = f.get(c, "valuesFont") || a.valuesFont;
        this.valuesMask = f.get(c, "valuesMask") || a.valuesMask;
        this.valuesOptimizeLegibility = f.get(c, "valuesOptimizeLegibility", a.valuesOptimizeLegibility);
        b = f.get(c, "noAnchor", false) ? b : b.anchor(a.valuesAnchor);
        if (c &&
            c.extensionId == null)c.extensionId = "label";
        this.base(a, b, c);
        this.pvMark.font(this.valuesFont);
        this._bindProperty("text", "text")._bindProperty("textStyle", "textColor", "color")
    }).prototype.property("text").property("textStyle").constructor.addStatic({
            maybeCreate: function (a, b, c) {
                return a.valuesVisible && a.valuesMask ? new i.visual.ValueLabel(a, b, c) : null
            }, isNeeded: function (a) {
                return a.valuesVisible && a.valuesMask
            }
        }).add({
            _addInteractive: function (a) {
                a = f.setDefaults(a, "showsInteraction", true, "noSelect", true,
                    "noTooltip", true, "noClick", true, "noDoubleClick", true, "noHover", true);
                this.base(a)
            }, defaultText: function (a) {
                var b = a.renderState, c = b.defaultText;
                return c != null ? c : (b.defaultText = a.format(this.valuesMask))
            }, normalText: function (a, b) {
                return this.trimText(a, b)
            }, interactiveText: function (a, b) {
                return this.showsActivity() && a.isActive ? b : this.trimText(a, b)
            }, trimText: function (a, b) {
                return b
            }, textColor: function (a) {
                return this.color(a, "text")
            }, backgroundColor: function (a, b) {
                var c = this.instanceState();
                if (!c)return this.calcBackgroundColor(a,
                    b);
                c = f.lazy(c, "cccBgColorCache");
                var d = f.getOwn(c, b);
                d || (d = c[b] = this.calcBackgroundColor(a, b));
                return d
            }, calcBackgroundColor: f.fun.constant(t.Color.names.white), optimizeLegibilityColor: function (a, b, c) {
                if (this.valuesOptimizeLegibility)return this.backgroundColor(a, c).isDark() === b.isDark() ? b.complementary().alpha(0.9) : b;
                return b
            }, normalColor: function (a, b, c) {
                return this.optimizeLegibilityColor(a, b, c)
            }, interactiveColor: function (a, b, c) {
                if (!this.mayShowActive(a) && this.mayShowNotAmongSelected(a))return this.dimColor(b,
                    c);
                return this.optimizeLegibilityColor(a, b, c)
            }
        });
    f.type("pvc.visual.Dot", i.visual.Sign).init(function (a, b, c) {
        b = b.add(t.Dot);
        var d = f.get(c, "proto");
        d && b.extend(d);
        c = f.setDefaults(c, "freeColor", false);
        this.base(a, b, c);
        if (!f.get(c, "freePosition", false)) {
            c = a.isOrientationVertical() ? "left" : "bottom";
            a = a.anchorOrtho(c);
            this._lockDynamic(c, "x")._lockDynamic(a, "y")
        }
        this._bindProperty("shape", "shape")._bindProperty("shapeRadius", "radius")._bindProperty("shapeSize", "size");
        this.optional("strokeDasharray", undefined).optional("lineWidth",
            1.5)
    }).prototype.property("size").property("shape").constructor.add({
            y: f.fun.constant(0), x: f.fun.constant(0), radius: function () {
                this.instanceState().cccRadius = this.delegateExtension()
            }, baseSize: function (a) {
                var b = this.instanceState().cccRadius;
                return b != null ? f.sqr(b) : this.base(a)
            }, defaultSize: f.fun.constant(12), interactiveSize: function (a, b) {
                return this.mayShowActive(a, true) ? Math.max(b, 5) * 2.5 : b
            }, interactiveColor: function (a, b, c) {
                if (this.mayShowActive(a, true)) {
                    if (c === "stroke")return b.brighter(1)
                } else if (this.mayShowNotAmongSelected(a)) {
                    if (this.mayShowActive(a))return b.alpha(0.8);
                    switch (c) {
                        case "fill":
                            return this.dimColor(b, c);
                        case "stroke":
                            return b.alpha(0.45)
                    }
                }
                return this.base(a, b, c)
            }
        });
    f.type("pvc.visual.DotSizeColor", i.visual.Dot).init(function (a, b, c) {
        this.base(a, b, c);
        var d = this.compatVersion() <= 1;
        this._bindProperty("lineWidth", "strokeWidth").intercept("visible", function (g) {
            if (!this.canShow(g))return false;
            var h = this.delegateExtension();
            if (h == null)h = d || this.defaultVisible(g);
            return h
        });
        this._initColor();
        this._initSize();
        if (this.isSizeBound)if (a.axes.size.scaleUsesAbs()) {
            this.isSizeAbs =
                true;
            var e = this._sceneDefColor;
            this._sceneDefColor = function (g, h) {
                return h === "stroke" && g.vars.size.value < 0 ? t.Color.names.black : e.call(this, g, h)
            };
            this.pvMark.lineCap("round").strokeDasharray(function (g) {
                return g.vars.size.value < 0 ? "dash" : null
            })
        }
    }).prototype.property("strokeWidth").constructor.add({
            isColorBound: false, isColorDiscrete: false, isSizeBound: false, isSizeAbs: false, canShow: function (a) {
                return !a.isIntermediate
            }, defaultVisible: function (a) {
                return !a.isNull && (!this.isSizeBound && !this.isColorBound || this.isSizeBound &&
                    a.vars.size.value != null || this.isColorBound && (this.isColorDiscrete || a.vars.color.value != null))
            }, _initColor: function () {
                var a, b, c = this.panel, d = c.visualRoles.color;
                if (d) {
                    this.isColorDiscrete = d.isDiscrete();
                    c = c.axes.color;
                    if (d.isBound()) {
                        this.isColorBound = true;
                        b = c.sceneScale({sceneVarName: "color"})
                    } else if (c)a = c.option("Unbound")
                }
                b || (b = f.fun.constant(a || i.defaultColor));
                this._sceneDefColor = b
            }, _initSize: function () {
                var a = this.panel, b = a.plot, c = b.option("Shape"), d = b.option("NullShape");
                b = a.visualRoles.size;
                var e, g;
                if (b) {
                    var h = (a = a.axes.size) && a.scale;
                    if (h && b.isBound()) {
                        this.isSizeBound = true;
                        var j = h.min + (h.max - h.min) * 0.05;
                        this.nullSizeShapeHasStrokeOnly = d === "cross";
                        g = function (k) {
                            return k.vars.size.value != null ? c : d
                        };
                        e = function (k) {
                            k = k.vars.size.value;
                            return k != null ? h(k) : d ? j : 0
                        }
                    }
                }
                if (!e) {
                    g = f.fun.constant(c);
                    e = function (k) {
                        return this.base(k)
                    }
                }
                this._sceneDefSize = e;
                this._sceneDefShape = g
            }, defaultColor: function (a, b) {
                return this._sceneDefColor(a, b)
            }, normalColor: function (a, b, c) {
                return c === "stroke" ? b.darker() : this.base(a,
                    b, c)
            }, interactiveColor: function (a, b, c) {
                if (this.mayShowActive(a, true))switch (c) {
                    case "fill":
                        return this.isSizeBound ? b.alpha(0.75) : b;
                    case "stroke":
                        return b.darker()
                } else if (this.showsSelection()) {
                    var d = a.isSelected();
                    if (!d && a.anySelected()) {
                        if (this.mayShowActive(a))return b.alpha(0.8);
                        switch (c) {
                            case "fill":
                                return this.dimColor(b, c);
                            case "stroke":
                                return b.alpha(0.45)
                        }
                    }
                    if (d && za(b)) {
                        if (c === "stroke")b = b.darker(3);
                        return b.darker(2)
                    }
                }
                if (c === "stroke")return b.darker();
                return b
            }, defaultSize: function (a) {
                return this._sceneDefSize(a)
            },
            defaultShape: function (a) {
                return this._sceneDefShape(a)
            }, interactiveSize: function (a, b) {
                if (!this.mayShowActive(a, true))return b;
                a = Math.sqrt(b);
                b = Math.max(1, Math.min(1.1 * a, 2));
                return f.sqr(a + b)
            }, defaultStrokeWidth: function (a) {
                return this.nullSizeShapeHasStrokeOnly && a.vars.size.value == null ? 1.8 : 1
            }, interactiveStrokeWidth: function (a, b) {
                return this.mayShowActive(a, true) ? 2 * b : this.mayShowSelected(a) ? 1.5 * b : b
            }
        });
    t.LineInterm = function () {
        t.Line.call(this)
    };
    t.LineInterm.prototype = t.extend(t.Line);
    t.LineInterm.prototype.getNearestInstanceToMouse =
        function (a, b) {
            b = t.Line.prototype.getNearestInstanceToMouse.call(this, a, b);
            var c = a[b];
            c && c.data && c.data.isIntermediate && b + 1 < a.length && b++;
            return b
        };
    f.type("pvc.visual.Line", i.visual.Sign).init(function (a, b, c) {
        b = b.add(t.LineInterm);
        this.base(a, b, c);
        this.lock("segmented", "smart").lock("antialias", true);
        if (!f.get(c, "freePosition", false)) {
            c = a.isOrientationVertical() ? "left" : "bottom";
            this._lockDynamic(a.anchorOrtho(c), "y")._lockDynamic(c, "x")
        }
        this._bindProperty("strokeStyle", "strokeColor", "color")._bindProperty("lineWidth",
            "strokeWidth")
    }).prototype.property("strokeWidth").constructor.add({
            _addInteractive: function (a) {
                a = f.setDefaults(a, "noTooltip", true);
                this.base(a)
            }, y: f.fun.constant(0), x: f.fun.constant(0), defaultStrokeWidth: f.fun.constant(1.5), interactiveStrokeWidth: function (a, b) {
                return this.mayShowActive(a) ? Math.max(1, b) * 2.5 : b
            }, interactiveColor: function (a, b, c) {
                if (this.mayShowNotAmongSelected(a))return this.mayShowActive(a) ? t.Color.names.darkgray.darker().darker() : this.dimColor(b, c);
                return this.base(a, b, c)
            }
        });
    t.AreaInterm =
        function () {
            t.Area.call(this)
        };
    t.AreaInterm.prototype = t.extend(t.Area);
    t.AreaInterm.prototype.getNearestInstanceToMouse = function (a, b) {
        b = t.Area.prototype.getNearestInstanceToMouse.call(this, a, b);
        var c = a[b];
        c && c.data && c.data.isIntermediate && b + 1 < a.length && b++;
        return b
    };
    f.type("pvc.visual.Area", i.visual.Sign).init(function (a, b, c) {
        b = b.add(t.AreaInterm);
        c || (c = {});
        c.freeColor = true;
        this.base(a, b, c);
        b = f.get(c, "antialias", true);
        this.lock("segmented", "smart").lock("antialias", b);
        if (!f.get(c, "freePosition", false)) {
            c =
                a.isOrientationVertical() ? "left" : "bottom";
            b = a.anchorOrtho(c);
            a = a.anchorOrthoLength(b);
            this._lockDynamic(c, "x")._lockDynamic(b, "y")._lockDynamic(a, "dy")
        }
        this._bindProperty("fillStyle", "fillColor", "color");
        this.lock("strokeStyle", null).lock("lineWidth", 0)
    }).add({
        _addInteractive: function (a) {
            a = f.setDefaults(a, "noTooltip", true);
            this.base(a)
        }, y: f.fun.constant(0), x: f.fun.constant(0), dy: f.fun.constant(0), interactiveColor: function (a, b, c) {
            if (c === "fill" && this.mayShowNotAmongSelected(a))return this.dimColor(b,
                c);
            return this.base(a, b, c)
        }
    });
    f.type("pvc.visual.Bar", i.visual.Sign).init(function (a, b, c) {
        b = b.add(t.Bar);
        c = f.setDefaults(c, "freeColor", false);
        this.base(a, b, c);
        this.normalStroke = f.get(c, "normalStroke", false);
        this._bindProperty("lineWidth", "strokeWidth")
    }).prototype.property("strokeWidth").constructor.add({
        normalColor: function (a, b, c) {
            if (c === "stroke" && !this.normalStroke)return null;
            return b
        }, interactiveColor: function (a, b, c) {
            if (c === "stroke") {
                if (this.mayShowActive(a, true))return b.brighter(1.3).alpha(0.7);
                if (!this.normalStroke)return null;
                if (this.mayShowNotAmongSelected(a)) {
                    if (this.mayShowActive(a))return t.Color.names.darkgray.darker().darker();
                    return this.dimColor(b, c)
                }
                if (this.mayShowActive(a))return b.brighter(1).alpha(0.7)
            } else if (c === "fill") {
                if (this.mayShowActive(a, true))return b.brighter(0.2).alpha(0.8);
                if (this.mayShowNotAmongSelected(a)) {
                    if (this.mayShowActive(a))return t.Color.names.darkgray.darker(2).alpha(0.8);
                    return this.dimColor(b, c)
                }
                if (this.mayShowActive(a))return b.brighter(0.2).alpha(0.8)
            }
            return this.base(a,
                b, c)
        }, defaultStrokeWidth: function () {
            return 0.5
        }, interactiveStrokeWidth: function (a, b) {
            if (this.mayShowActive(a, true))return Math.max(1, b) * 1.3;
            return b
        }
    });
    t.PieSlice = function () {
        t.Wedge.call(this)
    };
    t.PieSlice.prototype = t.extend(t.Wedge).property("offsetRadius");
    t.PieSlice.prototype.midAngle = function () {
        var a = this.instance();
        return a.startAngle + a.angle / 2
    };
    t.PieSlice.prototype.defaults = (new t.PieSlice).extend(t.Wedge.prototype.defaults).offsetRadius(0);
    f.type("pvc.visual.PieSlice", i.visual.Sign).init(function (a,
                                                                b, c) {
        b = b.add(t.PieSlice);
        c = f.setDefaults(c, "freeColor", false);
        this.base(a, b, c);
        this._activeOffsetRadius = f.get(c, "activeOffsetRadius", 0);
        this._maxOffsetRadius = f.get(c, "maxOffsetRadius", 0);
        this._resolvePctRadius = f.get(c, "resolvePctRadius");
        this._center = f.get(c, "center");
        this.optional("lineWidth", 0.6)._bindProperty("angle", "angle")._bindProperty("offsetRadius", "offsetRadius")._lockDynamic("bottom", "y")._lockDynamic("left", "x").lock("top", null).lock("right", null)
    }).prototype.property("offsetRadius").constructor.add({
            angle: f.fun.constant(0),
            x: function () {
                return this._center.x + this._offsetSlice("cos")
            }, y: function () {
                return this._center.y - this._offsetSlice("sin")
            }, _offsetSlice: function (a) {
                var b = this.pvMark.offsetRadius() || 0;
                if (b)b *= Math[a](this.pvMark.midAngle());
                return b
            }, defaultColor: function (a, b) {
                return b === "stroke" ? null : this.base(a, b)
            }, interactiveColor: function (a, b, c) {
                if (this.mayShowActive(a, true))switch (c) {
                    case "fill":
                        return b.brighter(0.2).alpha(0.8);
                    case "stroke":
                        return b.brighter(1.3).alpha(0.7)
                } else if (this.mayShowNotAmongSelected(a))if (c ===
                    "fill")return this.dimColor(b, c);
                return this.base(a, b, c)
            }, offsetRadius: function (a) {
                a = this.base(a);
                return Math.min(Math.max(0, a), this._maxOffsetRadius)
            }, baseOffsetRadius: function (a) {
                a = this.base(a) || 0;
                return this._resolvePctRadius(L.parse(a))
            }, interactiveOffsetRadius: function (a, b) {
                return b + (this.mayShowActive(a, true) ? this._activeOffsetRadius : 0)
            }
        });
    f.type("pvc.visual.Rule", i.visual.Sign).init(function (a, b, c) {
        b = b.add(t.Rule);
        var d = f.get(c, "proto");
        d && b.extend(d);
        this.base(a, b, c);
        f.get(c, "freeStyle") ||
        this._bindProperty("strokeStyle", "strokeColor", "color")._bindProperty("lineWidth", "strokeWidth")
    }).prototype.property("strokeWidth").constructor.add({
            _addInteractive: function (a) {
                a = f.setDefaults(a, "noHover", true, "noSelect", true, "noTooltip", true, "noClick", true, "noDoubleClick", true, "showsInteraction", false);
                this.base(a)
            }, defaultStrokeWidth: f.fun.constant(1), interactiveStrokeWidth: function (a, b) {
                if (this.mayShowActive(a, true))return Math.max(1, b) * 2.2;
                return b
            }, interactiveColor: function (a, b, c) {
                if (a.datum && !this.mayShowActive(a, true) && this.mayShowNotAmongSelected(a))return this.dimColor(b, c);
                return this.base(a, b, c)
            }
        });
    f.type("pvc.visual.OptionsBase").init(function (a, b, c, d) {
        this.chart = a;
        this.type = b;
        this.index = c == null ? 0 : c;
        this.name = f.get(d, "name");
        this.id = this._buildId();
        this.optionId = this._buildOptionId();
        this._registerResolversFull(this._resolvers = [], d);
        this.option = i.options(this._getOptionsDefinition(), this)
    }).add({
        _buildId: function () {
            return i.buildIndexedId(this.type, this.index)
        }, _buildOptionId: function () {
            return this.id
        },
        _chartOption: function (a) {
            return this.chart.options[a]
        }, _getOptionsDefinition: f.method({isAbstract: true}), _registerResolversFull: function (a, b) {
            var c = f.get(b, "fixed");
            if (c) {
                this._fixed = c;
                a.push(i.options.specify(function (d) {
                    return c[d.name]
                }))
            }
            this._registerResolversNormal(a, b);
            if (b = f.get(b, "defaults"))this._defaults = b;
            a.push(this._resolveDefault)
        }, _registerResolversNormal: function (a, b) {
            f.get(b, "byV1", true) && this.chart.compatVersion() <= 1 && a.push(this._resolveByV1OnlyLogic);
            this.name && a.push(i.options.specify(function (c) {
                return this._chartOption(this.name +
                f.firstUpperCase(c.name))
            }));
            a.push(this._resolveByOptionId);
            f.get(b, "byNaked", !this.index) && a.push(this._resolveByNaked)
        }, _resolveFull: function (a) {
            for (var b = this._resolvers, c = 0, d = b.length; c < d; c++)if (b[c].call(this, a))return true;
            return false
        }, _resolveFixed: i.options.specify(function (a) {
            if (this._fixed)return this._fixed[a.name]
        }), _resolveByV1OnlyLogic: function (a) {
            var b = a.data, c;
            if (b && (c = b.resolveV1))return c.call(this, a)
        }, _resolveByName: i.options.specify(function (a) {
            if (this.name)return this._chartOption(this.name +
            f.firstUpperCase(a.name))
        }), _resolveByOptionId: i.options.specify(function (a) {
            return this._chartOption(this.optionId + f.firstUpperCase(a.name))
        }), _resolveByNaked: i.options.specify(function (a) {
            if (!this.index)return this._chartOption(f.firstLowerCase(a.name))
        }), _resolveDefault: function (a) {
            var b = a.data, c;
            if (b && (c = b.resolveDefault))if (c.call(this, a))return true;
            if (this._defaults) {
                b = this._defaults[a.name];
                if (b !== undefined) {
                    a.defaultValue(b);
                    return true
                }
            }
        }, _specifyChartOption: function (a, b) {
            b = this._chartOption(b);
            if (b != null) {
                a.specify(b);
                return true
            }
        }
    });
    f.type("pvc.visual.MultiChart", i.visual.OptionsBase).init(function (a) {
        this.base(a, "multiChart", 0, {byV1: false, byNaked: false})
    }).add({
        _getOptionsDefinition: function () {
            return i.visual.MultiChart.optionsDef
        }
    }).addStatic({
        optionsDef: {
            Max: {resolve: "_resolveFull", cast: i.castPositiveNumber, value: Infinity},
            ColumnsMax: {resolve: "_resolveFull", cast: i.castPositiveNumber, value: 3},
            SingleRowFillsHeight: {resolve: "_resolveFull", cast: Boolean, value: true},
            SingleColFillsHeight: {
                resolve: "_resolveFull",
                cast: Boolean, value: true
            },
            Overflow: {resolve: "_resolveFull", cast: i.parseMultiChartOverflow, value: "grow"}
        }
    });
    f.type("pvc.visual.SmallChart", i.visual.OptionsBase).init(function (a) {
        this.base(a, "small", 0, {byV1: false, byNaked: false})
    }).add({
        _getOptionsDefinition: function () {
            return i.visual.SmallChart.optionsDef
        }
    }).addStatic({
        optionsDef: {
            Width: {resolve: "_resolveFull", cast: L.parse, value: null},
            Height: {resolve: "_resolveFull", cast: L.parse, value: null},
            AspectRatio: {
                resolve: "_resolveFull", cast: i.castPositiveNumber,
                getDefault: function () {
                    if (this.chart instanceof i.PieChart)return 10 / 7;
                    return 1.25
                }
            },
            Margins: {resolve: "_resolveFull", cast: E.as, value: new E(new L(0.02))},
            Paddings: {resolve: "_resolveFull", cast: E.as, value: 0}
        }
    });
    var la = f.type("pvc.visual.Axis", i.visual.OptionsBase).init(function (a, b, c, d) {
            this.base(a, b, c, d);
            a._addAxis(this)
        }).add({
            scaleTreatsNullAs: function () {
                return "null"
            }, scaleNullRangeValue: function () {
                return null
            }, scaleUsesAbs: f.retFalse, scaleSumNormalized: f.retFalse, domainVisibleOnly: f.retTrue, domainIgnoreNulls: f.retFalse,
            domainGroupOperator: function () {
                return "flatten"
            }, domainItemValueProp: function () {
                return "value"
            }, bind: function (a) {
                var b = this;
                a || f.fail.argumentRequired("dataCells");
                !b.dataCells || f.fail.operationInvalid("Axis is already bound.");
                b.dataCells = f.array.to(a);
                b.dataCell = b.dataCells[0];
                b.role = b.dataCell && b.dataCell.role;
                b.scaleType = Sa(b.role.grouping);
                b._domainData = null;
                b._domainValues = null;
                b._domainItems = null;
                b._checkRoleCompatibility();
                return this
            }, domainData: function () {
                this.isBound() || f.fail.operationInvalid("Axis is not bound.");
                var a = this._domainData;
                if (!a)this._domainData = a = this._createDomainData(this.chart.partData(this.dataCells.map(Mb)));
                return a
            }, domainCellData: function (a) {
                var b = this.dataCells;
                if (b.length === 1)return this.domainData();
                return this._createDomainData(this.chart.partData(b[a].dataPartValue))
            }, domainCellItems: function (a) {
                if (this.dataCells.length === 1)return this.domainItems();
                return this._selectDomainItems(typeof a === "number" ? this.domainCellData(a) : a).array()
            }, domainValues: function () {
                var a = this._domainValues;
                if (!a) {
                    this._calcDomainItems();
                    a = this._domainValues
                }
                return a
            }, domainItems: function () {
                var a = this._domainItems;
                if (!a) {
                    this._calcDomainItems();
                    a = this._domainItems
                }
                return a
            }, domainItemValue: function (a) {
                return f.nullyTo(a[this.domainItemValueProp()], "")
            }, isDiscrete: function () {
                return !!this.role && this.role.isDiscrete()
            }, isBound: function () {
                return !!this.role
            }, setScale: function (a, b) {
                this.isBound() || f.fail.operationInvalid("Axis is not bound.");
                this.scale = a ? b ? a : this._wrapScale(a) : null;
                return this
            }, _wrapScale: function (a) {
                a.type =
                    this.scaleType;
                var b;
                if (a.type !== "discrete") {
                    b = this.scaleUsesAbs();
                    var c = this.scaleTreatsNullAs();
                    if (c && c !== "null") {
                        var d = c === "min";
                        b = b ? function (g) {
                            return a(g == null ? d ? a.domain()[0] : 0 : g < 0 ? -g : g)
                        } : function (g) {
                            return a(g == null ? d ? a.domain()[0] : 0 : g)
                        }
                    } else {
                        var e = this.scaleNullRangeValue();
                        b = b ? function (g) {
                            return g == null ? e : a(g < 0 ? -g : g)
                        } : function (g) {
                            return g == null ? e : a(g)
                        }
                    }
                } else b = function (g) {
                    return a(g == null ? "" : g)
                };
                return f.copy(b, a)
            }, sceneScale: function (a) {
                var b = f.get(a, "sceneVarName") || this.role.name, c = this.role.grouping;
                if (c.isSingleDimension && c.firstDimensionValueType() === Number) {
                    var d = this.scale, e = f.get(a, "nullToZero", true);
                    a = function (g) {
                        g = g.vars[b].value;
                        if (g == null) {
                            if (!e)return g;
                            g = 0
                        }
                        return d(g)
                    };
                    f.copy(a, d);
                    return a
                }
                return this.scale.by1(function (g) {
                    return g.vars[b].value
                })
            }, _checkRoleCompatibility: function () {
                var a = this.dataCells.length;
                if (a > 1) {
                    var b = this._getBoundRoleGrouping(this.role), c, d;
                    if (this.scaleType === "discrete")for (d = 1; d < a; d++) {
                        c = this._getBoundRoleGrouping(this.dataCells[d].role);
                        if (b.id !== c.id)throw f.error.operationInvalid("Discrete roles on the same axis must have equal groupings.");
                    } else {
                        if (!b.firstDimensionType().isComparable)throw f.error.operationInvalid("Continuous roles on the same axis must have 'comparable' groupings.");
                        for (d = 1; d < a; d++) {
                            c = this._getBoundRoleGrouping(this.dataCells[d].role);
                            if (this.scaleType !== Sa(c))throw f.error.operationInvalid("Continuous roles on the same axis must have scales of the same type.");
                        }
                    }
                }
            }, _getBoundRoleGrouping: function (a) {
                var b = a.grouping;
                if (!b)throw f.error.operationInvalid("Axis' role '" + a.name + "' is unbound.");
                return b
            }, _createDomainData: function (a) {
                var b =
                {visible: this.domainVisibleOnly() ? true : null, isNull: this.chart.options.ignoreNulls || this.domainIgnoreNulls() ? false : null};
                return this.role[this.domainGroupOperator()](a, b)
            }, _selectDomainItems: function (a) {
                return a.children()
            }, _calcDomainItems: function () {
                var a = f.hasOwnProp, b = {}, c = [], d = [];
                this.domainItemValueProp();
                this._selectDomainItems(this.domainData()).each(function (e) {
                    var g = this.domainItemValue(e);
                    if (!a.call(b, g)) {
                        b[g] = 1;
                        c.push(g);
                        d.push(e)
                    }
                }, this);
                this._domainItems = d;
                this._domainValues = c
            }, _getOptionsDefinition: function () {
                return Z
            }
        }),
        Z = {}, da = f.type("pvc.visual.CartesianAxis", la).init(function (a, b, c, d) {
            this.orientation = da.getOrientation(b, a.options.orientation);
            this.orientedId = da.getOrientedId(this.orientation, c);
            if (a._allowV1SecondAxis && c === 1)this.v1SecondOrientedId = "second" + this.orientation.toUpperCase();
            this.base(a, b, c, d);
            a = this.extensionPrefixes = [this.id + "Axis", this.orientedId + "Axis"];
            this.v1SecondOrientedId && a.push(this.v1SecondOrientedId + "Axis");
            this._extPrefAxisPosition = a.length;
            a.push("axis")
        }).add({
            bind: function (a) {
                this.base(a);
                this._syncExtensionPrefixes();
                return this
            }, _syncExtensionPrefixes: function () {
                var a = this.extensionPrefixes;
                a.length = this._extPrefAxisPosition;
                var b = this.scaleType;
                if (b) {
                    a.push(b + "Axis");
                    b !== "discrete" && a.push("continuousAxis")
                }
                a.push("axis")
            }, setScale: function (a) {
                var b = this.scale;
                this.base(a);
                if (b) {
                    delete this.domain;
                    delete this.ticks;
                    delete this._roundingPaddings
                }
                if (a)if (!a.isNull && this.scaleType !== "discrete") {
                    this.domain = a.domain();
                    this.domain.minLocked = !!a.minLocked;
                    this.domain.maxLocked = !!a.maxLocked;
                    this.option("DomainRoundMode") === "nice" && a.nice();
                    (b = this.option("TickFormatter")) && a.tickFormatter(b)
                }
                return this
            }, setTicks: function (a) {
                var b = this.scale;
                b && !b.isNull || f.fail.operationInvalid("Scale must be set and non-null.");
                this.ticks = a;
                if (b.type !== "discrete" && this.option("DomainRoundMode") === "tick") {
                    delete this._roundingPaddings;
                    (b = a && a.length) ? this.scale.domain(a[0], a[b - 1]) : this.scale.domain(this.domain[0], this.domain[1])
                }
            }, setScaleRange: function (a) {
                var b = this.scale;
                b.min = 0;
                b.max = a;
                b.size = a;
                if (b.type === "discrete") {
                    if (b.domain().length > 0)b.splitBandedCenter(b.min, b.max, this.chart.options.panelSizeRatio || 0.8)
                } else b.range(b.min, b.max);
                return b
            }, getScaleRoundingPaddings: function () {
                var a = this._roundingPaddings;
                if (!a) {
                    a = {begin: 0, end: 0, beginLocked: false, endLocked: false};
                    var b = this.scale;
                    if (b && !b.isNull && b.type !== "discrete") {
                        var c = this.domain;
                        a.beginLocked = c.minLocked;
                        a.endLocked = c.maxLocked;
                        if (b.type === "numeric" && this.option("DomainRoundMode") !== "none") {
                            b = b.domain();
                            c = this.domain || f.assert("Original domain must be set");
                            var d = b[1] - b[0];
                            if (d) {
                                var e = c[0] - b[0];
                                if (e > 0)a.begin = e / d;
                                e = b[1] - c[1];
                                if (e > 0)a.end = e / d
                            }
                        }
                    }
                    this._roundingPaddings = a
                }
                return a
            }, calcContinuousTicks: function (a) {
                if (a == null)a = this.option("DesiredTickCount");
                return this.scale.ticks(a, {
                    roundInside: this.option("DomainRoundMode") !== "tick",
                    numberExponentMin: this.option("TickExponentMin"),
                    numberExponentMax: this.option("TickExponentMax")
                })
            }, _getOptionsDefinition: function () {
                return Sb
            }, _buildOptionId: function () {
                return this.id + "Axis"
            }, _registerResolversNormal: function (a) {
                this.chart.compatVersion() <=
                1 && a.push(this._resolveByV1OnlyLogic);
                a.push(this._resolveByOptionId, this._resolveByOrientedId);
                this.index === 1 && a.push(this._resolveByV1OptionId);
                a.push(this._resolveByScaleType, this._resolveByCommonId)
            }, _resolveByOrientedId: i.options.specify(function (a) {
                return this._chartOption(this.orientedId + "Axis" + a.name)
            }), _resolveByV1OptionId: i.options.specify(function (a) {
                return this._chartOption("secondAxis" + a.name)
            }), _resolveByScaleType: i.options.specify(function (a) {
                var b = this.scaleType;
                if (b) {
                    a = a.name;
                    var c =
                        this._chartOption(b + "Axis" + a);
                    if (c === undefined && b !== "discrete")c = this._chartOption("continuousAxis" + a);
                    return c
                }
            }), _resolveByCommonId: i.options.specify(function (a) {
                return this._chartOption("axis" + a.name)
            })
        });
    da.getOrientation = function (a, b) {
        return a === "base" === (b === "vertical") ? "x" : "y"
    };
    da.getOrientedId = function (a, b) {
        if (b === 0)return a;
        return a + (b + 1)
    };
    var Y = {
            resolve: "_resolveFull", data: {
                resolveV1: function (a) {
                    !this.index && this.type === "ortho" && this._specifyChartOption(a, this.id + a.name);
                    return true
                }
            }
        },
        aa = {
            resolveV1: function (a) {
                if (this.index) {
                    if (this._resolveByV1OptionId(a))return true
                } else if (this._resolveByOrientedId(a))return true;
                this._resolveDefault(a);
                return true
            }
        }, Tb = i.options.defaultValue(function () {
            if (!this.typeIndex)return this.orientation === "x" ? "bottom" : "left";
            var a = this.chart.axesByType[this.type].first.option("Position");
            return i.BasePanel.oppositeAnchor[a]
        }), Sb = f.create(Z, {
            Visible: {
                resolve: "_resolveFull", data: {
                    resolveV1: function (a) {
                        if (this.index <= 1) {
                            var b = this.index === 0 ? f.firstUpperCase(this.orientation) :
                                "Second";
                            this._specifyChartOption(a, "show" + b + "Scale")
                        }
                        return true
                    }
                }, cast: Boolean, value: true
            },
            Composite: {
                resolve: function (a) {
                    if (this.index > 0) {
                        a.specify(false);
                        return true
                    }
                    return this._resolveFull(a)
                }, data: {
                    resolveV1: function (a) {
                        this._specifyChartOption(a, "useCompositeAxis");
                        return true
                    }
                }, cast: Boolean, value: false
            },
            Size: {resolve: "_resolveFull", data: aa, cast: Ta},
            SizeMax: {resolve: "_resolveFull", cast: Ta},
            Position: {resolve: "_resolveFull", data: {resolveV1: aa.resolveV1, resolveDefault: Tb}, cast: Hb},
            FixedMin: Y,
            FixedMax: Y,
            OriginIsZero: {
                resolve: "_resolveFull", data: {
                    resolveV1: function (a) {
                        switch (this.index) {
                            case 0:
                                this._specifyChartOption(a, "originIsZero");
                                break;
                            case 1:
                                this.chart._allowV1SecondAxis && this._specifyChartOption(a, "secondAxisOriginIsZero");
                                break
                        }
                        return true
                    }
                }, cast: Boolean, value: true
            },
            DomainScope: {resolve: "_resolveFull", cast: Gb, value: "global"},
            Offset: {
                resolve: "_resolveFull", data: {
                    resolveV1: function (a) {
                        switch (this.index) {
                            case 0:
                                this._specifyChartOption(a, "axisOffset");
                                break;
                            case 1:
                                if (this.chart._allowV1SecondAxis) {
                                    this._specifyChartOption(a,
                                        "secondAxisOffset");
                                    break
                                }
                                break
                        }
                        return true
                    }
                }, cast: i.castNumber
            },
            LabelSpacingMin: {resolve: "_resolveFull", cast: i.castNumber},
            OverlappedLabelsMode: {resolve: "_resolveFull", cast: i.parseOverlappedLabelsMode, value: "rotatethenhide"},
            Grid: {
                resolve: "_resolveFull", data: {
                    resolveV1: function (a) {
                        this.index || this._specifyChartOption(a, this.orientation + "AxisFullGrid");
                        return true
                    }
                }, cast: Boolean, value: false
            },
            GridCrossesMargin: {resolve: "_resolveFull", cast: Boolean, value: true},
            EndLine: {resolve: "_resolveFull", cast: Boolean},
            ZeroLine: {resolve: "_resolveFull", cast: Boolean, value: true},
            RuleCrossesMargin: {resolve: "_resolveFull", cast: Boolean, value: true},
            Ticks: {resolve: "_resolveFull", cast: Boolean},
            DesiredTickCount: {
                resolve: "_resolveFull", data: {
                    resolveV1: aa.resolveV1, resolveDefault: function (a) {
                        if (this.chart.compatVersion() <= 1) {
                            a.defaultValue(5);
                            return true
                        }
                    }
                }, cast: i.castNumber
            },
            MinorTicks: {resolve: "_resolveFull", data: aa, cast: Boolean, value: true},
            TickFormatter: {resolve: "_resolveFull", cast: f.fun.as},
            DomainRoundMode: {
                resolve: "_resolveFull",
                data: {
                    resolveV1: aa.resolveV1, resolveDefault: function (a) {
                        if (this.chart.compatVersion() <= 1) {
                            a.defaultValue("none");
                            return true
                        }
                    }
                }, cast: i.parseDomainRoundingMode, value: "tick"
            },
            TickExponentMin: {resolve: "_resolveFull", cast: i.castNumber},
            TickExponentMax: {resolve: "_resolveFull", cast: i.castNumber},
            Title: {resolve: "_resolveFull", cast: String},
            TitleSize: {resolve: "_resolveFull", cast: Ua},
            TitleSizeMax: {resolve: "_resolveFull", cast: Ua},
            TitleFont: {resolve: "_resolveFull", cast: String},
            TitleMargins: {
                resolve: "_resolveFull",
                cast: E.as
            },
            TitlePaddings: {resolve: "_resolveFull", cast: E.as},
            TitleAlign: {
                resolve: "_resolveFull", cast: function (a) {
                    var b = this.option("Position");
                    return i.parseAlign(b, a)
                }
            },
            Font: {resolve: "_resolveFull", cast: String},
            ClickAction: {resolve: "_resolveFull", data: aa},
            DoubleClickAction: {resolve: "_resolveFull", data: aa},
            TooltipEnabled: {resolve: "_resolveFull", cast: Boolean, value: true},
            TooltipFormat: {resolve: "_resolveFull", cast: f.fun.as, value: null},
            TooltipAutoContent: {
                resolve: "_resolveFull", cast: i.parseTooltipAutoContent,
                value: "value"
            }
        });
    f.type("pvc.visual.CartesianAxisRootScene", i.visual.Scene);
    f.type("pvc.visual.CartesianAxisTickScene", i.visual.Scene).init(function (a, b) {
        this.base(a, b);
        this.vars.tick = new I(f.get(b, "tick"), f.get(b, "tickLabel"), f.get(b, "tickRaw"));
        if (f.get(b, "isHidden"))this.isHidden = true
    }).add({isHidden: false});
    f.type("pvc.visual.CartesianFocusWindow", i.visual.OptionsBase).init(function (a) {
        this.base(a, "focusWindow", 0, {byNaked: false});
        this.base = new i.visual.CartesianFocusWindowAxis(this, a.axes.base)
    }).add({
        _getOptionsDefinition: function () {
            return Ub
        },
        _exportData: function () {
            return {base: f.copyProps(this.base, i.visual.CartesianFocusWindow.props)}
        }, _importData: function (a) {
            a = a.base;
            this.base.option.specify({Begin: a.begin, End: a.end, Length: a.length})
        }, _initFromOptions: function () {
            this.base._initFromOptions()
        }, _onAxisChanged: function () {
            var a = this.option("Changed");
            a && a.call(this.chart.basePanel.context())
        }
    });
    var Ub = f.create(Z, {Changed: {resolve: "_resolveFull", cast: f.fun.as}});
    f.type("pvc.visual.CartesianFocusWindowAxis", i.visual.OptionsBase).init(function (a,
                                                                                       b) {
        this.window = a;
        this.axis = b;
        this.isDiscrete = b.isDiscrete();
        this.base(b.chart, "focusWindow" + f.firstUpperCase(b.type), 0, {byNaked: false})
    }).addStatic({props: ["begin", "end", "length"]}).add({
        _getOptionsDefinition: function () {
            return Vb
        }, _initFromOptions: function () {
            var a = this.option;
            this.set({begin: a("Begin"), end: a("End"), length: a("Length")})
        }, set: function (a) {
            var b = this, c = f.get(a, "render"), d = f.get(a, "select", true), e, g, h;
            if (a = b._readArgs(a)) {
                e = a.begin;
                g = a.end;
                h = a.length
            } else if (this.begin != null && this.end !=
                null && this.length != null)return;
            a = b.axis;
            var j = a.scale, k = b.isDiscrete;
            a = !k ? a.role.firstDimensionType().cast : null;
            j = j.domain();
            var m;
            if (k) {
                k = j.length;
                var l, n;
                if (e != null) {
                    a = +e;
                    if (!isNaN(a))if (a === Infinity) {
                        l = k - 1;
                        e = j[l]
                    } else if (a === -Infinity) {
                        l = 0;
                        e = j[l]
                    }
                    if (l == null) {
                        l = j.indexOf("" + e);
                        if (l < 0) {
                            l = 0;
                            e = j[l]
                        }
                    }
                }
                if (g != null) {
                    a = +g;
                    if (!isNaN(a))if (a === Infinity) {
                        n = k - 1;
                        g = j[n]
                    } else if (a === -Infinity) {
                        n = 0;
                        g = j[n]
                    }
                    if (n == null) {
                        n = j.indexOf("" + g);
                        if (n < 0) {
                            n = k - 1;
                            g = j[n]
                        }
                    }
                }
                if (h != null) {
                    h = +h;
                    if (isNaN(h))h = null; else if (h < 0 && (e !=
                        null || g != null)) {
                        m = e;
                        a = l;
                        e = g;
                        l = n;
                        g = m;
                        n = a;
                        h = -h
                    }
                }
                if (e != null)if (g != null) {
                    if (l > n) {
                        m = e;
                        a = l;
                        e = g;
                        l = n;
                        g = m;
                        n = a
                    }
                    h = n - l + 1
                } else {
                    if (h == null)h = k - l;
                    n = l + h - 1;
                    if (n > k - 1) {
                        n = k - 1;
                        h = n - l + 1
                    }
                    g = j[n]
                } else if (g != null) {
                    if (h == null)h = n;
                    l = n - h + 1;
                    if (l < 0) {
                        l = 0;
                        h = n - l + 1
                    }
                    e = j[l]
                } else {
                    if (h == null)h = Math.max(~~(k / 3), 1);
                    if (h > k) {
                        h = k;
                        l = 0;
                        n = k - 1
                    } else {
                        a = ~~(k / 2);
                        l = a - ~~(h / 2);
                        n = l + h - 1
                    }
                    e = j[l];
                    g = j[n]
                }
            } else {
                if (h != null) {
                    h = +h;
                    if (isNaN(h))h = null; else if (h < 0 && (e != null || g != null)) {
                        m = e;
                        e = g;
                        g = m;
                        h = -h
                    }
                }
                l = j[0];
                n = j[1];
                k = n - l;
                if (e != null) {
                    if (e < l)e = l;
                    if (e > n)e = n
                }
                if (g != null) {
                    if (g <
                        l)g = l;
                    if (g > n)g = n
                }
                if (e != null)if (g != null) {
                    if (e > g) {
                        m = e;
                        e = g;
                        g = m
                    }
                    h = g - e
                } else {
                    if (h == null)h = n - e;
                    g = e + h;
                    if (g > n) {
                        g = n;
                        h = g - e
                    }
                } else if (g != null) {
                    if (h == null)h = g - l;
                    e = g - h;
                    if (e < l) {
                        e = l;
                        h = g - e
                    }
                } else {
                    if (h == null)h = Math.max(~~(k / 3), 1);
                    if (h > k) {
                        h = k;
                        e = l;
                        g = n
                    } else {
                        m = ~~(k / 2);
                        e = m - ~~(h / 2);
                        g = +e + +h
                    }
                }
                e = a(e);
                g = a(g);
                h = a(h);
                if (j = b.option("Constraint")) {
                    g = {type: "new", target: "begin", value: e, length: h, length0: h, min: l, max: n, minView: l, maxView: n};
                    j(g);
                    e = a(g.value);
                    h = a(g.length);
                    g = a(+e + +h)
                }
            }
            b._set(e, g, h, d, c)
        }, _updatePosition: function (a, b, c,
                                      d) {
            var e = this, g = e.axis.scale;
            if (e.isDiscrete) {
                e = g.invertIndex(a);
                b = g.invertIndex(b) - 1;
                g = g.domain();
                a = g[e];
                g = g[b];
                e = b - e + 1
            } else {
                a = g.invert(a);
                g = g.invert(b);
                e = g - a
            }
            this._set(a, g, e, c, d)
        }, _constraintPosition: function (a) {
            var b = this, c = b.axis, d = c.scale;
            if (b.isDiscrete) {
                c = Math.floor(d.invertIndex(a.point, true));
                if (c >= 0) {
                    b = d.range();
                    d = d.domain().length;
                    b = (b.max - b.min) / d;
                    if (c >= d && (a.type === "new" || a.type === "resize-begin"))c = d - 1;
                    a.point = c * b
                }
            } else if (b = b.option("Constraint")) {
                var e = c.role.firstDimensionType().cast,
                    g = e(d.invert(a.point));
                c = a.target === "begin" ? 1 : -1;
                var h = e(d.invert(a.point + c * a.length));
                h = e(c * (h - g));
                var j, k;
                if (a.length === a.length0)j = h; else {
                    k = a.point + c * a.length0;
                    k = e(d.invert(k));
                    j = c * (k - g)
                }
                k = e(d.invert(a.min));
                var m = e(d.invert(a.max));
                e = {
                    type: a.type,
                    target: a.target,
                    value: g,
                    length: h,
                    length0: j,
                    min: k,
                    max: m,
                    minView: e(d.invert(a.minView)),
                    maxView: e(d.invert(a.maxView))
                };
                b(e);
                if (+e.value !== +g) {
                    g = e.value;
                    a.point = d(g)
                }
                b = e.length;
                if (+b !== +h)if (+b === +j)a.length = a.length0; else {
                    b = d(+g + c * +b);
                    a.length = b - c * a.point
                }
                if (+e.min !== +k)a.min = d(e.min);
                if (+e.max !== +m)a.max = d(e.max)
            }
        }, _compare: function (a, b) {
            return this.isDiscrete ? "" + a === "" + b : +a === +b
        }, _set: function (a, b, c, d, e) {
            var g = this, h = false;
            if (!g._compare(a, g.begin)) {
                g.begin = a;
                h = true
            }
            if (!g._compare(b, g.end)) {
                g.end = b;
                h = true
            }
            if (!g._compare(c, g.length)) {
                g.length = c;
                h = true
            }
            h && g.window._onAxisChanged(this);
            d && g._updateSelection({render: e});
            return h
        }, _readArgs: function (a) {
            if (a) {
                var b = {}, c = 0;
                i.visual.CartesianFocusWindowAxis.props.forEach(function (d) {
                    var e = a[d];
                    if (e != null)c = true; else e =
                        this[d];
                    b[d] = e
                }, this);
                if (c)return b
            }
        }, _updateSelection: function (a) {
            var b = this, c, d = b.axis, e = d.isDiscrete(), g = d.chart, h = d.dataCell;
            d = h.role;
            h = g.partData(h.dataPartValue);
            var j;
            if (e) {
                j = d.flatten(h);
                d = j.child(b.begin);
                e = j.child(b.end);
                if (d && e) {
                    c = d.childIndex();
                    e = e.childIndex();
                    c = f.range(c, e - c + 1).select(function (m) {
                        return j.childNodes[m]
                    }).selectMany(f.propGet("_datums")).where(ja).distinct(f.propGet("key"))
                }
            } else {
                j = h;
                var k = d.firstDimensionName();
                c = f.query(h._datums).where(ja).where(function (m) {
                    m = m.atoms[k].value;
                    return m != null && m >= b.begin && m <= b.end
                })
            }
            if (c) {
                g.data.replaceSelected(c);
                g.root.updateSelections(a)
            }
        }
    });
    var Vb = f.create(Z, {
        Resizable: {resolve: "_resolveFull", cast: Boolean, value: true},
        Movable: {resolve: "_resolveFull", cast: Boolean, value: true},
        Begin: {resolve: "_resolveFull"},
        End: {resolve: "_resolveFull"},
        Length: {resolve: "_resolveFull"},
        Constraint: {resolve: "_resolveFull", cast: f.fun.as}
    });
    f.type("pvc.visual.ColorAxis", la).add({
        scaleNullRangeValue: function () {
            return this.option("Missing") || null
        }, scaleUsesAbs: function () {
            return this.option("UseAbs")
        },
        domainVisibleOnly: function () {
            return this.scaleType !== "discrete"
        }, bind: function (a) {
            this.base(a);
            this._legendGroupScene = null;
            this._plotList = f.query(a).select(function (b) {
                return b.plot
            }).distinct(function (b) {
                return b && b.id
            }).array();
            return this
        }, _wrapScale: function (a) {
            if (this.scaleType === "discrete" ? this.option.isSpecified("Transform") || !this.option.isSpecified("Colors") && !this.option.isSpecified("Map") : true) {
                var b = this.option("Transform");
                if (b)a = a.transform(b)
            }
            return this.base(a)
        }, scheme: function () {
            return f.lazy(this,
                "_scheme", this._createScheme, this)
        }, _createColorMapFilter: function (a) {
            var b = f.uniqueIndex(a, function (c) {
                return c.key
            });
            return {
                domain: function (c) {
                    return !f.hasOwn(a, c)
                }, color: function (c) {
                    return !f.hasOwn(b, c.key)
                }
            }
        }, _getBaseScheme: function () {
            return this.option("Colors")
        }, _createScheme: function () {
            var a = this, b = a._getBaseScheme();
            if (a.scaleType !== "discrete")return function () {
                var e = b.apply(null, arguments);
                return a._wrapScale(e)
            };
            var c = a.option("Map");
            if (!c)return function () {
                var e = b.apply(null, arguments);
                return a._wrapScale(e)
            };
            var d = this._createColorMapFilter(c);
            return function (e) {
                var g;
                e instanceof Array || (e = f.array.copy(arguments));
                e = e.filter(d.domain);
                var h = b(e), j = h.range().filter(d.color);
                h.range(j);
                g = function (l) {
                    return f.getOwn(c, l) || h(l)
                };
                f.copy(g, h);
                var k, m;
                g.domain = function () {
                    if (arguments.length)throw f.operationInvalid("The scale cannot be modified.");
                    k || (k = f.array.append(f.ownKeys(c), e));
                    return k
                };
                g.range = function () {
                    if (arguments.length)throw f.operationInvalid("The scale cannot be modified.");
                    m || (m = f.array.append(f.own(c), j));
                    return m
                };
                return a._wrapScale(g)
            }
        }, sceneScale: function (a) {
            var b = f.get(a, "sceneVarName") || this.role.name, c = this.scalesByCateg;
            if (c) {
                var d = this.option("Missing");
                return function (e) {
                    var g = e.vars[b].value;
                    if (g == null)return d;
                    return c[e.group.parent.absKey](g)
                }
            }
            return this.scale.by1(function (e) {
                return e && e.vars[b].value
            })
        }, _buildOptionId: function () {
            return this.id + "Axis"
        }, _getOptionsDefinition: function () {
            return Wb
        }, _resolveByNaked: i.options.specify(function (a) {
            if (!this.index)return this._chartOption(this.id +
            f.firstUpperCase(a.name))
        }), _specifyV1ChartOption: function (a, b) {
            if (!this.index && this.chart.compatVersion() <= 1 && this._specifyChartOption(a, b))return true
        }
    });
    Y = {
        resolveDefault: function (a) {
            if (!this.index && this._specifyChartOption(a, f.firstLowerCase(a.name)))return true
        }
    };
    var va, Wb = f.create(Z, {
        Colors: {
            resolve: "_resolveFull", getDefault: Jb, data: {
                resolveV1: function (a) {
                    if (this.scaleType === "discrete")if (this.index === 0)this._specifyChartOption(a, "colors"); else this.index === 1 && this.chart._allowV1SecondAxis &&
                    this._specifyChartOption(a, "secondAxisColor"); else this._specifyChartOption(a, "colorRange");
                    return true
                }, resolveDefault: function (a) {
                    this.index === 0 && this._specifyChartOption(a, "colors")
                }
            }, cast: i.colorScheme
        },
        Map: {resolve: "_resolveFull", cast: Ib},
        Transform: {
            resolve: "_resolveFull", data: {
                resolveDefault: function (a) {
                    var b = this._plotList;
                    if (b.length <= 2)if (f.query(b).all(function (c) {
                            c = c.name;
                            return c === "plot2" || c === "trend"
                        })) {
                        a.defaultValue(i.brighterColorTransform);
                        return true
                    }
                }
            }, cast: f.fun.to
        },
        NormByCategory: {
            resolve: function (a) {
                if (!this.chart._allowColorPerCategory) {
                    a.specify(false);
                    return true
                }
                return this._resolveFull(a)
            }, data: {
                resolveV1: function (a) {
                    this._specifyV1ChartOption(a, "normPerBaseCategory");
                    return true
                }
            }, cast: Boolean, value: false
        },
        ScaleType: {
            resolve: "_resolveFull", data: {
                resolveV1: function (a) {
                    this._specifyV1ChartOption(a, "scalingType");
                    return true
                }
            }, cast: i.parseContinuousColorScaleType, value: "linear"
        },
        UseAbs: {resolve: "_resolveFull", cast: Boolean, value: false},
        Domain: {
            resolve: "_resolveFull", data: {
                resolveV1: function (a) {
                    this._specifyV1ChartOption(a, "colorRangeInterval");
                    return true
                }
            }, cast: f.array.to
        },
        Min: {
            resolve: "_resolveFull", data: {
                resolveV1: function (a) {
                    this._specifyV1ChartOption(a, "minColor");
                    return true
                }
            }, cast: t.color
        },
        Max: {
            resolve: "_resolveFull", data: {
                resolveV1: function (a) {
                    this._specifyV1ChartOption(a, "maxColor");
                    return true
                }
            }, cast: t.color
        },
        Missing: {
            resolve: "_resolveFull", data: {
                resolveV1: function (a) {
                    this._specifyV1ChartOption(a, "nullColor");
                    return true
                }
            }, cast: t.color, value: t.color("lightgray")
        },
        Unbound: {
            resolve: "_resolveFull", getDefault: function () {
                return this.option("Colors")().range()[0] ||
                    i.defaultColor
            }, cast: t.color
        },
        LegendVisible: {resolve: "_resolveFull", data: Y, cast: Boolean, value: true},
        LegendClickMode: {resolve: "_resolveFull", data: Y, cast: i.parseLegendClickMode, value: "togglevisible"},
        LegendDrawLine: {resolve: "_resolveFull", data: Y, cast: Boolean, value: false},
        LegendDrawMarker: {resolve: "_resolveFull", data: Y, cast: Boolean, value: true},
        LegendShape: {resolve: "_resolveFull", data: Y, cast: i.parseShape}
    });
    f.type("pvc.visual.SizeAxis", la).init(function (a, b, c, d) {
        d = f.set(d, "byNaked", false);
        this.base(a,
            b, c, d)
    }).add({
        _buildOptionId: function () {
            return this.id + "Axis"
        }, scaleTreatsNullAs: function () {
            return "min"
        }, scaleUsesAbs: function () {
            return this.option("UseAbs")
        }, setScaleRange: function (a) {
            var b = this.scale;
            b.min = a.min;
            b.max = a.max;
            b.size = a.max - a.min;
            b.range(b.min, b.max);
            i.debug >= 4 && i.log("Scale: " + i.stringify(f.copyOwn(b)));
            return this
        }, _getOptionsDefinition: function () {
            return Xb
        }
    });
    var Xb = f.create(Z, {
        OriginIsZero: {resolve: "_resolveFull", cast: Boolean, value: false}, FixedMin: {resolve: "_resolveFull", cast: i.castNumber},
        FixedMax: {resolve: "_resolveFull", cast: i.castNumber}, UseAbs: {resolve: "_resolveFull", cast: Boolean, value: false}
    });
    f.type("pvc.visual.AngleAxis", la).init(function (a, b, c, d) {
        d = f.set(d, "byNaked", false);
        this.base(a, b, c, d)
    }).add({
        _buildOptionId: function () {
            return this.id + "Axis"
        }, scaleTreatsNullAs: function () {
            return "zero"
        }, scaleUsesAbs: function () {
            return this.option("UseAbs")
        }, scaleSumNormalized: f.retTrue, setScale: function (a, b) {
            this.base(a, b);
            this.scale.range(0, 2 * Math.PI);
            return this
        }, _getOptionsDefinition: function () {
            return Yb
        }
    });
    var Yb = f.create(Z, {OriginIsZero: {value: true}, UseAbs: {resolve: "_resolveFull", cast: Boolean, value: false}});
    f.type("pvc.visual.Legend", i.visual.OptionsBase).init(function (a, b, c, d) {
        d = f.set(d, "byNaked", false);
        this.base(a, b, c, d)
    }).add({
        _getOptionsDefinition: function () {
            return Zb
        }
    });
    var Zb = {
        Position: {resolve: "_resolveFull", cast: i.parsePosition, value: "bottom"},
        Size: {resolve: "_resolveFull", cast: Va},
        SizeMax: {resolve: "_resolveFull", cast: Va},
        Align: {
            resolve: "_resolveFull", data: {
                resolveDefault: function (a) {
                    var b =
                        this.option("Position"), c;
                    if (b !== "top" && b !== "bottom")c = "top"; else if (this.chart.compatVersion() <= 1)c = "left";
                    a.defaultValue(c);
                    return true
                }
            }, cast: Kb
        },
        Margins: {
            resolve: "_resolveFull", data: {
                resolveDefault: function (a) {
                    if (this.chart.compatVersion() > 1) {
                        var b = this.option("Position");
                        b = f.set({}, i.BasePanel.oppositeAnchor[b], 5);
                        a.defaultValue(b)
                    }
                    return true
                }
            }, cast: E.as
        },
        Paddings: {resolve: "_resolveFull", cast: E.as, value: 5},
        Font: {resolve: "_resolveFull", cast: String},
        ItemSize: {resolve: "_resolveFull", cast: Lb}
    };
    f.type("pvc.visual.legend.BulletRootScene", i.visual.Scene).init(function (a, b) {
        this.base(a, b);
        this._unresolvedMarkerDiam = f.get(b, "markerSize");
        this._unresolvedItemPadding = new E(f.get(b, "itemPadding", 5));
        this._unresolvedItemSize = M.to(f.get(b, "itemSize")) || new M;
        f.set(this.vars, "horizontal", f.get(b, "horizontal", false), "font", f.get(b, "font"), "textMargin", f.get(b, "textMargin", 6) - 3)
    }).add({
        layout: function (a) {
            function b(r) {
                var s = r.labelTextSize(), u = !s || !s.width || !s.height;
                r.isHidden = u;
                if (!u) {
                    u = {
                        width: k +
                        s.width, height: Math.max(s.height, j)
                    };
                    var A = {
                        width: g.width || e.width + u.width,
                        height: g.height || e.height + u.height
                    }, x = {width: Math.max(0, A.width - e.width), height: Math.max(0, A.height - e.height)}, y;
                    if (o)y = !o.items.length; else {
                        o = new i.visual.legend.BulletItemSceneSection(0);
                        y = true
                    }
                    var w = o.size[m] + x[m];
                    y || (w += e[m]);
                    if (!y && w > n) {
                        c(false);
                        w = x[m]
                    }
                    y = o.size;
                    y[m] = w;
                    y[l] = Math.max(y[l], x[l]);
                    w = o.items.length;
                    o.items.push(r);
                    f.set(r.vars, "section", o, "sectionIndex", w, "textSize", s, "itemSize", A, "itemClientSize", x, "itemContentSize",
                        u)
                }
            }

            function c(r) {
                var s = o.size;
                q[l] += s[l];
                if (p.length)q[l] += e[l];
                q[m] = Math.max(q[m], s[m]);
                p.push(o);
                r || (o = new i.visual.legend.BulletItemSceneSection(p.length))
            }

            var d = a.clientSize;
            if (!(d.width > 0 && d.height > 0))return new M(0, 0);
            a = a.desiredClientSize;
            var e = this._unresolvedItemPadding.resolve(d), g = this._unresolvedItemSize.resolve({
                width: d.width + e.width,
                height: d.height + e.height
            }), h = {
                width: g.width && Math.max(0, g.width - e.width),
                height: g.height && Math.max(0, g.height - e.height)
            }, j = this._unresolvedMarkerDiam ||
                h.height || 15;
            this.vars.itemPadding = e;
            this.vars.desiredItemSize = g;
            this.vars.desiredItemClientSize = h;
            this.vars.markerSize = j;
            var k = j + this.vars.textMargin;
            h = Math.max(0, Math.min(h.width || Infinity, a.width || Infinity, d.width) - k);
            var m = this.vars.horizontal ? "width" : "height", l = i.BasePanel.oppositeLength[m], n = a[m];
            if (!n || n < 0)n = d[m];
            var o, p = [], q = {width: 0, height: 0};
            this.childNodes.forEach(function (r) {
                r.childNodes.forEach(b, this)
            }, this);
            if (!o)return new M(0, 0);
            c(true);
            f.set(this.vars, "sections", p, "contentSize",
                q, "labelWidthMax", h);
            h = this.compatVersion() <= 1 ? n : q[m];
            a = a[l];
            if (!a || a < 0)a = q[l];
            return this.vars.size = f.set({}, m, Math.min(h, d[m]), l, Math.min(a, d[l]))
        }, defaultGroupSceneType: function () {
            var a = this._bulletGroupType;
            if (!a)this._bulletGroupType = a = f.type(i.visual.legend.BulletGroupScene);
            return a
        }, createGroup: function (a) {
            return new (this.defaultGroupSceneType())(this, a)
        }
    });
    f.type("pvc.visual.legend.BulletItemSceneSection").init(function (a) {
        this.index = a;
        this.items = [];
        this.size = {width: 0, height: 0}
    });
    f.type("pvc.visual.legend.BulletGroupScene",
        i.visual.Scene).init(function (a, b) {
            this.base(a, b);
            this.extensionPrefix = f.get(b, "extensionPrefix") || "";
            this._renderer = f.get(b, "renderer");
            this.colorAxis = f.get(b, "colorAxis");
            this.clickMode = f.get(b, "clickMode");
            if (!this.clickMode && this.colorAxis)this.clickMode = this.colorAxis.option("LegendClickMode")
        }).add({
            hasRenderer: function () {
                return !!this._renderer
            }, renderer: function (a) {
                if (a != null)this._renderer = a; else {
                    a = this._renderer;
                    if (!a) {
                        var b;
                        if (a = this.colorAxis)b = {
                            drawRule: a.option("LegendDrawLine"), drawMarker: a.option("LegendDrawMarker"),
                            markerShape: a.option("LegendShape")
                        };
                        this._renderer = a = new i.visual.legend.BulletItemDefaultRenderer(b)
                    }
                }
                return a
            }, itemSceneType: function () {
                var a = this._itemSceneType;
                if (!a) {
                    a = f.type(i.visual.legend.BulletItemScene);
                    switch (this.clickMode) {
                        case "toggleselected":
                            a.add(i.visual.legend.BulletItemSceneSelection);
                            break;
                        case "togglevisible":
                            a.add(i.visual.legend.BulletItemSceneVisibility);
                            break
                    }
                    var b = this.panel();
                    b._extendSceneType("item", a, ["isOn", "executable", "execute", "value", "labelText"]);
                    var c = i.makeExtensionAbsId(i.makeExtensionAbsId("ItemScene",
                        [this.extensionPrefix, "$"]), b._getExtensionPrefix());
                    b = b.chart._getExtension(c, "value");
                    b !== undefined && a.prototype.variable("value", b);
                    this._itemSceneType = a
                }
                return a
            }, createItem: function (a) {
                return new (this.itemSceneType())(this, a)
            }
        });
    f.type("pvc.visual.legend.BulletItemScene", i.visual.Scene).init(function () {
        this.base.apply(this, arguments);
        if (!this.executable()) {
            var a = i.visual.Interactive;
            this._ibits = a.Interactive | a.ShowsInteraction | a.Hoverable | a.SelectableAny
        }
    }).add({
        isOn: f.fun.constant(true), executable: f.fun.constant(false),
        execute: f.fun.constant(), labelText: function () {
            return this.value().label
        }, labelTextSize: function () {
            return t.Text.measure(this.labelText(), this.vars.font)
        }, _valueEval: function () {
            var a = this._valueEvalCore();
            a instanceof I || (a = new I(a, a));
            return a
        }, _valueEvalCore: function () {
            var a, b, c, d, e = this.group || this.datum;
            if (e) {
                a = e.value;
                b = e.rawValue;
                d = this._getTrendLineSuffix(e);
                c = e.ensureLabel() + d;
                d = e.absLabel ? e.absLabel + d : c
            }
            return new I(a || null, c || "", b, d)
        }, _getTrendLineSuffix: function (a) {
            var b, c;
            if ((b = a.firstDatum()) &&
                (c = b.trend))return " (" + c.label + ")";
            return ""
        }
    }).prototype.variable("value");
    f.type("pvc.visual.legend.BulletItemSceneSelection").add({
        isOn: function () {
            return !(this.group || this.datum).owner.selectedCount() || this.isSelected()
        }, executable: function () {
            return this.chart().selectableByClick()
        }, execute: function () {
            var a = this.datums().array();
            if (a.length) {
                var b = this.chart();
                b._updatingSelections(function () {
                    (a = b._onUserSelection(a)) && a.length && i.data.Data.toggleSelected(a, true)
                })
            }
        }
    });
    f.type("pvc.visual.legend.BulletItemSceneVisibility").add({
        isOn: function () {
            return this.datums().any(function (a) {
                return !a.isNull &&
                    a.isVisible
            })
        }, executable: f.fun.constant(true), execute: function () {
            i.data.Data.toggleVisible(this.datums()) && this.chart().render(true, true, false)
        }
    });
    f.type("pvc.visual.legend.BulletItemRenderer");
    f.type("pvc.visual.legend.BulletItemDefaultRenderer", i.visual.legend.BulletItemRenderer).init(function (a) {
        if (this.drawRule = f.get(a, "drawRule", false))this.rulePvProto = f.get(a, "rulePvProto");
        if (this.drawMarker = !this.drawRule || f.get(a, "drawMarker", true)) {
            this.markerShape = f.get(a, "markerShape", "square");
            this.markerPvProto =
                f.get(a, "markerPvProto")
        }
    }).add({
        drawRule: false, drawMarker: true, markerShape: null, rulePvProto: null, markerPvProto: null, create: function (a, b, c, d) {
            var e = {}, g = this.drawRule, h = function (m) {
                return m.color
            };
            if (g) {
                var j = (new Q).left(0).top(function () {
                    return this.parent.height() / 2
                }).width(function () {
                    return this.parent.width()
                }).lineWidth(1, i.extensionTag).strokeStyle(h, i.extensionTag), k = this.rulePvProto;
                if (k)j = k.extend(j);
                e.pvRule = (new i.visual.Rule(a, b, {
                    proto: j, noSelect: false, noHover: false, activeSeriesAware: false,
                    extensionId: c + "Rule", showsInteraction: true, wrapper: d
                })).pvMark
            }
            if (this.drawMarker) {
                g = (new Q).left(function () {
                    return this.parent.width() / 2
                }).top(function () {
                    return this.parent.height() / 2
                }).shapeSize(function () {
                    return this.parent.width()
                }, i.extensionTag).lineWidth(2, i.extensionTag).fillStyle(h, i.extensionTag).strokeStyle(h, i.extensionTag).shape(this.markerShape, i.extensionTag).angle(g ? 0 : Math.PI / 2, i.extensionTag).antialias(function () {
                        var m = Math.abs(Math.cos(this.angle()));
                        if (m !== 0 && m !== 1)switch (this.shape()) {
                            case "square":
                            case "bar":
                                return false
                        }
                        return true
                    },
                    i.extensionTag);
                if (h = this.markerPvProto)g = h.extend(g);
                e.pvDot = (new i.visual.Dot(a, b, {
                    proto: g,
                    freePosition: true,
                    activeSeriesAware: false,
                    noTooltip: true,
                    noClick: true,
                    extensionId: c + "Dot",
                    wrapper: d
                })).pvMark
            }
            return e
        }
    });
    f.type("pvc.visual.DataCell").init(function (a, b, c, d, e) {
        this.plot = a;
        this.axisType = b;
        this.axisIndex = c;
        this.role = a.chart.visualRoles[d] || f.fail.argumentInvalid("roleName", "Role is not defined.");
        this.dataPartValue = e
    });
    f.type("pvc.visual.ColorDataCell", i.visual.DataCell).init(function (a, b,
                                                                         c, d, e) {
        this.base(a, b, c, d, e);
        this._legendGroupScene = null
    }).add({
        legendGroupScene: function (a) {
            if (arguments.length) {
                this._legendGroupScene = a;
                return this
            }
            return this._legendGroupScene
        }
    });
    f.type("pvc.visual.Plot", i.visual.OptionsBase).init(function (a, b) {
        var c = f.getPath(a, ["plotsByType", this.type]);
        c = c ? c.length : 0;
        b = f.set(b, "byNaked", !a.plotList.length);
        this.base(a, this.type, c, b);
        a._addPlot(this);
        a = this.extensionPrefixes = [this.id];
        this.globalIndex || a.push("");
        this.name && a.push(this.name)
    }).add({
        _getOptionsDefinition: function () {
            return i.visual.Plot.optionsDef
        },
        _resolveByNaked: i.options.specify(function (a) {
            if (!this.globalIndex)return this._chartOption(f.firstLowerCase(a.name))
        }), collectDataCells: function (a) {
            var b = this._getColorDataCell();
            b && a.push(b)
        }, _getColorDataCell: function () {
            var a = this.option("ColorRole");
            if (a)return new i.visual.ColorDataCell(this, "color", this.option("ColorAxis") - 1, a, this.option("DataPart"))
        }
    });
    i.visual.Plot.optionsDef = {
        Orientation: {
            resolve: function (a) {
                a.specify(this._chartOption("orientation") || "vertical");
                return true
            }, cast: String
        },
        ValuesVisible: {
            resolve: "_resolveFull", data: {
                resolveV1: function (a) {
                    if (this.globalIndex === 0) {
                        var b = this._chartOption("showValues");
                        if (b !== undefined)a.specify(b); else {
                            b = this.type !== "point";
                            a.defaultValue(b)
                        }
                        return true
                    }
                }
            }, cast: Boolean, value: false
        },
        ValuesAnchor: {resolve: "_resolveFull", cast: i.parseAnchor},
        ValuesFont: {resolve: "_resolveFull", cast: String, value: "10px sans-serif"},
        ValuesMask: {resolve: "_resolveFull", cast: String, value: "{value}"},
        ValuesOptimizeLegibility: {resolve: "_resolveFull", cast: Boolean, value: false},
        DataPart: {resolve: "_resolveFixed", cast: String, value: "0"},
        ColorRole: {resolve: "_resolveFixed", cast: String, value: "color"},
        ColorAxis: {
            resolve: i.options.resolvers([function (a) {
                if (this.globalIndex === 0) {
                    a.specify(1);
                    return true
                }
            }, "_resolveFull"]), cast: function (a) {
                a = i.castNumber(a);
                return a = a != null ? f.between(a, 1, 10) : 1
            }, value: 1
        }
    };
    f.type("pvc.visual.CartesianOrthoDataCell", i.visual.DataCell).init(function (a, b, c, d, e, g, h, j) {
        this.base(a, b, c, d, e);
        this.isStacked = g;
        this.nullInterpolationMode = h;
        this.trend = j
    });
    f.type("pvc.visual.CartesianPlot",
        i.visual.Plot).add({
            collectDataCells: function (a) {
                this.base(a);
                a.push(new i.visual.DataCell(this, "base", this.option("BaseAxis") - 1, this.option("BaseRole"), this.option("DataPart")));
                var b = f.array.to(this.option("OrthoRole")), c = this.option("DataPart"), d = this.option("OrthoAxis") - 1, e = this.option.isDefined("Stacked") ? this.option("Stacked") : undefined, g = this.option("NullInterpolationMode"), h = this.option("Trend");
                b.forEach(function (j) {
                    a.push(new i.visual.CartesianOrthoDataCell(this, "ortho", d, j, c, e, g, h))
                }, this)
            },
            _getOptionsDefinition: function () {
                return i.visual.CartesianPlot.optionsDef
            }
        });
    i.visual.CartesianPlot.optionsDef = f.create(i.visual.Plot.optionsDef, {
        BaseAxis: {value: 1},
        BaseRole: {resolve: "_resolveFixed", cast: String},
        OrthoAxis: {
            resolve: function (a) {
                if (this.globalIndex === 0) {
                    a.specify(1);
                    return true
                }
                return this._resolveFull(a)
            }, data: {
                resolveV1: function (a) {
                    this.name === "plot2" && this.chart._allowV1SecondAxis && this._chartOption("secondAxisIndependentScale") && a.specify(2);
                    return true
                }
            }, cast: function (a) {
                a = i.castNumber(a);
                return a != null ? f.between(a, 1, 10) : 1
            }, value: 1
        },
        OrthoRole: {resolve: i.options.resolvers(["_resolveFixed", "_resolveDefault"])},
        Trend: {
            resolve: "_resolveFull", data: {
                resolveDefault: function (a) {
                    var b = this.option("TrendType");
                    if (b) {
                        a.defaultValue({type: b});
                        return true
                    }
                }
            }, cast: Nb
        },
        TrendType: {resolve: "_resolveFull", cast: i.parseTrendType},
        TrendLabel: {resolve: "_resolveFull", cast: String},
        NullInterpolationMode: {resolve: "_resolveFull", cast: i.parseNullInterpolationMode, value: "none"}
    });
    f.type("pvc.visual.CategoricalPlot",
        i.visual.CartesianPlot).add({
            _getOptionsDefinition: function () {
                return i.visual.CategoricalPlot.optionsDef
            }
        });
    i.visual.CategoricalPlot.optionsDef = f.create(i.visual.CartesianPlot.optionsDef, {
        Stacked: {
            resolve: "_resolveFull",
            cast: Boolean,
            value: false
        }, BaseRole: {value: "category"}, OrthoRole: {value: "value"}
    });
    f.type("pvc.visual.BarPlotAbstract", i.visual.CategoricalPlot).add({
        _getOptionsDefinition: function () {
            return i.visual.BarPlotAbstract.optionsDef
        }
    });
    i.visual.BarPlotAbstract.optionsDef = f.create(i.visual.CategoricalPlot.optionsDef,
        {
            BarSizeRatio: {
                resolve: "_resolveFull", cast: function (a) {
                    a = i.castNumber(a);
                    if (a == null)a = 1; else if (a < 0.05)a = 0.05; else if (a > 1)a = 1;
                    return a
                }, value: 0.9
            }, BarSizeMax: {
            resolve: "_resolveFull", data: {
                resolveV1: function (a) {
                    this._specifyChartOption(a, "maxBarSize");
                    return true
                }
            }, cast: function (a) {
                a = i.castNumber(a);
                if (a == null)a = Infinity; else if (a < 1)a = 1;
                return a
            }, value: 2E3
        }, BarStackedMargin: {
            resolve: "_resolveFull", cast: function (a) {
                a = i.castNumber(a);
                if (a != null && a < 0)a = 0;
                return a
            }, value: 0
        }, OverflowMarkersVisible: {
            resolve: "_resolveFull",
            cast: Boolean, value: true
        }, ValuesAnchor: {value: "center"}
        });
    f.type("pvc.visual.BarPlot", i.visual.BarPlotAbstract).add({type: "bar"});
    f.type("pvc.visual.NormalizedBarPlot", i.visual.BarPlotAbstract).add({
        type: "bar", _getOptionsDefinition: function () {
            return i.visual.NormalizedBarPlot.optionsDef
        }
    });
    i.visual.NormalizedBarPlot.optionsDef = f.create(i.visual.BarPlotAbstract.optionsDef, {Stacked: {resolve: null, value: true}});
    f.type("pvc.visual.WaterfallPlot", i.visual.BarPlotAbstract).add({
        type: "water", _getOptionsDefinition: function () {
            return i.visual.WaterfallPlot.optionsDef
        }
    });
    i.visual.WaterfallPlot.optionsDef = f.create(i.visual.BarPlotAbstract.optionsDef, {
        Stacked: {resolve: null, value: true},
        TotalLineLabel: {resolve: "_resolveFull", cast: String, value: "Accumulated"},
        TotalValuesVisible: {
            resolve: "_resolveFull", data: {
                resolveDefault: function (a) {
                    a.defaultValue(this.option("ValuesVisible"));
                    return true
                }
            }, cast: Boolean
        },
        Direction: {resolve: "_resolveFull", cast: i.parseWaterDirection, value: "down"},
        AreasVisible: {resolve: "_resolveFull", cast: Boolean, value: true},
        AllCategoryLabel: {
            resolve: "_resolveFull",
            cast: String, value: "All"
        }
    });
    f.type("pvc.visual.PointPlot", i.visual.CategoricalPlot).add({
        type: "point", _getOptionsDefinition: function () {
            return i.visual.PointPlot.optionsDef
        }
    });
    i.visual.PointPlot.optionsDef = f.create(i.visual.CategoricalPlot.optionsDef, {
        DotsVisible: {resolve: "_resolveFull", data: wa("Dots", true), cast: Boolean, value: false},
        LinesVisible: {resolve: "_resolveFull", data: wa("Lines", true), cast: Boolean, value: false},
        AreasVisible: {resolve: "_resolveFull", data: wa("Areas", false), cast: Boolean, value: false},
        ValuesAnchor: {value: "right"}
    });
    f.type("pvc.visual.MetricXYPlot", i.visual.CartesianPlot).add({
        _getOptionsDefinition: function () {
            return i.visual.MetricXYPlot.optionsDef
        }
    });
    i.visual.MetricXYPlot.optionsDef = f.create(i.visual.CartesianPlot.optionsDef, {
        BaseRole: {value: "x"},
        OrthoAxis: {resolve: null},
        OrthoRole: {value: "y"}
    });
    f.type("pvc.visual.MetricPointPlot", i.visual.MetricXYPlot).add({
        type: "scatter", collectDataCells: function (a) {
            this.base(a);
            if (this.option("DotsVisible")) {
                var b = this.chart.visualRole(this.option("SizeRole"));
                b.isBound() && a.push(new i.visual.DataCell(this, "size", this.option("SizeAxis") - 1, b.name, this.option("DataPart")))
            }
        }, _getOptionsDefinition: function () {
            return i.visual.MetricPointPlot.optionsDef
        }
    });
    i.visual.MetricPointPlot.optionsDef = f.create(i.visual.MetricXYPlot.optionsDef, {
        SizeRole: {resolve: "_resolveFixed", value: "size"},
        SizeAxis: {resolve: "_resolveFixed", value: 1},
        Shape: {resolve: "_resolveFull", cast: i.parseShape, value: "circle"},
        NullShape: {resolve: "_resolveFull", cast: i.parseShape, value: "cross"},
        DotsVisible: {
            resolve: "_resolveFull",
            data: Wa("Dots"), cast: Boolean, value: false
        },
        LinesVisible: {resolve: "_resolveFull", data: Wa("Lines"), cast: Boolean, value: false},
        ValuesAnchor: {value: "right"},
        ValuesMask: {value: "{x},{y}"}
    });
    f.type("pvc.visual.PiePlot", i.visual.Plot).add({
        type: "pie", collectDataCells: function (a) {
            this.base(a);
            var b = this.option("DataPart");
            a.push(new i.visual.DataCell(this, "category", 0, "category", b));
            a.push(new i.visual.DataCell(this, "angle", 0, "value", b))
        }, _getOptionsDefinition: function () {
            return i.visual.PiePlot.optionsDef
        }
    });
    i.visual.PiePlot.optionsDef = f.create(i.visual.Plot.optionsDef, {
        ActiveSliceRadius: {resolve: "_resolveFull", cast: L.parse, value: new L(0.05)},
        ExplodedSliceRadius: {resolve: "_resolveFull", cast: L.parse, value: 0},
        ExplodedSliceIndex: {resolve: "_resolveFull", cast: i.castNumber, value: null},
        ValuesAnchor: {cast: i.parseAnchorWedge, value: "outer"},
        ValuesVisible: {value: true},
        ValuesLabelStyle: {
            resolve: function (a) {
                if (this.chart.compatVersion() <= 1) {
                    a.specify("inside");
                    return true
                }
                return this._resolveFull(a)
            }, cast: function (a) {
                switch (a) {
                    case "inside":
                    case "linked":
                        return a
                }
                i.debug >=
                2 && i.log("[Warning] Invalid 'ValuesLabelStyle' value: '" + a + "'.");
                return "linked"
            }, value: "linked"
        },
        ValuesMask: {
            resolve: "_resolveFull", data: {
                resolveDefault: function (a) {
                    a.defaultValue(this.option("ValuesLabelStyle") === "linked" ? "{value} ({value.percent})" : "{value}");
                    return true
                }
            }
        },
        LinkInsetRadius: {resolve: "_resolveFull", cast: L.parse, value: new L(0.05)},
        LinkOutsetRadius: {resolve: "_resolveFull", cast: L.parse, value: new L(0.025)},
        LinkMargin: {resolve: "_resolveFull", cast: L.parse, value: new L(0.025)},
        LinkHandleWidth: {
            resolve: "_resolveFull",
            cast: i.castNumber, value: 0.5
        },
        LinkLabelSize: {resolve: "_resolveFull", cast: L.parse, value: new L(0.15)},
        LinkLabelSpacingMin: {resolve: "_resolveFull", cast: i.castNumber, value: 0.5}
    });
    f.type("pvc.visual.HeatGridPlot", i.visual.CategoricalPlot).add({
        type: "heatGrid", collectDataCells: function (a) {
            this.base(a);
            if (this.option("UseShapes")) {
                var b = this.chart.visualRole(this.option("SizeRole"));
                b.isBound() && a.push(new i.visual.DataCell(this, "size", this.option("SizeAxis") - 1, b.name, this.option("DataPart")))
            }
        }, _getOptionsDefinition: function () {
            return i.visual.HeatGridPlot.optionsDef
        }
    });
    i.visual.HeatGridPlot.optionsDef = f.create(i.visual.CategoricalPlot.optionsDef, {
        SizeRole: {value: "size"},
        SizeAxis: {value: 1},
        UseShapes: {resolve: "_resolveFull", cast: Boolean, value: false},
        Shape: {resolve: "_resolveFull", cast: i.parseShape, value: "square"},
        NullShape: {resolve: "_resolveFull", cast: i.parseShape, value: "cross"},
        ValuesVisible: {
            getDefault: function () {
                return !this.option("UseShapes")
            }, value: null
        },
        ValuesMask: {value: null},
        ValuesAnchor: {value: "center"},
        OrthoRole: {value: "series"},
        OrthoAxis: {resolve: null},
        NullInterpolationMode: {resolve: null, value: "none"},
        Stacked: {resolve: null, value: false}
    });
    f.type("pvc.visual.BoxPlot", i.visual.CategoricalPlot).add({
        type: "box", _getOptionsDefinition: function () {
            return i.visual.BoxPlot.optionsDef
        }
    });
    i.visual.BoxPlot.optionsDef = f.create(i.visual.CategoricalPlot.optionsDef, {
        Stacked: {resolve: null, value: false}, OrthoRole: {value: ["median", "lowerQuartil", "upperQuartil", "minimum", "maximum"]}, BoxSizeRatio: {
            resolve: "_resolveFull", cast: function (a) {
                a = i.castNumber(a);
                if (a == null)a =
                    1; else if (a < 0.05)a = 0.05; else if (a > 1)a = 1;
                return a
            }, value: 1 / 3
        }, BoxSizeMax: {
            resolve: "_resolveFull", data: {
                resolveV1: function (a) {
                    this._specifyChartOption(a, "maxBoxSize");
                    return true
                }
            }, cast: function (a) {
                a = i.castNumber(a);
                if (a == null)a = Infinity; else if (a < 1)a = 1;
                return a
            }, value: Infinity
        }
    });
    f.type("pvc.visual.BulletPlot", i.visual.Plot).add({
        type: "bullet", _getOptionsDefinition: function () {
            return i.visual.BulletPlot.optionsDef
        }
    });
    i.visual.BulletPlot.optionsDef = f.create(i.visual.Plot.optionsDef, {
        ValuesVisible: {value: true},
        ColorRole: {value: null}
    });
    f.type("pvc.visual.TreemapPlot", i.visual.Plot).add({
        type: "treemap", _getOptionsDefinition: function () {
            return i.visual.TreemapPlot.optionsDef
        }, collectDataCells: function (a) {
            this.base(a);
            var b = this.option("SizeRole");
            b && a.push(new i.visual.DataCell(this, "size", this.option("SizeAxis") - 1, b, this.option("DataPart")))
        }
    });
    i.visual.TreemapPlot.optionsDef = f.create(i.visual.Plot.optionsDef, {
        SizeRole: {resolve: "_resolveFixed", value: "size"},
        SizeAxis: {resolve: "_resolveFixed", value: 1},
        ValuesAnchor: {
            cast: i.parseAnchor,
            value: "center"
        },
        ValuesVisible: {value: true},
        ValuesMask: {resolve: "_resolveFull", value: "{category}"},
        ValuesOptimizeLegibility: {value: true},
        LayoutMode: {resolve: "_resolveFull", cast: i.parseTreemapLayoutMode, value: "squarify"},
        ColorMode: {resolve: "_resolveFull", cast: i.parseTreemapColorMode, value: "byparent"},
        RootCategoryLabel: {resolve: "_resolveFull", cast: String, value: "All"}
    });
    f.type("pvc.Abstract").init(function () {
        this._syncLog()
    }).add({
        invisibleLineWidth: 0.001, defaultLineWidth: 1.5, _logInstanceId: null, _syncLog: function () {
            if (i.debug &&
                typeof console !== "undefined") {
                var a = this._getLogInstanceId();
                ["log", "info", ["trace", "debug"], "error", "warn", ["group", "groupCollapsed"], "groupEnd"].forEach(function (b) {
                    b = b instanceof Array ? b : [b, b];
                    ya(this, "_" + b[0], b[1], a)
                }, this)
            }
        }, _getLogInstanceId: function () {
            return this._logInstanceId || (this._logInstanceId = this._processLogInstanceId(this._createLogInstanceId()))
        }, _createLogInstanceId: function () {
            return "" + this.constructor
        }, _processLogInstanceId: function (a) {
            a = a.substr(0, 30);
            if (a.length < 30)a += f.array.create(30 -
            a.length, " ").join("");
            return "[" + a + "]"
        }
    });
    f.scope(function () {
        var a = i.Abstract.prototype, b = function () {
            this._syncLog()
        };
        ["log", "info", "trace", "error", "warn", "group", "groupEnd"].forEach(function (c) {
            a["_" + c] = b
        })
    });
    f.type("pvc.BaseChart", i.Abstract).add(i.visual.Interactive).init(function (a) {
        var b = a, c = this.parent = f.get(a, "parent") || null;
        if (c)a || f.fail.argumentRequired("options"); else a = f.mixin.copy({}, this.defaults, a);
        this.options = a;
        if (c) {
            this.root = c.root;
            this.smallColIndex = a.smallColIndex;
            this.smallRowIndex =
                a.smallRowIndex
        } else this.root = this;
        this.base();
        i.debug >= 3 && this._info("NEW CHART\n" + i.logSeparator.replace(/-/g, "=") + "\n  DebugLevel: " + i.debug);
        if (i.debug >= 3 && !c && b) {
            this._info("OPTIONS:\n", b);
            i.debug >= 5 && this._trace(i.stringify(a, {ownOnly: false, funs: true}))
        }
        c && c._addChild(this);
        this._constructData(a);
        this._constructVisualRoles(a)
    }).add({
        _disposed: false,
        _animatable: false,
        parent: null,
        children: null,
        root: null,
        isCreated: false,
        _createVersion: 0,
        renderCallback: undefined,
        multiChartPageCount: null,
        multiChartPageIndex: null,
        _multiChartOverflowClipped: false,
        left: 0,
        top: 0,
        width: null,
        height: null,
        margins: null,
        paddings: null,
        _allowV1SecondAxis: false,
        compatVersion: function (a) {
            return (a || this.options).compatVersion
        },
        _createLogInstanceId: function () {
            return "" + this.constructor + this._createLogChildSuffix()
        },
        _createLogChildSuffix: function () {
            return this.parent ? " (" + (this.smallRowIndex + 1) + "," + (this.smallColIndex + 1) + ")" : ""
        },
        _addChild: function (a) {
            a.parent === this || f.assert("Not a child of this chart.");
            this.children.push(a)
        },
        _create: function (a) {
            this._createPhase1(a);
            this._createPhase2(a)
        },
        _createPhase1: function (a) {
            this._createVersion++;
            this.isCreated = false;
            i.debug >= 3 && this._log("Creating");
            this.children = [];
            this.parent || i.removeTipsyLegends();
            this._processOptions();
            this.parent || this._checkNoDataI();
            if (!this.parent && !this.data) {
                this._initVisualRoles();
                this._bindVisualRolesPreI();
                this._complexTypeProj = this._createComplexTypeProject();
                this._bindVisualRolesPreII()
            }
            this._initData(a);
            this.parent || this._checkNoDataII();
            a = this.visualRoles.multiChart.isBound();
            var b = this._chartLevel();
            this._initPlots(a);
            this._initAxes(a);
            a && !this.parent && this._initMultiCharts();
            if (!this.parent) {
                this._interpolate(a);
                this._generateTrends(a)
            }
            this._setAxesScales(b)
        },
        _createPhase2: function () {
            this._initChartPanels(this.visualRoles.multiChart.isBound());
            this.isCreated = true
        },
        _setSmallLayout: function (a) {
            if (a) {
                var b = this.basePanel;
                this._setProp("left", a) | this._setProp("top", a) && b && f.set(b.position, "left", this.left, "top", this.top);
                if (this._setProp("width", a) | this._setProp("height", a))if (b)b.size = new M(this.width,
                    this.height);
                if (this._setProp("margins", a) && b)b.margins = new E(this.margins);
                if (this._setProp("paddings", a) && b)b.paddings = new E(this.paddings)
            }
        },
        _setProp: function (a, b) {
            b = b[a];
            if (b != null) {
                this[a] = b;
                return true
            }
        },
        _processOptions: function () {
            var a = this.options;
            if (!this.parent) {
                this.width = a.width;
                this.height = a.height;
                this.margins = a.margins;
                this.paddings = a.paddings
            }
            if (this.compatVersion() <= 1)a.plot2 = this._allowV1SecondAxis && !!a.secondAxis;
            this._processOptionsCore(a);
            this._processExtensionPoints();
            return a
        },
        _processOptionsCore: function (a) {
            if (this.parent) {
                this._ibits = this.parent._ibits;
                this._tooltipOptions = this.parent._tooltipOptions
            } else {
                var b = t.renderer() !== "batik";
                if (b) {
                    b = a.interactive;
                    if (b == null)b = true
                }
                if (b) {
                    var c = i.visual.Interactive;
                    b = c.Interactive | c.ShowsInteraction;
                    if (this._processTooltipOptions(a))b |= c.ShowsTooltip;
                    if (a.animate && $.support.svg)b |= c.Animatable;
                    var d = false;
                    if (a.selectable) {
                        b |= c.Selectable;
                        switch (i.parseSelectionMode(a.selectionMode)) {
                            case "rubberband":
                                b |= c.SelectableByRubberband |
                                c.SelectableByClick;
                                break;
                            case "focuswindow":
                                b |= c.SelectableByFocusWindow;
                                d = true;
                                break
                        }
                    }
                    if (!d && i.parseClearSelectionMode(a.clearSelectionMode) === "emptyspaceclick")b |= c.Unselectable;
                    if (a.hoverable)b |= c.Hoverable;
                    if (a.clickable)b |= c.Clickable | c.DoubleClickable
                } else b = 0;
                this._ibits = b
            }
        },
        _tooltipDefaults: {
            gravity: "s",
            delayIn: 200,
            delayOut: 80,
            offset: 2,
            opacity: 0.9,
            html: true,
            fade: true,
            useCorners: false,
            arrowVisible: true,
            followMouse: false,
            format: undefined
        },
        _processTooltipOptions: function (a) {
            var b = this.compatVersion() <=
                1, c = a.tooltip, d = a.tooltipEnabled;
            if (d == null) {
                if (c)d = c.enabled;
                if (d == null) {
                    if (b)d = a.showTooltips;
                    if (d == null)d = true
                }
            }
            if (d) {
                c || (c = {});
                b && this._importV1TooltipOptions(c, a);
                f.eachOwn(this._tooltipDefaults, function (e, g) {
                    var h = a["tooltip" + f.firstUpperCase(g)];
                    if (h !== undefined)c[g] = h; else if (c[g] === undefined)c[g] = e
                })
            } else c = {};
            this._tooltipOptions = c;
            return d
        },
        _importV1TooltipOptions: function (a, b) {
            if (b = b.tipsySettings) {
                this.extend(b, "tooltip");
                for (var c in b)if (a[c] === undefined)a[c] = b[c];
                if (a.html == null)a.html =
                    false
            }
        },
        render: function (a, b, c) {
            var d;
            i.debug > 1 && i.group("CCC RENDER");
            this._suspendSelectionUpdate();
            try {
                this.useTextMeasureCache(function () {
                    try {
                        for (; ;) {
                            if (!this.isCreated || b)
                                this._create({reloadData: c});
                            else
                                !this.parent && this.isCreated && i.removeTipsyLegends();

                            var data = {bypassAnimation: a, recreate: b};
                            this.basePanel.render(data);

                            if (!this._isMultiChartOverflowClip) {
                                this._isMultiChartOverflowClipRetry = false;
                                break
                            }

                            b = true;
                            c = false;

                            this._isMultiChartOverflowClipRetry = true;
                            this._isMultiChartOverflowClip = false;
                            this._multiChartOverflowClipped = true
                        }
                    } catch (e) {
                        if (e instanceof NoDataException) {
                            i.debug > 1 && this._log("No data found.");
                            this._addErrorPanelMessage("No data found", true)
                        } else {
                            d = true;
                            i.logError(e.message);
                            i.debug > 0 && this._addErrorPanelMessage("Error: " + e.message, false)
                        }
                    }
                })
            } finally {
                d || this._resumeSelectionUpdate();
                i.debug > 1 && i.groupEnd()
            }
            return this
        },
        _addErrorPanelMessage: function (a, b) {
            var c = this.options;
            c = (new t.Panel).canvas(c.canvas).width(this.width).height(this.height);
            a = c.anchor("center").add(t.Label).text(a);
            b && this.extend(a,
                "noDataMessage");
            c.render()
        },
        useTextMeasureCache: function (a, b) {
            var c = this.root;
            c = c._textMeasureCache || (c._textMeasureCache = t.Text.createCache());
            return t.Text.usingCache(c, a, b || this)
        },
        animate: function (a, b) {
            return this.basePanel.animate(a, b)
        },
        animatingStart: function () {
            return this.basePanel.animatingStart()
        },
        animatable: function () {
            return this._animatable && this.base()
        },
        isOrientationVertical: function (a) {
            return (a || this.options.orientation) === i.orientation.vertical
        },
        isOrientationHorizontal: function (a) {
            return (a ||
                this.options.orientation) === i.orientation.horizontal
        },
        dispose: function () {
            if (!this._disposed)this._disposed = true
        },
        defaults: {
            width: 400,
            height: 300,
            orientation: "vertical",
            ignoreNulls: true,
            crosstabMode: true,
            isMultiValued: false,
            seriesInRows: false,
            groupedLabelSep: undefined,
            animate: true,
            titlePosition: "top",
            titleAlign: "center",
            legend: false,
            legendPosition: "bottom",
            v1StyleTooltipFormat: function (a, b, c, d) {
                return a + ", " + b + ":  " + this.chart.options.valueFormat(c) + (d && d.percent ? " (" + d.percent.label + ")" : "")
            },
            valueFormat: f.scope(function () {
                var a =
                    t.Format.number().fractionDigits(0, 2);
                return function (b) {
                    return a.format(b)
                }
            }),
            percentValueFormat: f.scope(function () {
                var a = t.Format.number().fractionDigits(0, 1);
                return function (b) {
                    return a.format(b * 100) + "%"
                }
            }),
            clickable: false,
            doubleClickMaxDelay: 300,
            hoverable: false,
            selectable: false,
            selectionMode: "rubberband",
            ctrlSelectMode: true,
            clearSelectionMode: "emptySpaceClick",
            compatVersion: Infinity
        }
    });
    i.BaseChart.add({
        visualRoles: null,
        visualRoleList: null,
        _serRole: null,
        _dataPartRole: null,
        _measureVisualRoles: null,
        visualRole: function (a) {
            var b = f.getOwn(this.visualRoles, a);
            if (!b)throw f.error.operationInvalid("roleName", "There is no visual role with name '{0}'.", [a]);
            return b
        },
        measureVisualRoles: function () {
            return this._measureVisualRoles
        },
        measureDimensionsNames: function () {
            return f.query(this._measureVisualRoles).select(function (a) {
                return a.firstDimensionName()
            }).where(f.notNully).array()
        },
        _constructVisualRoles: function () {
            var a = this.parent;
            if (a) {
                this.visualRoles = a.visualRoles;
                this.visualRoleList = a.visualRoleList;
                this._measureVisualRoles = a._measureVisualRoles;
                ["_multiChartRole", "_serRole", "_colorRole", "_dataPartRole"].forEach(function (b) {
                    var c = a[b];
                    if (c)this[b] = c
                }, this)
            } else {
                this.visualRoles = {};
                this.visualRoleList = [];
                this._measureVisualRoles = []
            }
        },
        _hasDataPartRole: f.fun.constant(false),
        _getSeriesRoleSpec: f.fun.constant(null),
        _getColorRoleSpec: f.fun.constant(null),
        _addVisualRole: function (a, b) {
            b = f.set(b, "index", this.visualRoleList.length);
            b = new i.visual.Role(a, b);
            this.visualRoleList.push(b);
            this.visualRoles[a] =
                b;
            b.isMeasure && this._measureVisualRoles.push(b);
            return b
        },
        _initVisualRoles: function () {
            this._multiChartRole = this._addVisualRole("multiChart", {defaultDimension: "multiChart*", requireIsDiscrete: true});
            if (this._hasDataPartRole())this._dataPartRole = this._addVisualRole("dataPart", {
                defaultDimension: "dataPart",
                requireSingleDimension: true,
                requireIsDiscrete: true,
                dimensionDefaults: {isHidden: true, comparer: f.compare}
            });
            var a = this._getSeriesRoleSpec();
            if (a)this._serRole = this._addVisualRole("series", a);
            if (a = this._getColorRoleSpec())this._colorRole =
                this._addVisualRole("color", a)
        },
        _assertUnboundRoleIsOptional: function (a) {
            if (a.isRequired)throw f.error.operationInvalid("Chart type requires unassigned role '{0}'.", [a.name]);
        },
        _bindVisualRolesPreI: function () {
            f.eachOwn(this.visualRoles, function (g) {
                g.setIsReversed(false)
            });
            var a = [], b = this.options, c = b.visualRoles;
            this.visualRoleList.forEach(function (g) {
                g = g.name;
                var h = b[g + "Role"];
                if (h !== undefined) {
                    if (!c)c = b.visualRoles = {};
                    if (c[g] === undefined)c[g] = h
                }
            });
            var d;
            if (c) {
                d = {};
                var e = f.query(f.keys(c)).select(this.visualRole,
                    this).array();
                e.sort(function (g, h) {
                    return g.index - h.index
                });
                e.forEach(function (g) {
                    var h = g.name, j = c[h], k, m;
                    if (f.object.is(j)) {
                        f.nullyTo(j.isReversed, false) && g.setIsReversed(true);
                        if ((m = j.from) && m !== h) {
                            h = this.visualRoles[m] || f.fail.operationInvalid("Source role '{0}' is not supported by the chart type.", [m]);
                            g.setSourceRole(h);
                            a.push(g)
                        } else k = j.dimensions
                    } else k = j;
                    if (k !== undefined) {
                        k || this._assertUnboundRoleIsOptional(g);
                        k = i.data.GroupingSpec.parse(k);
                        g.preBind(k);
                        k.dimensions().each(function (l) {
                            if (f.hasOwn(d,
                                    l.name))delete d[l.name]; else d[l.name] = g
                        })
                    }
                }, this)
            }
            this._sourcedRoles = a;
            this._dimsBoundToSingleRole = d
        },
        _bindVisualRolesPreII: function () {
            var a = this._dimsBoundToSingleRole;
            if (a) {
                delete this._dimsBoundToSingleRole;
                f.eachOwn(a, this._setRoleBoundDimensionDefaults, this)
            }
            var b = this._sourcedRoles;
            delete this._sourcedRoles;
            f.query(this.visualRoleList).where(function (c) {
                return c.defaultSourceRoleName && !c.sourceRole && !c.isPreBound()
            }).each(function (c) {
                var d = this.visualRoles[c.defaultSourceRoleName];
                if (d) {
                    c.setSourceRole(d,
                        true);
                    b.push(c)
                }
            }, this);
            b.forEach(function (c) {
                var d = c.sourceRole;
                d.isReversed && c.setIsReversed(!c.isReversed);
                !c.defaultDimensionName && d.isPreBound() && c.preBind(d.preBoundGrouping())
            })
        },
        _setRoleBoundDimensionDefaults: function (a, b) {
            this._complexTypeProj.setDimDefaults(b, a.dimensionDefaults)
        },
        _bindVisualRolesPostI: function () {
            function a(p, q) {
                f.array.lazy(n, p).push(q)
            }

            function b(p) {
                return l.hasDim(p)
            }

            function c(p, q) {
                f.array.is(q) ? q.forEach(function (r) {
                    a(r, p)
                }) : a(q, p);
                p.setSourceRole(null);
                p.preBind(i.data.GroupingSpec.parse(q))
            }

            function d(p, q) {
                if (q.length)p.requireSingleDimension ? c(p, q[0]) : c(p, q)
            }

            function e(p, q) {
                l.setDim(q, {isHidden: true});
                c(p, q)
            }

            function g(p) {
                m._assertUnboundRoleIsOptional(p);
                p.bind(null);
                p.setSourceRole(null)
            }

            function h(p) {
                p.preBoundGrouping().dimensionNames().forEach(a)
            }

            function j(p) {
                if (p.sourceRole && !p.isDefaultSourceRole)o.push(p); else {
                    var q = p.defaultDimensionName;
                    if (q) {
                        var r = q.match(/^(.*?)(\*)?$/) || f.fail.argumentInvalid("defaultDimensionName");
                        q = r[1];
                        if (r[2]) {
                            if (r = l.groupDimensionsNames(q)) {
                                d(p,
                                    r);
                                return
                            }
                        } else if (b(q)) {
                            c(p, q);
                            return
                        }
                        if (p.autoCreateDimension)e(p, q); else p.sourceRole ? o.push(p) : g(p)
                    } else p.sourceRole ? o.push(p) : g(p)
                }
            }

            function k(p) {
                var q = p.sourceRole;
                q.isPreBound() ? p.preBind(q.preBoundGrouping()) : g(p)
            }

            var m = this, l = m._complexTypeProj, n = {}, o = [];
            f.query(m.visualRoleList).where(function (p) {
                return p.isPreBound()
            }).each(h);
            f.query(m.visualRoleList).where(function (p) {
                return !p.isPreBound()
            }).each(j);
            o.forEach(k);
            f.query(f.ownKeys(n)).where(function (p) {
                return n[p].length === 1
            }).each(function (p) {
                m._setRoleBoundDimensionDefaults(n[p][0],
                    p)
            })
        },
        _bindVisualRolesPostII: function (a) {
            f.query(this.visualRoleList).where(function (b) {
                return b.isPreBound()
            }).each(function (b) {
                b.postBind(a)
            })
        },
        _logVisualRoles: function () {
            var a = f.ownKeys(this.visualRoles), b = Math.max(10, f.query(a).select(function (d) {
                return d.length
            }).max());
            a = f.string.padRight("VisualRole", b) + " < Dimension(s)";
            var c = ["VISUAL ROLES MAP SUMMARY", i.logSeparator, a, f.string.padRight("", b + 1, "-") + "+--------------"];
            f.eachOwn(this.visualRoles, function (d, e) {
                c.push(f.string.padRight(e, b) +
                " | " + (d.grouping || "-"))
            });
            c.push("");
            this._log(c.join("\n"))
        },
        _getDataPartDimName: function () {
            var a = this._dataPartRole;
            if (a) {
                if (a.isBound())return a.firstDimensionName();
                var b = a.preBoundGrouping();
                if (b)return b.firstDimensionName();
                return a.defaultDimensionName
            }
        }
    });
    i.BaseChart.add({
        dataEngine: null,
        data: null,
        _partsDataCache: null,
        _visibleDataCache: null,
        resultset: [],
        metadata: [],
        _trendable: false,
        _interpolatable: false,
        _constructData: function (a) {
            if (this.parent)this.dataEngine = this.data = a.data || f.fail.argumentRequired("options.data")
        },
        _checkNoDataI: function () {
            if (!this.allowNoData && !this.resultset.length)throw new NoDataException;
        },
        _checkNoDataII: function () {
            if (!this.allowNoData && (!this.data || !this.data.count())) {
                this.data = null;
                throw new NoDataException;
            }
        },
        _initData: function (a) {
            if (!this.parent) {
                var b = this.data;
                if (b)if (f.get(a, "reloadData", true))this._onReloadData(); else {
                    b.disposeChildren();
                    b.clearVirtuals()
                } else this._onLoadData()
            }
            delete this._partsDataCache;
            delete this._visibleDataCache;
            i.debug >= 3 && this._log(this.data.getInfo())
        },
        _onLoadData: function () {
            var a = this.data, b = this._translation;
            !a && !b || f.assert("Invalid state.");
            a = this.options;
            var c = this._getDataPartDimName(), d = this._complexTypeProj || f.assert("Invalid state."), e = this._createTranslationOptions(c);
            b = this._translation = this._createTranslation(e);
            if (i.debug >= 3) {
                this._log(b.logSource());
                this._log(b.logTranslatorType())
            }
            b.configureType();
            c && !d.isReadOrCalc(c) && this._addDefaultDataPartCalculation(c);
            i.debug >= 3 && this._log(b.logVItem());
            this._bindVisualRolesPostI();
            c = new i.data.ComplexType;
            d.configureComplexType(c, e);
            this._bindVisualRolesPostII(c);
            i.debug >= 10 && this._log(c.describe());
            i.debug >= 3 && this._logVisualRoles();
            a = this.dataEngine = this.data = new i.data.Data({type: c, labelSep: a.groupedLabelSep, keySep: e.separator});
            d = {where: this._getLoadFilter(), isNull: this._getIsNullDatum()};
            b = b.execute(a);
            a.load(b, d)
        },
        _onReloadData: function () {
            var a = this.data, b = this._translation;
            a && b || f.assert("Invalid state.");
            b.setSource(this.resultset);
            i.debug >= 3 && this._log(b.logSource());
            var c = {
                where: this._getLoadFilter(),
                isNull: this._getIsNullDatum()
            };
            b = b.execute(a);
            a.load(b, c)
        },
        _createComplexTypeProject: function () {
            var a = this.options, b = new i.data.ComplexTypeProject(a.dimensionGroups), c = a.dimensions;
            for (var d in c)b.setDim(d, c[d]);
            if (c = this._getDataPartDimName()) {
                b.setDim(c);
                this._addPlot2SeriesDataPartCalculation(b, c)
            }
            (a = a.calculations) && a.forEach(function (e) {
                b.setCalc(e)
            });
            return b
        },
        _getLoadFilter: function () {
        },
        _getIsNullDatum: function () {
            var a = this.measureDimensionsNames(), b = a.length;
            if (b)return function (c) {
                c = c.atoms;
                for (var d = 0; d < b; d++)if (c[a[d]].value != null)return false;
                return true
            }
        },
        _createTranslation: function (a) {
            return new (this._getTranslationClass(a))(this, this._complexTypeProj, this.resultset, this.metadata, a)
        },
        _getTranslationClass: function (a) {
            return a.crosstabMode ? i.data.CrosstabTranslationOper : i.data.RelationalTranslationOper
        },
        _createTranslationOptions: function (a) {
            var b = this.options, c = b.dataOptions || {}, d = b.dataSeparator;
            if (d === undefined)d = c.separator;
            d || (d = "~");
            var e = b.dataMeasuresInColumns;
            if (e === undefined)e =
                c.measuresInColumns;
            var g = b.dataCategoriesCount;
            if (g === undefined)g = c.categoriesCount;
            var h = b.dataIgnoreMetadataLabels;
            if (h === undefined)h = c.ignoreMetadataLabels;
            var j = b.plot2, k = b.valueFormat, m;
            if (k && k !== this.defaults.valueFormat)m = function (o) {
                return o != null ? k(o) : ""
            };
            var l, n;
            if (j) {
                if (this._allowV1SecondAxis && this.compatVersion() <= 1)n = b.secondAxisIdx; else {
                    l = this._serRole != null && b.plot2Series && f.array.as(b.plot2Series);
                    if (!l || !l.length) {
                        l = null;
                        n = b.plot2SeriesIndexes
                    }
                }
                l || (n = i.parseDistinctIndexArray(n,
                    -Infinity) || -1)
            }
            return {
                compatVersion: this.compatVersion(),
                plot2DataSeriesIndexes: n,
                seriesInRows: b.seriesInRows,
                crosstabMode: b.crosstabMode,
                isMultiValued: b.isMultiValued,
                dataPartDimName: a,
                dimensionGroups: b.dimensionGroups,
                dimensions: b.dimensions,
                readers: b.readers,
                measuresIndexes: b.measuresIndexes,
                multiChartIndexes: b.multiChartIndexes,
                separator: d,
                measuresInColumns: e,
                categoriesCount: g,
                measuresIndex: c.measuresIndex || c.measuresIdx,
                measuresCount: c.measuresCount || c.numMeasures,
                isCategoryTimeSeries: b.timeSeries,
                timeSeriesFormat: b.timeSeriesFormat,
                valueNumberFormatter: m,
                ignoreMetadataLabels: h
            }
        },
        _addPlot2SeriesDataPartCalculation: function (a, b) {
            if (!(this.compatVersion() <= 1)) {
                var c = this.options, d = this._serRole;
                if ((c = d != null && c.plot2 && c.plot2Series && f.array.as(c.plot2Series)) && c.length) {
                    var e = false, g = f.query(c).uniqueIndex(), h, j, k, m;
                    a.setCalc({
                        names: b, calculation: function (l, n) {
                            if (!e) {
                                if (d.isBound()) {
                                    h = d.grouping.dimensionNames();
                                    j = l.owner.dimensions(b)
                                }
                                e = true
                            }
                            if (j) {
                                l = i.data.Complex.compositeKey(l, h);
                                n[b] = f.hasOwnProp.call(g,
                                    l) ? m || (m = j.intern("1")) : k || (k = j.intern("0"))
                            }
                        }
                    })
                }
            }
        },
        _addDefaultDataPartCalculation: function (a) {
            var b, c;
            this._complexTypeProj.setCalc({
                names: a, calculation: function (d, e) {
                    b || (b = d.owner.dimensions(a));
                    e[a] = c || (c = b.intern("0"))
                }
            })
        },
        partData: function (a, b) {
            if (!b)b = this.data;
            if (a == null)return b;
            if (this.parent)return this.root.partData(a, b);
            var c = this._dataPartRole;
            if (!c || !c.isBound())return b;
            var d = "\u0000" + b.id + ":" + f.nullyTo(a, ""), e = f.lazy(this, "_partsDataCache"), g = e[d];
            if (!g) {
                g = this._createPartData(b, c,
                    a);
                e[d] = g
            }
            return g
        },
        _createPartData: function (a, b, c) {
            b = b.firstDimensionName();
            c = a.dimensions(b).getDistinctAtoms(f.array.to(c));
            c = Oa([f.set({}, b, c)]);
            return a.where(null, {where: c})
        },
        visibleData: function (a, b) {
            var c = f.get(b, "baseData") || this.data;
            if (this.parent) {
                b = b ? Object.create(b) : {};
                b.baseData = c;
                return this.root.visibleData(a, b)
            }
            var d = !!f.get(b, "inverted", false), e = !!(this.options.ignoreNulls || f.get(b, "ignoreNulls", true));
            d = "\u0000" + c.id + "|" + d + "|" + e + "|" + (a != null ? a : null);
            var g = f.lazy(this, "_visibleDataCache"),
                h = g[d];
            if (!h) {
                a = this.partData(a, c);
                b = b ? Object.create(b) : {};
                b.visible = true;
                b.isNull = e ? false : null;
                h = g[d] = this._createVisibleData(a, b)
            }
            return h
        },
        _createVisibleData: function (a, b) {
            var c = this._serRole;
            return c && c.isBound() ? c.flatten(a, b) : a.where(null, b)
        },
        _initMultiCharts: function () {
            var a = this;
            a.multiOptions = new i.visual.MultiChart(a);
            a.smallOptions = new i.visual.SmallChart(a);
            var b = a.multiOptions.option, c = a.visualRoles.multiChart.flatten(a.data, {visible: true, isNull: null}), d = c.childNodes, e, g, h, j;
            if (a._isMultiChartOverflowClipRetry) {
                g =
                    a._clippedMultiChartRowsMax;
                j = e = a._clippedMultiChartColsMax;
                h = g * e
            } else h = b("Max");
            h = Math.min(d.length, h);
            if (h === 0)e = g = j = 0; else if (!a._isMultiChartOverflowClipRetry) {
                j = b("ColumnsMax");
                e = Math.min(h, j);
                e >= 1 && isFinite(e) || f.assert("Must be at least 1 and finite");
                g = Math.ceil(h / e);
                g >= 1 || f.assert("Must be at least 1")
            }
            a._multiInfo = {data: c, smallDatas: d, count: h, rowCount: g, colCount: e, colsMax: j}
        },
        _interpolate: function (a) {
            if (this._interpolatable) {
                var b = f.query(this.axesList).selectMany(f.propGet("dataCells")).where(function (c) {
                    c =
                        c.nullInterpolationMode;
                    return !!c && c !== "none"
                }).distinct(function (c) {
                    return c.role.name + "|" + (c.dataPartValue || "")
                }).array();
                this._eachLeafDatasAndDataCells(a, b, this._interpolateDataCell, this)
            }
        },
        _generateTrends: function (a) {
            var b = this._getDataPartDimName();
            if (this._trendable && b) {
                b = f.query(this.axesList).selectMany(f.propGet("dataCells")).where(f.propGet("trend")).distinct(function (d) {
                    return d.role.name + "|" + (d.dataPartValue || "")
                }).array();
                var c = [];
                this._eachLeafDatasAndDataCells(a, b, function (d, e) {
                    this._generateTrendsDataCell(c,
                        d, e)
                }, this);
                c.length && this.data.owner.add(c)
            }
        },
        _eachLeafDatasAndDataCells: function (a, b, c, d) {
            var e = b.length;
            if (e) {
                var g;
                if (a) {
                    a = this._multiInfo.smallDatas;
                    g = this._multiInfo.count
                } else {
                    a = [this.data];
                    g = 1
                }
                for (var h = 0; h < g; h++)for (var j = a[h], k = 0; k < e; k++)c.call(d, b[k], j, k, h)
            }
        },
        _interpolateDataCell: function () {
        },
        _generateTrendsDataCell: function () {
        },
        _getTrendDataPartAtom: function () {
            var a = this._getDataPartDimName();
            if (a)return this.data.owner.dimensions(a).intern("trend")
        },
        setData: function (a, b) {
            this.setResultset(a &&
            a.resultset);
            this.setMetadata(a && a.metadata);
            $.extend(this.options, b);
            return this
        },
        setResultset: function (a) {
            !this.parent || f.fail.operationInvalid("Can only set resultset on root chart.");
            this.resultset = a || [];
            this.resultset.length || this._warn("Resultset is empty");
            return this
        },
        setMetadata: function (a) {
            !this.parent || f.fail.operationInvalid("Can only set metadata on root chart.");
            this.metadata = a || [];
            this.metadata.length || this._warn("Metadata is empty");
            return this
        }
    });
    i.BaseChart.add({
        _initPlots: function (a) {
            this.plotPanelList =
                null;
            if (this.parent) {
                a = this.root;
                this.plots = a.plots;
                this.plotList = a.plotList;
                this.plotsByType = a.plotsByType
            } else {
                this.plots = {};
                this.plotList = [];
                this.plotsByType = {};
                this._initPlotsCore(a)
            }
        }, _initPlotsCore: function () {
        }, _addPlot: function (a) {
            var b = this.plotsByType, c = this.plots, d = a.type, e = a.index, g = a.name, h = a.id;
            if (g && f.hasOwn(c, g))throw f.error.operationInvalid("Plot name '{0}' already taken.", [g]);
            if (f.hasOwn(c, h))throw f.error.operationInvalid("Plot id '{0}' already taken.", [h]);
            b = f.array.lazy(b, d);
            if (f.hasOwn(b, e))throw f.error.operationInvalid("Plot index '{0}' of type '{1}' already taken.", [e, d]);
            a.globalIndex = this.plotList.length;
            b[e] = a;
            this.plotList.push(a);
            c[h] = a;
            if (g)c[g] = a
        }, _collectPlotAxesDataCells: function (a, b) {
            var c = [];
            a.collectDataCells(c);
            c.length && f.query(c).where(function (d) {
                return d.role.isBound()
            }).each(function (d) {
                var e = f.array.lazy(b, d.axisType);
                f.array.lazy(e, d.axisIndex).push(d)
            })
        }, _addPlotPanel: function (a) {
            f.lazy(this, "plotPanels")[a.plot.id] = a;
            f.array.lazy(this, "plotPanelList").push(a)
        },
        _createPlotPanels: function () {
            throw f.error.notImplemented();
        }
    });
    i.BaseChart.add({
        colors: null,
        axes: null,
        axesList: null,
        axesByType: null,
        _axisClassByType: {color: i.visual.ColorAxis, size: i.visual.SizeAxis, base: da, ortho: da},
        _axisCreateChartLevel: {color: 1, size: 2, base: 3, ortho: 3},
        _axisSetScaleChartLevel: {color: 1, size: 2, base: 2, ortho: 2},
        _axisCreationOrder: ["color", "size", "base", "ortho"],
        _axisCreateIfUnbound: {},
        _chartLevel: function () {
            var a = 0;
            this.parent || (a |= 1);
            if (this.parent || !this.visualRoles.multiChart.isBound())a |=
                2;
            return a
        },
        _initAxes: function () {
            this.axes = {};
            this.axesList = [];
            this.axesByType = {};
            delete this._rolesColorScale;
            var a;
            if (this.parent)a = this.root._dataCellsByAxisTypeThenIndex; else {
                a = {};
                this.plotList.forEach(function (c) {
                    this._collectPlotAxesDataCells(c, a)
                }, this);
                this._dataCellsByAxisTypeThenIndex = a
            }
            var b = this._chartLevel();
            this._axisCreationOrder.forEach(function (c) {
                if ((this._axisCreateChartLevel[c] & b) !== 0) {
                    var d, e = a[c];
                    if (e)(d = this._axisClassByType[c]) && e.forEach(function (g, h) {
                        new d(this, c, h)
                    }, this);
                    else if (this._axisCreateIfUnbound[c])(d = this._axisClassByType[c]) && new d(this, c, 0)
                }
            }, this);
            this.parent && this.root.axesList.forEach(function (c) {
                f.hasOwn(this.axes, c.id) || this._addAxis(c)
            }, this);
            f.eachOwn(a, function (c, d) {
                this._axisCreateChartLevel[d] & b && c.forEach(function (e, g) {
                    g = this.axes[i.buildIndexedId(d, g)];
                    g.isBound() || g.bind(e)
                }, this)
            }, this)
        },
        _addAxis: function (a) {
            this.axes[a.id] = a;
            if (a.chart === this)a.axisIndex = this.axesList.length;
            this.axesList.push(a);
            var b = f.array.lazy(this.axesByType, a.type),
                c = b.count || 0;
            a.typeIndex = c;
            b[a.index] = a;
            if (!c)b.first = a;
            b.count = c + 1;
            a.type === "color" && a.isBound() && this._onColorAxisScaleSet(a);
            return this
        },
        _getAxis: function (a, b) {
            if ((a = this.axesByType[a]) && b != null && +b >= 0)return a[b]
        },
        _setAxesScales: function (a) {
            this.axesList.forEach(function (b) {
                this._axisSetScaleChartLevel[b.type] & a && b.isBound() && this._setAxisScale(b, a)
            }, this)
        },
        _setAxisScale: function (a, b) {
            this._setAxisScaleByScaleType(a, b)
        },
        _setAxisScaleByScaleType: function (a, b) {
            switch (a.scaleType) {
                case "discrete":
                    this._setDiscreteAxisScale(a,
                        b);
                    break;
                case "numeric":
                    this._setNumericAxisScale(a, b);
                    break;
                case "timeSeries":
                    this._setTimeSeriesAxisScale(a, b);
                    break;
                default:
                    throw f.error("Unknown axis scale type.");
            }
        },
        _describeScale: function (a, b) {
            b.isNull && i.debug >= 3 && this._log(f.format("{0} scale for axis '{1}'- no data", [a.scaleType, a.id]))
        },
        _setDiscreteAxisScale: function (a) {
            if (a.type === "color")this._setDiscreteColorAxisScale(a); else {
                var b = a.domainValues(), c = new t.Scale.ordinal;
                if (b.length)c.domain(b); else c.isNull = true;
                this._describeScale(a,
                    c);
                a.setScale(c)
            }
        },
        _setTimeSeriesAxisScale: function (a) {
            var b = this._getContinuousVisibleExtentConstrained(a), c = new t.Scale.linear;
            if (b) {
                var d = b.min, e = b.max;
                (function () {
                    var g = e - d;
                    if (g && Math.abs(g) < 1) {
                        e = d = new Date(Math.round((d + e) / 2));
                        g = 0
                    }
                    if (g) {
                        if (g < 0)if (!b.maxLocked || b.minLocked)e = new Date(d.getTime() + i.time.intervals.h); else d = new Date(e.getTime() - i.time.intervals.h)
                    } else {
                        b.minLocked || (d = new Date(d.getTime() - i.time.intervals.h));
                        if (!b.maxLocked || b.minLocked)e = new Date(e.getTime() + i.time.intervals.h)
                    }
                })();
                c.domain(d, e);
                c.minLocked = b.minLocked;
                c.maxLocked = b.maxLocked
            } else c.isNull = true;
            this._describeScale(a, c);
            a.setScale(c)
        },
        _setNumericAxisScale: function (a) {
            if (a.type === "color")this._setNumericColorAxisScale(a); else {
                var b = this._getContinuousVisibleExtentConstrained(a), c = new t.Scale.linear;
                if (b) {
                    var d = b.min, e = b.max, g = function () {
                        var h = e - d;
                        if (h && Math.abs(h) <= 1.0E-10) {
                            d = (d + e) / 2;
                            d = e = +d.toFixed(10);
                            h = 0
                        }
                        if (h) {
                            if (h < 0)if (!b.maxLocked || b.minLocked)e = Math.abs(d) > 1.0E-10 ? d * 1.01 : +0.1; else d = Math.abs(e) > 1.0E-10 ? e *
                            0.99 : -0.1
                        } else {
                            b.minLocked || (d = Math.abs(d) > 1.0E-10 ? d * 0.99 : -0.1);
                            if (!b.maxLocked || b.minLocked)e = Math.abs(e) > 1.0E-10 ? e * 1.01 : +0.1
                        }
                    };
                    g();
                    if (a.option.isDefined("OriginIsZero") && a.option("OriginIsZero"))if (d === 0)b.minLocked = true; else if (e === 0)b.maxLocked = true; else if (d * e > 0) {
                        if (d > 0) {
                            if (!b.minLocked) {
                                b.minLocked = true;
                                d = 0
                            }
                        } else if (!b.maxLocked) {
                            b.maxLocked = true;
                            e = 0
                        }
                        g()
                    }
                    c.domain(d, e);
                    c.minLocked = b.minLocked;
                    c.maxLocked = b.maxLocked
                } else c.isNull = true;
                this._describeScale(a, c);
                a.setScale(c)
            }
        },
        _warnSingleContinuousValueRole: function (a) {
            a.grouping.isSingleDimension ||
            this._warn("A linear scale can only be obtained for a single dimension role.");
            a.grouping.isDiscrete() && this._warn(f.format("The single dimension of role '{0}' should be continuous.", [a.name]))
        },
        _getContinuousVisibleExtentConstrained: function (a, b, c) {
            var d, e = function () {
                return d || (d = this.data.owner.dimensions(a.role.grouping.firstDimensionName()))
            }, g = false, h = false;
            if (b == null && a.option.isDefined("FixedMin")) {
                b = a.option("FixedMin");
                if (b != null)b = e.call(this).read(b);
                if (g = b != null) {
                    b = b.value;
                    if (b < 0 && a.scaleUsesAbs())b = -b
                }
            }
            if (c == null && a.option.isDefined("FixedMax")) {
                c = a.option("FixedMax");
                if (c != null)c = e.call(this).read(c);
                if (h = c != null) {
                    c = c.value;
                    if (c < 0 && a.scaleUsesAbs())c = -c
                }
            }
            if (b == null || c == null) {
                e = this._getContinuousVisibleExtent(a);
                if (!e)return null;
                if (b == null)b = e.min;
                if (c == null)c = e.max
            }
            return {min: b, max: c, minLocked: g, maxLocked: h}
        },
        _getContinuousVisibleExtent: function (a) {
            var b = a.dataCells;
            if (b.length === 1)return this._getContinuousVisibleCellExtent(a, b[0]);
            return f.query(b).select(function (c) {
                return this._getContinuousVisibleCellExtent(a,
                    c)
            }, this).reduce(i.unionExtents, null)
        },
        _getContinuousVisibleCellExtent: function (a, b) {
            var c = b.role;
            this._warnSingleContinuousValueRole(c);
            if (c.name === "series")throw f.error.notImplemented();
            var d = a.scaleUsesAbs();
            a = a.scaleSumNormalized();
            b = this.visibleData(b.dataPartValue);
            c = c.firstDimensionName();
            if (a) {
                if (d = b.dimensionsSumAbs(c, {abs: d}))return {min: 0, max: d}
            } else if (a = b.dimensions(c).extent({abs: d})) {
                c = a.min.value;
                a = a.max.value;
                return {min: d ? Math.abs(c) : c, max: d ? Math.abs(a) : a}
            }
        },
        _setDiscreteColorAxisScale: function (a) {
            var b =
                a.domainValues();
            b = a.scheme()(b);
            this._describeScale(a, b);
            a.setScale(b, true);
            this._onColorAxisScaleSet(a)
        },
        _setNumericColorAxisScale: function (a) {
            if (a.dataCells.length !== 1)throw f.error("Can't handle multiple continuous datacells in color axis.");
            this._warnSingleContinuousValueRole(a.role);
            var b = this.visibleData(a.dataCell.dataPartValue), c = a.option("NormByCategory");
            b = {
                type: a.option("ScaleType"),
                colors: a.option("Colors")().range(),
                colorDomain: a.option("Domain"),
                colorMin: a.option("Min"),
                colorMax: a.option("Max"),
                colorMissing: a.option("Missing"),
                data: b,
                colorDimension: a.role.firstDimensionName(),
                normPerBaseCategory: c
            };
            if (c)a.scalesByCateg = Aa(b); else {
                c = Ba(b);
                this._describeScale(a, c);
                a.setScale(c)
            }
            this._onColorAxisScaleSet(a)
        },
        _onColorAxisScaleSet: function (a) {
            switch (a.index) {
                case 0:
                    this.colors = a.scheme();
                    break;
                case 1:
                    if (this._allowV1SecondAxis)this.secondAxisColor = a.scheme();
                    break
            }
        },
        _getRoleColorScale: function (a) {
            return f.lazy(f.lazy(this, "_rolesColorScale"), a, this._createRoleColorScale, this)
        },
        _createRoleColorScale: function (a) {
            function b(g) {
                var h =
                    "" + g;
                f.hasOwnProp.call(e, h) || (e[h] = d(g))
            }

            var c, d, e = {};
            this.axesByType.color.forEach(function (g) {
                var h = g.role;
                if ((h.name === a || h.sourceRole && h.sourceRole.name === a) && g.scale && (g.index === 0 || g.option.isSpecified("Colors") || g.option.isSpecified("Map"))) {
                    d = g.scale;
                    c || (c = d);
                    g.domainValues().forEach(b)
                }
            }, this);
            if (!c)return i.createColorScheme()();
            d = function (g) {
                var h = "" + g;
                if (f.hasOwnProp.call(e, h))return e[h];
                g = c(g);
                return e[h] = g
            };
            f.copy(d, c);
            return d
        },
        _onLaidOut: function () {
        }
    });
    i.BaseChart.add({
        basePanel: null,
        titlePanel: null, legendPanel: null, _multiChartPanel: null, _initChartPanels: function (a) {
            this._initBasePanel();
            this._initTitlePanel();
            var b = this._initLegendPanel(), c = a && !this.parent;
            c && this._initMultiChartPanel();
            b && this._initLegendScenes(b);
            if (!c) {
                b = this.options;
                this._createContent({
                    margins: a ? b.smallContentMargins : b.contentMargins,
                    paddings: a ? b.smallContentPaddings : b.contentPaddings,
                    clickAction: b.clickAction,
                    doubleClickAction: b.doubleClickAction
                })
            }
        }, _createContent: function () {
        }, _initBasePanel: function () {
            var a =
                this.parent;
            this.basePanel = new i.BasePanel(this, a && a._multiChartPanel, {
                margins: this.margins,
                paddings: this.paddings,
                size: {width: this.width, height: this.height}
            })
        }, _initTitlePanel: function () {
            var a = this, b = a.options, c = b.title;
            if (!f.empty(c))this.titlePanel = new i.TitlePanel(a, a.basePanel, {
                title: c,
                font: b.titleFont,
                anchor: b.titlePosition,
                align: b.titleAlign,
                alignTo: b.titleAlignTo,
                offset: b.titleOffset,
                keepInBounds: b.titleKeepInBounds,
                margins: b.titleMargins,
                paddings: b.titlePaddings,
                titleSize: b.titleSize,
                titleSizeMax: b.titleSizeMax
            })
        },
        _initLegendPanel: function () {
            var a = this.options;
            if (a.legend) {
                var b = new i.visual.Legend(this, "legend", 0);
                return this.legendPanel = new i.LegendPanel(this, this.basePanel, {
                    anchor: b.option("Position"),
                    align: b.option("Align"),
                    alignTo: a.legendAlignTo,
                    offset: a.legendOffset,
                    keepInBounds: a.legendKeepInBounds,
                    size: b.option("Size"),
                    sizeMax: b.option("SizeMax"),
                    margins: b.option("Margins"),
                    paddings: b.option("Paddings"),
                    font: b.option("Font"),
                    scenes: f.getPath(a, "legend.scenes"),
                    textMargin: a.legendTextMargin,
                    itemPadding: a.legendItemPadding,
                    itemSize: b.option("ItemSize"),
                    markerSize: a.legendMarkerSize
                })
            }
        }, _getLegendBulletRootScene: function () {
            return this.legendPanel && this.legendPanel._getBulletRootScene()
        }, _initMultiChartPanel: function () {
            var a = this.basePanel, b = this.options;
            this._multiChartPanel = new i.MultiChartPanel(this, a, {margins: b.contentMargins, paddings: b.contentPaddings});
            this._multiChartPanel.createSmallCharts();
            a._children.unshift(a._children.pop())
        }, _coordinateSmallChartsLayout: function () {
        }, _initLegendScenes: function (a) {
            var b = this.axesByType.color;
            if (b) {
                var c, d, e = this, g = function (j, k) {
                    if (j.option("LegendClickMode") === "togglevisible") {
                        if (c === undefined)if (c = e._getTrendDataPartAtom() || null)d = c.dimension.name;
                        if (c && k.firstAtoms()[d] === c)return "none"
                    }
                }, h = function () {
                    return rootScene = a._getBulletRootScene()
                };
                f.query(b).where(function (j) {
                    return j.option("LegendVisible") && j.isBound() && j.isDiscrete()
                }).each(function (j) {
                    for (var k = j.scale, m = -1, l = j.dataCells, n = l.length; ++m < n;) {
                        var o = l[m], p = j.domainCellData(m), q = h().createGroup({
                            source: p, colorAxis: j, clickMode: g(j,
                                p), extensionPrefix: i.buildIndexedId("", m)
                        });
                        o.legendGroupScene(q);
                        j.domainCellItems(p).forEach(function (r) {
                            var s = q.createItem({source: r});
                            r = j.domainItemValue(r);
                            s.color = k(r)
                        })
                    }
                })
            }
        }
    });
    i.BaseChart.add({
        _updateSelectionSuspendCount: 0, _lastSelectedDatums: null, clearSelections: function () {
            this.data.owner.clearSelected() && this.updateSelections();
            return this
        }, _updatingSelections: function (a, b) {
            this._suspendSelectionUpdate();
            try {
                a.call(b || this)
            } finally {
                this._resumeSelectionUpdate()
            }
        }, _suspendSelectionUpdate: function () {
            if (this ===
                this.root)this._updateSelectionSuspendCount++; else this.root._suspendSelectionUpdate()
        }, _resumeSelectionUpdate: function () {
            if (this === this.root) {
                if (this._updateSelectionSuspendCount > 0)--this._updateSelectionSuspendCount || this.updateSelections()
            } else this.root._resumeSelectionUpdate()
        }, updateSelections: function (a) {
            if (this === this.root) {
                if (this._inUpdateSelections || this._updateSelectionSuspendCount)return this;
                var b = this._calcSelectedChangedDatums();
                if (!b)return this;
                i.removeTipsyLegends();
                this._inUpdateSelections =
                    true;
                try {
                    var c = this.options.selectionChangedAction;
                    if (c) {
                        var d = this.data.selectedDatums(), e = b.values();
                        c.call(this.basePanel.context(), d, e)
                    }
                    f.get(a, "render", true) && this.useTextMeasureCache(function () {
                        this.basePanel.renderInteractive()
                    }, this)
                } finally {
                    this._inUpdateSelections = false
                }
            } else this.root.updateSelections();
            return this
        }, _calcSelectedChangedDatums: function () {
            if (this.data) {
                var a, b = this.data.selectedDatumMap();
                if (a = this._lastSelectedDatums) {
                    a = a.symmetricDifference(b);
                    if (!a.count)return
                } else {
                    if (!b.count)return;
                    a = b.clone()
                }
                this._lastSelectedDatums = b;
                return a
            }
        }, _onUserSelection: function (a) {
            if (!a || !a.length)return a;
            if (this === this.root) {
                var b = this.options.userSelectionAction;
                return b ? b.call(this.basePanel.context(), a) || a : a
            }
            return this.root._onUserSelection(a)
        }
    });
    i.BaseChart.add({
        _processExtensionPoints: function () {
            var a;
            if (this.parent)a = this.parent._components; else {
                var b = this.options.extensionPoints;
                a = {};
                if (b)for (var c in b) {
                    var d, e;
                    e = c.indexOf("_");
                    if (e > 0) {
                        d = c.substring(0, e);
                        e = c.substr(e + 1);
                        if (d && e)(f.getOwn(a,
                            d) || (a[d] = new f.OrderedMap)).add(e, b[c])
                    }
                }
            }
            this._components = a
        }, extend: function (a, b, c) {
            f.array.is(b) ? b.forEach(function (d) {
                this._extendCore(a, d, c)
            }, this) : this._extendCore(a, b, c)
        }, _extendCore: function (a, b, c) {
            if (a) {
                var d = f.getOwn(this._components, b);
                if (d) {
                    if (a.borderPanel)a = a.borderPanel;
                    var e = i.debug >= 3 ? [] : null, g = f.get(c, "constOnly", false), h = a.wrap, j = {tag: i.extensionTag}, k = a instanceof Q, m = k && (h || g), l = function (o, p) {
                        if (o != null) {
                            var q = typeof o;
                            if (q === "object")if (p === "svg" || p === "css") {
                                if (q = a.propertyValue(p))o =
                                    f.copy(q, o)
                            } else {
                                if (o instanceof Array)return o.map(function (r) {
                                    return l(r, p)
                                })
                            } else if (m && q === "function") {
                                if (g)return;
                                if (p !== "add")o = h.call(a, o, p)
                            }
                        }
                        return o
                    }, n = function (o, p) {
                        p instanceof Array ? o.apply(a, p) : o.call(a, p)
                    };
                    d.forEach(function (o, p) {
                        if (a.isLocked && a.isLocked(p))e && e.push(p + ": locked extension point!"); else if (a.isIntercepted && a.isIntercepted(p))e && e.push(p + ":" + i.stringify(o) + " (controlled)"); else {
                            e && e.push(p + ": " + i.stringify(o));
                            o = l(o, p);
                            if (o !== undefined) {
                                var q = a[p];
                                if (typeof q === "function")if (k &&
                                    a.properties[p])a.intercept(p, o, j); else o instanceof Array ? o.forEach(function (r) {
                                    n(q, r)
                                }) : n(q, o); else a[p] = o
                            }
                        }
                    });
                    if (e)if (e.length)this._log("Applying Extension Points for: '" + b + "'\n\t* " + e.join("\n\t* ")); else i.debug >= 5 && this._log("No Extension Points for: '" + b + "'")
                }
            } else i.debug >= 4 && this._log("Applying Extension Points for: '" + b + "' (target mark does not exist)")
        }, _getExtension: function (a, b) {
            var c;
            if (f.array.is(a))for (var d = a.length - 1, e; d >= 0;) {
                if ((c = f.getOwn(this._components, a[d--])) && (e = c.get(b)) !==
                    undefined)return e
            } else if (c = f.getOwn(this._components, a))return c.get(b)
        }, _getComponentExtensions: function (a) {
            return f.getOwn(this._components, a)
        }, _getConstantExtension: function (a, b) {
            a = this._getExtension(a, b);
            if (!f.fun.is(a))return a
        }
    });
    f.type("pvc.BasePanel", i.Abstract).add(i.visual.Interactive).init(function (a, b, c) {
        this.chart = a;
        this.base();
        this.axes = Object.create(a.axes);
        if (c) {
            if (c.scenes) {
                this._sceneTypeExtensions = c.scenes;
                delete c.scenes
            }
            var d = c.axes;
            if (d) {
                f.copy(this.axes, d);
                delete c.axes
            }
        }
        $.extend(this,
            c);
        if (!this.axes.color)this.axes.color = a.axes.color;
        this.position = {};
        d = c && c.margins;
        if (!b && d === undefined)d = 3;
        this.margins = new E(d);
        this.paddings = new E(c && c.paddings);
        this.size = new M(c && c.size);
        this.sizeMax = new M(c && c.sizeMax);
        if (b) {
            this.parent = b;
            this.isTopRoot = false;
            this.root = (this.isRoot = b.chart !== a) ? this : b.root;
            this.topRoot = b.topRoot;
            this._ibits = b._ibits;
            if (this.isRoot) {
                this.position.left = a.left;
                this.position.top = a.top
            }
            b._addChild(this)
        } else {
            this.parent = null;
            this.root = this;
            this.topRoot = this;
            this.isTopRoot =
                this.isRoot = true;
            this._ibits = a._ibits
        }
        this.data = (this.isRoot ? a : b).data;
        if (this.isRoot)this.offset = this.alignTo = this.align = this.anchor = null; else {
            this.align = i.parseAlign(this.anchor, this.align);
            b = this.alignTo;
            c = this.anchor;
            if (b != null && b !== "" && (c === "left" || c === "right")) {
                if (b !== "page-middle")b = isNaN(+b.charAt(0)) ? i.parseAlign(c, b) : L.parse(b)
            } else b = this.align;
            this.alignTo = b;
            this.offset = new W(this.offset)
        }
        if (this.borderWidth == null) {
            var e;
            if (b = this._getExtensionId())if (this._getExtension(b, "strokeStyle") !=
                null) {
                e = +this._getConstantExtension(b, "lineWidth");
                if (isNaN(e) || !isFinite(e))e = null
            }
            this.borderWidth = e == null ? 0 : 1.5
        }
        e = i.visual.Interactive;
        b = this._ibits;
        b = f.bit.set(b, e.Clickable, a._ibits & e.Clickable && !!this.clickAction);
        this._ibits = b = f.bit.set(b, e.DoubleClickable, a._ibits & e.DoubleClickable && !!this.doubleClickAction)
    })

    .add({
        chart: null,
        parent: null,
        _children: null,
        type: t.Panel,
        _extensionPrefix: "",
        _rubberSelectableMarks: null,
        height: null,
        width: null,
        borderWidth: null,
        anchor: "top",
        pvPanel: null,
        margins: null,
        paddings: null,
        isRoot: false,
        isTopRoot: false,
        root: null,
        topRoot: null,
        _layoutInfo: null,
        _signs: null,
        data: null,
        dataPartValue: null,
        _animating: 0,
        _selectingByRubberband: false,
        _v1DimRoleName: {series: "series", category: "category", value: "value"},
        _sceneTypeExtensions: null,
        clickAction: null,
        doubleClickAction: null,
        compatVersion: function (a) {
            return this.chart.compatVersion(a)
        },
        _createLogInstanceId: function () {
            return "" + this.constructor + this.chart._createLogChildSuffix()
        },
        _getLegendBulletRootScene: function () {
            return this.chart._getLegendBulletRootScene()
        },
        _addChild: function (a) {
            a.parent === this || f.assert("Child has a != parent.");
            (this._children || (this._children = [])).push(a)
        },
        _addSign: function (a) {
            f.array.lazy(this, "_signs").push(a);
            a.selectableByRubberband() && f.array.lazy(this, "_rubberSelectableMarks").push(a.pvMark)
        },
        visibleData: function (a) {
            return this.chart.visibleData(this.dataPartValue, a)
        },
        partData: function () {
            return this.chart.partData(this.dataPartValue)
        },
        layout: function (a, b) {
            if (!this._layoutInfo || f.get(b, "force", false)) {
                var c = f.get(b, "referenceSize");
                if (!c && a)c = f.copyOwn(a);
                var d = this.size.resolve(c), e = this.sizeMax.resolve(c);
                if (!a) {
                    if (d.width == null || d.height == null)
                        throw f.error.operationInvalid("Panel layout without width or height set.");

                    a = f.copyOwn(d)
                }
                if (!c && a)c = f.copyOwn(a);
                if (e.width != null && a.width > e.width)
                    a.width = e.width;

                if (e.height != null && a.height > e.height)
                    a.height = e.height;

                e = this.borderWidth / 2;
                var g = (f.get(b, "margins") || this.margins).resolve(c),
                    h = (f.get(b, "paddings") || this.paddings).resolve(c),
                    j = E.inflate(g, e),
                    k = E.inflate(h, e),
                    m = j.width + k.width,
                    l = j.height + k.height;

                e = new M(Math.max(a.width - m, 0), Math.max(a.height - l, 0));
                var n = f.copyOwn(d);
                if (n.width != null)
                    n.width = Math.max(n.width - m, 0);

                if (n.height != null)
                    n.height = Math.max(n.height - l, 0);

                d = this._layoutInfo || null;
                b = f.get(b, "canChange", true);
                c = this._layoutInfo = {
                    canChange: b,
                    referenceSize: c,
                    realMargins: g,
                    realPaddings: h,
                    borderWidth: this.borderWidth,
                    margins: j,
                    paddings: k,
                    desiredClientSize: n,
                    clientSize: e,
                    pageClientSize: d ? d.pageClientSize : e.clone(),
                    previous: d
                };
                if (d) {
                    delete d.previous;
                    delete d.pageClientSize
                }
                if (g = this._calcLayout(c)) {
                    c.clientSize = g;
                    a = {width: g.width + m, height: g.height + l}
                } else {
                    a = a;
                    g = e
                }

                this.isVisible = g.width > 0 && g.height > 0;
                delete c.desiredClientSize;
                this.width = a.width;
                this.height = a.height;
                !b && d && delete c.previous;
                if (i.debug >= 5) {
                    this._log("Size       = " + i.stringify(a));
                    this._log("Margins    = " + i.stringify(c.margins));
                    this._log("Paddings   = " + i.stringify(c.paddings));
                    this._log("ClientSize = " + i.stringify(c.clientSize))
                }
                this._onLaidOut()
            }
        },
        _onLaidOut: function () {
            this.isRoot && this.chart._onLaidOut()
        },
        _calcLayout: function (a) {
            function b(y, w, z) {
                for (var v = 0; y--;) {
                    if (w.call(z, y, v) === false)return true;
                    v++
                }
                return false
            }

            function c(y, w) {
                o && m._group("LayoutCycle #" + (w + 1) + " (remaining: " + y + ")");
                try {
                    y = y > 0;
                    l = new E(0);
                    n = f.copyOwn(k);
                    var z;
                    w = 0;
                    for (var v = A.length; w < v;) {
                        z = A[w];
                        o && m._group("SIDE Child #" + (w + 1) + " at " + z.anchor);
                        try {
                            if (d.call(this, z, y))return true
                        } finally {
                            o && m._groupEnd()
                        }
                        w++
                    }
                    w = 0;
                    for (v = u.length; w < v;) {
                        z = u[w];
                        o && m._group("FILL Child #" + (w + 1));
                        try {
                            if (d.call(this, z, y))return true
                        } finally {
                            o && m._groupEnd()
                        }
                        w++
                    }
                    return false
                } finally {
                    o &&
                    m._groupEnd()
                }
            }

            function d(y, w) {
                var z = false, v;
                x.canChange = w;
                b(3, function (B, G) {
                    o && m._group("Attempt #" + (G + 1));
                    try {
                        x.paddings = v;
                        x.canChange = B > 0;
                        y.layout(new M(n), x);
                        if (y.isVisible) {
                            if (z = g.call(this, y, w))return false;
                            var K = y._layoutInfo.requestPaddings;
                            if (e(v, K)) {
                                v = K;
                                if (B > 0) {
                                    v = new E(v);
                                    o && this._log("Child requested paddings change: " + i.stringify(v));
                                    return true
                                }
                                i.debug >= 2 && this._warn("Child requests paddings change but iterations limit has been reached.")
                            }
                            h.call(this, y);
                            y.anchor !== "fill" && j.call(this, y)
                        }
                        return false
                    } finally {
                        o && m._groupEnd()
                    }
                }, this);
                return z
            }

            function e(y, w) {
                if (!w)return false;
                return f.query(E.names).each(function (z) {
                    if (Math.abs((w && w[z] || 0) - (y && y[z] || 0)) >= 0.1)return false
                })
            }

            function g(y, w) {
                var z = false, v = y.width - n.width;
                if (v > 0) {
                    i.debug >= 3 && this._log("Child added width = " + v);
                    if (w) {
                        z = true;
                        n.width += v;
                        k.width += v
                    } else i.debug >= 2 && this._warn("Child wanted more width, but layout iterations limit has been reached.")
                }
                y = y.height - n.height;
                if (y > 0) {
                    i.debug >= 3 && this._log("Child added height =" +
                    y);
                    if (w) {
                        z = true;
                        n.height += y;
                        k.height += y
                    } else i.debug >= 2 && this._warn("Child wanted more height, but layout iterations limit has been reached.")
                }
                return z
            }

            function h(y) {
                var w = y.anchor, z = y.align, v = y.alignTo, B;
                if (w === "fill") {
                    w = "left";
                    B = l.left + n.width / 2 - y.width / 2;
                    z = v = "middle"
                } else B = l[w];
                var G, K;
                switch (z) {
                    case "top":
                    case "bottom":
                    case "left":
                    case "right":
                        G = z;
                        K = 0;
                        break;
                    case "center":
                    case "middle":
                        G = r[q[w]];
                        K = -y[p[G]] / 2;
                        break
                }
                var S, J;
                switch (v) {
                    case "top":
                    case "bottom":
                    case "left":
                    case "right":
                        J = v;
                        S = J !== G ?
                            n[p[G]] : 0;
                        break;
                    case "center":
                    case "middle":
                        J = r[q[w]];
                        S = n[p[G]] / 2;
                        break;
                    case "page-center":
                    case "page-middle":
                        J = r[q[w]];
                        z = p[G];
                        S = Math.min(n[z], a.pageClientSize[z]) / 2;
                        break
                }
                K = l[J] + S + K;
                if (J = y.offset.resolve(n)) {
                    B += J[s[w]] || 0;
                    K += J[s[G]] || 0
                }
                if (y.keepInBounds) {
                    if (B < 0)B = 0;
                    if (K < 0)K = 0
                }
                y.setPosition(f.set({}, w, B, G, K))
            }

            function j(y) {
                var w = y.anchor, z = p[w];
                y = y[z];
                l[w] += y;
                n[z] -= y
            }

            var k, m = this, l, n, o;

            if (m._children) {
                var p = i.BasePanel.orthogonalLength,
                    q = i.BasePanel.relativeAnchor,
                    r = i.BasePanel.leftTopAnchor,
                    s = W.namesSidesToOffset,
                    u = [], A = [];

                m._children.forEach(function (y) {
                    var w = y.anchor;
                    if (w)
                        if (w === "fill")
                            u.push(y);
                        else {
                            var has = f.hasOwn(q, w);

                            if (!has) {
                                f.fail.operationInvalid("Unknown anchor value '{0}'", [w]);
                            }

                            A.push(y)
                        }
                });
                o = i.debug >= 5;
                k = f.copyOwn(a.clientSize);
                var x = {force: true, referenceSize: k};
                o && m._group("CCC DOCK LAYOUT clientSize = " + i.stringify(k));
                try {
                    b(5, c, m)
                } finally {
                    o && m._groupEnd()
                }
            }

            return k
        },
        invalidateLayout: function () {
            this._layoutInfo = null;
            this._children && this._children.forEach(function (a) {
                a.invalidateLayout()
            })
        },
        _create: function (a) {
            if (!this.pvPanel || a) {
                var b;
                delete this._invalidDataError;
                this.pvPanel = null;
                if (this.pvRootPanel)
                    this.pvRootPanel = null;

                delete this._signs;
                try {
                    this.layout()
                } catch (c) {
                    if (c instanceof InvalidDataException)this._invalidDataError = b = c; else throw c;
                }

                if (!(this.isTopRoot && this.chart._isMultiChartOverflowClip))
                    if (this.isVisible) {
                        this.isRoot && this._creating();
                        var d = this._layoutInfo.margins;
                        a = this._layoutInfo.paddings;
                        if (this.isTopRoot) {
                            this.pvRootPanel = this.pvPanel = (new t.Panel).canvas(this.chart.options.canvas);
                            this.pvRootPanel.lock("data",
                                [new i.visual.Scene(null, {panel: this})]);
                            if (d.width > 0 || d.height > 0) {
                                this.pvPanel.width(this.width).height(this.height);
                                this.pvPanel = this.pvPanel.add(t.Panel)
                            }
                        } else
                            this.pvPanel = this.parent.pvPanel.add(this.type);

                        var e = this.pvPanel, g = this.width - d.width, h = this.height - d.height;
                        e.width(g).height(h);
                        if (i.debug >= 15 && (d.width > 0 || d.height > 0))
                            (this.isTopRoot ? this.pvRootPanel : this.parent.pvPanel)
                                .add(this.type)
                                .width(this.width)
                                .height(this.height)
                                .left(this.position.left != null ? this.position.left : null)
                                .right(this.position.right != null ? this.position.right : null)
                                .top(this.position.top != null ? this.position.top : null)
                                .bottom(this.position.bottom != null ? this.position.bottom : null)
                                .strokeStyle("orange")
                                .lineWidth(1)
                                .strokeDasharray("- .");

                        var j = {};

                        f.eachOwn(this.position, function (l, n) {
                            e[n](l + d[n]);
                            j[this.anchorLength(n)] = true
                        }, this);

                        if (!j.width) {
                            d.left > 0 && e.left(d.left);
                            d.right > 0 && e.right(d.right)
                        }

                        if (!j.height) {
                            d.top > 0 && e.top(d.top);
                            d.bottom > 0 && e.bottom(d.bottom)
                        }

                        if (a.width > 0 || a.height > 0)
                            this.pvPanel = e.add(t.Panel)
                                .width(g - a.width)
                                .height(h - a.height)
                                .left(a.left).top(a.top);

                        e.borderPanel = e;
                        e.paddingPanel = this.pvPanel;
                        this.pvPanel.paddingPanel = this.pvPanel;
                        this.pvPanel.borderPanel = e;

                        if (i.debug >= 15) {
                            this.pvPanel.strokeStyle("lightgreen").lineWidth(1).strokeDasharray("- ");
                            this.pvPanel !== e && e.strokeStyle("blue").lineWidth(1).strokeDasharray(". ")
                        }

                        a = this._getExtensionId();
                        new i.visual.Panel(this, null, {panel: e, extensionId: a});

                        if (!b)try {
                            this._createCore(this._layoutInfo)
                        } catch (k) {
                            if (k instanceof InvalidDataException)this._invalidDataError =
                                b = k; else throw k;
                        }

                        b && this.chart.extend(
                            e.anchor("center")
                                .add(t.Label)
                                .text(b.message),
                            "invalidDataMessage");

                        if (this.isTopRoot) {
                            this.chart._multiChartOverflowClipped && this._addMultichartOverflowClipMarker();
                            this._initSelection()
                        }

                        this.applyExtensions();

                        if (this.isRoot && i.debug > 5) {
                            var m = ["SCALES SUMMARY", i.logSeparator];
                            this.chart.axesList.forEach(function (l) {
                                var n = l.scale;
                                if (n) {
                                    var o = n.domain && n.domain();
                                    n = n.range && n.range();
                                    m.push(l.id);
                                    m.push("    domain: " + (!o ? "?" : i.stringify(o)));
                                    m.push("    range : " +
                                    (!n ? "?" : i.stringify(n)))
                                }
                            }, this);
                            this._log(m.join("\n"))
                        }
                    }
            }
        },
        _creating: function () {
            this._children && this._children.forEach(function (a) {
                a._creating()
            })
        },
        _createCore: function () {
            this._children && this._children.forEach(function (a) {
                a._create()
            })
        },
        render: function (a) {
            if (!this.isTopRoot)
                return this.topRoot.render(a);

            var _r = f.get(a, "recreate", false);
            this._create(_r);
            if (!(this.isTopRoot && this.chart._isMultiChartOverflowClip))
                if (this.isVisible) {
                    var b = this.pvRootPanel;
                    if (this._invalidDataError)
                        b.render();
                    else {
                        this._onRender();
                        var c = this._animating;
                        this._animating = this.chart.animatable() && !f.get(a, "bypassAnimation", false) ? 1 : 0;
                        try {
                            b.render();
                            if (this._animating) {
                                this._animating = 2;
                                var d = this;
                                b.transition().duration(2E3).ease("cubic-in-out").start(function () {
                                    if (c)c = 0; else {
                                        d._animating = 0;
                                        d._onRenderEnd(true)
                                    }
                                })
                            } else this._onRenderEnd(false)
                        } finally {
                            this._animating = 0
                        }
                    }
                }
        },
        _onRender: function () {
            var a = this.chart.options.renderCallback;
            if (a)if (this.compatVersion() <= 1)a.call(this.chart); else {
                var b = this.context();
                a.call(b, b.scene)
            }
        },
        _onRenderEnd: function (a) {
            this._children && this._children.forEach(function (b) {
                b._onRenderEnd(a)
            })
        },
        renderInteractive: function () {
            if (this.isVisible) {
                var a = this._getSelectableMarks();
                if (a && a.length)a.forEach(function (b) {
                    b.render()
                }); else if (!this._children) {
                    this.pvPanel.render();
                    return
                }
                this._children && this._children.forEach(function (b) {
                    b.renderInteractive()
                })
            }
        },
        _getSelectableMarks: function () {
            return this._rubberSelectableMarks
        },
        animate: function (a, b) {
            return this.topRoot._animating === 1 ? a : b
        },
        animatingStart: function () {
            return this.topRoot._animating ===
                1
        },
        animating: function () {
            return this.topRoot._animating > 0
        },
        setPosition: function (a) {
            for (var b in a)if (f.hasOwn(E.namesSet, b)) {
                var c = a[b];
                if (c === null)delete this.position[b]; else {
                    c = +c;
                    if (!isNaN(c) && isFinite(c))this.position[b] = c
                }
            }
        },
        createAnchoredSize: function (a, b) {
            if (this.isAnchorTopOrBottom())return new M(b.width, Math.min(b.height, a));
            return new M(Math.min(b.width, a), b.height)
        },
        applyExtensions: function () {
            this._signs && this._signs.forEach(function (a) {
                a.applyExtensions()
            })
        },
        extend: function (a, b, c) {
            this.chart.extend(a,
                this._makeExtensionAbsId(b), c)
        },
        extendAbs: function (a, b, c) {
            this.chart.extend(a, b, c)
        },
        _extendSceneType: function (a, b, c) {
            (a = f.get(this._sceneTypeExtensions, a)) && i.extendType(b, a, c)
        },
        _absBaseExtId: {abs: "base"},
        _absSmallBaseExtId: {abs: "smallBase"},
        _getExtensionId: function () {
            if (this.isRoot)return !this.chart.parent ? this._absBaseExtId : this._absSmallBaseExtId
        },
        _getExtensionPrefix: function () {
            return this._extensionPrefix
        },
        _makeExtensionAbsId: function (a) {
            return i.makeExtensionAbsId(a, this._getExtensionPrefix())
        },
        _getExtension: function (a, b) {
            return this.chart._getExtension(this._makeExtensionAbsId(a), b)
        },
        _getExtensionAbs: function (a, b) {
            return this.chart._getExtension(a, b)
        },
        _getConstantExtension: function (a, b) {
            return this.chart._getConstantExtension(this._makeExtensionAbsId(a), b)
        },
        getPvPanel: function (a) {
            var b = this.pvPanel;
            if (!a)return b;
            if (!this.parent)throw f.error.operationInvalid("Layers are not possible in a root panel.");
            if (!b)throw f.error.operationInvalid("Cannot access layer panels without having created the main panel.");
            var c = null;
            if (this._layers)c = this._layers[a]; else this._layers = {};
            if (!c) {
                var d = c = this.parent.pvPanel.borderPanel.add(this.type).extend(b.borderPanel);
                if (b !== b.borderPanel)c = d.add(t.Panel).extend(b);
                d.borderPanel = d;
                d.paddingPanel = c;
                c.paddingPanel = c;
                c.borderPanel = d;
                this.initLayerPanel(c, a);
                this._layers[a] = c
            }
            return c
        },
        initLayerPanel: function () {
        },
        _getV1DimName: function (a) {
            var b = this._v1DimName || (this._v1DimNameCache = {}), c = b[a];
            if (c == null) {
                c = (c = this.chart.visualRoles[this._v1DimRoleName[a]]) ? c.firstDimensionName() :
                    "";
                b[a] = c
            }
            return c
        },
        _getV1Datum: function (a) {
            return a.datum
        },
        context: function () {
            var a = this._context;
            if (!a || a.isPinned)a = this._context = new i.visual.Context(this); else Ra.call(a);
            return a
        },
        _isTooltipEnabled: function () {
            return !this.selectingByRubberband() && !this.animating()
        },
        _getTooltipFormatter: function (a) {
            var b = this.compatVersion() <= 1, c = a.format;
            if (!c) {
                if (!b)return this._summaryTooltipFormatter;
                c = this.chart.options.v1StyleTooltipFormat;
                if (!c)return
            }
            if (b)return function (d) {
                return c.call(d.panel, d.getV1Series(),
                    d.getV1Category(), d.getV1Value() || "", d.getV1Datum())
            };
            return function (d) {
                return c.call(d, d.scene)
            }
        },
        _summaryTooltipFormatter: function (a) {
            function b(q, r) {
                m.push("<b>" + q + "</b>: " + (f.html.escape(r) || " - ") + "<br/>")
            }

            function c(q, r) {
                q = e ? e.dimensions(r).percentOverParent(k) : j.dimensions(r).percent(q.value, k);
                return n(q)
            }

            var d = a.scene;
            if (!d.datum)return "";
            var e = d.group, g = e && e.count() > 1, h = d.datum;
            if (!g && (!h || h.isNull))return "";
            var j = d.data(), k = {visible: true}, m = [];
            if (h.isInterpolated)m.push("<i>Interpolation</i>: " +
            f.html.escape(h.interpolation) + "<br/>"); else h.isTrend && m.push("<i>" + f.html.escape(h.trend.label) + "</i><br/>");
            h = j.type;
            var l = a.panel.stacked === false ? null : h.getPlayingPercentVisualRoleDimensionMap(), n = l ? a.chart.options.percentValueFormat : null, o = g ? e.atoms : d.datum.atoms, p = false;
            h.sortDimensionNames(f.keys(o)).forEach(function (q) {
                var r = o[q];
                if (!r.dimension.type.isHidden)if (!g || r.value != null) {
                    p = true;
                    var s = r.label;
                    if (l && l.has(q))s += " (" + c(r, q) + ")";
                    b(f.html.escape(r.dimension.type.label), s)
                }
            });
            if (g) {
                p &&
                m.push("<hr />");
                m.push("<b>#</b>: " + e._datums.length + "<br/>");
                h.sortDimensionNames(e.freeDimensionsNames()).forEach(function (q) {
                    var r = e.dimensions(q);
                    if (!r.type.isHidden) {
                        var s = f.html.escape(r.type.label);
                        if (r.type.valueType === Number) {
                            r = r.format(r.sum(k));
                            if (l && l.has(q))r += " (" + c(null, q) + ")";
                            s = "&sum; " + s
                        } else r = r.atoms(k).map(function (u) {
                            return u.label || "- "
                        }).join(", ");
                        b(s, r)
                    }
                })
            }
            return '<div style="text-align: left;">' + m.join("\n") + "</div>"
        },
        _onClick: function (a) {
            var b = this.clickAction;
            if (b)this.compatVersion() <=
            1 ? this._onV1Click(a, b) : b.call(a, a.scene)
        },
        _onDoubleClick: function (a) {
            var b = this.doubleClickAction;
            if (b)this.compatVersion() <= 1 ? this._onV1DoubleClick(a, b) : b.call(a, a.scene)
        },
        _onV1Click: function (a, b) {
            b.call(a.pvMark, a.getV1Series(), a.getV1Category(), a.getV1Value(), a.event, a.getV1Datum())
        },
        _onV1DoubleClick: function (a, b) {
            b.call(a.pvMark, a.getV1Series(), a.getV1Category(), a.getV1Value(), a.event, a.getV1Datum())
        },
        _addMultichartOverflowClipMarker: function () {
            function a(d) {
                var e = d.shapeRadius();
                if (e == null) {
                    d =
                        d.shapeSize();
                    if (d != null)e = Math.sqrt(d)
                }
                return e || b
            }

            var b = 5, c = (new i.visual.Dot(this, this.pvPanel, {
                noSelect: true,
                noHover: true,
                noClick: true,
                noDoubleClick: true,
                noTooltip: false,
                freePosition: true,
                extensionId: "multiChartOverflowMarker"
            })).lock("data").pvMark.shape("triangle").shapeRadius(b).top(null).left(null).bottom(function () {
                return a(this) + 10
            }).right(function () {
                return a(this) + 10
            }).shapeAngle(0).lineWidth(1.5).strokeStyle("red").fillStyle("rgba(255, 0, 0, 0.2)");
            f.fun.is(c.tooltip) && c.tooltip("Some charts did not fit the available space.")
        },
        selectingByRubberband: function () {
            return this.topRoot._selectingByRubberband
        },
        _initSelection: function () {
            var a = this, b = a.chart;
            if (a.interactive()) {
                var c = a.unselectable(), d = a.selectableByRubberband();
                if (d || c) {
                    var e = a.data, g = a.pvRootPanel || a.pvPanel.paddingPanel;
                    a._getExtensionAbs("base", "fillStyle") || g.fillStyle(i.invisibleFill);
                    g.lock("events", "all");
                    if (d) {
                        a._selectingByRubberband = false;
                        var h, j, k = this.selectBar = (new i.visual.Bar(a, g, {
                            extensionId: "rubberBand", normalStroke: true, noHover: true, noSelect: true,
                            noClick: true, noDoubleClick: true, noTooltip: true
                        })).override("defaultStrokeWidth", f.fun.constant(1.5)).override("defaultColor", function (l, n) {
                                return n === "stroke" ? "#86fe00" : "rgba(203, 239, 163, 0.6)"
                            }).override("interactiveColor", function (l, n) {
                                return n
                            }).pvMark.lock("visible", function () {
                                return !!j
                            }).lock("left", function () {
                                return j.x
                            }).lock("right").lock("top", function () {
                                return j.y
                            }).lock("bottom").lock("width", function () {
                                return j.dx
                            }).lock("height", function () {
                                return j.dy
                            }).lock("cursor").lock("events",
                            "none"), m;
                        g.intercept("data", function () {
                            var l = this.delegate();
                            l && l.forEach(function (n) {
                                if (n.x == null)n.x = n.y = n.dx = n.dy = 0
                            });
                            return l
                        }).event("mousedown", t.Behavior.select().autoRender(false)).event("select", function (l) {
                            if (j)j = new t.Shape.Rect(l.x, l.y, l.dx, l.dy); else {
                                if (a.animating())return;
                                if (l.dx * l.dx + l.dy * l.dy <= 4)return;
                                j = new t.Shape.Rect(l.x, l.y, l.dx, l.dy);
                                a._selectingByRubberband = true;
                                h || (h = g.toScreenTransform());
                                a.rubberBand = j.apply(h)
                            }
                            k.render()
                        }).event("selectend", function () {
                            if (j) {
                                var l = arguments[arguments.length -
                                1];
                                h || (h = g.toScreenTransform());
                                var n = j.apply(h);
                                j = null;
                                a._selectingByRubberband = false;
                                k.render();
                                try {
                                    a._processRubberBand(n, l)
                                } finally {
                                    m = new Date
                                }
                            }
                        });
                        c && g.event("click", function () {
                            if (m)if (new Date - m < 300) {
                                m = null;
                                return
                            }
                            e.clearSelected() && b.updateSelections()
                        })
                    } else c && g.event("click", function () {
                        e.clearSelected() && b.updateSelections()
                    })
                }
            }
        },
        _processRubberBand: function (a, b, c) {
            this.rubberBand = a;
            try {
                this._onRubberBandSelectionEnd(b, c)
            } finally {
                this.rubberBand = null
            }
        },
        _onRubberBandSelectionEnd: function (a,
                                             b) {
            i.debug >= 20 && this._log("rubberBand " + i.stringify(this.rubberBand));
            b = Object.create(b || {});
            b.toggle = false;
            var c = this._getDatumsOnRubberBand(a, b);
            if (c) {
                var d = this.chart;
                d._updatingSelections(function () {
                    if (!a.ctrlKey && d.options.ctrlSelectMode) {
                        d.data.owner.clearSelected();
                        i.data.Data.setSelected(c, true)
                    } else b.toggle ? i.data.Data.toggleSelected(c) : i.data.Data.setSelected(c, true)
                })
            }
        },
        _getDatumsOnRubberBand: function (a, b) {
            a = new f.Map;
            this._getDatumsOnRect(a, this.rubberBand, b);
            b = a.values();
            if (b.length)if ((b =
                    this.chart._onUserSelection(b)) && !b.length)b = null;
            return b
        },
        _getDatumsOnRect: function (a, b, c) {
            this._getOwnDatumsOnRect(a, b, c);
            var d = this._children;
            d && d.forEach(function (e) {
                e._getDatumsOnRect(a, b, c)
            })
        },
        _getOwnDatumsOnRect: function (a, b, c) {
            var d = this;
            if (!d.isVisible)return false;
            d = d._getSelectableMarks();
            if (!d || !d.length)return false;
            var e = a.count, g = f.get(c, "markSelectionMode"), h = function (k) {
                k.isNull || a.set(k.id, k)
            }, j = function (k) {
                k.selectableByRubberband() && k.datums().each(h)
            };
            d.forEach(function (k) {
                k.eachSceneWithDataOnRect(b,
                    j, null, g)
            });
            return e < a.count
        },
        isAnchorTopOrBottom: function (a) {
            if (!a)a = this.anchor;
            return a === "top" || a === "bottom"
        },
        isOrientationVertical: function (a) {
            return this.chart.isOrientationVertical(a)
        },
        isOrientationHorizontal: function (a) {
            return this.chart.isOrientationHorizontal(a)
        }
    })

    .addStatic({
        relativeAnchor: {top: "left", bottom: "left", left: "bottom", right: "bottom"},
        leftBottomAnchor: {top: "bottom", bottom: "bottom", left: "left", right: "left"},
        leftTopAnchor: {top: "top", bottom: "top", left: "left", right: "left"},
        horizontalAlign: {
            top: "right",
            bottom: "left", middle: "center", right: "right", left: "left", center: "center"
        },
        verticalAlign: {top: "top", bottom: "bottom", middle: "middle", right: "bottom", left: "top", center: "middle"},
        verticalAlign2: {top: "top", bottom: "bottom", middle: "middle", right: "top", left: "bottom", center: "middle"},
        relativeAnchorMirror: {top: "right", bottom: "right", left: "top", right: "top"},
        oppositeAnchor: {top: "bottom", bottom: "top", left: "right", right: "left"},
        parallelLength: {top: "width", bottom: "width", right: "height", left: "height"},
        orthogonalLength: {
            top: "height",
            bottom: "height", right: "width", left: "width"
        },
        oppositeLength: {width: "height", height: "width"}
    });
    f.scope(function () {
        var a = i.BasePanel, b = {};
        f.eachOwn({
            anchorOrtho: "relativeAnchor",
            anchorOrthoMirror: "relativeAnchorMirror",
            anchorOpposite: "oppositeAnchor",
            anchorLength: "parallelLength",
            anchorOrthoLength: "orthogonalLength"
        }, function (c, d) {
            var e = a[c];
            b[d] = function (g) {
                return e[g || this.anchor]
            }
        });
        a.add(b)
    });
    f.type("pvc.PlotPanel", i.BasePanel).init(function (a, b, c, d) {
        this.base(a, b, d);
        this.plot = c;
        this._extensionPrefix =
            c.extensionPrefixes;
        this.dataPartValue = c.option("DataPart");
        this.axes.color = a._getAxis("color", (c.option("ColorAxis") || 0) - 1);
        this.orientation = c.option("Orientation");
        this.valuesVisible = c.option("ValuesVisible");
        this.valuesAnchor = c.option("ValuesAnchor");
        this.valuesMask = c.option("ValuesMask");
        this.valuesFont = c.option("ValuesFont");
        this.valuesOptimizeLegibility = c.option("ValuesOptimizeLegibility");
        b = this.visualRoles = Object.create(a.visualRoles);
        c = c.option("ColorRole");
        b.color = c ? a.visualRole(c) : null;
        this.chart._addPlotPanel(this)
    }).add({
        anchor: "fill", visualRoles: null, _getExtensionId: function () {
            var a = ["chart", "plot"];
            this.plotName && a.push(this.plotName);
            return a
        }, defaultLegendGroupScene: function () {
            var a = this.axes.color;
            if (a && a.option("LegendVisible") && a.isBound())return f.query(a.dataCells).where(function (b) {
                return b.plot === this.plot
            }, this).select(function (b) {
                return b.legendGroupScene()
            }).first(f.notNully)
        }, isOrientationVertical: function () {
            return this.orientation === i.orientation.vertical
        }, isOrientationHorizontal: function () {
            return this.orientation ===
                i.orientation.horizontal
        }
    });
    f.type("pvc.MultiChartPanel", i.BasePanel).add({
        anchor: "fill", createSmallCharts: function () {
            var a = this.chart, b = a._multiInfo, c;
            if (b && (c = b.count)) {
                var d = this._getCoordinatedRootAxesByScopeType(), e, g, h;
                if (d) {
                    e = {};
                    g = function (s, u, A) {
                        u = f.array.lazy(e, u);
                        f.array.lazy(u, A).push(s)
                    };
                    h = function (s) {
                        d.row && g(s, "row", s.smallRowIndex);
                        d.column && g(s, "column", s.smallColIndex);
                        d.global && g(s, "global", 0)
                    }
                }
                for (var j = this._buildSmallChartsBaseOptions(), k = a.constructor, m = b.smallDatas, l = b.colCount,
                         n = 0; n < c; n++) {
                    var o = m[n], p = n % l, q = Math.floor(n / l);
                    o = f.set(Object.create(j), "smallColIndex", p, "smallRowIndex", q, "title", o.absLabel, "data", o);
                    o = new k(o);
                    if (d) {
                        o._createPhase1();
                        h(o)
                    } else o._create()
                }
                if (d) {
                    var r = this;
                    f.eachOwn(d, function (s, u) {
                        s.forEach(function (A) {
                            e[u].forEach(function (x) {
                                r._coordinateScopeAxes(A.id, x)
                            })
                        })
                    });
                    a.children.forEach(function (s) {
                        s._createPhase2()
                    })
                }
                b.coordScopesByType = e
            }
        }, _getCoordinatedRootAxesByScopeType: function () {
            var a = false, b = f.query(this.chart.axesList).multipleIndex(function (c) {
                if (c.scaleType !==
                    "discrete" && c.option.isDefined("DomainScope")) {
                    c = c.option("DomainScope");
                    if (c !== "cell") {
                        a = true;
                        return c
                    }
                }
            });
            return a ? b : null
        }, _coordinateScopeAxes: function (a, b) {
            var c = f.query(b).select(function (d) {
                d = d.axes[a].scale;
                if (!d.isNull) {
                    d = d.domain();
                    return {min: d[0], max: d[1]}
                }
            }).reduce(i.unionExtents, null);
            c && b.forEach(function (d) {
                d = d.axes[a];
                var e = d.scale;
                if (!e.isNull) {
                    e.domain(c.min, c.max);
                    d.setScale(e)
                }
            })
        }, _buildSmallChartsBaseOptions: function () {
            var a = this.chart, b = a.options;
            return f.set(Object.create(b),
                "parent", a, "legend", false, "titleFont", b.smallTitleFont, "titlePosition", b.smallTitlePosition, "titleAlign", b.smallTitleAlign, "titleAlignTo", b.smallTitleAlignTo, "titleOffset", b.smallTitleOffset, "titleKeepInBounds", b.smallTitleKeepInBounds, "titleMargins", b.smallTitleMargins, "titlePaddings", b.smallTitlePaddings, "titleSize", b.smallTitleSize, "titleSizeMax", b.smallTitleSizeMax)
        }, _calcLayout: function (a) {
            var b = this.chart, c = b._multiInfo;
            if (c) {
                var d = b.multiOptions.option, e = b.smallOptions.option, g = a.clientSize,
                    h = a.previous, j = h ? h.initialClientWidth : g.width;
                h = h ? h.initialClientHeight : g.height;
                var k = e("Width");
                if (k != null)k = L.resolve(k, j);
                var m = e("Height");
                if (m != null)m = L.resolve(m, h);
                e = e("AspectRatio");
                var l = c.rowCount, n = c.colCount;
                if (k == null)if (isFinite(c.colsMax))k = g.width / n; else {
                    if (m == null)m = h;
                    k = e * m
                }
                if (m == null)m = l === 1 && d("SingleRowFillsHeight") || n === 1 && d("SingleColFillsHeight") ? h : k / e;
                c = k * n;
                e = m * l;
                if (!b._isMultiChartOverflowClipRetry) {
                    b._isMultiChartOverflowClip = false;
                    switch (d("Overflow")) {
                        case "fit":
                            if (c >
                                j) {
                                c = j;
                                k = c / n
                            }
                            if (e > h) {
                                e = h;
                                m = e / l
                            }
                            break;
                        case "clip":
                            d = n;
                            l = l;
                            if (n = c > j)d = Math.floor(j / k);
                            var o = e > h;
                            if (o)l = Math.floor(h / m);
                            if (o || n) {
                                b._isMultiChartOverflowClip = true;
                                b._clippedMultiChartRowsMax = l;
                                b._clippedMultiChartColsMax = d
                            }
                            break
                    }
                }
                f.set(a, "initialClientWidth", j, "initialClientHeight", h, "width", k, "height", m);
                return {width: c, height: Math.max(g.height, e)}
            }
        }, _getExtensionId: function () {
            return "content"
        }, _createCore: function (a) {
            var b = this.chart;
            !b._isMultiChartOverflowClip || f.assert("Overflow&clip condition should be resolved.");
            var c = b._multiInfo;
            if (c) {
                var d = b.smallOptions.option, e = d("Margins"), g = d("Paddings");
                b.children.forEach(function (h) {
                    h._setSmallLayout({
                        left: h.smallColIndex * a.width,
                        top: h.smallRowIndex * a.height,
                        width: a.width,
                        height: a.height,
                        margins: this._buildSmallMargins(h, e, c),
                        paddings: g
                    })
                }, this);
                (d = c.coordScopesByType) && b._coordinateSmallChartsLayout(d);
                this.base(a)
            }
        }, _buildSmallMargins: function (a, b, c) {
            var d = c.colCount - 1;
            c = c.rowCount - 1;
            var e = a.smallColIndex;
            a = a.smallRowIndex;
            var g = {};
            if (e > 0)g.left = b.left;
            if (e < d)g.right =
                b.right;
            if (a > 0)g.top = b.top;
            if (a < c)g.bottom = b.bottom;
            return g
        }
    });
    f.type("pvc.TitlePanelAbstract", i.BasePanel).init(function (a, b, c) {
        c || (c = {});
        var d = c.anchor || this.anchor;
        if (c.size == null) {
            var e = c.titleSize;
            if (e != null)c.size = (new M).setSize(e, {singleProp: this.anchorOrthoLength(d)})
        }
        if (c.sizeMax == null) {
            e = c.titleSizeMax;
            if (e != null)c.sizeMax = (new M).setSize(e, {singleProp: this.anchorOrthoLength(d)})
        }
        if (c.paddings == null)c.paddings = this.defaultPaddings;
        this.base(a, b, c);
        if (c.font === undefined) {
            a = this._getExtension("label",
                "font");
            if (typeof a === "string")this.font = a
        }
    }).add({
        pvLabel: null,
        anchor: "top",
        title: null,
        titleSize: undefined,
        font: "12px sans-serif",
        defaultPaddings: 2,
        _extensionPrefix: "title",
        _calcLayout: function (a) {
            var b = new M, c = this.anchor, d = this.anchorLength(c);
            c = this.anchorOrthoLength(c);
            var e = t.Text.measureWidth(this.title, this.font) + 2, g = a.clientSize[d], h = a.desiredClientSize[d];
            if (h == null)h = e > g ? g : e; else if (h > g)h = g;
            e = e > h ? i.text.justify(this.title, h, this.font) : this.title ? [this.title] : [];
            g = t.Text.fontHeight(this.font);
            var j = e.length * g, k = a.clientSize[c], m = a.desiredClientSize[c];
            if (m == null)m = j; else if (m > k)m = k;
            if (j > m) {
                k = Math.max(1, Math.floor(m / g));
                if (e.length > k) {
                    var l = e[k];
                    e.length = k;
                    j = m = k * g;
                    e[k - 1] = i.text.trimToWidthB(h, e[k - 1] + " " + l, this.font, "..")
                }
            }
            a.lines = e;
            a.topOffset = (m - j) / 2;
            a.lineSize = {width: h, height: g};
            a.a_width = d;
            a.a_height = c;
            b[d] = h;
            b[c] = m;
            return b
        },
        _createCore: function (a) {
            var b = this._buildScene(a), c = {
                    top: 0,
                    right: Math.PI / 2,
                    bottom: 0,
                    left: -Math.PI / 2
                }, d = i.BasePanel.horizontalAlign[this.align], e = i.BasePanel.leftTopAnchor[this.anchor],
                g;
            if (this.compatVersion() <= 1)g = function (h) {
                return function () {
                    return h.call(this)
                }
            };
            this.pvLabel = (new i.visual.Label(this, this.pvPanel, {
                extensionId: "label",
                wrapper: g
            })).lock("data", b.lineScenes).pvMark[e](function (h) {
                return a.topOffset + h.vars.size.height / 2 + this.index * h.vars.size.height
            }).textAlign(d)[this.anchorOrtho(e)](function (h) {
                switch (this.textAlign()) {
                    case "center":
                        return h.vars.size.width / 2;
                    case "left":
                        return 0;
                    case "right":
                        return h.vars.size.width
                }
            }).text(function (h) {
                return h.vars.textLines[this.index]
            }).font(this.font).textBaseline("middle").textAngle(c[this.anchor])
        },
        _buildScene: function (a) {
            var b = new i.visual.Scene(null, {panel: this, source: this.chart.data}), c = a.lines;
            b.vars.size = a.lineSize;
            b.vars.textLines = c;
            b.lineScenes = f.array.create(c.length, b);
            return b
        },
        _getExtensionId: f.fun.constant("")
    });
    f.type("pvc.TitlePanel", i.TitlePanelAbstract).init(function (a, b, c) {
        c || (c = {});
        if (a.compatVersion() <= 1)if (c.titleSize == null)c.titleSize = 25;
        this._extensionPrefix = !a.parent ? "title" : "smallTitle";
        this.base(a, b, c)
    }).add({font: "14px sans-serif", defaultPaddings: 4});
    f.type("pvc.LegendPanel",
        i.BasePanel).init(function (a, b, c) {
            this.base(a, b, c);
            if (c.font === undefined)if (a = this._getConstantExtension("label", "font"))this.font = a;
            a = i.visual.Interactive;
            if (this._ibits & a.Interactive)this._ibits |= a.Clickable
        }).add({
            pvRule: null,
            pvDot: null,
            pvLabel: null,
            anchor: "bottom",
            pvLegendPanel: null,
            textMargin: 6,
            itemPadding: 2.5,
            itemSize: null,
            markerSize: 15,
            font: "10px sans-serif",
            _calcLayout: function (a) {
                return this._getBulletRootScene().layout(a)
            },
            _createCore: function (a) {
                var b = a.clientSize;
                a = this._getBulletRootScene();
                var c = a.vars.itemPadding, d = a.vars.contentSize, e = this.isAnchorTopOrBottom(), g = e ? "top" : "left", h = this.anchorOpposite(g), j = this.anchorLength(g), k = this.anchorOrthoLength(g), m = e ? "center" : "middle", l = e ? "left" : "top", n = this.anchorOpposite(l), o = 0;
                switch (this.align) {
                    case n:
                        o = b[j] - d[j];
                        break;
                    case m:
                        o = (b[j] - d[j]) / 2;
                        break
                }
                this.pvPanel.borderPanel.overflow("hidden");
                b = this.pvPanel.add(t.Panel).data(a.vars.sections)[l](o)[g](function () {
                    var r = this.sibling();
                    return r ? r[g] + r[k] + c[k] : 0
                })[j](function (r) {
                    return r.size[j]
                })[k](function (r) {
                    return r.size[k]
                });
                var p;
                if (this.compatVersion() <= 1)p = function (r) {
                    return function (s) {
                        return r.call(this, s.vars.value.rawValue)
                    }
                };
                e = this.pvLegendPanel = (new i.visual.Panel(this, b, {
                    extensionId: "panel",
                    wrapper: p,
                    noSelect: false,
                    noHover: true,
                    noClick: false,
                    noClickSelect: true
                })).pvMark.lock("data", function (r) {
                    return r.items
                })[n](null)[h](null)[l](function (r) {
                    r = r.vars.itemPadding;
                    var s = this.sibling();
                    return s ? s[l] + s[j] + r[j] : 0
                })[g](e ? function (r) {
                    r = r.vars;
                    return r.section.size.height / 2 - r.itemClientSize.height / 2
                } : 0).height(function (r) {
                    return r.vars.itemClientSize.height
                }).width(e ?
                    function (r) {
                        return r.vars.itemClientSize.width
                    } : function () {
                    return this.parent.width()
                }).def("hidden", "false").fillStyle(function () {
                    return this.hidden() == "true" ? "rgba(200,200,200,1)" : "rgba(200,200,200,0.0001)"
                });
                var q = (new i.visual.Panel(this, e, {extensionId: "markerPanel"})).pvMark.left(0).top(0).right(null).bottom(null).width(function (r) {
                    return r.vars.markerSize
                }).height(function (r) {
                    return r.vars.itemClientSize.height
                });
                if (i.debug >= 20) {
                    b.strokeStyle("red").lineWidth(0.5).strokeDasharray(".");
                    e.strokeStyle("green").lineWidth(0.5).strokeDasharray(".");
                    q.strokeStyle("blue").lineWidth(0.5).strokeDasharray(".")
                }
                a.childNodes.forEach(function (r) {
                    var s = (new i.visual.Panel(this, q)).pvMark.visible(function (u) {
                        return u.parent === r
                    });
                    r.renderer().create(this, s, r.extensionPrefix, p)
                }, this);
                this.pvLabel = (new i.visual.Label(this, q.anchor("right"), {
                    extensionId: "label",
                    noTooltip: false,
                    noClick: false,
                    wrapper: p
                })).intercept("textStyle", function (r) {
                    var s = this.delegateExtension() || "black";
                    return r.isOn() ? s : i.toGrayScale(s, null, undefined, 150)
                }).pvMark.textAlign("left").text(function (r) {
                    var s =
                        r.labelText();
                    r = r.vars;
                    if (r.textSize.width > r.labelWidthMax)s = i.text.trimToWidthB(r.labelWidthMax, s, r.font, "..", false);
                    return s
                }).textMargin(function (r) {
                    return r.vars.textMargin
                }).font(function (r) {
                    return r.vars.font
                }).textDecoration(function (r) {
                    return r.isOn() ? "" : "line-through"
                });
                i.debug >= 16 && q.anchor("right").add(t.Panel)[this.anchorLength()](0)[this.anchorOrthoLength()](0).fillStyle(null).strokeStyle(null).lineWidth(0).add(t.Line).data(function (r) {
                    r = r.vars;
                    r = i.text.getLabelBBox(Math.min(r.labelWidthMax,
                        r.textSize.width), r.textSize.height * 2 / 3, "left", "middle", 0, r.textMargin).source.points();
                    if (r.length > 1)r = r.concat(r[0]);
                    return r
                }).left(function (r) {
                    return r.x
                }).top(function (r) {
                    return r.y
                }).strokeStyle("red").lineWidth(0.5).strokeDasharray("-")
            },
            _onClick: function (a) {
                a = a.scene;
                f.fun.is(a.execute) && a.executable() && a.execute()
            },
            _getExtensionPrefix: function () {
                return "legend"
            },
            _getExtensionId: function () {
                return "area"
            },
            _getSelectableMarks: function () {
                return [this.pvLegendPanel]
            },
            _getBulletRootScene: function () {
                var a =
                    this._rootScene;
                if (!a)this._rootScene = a = new i.visual.legend.BulletRootScene(null, {
                    panel: this,
                    source: this.chart.data,
                    horizontal: this.isAnchorTopOrBottom(),
                    font: this.font,
                    markerSize: this.markerSize,
                    textMargin: this.textMargin,
                    itemPadding: this.itemPadding,
                    itemSize: this.itemSize
                });
                return a
            },
            _getTooltipFormatter: function (a) {
                a.isLazy = false;
                return function (b) {
                    var c = b.scene.vars.value;
                    c = c.absLabel || c.label;
                    b = b.pvMark.text();
                    return c !== b ? c : ""
                }
            }
        });
    f.type("pvc.CartesianAbstract", i.BaseChart).init(function (a) {
        this.axesPanels =
        {};
        this.base(a)
    }).add({
        _gridDockPanel: null,
        axesPanels: null,
        yAxisPanel: null,
        xAxisPanel: null,
        secondXAxisPanel: null,
        secondYAxisPanel: null,
        yScale: null,
        xScale: null,
        _getSeriesRoleSpec: function () {
            return {isRequired: true, defaultDimension: "series*", autoCreateDimension: true, requireIsDiscrete: true}
        },
        _getColorRoleSpec: function () {
            return {isRequired: true, defaultDimension: "color*", defaultSourceRole: "series", requireIsDiscrete: true}
        },
        _addAxis: function (a) {
            this.base(a);
            switch (a.type) {
                case "base":
                case "ortho":
                    this.axes[a.orientedId] =
                        a;
                    if (a.v1SecondOrientedId)this.axes[a.v1SecondOrientedId] = a;
                    break
            }
            return this
        },
        _setAxisScale: function (a, b) {
            this.base(a, b);
            if ((b = a.type === "ortho") || a.type === "base")if (b && a.index === 1)this.secondScale = a.scale; else if (!a.index)this[a.orientation + "Scale"] = a.scale
        },
        _createContent: function (a) {
            this._createFocusWindow();
            this._gridDockPanel = new i.CartesianGridDockingPanel(this, this.basePanel, {margins: a.margins, paddings: a.paddings});
            ["base", "ortho"].forEach(function (b) {
                (b = this.axesByType[b]) && f.query(b).reverse().each(function (c) {
                        this._createAxisPanel(c)
                    },
                    this)
            }, this);
            this._createPlotPanels(this._gridDockPanel, {clickAction: a.clickAction, doubleClickAction: a.doubleClickAction})
        },
        _createFocusWindow: function () {
            if (this.selectableByFocusWindow()) {
                var a, b = this.focusWindow;
                if (b)a = b._exportData();
                b = this.focusWindow = new i.visual.CartesianFocusWindow(this);
                a && b._importData(a);
                b._initFromOptions()
            } else this.focusWindow && delete this.focusWindow
        },
        _createAxisPanel: function (a) {
            if (a.option("Visible")) {
                var b, c = a.option("Title");
                f.empty(c) || (b = new i.AxisTitlePanel(this,
                    this._gridDockPanel, a, {
                        title: c,
                        font: a.option("TitleFont") || a.option("Font"),
                        anchor: a.option("Position"),
                        align: a.option("TitleAlign"),
                        margins: a.option("TitleMargins"),
                        paddings: a.option("TitlePaddings"),
                        titleSize: a.option("TitleSize"),
                        titleSizeMax: a.option("TitleSizeMax")
                    }));
                c = new i.AxisPanel(this, this._gridDockPanel, a, {
                    anchor: a.option("Position"),
                    size: a.option("Size"),
                    sizeMax: a.option("SizeMax"),
                    clickAction: a.option("ClickAction"),
                    doubleClickAction: a.option("DoubleClickAction"),
                    useCompositeAxis: a.option("Composite"),
                    font: a.option("Font"),
                    labelSpacingMin: a.option("LabelSpacingMin"),
                    grid: a.option("Grid"),
                    gridCrossesMargin: a.option("GridCrossesMargin"),
                    ruleCrossesMargin: a.option("RuleCrossesMargin"),
                    zeroLine: a.option("ZeroLine"),
                    desiredTickCount: a.option("DesiredTickCount"),
                    showTicks: a.option("Ticks"),
                    showMinorTicks: a.option("MinorTicks")
                });
                if (b)c.titlePanel = b;
                this.axesPanels[a.id] = c;
                this.axesPanels[a.orientedId] = c;
                if (a.index <= 1 && a.v1SecondOrientedId)this[a.v1SecondOrientedId + "AxisPanel"] = c;
                return c
            }
        },
        _onLaidOut: function () {
            this.plotPanelList &&
            this.plotPanelList[0] && ["base", "ortho"].forEach(function (a) {
                (a = this.axesByType[a]) && a.forEach(this._setCartAxisScaleRange, this)
            }, this)
        },
        _setCartAxisScaleRange: function (a) {
            var b = this.plotPanelList[0]._layoutInfo.clientSize;
            a.setScaleRange(a.orientation === "x" ? b.width : b.height);
            return a.scale
        },
        _getAxesRoundingPaddings: function () {
            function a(e, g, h) {
                var j = c[e];
                if (j == null || g > j) {
                    c[e] = g;
                    c[e + "Locked"] = h
                } else if (h)c[e + "Locked"] = h
            }

            function b(e) {
                if (e) {
                    var g = e.getScaleRoundingPaddings();
                    if (g) {
                        e = e.orientation ===
                        "x";
                        a(e ? "left" : "bottom", g.begin, g.beginLocked);
                        a(e ? "right" : "top", g.end, g.endLocked)
                    }
                }
            }

            var c = {}, d = this.axesByType;
            ["base", "ortho"].forEach(function (e) {
                (e = d[e]) && e.forEach(b)
            });
            return c
        },
        markEventDefaults: {
            strokeStyle: "#5BCBF5",
            lineWidth: "0.5",
            textStyle: "#5BCBF5",
            verticalOffset: 10,
            verticalAnchor: "bottom",
            horizontalAnchor: "right",
            forceHorizontalAnchor: false,
            horizontalAnchorSwapLimit: 80,
            font: "10px sans-serif"
        },
        markEvent: function (a, b, c) {
            var d = this, e = d.axes.base, g = d.axes.ortho, h = e.scale, j = d.data.owner.dimensions(e.role.grouping.firstDimensionName());
            if (e.isDiscrete()) {
                d._warn("Can only mark events in charts with a continuous base scale.");
                return d
            }
            c = $.extend({}, d.markEventDefaults, c);
            a = j.read(a, b);
            b = h(a.value);
            h = h.range();
            e = h[1];
            if (b < h[0] || b > e) {
                this._warn("Cannot mark event because it is outside the base scale's domain.");
                return this
            }
            h = this.plotPanelList[0].pvPanel;
            g = g.scale.range()[1];
            j = c.horizontalAnchor;
            if (!c.forceHorizontalAnchor) {
                var k = j === "right";
                e = k ? e - b : b;
                var m = t.Text.measureWidth(a.label, c.font);
                if (e < m)j = k ? "left" : "right"
            }
            e = c.verticalAnchor ===
            "top" ? c.verticalOffset : g - c.verticalOffset;
            h.add(t.Line).data([0, g]).bottom(f.identity).left(b).lineWidth(c.lineWidth).strokeStyle(c.strokeStyle).anchor(j).visible(function () {
                return !this.index
            }).top(e).add(t.Label).font(c.font).text(a.label).textStyle(c.textStyle);
            return d
        },
        defaults: {panelSizeRatio: 0.9, timeSeries: false, timeSeriesFormat: "%Y-%m-%d"}
    });
    f.type("pvc.GridDockingPanel", i.BasePanel).add({
        anchor: "fill", _calcLayout: function (a) {
            function b(C, D) {
                if (r)q._group("LayoutCycle " + (U ? "- Disaster MODE" :
                "#" + (D + 1)));
                try {
                    var H, N, P = a.canChange !== false && !U && C > 0, R;
                    D = false;
                    var F;
                    H = 0;
                    for (N = B.length; H < N;) {
                        r && q._group("SIDE Child #" + (H + 1));
                        try {
                            R = h(B[H], P);
                            if (!U && R) {
                                F = false;
                                if ((R & J) !== 0) {
                                    r && q._log("SIDE Child #" + (H + 1) + " changed overflow paddings");
                                    if (!D) {
                                        D = true;
                                        a.requestPaddings = a.paddings
                                    }
                                }
                                if ((R & S) !== 0)if (C > 0) {
                                    r && q._log("SIDE Child #" + (H + 1) + " changed normal paddings");
                                    F = true
                                } else i.debug >= 2 && q._warn("SIDE Child #" + (H + 1) + " changed paddings but no more iterations possible.");
                                if ((R & K) !== 0) {
                                    U = true;
                                    b(0);
                                    return false
                                }
                                if (F)return true
                            }
                        } finally {
                            r &&
                            q._groupEnd()
                        }
                        H++
                    }
                    if (D) {
                        r && q._log("Restarting due to overflowPaddings change");
                        return false
                    }
                    H = 0;
                    for (N = v.length; H < N;) {
                        r && q._group("FILL Child #" + (H + 1));
                        try {
                            R = g(v[H], P);
                            if (!U && R) {
                                F = false;
                                if ((R & S) !== 0)if (C > 0) {
                                    i.debug >= 5 && q._log("FILL Child #" + (H + 1) + " increased paddings");
                                    F = true
                                } else i.debug >= 2 && q._warn("FILL Child #" + (H + 1) + " increased paddings but no more iterations possible.");
                                if ((R & K) !== 0) {
                                    U = true;
                                    b(0);
                                    return false
                                }
                                if (F)return true
                            }
                        } finally {
                            r && q._groupEnd()
                        }
                        H++
                    }
                    return false
                } finally {
                    r && q._groupEnd()
                }
            }

            function c(C, D) {
                for (var H = 0; C--;) {
                    if (D(C, H) === false)return true;
                    H++
                }
                return false
            }

            function d(C) {
                var D = C.anchor;
                if (D)if (D === "fill") {
                    v.push(C);
                    C = C.paddings.resolve(z.referenceSize);
                    u = E.resolvedMax(u, C)
                } else {
                    f.hasOwn(y, D) || f.fail.operationInvalid("Unknown anchor value '{0}'", [D]);
                    B.push(C)
                }
            }

            function e(C, D) {
                r && q._group("SIDE Child #" + (D + 1));
                try {
                    D = 0;
                    var H = C.anchor;
                    z.paddings = l(H, u);
                    C.layout(new M(A), z);
                    if (C.isVisible) {
                        D |= n(H, u, C);
                        j(H, C);
                        k(H, C)
                    }
                    return D
                } finally {
                    r && q._groupEnd()
                }
            }

            function g(C, D) {
                var H = 0,
                    N = C.anchor;
                z.paddings = l(N, u);
                z.canChange = D;
                C.layout(new M(A), z);
                if (C.isVisible) {
                    H |= n(N, u, C, D);
                    j(N, C);
                    m(C, N)
                }
                return H
            }

            function h(C, D) {
                var H = 0;
                if (C.isVisible) {
                    var N = C.anchor, P = w[N], R = x[N];
                    P = new M(f.set({}, P, A[P], R, C[R]));
                    z.paddings = l(N, u);
                    z.canChange = D;
                    C.layout(P, z);
                    if (C.isVisible)(H = n(N, u, C, D) | o(N, a.paddings, C, D)) || m(C, C.align)
                }
                return H
            }

            function j(C, D) {
                var H;
                if (C === "fill") {
                    C = "left";
                    H = s.left + A.width / 2 - D.width / 2
                } else H = s[C];
                D.setPosition(f.set({}, C, H))
            }

            function k(C, D) {
                var H = x[C];
                D = D[H];
                s[C] += D;
                A[H] -=
                    D
            }

            function m(C, D) {
                var H;
                if (D === "fill")D = "middle";
                var N;
                switch (D) {
                    case "top":
                    case "bottom":
                    case "left":
                    case "right":
                        H = D;
                        N = s[H];
                        break;
                    case "middle":
                        H = "bottom";
                        N = s.bottom + A.height / 2 - C.height / 2;
                        break;
                    case "center":
                        H = "left";
                        N = s.left + A.width / 2 - C.width / 2;
                        break
                }
                C.setPosition(f.set({}, H, N))
            }

            function l(C, D) {
                var H = new E;
                p(C).forEach(function (N) {
                    H.set(N, D[N])
                });
                return H
            }

            function n(C, D, H, N) {
                var P = H._layoutInfo.requestPaddings, R = 0;
                if (P) {
                    if (r && i.debug >= 10) {
                        q._log("=> clientSize=" + i.stringify(H._layoutInfo.clientSize));
                        q._log("<= requestPaddings=" + i.stringify(P))
                    }
                    p(C).forEach(function (F) {
                        var O = D[F] || 0, V = Math.floor(1E4 * (P[F] || 0)) / 1E4, T = V - O;
                        O = Math.max(1, Math.abs(0.01 * O));
                        if (T !== 0 && Math.abs(T) >= O)if (N) {
                            R |= S;
                            D[F] = V;
                            r && q._log("Changed padding " + F + " <- " + V)
                        } else i.debug >= 2 && q._warn("CANNOT change but child wanted to: " + F + "=" + V)
                    });
                    if (R) {
                        C = E.names.map(function (F) {
                            return (D[F] || 0).toFixed(0)
                        }).join("|");
                        if (f.hasOwn(G, C)) {
                            i.debug >= 2 && q._warn("LOOP detected!!!!");
                            R |= K
                        } else G[C] = true;
                        D.width = D.left + D.right;
                        D.height = D.top + D.bottom
                    }
                }
                return R
            }

            function o(C, D, H, N) {
                var P = H._layoutInfo.overflowPaddings || X, R = 0;
                r && i.debug >= 10 && q._log("<= overflowPaddings=" + i.stringify(P));
                p(C).forEach(function (F) {
                    if (P.hasOwnProperty(F)) {
                        var O = D[F] || 0, V = Math.floor(1E4 * (P[F] || 0)) / 1E4;
                        V -= s[F];
                        var T = V - O;
                        O = Math.max(1, Math.abs(0.05 * O));
                        if (T >= O)if (N) {
                            R |= J;
                            D[F] = V;
                            r && q._log("changed overflow padding " + F + " <- " + V)
                        } else i.debug >= 2 && q._warn("CANNOT change overflow padding but child wanted to: " + F + "=" + V)
                    }
                });
                if (R) {
                    D.width = D.left + D.right;
                    D.height = D.top + D.bottom
                }
                return R
            }

            function p(C) {
                switch (C) {
                    case "left":
                    case "right":
                        return E.vnames;
                    case "top":
                    case "bottom":
                        return E.hnames;
                    case "fill":
                        return E.names
                }
            }

            var q = this;
            if (q._children) {
                var r = i.debug >= 5, s = new E(0), u = new E(0), A = f.copyOwn(a.clientSize), x = i.BasePanel.orthogonalLength, y = i.BasePanel.relativeAnchor, w = i.BasePanel.parallelLength, z = {
                    force: true,
                    referenceSize: a.clientSize
                }, v = [], B = [], G = {}, K = 1, S = 2, J = 4, X = new E, U = false;
                r && q._group("CCC GRID LAYOUT clientSize = " + i.stringify(A));
                try {
                    this._children.forEach(d);
                    r && q._group("Phase 1 - Determine MARGINS and FILL SIZE from SIDE panels");
                    try {
                        B.forEach(e)
                    } finally {
                        if (r) {
                            q._groupEnd();
                            q._log("Final FILL margins = " + i.stringify(s));
                            q._log("Final FILL border size = " + i.stringify(A))
                        }
                    }
                    r && q._group("Phase 2 - Determine COMMON PADDINGS");
                    try {
                        c(9, b)
                    } finally {
                        if (r) {
                            q._groupEnd();
                            q._log("Final FILL clientSize = " + i.stringify({width: A.width - u.width, height: A.height - u.height}));
                            q._log("Final COMMON paddings = " + i.stringify(u))
                        }
                    }
                    a.gridMargins = new E(s);
                    a.gridPaddings = new E(u);
                    a.gridSize = new M(A)
                } finally {
                    r && q._groupEnd()
                }
            }
        }
    });
    f.type("pvc.CartesianGridDockingPanel", i.GridDockingPanel).init(function (a,
                                                                               b, c) {
        this.base(a, b, c);
        this._plotBgPanel = new i.PlotBgPanel(a, this)
    }).add({
        _getExtensionId: function () {
            return !this.chart.parent ? "content" : "smallContent"
        }, _createCore: function (a) {
            var b = this.chart, c = b.axes, d = c.x, e = c.y;
            d.isBound() || (d = null);
            e.isBound() || (e = null);
            if (d && d.option("Grid"))this.xGridRule = this._createGridRule(d);
            if (e && e.option("Grid"))this.yGridRule = this._createGridRule(e);
            this.base(a);
            b.focusWindow && this._createFocusWindow(a);
            if (b.compatVersion() <= 1 ? !!(d.option("EndLine") || e.option("EndLine")) :
                    f.get(b.options, "plotFrameVisible", true))this.pvFrameBar = this._createFrame(a, c);
            if (d && d.scaleType !== "discrete" && d.option("ZeroLine"))this.xZeroLine = this._createZeroLine(d, a);
            if (e && e.scaleType !== "discrete" && e.option("ZeroLine"))this.yZeroLine = this._createZeroLine(e, a)
        }, _createGridRule: function (a) {
            var b = a.scale;
            if (!b.isNull) {
                var c = a.role.grouping.isDiscrete(), d = this._getAxisGridRootScene(a);
                if (d) {
                    var e = this._layoutInfo.gridMargins, g = this._layoutInfo.gridPaddings, h = a.orientation === "x" ? "left" : "bottom",
                        j = this.anchorLength(h), k = this.anchorOrtho(h), m = this.anchorOpposite(k), l = e[h] + g[h];
                    g = e[k];
                    e = e[m];
                    d = d.leafs().array();
                    var n = d.length;
                    c && n && d.push(d[n - 1]);
                    var o;
                    if (this.compatVersion() <= 1)o = function (q) {
                        return function (r) {
                            return q.call(this, r.vars.tick.rawValue)
                        }
                    };
                    a = (new i.visual.Rule(this, this.pvPanel, {
                        extensionId: a.extensionPrefixes.map(function (q) {
                            return q + "Grid"
                        }), wrapper: o
                    })).lock("data", d).lock(j, null).override("defaultColor", f.fun.constant(t.color("#f0f0f0"))).pvMark.antialias(true)[k](g)[m](e).zOrder(-12).events("none");
                    if (c) {
                        var p = b.range().step / 2;
                        a[h](function (q) {
                            return l + b(q.vars.tick.value) + (this.index === n ? p : -p)
                        })
                    } else a[h](function (q) {
                        return l + b(q.vars.tick.value)
                    });
                    return a
                }
            }
        }, _getAxisGridRootScene: function (a) {
            var b = a.isDiscrete(), c = b ? a.domainData() : this.data, d = new i.visual.CartesianAxisRootScene(null, {panel: this, source: c});
            b ? c.childNodes.forEach(function (e) {
                new i.visual.CartesianAxisTickScene(d, {source: e, tick: e.value, tickRaw: e.rawValue, tickLabel: e.label})
            }) : (a.ticks || a.calcContinuousTicks()).forEach(function (e) {
                new i.visual.CartesianAxisTickScene(d,
                    {tick: e, tickRaw: e, tickLabel: a.scale.tickFormat(e)})
            }, this);
            return d
        }, _createFrame: function (a, b) {
            if (!(b.base.scale.isNull || b.ortho.scale.isNull && (!b.ortho2 || b.ortho2.scale.isNull))) {
                var c = a.gridMargins;
                a = c.left;
                b = c.right;
                var d = c.top;
                c = c.bottom;
                var e = [];
                if (this.compatVersion() <= 1) {
                    e.push("xAxisEndLine");
                    e.push("yAxisEndLine")
                }
                e.push("plotFrame");
                return (new i.visual.Panel(this, this.pvPanel, {extensionId: e})).pvMark.lock("left", a).lock("right", b).lock("top", d).lock("bottom", c).lock("fillStyle", null).events("none").strokeStyle("#666666").lineWidth(1).antialias(false).zOrder(-8)
            }
        },
        _createZeroLine: function (a, b) {
            var c = a.scale;
            if (!c.isNull) {
                var d = c.domain();
                if (d[0] * d[1] < -1.0E-12) {
                    d = a.orientation === "x" ? "left" : "bottom";
                    var e = this.anchorLength(d), g = this.anchorOrtho(d), h = this.anchorOpposite(g), j = b.gridMargins;
                    b = j[d] + b.gridPaddings[d] + c(0);
                    c = j[g];
                    j = j[h];
                    var k = new i.visual.Scene(null, {panel: this});
                    return (new i.visual.Rule(this, this.pvPanel, {
                        extensionId: a.extensionPrefixes.map(function (m) {
                            return m + "ZeroLine"
                        })
                    })).lock("data", [k]).lock(e, null).lock(g, c).lock(h, j).lock(d, b).override("defaultColor",
                        f.fun.constant(t.color("#666666"))).pvMark.events("none").lineWidth(1).antialias(true).zOrder(-9)
                }
            }
        }, _createFocusWindow: function (a) {
            function b() {
                J[w] = 0 - v[q];
                J[z] = G + v[q] + v[A]
            }

            function c() {
                var F = arguments[arguments.length - 1].drag.phase === "end";
                g._selectingByRubberband = !F;
                D.render();
                H.render();
                var O = J[x], V = J[x] + J[y];
                if (!o) {
                    var T = B - O;
                    O = B - V;
                    V = T
                }
                j._updatePosition(O, V, F, true)
            }

            function d(F, O) {
                var V = F.m, T = V[P], ba, ea = J[R], ca;
                switch (O) {
                    case "new":
                        ba = 0;
                        ca = "begin";
                        break;
                    case "resize-begin":
                        ba = ea;
                        ca = "begin";
                        break;
                    case "move":
                        ba = ea;
                        ca = "begin";
                        break;
                    case "resize-end":
                        ba = T - J[P];
                        ca = "end";
                        break
                }
                T = {type: O, target: ca, point: T, length: ba, length0: ea, min: F.min[P], max: F.max[P], minView: 0, maxView: B};
                j._constraintPosition(T);
                V[P] = T.point;
                switch (O) {
                    case "resize-begin":
                        T.max = Math.min(T.max, J[P] + J[R]);
                        break;
                    case "resize-end":
                        T.min = Math.max(T.min, J[P]);
                        break
                }
                F.min[P] = T.min;
                F.max[P] = T.max
            }

            var e = this, g = e.topRoot, h = e.chart, j = h.focusWindow.base, k = j.axis, m = k.scale;
            if (!m.isNull) {
                var l = j.option("Resizable"), n = j.option("Movable");
                k = k.isDiscrete();
                var o = h.isOrientationVertical(), p = o ? "left" : "top", q = o ? "top" : "left", r = e.anchorOrthoLength(p), s = e.anchorOpposite(p), u = e.anchorOrthoLength(q), A = e.anchorOpposite(q), x = o ? "x" : "y", y = "d" + x, w = o ? "y" : "x", z = "d" + w;
                h = a.gridMargins;
                var v = a.gridPaddings;
                h = {left: h.left + v.left, right: h.right + v.right, top: h.top + v.top, bottom: h.bottom + v.bottom};
                h.width = h.left + h.right;
                h.height = h.top + h.bottom;
                a = a.clientSize;
                var B = a[r] - h[r], G = a[u] - h[u], K = v[p], S = v[s], J = new i.visual.Scene(null, {panel: this});
                a = k ? m.range().step : 0;
                k = a / 2;
                J[x] = m(j.begin) -
                k;
                J[y] = a + (m(j.end) - k) - J[x];
                b();
                var X = function (F) {
                    return function () {
                        return J[F]
                    }
                }, U = function () {
                    return Math.max(0, Math.min(B, J[x]))
                }, C = function () {
                    var F = U(), O = J[x] + J[y];
                    O = Math.max(0, Math.min(B, O));
                    return O - F
                };
                m = function (F, O) {
                    return (new i.visual.Bar(e, F, {
                        extensionId: O,
                        normalStroke: true,
                        noHover: true,
                        noSelect: true,
                        noClick: true,
                        noDoubleClick: true,
                        noTooltip: true,
                        showsInteraction: false
                    })).pvMark.lock("data").lock("visible").lock(p, U).lock(r, C).lock(q, X(w)).lock(u, X(z)).lock(A).lock(s).sign
                };
                var D = this._plotBgPanel.pvPanel.borderPanel;
                D.lock("data", [J]);
                n && l ? D.paddingPanel.lock("events", "all").lock("cursor", "crosshair").event("mousedown", t.Behavior.select().autoRender(false).collapse(o ? "y" : "x").positionConstraint(function (F) {
                    return d(F, F.phase === "start" ? "new" : "resize-end")
                })).event("selectstart", function (F) {
                    b();
                    c(F)
                }).event("select", c).event("selectend", c) : D.paddingPanel.events("all");
                a = m(D.paddingPanel, "focusWindowBg").override("defaultColor", f.fun.constant(i.invisibleFill)).pvMark;
                n ? a.lock("events", "all").lock("cursor", "move").event("mousedown",
                    t.Behavior.drag().autoRender(false).collapse(o ? "y" : "x").positionConstraint(function (F) {
                        d(F, "move")
                    })).event("drag", c).event("dragend", c) : a.events("none");
                var H = (new i.visual.Panel(e, e.pvPanel)).pvMark.lock("data", [J]).lock("visible").lock("fillStyle", i.invisibleFill).lock("left", h.left).lock("right", h.right).lock("top", h.top).lock("bottom", h.bottom).lock("zOrder", 10).lock("events", function () {
                    var F = J.drag;
                    return F && F.phase !== "end" ? "all" : "none"
                }).lock("cursor", function () {
                    var F = J.drag;
                    return F && F.phase !==
                    "end" ? F.type === "drag" || F.type === "select" && !l ? "move" : o ? "ew-resize" : "ns-resize" : null
                }).antialias(false);
                (new i.visual.Bar(e, H, {
                    extensionId: "focusWindowBaseCurtain",
                    normalStroke: true,
                    noHover: true,
                    noSelect: true,
                    noClick: true,
                    noDoubleClick: true,
                    noTooltip: true,
                    showsInteraction: false
                })).override("defaultColor", function (F, O) {
                    return O === "stroke" ? null : "rgba(20, 20, 20, 0.1)"
                }).pvMark.lock("data", [J, J]).lock("visible").lock("events", "none").lock(p, function () {
                    return !this.index ? -K : U() + C()
                }).lock(s, function () {
                    return !this.index ?
                        null : -S
                }).lock(r, function () {
                    return !this.index ? K + U() : null
                }).lock(q, X(w)).lock(u, X(z)).lock(A);
                var N = m(H, "focusWindow").override("defaultColor", f.fun.constant(null)).pvMark.lock("events", "none");
                n = function (F) {
                    var O = F === "left" || F === "top" ? "begin" : "end", V = "linear-gradient(to " + e.anchorOpposite(F) + ", rgba(20, 20, 20, 0.1), #444 90%)", T = (new i.visual.Bar(e, N.anchor(F), {
                        extensionId: j.id + "Grip" + f.firstUpperCase(O),
                        normalStroke: true,
                        noHover: true,
                        noSelect: true,
                        noClick: true,
                        noDoubleClick: true,
                        noTooltip: true,
                        showsInteraction: false
                    })).override("defaultColor", function (ea, ca) {
                            return ca === "stroke" ? null : V
                        }).pvMark.lock("data").lock("visible")[q](J[w])[u](J[z]);
                    if (l) {
                        var ba = "resize-" + O;
                        T.lock("events", "all")[r](5).cursor(o ? "ew-resize" : "ns-resize").event("mousedown", t.Behavior.resize(F).autoRender(false).positionConstraint(function (ea) {
                            d(ea, ba)
                        }).preserveOrtho(true)).event("resize", c).event("resizeend", c)
                    } else T.events("none")[r](1);
                    return T
                };
                n(p);
                n(s);
                var P = x, R = y
            }
        }, _getDatumsOnRect: function (a, b, c) {
            var d = this.chart,
                e = d.axesPanels.x, g = d.axesPanels.y, h, j;
            if (e) {
                h = new f.Map;
                e._getDatumsOnRect(h, b, c);
                h.count || (h = null)
            }
            if (g) {
                j = new f.Map;
                g._getOwnDatumsOnRect(j, b, c);
                j.count || (j = null)
            }
            if (h && j) {
                h.intersect(j, a);
                c.toggle = true
            } else if (h)a.copy(h); else j ? a.copy(j) : d.plotPanelList.forEach(function (k) {
                k._getDatumsOnRect(a, b, c)
            }, this)
        }
    });
    f.type("pvc.CartesianAbstractPanel", i.PlotPanel).init(function (a, b, c, d) {
        function e(n) {
            j[n.type] = n;
            j[n.orientedId] = n;
            if (n.v1SecondOrientedId)j[n.v1SecondOrientedId] = n
        }

        function g(n, o) {
            var p =
                k[n];
            if (p == null || o > p) {
                m = true;
                k[n] = o
            }
        }

        function h(n) {
            var o = n && n.option("Offset");
            if (o != null && o > 0 && o < 1)if (n.orientation === "x") {
                g("left", o);
                g("right", o)
            } else {
                g("top", o);
                g("bottom", o)
            }
        }

        this.base(a, b, c, d);
        var j = this.axes;
        e(a._getAxis("base", c.option("BaseAxis") - 1));
        e(a._getAxis("ortho", c.option("OrthoAxis") - 1));
        var k = {}, m = false, l = a.axesByType;
        ["base", "ortho"].forEach(function (n) {
            (n = l[n]) && n.forEach(h)
        });
        if (m)this.offsetPaddings = k
    }).add({
        offsetPaddings: null, _calcLayout: function (a) {
            a.requestPaddings = this._calcRequestPaddings(a)
        },
        _calcRequestPaddings: function (a) {
            var b, c = this.offsetPaddings;
            if (c) {
                var d = this.chart._getAxesRoundingPaddings(), e = a.clientSize, g = a.paddings;
                E.names.forEach(function (h) {
                    var j = i.BasePanel.orthogonalLength[h], k = e[j];
                    j = k + g[j];
                    if (!d[h + "Locked"]) {
                        j = j * (c[h] || 0);
                        k = k * (d[h] || 0);
                        (b || (b = {}))[h] = Math.max(j - k, 0)
                    }
                }, this)
            }
            return b
        }, _createCore: function () {
            this.pvPanel.zOrder(-10);
            var a = this.chart.options.leafContentOverflow || "auto";
            (a === "auto" ? f.query(["ortho", "base"]).select(function (b) {
                return this.axes[b]
            }, this).any(function (b) {
                return b.option("FixedMin") !=
                    null || b.option("FixedMax") != null
            }) : a === "hidden") && this.pvPanel.borderPanel.overflow("hidden")
        }
    });
    f.type("pvc.PlotBgPanel", i.BasePanel).init(function (a, b, c) {
        this.base(a, b, c)
    }).add({
        anchor: "fill", _getExtensionId: function () {
            return "plotBg"
        }, _createCore: function (a) {
            this.pvPanel.borderPanel.lock("zOrder", -13).antialias(false);
            this.base(a)
        }
    });
    f.type("pvc.CategoricalAbstract", i.CartesianAbstract).init(function (a) {
        this.base(a);
        if (a = this.parent)this._catRole = a._catRole
    }).add({
        _interpolatable: true, _initVisualRoles: function () {
            this.base();
            this._catRole = this._addVisualRole("category", this._getCategoryRoleSpec())
        }, _getCategoryRoleSpec: function () {
            return {isRequired: true, defaultDimension: "category*", autoCreateDimension: true}
        }, _createVisibleData: function (a, b) {
            var c = this._serRole && this._serRole.flattenedGrouping(), d = this._catRole.flattenedGrouping();
            return c ? a.groupBy(f.get(b, "inverted", false) ? [c, d] : [d, c], b) : a.groupBy(d, b)
        }, _interpolateDataCell: function (a, b) {
            var c = this._getNullInterpolationOperType(a.nullInterpolationMode);
            if (c) {
                this._warnSingleContinuousValueRole(a.role);
                var d = a.dataPartValue, e = this.partData(d, b);
                d = this.visibleData(d, {baseData: b});
                d.childCount() > 0 && (new c(b, e, d, this._catRole, this._serRole, a.role, true)).interpolate()
            }
        }, _getNullInterpolationOperType: function (a) {
            switch (a) {
                case "linear":
                    return i.data.LinearInterpolationOper;
                case "zero":
                    return i.data.ZeroInterpolationOper;
                case "none":
                    break;
                default:
                    throw f.error.argumentInvalid("nullInterpolationMode", "" + a);
            }
        }, _generateTrendsDataCell: function (a, b, c) {
            function d(u) {
                var A = n ? null : function (w) {
                        return w.atoms[l].value
                    },
                    x = function (w) {
                        if ((w = p.child(w.key)) && u)w = w.child(u.key);
                        return w ? w.dimensions(m).sum(o) : null
                    };
                A = f.create(j, {rows: f.query(s), x: A, y: x});
                var y = k.model(A);
                y && s.forEach(function (w, z) {
                    z = y.sample(n ? z : w.atoms[l].value, x(w), z);
                    if (z != null) {
                        var v = p.child(w.key);
                        w = v || w;
                        if (u)if (v = v && v.child(u.key))v = Object.create(v._datums[0].atoms); else {
                            v = Object.create(w._datums[0].atoms);
                            f.copyOwn(v, u.atoms)
                        } else v = Object.create(w._datums[0].atoms);
                        v[m] = z;
                        v[r] = q;
                        a.push(new i.data.TrendDatum(w.owner, v, j))
                    }
                }, this)
            }

            var e = this._serRole,
                g = this._catRole, h = b.role, j = b.trend, k = j.info;
            this._warnSingleContinuousValueRole(h);
            var m = h.firstDimensionName(), l, n = g.isDiscrete();
            n || (l = g.firstDimensionName());
            var o = {zeroIfNone: false};
            h = this.partData(b.dataPartValue, c);
            var p = this.visibleData(b.dataPartValue, {baseData: c}), q = this._getTrendDataPartAtom(), r = q.dimension.name, s = g.flatten(c, {visible: true}).childNodes;
            (e && e.isBound() ? e.flatten(h, {visible: true}).children() : f.query([null])).each(d, this)
        }, _getContinuousVisibleCellExtent: function (a, b) {
            var c =
                b.role;
            switch (c.name) {
                case "series":
                case "category":
                    return this.base(a, b)
            }
            this._warnSingleContinuousValueRole(c);
            var d = b.dataPartValue, e = c.firstDimensionName();
            c = this.visibleData(d);
            var g = a.scaleUsesAbs();
            if (a.type !== "ortho" || !b.isStacked)return c.leafs().select(function (h) {
                h = h.dimensions(e).sum();
                return g && h < 0 ? -h : h
            }).range();
            return c.children().select(function (h) {
                var j = this._getStackedCategoryValueExtent(h, e, g);
                if (j)return {range: j, group: h}
            }, this).where(f.notNully).reduce(function (h, j) {
                return this._reduceStackedCategoryValueExtent(h,
                    j.range, j.group)
            }.bind(this), null)
        }, _getStackedCategoryValueExtent: function (a, b, c) {
            var d = null, e = null;
            a.children().select(function (g) {
                g = g.dimensions(b).sum();
                return c && g < 0 ? -g : g
            }).each(function (g) {
                if (g != null)if (g >= 0)d += g; else e += g
            });
            if (d == null && e == null)return null;
            return {max: d || 0, min: e || 0}
        }, _reduceStackedCategoryValueExtent: function (a, b) {
            return i.unionExtents(a, b)
        }, _coordinateSmallChartsLayout: function (a) {
            this.base(a);
            var b = 0, c, d = null, e = {};
            this.children.forEach(function (g) {
                g.basePanel.layout();
                var h,
                    j = g.titlePanel;
                if (j) {
                    c || (c = j.anchorOrthoLength());
                    h = j[c];
                    if (h > b)b = h
                }
                var k = g.axesPanels;
                d || (d = f.query(f.ownKeys(k)).where(function (m) {
                    return m === k[m].axis.id
                }).select(function (m) {
                    e[m] = {axis: 0, title: 0};
                    return m
                }).array());
                d.forEach(function (m) {
                    var l = k[m];
                    m = e[m];
                    var n = l.axis.orientation === "x" ? "height" : "width";
                    h = l[n];
                    if (h > m.axis)m.axis = h;
                    if (l = l.titlePanel) {
                        h = l[n];
                        if (h > m.title)m.title = h
                    }
                })
            }, this);
            this.children.forEach(function (g) {
                if (b > 0) {
                    var h = g.titlePanel;
                    h.size = h.size.clone().set(c, b)
                }
                var j = g.axesPanels;
                d.forEach(function (k) {
                    var m = j[k];
                    k = e[k];
                    var l = m.axis.orientation === "x" ? "height" : "width";
                    m.size = m.size.clone().set(l, k.axis);
                    if (m = m.titlePanel)m.size = m.size.clone().set(l, k.title)
                });
                g.basePanel.invalidateLayout()
            }, this)
        }
    });
    f.type("pvc.CategoricalAbstractPanel", i.CartesianAbstractPanel).init(function (a, b, c, d) {
        this.base(a, b, c, d);
        this.stacked = c.option("Stacked")
    });
    f.type("pvc.AxisPanel", i.BasePanel).init(function (a, b, c, d) {
        d = f.create(d, {anchor: c.option("Position")});
        var e = d.anchor || this.anchor;
        this.axis =
            c;
        this.base(a, b, d);
        this.roleName = c.role.name;
        this.isDiscrete = c.role.isDiscrete();
        this._extensionPrefix = c.extensionPrefixes;
        if (this.labelSpacingMin == null)this.labelSpacingMin = this.isDiscrete ? 0.25 : 1.5;
        if (this.showTicks == null)this.showTicks = !this.isDiscrete;
        if (d.font === undefined)if (a = this._getConstantExtension("label", "font"))this.font = a;
        if (d.tickLength === undefined) {
            d = +this._getConstantExtension("ticks", this.anchorOrthoLength(e));
            if (!isNaN(d) && isFinite(d))this.tickLength = d
        }
    }).add({
        pvRule: null,
        pvTicks: null,
        pvLabel: null,
        pvRuleGrid: null,
        pvScale: null,
        isDiscrete: false,
        roleName: null,
        axis: null,
        anchor: "bottom",
        tickLength: 6,
        scale: null,
        ruleCrossesMargin: true,
        font: "9px sans-serif",
        labelSpacingMin: null,
        desiredTickCount: null,
        showMinorTicks: true,
        showTicks: null,
        hiddenLabelText: "\u00b7",
        _isScaleSetup: false,
        _createLogInstanceId: function () {
            return this.base() + " - " + this.axis.id
        },
        getTicks: function () {
            return this._layoutInfo && this._layoutInfo.ticks
        },
        _calcLayout: function (a) {
            var b = this.axis.scale;
            if (!this._isScaleSetup) {
                this.scale =
                    this.pvScale = b;
                this.extend(b, "scale");
                this._isScaleSetup = true
            }
            if (b.isNull)a.axisSize = 0; else this._calcLayoutCore(a);
            return this.createAnchoredSize(a.axisSize, a.clientSize)
        },
        _calcLayoutCore: function (a) {
            var b = a.desiredClientSize[this.anchorOrthoLength()];
            a.axisSize = b;
            if (this.isDiscrete && this.useCompositeAxis) {
                if (a.axisSize == null)a.axisSize = 50
            } else {
                this._readTextProperties(a);
                this._calcTicks();
                if (this.scale.type === "discrete")this._tickIncludeModulo = this._calcDiscreteTicksIncludeModulo();
                this._calcAxisSizeFromLabel(a);
                if (a.axisSize == null)a.axisSize = a.requiredAxisSize;
                this._calcMaxTextLengthThatFits();
                this._calcOverflowPaddings()
            }
        },
        _calcAxisSizeFromLabel: function (a) {
            this._calcTicksLabelBBoxes(a);
            this._calcAxisSizeFromLabelBBox(a)
        },
        _readTextProperties: function (a) {
            var b = this._getExtension("label", "textAngle");
            a.isTextAngleFixed = b != null;
            a.textAngle = f.number.as(b, 0);
            a.textMargin = f.number.as(this._getExtension("label", "textMargin"), 3);
            b = this._getExtension("label", "textAlign");
            if (typeof b !== "string")b = this.isAnchorTopOrBottom() ?
                "center" : this.anchor == "left" ? "right" : "left";
            a.textAlign = b;
            b = this._getExtension("label", "textBaseline");
            if (typeof b !== "string")switch (this.anchor) {
                case "right":
                case "left":
                case "center":
                    b = "middle";
                    break;
                case "bottom":
                    b = "top";
                    break;
                default:
                    b = "bottom"
            }
            a.textBaseline = b
        },
        _calcAxisSizeFromLabelBBox: function (a) {
            var b = a.maxLabelBBox, c = this.tickLength + this._getLabelBBoxQuadrantLength(b, this.anchor);
            b.sourceAngle === 0 && this.isAnchorTopOrBottom() || (c += this.tickLength);
            a.requiredAxisSize = c
        },
        _getLabelBBoxQuadrantLength: function (a,
                                               b) {
            var c;
            switch (b) {
                case "left":
                    c = -a.x;
                    break;
                case "right":
                    c = a.x2;
                    break;
                case "top":
                    c = -a.y;
                    break;
                case "bottom":
                    c = a.y2;
                    break
            }
            return Math.max(c, 0)
        },
        _calcOverflowPaddings: function () {
            if (this._layoutInfo.canChange)this._calcOverflowPaddingsFromLabelBBox(); else i.debug >= 2 && this._warn("Layout cannot change. Skipping calculation of overflow paddings.")
        },
        _calcOverflowPaddingsFromLabelBBox: function () {
            var a = null, b = this, c = b._layoutInfo, d = c.ticks;
            if (d.length) {
                var e = c.ticksBBoxes, g = c.paddings, h = b.isAnchorTopOrBottom(),
                    j = h ? "left" : "bottom", k = h ? "right" : "top", m = b.scale, l = m.type === "discrete", n = c.clientSize[b.anchorLength()];
                this.axis.setScaleRange(n);
                var o = function (p, q, r, s) {
                    p = b._getLabelBBoxQuadrantLength(p, q);
                    if (p > 1) {
                        s = m(l ? d[s].value : d[s]);
                        s = r ? s - p : s + p;
                        r = Math.max(0, r ? -s : s - n);
                        if (r > 1) {
                            r -= g[q] || 0;
                            if (r > 1) {
                                if (l)r *= 1.05;
                                if (a) {
                                    s = a[q];
                                    if (s == null || s < r)a[q] = r
                                } else a = f.set({}, q, r)
                            }
                        }
                    }
                };
                e.forEach(function (p, q) {
                    o(p, j, true, q);
                    o(p, k, false, q)
                });
                i.debug >= 6 && a && b._log("OverflowPaddings = " + i.stringify(a))
            }
            c.overflowPaddings = a
        },
        _calcMaxTextLengthThatFits: function () {
            var a =
                this._layoutInfo;
            if (this.compatVersion() <= 1)a.maxTextWidth = null; else {
                var b = a.clientSize[this.anchorOrthoLength()], c = Math.min(a.axisSize, b);
                if (c >= a.requiredAxisSize - this.tickLength)a.maxTextWidth = null; else {
                    b = a.maxLabelBBox;
                    c = c - 2 * this.tickLength;
                    var d, e;
                    switch (this.anchor) {
                        case "left":
                            e = t.vector(0, 1);
                            d = t.vector(-c, 0);
                            break;
                        case "right":
                            e = t.vector(0, 1);
                            d = t.vector(c, 0);
                            break;
                        case "top":
                            e = t.vector(1, 0);
                            d = t.vector(0, -c);
                            break;
                        case "bottom":
                            e = t.vector(1, 0);
                            d = t.vector(0, c);
                            break
                    }
                    var g = d.norm(), h = b.source.points(),
                        j = h[0], k = h[1], m = h[2];
                    h = h[3];
                    var l = m.minus(h), n = k.minus(j), o = t.SvgScene.lineIntersect;
                    n = o(d, e, j, n);
                    d = o(d, e, h, l);
                    o = e = b.sourceTextWidth;
                    var p = n.minus(j), q = p.length();
                    if (q <= e && p.dot(l) >= 0)o = j.dot(g) < k.dot(g) ? q : n.minus(k).length();
                    j = d.minus(h);
                    k = j.length();
                    if (k <= e && j.dot(l) >= 0)o = h.dot(g) < m.dot(g) ? Math.min(o, k) : Math.min(o, d.minus(m).length());
                    if (b.sourceAlign === "center")o -= e - o;
                    a.maxTextWidth = o;
                    i.debug >= 3 && this._log("Trimming labels' text at length " + o.toFixed(2) + "px maxOrthoLength=" + c.toFixed(2) + "px")
                }
            }
        },
        _calcTicks: function () {
            var a = this._layoutInfo;
            a.textHeight = t.Text.fontHeight(this.font) * 2 / 3;
            a.maxTextWidth = null;
            this.axis.setTicks(null);
            switch (this.scale.type) {
                case "discrete":
                    this._calcDiscreteTicks();
                    break;
                case "timeSeries":
                    this._calcTimeSeriesTicks();
                    break;
                case "numeric":
                    this._calcNumberTicks(a);
                    break;
                default:
                    throw f.error.operationInvalid("Undefined axis scale type");
            }
            this.axis.setTicks(a.ticks);
            this.axis.setScaleRange(a.clientSize[this.anchorLength()]);
            a.maxTextWidth == null && this._calcTicksTextLength(a)
        },
        _calcDiscreteTicks: function () {
            var a = this.axis, b = this._layoutInfo;
            b.ticks = a.domainItems();
            var c, d, e = a.role.grouping;
            if (e.isSingleDimension && (d = e.firstDimensionType()) && d.valueType === Date)if ((d = f.query(a.domainValues()).range()) && d.min !== d.max) {
                var g = new t.Scale.linear(d.min, d.max);
                g.ticks();
                (c = a.option("TickFormatter")) && g.tickFormatter(c);
                var h = a.domainValues();
                c = function (j, k) {
                    return g.tickFormat(h[k])
                }
            }
            c || (c = function (j) {
                return j.absLabel
            });
            b.ticksText = b.ticks.map(c);
            this._clearTicksTextDeps(b)
        },
        _clearTicksTextDeps: function (a) {
            a.maxTextWidth = a.ticksTextLength = a.ticksBBoxes = null
        },
        _calcTimeSeriesTicks: function () {
            this._calcContinuousTicks(this._layoutInfo, this.desiredTickCount)
        },
        _calcNumberTicks: function () {
            var a = this.desiredTickCount;
            if (a == null) {
                if (this.isAnchorTopOrBottom()) {
                    this._calcNumberHTicks();
                    return
                }
                a = this._calcNumberVDesiredTickCount()
            }
            this._calcContinuousTicks(this._layoutInfo, a)
        },
        _calcContinuousTicks: function (a, b) {
            this._calcContinuousTicksValue(a, b);
            this._calcContinuousTicksText(a)
        },
        _calcContinuousTicksValue: function (a, b) {
            a.ticks = this.axis.calcContinuousTicks(b);
            if (i.debug > 4) {
                this._log("DOMAIN: " + i.stringify(this.scale.domain()));
                this._log("TICKS:  " + i.stringify(a.ticks))
            }
        },
        _calcContinuousTicksText: function (a) {
            var b = a.ticksText = a.ticks.map(function (c) {
                return this.scale.tickFormat(c)
            }, this);
            this._clearTicksTextDeps(a);
            return b
        },
        _calcTicksTextLength: function (a) {
            var b = 0, c = this.font, d = a.ticksText || this._calcContinuousTicksText(a);
            d = a.ticksTextLength = d.map(function (e) {
                e = t.Text.measureWidth(e,
                    c);
                if (e > b)b = e;
                return e
            });
            a.maxTextWidth = b;
            a.ticksBBoxes = null;
            return d
        },
        _calcTicksLabelBBoxes: function (a) {
            var b = this, c = b._layoutInfo, d = a.ticksTextLength || b._calcTicksTextLength(a), e, g = c.maxTextWidth;
            a.ticksBBoxes = d.map(function (h) {
                var j = b._calcLabelBBox(h);
                if (!e && h === g)e = j;
                return j
            }, b);
            c.maxLabelBBox = e
        },
        _calcLabelBBox: function (a) {
            var b = this._layoutInfo;
            return i.text.getLabelBBox(a, b.textHeight, b.textAlign, b.textBaseline, b.textAngle, b.textMargin)
        },
        _calcDiscreteTicksIncludeModulo: function () {
            var a = this.axis.option("OverlappedLabelsMode");
            if (a !== "hide" && a !== "rotatethenhide")return 1;
            var b = this._layoutInfo;
            a = b.ticks.length;
            if (a <= 2)return 1;
            var c = this.scale.range().step, d = b.textHeight, e = b.maxTextWidth;
            if (!(e > 0 && d > 0 && c > 0))return 1;
            var g = d * this.labelSpacingMin, h = t.Text.measureWidth("x", this.font) + g, j = b.textAngle, k = this.isAnchorTopOrBottom();
            b = Math.abs(Math[k ? "sin" : "cos"](j));
            j = Math.abs(Math[k ? "cos" : "sin"](j));
            d = b < 1.0E-8 ? Infinity : Math.ceil((g + d) / (c * b));
            c = j < 1.0E-8 ? Infinity : Math.ceil((h + e) / (c * j));
            c = Math.min(d, c);
            if (!isFinite(c) || c < 1 || Math.ceil(a /
                c) < 2)c = 1;
            return c
        },
        _tickMultipliers: [1, 2, 5, 10],
        _calcNumberVDesiredTickCount: function () {
            var a = this._layoutInfo, b = a.textHeight * (1 + Math.max(0, this.labelSpacingMin));
            a = a.clientSize[this.anchorLength()];
            a = Math.max(1, ~~(a / b));
            if (a <= 1)return 1;
            b = this.scale.domain();
            b = b[1] - b[0];
            if (b <= 0)return a;
            a = b / a;
            var c = Math.floor(t.log(a, 10));
            c = Math.pow(10, c);
            for (var d, e = this._tickMultipliers, g = 0; g < e.length; g++) {
                d = e[g] * c;
                if (d >= a)break
            }
            return Math.max(1, Math.floor(b / d))
        },
        _calcNumberHTicks: function () {
            var a = this._layoutInfo,
                b = a.clientSize[this.anchorLength()], c = a.textHeight * Math.max(0, this.labelSpacingMin), d = this._calcNumberHDesiredTickCount(c), e = i.debug >= 7, g, h, j, k, m;
            do {
                e && this._log("calculateNumberHTicks TickCount IN desired = " + d);
                j = {};
                this._calcContinuousTicksValue(j, d);
                var l = j.ticks, n = l.length;
                if (l.exponentOverflow)if (g == null)if (l.exponent === this.exponentMin) {
                    k = j;
                    g = 1
                } else {
                    m = j;
                    g = -1
                } else {
                    if (g === 1) {
                        if (k)j = k
                    } else if (m)j = m;
                    break
                } else if (h == null || n !== h) {
                    e && this._log("calculateNumberHTicks TickCount desired/resulting = " +
                    d + " -> " + n);
                    h = n;
                    this._calcContinuousTicksText(j);
                    var o = this._calcNumberHLength(j, c), p = j.excessLength = o - b, q = j.error = Math.abs(p / b);
                    if (e) {
                        this._log("calculateNumberHTicks error=" + (p >= 0 ? "+" : "-") + (j.error * 100).toFixed(0) + "% count=" + n + " step=" + l.step);
                        this._log("calculateNumberHTicks Length client/resulting = " + b + " / " + o + " spacing = " + c)
                    }
                    if (p > 0) {
                        if (d === 1) {
                            if (n === 3 && q <= 1) {
                                j.ticks.splice(1, 1);
                                j.ticksText.splice(1, 1);
                                j.ticks.step *= 2
                            } else {
                                j.ticks.length = 1;
                                j.ticksText.length = 1
                            }
                            delete j.maxTextWidth;
                            break
                        }
                        if (k) {
                            j =
                                k;
                            break
                        }
                        m = j;
                        g = -1
                    } else {
                        if (q <= 0.05 || g === -1)break;
                        k = j;
                        g = +1
                    }
                }
                d += g
            } while (1);
            if (j) {
                a.ticks = j.ticks;
                a.ticksText = j.ticksText;
                a.maxTextWidth = j.maxTextWidth;
                if (i.debug >= 5)this._log("calculateNumberHTicks RESULT error=" + (j.excessLength >= 0 ? "+" : "-") + (j.error * 100).toFixed(0) + "% count=" + j.ticks.length + " step=" + j.ticks.step)
            }
            e && this._log("calculateNumberHTicks END")
        },
        _calcNumberHDesiredTickCount: function (a) {
            var b = this._layoutInfo, c = this.scale.domain().map(function (d) {
                d = +d.toFixed(2);
                d = this.scale.tickFormat(d);
                return t.Text.measureWidth(d,
                    this.font)
            }, this);
            c = Math.max((c[1] + c[0]) / 2, b.textHeight);
            b = b.clientSize[this.anchorLength()];
            return Math.max(1, ~~(b / (c + a)))
        },
        _calcNumberHLength: function (a, b) {
            a = a.ticksText;
            var c = f.query(a).select(function (d) {
                return t.Text.measureWidth(d, this.font)
            }, this).max();
            return Math.max(c, (a.length - 1) * (c + b))
        },
        _createCore: function () {
            if (!this.scale.isNull) {
                var a = this._layoutInfo.clientSize, b = this._layoutInfo.paddings, c = this.anchorOrtho(), d = this.anchorOpposite(c), e = this.anchorOrthoLength(c), g = this.ruleCrossesMargin ?
                    -b[c] : 0;
                this._rSize = a = a[e] + (this.ruleCrossesMargin ? b[d] : 0) - g;
                b = this._getRootScene();
                this.pvRule = (new i.visual.Rule(this, this.pvPanel, {extensionId: "rule"})).lock("data", [b]).override("defaultColor", f.fun.constant("#666666")).lock(this.anchorOpposite(), 0).lock(c, g).lock(e, a).pvMark.zOrder(30).strokeDasharray(null).lineCap("square");
                if (this.isDiscrete)this.useCompositeAxis ? this.renderCompositeOrdinalAxis() : this.renderOrdinalAxis(); else this.renderLinearAxis()
            }
        },
        _getExtensionId: function () {
            return ""
        },
        _getRootScene: function () {
            if (!this._rootScene) {
                var a =
                    this._rootScene = new i.visual.CartesianAxisRootScene(null, {
                        panel: this,
                        source: this._getRootData()
                    }), b = this._layoutInfo, c = b.ticks, d = b.ticksText;
                if (this.isDiscrete)if (this.useCompositeAxis)this._buildCompositeScene(a); else {
                    var e = this._tickIncludeModulo;
                    b = this.hiddenLabelText;
                    a.vars.tickIncludeModulo = e;
                    a.vars.hiddenLabelText = b;
                    var g, h, j, k;
                    if (e > 2) {
                        i.debug >= 3 && this._info("Showing only one in every " + e + " tick labels");
                        var m = a.group.owner.keySep;
                        j = function () {
                            var l = g.map(function (o) {
                                    return o.key
                                }).join(m),
                                n = h.slice(0, 10).join(", ") + (h.length > 10 ? ", ..." : "");
                            (new i.visual.CartesianAxisTickScene(a, {source: g, tick: l, tickRaw: l, tickLabel: n, isHidden: true})).dataIndex = k;
                            g = h = k = null
                        }
                    }
                    c.forEach(function (l, n) {
                        var o = n % e !== 0;
                        if (o && e > 2) {
                            if (k == null)k = n;
                            (g || (g = [])).push(l);
                            (h || (h = [])).push(d[n])
                        } else {
                            g && j();
                            (new i.visual.CartesianAxisTickScene(a, {
                                source: l,
                                tick: l.value,
                                tickRaw: l.rawValue,
                                tickLabel: d[n],
                                isHidden: o
                            })).dataIndex = n
                        }
                    });
                    g && j()
                } else c.forEach(function (l, n) {
                    (new i.visual.CartesianAxisTickScene(a, {
                        tick: l, tickRaw: l,
                        tickLabel: d[n]
                    })).dataIndex = n
                }, this)
            }
            return this._rootScene
        },
        _buildCompositeScene: function (a) {
            function b(d) {
                var e = d.group;
                if (c) {
                    var g = d.vars.tick;
                    d.nodeValue = d.value = g.rawValue;
                    d.nodeLabel = d.label = g.label
                }
                e.childCount() && e.children().each(function (h) {
                    var j = new i.visual.CartesianAxisTickScene(d, {source: h, tick: h.value, tickRaw: h.rawValue, tickLabel: h.label});
                    j.dataIndex = h.childIndex();
                    b(j)
                })
            }

            var c = this.compatVersion() <= 1;
            a.vars.tick = new I("", "");
            b(a)
        },
        _getRootData: function () {
            var a;
            if (this.isDiscrete &&
                this.useCompositeAxis) {
                a = this.anchor;
                a = this.axis.role.select(this.data, {
                    visible: this.axis.domainVisibleOnly() ? true : null,
                    isNull: this.chart.options.ignoreNulls || this.axis.domainIgnoreNulls() ? false : null,
                    reverse: a == "bottom" || a == "left"
                })
            } else a = this.data;
            return a
        },
        renderOrdinalAxis: function () {
            var a = this.scale, b = this.hiddenLabelText, c = this._tickIncludeModulo * a.range().step / 2, d = this.anchorOpposite(), e = this.anchorLength(), g = this.anchorOrtho(), h = this.anchorOrthoLength(), j = this.pvRule, k = this._getRootScene(),
                m = this._layoutInfo, l = this.compatVersion() <= 1, n;
            if (l) {
                var o = function (r) {
                    this.value = this.absValue = r.rawValue;
                    this.path = (this.nodeName = "" + (this.value || "")) ? [this.nodeName] : [];
                    this.label = this.absLabel = r.label
                };
                o.prototype.toString = function () {
                    return "" + this.value
                };
                n = function (r) {
                    return function (s) {
                        var u = Object.create(this);
                        u.index = this.parent.index;
                        return r.call(u, new o(s.vars.tick))
                    }
                }
            }
            k = (new i.visual.Panel(this, this.pvPanel, {extensionId: "ticksPanel"})).lock("data", k.childNodes).lock(d, 0).lockMark(g, function (r) {
                return r.isHidden ?
                a(r.previousSibling.vars.tick.value) + c : a(r.vars.tick.value)
            }).lock("strokeDasharray", null).lock("strokeStyle", null).lock("fillStyle", null).lock("lineWidth", 0).pvMark.zOrder(20);
            if (l || this.showTicks)this.pvTicks = (new i.visual.Rule(this, k, {
                extensionId: "ticks",
                wrapper: n
            })).lock("data").intercept("visible", function (r) {
                return !r.isHidden && this.delegateExtension(true)
            }).optional("lineWidth", 1).lock(d, 0).lock(g, 0).lock(e, null).optional(h, this.tickLength * 2 / 3).override("defaultColor", function () {
                if (l)return t.Color.names.transparent;
                return j.scene ? j.scene[0].strokeStyle : "#666666"
            }).pvMark;
            var p = this.font, q = this._layoutInfo.maxTextWidth;
            isFinite(q) || (q = 0);
            this.pvLabel = (new i.visual.Label(this, k, {
                extensionId: "label",
                showsInteraction: true,
                noClick: false,
                noDoubleClick: false,
                noSelect: false,
                noTooltip: false,
                noHover: false,
                wrapper: n
            })).intercept("visible", function (r) {
                return !r.isHidden ? this.delegateExtension(true) : !!r.vars.hiddenLabelText
            }).intercept("text", function (r) {
                var s;
                if (r.isHidden)s = b; else {
                    s = this.delegateExtension();
                    if (s === undefined)s =
                        r.vars.tick.label;
                    if (q && (!this.showsInteraction() || !r.isActive))s = i.text.trimToWidthB(q, s, p, "..", false)
                }
                return s
            }).pvMark.zOrder(40).lock(d, this.tickLength).lock(g, 0).font(p).textStyle("#666666").textAlign(m.textAlign).textBaseline(m.textBaseline);
            this._debugTicksPanel(k)
        },
        _getTooltipFormatter: function (a) {
            if (this.axis.option("TooltipEnabled")) {
                a.gravity = this._calcTipsyGravity();
                var b = this.axis.option("TooltipFormat");
                if (b)return function (d) {
                    return b.call(d, d.scene)
                };
                var c = this.axis.option("TooltipAutoContent");
                if (c === "summary")return this._summaryTooltipFormatter;
                if (c === "value") {
                    a.isLazy = false;
                    return function (d) {
                        return d.scene.vars.tick.label
                    }
                }
            }
        },
        _debugTicksPanel: function (a) {
            if (i.debug >= 16) {
                var b = this._layoutInfo, c = b.ticksBBoxes || this._calcTicksLabelBBoxes(b);
                a.add(t.Panel)[this.anchorOpposite()](this.tickLength)[this.anchorOrtho()](0)[this.anchorLength()](0)[this.anchorOrthoLength()](0).fillStyle(null).strokeStyle(null).lineWidth(0).visible(function (d) {
                    return !d.isHidden
                }).add(t.Line).data(function (d) {
                    d =
                        c[d.dataIndex].source.points();
                    if (d.length > 1)d = d.concat(d[0]);
                    return d
                }).left(function (d) {
                    return d.x
                }).top(function (d) {
                    return d.y
                }).strokeStyle("red").lineWidth(0.5).strokeDasharray("-")
            }
        },
        renderLinearAxis: function () {
            var a = this.scale, b = this.pvRule, c = this.anchorOpposite(), d = this.anchorLength(), e = this.anchorOrtho(), g = this.anchorOrthoLength(), h = this._getRootScene(), j;
            if (this.compatVersion() <= 1)j = function (n) {
                return function (o) {
                    var p = Object.create(this);
                    p.index = this.parent.index;
                    return n.call(p, o.vars.tick.rawValue)
                }
            };
            h = (new i.visual.Panel(this, this.pvPanel, {extensionId: "ticksPanel"})).lock("data", h.childNodes).lock(c, 0).lockMark(e, function (n) {
                return a(n.vars.tick.value)
            }).lock("strokeStyle", null).lock("fillStyle", null).lock("lineWidth", 0).pvMark.zOrder(20);
            if (this.showTicks) {
                var k = this.pvTicks = (new i.visual.Rule(this, h, {
                    extensionId: "ticks",
                    wrapper: j
                })).lock("data").override("defaultColor", function () {
                    return b.scene ? b.scene[0].strokeStyle : "#666666"
                }).lock(c, 0).lock(e, 0).lock(d, null).optional(g, this.tickLength).pvMark;
                if (this.showMinorTicks) {
                    var m = this._layoutInfo.ticks, l = m.length;
                    m = l > 1 ? Math.abs(a(m[1]) - a(m[0])) / 2 : 0;
                    this.pvMinorTicks = (new i.visual.Rule(this, this.pvTicks, {
                        extensionId: "minorTicks",
                        wrapper: j
                    })).lock("data").intercept("visible", function (n) {
                        return n.childIndex() < l - 1 && (!k.scene || k.scene[0].visible) && this.delegateExtension(true)
                    }).override("defaultColor", function () {
                        return k.scene ? k.scene[0].strokeStyle : t.Color.names.d
                    }).lock(c, 0).lock(d, null).optional(g, this.tickLength / 2).lockMark(e, m).pvMark
                }
            }
            this.renderLinearAxisLabel(h,
                j);
            this._debugTicksPanel(h)
        },
        renderLinearAxisLabel: function (a, b) {
            var c = this.anchorOpposite(), d = this.anchorOrtho(), e = this.font, g = this._layoutInfo.maxTextWidth;
            isFinite(g) || (g = 0);
            var h = this.pvLabel = (new i.visual.Label(this, a, {
                    extensionId: "label",
                    noHover: false,
                    showsInteraction: true,
                    wrapper: b
                })).lock("data").intercept("text", function (k) {
                    var m = k.vars.tick.label;
                    if (g && (!this.showsInteraction() || !k.isActive))m = i.text.trimToWidthB(g, m, e, "..", false);
                    return m
                }).pvMark.lock(c, this.tickLength).lock(d, 0).zOrder(40).font(this.font).textStyle("#666666"),
                j = this.pvPanel.root;
            this.isAnchorTopOrBottom() ? h.textBaseline(c).textAlign(function (k) {
                if (this.index === 0) {
                    k = h.toScreenTransform().transformHPosition(h.left());
                    if (k <= 0)return "left"
                } else if (this.index === k.parent.childNodes.length - 1) {
                    k = h.toScreenTransform().transformHPosition(h.left());
                    if (k >= j.width())return "right"
                }
                return "center"
            }) : h.textAlign(c).textBaseline(function (k) {
                if (this.index === 0) {
                    k = h.toScreenTransform().transformVPosition(h.top());
                    if (k >= j.height())return "bottom"
                } else if (this.index === k.parent.childNodes.length -
                    1) {
                    k = h.toScreenTransform().transformVPosition(h.top());
                    if (k <= 0)return "top"
                }
                return "middle"
            })
        },
        _onV1Click: function (a, b) {
            this.isDiscrete && this.useCompositeAxis && b.call(a.pvMark, a.scene, a.event)
        },
        _onV1DoubleClick: function (a, b) {
            this.isDiscrete && this.useCompositeAxis && b.call(a.pvMark, a.scene, a.event)
        },
        _getSelectableMarks: function () {
            if (this.isDiscrete && this.isVisible && this.pvLabel)return this.base()
        },
        renderCompositeOrdinalAxis: function () {
            var a = this.isAnchorTopOrBottom(), b = a ? "h" : "v", c = 2, d = 2, e = this.font, g =
                t.Text.fontHeight(e) / 2, h = this._pvLayout = this._getCompositeLayoutSingleCluster();
            h.node.def("fitInfo", null).height(function (m) {
                var l = i.text.getFitInfo(m.dx, m.dy, m.vars.tick.label, e, g);
                if (!l.h)if (b === "v" && l.v)d = Math.min(c, m.depth); else c = Math.min(c, m.depth);
                this.fitInfo(l);
                return m.dy
            });
            h.node.add(t.Bar).fillStyle("rgba(127,127,127,.001)").strokeStyle(function (m) {
                if (m.maxDepth === 1 || !m.maxDepth)return null;
                return "rgba(127,127,127,0.3)"
            }).lineWidth(function (m) {
                if (m.maxDepth === 1 || !m.maxDepth)return 0;
                return 0.5
            }).text(function (m) {
                return m.vars.tick.label
            });
            var j = a ? "center" : this.anchor == "left" ? "right" : "left", k;
            if (this.compatVersion() <= 1)k = function (m) {
                return function (l) {
                    return m.call(this, l)
                }
            };
            this.pvLabel = (new i.visual.Label(this, h.label, {
                extensionId: "label",
                noClick: false,
                noDoubleClick: false,
                noSelect: false,
                noTooltip: false,
                noHover: false,
                showsInteraction: true,
                wrapper: k,
                tooltipArgs: {options: {offset: g * 2}}
            })).pvMark.def("lblDirection", "h").textAngle(function (m) {
                if (m.depth >= d && m.depth < c) {
                    this.lblDirection("v");
                    return -Math.PI / 2
                }
                if (m.depth >= c) {
                    m = Math.atan(m.dy / m.dx);
                    if (m > 1.27) {
                        this.lblDirection("v");
                        return -Math.PI / 2
                    }
                    if (m > 0.3) {
                        this.lblDirection("d");
                        return -m
                    }
                }
                this.lblDirection("h");
                return 0
            }).textMargin(1).textAlign(function (m) {
                return b != "v" || m.depth >= d || m.depth >= c ? "center" : j
            }).left(function (m) {
                return b != "v" || m.depth >= d || m.depth >= c ? m.x + m.dx / 2 : j == "right" ? m.x + m.dx : m.x
            }).font(e).textStyle("#666666").text(function (m) {
                var l = m.vars.tick.label;
                if (!m.isActive || !this.sign.showsInteraction()) {
                    var n = this.fitInfo();
                    switch (this.lblDirection()) {
                        case "h":
                            if (!n.h)return i.text.trimToWidthB(m.dx,
                                l, e, "..");
                            break;
                        case "v":
                            if (!n.v)return i.text.trimToWidthB(m.dy, l, e, "..");
                            break;
                        case "d":
                            if (!n.d) {
                                m = Math.sqrt(f.sqr(m.dy) + f.sqr(m.dx));
                                return i.text.trimToWidthB(m - g, l, e, "..")
                            }
                            break
                    }
                }
                return l
            })
        },
        _getCompositeLayoutSingleCluster: function () {
            var a = this._getRootScene(), b = this.anchor, c = a.group.treeHeight, d = this._layoutInfo.axisSize;
            c++;
            var e = d / c;
            e -= c > 2 ? 1 / 12 * d : 0;
            c = c / (c - 1);
            var g = i.BasePanel.orthogonalLength[b];
            e = g == "width" ? b === "left" ? [-e, 0] : [e, 0] : b === "top" ? [0, -e] : [0, e];
            this.pvRule.sign.override("defaultColor",
                f.fun.constant(null)).override("defaultStrokeWidth", f.fun.constant(0));
            d = this.pvRule.add(t.Panel)[g](d).strokeStyle(null).lineWidth(0).add(t.Panel)[g](d * c).strokeStyle(null).lineWidth(0);
            d.transform(t.Transform.identity.translate(e[0], e[1]));
            return d.add(t.Layout.Cluster.Fill).nodes(a.nodes()).orient(b)
        },
        _calcTipsyGravity: function () {
            switch (this.anchor) {
                case "bottom":
                    return "s";
                case "top":
                    return "n";
                case "left":
                    return "w";
                case "right":
                    return "e"
            }
            return "s"
        }
    });
    f.type("pvc.AxisTitlePanel", i.TitlePanelAbstract).init(function (a,
                                                                      b, c, d) {
        this.axis = c;
        this.base(a, b, d);
        this._extensionPrefix = c.extensionPrefixes.map(function (e) {
            return e + "Title"
        })
    }).add({
        _calcLayout: function (a) {
            var b = this.axis.scale;
            if (!b || b.isNull)return new M(0, 0);
            return this.base(a)
        }, _createCore: function (a) {
            var b = this.axis.scale;
            if (!(!b || b.isNull))return this.base(a)
        }
    });
    f.type("pvc.PiePanel", i.PlotPanel).init(function (a, b, c, d) {
        var e = c.option("ValuesLabelStyle");
        this.base(a, b, c, d);
        this.explodedOffsetRadius = c.option("ExplodedSliceRadius");
        this.explodedSliceIndex =
            c.option("ExplodedSliceIndex");
        this.activeOffsetRadius = c.option("ActiveSliceRadius");
        this.labelStyle = e;
        if (e === "linked") {
            this.linkInsetRadius = c.option("LinkInsetRadius");
            this.linkOutsetRadius = c.option("LinkOutsetRadius");
            this.linkMargin = c.option("LinkMargin");
            this.linkHandleWidth = c.option("LinkHandleWidth");
            this.linkLabelSize = c.option("LinkLabelSize");
            this.linkLabelSpacingMin = c.option("LinkLabelSpacingMin")
        }
    }).add({
        pvPie: null, pvPieLabel: null, valueRoleName: "value", _getV1Datum: function (a) {
            var b = a.datum;
            if (b) {
                b = Object.create(b);
                b.percent = a.vars.value.percent;
                b = b
            }
            return b
        }, _calcLayout: function (a) {
            function b(u) {
                return f.between(L.resolve(u, g), 0, g)
            }

            function c(u) {
                return f.between(L.resolve(u, e), 0, e)
            }

            var d = a.clientSize, e = d.width, g = Math.min(e, d.height) / 2;
            if (!g)return new M(0, 0);
            d = t.vector(d.width / 2, d.height / 2);
            var h = this._getConstantExtension("label", "font");
            if (!f.string.is(h))h = this.valuesFont;
            var j = g;
            if (this.valuesVisible && this.labelStyle === "linked") {
                var k = b(this.linkInsetRadius), m = b(this.linkOutsetRadius),
                    l = c(this.linkMargin), n = c(this.linkLabelSize), o = f.number.to(this._getConstantExtension("label", "textMargin"), 3), p = t.Text.fontHeight(h) * 2 / 3, q = this.linkHandleWidth * p;
                l += q;
                var r = this.linkLabelSpacingMin * p, s = Math.max(0, e / 2 - g);
                s = Math.max(0, m + l + n - s);
                s = Math.max(0, m + p, s);
                if (s >= j) {
                    this.valuesVisible = false;
                    i.debug >= 2 && this._log("Hiding linked labels due to insufficient space.")
                } else {
                    j -= s;
                    a.link = {
                        insetRadius: k,
                        outsetRadius: m,
                        elbowRadius: j + m,
                        linkMargin: l,
                        handleWidth: q,
                        labelSize: n,
                        maxTextWidth: n - o,
                        labelSpacingMin: r,
                        textMargin: o,
                        lineHeight: p
                    }
                }
            }
            k = b(this.explodedOffsetRadius);
            m = 0;
            if (this.hoverable())m = b(this.activeOffsetRadius);
            l = k + m;
            j = j - l;
            if (j < 0)return new M(0, 0);
            a.resolvePctRadius = b;
            a.center = d;
            a.clientRadius = g;
            a.normalRadius = j;
            a.explodedOffsetRadius = k;
            a.activeOffsetRadius = m;
            a.maxOffsetRadius = l;
            a.labelFont = h
        }, _createCore: function (a) {
            var b = this, c = b.chart, d = this._buildScene(), e = a.center, g = a.normalRadius, h, j = ["slice"];
            if (this.compatVersion() <= 1) {
                j.push("");
                h = function (l) {
                    return function (n) {
                        return l.call(this, n.vars.value.value)
                    }
                }
            }
            this.pvPie =
                (new i.visual.PieSlice(this, this.pvPanel, {
                    extensionId: j,
                    center: e,
                    activeOffsetRadius: a.activeOffsetRadius,
                    maxOffsetRadius: a.maxOffsetRadius,
                    resolvePctRadius: a.resolvePctRadius,
                    wrapper: h,
                    tooltipArgs: {
                        options: {
                            useCorners: true, gravity: function () {
                                var l = this.midAngle(), n = Math.cos(l) >= 0;
                                l = Math.sin(l) >= 0;
                                return n ? l ? "nw" : "sw" : l ? "ne" : "se"
                            }
                        }
                    }
                })).lock("data", d.childNodes).override("angle", function (l) {
                    return l.vars.value.angle
                }).override("defaultOffsetRadius", function () {
                    var l = b.explodedSliceIndex;
                    if (l == null ||
                        l == this.pvMark.index)return a.explodedOffsetRadius;
                    return 0
                }).lockMark("outerRadius", function () {
                    return c.animate(0, g)
                }).localProperty("innerRadiusEx", L.parse).intercept("innerRadius", function () {
                    var l = this.delegateExtension();
                    if (l == null) {
                        l = this.pvMark.innerRadiusEx();
                        l = l != null ? L.resolve(l, this.pvMark.outerRadius()) || 0 : 0
                    }
                    return l > 0 ? c.animate(0, l) : 0
                }).pvMark;
            if (this.valuesVisible) {
                this.valuesFont = a.labelFont;
                if (this.labelStyle === "inside")this.pvPieLabel = i.visual.ValueLabel.maybeCreate(this, this.pvPie,
                    {wrapper: h}).intercept("visible", function (l) {
                        return l.vars.value.angle >= 0.001 && this.delegateExtension(true)
                    }).override("defaultText", function (l) {
                        return l.vars.value.sliceLabel
                    }).override("calcBackgroundColor", function (l, n) {
                        return this.pvMark.target.fillStyle() || this.base(l, n)
                    }).pvMark.textMargin(10); else if (this.labelStyle === "linked") {
                    var k = a.link;
                    d.layoutLinkLabels(a);
                    this.pvLinkPanel = this.pvPanel.add(t.Panel).data(d.childNodes).localProperty("pieSlice").pieSlice(function () {
                        return b.pvPie.scene[this.index]
                    });
                    this.pvLinkLine = (new i.visual.Line(this, this.pvLinkPanel, {
                        extensionId: "linkLine",
                        freePosition: true,
                        noClick: true,
                        noDoubleClick: true,
                        noSelect: true,
                        noTooltip: true,
                        noHover: true,
                        showsActivity: false
                    })).lockMark("data", function (l) {
                        var n = this.parent.pieSlice(), o = n.startAngle + n.angle / 2, p = n.outerRadius - k.insetRadius, q = n.left + p * Math.cos(o);
                        n = n.top + p * Math.sin(o);
                        o = l.childNodes[0];
                        if (!o || !o._isFirstDynamicScene) {
                            o = new i.visual.PieLinkLineScene(l, q, n, 0);
                            o._isFirstDynamicScene = true
                        } else {
                            o.x = q;
                            o.y = n
                        }
                        return l.childNodes
                    }).override("defaultColor",
                        function (l, n) {
                            return n === "stroke" ? "black" : this.base(l, n)
                        }).override("defaultStrokeWidth", f.fun.constant(0.5)).pvMark.lock("visible").lock("top", function (l) {
                            return l.y
                        }).lock("left", function (l) {
                            return l.x
                        });
                    this.pvPieLabel = (new i.visual.Label(this, this.pvLinkPanel, {
                        extensionId: "label",
                        noClick: false,
                        noDoubleClick: false,
                        noSelect: false,
                        noHover: false,
                        showsInteraction: true
                    })).lockMark("data", function (l) {
                        return l.lineScenes
                    }).intercept("textStyle", function (l) {
                        this._finished = false;
                        var n = this.delegate();
                        if (n && !this._finished && !this.mayShowActive(l) && this.mayShowNotAmongSelected(l))n = this.dimColor(n, "text");
                        return n
                    }).pvMark.lock("visible").left(function (l) {
                            return l.vars.link.labelX
                        }).top(function (l) {
                            return l.vars.link.labelY + (this.index + 1) * k.lineHeight
                        }).textAlign(function (l) {
                            return l.vars.link.labelAnchor
                        }).textMargin(k.textMargin).textBaseline("bottom").text(function (l) {
                            return l.vars.link.labelLines[this.index]
                        });
                    if (i.debug >= 20) {
                        this.pvPanel.add(t.Panel).zOrder(-10).left(e.x - a.clientRadius).top(e.y -
                        a.clientRadius).width(a.clientRadius * 2).height(a.clientRadius * 2).strokeStyle("red");
                        this.pvPanel.strokeStyle("green");
                        var m = t.Colors.category10();
                        this.pvLinkLine.segmented(true).strokeStyle(function () {
                            return m(this.index)
                        })
                    }
                }
                this.pvPieLabel.font(a.labelFont)
            }
        }, _getExtensionId: function () {
            var a = [{abs: "content"}];
            this.chart.parent && a.push({abs: "smallContent"});
            return a.concat(this.base())
        }, renderInteractive: function () {
            this.pvPanel.render()
        }, _buildScene: function () {
            var a = new i.visual.PieRootScene(this);
            this.sum = a.vars.sumAbs.value;
            return a
        }
    });
    f.type("pvc.visual.PieRootScene", i.visual.Scene).init(function (a) {
        function b(p, q) {
            if (q) {
                q = q._datums;
                if (q.length === 1)return q[0].atoms[g].label
            }
            return h.format(p)
        }

        var c = a.axes.category, d = c.domainData();
        this.base(null, {panel: a, source: d});
        var e = new i.visual.RoleVarHelper(this, a.visualRoles.color, {roleVar: "color"}), g = a.visualRoles[a.valueRoleName].firstDimensionName(), h = d.dimensions(g), j = a.chart.options.percentValueFormat;
        d = a.axes.angle;
        var k = d.scale, m = k.isNull ?
            0 : k.domain()[1], l = {abs: d.scaleUsesAbs()};
        this.vars.sumAbs = new I(m, b(m));
        var n = this, o = f.type(i.visual.PieCategoryScene).init(function (p, q) {
            this.base(n, {source: p});
            this.vars.category = I.fromComplex(p);
            p = new I(q, b(q, p));
            p.angle = k(q);
            q = Math.abs(q) / m;
            p.percent = new I(q, j(q));
            this.vars.value = p;
            p.sliceLabel = this.sliceLabel();
            e.onNewScene(this, true)
        });
        a._extendSceneType("category", o, ["sliceLabel", "sliceLabelMask"]);
        c = c.domainItems();
        if (c.length) {
            c.forEach(function (p) {
                var q = p.dimensions(g).sum(l);
                q !== 0 && new o(p,
                    q)
            });
            if (!n.childNodes.length && !a.visualRoles.multiChart.isBound())throw new InvalidDataException("Unable to create a pie chart, please check the data values.");
        }
    }).add({
        layoutLinkLabels: function (a) {
            var b = -Math.PI / 2, c = [], d = [];
            this.childNodes.forEach(function (e) {
                b = e.layoutI(a, b);
                (e.vars.link.dir > 0 ? d : c).push(e)
            });
            this._distributeLabels(-1, c, a);
            this._distributeLabels(+1, d, a)
        }, _distributeLabels: function (a, b, c) {
            b.sort(function (d, e) {
                return f.compare(d.vars.link.targetY, e.vars.link.targetY)
            });
            this._distributeLabelsDownwards(b,
                c) && this._distributeLabelsUpwards(b, c) && this._distributeLabelsEvenly(b, c);
            b.forEach(function (d) {
                d.layoutII(c)
            })
        }, _distributeLabelsDownwards: function (a, b) {
            var c = b.link.labelSpacingMin;
            b = b.clientSize.height;
            for (var d = false, e = 0, g = a.length - 1; e < g; e++) {
                var h = a[e].vars.link;
                if (!e && h.labelTop() < 0)d = true;
                var j = a[e + 1].vars.link, k = h.labelBottom() + c;
                if (j.labelTop() < k) {
                    h = j.labelHeight / 2;
                    k = k + h;
                    h = b - h;
                    if (k > h) {
                        d = true;
                        j.targetY = h
                    } else j.targetY = k
                }
            }
            return d
        }, _distributeLabelsUpwards: function (a, b) {
            b = b.link.labelSpacingMin;
            for (var c = false, d = a.length - 1; d > 0; d--) {
                var e = a[d - 1].vars.link, g = a[d].vars.link;
                if (d === 1 && e.labelTop() < 0)c = true;
                var h = g.labelTop() - b;
                if (e.labelBottom() > h) {
                    g = e.labelHeight / 2;
                    h = h - g;
                    if (h < g) {
                        c = true;
                        e.targetY = g
                    } else e.targetY = h
                }
            }
            return c
        }, _distributeLabelsEvenly: function (a, b) {
            var c = 0;
            a.forEach(function (g) {
                c += g.vars.link.labelHeight
            });
            var d = b.clientSize.height - c;
            if (a.length > 1)d /= a.length - 1;
            var e = 0;
            a.forEach(function (g) {
                g = g.vars.link;
                var h = g.labelHeight / 2;
                e += h;
                g.targetY = e;
                e += h + d
            });
            return true
        }
    });
    f.type("pvc.visual.PieLinkLabelVar").add({
        labelTop: function () {
            return this.targetY -
                this.labelHeight / 2
        }, labelBottom: function () {
            return this.targetY + this.labelHeight / 2
        }
    });
    f.type("pvc.visual.PieCategoryScene", i.visual.Scene).add({
        sliceLabelMask: function () {
            return this.panel().valuesMask
        }, sliceLabel: function () {
            return this.format(this.sliceLabelMask())
        }, layoutI: function (a, b) {
            var c = this.vars.value, d = b + c.angle, e = (b + d) / 2;
            b = this.vars.link = new i.visual.PieLinkLabelVar;
            var g = a.link;
            c = i.text.justify(c.sliceLabel, g.maxTextWidth, a.labelFont);
            var h = c.length;
            b.labelLines = c;
            b.labelHeight = h * g.lineHeight;
            this.lineScenes = f.array.create(h, this);
            c = Math.cos(e);
            var j = Math.sin(e);
            e = (h = c >= 0) ? 1 : -1;
            b.labelAnchor = h ? "left" : "right";
            a = a.center;
            h = g.elbowRadius;
            j = a.y + h * j;
            var k = a.x + e * h;
            g = k + e * g.linkMargin;
            new i.visual.PieLinkLineScene(this, a.x + h * c, j);
            new i.visual.PieLinkLineScene(this, k, j);
            b.elbowY = j;
            b.targetY = j + 0;
            b.targetX = g;
            b.dir = e;
            return d
        }, layoutII: function (a) {
            var b = this.vars.link, c = b.targetY, d = b.targetX;
            a = a.link.handleWidth;
            a > 0 && new i.visual.PieLinkLineScene(this, d - b.dir * a, c);
            new i.visual.PieLinkLineScene(this,
                d, c);
            b.labelX = d;
            b.labelY = c - b.labelHeight / 2
        }
    });
    f.type("pvc.visual.PieLinkLineScene", i.visual.Scene).init(function (a, b, c, d) {
        this.base(a, {source: a.group, index: d});
        this.x = b;
        this.y = c
    }).add(t.Vector);
    f.type("pvc.PieChart", i.BaseChart).add({
        _animatable: true,
        _axisClassByType: {category: i.visual.Axis, angle: i.visual.AngleAxis},
        _axisCreateChartLevel: {category: 2, angle: 2},
        _axisSetScaleChartLevel: {category: 2, angle: 2},
        _axisCreationOrder: function () {
            var a = i.BaseChart.prototype._axisCreationOrder.slice();
            a.push("category",
                "angle");
            return a
        }(),
        pieChartPanel: null,
        _getColorRoleSpec: function () {
            return {isRequired: true, defaultSourceRole: "category", defaultDimension: "color*", requireIsDiscrete: true}
        },
        _initVisualRoles: function () {
            this.base();
            this._addVisualRole("category", {isRequired: true, defaultDimension: "category*", autoCreateDimension: true});
            this._addVisualRole("value", {
                isMeasure: true,
                isRequired: true,
                isPercent: true,
                requireSingleDimension: true,
                requireIsDiscrete: false,
                valueType: Number,
                defaultDimension: "value"
            })
        },
        _initPlotsCore: function () {
            new i.visual.PiePlot(this)
        },
        _createVisibleData: function (a, b) {
            return this.visualRoles.category.flatten(a, b)
        },
        _createContent: function (a) {
            this.base();
            if (this.compatVersion() <= 1) {
                var b = i.castNumber(this.options.innerGap) || 0.95;
                b = f.between(b, 0.1, 1);
                a.paddings = ((1 - b) * 100 / 2).toFixed(2) + "%"
            } else if (a.paddings == null)a.paddings = new L(0.025);
            this.pieChartPanel = new i.PiePanel(this, this.basePanel, this.plots.pie, f.create(a, {scenes: f.getPath(this.options, "pie.scenes")}))
        }
    });
    f.type("pvc.BarAbstractPanel", i.CategoricalAbstractPanel).add({
        pvBar: null,
        pvBarLabel: null, pvCategoryPanel: null, pvSecondLine: null, pvSecondDot: null, _creating: function () {
            var a = this.defaultLegendGroupScene();
            if (a && !a.hasRenderer()) {
                var b = a.colorAxis, c = b.option("LegendDrawLine");
                if (!c || b.option("LegendDrawMarker")) {
                    b = {drawMarker: true, markerShape: b.option("LegendShape"), drawRule: c, markerPvProto: new Q};
                    this.extend(b.markerPvProto, "", {constOnly: true});
                    a.renderer(new i.visual.legend.BulletItemDefaultRenderer(b))
                }
            }
        }, _createCore: function () {
            this.base();
            var a = this, b = a.chart, c = a.plot,
                d = !!a.stacked, e = a.isOrientationVertical(), g = a.visibleData({ignoreNulls: false}), h = a.visualRoles.series.flatten(a.partData(), {
                    visible: true,
                    isNull: b.options.ignoreNulls ? false : null
                });
            g = a._buildScene(g, h);
            var j = a.axes.ortho, k = a.axes.base, m = j.scale, l = m(0), n = j.sceneScale({sceneVarName: "value", nullToZero: false});
            j = k.sceneScale({sceneVarName: "category"});
            m = c.option("BarSizeRatio");
            var o = c.option("BarSizeMax"), p = c.option("BarStackedMargin"), q = k.scale.range();
            k = q.band;
            var r = q.step;
            q = q.margin;
            var s = e === d;
            if (d)h =
                k; else {
                h = h.childCount();
                h = !h ? 0 : h === 1 ? k : m * k / h
            }
            if (h > o)h = o;
            a.barWidth = h;
            a.barStepWidth = r;
            var u;
            if (a.compatVersion() <= 1)u = function (A) {
                return function (x) {
                    var y = Object.create(this.parent), w = Object.create(this);
                    w.parent = y;
                    var z = x.parent.childIndex(), v = x.childIndex();
                    if (d) {
                        y.index = z;
                        w.index = v
                    } else {
                        y.index = v;
                        w.index = z
                    }
                    return A.call(w, x.vars.value.rawValue)
                }
            };
            a.pvBarPanel = (new i.visual.Panel(a, a.pvPanel, {
                panelType: t.Layout.Band,
                extensionId: "panel"
            })).lock("layers", g.childNodes).lockMark("values", function (A) {
                return A.childNodes
            }).lockMark("orient",
                e ? "bottom-left" : "left-bottom").lockMark("layout", d ? "stacked" : "grouped").lockMark("verticalMode", a._barVerticalMode()).lockMark("yZero", l).pvMark.band.x(j).w(k).differentialControl(a._barDifferentialControl()).item.order(s ? "reverse" : null).h(function (A) {
                    A = n(A);
                    return A != null ? b.animate(0, A - l) : null
                }).w(h).horizontalRatio(m).verticalMargin(p).end;
            g = this.pvBar = (new i.visual.Bar(a, a.pvBarPanel.item, {
                extensionId: "",
                freePosition: true,
                wrapper: u
            })).lockDimensions().pvMark.antialias(h <= 4 || q < 2);
            c.option("OverflowMarkersVisible") &&
            this._addOverflowMarkers(u);
            if (c = i.visual.ValueLabel.maybeCreate(a, g, {wrapper: u}))a.pvBarLabel = c.override("calcBackgroundColor", function (A, x) {
                return this.pvMark.target.fillStyle() || this.base(A, x)
            }).pvMark.visible(function () {
                return this.scene.target[this.index][e ? "height" : "width"] >= 4
            })
        }, _barVerticalMode: function () {
            return null
        }, _barDifferentialControl: function () {
            return null
        }, _getV1Datum: function (a) {
            var b = a.datum;
            if (b) {
                b = Object.create(b);
                b.percent = a.vars.value.percent;
                b = b
            }
            return b
        }, _addOverflowMarkers: function (a) {
            var b =
                this.axes.ortho;
            if (b.option("FixedMax") != null)this.pvOverflowMarker = this._addOverflowMarker(false, b.scale, a);
            if (b.option("FixedMin") != null)this.pvUnderflowMarker = this._addOverflowMarker(true, b.scale, a)
        }, _addOverflowMarker: function (a, b, c) {
            var d = this.isOrientationVertical(), e = d ? "bottom" : "left", g = this.anchorOpposite(e), h = this.anchorOrthoLength(e), j = this.anchorLength(e), k = this._layoutInfo.paddings, m = a ? b.min - k[e] : b.max + k[g];
            b = a ? d ? 0 : Math.PI / 2 : d ? Math.PI : -Math.PI / 2;
            return (new i.visual.Dot(this, this.pvBar.anchor("center"),
                {
                    noSelect: true,
                    noHover: true,
                    noClick: true,
                    noDoubleClick: true,
                    noTooltip: true,
                    freePosition: true,
                    extensionId: a ? "underflowMarker" : "overflowMarker",
                    wrapper: c
                })).intercept("visible", function (l) {
                    var n = this.delegateExtension();
                    if (n !== undefined && !n)return false;
                    l = l.vars.value.value;
                    if (l == null)return false;
                    n = this.pvMark.scene.target[this.pvMark.index];
                    l = n[e] + (l > 0 ? n[h] : 0);
                    return a ? l < m : l > m
                }).lock(g, null).lock("shapeSize").pvMark.shape("triangle").shapeRadius(function () {
                    return Math.min(Math.sqrt(10), this.scene.target[this.index][j] /
                    2)
                }).shapeAngle(b).lineWidth(1.5).strokeStyle("red").fillStyle("white")[e](function () {
                return m + (a ? 1 : -1) * (this.shapeRadius() + 2)
            })
        }, renderInteractive: function () {
            this.pvPanel.render()
        }, _buildScene: function (a, b) {
            function c(k) {
                var m = new i.visual.Scene(d, {source: k}), l = k.key;
                m.vars.series = I.fromComplex(k);
                j.onNewScene(m, false);
                e.forEach(function (n) {
                    var o = a.child(n.key).child(l);
                    o = new i.visual.Scene(m, {source: o});
                    (o.vars.category = I.fromComplex(n)).group = n;
                    h.onNewScene(o, true);
                    j.onNewScene(o, true)
                })
            }

            var d =
                new i.visual.Scene(null, {
                    panel: this,
                    source: a
                }), e = a.childNodes, g = this.visualRoles, h = new i.visual.RoleVarHelper(d, g.value, {
                roleVar: "value",
                hasPercentSubVar: this.stacked
            }), j = new i.visual.RoleVarHelper(d, g.color, {roleVar: "color"});
            b.children().each(c);
            return d
        }
    });
    f.type("pvc.BarAbstract", i.CategoricalAbstract).init(function (a) {
        this.base(a);
        if (a = this.parent)this._valueRole = a._valueRole
    }).add({
        _initVisualRoles: function () {
            this.base();
            this._addVisualRole("value", {
                isMeasure: true, isRequired: true, isPercent: this.options.stacked,
                requireSingleDimension: true, requireIsDiscrete: false, valueType: Number, defaultDimension: "value"
            });
            this._valueRole = this.visualRoles.value
        }, _getCategoryRoleSpec: function () {
            var a = this.base();
            a.requireIsDiscrete = true;
            return a
        }, _initData: function () {
            this.base.apply(this, arguments);
            this._valueDim = this.data.dimensions(this._valueRole.firstDimensionName())
        }
    });
    f.type("pvc.BarPanel", i.BarAbstractPanel).add({});
    f.type("pvc.BarChart", i.BarAbstract).add({
        _animatable: true, _trendable: true, _allowV1SecondAxis: true, _initPlotsCore: function () {
            var a =
                this.options, b = (new i.visual.BarPlot(this)).option("Trend");
            if (a.plot2) {
                a = new i.visual.PointPlot(this, {
                    name: "plot2",
                    fixed: {DataPart: "1"},
                    defaults: {ColorAxis: 2, LinesVisible: true, DotsVisible: true}
                });
                b || (b = a.option("Trend"))
            }
            this._trendable = !!b;
            b && new i.visual.PointPlot(this, {
                name: "trend",
                fixed: {DataPart: "trend", TrendType: "none", ColorRole: "series", NullInterpolatioMode: "none"},
                defaults: {ColorAxis: 2, LinesVisible: true, DotsVisible: false}
            })
        }, _hasDataPartRole: function () {
            return true
        }, _createPlotPanels: function (a,
                                        b) {
            var c = this.plots, d = new i.BarPanel(this, a, c.bar, Object.create(b));
            this.barChartPanel = d;
            var e = c.plot2;
            if (e) {
                i.debug >= 3 && this._log("Creating Point panel.");
                e = new i.PointPanel(this, a, e, Object.create(b));
                d.pvSecondLine = e.pvLine;
                d.pvSecondDot = e.pvDot;
                e._applyV1BarSecondExtensions = true
            }
            if (c = c.trend) {
                i.debug >= 3 && this._log("Creating Trends Point panel.");
                new i.PointPanel(this, a, c, Object.create(b))
            }
        }
    });
    f.type("pvc.NormalizedBarPanel", i.BarAbstractPanel).add({
        _barVerticalMode: function () {
            return "expand"
        }
    });
    f.type("pvc.NormalizedBarChart", i.BarAbstract).add({
        _processOptionsCore: function (a) {
            a.stacked = true;
            this.base(a)
        }, _getContinuousVisibleExtentConstrained: function (a, b, c) {
            if (a.type === "ortho")return {min: 0, max: 100, minLocked: true, maxLocked: true};
            return this.base(a, b, c)
        }, _initPlotsCore: function () {
            new i.visual.NormalizedBarPlot(this)
        }, _createPlotPanels: function (a, b) {
            this.barChartPanel = new i.NormalizedBarPanel(this, a, this.plots.bar, Object.create(b))
        }
    });
    f.type("pvc.visual.legend.WaterfallBulletGroupScene",
        i.visual.legend.BulletGroupScene).init(function (a, b) {
            b = f.set(b, "clickMode", "none");
            this.base(a, b);
            this.createItem(b)
        }).add({
            renderer: function (a) {
                if (a != null)this._renderer = a;
                return this._renderer
            }, itemSceneType: function () {
                return i.visual.legend.WaterfallBulletItemScene
            }
        });
    f.type("pvc.visual.legend.WaterfallBulletItemScene", i.visual.legend.BulletItemScene).init(function (a, b) {
        this.base.apply(this, arguments);
        var c = i.visual.Interactive;
        this._ibits = c.Interactive | c.ShowsInteraction;
        this.color = f.get(b, "color");
        this.vars.value = new I(null, f.get(b, "label"))
    });
    f.type("pvc.WaterfallPanel", i.BarAbstractPanel).add({
        pvWaterfallLine: null, ruleData: null, _barDifferentialControl: function () {
            var a = this.chart._isFalling;
            return function (b) {
                if (a && !this.index)return 1;
                b = b.vars.category.group;
                if (b._isFlattenGroup && !b._isDegenerateFlattenGroup)return -2;
                return a ? -1 : 1
            }
        }, _creating: function () {
            var a = this._getLegendBulletRootScene();
            if (a)if ((a = a.firstChild) && !a.hasRenderer()) {
                var b = {drawRule: true, drawMarker: false, rulePvProto: new Q};
                this.extend(b.rulePvProto, "line", {constOnly: true});
                a.renderer(new i.visual.legend.BulletItemDefaultRenderer(b))
            }
        }, _createCore: function () {
            this.base();
            var a = this.chart, b = this.isOrientationVertical(), c = b ? "bottom" : "left", d = this.anchorOrtho(c), e = this._buildRuleScene(), g = a.axes.ortho.scale, h = g(0), j = a.axes.ortho.sceneScale({sceneVarName: "value"}), k = a.axes.base.sceneScale({sceneVarName: "category"}), m = a.axes.base.scale, l = this.barWidth / 2, n = this.barWidth, o = this.barStepWidth, p = a._isFalling, q = a._waterColor;
            if (this.plot.option("AreasVisible")) {
                var r =
                    t.Colors.category10(), s = this._buildWaterGroupScene(), u = g.range(), A = 0.04 * (u[1] - u[0]);
                this.pvWaterfallGroupPanel = (new i.visual.Panel(this, this.pvPanel, {extensionId: "group"})).lock("data", s.childNodes).pvMark.zOrder(-1).fillStyle(function () {
                    return r(0).alpha(0.15)
                })[d](function (x) {
                    return m(x.vars.category.valueLeft) - o / 2
                })[this.anchorLength(c)](function (x) {
                    x = x.vars.category;
                    return Math.abs(m(x.valueRight) - m(x.valueLeft)) + o
                })[c](function (x) {
                    x = g(x.vars.value.valueBottom) - A / 2;
                    return a.animate(h, x)
                })[this.anchorOrthoLength(c)](function (x) {
                    x =
                        x.vars.value;
                    x = g(x.valueTop) - g(x.valueBottom) + A;
                    return a.animate(0, x)
                })
            }
            this.pvBar.sign.override("baseColor", function (x, y) {
                var w = this.base(x, y);
                if (y === "fill")if (!x.vars.category.group._isFlattenGroup)return t.color(w).alpha(0.5);
                return w
            });
            this.pvWaterfallLine = (new i.visual.Rule(this, this.pvPanel, {
                extensionId: "line",
                noTooltip: false,
                noHover: false,
                noSelect: false,
                noClick: false,
                noDoubleClick: false
            })).lock("data", e.childNodes).optional("visible", function (x) {
                return p && !!x.previousSibling || !p && !!x.nextSibling
            }).optional(c,
                function (x) {
                    return h + a.animate(0, j(x) - h)
                }).optional(this.anchorLength(c), o + n).optional(d, p ? function (x) {
                    return k(x) - o - l
                } : function (x) {
                    return k(x) - l
                }).override("defaultColor", f.fun.constant(q)).pvMark.antialias(true).lineCap("butt");
            if (this.plot.option("TotalValuesVisible"))this.pvWaterfallLabel = (new i.visual.Label(this, this.pvWaterfallLine, {extensionId: "lineLabel"})).intercept("visible", function (x) {
                if (x.vars.category.group._isFlattenGroup)return false;
                return p || !!x.nextSibling
            }).pvMark[c](function (x) {
                return h +
                    a.animate(0, j(x) - h)
            })[this.anchorOrtho(c)](k).textAlign(b ? "center" : "left").textBaseline(function (x) {
                if (!b)return "middle";
                x = x.vars.direction;
                if (x == null)return "bottom";
                return !p === (x === "up") ? "bottom" : "top"
            }).textStyle(t.Color.names.darkgray.darker(2)).textMargin(5).text(function (x) {
                return x.vars.value.label
            })
        }, _buildRuleScene: function () {
            function a(h) {
                var j = h.group, k = new i.visual.Scene(c, {source: j});
                (k.vars.category = I.fromComplex(j)).group = j;
                h = h.offset;
                k.vars.value = new I(h, this.chart._valueDim.format(h))
            }

            function b(h, j) {
                var k = h.vars.value.value;
                h.vars.direction = !j || d === k ? null : e === d < k ? "up" : "down";
                d = k
            }

            var c = new i.visual.Scene(null, {panel: this, source: this.visibleData({ignoreNulls: false})}), d, e, g = this.chart._ruleInfos;
            if (g) {
                g.forEach(a, this);
                g = f.query(c.childNodes);
                (e = !this.chart._isFalling) || (g = g.reverse());
                g.each(b, this)
            }
            return c
        }, _buildWaterGroupScene: function () {
            function a(l, n) {
                var o = l.children().where(function (p) {
                    return p.key !== ""
                });
                if (o.next()) {
                    n && b(l, n);
                    n++;
                    do a(o.item, n); while (o.next())
                }
            }

            function b(l,
                       n) {
                var o = new i.visual.Scene(h, {source: l}), p = o.vars.category = I.fromComplex(l);
                p.group = l;
                p.level = n;
                n = o.vars.value = {};
                var q = j[l.absKey], r = q.offset, s = q.range;
                o = -s.min + s.max;
                var u;
                if (k) {
                    l = d(l);
                    u = j[l.absKey];
                    l = q.group.value;
                    q = u.group.value
                } else {
                    l = c(l);
                    u = j[l.absKey];
                    l = u.group.value;
                    q = q.group.value
                }
                r = r - s.max;
                p.valueLeft = l;
                p.valueRight = q;
                n.valueHeight = o;
                n.valueBottom = r;
                n.valueTop = r + o
            }

            function c(l) {
                var n = l.childNodes;
                return (n = n && n[0]) ? c(n) : l
            }

            function d(l) {
                var n = l.childNodes;
                return (n = n && n[n.length - 1]) ? d(n) :
                    l
            }

            var e = this.chart, g = e._catRole.select(e.partData(this.dataPartValue), {visible: true}), h = new i.visual.Scene(null, {
                panel: this,
                source: g
            }), j, k, m = e._ruleInfos;
            if (m) {
                j = f.query(m).object({
                    name: function (l) {
                        return l.group.absKey
                    }
                });
                k = e._isFalling;
                a(g, 0)
            }
            return h
        }
    });
    f.type("pvc.WaterfallChart", i.BarAbstract).init(function (a) {
        this.base(a);
        if (a = this.parent)this._isFalling = a._isFalling
    }).add({
        _animatable: true, _isFalling: true, _ruleInfos: null, _waterColor: t.color("#1f77b4").darker(), _processOptionsCore: function (a) {
            a.stacked =
                true;
            a.baseAxisComposite = false;
            this.base(a);
            a.plot2 = false
        }, _initPlotsCore: function () {
            var a = new i.visual.WaterfallPlot(this);
            this._isFalling = a.option("Direction") === "down";
            this._catRole.setTraversalMode(i.visual.TraversalMode[this._isFalling ? "FlattenDfsPre" : "FlattenDfsPost"]);
            this._catRole.setRootLabel(a.option("AllCategoryLabel"))
        }, _initLegendScenes: function (a) {
            var b = this.plots.water, c = this._getConstantExtension(i.makeExtensionAbsId("line", b.extensionPrefixes), "strokeStyle");
            if (c)this._waterColor =
                t.color(c);
            c = a._getBulletRootScene();
            new i.visual.legend.WaterfallBulletGroupScene(c, {
                extensionPrefix: i.buildIndexedId("", 1),
                label: b.option("TotalLineLabel"),
                color: this._waterColor
            });
            this.base(a)
        }, _reduceStackedCategoryValueExtent: function (a, b, c) {
            var d = a ? a.offset : 0, e = b.min + b.max;
            if (!a) {
                if (b) {
                    e = d + e;
                    this._ruleInfos = [{offset: e, group: c, range: b}];
                    return {min: b.min, max: b.max, offset: e}
                }
                return null
            }
            var g = this._isFalling;
            if (c._isFlattenGroup && !c._isDegenerateFlattenGroup) {
                e = -b.min;
                if (e > 0) {
                    e = d + e;
                    if (e > a.max)a.max =
                        e
                }
                e = -b.max;
                if (e < 0) {
                    e = d + e;
                    if (e < a.min)a.min = e
                }
            } else {
                e = a.offset = d + (g ? -1 : 1) * e;
                if (e > a.max)a.max = e; else if (e < a.min)a.min = e
            }
            this._ruleInfos.push({offset: g ? d : a.offset, group: c, range: b});
            return a
        }, _createPlotPanels: function (a, b) {
            this.wfChartPanel = new i.WaterfallPanel(this, a, this.plots.water, f.create(b, {waterfall: this.options.waterfall}))
        }
    });
    f.type("pvc.PointPanel", i.CategoricalAbstractPanel).init(function (a, b, c, d) {
        this.base(a, b, c, d);
        this.linesVisible = c.option("LinesVisible");
        this.dotsVisible = c.option("DotsVisible");
        this.areasVisible = c.option("AreasVisible");
        if (!this.linesVisible && !this.dotsVisible && !this.areasVisible) {
            this.linesVisible = true;
            c.option.specify({LinesVisible: true})
        }
        this.visualRoles.value = a.visualRole(c.option("OrthoRole"))
    }).add({
        pvLine: null, pvArea: null, pvDot: null, pvLabel: null, pvScatterPanel: null, _creating: function () {
            var a = this.defaultLegendGroupScene();
            if (a && !a.hasRenderer()) {
                var b = a.colorAxis, c = f.nullyTo(b.option("LegendDrawMarker", true), this.dotsVisible || this.areasVisible), d = !c || f.nullyTo(b.option("LegendDrawLine",
                        true), this.linesVisible && !this.areasVisible);
                if (c || d) {
                    var e = {drawMarker: c, drawRule: d};
                    if (c) {
                        b = b.option("LegendShape", true);
                        if (this.dotsVisible) {
                            b || (b = "circle");
                            e.markerPvProto = (new t.Dot).lineWidth(1.5, i.extensionTag).shapeSize(12, i.extensionTag)
                        } else e.markerPvProto = new Q;
                        e.markerShape = b;
                        this._applyV1BarSecondExtensions && this.chart.extend(e.markerPvProto, "barSecondDot", {constOnly: true});
                        this.extend(e.markerPvProto, "dot", {constOnly: true})
                    }
                    if (d) {
                        e.rulePvProto = (new t.Line).lineWidth(1.5, i.extensionTag);
                        this._applyV1BarSecondExtensions && this.chart.extend(e.rulePvProto, "barSecondLine", {constOnly: true});
                        this.extend(e.rulePvProto, "line", {constOnly: true})
                    }
                    a.renderer(new i.visual.legend.BulletItemDefaultRenderer(e))
                }
            }
        }, _createCore: function () {
            this.base();
            var a = this, b = this.chart, c = this.stacked, d = this.dotsVisible, e = this.areasVisible, g = this.linesVisible, h = this.isOrientationVertical() ? "bottom" : "left", j = this.axes.base.role.grouping.isDiscrete(), k = this._buildScene(this.visibleData({ignoreNulls: false}), j);
            e ?
                this.pvPanel.zOrder(-7) : this.pvPanel.zOrder(1);
            this.pvScatterPanel = (new i.visual.Panel(this, this.pvPanel, {extensionId: "panel"})).lock("data", k.childNodes).pvMark;
            var m = e && g && !c ? 0.5 : null, l;
            if (this.compatVersion() <= 1)l = c ? function (s) {
                return function (u) {
                    return s.call(this, u.vars.value.rawValue)
                }
            } : function (s) {
                return function (u) {
                    var A = {category: u.vars.category.rawValue, value: u.vars.value.rawValue}, x = Object.create(this);
                    x.index = u.dataIndex;
                    return s.call(x, A)
                }
            };
            var n = j && c ? function (s) {
                return !s.isNull || s.isIntermediate
            } :
                function (s) {
                    return !s.isNull
                };
            k = b.selectableByFocusWindow();
            this.pvArea = (new i.visual.Area(this, this.pvScatterPanel, {
                extensionId: "area",
                noTooltip: false,
                wrapper: l,
                noSelect: k,
                noRubberSelect: true,
                showsSelection: !k
            })).lockMark("data", function (s) {
                return s.childNodes
            }).lockMark("visible", n).override("x", function (s) {
                return s.basePosition
            }).override("y", function (s) {
                return s.orthoPosition
            }).override("dy", function (s) {
                return b.animate(0, s.orthoLength)
            }).override("color", function (s, u) {
                return e ? this.base(s, u) :
                    null
            }).override("baseColor", function (s, u) {
                s = this.base(s, u);
                if (!this._finished && s && m != null)s = s.alpha(m);
                return s
            }).override("dimColor", function (s, u) {
                return c ? i.toGrayScale(s, 1, null, null).brighter() : this.base(s, u)
            }).lock("events", e ? "painted" : "none").pvMark;
            var o = d && !g && !e, p = c && e, q = ["line"];
            this._applyV1BarSecondExtensions && q.push({abs: "barSecondLine"});
            n = !o && n;
            o = e && !g;
            this.pvLine = (new i.visual.Line(this, this.pvArea.anchor(this.anchorOpposite(h)), {
                extensionId: q, freePosition: true, wrapper: l, noTooltip: o,
                noDoubleClick: o, noClick: o, noHover: o, noSelect: o || k, showsSelection: !k
            })).lockMark("visible", n).override("defaultColor", function (s, u) {
                    s = this.base(s, u);
                    if (!this._finished && p && s)s = s.darker(0.6);
                    return s
                }).override("normalColor", function (s, u) {
                    return g ? u : null
                }).override("interactiveColor", function (s, u, A) {
                    if (!g && !this.mayShowAnySelected(s) && !this.mayShowActive(s))return null;
                    return this.base(s, u, A)
                }).override("baseStrokeWidth", function (s) {
                    var u;
                    if (g)u = this.base(s);
                    return u == null ? 1.5 : u
                }).intercept("strokeDasharray",
                function (s) {
                    var u = this.delegateExtension();
                    if (u === undefined) {
                        u = s.isInterpolated;
                        if (!u) {
                            u = (u = s.nextSibling) && u.isIntermediate && u.isInterpolated;
                            if (!u)u = (u = s.previousSibling) && s.isIntermediate && u.isInterpolated
                        }
                        u = u ? ". " : null
                    }
                    return u
                }).pvMark;
            var r = !(e && j && c);
            q = ["dot"];
            this._applyV1BarSecondExtensions && q.push({abs: "barSecondDot"});
            this.pvDot = (new i.visual.Dot(this, this.pvLine, {extensionId: q, freePosition: true, wrapper: l})).intercept("visible", function (s) {
                return !s.isNull && !s.isIntermediate && this.delegateExtension(true)
            }).override("color",
                function (s, u) {
                    if (!d)if (!(s.isActive || !r && s.isSingle || r && s.isAlone))return i.invisibleFill;
                    var A = this.base(s, u);
                    if (s.isInterpolated && u === "fill")return A && t.color(A).brighter(0.5);
                    return A
                }).override("defaultColor", function (s, u) {
                    s = this.base(s, u);
                    if (!this._finished && p && s)s = s.darker(0.6);
                    return s
                }).override("baseSize", function (s) {
                    if (!d)if ((s.isActive || !r && s.isSingle || r && s.isAlone) && !s.isActive) {
                        s = Math.max(a.pvLine.lineWidth(), 0.2) / 2;
                        return f.sqr(s)
                    }
                    if (s.isInterpolated)return 0.8 * this.base(s);
                    return this.base(s)
                }).pvMark;
            if (h = i.visual.ValueLabel.maybeCreate(this, this.pvDot, {wrapper: l}))this.pvLabel = h.pvMark
        }, renderInteractive: function () {
            this.pvScatterPanel.render()
        }, _buildScene: function (a, b) {
            function c(w) {
                for (var z = [], v = w.childNodes, B, G = 0, K = null, S = 0, J = 0, X = v.length; S < X; S++, J++) {
                    var U = v[J], C = S * 2;
                    z[C] = U;
                    d.call(this, B, U, y && y[C]);
                    if (U.isAlone && !K)K = U;
                    U.isNull || G++;
                    if (B)if (B = e.call(this, w, B, U, J, y && y[C - 1])) {
                        z[C - 1] = B;
                        J++
                    }
                    B = U
                }
                if (G === 1 && K && X === 1)K.isSingle = true;
                if (n)y = z
            }

            function d(w, z, v) {
                var B = z.vars.value.accValue;
                if (v) {
                    if (z.isNull && !b)B = u; else B += v.vars.value.accValue;
                    z.vars.value.accValue = B
                }
                z.basePosition = x(z);
                z.orthoPosition = A;
                z.orthoLength = s(B) - A;
                if (w = (!w || w.isNull) && !z.isNull) {
                    w = z.nextSibling;
                    w = !w || w.isNull
                }
                z.isAlone = w;
                z.isSingle = false
            }

            function e(w, z, v, B, G) {
                var K = z.isNull || v.isNull;
                if (K && !this.areasVisible)return null;
                var S, J;
                if (K) {
                    if (G && b) {
                        G = G.vars.value;
                        S = G.accValue;
                        G = G[l.name]
                    } else G = S = u;
                    J = n && b ? v.basePosition - x.range().step / 2 : z.isNull ? v.basePosition : z.basePosition
                } else {
                    S = z.vars.value;
                    J = v.vars.value;
                    G = (J.value + S.value) /
                    2;
                    S = (J.accValue + S.accValue) / 2;
                    J = (v.basePosition + z.basePosition) / 2
                }
                w = new i.visual.Scene(w, {index: B, source: v.source});
                w.dataIndex = v.dataIndex;
                w.vars.category = v.vars.category;
                B = new I(G, r.format(G), G);
                B.accValue = S;
                w.vars.value = B;
                w.ownerScene = v;
                w.isInterpolated = v.isInterpolated;
                w.isIntermediate = true;
                w.isSingle = false;
                w.isNull = K;
                w.isAlone = K && v.isNull && z.isNull;
                w.basePosition = J;
                w.orthoPosition = A;
                w.orthoLength = s(S) - A;
                p.onNewScene(w, true);
                return w
            }

            function g(w) {
                for (var z = w.childNodes, v = z.length, B, G; v && (B = z[0]).isNull;) {
                    if ((G =
                            B.nextSibling) && !G.isNull)break;
                    w.removeAt(0);
                    v--
                }
                for (; v && (B = z[v - 1]).isNull;) {
                    if ((G = B.previousSibling) && !G.isNull)break;
                    w.removeAt(v - 1);
                    v--
                }
            }

            var h = new i.visual.Scene(null, {
                panel: this,
                source: a
            }), j = a.childNodes, k = this.chart, m = this.visualRoles.series, l = this.visualRoles.value, n = this.stacked, o = new i.visual.RoleVarHelper(h, l, {
                roleVar: "value",
                hasPercentSubVar: n
            }), p = new i.visual.RoleVarHelper(h, this.visualRoles.color, {roleVar: "color"}), q = l.firstDimensionName(), r = a.owner.dimensions(q);
            k = m.isBound() ? m.flatten(this.partData(),
                {visible: true, isNull: k.options.ignoreNulls ? false : null}) : null;
            var s = this.axes.ortho.scale, u = f.scope(function () {
                var w = s.domain(), z = w[0];
                w = w[1];
                if (z * w >= 0)return z >= 0 ? z : w;
                return 0
            }), A = s(u), x = this.axes.base.sceneScale({sceneVarName: "category"});
            (k ? k.children() : f.query([null])).each(function (w) {
                var z = new i.visual.Scene(h, {source: w || a});
                z.vars.series = I.fromComplex(w);
                p.onNewScene(z, false);
                j.forEach(function (v, B) {
                    var G = v;
                    if (w)G = G.child(w.key);
                    var K = new i.visual.Scene(z, {source: G});
                    K.dataIndex = B;
                    K.vars.category =
                        I.fromComplex(v);
                    o.onNewScene(K, true);
                    B = K.vars.value;
                    v = B.value;
                    B.accValue = v != null ? v : u;
                    p.onNewScene(K, true);
                    G = G != null && G.datums().prop("isInterpolated").any(f.truthy);
                    K.isInterpolated = G;
                    K.isNull = v == null;
                    K.isIntermediate = false
                }, this)
            }, this);
            k = h.children().reverse().array();
            var y;
            k.forEach(c, this);
            k.forEach(g, this);
            return h
        }
    });
    f.type("pvc.PointAbstract", i.CategoricalAbstract).add({
        _animatable: true, _trendable: true, _processOptionsCore: function (a) {
            a.panelSizeRatio = 1;
            this.base(a)
        }, _hasDataPartRole: function () {
            return true
        },
        _initVisualRoles: function () {
            this.base();
            this._addVisualRole("value", {
                isMeasure: true,
                isRequired: true,
                isPercent: this.options.stacked,
                requireSingleDimension: true,
                requireIsDiscrete: false,
                valueType: Number,
                defaultDimension: "value"
            })
        }, _initPlotsCore: function () {
            var a = this.options, b = this._createPointPlot().option("Trend");
            if (a.plot2) {
                a = new i.visual.PointPlot(this, {
                    name: "plot2",
                    fixed: {DataPart: "1"},
                    defaults: {ColorAxis: 2, LinesVisible: true, DotsVisible: true}
                });
                b || (b = a.option("Trend"))
            }
            this._trendable = !!b;
            b && new i.visual.PointPlot(this,
                {
                    name: "trend",
                    fixed: {DataPart: "trend", TrendType: "none", ColorRole: "series", NullInterpolatioMode: "none"},
                    defaults: {ColorAxis: 2, LinesVisible: true, DotsVisible: false}
                })
        }, _initAxes: function (a) {
            this.base(a);
            (a = this.axesByType.base) && a.forEach(function (b) {
                b.scaleType === "discrete" || b.option.defaults({Offset: 0.01})
            });
            (a = this.axesByType.ortho) && a.forEach(function (b) {
                b.option.defaults({Offset: 0.04})
            })
        }, _createPlotPanels: function (a, b) {
            var c = this.plots;
            this.scatterChartPanel = new i.PointPanel(this, a, c.point, Object.create(b));
            var d = c.plot2;
            if (d) {
                i.debug >= 3 && this._log("Creating second Point panel.");
                new i.PointPanel(this, a, d, Object.create(b))
            }
            if (c = c.trend) {
                i.debug >= 3 && this._log("Creating Trends Point panel.");
                new i.PointPanel(this, a, c, Object.create(b))
            }
        }, defaults: {tooltipOffset: 10}
    });
    f.type("pvc.DotChart", i.PointAbstract).add({
        _createPointPlot: function () {
            return new i.visual.PointPlot(this, {fixed: {DotsVisible: true}})
        }
    });
    f.type("pvc.LineChart", i.PointAbstract).add({
        _createPointPlot: function () {
            return new i.visual.PointPlot(this,
                {fixed: {LinesVisible: true}})
        }
    });
    f.type("pvc.AreaChart", i.PointAbstract).add({
        _createPointPlot: function () {
            return new i.visual.PointPlot(this, {fixed: {AreasVisible: true}})
        }
    });
    i.mStackedLineChart = f.type("pvc.StackedLineChart", i.PointAbstract).add({
        _createPointPlot: function () {
            return new i.visual.PointPlot(this, {fixed: {LinesVisible: true, Stacked: true}})
        }
    });
    f.type("pvc.StackedDotChart", i.PointAbstract).add({
        _createPointPlot: function () {
            return new i.visual.PointPlot(this, {fixed: {DotsVisible: true, Stacked: true}})
        }
    });
    i.mStackedAreaChart = f.type("pvc.StackedAreaChart", i.PointAbstract).add({
        _createPointPlot: function () {
            return new i.visual.PointPlot(this, {fixed: {AreasVisible: true, Stacked: true}, defaults: {LinesVisible: true}})
        }
    });
    f.type("pvc.HeatGridPanel", i.CategoricalAbstractPanel).init(function (a, b, c, d) {
        this.base(a, b, c, d);
        this.axes.size = a._getAxis("size", c.option("SizeAxis") - 1);
        b = this.visualRoles;
        d = c.option("SizeRole");
        b.size = a.visualRole(d);
        this.useShapes = c.option("UseShapes");
        this.shape = c.option("Shape");
        this.nullShape =
            c.option("NullShape")
    }).add({
        defaultBorder: 1, nullBorder: 2, selectedBorder: 2, _createCore: function () {
            var a = this;
            a.base();
            var b = a._calcCellSize(), c = a.isOrientationVertical() ? "bottom" : "left", d = i.BasePanel.relativeAnchor[c], e = i.BasePanel.parallelLength[c], g = i.BasePanel.orthogonalLength[c], h = a.visualRoles.series.flatten(a.partData(), {
                visible: true,
                isNull: a.chart.options.ignoreNulls ? false : null
            }), j = a._buildScene(a.visibleData({ignoreNulls: false}), h, b);
            h = j.isColorBound;
            var k = j.isSizeBound, m = a._buildSignsWrapper(j),
                l = a.compatVersion() <= 1, n = this.axes.base.scale, o = this.axes.ortho.scale, p = n.range().step, q = o.range().step, r = p / 2, s = q / 2;
            c = (new i.visual.Panel(a, a.pvPanel)).pvMark.data(j.childNodes)[c](function (u) {
                return o(u.vars.series.value) - s
            })[g](q);
            g = ["panel"];
            l && g.push("");
            g = {extensionId: g, wrapper: m};
            a.useShapes || f.copy(g, {noSelect: false, noHover: false, noClick: false, noDoubleClick: false, freeColor: false, noTooltip: l});
            a.pvHeatGrid = (new i.visual.Panel(a, c, g)).pvMark.lock("data", function (u) {
                return u.childNodes
            }).lock(d,
                function (u) {
                    return n(u.vars.category.value) - r
                }).lock(e, p).antialias(false);
            a.shapes = a.useShapes ? a._createShapesHeatMap(b, m, h, k) : a._createNoShapesHeatMap(h);
            if (a.valuesVisible && !a.valuesMask)a.valuesMask = a._getDefaultValuesMask(h, k);
            if (b = i.visual.ValueLabel.maybeCreate(a, a.pvHeatGrid, {wrapper: m}))a.pvHeatGridLabel = b.pvMark
        }, _calcCellSize: function () {
            var a = this.axes.x.scale, b = this.axes.y.scale;
            a = (a.max - a.min) / a.domain().length;
            b = (b.max - b.min) / b.domain().length;
            if (!this.isOrientationVertical()) {
                var c =
                    a;
                a = b;
                b = c
            }
            return {width: a, height: b}
        }, _buildSignsWrapper: function (a) {
            if (this.compatVersion() > 1)return null;
            var b = f.query(a.childNodes).object({
                name: function (c) {
                    return "" + c.vars.series.value
                }, value: function (c) {
                    return f.query(c.childNodes).object({
                        name: function (d) {
                            return "" + d.vars.category.value
                        }, value: function (d) {
                            return (d = d.vars.color) ? "" + d.value : null
                        }
                    })
                }
            });
            return function (c) {
                return function (d) {
                    var e = b[d.vars.series.value], g = d.vars.category.rawValue, h = Object.create(this.parent), j = Object.create(this);
                    j.parent =
                        h;
                    var k = d.childIndex();
                    d = d.parent.childIndex();
                    h.index = k;
                    j.index = d;
                    return c.call(j, e, g)
                }
            }
        }, _getDefaultValuesMask: function (a, b) {
            var c = this.visualRoles;
            if (a = a ? "color" : b ? "size" : null)return "{#" + c[a].firstDimensionName() + "}"
        }, _createNoShapesHeatMap: function (a) {
            var b = this._buildGetBaseFillColor(a);
            return this.pvHeatGrid.sign.override("defaultColor", function (c, d) {
                if (d === "stroke")return null;
                return b.call(this.pvMark, c)
            }).override("interactiveColor", function (c, d, e) {
                if (c.isActive)return d.alpha(0.6);
                if (c.anySelected() && !c.isSelected())return this.dimColor(d, e);
                return this.base(c, d, e)
            }).override("dimColor", function (c) {
                return i.toGrayScale(c, 0.6)
            }).pvMark.lineWidth(1.5)
        }, _buildGetBaseFillColor: function (a) {
            var b = this.axes.color;
            return a ? b.sceneScale({sceneVarName: "color"}) : f.fun.constant(b.option("Unbound"))
        }, _createShapesHeatMap: function (a, b, c, d) {
            var e = this;
            a = e._calcDotAreaRange(a);
            d && e.axes.size.setScaleRange(a);
            b = {
                extensionId: "dot", freePosition: true, activeSeriesAware: false, wrapper: b, tooltipArgs: e._buildShapesTooltipArgs(c,
                    d)
            };
            e = (new i.visual.DotSizeColor(e, e.pvHeatGrid, b)).override("dimColor", function (g) {
                return i.toGrayScale(g, 0.6)
            }).pvMark.lock("shapeAngle");
            d || e.sign.override("defaultSize", f.fun.constant(a.max));
            return e
        }, _calcDotAreaRange: function (a) {
            a = Math.min(a.width, a.height) / 2;
            if (this.shape === "diamond")a /= Math.SQRT2;
            a -= 2;
            a = f.sqr(a);
            var b = 12, c = a - b;
            if (c <= 1) {
                a = Math.max(a, 2);
                b = 1;
                c = a - b;
                i.debug >= 2 && this._warn("Using rescue mode dot area calculation due to insufficient space.")
            }
            return {min: b, max: a, span: c}
        }, _buildShapesTooltipArgs: function (a,
                                              b) {
            var c = this.chart;
            if (this.compatVersion() <= 1 && this.showsTooltip()) {
                var d = c.options, e = d.customTooltip;
                e || (e = function (j, k, m) {
                    if (m != null && m[0] !== undefined)return m.join(", ");
                    return m
                });
                c = this.visualRoles;
                var g = c.series.grouping.dimensionNames(), h = c.category.grouping.dimensionNames();
                return {
                    buildTooltip: d.isMultiValued ? function (j) {
                        var k = j.scene.group;
                        if (!k)return "";
                        var m = i.data.Complex.values(k, g);
                        k = i.data.Complex.values(k, h);
                        var l = [];
                        j = j.scene.vars;
                        if (b)l[d.sizeValIdx || 0] = j.size.value;
                        if (a)l[d.colorValIdx ||
                        0] = j.color.value;
                        return e.call(d, m, k, l)
                    } : function (j) {
                        j = j.scene.vars;
                        var k = j[a ? "color" : "size"];
                        return e.call(d, j.series.rawValue, j.category.rawValue, k ? k.value : null)
                    }
                }
            }
        }, renderInteractive: function () {
            this.pvPanel.render()
        }, _buildScene: function (a, b, c) {
            function d(n) {
                var o = new i.visual.Scene(h, {source: n});
                o.vars.series = I.fromComplex(n);
                j.forEach(function (p) {
                    e.call(g, o, p, n)
                })
            }

            function e(n, o, p) {
                p = a.child(o.key).child(p.key);
                n = new i.visual.Scene(n, {source: p});
                n.vars.category = I.fromComplex(o);
                m.onNewScene(n,
                    true);
                l.onNewScene(n, true)
            }

            var g = this, h = new i.visual.Scene(null, {
                panel: g,
                source: a
            }), j = a.childNodes, k = g.visualRoles, m = new i.visual.RoleVarHelper(h, k.color, {roleVar: "color"}), l = new i.visual.RoleVarHelper(h, k.size, {roleVar: "size"});
            h.cellSize = c;
            b.children().each(d);
            return h
        }
    });
    f.type("pvc.HeatGridChart", i.CategoricalAbstract).add({
        _allowColorPerCategory: true,
        _interpolatable: false,
        _axisCreateIfUnbound: {color: true},
        _processOptionsCore: function (a) {
            this.base(a);
            f.set(a, "legend", false, "panelSizeRatio", 1);
            a = "value";
            var b = "value2";
            if (this.compatVersion() <= 1) {
                switch (this.options.colorValIdx) {
                    case 0:
                        a = "value";
                        break;
                    case 1:
                        a = "value2";
                        break;
                    default:
                        a = "value"
                }
                switch (this.options.sizeValIdx) {
                    case 0:
                        b = "value";
                        break;
                    case 1:
                        b = "value2";
                        break;
                    default:
                        b = "value"
                }
            }
            this._colorDimName = a;
            this._sizeDimName = b
        },
        _getCategoryRoleSpec: function () {
            var a = this.base();
            a.requireIsDiscrete = true;
            return a
        },
        _getColorRoleSpec: function () {
            return {isMeasure: true, requireSingleDimension: true, requireIsDiscrete: false, valueType: Number, defaultDimension: this._colorDimName}
        },
        _initVisualRoles: function () {
            this.base();
            this._addVisualRole("size", {
                isMeasure: true,
                requireSingleDimension: true,
                requireIsDiscrete: false,
                valueType: Number,
                defaultDimension: this._sizeDimName
            })
        },
        _initPlotsCore: function () {
            new i.visual.HeatGridPlot(this)
        },
        _createPlotPanels: function (a, b) {
            this.heatGridChartPanel = new i.HeatGridPanel(this, a, this.plots.heatGrid, Object.create(b))
        },
        defaults: {colorValIdx: 0, sizeValIdx: 1, measuresIndexes: [2], axisOffset: 0, plotFrameVisible: false, colorNormByCategory: true, numSD: 2}
    });
    f.type("pvc.MetricXYAbstract",
        i.CartesianAbstract).add({
            _processOptionsCore: function (a) {
                this.base(a);
                a.panelSizeRatio = 1
            }, _initVisualRoles: function () {
                this.base();
                this._addVisualRole("x", {
                    isMeasure: true,
                    isRequired: true,
                    requireSingleDimension: true,
                    requireIsDiscrete: false,
                    defaultDimension: "x",
                    dimensionDefaults: {valueType: this.options.timeSeries ? Date : Number}
                });
                this._addVisualRole("y", {
                    isMeasure: true,
                    isRequired: true,
                    requireSingleDimension: true,
                    requireIsDiscrete: false,
                    defaultDimension: "y",
                    dimensionDefaults: {valueType: Number}
                })
            }, _generateTrendsDataCell: function (a,
                                                  b, c) {
                function d(q) {
                    var r = function (y) {
                        return y.atoms[m].value
                    }, s = function (y) {
                        return y.atoms[l].value
                    }, u = q.datums().sort(null, r).array(), A = f.create(j, {rows: f.query(u), x: r, y: s}), x = k.model(A);
                    x && u.forEach(function (y, w) {
                        var z = r(y);
                        if (z) {
                            y = x.sample(z, s(y), w);
                            if (y != null) {
                                z = f.set(Object.create(q.atoms), m, z, l, y, p, o);
                                a.push(new i.data.TrendDatum(n.owner, z, j))
                            }
                        }
                    })
                }

                var e = this._serRole, g = this.visualRoles.x, h = b.role, j = b.trend, k = j.info;
                this._warnSingleContinuousValueRole(h);
                var m = g.firstDimensionName(), l = h.firstDimensionName(),
                    n = this.visibleData(b.dataPartValue, {baseData: c}), o = this._getTrendDataPartAtom(), p = o.dimension.name;
                (e.isBound() ? n.children() : f.query([n])).each(d, this)
            }
        });
    f.type("pvc.data.MetricPointChartTranslationOper").add({
        _meaLayoutRoles: ["x", "y", "color", "size"], configureType: function () {
            var a = [], b = [];
            this.collectFreeDiscreteAndConstinuousIndexes(b, a);
            var c, d = [];
            c = a.length;
            if (c > 0) {
                for (var e = this._meaLayoutRoles.length, g = 0; g < e && d.length < c;) {
                    this._getUnboundRoleDefaultDimNames(this._meaLayoutRoles[g], 1, d);
                    g++
                }
                c =
                    d.length;
                if (c > 0) {
                    a.length = c;
                    this.defReader({names: d, indexes: a})
                }
            }
            c = b.length;
            if (c > 0) {
                d.length = 0;
                this._getUnboundRoleDefaultDimNames("series", c, d);
                c = d.length;
                if (c > 0) {
                    b.length = c;
                    this.defReader({names: d, indexes: b})
                }
            }
        }
    });
    f.type("pvc.MetricPointPanel", i.CartesianAbstractPanel).init(function (a, b, c, d) {
        this.base(a, b, c, d);
        this.axes.size = a._getAxis("size", (c.option("SizeAxis") || 0) - 1);
        b = c.option("SizeRole");
        this.visualRoles.size = b ? a.visualRole(b) : null;
        this.linesVisible = c.option("LinesVisible");
        this.dotsVisible =
            c.option("DotsVisible");
        if (!this.linesVisible && !this.dotsVisible) {
            this.linesVisible = true;
            c.option.specify({LinesVisible: true})
        }
        if (!this.offsetPaddings)this.offsetPaddings = new E(0.01)
    }).add({
        sizeAxisRatio: 0.2,
        sizeAxisRatioTo: "minWidthHeight",
        autoPaddingByDotSize: true,
        _v1DimRoleName: {category: "x", value: "y"},
        _creating: function () {
            var a = this.defaultLegendGroupScene();
            if (a && !a.hasRenderer()) {
                var b = a.colorAxis, c = f.nullyTo(b.option("LegendDrawMarker", true), this.dotsVisible), d = f.nullyTo(b.option("LegendDrawLine",
                    true), this.linesVisible);
                if (c || d) {
                    var e = {drawMarker: c, drawRule: d};
                    if (c) {
                        e.markerShape = b.option("LegendShape", true) || "circle";
                        e.markerPvProto = (new t.Dot).lineWidth(1.5, i.extensionTag).shapeSize(12, i.extensionTag);
                        this.extend(e.markerPvProto, "dot", {constOnly: true})
                    }
                    if (d) {
                        e.rulePvProto = (new t.Line).lineWidth(1.5, i.extensionTag);
                        this.extend(e.rulePvProto, "line", {constOnly: true})
                    }
                    a.renderer(new i.visual.legend.BulletItemDefaultRenderer(e))
                }
            }
        },
        _getRootScene: function () {
            return f.lazy(this, "_rootScene", this._buildScene,
                this)
        },
        _calcLayout: function (a) {
            var b = this._getRootScene();
            b.isSizeBound && this.axes.size.setScaleRange(this._calcDotAreaRange(a));
            this._calcAxesPadding(a, b)
        },
        _getDotDiameterRefLength: function (a) {
            var b = a.clientSize, c = a.paddings;
            switch (this.sizeAxisRatioTo) {
                case "minWidthHeight":
                    return Math.min(b.width + c.width, b.height + c.height);
                case "width":
                    return b.width + c.width;
                case "height":
                    return b.height + c.height
            }
            i.debug >= 2 && this._log(f.format("Invalid option 'sizeAxisRatioTo' value. Assuming 'minWidthHeight'.",
                [this.sizeAxisRatioTo]));
            this.sizeRatioTo = "minWidthHeight";
            return this._getDotDiameterRefLength(a)
        },
        _calcDotRadiusRange: function (a) {
            a = this.sizeAxisRatio / 2 * this._getDotDiameterRefLength(a);
            return {min: Math.sqrt(12), max: a}
        },
        _calcDotAreaRange: function (a) {
            var b = this._calcDotRadiusRange(a);
            if (this.shape === "diamond") {
                b.max /= Math.SQRT2;
                b.min /= Math.SQRT2
            }
            a = f.sqr(b.max);
            b = f.sqr(b.min);
            var c = a - b;
            if (c <= 1) {
                a = Math.max(a, 2);
                b = 1;
                c = a - b;
                i.debug >= 3 && this._log("Using rescue mode dot area calculation due to insufficient space.")
            }
            return {
                min: b,
                max: a, span: c
            }
        },
        _calcAxesPadding: function (a, b) {
            var c;
            if (this.autoPaddingByDotSize) {
                var d = this.axes, e = a.clientSize, g = a.paddings;
                c = {};
                d.x.setScaleRange(e.width);
                d.y.setScaleRange(e.height);
                var h = this.isOrientationVertical(), j = d.x.sceneScale({sceneVarName: h ? "x" : "y"}), k = d.y.sceneScale({sceneVarName: h ? "y" : "x"}), m = d.x.scale.max, l = d.y.scale.max, n = b.isSizeBound, o = n ? d.size.scale : null;
                if (!o) {
                    d = f.number.as(this._getExtension("dot", "shapeRadius"), 0);
                    if (d <= 0) {
                        d = f.number.as(this._getExtension("dot", "shapeSize"),
                            0);
                        if (d <= 0)d = 12
                    } else d = f.sqr(d);
                    o = f.fun.constant(d)
                }
                c = {};
                var p;
                if (this.offsetPaddings) {
                    p = {};
                    E.names.forEach(function (r) {
                        var s = i.BasePanel.orthogonalLength[r];
                        p[r] = (this.offsetPaddings[r] || 0) * (e[s] + g[s])
                    }, this)
                }
                var q = function (r, s) {
                    if (p)s += p[r] || 0;
                    if (s < 0)s = 0;
                    var u = c[r];
                    if (u == null || s > u)c[r] = s
                };
                b.children().selectMany(function (r) {
                    return r.childNodes
                }).each(function (r) {
                    var s = j(r), u = k(r);
                    r = Math.sqrt(o(n ? r.vars.size.value : 0));
                    q("left", r - s);
                    q("bottom", r - u);
                    q("right", s + r - m);
                    q("top", u + r - l)
                })
            } else c = this._calcRequestPaddings(a);
            a.requestPaddings = c
        },
        _createCore: function () {
            var a = this;
            a.base();
            var b = a.chart, c = a._getRootScene(), d = a._buildSignsWrapper(), e = a.compatVersion() <= 1;
            this._finalizeScene(c);
            a.pvPanel.zOrder(1);
            this.pvScatterPanel = (new i.visual.Panel(a, a.pvPanel, {extensionId: "panel"})).lock("data", c.childNodes).pvMark;
            b = b.selectableByFocusWindow();
            var g = c.isColorBound && this.visualRoles.color.isDiscrete();
            b = (new i.visual.Line(a, a.pvScatterPanel, {
                extensionId: "line",
                wrapper: d,
                noTooltip: false,
                noSelect: b,
                showsSelection: !b
            })).lockMark("data",
                function (h) {
                    return h.childNodes
                }).intercept("visible", function (h) {
                    if (!a.linesVisible)return false;
                    var j = this.delegateExtension();
                    if (j == null)j = !h.isNull && (!c.isSizeBound && !c.isColorBound || c.isSizeBound && h.vars.size.value != null || c.isColorBound && (g || h.vars.color.value != null));
                    return j
                }).override("x", function (h) {
                    return h.basePosition
                }).override("y", function (h) {
                    return h.orthoPosition
                });
            a.pvLine = b.pvMark;
            b = (new i.visual.DotSizeColor(a, a.pvLine, {extensionId: "dot", wrapper: d, activeSeriesAware: a.linesVisible})).override("x",
                function (h) {
                    return h.basePosition
                }).override("y", function (h) {
                    return h.orthoPosition
                }).override("color", function (h, j) {
                    if (!a.dotsVisible && !h.isActive && !h.isSingle)return i.invisibleFill;
                    return this.base(h, j)
                });
            if (c.isSizeBound)a.autoPaddingByDotSize && a.sizeAxisRatioTo === "minWidthHeight" || a.pvPanel.borderPanel.overflow("hidden"); else b.override("baseSize", function (h) {
                if (!a.dotsVisible)if (h.isSingle) {
                    h = Math.max(a.pvLine.scene[this.pvMark.index].lineWidth, 0.2) / 2;
                    return f.sqr(h)
                }
                return this.base(h)
            });
            a.pvDot =
                b.pvMark;
            a.pvDot.rubberBandSelectionMode = "center";
            if (i.visual.ValueLabel.isNeeded(a)) {
                b = ["label"];
                e && b.push("lineLabel");
                if (d = i.visual.ValueLabel.maybeCreate(a, a.pvDot, {extensionId: b, wrapper: d}))a.pvHeatGridLabel = d.pvMark
            }
        },
        _buildSignsWrapper: function () {
            if (this.compatVersion() > 1)return null;
            return function (a) {
                return function (b) {
                    var c = {category: b.vars.x.rawValue, value: b.vars.y.rawValue}, d = Object.create(this);
                    d.index = b.dataIndex;
                    return a.call(d, c)
                }
            }
        },
        renderInteractive: function () {
            this.pvScatterPanel.render()
        },
        _buildScene: function () {
            function a(l) {
                var n = new i.visual.Scene(e, {source: l});
                n.vars.series = I.fromComplex(l);
                h.onNewScene(n, false);
                l.datums().each(function (o, p) {
                    var q = o.atoms[k.name];
                    if (q.value != null) {
                        var r = o.atoms[m.name];
                        if (r.value != null) {
                            o = new i.visual.Scene(n, {source: o});
                            o.dataIndex = p;
                            o.vars.x = I.fromAtom(q);
                            o.vars.y = I.fromAtom(r);
                            j.onNewScene(o, true);
                            h.onNewScene(o, true);
                            o.isIntermediate = false
                        }
                    }
                })
            }

            function b(l) {
                for (var n = l.childNodes, o, p = 0, q = 0, r = n.length; p < r; p++, q++) {
                    var s = n[q];
                    s.isSingle = !o && !s.nextSibling;
                    o && c(l, o, s, q) && q++;
                    o = s
                }
            }

            function c(l, n, o, p) {
                var q = m.type.cast.call(null, (+o.vars.y.value + +n.vars.y.value) / 2);
                n = k.type.cast.call(null, (+o.vars.x.value + +n.vars.x.value) / 2);
                l = new i.visual.Scene(l, {index: p, source: o.datum});
                l.dataIndex = o.dataIndex;
                l.vars.x = new I(n, k.format(n), n);
                l.vars.y = new I(q, m.format(q), q);
                j.onNewScene(l, true);
                h.onNewScene(l, true);
                l.ownerScene = o;
                l.isIntermediate = true;
                l.isSingle = false;
                return l
            }

            var d = this.visibleData({ignoreNulls: false}), e = new i.visual.Scene(null, {panel: this, source: d}),
                g = this.visualRoles, h = new i.visual.RoleVarHelper(e, g.color, {roleVar: "color"}), j = new i.visual.RoleVarHelper(e, g.size, {roleVar: "size"}), k = d.owner.dimensions(g.x.firstDimensionName()), m = d.owner.dimensions(g.y.firstDimensionName());
            d.children().each(a, this);
            e.children().each(b, this);
            return e
        },
        _finalizeScene: function (a) {
            var b = this.axes, c = b.base.sceneScale({sceneVarName: "x"}), d = b.ortho.sceneScale({sceneVarName: "y"});
            a.children().selectMany(function (e) {
                return e.childNodes
            }).each(function (e) {
                e.basePosition =
                    c(e);
                e.orthoPosition = d(e)
            });
            return a
        }
    });
    f.type("pvc.MetricPointAbstract", i.MetricXYAbstract).add({
        _trendable: true, _initPlotsCore: function () {
            if (this._trendable = !!this._createPointPlot().option("Trend"))new i.visual.MetricPointPlot(this, {
                name: "trend",
                fixed: {
                    DataPart: "trend",
                    TrendType: "none",
                    NullInterpolatioMode: "none",
                    ColorRole: "series",
                    SizeRole: null,
                    SizeAxis: null,
                    OrthoAxis: 1
                },
                defaults: {ColorAxis: 2, LinesVisible: true, DotsVisible: false}
            })
        }, _hasDataPartRole: function () {
            return true
        }, _getColorRoleSpec: function () {
            return {
                defaultSourceRole: "series",
                defaultDimension: "color*", dimensionDefaults: {valueType: Number}
            }
        }, _initVisualRoles: function () {
            this.base();
            this._addVisualRole("size", {
                isMeasure: true,
                requireSingleDimension: true,
                requireIsDiscrete: false,
                defaultDimension: "size",
                dimensionDefaults: {valueType: Number}
            })
        }, _getTranslationClass: function (a) {
            return f.type(this.base(a)).add(i.data.MetricPointChartTranslationOper)
        }, _createPlotPanels: function (a, b) {
            var c = this.options;
            b = f.set(Object.create(b), "sizeAxisRatio", c.sizeAxisRatio, "sizeAxisRatioTo", c.sizeAxisRatioTo,
                "autoPaddingByDotSize", c.autoPaddingByDotSize);
            this.scatterChartPanel = new i.MetricPointPanel(this, a, this.plots.scatter, b);
            (c = this.plots.trend) && new i.MetricPointPanel(this, a, c, Object.create(b))
        }, defaults: {axisOriginIsZero: false, tooltipOffset: 10}
    });
    f.type("pvc.MetricDotChart", i.MetricPointAbstract).add({
        _createPointPlot: function () {
            return new i.visual.MetricPointPlot(this, {fixed: {DotsVisible: true}})
        }
    });
    f.type("pvc.MetricLineChart", i.MetricPointAbstract).add({
        _createPointPlot: function () {
            return new i.visual.MetricPointPlot(this,
                {fixed: {LinesVisible: true}})
        }
    });
    f.type("pvc.BulletChart", i.BaseChart).init(function (a) {
        a = a || {};
        var b = a.dimensionGroups || (a.dimensionGroups = {}), c = b.range || (b.range = {});
        if (c.valueType === undefined)c.valueType = Number;
        b = b.marker || (b.marker = {});
        if (b.valueType === undefined)b.valueType = Number;
        this.base(a)
    }).add({
        bulletChartPanel: null, allowNoData: true, _processOptionsCore: function (a) {
            a.legend = false;
            a.selectable = false;
            this.base(a)
        }, _initVisualRoles: function () {
            this.base();
            this._addVisualRole("title", {defaultDimension: "title*"});
            this._addVisualRole("subTitle", {defaultDimension: "subTitle*"});
            this._addVisualRole("value", {isMeasure: true, requireIsDiscrete: false, valueType: Number, defaultDimension: "value*"});
            this._addVisualRole("marker", {isMeasure: true, requireIsDiscrete: false, valueType: Number, defaultDimension: "marker*"});
            this._addVisualRole("range", {isMeasure: true, requireIsDiscrete: false, valueType: Number, defaultDimension: "range*"})
        }, _createTranslation: function (a) {
            a = this.base(a);
            var b = a.virtualItemSize();
            if (b)switch (b) {
                case 1:
                    a.defReader({names: "value"});
                    break;
                case 2:
                    a.defReader({names: ["title", "value"]});
                    break;
                case 3:
                    a.defReader({names: ["title", "value", "marker"]});
                    break;
                default:
                    a.defReader({names: ["title", "subTitle", "value", "marker"]});
                    b > 4 && a.defReader({names: "range", indexes: t.range(4, b)});
                    break
            }
            return a
        }, _initPlotsCore: function () {
            new i.visual.BulletPlot(this)
        }, _createContent: function (a) {
            this.bulletChartPanel = new i.BulletChartPanel(this, this.basePanel, this.plots.bullet, a)
        }, defaults: {
            compatVersion: 1, orientation: "horizontal", bulletSize: 30, bulletSpacing: 50,
            bulletMargin: 100, bulletTitle: "Title", bulletSubtitle: "", bulletTitlePosition: "left", tooltipFormat: function (a, b, c) {
                return this.chart.options.valueFormat(c)
            }, crosstabMode: false, seriesInRows: false
        }
    });
    f.type("pvc.BulletChartPanel", i.PlotPanel).add({
        pvBullets: null, pvBullet: null, data: null, onSelectionChange: null, _createCore: function (a) {
            var b = this.chart, c = b.options, d = this.buildData(), e = c.orientation == "horizontal" ? "left" : "bottom", g, h, j, k, m, l, n, o;
            if (c.orientation == "horizontal") {
                a = a.clientSize.width - this.chart.options.bulletMargin -
                20;
                g = 0;
                switch (c.bulletTitlePosition) {
                    case "top":
                        l = this.chart.options.bulletMargin;
                        j = 0;
                        h = "left";
                        k = -12;
                        o = parseInt(c.titleSize / 2, 10);
                        break;
                    case "bottom":
                        l = this.chart.options.bulletMargin;
                        j = 0;
                        h = "left";
                        k = c.bulletSize + 32;
                        o = 0;
                        break;
                    case "right":
                        l = 5;
                        j = a + 5;
                        h = "left";
                        k = parseInt(c.bulletSize / 2, 10);
                        o = 0;
                        break;
                    case "left":
                    default:
                        l = this.chart.options.bulletMargin;
                        j = 0;
                        k = parseInt(c.bulletSize / 2, 10);
                        h = "right";
                        o = 0
                }
                m = "bottom";
                n = function () {
                    return this.index * (c.bulletSize + c.bulletSpacing) + o
                }
            } else {
                a = a.clientSize.height -
                this.chart.options.bulletMargin - 20;
                switch (c.bulletTitlePosition) {
                    case "top":
                        l = this.chart.options.bulletMargin;
                        j = 0;
                        h = "left";
                        k = -20;
                        g = 0;
                        n = undefined;
                        break;
                    case "bottom":
                        l = this.chart.options.bulletMargin;
                        j = 0;
                        h = "left";
                        k = a + 20;
                        g = 0;
                        n = 20;
                        break;
                    case "right":
                        l = 5;
                        j = this.chart.options.bulletSize + 40;
                        h = "left";
                        k = a;
                        g = -Math.PI / 2;
                        n = undefined;
                        break;
                    case "left":
                    default:
                        l = this.chart.options.bulletMargin;
                        j = -12;
                        k = this.height - this.chart.options.bulletMargin - 20;
                        h = "left";
                        g = -Math.PI / 2;
                        n = undefined
                }
                m = "right";
                l = function () {
                    return c.bulletMargin +
                        this.index * (c.bulletSize + c.bulletSpacing)
                }
            }
            this.pvBullets = this.pvPanel.add(t.Panel).data(d)[i.BasePanel.orthogonalLength[e]](a)[i.BasePanel.parallelLength[e]](this.chart.options.bulletSize).margin(20).left(l).top(n);
            this.pvBullet = this.pvBullets.add(t.Layout.Bullet).orient(e).ranges(function (s) {
                return s.ranges
            }).measures(function (s) {
                return s.measures
            }).markers(function (s) {
                return s.markers
            });
            if (b.clickable() && this.clickAction) {
                var p = this;
                this.pvBullet.cursor("pointer").event("click", function (s) {
                    return p.clickAction(s.title,
                        s.subtitle, s.measures, t.event)
                })
            }
            this.pvBulletRange = this.pvBullet.range.add(t.Bar);
            this.pvBulletMeasure = this.pvBullet.measure.add(t.Bar).text(function (s, u) {
                return u.formattedMeasures[this.index]
            });
            this.pvBulletMarker = this.pvBullet.marker.add(t.Dot).shape("square").fillStyle("white").text(function (s, u) {
                return u.formattedMarkers[this.index]
            });
            if (this.showsTooltip()) {
                var q = this;
                this.pvBulletMeasure.localProperty("tooltip").tooltip(function (s, u) {
                    return b.options.tooltipFormat.call(q, u.title, u.subtitle,
                        s)
                });
                this.pvBulletMarker.localProperty("tooltip").tooltip(function (s, u) {
                    return b.options.tooltipFormat.call(q, u.title, u.subtitle, s)
                });
                this.pvBulletMeasure.event("mouseover", t.Behavior.tipsy(this.chart._tooltipOptions));
                this.pvBulletMarker.event("mouseover", t.Behavior.tipsy(this.chart._tooltipOptions))
            }
            this.pvBulletRule = this.pvBullet.tick.add(t.Rule);
            this.pvBulletRuleLabel = this.pvBulletRule.anchor(m).add(t.Label).text(this.pvBullet.x.tickFormat);
            this.pvBulletTitle = this.pvBullet.anchor(e).add(t.Label).font("bold 12px sans-serif").textAngle(g).left(-10).textAlign(h).textBaseline("bottom").left(j).top(k).text(function (s) {
                return s.formattedTitle
            });
            this.pvBulletSubtitle = this.pvBullet.anchor(e).add(t.Label).textStyle("#666").textAngle(g).textAlign(h).textBaseline("top").left(j).top(k).text(function (s) {
                return s.formattedSubtitle
            });
            var r = typeof c.axisDoubleClickAction == "function" ? function (s, u) {
                c.axisDoubleClickAction(s, u)
            } : null;
            if (b.doubleClickable() && r) {
                this.pvBulletTitle.cursor("pointer").events("all").event("dblclick", function (s) {
                    r(s, arguments[arguments.length - 1])
                });
                this.pvBulletSubtitle.cursor("pointer").events("all").event("dblclick", function (s) {
                    r(s,
                        arguments[arguments.length - 1])
                })
            }
        }, applyExtensions: function () {
            this.base();
            this.extend(this.pvBullets, "bulletsPanel");
            this.extend(this.pvBullet, "bulletPanel");
            this.extend(this.pvBulletRange, "bulletRange");
            this.extend(this.pvBulletMeasure, "bulletMeasure");
            this.extend(this.pvBulletMarker, "bulletMarker");
            this.extend(this.pvBulletRule, "bulletRule");
            this.extend(this.pvBulletRuleLabel, "bulletRuleLabel");
            this.extend(this.pvBulletTitle, "bulletTitle");
            this.extend(this.pvBulletSubtitle, "bulletSubtitle")
        }, _getExtensionId: function () {
            return [{abs: "content"}].concat(this.base())
        },
        buildData: function () {
            var a = this.chart, b = a.options, c = a.visualRoles.title.grouping, d = a.visualRoles.subTitle.grouping, e = a.visualRoles.value.grouping, g = a.visualRoles.marker.grouping, h = a.visualRoles.range.grouping, j = {
                title: b.bulletTitle,
                formattedTitle: b.bulletTitle,
                subtitle: b.bulletSubtitle,
                formattedSubtitle: b.bulletSubtitle,
                ranges: f.array.to(b.bulletRanges) || [],
                measures: f.array.to(b.bulletMeasures) || [],
                markers: f.array.to(b.bulletMarkers) || []
            };
            f.set(j, "formattedRanges", j.ranges.map(String), "formattedMeasures",
                j.measures.map(String), "formattedMarkers", j.markers.map(String));
            return !e && !c && !g && !d && !h ? [j] : a.data.datums().select(function (k) {
                var m = Object.create(j), l;
                if (e) {
                    l = e.view(k);
                    m.measures = l.values();
                    m.formattedMeasures = l.labels()
                }
                if (c) {
                    l = c.view(k);
                    m.title = l.value;
                    m.formattedTitle = l.label
                }
                if (d) {
                    l = d.view(k);
                    m.subtitle = l.value;
                    m.formattedSubtitle = l.label
                }
                if (g) {
                    l = g.view(k);
                    m.markers = l.values();
                    m.formattedMarkers = l.labels()
                }
                if (h) {
                    l = h.view(k);
                    m.ranges = l.values();
                    m.formattedRanges = l.labels()
                }
                return m
            }, this).array()
        }
    });
    f.type("pvc.ParallelCoordinates", i.BaseChart).init(function (a) {
        a = a || {};
        a.dimensions = a.dimensions || {};
        if (!a.dimensions.value)a.dimensions.value = {valueType: null};
        this.base(a)
    }).add({
        parCoordPanel: null,
        _createContent: function (a) {
            this.parCoordPanel = new i.ParCoordPanel(this, this.basePanel, f.create(a, {
                topRuleOffset: this.options.topRuleOffset,
                botRuleOffset: this.options.botRuleOffset,
                leftRuleOffset: this.options.leftRuleOffset,
                rightRuleOffset: this.options.rightRuleOffset,
                sortCategorical: this.options.sortCategorical,
                mapAllDimensions: this.options.mapAllDimensions,
                numDigits: this.options.numDigits
            }))
        },
        defaults: f.create(i.BaseChart.prototype.defaults, {
            compatVersion: 1,
            topRuleOffset: 30,
            botRuleOffset: 30,
            leftRuleOffset: 60,
            rightRuleOffset: 60,
            sortCategorical: true,
            mapAllDimensions: true,
            numDigits: 0
        })
    });
    f.type("pvc.ParCoordPanel", i.BasePanel).add({
        anchor: "fill", pvParCoord: null, dimensions: null, dimensionDescr: null, data: null, retrieveData: function () {
            var a = this.chart.data, b = this.chart.options.numDigits;
            this.dimensions = a.getVisibleCategories();
            var c = a.getValues(), d = a.getVisibleSeriesIndexes(), e = a.getVisibleCategoriesIndexes(), g = a.getCategories(), h = this.chart.options.mapAllDimensions ? e.map(function (x) {
                return isNaN(c[x][0]) ? {categorical: true, len: 0, map: []} : {categorical: false, len: 0, map: [], displayValue: []}
            }) : e.map(function (x) {
                return isNaN(c[x][0]) ? {categorical: true, len: 0, map: []} : null
            }), j = function (x, y) {
                x = h[x];
                var w = null;
                if (x.categorical) {
                    w = x.map[y];
                    if (w == null) {
                        w = x.len;
                        x.len++;
                        x.map[y] = w
                    }
                } else {
                    var z = y.toFixed(b);
                    w = x.map[z];
                    if (w == null) {
                        w = x.len;
                        x.len++;
                        x.map[z] = w;
                        x.displayValue[z] = y
                    }
                }
                return w
            };
            for (var k in h)if (h.hasOwnProperty(k) && h[k] && h[k].categorical)h[k].displayValue = h[k].map;
            var m;
            if (this.chart.options.sortCategorical || this.chart.options.mapAllDimensions)for (a = 0; a < h.length; a++)if (h[a]) {
                for (k = 0; k < c[a].length; k++)j(a, c[a][k]);
                var l = h[a].map, n = [];
                for (m in l)l.hasOwnProperty(m) && n.push(m);
                n.sort();
                if (h[a].categorical)for (k = 0; k < n.length; k++)l[n[k]] = k; else for (k = 0; k < n.length; k++)l[n[k]].index = k
            }
            var o = function (x) {
                var y = {};
                for (var w in e)if (e.hasOwnProperty(w))y[g[w]] =
                    h[w] ? j(w, c[w][x]) : c[w][x];
                return y
            };
            this.data = d.map(function (x) {
                return o(x)
            });
            d = this.dimensions.map(function (x) {
                var y = {}, w = x.split("__");
                y.id = x;
                y.name = w[0];
                y.unit = w.length > 1 ? w[1] : "";
                return y
            });
            for (a = 0; a < d.length; a++) {
                m = d[a];
                l = e[a];
                m.orgRowIndex = l;
                var p = c[l].length, q, r, s, u;
                if (h[l]) {
                    n = q = r = s = h[l].displayValue[c[l][0]];
                    for (k = 1; k < p; k++) {
                        u = h[l].displayValue[c[l][k]];
                        if (u < n) {
                            r = n;
                            n = u
                        }
                        if (u > q) {
                            s = q;
                            q = u
                        }
                    }
                } else {
                    n = q = r = s = c[l][0];
                    for (k = 1; k < p; k++) {
                        u = c[l][k];
                        if (u < n) {
                            r = n;
                            n = u
                        }
                        if (u > q) {
                            s = q;
                            q = u
                        }
                    }
                }
                k = (q - s + (r - n)) / 2;
                m.min =
                    n;
                m.max = q;
                m.step = k;
                m.categorical = false;
                if (h[l]) {
                    m.map = h[l].map;
                    m.mapLength = h[l].len;
                    m.categorical = h[l].categorical;
                    if (!m.categorical) {
                        m.orgValue = [];
                        k = h[l].map;
                        for (var A in k)if (k.hasOwnProperty(A))m.orgValue[k[A]] = 0 + A
                    }
                }
            }
            this.dimensionDescr = function (x, y) {
                for (var w = {}, z = 0; z < x.length; z++)w[x[z]] = y[z];
                return w
            }(this.dimensions, d)
        }, _createCore: function () {
            function a(v) {
                var B = v.dim;
                A[B].min = Math.max(s[B].domain()[0], s[B].invert(d - v.y - v.dy));
                A[B].max = Math.min(s[B].domain()[1], s[B].invert(d - v.y));
                x = B;
                z.render();
                return false
            }

            function b(v) {
                if (v.dy < 3) {
                    var B = v.dim;
                    A[B].min = Math.max(s[B].domain()[0], s[B].invert(0));
                    A[B].max = Math.min(s[B].domain()[1], s[B].invert(d));
                    v.y = h;
                    v.dy = l;
                    x = B;
                    z.render()
                }
                return false
            }

            var c = this;
            this.retrieveData();
            var d = this.height, e = this.chart.options.numDigits, g = this.chart.options.topRuleOffset, h = this.chart.options.botRuleOffset, j = this.chart.options.leftRuleOffset, k = this.width - this.chart.options.rightRuleOffset, m = this.height - g, l = m - h, n = g - 12, o = this.dimensions, p = this.dimensionDescr, q = function (v,
                                                                                                                                                                                                                                                                                                                                                   B) {
                    var G = p[v].min, K = p[v].max;
                    v = p[v].step;
                    if (B) {
                        G -= v;
                        K += v
                    }
                    return t.Scale.linear(G, K).range(h, m)
                }, r = t.Scale.ordinal(o).splitFlush(j, k), s = t.dict(o, function (v) {
                    var B = q(v, true).range(h, m), G = p[v];
                    if (G.orgValue && !G.categorical) {
                        v = function (K) {
                            return B(G.orgValue[K])
                        };
                        v.domain = function () {
                            return B.domain()
                        };
                        v.invert = function (K) {
                            return B.invert(K)
                        };
                        return v
                    }
                    return B
                }), u = t.dict(o, function (v) {
                    return q(v, false).range("steelblue", "brown")
                }), A = t.dict(o, function (v) {
                    return {min: s[v].domain()[0], max: s[v].domain()[1]}
                }),
                x = o[0];
            j = this.chart.options.mapAllDimensions ? function (v) {
                return o.every(function (B) {
                    var G = p[B];
                    G = G.orgValue && !G.categorical ? G.orgValue[v[B]] : v[B];
                    return G >= A[B].min && G <= A[B].max
                })
            } : function (v) {
                return o.every(function (B) {
                    return v[B] >= A[B].min && v[B] <= A[B].max
                })
            };
            this.pvParCoord = this.pvPanel.add(t.Panel).data(c.data).visible(j).add(t.Line).data(o).left(function (v) {
                return r(v)
            }).bottom(function (v, B) {
                return s[v](B[v])
            }).strokeStyle("#ddd").lineWidth(1).antialias(false);
            this.pvPanel.add(t.Rule).data(o).left(r).top(g).bottom(h).anchor("top").add(t.Label).top(n).font("bold 10px sans-serif").text(function (v) {
                return p[v].name
            });
            g = [];
            for (var y in p)if (p.hasOwnProperty(y)) {
                n = p[y];
                if (n.categorical) {
                    k = r(n.id) + 6;
                    for (var w in n.map)if (n.map.hasOwnProperty(w))g[g.length] = {x: k, y: s[n.id](n.map[w]) + 3, label: w}
                }
            }
            this.pvPanel.add(t.Panel).data(g).add(t.Label).left(function (v) {
                return v.x
            }).bottom(function (v) {
                return v.y
            }).text(function (v) {
                return v.label
            }).textAlign("left");
            var z = this.pvPanel.add(t.Panel);
            z.add(t.Panel).data(c.data).visible(j).add(t.Line).data(o).left(function (v) {
                return r(v)
            }).bottom(function (v, B) {
                return s[v](B[v])
            }).strokeStyle(function (v,
                                     B) {
                v = p[x];
                return u[x](v.orgValue && !v.categorical ? v.orgValue[B[x]] : B[x])
            }).lineWidth(1);
            c = z.add(t.Panel).data(o.map(function (v) {
                return {y: h, dy: l, dim: v}
            })).left(function (v) {
                return r(v.dim) - 30
            }).width(60).fillStyle("rgba(0,0,0,.001)").cursor("crosshair").event("mousedown", t.Behavior.select()).event("select", a).event("selectend", b).add(t.Bar).left(25).top(function (v) {
                return v.y
            }).width(10).height(function (v) {
                return v.dy
            }).fillStyle(function (v) {
                return v.dim == x ? u[v.dim]((A[v.dim].max + A[v.dim].min) / 2) : "hsla(0,0,50%,.5)"
            }).strokeStyle("white").cursor("move").event("mousedown",
                t.Behavior.drag()).event("dragstart", a).event("drag", a);
            c.anchor("bottom").add(t.Label).textBaseline("top").text(function (v) {
                return p[v.dim].categorical ? "" : A[v.dim].min.toFixed(e) + p[v.dim].unit
            });
            c.anchor("top").add(t.Label).textBaseline("bottom").text(function (v) {
                return p[v.dim].categorical ? "" : A[v.dim].max.toFixed(e) + p[v.dim].unit
            });
            this.extend(this.pvParCoord, "parCoord");
            this.extend(this.pvPanel, "chart")
        }
    });
    f.type("pvc.DataTree", i.BaseChart).init(function (a) {
        a = a || {};
        a.dimensionGroups = a.dimensionGroups ||
        {};
        if (!a.dimensionGroups.value)a.dimensionGroups.value = {valueType: null};
        this.base(a)
    }).add({
        structEngine: null, structMetadata: null, structDataset: null, DataTreePanel: null, _getColorRoleSpec: function () {
            return {isRequired: true, defaultSourceRole: "category", requireIsDiscrete: true}
        }, setStructData: function (a) {
            this.structDataset = a.resultset;
            this.structDataset.length || this._log("Warning: Structure-dataset is empty");
            this.structMetadata = a.metadata;
            this.structMetadata.length || this._log("Warning: Structure-Metadata is empty")
        },
        _createContent: function (a) {
            var b = this.structEngine, c = b ? b.type : new i.data.ComplexType;
            c.addDimension("value", {});
            var d = new i.data.CrosstabTranslationOper(c, this.structDataset, this.structMetadata, {seriesInRows: true, crosstabMode: true});
            d.configureType();
            if (!b)b = this.structEngine = new i.data.Data({type: c});
            b.load(d.execute(b));
            i.debug >= 3 && this._log(this.structEngine.getInfo());
            this.dataTreePanel = new i.DataTreePanel(this, this.basePanel, f.create(a, {
                topRuleOffset: this.options.topRuleOffset,
                botRuleOffset: this.options.botRuleOffset,
                leftRuleOffset: this.options.leftRuleOffset,
                rightRuleOffset: this.options.rightRuleOffset,
                boxplotColor: this.options.boxplotColor,
                valueFontsize: this.options.valueFontsize,
                headerFontsize: this.options.headerFontsize,
                border: this.options.border,
                perpConnector: this.options.perpConnector,
                numDigits: this.options.numDigits,
                minVerticalSpace: this.options.minVerticalSpace,
                connectorSpace: this.options.connectorSpace,
                minAspectRatio: this.options.minAspectRatio
            }))
        }, defaults: {
            compatVersion: 1,
            topRuleOffset: 30,
            botRuleOffset: 30,
            leftRuleOffset: 60,
            rightRuleOffset: 60,
            boxplotColor: "grey",
            headerFontsize: 16,
            valueFontsize: 20,
            border: 2,
            perpConnector: false,
            numDigits: 0,
            connectorSpace: 0.15,
            minVerticalSpace: 0.05,
            minAspectRatio: 2
        }
    });
    f.type("pvc.DataTreePanel", i.PlotPanel).add({
        pvDataTree: null,
        treeElements: null,
        structMap: null,
        structArr: null,
        hRules: null,
        vRules: null,
        rules: null,
        generatePerpConnectors: function (a) {
            this.hRules = [];
            this.vRules = [];
            this.rules = [];
            for (var b in this.structMap) {
                var c = this.structMap[b];
                if (c.children != null) {
                    var d = +1E4,
                        e = -10000, g = c.left + c.width;
                    this.hRules.push({left: g, width: a, bottom: c.bottom + c.height / 2});
                    g += a;
                    for (var h in c.children) {
                        var j = this.structMap[c.children[h]], k = j.bottom + j.height / 2;
                        if (k > e)e = k;
                        if (k < d)d = k;
                        this.hRules.push({left: g, width: j.left - g, bottom: k})
                    }
                    e > d && this.vRules.push({left: g, bottom: d, height: e - d})
                }
            }
        },
        generateLineSegment: function (a, b, c, d) {
            var e = [];
            e.push({x: a, y: b});
            e.push({x: c, y: d});
            this.rules.push(e)
        },
        generateConnectors: function (a) {
            this.hRules = [];
            this.vRules = [];
            if (this.chart.options.perpConnector)this.generatePerpConnectors(a);
            else {
                this.rules = [];
                for (var b in this.structMap) {
                    var c = this.structMap[b];
                    if (c.children != null) {
                        var d, e, g, h = +1E4, j = -10000;
                        for (g in c.children) {
                            e = this.structMap[c.children[g]];
                            d = e.bottom + e.height / 2;
                            if (d > j)j = d;
                            if (d < h)h = d
                        }
                        h = (j + h) / 2;
                        d = c.left + c.width;
                        j = d + a;
                        this.generateLineSegment(d, c.bottom + c.height / 2, j, h);
                        for (g in c.children) {
                            e = this.structMap[c.children[g]];
                            d = e.bottom + e.height / 2;
                            this.generateLineSegment(j, h, e.left, d)
                        }
                    }
                }
            }
        },
        retrieveStructure: function () {
            var a = this.chart.structEngine, b = this.chart.options, c =
                a.getVisibleCategories();
            this.treeElements = a.getVisibleSeries();
            a = a.getValues();
            c = c.length > 4;
            var d;
            for (d in this.treeElements)this.treeElements[d] = $.trim(this.treeElements[d]);
            var e = [];
            e.getElement = function (o) {
                if (e[o] == null)e[o] = {min: +1E4, max: -10000};
                return e[o]
            };
            e.addValue = function (o, p) {
                o = e.getElement(o);
                if (p < o.min)o.min = p;
                if (p > o.max)o.max = p;
                return o
            };
            var g, h, j;
            for (d in this.treeElements) {
                j = this.treeElements[d];
                g = j[0];
                h = g.charCodeAt(0);
                j = parseInt(j.slice(1), 10);
                e.addValue("__cols", h);
                e.addValue(g,
                    j)
            }
            g = e.getElement("__cols");
            var k = this.innerWidth / (g.max - g.min + 1), m = k - b.connectorSpace * k;
            h = m / b.minAspectRatio;
            var l = g.min;
            delete e.__cols;
            for (d in e) {
                g = e[d];
                if (typeof g != "function") {
                    var n = g.max - g.min + 1;
                    g.gridHeight = this.innerHeight / n;
                    g.cellHeight = g.gridHeight * (1 - b.minVerticalSpace);
                    if (g.cellHeight > h)g.cellHeight = h;
                    g.relBottom = (g.gridHeight - g.cellHeight) / 2;
                    g.numRows = n
                }
            }
            b = new RegExp("[\\s\"']+", "g");
            this.structMap = {};
            for (d in this.treeElements) {
                n = {};
                j = this.treeElements[d];
                n.box_id = j;
                this.structMap[j] =
                    n;
                g = j[0];
                h = g.charCodeAt(0);
                j = parseInt(j.slice(1), 10);
                g = e.getElement(g);
                n.colIndex = h - l;
                n.rowIndex = g.numRows - (j - g.min) - 1;
                n.left = this.leftOffs + n.colIndex * k;
                n.width = m;
                if (c) {
                    n.bottom = a[4][d];
                    n.height = a[5][d]
                } else {
                    n.bottom = this.botOffs + n.rowIndex * g.gridHeight + g.relBottom;
                    n.height = g.cellHeight
                }
                n.label = a[0][d];
                n.selector = a[1][d];
                n.aggregation = a[2][d];
                h = (a[3][d] || "").replace(b, " ");
                n.children = h === " " || h === "" ? null : h.split(" ")
            }
            this.generateConnectors((k - m) / 2);
            this.structArr = [];
            for (d in this.structMap) {
                j = this.structMap[d];
                this.structArr.push(j)
            }
        },
        findDataValue: function (a, b) {
            for (var c = 0; c < b[0].length; c++)if (b[0][c] == a)return b[1][c];
            this._log("Error: value with key : " + a + " not found.")
        },
        generateBoxPlots: function () {
            var a = this.chart.options;
            for (var b in this.structArr) {
                var c = this.structArr[b];
                if (c.values.length) {
                    c.subplot = {};
                    var d = c.subplot, e = [], g = c.width / 6;
                    d.hRules = [];
                    d.vRules = [];
                    d.marks = [];
                    d.labels = [];
                    e.push(this.findDataValue("_p5", c.values));
                    e.push(this.findDataValue("_p25", c.values));
                    e.push(this.findDataValue("_p50",
                        c.values));
                    e.push(this.findDataValue("_p75", c.values));
                    e.push(this.findDataValue("_p95", c.values));
                    var h = false;
                    if (typeof e[2] != "undefined") {
                        if (e[4] < e[0]) {
                            e = e.reverse();
                            this._log(" dataset " + c.box_id + " repaired (_p95 was smaller than _p5)")
                        }
                        if (e[4] > e[0])d.hScale = t.Scale.linear(e[0], e[4]); else {
                            h = true;
                            d.hScale = t.Scale.linear(e[0] - 1.0E-10, e[0] + 1.0E-10)
                        }
                        d.hScale.range(c.left + g, c.left + c.width - g);
                        g = "" + e[2];
                        var j;
                        for (j = 0; j < e.length; j++)e[j] = d.hScale(e[j]);
                        d.bot = c.bottom + c.height / 3;
                        d.top = c.bottom + 2 * c.height /
                        3;
                        d.mid = (d.top + d.bot) / 2;
                        d.textBottom = c.bottom + 15;
                        d.textBottom = d.bot - a.valueFontsize - 1;
                        if (h)d.vRules.push({left: e[0], bottom: d.bot, lWidth: 3, height: d.top - d.bot}); else {
                            d.hRules.push({left: e[0], width: e[1] - e[0], lWidth: 1, bottom: d.mid});
                            d.hRules.push({left: e[1], width: e[3] - e[1], lWidth: 1, bottom: d.bot});
                            d.hRules.push({left: e[1], width: e[3] - e[1], lWidth: 1, bottom: d.top});
                            d.hRules.push({left: e[3], width: e[4] - e[3], lWidth: 1, bottom: d.mid});
                            for (j = 0; j < e.length; j++)d.vRules.push({
                                left: e[j], bottom: d.bot, lWidth: j == 2 ? 3 : 1,
                                height: d.top - d.bot
                            })
                        }
                        d.labels.push({left: e[2], bottom: d.textBottom, text: this.labelFixedDigits(g), size: a.smValueFont, color: a.boxplotColor})
                    }
                }
            }
        },
        labelFixedDigits: function (a) {
            if (typeof a == "string")a = parseFloat(a);
            if (typeof a == "number")a = a.toFixed(this.chart.options.numDigits);
            return "" + a
        },
        addDataPoint: function (a) {
            var b = this.chart.options;
            for (var c in this.structArr) {
                var d = this.structArr[c];
                if (d.values.length) {
                    var e = this.findDataValue(a, d.values);
                    if (typeof e != "undefined") {
                        d = d.subplot;
                        var g = d.hScale(e);
                        d.marks.push({left: g, bottom: d.mid, color: "green"});
                        d.labels.push({left: g, bottom: d.textBottom, text: this.labelFixedDigits(e), size: b.valueFont, color: "green"})
                    }
                }
            }
        },
        retrieveData: function () {
            var a = this.chart.data, b = this.chart.options;
            a.getVisibleCategories();
            var c = a.getVisibleSeries();
            a = a.getValues();
            var d = {}, e, g = a.length;
            for (var h in this.structArr) {
                var j = this.structArr[h];
                j.values = [];
                for (e = 0; e < g; e++)j.values.push([]);
                d[j.selector] = j
            }
            h = {};
            for (e in c) {
                g = d[c[e]];
                if (typeof g != "undefined")for (var k in a)g.values[k].push(a[k][e]);
                else h[c[e]] = true
            }
            for (var m in h)this._log("Could'nt find box for selector: " + m);
            this.generateBoxPlots();
            c = new RegExp("[\\s\"']+", "g");
            if (b.selectParam) {
                b = b.selectParam.replace(c, "");
                if (b != "undefined" && b.length > 0 && typeof window[b] != "undefined") {
                    b = window[b];
                    this.addDataPoint(b)
                }
            }
        },
        _createCore: function () {
            var a = this, b = this.chart.options;
            b.smValueFontsize = Math.round(0.6 * b.valueFontsize);
            b.smValueFont = "" + b.smValueFontsize + "px sans-serif";
            b.valueFont = "" + b.valueFontsize + "px sans-serif";
            var c = b.topRuleOffset,
                d = b.botRuleOffset, e = b.leftRuleOffset;
            this.innerWidth = this.width - e - b.rightRuleOffset;
            this.innerHeight = this.height - c - d;
            this.botOffs = d;
            this.leftOffs = e;
            this.retrieveStructure();
            this.retrieveData();
            var g = b.headerFontsize + 3;
            d = this.rules;
            for (c = 0; c < d.length; c++)this.pvPanel.add(t.Line).data(d[c]).left(function (h) {
                return h.x
            }).bottom(function (h) {
                return h.y
            }).lineWidth(1).strokeStyle("black");
            this.pvDataTree = this.pvPanel.add(t.Bar).data(a.structArr).left(function (h) {
                return h.left
            }).bottom(function (h) {
                return h.bottom
            }).height(function (h) {
                return h.height
            }).width(function (h) {
                return h.width
            }).fillStyle("green").add(t.Bar).left(function (h) {
                return h.left +
                    b.border
            }).bottom(function (h) {
                return h.bottom + b.border
            }).height(function (h) {
                return h.height - b.border - g
            }).width(function (h) {
                return h.width - 2 * b.border
            }).fillStyle("white").add(t.Label).text(function (h) {
                return h.label
            }).textAlign("center").left(function (h) {
                return h.left + h.width / 2
            }).bottom(function (h) {
                return h.bottom + h.height - b.headerFontsize - 5 + b.headerFontsize / 5
            }).font("" + b.headerFontsize + "px sans-serif").textStyle("white").fillStyle("blue");
            for (c = 0; c < this.structArr.length; c++) {
                d = this.structArr[c];
                this.pvPanel.add(t.Rule).data(d.subplot.hRules).left(function (h) {
                    return h.left
                }).width(function (h) {
                    return h.width
                }).bottom(function (h) {
                    return h.bottom
                }).lineWidth(function (h) {
                    return h.lWidth
                }).strokeStyle(a.chart.options.boxplotColor);
                this.pvPanel.add(t.Rule).data(d.subplot.vRules).left(function (h) {
                    return h.left
                }).height(function (h) {
                    return h.height
                }).bottom(function (h) {
                    return h.bottom
                }).lineWidth(function (h) {
                    return h.lWidth
                }).strokeStyle(a.chart.options.boxplotColor);
                this.pvPanel.add(t.Dot).data(d.subplot.marks).left(function (h) {
                    return h.left
                }).bottom(function (h) {
                    return h.bottom
                }).fillStyle(function (h) {
                    return h.color
                });
                this.pvPanel.add(t.Label).data(d.subplot.labels).left(function (h) {
                    return h.left
                }).bottom(function (h) {
                    return h.bottom
                }).font(function (h) {
                    return h.size
                }).text(function (h) {
                    return h.text
                }).textAlign("center").textStyle(function (h) {
                    return h.color
                })
            }
            if (b.perpConnector) {
                this.pvPanel.add(t.Rule).data(a.vRules).left(function (h) {
                    return h.left
                }).bottom(function (h) {
                    return h.bottom
                }).height(function (h) {
                    return h.height
                }).strokeStyle("black");
                this.pvPanel.add(t.Rule).data(a.hRules).left(function (h) {
                    return h.left
                }).bottom(function (h) {
                    return h.bottom
                }).width(function (h) {
                    return h.width
                }).strokeStyle("black")
            }
        },
        applyExtensions: function () {
            this.extend(this.pvDataTree, "dataTree")
        }
    });
    f.type("pvc.data.BoxplotChartTranslationOper").add({
        _configureTypeCore: function () {
            var a = [], b = [], c = [];
            this.collectFreeDiscreteAndConstinuousIndexes(c, b);
            this._getUnboundRoleDefaultDimNames("category", c.length, a);
            f.query(i.BoxplotChart.measureRolesNames).take(b.length).each(function (d) {
                this._getUnboundRoleDefaultDimNames(d,
                    1, a)
            }, this);
            a.length && this.defReader({names: a})
        }
    });
    f.type("pvc.BoxplotPanel", i.CategoricalAbstractPanel).init(function (a, b, c, d) {
        this.base(a, b, c, d);
        this.boxSizeRatio = c.option("BoxSizeRatio");
        this.maxBoxSize = c.option("BoxSizeMax")
    }).add({
        plotType: "box", anchor: "fill", _v1DimRoleName: {value: "median"}, _createCore: function () {
            function a(l, n) {
                l = this.base(l, n);
                return n === "stroke" ? l.darker(1) : l
            }

            function b(l) {
                l.lock(h, function () {
                    return this.pvMark.parent[j]() / 2
                }).override("defaultColor", a);
                return l
            }

            function c(l) {
                l.lockMark(h,
                    function (n) {
                        return n.vars.category.boxLeft
                    }).lockMark(j, function (n) {
                        return n.vars.category.boxWidth
                    });
                return l
            }

            function d(l) {
                c(l);
                l.override("defaultColor", a);
                return l
            }

            this.base();
            var e = this._buildScene(), g = this.isOrientationVertical() ? "bottom" : "left", h = this.anchorOrtho(g), j = this.anchorLength(g), k = this.anchorOrthoLength(g), m = ["panel"];
            this.compatVersion() <= 1 && m.push("");
            this.pvBoxPanel = (new i.visual.Panel(this, this.pvPanel, {extensionId: m})).lock("data", e.childNodes).lockMark(h, function (l) {
                l = l.vars.category;
                return l.x - l.width / 2
            }).pvMark[j](function (l) {
                return l.vars.category.width
            });
            this.pvRuleWhiskerUpper = b(new i.visual.Rule(this, this.pvBoxPanel, {
                extensionId: "boxRuleWhisker",
                freePosition: true,
                noHover: false,
                noSelect: false,
                noClick: false,
                noDoubleClick: false,
                showsInteraction: true
            })).intercept("visible", function (l) {
                return l.vars.category.showRuleWhiskerUpper && this.delegateExtension(true)
            }).pvMark.lock(g, function (l) {
                return l.vars.category.ruleWhiskerUpperBottom
            }).lock(k, function (l) {
                return l.vars.category.ruleWhiskerUpperHeight
            });
            this.pvRuleWhiskerLower = b(new i.visual.Rule(this, this.pvBoxPanel, {
                extensionId: "boxRuleWhisker",
                freePosition: true,
                noHover: false,
                noSelect: false,
                noClick: false,
                noDoubleClick: false,
                showsInteraction: true
            })).intercept("visible", function (l) {
                return l.vars.category.showRuleWhiskerBelow && this.delegateExtension(true)
            }).pvMark.lock(g, function (l) {
                return l.vars.category.ruleWhiskerLowerBottom
            }).lock(k, function (l) {
                return l.vars.category.ruleWhiskerLowerHeight
            });
            this.pvBar = c(new i.visual.Bar(this, this.pvBoxPanel,
                {extensionId: "boxBar", freePosition: true, normalStroke: true})).intercept("visible", function (l) {
                return l.vars.category.showBox && this.delegateExtension(true)
            }).lockMark(g, function (l) {
                return l.vars.category.boxBottom
            }).lockMark(k, function (l) {
                return l.vars.category.boxHeight
            }).override("defaultColor", a).override("defaultStrokeWidth", f.fun.constant(1)).pvMark;
            this.pvRuleMin = d(new i.visual.Rule(this, this.pvBoxPanel, {
                extensionId: "boxRuleMin", freePosition: true, noHover: false, noSelect: false, noClick: false, noDoubleClick: false,
                showsInteraction: true
            })).intercept("visible", function (l) {
                return l.vars.minimum.value != null && this.delegateExtension(true)
            }).pvMark.lock(g, function (l) {
                    return l.vars.minimum.position
                });
            this.pvRuleMax = d(new i.visual.Rule(this, this.pvBoxPanel, {
                extensionId: "boxRuleMax",
                freePosition: true,
                noHover: false,
                noSelect: false,
                noClick: false,
                noDoubleClick: false,
                showsInteraction: true
            })).intercept("visible", function (l) {
                return l.vars.maximum.value != null && this.delegateExtension(true)
            }).pvMark.lock(g, function (l) {
                return l.vars.maximum.position
            });
            this.pvRuleMedian = d(new i.visual.Rule(this, this.pvBoxPanel, {
                extensionId: "boxRuleMedian",
                freePosition: true,
                noHover: false,
                noSelect: false,
                noClick: false,
                noDoubleClick: false,
                showsInteraction: true
            })).intercept("visible", function (l) {
                return l.vars.median.value != null && this.delegateExtension(true)
            }).lockMark(g, function (l) {
                return l.vars.median.position
            }).override("defaultStrokeWidth", f.fun.constant(2)).pvMark
        }, renderInteractive: function () {
            this.pvBoxPanel.render()
        }, _buildScene: function () {
            function a(n) {
                var o =
                    new i.visual.Scene(g, {source: n}), p = o.vars;
                p.series = new I(null, "");
                var q = p.category = new I(n.value, n.label);
                f.set(q, "group", n, "x", h(n.value), "width", j, "boxWidth", k, "boxLeft", j / 2 - k / 2);
                b.measureVisualRoles().forEach(function (w) {
                    var z = c[w.name], v;
                    if (z) {
                        v = n.dimensions(z);
                        z = v.sum(d);
                        v = new I(z, v.format(z));
                        v.position = m(z)
                    } else {
                        v = new I(null, "");
                        v.position = null
                    }
                    p[w.name] = v
                });
                l.onNewScene(o, true);
                o = p.minimum.value != null;
                var r = p.lowerQuartil.value != null, s = p.median.value != null, u = p.upperQuartil.value != null, A, x,
                    y = r || u;
                if (y) {
                    A = r ? p.lowerQuartil.position : s ? p.median.position : p.upperQuartil.position;
                    x = u ? p.upperQuartil.position : s ? p.median.position : p.lowerQuartil.position;
                    if (y = x !== A) {
                        q.boxBottom = A;
                        q.boxHeight = x - A
                    }
                }
                q.showBox = y;
                if (y = p.maximum.value != null) {
                    A = u ? p.upperQuartil.position : s ? p.median.position : r ? p.lowerQuartil.position : o ? p.minimum.position : null;
                    if (y = A != null) {
                        q.ruleWhiskerUpperBottom = A;
                        q.ruleWhiskerUpperHeight = p.maximum.position - A
                    }
                }
                q.showRuleWhiskerUpper = y;
                if (y = o) {
                    x = r ? p.lowerQuartil.position : s ? p.median.position :
                        u ? p.upperQuartil.position : null;
                    if (y = x != null) {
                        A = p.minimum.position;
                        q.ruleWhiskerLowerHeight = x - A;
                        q.ruleWhiskerLowerBottom = A
                    }
                }
                q.showRuleWhiskerBelow = y
            }

            var b = this.chart, c = f.query(b.measureVisualRoles()).object({
                    name: function (n) {
                        return n.name
                    }, value: function (n) {
                        return n.firstDimensionName()
                    }
                }), d = {visible: true, zeroIfNone: false}, e = this.visibleData({ignoreNulls: false}), g = new i.visual.Scene(null, {
                    panel: this,
                    source: e
                }), h = this.axes.base.scale, j = h.range().band, k = Math.min(j * this.boxSizeRatio, this.maxBoxSize),
                m = this.axes.ortho.scale, l = new i.visual.RoleVarHelper(g, this.visualRoles.color, {roleVar: "color"});
            e.children().each(a, this);
            return g
        }
    });
    f.type("pvc.BoxplotChart", i.CategoricalAbstract).add({
        _processOptionsCore: function (a) {
            this.base.apply(this, arguments);
            a.stacked = false
        }, _initVisualRoles: function () {
            this.base();
            var a = {isMeasure: true, requireSingleDimension: true, requireIsDiscrete: false, valueType: Number};
            [{name: "median", label: "Median", defaultDimension: "median", isRequired: true}, {
                name: "lowerQuartil", label: "Lower Quartil",
                defaultDimension: "lowerQuartil"
            }, {name: "upperQuartil", label: "Upper Quartil", defaultDimension: "upperQuartil"}, {
                name: "minimum",
                label: "Minimum",
                defaultDimension: "minimum"
            }, {name: "maximum", label: "Maximum", defaultDimension: "maximum"}].forEach(function (b) {
                    this._addVisualRole(b.name, f.create(a, b))
                }, this)
        }, _getTranslationClass: function (a) {
            return f.type(this.base(a)).add(i.data.BoxplotChartTranslationOper)
        }, _initPlotsCore: function () {
            new i.visual.BoxPlot(this);
            if (this.options.plot2) {
                this._animatable = true;
                new i.visual.PointPlot(this,
                    {name: "plot2", defaults: {LinesVisible: true, DotsVisible: true, OrthoRole: "median", ColorAxis: 2}, fixed: {OrthoAxis: 1}})
            }
        }, _initAxes: function (a) {
            this.base(a);
            (a = this.axesByType.ortho) && a.forEach(function (b) {
                b.option.defaults({Offset: 0.02})
            })
        }, _createPlotPanels: function (a, b) {
            var c = this.plots;
            this.bpChartPanel = new i.BoxplotPanel(this, a, c.box, Object.create(b));
            if (c = c.plot2) {
                i.debug >= 3 && this._log("Creating Point panel.");
                (new i.PointPanel(this, a, c, Object.create(b)))._v1DimRoleName.value = c.option("OrthoRole")
            }
        },
        defaults: {crosstabMode: false}
    }).addStatic({measureRolesNames: ["median", "lowerQuartil", "upperQuartil", "minimum", "maximum"]});
    f.type("pvc.visual.TreemapDiscreteColorAxis", i.visual.ColorAxis).init(function (a, b, c, d) {
        this.base(a, b, c, d);
        this.isByParent = a.plots.treemap.option("ColorMode") === "byparent"
    }).add({
        domainItemValueProp: function () {
            return this.role && this.role.grouping.isSingleDimension ? "value" : "absKey"
        }, domainGroupOperator: function () {
            return "select"
        }, _calcAvgColor: function (a) {
            var b = a.length;
            if (b > 1) {
                var c =
                    0, d = 0, e = 0, g = 0;
                a.forEach(function (h) {
                    h = h.rgb();
                    c += h.r;
                    d += h.g;
                    e += h.b;
                    g += h.a
                });
                a = Math.floor;
                return t.rgb(a(c / b), a(d / b), a(e / b), a(g / b))
            }
            a = a[0];
            return b ? a.darker(0.7) : a
        }, _getBaseScheme: function () {
            var a = this, b = function (h) {
                return h.value != null
            }, c = function (h) {
                return h.children().where(b)
            }, d = function (h) {
                return c(h).any()
            }, e = f.query(this.domainData().nodes()).where(function (h) {
                return c(h).any(d)
            }).array(), g = a.option("Colors");
            return function (h) {
                var j = h instanceof Array ? h : f.array.copy(arguments), k = f.query(e).object({
                    name: function (r) {
                        return a.domainItemValue(r)
                    }
                });
                f.array.removeIf(j, function (r) {
                    return f.hasOwnProp.call(k, r)
                });
                var m = g(j), l = {}, n = function (r) {
                    var s = a.domainItemValue(r), u;
                    if (f.hasOwnProp.call(k, s)) {
                        u = f.getOwn(l, s);
                        if (!u) {
                            r = c(r).select(n).array();
                            if (!r.length)throw f.assert("Should have at least one child that is also a parent.");
                            u = l[s] = a._calcAvgColor(r)
                        }
                    } else u = m(s);
                    return u
                };
                e.forEach(n);
                var o = function (r) {
                    return f.getOwn(l, r) || m(r)
                };
                f.copy(o, m);
                var p, q;
                o.domain = function () {
                    if (arguments.length)throw f.error.operationInvalid("The scale cannot be modified.");
                    return p || (p = f.array.append(f.ownKeys(l), j))
                };
                o.range = function () {
                    if (arguments.length)throw f.error.operationInvalid("The scale cannot be modified.");
                    return q || (q = f.array.append(f.own(l), m.range()))
                };
                return o
            }
        }, _selectDomainItems: function (a) {
            a = f.query(a.nodes());
            var b = function (g) {
                return g.value != null
            }, c = function (g) {
                return g.children().where(b)
            }, d = function (g) {
                return c(g).any()
            }, e = function (g) {
                return !d(g)
            };
            if (this.isByParent)return a.where(function (g) {
                if (!g.parent)return e(g) || c(g).any(e);
                return b(g) &&
                    d(g)
            });
            return a.where(function (g) {
                return (!g.parent || b(g)) && e(g)
            })
        }
    });
    f.type("pvc.data.TreemapChartTranslationOper").add({
        _configureTypeCore: function () {
            var a = [], b = [], c = [];
            this.collectFreeDiscreteAndConstinuousIndexes(c, b);
            c = c.length;
            b = b.length;
            c && this._getUnboundRoleDefaultDimNames("category", c, a);
            b && f.query(["size", "color"]).take(b).each(function (d) {
                this._getUnboundRoleDefaultDimNames(d, 1, a)
            }, this);
            a.length && this.defReader({names: a})
        }
    });
    f.type("pvc.TreemapPanel", i.PlotPanel).init(function (a, b, c, d) {
        this.base(a,
            b, c, d);
        this.axes.size = a._getAxis("size", (c.option("SizeAxis") || 0) - 1);
        this.visualRoles.size = a.visualRole(c.option("SizeRole"));
        this.layoutMode = c.option("LayoutMode")
    }).add({
        _createCore: function (a) {
            var b = this;
            a = a.clientSize;
            var c = b._buildScene();
            if (c) {
                var d = f.number.to(b._getConstantExtension("leaf", "lineWidth"), 1), e = d / 2, g = b.visualRoles.size.isBound() ? b.axes.size.scale.by1(function (k) {
                    return k.vars.size.value
                }) : 100;
                a = b.pvTreemapPanel = (new i.visual.Panel(b, b.pvPanel, {panelType: t.Layout.Treemap, extensionId: "panel"})).pvMark.lock("visible",
                    true).lock("nodes", c.nodes()).lock("left", e).lock("top", e).lock("width", a.width - d).lock("height", a.height - d).lock("size", g).lock("mode", b.layoutMode).lock("order", null).lock("round", false);
                a.node.left(function (k) {
                    return k.x + e
                }).top(function (k) {
                    return k.y + e
                }).width(function (k) {
                    return k.dx - d
                }).height(function (k) {
                    return k.dy - d
                });
                c = b.axes.color;
                var h;
                h = b.visualRoles.color.isBound() ? c.sceneScale({sceneVarName: "color"}) : f.fun.constant(c.option("Unbound"));
                var j = (new i.visual.Bar(b, a.leaf, {extensionId: "leaf"})).lockMark("visible").override("defaultColor",
                    function (k) {
                        return h(k)
                    }).override("defaultStrokeWidth", function () {
                        return d
                    }).pvMark.antialias(false).lineCap("round").strokeDasharray(function (k) {
                        return k.vars.size.value < 0 ? "dash" : null
                    });
                (new i.visual.Bar(b, a.node, {
                    extensionId: "ascendant",
                    noHover: true,
                    noSelect: true,
                    noClick: true,
                    noDoubleClick: true
                })).intercept("visible", function (k) {
                    return !!k.parent && !!k.firstChild && this.delegateExtension(true)
                }).override("anyInteraction", function (k) {
                    return k.anyInteraction() || k.isActiveDescendantOrSelf()
                }).override("defaultStrokeWidth",
                    function () {
                        return 1.5 * d
                    }).override("interactiveStrokeWidth", function (k, m) {
                        if (this.showsActivity() && k.isActiveDescendantOrSelf())m = Math.max(1, m) * 1.5;
                        return m
                    }).override("defaultColor", function (k) {
                        return h(k)
                    }).override("normalColor", f.fun.constant(null)).override("interactiveColor", function (k, m, l) {
                        if (l === "stroke") {
                            if (this.showsActivity()) {
                                if (k.isActiveDescendantOrSelf())return t.color(m).brighter(0.5);
                                if (k.anyActive())return null
                            }
                            if (this.showsSelection() && k.isSelectedDescendantOrSelf())return t.color(m).brighter(0.5)
                        }
                        return null
                    }).pvMark.antialias(false);
                (b = i.visual.ValueLabel.maybeCreate(b, a.label, {noAnchor: true})) && b.optional("textAngle", function (k) {
                    var m = this.defaultText(k);
                    if (k.dx > t.Text.measureWidth(m, k.vars.font))return 0;
                    return k.dx > k.dy ? 0 : -Math.PI / 2
                }).intercept("visible", function (k) {
                    var m = this.delegate();
                    if (m) {
                        m = this.pvMark.textAngle() ? "dx" : "dy";
                        m = k[m] >= t.Text.fontHeight(k.vars.font)
                    }
                    return m
                }).override("trimText", function (k, m) {
                    var l = this.pvMark.textAngle() ? "dy" : "dx";
                    return i.text.trimToWidthB(k[l] - 2, m, k.vars.font, "..")
                }).override("calcBackgroundColor",
                    function () {
                        return j.scene[this.pvMark.index].fillStyle
                    })
            }
        }, _getExtensionId: function () {
            return [{abs: !this.chart.parent ? "content" : "smallContent"}].concat(this.base())
        }, renderInteractive: function () {
            this.pvTreemapPanel.render()
        }, _buildScene: function () {
            var a = this.visibleData({ignoreNulls: false});
            if (!a.childCount())return null;
            var b = this.visualRoles;
            a = new i.visual.Scene(null, {panel: this, source: a});
            var c = new i.visual.RoleVarHelper(a, b.size, {roleVar: "size", allowNestedVars: true, hasPercentSubVar: true}), d = b.color &&
                b.color.grouping, e = d && this.plot.option("ColorMode") === "byparent", g = function (h) {
                var j = h.group;
                h.vars.category = I.fromComplex(j);
                c.onNewScene(h, true);
                var k = j.children().where(function (m) {
                    return m.value != null
                }).array();
                if (d)if (j = e && !k.length ? j.parent : j) {
                    j = d.view(j);
                    h.vars.color = new I(j.keyTrimmed(), j.label)
                } else h.vars.color = new I(null, ""); else if (!h.parent)h.vars.color = new I(null, "");
                k.length && k.forEach(function (m) {
                    g(new i.visual.Scene(h, {source: m}))
                });
                return h
            };
            return g(a)
        }
    });
    f.type("pvc.TreemapChart",
        i.BaseChart).add({
            _animatable: false, _axisCreateIfUnbound: {color: true}, _getColorRoleSpec: function () {
                return {defaultSourceRole: "category", defaultDimension: "color*"}
            }, _initVisualRoles: function () {
                this.base();
                this._addVisualRole("category", {isRequired: true, defaultDimension: "category*", autoCreateDimension: true});
                this._addVisualRole("size", {
                    isMeasure: true,
                    isRequired: false,
                    isPercent: true,
                    requireSingleDimension: true,
                    requireIsDiscrete: false,
                    valueType: Number,
                    defaultDimension: "size"
                })
            }, _getTranslationClass: function (a) {
                return f.type(this.base(a)).add(i.data.TreemapChartTranslationOper)
            },
            _getIsNullDatum: f.fun.constant(), _initPlotsCore: function () {
                var a = new i.visual.TreemapPlot(this);
                if (this.options.legend == null)this.options.legend = a.option("ColorMode") === "byparent";
                a = a.option("RootCategoryLabel");
                this.visualRoles.category.setRootLabel(a);
                this.visualRoles.color.setRootLabel(a)
            }, _initAxes: function (a) {
                if (this.visualRoles.color.isDiscrete()) {
                    if (!f.hasOwnProp.call(this, "_axisClassByType"))this._axisClassByType = Object.create(this._axisClassByType);
                    this._axisClassByType.color = i.visual.TreemapDiscreteColorAxis
                } else delete this._axisClassByType;
                return this.base(a)
            }, _setAxisScale: function (a, b) {
                this.base(a, b);
                b & 2 && a.type === "size" && a.setScaleRange({min: 100, max: 1E3})
            }, _createContent: function (a) {
                this.base();
                new i.TreemapPanel(this, this.basePanel, this.plots.treemap, a)
            }, _createVisibleData: function (a, b) {
                return this.visualRoles.category.select(a, b)
            }, defaults: {legend: null}
        });
    return i
}(def, pv);
