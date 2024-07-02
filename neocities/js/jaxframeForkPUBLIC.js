var jaxframe = {
    isgif: function (src) {
        return /^(?!data:).*\.(gif|webp)$/i.test(src);
    },
    stop: function () {
        var blacklist = [
            "https://testlink.com/something.webp", 
            // Just add your links here! 
            // Make sure you use the neocities link rather than the new domain link!
            // ??? Maybe I'm wrong?
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
                    canvas.width = width;
                    canvas.height = height;
                
    
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

// All I removed from my version is the very specific info I had for making this thing work with my marquee bar. 

// Make sure you credit Graybox.lol for this! Not me. 