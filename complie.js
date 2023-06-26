
import Watch from "./watch.js";
export default class Compile {
    constructor(that) {
        this.initThis = that
    }
    initCompile(node) {
        node.childNodes.forEach((item,index)=>{
			//元素节点
			if( item.nodeType == 1 ){
				//判断元素节点是否绑定了@click
				if( item.hasAttribute('@click')  ){
					//@click后绑定的属性值
					let vmKey = item.getAttribute('@click').trim();
					item.addEventListener('click',( event )=>{
						this.initThis.eventFn = this.initThis.$options.methods[vmKey].bind(this.initThis);
						this.initThis.eventFn(event);
						console.log(this.initThis.eventFn );
					})
				}
				if( item.hasAttribute('v-model')  ){
					//@click后绑定的属性值
					let vmKey = item.getAttribute('v-model').trim();
					item.value = this.initThis[vmKey]
					item.addEventListener('input',( event )=>{
						this.initThis[vmKey] = event.srcElement.value
					})
				}
				if( item.childNodes.length > 0  ){
					this.initCompile(  item );
				}
			}
			//这是文本节点，如果有{{}}就替换成数据
			if( item.nodeType == 3 ){
				//正则匹配{{}}
				let reg = /\{\{(.*?)\}\}/g;
				let text = item.textContent;
				//给节点赋值
				item.textContent = text.replace(reg,(match,vmKey)=>{
					vmKey = vmKey.trim();
					if(  this.initThis.hasOwnProperty(vmKey) ){
						
						let watcher = new Watch(this.initThis,vmKey,item,'textContent');

						if( this.initThis.$watchEvent[vmKey] ){
							this.initThis.$watchEvent[vmKey].push(watcher);
						}else{
							this.initThis.$watchEvent[vmKey] = [];
							this.initThis.$watchEvent[vmKey].push(watcher);
						}
					}
					return this.initThis.$data[vmKey];
				})
			}

		})
    }
}