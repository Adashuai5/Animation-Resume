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
            fn&&fn.call()
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
            fn&&fn.call()
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
body {
    background: linear-gradient(to left,white, blue, white);
}
#code {
    padding: 24px;
}

/* 这样太单调了，我们让代码高亮一下 */

.token.selector { color: #690; }
.token.property { color: #905; }
.token.function { color: #DD4A68; }
.token.punctuation { color: #999; }

/* 字太小了，放大一点 */
#code {
    font-size: 16px;
    transform: translateX(40px);
}
#main {
    display: grid;
    grid-template-columns: 40% 60%;
    grid-template-rows: auto auto;
}

/* 
* 好了下面我正式开始介绍我自己
* 我需要一张纸
*/

#code {
    grid-column: 1;
    grid-row: 1;
}
#paper {
    grid-column: 2;
    grid-row: 1;
    justify-content: center;
    align-content: center;
    margin: 24px;
}
#paper > .content{
    height: 100%;
    width: 100%;
    background: white;
}

/*
* 准备好了，现在请看左边 
*/
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
#paper > .content{
    background: #b0eff1; 
}
#paper > pre{
    padding: 24px 0 0 24px;
}

/*
* 好了，我的动态简历就演示到这里了
* 谢谢观看
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
    main.appendChild(paper)
    fn&&fn.call()
}

function markdownToHtml(markdown,fn) {
    let domPaper = document.querySelector('#paper > .content')
    domPaper.innerHTML = marked(markdown)
    fn&&fn.call()    
}