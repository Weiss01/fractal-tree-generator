var myCanvas;
var initialLength = 750;
var limit = 4;
var angle = 4;
var childRatio = 0.67;

$('body').on('click', 'a', function(){
    location.reload();
})

function cleanup() {
    exists('jumbo') ? $('#jumbo').remove() : {};
    exists('navbar') ? $('#navbar').remove() : {};
}

function getInput() {
    initialLength = $('#initialLength').val();
    limit = $('#limit').val();
    angle = $('#angle').val();
    childRatio = $('#childRatio').val();
}

$('.jumbotron').on('click', '#generate', function(){
    getInput();
    cleanup();
    $('<div/>', {id: 'window'}).appendTo('body');
    var myp5 = new p5(sketch);
})

function exists(id) {if (document.getElementById(id) === null) {return false;} else {return true;}}

var sketch = function (p) {
    p.setup = function () {
        myCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
        myCanvas.parent('window');
    }

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

    p.draw = function () {
        p.background(5);
        p.stroke(255); // white borders
        p.translate(p.windowWidth / 2, p.height); // start tree at middle bottom
        p.branch(initialLength)
    }

    p.branch = function (length) {
        p.line(0, 0, 0, -length);
        p.translate(0, -length);
        if (length > limit) {
            p.push()
            p.rotate(angle)
            p.branch(length * childRatio)
            p.pop()
            p.push()
            p.rotate(-angle)
            p.branch(length * childRatio)
            p.pop()
        }
    }
}
