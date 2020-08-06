function urlChecker(url){
let regexExpression=/^(https?:\/\/)(([\da-z\.-]+)\.)?([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
return regexExpression.test(url);
}
export{urlChecker}