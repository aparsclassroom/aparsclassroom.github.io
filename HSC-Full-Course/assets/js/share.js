jQuery(document).ready(function (t) {
  (t.fn.myPluginShare = function () {
    var e,
      o,
      n,
      l,
      r = [],
      s = 3,
      i = 70,
      a = document.location.href,
      p = 0;
    (window.share_myplugin = { v: "3.0" }),
      (e = window.share_myplugin),
      (e.config = function () {}),
      (e.numFormat = function (t) {
        return (
          (n_format =
            t >= 1e3 && t < 1e6
              ? parseFloat(e.numFormat(t / 1e3, 2)).toFixed(2) + "K"
              : t >= 1e6 && t < 1e9
                ? parseFloat(e.numFormat(t / 1e6, 2)).toFixed(2) + "M"
                : t >= 1e9
                  ? parseFloat(e.numFormat(t / 1e9, 2)).toFixed(2) + "B"
                  : t),
          n_format
        );
      }),
      (e.boolean = function (t) {
        return "true" === t || 1 == t || "TRUE" === t || 1 === t;
      }),
      (e.mobileCheck = function () {
        var t,
          e = !1;
        return (
          (t = navigator.userAgent || navigator.vendor || window.opera),
          (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            t,
          ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
              t.substr(0, 4),
            )) &&
            (e = !0),
          e
        );
      }),
      (e.css = function (t) {
        var e, o;
        (e = document.getElementsByTagName("head")[0]),
          (o = document.createElement("style")).setAttribute(
            "type",
            "text/css",
          ),
          o.styleSheet
            ? (o.styleSheet.cssText = t)
            : o.appendChild(document.createTextNode(t)),
          e.appendChild(o);
      }),
      (e.js = function () {
        var t = document.createElement("script");
        (t.src = "https://www.googletagmanager.com/gtag/js?id=G-7R4CMSFEBN"),
          document.head.appendChild(t),
          (window.dataLayer = []),
          e.analytics(null);
      }),
      (e.analytics = function (t) {
        {
          function o() {
            dataLayer.push(arguments);
          }
        }
        o("js", new Date()),
          o("config", "UG-7R4CMSFEBN"),
          null != t &&
            (o("event", "event_name", {
              event_category: "Share Button",
              event_action: a,
              event_label: t,
            }),
            o("event", "share", {
              method: t,
              content_id: e.getUrl(),
              event_action: "share",
            }));
      }),
      (e.getWindowWidth = function () {
        return window.innerWidth;
      }),
      (e.getWindowHeight = function () {
        return window.innerHeight;
      }),
      (e.bu = function (t) {
        var e,
          o,
          n = [];
        for (e in t)
          null != (o = t[e]) && n.push(e + "=" + encodeURIComponent(o));
        return n.join("&");
      }),
      (e.getUrl = function () {
        return window.location;
      }),
      (e.getTitle = function () {
        var t, e, o, n, l, r, s, i, a;
        for (o = 0, l = (s = ["property", "name"]).length; o < l; o++)
          for (
            e = s[o], n = 0, r = (i = ["og:title", "twitter:title"]).length;
            n < r;
            n++
          )
            if (
              ((a = i[n]),
              (t = document.querySelector("meta[" + e + "='" + a + "']")))
            )
              return t.content;
        return document.title;
      }),
      (e.getDescription = function () {
        var t, e, o, n, l, r, s, i, a;
        for (o = 0, l = (s = ["property", "name"]).length; o < l; o++)
          for (
            e = s[o],
              n = 0,
              r = (i = [
                "og:description",
                "twitter:description",
                "description",
                "Description",
              ]).length;
            n < r;
            n++
          )
            if (
              ((a = i[n]),
              (t = document.querySelector("meta[" + e + "='" + a + "']")))
            )
              return t.content;
        return "";
      }),
      (e.getImage = function () {
        var t, e, o, n, l, r, s, i, a;
        for (o = 0, l = (s = ["property", "name"]).length; o < l; o++)
          for (
            e = s[o], n = 0, r = (i = ["og:image", "twitter:image"]).length;
            n < r;
            n++
          )
            if (
              ((a = i[n]),
              (t = document.querySelector("meta[" + e + "='" + a + "']")))
            )
              return t.content;
        return "";
      }),
      (e.shareLink = function (t, o) {
        var n = e.getUrl(),
          l = e.getTitle(),
          r = e.getImage(),
          s = e.getDescription();
        "" != o && (n = o);
        var i = /iPad|iPhone|iPod/.test(navigator.userAgent);
        /Android/i.test(navigator.userAgent);
        return {
          evernote: "http://www.evernote.com/clip.action?" + e.bu({ url: n }),
          facebook:
            "https://www.facebook.com/sharer.php?" + e.bu({ t: l, u: n }),
          linkedin:
            "https://www.linkedin.com/shareArticle?" +
            e.bu({ title: l, url: n }),
          messenger: "fb-messenger://share?" + e.bu({ link: n }),
          pinterest:
            "https://pinterest.com/pin/create/button/?" +
            e.bu({ description: l, media: r, url: n }),
          reddit: "https://reddit.com/submit?" + e.bu({ title: l, url: n }),
          skype: "https://web.skype.com/share?" + e.bu({ url: n }),
          sms: (i ? "sms:&body=" : "sms:?body=") + encodeURIComponent(n),
          telegram:
            "https://telegram.me/share/url?" + e.bu({ url: n, text: l }),
          twitter:
            "https://twitter.com/intent/tweet?" +
            e.bu({ text: l || s, url: n }),
          viber: "viber://forward?" + e.bu({ text: n }),
          whatsapp: e.mobile
            ? "whatsapp://send?" + e.bu({ text: n })
            : "http://whatsapp.com",
        }[t];
      }),
      (e.iconColor = function (t) {
        return {
          evernote: "#2DBE60",
          facebook: "#3B5998",
          linkedin: "#0077b5",
          messenger: "#448AFF",
          pinterest: "#CB2027",
          reddit: "#ff4500",
          skype: "#00AFF0",
          sms: "#ffbd00",
          telegram: "#2CA5E0",
          twitter: "#55acee",
          viber: "#7C529E",
          whatsapp: "#25d366",
        }[t];
      }),
      (e.icon = function (t) {
        return {
          evernote:
            "M16.988 11.388c-.324-.011-.637.009-.93.056.076-.662.346-1.475 1.324-1.444 1.068.038 1.219 1.054 1.219 1.74-.451-.201-1.023-.331-1.625-.352m4.59-7.199c-.18-.963-.754-1.435-1.264-1.621-.557-.201-1.686-.41-3.115-.578-1.145-.135-2.482-.123-3.295-.098-.09-.666-.555-1.275-1.082-1.486C11.426-.155 9.274-.02 8.721.135c-.437.123-.924.377-1.193.763-.182.258-.302.59-.302 1.053 0 .264 0 .882.015 1.43l.015 1.049c0 .49-.406.889-.902.889H4.096c-.481 0-.857.082-1.143.209-.286.128-.482.301-.632.503-.301.393-.362.905-.362 1.416 0 0 0 .405.105 1.218.075.617.752 4.981 1.399 6.306.256.512.421.723.903.947 1.098.467 3.596.979 4.754 1.129 1.174.15 1.912.451 2.348-.451 0-.016.076-.24.196-.572.376-1.158.421-2.166.421-2.904 0-.074.105-.074.105 0 0 .512-.105 2.363 1.279 2.859.541.195 1.686.361 2.844.497 1.039.12 1.807.526 1.807 3.22 0 1.625-.348 1.85-2.137 1.85-1.461 0-2.018.031-2.018-1.111 0-.934.918-.842 1.611-.842.301 0 .074-.227.074-.814 0-.572.346-.902.016-.918-2.379-.074-3.762 0-3.762 2.949 0 2.68 1.024 3.191 4.379 3.191 2.633 0 3.566-.092 4.648-3.463.211-.676.738-2.707 1.055-6.108.195-2.167-.197-8.683-.496-10.323m-17.558.497h2.271c.13 0 .236-.105.236-.241 0 0-.021-1.941-.021-2.482 0-.447.09-.828.256-1.156l.075-.15c-.009 0-.016 0-.024.016L2.362 4.983c-.01.006-.016.015-.016.024l.23-.113c.377-.174.842-.271 1.398-.271",
          facebook:
            "m13.03312,9.69242l3.66667,0l0,3.49633l-3.66667,0l0,8.11148l-3.66667,0l0,-8.11148l-3.66667,0l0,-3.49633l3.66667,0l0,-1.46846c0,-1.39853 0.44,-3.1467 1.32,-4.12567c0.95333,-0.90904 2.05333,-1.39853 3.44667,-1.39853l2.56667,0l0,3.49633l-2.56667,0c-0.66,0 -1.1,0.41956 -1.1,1.0489l0,2.44743z",
          linkedin:
            "m6.23173,20.69982l-3.93155,0l0,-13.13137l3.93155,0l0,13.13137zm14.46813,0l-3.93155,0l0,-6.99817c0,-1.88714 -0.70768,-2.75207 -1.96577,-2.75207c-1.0222,0 -1.65125,0.47178 -1.96576,1.49398l0,8.25627l-3.93155,0s0,-11.79465 0,-13.13137l3.06662,0l0.23589,2.59481l0.07862,0c0.78632,-1.25809 2.12303,-2.20168 3.85294,-2.20168c1.33671,0 2.43758,0.39316 3.30251,1.33672c0.78632,0.94359 1.2581,2.20168 1.2581,4.01018l0,7.39132l-0.00002,0l-0.00001,0.00001l-0.00001,0.00001l0,-0.00002l-0.00001,0.00001zm-14.38948,-16.43388c0,1.10083 -0.86493,1.96577 -2.04442,1.96577s-1.96576,-0.86493 -1.96576,-1.96577s0.86493,-1.96576 1.96576,-1.96576s2.04442,0.94359 2.04442,1.96576z",
          messenger:
            "M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.11S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z",
          pinterest:
            "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z",
          reddit:
            "M2.204 14.049c-.06.276-.091.56-.091.847 0 3.443 4.402 6.249 9.814 6.249 5.41 0 9.812-2.804 9.812-6.249 0-.274-.029-.546-.082-.809l-.015-.032c-.021-.055-.029-.11-.029-.165-.302-1.175-1.117-2.241-2.296-3.103-.045-.016-.088-.039-.126-.07-.026-.02-.045-.042-.067-.064-1.792-1.234-4.356-2.008-7.196-2.008-2.815 0-5.354.759-7.146 1.971-.014.018-.029.033-.049.049-.039.033-.084.06-.13.075-1.206.862-2.042 1.937-2.354 3.123 0 .058-.014.114-.037.171l-.008.015zm9.773 5.441c-1.794 0-3.057-.389-3.863-1.197-.173-.174-.173-.457 0-.632.176-.165.46-.165.635 0 .63.629 1.685.943 3.228.943 1.542 0 2.591-.3 3.219-.929.165-.164.45-.164.629 0 .165.18.165.465 0 .645-.809.808-2.065 1.198-3.862 1.198l.014-.028zm-3.606-7.573c-.914 0-1.677.765-1.677 1.677 0 .91.763 1.65 1.677 1.65s1.651-.74 1.651-1.65c0-.912-.739-1.677-1.651-1.677zm7.233 0c-.914 0-1.678.765-1.678 1.677 0 .91.764 1.65 1.678 1.65s1.651-.74 1.651-1.65c0-.912-.739-1.677-1.651-1.677zm4.548-1.595c1.037.833 1.8 1.821 2.189 2.904.45-.336.719-.864.719-1.449 0-1.002-.815-1.816-1.818-1.816-.399 0-.778.129-1.09.363v-.002zM2.711 9.963c-1.003 0-1.817.816-1.817 1.818 0 .543.239 1.048.644 1.389.401-1.079 1.172-2.053 2.213-2.876-.302-.21-.663-.329-1.039-.329v-.002zm9.217 12.079c-5.906 0-10.709-3.205-10.709-7.142 0-.275.023-.544.068-.809C.494 13.598 0 12.729 0 11.777c0-1.496 1.227-2.713 2.725-2.713.674 0 1.303.246 1.797.682 1.856-1.191 4.357-1.941 7.112-1.992l1.812-5.524.404.095s.016 0 .016.002l4.223.993c.344-.798 1.138-1.36 2.065-1.36 1.229 0 2.231 1.004 2.231 2.234 0 1.232-1.003 2.234-2.231 2.234s-2.23-1.004-2.23-2.23l-3.851-.912-1.467 4.477c2.65.105 5.047.854 6.844 2.021.494-.464 1.144-.719 1.833-.719 1.498 0 2.718 1.213 2.718 2.711 0 .987-.54 1.886-1.378 2.365.029.255.059.494.059.749-.015 3.938-4.806 7.143-10.72 7.143l-.034.009zm8.179-19.187c-.74 0-1.34.599-1.34 1.338 0 .738.6 1.34 1.34 1.34.732 0 1.33-.6 1.33-1.334 0-.733-.598-1.332-1.347-1.332l.017-.012z",
          skype:
            "M12.069 18.874c-4.023 0-5.82-1.979-5.82-3.464 0-.765.561-1.296 1.333-1.296 1.723 0 1.273 2.477 4.487 2.477 1.641 0 2.55-.895 2.55-1.811 0-.551-.269-1.16-1.354-1.429l-3.576-.895c-2.88-.724-3.403-2.286-3.403-3.751 0-3.047 2.861-4.191 5.549-4.191 2.471 0 5.393 1.373 5.393 3.199 0 .784-.688 1.24-1.453 1.24-1.469 0-1.198-2.037-4.164-2.037-1.469 0-2.292.664-2.292 1.617s1.153 1.258 2.157 1.487l2.637.587c2.891.649 3.624 2.346 3.624 3.944 0 2.476-1.902 4.324-5.722 4.324m11.084-4.882l-.029.135-.044-.24c.015.045.044.074.059.12.12-.675.181-1.363.181-2.052 0-1.529-.301-3.012-.898-4.42-.569-1.348-1.395-2.562-2.427-3.596-1.049-1.033-2.247-1.856-3.595-2.426-1.318-.631-2.801-.93-4.328-.93-.72 0-1.444.07-2.143.204l.119.06-.239-.033.119-.025C8.91.274 7.829 0 6.731 0c-1.789 0-3.47.698-4.736 1.967C.729 3.235.032 4.923.032 6.716c0 1.143.292 2.265.844 3.258l.02-.124.041.239-.06-.115c-.114.645-.172 1.299-.172 1.955 0 1.53.3 3.017.884 4.416.568 1.362 1.378 2.576 2.427 3.609 1.034 1.05 2.247 1.857 3.595 2.442 1.394.6 2.877.898 4.404.898.659 0 1.334-.06 1.977-.179l-.119-.062.24.046-.135.03c1.002.569 2.126.871 3.294.871 1.783 0 3.459-.69 4.733-1.963 1.259-1.259 1.962-2.951 1.962-4.749 0-1.138-.299-2.262-.853-3.266",
          sms: "m19.38346,14.90254c-1.68475,0 -2.61769,-1.12799 -2.61769,-1.12799l0.92359,-1.46839c0,0 0.81147,0.81691 1.71422,0.81691c0.36153,0 0.75253,-0.15437 0.75253,-0.62931c0,-0.93882 -3.23006,-0.90558 -3.23006,-3.33573c0,-1.45809 1.11334,-2.41906 2.53718,-2.41906c1.54603,0 2.30718,0.89449 2.30718,0.89449l-0.74175,1.58c0,0 -0.72234,-0.6958 -1.58484,-0.6958c-0.36081,0 -0.76259,0.17652 -0.76259,0.61823c0,0.99423 3.23006,0.81771 3.23006,3.31356c0,1.31482 -0.91282,2.45311 -2.52784,2.45311l0,0l0.00001,-0.00001zm-4.70781,-0.13379l-0.21993,-3.55658c-0.04025,-0.59685 0,-1.32511 0,-1.32511l-0.02085,0c0,0 -0.2415,0.828 -0.40106,1.32511l-0.75182,2.28688l-1.50507,0l-0.75253,-2.28688c-0.16028,-0.49711 -0.40106,-1.32511 -0.40106,-1.32511l-0.02013,0c0,0 0.04025,0.72826 0,1.32511l-0.21993,3.55658l-1.76597,0l0.59225,-7.89761l1.90541,0l1.04291,3.33573c0.161,0.50821 0.36081,1.30372 0.36081,1.30372l0.02084,0c0,0 0.20053,-0.79554 0.36081,-1.30372l1.04291,-3.33573l1.90612,0l0.58147,7.89761l-1.75519,0l0.00001,0zm-12.56303,0.13379c1.909,0 0.97607,-1.12799 0.97607,-1.12799l0.92287,-1.46839c0,0 0.81219,0.81691 1.71494,0.81691c0.36081,0 0.75253,-0.15437 0.75253,-0.62931c0,-0.93882 -3.23006,-0.90558 -3.23006,-3.33573c0,-1.45809 1.11334,-2.41906 2.53791,-2.41906c1.54387,0 2.30647,0.89449 2.30647,0.89449l-0.74247,1.58c0,0 -0.72162,-0.6958 -1.58413,-0.6958c-0.36153,0 -0.76259,0.17652 -0.76259,0.61823c0,0.99423 3.22934,0.81771 3.22934,3.31356c0,1.31482 -0.91209,2.45311 -2.52712,2.45311l0,0l-3.59375,0l-0.00002,-0.00001l0.00001,0zm5.22244,-13.90254l-4.04584,0c-1.25637,0 -2.28922,1.13829 -2.28922,2.54335l0,15.65511c0,1.39793 1.02494,2.54335 2.28922,2.54335l2.46172,0l1.31891,1.656c0.46072,0.52007 1.20175,0.5177 1.66032,0l1.31891,-1.656l11.661,0c1.25637,0 2.28993,-1.13908 2.28993,-2.54335l0,-15.65511c0,-1.39873 -1.02493,-2.54335 -2.28993,-2.54335l0,0l-14.375,0l-0.00001,0l-0.00001,0z",
          telegram:
            "M9.403 15.213l8.89 6.568c1.015.56 1.748.271 2-.942l3.62-17.053c.372-1.487-.564-2.159-1.534-1.72L1.125 10.263c-1.45.582-1.443 1.392-.264 1.753l5.455 1.7L18.94 5.753c.595-.36 1.143-.167.694.232",
          twitter:
            "M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z",
          viber:
            "M20.812 2.343c-.596-.549-3.006-2.3-8.376-2.325 0 0-6.331-.38-9.415 2.451C1.302 4.189.698 6.698.634 9.82.569 12.934.487 18.774 6.12 20.36h.005l-.005 2.416s-.034.979.609 1.178c.779.24 1.236-.504 1.98-1.303.409-.439.972-1.088 1.397-1.582 3.851.322 6.813-.416 7.149-.525.777-.254 5.176-.816 5.893-6.658.738-6.021-.357-9.83-2.338-11.547v.004zm.652 11.112c-.615 4.876-4.184 5.187-4.83 5.396-.285.092-2.895.738-6.164.525 0 0-2.445 2.941-3.195 3.705-.121.121-.271.166-.361.145-.135-.029-.164-.18-.164-.404l.015-4.006c-.015 0 0 0 0 0-4.771-1.336-4.485-6.301-4.425-8.91.044-2.596.538-4.726 1.994-6.167 2.611-2.371 7.997-2.012 7.997-2.012 4.543.016 6.721 1.385 7.223 1.846 1.674 1.432 2.529 4.865 1.904 9.893l.006-.011zM7.741 4.983c.242 0 .459.109.629.311.004.002.58.695.83 1.034.235.32.551.83.711 1.115.285.51.104 1.032-.172 1.248l-.566.45c-.285.229-.25.653-.25.653s.84 3.157 3.959 3.953c0 0 .426.039.654-.246l.451-.569c.213-.285.734-.465 1.244-.181.285.15.795.466 1.116.704.339.24 1.032.826 1.036.826.33.271.404.689.18 1.109v.016c-.23.405-.541.78-.934 1.141h-.008c-.314.27-.629.42-.944.449-.03 0-.075.016-.136 0-.135 0-.27-.029-.404-.061v-.014c-.48-.135-1.275-.48-2.596-1.216-.855-.479-1.574-.96-2.189-1.455-.315-.255-.645-.54-.976-.87l-.076-.028-.03-.03-.029-.029c-.331-.33-.615-.66-.871-.98-.48-.609-.96-1.327-1.439-2.189-.735-1.32-1.08-2.115-1.215-2.596H5.7c-.045-.134-.075-.269-.06-.404-.015-.061 0-.105 0-.141.03-.299.189-.614.458-.944h.005c.355-.39.738-.704 1.146-.933.164-.091.329-.135.479-.135h.016l-.003.012zm4.095-.683h.116l.076.002h.02l.089.005h.511l.135.015h.074l.15.016h.03l.104.015h.016l.074.015c.046 0 .076.016.105.016h.091l.075.029.06.016.06.015.03.015h.045l.046.016h.029l.074.016.045.014.046.016.06.016.03.014c.03 0 .06.016.091.016l.044.015.046.016.119.044.061.031.135.06.045.015.045.016.09.045.061.015.029.015.076.031.029.014.061.031.045.014.045.03.059.03.046.029.03.016.061.03.044.03.075.045.045.016.074.044.016.015.045.031.09.074.046.03.044.03.031.014.045.031.074.074.061.045.045.03.016.015.029.016.074.061.046.044.03.03.045.029.045.031.029.015.12.12.06.061.135.135.031.029c.016.016.045.045.061.075l.029.03.166.194.045.06c.014.016.014.031.029.031l.09.135.045.045.09.12.076.12.045.09.059.105.045.09.016.029.029.061.076.15.074.149.031.075c.059.135.104.27.164.42.074.195.135.404.18.63.045.165.076.315.105.48l.029.27.045.3c.016.121.031.256.031.375.014.121.014.24.014.359v.256c0 .016-.006.029-.014.045-.016.03-.031.045-.061.075-.021.015-.049.046-.08.046-.029.014-.059.014-.09.014h-.045c-.029 0-.059-.014-.09-.029-.029-.016-.061-.03-.074-.061-.016-.029-.045-.061-.061-.09s-.031-.06-.031-.09v-.359c-.014-.209-.029-.425-.059-.639-.016-.146-.045-.284-.061-.42 0-.074-.016-.146-.029-.209l-.029-.15-.038-.141-.016-.09-.045-.15c-.029-.12-.074-.24-.119-.36-.029-.091-.061-.165-.105-.239l-.029-.076-.135-.27-.031-.045c-.061-.135-.135-.27-.225-.391l-.045-.074h-.201l-.064-.091c-.055-.089-.114-.165-.18-.239l-.125-.15-.015-.016-.046-.057-.035-.045-.075-.074-.015-.03-.07-.06-.045-.046-.083-.075-.04-.037-.046-.045-.015-.016c-.016-.015-.045-.045-.075-.06l-.076-.062-.03-.015-.061-.046-.074-.06-.045-.036-.03-.016-.06-.053c0-.016-.016-.016-.031-.016l-.029-.029-.015-.016v-.013l-.03-.014-.061-.037-.044-.031-.075-.045-.06-.045-.029-.016-.032-.013h-.09l-.019-.016-.065-.035-.009-.014-.03-.016-.045-.021h-.012l-.045-.016-.025-.015-.045-.015-.01-.011-.03-.016-.053-.029-.03-.015-.09-.03-.074-.029-.137-.016-.044-.029c-.015-.01-.03-.016-.046-.016l-.029-.015c-.029-.011-.045-.016-.075-.03l-.03-.016h-.029l-.061-.029-.029-.016-.045-.015h-.092c-.008 0-.019-.005-.03-.007h-.09l-.045-.016h-.015l-.045-.016h-.041c-.025-.014-.045-.014-.07-.014l-.01-.016-.06-.015c-.03-.016-.056-.016-.084-.016l-.045-.015-.05-.016-.045-.014-.061-.016h-.061l-.179-.022h-.09l-.116-.015h-.076l-.068-.008h-.03l-.054-.016h-.285l-.01-.015h-.061c-.03 0-.064-.015-.09-.03-.03-.016-.061-.029-.081-.06l-.03-.046c-.029-.029-.029-.06-.045-.09-.014-.028-.014-.059-.014-.089s0-.06.015-.09c.016-.029.029-.06.061-.075.015-.03.044-.044.074-.06.029-.016.061-.03.09-.03h.061l.015.066zm.554 1.574l.037.003.061.006c.008 0 .018 0 .029.003.022 0 .045.004.075.006l.06.008.024.016.045.015.048.015.045.016h.03l.042.015.07.015.056.016.026.014h.073l.119.028.046.015.045.015.045.016s.015 0 .015.015l.046.015.044.016.045.016c.015 0 .03.014.046.014.007 0 .014.016.025.016l.064.03h.029l.09.03.05.029.046.03.108.045.06.015.031.031c.045.014.09.044.135.059l.048.03.048.03.049.029c.045.03.082.046.121.076l.029.014.041.031.022.015.075.045.037.03.065.043.029.015.03.015.046.03.06.046c.015.014.022.014.034.029.01.015.016.015.025.03l.033.03.036.029.03.03.046.046.029.03.016.016.09.089.016.016c0 .015.015.03.029.03l.016.013.045.046.029.045.03.03.045.06.046.046.09.119.014.029.061.076.016.029.015.031.015.029.016.03c.016.015.016.03.029.06l.043.076.016.015.029.061.031.044c.014.015.014.029.029.045l.03.045.03.061.029.059.016.046c.015.044.045.075.06.12 0 .015.015.029.015.045l.045.119.061.195c0 .016.015.045.015.061l.046.135.044.18.046.24c.014.074.014.135.029.211.016.119.03.238.03.359l.015.21v.165c0 .016 0 .029-.015.045l-.044.043c-.029.023-.045.045-.074.061-.03.015-.061.029-.09.04-.031.016-.075.016-.105.016-.029 0-.061-.016-.09-.03-.016 0-.03-.016-.045-.021-.031-.014-.061-.039-.075-.065-.03-.03-.046-.06-.046-.091l-.014-.044v-.313c0-.133-.016-.256-.031-.385-.015-.135-.044-.285-.074-.42-.029-.09-.045-.18-.075-.26l-.03-.091-.029-.075-.016-.03-.045-.12-.045-.09-.075-.149-.069-.12v-.019l-.029-.047-.03-.038-.045-.075-.046-.061-.089-.119c-.046-.061-.09-.12-.142-.178-.014-.015-.029-.029-.029-.045l-.03-.029-.017-.016-.03-.014-.03-.027v-.146l-.119-.113-.075-.068v-.014l-.03-.031-.038-.029-.015-.016c0-.015-.016-.015-.029-.015l-.046-.016-.015-.015-.061-.045-.014-.016-.016-.015c-.012-.015-.023-.015-.03-.015l-.06-.045-.016-.016-.06-.029-.011-.016-.045-.029-.03-.016-.03-.029-.029-.031h-.016c-.029-.029-.06-.044-.105-.06l-.044-.03-.03-.014-.016-.016-.045-.03-.044-.015-.06-.03-.046-.015-.015-.016-.056-.014v-.012l-.091-.03-.06-.03-.03-.015h-.06c-.03-.015-.045-.015-.075-.03H13.2l-.045-.016h-.044l-.046-.014-.029-.016h-.061l-.061-.015-.029-.016h-.165l-.069-.015H12.3l-.046-.016c-.029-.014-.06-.029-.09-.06-.014-.03-.045-.06-.06-.089-.015-.031-.03-.061-.03-.091v-.09c.006-.046.016-.075.03-.105.008-.015.015-.03.03-.045.018-.03.045-.06.075-.075.015-.015.03-.015.044-.029.031-.016.061-.016.091-.016h.06l-.014.055zm.454 1.629c.015 0 .03 0 .044.004.016 0 .031 0 .046.002l.052.005c.104.009.213.024.318.046l.104.023.026.008.114.029.059.02.046.016c.045.014.091.045.135.06l.016.015.06.03.09.046.029.014c.016.016.031.016.046.03.015.016.045.03.06.045.061.03.105.075.15.105l.105.09.09.091.061.074.029.029.03.031.044.06.091.135.075.135.06.12.046.105c.044.104.06.195.09.299.029.091.045.196.06.285l.015.15.016.136V9.8c0 .045-.016.075-.03.105-.015.029-.046.074-.075.09-.03.029-.061.045-.105.061-.029.014-.06.014-.09.014-.029 0-.06 0-.09-.014l-.104-.046c-.03-.03-.06-.045-.091-.091-.015-.029-.029-.06-.045-.104v-.166l-.015-.105-.015-.119-.016-.105-.016-.06c0-.015-.014-.045-.014-.06-.03-.121-.09-.24-.15-.36l-.061-.06-.047-.06-.045-.045-.015-.03-.075-.06-.061-.061-.059-.045c-.016-.015-.03-.015-.061-.029l-.09-.061-.061-.03-.029-.015h-.016l-.076-.031-.09-.03-.09-.015h-.075l-.044-.015-.035-.007h-.045l-.06-.016h-.255l-.015-.075h-.039c-.03-.004-.055-.015-.08-.029-.035-.021-.064-.045-.09-.08-.018-.029-.034-.061-.045-.09-.008-.029-.012-.06-.012-.09 0-.037 0-.075.015-.113.015-.039.03-.07.06-.1l.061-.045c.029-.016.061-.03.09-.03l.062-.075h.032z",
          whatsapp:
            "M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411",
        }[t];
      }),
      (e.allShare = function () {
        return (share = {
          evernote: "Evernote",
          facebook: "Facebook",
          linkedin: "LinkedIn",
          messenger: "Messenger",
          pinterest: "Pinterest",
          telegram: "Telegram",
          reddit: "Reddit",
          skype: "Skype",
          sms: "SMS",
          twitter: "Twitter",
          viber: "Viber",
          whatsapp: "WhatsApp",
        });
      }),
      (e.allMobileShare = function () {
        return (share = {
          messenger: "Messenger",
          skype: "Skype",
          sms: "SMS",
          viber: "Viber",
          whatsapp: "WhatsApp",
        });
      }),
      (e.allDesktopShare = function () {
        return (share = {
          facebook: "Facebook",
          messenger: "Messenger",
          evernote: "Evernote",
          pinterest: "Pinterest",
          reddit: "Reddit",
          twitter: "Twitter",
        });
      }),
      (e.allRegularShare = function () {
        return (share = l
          ? {
              facebook: "Facebook",
              twitter: "Twitter",
              linkedin: "LinkedIn",
              sms: "SMS",
              messenger: "Messenger",
              viber: "Viber",
              whatsapp: "WhatsApp",
            }
          : {
              facebook: "Facebook",
              messenger: "Messenger",
              linkedin: "LinkedIn",
              pinterest: "Pinterest",
            });
      }),
      (e.loadShare = function (t) {
        var o,
          n,
          l = "";
        for (o in (n =
          "mobile" == t
            ? e.allMobileShare()
            : "desktop" == t
              ? e.allDesktopShare()
              : e.allShare()))
          (l += '<span class="smp-but" data-network="' + o + '">'),
            (l +=
              '<svg fill="#fff" height="20px" width="20px" viewBox="0 0 24 24"><g><path d="'),
            (l += e.icon(o)),
            (l += '"></g></svg>'),
            (l += '<span class="social-media">'),
            (l += n[o]),
            (l += "</span>"),
            (l += "</span>");
        return l;
      }),
      (e.popupFooter = function () {
        return (
          l && "mobile",
          '<div class="smp-popup-footer"><a class="smp-link" href="https://www.facebook.com/AparsClassroom/" target="_blank"><img class="smp-popup-logo" src="https://aparsclassroom.com/HSC-Full-Course/assets/images/1.png"></a><a href="https://storymodelearning.com/about.html#mridul" class="smp-more-media" target="_blank">&copy; 2021 Apar\'s Classroom</a><span class="smp-popup-close">Close</span></div>'
        );
      }),
      (e.popup = function (t) {
        r.push('<div class="smp-overlay">'),
          r.push('<div class="smp-popup">'),
          r.push('<div class="smp-but-group">'),
          r.push('<span class="smp-but-set">'),
          r.push(e.loadShare(t)),
          r.push("</span>"),
          r.push("</div>"),
          r.push("</div>"),
          r.push(e.popupFooter()),
          r.push("</div>");
      }),
      (e.regularShare = function (t, o, n, l, r, s, i) {
        var a,
          p = "",
          c = "",
          u = "",
          m = "",
          d = e.allRegularShare();
        for (a in ("round" === l &&
          ("sticky-right" === r || "sticky-left" === r) &&
          (m = " smp-sticky-round"),
        "sticky-right" === r
          ? ((u = " smp-sticky" + m), (s = 'style="right:' + s + '"'))
          : "sticky-left" === r
            ? ((u = " smp-sticky" + m), (s = 'style="left:' + s + '"'))
            : (s = ""),
        (p += '<div class="smp-regular-but' + u + '" ' + s + ">"),
        "" === m &&
          t &&
          (p +=
            '<span class="smp-but smp-total-count"><span class="smp-total-count-data" data="0">0</span><span class="smp-total-count-title">Shares</span></span>'),
        d)) {
          "round" === l && (c = " smp-round-but");
          var h = "";
          "" != i && (h = 'data-url="' + i + '"'),
            (p +=
              '<span class="smp-but' +
              c +
              '" data-network="' +
              a +
              '" ' +
              h +
              ">"),
            (p +=
              '<svg fill="#fff" height="20px" width="20px" viewBox="0 0 24 24"><g><path d="'),
            (p += e.icon(a)),
            (p += '"></g></svg>'),
            (o || n) &&
              "square" === l &&
              ((p += '<span class="social-media'),
              o && (p += " share-count"),
              (p += '">'),
              o && (p += "0"),
              n && !o && (p += d[a]),
              (p += "</span>")),
            (p += "</span>");
        }
        return (
          "" == h &&
            ((p += '<span class="smp-more' + c + '">'),
            (p +=
              '<svg fill="#fff" height="20px" width="35px" viewBox="0 0 30 35">'),
            (p +=
              '<g><circle id="svg_3" r="4.19482" cy="12.65101" cx="4.58682"/><circle id="svg_4" r="4.19482" cy="12.65101" cx="16.48597"/>                <circle id="svg_5" r="4.19601" cy="12.65101" cx="28.42299"/></g>'),
            (p += "</svg>"),
            (p += "</span>")),
          (p += "</div>")
        );
      }),
      (e.buildStyle = function () {
        var t = [];
        t.push(
          ".my-plugin-share *{ font-family: Verdana; font-size: 12px; box-sizing: border-box !important; display:inline-block; line-height:16px}",
        ),
          t.push(
            ".smp-overlay{ position: fixed; left: 0; right: 0; top:0; bottom: 0; background: rgba(0,0,0,0.7); display:none; z-index:9999999}",
          ),
          t.push(
            ".smp-popup{ position: absolute; left: 0; right: 0; top:0; bottom:0; margin: 75px auto auto auto;  text-align: center; background-color:#FFFFFF; border-radius:5px; overflow:hidden}",
          ),
          t.push(
            "span.smp-but{ width: 140px; height: 40px; border-radius: 3px; margin: 3px; padding: 10px; cursor: pointer; display: inline-block; color: #FFF; text-align: left}",
          ),
          t.push("span.smp-but>svg{ float: left; margin: 0px}"),
          t.push(
            "span.smp-but>span.social-media{ margin: 2px 0px 2px 7px; display: inline-block}",
          ),
          t.push(".smp-regular-but>span{ float:left}"),
          t.push(
            ".smp-regular-but>span.smp-but{ width:auto; padding:7px 10px; height:35px}",
          ),
          t.push(
            ".smp-regular-but>span.smp-but>span.social-media{ margin: 3px 0px 3px 10px}",
          ),
          t.push(
            ".smp-regular-but>span.smp-total-count{ background-color:#FFF; color:#333; padding:3px 5px}",
          ),
          t.push(
            ".smp-regular-but>span.smp-total-count>span{ display:block; text-align:center}",
          ),
          t.push(
            ".smp-regular-but>span.smp-total-count>span.smp-total-count-data{ font-size:14px}",
          ),
          t.push(
            ".smp-regular-but>span.smp-total-count>span.smp-total-count-title{ font-size:11px}",
          ),
          t.push(
            ".smp-regular-but>span.smp-round-but{ width:auto; height:auto; padding:7px; border-radius:50%}",
          ),
          t.push(
            ".smp-regular-but>span.smp-more{ height: 35px; padding: 10px 5px; background: #247a02; margin: 3px; display:inline-block; cursor: pointer; border-radius:3px}",
          ),
          t.push(
            ".smp-regular-but>span.smp-more.smp-round-but{ padding:10px 0 !important; border-radius:50%}",
          ),
          t.push(".smp-sticky{ width:60px; position:fixed}"),
          t.push(
            ".smp-sticky>span,.smp-sticky>span>svg{ width:100% !important; margin:0px !important; border-radius:0}",
          ),
          t.push(
            ".smp-sticky>span{ height:auto !important; padding:15px 10px !important}",
          ),
          t.push(
            ".smp-sticky>span.smp-total-count{ padding:10px 1px !important}",
          ),
          t.push(
            ".smp-sticky>span.smp-total-count>span.smp-total-count-data{ font-size:12px}",
          ),
          t.push(
            ".smp-sticky>span.smp-total-count>span.smp-total-count-title{ font-size:10px}",
          ),
          t.push(
            ".smp-sticky>.smp-more{ padding:18px 10px 12px 10px !important; border-radius:0 !important}",
          ),
          t.push(".smp-sticky-round{ width:50px !important}"),
          t.push(
            ".smp-sticky-round>span.smp-round-but{width: 40px !important; height: 40px !important; padding: 10px !important; border-radius: 50%; margin: 3px !important;}",
          ),
          t.push(
            ".smp-sticky-round>span.smp-more.smp-round-but{ padding:13px 0px !important; border-radius:50% !important}",
          );
        var o = e.allShare();
        for (share in o)
          t.push(
            'span.smp-but[data-network="' +
              share +
              '"]{background-color:' +
              e.iconColor(share) +
              "}",
          );
        t.push(
          ".smp-popup-footer{ height:" +
            i +
            "px; width:100%; padding:15px; position:absolute; left:0; right:0; bottom:0; text-align:center; background-color:rgba(0,0,0,0.9)}",
        ),
          t.push(".smp-popup-footer>.smp-link{height:100%; float:left}"),
          t.push(".smp-popup-logo{ height:100%}"),
          t.push(".smp-more-media{ margin-top:5px; color:#FFF}"),
          t.push(".smp-more-media:hover{ text-decoration:none; color:#FFF}"),
          t.push(
            ".smp-popup-close{ color: #FFF; border: 1px solid #fff; border-radius: 5px; padding: 7px; width: 55px; height: 30px; cursor:pointer; float:right}",
          ),
          e.css(t.join(""));
      }),
      (e.totalCount = function (t) {
        var o;
        o = document.querySelectorAll(".smp-total-count-data");
        for (var n = 0; n < o.length; n++)
          (newVaule = parseInt(o[n].getAttribute("data")) + parseInt(t)),
            o[n].setAttribute("data", newVaule),
            (o[n].innerHTML = e.numFormat(newVaule));
      }),
      (e.show = function () {
        for (
          var t = document.querySelectorAll(".my-plugin-share"), o = 0;
          o < t.length;
          o++
        ) {
          p = 1;
          var n = t[o],
            s = "",
            i = !0,
            a = !1,
            c = !0,
            u = "square",
            m = "inline",
            d = 0;
          l && (c = !1),
            null != n.getAttribute("show-total") &&
              (i = e.boolean(n.getAttribute("show-total"))),
            null != n.getAttribute("show-count") &&
              (a = e.boolean(n.getAttribute("show-count"))),
            null != n.getAttribute("show-title") &&
              (c = e.boolean(n.getAttribute("show-title"))),
            "round" == n.getAttribute("button-type") && (u = "round"),
            "sticky-right" == n.getAttribute("display")
              ? (m = "sticky-right")
              : "sticky-left" == n.getAttribute("display") &&
                (m = "sticky-left"),
            null != n.getAttribute("sticky-position") &&
              (d = n.getAttribute("sticky-position")),
            null != n.getAttribute("share-url")
              ? ((s = n.getAttribute("share-url")), (i = !1), (a = !1))
              : (s = "");
          var h = e.regularShare(i, a, c, u, m, d, s);
          o == t.length - 1
            ? (n.innerHTML = h + r.join(""))
            : (n.innerHTML = h);
        }
      }),
      (e.resize = function () {
        e.getWindowWidth() < 640 ? ((s = 2), (i = 50)) : ((s = 3), (i = 70));
        var t = document.querySelector(".smp-but-group");
        (t = t.querySelectorAll(".smp-but")),
          (o = 140 * s + 3 * s * 2),
          (n = (t.length / s) * 40 + (t.length / s) * 3 * 2);
        var l = document.querySelector(".smp-popup"),
          r = document.querySelector(".smp-popup-footer"),
          a = document.querySelector(".smp-popup-close");
        (r.style.height = i + "px"),
          e.getWindowWidth() < 640
            ? ((r.style.padding = "10px"),
              (a.style.marginBottom = "1px"),
              (a.style.marginTop = "1px"))
            : ((r.style.padding = "15px"),
              (a.style.marginBottom = "6px"),
              (a.style.marginTop = "6px")),
          (l.style.overflow = "hidden"),
          n - (30 + i) > e.getWindowHeight() &&
            ((n = e.getWindowHeight() - (60 + i) + "px"),
            (l.style.overflowY = "scroll")),
          (l.style.width = o + "px"),
          (l.style.height = n + "px");
        for (
          var p = document.querySelectorAll(".smp-sticky"), c = 0;
          c < p.length;
          c++
        )
          p[c].offsetHeight < e.getWindowHeight()
            ? (p[c].style.top =
                (e.getWindowHeight() - p[c].offsetHeight) / 2 + "px")
            : (p[c].style.top = "0px");
      }),
      (e.onShareClick = function () {
        for (
          var t = document.querySelectorAll(".smp-but"), o = 0;
          o < t.length;
          o++
        )
          t[o].addEventListener("click", function () {
            var t = this.getAttribute("data-network");
            e.analytics(t);
            var o = "";
            null != this.getAttribute("data-url") &&
              (o = this.getAttribute("data-url"));
            var n = e.shareLink(t, o);
            window.open(
              n,
              "My Plugin",
              "width=700,height=500,toolbar=0,menubar=0,location=0",
            );
          });
        t = document.querySelectorAll(".smp-more");
        for (o = 0; o < t.length; o++)
          t[o].addEventListener("click", function () {
            document.querySelector(".smp-overlay").style.display = "block";
          });
        t = document.querySelectorAll(".smp-popup-close");
        for (o = 0; o < t.length; o++)
          document
            .querySelector(".smp-popup-close")
            .addEventListener("click", function () {
              document.querySelector(".smp-overlay").style.display = "none";
            });
        t = document.querySelectorAll(".smp-overlay");
        for (o = 0; o < t.length; o++)
          t[o].addEventListener("click", function () {
            document.querySelector(".smp-overlay").style.display = "none";
          });
      }),
      (e.initialize = function () {
        (l = e.mobileCheck()),
          e.popup("desktop"),
          e.show(),
          1 == p && (e.onShareClick(), e.buildStyle(), e.resize());
      }),
      e.js(),
      e.initialize(),
      window.addEventListener("resize", function (t) {
        1 == p && e.resize();
      }),
      t.ajax({});
  }),
    t("body").myPluginShare();
});
