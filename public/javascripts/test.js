//BUG : Only after second click, 'Password Don't Match' CustomValidity applies
$("#user-reg-form").on('submit',function(){
   if($('#password').val()!=$('#password-repeat').val()){
       $('#password-repeat')[0].setCustomValidity("Passwords Don't Match");
       return false;
   }
   $('#password-repeat')[0].setCustomValidity('');
   return true;
});
