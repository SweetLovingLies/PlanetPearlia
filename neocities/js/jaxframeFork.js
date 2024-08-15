var jaxframe = {
    isgif: function (src) {
        return /^(?!data:).*\.(gif|webp)$/i.test(src);
    },
    stop: function () {
        var blacklist = [
            "https://planetpearlia.com/shrines/OMORI/omoriAssets/something.webp",
            "https://planetpearlia.com/shrines/OMORI/omoriAssets/something_disappear.gif",
            "https://pearliasystem.neocities.org/pixels/backrainbow.webp",
            "https://pearliasystem.neocities.org/MariSitePack/BasilsWords.gif",
            "https://planetpearlia.com/assets/MariSitePack/BasilsWords.gif",
            "https://pearliasystem.neocities.org/assets/MariSitePack/Heal!.gif",
            "https://planetpearlia.com/assets/MariSitePack/Heal!.gif",
            "https://planetpearlia.com/assets/coolsites/planetpearlia.gif",
        ];
    
        var images = document.querySelectorAll("img");
    
        images.forEach(function (img) {
            if (blacklist.includes(img.src)) {
                return;
            }
    
            if (jaxframe.isgif(img.src)) {
                var canvas = document.createElement("canvas"),d
                    ctx = canvas.getContext("2d"),
                    width = img.naturalWidth,
                    height = img.naturalHeight,
                    ratio = width / height;
    
                if (img.closest('.marqueeitems')) {
                    var canvasWidth = 88;
                    var canvasHeight = canvasWidth / ratio;

                    canvas.width = canvasWidth;
                    canvas.height = canvasHeight;
                } else {
                    canvas.width = width;
                    canvas.height = height;
                }
    
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
                canvas.onclick = img.onclick;
    
                canvas.setAttribute("data-src", img.src);
                canvas.className = img.className;
                canvas.id = img.id;
    
                img.parentNode.replaceChild(canvas, img);
            }
        });
    },
    start: function () {
        var canvases = document.querySelectorAll("canvas[data-src]");
    
        canvases.forEach(function (canvas) {
            var img = document.createElement("img");
            
            img.src = canvas.getAttribute("data-src");
            img.alt = canvas.alt; 
            img.className = canvas.className;
            img.id = canvas.id;
    
            img.width = canvas.width;
            img.height = canvas.height;
    
            canvas.parentNode.replaceChild(img, canvas);
        });
    },
};