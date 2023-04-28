# 单点登陆SSO

这个文档介绍了五种单点登录（SSO）的实现方式，包括使用cookie+redis、LocalStorage、认证中心、cookie-token式和session式。其中，认证中心是标准做法，支持跨域和扩展性好，但成本较大；cookie-token式适合做单点登录，而且可以踢人下线；session式具有很高的用户掌控度，但不适合做单点登录。LocalStorage和session广播机制实现不推荐使用。

## 单点登录相关基础知识

### **什么是跨域**

当一个请求 url 的协议、域名、端口三者之间任意一个与当前页面 url 不同即为跨域

当前页面url 被请求页面url 是否跨域 原因

[www.test.com/](https://link.juejin.cn/?target=http%3A%2F%2Fwww.test.com%2F) 和 [www.test.com/index.html](https://link.juejin.cn/?target=http%3A%2F%2Fwww.test.com%2Findex.html)  否 同源（协议、域名、端口号相同）

[www.test.com/](https://link.juejin.cn/?target=http%3A%2F%2Fwww.test.com%2F) 和 [www.test.com/index.html …](https://link.juejin.cn/?target=https%3A%2F%2Fwww.test.com%2Findex.html%25C2%25A0%25E8%25B7%25A8%25E5%259F%259F) 协议不同（http/https）

[www.test.com/](https://link.juejin.cn/?target=http%3A%2F%2Fwww.test.com%2F) 和 [百度一下，你就知道](https://link.juejin.cn/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%253A%2F%2Fwww.baidu.com%2F) 跨域 主域名不同（test/baidu）

[www.test.com/](https://link.juejin.cn/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%253A%2F%2Fwww.test.com%2F)  和 [blog.test.com/](https://link.juejin.cn/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%253A%2F%2Fblog.test.com%2F) 跨域 子域名不同（www/blog）

[www.test.com:8080/](https://link.juejin.cn/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%253A%2F%2Fwww.test.com%253A8080%2F) 和 [www.test.com:7001/](https://link.juejin.cn/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%253A%2F%2Fwww.test.com%253A7001%2F) 跨域 端口号不同（8080/7001）

### **token是什么**

**按照一定规则生成字符串，字符串可以包含用户信息,**开发人员可以自行定制这个生成规则，也可以使用提供好的生成规则**（如使用 JWT 自动生成包含用户信息的字符串）**

### **Cookie,session,token和jwt的区别和联系**

cookie**存浏览器**的一小段文本数据，**每次请求都会发送到后端**，经常用来存session ID和JWT的token

session是**存*服务器的***一小段文本数据，有的应用会用session机制验证用户身份，**session** **ID放cookie，实际用户数据在服务器**，

（用session实现单点登录的话需要借助工具Spring-session，因为实际用户数据在服务器那么在多服务器情境下，假如因为负载均衡用户访问了另外的服务器，另外的服务器没用户信息session无法认证！**前后端分离的情况下session已被淘汰**）

token是代表一下段字符串，很多地方用，只是个通用名词，大部分人讲的是jwt的特殊token，token可以存cookie，服务器，内存等很多地方

Jwt token 专门用来验证用户身份的**带有签名的json格式数据**，由header（定义jwt类型和生成签名的算法），payload负载（装用户信息），signature签名（）构成，**服务端默认不存token，客户端随时传过来现取现用**

### JWT基本流程：

![Untitled](%E5%8D%95%E7%82%B9%E7%99%BB%E9%99%86SSO%20faf4a3d87eaa4ceaa63577197ccdb7cb/Untitled.png)

### **为什么会出现跨域问题**

浏览器从一个域名的网页去请求另一个域名的资源时，域名、端口、协议任一不同，都是跨域。

在前后端分离的模式下，前后端的域名是不一致的，此时就会发生跨域访问问题。在请求的过程中我们要想回去数据一般都是post/get请求，所以..跨域问题出现。出于浏览器的同源策略限制。

- 同源策略（Sameoriginpolicy）是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，则浏览器的正常功能可能都会受到影响。
- 可以说Web是构建在同源策略基础之上的，浏览器只是针对同源策略的一种实现。
- 同源策略会阻止一个域的javascript脚本和另外一个域的内容进行交互。

所谓同源（即指在同一个域）就是两个页面具有相同的协议（protocol），主机（host）和端口号（port）

**为了防止浏览器用户禁用cookie导致身份验证失败，我一般都会把token直接存在localstorage里面**，**然后再手动加一个全局请求头**。页面内有什么值拿不出来了，或者页面之间传值有什么数据拿不出来了，都往localstorage里面存完了再取

# **单点登陆**

单点登录（Single Sign On, SSO）是指在同一帐号平台下的多个应用系统中，用户只需登录一次，即可访问所有相互信任的应用系统。

**一般用网关作为统一入口，进行用户的统一认证，其他后端微服务不做拦截api也不对外暴露，只向外暴露网关**

**分布式微服务项目一般只有网关和一些敏感微服务加拦截机制，其他不设防**

实现单点登录的关键在于，**如何让 Session ID（或 Token）在多个域中共享。**

单点登录的**本质就是在多个应用系统中共享登录状态。**

**认证中心（推荐，只有他能实现完全跨域SSO，一般大型分布式项目用)**

**cookie-token式单点登录(推荐)**

### 登陆相关常识

在 B/S 系统中，**登录功能通常都是基于 Cookie 来实现的**。当用户登录成功后，**一般会将登录状态记录到 Session 中(具体用户信息在服务端只有Session ID在哭护短)，或者是给用户签发一个 Token**，无论哪一种方式，**都需要在客户端保存一些信息（Session ID 或 Token ）**，并要求客户端在之后的每次请求中携带它

们。

在这样的场景下，使用 Cookie 无疑是最方便的，因此我们一般都会将 Session 的 ID 或 Token 保存到 Cookie 中，当服务端收到请求后，通过验证 Cookie 中的信息

来判断用户是否登录

分布式项目用JWT区分员工用户

一系列网站普通用户和公司员工登陆，必须区分

管理后台不能让用户访问

**通过jwt** **生成token的签名不一样，可以使员工和用户的生成的token在不同网站不同用，**

## 单点登陆的实现方式

- 实现方式一：**cookie-token式单点登录(推荐)**
- 实现方式二：认证中心
- 实现方式三：**session式单点登录/或者session 广播机制实现(不推荐)**
- 实现方式四：**使用 cookie + redis 实现**
- **实现方式五：LocalStorage 跨域**

### 实现方式一：**cookie-token式单点登录(推荐)**

总结：此种实现方式比较简单，但不支持跨主域名

实质, ,**子域名共享父域名cookie中存的token,Cookie 有一个特点，即父域中的 Cookie 被子域所共享**，换言之，子域会自动继承父域中的Cookie。

**cookie-token式的也能踢人下线,前提有用redis做续期,直接删掉redis续期对应的key就行**

**cookie-token式天生适合做单点登录,因为客户端存储完整的凭证token存于cookie**

前提是这些**服务端域名相近(),**且**服务端jwt校验算法一样**,

互相可以共享到cookie和里面的token(不完全跨域的单点登录).

登录请求到服务器,通过JWT生成token,存到cookie里通过不同子系统域名接近,实现共享token,(远程调用放请求头带出去)

如果要**做(完全跨域的单点登录),则需要架设独立的认证中心,成本较大**.

分布式项目,必须分成前台项目和数据微服务部分

不用高复用性,可以前后一体化,

该方法缺陷：

- 首先，父域名一致；
- 其次，应用群各系统使用的技术（至少是web服务器）要相同，**服务端jwt校验算法一样**,不然cookie的key值（tomcat为JSESSIONID）不同，无法维持会话，共享cookie的方式是无法实现跨语言技术平台登录的，比如java、php、.net系统之间；
- 第三，cookie本身不安全

‘

Cookie 的作用域

Cookie 的作用域由 domain 属性和 path 属性共同决定。

domain 属性的有效值为当前域或其父域的域名/IP地址，在 Tomcat 中，domain 属性默认为当前域的域名/IP地址。path 属性的有效值是以“/”开头的路径，在 Tomcat 中，path 属性默认为当前 Web 应用的上下文路径。

如果将 **Cookie 的 domain 属性设置为当前域的父域，那么就认为它是父域 Cookie。Cookie 有一个特点，即父域中的 Cookie 被子域所共享**，换言之，子域会自动继承父域中的Cookie。

利用 Cookie 的这个特点，不难想到，**将 Session ID（或 Token）保存到父域中不就行了**。没错，**我们只需要将 Cookie 的 domain 属性设置为父域的域名（主域名），同时将 Cookie 的 path 属性设置为根路径，这样所有的子域应用就都可以访问到这个 Cookie 了。**

不过**这要求应用系统的域名需建立在一个共同的主域名之下**，如 tieba.baidu.com 和 map.baidu.com，它们都建立在 baidu.com 这个主域名之下，那么它们就可以通过这种方式来实现单点登录。

### 实现方式二：认证中心（**推荐，只有他能实现完全跨域SSO，一般大型分布式项目用)**

**总结：此种实现方式相对复杂，支持跨域，扩展性好，是单点登录的标准做法。**

我们可以部署一个认证中心，**认证中心就是一个专门负责处理登录请求的独立的 Web 服务**。

**用户统一在认证中心进行登录，登录成功后，认证中心记录用户的登录状态，并将 Token 写入 Cookie。**

**（注意这个 Cookie 是认证中心的，应用系统是访问不到的。）**

应用系统检查当前请求有没有 Token，如果没有，说明用户在当前系统中尚未登录，那么就将页面跳转至认证中心。由于这个操作会将认证中心的 Cookie 自动带过去，因此，认证中心能够根据 Cookie 知道用户是否已经登录过了。

如果认证中心发现用户尚未登录，则返回登录页面，等待用户登录，如果发现用户已经登录过了，就不会让用户再次登录了，而是**会跳转回目标 URL ，并在跳转前生成一个 Token，拼接在目标 URL 的后面，回传给目标应用系统。**

**应用系统拿到 Token 之后，还需要向认证中心确认下 Token 的合法性，防止用户伪造**。确认无误后，应用系统记录用户的登录状态，并将 Token 写入 Cookie，然后给本次访问放行。（注意这个 Cookie 是当前应用系统的，其他应用系统是访问不到的。）当用户再次访问当前应用系统时，就会自动带上这个 Token，应用系统验证 Token 发现用户已登录，于是就不会有认证中心什么事了。

这里顺便介绍两款认证中心的开源实现：

1. oauth2
2. Apereo CAS 是一个企业级单点登录系统，
3. XXL-SSO 是一个简易的单点登录系统，代码比较简单，没有做安全控制，因而不推荐直接应用在项目中，这里列出来仅供参考。

![Untitled](%E5%8D%95%E7%82%B9%E7%99%BB%E9%99%86SSO%20faf4a3d87eaa4ceaa63577197ccdb7cb/Untitled%201.png)

### 实现方式3：**使用 cookie + redis 实现**

用户在项目的任意一个模块登录后，该模块会将用户的登录信息放到 redis 和 cookie 中。

① 系统会先将用户的登录信息存入 redis中，其在 redis 的 key 值是生成的唯一值 （可以包含 IP、用户 id、UUID等值），value 值存放用户的登录信息。

② 然后系统会将这名用户在 redis 中的 key 值存入该用户的 cookie 中，用户每次访问任意模块时都会带着这个 cookie。

③ 用户在访问其他模块发送请求时，都会带着客户端的 cookie 进行请求，而客户端的 cookie 已经存入了该用户在 redis 中的 key 值，这样其他模块在处理用户的请求时，可以先获取用户 cookie中的 key 值，然后拿着这个 key 值到 redis 中进行查询，如果在 redis 中能查询到该用户相应的登录信息，就说明该用户已登录，就不需要用户进行重复登录了。

### 实现方式四：**session式单点登录/或者session 广播机制实现(不推荐)**

**session式单点登录优点: 具有很高的用户掌控度,能踢人下线(竞拍室,直播室,聊天室场景)**

**session天生不适合做单点登录,因为客户端只能持有jsessionId,用户信息存于服务端.而且各服务端session数据不相通.**

因此,可以把服务端的用户信息session数据部分存到redis去,各服务端相通.

spring家族有一个**spring-session框架**可以无侵入的完成这一步

**缺点是只能做到不完全跨域的单点登录,并且后期越来越不好改,成本越来越大.**

实现:

包:spring-session-data-redis

启动类注解:@EnableRedisHttpSession

完成后,项目中所有对session的操作都会被劫持到redis上,使得session数据存入redis,达到多项目共享.

**session 广播机制实现**

在用户登录了一个模块后，这个模块的服务器会将用户的登录信息保存在本机的session中，然后**通过session的广播机制，将这台服务器session中的内容复制到其他模块所在服务器的session中**，这样其他的模块也就得到了用户

的登录信息，用户在访问其他模块时就不需要重复登录了。

但**这种模式会多次复制session中的内容，造成用户数据的冗余存储，因此并不推荐使用这种方式实现单点登录**。

### **实现方式五：LocalStorage 跨域**

![Untitled](%E5%8D%95%E7%82%B9%E7%99%BB%E9%99%86SSO%20faf4a3d87eaa4ceaa63577197ccdb7cb/Untitled%202.png)