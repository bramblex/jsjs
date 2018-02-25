

/*

写一个中间字节码来好好游戏吧

@<变量名> // 变量名是存在 scope 里面
%<寄存器名> // 寄存器名存在 寄存器 里面

var <变量名> #12345,12345 <- 标记锚点，知道什么地方错了
let <变量名>
const <变量名>

move <obj> <prop> <val> // move a -> b

func @<变量名>
endfunc

============================

func %main

push
var %tmp1 %tmp2 %tmp3
mov
pop

endfunc

call %main

*/