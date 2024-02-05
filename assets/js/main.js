
$(document).ready(function(){

    var e = $("#u1");
    $('input[type=radio][name=radioname]').change(function(){
    if(this.value == 'u1'){
        var x = $(".umbrella-1")
        /* console.log(x) */
        $(".umbrella-1").css("display","flex");
        $(".umbrella-2").css("display","none");
    }else{
        $(".umbrella-1").css("display","none");
        $(".umbrella-2").css("display","flex");
    }
    
    });
    
});