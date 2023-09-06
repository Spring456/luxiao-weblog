## 前端实现在线预览PDF，word

### a标签

pdf文件理论上可以在浏览器直接打开预览但是需要打开新页面。在仅仅是预览pdf文件且UI要求不高的情况下可以直接通过a标签href属性实现预览

```html
<a href="文档地址"></a>
```

### ​jquery插件 jquery.media.js 

​​
通过jquery插件 `jquery.media.js` 实现 这个插件可以实现pdf预览功能（包括其他各种媒体文件）但是对word等类型的文件无能为力。 实现方式： js代码

​```js
 $('#box').media({
		width: '100%',
		height: '100%',
		autoplay: true,
    src:'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',
```

### 内嵌iframe

```js
$("<iframe src='"+ this.previewUrl +"' width='100%' height='362px' frameborder='1'>").appendTo($(".video-handouts-preview"))
```

### 通过标签嵌入

```html
<embed :src="previewUrl" type="application/pdf" width="100%" height="100%">
```
此标签h5特性中包含四个属性：高、宽、类型、预览文件src！ 与< iframe > < / iframe > 不同，这个标签是自闭合的的，也就是说如果浏览器不支持PDF的嵌入，那么这个标签的内容什么都看不到！

### 插件PDFObject

```html
<!DOCTYPE html>
<html>
<head>
    <title>Show PDF</title>
    <meta charset="utf-8" />
    <script type="text/javascript" src='pdfobject.min.js'></script>
    <style type="text/css">
        html,body,#pdf_viewer{
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>
    <div id="pdf_viewer"></div>
</body>
<script type="text/javascript">
    if(PDFObject.supportsPDFs){
        // PDF嵌入到网页
        PDFObject.embed("index.pdf", "#pdf_viewer" );
    } else {
        location.href = "/canvas";
    }
</script>
</html>
```

还可以通过以下代码进行判断是否支持PDFObject预览

```js
if(PDFObject.supportsPDFs){
   console.log("Yay, this browser supports inline PDFs.");
} else {
   console.log("Boo, inline PDFs are not supported by this browser");
}
```

## word、xls、ppt文件在线预览功能

word、ppt、xls文件实现在线预览的方式比较简单可以直接通过调用微软的在线预览功能实现 (预览前提：资源必须是公共可访问的)

```js
<iframe src='https://view.officeapps.live.com/op/view.aspx?src=http://storage.xuetangx.com/public_assets/xuetangx/PDF/1.xls' width='100%' height='100%' frameborder='1'>
</iframe>
```

src就是要实现预览的文件地址 具体文档看这微软接口文档 ##3、word文件

XDOC可以实现预览以DataURI表示的DOC文档，此外XDOC还可以实现文本、带参数文本、html文本、json文本、公文等在线预览，具体实现方法请看官方文档

下面这种方式可以实现快速预览word但是对文件使用的编辑器可能会有一些限制

```js
<a href="http://www.xdocin.com/xdoc?_func=to&_format=html&_cache=1&_xdoc=http://www.xdocin.com/demo/demo.docx" target="_blank" rel="nofollow">XDOC</a>
```