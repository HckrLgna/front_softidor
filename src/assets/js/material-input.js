


export function setMaterialInput(){
    var inputs = document.querySelecttorAll("input");
    for (var i=0; i< inputs.length; i++){
       if( inputs[i].hasAttribute("value")){
        inputs[i].parentElement.classList.add("is-filled");
       }
       inputs[i].addEventListener(
        "focus",
        function(e){
            this.parentElement.classList.add("is-focused");
        },
        false,
       );
       inputs[i].onkeyup = function(e){
        if(this.value !=""){
            this.parentElement.classList.add("is-filled");
        }else{
            this.parentElement.classList.remove("is-filled");
        }
       };
       inputs[i].addEventListener(
        "focusout",
        function(e){
            if(this.value !=""){
                this.parentElement.classList.add("is-filled");
            }
            this.parentElement.classList.remove("is-focused");
        },
        false,
       );
    }
}