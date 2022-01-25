document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        setTimeout(() => {
            var navs = document.querySelectorAll('div.time-tabs');

            navs.forEach((nav) => {
                var line = document.createElement('div');
                line.classList.add('line');
                nav.appendChild(line);
            
                var pos = 0;
                var wid = 0;
    
                setUnderLine(nav, line, pos, wid);

                window.onresize = function () {
                    setUnderLine(nav, line, pos, wid);
                };
            });
        }, 100);
    }
}

function setUnderLine(nav, line, pos, wid) {
    var active = nav.querySelectorAll('li.active');

    if (!!active) {
        pos = active[0].getBoundingClientRect().left;
        wid = active[0].getBoundingClientRect().width
        line.style.left = active[0].offsetLeft + 'px';
        line.style.width = wid + 'px';
    }

    nav.querySelectorAll('a.nav-link').forEach((element) => {
        element.onclick = function (e) {
            e.preventDefault();
            if (!this.parentElement.classList.contains('active') &&
            !nav.classList.contains('animate')) {
                nav.classList.add('animate');
    
                var _this = this;
    
                nav.querySelectorAll('li.nav-item').forEach((e) => e.classList.remove('active'));
    
                try {
                    var position = _this.parentElement.getBoundingClientRect();
                    var width = position.width;
    
                    if (position.x >= pos) {
                        line.style.width = position.x - pos + width + 'px';
                        setTimeout(() => {
                            line.style.left = _this.parentElement.offsetLeft + 'px';
                            line.style.width = width + 'px';
                            line.style.transitionDuration = '150ms';
                            setTimeout(() => nav.classList.remove('animate'), 150);
                            _this.parentElement.classList.add('active');
                        }, 300);
                    } else {
                        line.style.width = pos - position.left + wid + 'px';
                        line.style.left = _this.parentElement.offsetLeft + 'px';
                        setTimeout(() => {
                            line.style.width = width + 'px';
                            line.style.transitionDuration = '150ms';
                            setTimeout(() => nav.classList.remove('animate'), 150);
                            _this.parentElement.classList.add('active');
                        }, 300);
                    }
                } catch (error) { }
    
                pos = position.left;
                wid = width;
            }
        }
    });
}