
export default class Watch{

	constructor(vm,key,node,attr){
		//对象
		this.vm = vm;
		//属性名称
		this.key = key;
		//节点
		this.node = node;
		//改变文本节点内容的字符串
		this.attr = attr;
	}
	//执行改变(update)操作
	update(){
		this.node[this.attr] = this.vm[this.key];
        console.log(this.node);
        console.log(this.node[this.attr]);
	}

}