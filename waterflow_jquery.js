$(window).bind('load',function () {
    water_flow();
    window.onscroll = function () {
        var json_data = {"images":[
            {"src":"images_waterflow/20.jpg"},
            {"src":"images_waterflow/21.jpg"},
            {"src":"images_waterflow/22.jpg"},
            {"src":"images_waterflow/23.jpg"},
            {"src":"images_waterflow/24.jpg"},
            {"src":"images_waterflow/25.jpg"},
            {"src":"images_waterflow/26.jpg"},
        ],
        };
        var screen_height = $(window).height();
        var wrap = $('#wrap');
        var boxs = $('.box');
        var last_top = boxs.eq(boxs.length-1).offset().top;
        var scroll_top = $( window ).scrollTop();
        var scroll_index = 0;
        if(scroll_top + screen_height > last_top){
            for(var i = 0; i<json_data.images.length; i++){
                var box = $('<div class="box">');
                var image = $('<img>');
                image.attr('src',json_data.images[scroll_index++].src);
                image.appendTo(box);
                box.appendTo(wrap)
            }
            water_flow();
        }

    }
});
function water_flow() {
    var doc_width = $(window).width();
    var boxs = $('#wrap>div');
    var box_width = boxs.eq(0).width() + 30;
    var row_box = Math.floor(doc_width/box_width);
    var temp = [];
    var min_height;
    var min_height_index;
    boxs.each(function (index) {
        //boxs.eq(index).height()不包括padding，因此需加上padding值，offset().left包括padding不包括margin
        var _height =　boxs.eq(index).height()+25;
        if(index<row_box){
            temp[index]=_height;
        }else{
            min_height = Math.min.apply(null,temp);
            min_height_index = temp.indexOf(min_height);
            // min_height_index = $.inArray(temp,min_height);
            boxs.eq(index).css({
                            position:'absolute',
                            top: min_height,
                            left:boxs.eq(min_height_index).offset().left-20,

                        }
            );
            temp[min_height_index] += _height;
        }
    });
}

