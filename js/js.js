window.onload = function(){
    getreq();
    document.getElementById("main").style.display = "";
    var h = window.innerHeight;
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop:$(hash).offset().top
            }, 2000, 'easeInOutQuint');
        }
    });
}
function min(id) {
    var child = document.getElementById(id);
    child.classList.remove("mdl-shadow--2dp");
    child.classList.add("mdl-shadow--12dp");
    child.children[1].style.background = "rgba(0, 0, 0, 0.8)"
}
function mout(id) {
    var child = document.getElementById(id);
    child.classList.remove("mdl-shadow--12dp");
    child.classList.add("mdl-shadow--2dp");
    child.children[1].style.background = "rgba(0, 0, 0, 0.2)"
}

function corsreq(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

function getreq() {
    var req = corsreq("get", "https://blockchain.info/q/getblockcount");
    if (req) {
        req.onload = function() {
            var distance = req.responseText;
            document.getElementById("clock").innerHTML = distance;
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("ct").style.display = "none";
                document.getElementById("ct1").style.display = "";
            }
        };
        req.send();
    }
}
var x = setInterval(function() {
    getreq();
}, 60000);