// shinys.js
// 2020.03.25 신유수
//------------------------------------

function go_url(url)
{
    if(url != '')
    	window.open(url,'_blank');
    //self.location.href=this.value
}


var footer = null;
var S_Animate = null;
$(function(){

// fixed 버벅임 방지 ie에서만 적용
var agent = navigator.userAgent.toLowerCase();
if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
	$('body').on("mousewheel", function () { 
		event.preventDefault(); 
		
		var wheelDelta = event.wheelDelta; 
		
		var currentScrollPosition = window.pageYOffset; 
		window.scrollTo(0, currentScrollPosition - wheelDelta); 
	});
	
	if($('.sub_contents_bg').length > 0){
		$('.sub_contents_bg').addClass('ie');
	}
	
}


var sub_page_cate = {
	init : function(){

		var _this = this;

		//대분류 만들기
		var $cate1_ul = $('<ul></ul>');
		
		$('#nav > ul > li').each(function(index,item){
			$cate1_ul.append('<li data-gnb="'+$(item).attr('class')+'">'+$(item).find('a').clone().wrap("<div/>").parent().html()+'</li>');
		});
		
		$cate1_ul.prepend('<div class="hover_title">'+$('.sub_cate1 .sub_cate_title').text()+'</div>');
		
		$('.sub_cate1').append($cate1_ul);
		$('.sub_cate1 ul li').each(function(index,item){
			if($(item).text() === $('.sub_cate1 .sub_cate_title').text()){
				$(item).addClass('active');
			}
		});

		//중분류 만들기
		_this.load();
		$('.sub_cate2 ul li').each(function(index,item){
			if($(item).text() === $('.sub_cate2 .sub_cate_title').text()){
				$(item).addClass('active');
			}
		});

		//대분류 클릭이벤트
		$('.sub_cate1 ul li').on('click',function(e){
			_this.active(e);
			_this.load();
		});

	},
	load : function(){
		$('.sub_cate2 > ul').remove();
		var gnb = $('.sub_cate1 > ul > li.active');
		var ul = $('#nav .'+gnb.data("gnb")+' ul').clone().wrap("<div/>").parent().html();
		var $set_ul = $(ul).appendTo('.sub_cate2');
		
		$set_ul.prepend('<div class="hover_title">'+$('.sub_cate2 .sub_cate_title').text()+'</div>');
		
		//메뉴 클릭시 페이지이동으로 필요없어짐
//		$('.sub_cate1 .sub_cate_title').text(gnb.text());
//		$($set_ul).on('click',function(e){
//			sub_page_cate.active(e);
//			$(e.target).closest('.sub_cate2').find('.sub_cate_title').text($(e.target).text());
//		});
	},
	active : function(e){
		var target = $(e.target);
		target.closest('ul').find('li').removeClass('active');
		target.addClass('active');
		// target.closest('.sub_cate').find('.sub_cate_title').text(target.text());
	}

}

sub_page_cate.init();
	
	
var content = {
	init : function(){
		var _this = this;
		$('.content_data').on('mouseenter mouseleave click' , function(e){

			if($(".company_group").width() <= 767){
				content.resize();
				if(e.type == 'click'){
					if($(e.target).hasClass('btn_view')){
						return;
					}
					var __this = this;
					$('.content_data').each(function(index,item){
						if($(__this).attr('class') != $(item).attr('class')){
							$(item).removeClass('enter_left enter_right');

							if(e.pageY-5 <= $(this).offset().top){
								$(this).addClass('leave_left').removeClass('leave_right');
							}else if(e.pageY+5 >= $(this).offset().top + $(this).height()){
								$(this).addClass('leave_right').removeClass('leave_left');
							}

							$(this).find('.sub_info > div').each(function(){
								var target = $(this);
								TweenMax.killTweensOf(target);
								// TweenMax.to(target , 0.25 , {alpha:0 , y : 50 , ease:Quad.easeOut});
								TweenMax.to(target , 0.01 , {alpha:0 , y : 50 , ease:Quad.easeOut});
							});
	
							$(this).removeClass('hover');
							
						}
					});
					
					if(!$(this).hasClass('hover')){
						
						$(this).addClass('hover').removeClass('leave_left leave_right');
						if(e.pageY >= $(this).offset().top && e.pageY <= $(this).offset().top + $(this).height()/2){
							$(this).addClass('enter_left').removeClass('enter_right');
						}else if(e.pageY > $(this).offset().top + $(this).height()/2 && e.pageY <= $(this).offset().top + $(this).height()){
							$(this).addClass('enter_right').removeClass('enter_left');
						}
						
						content.target = this;
						var i = 0;
						$(this).find('.sub_info').show();
						$(this).find('.sub_info > div').each(function(){
							var target = $(this);
							var _delay = i * 0.15;
							TweenMax.killTweensOf(target);
							TweenMax.set(target , {alpha:0 , y : 50});
							TweenMax.to(target , 0.6 , {alpha:1 , y : 0 , delay:_delay, ease:Quad.easeOut});
							i++;
						});

					}else{

						$(this).removeClass('enter_left enter_right');

						if(e.pageY-5 <= $(this).offset().top){
							$(this).addClass('leave_left').removeClass('leave_right');
						}else if(e.pageY+5 >= $(this).offset().top + $(this).height()){
							$(this).addClass('leave_right').removeClass('leave_left');
						}

						$(this).find('.sub_info > div').each(function(){
							var target = $(this);
							TweenMax.killTweensOf(target);
							// TweenMax.to(target , 0.25 , {alpha:0 , y : 50 , ease:Quad.easeOut});
							TweenMax.to(target , 0.01 , {alpha:0 , y : 50 , ease:Quad.easeOut});
						});

						$(this).removeClass('hover');
					}
				}

			}else{

				if(e.type == 'mouseenter'){
					
					$(this).addClass('hover').removeClass('leave_left leave_right');
					if(e.pageX >= $(this).offset().left && e.pageX <= $(this).offset().left + $(this).width()/2){
						$(this).addClass('enter_left').removeClass('enter_right');
					}else if(e.pageX > $(this).offset().left + $(this).width()/2 && e.pageX <= $(this).offset().left + $(this).width()){
						$(this).addClass('enter_right').removeClass('enter_left');
					}

					var i = 0;
					$(this).find('.sub_info').show();
					$(this).find('.sub_info > div').each(function(){
						var target = $(this);
						var _delay = i * 0.15;
						TweenMax.killTweensOf(target);
						TweenMax.set(target , {alpha:0 , y : 50});
						TweenMax.to(target , 0.6 , {alpha:1 , y : 0 , delay:_delay, ease:Quad.easeOut});
						i++;
					});

					$('.content_wrap').addClass('hover');

					// TweenMax.to($(this).find('.line') , 0.6 , {alpha : 1 , width : $(this).width() - 50 , ease:Quad.easeOut});
					TweenMax.to($(this).find('.line') , 0.6 , {alpha : 1 , width : $(this).width() * 1 , ease:Quad.easeOut});

				}else if(e.type == 'mouseleave'){
					$(this).removeClass('enter_left enter_right');

					if(e.pageX-5 <= $(this).offset().left){
						$(this).addClass('leave_left').removeClass('leave_right');
					}else if(e.pageX+5 >= $(this).offset().left + $(this).width()){
						$(this).addClass('leave_right').removeClass('leave_left');
					}


					$(this).find('.sub_info > div').each(function(){
						var target = $(this);
						TweenMax.killTweensOf(target);
						TweenMax.to(target , 0.25 , {alpha:0 , y : 50 , ease:Quad.easeOut});
					});


					// TweenMax.to($(this).find('.line') , 0.6 , {alpha : 0.2 , width : $(this).width() - 100 , ease:Quad.easeOut});
					TweenMax.to($(this).find('.line') , 0.6 , {alpha : 0.2 , width : $(this).width()*0.8 , ease:Quad.easeOut});
					
					$(this).removeClass('hover');
					$('.content_wrap').removeClass('hover');
				}
				
			}
				
		});

		$(window).on("resize",function () {
			content.resize();
			footer.init();
		});

		content.resize();

	},
	resize : function(){

		$('.content_data').each(function(){
			$(this).find('.visual_wrap').hide();
			var _w = $(this).width();
			$(this).find('.visual_wrap .visual_data').width(_w);
			$(this).find('.visual_wrap').show();
		});
	}
}
content.init();

var footerObj = {
	height : 220,
	target : '.footer_sub',
	init: function(){
		footerObj.height = $('.footer_sub_wrap').height();
		$('.footer_sub_wrap').css('top','-'+footerObj.height+'px');
	},
	open : function(){
		$('.footer_sub_wrap').show();
		var target = footerObj.target;
		var wrap_height = footerObj.height;
		TweenMax.killTweensOf(target);
		TweenMax.set(target , {top : wrap_height});
		TweenMax.to(target , 0.6 , {top : 0 , delay:0, ease:Quad.easeOut});
		var target2 = '.footer_up_btn';
		TweenMax.killTweensOf(target2);
		TweenMax.set(target2 , {alpha : 0});
		TweenMax.to(target2 , 0.6 , {alpha : 1 , delay:0.5, ease:Quad.easeOut});
		
		
	},
	close : function(){
		var target = footerObj.target;
		var wrap_height = footerObj.height;
		TweenMax.killTweensOf(target);
		TweenMax.set(target , {top : 0});
		TweenMax.to(target , 0.6 , {top : wrap_height , delay:0, ease:Quad.easeOut});
		TweenMax.to('.footer_sub_wrap' , 0 , {display : 'none' , delay:0.6, ease:Quad.easeOut});
		var target2 = '.footer_up_btn';
		TweenMax.killTweensOf(target2);
		TweenMax.set(target2 , {alpha : 1});
		TweenMax.to(target2 , 0.6 , {alpha : 0 , delay:0, ease:Quad.easeOut});
	}
}
footer = footerObj;

footer.init();


var ShinYS_AnimateObj = {
	flag: true,
	delayTime: 0,
	init: function(target){
		$(target).addClass('sys_close');
	},
	up: function(target, pc, mobile){
		
		if(pc === undefined)
			pc = 50;
		if(mobile === undefined)
			mobile = -200;
		
		var _this = this;
		var i = 1;
		$(target).each(function(index, item){
			
			var minusHeight = pc;
			_this.delayTime = 0;
			if($(window).width() <= 1025){
				minusHeight = mobile;
			}
			
			var viewportHeight = $(window).height();
			var scrolltop = $(window).scrollTop();
			var posA = viewportHeight + scrolltop;
			var posItem = $(item).offset().top;
			if($(item).hasClass('sys_close')){
				if(posItem <= posA - minusHeight){
					$(item).removeClass('sys_close');
					var _delay = i * 0.15;
					
					TweenMax.killTweensOf(item);
					TweenMax.set(item , {alpha:0 , y : 100});
					TweenMax.to(item , 0.6 , {alpha:1 , y : 0 , delay:_delay, ease:Quad.easeOut});
					i++;
				}
			}else{
				if(posItem > posA + 10){
					$(item).addClass('sys_close');
					TweenMax.set(item , {alpha:0 , y : 100});
				}
			}
		});
		
	}
}



S_Animate = ShinYS_AnimateObj;
S_Animate.init('.content .grab > div');
S_Animate.up('.content .grab > div',0,-200);


var delta = 300;
var scroll_flag = true;
$( window ).on( 'scroll', function( ) {
	if($(window).width() <= 767){
		if(scroll_flag){
			scroll_flag = false;
			S_Animate.up('.content .grab > div');
			setTimeout(function(){
				scroll_flag = true;
			}, delta );
			
		}
	}else{
		 S_Animate.up('.content .grab > div')
	}
});


//sub메뉴 hover 추가 (모바일에서 공통기능 사용하기위함)
$('.sub_cate').on('click touchend mouseenter', function(e){
	if(!$(e.target).closest('.sub_cate').hasClass('hover')){
		$('.sub_cate').removeClass('hover');
		$(e.target).closest('.sub_cate').addClass('hover');
	}
});
$(window).on('click touchend mouseenter', function(e){
	if($(e.target).closest('.sub_cate').length <= 0 ){
		$('.sub_cate').removeClass('hover');
	}
});




});