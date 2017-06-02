document.addEventListener('DOMContentLoaded',function(){

    document.onmousemove = mouseMove;
    document.onmouseup = mouseUp;
    var dragObject = null;
    var mouseOffset = null;

    function getMouseOffset(target,ev){
        ev = ev || window.event;
        var docPos = getPosition(target);
        var mousePos = mouseCoords(ev);
        return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
    }

    function getPosition(e){
        var left = 0;
        var top = 0;
        while (e.offsetParent){
            left += e.offsetLeft;
            top += e.offsetTop;
            e = e.offsetParent;
        }
        left += e.offsetLeft;
        top += e.offsetTop;
        return {x:left, y:top};
    }

    function mouseMove(ev){
        ev = ev || window.event; //normal vs IE
        var mousePosition = mouseCoords(ev);
        console.log(mousePosition);
        if(dragObject){
            dragObject.style.position = 'absolute';
            dragObject.style.top = mousePosition.y - mouseOffset.y + 'px';
            dragObject.style.left = mousePosition.x - mouseOffset.x + 'px';
            return false;
        }
    }

    function mouseCoords(ev){
        if(ev.pageX || ev.pageY){
            return {x:ev.pageX, y:ev.pageY};
        }
        return {
            x:ev.clinetX + document.body.scrollLeft - document.body.clientLeft,
            y:ev.clientY + document.body.scrollTop - document.body.clientTop
        };
    }

    function mouseUp(ev){
        dragObject = null;
    }

    function makeDraggable(item){
        if(!item) return;
        item.onmousedown = function(ev){
            dragObject = this;
            mouseOffset = getMouseOffset(this,ev);
            console.log(dragObject);
            return false;
        }
    }

    var boxes = [...document.querySelectorAll('.draggable')];
    boxes.forEach(function(el){
        makeDraggable(el);
    });
});
