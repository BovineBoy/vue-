/**
 * 简易版双向绑定：劫持data对象属性的getter和setter方法，在对象的属性发生变化时进行特定的操作。
 * 缺点：
 * 1. 每次增加一个新的属性我们就要对这个新属性进行监听
 * 2. 违反开放封闭原则
 * 3. 代码耦合严重
 */
/**
const data = {
	inputVal: "",
	name: ""
}

var inputs = document.getElementsByTagName("input")
var span = document.getElementsByTagName("span")[0]

Array.from(inputs).forEach(item => {
	item.addEventListener("input", e => {
		data.inputVal = e.target.value
		data.name = e.target.value
	})
})

Object.keys(data).forEach(function(key) {
	Object.defineProperty(data, key, {
		get: function() {
			console.log(key)
		},
		set: function(val) {
			if (key === "name") span.innerText = val
			if (key === "inputVal") inputs[0].value = inputs[1].value = val
		}
	})
})
*/

/**
 * @description 升级版双向绑定
 * 加入发布订阅模式，结合Object.defineProperty
 */

//  1.首先实现订阅发布中心，即消息管理员(Dep)，他负责存储订阅者和消息的分发，不管是订阅者还是发布者都需要依赖于它
let uid = 0;
// 用于存储订阅者并发布消息
class Dep {
	constructor() {
		// 设置id，用于区分新Watcher和只改变属性值后新产生的Watcher
		this.id = uid++;
		// 储存订阅者的数组
		this.subs = [];
	}
	// 触发target上的Watcher中的addDep方法，参数为dep的实例本身
	depend() {
		Dep.target.addDep(this);
	}
	// 添加订阅者
	addSub(sub) {
		this.subs.push(sub);
	}
	notify() {
		// 通知所有的订阅者(Watcher)，触发订阅者的相应逻辑处理
		this.subs.forEach(sub => sub.update());
	}
}
// 为Dep类设置一个静态属性，默认为null，工作时指向当前的Watcher
Dep.target = null;

// 监听者，监听对象属性指定的变化
class Observer {
	constructor(value) {
		this.value = value;
		this.walk(value);
	}
	// 遍历属性值并监听
	walk(value) {
		Object.keys(value).forEach(key => this.convert(key, value[key]));
	}
	// 执行监听的具体方法
	convert(key, val) {
		defineReactive(this.value, key, val);
	}
}

function defineReactive(obj, key, val) {
	const dep = new Dep();
	// 给当前属性的值添加监听
	let childOb = observe(val);
}
