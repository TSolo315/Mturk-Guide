$(document).ready(function(){
	var errors = false;
    $('.required').parent().find('.input').on('blur', function() {
        var error_div = $(this).parent().find('.error_message');
        var field_container = $(this).parent();
        if (!$.empty_field_validation($(this).val())) {
            error_div.html('This field is required.');
            error_div.css('display', 'block');
            field_container.addClass('error');
			errors = true;
        } else {
            error_div.html('');
            error_div.css('display', 'none');
            field_container.removeClass('error');
			errors = false;
        }
    });
    $('#email').on('blur', function(){
        var error_div = $(this).parent().find('.error_message');
        var field_container = $(this).parent();
        if (!$.email_validation($(this).val())) {
            error_div.html('Expected Input: email');
            error_div.css('display', 'block');
            field_container.addClass('error');
			errors = true;
        } else {
            error_div.html('');
            error_div.css('display', 'none');
            field_container.removeClass('error');
			errors = false;
        }
    });
	$('#contact_form').submit(function(event) {
		event.preventDefault();
         $('.required').parent().find('.input').trigger('blur');
         var fileName = location.href.split("/").slice(-1).toString(); 
         var subject;
         if (fileName.includes("mturk-advantage")) {
            subject = "Message from mturk advantage trial form."
         } else {
            subject = "Message from mturk guide contact form."
         }
         var $replace_quotes = $('#message').val().replace(/["']/g, "");
         let data = $(this).serializeObject();
         data.subject = subject;
         $('#message').val($replace_quotes);
        if (!errors)
            $.ajax({
                url: "https://work-horse.tsolodev.workers.dev/",
                data: data,
                type: "POST",
                success: function() {
                    var message = 'Your message was sent.';
                    $('#after_submit').html(message);
                    $('#after_submit').css('display', 'block');
                },
                error: function() {
                    var message = 'Your message could not be sent.';
                    $('#after_submit').html(message);
                    $('#after_submit').css('display', 'block'); 
                }
            });
		else
			alert("You didn't complete the form correctly. Please double check and try again!");
	});
});

$.empty_field_validation = function(field_value) {
    if (field_value.trim() == '') return false;
    return true;
}
    
$.email_validation = function(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};