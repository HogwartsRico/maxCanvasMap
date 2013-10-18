max.util = {
    windowToMapClient:function (canvas, x, y) {
        var bbox = canvas.getBoundingClientRect();
        return {
            x:x + document.body.scrollLeft - bbox.left - (bbox.width - canvas.width) / 2,
            y:y + document.body.scrollTop - bbox.top - (bbox.height - canvas.height) / 2
        };
    },
    lonLat2WebMercator:function (lonLat) {
        if ((Math.abs(lonLat.x) > 180 || Math.abs(lonLat.y) > 90))
            return;

        var num = lonLat.x * 0.017453292519943295;
        var x = 6378137.0 * num;
        var a = lonLat.y * 0.017453292519943295;
        var y = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
        return {x:x,
            y:y};
    },
    webMercatorTOLonLat:function(mercator){
        if ((Math.abs(mercator.x) > 20037508.3427892) || (Math.abs(mercator.y) > 20037508.3427892))
            return;

        var x = mercator.x;
        var y = mercator.y;
        var num3 = x / 6378137.0;
        var num4 = num3 * 57.295779513082323;
        var num5 = Math.floor(((num4 + 180.0) / 360.0));
        var num6 = num4 - (num5 * 360.0);
        var num7 = 1.5707963267948966 - (2.0 * Math.atan(Math.exp((-1.0 * y) / 6378137.0)));
        x = num6;
        y = num7 * 57.295779513082323;
        return {x:x,y:y};
    }
}