var Mailcheck = {
    domainThreshold: 4,
    topLevelThreshold: 3,
    defaultDomains: "yahoo.com google.com hotmail.com gmail.com me.com aol.com mac.com live.com comcast.net googlemail.com msn.com hotmail.co.uk yahoo.co.uk facebook.com verizon.net sbcglobal.net att.net gmx.com mail.com outlook.com icloud.com".split(" "),
    defaultTopLevelDomains: "co.jp co.uk com net org info edu gov mil ca".split(" "),
    run: function(a) {
        a.domains = a.domains || Mailcheck.defaultDomains;
        a.topLevelDomains = a.topLevelDomains || Mailcheck.defaultTopLevelDomains;
        a.distanceFunction = a.distanceFunction || Mailcheck.sift3Distance;
        var b = function(a) { return a },
            c = a.suggested || b,
            b = a.empty || b;
        return (a = Mailcheck.suggest(Mailcheck.encodeEmail(a.email), a.domains, a.topLevelDomains, a.distanceFunction)) ? c(a) : b()
    },
    suggest: function(a, b, c, d) {
        a = a.toLowerCase();
        a = this.splitEmail(a);
        if (b = this.findClosestDomain(a.domain, b, d, this.domainThreshold)) { if (b != a.domain) return { address: a.address, domain: b, full: a.address + "@" + b } } else if (c = this.findClosestDomain(a.topLevelDomain, c, d, this.topLevelThreshold),
            a.domain && c && c != a.topLevelDomain) return d = a.domain, b = d.substring(0, d.lastIndexOf(a.topLevelDomain)) + c, { address: a.address, domain: b, full: a.address + "@" + b };
        return !1
    },
    findClosestDomain: function(a, b, c, d) { d = d || this.topLevelThreshold; var e, g = 99,
            f = null; if (!a || !b) return !1;
        c || (c = this.sift3Distance); for (var h = 0; h < b.length; h++) { if (a === b[h]) return a;
            e = c(a, b[h]);
            e < g && (g = e, f = b[h]) } return g <= d && null !== f ? f : !1 },
    sift3Distance: function(a, b) {
        if (null == a || 0 === a.length) return null == b || 0 === b.length ? 0 : b.length;
        if (null == b ||
            0 === b.length) return a.length;
        for (var c = 0, d = 0, e = 0, g = 0; c + d < a.length && c + e < b.length;) { if (a.charAt(c + d) == b.charAt(c + e)) g++;
            else
                for (var f = e = d = 0; 5 > f; f++) { if (c + f < a.length && a.charAt(c + f) == b.charAt(c)) { d = f; break } if (c + f < b.length && a.charAt(c) == b.charAt(c + f)) { e = f; break } }
            c++ }
        return (a.length + b.length) / 2 - g
    },
    splitEmail: function(a) {
        a = a.trim().split("@");
        if (2 > a.length) return !1;
        for (var b = 0; b < a.length; b++)
            if ("" === a[b]) return !1;
        var c = a.pop(),
            d = c.split("."),
            e = "";
        if (0 == d.length) return !1;
        if (1 == d.length) e = d[0];
        else {
            for (b =
                1; b < d.length; b++) e += d[b] + ".";
            2 <= d.length && (e = e.substring(0, e.length - 1))
        }
        return { topLevelDomain: e, domain: c, address: a.join("@") }
    },
    encodeEmail: function(a) { a = encodeURI(a); return a = a.replace("%20", " ").replace("%25", "%").replace("%5E", "^").replace("%60", "`").replace("%7B", "{").replace("%7C", "|").replace("%7D", "}") }
};
"undefined" !== typeof module && module.exports && (module.exports = Mailcheck);
"undefined" !== typeof window && window.jQuery && function(a) { a.fn.mailcheck = function(a) { var c = this; if (a.suggested) { var d = a.suggested;
            a.suggested = function(a) { d(c, a) } } if (a.empty) { var e = a.empty;
            a.empty = function() { e.call(null, c) } }
        a.email = this.val();
        Mailcheck.run(a) } }(jQuery);