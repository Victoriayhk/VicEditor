# Rich-Text-Editor

## 版本说明

### 0.1
这个版本只有最最基础的UI设计以及简单的iframe contentEditable方式的富文本编辑方式; Bold, Italic等按钮的标签使用的是从从某个icon全图中抠出来的18*18像素的图, 不利于扩展

### 1.0
这个版本引用了插件[showdown][1], 基本实现了Markdown到HTML的转换, 见index.html示例; 另外, 按钮标签改成了[Font Awesome][2]

未完成的事情有:

+ 按钮事件的定制
+ CSS样式定制


[1]: https://github.com/showdownjs/showdown
[2]: http://www.thinkcmf.com/font/icons#new