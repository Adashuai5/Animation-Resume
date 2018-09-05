// 传入三个参数，第一个是已完成的页面，第二个是页面内容，第三个是回调函数
function writeCode(prefix, code, fn) {
    let domCode = document.querySelector('#code')
    let n = 0
    let id = setInterval(() => {
        n += 1
        // 也可以用 code.slice()
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
        styleTag.innerHTML = prefix + code.substring(0, n)
        // 每次更新屏幕下拉,也可以 = 10000
        domCode.scrollTop = domCode.scrollHeight
        if (n >= code.length) {
            window.clearInterval(id)
            // call一下
            fn.call()
        }
    }, 10)
}

function writeMarkdown(markdown, fn) {
    let domPaper = document.querySelector('#paper > .content')
    let n = 0
    let id = setInterval(() => {
        n += 1
        // 也可以用 code.slice()
        domPaper.innerHTML = markdown.substring(0, n)
        // 每次更新屏幕下拉,也可以 = 10000
        domPaper.scrollTop = domPaper.scrollHeight
        if (n >= markdown.length) {
            window.clearInterval(id)
            // call一下
            fn.call()
        }
    }, 1)
}

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
/* 我需要一张白纸 */
#code {
    position: fixed;
    left: 0;
    width: 50%;
    height: 100%;
}
#paper {
    position: fixed;
    right: 0;
    width: 50%;
    height: 100%;
    background: rgb(222,222,222);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}
#paper > .content{
    width: 100%;
    height: 100%;
    background: white;
}
`
var result2 = `
#paper {
}
`
var result3 = `
/* 
* 接下来把 markdown 变成 html 
*/
/*
* 接下来给 html 加个样式吧
*/

`

var md = `
# 自我介绍

我叫 周元达
1996 年 4 月 出生
XXXX 毕业 本科
自学前端半年
希望应聘贵公司前端开发岗位

---

# 技能

熟悉 JavaScript CSS3 HTML5 ...

---

# 项目介绍

1.
2.
3.

---

# 联系方式

手机：xxxxxx
微信：xxxx
Email：xxxx
`


// 开始完成页面为空，异步完成后执行创建页面，然后继续新的页面，回调再回调
writeCode('', result, () => { // call me back
    createPaper(() => {
        writeCode(result, result2, () => {
            writeMarkdown(md, () => {
                writeCode(result + result2, result3, () => {
                    markdownToHtml(md)
                })
            })
        })
    })
})


function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}

function markdownToHtml(markdown, fn) {
    let domPaper = document.querySelector('#paper > .content')
    domPaper.innerHTML = marked(markdown)
    fn.call()
}