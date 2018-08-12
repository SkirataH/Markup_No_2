$('.arrow-top a').click(function(e){
	e.preventDefault();
	var href=$(this).attr('href');
	$("html, body").animate({'scrollTop':($(href).offset().top)}, 500)
	//console.log($(href).offset());
})



var slides=4;

if($(window).width()>1000){
$('.carousel').bxSlider({
	slideWidth:4000,
	minSlides: slides,
	maxSlides: slides,

})
}

$('.call-pop').click(function(e){
	e.preventDefault();

	var x=$(this).attr('data-pop-link');

	var popContent="<div class='pop-up-bg'></div><div class='pop-up'>";
	popContent+=$('.pop-up-hidden-content[data-pop="'+x+'"]').html();
	popContent+="<a href='' class='pop-close'></a></div>";

	$('body').append(popContent);

	$('.pop-up').css({
		'left':$(window).width()/2-($('.pop-up').width()/2)+'px',
		'top':$(window).scrollTop()+($(window).height()/2)-($('.pop-up').height()/2)+'px'
	})

});

$('body').on('click','.pop-close, .pop-up-bg',function(e){
	e.preventDefault();
	$('.pop-up-bg, .pop-up').remove();
})









var mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
phone=/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;

function error(x,y,z){
	x.addClass('error');
	x.siblings(x.siblings('.error-text').remove().end().after('<span class="error-text">'+y+'</span>'))
	z++;
	return z;
}

$('form').submit(
	function(e){
		e.preventDefault();
		var errors=0;
		$(this).find('input[type="text"]').each(function(){
			if($(this).val().trim().length==0){
				errors=error($(this),"Введите данные",errors);
			}
			else{
				if($(this).is('[data-validate]')){
					var validate=$(this).attr("data-validate"),
					errorMsg=$(this).attr("data-error-message")
					if(validate=="email" && !mail.test($(this).val())){
						errors=error($(this), errorMsg, errors);
					}
				}
			}
		})
		if(errors==0){
			$(this)[0].submit()
		}
	}
)
$('form').on('focus','.error',function(){
	$(this).removeClass('error').siblings('span').remove()
})