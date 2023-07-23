'use strict';

var i=(u,e,t)=>new Promise((r,s)=>{var n=o=>{try{h(t.next(o));}catch(x){s(x);}},a=o=>{try{h(t.throw(o));}catch(x){s(x);}},h=o=>o.done?r(o.value):Promise.resolve(o.value).then(n,a);h((t=t.apply(u,e)).next());});var m=class{constructor(e){this.errorHandler=t=>{},this.requestLib=e;}get(e,t){return i(this,null,function*(){return yield this.requestLib.get(e,t).then(r=>r,r=>(this.errorHandler&&this.errorHandler(r),r))})}post(e,t){return i(this,null,function*(){return yield this.requestLib.post(e,t).then(r=>r,r=>(this.errorHandler&&this.errorHandler(r),r))})}put(e,t){return i(this,null,function*(){return yield this.requestLib.put(e,t).then(r=>r,r=>(this.errorHandler&&this.errorHandler(r),r))})}delete(e,t){return i(this,null,function*(){return yield this.requestLib.delete(e,t).then(r=>r,r=>(this.errorHandler&&this.errorHandler(r),r))})}head(e,t){return i(this,null,function*(){return yield this.requestLib.head(e,t).then(r=>r,r=>(this.errorHandler&&this.errorHandler(r),r))})}options(e,t){return i(this,null,function*(){return yield this.requestLib.options(e,t).then(r=>r,r=>(this.errorHandler&&this.errorHandler(r),r))})}patch(e,t){return i(this,null,function*(){return yield this.requestLib.patch(e,t).then(r=>r,r=>(this.errorHandler&&this.errorHandler(r),r))})}request(e){return i(this,null,function*(){return yield this.requestLib.request(e).then(t=>t,t=>(this.errorHandler&&this.errorHandler(t),t))})}setErrorHandler(e){this.errorHandler=e;}setHeaders(e){this.requestLib.setHeaders(e);}setHeader(e,t){this.requestLib.setHeader(e,t);}setTimeout(e){this.requestLib.setTimeout&&this.requestLib.setTimeout(e);}};var p=class{constructor(e){this.requestLib=e,this.requestInterceptor=t=>t,this.responseInterceptor=t=>t;}get(e,t){return i(this,null,function*(){let r=this.requestInterceptor(t),s=yield this.requestLib.get(r.url,r);return this.responseInterceptor(s)})}post(e,t){return i(this,null,function*(){let r=this.requestInterceptor(t),s=yield this.requestLib.post(r.url,r);return this.responseInterceptor(s)})}put(e,t){return i(this,null,function*(){let r=this.requestInterceptor(t),s=yield this.requestLib.put(r.url,r);return this.responseInterceptor(s)})}delete(e,t){return i(this,null,function*(){let r=this.requestInterceptor(t),s=yield this.requestLib.delete(r.url,r);return this.responseInterceptor(s)})}head(e){return i(this,null,function*(){let t=this.requestInterceptor({url:e}),r=yield this.requestLib.head(t.url,t);return this.responseInterceptor(r)})}options(e){return i(this,null,function*(){let t=this.requestInterceptor({url:e}),r=yield this.requestLib.options(t.url,t);return this.responseInterceptor(r)})}patch(e,t){return i(this,null,function*(){let r=this.requestInterceptor(t),s=yield this.requestLib.patch(r.url,r);return this.responseInterceptor(s)})}request(e){return i(this,null,function*(){let t=this.requestInterceptor(e),r=yield this.requestLib.request(t);return this.responseInterceptor(r)})}setHeaders(e){this.requestLib.setHeaders(e);}setHeader(e,t){this.requestLib.setHeader(e,t);}setTimeout(e){this.requestLib.setTimeout&&this.requestLib.setTimeout(e);}setRequestInterceptor(e){this.requestInterceptor=e;}setResponseInterceptor(e){this.responseInterceptor=e;}};var l=class{constructor(e){this._timeout=0;this.timeoutHandler=t=>{},this.requestLib=e,this._timeout=0;}get(e,t){return i(this,null,function*(){this.timeoutHandler=()=>(this.timeoutHandler&&this.timeoutHandler(e),`Timeout of ${this._timeout} ms exceeded`);let r=setTimeout(this.timeoutHandler,this._timeout);yield this.requestLib.get(e,t).then(s=>(clearTimeout(r),s),s=>(clearTimeout(r),s));})}post(e,t){return i(this,null,function*(){this.timeoutHandler=()=>(this.timeoutHandler&&this.timeoutHandler(e),`Timeout of ${this._timeout} ms exceeded`);let r=setTimeout(this.timeoutHandler,this._timeout);yield this.requestLib.post(e,t).then(s=>(clearTimeout(r),s),s=>(clearTimeout(r),s));})}put(e,t){return i(this,null,function*(){this.timeoutHandler=()=>(this.timeoutHandler&&this.timeoutHandler(e),`Timeout of ${this._timeout} ms exceeded`);let r=setTimeout(this.timeoutHandler,this._timeout);yield this.requestLib.put(e,t).then(s=>(clearTimeout(r),s),s=>(clearTimeout(r),s));})}delete(e,t){return i(this,null,function*(){this.timeoutHandler=()=>(this.timeoutHandler&&this.timeoutHandler(e),`Timeout of ${this._timeout} ms exceeded`);let r=setTimeout(this.timeoutHandler,this._timeout);yield this.requestLib.delete(e,t).then(s=>(clearTimeout(r),s),s=>(clearTimeout(r),s));})}head(e,t){return i(this,null,function*(){this.timeoutHandler=()=>(this.timeoutHandler&&this.timeoutHandler(e),`Timeout of ${this._timeout} ms exceeded`);let r=setTimeout(this.timeoutHandler,this._timeout);yield this.requestLib.head(e,t).then(s=>(clearTimeout(r),s),s=>(clearTimeout(r),s));})}options(e,t){return i(this,null,function*(){this.timeoutHandler=()=>(this.timeoutHandler&&this.timeoutHandler(e),`Timeout of ${this._timeout} ms exceeded`);let r=setTimeout(this.timeoutHandler,this._timeout);yield this.requestLib.options(e,t).then(s=>(clearTimeout(r),s),s=>(clearTimeout(r),s));})}request(e){return i(this,null,function*(){this.timeoutHandler=()=>{var r;return this.timeoutHandler&&this.timeoutHandler((r=e.url)!=null?r:""),`Timeout of ${this._timeout} ms exceeded`};let t=setTimeout(this.timeoutHandler,this._timeout);yield this.requestLib.request(e).then(r=>(clearTimeout(t),r),r=>(clearTimeout(t),r));})}patch(e,t){return i(this,null,function*(){this.timeoutHandler=()=>(this.timeoutHandler&&this.timeoutHandler(e),`Timeout of ${this._timeout} ms exceeded`);let r=setTimeout(this.timeoutHandler,this._timeout);yield this.requestLib.patch(e,t).then(s=>(clearTimeout(r),s),s=>(clearTimeout(r),s));})}setHeaders(e){this.requestLib.setHeaders(e);}setHeader(e,t){this.requestLib.setHeader(e,t);}timeout(e,t){this._timeout=e,this.timeoutHandler=t;}};var d=class{constructor(e){this.xhr=e,this.timeout=0,this.headers={};}get(e,t){return new Promise((r,s)=>{var n;t!=null&&t.params&&(e+=`?${Object.entries(t.params).map(([a,h])=>`${a}=${h}`).join("&")}`),this.xhr.open("GET",e,!0),this._setHeaders(),this.xhr.timeout=(n=t==null?void 0:t.timeout)!=null?n:this.timeout,this.xhr.send(),this.xhr.onreadystatechange=()=>{this.xhr.readyState===4&&(this.xhr.status>=200&&this.xhr.status<300?r(this.xhr.responseText):s(new Error(`\u8BF7\u6C42\u5931\u8D25\uFF1A${this.xhr.statusText}`)));},this.xhr.onerror=()=>{s(new Error(`\u8BF7\u6C42\u5931\u8D25\uFF1A${this.xhr.statusText}`));};})}post(e,t){return new Promise((r,s)=>{var n;this.xhr.open("POST",e,!0),this._setHeaders(),this.xhr.timeout=(n=t==null?void 0:t.timeout)!=null?n:this.timeout,this.xhr.onreadystatechange=()=>{this.xhr.readyState===4&&(this.xhr.status>=200&&this.xhr.status<300?r(this.xhr.responseText):s(new Error(`\u8BF7\u6C42\u5931\u8D25\uFF1A${this.xhr.statusText}`)));},this.xhr.onerror=()=>{s(new Error(`\u8BF7\u6C42\u5931\u8D25\uFF1A${this.xhr.statusText}`));},t!=null&&t.data?(this.xhr.setRequestHeader("Content-Type","application/json"),this.xhr.send(JSON.stringify(t.data))):this.xhr.send();})}put(e,t){return new Promise((r,s)=>{var n;this.xhr.open("PUT",e,!0),this._setHeaders(),this.xhr.timeout=(n=t==null?void 0:t.timeout)!=null?n:this.timeout,this.xhr.onreadystatechange=()=>{this.xhr.readyState===4&&(this.xhr.status>=200&&this.xhr.status<300?r(this.xhr.responseText):s(new Error(`\u8BF7\u6C42\u5931\u8D25\uFF1A${this.xhr.statusText}`)));},this.xhr.onerror=()=>{s(new Error(`\u8BF7\u6C42\u5931\u8D25\uFF1A${this.xhr.statusText}`));},t!=null&&t.data?(this.xhr.setRequestHeader("Content-Type","application/json"),this.xhr.send(JSON.stringify(t.data))):this.xhr.send();})}delete(e,t){return new Promise((r,s)=>{var n;this.xhr.open("DELETE",e,!0),this._setHeaders(),this.xhr.timeout=(n=t==null?void 0:t.timeout)!=null?n:this.timeout,this.xhr.onreadystatechange=()=>{this.xhr.readyState===4&&(this.xhr.status>=200&&this.xhr.status<300?r(this.xhr.responseText):s(new Error(`\u8BF7\u6C42\u5931\u8D25\uFF1A${this.xhr.statusText}`)));},this.xhr.onerror=()=>{s(new Error(`\u8BF7\u6C42\u5931\u8D25\uFF1A${this.xhr.statusText}`));},this.xhr.send();})}head(e){return new Promise((t,r)=>{this.xhr.open("HEAD",e,!0),this.xhr.responseType="json",this.xhr.onload=()=>{this.xhr.status===200?t(this.xhr.response):r(new Error(`\u8BF7\u6C42\u5931\u8D25\uFF1A${this.xhr.status}`));},this.xhr.onerror=()=>{r(new Error(`\u8BF7\u6C42\u5931\u8D25\uFF1A${this.xhr.status}`));},this.xhr.send();})}options(e){return new Promise((t,r)=>{this.xhr.open("OPTIONS",e,!0),this.xhr.responseType="json",this.xhr.onload=()=>{this.xhr.status===200?t(this.xhr.response):r(new Error(`\u8BF7\u6C42\u5931\u8D25\uFF1A${this.xhr.status}`));},this.xhr.onerror=()=>{r(new Error(`\u8BF7\u6C42\u5931\u8D25\uFF1A${this.xhr.status}`));},this.xhr.send();})}patch(e,t){return new Promise((r,s)=>{var n;this.xhr.open("PATCH",e,!0),this._setHeaders(),this.xhr.timeout=(n=t==null?void 0:t.timeout)!=null?n:this.timeout,this.xhr.onreadystatechange=()=>{this.xhr.readyState===4&&(this.xhr.status>=200&&this.xhr.status<300?r(this.xhr.responseText):s(new Error(`\u8BF7\u6C42\u5931\u8D25\uFF1A${this.xhr.statusText}`)));},this.xhr.onerror=()=>{s(new Error(`\u8BF7\u6C42\u5931\u8D25\uFF1A${this.xhr.statusText}`));},t!=null&&t.data?(this.xhr.setRequestHeader("Content-Type","application/json"),this.xhr.send(JSON.stringify(t.data))):this.xhr.send();})}request(e){return new Promise((t,r)=>{var s,n,a;this.xhr.open((s=e.method)!=null?s:"GET",(n=e.url)!=null?n:"",!0),this._setHeaders(),this.xhr.timeout=(a=e.timeout)!=null?a:this.timeout,this.xhr.onreadystatechange=()=>{this.xhr.readyState===4&&(this.xhr.status>=200&&this.xhr.status<300?t(this.xhr.responseText):r(new Error(`\u8BF7\u6C42\u5931\u8D25\uFF1A${this.xhr.statusText}`)));},this.xhr.onerror=()=>{r(new Error(`\u8BF7\u6C42\u5931\u8D25\uFF1A${this.xhr.statusText}`));},e.data?(this.xhr.setRequestHeader("Content-Type","application/json"),this.xhr.send(JSON.stringify(e.data))):this.xhr.send();})}setHeader(e,t){this.headers[e]=t;}setTimeout(e){this.timeout=e;}setHeaders(e){this.headers=e;}_setHeaders(){Object.entries(this.headers).forEach(([e,t])=>{this.xhr.setRequestHeader(e,t);});}};var c=class u{constructor(){this.xhr=new XMLHttpRequest;}static getInstance(){return u.instance||(u.instance=new u),u.instance}getXHR(){return this.xhr}};function E(u){let e=c.getInstance().getXHR(),t=new d(e);return u&&u.useInterceptor?new p(t):u&&u.useTimeout?new l(t):u&&u.useErrorHandler?new m(t):t}

exports.ErrorHandlerDecorator = m;
exports.InterceptorDecorator = p;
exports.RequestLibraryImpl = d;
exports.Singleton = c;
exports.TimeoutDecorator = l;
exports.create = E;
