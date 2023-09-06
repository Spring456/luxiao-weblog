## 浏览器缓存机制及缓存策略

### 缓存机制的四个方面

Memory Cache 、Service Worker Cache、HTTP Cache、Push Cache

在浏览器的network上，形如，“（from xxx）”这样的描述——对应的资源，这些资源就是我们通过缓存获取到的。from memory cache”对标到 Memory Cache 类型，“from ServiceWorker”对标到 Service Worker Cache 类型。至于 Push Cache，这个比较特殊，是 HTTP2 的新特性。

### HTTP缓存

HTTP 缓存又分为强缓存和协商缓存。优先级较高的是强缓存，在命中强缓存失败的情况下，才会走协商缓存。

1、强缓存

强缓存是利用 http 头中的 Expires 和 Cache-Control 两个字段来控制的。强缓存中，当请求再次发出时，浏览器会根据其中的 expires 和 cache-control 判断目标资源是否“命中”强缓存，若命中则直接从缓存中获取资源，不会再与服务端发生通信。

命中强缓存的情况下，返回的 HTTP 状态码为 200 

1-1、强缓存的实现

强缓存的实现：从 expires 到 cache-control

实现强缓存，过去我们一直用 expires。
当服务器返回响应时，在 Response Headers 中将过期时间写入 expires 字段

expires 是一个时间戳，接下来如果我们试图再次向服务器请求资源，浏览器就会先对比本地时间和 expires 的时间戳，如果本地时间小于 expires 设定的过期时间，那么就直接去缓存中取这个资源

由于时间戳是服务器来定义的，而本地时间的取值却来自客户端，在设置时间戳方面，需要服务器和客户端保持一致，如果存在偏差，将带来意外的结果。

expires 允许我们通过绝对的时间戳来控制缓存过期时间，相应地，Cache-Control 中的max-age 字段也允许我们通过设定相对的时间长度来达到同样的目的

max-age可以视作是对 expires 能力的补位/替换。在当下的前端实践里，我们普遍会倾向于使用max-age。但如果你的应用对向下兼容有强诉求，那么 expires 仍然是不可缺少的。

```js
cache-control: max-age=31536000
```

在 Cache-Control 中，我们通过 max-age 来控制资源的有效期。max-age 不是一个时间戳，而是一个时间长度。在本例中，max-age 是 31536000 秒，它意味着该资源在 31536000 秒以内都是有效的。

注意，max-age 是一个相对时间，这就意味着它有能力规避掉 expires 可能会带来的时差问题：max-age 机制下，资源的过期判定不再受服务器时间戳的限制。客户端会记录请求到资源的时间点，以此作为相对时间的起点，从而确保参与计算的两个时间节点（起始时间和当前时间）都来源于客户端，由此便能够实现更加精准的判断。

Cache-Control 的 max-age 配置项相对于 expires 的优先级更高。当 Cache-Control 与 expires 同时出现时，我们以 Cache-Control 为准。

