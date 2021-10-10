// 직접 Object만들기
var nunu = {
    q:'consume',
    w:'snowball'
}
var garen ={
    q:'strike',
    w:'courage'
}

// 클래스 객체로 만들어보기 -> 여러개 만들 떄에는 더 유용하다.
function lolCharacterClass(qVal , wVal){
    this.q = qVal;
    this.w = wVal;
}
var nunu = new lolCharacterClass('consume','snowball')
var garen = new lolCharacterClass('strike','courage')

// ES6 문법으로 하면,
class Hero {
    constructor(qVal , wVal){
        this.q = qVal;
        this.w = wVal;
    }
}
var nunu2 = new Hero('consume','snowball')
var garen2 = new Hero('strike','courage')