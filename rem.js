(function () {
    var tid;
    function setRem() {
        var ua = window.navigator.userAgent;
        var docEl = document.documentElement;
        var html = document.querySelector('html');
        var isAndorid = /Android/i.test(ua);
        var dpr = window.devicePixelRatio || 1;
        var rem = docEl.clientWidth / 7.5;
        // 设置 rem 基准值
        html.style.fontSize = rem + 'px';
        // Nexus 5 上 rem 值不准，
        // 如：设置100px，getComputedStyle 中的值却为 85px，导致页面错乱
        // 这时需要检查设置的值和计算后的值是否一样，
        // 不一样的话重新设置正确的值
        var getCPTStyle = window.getComputedStyle;
        var fontSize = parseFloat(html.style.fontSize, 10);
        var computedFontSize = parseFloat(getCPTStyle(html)['font-size'], 10);
        if (getCPTStyle && Math.abs(fontSize - computedFontSize) >= 1) {
            html.style.fontSize = fontSize * (fontSize / computedFontSize) + 'px';
        }
        // 设置 data-dpr 属性，留作的 css hack 之用
        html.setAttribute('data-dpr', dpr);
        // 安卓平台额外加上标记类
        if (isAndorid) {
            html.setAttribute('data-platform', 'android');
        }
    }

    setRem();
    window.addEventListener("resize", function() {
        clearTimeout(tid); //防止执行两次
        tid = setTimeout(setRem, 300);
    }, false);
})();
