let serverURL = "https://script.google.com/macros/s/AKfycbxBXqWfdhArFWL7XQ8bZHJryO_IRVPfzDPg_SfbEfTwFX1Za0_m9tziXZpF9cQmZOBwHg/exec";
let articleNum = 1;
let event_ary = ['input[type=text]','textarea']







$(document).ready(function () {
    initBtnFunc();
    setProgress();
    showAni();
});

for(let i=0;i<event_ary.length;i++){
    $(event_ary[i]).focusout(function (e) {
        if($(this).val() == ''){
            setTip($(this));
        }
    
    });
    $(event_ary[i]).keyup(function (e) {
        if($(this).val() != ''){
            removeTip($(this));
        }
    });
}
$('input[type=radio]').change(function (e) {
    removeTip($(this));
});
$('select').change(function (e) {
    removeTip($(this));
});




function initBtnFunc() {
    $('.btn-next').click(function (e) { 
        checkField()
    });
    $('.btn-prev').click(function (e) { 
        switchArticle('prev');
        
    });
    $('.btn-send').click(function (e) { 
        sendToServer();
        
    });
    $('.btn-prev').hide();
    $('.btn-send').hide();
}
function checkField() {
    switch (articleNum) {
        case 2:

            if($('input[name=userName]').val() == ''){
                setTip($('input[name=userName]'));
                return false;
            }
            if($('input[name=userSex]:checked').val() == undefined){
                setTip($('input[name=userSex]'));
                return false;
            }
            if($('input[name=liveType]:checked').val() == undefined){
                setTip($('input[name=liveType]'));
                return false;
            }
            if($('select').val() == null){
                setTip($('select'));
                return false;
            }
            switchArticle('next');
            break;
        case 3:
            if($('textarea[name=userNeed]').val() == ''){
                setTip($('textarea[name=userNeed]'));
                return false;
            }
            switchArticle('next');
            break;
        default:
            switchArticle('next');
            break;
    }
}
function setTip(dom) {
    let template = $('#tipTemplate01');
    let node = $('#tipTemplate01').html();
    if(dom.closest('.main-group').find('.tip').length == 0){
        dom.closest('.main-group').append(node);
        dom.closest('.main-group').addClass('bdr');
    }
}
function removeTip(dom) {
    dom.closest('.main-group').find('.tip').remove(); 
    dom.closest('.main-group').removeClass('bdr');
}

function switchArticle(situation) {

    switch (situation) {
        case 'next':
            if(articleNum < 4){
                $('nav').hide();
                // $('#article'+articleNum).hide();
                gsap.to('#article'+articleNum,{
                    duration:1,
                    x:$('.container').width()*-1,
                    onComplete:backToCenter,
                    onCompleteParams:[articleNum,situation]
                });
                $('.img'+articleNum).hide();
                $('.img'+articleNum).removeClass('newPosi');
                articleNum++;
                $('#article'+articleNum).show();
                gsap.to('#article'+articleNum,{duration:0,x:$('.container').width()});
                gsap.to('#article'+articleNum,{duration:1,x:0});
                setProgress();
                // if (articleNum == 3) {
                //     $('.btn-send').show();
                // }
                
            }
            break;
        case 'prev':
            if(articleNum > 1){
                $('nav').hide();
                gsap.to('#article'+articleNum,{
                    duration:1,
                    x:$('.container').width(),
                    onComplete:backToCenter,
                    onCompleteParams:[articleNum,situation]
                });
                $('.img'+articleNum).hide();
                $('.img'+articleNum).removeClass('newPosi');
                articleNum--;
                $('#article'+articleNum).show();
                gsap.to('#article'+articleNum,{duration:0,x:$('.container').width()*-1});
                gsap.to('#article'+articleNum,{duration:1,x:0});
                setProgress();
                // $('.btn-send').hide();
            }
            break;
        default:
            break;
    }
}

function backToCenter(oldNum,situation) {
    $('#article'+oldNum).hide();
    gsap.to('#article'+oldNum,{
        duration:0,
        x:0,
    });
    $('nav').show();
    showAni();
    switch (situation) {
        case 'next':
            $('nav').show();
            $('.btn-next').show();
            $('.btn-prev').show();
            if (articleNum == 3) {
                $('.btn-next').hide();
                $('.btn-send').show();
            }
            if (articleNum == 4) {
                $('nav').hide();
            }
            break;
        case 'prev':
            $('nav').show();
            $('.btn-next').show();
            $('.btn-prev').show();
            if (articleNum == 1) {
                $('.btn-prev').hide();
            }
            break;   
        default:
            break;
    }

}
function showAni() {
    $('.img'+articleNum).show();
    setTimeout(function () {
        $('.img'+articleNum).addClass('newPosi');        
    },100);
}

function setProgress() {
    let w = Math.floor((articleNum/4)*100);
    $('.progress-bar').css('width',w+'%');
}

function sendToServer() {
    let parameter = {};
    parameter.userName = $('input[name=userName]').val();
    parameter.userSex = $('input[name=userSex]:checked').val();
    parameter.liveType = $('input[name=liveType]:checked').val();
    parameter.workType = $('select[name=workType]').val();
    parameter.userTitle = $('input[name=userTitle]').val();
    parameter.userNeed = $('textarea[name=userNeed]').val();
    parameter.method = "write1";
    console.log(parameter);



    $('.cover').css('display','grid');
    $.post(serverURL, parameter, function (data) {
        console.log(data);
        if(data.result = 'sus'){
            alert('送出成功');
            switchArticle('next');
            $('.cover').css('display','none');
        }else{
            $('.cover').css('display','none');
            alert('傳送失敗，請再檢查一遍');
        }
    }).fail(function (data) {
        alert('送出失敗');
        console.log(data);
    });
}