!function(s,o){o.render=function(i){!function(i){var n=new Image;n.src=i,n.onload=function(){s(".img-box img").attr("src",i),o.blurImg(n,s("body"))}}(i.image),function(i){str='<div class="song-name">'+i.song+'</div>            <div class="singer-name">'+i.singer+'</div>            <div class="album-name">'+i.album+"</div>",s(".song-info").html(str)}(i),function(i){i?s(".like").addClass("liking"):s(".like").removeClass("liking")}(i.islike)}}(window.Zepto,window.player||(window.player={}));