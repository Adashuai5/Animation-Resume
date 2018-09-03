var result = `/* 
* 面试官你好，我是周元达
* 我将以动画的形式来介绍我自己
* 只用文字的话就太单调了
* 让我以代码的形式展现给您
* 首先我们准备一些样式
*/

*{
    transition: all 1s;
}
html {
    background: rgb(222,222,222);
}
#code {
    border: 1px solid blue;
    padding: 16px;
}

/* 这样太单调了，我们让代码高亮一下 */

.token.selector {
    color: #690;
}
.token.property {
    color: #905;
}
.token.function {
    color: #DD4A68;
}
.token.punctuation {
    color: #999;
}

/* 加点 3D 效果 */
#code {
    transform: rotate(360deg);
}

/* 好了下面我正式开始介绍我自己 */
`
var n = 0
var id = setInterval(() => {
    n += 1
    // 也可以用 result.slice()
    code.innerHTML = result.substring(0, n)
    code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css, 'css')
    styleTag.innerHTML = result.substring(0, n)
    if (n >= result.length) {
        window.clearInterval(id)
        fn2()
        fn3(result)
    }
}, 10)

var fn2 = function () {
    var paper = document.createElement('div')
    paper.id = 'paper'
    document.body.appendChild(paper)
}

var fn3 = function (preResult) {
    var result = `
#paper {
    width: 100px;
    height: 100px;
    background: red;
}
    `
    var n = 0
    var id = setInterval(() => {
        n += 1
        code.innerHTML = preResult + result.substring(0, n)
        code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css, 'css')
        styleTag.innerHTML = preResult + result.substring(0, n)
        if (n >= result.length) {
            window.clearInterval(id)
        }
    }, 10)
}