
var root = window.player;
// var nowIndex = 0;
var dataList;
var len;
var audio = root.audioManager;
var control;
var timer;


function getData(url){
    $.ajax({
        type:"GET",
        url:url,
        success:function(data){
            len = data.length;
            control = new root.controlIndex(len);
            dataList = data;
            // root.render(data[0]);
            // root.pro.renderAllTime(data[0].duration);
            // audio.getAudio(data[0].audio);
           
            bindEvent();
            bindTouch();
             $('body').trigger('play:change',0);
        },
        error:function(){
            console.log("error");
        }
    })
}



function bindEvent(){
    $('body').on('play:change',function(e,index){
        audio.getAudio(dataList[index].audio);
        root.render(dataList[index]);
        
        root.pro.renderAllTime(dataList[index].duration);
        if (audio.status == 'play') {
            audio.play();
         
            rotated(0);

        }
         $('.img-box').attr('data-deg',0);
        $('.img-box').css({
            'transform':'rotateZ(0deg)',
            'transition':'none'
        })
    })
    $('.prev').on('click',function(){
        // if(nowIndex == 0){
        //     nowIndex = len - 1;
        // }else{
        //     nowIndex --;
        // }
      var i = control.prev();
      $('body').trigger('play:change',i);
        root.pro.start(0);
        if(audio.status == 'pause'){
            root.pro.stop();
        }
        //   audio.getAudio(dataList[i].audio);
        // root.render(dataList[i]);
        // if(audio.status == 'play'){
        //     audio.play();
        // }
    });
     $('.next').on('click',function(){
        // if(nowIndex == len - 1){
        //     nowIndex = 0;
        // }else{
        //     nowIndex ++;
        // }
       var i = control.next();
        $('body').trigger('play:change',i);
        root.pro.start(0);
        if(audio.status == 'pause'){
            root.pro.stop();
        }
        // audio.getAudio(dataList[i].audio);
        // root.render(dataList[i]);
        // if(audio.status == 'play'){
        //     audio.play();
        // }
    });
    $('.play').on('click',function(){
        if(audio.status == 'pause'){
            audio.play();
            root.pro.start();
        //    root.pro.update();
            var deg = $('.img-box').attr('data-deg') ;
            rotated(deg);
        }else{
            audio.pause();
            root.pro.stop();
            clearInterval(timer);
        }
        $('.play').toggleClass('playing');
    })
}


function bindTouch(){
    var $slider = $('.slider');
    var bottom = $('.pro-bottom').offset();
    var l = bottom.left;
    var w = bottom.width;
    $slider.on('touchstart', function () {
        root.pro.stop();
    }).on('touchmove', function (e) {

        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w;
        if (per >= 0 && per <= 1) {
            root.pro.update(per);
        }

    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w;
        if (per >= 0 && per <= 1) {
            var time = per * dataList[control.index].duration;
            audio.playTo(time);
            audio.play();
            audio.status = 'play';
            $('.play').trigger('playing');
            root.pro.start(per);
            
           
        }

    })
}


function rotated(deg){
    clearInterval(timer);
    // var deg = 0;
    deg = +deg;
    timer = setInterval(function(){
        deg += 2;
        $('.img-box').attr('data-deg',deg);
        $('.img-box').css({
            'transform':'rotateZ(' + deg + 'deg)',
            'transition':'all 1s ease-out'
        })
    },200);
}




getData("../mock/data.json");