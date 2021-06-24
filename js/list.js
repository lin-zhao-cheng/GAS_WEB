const serverURL = "https://script.google.com/macros/s/AKfycbxBXqWfdhArFWL7XQ8bZHJryO_IRVPfzDPg_SfbEfTwFX1Za0_m9tziXZpF9cQmZOBwHg/exec";

$(document).ready(function () {
    readFromSever();
});
function readFromSever() {
    let parameter = {};
    parameter.method = 'read1';
    $('.cover').css('display','grid');
    $.post(serverURL,parameter,function (data) {
        $('.cover').css('display','none');
        setTable(data);
    }).fail(function (data) {
        alert('錯誤喔');
    });
}
function setTable(sData) {
    let node = $('#card01').html();
    for (let i = 0; i < sData.length; i++) {
        let content = node.replace('LIST_HERE',i);
        // let content = content.replace('NAME_HERE',sData[i][1]);
        content = content.replace('NAME_HERE',sData[i][1]);
        content = content.replace('SEX_HERE',sData[i][2]);
        content = content.replace('LIVE_HERE',sData[i][3]);
        content = content.replace('WORK_HERE',sData[i][4]);
        content = content.replace('TITLE_HERE',sData[i][5]);
        content = content.replace('TEXT_HERE',sData[i][6]);
        content = content.replace('TIME_HERE',sData[i][7]);
        $('.row').append(content);
    }
} 