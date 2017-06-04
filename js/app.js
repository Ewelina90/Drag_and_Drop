document.addEventListener('DOMContentLoaded',function(){

    document.onmousemove = mouseMove;
    document.onmouseup = mouseUp;
    var dragObject = null;
    var mouseOffset = null;

    function biggestZIndex(){
        var boxes = [...document.querySelectorAll('.draggable')];
        var zIndexes = boxes.map(function(el){
            return el.style.zIndex;
        });
        // console.log(zIndexes);
        var biggestZIndex = zIndexes.sort(function(a,b){
            return b-a;
        })
        // console.log('bi'+biggestZIndex[0]);
        return biggestZIndex[0];
    }

    var zIndex = biggestZIndex();
    // console.log('z'+zIndex);

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
        // console.log(mousePosition);
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

    function makeDraggable(item){
        if(!item) return;
        item.onmousedown = function(ev){
            dragObject = this;
            dragObject.style.zIndex = zIndex++;
            mouseOffset = getMouseOffset(this,ev);
            // console.log(dragObject);
            return false;
        }
    }

    var dropTargets = [];
    function addDropTarget(dropTarget){
        dropTargets.push(dropTarget);
    }

    function mouseUp(ev){
        ev = ev || window.event;
        var mousePosition = mouseCoords(ev);
        addDropTarget(mousePosition);
        for(var i = 0; i<dropTargets.length; i++){
            var currentTarget = dropTargets[i];
            // console.log(currentTarget);
            var targPosition = getPosition(currentTarget);
            var targWidth = parseInt(currentTarget.offsetWidth);
            var targHeight = parseInt(currentTarget.offsetHeight);
            if(
                (mousePosition.x > targPosition.x) &&
                (mousePosition.x < (targPosition.x + targWidth)) &&
                (mousePosition.y > targPosition.y) &&
                (mousePosition.y < (targPosition.y + targHeight)))
                {
                    console.log(targPosition);
                }
        }
        dragObject.style.zIndex = biggestZIndex;
        dragObject = null;
    }

    var boxes = [...document.querySelectorAll('.draggable')];
    boxes.forEach(function(el){
        makeDraggable(el);
    });
});
